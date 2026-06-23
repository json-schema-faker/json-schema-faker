import { describe, test, expect } from "bun:test";
import { generate } from "../../src/index.js";

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
  test("filters root example with optionalsProbability 0", async () => {
    const value = await generate(objectExampleSchema, {
      seed: 1,
      useExamplesValue: true,
      optionalsProbability: 0,
    });

    expect(value).toEqual({ id: "req-1" });
  });

  test("filters root example with requiredOnly", async () => {
    const value = await generate(objectExampleSchema, {
      seed: 1,
      useExamplesValue: true,
      requiredOnly: true,
    } as Parameters<typeof generate>[1]);

    expect(value).toEqual({ id: "req-1" });
  });

  test("alwaysFakeOptionals overrides filtering for root example", async () => {
    const value = await generate(objectExampleSchema, {
      seed: 1,
      useExamplesValue: true,
      optionalsProbability: 0,
      alwaysFakeOptionals: true,
    });

    expect(value).toEqual(objectExampleSchema.example);
  });

  test("filters root default object with optionalsProbability 0", async () => {
    const value = await generate(objectDefaultSchema, {
      seed: 1,
      useDefaultValue: true,
      optionalsProbability: 0,
    });

    expect(value).toEqual({ id: "req-1" });
  });

  test("filters nested optional fields inside root example", async () => {
    const value = await generate(nestedExampleSchema, {
      seed: 1,
      useExamplesValue: true,
      optionalsProbability: 0,
    });

    expect(value).toEqual({ user: { name: "a" } });
  });

  test("uses fixedProbabilities to pick a deterministic optional subset from example", async () => {
    const value = await generate(fixedProbabilitiesSchema, {
      seed: 1,
      useExamplesValue: true,
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
      optionalsProbability: 0,
    }) as Record<string, unknown>;

    expect(Object.keys(value).sort()).toEqual(["id"]);
    expect(["req-1", "req-2"]).toContain(value.id as string);
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
