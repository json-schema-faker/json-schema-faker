/**
 * Simple JSONPath evaluator supporting common patterns used in json-schema-faker
 *
 * Supports:
 * - $.foo.bar - dot notation for property access
 * - $..foo - recursive descent
 * - [*] - array wildcard
 * - [n] - array index
 */
export declare function evaluateJsonPath(path: string, data: unknown): unknown[];
/**
 * Parse a JSONPath expression into segments
 * Handles: $.foo.bar, $..foo, $[*], $.foo[*].bar
 */
export declare function parseJsonPath(path: string): string[];
//# sourceMappingURL=jsonpath.d.ts.map