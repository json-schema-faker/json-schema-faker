import { describe, test, expect } from "bun:test";
import { generate } from "../../src/index.js";
import { assertValid, assertValidMultipleSeeds } from "../helpers/validate.js";

describe("array generator", () => {
  test("generates array", async () => {
    const val = await generate({ type: "array", items: { type: "integer" } });
    expect(Array.isArray(val)).toBe(true);
  });

  test("respects minItems/maxItems", async () => {
    const schema = {
      type: "array" as const,
      items: { type: "number" as const },
      minItems: 3,
      maxItems: 5,
    };
    for (let seed = 1; seed <= 50; seed++) {
      const val = await generate(schema, { seed }) as unknown[];
      expect(val.length).toBeGreaterThanOrEqual(3);
      expect(val.length).toBeLessThanOrEqual(5);
    }
  });

  test("handles prefixItems", async () => {
    const schema = {
      type: "array" as const,
      prefixItems: [
        { type: "string" as const },
        { type: "number" as const },
        { type: "boolean" as const },
      ],
      items: false as const,
    };
    await assertValidMultipleSeeds(schema, 50, generate);
  });

  test("handles uniqueItems", async () => {
    const schema = {
      type: "array" as const,
      items: { type: "integer" as const, minimum: 0, maximum: 100 },
      uniqueItems: true,
      minItems: 5,
      maxItems: 10,
    };
    for (let seed = 1; seed <= 50; seed++) {
      const val = await generate(schema, { seed }) as number[];
      const uniqueSet = new Set(val.map((v) => JSON.stringify(v)));
      expect(uniqueSet.size).toBe(val.length);
    }
  });

  test("validates across seeds", async () => {
    await assertValidMultipleSeeds(
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

  test("items with oneOf produces a mix of schemas", async () => {
    const schema = {
      type: "array" as const,
      items: {
        oneOf: [
          { type: "string" as const },
          { type: "number" as const },
          { type: "boolean" as const },
        ],
      },
      minItems: 10,
      maxItems: 10,
    };

    // Over multiple seeds, the array must not be all-string, all-number, or all-boolean
    const seenTypes = new Set<string>();
    for (let seed = 1; seed <= 20; seed++) {
      const val = await generate(schema, { seed }) as unknown[];
      expect(val.length).toBe(10);
      for (const item of val) {
        seenTypes.add(typeof item);
      }
    }
    // With 20 seeds × 10 items each, all three types must appear at least once
    expect(seenTypes.has("string")).toBe(true);
    expect(seenTypes.has("number")).toBe(true);
    expect(seenTypes.has("boolean")).toBe(true);
  });

  test("items with anyOf produces a mix of schemas", async () => {
    const schema = {
      type: "array" as const,
      items: {
        anyOf: [
          { type: "string" as const },
          { type: "number" as const },
          { type: "boolean" as const },
        ],
      },
      minItems: 10,
      maxItems: 10,
    };

    const seenTypes = new Set<string>();
    for (let seed = 1; seed <= 20; seed++) {
      const val = await generate(schema, { seed }) as unknown[];
      expect(val.length).toBe(10);
      for (const item of val) {
        seenTypes.add(typeof item);
      }
    }
    expect(seenTypes.has("string")).toBe(true);
    expect(seenTypes.has("number")).toBe(true);
    expect(seenTypes.has("boolean")).toBe(true);
  });

  test("items with oneOf mixing object, number and string", async () => {
    const schema = {
      type: "array" as const,
      items: {
        oneOf: [
          { type: "string" as const, format: "uuid" as const },
          { type: "number" as const },
          {
            type: "object" as const,
            required: ["d"],
            properties: { d: { type: "string" as const, enum: ["foo"] } },
          },
        ],
      },
      minItems: 6,
      maxItems: 6,
    };

    const seenTypes = new Set<string>();
    for (let seed = 1; seed <= 20; seed++) {
      const val = await generate(schema, { seed }) as unknown[];
      expect(val.length).toBe(6);
      for (const item of val) {
        seenTypes.add(typeof item);
      }
    }
    expect(seenTypes.has("string")).toBe(true);
    expect(seenTypes.has("number")).toBe(true);
    expect(seenTypes.has("object")).toBe(true);
  });
});
