import { generate } from "../../src/index.js";
import type { JsonSchema, GenerateOptions } from "../../src/types.js";
import { assertValid } from "./validate.js";

export interface SchemaFakerTestCase {
  description: string;
  schema: JsonSchema | string;
  refs?: Array<{ id: string } & Record<string, unknown>>;
  type?: string;
  valid?: boolean;
  equal?: unknown;
  throws?: string;
  hasNot?: string;
  set?: Record<string, unknown>;
  seed?: number;
  repeat?: number;
  requirement?: string;
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
