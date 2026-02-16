import type { JsonSchema, JsonSchemaObject, GenerateContext } from "../types.js";
import { evaluateJsonPath } from "../utils/jsonpath.js";
import { SCHEMA_KEYWORDS, isJsonSchema } from "../utils/schema-keywords.js";

/**
 * Get inferred properties from a schema object.
 * If the schema has explicit 'properties', use those.
 * Otherwise, treat non-keyword child objects as properties.
 */
function getInferredProperties(schema: JsonSchemaObject): Record<string, JsonSchema> {
  // If schema has explicit properties, use those
  if (schema.properties) {
    return schema.properties;
  }

  // If schema has type:object but no properties, check for inferred properties
  if (schema.type === 'object' || schema.type === undefined) {
    const inferred: Record<string, JsonSchema> = {};

    for (const [key, value] of Object.entries(schema)) {
      // Skip schema keywords
      if (SCHEMA_KEYWORDS.has(key)) {
        continue;
      }

      // If it looks like a schema, use it as-is
      if (isJsonSchema(value)) {
        inferred[key] = value as JsonSchema;
      } else {
        // Treat as a const/literal value - wrap in a const schema
        inferred[key] = { const: value };
      }
    }

    return inferred;
  }

  return {};
}

/**
 * Recursively resolve jsonPath references in a generated value
 * This is called after the initial generation to cross-reference values
 *
 * @param value - The current value being processed
 * @param schema - The schema for the current value
 * @param ctx - The generation context
 * @param rootValue - The root generated object (used for jsonPath resolution)
 */
export async function resolveJsonPathsInValue(
  value: unknown,
  schema: JsonSchema,
  ctx: GenerateContext,
  rootValue?: unknown
): Promise<unknown> {
  // If jsonPath resolution is not enabled, return as-is
  if (!ctx.resolveJsonPath) {
    return value;
  }

  // Use the current value as root if not provided (for recursive calls)
  const root = rootValue ?? value;

  // Boolean schemas
  if (schema === true || schema === false) {
    return value;
  }

  // Handle $ref - we need to resolve it first
  if (schema.$ref) {
    // For refs, we'd need to resolve and then process
    // For now, just return the value as-is
    return value;
  }

  const objSchema = schema as JsonSchemaObject;

  // Handle composition
  if (objSchema.allOf || objSchema.anyOf || objSchema.oneOf) {
    // For composition, just return as-is since we don't know which branch was taken
    return value;
  }

  // Handle objects
  if (typeof value === "object" && value !== null && !Array.isArray(value)) {
    const result = { ...value } as Record<string, unknown>;

    // Get inferred properties (handles both explicit and inferred)
    const properties = getInferredProperties(objSchema);

    // Process each property
    for (const [key, propSchema] of Object.entries(properties)) {
      if (key in result) {
        const propValue = result[key];

        // Check if this property has a jsonPath
        if (
          typeof propSchema === "object" &&
          propSchema !== null &&
          "jsonPath" in propSchema &&
          typeof propSchema.jsonPath === "string"
        ) {
          // Resolve the jsonPath against the root generated value
          const matches = evaluateJsonPath(propSchema.jsonPath, root);
          if (matches.length > 0) {
            // Pick a random match
            result[key] = ctx.random.pick(matches);
          }
        } else {
          // Recursively process nested objects, passing the root
          const resolved = await resolveJsonPathsInValue(
            propValue,
            propSchema,
            ctx,
            root
          );
          result[key] = resolved;
        }
      }
    }

    return result;
  }

  // Handle arrays
  if (Array.isArray(value) && objSchema.items) {
    const results: unknown[] = [];
    for (const item of value) {
      const resolved = await resolveJsonPathsInValue(item, objSchema.items, ctx, root);
      results.push(resolved);
    }
    return results;
  }

  return value;
}
