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
import { SCHEMA_KEYWORDS } from "./utils/schema-keywords.js";
import { pad2 } from "./utils/helpers.js";

const ALL_TYPES = ["string", "number", "integer", "boolean", "null", "object", "array"] as const;

function generateFromExtension(schema: JsonSchemaObject, ctx: GenerateContext, resolvedType?: string): unknown {
  if (schema.faker !== undefined && schema.chance !== undefined) {
    throw new Error(`ambiguous generator: both faker and chance are defined in ${ctx.path}`);
  }

  // If the randomly selected type is "null", return null directly
  // (faker generates strings, so it's not compatible with null type)
  if (resolvedType === "null") {
    return null;
  }

  if (schema.faker !== undefined) {
    try {
      const result = resolveFaker(schema.faker, ctx);
      // Apply format after faker if specified
      const stringResult = castToSchemaType(result, resolvedType ?? schema.type, ctx.path);
      if (typeof stringResult === "string" && schema.format) {
        return applyFormat(stringResult, schema.format, ctx);
      }
      return stringResult;
    } catch {
      // If faker can't be resolved, fall through to default generation
    }
  }

  if (schema.chance !== undefined) {
    try {
      const result = resolveChance(schema.chance, ctx);
      // Apply format after chance if specified
      const stringResult = castToSchemaType(result, resolvedType ?? schema.type, ctx.path);
      if (typeof stringResult === "string" && schema.format) {
        return applyFormat(stringResult, schema.format, ctx);
      }
      return stringResult;
    } catch {
      // If chance can't be resolved, fall through to default generation
    }
  }

  return undefined;
}

function applyFormat(value: string, format: string, ctx: GenerateContext): string {
  // Handle date format conversions
  if (format === "date") {
    // faker's date.past returns a Date object or ISO string
    const dateValue = typeof value === "string" ? new Date(value) : value;
    if (dateValue instanceof Date && !isNaN(dateValue.getTime())) {
      const year = dateValue.getFullYear();
      const month = pad2(dateValue.getMonth() + 1);
      const day = pad2(dateValue.getDate());
      return `${year}-${month}-${day}`;
    }
    // If it's already a date string, try to parse it
    if (typeof value === "string") {
      const parsed = Date.parse(value);
      if (!isNaN(parsed)) {
        const date = new Date(parsed);
        const year = date.getFullYear();
        const month = pad2(date.getMonth() + 1);
        const day = pad2(date.getDate());
        return `${year}-${month}-${day}`;
      }
    }
  }
  
  if (format === "date-time") {
    // Ensure ISO 8601 format
    const dateValue = typeof value === "string" ? new Date(value) : value;
    if (dateValue instanceof Date && !isNaN(dateValue.getTime())) {
      return dateValue.toISOString();
    }
    if (typeof value === "string" && Date.parse(value)) {
      return new Date(value).toISOString();
    }
  }
  
  // For other formats, return as-is (the format generator will be called later in generateString)
  return value;
}

function castToSchemaType(value: unknown, type: string | string[] | undefined, path: string): unknown {
  if (type === undefined) {
    return value;
  }

  const targetType = Array.isArray(type) ? type[0] : type;

  switch (targetType) {
    case "string":
      return value === null ? "null" : value === undefined ? "undefined" : String(value);
    case "number":
    case "integer":
      const num = Number(value);
      return targetType === "integer" ? Math.floor(num) : num;
    case "boolean":
      return Boolean(value);
    case "null":
      return value === false ? null : value;
    default:
      return value;
  }
}

function resolveFaker(fakerConfig: unknown, ctx: GenerateContext): unknown {
  if (!ctx.extensions?.faker) {
    const fakerPath = typeof fakerConfig === "string" ? fakerConfig : JSON.stringify(fakerConfig);
    throw new Error(`cannot resolve faker-generator for ${fakerPath} in ${ctx.path}`);
  }

  let fakerPath: string;
  let fakerArgs: unknown[] | undefined;

  if (typeof fakerConfig === "object" && fakerConfig !== null) {
    const fakerObj = fakerConfig as Record<string, unknown>;
    const keys = Object.keys(fakerObj);
    if (keys.length > 0) {
      fakerPath = keys[0];
      fakerArgs = fakerObj[fakerPath] as unknown[];
    } else {
      throw new Error(`cannot resolve faker-generator for ${JSON.stringify(fakerConfig)} in ${ctx.path}`);
    }
  } else {
    fakerPath = fakerConfig as string;
  }

  const parts = fakerPath.split(".");
  let current: any = ctx.extensions.faker;
  for (const part of parts) {
    try {
      current = current[part];
    } catch {
      throw new Error(`failed to resolve .${part} (${fakerPath})`);
    }
  }

  if (typeof current === "function") {
    return fakerArgs ? current(...fakerArgs) : current();
  } else {
    throw new Error(`cannot resolve faker-generator for ${fakerPath} in ${ctx.path}`);
  }
}

function resolveChance(chanceConfig: unknown, ctx: GenerateContext): unknown {
  if (!ctx.extensions?.chance) {
    const chanceType = typeof chanceConfig === "string"
      ? chanceConfig
      : Object.keys(chanceConfig as Record<string, unknown>)[0];
    throw new Error(`cannot resolve chance-generator for ${chanceType} in ${ctx.path}`);
  }

  if (typeof chanceConfig === "string") {
    const generator = ctx.extensions.chance[chanceConfig];
    if (typeof generator === "function") {
      return generator.call(ctx.extensions.chance);
    }
    throw new Error(`cannot resolve chance-generator for ${chanceConfig} in ${ctx.path}`);
  }

  if (typeof chanceConfig === "object" && chanceConfig !== null) {
    const chanceOptions = chanceConfig as Record<string, unknown>;
    const key = Object.keys(chanceOptions)[0];
    const options = chanceOptions[key] as Record<string, unknown> | undefined;
    const generator = ctx.extensions.chance[key];
    if (typeof generator === "function") {
      return options ? generator.call(ctx.extensions.chance, options) : generator.call(ctx.extensions.chance);
    }
  }

  throw new Error(`cannot resolve chance-generator in ${ctx.path}`);
}

function childContext(ctx: GenerateContext, segment: string): GenerateContext {
  const path = ctx.path === "/" ? `/${segment}` : `${ctx.path}/${segment}`;
  return { 
    ...ctx, 
    depth: ctx.depth + 1, 
    path,
    // Preserve refDepthReached flag
    refDepthReached: ctx.refDepthReached,
  };
}

export async function walk(schema: JsonSchema, ctx: GenerateContext): Promise<unknown> {
  // Boolean schemas
  if (schema === true) {
    return walk({}, ctx);
  }
  if (schema === false) {
    throw new Error(`Cannot generate value for 'false' schema at ${ctx.path}`);
  }

  // Check for faker/chance extensions - but first resolve type if it's an array
  // so we know which type was randomly selected
  let resolvedType: string | undefined;
  if (Array.isArray(schema.type)) {
    // For type arrays, pick a random type and store it in context
    // so the same type is used throughout this walk call
    const types = schema.type;
    resolvedType = ctx.random.pick(types);
    
    // Create a new context with the resolved type
    const extCtx: GenerateContext = {
      ...ctx,
      resolvedType
    };
    
    const extResult = generateFromExtension(schema, extCtx, resolvedType);
    if (extResult !== undefined) {
      // Apply string truncation if result is a string and maxLength is set
      if (typeof extResult === "string" && extCtx.maxLength !== undefined && extResult.length > extCtx.maxLength) {
        return extResult.slice(0, extCtx.maxLength);
      }
      return extResult;
    }
  } else {
    const extResult = generateFromExtension(schema, ctx, resolvedType);
    if (extResult !== undefined) {
      // Apply string truncation if result is a string and maxLength is set
      if (typeof extResult === "string" && ctx.maxLength !== undefined && extResult.length > ctx.maxLength) {
        return extResult.slice(0, ctx.maxLength);
      }
      return extResult;
    }
  }

  // $ref resolution
  if (schema.$ref) {
    const resolved = await resolveRef(schema, ctx);
    return walk(resolved.schema, childContext(resolved.ctx, "$ref"));
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

  // examples value (when useExamplesValue option is enabled)
  if (ctx.useExamplesValue) {
    if (Array.isArray(schema.examples) && schema.examples.length > 0) {
      return ctx.random.pick(schema.examples);
    }
    if (schema.example !== undefined) {
      return schema.example;
    }
  }

  // Determine type
  const type = resolveType(schema, ctx);

  // Handle unknown types
  if (type === null) {
    if (ctx.failOnInvalidTypes === false) {
      if (ctx.defaultInvalidTypeProduct !== undefined) {
        const defaultProduct = ctx.defaultInvalidTypeProduct;
        if (typeof defaultProduct === "string") {
          return handleDefaultInvalidTypeProduct(defaultProduct, ctx);
        }
        return defaultProduct;
      }
      // If failOnInvalidTypes is false but no defaultProduct is set, return null
      return null;
    }
    throw new Error(`unknown primitive ${schema.type} in ${ctx.path}/type`);
  }

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
      throw new Error(`Unknown type: ${type} at ${ctx.path}`);
  }
}

function resolveType(schema: JsonSchemaObject, ctx: GenerateContext): string | null {
  // Use pre-resolved type if available (set earlier in the walk)
  if (ctx.resolvedType !== undefined) {
    return ctx.resolvedType;
  }
  
  if (typeof schema.type === "string") {
    const knownTypes = ["string", "number", "integer", "boolean", "null", "object", "array"];
    if (!knownTypes.includes(schema.type)) {
      return null; // Unknown type
    }
    return schema.type;
  }

  if (Array.isArray(schema.type)) {
    return ctx.random.pick(schema.type);
  }

  // Infer type from keywords
  if (schema.properties || schema.required || schema.additionalProperties !== undefined || schema.patternProperties || schema.minProperties !== undefined || schema.maxProperties !== undefined) {
    return "object";
  }
  
  // Check for inferred properties (non-keyword keys that look like property definitions)
  if (hasInferredProperties(schema)) {
    return "object";
  }
  
  if (schema.items || schema.prefixItems || schema.contains || schema.minItems !== undefined || schema.maxItems !== undefined || schema.uniqueItems) {
    return "array";
  }
  if (schema.minimum !== undefined || schema.maximum !== undefined || schema.exclusiveMinimum !== undefined || schema.exclusiveMaximum !== undefined || schema.multipleOf !== undefined) {
    return "number";
  }
  if (schema.minLength !== undefined || schema.maxLength !== undefined || schema.pattern || schema.format || schema.faker !== undefined || schema.chance !== undefined) {
    return "string";
  }

  // No type info — pick randomly
  return ctx.random.pick(ALL_TYPES);
}

/**
 * Check if a schema has inferred properties (non-keyword keys that could be property definitions)
 */
function hasInferredProperties(schema: JsonSchemaObject): boolean {
  // Only consider if no explicit object keywords
  if (schema.properties || schema.type === 'object' || schema.type === 'array') {
    return false;
  }
  
  for (const key of Object.keys(schema)) {
    if (SCHEMA_KEYWORDS.has(key)) {
      continue;
    }
    const value = schema[key];
    // If it's an object, it could be a schema or a literal
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      return true;
    }
  }
  
  return false;
}

function handleDefaultInvalidTypeProduct(typeName: string, ctx: GenerateContext): unknown {
  switch (typeName) {
    case "string":
      return "";
    case "number":
    case "integer":
      return 0;
    case "boolean":
      return false;
    case "null":
      return null;
    case "object":
      return {};
    case "array":
      return [];
    default:
      return null;
  }
}
