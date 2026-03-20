import type { JsonSchema, JsonSchemaObject, GenerateContext } from "./types.js";
export declare function buildRefRegistry(schema: JsonSchema): Map<string, JsonSchema>;
export interface ResolvedRef {
    schema: JsonSchema;
    ctx: GenerateContext;
}
export declare function resolveRef(schema: JsonSchemaObject, ctx: GenerateContext): Promise<ResolvedRef>;
export declare function registerRootSchema(schema: JsonSchema, registry: Map<string, JsonSchema>): void;
//# sourceMappingURL=ref-resolver.d.ts.map