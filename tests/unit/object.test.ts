import { describe, test, expect } from "bun:test";
import { generate } from "../../src/index.js";
import { assertValid, assertValidMultipleSeeds } from "../helpers/validate.js";

describe("object generator", () => {
  test("generates empty object for bare type", async () => {
    const val = await generate({ type: "object" });
    expect(typeof val).toBe("object");
    expect(val).not.toBe(null);
  });

  test("generates required properties", async () => {
    const schema = {
      type: "object" as const,
      properties: {
        name: { type: "string" as const },
        age: { type: "integer" as const, minimum: 0, maximum: 150 },
      },
      required: ["name", "age"],
    };
    const val = await generate(schema) as Record<string, unknown>;
    expect(val).toHaveProperty("name");
    expect(val).toHaveProperty("age");
    expect(typeof val.name).toBe("string");
    expect(typeof val.age).toBe("number");
  });

  test("respects additionalProperties: false", async () => {
    const schema = {
      type: "object" as const,
      properties: {
        x: { type: "number" as const },
      },
      required: ["x"],
      additionalProperties: false,
    };
    await assertValidMultipleSeeds(schema, 50, generate);
  });

  test("respects minProperties", async () => {
    const schema = {
      type: "object" as const,
      minProperties: 3,
    };
    for (let seed = 1; seed <= 20; seed++) {
      const val = await generate(schema, { seed }) as Record<string, unknown>;
      expect(Object.keys(val).length).toBeGreaterThanOrEqual(3);
    }
  });

  test("respects maxProperties", async () => {
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
      const val = await generate(schema, { seed }) as Record<string, unknown>;
      expect(Object.keys(val).length).toBeLessThanOrEqual(2);
    }
  });

  test("validates across seeds", async () => {
    const schema = {
      type: "object" as const,
      properties: {
        id: { type: "integer" as const, minimum: 1 },
        name: { type: "string" as const, minLength: 1 },
        active: { type: "boolean" as const },
      },
      required: ["id", "name"],
    };
    await assertValidMultipleSeeds(schema, 100, generate);
  });

  describe("github issues", () => {
    test.skip("issue #846: meta data used as properties", async () => {
      const schema = {
        $schema: "http://json-schema.org/draft-07/schema#",
        $id: "test",
        description: "test",
        type: "object",
        properties: {
          nested: {
            $ref: "#/definitions/Nested",
          },
        },
        required: ["nested"],
        additionalProperties: false,
        definitions: {
          Nested: {
            description: "This won't be in the generated data!",
            type: "object",
            properties: {
              no_bug_here: {
                $ref: "#/definitions/CorruptedWhenNested",
              },
              buggedPropertyWhenNested: {
                type: "object",
                $ref: "#/definitions/Nested2",
              },
            },
            additionalProperties: false,
          },
          CorruptedWhenNested: {
            type: "object",
            properties: {
              buggedProperty: {
                $ref: "#/definitions/NestedDefinitionWhichGetsCorrupted",
              },
              buggedProperties: {
                type: "array",
                items: {
                  $ref: "#/definitions/NestedDefinitionWhichGetsCorrupted",
                },
              },
            },
            additionalProperties: false,
          },
          NestedDefinitionWhichGetsCorrupted: {
            type: "object",
            properties: {
              name: {
                type: "string",
              },
              address: {
                type: "string",
              },
            },
            additionalProperties: false,
          },
          Nested2: {
            type: "object",
            properties: {
              will_bug_here: {
                $ref: "#/definitions/CorruptedWhenNested",
              },
            },
            additionalProperties: false,
          },
        },
      };

      const val = await generate(schema as any);
      expect(val).not.toHaveProperty("description");
      assertValid(schema as any, val);
    });
  });
});
