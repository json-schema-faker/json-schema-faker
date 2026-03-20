import type { JsonSchema } from "./types.js";
export interface RemoteResolverOptions {
    /** Base URL for resolving relative references */
    baseUrl?: string;
    /** Custom fetch function for HTTP/HTTPS requests (required for URLs) */
    fetch?: (url: string) => Promise<Response>;
    /** Custom file reader function (required for file:// URLs or file paths) */
    readFile?: (path: string) => Promise<string>;
    /** Cache for resolved schemas */
    cache?: Map<string, JsonSchema>;
}
/**
 * Creates a remote reference resolver that can fetch schemas from:
 * - HTTP/HTTPS URLs (requires `fetch` option in non-browser environments)
 * - File paths (requires `readFile` option)
 *
 * Supports JSON pointer fragments (e.g., "http://example.com/schema.json#/definitions/foo")
 *
 * @example
 * ```typescript
 * // Browser or Node.js with fetch available
 * const resolver = createRemoteResolver({
 *   baseUrl: "http://api.example.com/schemas/"
 * });
 *
 * // Node.js with file system
 * import { readFile } from "node:fs/promises";
 * const resolver = createRemoteResolver({
 *   baseUrl: "file:///path/to/schemas/",
 *   readFile
 * });
 * ```
 */
export interface RemoteResolverResult {
    schema: JsonSchema;
    baseSchema: JsonSchema;
}
export declare function createRemoteResolver(options?: RemoteResolverOptions): (ref: string) => Promise<JsonSchema>;
export declare function resolveFragment(schema: JsonSchema, fragment: string | null): JsonSchema;
//# sourceMappingURL=remote-resolver.d.ts.map