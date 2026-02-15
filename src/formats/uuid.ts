import type { Random } from "../types.js";

export function generateUuid(random: Random): string {
  const hex = (len: number): string => {
    let result = "";
    for (let i = 0; i < len; i++) {
      result += random.int(0, 15).toString(16);
    }
    return result;
  };

  return `${hex(8)}-${hex(4)}-4${hex(3)}-${["8", "9", "a", "b"][random.int(0, 3)]}${hex(3)}-${hex(12)}`;
}
