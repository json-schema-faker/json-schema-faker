import type { Random } from "../types.js";

type Node =
  | { type: "literal"; value: string }
  | { type: "charClass"; chars: string[]; negated: boolean }
  | { type: "dot" }
  | { type: "sequence"; nodes: Node[] }
  | { type: "alternation"; branches: Node[] }
  | { type: "quantifier"; node: Node; min: number; max: number }
  | { type: "group"; node: Node }
  | { type: "anchor" };

const WORD_CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_";
const DIGIT_CHARS = "0123456789";
const SPACE_CHARS = " \t\n";
const PRINTABLE = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#%&*()-_=+[]{}|;:',.<>/? ";

export function generateFromRegex(pattern: string, random: Random): string {
  const ast = parse(pattern, 0);
  return generate(ast.node, random);
}

function generate(node: Node, random: Random): string {
  switch (node.type) {
    case "literal":
      return node.value;
    case "dot":
      return random.pick([...PRINTABLE]);
    case "anchor":
      return "";
    case "charClass":
      return generateCharClass(node, random);
    case "sequence":
      return node.nodes.map((n) => generate(n, random)).join("");
    case "alternation":
      return generate(random.pick(node.branches), random);
    case "quantifier": {
      const count = random.int(node.min, Math.min(node.max, node.min + 5));
      return Array.from({ length: count }, () => generate(node.node, random)).join("");
    }
    case "group":
      return generate(node.node, random);
  }
}

function generateCharClass(node: { chars: string[]; negated: boolean }, random: Random): string {
  if (!node.negated) {
    return random.pick(node.chars);
  }
  const excluded = new Set(node.chars);
  const allowed = [...PRINTABLE].filter((c) => !excluded.has(c));
  return allowed.length > 0 ? random.pick(allowed) : "a";
}

interface ParseResult {
  node: Node;
  pos: number;
}

function parse(pattern: string, pos: number): ParseResult {
  const branches: Node[] = [];
  let current: Node[] = [];

  while (pos < pattern.length) {
    const ch = pattern[pos];

    if (ch === ")") break;

    if (ch === "|") {
      branches.push(seq(current));
      current = [];
      pos++;
      continue;
    }

    if (ch === "(") {
      // Skip group modifiers like (?:, (?=, etc.
      let groupStart = pos + 1;
      if (pattern[groupStart] === "?") {
        if (pattern[groupStart + 1] === ":") {
          groupStart += 2;
        } else if (pattern[groupStart + 1] === "=" || pattern[groupStart + 1] === "!") {
          // Lookahead — skip the entire group
          let depth = 1;
          let p = groupStart;
          while (p < pattern.length && depth > 0) {
            p++;
            if (pattern[p] === "(") depth++;
            if (pattern[p] === ")") depth--;
          }
          pos = p + 1;
          continue;
        } else {
          groupStart += 2; // (?<name> etc — just skip modifier
          while (groupStart < pattern.length && pattern[groupStart] !== ">") groupStart++;
          groupStart++;
        }
      }
      const inner = parse(pattern, groupStart);
      const groupNode: Node = { type: "group", node: inner.node };
      pos = inner.pos + 1; // skip ')'
      const qResult = tryQuantifier(pattern, pos, groupNode);
      current.push(qResult.node);
      pos = qResult.pos;
      continue;
    }

    if (ch === "[") {
      const ccResult = parseCharClass(pattern, pos);
      const qResult = tryQuantifier(pattern, ccResult.pos, ccResult.node);
      current.push(qResult.node);
      pos = qResult.pos;
      continue;
    }

    if (ch === "." ) {
      const dotNode: Node = { type: "dot" };
      pos++;
      const qResult = tryQuantifier(pattern, pos, dotNode);
      current.push(qResult.node);
      pos = qResult.pos;
      continue;
    }

    if (ch === "^" || ch === "$") {
      current.push({ type: "anchor" });
      pos++;
      continue;
    }

    if (ch === "\\") {
      pos++;
      const escaped = parseEscape(pattern, pos);
      pos = escaped.pos;
      const qResult = tryQuantifier(pattern, pos, escaped.node);
      current.push(qResult.node);
      pos = qResult.pos;
      continue;
    }

    // Literal character
    const litNode: Node = { type: "literal", value: ch };
    pos++;
    const qResult = tryQuantifier(pattern, pos, litNode);
    current.push(qResult.node);
    pos = qResult.pos;
  }

  branches.push(seq(current));

  const node: Node = branches.length === 1 ? branches[0] : { type: "alternation", branches };
  return { node, pos };
}

function seq(nodes: Node[]): Node {
  if (nodes.length === 0) return { type: "literal", value: "" };
  if (nodes.length === 1) return nodes[0];
  return { type: "sequence", nodes };
}

function parseEscape(pattern: string, pos: number): { node: Node; pos: number } {
  const ch = pattern[pos];
  pos++;

  switch (ch) {
    case "d":
      return { node: { type: "charClass", chars: [...DIGIT_CHARS], negated: false }, pos };
    case "D":
      return { node: { type: "charClass", chars: [...DIGIT_CHARS], negated: true }, pos };
    case "w":
      return { node: { type: "charClass", chars: [...WORD_CHARS], negated: false }, pos };
    case "W":
      return { node: { type: "charClass", chars: [...WORD_CHARS], negated: true }, pos };
    case "s":
      return { node: { type: "charClass", chars: [...SPACE_CHARS], negated: false }, pos };
    case "S":
      return { node: { type: "charClass", chars: [...SPACE_CHARS], negated: true }, pos };
    case "b":
    case "B":
      return { node: { type: "anchor" }, pos };
    default:
      return { node: { type: "literal", value: ch }, pos };
  }
}

function parseCharClass(pattern: string, pos: number): { node: Node; pos: number } {
  pos++; // skip '['
  let negated = false;
  if (pattern[pos] === "^") {
    negated = true;
    pos++;
  }

  const chars: string[] = [];

  while (pos < pattern.length && pattern[pos] !== "]") {
    if (pattern[pos] === "\\" && pos + 1 < pattern.length) {
      pos++;
      const ch = pattern[pos];
      switch (ch) {
        case "d":
          chars.push(...DIGIT_CHARS);
          break;
        case "w":
          chars.push(...WORD_CHARS);
          break;
        case "s":
          chars.push(...SPACE_CHARS);
          break;
        default:
          chars.push(ch);
      }
      pos++;
      continue;
    }

    // Check for range
    if (pos + 2 < pattern.length && pattern[pos + 1] === "-" && pattern[pos + 2] !== "]") {
      const start = pattern.charCodeAt(pos);
      const end = pattern.charCodeAt(pos + 2);
      for (let c = start; c <= end; c++) {
        chars.push(String.fromCharCode(c));
      }
      pos += 3;
      continue;
    }

    chars.push(pattern[pos]);
    pos++;
  }

  pos++; // skip ']'
  return { node: { type: "charClass", chars, negated }, pos };
}

function tryQuantifier(
  pattern: string,
  pos: number,
  node: Node
): { node: Node; pos: number } {
  if (pos >= pattern.length) return { node, pos };

  const ch = pattern[pos];

  let min: number;
  let max: number;

  switch (ch) {
    case "*":
      min = 0;
      max = 5;
      pos++;
      break;
    case "+":
      min = 1;
      max = 5;
      pos++;
      break;
    case "?":
      min = 0;
      max = 1;
      pos++;
      break;
    case "{": {
      const result = parseBraceQuantifier(pattern, pos);
      if (result) {
        min = result.min;
        max = result.max;
        pos = result.pos;
      } else {
        return { node, pos };
      }
      break;
    }
    default:
      return { node, pos };
  }

  // Handle lazy/possessive modifiers
  if (pos < pattern.length && (pattern[pos] === "?" || pattern[pos] === "+")) {
    pos++;
  }

  return { node: { type: "quantifier", node, min, max }, pos };
}

function parseBraceQuantifier(
  pattern: string,
  pos: number
): { min: number; max: number; pos: number } | null {
  const match = pattern.slice(pos).match(/^\{(\d+)(?:,(\d*))?\}/);
  if (!match) return null;

  const min = parseInt(match[1], 10);
  let max: number;

  if (match[2] === undefined) {
    // {n} — exact
    max = min;
  } else if (match[2] === "") {
    // {n,} — unbounded
    max = min + 5;
  } else {
    max = parseInt(match[2], 10);
  }

  return { min, max, pos: pos + match[0].length };
}
