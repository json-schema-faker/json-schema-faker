/**
 * Browser bundle entrypoint — exposes JSONSchemaFaker as a global.
 * Provides the same API shape as the v0.5.x CDN bundle for playground compatibility.
 */
import { generate, registerFormat } from "./index.js";
import type { GenerateOptions } from "./types.js";

const VERSION = "0.6.0";

let _options: GenerateOptions = {};
const _extensions: Record<string, unknown> = {};

const JSONSchemaFaker = {
  version: VERSION,

  option(opts: GenerateOptions | Record<string, unknown>) {
    Object.assign(_options, opts);
  },

  extend(name: string, factory: () => unknown) {
    _extensions[name] = factory();
    if (!_options.extensions) _options.extensions = {};
    (_options.extensions as Record<string, unknown>)[name] = _extensions[name];
  },

  async resolve(schema: unknown, refs?: unknown[]) {
    return generate(schema as any, { ..._options });
  },

  format: registerFormat,
};

(globalThis as any).JSONSchemaFaker = JSONSchemaFaker;

export default JSONSchemaFaker;
