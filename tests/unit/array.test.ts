import { describe, test, expect } from "bun:test";
import { generate } from "../../src/index.js";
import { assertValid, assertValidMultipleSeeds } from "../helpers/validate.js";

describe("array generator", () => {
  test("generates array", () => {
    const val = generate({ type: "array", items: { type: "integer" } });
    expect(Array.isArray(val)).toBe(true);
  });

  test("respects minItems/maxItems", () => {
    const schema = {
      type: "array" as const,
      items: { type: "number" as const },
      minItems: 3,
      maxItems: 5,
    };
    for (let seed = 1; seed <= 50; seed++) {
      const val = generate(schema, { seed }) as unknown[];
      expect(val.length).toBeGreaterThanOrEqual(3);
      expect(val.length).toBeLessThanOrEqual(5);
    }
  });

  test("handles prefixItems", () => {
    const schema = {
      type: "array" as const,
      prefixItems: [
        { type: "string" as const },
        { type: "number" as const },
        { type: "boolean" as const },
      ],
      items: false as const,
    };
    assertValidMultipleSeeds(schema, 50, generate);
  });

  test("handles uniqueItems", () => {
    const schema = {
      type: "array" as const,
      items: { type: "integer" as const, minimum: 0, maximum: 100 },
      uniqueItems: true,
      minItems: 5,
      maxItems: 10,
    };
    for (let seed = 1; seed <= 50; seed++) {
      const val = generate(schema, { seed }) as number[];
      const uniqueSet = new Set(val.map((v) => JSON.stringify(v)));
      expect(uniqueSet.size).toBe(val.length);
    }
  });

  test("validates across seeds", () => {
    assertValidMultipleSeeds(
      {
        type: "array",
        items: { type: "string", minLength: 1 },
        minItems: 1,
        maxItems: 5,
      },
      100,
      generate
    );
  });
});
