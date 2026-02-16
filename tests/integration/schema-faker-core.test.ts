import { describe, test } from "bun:test";
import { join } from "path";
import { loadTestFiles } from "../helpers/test-file-loader.js";
import type { SchemaFakerTestCase } from "../helpers/schema-faker-runner.js";

const CORE_DIR = join(import.meta.dirname, "../schema-faker-tests/core");
const testFiles = await loadTestFiles(CORE_DIR, ".");

describe("schema-faker-tests: core", () => {
  for (const { name, suites } of testFiles) {
    describe(name, () => {
      for (const suite of suites) {
        describe(suite.description, () => {
          for (const testCase of suite.tests) {
            const testFn = testCase.skip && !process.env.NO_SKIP ? test.skip : test;
            testFn(testCase.description, async () => {
              const { runSchemaFakerTest, shouldSkipDueToRequirements } = await import("../helpers/schema-faker-runner.js");

              // Check if test has unmet requirements and skip if so
              const shouldSkipRequirements = await shouldSkipDueToRequirements(testCase as SchemaFakerTestCase);
              if (shouldSkipRequirements) {
                return;
              }

              try {
                const repeat = testCase.repeat ?? 1;
                for (let i = 0; i < repeat; i++) {
                  await runSchemaFakerTest(testCase as SchemaFakerTestCase, suite.schemas ?? []);
                }
              } catch (e) {
                throw new Error(`${suite.description} > ${testCase.description}: ${(e as Error).message}`);
              }
            });
          }
        });
      }
    });
  }
});
