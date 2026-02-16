import type { JsonSchema, JsonSchemaObject, GenerateContext } from "../types.js";
import { walk } from "../schema-walker.js";

export async function generateArray(
  schema: JsonSchemaObject,
  ctx: GenerateContext
): Promise<unknown[]> {
  if (ctx.depth >= ctx.maxDepth) {
    return [];
  }

  // Check for contradictory schema: items:false but minItems > 0
  if (schema.items === false && (schema.minItems ?? 0) > 0) {
    const prefixItemCount = schema.prefixItems?.length ?? 0;
    if ((schema.minItems ?? 0) > prefixItemCount) {
      throw new Error(
        `missing items for ${schema.minItems} in ${ctx.path}: items is false but minItems (${schema.minItems}) exceeds prefixItems count (${prefixItemCount})`
      );
    }
  }

  const childCtxPath = ctx.path === "/" ? "/items" : `${ctx.path}/items`;
  const childCtx: GenerateContext = { ...ctx, depth: ctx.depth + 1, path: childCtxPath };
  const result: unknown[] = [];

  // Use context overrides if provided, otherwise use schema values
  const minItems = ctx.minItems ?? schema.minItems ?? 0;
  const maxItems = ctx.maxItems ?? schema.maxItems ?? Math.max(minItems, ctx.maxDefaultItems);

  // Track seen values for uniqueItems
  const seen = schema.uniqueItems ? new Set<string>() : null;

  // Helper to add item with uniqueness check
  const addItem = async (itemSchema: JsonSchema, itemCtx: GenerateContext = childCtx): Promise<boolean> => {
    let item = await walk(itemSchema, itemCtx);

    if (seen) {
      const key = JSON.stringify(item);
      if (seen.has(key)) {
        // Try to generate a unique item (limited attempts)
        for (let attempts = 0; attempts < 50; attempts++) {
          item = await walk(itemSchema, childCtx);
          const newKey = JSON.stringify(item);
          if (!seen.has(newKey)) {
            seen.add(newKey);
            result.push(item);
            return true;
          }
        }
        return false; // Could not generate unique item
      }
      seen.add(key);
    }

    result.push(item);
    return true;
  };

  // Handle prefixItems (Draft 2020-12 tuple syntax)
  if (schema.prefixItems) {
    for (let i = 0; i < schema.prefixItems.length && result.length < maxItems; i++) {
      const itemCtx = { ...childCtx, path: `${childCtx.path}/${i}` };
      const success = await addItem(schema.prefixItems[i], itemCtx);
      if (!success) break;
    }
  }

  // Determine target length
  const targetLen = ctx.random.int(Math.max(minItems, result.length), maxItems);

  // Fill remaining with items schema (items: false means no additional items allowed)
  if (schema.items !== false) {
    const itemSchema: JsonSchema = schema.items ?? {};
    while (result.length < targetLen) {
      const success = await addItem(itemSchema);
      if (!success) break; // Stop if we can't generate more unique items
    }
  }

  // Handle contains
  if (schema.contains) {
    const minContains = schema.minContains ?? 1;
    const maxContains = schema.maxContains ?? Math.max(minContains, 1);
    const containsCount = ctx.random.int(minContains, maxContains);

    for (let i = 0; i < containsCount; i++) {
      let item = await walk(schema.contains, childCtx);

      // Check uniqueness for contains items too
      if (seen) {
        const key = JSON.stringify(item);
        if (seen.has(key)) {
          // Try to generate unique item
          let uniqueFound = false;
          for (let attempts = 0; attempts < 50; attempts++) {
            item = await walk(schema.contains, childCtx);
            const newKey = JSON.stringify(item);
            if (!seen.has(newKey)) {
              seen.add(newKey);
              uniqueFound = true;
              break;
            }
          }
          if (!uniqueFound) continue; // Skip if can't generate unique item
        } else {
          seen.add(key);
        }
      }

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

  // Handle uniqueItems - fill up to minItems if needed
  if (schema.uniqueItems && result.length > 0) {
    return fillUniqueItems(result, schema, childCtx, minItems, maxItems, seen!);
  }

  return result;
}

async function fillUniqueItems(
  arr: unknown[],
  schema: JsonSchemaObject,
  ctx: GenerateContext,
  minItems: number,
  maxItems: number,
  seen: Set<string>
): Promise<unknown[]> {
  const itemSchema: JsonSchema = schema.items ?? {};

  // Try to fill up to minItems with unique values
  let attempts = 0;
  const maxAttempts = 100;

  while (arr.length < minItems && attempts < maxAttempts) {
    attempts++;
    const item = await walk(itemSchema, ctx);
    const key = JSON.stringify(item);

    if (!seen.has(key)) {
      seen.add(key);
      arr.push(item);
    }
  }

  // Trim to maxItems if needed
  while (arr.length > maxItems) {
    arr.pop();
  }

  return arr;
}
