import type { JsonSchema, GenerateContext } from "../types.js";
/**
 * Recursively resolve jsonPath references in a generated value
 * This is called after the initial generation to cross-reference values
 *
 * @param value - The current value being processed
 * @param schema - The schema for the current value
 * @param ctx - The generation context
 * @param rootValue - The root generated object (used for jsonPath resolution)
 */
export declare function resolveJsonPathsInValue(value: unknown, schema: JsonSchema, ctx: GenerateContext, rootValue?: unknown): Promise<unknown>;
//# sourceMappingURL=jsonpath-resolver.d.ts.map