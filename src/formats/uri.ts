import type { Random } from "../types.js";

const SCHEMES = ["https"];
const DOMAINS = ["example.com", "test.org", "demo.net"];
const PATHS = ["api", "v1", "users", "items", "data", "resource"];

export function generateUri(random: Random): string {
  const scheme = random.pick(SCHEMES);
  const domain = random.pick(DOMAINS);
  const pathLen = random.int(1, 3);
  const parts: string[] = [];
  for (let i = 0; i < pathLen; i++) {
    parts.push(random.pick(PATHS));
  }
  return `${scheme}://${domain}/${parts.join("/")}`;
}
