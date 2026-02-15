import type { GenerateContext } from "../types.js";

export function generateBoolean(ctx: GenerateContext): boolean {
  return ctx.random.bool();
}
