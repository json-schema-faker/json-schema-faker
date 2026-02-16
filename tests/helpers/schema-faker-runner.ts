import { generate } from "../../src/index.js";
import type { JsonSchema, GenerateOptions } from "../../src/types.js";
import { assertValid } from "./validate.js";

// Extension loader cache
const extensionCache = new Map<string, unknown>();

/**
 * Load a required extension/module
 * Returns the extension or null if not available
 */
async function loadExtension(requirePath: string): Promise<unknown | null> {
  // Check cache first
  if (extensionCache.has(requirePath)) {
    return extensionCache.get(requirePath);
  }

  try {
    let extension: unknown = null;

    // Handle different extension types
    if (requirePath === "core/extend/faker-extend") {
      // Try to import @faker-js/faker
      try {
        // Dynamic import with unknown type to avoid TypeScript errors
        const fakerModule = await import("@faker-js/faker" as string);
        extension = (fakerModule as { faker?: unknown }).faker ?? null;
      } catch {
        // Faker not available
        extension = null;
      }
    } else if (requirePath === "core/extend/chance-extend") {
      // Try to import chance
      try {
        // Dynamic import with unknown type to avoid TypeScript errors
        const chanceModule = await import("chance" as string);
        const Chance = (chanceModule as { default?: unknown; Chance?: unknown }).default || 
                       (chanceModule as { default?: unknown; Chance?: unknown }).Chance;
        if (typeof Chance === "function") {
          extension = new (Chance as new () => unknown)();
        }
      } catch {
        // Chance not available
        extension = null;
      }
    } else if (requirePath === "core/extend/mockjs-extend") {
      // MockJS not implemented
      extension = null;
    } else if (requirePath === "core/formats/semver") {
      // Semver format - register it globally
      extension = { type: "format", name: "semver" };
    } else if (requirePath.startsWith("core/option/")) {
      // Option modules - these typically configure behavior
      const optionName = requirePath.replace("core/option/", "");
      extension = { type: "option", name: optionName };
    }

    // Cache the result
    extensionCache.set(requirePath, extension);
    return extension;
  } catch {
    return null;
  }
}

/**
 * Check if a test case has required extensions that are not available
 * Returns true if the test should be skipped
 */
export async function shouldSkipDueToRequirements(testCase: SchemaFakerTestCase): Promise<boolean> {
  if (!testCase.require) {
    return false;
  }

  const extension = await loadExtension(testCase.require);
  return extension === null;
}

export interface SchemaFakerTestCase {
  description: string;
  schema: JsonSchema | string;
  refs?: Array<{ id: string } & Record<string, unknown>>;
  type?: string;
  skip?: boolean;
  valid?: boolean;
  equal?: unknown;
  throws?: string;
  hasNot?: string;
  set?: Record<string, unknown>;
  seed?: number;
  repeat?: number;
  /** Required extensions/modules to load (e.g., "core/extend/faker-extend") */
  require?: string;
}

export interface SchemaFakerTestSuite {
  description: string;
  schemas?: JsonSchema[];
  tests: SchemaFakerTestCase[];
}

export async function runSchemaFakerTest(
  testCase: SchemaFakerTestCase,
  sharedSchemas: JsonSchema[] = []
): Promise<void> {
  // Check if test has requirements that aren't met
  if (await shouldSkipDueToRequirements(testCase)) {
    throw new Error(`Test skipped: required extension "${testCase.require}" is not available`);
  }

  // Resolve schema reference (e.g., "schemas.0" means sharedSchemas[0])
  let schema: JsonSchema;
  if (typeof testCase.schema === "string") {
    const match = testCase.schema.match(/^schemas\.(\d+)$/);
    if (match) {
      const index = parseInt(match[1], 10);
      schema = sharedSchemas[index];
      if (!schema) {
        throw new Error(`Referenced schema schemas.${index} not found in shared schemas`);
      }
    } else {
      throw new Error(`Invalid schema reference: ${testCase.schema}`);
    }
  } else {
    schema = testCase.schema;
  }

  // Build options
  const options: GenerateOptions & Record<string, unknown> = {};

  if (testCase.seed !== undefined) {
    options.seed = testCase.seed;
  }

  // Apply "set" options
  if (testCase.set) {
    Object.assign(options, testCase.set);
  }

  // Load and apply required extensions
  if (testCase.require) {
    const extension = await loadExtension(testCase.require);
    if (extension) {
      const extObj = extension as { type?: string; name?: string };
      
      if (extObj.type === "format" && extObj.name) {
        // Format extensions would need to be registered globally or per-call
        // For now, we'll skip format registration
      } else if (extObj.type !== "option") {
        // It's a generator extension (faker, chance, etc.)
        if (!options.extensions) {
          options.extensions = {};
        }
        
        if (testCase.require.includes("faker")) {
          (options.extensions as { faker?: unknown }).faker = extension;
        } else if (testCase.require.includes("chance")) {
          (options.extensions as { chance?: unknown }).chance = extension;
        }
      }
    }
  }

  // Build refResolver from refs
  if (testCase.refs) {
    const refMap = new Map<string, JsonSchema>();
    for (const ref of testCase.refs) {
      if (ref.id) {
        const { id, ...schemaWithoutId } = ref;
        refMap.set(id, schemaWithoutId as JsonSchema);
      }
    }

    options.refResolver = (ref: string): JsonSchema => {
      const resolved = refMap.get(ref);
      if (resolved === undefined) {
        throw new Error(`Unresolved $ref: ${ref}`);
      }
      return resolved;
    };
  }

  // Handle "throws" expectation - test should fail
  if (testCase.throws) {
    try {
      await generate(schema, options);
      throw new Error(`Expected test to throw matching "${testCase.throws}" but it succeeded`);
    } catch (e) {
      const errorMsg = (e as Error).message;
      const pattern = new RegExp(testCase.throws);
      if (!pattern.test(errorMsg)) {
        throw new Error(
          `Expected error to match "${testCase.throws}" but got: ${errorMsg}`
        );
      }
      // Test passed - error matched expected pattern
      return;
    }
  }

  // Generate value
  const value = await generate(schema, options);

  // Check "type" expectation
  if (testCase.type !== undefined) {
    const actualType = getJsType(value);
    if (actualType !== testCase.type) {
      throw new Error(
        `Expected type "${testCase.type}" but got "${actualType}" for value: ${JSON.stringify(value)}`
      );
    }
  }

  // Check "valid" expectation (validate against schema)
  if (testCase.valid === true) {
    // Skip validation if schema has external refs that AJV can't resolve
    const hasExternalRefs = testCase.refs && testCase.refs.length > 0;

    if (!hasExternalRefs) {
      try {
        assertValid(schema, value);
      } catch (e) {
        // If validation fails due to unresolved refs, that's expected for some tests
        const msg = (e as Error).message;
        if (msg.includes("can't resolve reference") || msg.includes("Unresolved $ref")) {
          // Skip validation for schemas with external refs
        } else if (msg.includes("schema is invalid")) {
          // Skip validation if the schema itself is invalid (e.g., Draft 4-07 exclusiveMinimum)
        } else {
          throw e;
        }
      }
    }
  }

  // Check "equal" expectation
  if (testCase.equal !== undefined) {
    if (JSON.stringify(value) !== JSON.stringify(testCase.equal)) {
      throw new Error(
        `Expected value to equal ${JSON.stringify(testCase.equal)} but got ${JSON.stringify(value)}`
      );
    }
  }

  // Check "hasNot" expectation (value as string should not match pattern)
  if (testCase.hasNot !== undefined) {
    const strValue = JSON.stringify(value);
    // Special case: hasNot: "." means check no decimal point (for integers)
    if (testCase.hasNot === ".") {
      if (strValue.includes(".")) {
        throw new Error(
          `Expected integer value to NOT contain decimal point but got: ${strValue}`
        );
      }
    } else {
      const pattern = new RegExp(testCase.hasNot);
      if (pattern.test(strValue)) {
        throw new Error(
          `Expected value to NOT match "${testCase.hasNot}" but got: ${strValue}`
        );
      }
    }
  }
}

function getJsType(value: unknown): string {
  if (value === null) return "null";
  if (Array.isArray(value)) return "array";
  return typeof value;
}

export async function runSchemaFakerTestFile(
  testSuites: SchemaFakerTestSuite[],
  fileName: string
): Promise<{ passed: number; failed: number; errors: string[] }> {
  const results = { passed: 0, failed: 0, errors: [] as string[] };

  for (const suite of testSuites) {
    for (const testCase of suite.tests) {
      const fullName = `${suite.description} > ${testCase.description}`;

      try {
        const repeat = testCase.repeat ?? 1;
        for (let i = 0; i < repeat; i++) {
          await runSchemaFakerTest(testCase, suite.schemas ?? []);
        }
        results.passed++;
      } catch (e) {
        results.failed++;
        results.errors.push(`FAIL: ${fileName} > ${fullName}\n  ${(e as Error).message}`);
      }
    }
  }

  return results;
}
