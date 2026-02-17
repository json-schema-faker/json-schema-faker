import type { JsonSchemaObject, GenerateContext } from "../types.js";

export function generateEnumConst(
  schema: JsonSchemaObject,
  ctx: GenerateContext
): unknown {
  if (schema.const !== undefined) {
    return structuredClone(schema.const);
  }

  if (schema.enum !== undefined && schema.enum.length > 0) {
    let validValues = schema.enum;
    
    // Filter enum values based on numeric constraints
    if (schema.minimum !== undefined || schema.maximum !== undefined || 
        schema.exclusiveMinimum !== undefined || schema.exclusiveMaximum !== undefined ||
        schema.multipleOf !== undefined) {
      const min = schema.exclusiveMinimum ?? schema.minimum ?? -Infinity;
      const max = schema.exclusiveMaximum ?? schema.maximum ?? Infinity;
      const isExclusiveMin = schema.exclusiveMinimum !== undefined;
      const isExclusiveMax = schema.exclusiveMaximum !== undefined;
      
      validValues = validValues.filter((v) => {
        if (typeof v !== "number") return true;
        const aboveMin = isExclusiveMin ? v > min : v >= min;
        const belowMax = isExclusiveMax ? v < max : v <= max;
        if (!aboveMin || !belowMax) return false;
        
        // Handle multipleOf
        if (schema.multipleOf !== undefined) {
          // Use scaled integer comparison to avoid floating point issues
          const multipleOf = schema.multipleOf;
          const decimalPlaces = multipleOf.toString().includes('.') 
            ? multipleOf.toString().split('.')[1].length 
            : 0;
          const precision = Math.pow(10, decimalPlaces);
          const scaledVal = Math.round(v * precision);
          const scaledMultipleOf = Math.round(multipleOf * precision);
          if (scaledVal % scaledMultipleOf !== 0) return false;
        }
        
        return true;
      });
    }
    
    // Filter based on string length constraints
    if (schema.minLength !== undefined || schema.maxLength !== undefined) {
      const minLen = schema.minLength ?? 0;
      const maxLen = schema.maxLength ?? Infinity;
      validValues = validValues.filter((v) => {
        if (typeof v !== "string") return true;
        return v.length >= minLen && v.length <= maxLen;
      });
    }
    
    // Fallback to original enum if all filtered out
    if (validValues.length === 0) {
      validValues = schema.enum;
    }
    
    const value = ctx.random.pick(validValues);
    return typeof value === "object" && value !== null
      ? structuredClone(value)
      : value;
  }

  throw new Error(`generateEnumConst called without enum or const at ${ctx.path}`);
}
