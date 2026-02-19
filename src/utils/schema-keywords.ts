/**
 * JSON Schema keywords that shouldn't be treated as properties
 * Used to distinguish between schema definitions and property names
 */
export const SCHEMA_KEYWORDS = new Set([
  // Meta (2020-12 spec)
  "$schema",
  "$id",
  "$ref",
  "$defs",
  "$anchor",
  "$dynamicRef",
  "$dynamicAnchor",
  "$vocabulary",
  "$comment",

  // Type
  "type",
  "enum",
  "const",

  // Numeric
  "minimum",
  "maximum",
  "exclusiveMinimum",
  "exclusiveMaximum",
  "multipleOf",

  // String
  "minLength",
  "maxLength",
  "pattern",
  "format",
  "contentEncoding",
  "contentMediaType",
  "contentSchema",

  // Array
  "items",
  "prefixItems",
  "contains",
  "minItems",
  "maxItems",
  "uniqueItems",
  "minContains",
  "maxContains",

  // Object
  "properties",
  "required",
  "additionalProperties",
  "patternProperties",
  "minProperties",
  "maxProperties",
  "propertyNames",
  "dependentRequired",
  "dependentSchemas",

  // Composition
  "allOf",
  "anyOf",
  "oneOf",
  "not",
  "if",
  "then",
  "else",

  // Extensions (non-standard)
  "faker",
  "chance",
  "jsonPath",
  "template",

  // Metadata
  "default",
  "examples",
  "description",
  "title",
  "readOnly",
  "writeOnly",
  "deprecated",
]);

/**
 * Check if a key is a JSON Schema keyword
 */
export function isSchemaKeyword(key: string): boolean {
  return SCHEMA_KEYWORDS.has(key);
}

/**
 * Check if a value looks like a JSON Schema (has schema keywords)
 */
export function isJsonSchema(value: unknown): boolean {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const obj = value as Record<string, unknown>;
  return Object.keys(obj).some((key) => SCHEMA_KEYWORDS.has(key));
}
