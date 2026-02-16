import type { JsonSchema, JsonSchemaObject, GenerateContext } from "./types.js";
import { resolveFragment } from "./remote-resolver.js";

export function buildRefRegistry(schema: JsonSchema): Map<string, JsonSchema> {
  const registry = new Map<string, JsonSchema>();

  if (typeof schema === "boolean") return registry;

  // Register $id (Draft 2019-09+ style - also used in properties)
  if (schema.$id && typeof schema === "object") {
    const schemaObj = schema as JsonSchemaObject;
    const $id = schemaObj.$id!;
    const { $id: _, ...schemaWithoutId } = schemaObj;
    registry.set($id, schemaWithoutId);
  }

  // Register $defs
  if (schema.$defs) {
    for (const [name, def] of Object.entries(schema.$defs)) {
      registry.set(`#/$defs/${name}`, def);
    }
  }

  // Legacy definitions
  if (schema.definitions) {
    for (const [name, def] of Object.entries(schema.definitions)) {
      registry.set(`#/definitions/${name}`, def);
    }
  }

  return registry;
}

export interface ResolvedRef {
  schema: JsonSchema;
  ctx: GenerateContext;
}

export async function resolveRef(
  schema: JsonSchemaObject,
  ctx: GenerateContext
): Promise<ResolvedRef> {
  const ref = schema.$ref;
  if (!ref) return { schema, ctx };

  // Check if next ref depth would exceed max
  const nextRefDepth = ctx.refDepth + 1;
  if (ctx.refDepthMax !== undefined && nextRefDepth >= ctx.refDepthMax) {
    // Return empty schema to stop recursion
    return { schema: {}, ctx: { ...ctx, refDepthReached: true } };
  }

  // Check cycle detection - when refDepthMax is set, ignore maxDepth for $ref resolution
  if (ctx.refStack.has(ref)) {
    if (ctx.refDepthMax !== undefined) {
      // With refDepthMax set, use >= to stop at exactly the max depth
      if (ctx.refDepth >= ctx.refDepthMax) {
        // Return empty schema to stop recursion
        return { schema: {}, ctx: { ...ctx, refDepthReached: true } };
      }
    } else if (ctx.depth >= ctx.maxDepth) {
      return { schema: { type: "null" }, ctx };
    }
  }

  let resolved: JsonSchema | undefined;
  let baseSchema: JsonSchema | undefined;

  if (ref.startsWith("#/")) {
    resolved = ctx.refRegistry.get(ref);
  } else if (ref === "#") {
    resolved = ctx.refRegistry.get("#") ?? {};
  } else {
    // Check registry first for non-fragment refs
    resolved = ctx.refRegistry.get(ref);
    
    // If not in registry and we have a refResolver, try that
    if (resolved === undefined && ctx.refResolver) {
      baseSchema = await ctx.refResolver(ref);
      
      // Extract the fragment from the full schema if the ref has a fragment
      const hashIndex = ref.indexOf("#");
      if (hashIndex !== -1) {
        const fragment = ref.slice(hashIndex + 1);
        if (fragment) {
          resolved = resolveFragment(baseSchema, fragment);
        } else {
          resolved = baseSchema;
        }
      } else {
        resolved = baseSchema;
      }
      
      // Register the base schema's definitions in the registry
      if (baseSchema && typeof baseSchema === "object" && baseSchema !== null) {
        const fetchedSchema = baseSchema as JsonSchemaObject;
        if (fetchedSchema.$defs) {
          for (const [name, def] of Object.entries(fetchedSchema.$defs)) {
            ctx.refRegistry.set(`#/$defs/${name}`, def);
          }
        }
        if (fetchedSchema.definitions) {
          for (const [name, def] of Object.entries(fetchedSchema.definitions)) {
            ctx.refRegistry.set(`#/definitions/${name}`, def);
          }
        }
      }
    }
  }

  if (resolved === undefined) {
    throw new Error(`Unresolved $ref: ${ref}`);
  }

  // Merge sibling keywords with resolved ref (Draft 2020-12 behavior)
  const { $ref, ...siblings } = schema;
  if (Object.keys(siblings).length > 0 && typeof resolved === "object" && resolved !== null) {
    resolved = { ...(resolved as JsonSchemaObject), ...siblings };
  }

  const newCtx: GenerateContext = {
    ...ctx,
    refStack: new Set([...ctx.refStack, ref]),
    refDepth: ctx.refDepth + 1,
  };

  return { schema: resolved, ctx: newCtx };
}

export function registerRootSchema(
  schema: JsonSchema,
  registry: Map<string, JsonSchema>
): void {
  if (typeof schema === "boolean") return;
  registry.set("#", schema);
  scanDefs(schema, "#", registry);
}

function scanDefs(
  schema: JsonSchemaObject,
  basePath: string,
  registry: Map<string, JsonSchema>
): void {
  // Register $id if present (for inner references) - check BEFORE processing children
  if (schema.$id) {
    const { $id, ...schemaWithoutId } = schema;
    registry.set($id, schemaWithoutId);
  }
  
  if (schema.$defs) {
    for (const [name, def] of Object.entries(schema.$defs)) {
      const path = `${basePath}/$defs/${name}`;
      registry.set(path, def);
      if (typeof def === "object" && def !== null) {
        scanDefs(def as JsonSchemaObject, path, registry);
      }
    }
  }
  if (schema.definitions) {
    for (const [name, def] of Object.entries(schema.definitions)) {
      const path = `${basePath}/definitions/${name}`;
      registry.set(path, def);
      if (typeof def === "object" && def !== null) {
        scanDefs(def as JsonSchemaObject, path, registry);
      }
    }
  }
  if (schema.properties) {
    for (const [name, prop] of Object.entries(schema.properties)) {
      if (typeof prop === "object" && prop !== null) {
        scanDefs(prop as JsonSchemaObject, `${basePath}/properties/${name}`, registry);
      }
    }
  }
}
