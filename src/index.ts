import type { JsonSchema, GenerateOptions, GenerateContext, Random, RefResolver } from "./types.js";
import { createRandom } from "./random.js";
import { walk } from "./schema-walker.js";
import { buildRefRegistry, registerRootSchema } from "./ref-resolver.js";
import { createFormatRegistry, registerFormatGlobal } from "./formats/index.js";
import { createRemoteResolver, type RemoteResolverOptions } from "./remote-resolver.js";
import { resolveJsonPathsInValue } from "./generators/jsonpath-resolver.js";

export type { JsonSchema, GenerateOptions, Random, RefResolver } from "./types.js";
export { createRemoteResolver, type RemoteResolverOptions } from "./remote-resolver.js";

// Global format registry shared across calls
const globalFormatRegistry = createFormatRegistry();

// List of JSON Schema versions compatible with this implementation
const SUPPORTED_SCHEMA_VERSIONS = new Set([
  "https://json-schema.org/draft/2020-12/schema",
  "https://json-schema.org/draft/2019-09/schema"
]);

export async function generate(schema: JsonSchema, options?: GenerateOptions): Promise<unknown> {
  // Validate $schema if present (opt-in via validateSchemaVersion option, defaults to false)
  if (options?.validateSchemaVersion === true) {
    if (typeof schema === "object" && schema !== null && "$schema" in schema) {
      const schemaUri = (schema as Record<string, unknown>).$schema;
      if (typeof schemaUri === "string" && !SUPPORTED_SCHEMA_VERSIONS.has(schemaUri)) {
        throw new Error(`Unsupported JSON Schema version: ${schemaUri}. Supported versions: ${[...SUPPORTED_SCHEMA_VERSIONS].join(", ")}`);
      }
    }
  }

  const random = createRandom(options?.seed ?? 1);
  const refRegistry = buildRefRegistry(schema);
  registerRootSchema(schema, refRegistry);

  const formatRegistry = options?.formats
    ? createFormatRegistry(options.formats)
    : new Map(globalFormatRegistry);

  const refDepthMin = options?.refDepthMin ?? options?.refDepth;
  const refDepthMax = options?.refDepthMax ?? options?.refDepth;

  if (refDepthMin !== undefined && refDepthMax !== undefined && refDepthMin > refDepthMax) {
    throw new Error(`refDepthMin (${refDepthMin}) cannot be greater than refDepthMax (${refDepthMax})`);
  }

  const ctx: GenerateContext = {
    random,
    maxDepth: options?.maxDepth ?? (refDepthMax ? refDepthMax + 20 : 5),
    maxDefaultItems: options?.maxDefaultItems ?? 3,
    optionalsProbability: options?.optionalsProbability ?? 0.5,
    depth: 0,
    refRegistry,
    refStack: new Set(),
    formatRegistry,
    refResolver: options?.refResolver,
    minItems: options?.minItems,
    maxItems: options?.maxItems,
    minLength: options?.minLength,
    maxLength: options?.maxLength,
    useDefaultValue: options?.useDefaultValue,
    path: "/",
    alwaysFakeOptionals: options?.alwaysFakeOptionals,
    fixedProbabilities: options?.fixedProbabilities,
    fillProperties: options?.fillProperties,
    extensions: options?.extensions,
    resolveJsonPath: options?.resolveJsonPath,
    autoIncrementCounters: new Map(),
    refDepth: 0,
    refDepthMin,
    refDepthMax,
    useExamplesValue: options?.useExamplesValue,
    pruneProperties: options?.pruneProperties,
    failOnInvalidTypes: options?.failOnInvalidTypes,
    defaultInvalidTypeProduct: options?.defaultInvalidTypeProduct,
    minDateTime: options?.minDateTime,
    maxDateTime: options?.maxDateTime,
  };

  const result = await walk(schema, ctx);

  // Post-process to resolve jsonPath references if enabled
  if (options?.resolveJsonPath) {
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
