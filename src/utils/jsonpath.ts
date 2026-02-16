/**
 * Simple JSONPath evaluator supporting common patterns used in json-schema-faker
 * 
 * Supports:
 * - $.foo.bar - dot notation for property access
 * - $..foo - recursive descent
 * - [*] - array wildcard
 * - [n] - array index
 */
export function evaluateJsonPath(path: string, data: unknown): unknown[] {
  if (!path.startsWith("$")) {
    throw new Error(`Invalid JSONPath: ${path} (must start with $)`);
  }

  // Remove the leading $
  const segments = path.slice(1).split(/\.|\[(\d+|\*)\]/).filter(Boolean);
  
  let results: unknown[] = [data];
  
  for (const segment of segments) {
    if (segment === "") continue;
    
    const newResults: unknown[] = [];
    
    for (const item of results) {
      if (item === null || item === undefined) continue;
      
      if (segment === "*") {
        // Array wildcard
        if (Array.isArray(item)) {
          newResults.push(...item);
        }
      } else if (/^\d+$/.test(segment)) {
        // Array index
        const index = parseInt(segment, 10);
        if (Array.isArray(item) && index < item.length) {
          newResults.push(item[index]);
        }
      } else if (segment === "") {
        // Recursive descent operator (..)
        // This is handled specially - we need to collect all nested values
        collectDescendants(item, newResults);
      } else {
        // Property access
        if (typeof item === "object" && item !== null && segment in item) {
          newResults.push((item as Record<string, unknown>)[segment]);
        }
      }
    }
    
    results = newResults;
  }
  
  return results;
}

/**
 * Recursively collect all descendants of an object or array
 */
function collectDescendants(item: unknown, results: unknown[]): void {
  if (item === null || item === undefined) return;
  
  if (Array.isArray(item)) {
    for (const element of item) {
      results.push(element);
      collectDescendants(element, results);
    }
  } else if (typeof item === "object") {
    for (const value of Object.values(item as Record<string, unknown>)) {
      results.push(value);
      collectDescendants(value, results);
    }
  }
}

/**
 * Parse a JSONPath expression into segments
 * Handles: $.foo.bar, $..foo, $[*], $.foo[*].bar
 */
export function parseJsonPath(path: string): string[] {
  if (!path.startsWith("$")) {
    throw new Error(`Invalid JSONPath: ${path}`);
  }
  
  const segments: string[] = [];
  let current = path.slice(1); // Remove leading $
  
  while (current.length > 0) {
    if (current.startsWith(".")) {
      current = current.slice(1);
      
      // Check for recursive descent ..
      if (current.startsWith(".")) {
        current = current.slice(1);
        segments.push(""); // Empty segment indicates recursive descent
      }
      
      // Extract property name
      const match = current.match(/^([a-zA-Z_][a-zA-Z0-9_]*)/);
      if (match) {
        segments.push(match[1]);
        current = current.slice(match[1].length);
      } else {
        break;
      }
    } else if (current.startsWith("[")) {
      const end = current.indexOf("]");
      if (end === -1) break;
      
      const content = current.slice(1, end);
      segments.push(content);
      current = current.slice(end + 1);
    } else {
      break;
    }
  }
  
  return segments;
}
