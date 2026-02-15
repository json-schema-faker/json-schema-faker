import { describe, test, expect } from "bun:test";
import { generate } from "../../src/index.js";
import { assertValid, assertValidMultipleSeeds } from "../helpers/validate.js";

describe("null generator", () => {
  test("generates null", () => {
    expect(generate({ type: "null" })).toBe(null);
  });

  test("validates", () => {
    assertValid({ type: "null" }, generate({ type: "null" }));
  });
});

describe("boolean generator", () => {
  test("generates boolean", () => {
    const val = generate({ type: "boolean" });
    expect(typeof val).toBe("boolean");
  });

  test("validates across seeds", () => {
    assertValidMultipleSeeds({ type: "boolean" }, 50, generate);
  });
});

describe("number generator", () => {
  test("generates number", () => {
    const val = generate({ type: "number" });
    expect(typeof val).toBe("number");
  });

  test("respects minimum/maximum", () => {
    const schema = { type: "number" as const, minimum: 10, maximum: 20 };
    for (let seed = 1; seed <= 50; seed++) {
      const val = generate(schema, { seed }) as number;
      expect(val).toBeGreaterThanOrEqual(10);
      expect(val).toBeLessThanOrEqual(20);
    }
  });

  test("respects exclusiveMinimum/exclusiveMaximum", () => {
    const schema = { type: "number" as const, exclusiveMinimum: 0, exclusiveMaximum: 1 };
    for (let seed = 1; seed <= 50; seed++) {
      const val = generate(schema, { seed }) as number;
      expect(val).toBeGreaterThan(0);
      expect(val).toBeLessThan(1);
    }
  });

  test("respects multipleOf", () => {
    const schema = { type: "number" as const, multipleOf: 5, minimum: 0, maximum: 100 };
    for (let seed = 1; seed <= 50; seed++) {
      const val = generate(schema, { seed }) as number;
      expect(val % 5).toBe(0);
    }
  });

  test("validates across seeds", () => {
    assertValidMultipleSeeds(
      { type: "number", minimum: -50, maximum: 50, multipleOf: 0.5 },
      100,
      generate
    );
  });
});

describe("integer generator", () => {
  test("generates integer", () => {
    const val = generate({ type: "integer" });
    expect(Number.isInteger(val)).toBe(true);
  });

  test("respects bounds", () => {
    const schema = { type: "integer" as const, minimum: 1, maximum: 10 };
    for (let seed = 1; seed <= 50; seed++) {
      const val = generate(schema, { seed }) as number;
      expect(val).toBeGreaterThanOrEqual(1);
      expect(val).toBeLessThanOrEqual(10);
      expect(Number.isInteger(val)).toBe(true);
    }
  });

  test("validates across seeds", () => {
    assertValidMultipleSeeds(
      { type: "integer", minimum: 0, maximum: 1000 },
      100,
      generate
    );
  });
});

describe("string generator", () => {
  test("generates string", () => {
    const val = generate({ type: "string" });
    expect(typeof val).toBe("string");
  });

  test("respects minLength/maxLength", () => {
    const schema = { type: "string" as const, minLength: 5, maxLength: 10 };
    for (let seed = 1; seed <= 50; seed++) {
      const val = generate(schema, { seed }) as string;
      expect(val.length).toBeGreaterThanOrEqual(5);
      expect(val.length).toBeLessThanOrEqual(10);
    }
  });

  test("validates across seeds", () => {
    assertValidMultipleSeeds(
      { type: "string", minLength: 3, maxLength: 20 },
      100,
      generate
    );
  });
});

describe("enum/const generator", () => {
  test("generates const value", () => {
    expect(generate({ const: 42 })).toBe(42);
  });

  test("picks from enum", () => {
    const schema = { enum: [1, "two", null, true] };
    for (let seed = 1; seed <= 50; seed++) {
      const val = generate(schema, { seed });
      expect([1, "two", null, true]).toContain(val as any);
    }
  });

  test("validates across seeds", () => {
    assertValidMultipleSeeds({ enum: ["a", "b", "c"] }, 100, generate);
  });
});
