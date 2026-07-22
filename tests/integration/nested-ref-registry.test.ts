import { describe, expect, test } from "bun:test";
import { generate } from "../../src/index.js";

describe("nested schema $defs registration", () => {
  test("resolves local refs from a reused nested schema document", async () => {
    const mainSchema = {
      $defs: {
        FirstRegistrationData: {
          type: "object",
          additionalProperties: false,
        },
      },
      type: "object",
      additionalProperties: false,
      properties: {
        firstRegistrationData: {
          $ref: "#/$defs/FirstRegistrationData",
        },
      },
    } as const;

    const result = await generate({
      type: "object",
      properties: {
        extras: {
          schema: mainSchema,
        },
      },
      required: ["extras"],
    }, {
      alwaysFakeOptionals: true,
    }) as { extras: { schema: { firstRegistrationData: Record<string, unknown> } } };

    expect(result.extras.schema.firstRegistrationData).toEqual({});
  });

  test("scopes $defs per schema document — conflicting names resolve independently", async () => {
    const schemaA = {
      type: "object",
      $defs: {
        X: { type: "string", const: "from-A" },
      },
      properties: {
        ref: { $ref: "#/$defs/X" },
      },
      required: ["ref"],
    };

    const schemaB = {
      type: "object",
      $defs: {
        X: { type: "string", const: "from-B" },
      },
      properties: {
        ref: { $ref: "#/$defs/X" },
      },
      required: ["ref"],
    };

    const mainSchema = {
      type: "object",
      properties: {
        a: schemaA,
        b: schemaB,
      },
      required: ["a", "b"],
    };

    const result = await generate(mainSchema) as {
      a: { ref: string };
      b: { ref: string };
    };

    // Each nested schema should resolve its own $ref to its own $defs.X
    expect(result.a.ref).toBe("from-A");
    expect(result.b.ref).toBe("from-B");
  });

  test("root $defs are visible to root-level refs while nested $defs are scoped locally", async () => {
    const mainSchema = {
      type: "object",
      $defs: {
        Shared: { type: "string", const: "root-value" },
      },
      properties: {
        nested: {
          type: "object",
          $defs: {
            Shared: { type: "string", const: "nested-value" },
          },
          properties: {
            ref: { $ref: "#/$defs/Shared" },
          },
          required: ["ref"],
        },
        rootRef: { $ref: "#/$defs/Shared" },
      },
      required: ["nested", "rootRef"],
    };

    const result = await generate(mainSchema) as {
      nested: { ref: string };
      rootRef: string;
    };

    // Root $defs are visible to root-level refs
    expect(result.rootRef).toBe("root-value");
    // Nested schema resolves its own $defs.Shared locally (document-local scoping)
    expect(result.nested.ref).toBe("nested-value");
  });
});
