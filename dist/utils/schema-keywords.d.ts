/**
 * JSON Schema keywords that shouldn't be treated as properties
 * Used to distinguish between schema definitions and property names
 */
export declare const SCHEMA_KEYWORDS: Set<string>;
/**
 * Check if a key is a JSON Schema keyword
 */
export declare function isSchemaKeyword(key: string): boolean;
/**
 * Check if a value looks like a JSON Schema (has schema keywords)
 */
export declare function isJsonSchema(value: unknown): boolean;
//# sourceMappingURL=schema-keywords.d.ts.map