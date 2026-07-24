import { describe, test, expect } from "bun:test";
import { generate } from "../../src/index.js";
import type { JsonSchema } from "../../src/types.js";

const objectExampleSchema = {
  type: "object" as const,
  required: ["id"],
  properties: {
    id: { type: "string" as const },
    name: { type: "string" as const },
    email: { type: "string" as const },
  },
  example: {
    id: "req-1",
    name: "optional-name",
    email: "opt@example.com",
  },
};

const objectDefaultSchema = {
  type: "object" as const,
  required: ["id"],
  properties: {
    id: { type: "string" as const },
    name: { type: "string" as const },
  },
  default: {
    id: "req-1",
    name: "optional-name",
  },
};

const nestedExampleSchema = {
  type: "object" as const,
  required: ["user"],
  properties: {
    user: {
      type: "object" as const,
      required: ["name"],
      properties: {
        name: { type: "string" as const },
        email: { type: "string" as const },
      },
    },
    optionalMeta: { type: "string" as const },
  },
  example: {
    user: { name: "a", email: "b" },
    optionalMeta: "x",
  },
};

const fixedProbabilitiesSchema = {
  type: "object" as const,
  properties: {
    optionalProperty1: { type: "number" as const },
    optionalProperty2: { type: "number" as const },
    optionalProperty3: { type: "number" as const },
    optionalProperty4: { type: "number" as const },
    optionalProperty5: { type: "number" as const },
  },
  example: {
    optionalProperty1: 1,
    optionalProperty2: 2,
    optionalProperty3: 3,
    optionalProperty4: 4,
    optionalProperty5: 5,
  },
};

const nestedAllOfExampleSchema = {
  type: "object" as const,
  required: ["id", "meta"],
  properties: {
    id: { type: "string" as const },
    meta: {
      properties: {},
      allOf: [
        { properties: { a: { type: "string" as const } }, required: ["a"] } as JsonSchema,
        { properties: { b: { type: "string" as const } }, required: ["a"] } as JsonSchema,
      ],
    },
  },
  example: {
    id: "req-1",
    meta: { a: "req-a", b: "opt-b" },
  },
};

const noDeclaredPropertiesSchema = {
  type: "object" as const,
  example: { a: 1, b: 2 },
};

const nestedSchemalessExampleSchema = {
  type: "object" as const,
  required: ["id", "meta"],
  properties: {
    id: { type: "string" as const },
    meta: {},
  },
  example: {
    id: "req-1",
    meta: { x: 1, y: 2 },
  },
};

const examplesArraySchema = {
  type: "object" as const,
  required: ["id"],
  properties: {
    id: { type: "string" as const },
    name: { type: "string" as const },
  },
  examples: [
    { id: "req-1", name: "optional-name" },
    { id: "req-2", name: "other-name" },
  ],
};

describe("example/default optional filtering", () => {
  test("returns example verbatim when filterExampleDefaults is not set", async () => {
    const value = await generate(objectExampleSchema, {
      seed: 1,
      useExamplesValue: true,
      optionalsProbability: 0,
    });

    expect(value).toEqual(objectExampleSchema.example);
  });

  test("returns default verbatim when filterExampleDefaults is not set", async () => {
    const value = await generate(objectDefaultSchema, {
      seed: 1,
      useDefaultValue: true,
      optionalsProbability: 0,
    });

    expect(value).toEqual(objectDefaultSchema.default);
  });

  test("filters root example with optionalsProbability 0", async () => {
    const value = await generate(objectExampleSchema, {
      seed: 1,
      useExamplesValue: true,
      filterExampleDefaults: true,
      optionalsProbability: 0,
    });

    expect(value).toEqual({ id: "req-1" });
  });

  test("filters root example with requiredOnly", async () => {
    const value = await generate(objectExampleSchema, {
      seed: 1,
      useExamplesValue: true,
      filterExampleDefaults: true,
      requiredOnly: true,
    } as Parameters<typeof generate>[1]);

    expect(value).toEqual({ id: "req-1" });
  });

  test("alwaysFakeOptionals overrides filtering for root example", async () => {
    const value = await generate(objectExampleSchema, {
      seed: 1,
      useExamplesValue: true,
      filterExampleDefaults: true,
      optionalsProbability: 0,
      alwaysFakeOptionals: true,
    });

    expect(value).toEqual(objectExampleSchema.example);
  });

  test("filters root default object with optionalsProbability 0", async () => {
    const value = await generate(objectDefaultSchema, {
      seed: 1,
      useDefaultValue: true,
      filterExampleDefaults: true,
      optionalsProbability: 0,
    });

    expect(value).toEqual({ id: "req-1" });
  });

  test("filters nested optional fields inside root example", async () => {
    const value = await generate(nestedExampleSchema, {
      seed: 1,
      useExamplesValue: true,
      filterExampleDefaults: true,
      optionalsProbability: 0,
    });

    expect(value).toEqual({ user: { name: "a" } });
  });

  test("uses fixedProbabilities to pick a deterministic optional subset from example", async () => {
    const value = await generate(fixedProbabilitiesSchema, {
      seed: 1,
      useExamplesValue: true,
      filterExampleDefaults: true,
      fixedProbabilities: true,
      optionalsProbability: 0.5,
    });

    expect(value).toEqual({
      optionalProperty1: 1,
      optionalProperty2: 2,
      optionalProperty3: 3,
    });
  });

  test("filters object picked from root examples array", async () => {
    const value = await generate(examplesArraySchema, {
      seed: 1,
      useExamplesValue: true,
      filterExampleDefaults: true,
      optionalsProbability: 0,
    }) as Record<string, unknown>;

    expect(Object.keys(value).sort()).toEqual(["id"]);
    expect(["req-1", "req-2"]).toContain(value.id as string);
  });

  test("keeps additionalProperties keys not declared in schema.properties", async () => {
    const value = await generate(
      {
        type: "object" as const,
        required: ["id"],
        properties: { id: { type: "string" as const } },
        additionalProperties: true,
        example: { id: "req-1", extraField: "should-stay" },
      },
      {
        seed: 1,
        useExamplesValue: true,
        filterExampleDefaults: true,
        optionalsProbability: 0,
      }
    );

    expect(value).toEqual({ id: "req-1", extraField: "should-stay" });
  });

  test("merges properties and required from allOf branches on a nested schema", async () => {
    const value = await generate(nestedAllOfExampleSchema, {
      seed: 1,
      useExamplesValue: true,
      filterExampleDefaults: true,
      optionalsProbability: 0,
    });

    expect(value).toEqual({ id: "req-1", meta: { a: "req-a" } });
  });

  test("keeps example verbatim when schema declares no filterable properties", async () => {
    const value = await generate(noDeclaredPropertiesSchema, {
      seed: 1,
      useExamplesValue: true,
      filterExampleDefaults: true,
      optionalsProbability: 0,
    });

    expect(value).toEqual({ a: 1, b: 2 });
  });

  test("keeps a nested value verbatim when its schema declares no filterable properties", async () => {
    const value = await generate(nestedSchemalessExampleSchema, {
      seed: 1,
      useExamplesValue: true,
      filterExampleDefaults: true,
      optionalsProbability: 0,
    });

    expect(value).toEqual({ id: "req-1", meta: { x: 1, y: 2 } });
  });

  test("does not filter non-object example values", async () => {
    const value = await generate(
      {
        type: "string" as const,
        example: "hello",
      },
      {
        seed: 1,
        useExamplesValue: true,
        optionalsProbability: 0,
      }
    );

    expect(value).toBe("hello");
  });
});
