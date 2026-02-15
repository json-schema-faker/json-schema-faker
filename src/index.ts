import type { JsonSchema, GenerateOptions, GenerateContext, Random } from "./types.js";
import { createRandom } from "./random.js";
import { walk } from "./schema-walker.js";
import { buildRefRegistry, registerRootSchema } from "./ref-resolver.js";
import { createFormatRegistry, registerFormatGlobal } from "./formats/index.js";

export type { JsonSchema, GenerateOptions, Random } from "./types.js";

// Global format registry shared across calls
const globalFormatRegistry = createFormatRegistry();

export function generate(schema: JsonSchema, options?: GenerateOptions): unknown {
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
    optionalPropertyProbability: options?.optionalPropertyProbability ?? 0.5,
    depth: 0,
    refRegistry,
    refStack: new Set(),
    formatRegistry,
  };

  return walk(schema, ctx);
}

export function createGenerator(options?: GenerateOptions) {
  const baseOptions = { ...options };
  let callCount = 0;

  return {
    generate(schema: JsonSchema): unknown {
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
