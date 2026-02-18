import { describe, test, expect } from "bun:test";
import YAML from "yaml";
import { generateYaml, createYamlGenerator } from "../../src/index.js";

describe("generateYaml", () => {
  test("generates YAML string from schema", async () => {
    const schema = {
      type: "object",
      properties: {
        name: { type: "string" },
        age: { type: "integer" }
      },
      required: ["name"]
    };
    
    const result = await generateYaml(schema, { seed: 42, extensions: { yaml: YAML } });
    expect(typeof result).toBe("string");
    expect(result).toContain("name:");
  });

  test("generates valid YAML with pretty option", async () => {
    const schema = {
      type: "object",
      properties: {
        user: { type: "string" },
        count: { type: "integer" }
      }
    };
    
    const result = await generateYaml(schema, { seed: 42, pretty: true, extensions: { yaml: YAML } });
    expect(result).toContain("\n");
  });

  test("generates compact YAML with pretty: false", async () => {
    const schema = {
      type: "object",
      properties: {
        user: { type: "string" }
      }
    };
    
    const result = await generateYaml(schema, { seed: 42, pretty: false, extensions: { yaml: YAML } });
    expect(result).not.toContain("\n  ");
  });

  test("works with createYamlGenerator", async () => {
    const schema = {
      type: "object",
      properties: {
        id: { type: "integer" }
      }
    };
    
    const gen = createYamlGenerator({ seed: 100, extensions: { yaml: YAML } });
    const result = await gen.generate(schema);
    expect(typeof result).toBe("string");
    expect(result).toContain("id:");
  });

  test("throws helpful error without yaml", async () => {
    const schema = {
      type: "object",
      properties: {
        name: { type: "string" }
      }
    };
    
    await expect(generateYaml(schema, { seed: 42 })).rejects.toThrow("yaml");
  });
});
