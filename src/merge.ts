import type { JsonSchema, JsonSchemaObject } from "./types.js";

export function mergeSchemas(schemas: JsonSchema[]): JsonSchemaObject {
  const result: JsonSchemaObject = {};

  for (const schema of schemas) {
    if (typeof schema === "boolean") {
      if (!schema) return { not: {} } as JsonSchemaObject; // false schema
      continue; // true schema adds nothing
    }
    mergePairInto(result, schema);
  }

  return result;
}

/**
 * Merge two JSON schemas together, returning a new merged schema
 */
function mergePair(a: JsonSchema, b: JsonSchema): JsonSchemaObject {
  if (typeof a === "boolean" || typeof b === "boolean") {
    return {};
  }
  if (typeof a !== "object" || a === null) {
    return typeof b === "object" && b !== null ? b as JsonSchemaObject : {};
  }
  if (typeof b !== "object" || b === null) {
    return a as JsonSchemaObject;
  }
  
  const result: JsonSchemaObject = { ...a };
  mergePairInto(result, b);
  return result;
}

function mergePairInto(target: JsonSchemaObject, source: JsonSchemaObject): void {
  // Type intersection
  if (source.type !== undefined) {
    if (target.type === undefined) {
      target.type = source.type;
    } else {
      target.type = intersectTypes(target.type, source.type);
    }
  }

  // Numeric bounds — take the tighter bound
  if (source.minimum !== undefined) {
    target.minimum = target.minimum !== undefined ? Math.max(target.minimum, source.minimum) : source.minimum;
  }
  if (source.maximum !== undefined) {
    target.maximum = target.maximum !== undefined ? Math.min(target.maximum, source.maximum) : source.maximum;
  }
  if (source.exclusiveMinimum !== undefined) {
    target.exclusiveMinimum = target.exclusiveMinimum !== undefined
      ? Math.max(target.exclusiveMinimum, source.exclusiveMinimum)
      : source.exclusiveMinimum;
  }
  if (source.exclusiveMaximum !== undefined) {
    target.exclusiveMaximum = target.exclusiveMaximum !== undefined
      ? Math.min(target.exclusiveMaximum, source.exclusiveMaximum)
      : source.exclusiveMaximum;
  }
  if (source.multipleOf !== undefined) {
    target.multipleOf = source.multipleOf;
  }

  // String bounds
  if (source.minLength !== undefined) {
    target.minLength = target.minLength !== undefined ? Math.max(target.minLength, source.minLength) : source.minLength;
  }
  if (source.maxLength !== undefined) {
    target.maxLength = target.maxLength !== undefined ? Math.min(target.maxLength, source.maxLength) : source.maxLength;
  }
  if (source.pattern !== undefined) {
    // Can't easily intersect patterns; use the latest one
    target.pattern = source.pattern;
  }
  if (source.format !== undefined) {
    target.format = source.format;
  }

  // Array bounds
  if (source.minItems !== undefined) {
    target.minItems = target.minItems !== undefined ? Math.max(target.minItems, source.minItems) : source.minItems;
  }
  if (source.maxItems !== undefined) {
    target.maxItems = target.maxItems !== undefined ? Math.min(target.maxItems, source.maxItems) : source.maxItems;
  }
  if (source.uniqueItems) target.uniqueItems = true;
  if (source.items !== undefined) target.items = source.items;
  if (source.prefixItems !== undefined) {
    // Merge prefixItems by merging each corresponding element
    if (target.prefixItems === undefined) {
      target.prefixItems = source.prefixItems;
    } else {
      const merged: JsonSchema[] = [];
      const maxLen = Math.max(target.prefixItems.length, source.prefixItems.length);
      for (let i = 0; i < maxLen; i++) {
        const targetItem = target.prefixItems[i];
        const sourceItem = source.prefixItems[i];
        if (targetItem !== undefined && sourceItem !== undefined) {
          // Merge both items
          merged.push(mergePair(targetItem, sourceItem));
        } else if (targetItem !== undefined) {
          merged.push(targetItem);
        } else if (sourceItem !== undefined) {
          merged.push(sourceItem);
        }
      }
      target.prefixItems = merged;
    }
  }
  if (source.contains !== undefined) target.contains = source.contains;

  // Object — merge properties, union required
  if (source.properties) {
    target.properties = deepMergeProperties(target.properties ?? {}, source.properties);
  }
  if (source.required) {
    target.required = [...new Set([...(target.required ?? []), ...source.required])];
  }
  if (source.additionalProperties !== undefined) {
    target.additionalProperties = source.additionalProperties;
  }
  if (source.patternProperties) {
    target.patternProperties = { ...(target.patternProperties ?? {}), ...source.patternProperties };
  }
  if (source.minProperties !== undefined) {
    target.minProperties = target.minProperties !== undefined ? Math.max(target.minProperties, source.minProperties) : source.minProperties;
  }
  if (source.maxProperties !== undefined) {
    target.maxProperties = target.maxProperties !== undefined ? Math.min(target.maxProperties, source.maxProperties) : source.maxProperties;
  }

  // Enum/const
  if (source.const !== undefined) target.const = source.const;
  if (source.enum !== undefined) {
    if (target.enum !== undefined) {
      // Intersect enums
      const sourceSet = new Set(source.enum.map((v) => JSON.stringify(v)));
      target.enum = target.enum.filter((v) => sourceSet.has(JSON.stringify(v)));
    } else {
      target.enum = source.enum;
    }
  }

  // Refs
  if (source.$ref) target.$ref = source.$ref;
  if (source.$defs) target.$defs = { ...(target.$defs ?? {}), ...source.$defs };

  // Composition keywords - keep them for later processing
  if (source.allOf) target.allOf = source.allOf;
  if (source.anyOf) target.anyOf = source.anyOf;
  if (source.oneOf) target.oneOf = source.oneOf;
}

function intersectTypes(
  a: string | string[],
  b: string | string[]
): string | string[] {
  const aArr = Array.isArray(a) ? a : [a];
  const bArr = Array.isArray(b) ? b : [b];
  const intersection = aArr.filter((t) => bArr.includes(t));

  if (intersection.length === 0) return aArr[0]; // fallback
  if (intersection.length === 1) return intersection[0];
  return intersection;
}

function deepMergeProperties(
  target: Record<string, JsonSchema>,
  source: Record<string, JsonSchema>
): Record<string, JsonSchema> {
  const result: Record<string, JsonSchema> = { ...target };

  for (const [key, sourceSchema] of Object.entries(source)) {
    const targetSchema = target[key];

    if (targetSchema === undefined) {
      result[key] = sourceSchema;
    } else if (typeof targetSchema === "object" && typeof sourceSchema === "object") {
      result[key] = mergePair(targetSchema, sourceSchema) as JsonSchema;
    } else {
      result[key] = sourceSchema;
    }
  }

  return result;
}
