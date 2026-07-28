import type { JsonSchema, JsonSchemaObject, GenerateContext } from "../types.js";
import { type Gen, walkCall } from "../coroutine.js";
import { mergeSchemas } from "../merge.js";
import { resolveRefGen } from "../ref-resolver.js";

function* resolveSchemaRefGen(schema: JsonSchemaObject, ctx: GenerateContext): Gen<JsonSchemaObject> {
  if (!schema.$ref) return schema;
  const resolved = yield* resolveRefGen(schema, ctx);
  return resolved.schema as JsonSchemaObject;
}

function* resolveAllOfRefsGen(allOf: JsonSchema[], ctx: GenerateContext): Gen<JsonSchemaObject[]> {
  const resolved: JsonSchemaObject[] = [];
  for (const item of allOf) {
    if (typeof item === "object" && item !== null && "$ref" in item) {
      const res = yield* resolveSchemaRefGen(item as JsonSchemaObject, ctx);
      resolved.push(res);
    } else if (typeof item === "object" && item !== null) {
      resolved.push(item as JsonSchemaObject);
    }
  }
  return resolved;
}

export function* generateCompositionGen(
  schema: JsonSchemaObject,
  ctx: GenerateContext
): Gen<unknown> {
  // Extract non-composition keywords as base schema
  const { allOf, anyOf, oneOf, not, if: ifSchema, then: thenSchema, else: elseSchema, ...base } = schema;

  if (allOf) {
    const resolvedRefs = yield* resolveAllOfRefsGen(allOf, ctx);
    const merged = mergeSchemas([base, ...resolvedRefs]);
    return yield walkCall(merged, ctx);
  }

  if (oneOf) {
    const branches = ctx.random.shuffle([...oneOf]);

    // Get required from base schema (from allOf merging)
    const baseRequired = base.required ?? [];

    for (const branch of branches) {
      let branchObj = typeof branch === "object" && branch !== null ? branch : {};

      // Resolve $ref if present to get the actual schema with required properties
      if (branchObj.$ref) {
        const resolved = yield* resolveRefGen(branchObj, ctx);
        branchObj = resolved.schema as JsonSchemaObject;
      }

      const branchRequired = branchObj.required ?? [];
      // Combine base required with branch required (union)
      const combinedRequired = [...new Set([...baseRequired, ...branchRequired])];

      // Build base with properties but with combined required
      // Also set optionalsProbability to 0 to only generate required properties
      const baseWithBranchRequired: JsonSchemaObject = {
        ...base,
        required: combinedRequired
      };

      const merged = mergeSchemas([baseWithBranchRequired, branchObj]);

      // Create context with optionalsProbability: 0 to only generate required properties
      const oneOfCtx: GenerateContext = {
        ...ctx,
        optionalsProbability: 0,
        alwaysFakeOptionals: false,
      };

      try {
        return yield walkCall(merged, oneOfCtx);
      } catch {
        // Try next branch
      }
    }
    // If all fail, try the first one anyway
    const picked = oneOf[0];
    let pickedObj = typeof picked === "object" && picked !== null ? picked : {};

    // Resolve $ref if present to get the actual schema with required properties
    if (pickedObj.$ref) {
      const resolved = yield* resolveRefGen(pickedObj, ctx);
      pickedObj = resolved.schema as JsonSchemaObject;
    }

    const pickedRequired = pickedObj.required ?? [];
    const combinedRequired = [...new Set([...baseRequired, ...pickedRequired])];
    const baseWithPickedRequired: JsonSchemaObject = {
      ...base,
      required: combinedRequired
    };
    const merged = mergeSchemas([baseWithPickedRequired, pickedObj]);
    const oneOfCtx: GenerateContext = {
      ...ctx,
      optionalsProbability: 0,
      alwaysFakeOptionals: false,
    };
    return yield walkCall(merged, oneOfCtx);
  }

  if (anyOf) {
    // Try each branch until one works
    const branches = ctx.random.shuffle([...anyOf]);

    for (const branch of branches) {
      const merged = mergeSchemas([base, branch]);
      try {
        return yield walkCall(merged, ctx);
      } catch {
        // Try next branch
      }
    }
    // If all fail, try the first one anyway
    const picked = anyOf[0];
    const merged = mergeSchemas([base, picked]);
    return yield walkCall(merged, ctx);
  }

  if (ifSchema !== undefined) {
    return yield* generateConditionalGen(base, ifSchema, thenSchema, elseSchema, ctx);
  }

  if (not) {
    return yield* generateNotGen(base, not, ctx);
  }

  return yield walkCall(base, ctx);
}

function* generateConditionalGen(
  base: JsonSchemaObject,
  ifSchema: JsonSchema,
  thenSchema: JsonSchema | undefined,
  elseSchema: JsonSchema | undefined,
  ctx: GenerateContext
): Gen<unknown> {
  // Try the "if + then" branch first (preferred per JSON Schema semantics)
  if (thenSchema !== undefined) {
    const mergedIfThen = mergeSchemas([base, ifSchema, thenSchema]);
    try {
      return yield walkCall(mergedIfThen, ctx);
    } catch {
      // If then branch fails, fall through to try else
    }
  }

  // If then failed or wasn't defined, try else branch
  if (elseSchema !== undefined) {
    const mergedElse = mergeSchemas([base, elseSchema]);
    try {
      return yield walkCall(mergedElse, ctx);
    } catch {
      // If else also fails, fall through
    }
  }

  // Fallback: just try base schema
  return yield walkCall(base, ctx);
}

function* generateNotGen(
  base: JsonSchemaObject,
  not: JsonSchema,
  ctx: GenerateContext
): Gen<unknown> {
  if (typeof not === "boolean") {
    if (not === true) {
      // not true = nothing is valid — shouldn't happen
      throw new Error(`Cannot generate value for 'not: true' at ${ctx.path}`);
    }
    // not false = everything is valid
    return yield walkCall(base, ctx);
  }

  // Simple type avoidance
  if (not.type && !not.enum && !not.const) {
    const excludedTypes = Array.isArray(not.type) ? not.type : [not.type];
    const allTypes = ["string", "number", "integer", "boolean", "null", "object", "array"];
    const allowed = allTypes.filter((t) => !excludedTypes.includes(t));

    if (allowed.length > 0) {
      const type = ctx.random.pick(allowed);
      const merged = mergeSchemas([base, { type }]);
      return yield walkCall(merged, ctx);
    }
  }

  // Enum exclusion: if not has enum, generate base and hope it doesn't match
  // For const exclusion, generate and retry
  if (not.const !== undefined || not.enum !== undefined) {
    const excluded = not.enum ?? [not.const];
    const excludedSet = new Set(excluded.map((v) => JSON.stringify(v)));
    for (let i = 0; i < 20; i++) {
      const value = yield walkCall(base, ctx);
      if (!excludedSet.has(JSON.stringify(value))) {
        return value;
      }
    }
  }

  // Fallback: generate from base
  return yield walkCall(base, ctx);
}
