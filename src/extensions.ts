import type { JsonSchemaObject, GenerateContext } from "./types.js";

export type ExtensionCallback = (this: ExtensionContext, value: unknown, schema: JsonSchemaObject) => unknown;

export interface ExtensionContext {
  [key: string]: unknown;
}

interface ExtensionEntry {
  callback: ExtensionCallback;
  context: ExtensionContext;
}

class ExtensionRegistry {
  private extensions = new Map<string, ExtensionEntry>();

  define(name: string, callback: ExtensionCallback): void {
    this.extensions.set(name, {
      callback,
      context: {}
    });
  }

  has(name: string): boolean {
    return this.extensions.has(name);
  }

  reset(name?: string): void {
    if (name) {
      const entry = this.extensions.get(name);
      if (entry) {
        entry.context = {};
        this.extensions.delete(name);
      }
    } else {
      this.extensions.clear();
    }
  }

  keys(): IterableIterator<string> {
    return this.extensions.keys();
  }

  generate(
    schema: JsonSchemaObject,
    ctx: GenerateContext
  ): unknown {
    const keys = Object.keys(schema);

    for (let i = keys.length - 1; i >= 0; i--) {
      const key = keys[i];
      const extName = key.startsWith("x-") ? key.slice(2) : key;
      const entry = this.extensions.get(extName);

      if (entry) {
        const value = schema[key];
        const result = entry.callback.call(entry.context, value, schema);

        if (result !== undefined) {
          return result;
        }
      }
    }

    return undefined;
  }

  getContext(name: string): ExtensionContext | undefined {
    return this.extensions.get(name)?.context;
  }
}

const globalExtensions = new ExtensionRegistry();

export function registerExtension(
  name: string,
  callback: ExtensionCallback
): void {
  globalExtensions.define(name, callback);
}

export function hasExtension(name: string): boolean {
  return globalExtensions.has(name);
}

export function resetExtension(name?: string): void {
  globalExtensions.reset(name);
}

export function generateFromExtensions(
  schema: JsonSchemaObject,
  ctx: GenerateContext
): unknown {
  return globalExtensions.generate(schema, ctx);
}

export function getExtensionContext(name: string): ExtensionContext | undefined {
  return globalExtensions.getContext(name);
}

export type { ExtensionRegistry };
