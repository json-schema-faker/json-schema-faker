import { describe, test, expect } from "bun:test";
import { generate } from "../../src/index.js";
import { assertValid, assertValidMultipleSeeds } from "../helpers/validate.js";

describe("null generator", () => {
  test("generates null", async () => {
    expect(await generate({ type: "null" })).toBe(null);
  });

  test("validates", async () => {
    assertValid({ type: "null" }, await generate({ type: "null" }));
  });
});

describe("boolean generator", () => {
  test("generates boolean", async () => {
    const val = await generate({ type: "boolean" });
    expect(typeof val).toBe("boolean");
  });

  test("validates across seeds", async () => {
    await assertValidMultipleSeeds({ type: "boolean" }, 50, generate);
  });
});

describe("number generator", () => {
  test("generates number", async () => {
    const val = await generate({ type: "number" });
    expect(typeof val).toBe("number");
  });

  test("respects minimum/maximum", async () => {
    const schema = { type: "number" as const, minimum: 10, maximum: 20 };
    for (let seed = 1; seed <= 50; seed++) {
      const val = await generate(schema, { seed }) as number;
      expect(val).toBeGreaterThanOrEqual(10);
      expect(val).toBeLessThanOrEqual(20);
    }
  });

  test("respects exclusiveMinimum/exclusiveMaximum", async () => {
    const schema = { type: "number" as const, exclusiveMinimum: 0, exclusiveMaximum: 1 };
    for (let seed = 1; seed <= 50; seed++) {
      const val = await generate(schema, { seed }) as number;
      expect(val).toBeGreaterThan(0);
      expect(val).toBeLessThan(1);
    }
  });

  test("respects multipleOf", async () => {
    const schema = { type: "number" as const, multipleOf: 5, minimum: 0, maximum: 100 };
    for (let seed = 1; seed <= 50; seed++) {
      const val = await generate(schema, { seed }) as number;
      expect(val % 5).toBe(0);
    }
  });

  test("validates across seeds", async () => {
    await assertValidMultipleSeeds(
      { type: "number", minimum: -50, maximum: 50, multipleOf: 0.5 },
      100,
      generate
    );
  });
});

describe("integer generator", () => {
  test("generates integer", async () => {
    const val = await generate({ type: "integer" });
    expect(Number.isInteger(val)).toBe(true);
  });

  test("respects bounds", async () => {
    const schema = { type: "integer" as const, minimum: 1, maximum: 10 };
    for (let seed = 1; seed <= 50; seed++) {
      const val = await generate(schema, { seed }) as number;
      expect(val).toBeGreaterThanOrEqual(1);
      expect(val).toBeLessThanOrEqual(10);
      expect(Number.isInteger(val)).toBe(true);
    }
  });

  test("validates across seeds", async () => {
    await assertValidMultipleSeeds(
      { type: "integer", minimum: 0, maximum: 1000 },
      100,
      generate
    );
  });
});

describe("string generator", () => {
  test("generates string", async () => {
    const val = await generate({ type: "string" });
    expect(typeof val).toBe("string");
  });

  test("respects minLength/maxLength", async () => {
    const schema = { type: "string" as const, minLength: 5, maxLength: 10 };
    for (let seed = 1; seed <= 50; seed++) {
      const val = await generate(schema, { seed }) as string;
      expect(val.length).toBeGreaterThanOrEqual(5);
      expect(val.length).toBeLessThanOrEqual(10);
    }
  });

  test("validates across seeds", async () => {
    await assertValidMultipleSeeds(
      { type: "string", minLength: 3, maxLength: 20 },
      100,
      generate
    );
  });
});

describe("enum/const generator", () => {
  test("generates const value", async () => {
    expect(await generate({ const: 42 })).toBe(42);
  });

  test("picks from enum", async () => {
    const schema = { enum: [1, "two", null, true] };
    for (let seed = 1; seed <= 50; seed++) {
      const val = await generate(schema, { seed });
      expect([1, "two", null, true]).toContain(val as any);
    }
  });

  test("validates across seeds", async () => {
    await assertValidMultipleSeeds({ enum: ["a", "b", "c"] }, 100, generate);
  });

  describe("github issues", () => {
    test("issue #728: invalid enums when using refs multiple times", async () => {
      const schema = {
        type: "object",
        properties: {
          prop1: { $ref: "#/$defs/EnumType", description: "My prop1 description." },
          prop2: { $ref: "#/$defs/PropType", description: "My prop2 description." },
          prop3: { $ref: "#/$defs/EnumType", description: "My prop3 description." },
          prop4: { $ref: "#/$defs/PropType", description: "My prop4 description." },
        },
        required: ["prop1", "prop2", "prop3", "prop4"],
        additionalProperties: false,
        $defs: {
          EnumType: { type: "string", enum: ["Value1", "Value2"], description: "My enum description." },
          PropType: {
            type: "object",
            properties: { subProp: { $ref: "#/$defs/EnumType", description: "Sub Prop Description" } },
            additionalProperties: false,
          },
        },
      };

      const val = await generate(schema as any, { alwaysFakeOptionals: true });
      expect(val).toHaveProperty("prop1");
      expect(val).toHaveProperty("prop2");
      expect(val).toHaveProperty("prop3");
      expect(val).toHaveProperty("prop4");

      assertValid(schema as any, val);
    });
  });
});
