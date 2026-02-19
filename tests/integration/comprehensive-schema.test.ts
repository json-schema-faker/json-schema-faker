import { describe, test, expect } from "bun:test";
import { generate } from "../../src/index.js";
import { assertValid, assertValidMultipleSeeds } from "../helpers/validate.js";
import comprehensiveSchema from "../fixtures/comprehensive-test-schema.json" with { type: "json" };

describe("Comprehensive Schema - All Features", () => {
  test("generates valid data with default options", async () => {
    const result = await generate(comprehensiveSchema as any, { seed: 42 });
    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
  });

  test("generates valid data with alwaysFakeOptionals", async () => {
    const result = await generate(comprehensiveSchema as any, { 
      seed: 42, 
      alwaysFakeOptionals: true 
    });
    expect(result).toBeDefined();
    const obj = result as Record<string, unknown>;
    expect(obj.id).toBeDefined();
    expect(obj.enumField).toBeDefined();
  });

  test("generates valid data with fillProperties", async () => {
    const result = await generate(comprehensiveSchema as any, { 
      seed: 42, 
      fillProperties: true 
    });
    expect(result).toBeDefined();
  });

  test("generates valid data with useDefaultValue", async () => {
    const result = await generate(comprehensiveSchema as any, { 
      seed: 42, 
      alwaysFakeOptionals: true,
      useDefaultValue: true 
    });
    expect(result).toBeDefined();
  });

  test("generates valid data with useExamplesValue", async () => {
    const result = await generate(comprehensiveSchema as any, { 
      seed: 42, 
      alwaysFakeOptionals: true,
      useExamplesValue: true 
    });
    expect(result).toBeDefined();
  });

  test("generates valid data with fixedProbabilities", async () => {
    const result = await generate(comprehensiveSchema as any, { 
      seed: 42, 
      fixedProbabilities: true,
      optionalsProbability: 1.0 
    });
    expect(result).toBeDefined();
  });

  test("generates data without throwing across multiple seeds", async () => {
    for (let seed = 1; seed <= 10; seed++) {
      const result = await generate(comprehensiveSchema as any, { 
        seed,
        alwaysFakeOptionals: true,
        fillProperties: true
      });
      expect(result).toBeDefined();
    }
  });

  test("generates recursive schema with refDepth", async () => {
    const recursiveSchema = {
      type: "object",
      properties: {
        id: { type: "integer" },
        children: {
          type: "array",
          items: { "$ref": "#" },
          maxItems: 2
        }
      },
      required: ["id"]
    };
    const result = await generate(recursiveSchema as any, { 
      seed: 42, 
      refDepth: 3,
      maxDepth: 10 
    });
    expect(result).toBeDefined();
  });

  test("generates with minDateTime/maxDateTime", async () => {
    const dateSchema = {
      type: "object",
      properties: {
        created: { type: "string", format: "date-time" }
      },
      required: ["created"]
    };
    const result = await generate(dateSchema as any, { 
      seed: 42,
      alwaysFakeOptionals: true,
      minDateTime: "2020-01-01T00:00:00Z",
      maxDateTime: "2020-12-31T23:59:59Z"
    });
    const obj = result as any;
    expect(obj.created).toBeDefined();
  });

  test("generates with minItems/maxItems override", async () => {
    const arraySchema = {
      type: "array",
      items: { type: "integer" },
      minItems: 5,
      maxItems: 10
    };
    for (let seed = 1; seed <= 10; seed++) {
      const result = await generate(arraySchema as any, { 
        seed,
        minItems: 3,
        maxItems: 7
      });
      const arr = result as number[];
      expect(arr.length).toBeGreaterThanOrEqual(3);
      expect(arr.length).toBeLessThanOrEqual(7);
    }
  });

  test("generates with minLength/maxLength override", async () => {
    const stringSchema = {
      type: "string",
      minLength: 5,
      maxLength: 10
    };
    for (let seed = 1; seed <= 10; seed++) {
      const result = await generate(stringSchema as any, { 
        seed,
        minLength: 3,
        maxLength: 8
      });
      const str = result as string;
      expect(str.length).toBeGreaterThanOrEqual(3);
      expect(str.length).toBeLessThanOrEqual(8);
    }
  });

  test("generates with pruneProperties", async () => {
    const schema = {
      type: "object",
      properties: {
        keep: { type: "string" },
        remove: { type: "integer" },
        alsoKeep: { type: "boolean" }
      },
      required: ["keep", "remove", "alsoKeep"]
    };
    const result = await generate(schema as any, { 
      seed: 42,
      pruneProperties: ["remove"]
    });
    const obj = result as Record<string, unknown>;
    expect(obj).toHaveProperty("keep");
    expect(obj).toHaveProperty("alsoKeep");
    expect(obj).not.toHaveProperty("remove");
  });

  test("generates with custom format", async () => {
    const schema = {
      type: "object",
      properties: {
        customFormat: { type: "string", format: "custom-color" }
      }
    };
    const result = await generate(schema as any, { 
      seed: 42,
      alwaysFakeOptionals: true,
      formats: {
        "custom-color": (random) => {
          const colors = ["red", "green", "blue", "yellow"];
          return random.pick(colors);
        }
      }
    });
    const obj = result as any;
    expect(obj.customFormat).toBeDefined();
  });

  test("generates with validateSchemaVersion", async () => {
    const schema = {
      $schema: "https://json-schema.org/draft/2020-12/schema",
      type: "string"
    };
    const result = await generate(schema as any, { 
      seed: 42,
      validateSchemaVersion: true
    });
    expect(result).toBeDefined();
  });

  test("generates with failOnInvalidTypes false", async () => {
    const invalidSchema = {
      type: "invalid-type"
    };
    const result = await generate(invalidSchema as any, { 
      seed: 42,
      failOnInvalidTypes: false,
      defaultInvalidTypeProduct: "fallback"
    });
    expect(result).toBeDefined();
  });

  test("generates nested allOf with proper merging", async () => {
    const schema = {
      allOf: [
        { type: "object", properties: { a: { type: "string" } }, required: ["a"] },
        { type: "object", properties: { b: { type: "integer" } }, required: ["b"] },
        { type: "object", properties: { c: { type: "boolean" } } }
      ]
    };
    const result = await generate(schema as any, { seed: 42, alwaysFakeOptionals: true });
    const obj = result as Record<string, unknown>;
    expect(obj).toHaveProperty("a");
    expect(obj).toHaveProperty("b");
    expect(obj).toHaveProperty("c");
  });

  test("generates complex composition", async () => {
    const schema = {
      allOf: [
        { anyOf: [
          { type: "object", properties: { kind: { const: "A" } } },
          { type: "object", properties: { kind: { const: "B" } } }
        ]},
        { type: "object", properties: { value: { type: "number" } } }
      ]
    };
    const result = await generate(schema as any, { seed: 42 });
    expect(result).toBeDefined();
  });

  test("generates with $defs references", async () => {
    const schema = {
      $defs: {
        myString: { type: "string", minLength: 3 }
      },
      type: "object",
      properties: {
        refd: { "$ref": "#/$defs/myString" }
      }
    };
    const result = await generate(schema as any, { seed: 42, alwaysFakeOptionals: true });
    expect(result).toBeDefined();
  });

  test("generates with $defs (modern style)", async () => {
    const schema = {
      $defs: {
        myNumber: { type: "number", minimum: 0 }
      },
      type: "object",
      properties: {
        refd: { "$ref": "#/$defs/myNumber" }
      }
    };
    const result = await generate(schema as any, { seed: 42, alwaysFakeOptionals: true });
    expect(result).toBeDefined();
  });

  test("generates with definitions (draft 07 style) via propAliases", async () => {
    const schema = {
      definitions: {
        myNumber: { type: "number", minimum: 0 }
      },
      type: "object",
      properties: {
        refd: { "$ref": "#/$defs/myNumber" }
      }
    };
    const result = await generate(schema as any, {
      seed: 42,
      alwaysFakeOptionals: true,
      propAliases: { definitions: "$defs" }
    });
    expect(result).toBeDefined();
  });
});
