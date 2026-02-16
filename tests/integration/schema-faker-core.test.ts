import { describe, test } from "bun:test";
import { join } from "path";
import { loadTestFiles } from "../helpers/test-file-loader.js";

const CORE_DIR = join(import.meta.dirname, "../schema-faker-tests/core");
const testFiles = await loadTestFiles(CORE_DIR, ".");

describe("schema-faker-tests: core", () => {
  for (const { name, suites } of testFiles) {
    describe(name, () => {
      for (const suite of suites) {
        describe(suite.description, () => {
          for (const testCase of suite.tests) {
            const testFn = testCase.skip ? test.skip : test;
            testFn(testCase.description, async () => {
              const { runSchemaFakerTest } = await import("../helpers/schema-faker-runner.js");

              try {
                const repeat = testCase.repeat ?? 1;
                for (let i = 0; i < repeat; i++) {
                  await runSchemaFakerTest(testCase, suite.schemas ?? []);
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
