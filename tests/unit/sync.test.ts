import { describe, test, expect, afterEach } from "bun:test";
import { generateSync, createGeneratorSync, define, reset } from "../../src/index.js";

describe("generateSync", () => {
  afterEach(() => {
    reset();
  });

  test("generates values synchronously", () => {
    const result = generateSync({
      type: "object",
      required: ["id", "name"],
      properties: {
        id: { type: "integer", minimum: 1, maximum: 10 },
        name: { type: "string", minLength: 3 },
      },
    }, { seed: 1 }) as Record<string, unknown>;

    expect(typeof result.id).toBe("number");
    expect(typeof result.name).toBe("string");
  });

  test("resolves local refs synchronously", () => {
    const result = generateSync({
      type: "object",
      required: ["user"],
      properties: {
        user: { $ref: "#/$defs/user" },
      },
      $defs: {
        user: {
          type: "object",
          required: ["name"],
          properties: {
            name: { const: "Ada" },
          },
        },
      },
    }) as { user: { name: string } };

    expect(result.user.name).toBe("Ada");
  });

  test("throws for remote refs", () => {
    expect(() => generateSync({ $ref: "https://example.com/schema.json" })).toThrow(
      "Remote $ref 'https://example.com/schema.json' cannot be resolved in generateSync()"
    );
  });

  test("throws when refResolver is provided", () => {
    expect(() => generateSync(
      { $ref: "external" },
      { refResolver: () => ({ type: "string" }) } as never
    )).toThrow("generateSync() cannot use refResolver");
  });

  test("throws for async extensions", () => {
    define("asyncValue", async function () {
      return "value";
    });

    expect(() => generateSync({ type: "string", asyncValue: true })).toThrow(
      "Cannot use async extension 'asyncValue' in generateSync()"
    );
  });

  test("throws for async outputTransform", () => {
    expect(() => generateSync(
      { type: "string" },
      {
        outputTransform: async (value) => value,
      }
    )).toThrow("Cannot use async outputTransform in generateSync()");
  });

  test("createGeneratorSync increments seeds per call", () => {
    const schema = { type: "integer", minimum: 1, maximum: 100 };
    const generator = createGeneratorSync({ seed: 1 });

    const first = generator.generate(schema);
    const second = generator.generate(schema);

    expect(typeof first).toBe("number");
    expect(typeof second).toBe("number");
    expect(first).not.toBe(second);
  });

  test("generates patternProperties keys that satisfy minProperties", () => {
    const schema = {
      type: "object",
      patternProperties: {
        "^hyb$": { type: "string" },
      },
      additionalProperties: false,
      minProperties: 1,
    } as const;

    for (let seed = 1; seed <= 20; seed++) {
      const result = generateSync(schema, { seed }) as Record<string, unknown>;
      const keys = Object.keys(result);
      expect(keys.length).toBeGreaterThan(0);
      for (const key of keys) {
        expect(/^hyb$/.test(key)).toBe(true);
      }
    }
  });
});
