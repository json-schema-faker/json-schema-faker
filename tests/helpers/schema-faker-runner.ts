import { generate } from "../../src/index.js";
import type { JsonSchema, GenerateOptions } from "../../src/types.js";
import { assertValid } from "./validate.js";
import { createRemoteResolver } from "../../src/remote-resolver.js";
import { join, dirname } from "path";

interface ExtensionContext {
  extensions: {
    faker?: unknown;
    chance?: unknown;
    [key: string]: unknown;
  };
}

// Extension loader cache
const extensionCache = new Map<string, ExtensionContext>();

// Shared cache for remote schemas - reused across all generate() calls
const sharedRemoteSchemaCache = new Map<string, JsonSchema>();

function getSharedRemoteResolver() {
  return createRemoteResolver({
    fetch: globalThis.fetch,
    cache: sharedRemoteSchemaCache,
  });
}

/**
 * Hash a string seed to a number for consistent PRNG behavior
 */
function hashStringToSeed(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

/**
 * Load a required extension/module from the extend folder
 * @param requirePath - The require path (e.g., "core/extend/faker-extend")
 * @param basePath - Optional base path to resolve relative paths from
 * Returns the extensions context with registered faker/chance, or null if not available
 */
async function loadExtension(requirePath: string, basePath?: string): Promise<ExtensionContext | null> {
  // Check cache first
  const cacheKey = basePath ? `${basePath}:${requirePath}` : requirePath;
  if (extensionCache.has(cacheKey)) {
    return extensionCache.get(cacheKey)!;
  }

  try {
    // Create the extensions context
    const ctx: ExtensionContext = {
      extensions: {},
    };

    // Resolve the module path
    const extName = requirePath.replace("core/extend/", "");
    const extendDir = join(dirname(import.meta.filename), "../schema-faker-tests/core/extend");
    const modulePath = join(extendDir, `${extName}.mjs`);

    // Dynamically import the module
    try {
      const module = await import(modulePath);
      if (typeof module.register === "function") {
        module.register(ctx.extensions);
      }
    } catch {
      // Module not available or failed to load
      return null;
    }

    // Cache the result
    extensionCache.set(cacheKey, ctx);
    return ctx;
  } catch {
    return null;
  }
}

/**
 * Check if a test case has required extensions that are not available
 * Returns true if the test should be skipped
 */
export async function shouldSkipDueToRequirements(testCase: SchemaFakerTestCase, basePath?: string): Promise<boolean> {
  if (!testCase.require) {
    return false;
  }

  const extension = await loadExtension(testCase.require, basePath);
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
  /** Random seed (string or number) */
  random?: string | number;
  repeat?: number;
  /** Required extensions/modules to load (e.g., "core/extend/faker-extend") */
  require?: string;
  /** Expected count of properties (for objects) or items (for arrays) */
  count?: number;
}

export interface SchemaFakerTestSuite {
  description: string;
  schemas?: JsonSchema[];
  tests: SchemaFakerTestCase[];
}

export async function runSchemaFakerTest(
  testCase: SchemaFakerTestCase,
  sharedSchemas: JsonSchema[] = [],
  basePath?: string
): Promise<void> {
  // Check if test has requirements that aren't met
  if (await shouldSkipDueToRequirements(testCase, basePath)) {
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

  // Handle "random" option (string seed)
  if (testCase.random !== undefined) {
    if (typeof testCase.random === "string") {
      // Hash string seed to a number
      options.seed = hashStringToSeed(testCase.random);
    } else {
      options.seed = testCase.random;
    }
  }

  // Apply "set" options
  if (testCase.set) {
    Object.assign(options, testCase.set);
  }

  // Load and apply required extensions
  if (testCase.require) {
    const extCtx = await loadExtension(testCase.require, basePath);
    if (extCtx && extCtx.extensions) {
      if (!options.extensions) {
        options.extensions = {};
      }
      Object.assign(options.extensions, extCtx.extensions);
    }
  }

  // Add remote resolver for external refs if not already set
  if (!options.refResolver && typeof globalThis.fetch === "function") {
    options.refResolver = getSharedRemoteResolver();
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
        } else if (msg.includes("NOT SUPPORTED: keyword \"id\"")) {
          // Skip validation for schemas using Draft 4-07 "id" keyword instead of "$id"
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

  // Check "count" expectation (number of properties in object, items in array, chars in a string)
  if (testCase.count !== undefined) {
    let actualCount: number;
    if (typeof value === 'string' || Array.isArray(value)) {
      actualCount = value.length;
    } else if (typeof value === "object" && value !== null) {
      actualCount = Object.keys(value).length;
    } else {
      actualCount = -1;
    }
    if (actualCount !== testCase.count) {
      throw new Error(
        `Expected count ${testCase.count} but got ${actualCount} for value: ${JSON.stringify(value)}`
      );
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
          await runSchemaFakerTest(testCase, suite.schemas ?? [], fileName);
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
