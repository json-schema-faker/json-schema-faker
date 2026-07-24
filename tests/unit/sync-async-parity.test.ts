import { describe, test, expect } from "bun:test";
import { generate, generateSync, type JsonSchema } from "../../src/index.js";

// Both generate() and generateSync() drive the exact same generator core
// (see src/schema-walker.ts's walkGen). For any schema that never touches
// ctx.refResolver, an async jsf.define() callback, or an async outputTransform,
// the two drivers must produce byte-identical output for the same seed —
// any divergence here means the sync/async paths have drifted apart again.
const SCHEMAS: Array<{ name: string; schema: JsonSchema }> = [
  {
    name: "object with required + optional",
    schema: {
      type: "object",
      required: ["id", "name"],
      properties: {
        id: { type: "integer", minimum: 1, maximum: 1000 },
        name: { type: "string", minLength: 3, maxLength: 12 },
        nickname: { type: "string" },
      },
    },
  },
  {
    name: "nested objects",
    schema: {
      type: "object",
      required: ["user"],
      properties: {
        user: {
          type: "object",
          required: ["profile"],
          properties: {
            profile: {
              type: "object",
              required: ["age"],
              properties: { age: { type: "integer", minimum: 0, maximum: 99 } },
            },
          },
        },
      },
    },
  },
  {
    name: "array with items",
    schema: { type: "array", items: { type: "string" }, minItems: 2, maxItems: 5 },
  },
  {
    name: "array with prefixItems + contains + uniqueItems",
    schema: {
      type: "array",
      prefixItems: [{ type: "string" }, { type: "integer" }],
      items: { type: "boolean" },
      contains: { const: "must-have" },
      uniqueItems: true,
      minItems: 4,
      maxItems: 8,
    },
  },
  {
    name: "allOf",
    schema: {
      allOf: [
        { type: "object", properties: { a: { type: "string" } }, required: ["a"] },
        { type: "object", properties: { b: { type: "integer" } }, required: ["b"] },
      ],
    },
  },
  {
    name: "oneOf",
    schema: {
      oneOf: [
        { type: "object", properties: { kind: { const: "cat" }, meow: { type: "boolean" } }, required: ["kind", "meow"] },
        { type: "object", properties: { kind: { const: "dog" }, bark: { type: "boolean" } }, required: ["kind", "bark"] },
      ],
    },
  },
  {
    name: "anyOf",
    schema: { anyOf: [{ type: "string" }, { type: "integer" }] },
  },
  {
    name: "if/then/else",
    schema: {
      type: "object",
      properties: { isMember: { type: "boolean" } },
      required: ["isMember"],
      if: { properties: { isMember: { const: true } } },
      then: { properties: { discount: { type: "integer", minimum: 5, maximum: 20 } }, required: ["discount"] },
      else: { properties: { discount: { const: 0 } }, required: ["discount"] },
    },
  },
  {
    name: "not",
    schema: { not: { type: "string" } },
  },
  {
    name: "enum/const",
    schema: {
      type: "object",
      properties: { status: { enum: ["active", "inactive", "pending"] }, kind: { const: "fixed" } },
      required: ["status", "kind"],
    },
  },
  {
    name: "local $ref + $defs",
    schema: {
      type: "object",
      required: ["user"],
      properties: { user: { $ref: "#/$defs/user" } },
      $defs: {
        user: {
          type: "object",
          required: ["name"],
          properties: { name: { type: "string" } },
        },
      },
    },
  },
  {
    name: "patternProperties",
    schema: {
      type: "object",
      patternProperties: { "^hyb$": { type: "string" } },
      additionalProperties: false,
      minProperties: 1,
    },
  },
  {
    name: "dependencies",
    schema: {
      type: "object",
      properties: { credit_card: { type: "string" } },
      dependencies: {
        credit_card: { properties: { billing_address: { type: "string" } }, required: ["billing_address"] },
      },
      required: ["credit_card"],
    },
  },
  {
    name: "pruneProperties source",
    schema: {
      type: "object",
      required: ["keep", "drop"],
      properties: { keep: { type: "string" }, drop: { type: "string" } },
    },
  },
];

describe("generate()/generateSync() parity", () => {
  for (const { name, schema } of SCHEMAS) {
    for (const seed of [1, 2, 3, 42, 12345]) {
      test(`identical output for seed=${seed}: ${name}`, async () => {
        const asyncResult = await generate(schema, { seed });
        const syncResult = generateSync(schema, { seed });
        expect(syncResult).toEqual(asyncResult);
      });
    }
  }

  test("propAliases: identical output for seed=1", async () => {
    const schema = {
      definitions: { myNumber: { type: "number", minimum: 0, maximum: 100 } },
      type: "object",
      required: ["refd"],
      properties: { refd: { $ref: "#/$defs/myNumber" } },
    } as unknown as JsonSchema;
    const options = { seed: 1, propAliases: { definitions: "$defs" } };
    const asyncResult = await generate(schema, options);
    const syncResult = generateSync(schema, options);
    expect(syncResult).toEqual(asyncResult);
  });

  test("pruneProperties: identical output for seed=1", async () => {
    const schema: JsonSchema = {
      type: "object",
      required: ["keep", "drop"],
      properties: { keep: { type: "string" }, drop: { type: "string" } },
    };
    const options = { seed: 1, pruneProperties: ["drop"] };
    const asyncResult = await generate(schema, options);
    const syncResult = generateSync(schema, options);
    expect(syncResult).toEqual(asyncResult);
  });
});
