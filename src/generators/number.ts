import type { JsonSchemaObject, GenerateContext } from "../types.js";

export function generateNumber(
  schema: JsonSchemaObject,
  ctx: GenerateContext,
  asInteger = false
): number {
  let min = -1000;
  let max = 1000;
  let exclusiveMin = false;
  let exclusiveMax = false;

  if (schema.minimum !== undefined) min = schema.minimum;
  if (schema.maximum !== undefined) max = schema.maximum;

  if (schema.exclusiveMinimum !== undefined) {
    if (typeof schema.exclusiveMinimum === "boolean") {
      exclusiveMin = schema.exclusiveMinimum;
    } else {
      min = schema.exclusiveMinimum;
      exclusiveMin = true;
    }
  }
  if (schema.exclusiveMaximum !== undefined) {
    if (typeof schema.exclusiveMaximum === "boolean") {
      exclusiveMax = schema.exclusiveMaximum;
    } else {
      max = schema.exclusiveMaximum;
      exclusiveMax = true;
    }
  }

  if (schema.multipleOf !== undefined) {
    return generateMultipleOf(schema.multipleOf, min, max, exclusiveMin, exclusiveMax, ctx);
  }

  if (asInteger) {
    const lo = exclusiveMin ? Math.floor(min) + 1 : Math.ceil(min);
    const hi = exclusiveMax ? Math.ceil(max) - 1 : Math.floor(max);
    return ctx.random.int(lo, hi);
  }

  const lo = exclusiveMin ? min + Number.EPSILON : min;
  const hi = exclusiveMax ? max - Number.EPSILON : max;
  return lo + ctx.random.next() * (hi - lo);
}

function generateMultipleOf(
  multipleOf: number,
  min: number,
  max: number,
  exclusiveMin: boolean,
  exclusiveMax: boolean,
  ctx: GenerateContext
): number {
  let lo = Math.ceil(min / multipleOf);
  let hi = Math.floor(max / multipleOf);

  if (exclusiveMin && lo * multipleOf === min) lo++;
  if (exclusiveMax && hi * multipleOf === max) hi--;

  if (lo > hi) return lo * multipleOf; // fallback
  const factor = ctx.random.int(lo, hi);
  // Round to avoid floating point issues
  return Math.round(factor * multipleOf * 1e10) / 1e10;
}
