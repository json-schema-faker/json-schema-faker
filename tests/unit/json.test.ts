import { describe, test, expect } from "bun:test";
import { generateJson, createJsonGenerator } from "../../src/index.js";

describe("generateJson", () => {
  test("generates JSON string from schema", async () => {
    const schema = {
      type: "object",
      properties: {
        name: { type: "string" },
        age: { type: "integer" }
      },
      required: ["name"]
    };
    
    const result = await generateJson(schema, { seed: 42 });
    expect(typeof result).toBe("string");
    expect(result).toContain("name");
  });

  test("generates pretty JSON by default", async () => {
    const schema = {
      type: "object",
      properties: {
        user: { type: "string" },
        count: { type: "integer" }
      }
    };
    
    const result = await generateJson(schema, { seed: 42 });
    expect(result).toContain("\n");
  });

  test("generates compact JSON with pretty: false", async () => {
    const schema = {
      type: "object",
      properties: {
        user: { type: "string" }
      }
    };
    
    const result = await generateJson(schema, { seed: 42, pretty: false });
    expect(result).not.toContain("\n");
  });

  test("respects jsonStringifyOptions", async () => {
    const schema = {
      type: "object",
      properties: {
        id: { type: "integer" }
      },
      required: ["id"]
    };
    
    const result = await generateJson(schema, { seed: 42, jsonStringifyOptions: { space: 4 } });
    expect(result).toContain("    ");
  });

  test("works with createJsonGenerator", async () => {
    const schema = {
      type: "object",
      properties: {
        id: { type: "integer" }
      }
    };
    
    const gen = createJsonGenerator({ seed: 100 });
    const result = await gen.generate(schema);
    expect(typeof result).toBe("string");
    expect(result).toContain("id");
  });
});
