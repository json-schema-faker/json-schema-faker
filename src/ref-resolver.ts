import type { JsonSchema, JsonSchemaObject, GenerateContext } from "./types.js";
import { resolveFragment } from "./remote-resolver.js";
import { type Gen } from "./coroutine.js";

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

  return registry;
}

export interface ResolvedRef {
  schema: JsonSchema;
  ctx: GenerateContext;
}

export function* resolveRefGen(
  schema: JsonSchemaObject,
  ctx: GenerateContext
): Gen<ResolvedRef> {
  const ref = schema.$ref;
  if (!ref) return { schema, ctx };

  // Check if next ref depth would exceed max
  const nextRefDepth = ctx.refDepth + 1;
  if (ctx.refDepthMax !== undefined && nextRefDepth >= ctx.refDepthMax) {
    // Return empty schema - walk will pick a random type and generate something.
    // The array generator will check refDepthReached and return empty array.
    return { schema: {}, ctx: { ...ctx, refDepthReached: true } };
  }

  // Check cycle detection - when refDepthMax is set, ignore maxDepth for $ref resolution
  if (ctx.refStack.has(ref)) {
    if (ctx.refDepthMax !== undefined) {
      // With refDepthMax set, use >= to stop at exactly the max depth
      if (ctx.refDepth >= ctx.refDepthMax) {
        // Return empty schema - array generator will check refDepthReached
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
    // Fallback: JSON pointer walk against the root schema.
    // Handles any arbitrary path (#/definitions/…, #/components/schemas/…, etc.)
    // without enumerating every possible keyword upfront.
    // Guard: skip bare "#/" — resolveJsonPointer treats "/" as root, which would
    // silently self-reference instead of throwing "Unresolved $ref".
    if (resolved === undefined && ref.length > 2) {
      const root = ctx.refRegistry.get("#");
      if (root !== undefined && typeof root === "object") {
        try { resolved = resolveFragment(root, ref.slice(1)); } catch { /* unresolvable */ }
      }
    }
    // If still not found, try refResolver (e.g. for OpenAPI-style #/components/schemas/... refs)
    if (resolved === undefined && ctx.refResolver) {
      resolved = (yield ctx.refResolver(ref)) as JsonSchema;
      if (resolved !== undefined) {
        ctx.refRegistry.set(ref, resolved);
      }
    }
  } else if (ref === "#") {
    resolved = ctx.refRegistry.get("#") ?? {};
  } else {
    // Check registry first for non-fragment refs
    resolved = ctx.refRegistry.get(ref);

    // If not in registry and we have a refResolver, try that
    if (resolved === undefined && ctx.refResolver) {
      baseSchema = (yield ctx.refResolver(ref)) as JsonSchema;

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

      // Register the remote schema's $defs in the registry
      if (baseSchema && typeof baseSchema === "object" && baseSchema !== null) {
        const fetchedSchema = baseSchema as JsonSchemaObject;
        if (fetchedSchema.$defs) {
          for (const [name, def] of Object.entries(fetchedSchema.$defs)) {
            ctx.refRegistry.set(`#/$defs/${name}`, def);
          }
        }
      }
    } else if (resolved === undefined && ctx.__sync) {
      // Sync mode can't fetch remote refs — give a precise, actionable error
      // instead of falling through to the generic "Unresolved $ref" below.
      throw new Error(`Remote $ref '${ref}' cannot be resolved in generateSync(); pre-resolve refs or use generate()`);
    }
  }

  if (resolved === undefined) {
    throw new Error(`Unresolved $ref: ${ref}`);
  }

  // Merge sibling keywords with resolved ref (Draft 2020-12 behavior)
  // Strip pure annotation keywords — they must not override the resolved schema or leak as properties
  const ANNOTATION_KEYWORDS = new Set(['description', 'title', '$comment', 'readOnly', 'writeOnly', 'deprecated']);
  const { $ref, ...siblings } = schema;
  const generativeSiblings = Object.fromEntries(
    Object.entries(siblings).filter(([k]) => !ANNOTATION_KEYWORDS.has(k))
  );
  if (Object.keys(generativeSiblings).length > 0 && typeof resolved === "object" && resolved !== null) {
    resolved = { ...(resolved as JsonSchemaObject), ...generativeSiblings };
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
  if (schema.properties) {
    for (const [name, prop] of Object.entries(schema.properties)) {
      if (typeof prop === "object" && prop !== null) {
        scanDefs(prop as JsonSchemaObject, `${basePath}/properties/${name}`, registry);
      }
    }
  }
}
