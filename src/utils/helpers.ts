export function pad2(n: number): string {
  return n < 10 ? `0${n}` : `${n}`;
}

export function daysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}
