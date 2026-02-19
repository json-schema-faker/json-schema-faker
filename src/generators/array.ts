import type { JsonSchema, JsonSchemaObject, GenerateContext } from "../types.js";
import { walk } from "../schema-walker.js";

export async function generateArray(
  schema: JsonSchemaObject,
  ctx: GenerateContext
): Promise<unknown[]> {
  if (ctx.depth >= ctx.maxDepth) {
    const needed = schema.minItems ?? 0;
    return needed > 0 ? Array.from({ length: needed }, () => null) : [];
  }

  // Check if refDepth max was reached - generate stub array respecting minItems
  if (ctx.refDepthReached) {
    const needed = schema.minItems ?? 0;
    return needed > 0 ? Array.from({ length: needed }, () => null) : [];
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
  
  // Track if we've hit the ref depth limit
  const maxRefDepth = ctx.refDepthMax;

  // Compute effective min/max. Schema constraints are hard bounds.
  let minItems = ctx.minItems ?? schema.minItems ?? 0;
  let maxItems = ctx.maxItems ?? schema.maxItems ?? Math.max(minItems, ctx.maxDefaultItems);

  // schema.maxItems is a hard upper bound — no output may exceed it
  if (schema.maxItems !== undefined && maxItems > schema.maxItems) {
    maxItems = schema.maxItems;
  }

  // schema.minItems is a hard lower bound — no output may go below it;
  // it overrides ctx.maxItems if necessary to keep the output schema-valid
  if (schema.minItems !== undefined && minItems < schema.minItems) {
    minItems = schema.minItems;
  }

  // Ensure range is valid. When schema.maxItems is set it is the absolute ceiling.
  // When it is not set, schema.minItems drives the floor upward.
  if (maxItems < minItems) {
    if (schema.maxItems !== undefined) {
      // schema.maxItems is the hard cap — clamp minItems down to it
      minItems = maxItems;
    } else {
      // No schema upper bound — let schema.minItems drive maxItems up
      maxItems = minItems;
    }
  }

  // When alwaysFakeOptionals is true, use maxItems as the target
  if (ctx.alwaysFakeOptionals) {
    maxItems = Math.max(minItems, maxItems);
  }

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
  let targetLen: number;
  
  // If refDepth has reached maxRefDepth - 1, don't generate items beyond what minItems requires
  if (maxRefDepth !== undefined && ctx.refDepth >= maxRefDepth - 1) {
    const needed = schema.minItems ?? 0;
    return needed > 0 ? Array.from({ length: needed }, () => null) : [];
  }
  
  const alwaysFakeOptionals = ctx.alwaysFakeOptionals ?? false;
  const useFixedProbabilities = ctx.fixedProbabilities ?? false;
  const optionalsProbability = ctx.optionalsProbability ?? 0.5;

  if (alwaysFakeOptionals) {
    // alwaysFakeOptionals overrides probabilities - generate maximum items
    targetLen = maxItems;
  } else if (useFixedProbabilities) {
    // When using fixed probabilities, deterministically calculate target length
    // based on the probability and the available range
    const availableRange = maxItems - Math.max(minItems, result.length);
    const additionalItems = Math.round(availableRange * optionalsProbability);
    targetLen = Math.max(minItems, result.length) + additionalItems;
  } else {
    targetLen = ctx.random.int(Math.max(minItems, result.length), maxItems);
  }

  // Fill remaining with items schema (items: false means no additional items allowed)
  // Only generate additional items if:
  // 1. items is explicitly defined (not undefined), OR
  // 2. prefixItems is NOT present (use items as fallback for non-tuple arrays)
  // 3. additionalItems is defined (not false) when prefixItems is present
  const hasExplicitItems = schema.items !== undefined;
  const hasPrefixItems = schema.prefixItems !== undefined;
  const hasAdditionalItems = schema.additionalItems !== undefined;
  
  // Determine the schema to use for additional items
  let additionalItemSchema: JsonSchema | undefined;
  if (hasPrefixItems) {
    // For tuple syntax, use additionalItems if defined, otherwise fall back to items
    if (hasAdditionalItems) {
      additionalItemSchema = schema.additionalItems as JsonSchema;
    } else if (schema.items !== undefined) {
      // When additionalItems is not specified, default to using items schema
      additionalItemSchema = schema.items as JsonSchema;
    }
    // If neither additionalItems nor items is defined, additionalItemSchema stays undefined (allow any)
  } else {
    // For regular arrays, use items
    additionalItemSchema = schema.items as JsonSchema | undefined;
  }
  
  if (additionalItemSchema !== false && additionalItemSchema !== undefined) {
    const itemSchema: JsonSchema = additionalItemSchema ?? {};
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

  // Handle containsAll: multiple contains constraints collected from allOf merging
  if (schema.containsAll) {
    // Track positions already claimed by a containsAll item so they won't be overwritten
    const claimedPositions = new Set<number>();

    for (const containsSchema of schema.containsAll) {
      let item = await walk(containsSchema, childCtx);

      if (seen) {
        const key = JSON.stringify(item);
        if (seen.has(key)) {
          let uniqueFound = false;
          for (let attempts = 0; attempts < 50; attempts++) {
            item = await walk(containsSchema, childCtx);
            const newKey = JSON.stringify(item);
            if (!seen.has(newKey)) {
              seen.add(newKey);
              uniqueFound = true;
              break;
            }
          }
          if (!uniqueFound) continue;
        } else {
          seen.add(key);
        }
      }

      if (result.length < maxItems) {
        const pos = ctx.random.int(0, result.length);
        result.splice(pos, 0, item);
        // Shift claimed positions that are >= insertion point
        const shifted = new Set<number>();
        for (const p of claimedPositions) {
          shifted.add(p >= pos ? p + 1 : p);
        }
        claimedPositions.clear();
        for (const p of shifted) claimedPositions.add(p);
        claimedPositions.add(pos);
      } else if (result.length > 0) {
        // Only overwrite positions not already claimed by a previous containsAll item
        const available = Array.from({ length: result.length }, (_, i) => i)
          .filter(i => !claimedPositions.has(i));
        if (available.length > 0) {
          const pos = available[ctx.random.int(0, available.length - 1)];
          result[pos] = item;
          claimedPositions.add(pos);
        }
        // If all positions are claimed, push beyond maxItems temporarily
        else {
          result.push(item);
          claimedPositions.add(result.length - 1);
        }
      }
    }

    // Trim to maxItems if containsAll pushed us over (preserve claimed positions)
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
