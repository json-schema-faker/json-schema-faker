import type { Random } from "../types.js";

const LABELS = ["alpha", "beta", "gamma", "delta", "echo", "fox", "golf", "hotel"];
const TLDS = ["com", "org", "net", "io", "dev"];

export function generateHostname(random: Random): string {
  const labelCount = random.int(1, 3);
  const parts: string[] = [];
  for (let i = 0; i < labelCount; i++) {
    parts.push(random.pick(LABELS));
  }
  parts.push(random.pick(TLDS));
  return parts.join(".");
}
