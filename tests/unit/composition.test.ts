import { describe, test, expect } from "bun:test";
import { generate } from "../../src/index.js";
import { assertValid, assertValidMultipleSeeds } from "../helpers/validate.js";

describe("allOf", () => {
  test("merges numeric bounds", async () => {
    const schema = {
      allOf: [
        { type: "integer" as const, minimum: 0 },
        { maximum: 10 },
      ],
    };
    for (let seed = 1; seed <= 50; seed++) {
      const val = await generate(schema, { seed }) as number;
      expect(val).toBeGreaterThanOrEqual(0);
      expect(val).toBeLessThanOrEqual(10);
      expect(Number.isInteger(val)).toBe(true);
    }
  });

  test("merges object properties", async () => {
    const schema = {
      allOf: [
        {
          type: "object" as const,
          properties: { a: { type: "string" as const } },
          required: ["a"],
        },
        {
          properties: { b: { type: "number" as const } },
          required: ["b"],
        },
      ],
    };
    const val = await generate(schema as any) as Record<string, unknown>;
    expect(val).toHaveProperty("a");
    expect(val).toHaveProperty("b");
  });

  test("validates across seeds", async () => {
    await assertValidMultipleSeeds(
      {
        allOf: [
          { type: "integer", minimum: 1 },
          { maximum: 100, multipleOf: 5 },
        ],
      },
      100,
      generate
    );
  });
});

describe("anyOf", () => {
  test("picks one schema", async () => {
    const schema = {
      anyOf: [
        { type: "string" as const },
        { type: "number" as const },
      ],
    };
    for (let seed = 1; seed <= 50; seed++) {
      const val = await generate(schema, { seed });
      expect(typeof val === "string" || typeof val === "number").toBe(true);
    }
  });

  test("validates across seeds", async () => {
    await assertValidMultipleSeeds(
      {
        anyOf: [
          { type: "string", minLength: 1 },
          { type: "integer", minimum: 0 },
        ],
      },
      100,
      generate
    );
  });
});

describe("oneOf", () => {
  test("picks one schema", async () => {
    const schema = {
      oneOf: [
        { type: "string" as const, minLength: 1 },
        { type: "integer" as const, minimum: 0 },
        { type: "boolean" as const },
      ],
    };
    for (let seed = 1; seed <= 50; seed++) {
      const val = await generate(schema, { seed });
      const t = typeof val;
      expect(["string", "number", "boolean"]).toContain(t);
    }
  });
});

describe("not", () => {
  test("avoids excluded type", async () => {
    const schema = {
      not: { type: "string" as const },
    };
    for (let seed = 1; seed <= 50; seed++) {
      const val = await generate(schema, { seed });
      expect(typeof val).not.toBe("string");
    }
  });
});

describe("if/then/else", () => {
  test("generates values matching conditional", async () => {
    const schema = {
      type: "object" as const,
      properties: {
        kind: { type: "string" as const, enum: ["a", "b"] },
        value: { type: "number" as const },
      },
      required: ["kind", "value"],
      if: { properties: { kind: { const: "a" } } },
      then: { properties: { value: { minimum: 100 } } },
      else: { properties: { value: { maximum: 0 } } },
    };
    for (let seed = 1; seed <= 20; seed++) {
      const val = await generate(schema, { seed }) as { kind: string; value: number };
      expect(typeof val).toBe("object");
      if (val.kind === "a") {
        expect(val.value).toBeGreaterThanOrEqual(100);
      } else {
        expect(val.value).toBeLessThanOrEqual(0);
      }
    }
  });

  test("if/then without else falls back to base", async () => {
    const schema = {
      type: "object" as const,
      properties: {
        kind: { type: "string" as const, enum: ["a", "b"] },
        value: { type: "number" as const },
      },
      required: ["kind", "value"],
      if: { properties: { kind: { const: "a" } } },
      then: { properties: { value: { minimum: 100 } } },
    };
    for (let seed = 1; seed <= 20; seed++) {
      const val = await generate(schema, { seed }) as { kind: string; value: number };
      expect(typeof val).toBe("object");
      if (val.kind === "a") {
        expect(val.value).toBeGreaterThanOrEqual(100);
      }
    }
  });
});

describe("github issues", () => {
  test.skip("issue #727: allOf with contains should include all required items", async () => {
    const schema = {
      $schema: "http://json-schema.org/draft-07/schema",
      type: "array",
      items: { type: "string" },
      allOf: [
        { contains: { const: "A" } },
        { contains: { const: "B" } },
      ],
    };

    for (let seed = 1; seed <= 20; seed++) {
      const val = await generate(schema as any, { seed }) as string[];
      expect(val).toContain("A");
      expect(val).toContain("B");
      assertValid(schema as any, val);
    }
  });
});
