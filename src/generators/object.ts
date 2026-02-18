import type { JsonSchema, JsonSchemaObject, GenerateContext } from "../types.js";
import { walk } from "../schema-walker.js";
import { mergeSchemas } from "../merge.js";
import { SCHEMA_KEYWORDS, isJsonSchema } from "../utils/schema-keywords.js";

/**
 * Check if a generated value matches a constraint schema (enum, const)
 */
function matchesConstraint(value: unknown, constraint: JsonSchema): boolean {
  if (typeof constraint !== "object" || constraint === null) {
    return false;
  }
  
  const constraintObj = constraint as JsonSchemaObject;
  
  // Check const
  if (constraintObj.const !== undefined) {
    return value === constraintObj.const;
  }
  
  // Check enum
  if (constraintObj.enum !== undefined) {
    return constraintObj.enum.some((v) => v === value);
  }
  
  return false;
}

function isImpossibleSchema(schema: JsonSchema): boolean {
  if (typeof schema === "boolean") {
    return !schema; // false schema = impossible
  }
  if (typeof schema !== "object" || schema === null) {
    return false;
  }
  // not: true or not: {} means nothing can match (impossible)
  if (schema.not === true || (typeof schema.not === "object" && schema.not !== null && Object.keys(schema.not).length === 0)) {
    return true;
  }
  return false;
}

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
    let hasInferredProperties = false;
    
    for (const [key, value] of Object.entries(schema)) {
      // Skip schema keywords
      if (SCHEMA_KEYWORDS.has(key)) {
        continue;
      }
      
      // If it looks like a schema, use it as-is
      if (isJsonSchema(value)) {
        inferred[key] = value as JsonSchema;
        hasInferredProperties = true;
      } else {
        // Treat as a const/literal value - wrap in a const schema
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

/**
 * Get required properties from a schema object.
 * If no explicit 'required' and we have inferred properties, all are required.
 */
function getInferredRequired(schema: JsonSchemaObject, inferredProperties: Record<string, JsonSchema>): string[] {
  if (schema.required) {
    return schema.required;
  }
  
  // If we have inferred properties and no explicit type/properties, require all
  if (schema.properties === undefined && Object.keys(inferredProperties).length > 0) {
    return Object.keys(inferredProperties);
  }
  
  return [];
}

export async function generateObject(
  schema: JsonSchemaObject,
  ctx: GenerateContext
): Promise<Record<string, unknown>> {
  if (ctx.depth >= ctx.maxDepth) {
    return {};
  }

  // Get inferred properties if no explicit properties
  const inferredProperties = getInferredProperties(schema);
  const inferredRequired = getInferredRequired(schema, inferredProperties);

  // Check for contradictory schema: additionalProperties:false but minProperties > available keys
  if (schema.additionalProperties === false) {
    const hasProperties = Object.keys(inferredProperties).length > 0;
    const hasPatternProperties = schema.patternProperties && Object.keys(schema.patternProperties).length > 0;
    const definedKeys = new Set<string>(Object.keys(inferredProperties));
    const required = new Set(inferredRequired);
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

  const required = new Set(inferredRequired);
  const alwaysFakeOptionals = ctx.alwaysFakeOptionals ?? false;
  const fillProperties = ctx.fillProperties ?? true;
  const useFixedProbabilities = ctx.fixedProbabilities ?? false;
  const optionalsProbability = ctx.optionalsProbability ?? 0.5;

  // Get optional property keys
  const optionalKeys = Object.keys(inferredProperties).filter(key => !required.has(key));
  
  // When using fixed probabilities, deterministically calculate how many properties to include
  let propertiesToInclude: Set<string> | undefined;
  if (useFixedProbabilities && !alwaysFakeOptionals && optionalKeys.length > 0) {
    const targetCount = Math.round(optionalKeys.length * optionalsProbability);
    // Deterministically select the first N properties based on the sorted keys
    propertiesToInclude = new Set(optionalKeys.slice(0, targetCount));
  }

  // Determine if we should generate optional properties
  const shouldGenerateOptional = (key: string) => {
    if (alwaysFakeOptionals) return true;
    if (propertiesToInclude) return propertiesToInclude.has(key);
    return ctx.random.bool(optionalsProbability);
  };

  // Generate required properties first
  if (Object.keys(inferredProperties).length > 0) {
    for (const [key, propSchema] of Object.entries(inferredProperties)) {
      // Skip properties with impossible schemas (not: true or not: {})
      if (isImpossibleSchema(propSchema)) {
        continue;
      }
      
      definedKeys.add(key);
      const propCtx = { ...childCtx, path: `${childCtx.path}/${key}` };
      
      const isRequired = required.has(key);
      const isObjectType = typeof propSchema === "object" && propSchema !== null && propSchema.type === "object";
      
      // Merge with matching patternProperties constraints
      let mergedPropSchema = propSchema;
      if (schema.patternProperties && typeof propSchema === "object" && propSchema !== null) {
        const matchingPatterns: JsonSchema[] = [];
        for (const [pattern, patSchema] of Object.entries(schema.patternProperties)) {
          try {
            if (new RegExp(pattern).test(key)) {
              matchingPatterns.push(patSchema);
            }
          } catch {
            // Invalid regex pattern, skip
          }
        }
        if (matchingPatterns.length > 0) {
          mergedPropSchema = mergeSchemas([propSchema, ...matchingPatterns]) as JsonSchemaObject;
        }
      }
      
      if (isRequired) {
        result[key] = await walk(mergedPropSchema, propCtx);
      } else if (shouldGenerateOptional(key)) {
        result[key] = await walk(mergedPropSchema, propCtx);
      } else if (isObjectType && !fillProperties) {
        // fillProperties: false - propagate required nested properties
        const nestedRequired = propSchema.required ?? [];
        if (nestedRequired.length > 0) {
          const nestedResult: Record<string, unknown> = {};
          for (const nestedKey of nestedRequired) {
            const nestedSchema = (propSchema.properties ?? {})[nestedKey] ?? {};
            nestedResult[nestedKey] = await walk(nestedSchema, { ...propCtx, path: `${propCtx.path}/${nestedKey}` });
          }
          result[key] = nestedResult;
        }
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

  // Handle schema dependencies
  // If a property is present, add properties from the dependency schema
  if (schema.dependencies) {
    for (const [propName, dependency] of Object.entries(schema.dependencies)) {
      // Only handle schema dependencies (object), not property dependencies (array)
      if (typeof dependency !== "object" || dependency === null || Array.isArray(dependency)) {
        continue;
      }
      
      // Check if the property was generated
      if (result[propName] !== undefined && !definedKeys.has(propName + "_dep")) {
        definedKeys.add(propName + "_dep");
        
        // Find the matching branch in oneOf/anyOf/allOf based on the generated property value
        const branches = dependency.oneOf ?? dependency.anyOf ?? dependency.allOf ?? [dependency];
        
        let matchingBranch: JsonSchemaObject | null = null;
        
        for (const branch of branches) {
          if (typeof branch !== "object" || branch === null) continue;
          
          // Check if this branch's constraints match the generated property value
          const branchProps = branch.properties;
          const branchNot = branch.not as JsonSchemaObject | undefined;
          
          // Check positive constraint first
          if (branchProps && branchProps[propName]) {
            const constraint = branchProps[propName];
            const generatedValue = result[propName];
            
            // Check if the constraint matches the generated value
            if (matchesConstraint(generatedValue, constraint)) {
              matchingBranch = branch;
              break;
            }
          }
          
          // Check "not" constraint - if the property value doesn't match the "not" properties, this branch may apply
          if (branchNot?.properties) {
            const notPropConstraints = branchNot.properties[propName];
            if (notPropConstraints) {
              const generatedValue = result[propName];
              // If generated value does NOT match the "not" constraint, this branch applies
              if (!matchesConstraint(generatedValue, notPropConstraints)) {
                matchingBranch = branch;
                break;
              }
            }
          }
        }
        
        // If no matching branch found, use the first one or the dependency itself
        if (!matchingBranch && branches.length > 0 && typeof branches[0] === "object") {
          matchingBranch = branches[0] as JsonSchemaObject;
        }
        
        // Handle not constraints - remove properties that should not be present
        if (matchingBranch?.not) {
          const notSchema = matchingBranch.not as JsonSchemaObject;
          if (notSchema.required && Array.isArray(notSchema.required)) {
            for (const forbiddenProp of notSchema.required) {
              delete result[forbiddenProp];
            }
          }
        }
        
        // Handle required properties from the matching branch (even without properties)
        if (matchingBranch?.required) {
          for (const reqProp of matchingBranch.required) {
            // Skip the dependency property itself
            if (reqProp === propName) continue;
            
            // Skip if already generated
            if (result[reqProp] !== undefined) continue;
            
            const reqPropSchema = (matchingBranch.properties as Record<string, JsonSchema>)?.[reqProp] ?? { type: "object" };
            const reqPropCtx = { ...childCtx, path: `${childCtx.path}/${reqProp}` };
            result[reqProp] = await walk(reqPropSchema, reqPropCtx);
          }
        }
        
        if (matchingBranch && matchingBranch.properties) {
          // Generate dependent properties from the matching branch
          // Always regenerate (overwrite) because additionalProperties may have generated wrong values
          for (const [depPropName, depPropSchema] of Object.entries(matchingBranch.properties)) {
            // Skip the dependency property itself (foo)
            if (depPropName === propName) continue;
            
            const depPropCtx = { ...childCtx, path: `${childCtx.path}/${depPropName}` };
            result[depPropName] = await walk(depPropSchema as JsonSchema, depPropCtx);
          }
        }
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
      const definedPropsList = Object.keys(inferredProperties).join(", ");
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

  // Apply pruneProperties - remove specified properties recursively
  if (ctx.pruneProperties && ctx.pruneProperties.length > 0) {
    pruneObjectProperties(result, ctx.pruneProperties);
  }

  // Resolve template properties - replace #{propName} with generated values
  resolveTemplates(result, inferredProperties);

  return result;
}

/**
 * Resolve template properties in the generated object.
 * Replaces #{propName} with the generated values.
 */
function resolveTemplates(
  result: Record<string, unknown>,
  properties: Record<string, JsonSchema>
): void {
  for (const [key, propSchema] of Object.entries(properties)) {
    if (typeof propSchema !== "object" || propSchema === null) continue;
    
    const schema = propSchema as JsonSchemaObject;
    if (schema.template === undefined) continue;
    
    const template = schema.template;
    if (typeof template !== "string") continue;
    
    // Replace #{propName} with the generated value
    const resolved = template.replace(/#\{(\w+)\}/g, (_, propName) => {
      const value = result[propName];
      return value !== undefined ? String(value) : "";
    });
    
    result[key] = resolved;
  }
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

function pruneObjectProperties(obj: unknown, propertiesToPrune: string[]): void {
  if (typeof obj !== "object" || obj === null) {
    return;
  }

  if (Array.isArray(obj)) {
    for (const item of obj) {
      pruneObjectProperties(item, propertiesToPrune);
    }
    return;
  }

  const record = obj as Record<string, unknown>;
  for (const key of Object.keys(record)) {
    if (propertiesToPrune.includes(key)) {
      delete record[key];
    } else {
      pruneObjectProperties(record[key], propertiesToPrune);
    }
  }
}
