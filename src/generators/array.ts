import type { JsonSchema, JsonSchemaObject, GenerateContext } from "../types.js";
import { walk } from "../schema-walker.js";

export async function generateArray(
  schema: JsonSchemaObject,
  ctx: GenerateContext
): Promise<unknown[]> {
  if (ctx.depth >= ctx.maxDepth) {
    return [];
  }

  const childCtx: GenerateContext = { ...ctx, depth: ctx.depth + 1 };
  const result: unknown[] = [];

  // Use context overrides if provided, otherwise use schema values
  const minItems = ctx.minItems ?? schema.minItems ?? 0;
  const maxItems = ctx.maxItems ?? schema.maxItems ?? Math.max(minItems, ctx.maxDefaultItems);

  // Handle prefixItems
  if (schema.prefixItems) {
    for (let i = 0; i < schema.prefixItems.length && result.length < maxItems; i++) {
      result.push(await walk(schema.prefixItems[i], childCtx));
    }
  }

  // Determine target length
  const targetLen = ctx.random.int(Math.max(minItems, result.length), maxItems);

  // Fill remaining with items schema (items: false means no additional items allowed)
  if (schema.items !== false) {
    const itemSchema: JsonSchema = schema.items ?? {};
    while (result.length < targetLen) {
      result.push(await walk(itemSchema, childCtx));
    }
  }

  // Handle contains
  if (schema.contains) {
    const minContains = schema.minContains ?? 1;
    const maxContains = schema.maxContains ?? Math.max(minContains, 1);
    const containsCount = ctx.random.int(minContains, maxContains);

    for (let i = 0; i < containsCount; i++) {
      const item = await walk(schema.contains, childCtx);
      if (result.length < maxItems) {
        const pos = ctx.random.int(0, result.length);
        result.splice(pos, 0, item);
      } else if (result.length > 0) {
        const pos = ctx.random.int(0, result.length - 1);
        result[pos] = item;
      }
    }

    // Trim to maxItems if contains pushed us over
    while (result.length > maxItems) {
      result.pop();
    }
  }

  // Handle uniqueItems
  if (schema.uniqueItems && result.length > 0) {
    return dedup(result, schema, childCtx, maxItems);
  }

  return result;
}

async function dedup(
  arr: unknown[],
  schema: JsonSchemaObject,
  ctx: GenerateContext,
  maxItems: number
): Promise<unknown[]> {
  const seen = new Set<string>();
  const unique: unknown[] = [];

  for (const item of arr) {
    const key = JSON.stringify(item);
    if (!seen.has(key)) {
      seen.add(key);
      unique.push(item);
    }
  }

  // If we lost items, try to generate more unique ones
  const itemSchema: JsonSchema = schema.items ?? {};
  let attempts = 0;
  const minItems = schema.minItems ?? 0;
  while (unique.length < minItems && attempts < 100) {
    const item = await walk(itemSchema, ctx);
    const key = JSON.stringify(item);
    if (!seen.has(key)) {
      seen.add(key);
      unique.push(item);
    }
    attempts++;
  }

  return unique;
}
