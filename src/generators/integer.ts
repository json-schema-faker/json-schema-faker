import type { JsonSchemaObject, GenerateContext } from "../types.js";
import { generateNumber } from "./number.js";

export function generateInteger(
  schema: JsonSchemaObject,
  ctx: GenerateContext
): number {
  if (schema.autoIncrement) {
    const initialOffset = schema.initialOffset ?? 1;
    const counterKey = getAutoIncrementCounterKey(ctx.path);
    const counters = ctx.autoIncrementCounters ?? new Map();
    
    const currentCount = counters.get(counterKey) ?? (initialOffset - 1);
    const nextValue = currentCount + 1;
    counters.set(counterKey, nextValue);
    
    if (ctx.autoIncrementCounters) {
      ctx.autoIncrementCounters.set(counterKey, nextValue);
    }
    
    return nextValue;
  }
  
  return generateNumber(schema, ctx, true);
}

function getAutoIncrementCounterKey(path: string): string {
  const arrayItemParents = new Set(["items", "prefixItems", "contains", "additionalItems"]);
  const segments = path.split("/").filter((segment) => segment !== "");

  return segments
    .filter((segment, index) => {
      const previous = segments[index - 1];
      return !(/^\d+$/.test(segment) && previous !== undefined && arrayItemParents.has(previous));
    })
    .join("/");
}
