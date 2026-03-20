import type { JsonSchemaObject, GenerateContext } from "./types.js";
export type ExtensionCallback = (this: ExtensionContext, value: unknown, schema: JsonSchemaObject) => unknown;
export interface ExtensionContext {
    [key: string]: unknown;
}
declare class ExtensionRegistry {
    private extensions;
    define(name: string, callback: ExtensionCallback): void;
    has(name: string): boolean;
    reset(name?: string): void;
    keys(): IterableIterator<string>;
    generate(schema: JsonSchemaObject, ctx: GenerateContext): unknown;
    getContext(name: string): ExtensionContext | undefined;
}
export declare function registerExtension(name: string, callback: ExtensionCallback): void;
export declare function hasExtension(name: string): boolean;
export declare function resetExtension(name?: string): void;
export declare function generateFromExtensions(schema: JsonSchemaObject, ctx: GenerateContext): unknown;
export declare function getExtensionContext(name: string): ExtensionContext | undefined;
export type { ExtensionRegistry };
//# sourceMappingURL=extensions.d.ts.map