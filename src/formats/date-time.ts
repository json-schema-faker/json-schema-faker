import type { Random } from "../types.js";
import { pad2, daysInMonth } from "../utils/helpers.js";

export function generateDateTime(random: Random): string {
  const date = generateDate(random);
  const time = generateTime(random);
  return `${date}T${time}`;
}

export function generateDate(random: Random): string {
  const year = random.int(2000, 2030);
  const month = random.int(1, 12);
  const maxDay = daysInMonth(year, month);
  const day = random.int(1, maxDay);
  return `${year}-${pad2(month)}-${pad2(day)}`;
}

export function generateTime(random: Random): string {
  const hour = random.int(0, 23);
  const minute = random.int(0, 59);
  const second = random.int(0, 59);
  return `${pad2(hour)}:${pad2(minute)}:${pad2(second)}Z`;
}
