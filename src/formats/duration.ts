import type { Random } from "../types.js";

export function generateDuration(random: Random): string {
  const parts: string[] = ["P"];
  
  const hasDate = random.bool();
  const hasTime = random.bool();
  
  if (hasDate) {
    if (random.bool()) parts.push(`${random.int(0, 100)}Y`);
    if (random.bool()) parts.push(`${random.int(0, 12)}M`);
    if (random.bool()) parts.push(`${random.int(0, 30)}D`);
  }
  
  if (hasTime) {
    parts.push("T");
    if (random.bool()) parts.push(`${random.int(0, 23)}H`);
    if (random.bool()) parts.push(`${random.int(0, 59)}M`);
    if (random.bool()) parts.push(`${random.int(0, 59)}S`);
  }
  
  if (parts.length === 1 || (parts.length === 2 && parts[1] === "T")) {
    parts.push("0D");
  }
  
  return parts.join("");
}
