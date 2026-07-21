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
});
