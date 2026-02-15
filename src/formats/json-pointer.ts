import type { Random } from "../types.js";

const TOKENS = ["foo", "bar", "baz", "items", "0", "1", "2", "name", "value"];

export function generateJsonPointer(random: Random): string {
  const depth = random.int(1, 4);
  const parts: string[] = [];
  for (let i = 0; i < depth; i++) {
    parts.push(random.pick(TOKENS));
  }
  return "/" + parts.join("/");
}
