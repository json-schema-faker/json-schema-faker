import type { JsonSchema, JsonSchemaObject, GenerateContext } from "./types.js";

export function buildRefRegistry(schema: JsonSchema): Map<string, JsonSchema> {
  const registry = new Map<string, JsonSchema>();

  if (typeof schema === "boolean") return registry;

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

  if (ref.startsWith("#/")) {
    resolved = ctx.refRegistry.get(ref);
  } else if (ref === "#") {
    resolved = ctx.refRegistry.get("#") ?? {};
  } else if (ctx.refResolver) {
    resolved = await ctx.refResolver(ref);
  } else {
    resolved = ctx.refRegistry.get(ref);
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
