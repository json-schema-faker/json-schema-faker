import type { JsonSchemaObject, GenerateContext } from "../types.js";
import { generateFromRegex } from "../pattern/regex-gen.js";
import { pad2 } from "../utils/helpers.js";

const DEFAULT_CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export function generateString(
  schema: JsonSchemaObject,
  ctx: GenerateContext
): string {
  // Check for ambiguous extension (both faker and chance defined)
  if (schema.faker !== undefined && schema.chance !== undefined) {
    throw new Error(`ambiguous generator: both faker and chance are defined in ${ctx.path}`);
  }

  // Check faker extension (user-provided)
  if (schema.faker !== undefined) {
    // Handle both string format (e.g., "name.firstName") and object format (e.g., { "custom.statement": [19] })
    let fakerPath: string;
    let fakerArgs: unknown[] | undefined;

    if (typeof schema.faker === "object") {
      const fakerObj = schema.faker as Record<string, unknown>;
      const keys = Object.keys(fakerObj);
      if (keys.length > 0) {
        fakerPath = keys[0];
        fakerArgs = fakerObj[fakerPath] as unknown[];
      } else {
        throw new Error(`cannot resolve faker-generator for ${JSON.stringify(schema.faker)} in ${ctx.path}`);
      }
    } else {
      fakerPath = schema.faker as string;
    }

    // Use user-provided faker
    if (ctx.extensions?.faker) {
      const parts = fakerPath.split(".");
      let current: any = ctx.extensions.faker;
      for (const part of parts) {
        try {
          current = current[part];
        } catch (e) {
          throw new Error(`failed to resolve .${part} (${fakerPath})`);
        }
      }
      if (typeof current === "function") {
        return fakerArgs ? current(...fakerArgs) : current();
      }
    }

    throw new Error(`cannot resolve faker-generator for ${fakerPath} in ${ctx.path}`);
  }

  // Check chance extension (user-provided)
  if (schema.chance !== undefined) {
    // Use user-provided chance
    if (ctx.extensions?.chance) {
      if (typeof schema.chance === "string") {
        const chanceType = schema.chance as string;
        try {
          const generator = ctx.extensions.chance[chanceType];
          if (typeof generator === "function") {
            return generator();
          }
        } catch {
          // Fall through to error
        }
      } else if (typeof schema.chance === "object") {
        const chanceOptions = schema.chance as Record<string, unknown>;
        const key = Object.keys(chanceOptions)[0];
        const options = chanceOptions[key] as Record<string, unknown> | undefined;
        try {
          const generator = ctx.extensions.chance[key];
          if (typeof generator === "function") {
            return options ? generator(options) : generator();
          }
        } catch {
          // Fall through to error
        }
      }
    }

    const chanceType = typeof schema.chance === "string"
      ? schema.chance
      : Object.keys(schema.chance as Record<string, unknown>)[0];
    throw new Error(`cannot resolve chance-generator for ${chanceType} in ${ctx.path}`);
  }

  // Check format first
  if (schema.format) {
    // Handle date-time format with min/max constraints
    if (schema.format === "date-time" && (ctx.minDateTime !== undefined || ctx.maxDateTime !== undefined)) {
      return generateDateTimeWithRange(ctx);
    }

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
    const maxAttempts = 50;
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const result = generateFromRegex(schema.pattern, ctx.random);
      if (schema.minLength !== undefined && result.length < schema.minLength) {
        continue;
      }
      if (schema.maxLength !== undefined && result.length > schema.maxLength) {
        continue;
      }
      return result;
    }
    // Fallback: generate and slice/pad
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

function generateDateTimeWithRange(ctx: GenerateContext): string {
  const minDt = ctx.minDateTime ? new Date(ctx.minDateTime) : new Date("1970-01-01");
  const maxDt = ctx.maxDateTime ? new Date(ctx.maxDateTime) : new Date();

  const minTime = minDt.getTime();
  const maxTime = maxDt.getTime();
  const randomTime = minTime + ctx.random.next() * (maxTime - minTime);
  const date = new Date(randomTime);

  const year = date.getFullYear();
  const month = pad2(date.getMonth() + 1);
  const day = pad2(date.getDate());
  return `${year}-${month}-${day}T01:01:01.0Z`;
}
