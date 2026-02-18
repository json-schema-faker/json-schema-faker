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

    // Filter based on array item count constraints
    if (schema.minItems !== undefined || schema.maxItems !== undefined) {
      const minItems = schema.minItems ?? 0;
      const maxItems = schema.maxItems ?? Infinity;
      validValues = validValues.filter((v) => {
        if (!Array.isArray(v)) return true;
        return v.length >= minItems && v.length <= maxItems;
      });
    }

    // Filter based on object property count constraints
    if (schema.minProperties !== undefined || schema.maxProperties !== undefined) {
      const minProps = schema.minProperties ?? 0;
      const maxProps = schema.maxProperties ?? Infinity;
      validValues = validValues.filter((v) => {
        if (typeof v !== "object" || v === null || Array.isArray(v)) return true;
        return Object.keys(v).length >= minProps && Object.keys(v).length <= maxProps;
      });
    }

    // Throw error if enum values don't satisfy constraints
    if (validValues.length === 0) {
      const constraints: string[] = [];
      if (schema.minLength !== undefined) constraints.push(`minLength: ${schema.minLength}`);
      if (schema.maxLength !== undefined) constraints.push(`maxLength: ${schema.maxLength}`);
      if (schema.minItems !== undefined) constraints.push(`minItems: ${schema.minItems}`);
      if (schema.maxItems !== undefined) constraints.push(`maxItems: ${schema.maxItems}`);
      if (schema.minProperties !== undefined) constraints.push(`minProperties: ${schema.minProperties}`);
      if (schema.maxProperties !== undefined) constraints.push(`maxProperties: ${schema.maxProperties}`);
      if (schema.minimum !== undefined) constraints.push(`minimum: ${schema.minimum}`);
      if (schema.maximum !== undefined) constraints.push(`maximum: ${schema.maximum}`);
      if (schema.exclusiveMinimum !== undefined) constraints.push(`exclusiveMinimum: ${schema.exclusiveMinimum}`);
      if (schema.exclusiveMaximum !== undefined) constraints.push(`exclusiveMaximum: ${schema.exclusiveMaximum}`);
      if (schema.multipleOf !== undefined) constraints.push(`multipleOf: ${schema.multipleOf}`);
      throw new Error(
        `enum values conflict with constraints [${constraints.join(", ")}] at ${ctx.path}`
      );
    }
    
    const value = ctx.random.pick(validValues);
    return typeof value === "object" && value !== null
      ? structuredClone(value)
      : value;
  }

  throw new Error(`generateEnumConst called without enum or const at ${ctx.path}`);
}
