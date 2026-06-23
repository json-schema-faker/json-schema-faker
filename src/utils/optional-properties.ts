import type { JsonSchema, JsonSchemaObject, GenerateContext } from "../types.js";
import { SCHEMA_KEYWORDS, isJsonSchema } from "./schema-keywords.js";

export function getInferredProperties(schema: JsonSchemaObject): Record<string, JsonSchema> {
  if (schema.properties) {
    return schema.properties;
  }

  if (schema.type === "object" || schema.type === undefined) {
    const inferred: Record<string, JsonSchema> = {};
    let hasInferredProperties = false;

    for (const [key, value] of Object.entries(schema)) {
      if (SCHEMA_KEYWORDS.has(key)) {
        continue;
      }

      if (isJsonSchema(value)) {
        inferred[key] = value as JsonSchema;
        hasInferredProperties = true;
      } else {
        inferred[key] = { const: value };
        hasInferredProperties = true;
      }
    }

    if (hasInferredProperties) {
      return inferred;
    }
  }

  return {};
}

export function getInferredRequired(
  schema: JsonSchemaObject,
  inferredProperties: Record<string, JsonSchema>
): string[] {
  if (schema.required) {
    return schema.required;
  }

  if (schema.properties === undefined && Object.keys(inferredProperties).length > 0) {
    return Object.keys(inferredProperties);
  }

  return [];
}

export function createOptionalPropertySelector(
  ctx: GenerateContext,
  optionalKeys: readonly string[]
): (key: string) => boolean {
  const alwaysFakeOptionals = ctx.alwaysFakeOptionals ?? false;
  const useFixedProbabilities = ctx.fixedProbabilities ?? false;
  const optionalsProbability = ctx.optionalsProbability ?? 0.5;

  let propertiesToInclude: Set<string> | undefined;
  if (useFixedProbabilities && !alwaysFakeOptionals && optionalKeys.length > 0) {
    const targetCount = Math.round(optionalKeys.length * optionalsProbability);
    propertiesToInclude = new Set(optionalKeys.slice(0, targetCount));
  }

  return (key: string) => {
    if (alwaysFakeOptionals) return true;
    if (propertiesToInclude) return propertiesToInclude.has(key);
    return ctx.random.bool(optionalsProbability);
  };
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function encodeJsonPointerSegment(segment: string): string {
  return segment.replace(/~/g, "~0").replace(/\//g, "~1");
}

export function createPropertyContext(ctx: GenerateContext, key: string): GenerateContext {
  const encodedKey = encodeJsonPointerSegment(key);
  const outputPath = ctx.outputPath === "/" ? `/${encodedKey}` : `${ctx.outputPath}/${encodedKey}`;

  return {
    ...ctx,
    path: `${ctx.path}/${key}`,
    outputPath,
  };
}

// Like getInferredProperties but also inspects allOf branches so that composition
// schemas are not silently passed through unfiltered.
function getFilterableProperties(schema: JsonSchemaObject): Record<string, JsonSchema> {
  const direct = getInferredProperties(schema);
  if (Object.keys(direct).length > 0) {
    return direct;
  }

  if (Array.isArray(schema.allOf)) {
    const merged: Record<string, JsonSchema> = {};
    for (const sub of schema.allOf) {
      if (typeof sub !== "object" || sub === null) continue;
      const subProps = getInferredProperties(sub as JsonSchemaObject);
      Object.assign(merged, subProps);
    }
    return merged;
  }

  return {};
}

// Like getInferredRequired but also collects required arrays from allOf branches.
function getFilterableRequired(
  schema: JsonSchemaObject,
  filterProperties: Record<string, JsonSchema>
): string[] {
  const direct = getInferredRequired(schema, filterProperties);
  if (direct.length > 0) {
    return direct;
  }

  if (Array.isArray(schema.allOf)) {
    const required: string[] = [];
    for (const sub of schema.allOf) {
      if (typeof sub !== "object" || sub === null) continue;
      const sub2 = sub as JsonSchemaObject;
      if (Array.isArray(sub2.required)) {
        required.push(...sub2.required);
      }
    }
    if (required.length > 0) {
      return [...new Set(required)];
    }
  }

  return [];
}

function filterNestedValue(value: unknown, propSchema: JsonSchema, propCtx: GenerateContext): unknown {
  if (!isPlainObject(value) || typeof propSchema !== "object" || propSchema === null) {
    return value;
  }
  return filterExampleObject(value, propSchema as JsonSchemaObject, propCtx);
}

export function filterExampleObject(
  value: Record<string, unknown>,
  schema: JsonSchemaObject,
  ctx: GenerateContext
): Record<string, unknown> {
  if (ctx.alwaysFakeOptionals === true) {
    return value;
  }

  const inferredProperties = getFilterableProperties(schema);
  if (Object.keys(inferredProperties).length === 0) {
    return value;
  }

  const inferredRequired = getFilterableRequired(schema, inferredProperties);
  const required = new Set(inferredRequired);

  // Include extra keys present in the example value (e.g. additionalProperties keys) so
  // they are subject to the same optional filter rather than being silently dropped.
  const allKnownKeys = new Set([...Object.keys(inferredProperties), ...Object.keys(value)]);
  const optionalKeys = [...allKnownKeys].filter((key) => !required.has(key));
  const shouldIncludeOptional = createOptionalPropertySelector(ctx, optionalKeys);

  const childCtxPath = ctx.path === "/" ? "/properties" : `${ctx.path}/properties`;
  const childCtx: GenerateContext = { ...ctx, depth: ctx.depth + 1, path: childCtxPath };

  const result: Record<string, unknown> = {};

  for (const key of allKnownKeys) {
    if (!(key in value)) {
      continue; // Key defined by schema but absent from example — skip without touching RNG
    }

    const propCtx = createPropertyContext(childCtx, key);
    const propSchema = inferredProperties[key] ?? true;

    if (required.has(key)) {
      result[key] = filterNestedValue(value[key], propSchema, propCtx);
    } else if (shouldIncludeOptional(key)) {
      result[key] = filterNestedValue(value[key], propSchema, propCtx);
    }
  }

  return result;
}

export function filterExampleDefaultValue(
  value: unknown,
  schema: JsonSchemaObject,
  ctx: GenerateContext
): unknown {
  if (!isPlainObject(value)) {
    return value;
  }
  return filterExampleObject(value, schema, ctx);
}
