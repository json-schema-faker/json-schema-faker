import type { JsonSchemaObject, GenerateContext } from "../types.js";
import { generateFromRegex } from "../pattern/regex-gen.js";

const DEFAULT_CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export function generateString(
  schema: JsonSchemaObject,
  ctx: GenerateContext
): string {
  // Check format first
  if (schema.format) {
    const formatGen = ctx.formatRegistry.get(schema.format);
    if (formatGen) {
      const result = formatGen(ctx.random);
      // Respect length constraints if possible
      if (schema.minLength !== undefined && result.length < schema.minLength) {
        return padString(result, schema.minLength, ctx);
      }
      if (schema.maxLength !== undefined && result.length > schema.maxLength) {
        return result.slice(0, schema.maxLength);
      }
      return result;
    }
  }

  // Check pattern
  if (schema.pattern) {
    const result = generateFromRegex(schema.pattern, ctx.random);
    if (schema.minLength !== undefined && result.length < schema.minLength) {
      return padString(result, schema.minLength, ctx);
    }
    if (schema.maxLength !== undefined && result.length > schema.maxLength) {
      return result.slice(0, schema.maxLength);
    }
    return result;
  }

  const minLen = schema.minLength ?? 0;
  const maxLen = schema.maxLength ?? Math.max(minLen + 10, 10);
  const length = ctx.random.int(minLen, maxLen);

  let result = "";
  for (let i = 0; i < length; i++) {
    result += ctx.random.pick([...DEFAULT_CHARS]);
  }
  return result;
}

function padString(str: string, targetLength: number, ctx: GenerateContext): string {
  while (str.length < targetLength) {
    str += ctx.random.pick([...DEFAULT_CHARS]);
  }
  return str;
}
