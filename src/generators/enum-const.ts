import type { JsonSchemaObject, GenerateContext } from "../types.js";

export function generateEnumConst(
  schema: JsonSchemaObject,
  ctx: GenerateContext
): unknown {
  if (schema.const !== undefined) {
    return structuredClone(schema.const);
  }

  if (schema.enum !== undefined && schema.enum.length > 0) {
    const value = ctx.random.pick(schema.enum);
    return typeof value === "object" && value !== null
      ? structuredClone(value)
      : value;
  }

  throw new Error(`generateEnumConst called without enum or const at ${ctx.path}`);
}
