import { describe, test, expect } from "bun:test";
import { generate } from "../../src/index.js";
import type { JsonSchema } from "../../src/types.js";

describe("outputTransform", () => {
  test("transforms generated values using output-tree paths", async () => {
    const seenPaths: string[] = [];
    const value = await generate({
      type: "object",
      properties: {
        user: {
          type: "object",
          properties: {
            name: { type: "string" },
            age: { type: "integer" },
          },
          required: ["name", "age"],
        },
      },
      required: ["user"],
    }, {
      seed: 7,
      outputTransform: (current, _schema, path) => {
        seenPaths.push(path);
        if (path === "/user/name") {
          return "legacy-name";
        }
        return current;
      },
    }) as { user: { name: string; age: number } };

    expect(value.user.name).toBe("legacy-name");
    expect(seenPaths).toContain("/");
    expect(seenPaths).toContain("/user");
    expect(seenPaths).toContain("/user/name");
    expect(seenPaths).not.toContain("/properties/user");
  });

  test("omits object properties and array items when the transform returns undefined", async () => {
    const value = await generate({
      type: "object",
      properties: {
        keep: { type: "string" },
        drop: { type: "string" },
        list: {
          type: "array",
          minItems: 3,
          maxItems: 3,
          items: { type: "integer" },
        },
      },
      required: ["keep", "drop", "list"],
    }, {
      seed: 11,
      outputTransform: (_current, _schema, path) => {
        if (path === "/drop" || path === "/list/2") {
          return undefined;
        }
        return _current;
      },
    }) as { keep: string; drop?: string; list: number[] };

    expect(value).toHaveProperty("keep");
    expect(value).not.toHaveProperty("drop");
    expect(value.list).toHaveLength(2);
  });

  test("supports legacy ignoreProperties and requiredOnly compatibility options", async () => {
    const value = await generate({
      type: "object",
      properties: {
        required: { type: "string" },
        optional: { type: "string" },
        removeByName: { type: "string" },
        removeBySchema: { type: "string", default: "x" },
      },
      required: ["required", "removeByName", "removeBySchema"],
    }, {
      seed: 5,
      requiredOnly: true,
      ignoreProperties: ["removeByName", (schema: JsonSchema) => typeof schema === "object" && schema !== null && schema.default === "x"],
    } as Parameters<typeof generate>[1]) as Record<string, unknown>;

    expect(Object.keys(value).sort()).toEqual(["required"]);
  });
});
