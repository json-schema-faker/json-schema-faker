/**
 * Browser bundle entrypoint — exposes JSONSchemaFaker as a global.
 * Provides the same API shape as the v0.5.x CDN bundle for playground compatibility.
 */
import { registerFormat } from "./index.js";
import type { GenerateOptions } from "./types.js";
declare const JSONSchemaFaker: {
    version: string;
    option(opts: GenerateOptions | Record<string, unknown>): void;
    extend(name: string, factory: () => unknown): void;
    resolve(schema: unknown, refs?: unknown[]): Promise<unknown>;
    format: typeof registerFormat;
};
export default JSONSchemaFaker;
//# sourceMappingURL=browser.d.ts.map