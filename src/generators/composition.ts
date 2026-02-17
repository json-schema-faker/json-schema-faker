import type { JsonSchema, JsonSchemaObject, GenerateContext } from "../types.js";
import { walk } from "../schema-walker.js";
import { mergeSchemas } from "../merge.js";
import { resolveRef } from "../ref-resolver.js";

async function resolveSchemaRef(schema: JsonSchemaObject, ctx: GenerateContext): Promise<JsonSchemaObject> {
  if (!schema.$ref) return schema;
  const resolved = await resolveRef(schema, ctx);
  return resolved.schema as JsonSchemaObject;
}

async function resolveAllOfRefs(allOf: JsonSchema[], ctx: GenerateContext): Promise<JsonSchemaObject[]> {
  const resolved: JsonSchemaObject[] = [];
  for (const item of allOf) {
    if (typeof item === "object" && item !== null && "$ref" in item) {
      const res = await resolveSchemaRef(item as JsonSchemaObject, ctx);
      resolved.push(res);
    } else if (typeof item === "object" && item !== null) {
      resolved.push(item as JsonSchemaObject);
    }
  }
  return resolved;
}

export async function generateComposition(
  schema: JsonSchemaObject,
  ctx: GenerateContext
): Promise<unknown> {
  // Extract non-composition keywords as base schema
  const { allOf, anyOf, oneOf, not, if: ifSchema, then: thenSchema, else: elseSchema, ...base } = schema;

  if (allOf) {
    const resolvedRefs = await resolveAllOfRefs(allOf, ctx);
    const merged = mergeSchemas([base, ...resolvedRefs]);
    return walk(merged, ctx);
  }

  if (oneOf) {
    // For oneOf, we need to pick ONE branch and ensure the generated value
    // only satisfies that branch (not multiple branches)
    const branches = [...oneOf];
    ctx.random.shuffle(branches);
    
    for (const branch of branches) {
      // For the chosen branch, we need to include base properties BUT only generate required
      const branchObj = typeof branch === "object" && branch !== null ? branch : {};
      const branchRequired = branchObj.required;
      
      // Build base with properties but with branch's required (not base's required)
      // Also set optionalsProbability to 0 to only generate required properties
      const baseWithBranchRequired: JsonSchemaObject = { 
        ...base,
        required: branchRequired 
      };
      
      const merged = mergeSchemas([baseWithBranchRequired, branch]);
      
      // Create context with optionalsProbability: 0 to only generate required properties
      const oneOfCtx: GenerateContext = {
        ...ctx,
        optionalsProbability: 0,
        alwaysFakeOptionals: false,
      };
      
      try {
        return await walk(merged, oneOfCtx);
      } catch {
        // Try next branch
      }
    }
    // If all fail, try the first one anyway
    const picked = oneOf[0];
    const pickedObj = typeof picked === "object" && picked !== null ? picked : {};
    const pickedRequired = pickedObj.required;
    const baseWithPickedRequired: JsonSchemaObject = { 
      ...base,
      required: pickedRequired 
    };
    const merged = mergeSchemas([baseWithPickedRequired, picked]);
    const oneOfCtx: GenerateContext = {
      ...ctx,
      optionalsProbability: 0,
      alwaysFakeOptionals: false,
    };
    return walk(merged, oneOfCtx);
  }

  if (anyOf) {
    // Try each branch until one works
    const branches = [...anyOf];
    ctx.random.shuffle(branches);
    
    for (const branch of branches) {
      const merged = mergeSchemas([base, branch]);
      try {
        return await walk(merged, ctx);
      } catch {
        // Try next branch
      }
    }
    // If all fail, try the first one anyway
    const picked = anyOf[0];
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
      throw new Error(`Cannot generate value for 'not: true' at ${ctx.path}`);
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
