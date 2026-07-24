import { describe, test, expect } from "bun:test";
import { generate, generateSync, type JsonSchema } from "../../src/index.js";

// Regression test for a stack overflow found in review of #879: walkGen()
// used to recurse via native `yield*` delegation, so a deep $ref chain (or
// deeply nested required-property tree) grew the JS call stack one frame per
// schema level and threw "RangeError: Maximum call stack size exceeded" well
// before reaching refDepthMax. The fix routes recursive schema walks through
// an explicit-stack trampoline (see WalkCall in src/coroutine.ts) instead of
// yield* delegation, so call-stack depth stays flat regardless of schema
// recursion depth.
describe("deep recursion (stack safety)", () => {
  const selfRefSchema: JsonSchema = {
    type: "object",
    required: ["child"],
    properties: {
      child: { $ref: "#" },
      val: { type: "integer" },
    },
  };

  test("generate() resolves a deep self-referencing $ref chain without a stack overflow", async () => {
    const result = await generate(selfRefSchema, { refDepthMax: 5000, maxDepth: 5100, seed: 1 });
    let depth = 0;
    let node: any = result;
    while (node && typeof node === "object" && "child" in node) {
      depth++;
      node = node.child;
    }
    expect(depth).toBeGreaterThan(1000);
  });

  test("generateSync() resolves a deep self-referencing $ref chain without a stack overflow", () => {
    const result = generateSync(selfRefSchema, { refDepthMax: 5000, maxDepth: 5100, seed: 1 });
    let depth = 0;
    let node: any = result;
    while (node && typeof node === "object" && "child" in node) {
      depth++;
      node = node.child;
    }
    expect(depth).toBeGreaterThan(1000);
  });

  function buildNestedRequiredSchema(depth: number): JsonSchema {
    let schema: JsonSchema = { type: "integer", const: 0 };
    for (let i = 0; i < depth; i++) {
      schema = {
        type: "object",
        required: ["next"],
        properties: { next: schema },
      };
    }
    return schema;
  }

  test("generate() resolves a deeply nested required-property tree (no $ref) without a stack overflow", async () => {
    const schema = buildNestedRequiredSchema(6000);
    const result = await generate(schema, { seed: 1, maxDepth: 6001 }) as Record<string, unknown>;
    let depth = 0;
    let node: any = result;
    while (node && typeof node === "object" && "next" in node) {
      depth++;
      node = node.next;
    }
    expect(depth).toBe(6000);
    expect(node).toBe(0);
  });

  test("generateSync() resolves a deeply nested required-property tree (no $ref) without a stack overflow", () => {
    const schema = buildNestedRequiredSchema(6000);
    const result = generateSync(schema, { seed: 1, maxDepth: 6001 }) as Record<string, unknown>;
    let depth = 0;
    let node: any = result;
    while (node && typeof node === "object" && "next" in node) {
      depth++;
      node = node.next;
    }
    expect(depth).toBe(6000);
    expect(node).toBe(0);
  });
});
