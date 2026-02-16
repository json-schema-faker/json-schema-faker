import type { JsonSchemaObject, GenerateContext } from "../types.js";
import { generateNumber } from "./number.js";

export function generateInteger(
  schema: JsonSchemaObject,
  ctx: GenerateContext
): number {
  if (schema.autoIncrement) {
    const initialOffset = schema.initialOffset ?? 1;
    const counterKey = ctx.path;
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
