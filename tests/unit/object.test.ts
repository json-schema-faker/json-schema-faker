import { describe, test, expect } from "bun:test";
import { generate } from "../../src/index.js";
import { assertValid, assertValidMultipleSeeds } from "../helpers/validate.js";

describe("object generator", () => {
  test("generates empty object for bare type", () => {
    const val = generate({ type: "object" });
    expect(typeof val).toBe("object");
    expect(val).not.toBe(null);
  });

  test("generates required properties", () => {
    const schema = {
      type: "object" as const,
      properties: {
        name: { type: "string" as const },
        age: { type: "integer" as const, minimum: 0, maximum: 150 },
      },
      required: ["name", "age"],
    };
    const val = generate(schema) as Record<string, unknown>;
    expect(val).toHaveProperty("name");
    expect(val).toHaveProperty("age");
    expect(typeof val.name).toBe("string");
    expect(typeof val.age).toBe("number");
  });

  test("respects additionalProperties: false", () => {
    const schema = {
      type: "object" as const,
      properties: {
        x: { type: "number" as const },
      },
      required: ["x"],
      additionalProperties: false,
    };
    assertValidMultipleSeeds(schema, 50, generate);
  });

  test("respects minProperties", () => {
    const schema = {
      type: "object" as const,
      minProperties: 3,
    };
    for (let seed = 1; seed <= 20; seed++) {
      const val = generate(schema, { seed }) as Record<string, unknown>;
      expect(Object.keys(val).length).toBeGreaterThanOrEqual(3);
    }
  });

  test("respects maxProperties", () => {
    const schema = {
      type: "object" as const,
      properties: {
        a: { type: "string" as const },
        b: { type: "string" as const },
        c: { type: "string" as const },
        d: { type: "string" as const },
        e: { type: "string" as const },
      },
      maxProperties: 2,
    };
    for (let seed = 1; seed <= 20; seed++) {
      const val = generate(schema, { seed }) as Record<string, unknown>;
      expect(Object.keys(val).length).toBeLessThanOrEqual(2);
    }
  });

  test("validates across seeds", () => {
    const schema = {
      type: "object" as const,
      properties: {
        id: { type: "integer" as const, minimum: 1 },
        name: { type: "string" as const, minLength: 1 },
        active: { type: "boolean" as const },
      },
      required: ["id", "name"],
    };
    assertValidMultipleSeeds(schema, 100, generate);
  });
});
