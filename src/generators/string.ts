import type { JsonSchemaObject, GenerateContext } from "../types.js";
import { generateFromRegex } from "../pattern/regex-gen.js";
import { pad2 } from "../utils/helpers.js";

const DEFAULT_CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

const FAKER_GENERATORS: Record<string, (random: { int: (min: number, max: number) => number; pick: <T>(arr: readonly T[]) => T }) => string> = {
  "name.fullName": (random) => {
    const first = random.pick(["John", "Jane", "Bob", "Alice", "Charlie", "Diana", "Eve", "Frank"]);
    const last = random.pick(["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis"]);
    return `${first} ${last}`;
  },
  "internet.email": (random) => {
    const user = random.pick(["user", "test", "admin", "john", "jane", "bob"]);
    const domain = random.pick(["example.com", "test.com", "mail.com", "domain.org"]);
    return `${user}@${domain}`;
  },
  "internet.uuid": () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0;
      const v = c === "x" ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  },
  "lorem.word": (random) => {
    return random.pick(["lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit"]);
  },
  "lorem.sentence": (random) => {
    const words = [];
    const len = random.int(5, 10);
    for (let i = 0; i < len; i++) {
      words.push(random.pick(["lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "sed", "do"]));
    }
    return words.join(" ") + ".";
  },
};

const CHANCE_GENERATORS: Record<string, (random: { int: (min: number, max: number) => number; pick: <T>(arr: readonly T[]) => T }, options?: Record<string, unknown>) => string> = {
  "guid": () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0;
      const v = c === "x" ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  },
  "email": (random, options?: { domain?: string }) => {
    const user = random.pick(["user", "test", "admin", "john", "jane", "bob"]);
    const domain = options?.domain ?? random.pick(["example.com", "test.com", "mail.com"]);
    return `${user}@${domain}`;
  },
  "name": (random) => {
    const first = random.pick(["John", "Jane", "Bob", "Alice", "Charlie", "Diana"]);
    const last = random.pick(["Smith", "Johnson", "Williams", "Brown", "Jones", "Davis"]);
    return `${first} ${last}`;
  },
  "phone": (random) => {
    return `+${random.int(1, 9)}${random.int(100, 999)}-${random.int(100, 999)}-${random.int(1000, 9999)}`;
  },
  "address": (random) => {
    const num = random.int(1, 9999);
    const street = random.pick(["Main", "Oak", "Pine", "Maple", "Cedar", "Elm"]);
    const type = random.pick(["St", "Ave", "Blvd", "Rd", "Ln"]);
    return `${num} ${street} ${type}`;
  },
  "city": (random) => {
    return random.pick(["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego"]);
  },
  "country": (random) => {
    return random.pick(["USA", "Canada", "UK", "Germany", "France", "Japan", "Australia", "Brazil"]);
  },
};

export function generateString(
  schema: JsonSchemaObject,
  ctx: GenerateContext
): string {
  // Check for ambiguous extension (both faker and chance defined)
  if (schema.faker !== undefined && schema.chance !== undefined) {
    throw new Error(`ambiguous generator: both faker and chance are defined in ${ctx.path}`);
  }

  // Check faker extension (user-provided takes priority)
  if (schema.faker !== undefined) {
    const fakerPath = schema.faker as string;
    
    // Try user-provided faker first
    if (ctx.extensions?.faker) {
      try {
        const parts = fakerPath.split(".");
        let current: any = ctx.extensions.faker;
        for (const part of parts) {
          current = current[part];
        }
        if (typeof current === "function") {
          return current();
        }
      } catch {
        // Fall through to built-in
      }
    }
    
    // Fall back to built-in generators
    const generator = FAKER_GENERATORS[fakerPath];
    if (!generator) {
      throw new Error(`cannot resolve faker-generator for ${fakerPath} in ${ctx.path}`);
    }
    return generator(ctx.random);
  }

  // Check chance extension (user-provided takes priority)
  if (schema.chance !== undefined) {
    // Try user-provided chance first
    if (ctx.extensions?.chance) {
      if (typeof schema.chance === "string") {
        const chanceType = schema.chance as string;
        try {
          const generator = ctx.extensions.chance[chanceType];
          if (typeof generator === "function") {
            return generator();
          }
        } catch {
          // Fall through to built-in
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
          // Fall through to built-in
        }
      }
    }
    
    // Fall back to built-in generators
    if (typeof schema.chance === "string") {
      const chanceType = schema.chance as string;
      const generator = CHANCE_GENERATORS[chanceType];
      if (!generator) {
        throw new Error(`cannot resolve chance-generator for ${chanceType} in ${ctx.path}`);
      }
      return generator(ctx.random);
    } else if (typeof schema.chance === "object") {
      // Handle chance with options, e.g., { email: { domain: "fake.com" } }
      const chanceOptions = schema.chance as Record<string, unknown>;
      const key = Object.keys(chanceOptions)[0];
      const options = chanceOptions[key] as Record<string, unknown> | undefined;
      const generator = CHANCE_GENERATORS[key];
      if (!generator) {
        throw new Error(`cannot resolve chance-generator for ${key} in ${ctx.path}`);
      }
      return generator(ctx.random, options as { domain?: string } | undefined);
    }
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
