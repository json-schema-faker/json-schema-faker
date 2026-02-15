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
export function createRemoteResolver(options: RemoteResolverOptions = {}): (ref: string) => Promise<JsonSchema> {
  const cache = options.cache ?? new Map<string, JsonSchema>();
  const baseUrl = options.baseUrl;
  
  return async (ref: string): Promise<JsonSchema> => {
    // Parse the reference to extract URL and fragment
    const { url, fragment } = parseRef(ref, baseUrl);
    
    // Check cache first
    if (cache.has(url)) {
      return resolveFragment(cache.get(url)!, fragment);
    }
    
    // Fetch the schema
    let schema: JsonSchema;
    
    if (url.startsWith("http://") || url.startsWith("https://")) {
      schema = await fetchSchema(url, options.fetch);
    } else if (url.startsWith("file://")) {
      const path = decodeURIComponent(url.slice(7));
      schema = await readFileSchema(path, options.readFile);
    } else {
      // Treat as file path
      schema = await readFileSchema(url, options.readFile);
    }
    
    // Cache the full schema
    cache.set(url, schema);
    
    // Resolve fragment if present
    return resolveFragment(schema, fragment);
  };
}

interface ParsedRef {
  url: string;
  fragment: string | null;
}

function parseRef(ref: string, baseUrl?: string): ParsedRef {
  const hashIndex = ref.indexOf("#");
  
  if (hashIndex === -1) {
    // No fragment
    return { url: resolveUrl(ref, baseUrl), fragment: null };
  }
  
  const url = ref.slice(0, hashIndex);
  const fragment = ref.slice(hashIndex + 1);
  
  return {
    url: resolveUrl(url || "#", baseUrl),
    fragment: fragment || null,
  };
}

function resolveUrl(url: string, baseUrl?: string): string {
  if (!baseUrl || url.startsWith("http://") || url.startsWith("https://") || url.startsWith("file://")) {
    return url === "#" ? baseUrl || "#" : url;
  }
  
  // Resolve relative URL against base
  if (baseUrl.startsWith("file://")) {
    const basePath = baseUrl.slice(7);
    const separator = basePath.includes("/") ? "/" : "\\";
    const lastSlash = basePath.lastIndexOf(separator);
    const baseDir = lastSlash >= 0 ? basePath.slice(0, lastSlash + 1) : "";
    return baseDir + url;
  }
  
  // HTTP(S) base URL
  try {
    return new URL(url, baseUrl).href;
  } catch {
    return url;
  }
}

async function fetchSchema(url: string, customFetch?: (url: string) => Promise<Response>): Promise<JsonSchema> {
  const fetchFn = customFetch ?? globalThis.fetch;
  
  if (!fetchFn) {
    throw new Error(
      `Cannot fetch ${url}: fetch is not available. ` +
      `Provide a custom fetch function via the 'fetch' option.`
    );
  }
  
  const response = await fetchFn(url);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch schema from ${url}: ${response.status} ${response.statusText}`);
  }
  
  const contentType = response.headers.get("content-type") || "";
  
  if (contentType.includes("application/json")) {
    return response.json();
  }
  
  // Try to parse as JSON anyway
  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch (e) {
    throw new Error(`Failed to parse schema from ${url} as JSON: ${e}`);
  }
}

async function readFileSchema(path: string, customReadFile?: (path: string) => Promise<string>): Promise<JsonSchema> {
  if (!customReadFile) {
    throw new Error(
      `Cannot read file ${path}: readFile is not available. ` +
      `Provide a custom readFile function via the 'readFile' option. ` +
      `In Node.js, import { readFile } from "node:fs/promises" and pass it as an option.`
    );
  }
  
  const content = await customReadFile(path);
  return JSON.parse(content);
}

function resolveFragment(schema: JsonSchema, fragment: string | null): JsonSchema {
  if (!fragment || fragment === "") {
    return schema;
  }
  
  if (typeof schema !== "object" || schema === null) {
    throw new Error(`Cannot resolve fragment "${fragment}" in non-object schema`);
  }
  
  // Handle JSON pointer (starts with /)
  if (fragment.startsWith("/")) {
    return resolveJsonPointer(schema, fragment);
  }
  
  // Handle plain name fragment (anchor)
  // For now, we only support JSON pointers
  throw new Error(`Unsupported fragment type: ${fragment}. Only JSON pointers (starting with /) are supported.`);
}

function resolveJsonPointer(schema: JsonSchemaObject, pointer: string): JsonSchema {
  if (pointer === "" || pointer === "/") {
    return schema;
  }
  
  const parts = pointer.slice(1).split("/");
  let current: unknown = schema;
  
  for (const part of parts) {
    // Decode JSON pointer escape sequences
    const decoded = part.replace(/~1/g, "/").replace(/~0/g, "~");
    
    if (typeof current !== "object" || current === null) {
      throw new Error(`Cannot resolve JSON pointer "${pointer}": not an object at "${decoded}"`);
    }
    
    if (Array.isArray(current)) {
      const index = parseInt(decoded, 10);
      if (isNaN(index) || index < 0 || index >= current.length) {
        throw new Error(`Cannot resolve JSON pointer "${pointer}": invalid array index "${decoded}"`);
      }
      current = current[index];
    } else {
      if (!(decoded in current)) {
        throw new Error(`Cannot resolve JSON pointer "${pointer}": property "${decoded}" not found`);
      }
      current = (current as Record<string, unknown>)[decoded];
    }
  }
  
  return current as JsonSchema;
}

type JsonSchemaObject = Record<string, unknown>;
