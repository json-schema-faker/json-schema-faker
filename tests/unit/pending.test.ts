import { describe, test, expect } from "bun:test";
import { generate } from "../../src/index.js";
import { readdir, readFile } from "fs/promises";
import { join } from "path";

describe("pending issues", () => {
  const pendingDir = join(import.meta.dir, "../pending");

  describe("should generate values for all pending issues", async () => {
    const files = await readdir(pendingDir);
    const jsonFiles = files.filter((f) => f.endsWith(".json"));

    for (const file of jsonFiles) {
      const issueId = file.replace(".json", "");
      test.skip(issueId, async () => {
        const schemaPath = join(pendingDir, file);
        const schemaContent = await readFile(schemaPath, "utf-8");
        const schema = JSON.parse(schemaContent);

        const value = await generate(schema);
        expect(value).toBeDefined();
      });
    }
  });
});
