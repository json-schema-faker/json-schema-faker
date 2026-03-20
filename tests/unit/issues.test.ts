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
  test("should not produce arrays larger than maxItems when optionalsProbability is set and minItems is undefined", async () => {
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

describe("Issue #853 - Deeply nested required properties ignored", () => {
  test("should generate required properties even at maxDepth boundary", async () => {
    // This schema has 5 levels of nesting (matching the default maxDepth of 5)
    // The innermost objects should still have their required 'name' and 'code' properties
    const schema = {
      type: "object",
      required: ["transactionReport"],
      additionalProperties: false,
      properties: {
        transactionReport: {
          type: "object",
          required: ["data"],
          additionalProperties: false,
          properties: {
            data: {
              type: "array",
              items: {
                type: "object",
                required: ["id", "items"],
                additionalProperties: false,
                properties: {
                  id: { type: "integer", minimum: 1 },
                  items: {
                    type: "array",
                    items: {
                      type: "object",
                      required: ["name", "code"],
                      additionalProperties: false,
                      properties: {
                        code: { type: "string" },
                        name: { type: "string" },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    };

    const result = await generate(schema, { minItems: 1, seed: 1 }) as {
      transactionReport: {
        data: Array<{
          id: number;
          items: Array<{ name: string; code: string }>;
        }>;
      };
    };

    // Verify structure
    expect(result.transactionReport).toBeDefined();
    expect(result.transactionReport.data).toBeDefined();
    expect(Array.isArray(result.transactionReport.data)).toBe(true);
    expect(result.transactionReport.data.length).toBeGreaterThan(0);

    // Verify deeply nested required properties exist
    for (const dataItem of result.transactionReport.data) {
      expect(dataItem.id).toBeDefined();
      expect(dataItem.items).toBeDefined();
      expect(Array.isArray(dataItem.items)).toBe(true);

      for (const item of dataItem.items) {
        // These are the critical assertions - previously these would be empty objects {}
        expect(item).toHaveProperty("name");
        expect(item).toHaveProperty("code");
        expect(typeof item.name).toBe("string");
        expect(typeof item.code).toBe("string");
      }
    }
  });

  test("should use const/default/enum values when available at maxDepth", async () => {
    // Set maxDepth=3 to force the innermost object to be generated at maxDepth
    // This tests that our stub value generation uses const/default/enum when available
    // Depth counting: root(0) -> level1(1) -> level2(2) -> level3(3=maxDepth)
    const schema = {
      type: "object",
      required: ["level1"],
      properties: {
        level1: {
          type: "object",
          required: ["level2"],
          properties: {
            level2: {
              type: "object",
              required: ["level3"],
              properties: {
                level3: {
                  type: "object",
                  required: ["constProp", "defaultProp", "enumProp"],
                  properties: {
                    constProp: { const: "constant-value" },
                    defaultProp: { type: "string", default: "default-value" },
                    enumProp: { enum: ["enum-val-1", "enum-val-2"] },
                  },
                },
              },
            },
          },
        },
      },
    };

    // At maxDepth=3, level3's properties are generated using stub values
    const result = await generate(schema, { maxDepth: 3, seed: 1 }) as any;

    const level3 = result?.level1?.level2?.level3;
    expect(level3).toBeDefined();
    expect(level3.constProp).toBe("constant-value");
    expect(level3.defaultProp).toBe("default-value");
    expect(level3.enumProp).toBe("enum-val-1"); // First enum value used as stub
  });
});
