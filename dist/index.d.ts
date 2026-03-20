import type { JsonSchema, GenerateOptions, Random } from "./types.js";
import { type ExtensionCallback } from "./extensions.js";
export type { JsonSchema, GenerateOptions, Random, RefResolver } from "./types.js";
export { createRemoteResolver, type RemoteResolverOptions } from "./remote-resolver.js";
export type { ExtensionCallback } from "./extensions.js";
export declare function generate(schema: JsonSchema, options?: GenerateOptions): Promise<unknown>;
export declare function createGenerator(options?: GenerateOptions): {
    generate(schema: JsonSchema): Promise<unknown>;
};
export declare function registerFormat(name: string, generator: (random: Random) => string): void;
export declare function define(name: string, callback: ExtensionCallback): void;
export declare function reset(name?: string): void;
export interface GenerateJsonOptions extends GenerateOptions {
    pretty?: boolean;
}
export declare function generateJson(schema: JsonSchema, options?: GenerateJsonOptions): Promise<string>;
export declare function createJsonGenerator(options?: GenerateJsonOptions): {
    generate(schema: JsonSchema): Promise<string>;
};
export interface GenerateYamlOptions extends GenerateOptions {
    pretty?: boolean;
}
export declare function generateYaml(schema: JsonSchema, options?: GenerateYamlOptions): Promise<string>;
export declare function createYamlGenerator(options?: GenerateYamlOptions): {
    generate(schema: JsonSchema): Promise<string>;
};
//# sourceMappingURL=index.d.ts.map