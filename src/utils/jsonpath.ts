/**
 * Simple JSONPath evaluator supporting common patterns used in json-schema-faker
 * 
 * Supports:
 * - $.foo.bar - dot notation for property access
 * - $["foo"] / $['foo'] - bracket-quoted property access
 * - $..foo - recursive descent
 * - [*] - array wildcard
 * - [n] - array index
 */
export function evaluateJsonPath(path: string, data: unknown): unknown[] {
  if (!path.startsWith("$")) {
    throw new Error(`Invalid JSONPath: ${path} (must start with $)`);
  }

  const segments = parseJsonPath(path);
  
  let results: unknown[] = [data];
  
  for (const segment of segments) {
    const newResults: unknown[] = [];

    // Recursive descent (..) — represented as empty segment.
    // Collect all descendants of every current result, then include the
    // current results themselves so the *next* segment also matches
    // direct properties (e.g. $..name matches { name: "root", child: { name: "nested" } }).
    if (segment === "") {
      for (const item of results) {
        collectDescendants(item, newResults);
      }
      newResults.push(...results);
      results = newResults;
      continue;
    }
    
    for (const item of results) {
      if (item === null || item === undefined) continue;
      
      // Quoted segments (prefixed "q:") are always property access,
      // even when the unquoted value looks numeric (e.g. $["0"]).
      if (segment.startsWith("q:")) {
        const key = segment.slice(2);
        if (typeof item === "object" && item !== null && key in item) {
          newResults.push((item as Record<string, unknown>)[key]);
        }
      } else if (segment === "*") {
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
 * Handles: $.foo.bar, $..foo, $[*], $.foo[*].bar, $["foo"], $['foo']
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
      const unquoted = unquoteBracketSegment(content);
      // Prefix quoted segments so evaluateJsonPath can distinguish
      // a quoted numeric key like "0" from an array index 0.
      const wasQuoted = (content[0] === '"' || content[0] === "'");
      segments.push(wasQuoted ? `q:${unquoted}` : unquoted);
      current = current.slice(end + 1);
    } else {
      break;
    }
  }
  
  return segments;
}

function unquoteBracketSegment(segment: string): string {
  const quote = segment[0];
  if ((quote === "\"" || quote === "'") && segment[segment.length - 1] === quote) {
    return segment.slice(1, -1).replace(/\\(["'\\])/g, "$1");
  }

  return segment;
}
