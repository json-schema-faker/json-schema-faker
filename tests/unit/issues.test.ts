import { describe, test, expect } from "bun:test";
import { generate } from "../../src/index.js";

/**
 * Bun tests for issues that cannot be easily expressed as JSON schema fixtures.
 * These document known bugs and edge cases for later investigation.
 */

describe("Issue #739 - Generate hangs with strict patternProperties", () => {
  test("should not hang when patternProperties limits possible unique keys", async () => {
    // Schema with only 3 possible valid property names (A, B, C)
    const schema = {
      type: "object",
      patternProperties: {
        "^[ABC]": { type: "string" },
      },
    };

    // Use a timeout to detect hangs — if this resolves we're good
    const result = await Promise.race([
      generate(schema),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("Timed out: generate() hung for >2s")), 2000)
      ),
    ]);

    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
  });
});

describe("Issue #588 - optionalsProbability + maxItems can produce oversized arrays", () => {
  test.skip("should not produce arrays larger than maxItems when optionalsProbability is set and minItems is undefined", async () => {
    // When minItems is undefined, random.number() may return a large negative number
    // which Math.abs() turns into a large positive — violating maxItems.
    const schema = {
      type: "array",
      items: { type: "string" },
      maxItems: 3,
    };

    const options = { optionalsProbability: 0.5 };

    // Run multiple times to catch probabilistic failure
    for (let i = 0; i < 20; i++) {
      const result = await generate(schema, options);
      expect(Array.isArray(result)).toBe(true);
      expect((result as unknown[]).length).toBeLessThanOrEqual(3);
    }
  });
});
