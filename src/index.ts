import type { JsonSchema, JsonSchemaObject, GenerateOptions, GenerateContext, Random, RefResolver } from "./types.js";
import { createRandom } from "./random.js";
import { walk } from "./schema-walker.js";
import { buildRefRegistry, registerRootSchema } from "./ref-resolver.js";
import { createFormatRegistry, registerFormatGlobal } from "./formats/index.js";
import { createRemoteResolver, type RemoteResolverOptions } from "./remote-resolver.js";
import { resolveJsonPathsInValue } from "./generators/jsonpath-resolver.js";
import { registerExtension, resetExtension, type ExtensionCallback } from "./extensions.js";

export type { JsonSchema, GenerateOptions, Random, RefResolver } from "./types.js";
export { createRemoteResolver, type RemoteResolverOptions } from "./remote-resolver.js";
export type { ExtensionCallback } from "./extensions.js";

// Global format registry shared across calls
const globalFormatRegistry = createFormatRegistry();

// List of JSON Schema versions compatible with this implementation
const SUPPORTED_SCHEMA_VERSIONS = new Set([
  "https://json-schema.org/draft/2020-12/schema",
  "https://json-schema.org/draft/2019-09/schema"
]);

export async function generate(schema: JsonSchema, options?: GenerateOptions): Promise<unknown> {
  // Validate $schema if present (opt-in via validateSchemaVersion option, defaults to false)
  // Skip when propAliases is set — the user is explicitly opting into compat mode for older drafts
  if (options?.validateSchemaVersion === true && !options?.propAliases) {
    if (typeof schema === "object" && schema !== null && "$schema" in schema) {
      const schemaUri = (schema as Record<string, unknown>).$schema;
      if (typeof schemaUri === "string" && !SUPPORTED_SCHEMA_VERSIONS.has(schemaUri)) {
        throw new Error(`Unsupported JSON Schema version: ${schemaUri}. Supported versions: ${[...SUPPORTED_SCHEMA_VERSIONS].join(", ")}`);
      }
    }
  }

  const normalizedOptions = normalizeGenerateOptions(options);
  const random = createRandom(options?.seed ?? 1);
  const schema_ = normalizedOptions.propAliases ? applyPropAliasesToSchema(schema, normalizedOptions.propAliases) : schema;
  const refRegistry = buildRefRegistry(schema_);
  registerRootSchema(schema_, refRegistry);

  const formatRegistry = normalizedOptions.formats
    ? createFormatRegistry(normalizedOptions.formats)
    : new Map(globalFormatRegistry);

  const refDepthMin = normalizedOptions.refDepthMin ?? normalizedOptions.refDepth;
  const refDepthMax = normalizedOptions.refDepthMax ?? normalizedOptions.refDepth;

  if (refDepthMin !== undefined && refDepthMax !== undefined && refDepthMin > refDepthMax) {
    throw new Error(`refDepthMin (${refDepthMin}) cannot be greater than refDepthMax (${refDepthMax})`);
  }

  const ctx: GenerateContext = {
    random,
    maxDepth: normalizedOptions.maxDepth ?? (refDepthMax ? refDepthMax + 20 : 5),
    maxDefaultItems: normalizedOptions.maxDefaultItems ?? 3,
    optionalsProbability: normalizedOptions.optionalsProbability ?? 0.5,
    depth: 0,
    refRegistry,
    refStack: new Set(),
    formatRegistry,
    refResolver: normalizedOptions.refResolver,
    minItems: normalizedOptions.minItems,
    maxItems: normalizedOptions.maxItems,
    minLength: normalizedOptions.minLength,
    maxLength: normalizedOptions.maxLength,
    useDefaultValue: normalizedOptions.useDefaultValue,
    path: "/",
    outputPath: "/",
    alwaysFakeOptionals: normalizedOptions.alwaysFakeOptionals,
    fixedProbabilities: normalizedOptions.fixedProbabilities,
    fillProperties: normalizedOptions.fillProperties,
    extensions: normalizedOptions.extensions,
    resolveJsonPath: normalizedOptions.resolveJsonPath,
    autoIncrementCounters: new Map(),
    refDepth: 0,
    refDepthMin,
    refDepthMax,
    useExamplesValue: normalizedOptions.useExamplesValue,
    pruneProperties: normalizedOptions.pruneProperties,
    failOnInvalidTypes: normalizedOptions.failOnInvalidTypes,
    defaultInvalidTypeProduct: normalizedOptions.defaultInvalidTypeProduct,
    minDateTime: normalizedOptions.minDateTime,
    maxDateTime: normalizedOptions.maxDateTime,
    propAliases: normalizedOptions.propAliases,
    outputTransform: normalizedOptions.outputTransform,
  };

  const result = await walk(schema_, ctx);

  // Post-process to resolve jsonPath references if enabled
  if (normalizedOptions.resolveJsonPath) {
    return resolveJsonPathsInValue(result, schema, ctx, result);
  }

  return result;
}

export function createGenerator(options?: GenerateOptions) {
  const baseOptions = { ...options };
  let callCount = 0;

  return {
    generate(schema: JsonSchema): Promise<unknown> {
      const seed = (baseOptions.seed ?? 1) + callCount++;
      return generate(schema, { ...baseOptions, seed });
    },
  };
}

export function registerFormat(
  name: string,
  generator: (random: Random) => string
): void {
  registerFormatGlobal(name, generator, globalFormatRegistry);
}

export function define(name: string, callback: ExtensionCallback): void {
  registerExtension(name, callback);
}

export function reset(name?: string): void {
  resetExtension(name);
}

export interface GenerateJsonOptions extends GenerateOptions {
  pretty?: boolean;
}

export async function generateJson(schema: JsonSchema, options?: GenerateJsonOptions): Promise<string> {
  const json = await generate(schema, options);
  const stringifyOptions = options?.pretty !== false
    ? { space: 2, ...options?.jsonStringifyOptions }
    : { space: 0, ...options?.jsonStringifyOptions };
  return JSON.stringify(json, stringifyOptions.replacer, stringifyOptions.space);
}

export function createJsonGenerator(options?: GenerateJsonOptions) {
  const baseOptions = { ...options };
  let callCount = 0;

  return {
    generate(schema: JsonSchema): Promise<string> {
      const seed = (baseOptions.seed ?? 1) + callCount++;
      return generateJson(schema, { ...baseOptions, seed });
    },
  };
}

export interface GenerateYamlOptions extends GenerateOptions {
  pretty?: boolean;
}

export async function generateYaml(schema: JsonSchema, options?: GenerateYamlOptions): Promise<string> {
  const yamlLib = options?.yaml ?? options?.extensions?.yaml;
  if (!yamlLib) {
    throw new Error("YAML support requires 'yaml' package. Provide via options.extensions.yaml or options.yaml.");
  }
  const json = await generate(schema, options);
  const yamlOptions = options?.pretty !== false ? { indent: 2, lineWidth: 0 } : {};
  return yamlLib.stringify(json as any, yamlOptions);
}

export function createYamlGenerator(options?: GenerateYamlOptions) {
  const baseOptions = { ...options };
  let callCount = 0;

  return {
    generate(schema: JsonSchema): Promise<string> {
      const seed = (baseOptions.seed ?? 1) + callCount++;
      return generateYaml(schema, { ...baseOptions, seed });
    },
  };
}

/**
 * Apply propAliases to a schema object (shallow — top-level keys only).
 * This is used pre-processing so the ref registry sees the renamed keys.
 */
function applyPropAliasesToSchema(schema: JsonSchema, aliases: Record<string, string>): JsonSchema {
  if (typeof schema !== 'object' || schema === null) return schema;
  const obj = schema as JsonSchemaObject;
  let patched: JsonSchemaObject | null = null;
  for (const [from, to] of Object.entries(aliases)) {
    if (from in obj && !(to in obj)) {
      if (!patched) patched = { ...obj };
      patched[to] = patched[from];
      delete patched[from];
    }
  }
  return patched ?? schema;
}

interface LegacyGenerateOptions extends GenerateOptions {
  requiredOnly?: boolean;
  ignoreProperties?: Array<string | RegExp | ((schema: JsonSchema) => boolean)>;
}

function normalizeGenerateOptions(options?: GenerateOptions): GenerateOptions {
  if (!options) {
    return {};
  }

  const legacyOptions = options as LegacyGenerateOptions;
  let normalized: GenerateOptions = { ...options };

  if (legacyOptions.requiredOnly === true && normalized.optionalsProbability === undefined) {
    normalized = {
      ...normalized,
      optionalsProbability: 0,
      alwaysFakeOptionals: false,
    };
  }

  if (legacyOptions.ignoreProperties && legacyOptions.ignoreProperties.length > 0) {
    normalized = {
      ...normalized,
      outputTransform: composeOutputTransforms(
        normalized.outputTransform,
        createIgnorePropertiesTransform(legacyOptions.ignoreProperties)
      ),
    };
  }

  return normalized;
}

function composeOutputTransforms(
  base: GenerateOptions["outputTransform"],
  next: GenerateOptions["outputTransform"]
): GenerateOptions["outputTransform"] {
  if (!base) {
    return next;
  }
  if (!next) {
    return base;
  }

  return async (value, schema, path) => {
    const transformed = await base(value, schema, path);
    return next(transformed, schema, path);
  };
}

function createIgnorePropertiesTransform(
  ignoreProperties: Array<string | RegExp | ((schema: JsonSchema) => boolean)>
): GenerateOptions["outputTransform"] {
  return (value, schema, path) => {
    if (path === "/") {
      return value;
    }

    const propName = decodeJsonPointerSegment(path.slice(path.lastIndexOf("/") + 1));
    const shouldIgnore = ignoreProperties.some((matcher) => {
      if (typeof matcher === "string") {
        return matcher === propName;
      }
      if (matcher instanceof RegExp) {
        return matcher.test(propName);
      }
      return matcher(schema);
    });

    return shouldIgnore ? undefined : value;
  };
}

function decodeJsonPointerSegment(segment: string): string {
  return segment.replace(/~1/g, "/").replace(/~0/g, "~");
}
