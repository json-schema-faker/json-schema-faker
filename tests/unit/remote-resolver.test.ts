import { describe, test, expect } from "bun:test";
import { generate, createRemoteResolver } from "../../src/index.js";
import type { JsonSchema } from "../../src/types.js";

describe("createRemoteResolver", () => {
  test("resolves schema with custom fetch", async () => {
    const externalSchema: JsonSchema = {
      type: "object",
      properties: {
        id: { type: "integer" },
        name: { type: "string" },
      },
      required: ["id"],
    };

    const customFetch = async (url: string): Promise<Response> => {
      // Mock fetch that returns the external schema
      return {
        ok: true,
        status: 200,
        statusText: "OK",
        headers: new Headers({ "content-type": "application/json" }),
        json: async () => externalSchema,
        text: async () => JSON.stringify(externalSchema),
      } as Response;
    };

    const resolver = createRemoteResolver({ fetch: customFetch });

    const schema: JsonSchema = {
      type: "object",
      properties: {
        user: { $ref: "http://example.com/schemas/user.json" },
      },
      required: ["user"],
    };

    const result = await generate(schema, { refResolver: resolver, seed: 1 });

    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
    const obj = result as Record<string, unknown>;
    expect(obj.user).toBeDefined();
    expect(typeof obj.user).toBe("object");
  });

  test("resolves schema with custom readFile", async () => {
    const externalSchema: JsonSchema = {
      type: "string",
      minLength: 5,
    };

    const customReadFile = async (path: string): Promise<string> => {
      if (path === "/schemas/address.json") {
        return JSON.stringify(externalSchema);
      }
      throw new Error(`File not found: ${path}`);
    };

    const resolver = createRemoteResolver({ readFile: customReadFile });

    const schema: JsonSchema = {
      type: "object",
      properties: {
        address: { $ref: "/schemas/address.json" },
      },
      required: ["address"],
    };

    const result = await generate(schema, { refResolver: resolver, seed: 1 });

    expect(result).toBeDefined();
    const obj = result as Record<string, unknown>;
    expect(obj.address).toBeDefined();
    expect(typeof obj.address).toBe("string");
  });

  test("caches resolved schemas", async () => {
    let fetchCount = 0;
    const externalSchema: JsonSchema = { type: "integer" };

    const customFetch = async (url: string): Promise<Response> => {
      fetchCount++;
      return {
        ok: true,
        status: 200,
        statusText: "OK",
        headers: new Headers(),
        json: async () => externalSchema,
        text: async () => JSON.stringify(externalSchema),
      } as Response;
    };

    const resolver = createRemoteResolver({ fetch: customFetch });

    const schema: JsonSchema = {
      type: "object",
      properties: {
        a: { $ref: "http://example.com/schema.json" },
        b: { $ref: "http://example.com/schema.json" },
      },
    };

    await generate(schema, { refResolver: resolver, seed: 1 });

    // Should only fetch once due to caching
    expect(fetchCount).toBe(1);
  });

  test("resolves JSON pointer fragments", async () => {
    const externalSchema: JsonSchema = {
      $defs: {
        Person: {
          type: "object",
          properties: {
            name: { type: "string" },
          },
        },
      },
    };

    const customFetch = async (url: string): Promise<Response> => {
      return {
        ok: true,
        status: 200,
        statusText: "OK",
        headers: new Headers(),
        json: async () => externalSchema,
        text: async () => JSON.stringify(externalSchema),
      } as Response;
    };

    const resolver = createRemoteResolver({ fetch: customFetch });

    const schema: JsonSchema = {
      type: "object",
      properties: {
        person: { $ref: "http://example.com/schema.json#/$defs/Person" },
      },
      required: ["person"],
    };

    const result = await generate(schema, { refResolver: resolver, seed: 1 });

    expect(result).toBeDefined();
    const obj = result as Record<string, unknown>;
    expect(obj.person).toBeDefined();
    expect(typeof obj.person).toBe("object");
  });

  test("throws on unresolved reference", async () => {
    const resolver = createRemoteResolver({});

    const schema: JsonSchema = {
      $ref: "http://example.com/nonexistent.json",
    };

    // Without a custom fetch, it should throw
    await expect(generate(schema, { refResolver: resolver })).rejects.toThrow();
  });

  test("resolves relative references with baseUrl", async () => {
    const externalSchema: JsonSchema = { type: "boolean" };
    let resolvedUrl: string | null = null;

    const customFetch = async (url: string): Promise<Response> => {
      resolvedUrl = url;
      return {
        ok: true,
        status: 200,
        statusText: "OK",
        headers: new Headers(),
        json: async () => externalSchema,
        text: async () => JSON.stringify(externalSchema),
      } as Response;
    };

    const resolver = createRemoteResolver({
      baseUrl: "http://example.com/schemas/",
      fetch: customFetch,
    });

    const schema: JsonSchema = {
      $ref: "common.json",
    };

    await generate(schema, { refResolver: resolver, seed: 1 });

    expect(resolvedUrl).not.toBeNull();
    expect(resolvedUrl!).toBe("http://example.com/schemas/common.json");
  });
});
