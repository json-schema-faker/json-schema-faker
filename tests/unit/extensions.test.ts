import { describe, test, expect, beforeEach } from "bun:test";
import { generate, define, reset } from "../../src/index.js";
import type { ExtensionCallback } from "../../src/extensions.js";
import type { JsonSchemaObject } from "../../src/types.js";

describe("extensions API", () => {
  beforeEach(() => {
    reset();
  });

  describe("define", () => {
    test("registers a custom keyword generator", async () => {
      let callCount = 0;
      const callback: ExtensionCallback = function (_value, _schema) {
        callCount++;
        return "custom-value";
      };
      define("customKeyword", callback);

      const schema: JsonSchemaObject = {
        type: "string",
        customKeyword: true
      };

      const result = await generate(schema) as string;
      expect(result).toBe("custom-value");
      expect(callCount).toBe(1);
    });

    test("supports x- prefix for custom keywords", async () => {
      const callback: ExtensionCallback = function () {
        return "x-prefixed-value";
      };
      define("myGenerator", callback);

      const schema: JsonSchemaObject = {
        type: "string",
        "x-myGenerator": true
      };

      const result = await generate(schema) as string;
      expect(result).toBe("x-prefixed-value");
    });

    test("receives the keyword value and schema", async () => {
      let receivedValue: unknown;
      let receivedSchema: JsonSchemaObject | undefined;

      const callback: ExtensionCallback = function (value, schema) {
        receivedValue = value;
        receivedSchema = schema;
        return "test";
      };
      define("testKeyword", callback);

      const schema: JsonSchemaObject = {
        type: "object",
        properties: {
          name: { type: "string" }
        },
        testKeyword: { customOption: true }
      };

      await generate(schema);

      expect(receivedValue).toEqual({ customOption: true });
      expect(receivedSchema).toHaveProperty("type", "object");
    });

    test("context persists across calls", async () => {
      let contextValue: number;

      const callback: ExtensionCallback = function () {
        const ctx = this as { counterValue?: number };
        contextValue = (ctx.counterValue ?? 0) + 1;
        ctx.counterValue = contextValue;
        return contextValue;
      };
      define("counter", callback);

      const schema: JsonSchemaObject = {
        type: "integer",
        counter: true
      };

      const result1 = await generate(schema) as number;
      const result2 = await generate(schema) as number;

      expect(result1).toBe(1);
      expect(result2).toBe(2);
    });

    test("works with different types", async () => {
      const callback: ExtensionCallback = function () {
        return { generated: true };
      };
      define("customType", callback);

      const schema: JsonSchemaObject = {
        type: "object",
        customType: true
      };

      const result = await generate(schema) as Record<string, unknown>;
      expect(result).toHaveProperty("generated", true);
    });
  });

  describe("reset", () => {
    test("resets specific extension", async () => {
      const callback: ExtensionCallback = function () { return "test"; };
      define("testExt", callback);
      reset("testExt");

      const schema: JsonSchemaObject = { type: "string", testExt: true };
      const result = await generate(schema);
      // After reset, the extension should not be called
      // So it should fall back to type generation
      expect(typeof result).toBe("string");
    });

    test("resets all extensions when no name provided", async () => {
      const cb1: ExtensionCallback = function () { return "1"; };
      const cb2: ExtensionCallback = function () { return "2"; };
      define("ext1", cb1);
      define("ext2", cb2);
      reset();

      const schema1: JsonSchemaObject = { type: "string", ext1: true };
      const schema2: JsonSchemaObject = { type: "string", ext2: true };
      
      // Both should fall back to type generation
      expect(typeof (await generate(schema1))).toBe("string");
      expect(typeof (await generate(schema2))).toBe("string");
    });

    test("does not affect other extensions when resetting one", async () => {
      const cb1: ExtensionCallback = function () { return "ext1-result"; };
      const cb2: ExtensionCallback = function () { return "ext2-result"; };
      define("ext1", cb1);
      define("ext2", cb2);
      reset("ext1");

      const schema2: JsonSchemaObject = { type: "string", ext2: true };
      const result = await generate(schema2) as string;
      expect(result).toBe("ext2-result");
    });
  });

  describe("integration with schema generation", () => {
    test("custom keyword takes precedence over type generation", async () => {
      const callback: ExtensionCallback = function () {
        return "overridden";
      };
      define("override", callback);

      const schema: JsonSchemaObject = {
        type: "string",
        override: true
      };

      const result = await generate(schema) as string;
      expect(result).toBe("overridden");
    });

    test("works with objects", async () => {
      const callback: ExtensionCallback = function () {
        return { computed: true };
      };
      define("computed", callback);

      const schema: JsonSchemaObject = {
        type: "object",
        properties: {
          id: { type: "integer" },
          data: { computed: true }
        }
      };

      const result = await generate(schema) as Record<string, unknown>;
      expect(result).toHaveProperty("data");
      expect((result.data as Record<string, unknown>)).toHaveProperty("computed", true);
    });

    test("works with arrays", async () => {
      const callback: ExtensionCallback = function () {
        return [1, 2, 3];
      };
      define("arrayGen", callback);

      const schema: JsonSchemaObject = {
        type: "array",
        arrayGen: true
      };

      const result = await generate(schema);
      expect(result).toEqual([1, 2, 3]);
    });
  });
});
