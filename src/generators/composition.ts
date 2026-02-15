import type { JsonSchema, JsonSchemaObject, GenerateContext } from "../types.js";
import { walk } from "../schema-walker.js";
import { mergeSchemas } from "../merge.js";

export async function generateComposition(
  schema: JsonSchemaObject,
  ctx: GenerateContext
): Promise<unknown> {
  // Extract non-composition keywords as base schema
  const { allOf, anyOf, oneOf, not, if: ifSchema, then: thenSchema, else: elseSchema, ...base } = schema;

  if (allOf) {
    const merged = mergeSchemas([base, ...allOf]);
    return walk(merged, ctx);
  }

  if (oneOf) {
    const picked = ctx.random.pick(oneOf);
    const merged = mergeSchemas([base, picked]);
    return walk(merged, ctx);
  }

  if (anyOf) {
    const picked = ctx.random.pick(anyOf);
    const merged = mergeSchemas([base, picked]);
    return walk(merged, ctx);
  }

  if (ifSchema !== undefined) {
    return generateConditional(base, ifSchema, thenSchema, elseSchema, ctx);
  }

  if (not) {
    return generateNot(base, not, ctx);
  }

  return walk(base, ctx);
}

async function generateConditional(
  base: JsonSchemaObject,
  ifSchema: JsonSchema,
  thenSchema: JsonSchema | undefined,
  elseSchema: JsonSchema | undefined,
  ctx: GenerateContext
): Promise<unknown> {
  // Coin flip: satisfy `if` (use then) or don't (use else)
  const satisfyIf = ctx.random.bool();

  if (satisfyIf && thenSchema !== undefined) {
    // Merge base + if + then
    const merged = mergeSchemas([base, ifSchema, thenSchema]);
    return walk(merged, ctx);
  } else if (!satisfyIf && elseSchema !== undefined) {
    // Merge base + else
    const merged = mergeSchemas([base, elseSchema]);
    return walk(merged, ctx);
  } else if (thenSchema !== undefined) {
    const merged = mergeSchemas([base, ifSchema, thenSchema]);
    return walk(merged, ctx);
  } else {
    return walk(base, ctx);
  }
}

async function generateNot(
  base: JsonSchemaObject,
  not: JsonSchema,
  ctx: GenerateContext
): Promise<unknown> {
  if (typeof not === "boolean") {
    if (not === true) {
      // not true = nothing is valid — shouldn't happen
      throw new Error("Cannot generate value for 'not: true'");
    }
    // not false = everything is valid
    return walk(base, ctx);
  }

  // Simple type avoidance
  if (not.type && !not.enum && !not.const) {
    const excludedTypes = Array.isArray(not.type) ? not.type : [not.type];
    const allTypes = ["string", "number", "integer", "boolean", "null", "object", "array"];
    const allowed = allTypes.filter((t) => !excludedTypes.includes(t));

    if (allowed.length > 0) {
      const type = ctx.random.pick(allowed);
      const merged = mergeSchemas([base, { type }]);
      return walk(merged, ctx);
    }
  }

  // Enum exclusion: if not has enum, generate base and hope it doesn't match
  // For const exclusion, generate and retry
  if (not.const !== undefined || not.enum !== undefined) {
    const excluded = not.enum ?? [not.const];
    const excludedSet = new Set(excluded.map((v) => JSON.stringify(v)));
    for (let i = 0; i < 20; i++) {
      const value = await walk(base, ctx);
      if (!excludedSet.has(JSON.stringify(value))) {
        return value;
      }
    }
  }

  // Fallback: generate from base
  return walk(base, ctx);
}
