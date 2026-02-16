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

export async function generate(schema: JsonSchema, options?: GenerateOptions): Promise<unknown> {
  const random = createRandom(options?.seed ?? 1);
  const refRegistry = buildRefRegistry(schema);
  registerRootSchema(schema, refRegistry);

  const formatRegistry = options?.formats
    ? createFormatRegistry(options.formats)
    : new Map(globalFormatRegistry);

  const ctx: GenerateContext = {
    random,
    maxDepth: options?.maxDepth ?? 5,
    maxDefaultItems: options?.maxDefaultItems ?? 3,
    // optionalsProbability is an alias for optionalPropertyProbability
    optionalPropertyProbability: options?.optionalsProbability ?? options?.optionalPropertyProbability ?? 0.5,
    depth: 0,
    refRegistry,
    refStack: new Set(),
    formatRegistry,
    refResolver: options?.refResolver,
    minItems: options?.minItems,
    maxItems: options?.maxItems,
    useDefaultValue: options?.useDefaultValue,
    path: "/",
    alwaysFakeOptionals: options?.alwaysFakeOptionals,
    // Pass through the optionalsProbability and fixedProbabilities options
    optionalsProbability: options?.optionalsProbability ?? options?.optionalPropertyProbability,
    fixedProbabilities: options?.fixedProbabilities,
    fillProperties: options?.fillProperties,
    extensions: options?.extensions,
    resolveJsonPath: options?.resolveJsonPath,
    autoIncrementCounters: new Map(),
    refDepth: 0,
    refDepthMin: options?.refDepthMin,
    refDepthMax: options?.refDepthMax,
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
