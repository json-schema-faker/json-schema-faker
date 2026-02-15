import type { JsonSchema, JsonSchemaObject, GenerateContext } from "../types.js";
import { walk } from "../schema-walker.js";

export async function generateObject(
  schema: JsonSchemaObject,
  ctx: GenerateContext
): Promise<Record<string, unknown>> {
  if (ctx.depth >= ctx.maxDepth) {
    return {};
  }

  const childCtx: GenerateContext = { ...ctx, depth: ctx.depth + 1 };
  const result: Record<string, unknown> = {};
  const definedKeys = new Set<string>();

  const required = new Set(schema.required ?? []);

  // Generate required properties first
  if (schema.properties) {
    for (const [key, propSchema] of Object.entries(schema.properties)) {
      definedKeys.add(key);
      if (required.has(key)) {
        result[key] = await walk(propSchema, childCtx);
      } else if (ctx.random.bool(ctx.optionalPropertyProbability)) {
        result[key] = await walk(propSchema, childCtx);
      }
    }
  }

  // Generate any required properties not yet generated (could come from patternProperties or additionalProperties)
  for (const key of required) {
    if (result[key] !== undefined || definedKeys.has(key)) continue;
    if (schema.patternProperties) {
      for (const [pattern, patSchema] of Object.entries(schema.patternProperties)) {
        if (new RegExp(pattern).test(key)) {
          result[key] = await walk(patSchema, childCtx);
          definedKeys.add(key);
          break;
        }
      }
    }
    if (!definedKeys.has(key)) {
      const addlSchema = schema.additionalProperties ?? true;
      if (addlSchema !== false) {
        result[key] = await walk(addlSchema === true ? {} : addlSchema, childCtx);
        definedKeys.add(key);
      }
    }
  }

  // Respect minProperties
  const minProps = schema.minProperties ?? 0;
  const maxProps = schema.maxProperties;

  if (Object.keys(result).length < minProps) {
    const addlSchema = schema.additionalProperties;
    const genSchema: JsonSchema =
      addlSchema === undefined || addlSchema === true ? { type: "string" } : addlSchema;
    if (genSchema !== false) {
      while (Object.keys(result).length < minProps) {
        const key = `prop${ctx.random.int(0, 99999)}`;
        if (!result[key]) {
          result[key] = await walk(genSchema, childCtx);
        }
      }
    }
  }

  // Respect maxProperties — trim optional props
  if (maxProps !== undefined && Object.keys(result).length > maxProps) {
    const keys = Object.keys(result);
    const toRemove = keys.filter((k) => !required.has(k));
    ctx.random.shuffle(toRemove);
    while (Object.keys(result).length > maxProps && toRemove.length > 0) {
      const key = toRemove.pop()!;
      delete result[key];
    }
  }

  return result;
}
