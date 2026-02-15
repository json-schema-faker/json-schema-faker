import type { Random } from "../types.js";

export function generateIpv4(random: Random): string {
  return `${random.int(1, 254)}.${random.int(0, 255)}.${random.int(0, 255)}.${random.int(1, 254)}`;
}

export function generateIpv6(random: Random): string {
  const groups: string[] = [];
  for (let i = 0; i < 8; i++) {
    groups.push(random.int(0, 0xffff).toString(16));
  }
  return groups.join(":");
}
