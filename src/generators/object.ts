import type { JsonSchema, JsonSchemaObject, GenerateContext } from "../types.js";
import { walk } from "../schema-walker.js";
import { mergeSchemas } from "../merge.js";

export async function generateObject(
  schema: JsonSchemaObject,
  ctx: GenerateContext
): Promise<Record<string, unknown>> {
  if (ctx.depth >= ctx.maxDepth) {
    return {};
  }

  // Check for contradictory schema: additionalProperties:false but minProperties > available keys
  if (schema.additionalProperties === false) {
    const hasProperties = schema.properties && Object.keys(schema.properties).length > 0;
    const hasPatternProperties = schema.patternProperties && Object.keys(schema.patternProperties).length > 0;
    const definedKeys = new Set<string>(schema.properties ? Object.keys(schema.properties) : []);
    const required = new Set(schema.required ?? []);
    const requiredKeys = [...required].filter((k) => !definedKeys.has(k));

    // If minProperties is required but no way to generate them
    if ((schema.minProperties ?? 0) > 0 && !hasProperties && !hasPatternProperties) {
      throw new Error(
        `missing properties for ${schema.minProperties} in ${ctx.path}: additionalProperties is false but no properties or patternProperties defined`
      );
    }

    // If there are required properties not in properties and no patternProperties to match them
    if (requiredKeys.length > 0 && !hasPatternProperties && !hasProperties) {
      throw new Error(
        `missing properties for ${requiredKeys.join(", ")} in ${ctx.path}: additionalProperties is false but required properties not defined in properties`
      );
    }
  }

  const childCtxPath = ctx.path === "/" ? "/properties" : `${ctx.path}/properties`;
  const childCtx: GenerateContext = { ...ctx, depth: ctx.depth + 1, path: childCtxPath };
  const result: Record<string, unknown> = {};
  const definedKeys = new Set<string>();

  const required = new Set(schema.required ?? []);

  // Generate required properties first
  if (schema.properties) {
    for (const [key, propSchema] of Object.entries(schema.properties)) {
      definedKeys.add(key);
      const propCtx = { ...childCtx, path: `${childCtx.path}/${key}` };
      if (required.has(key)) {
        result[key] = await walk(propSchema, propCtx);
      } else if (ctx.random.bool(ctx.optionalPropertyProbability)) {
        result[key] = await walk(propSchema, propCtx);
      }
    }
  }

  // Generate any required properties not yet generated (could come from patternProperties or additionalProperties)
  for (const key of required) {
    if (result[key] !== undefined || definedKeys.has(key)) continue;
    if (schema.patternProperties) {
      // Collect all matching pattern schemas and merge them
      const matchingSchemas: JsonSchema[] = [];
      for (const [pattern, patSchema] of Object.entries(schema.patternProperties)) {
        if (new RegExp(pattern).test(key)) {
          matchingSchemas.push(patSchema);
        }
      }
      
      if (matchingSchemas.length > 0) {
        // Merge all matching pattern schemas
        const mergedSchema = matchingSchemas.length === 1 
          ? matchingSchemas[0] 
          : mergeSchemas(matchingSchemas);
        result[key] = await walk(mergedSchema, childCtx);
        definedKeys.add(key);
      }
    }
    if (!definedKeys.has(key)) {
      const addlSchema = schema.additionalProperties ?? true;
      if (addlSchema !== false) {
        result[key] = await walk(addlSchema === true ? {} : addlSchema, childCtx);
        definedKeys.add(key);
      }
    }
  }

  // Respect minProperties
  const minProps = schema.minProperties ?? 0;
  const maxProps = schema.maxProperties;

  if (Object.keys(result).length < minProps) {
    // Try to generate properties matching patternProperties first
    if (schema.patternProperties && Object.keys(schema.patternProperties).length > 0) {
      const patterns = Object.entries(schema.patternProperties);
      let attempts = 0;
      const maxAttempts = 1000;
      
      while (Object.keys(result).length < minProps && attempts < maxAttempts) {
        attempts++;
        
        // Pick a random pattern
        const [pattern, patSchema] = ctx.random.pick(patterns);
        
        // Generate a key that matches this pattern
        const key = generateKeyMatchingPattern(pattern, ctx);
        
        if (key && !result[key]) {
          result[key] = await walk(patSchema, childCtx);
          definedKeys.add(key);
        }
      }
    }
    
    // Fall back to additionalProperties if still need more
    if (Object.keys(result).length < minProps) {
      const addlSchema = schema.additionalProperties;
      const genSchema: JsonSchema =
        addlSchema === undefined || addlSchema === true ? { type: "string" } : addlSchema;
      if (genSchema !== false) {
        let attempts = 0;
        const maxAttempts = 1000;
        while (Object.keys(result).length < minProps && attempts < maxAttempts) {
          attempts++;
          const key = `prop${ctx.random.int(0, 99999)}`;
          if (!result[key]) {
            result[key] = await walk(genSchema, childCtx);
            definedKeys.add(key);
          }
        }
      }
    }

    // Check if we still can't meet minProperties
    if (Object.keys(result).length < minProps) {
      const definedPropsList = Object.keys(schema.properties ?? {}).join(", ");
      throw new Error(
        `properties '${definedPropsList}' were not found while additionalProperties is false in ${ctx.path}`
      );
    }
  }

  // Respect maxProperties — trim optional props
  if (maxProps !== undefined && Object.keys(result).length > maxProps) {
    const keys = Object.keys(result);
    const toRemove = keys.filter((k) => !required.has(k));
    ctx.random.shuffle(toRemove);
    while (Object.keys(result).length > maxProps && toRemove.length > 0) {
      const key = toRemove.pop()!;
      delete result[key];
    }
  }

  return result;
}

/**
 * Generate a random key that matches the given regex pattern.
 * Handles common patterns used in patternProperties.
 */
function generateKeyMatchingPattern(pattern: string, ctx: GenerateContext): string | null {
  // Handle common prefix patterns like "^hyb" or "^hybrid.*"
  const prefixMatch = pattern.match(/^\^([a-zA-Z]+)(\.\*|\(\?\:.*\))?/);
  if (prefixMatch) {
    const prefix = prefixMatch[1];
    const suffix = prefixMatch[2];
    
    if (suffix === '.*' || suffix?.includes('?:')) {
      // Pattern like "^hybrid.*" - add random suffix
      const suffixLen = ctx.random.int(0, 10);
      const chars = 'abcdefghijklmnopqrstuvwxyz';
      let randomSuffix = '';
      for (let i = 0; i < suffixLen; i++) {
        randomSuffix += ctx.random.pick(chars.split(''));
      }
      return prefix + randomSuffix;
    }
    
    // Just the prefix
    return prefix;
  }
  
  // Handle suffix patterns like ".*other$" or "rid$"
  const suffixMatch = pattern.match(/(.*\*)?([a-zA-Z]+)\$$/);
  if (suffixMatch) {
    const suffix = suffixMatch[2];
    
    // Generate a random prefix
    const prefixLen = ctx.random.int(1, 10);
    const chars = 'abcdefghijklmnopqrstuvwxyz';
    let randomPrefix = '';
    for (let i = 0; i < prefixLen; i++) {
      randomPrefix += ctx.random.pick(chars.split(''));
    }
    return randomPrefix + suffix;
  }
  
  // Handle simple patterns like "^hyb$" (exact match)
  const exactMatch = pattern.match(/^\^([a-zA-Z]+)\$$/);
  if (exactMatch) {
    return exactMatch[1];
  }
  
  // For complex patterns, generate a simple alphanumeric string
  // and hope it matches (it might not)
  const len = ctx.random.int(3, 10);
  const chars = 'abcdefghijklmnopqrstuvwxyz';
  let key = '';
  for (let i = 0; i < len; i++) {
    key += ctx.random.pick(chars.split(''));
  }
  
  // Verify it actually matches before returning
  try {
    if (new RegExp(pattern).test(key)) {
      return key;
    }
  } catch {
    // Invalid regex, return null
  }
  
  return null;
}
