import { describe, test, expect } from "bun:test";
import { generate } from "../../src/index.js";
import { assertValidMultipleSeeds } from "../helpers/validate.js";

describe("string pattern generator", () => {
  test("generates matching simple pattern", () => {
    const schema = { type: "string" as const, pattern: "^[a-z]+$" };
    for (let seed = 1; seed <= 20; seed++) {
      const val = generate(schema, { seed }) as string;
      expect(val).toMatch(/^[a-z]+$/);
    }
  });

  test("generates matching digit pattern", () => {
    const schema = { type: "string" as const, pattern: "^\\d{3}-\\d{4}$" };
    for (let seed = 1; seed <= 20; seed++) {
      const val = generate(schema, { seed }) as string;
      expect(val).toMatch(/^\d{3}-\d{4}$/);
    }
  });

  test("generates matching alternation", () => {
    const schema = { type: "string" as const, pattern: "^(foo|bar|baz)$" };
    for (let seed = 1; seed <= 20; seed++) {
      const val = generate(schema, { seed }) as string;
      expect(val).toMatch(/^(foo|bar|baz)$/);
    }
  });

  test("validates across seeds", () => {
    assertValidMultipleSeeds(
      { type: "string", pattern: "^[A-Z][a-z]{2,5}$" },
      100,
      generate
    );
  });
});

describe("string format generator", () => {
  test("generates valid email", () => {
    assertValidMultipleSeeds({ type: "string", format: "email" }, 50, generate);
  });

  test("generates valid date-time", () => {
    assertValidMultipleSeeds({ type: "string", format: "date-time" }, 50, generate);
  });

  test("generates valid date", () => {
    assertValidMultipleSeeds({ type: "string", format: "date" }, 50, generate);
  });

  test("generates valid time", () => {
    assertValidMultipleSeeds({ type: "string", format: "time" }, 50, generate);
  });

  test("generates valid uri", () => {
    assertValidMultipleSeeds({ type: "string", format: "uri" }, 50, generate);
  });

  test("generates valid uuid", () => {
    assertValidMultipleSeeds({ type: "string", format: "uuid" }, 50, generate);
  });

  test("generates valid ipv4", () => {
    assertValidMultipleSeeds({ type: "string", format: "ipv4" }, 50, generate);
  });

  test("generates valid ipv6", () => {
    assertValidMultipleSeeds({ type: "string", format: "ipv6" }, 50, generate);
  });

  test("generates valid hostname", () => {
    assertValidMultipleSeeds({ type: "string", format: "hostname" }, 50, generate);
  });

  test("generates valid json-pointer", () => {
    assertValidMultipleSeeds({ type: "string", format: "json-pointer" }, 50, generate);
  });
});
