import type { JsonSchemaObject, GenerateContext } from "../types.js";
import { generateNumber } from "./number.js";

export function generateInteger(
  schema: JsonSchemaObject,
  ctx: GenerateContext
): number {
  return generateNumber(schema, ctx, true);
}
