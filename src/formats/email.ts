import type { Random } from "../types.js";

const NAMES = ["alice", "bob", "charlie", "dave", "eve", "frank", "grace", "heidi"];
const DOMAINS = ["example.com", "test.org", "demo.net", "sample.io"];

export function generateEmail(random: Random): string {
  const name = random.pick(NAMES);
  const num = random.int(1, 999);
  const domain = random.pick(DOMAINS);
  return `${name}${num}@${domain}`;
}
