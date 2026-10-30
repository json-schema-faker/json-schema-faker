import { describe, test, expect } from "bun:test";
import { generate } from "../../src/index.js";
import { assertValid, assertValidMultipleSeeds } from "../helpers/validate.js";
import type { JsonSchema } from "../../src/types.js";

describe("allOf", () => {
  test("merges numeric bounds", async () => {
    const schema = {
      allOf: [
        { type: "integer" as const, minimum: 0 },
        { maximum: 10 },
      ],
    };
    for (let seed = 1; seed <= 50; seed++) {
      const val = await generate(schema, { seed }) as number;
      expect(val).toBeGreaterThanOrEqual(0);
      expect(val).toBeLessThanOrEqual(10);
      expect(Number.isInteger(val)).toBe(true);
    }
  });

  test("merges object properties", async () => {
    const schema = {
      allOf: [
        {
          type: "object" as const,
          properties: { a: { type: "string" as const } },
          required: ["a"],
        },
        {
          properties: { b: { type: "number" as const } },
          required: ["b"],
        },
      ],
    };
    const val = await generate(schema as any) as Record<string, unknown>;
    expect(val).toHaveProperty("a");
    expect(val).toHaveProperty("b");
  });

  test("validates across seeds", async () => {
    await assertValidMultipleSeeds(
      {
        allOf: [
          { type: "integer", minimum: 1 },
          { maximum: 100, multipleOf: 5 },
        ],
      },
      100,
      generate
    );
  });

  test("preserves nested allOf constraints from multiple branches", async () => {
    const schema: JsonSchema = {
      type: "object" as const,
      properties: {
        root: {
          allOf: [
            {
              allOf: [
                {
                  type: "object" as const,
                  properties: {
                    a_val: { const: "a" },
                  },
                  required: ["a_val"],
                },
                {
                  type: "object" as const,
                  properties: {
                    b_val: { const: "b" },
                  },
                  required: ["b_val"],
                },
              ],
            },
            {
              allOf: [
                {
                  type: "object" as const,
                  properties: {
                    c_val: { const: "c" },
                  },
                  required: ["c_val"],
                },
                {
                  type: "object" as const,
                  properties: {
                    d_val: { const: "d" },
                  },
                  required: ["d_val"],
                },
              ],
            },
          ],
        },
      },
      required: ["root"],
    };

    const val = await generate(schema) as {
      root: {
        a_val: string;
        b_val: string;
        c_val: string;
        d_val: string;
      };
    };

    expect(val.root).toEqual({
      a_val: "a",
      b_val: "b",
      c_val: "c",
      d_val: "d",
    });
    assertValid(schema as any, val);
  });
});

describe("anyOf", () => {
  test("picks one schema", async () => {
    const schema = {
      anyOf: [
        { type: "string" as const },
        { type: "number" as const },
      ],
    };
    for (let seed = 1; seed <= 50; seed++) {
      const val = await generate(schema, { seed });
      expect(typeof val === "string" || typeof val === "number").toBe(true);
    }
  });

  test("validates across seeds", async () => {
    await assertValidMultipleSeeds(
      {
        anyOf: [
          { type: "string", minLength: 1 },
          { type: "integer", minimum: 0 },
        ],
      },
      100,
      generate
    );
  });
});

describe("oneOf", () => {
  test("picks one schema", async () => {
    const schema = {
      oneOf: [
        { type: "string" as const, minLength: 1 },
        { type: "integer" as const, minimum: 0 },
        { type: "boolean" as const },
      ],
    };
    for (let seed = 1; seed <= 50; seed++) {
      const val = await generate(schema, { seed });
      const t = typeof val;
      expect(["string", "number", "boolean"]).toContain(t);
    }
  });
});

describe("not", () => {
  test("avoids excluded type", async () => {
    const schema = {
      not: { type: "string" as const },
    };
    for (let seed = 1; seed <= 50; seed++) {
      const val = await generate(schema, { seed });
      expect(typeof val).not.toBe("string");
    }
  });
});

describe("if/then/else", () => {
  test("generates values matching conditional", async () => {
    const schema = {
      type: "object" as const,
      properties: {
        kind: { type: "string" as const, enum: ["a", "b"] },
        value: { type: "number" as const },
      },
      required: ["kind", "value"],
      if: { properties: { kind: { const: "a" } } },
      then: { properties: { value: { minimum: 100 } } },
      else: { properties: { value: { maximum: 0 } } },
    };
    for (let seed = 1; seed <= 20; seed++) {
      const val = await generate(schema, { seed }) as { kind: string; value: number };
      expect(typeof val).toBe("object");
      if (val.kind === "a") {
        expect(val.value).toBeGreaterThanOrEqual(100);
      } else {
        expect(val.value).toBeLessThanOrEqual(0);
      }
    }
  });

  test("if/then without else falls back to base", async () => {
    const schema = {
      type: "object" as const,
      properties: {
        kind: { type: "string" as const, enum: ["a", "b"] },
        value: { type: "number" as const },
      },
      required: ["kind", "value"],
      if: { properties: { kind: { const: "a" } } },
      then: { properties: { value: { minimum: 100 } } },
    };
    for (let seed = 1; seed <= 20; seed++) {
      const val = await generate(schema, { seed }) as { kind: string; value: number };
      expect(typeof val).toBe("object");
      if (val.kind === "a") {
        expect(val.value).toBeGreaterThanOrEqual(100);
      }
    }
  });
});

describe("github issues", () => {
  test("issue #727: allOf with contains should include all required items", async () => {
    const schema = {
      type: "array",
      items: { type: "string" },
      allOf: [
        { contains: { const: "A" } },
        { contains: { const: "B" } },
      ],
    };

    for (let seed = 1; seed <= 20; seed++) {
      const val = await generate(schema as any, { seed }) as string[];
      expect(val).toContain("A");
      expect(val).toContain("B");
      assertValid(schema as any, val);
    }
  });
});

describe("issue #882: if/then/else", () => {
  const hostCondition = (host: string, user: string) => ({
    if: { properties: { hostnames: { const: host } }, required: ["hostnames"] },
    then: { properties: { users: { enum: [user] } } },
  });
  const hostItem = (hosts: string[], allOf: JsonSchema[]) => ({
    type: "object",
    properties: { hostnames: { enum: hosts }, users: { type: "string" } },
    required: ["hostnames", "users"],
    unevaluatedProperties: false,
    allOf,
  });

  test("applies if/then inside allOf", async () => {
    const schema = {
      $schema: "https://json-schema.org/draft/2020-12/schema",
      type: "array",
      items: hostItem(["AB"], [hostCondition("AB", "abc")]),
    } as JsonSchema;
    const val = await generate(schema, { seed: 42 }) as Array<{ hostnames: string; users: string }>;
    for (const item of val) {
      expect(item).toEqual({ hostnames: "AB", users: "abc" });
    }
    await assertValidMultipleSeeds(schema, 20, generate);
  });

  test("applies every if/then inside allOf", async () => {
    const schema = {
      type: "array",
      minItems: 3,
      items: hostItem(["AB", "CD"], [hostCondition("AB", "abc"), hostCondition("CD", "xyz")]),
    } as JsonSchema;
    const hosts = new Set<string>();
    for (let seed = 1; seed <= 20; seed++) {
      const val = await generate(schema, { seed }) as Array<{ hostnames: string }>;
      assertValid(schema, val);
      for (const item of val) hosts.add(item.hostnames);
    }
    expect([...hosts].sort()).toEqual(["AB", "CD"]);
  });

  test("applies if/then next to allOf", async () => {
    const schema = {
      ...hostItem(["AB"], [{ properties: { users: { minLength: 1 } } }]),
      ...hostCondition("AB", "abc"),
    } as JsonSchema;
    await assertValidMultipleSeeds(schema, 20, generate);
  });

  test("reaches the else branch without satisfying if", async () => {
    const schema = {
      type: "object",
      properties: {
        kind: { enum: ["a", "b", "c"] },
        value: { type: "number" },
      },
      required: ["kind", "value"],
      if: { properties: { kind: { const: "a" } } },
      then: { properties: { value: { minimum: 100 } } },
      else: { properties: { value: { maximum: 0 } } },
    } as JsonSchema;
    const kinds = new Set<string>();
    for (let seed = 1; seed <= 30; seed++) {
      const val = await generate(schema, { seed }) as { kind: string };
      assertValid(schema, val);
      kinds.add(val.kind);
    }
    expect(kinds.has("a")).toBe(true);
    expect(kinds.size).toBeGreaterThan(1);
  });

  test("reaches the else branch for unlisted values", async () => {
    const schema = {
      type: "object",
      properties: { kind: { type: "string" }, value: { type: "number" } },
      required: ["kind", "value"],
      if: { properties: { kind: { const: "a" } } },
      then: { properties: { value: { minimum: 100 } } },
      else: { properties: { value: { maximum: 0 } } },
    } as JsonSchema;
    await assertValidMultipleSeeds(schema, 30, generate);
  });

  test("reaches the else branch by omitting an optional property", async () => {
    const schema = {
      type: "object",
      properties: { flag: { const: true }, value: { type: "number" } },
      required: ["value"],
      if: { required: ["flag"] },
      then: { properties: { value: { minimum: 100 } } },
      else: { properties: { value: { maximum: 0 } } },
    } as JsonSchema;
    const flags = new Set<boolean>();
    for (let seed = 1; seed <= 30; seed++) {
      const val = await generate(schema, { seed }) as { flag?: boolean };
      assertValid(schema, val);
      flags.add("flag" in val);
    }
    expect([...flags].sort()).toEqual([false, true]);
  });

  test("discards an else branch that would make if hold", async () => {
    const schema = {
      type: "object",
      properties: { flag: { type: "boolean" }, value: { type: "integer" } },
      required: ["value"],
      if: { required: ["flag"] },
      then: { properties: { value: { const: 1 } } },
      else: { required: ["flag"], properties: { flag: { const: true }, value: { const: 2 } } },
    } as JsonSchema;
    await assertValidMultipleSeeds(schema, 20, generate);
  });

  test("discards a then branch that would make if fail", async () => {
    const schema = {
      type: "object",
      properties: { kind: { enum: ["a", "b"] } },
      required: ["kind"],
      if: { properties: { kind: { const: "a" } } },
      then: { properties: { kind: { const: "b" } } },
    } as JsonSchema;
    await assertValidMultipleSeeds(schema, 20, generate);
  });

  test("ignores an unresolvable $ref in a branch that cannot apply", async () => {
    const schema = { if: true, then: { const: "ok" }, else: { $ref: "https://example.invalid/unused" } } as JsonSchema;
    expect(await generate(schema, { seed: 1 })).toBe("ok");
  });

  test("applies else when the if $ref cannot be resolved", async () => {
    const schema = {
      if: { $ref: "https://example.invalid/unused" },
      then: { const: "then" },
      else: { const: "else" },
    } as JsonSchema;
    expect(await generate(schema, { seed: 1 })).toBe("else");
  });
});
