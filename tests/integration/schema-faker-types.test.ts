import { describe, test } from "bun:test";
import type { SchemaFakerTestSuite } from "../helpers/schema-faker-runner.js";

// Import all type test files
import arrayTests from "../schema-faker-tests/core/types/array.json" assert { type: "json" };
import integerTests from "../schema-faker-tests/core/types/integer.json" assert { type: "json" };
import notTests from "../schema-faker-tests/core/types/not.json" assert { type: "json" };
import objectTests from "../schema-faker-tests/core/types/object.json" assert { type: "json" };
import stringTests from "../schema-faker-tests/core/types/string.json" assert { type: "json" };

const testFiles: Array<{ name: string; suites: SchemaFakerTestSuite[] }> = [
  { name: "array.json", suites: arrayTests as unknown as SchemaFakerTestSuite[] },
  { name: "integer.json", suites: integerTests as unknown as SchemaFakerTestSuite[] },
  { name: "not.json", suites: notTests as unknown as SchemaFakerTestSuite[] },
  { name: "object.json", suites: objectTests as unknown as SchemaFakerTestSuite[] },
  { name: "string.json", suites: stringTests as unknown as SchemaFakerTestSuite[] },
];

describe("schema-faker-tests: core/types", () => {
  for (const { name, suites } of testFiles) {
    describe(name, () => {
      for (const suite of suites) {
        describe(suite.description, () => {
          for (const testCase of suite.tests) {
            const testFn = testCase.skip ? test.skip : test;
            testFn(testCase.description, async () => {
              // We'll run the test directly here for better error reporting
              const { runSchemaFakerTest } = await import("../helpers/schema-faker-runner.js");

              try {
                const repeat = testCase.repeat ?? 1;
                for (let i = 0; i < repeat; i++) {
                  await runSchemaFakerTest(testCase, suite.schemas ?? []);
                }
              } catch (e) {
                // Re-throw to make Bun show the error
                throw new Error(`${suite.description} > ${testCase.description}: ${(e as Error).message}`);
              }
            });
          }
        });
      }
    });
  }
});
