import type { JsonSchema, JsonSchemaObject, GenerateContext } from "./types.js";
import { generateNull } from "./generators/null.js";
import { generateBoolean } from "./generators/boolean.js";
import { generateNumber } from "./generators/number.js";
import { generateInteger } from "./generators/integer.js";
import { generateString } from "./generators/string.js";
import { generateEnumConst } from "./generators/enum-const.js";
import { generateObject } from "./generators/object.js";
import { generateArray } from "./generators/array.js";
import { generateComposition } from "./generators/composition.js";
import { resolveRef } from "./ref-resolver.js";

const ALL_TYPES = ["string", "number", "integer", "boolean", "null", "object", "array"] as const;

export async function walk(schema: JsonSchema, ctx: GenerateContext): Promise<unknown> {
  // Boolean schemas
  if (schema === true) {
    return walk({}, ctx);
  }
  if (schema === false) {
    throw new Error("Cannot generate value for 'false' schema");
  }

  // $ref resolution
  if (schema.$ref) {
    const resolved = await resolveRef(schema, ctx);
    return walk(resolved.schema, resolved.ctx);
  }

  // Composition keywords
  if (schema.allOf || schema.anyOf || schema.oneOf || schema.not || schema.if) {
    return generateComposition(schema, ctx);
  }

  // const / enum
  if (schema.const !== undefined || schema.enum !== undefined) {
    return generateEnumConst(schema, ctx);
  }

  // default value (when useDefaultValue option is enabled)
  if (ctx.useDefaultValue && schema.default !== undefined) {
    return schema.default;
  }

  // Determine type
  const type = resolveType(schema, ctx);

  switch (type) {
    case "null":
      return generateNull(ctx);
    case "boolean":
      return generateBoolean(ctx);
    case "number":
      return generateNumber(schema, ctx);
    case "integer":
      return generateInteger(schema, ctx);
    case "string":
      return generateString(schema, ctx);
    case "object":
      return generateObject(schema, ctx);
    case "array":
      return generateArray(schema, ctx);
    default:
      throw new Error(`Unknown type: ${type}`);
  }
}

function resolveType(schema: JsonSchemaObject, ctx: GenerateContext): string {
  if (typeof schema.type === "string") return schema.type;

  if (Array.isArray(schema.type)) {
    return ctx.random.pick(schema.type);
  }

  // Infer type from keywords
  if (schema.properties || schema.required || schema.additionalProperties !== undefined || schema.patternProperties || schema.minProperties !== undefined || schema.maxProperties !== undefined) {
    return "object";
  }
  if (schema.items || schema.prefixItems || schema.contains || schema.minItems !== undefined || schema.maxItems !== undefined || schema.uniqueItems) {
    return "array";
  }
  if (schema.minimum !== undefined || schema.maximum !== undefined || schema.exclusiveMinimum !== undefined || schema.exclusiveMaximum !== undefined || schema.multipleOf !== undefined) {
    return "number";
  }
  if (schema.minLength !== undefined || schema.maxLength !== undefined || schema.pattern || schema.format) {
    return "string";
  }

  // No type info — pick randomly
  return ctx.random.pick(ALL_TYPES);
}
