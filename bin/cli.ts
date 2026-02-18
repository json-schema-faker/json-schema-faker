#!/usr/bin/env node

import { generate } from "../src/index.js";
import type { JsonSchema, GenerateOptions } from "../src/types.js";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { resolve } from "path";

interface CliOptions {
  seed?: number;
  maxDepth?: number;
  maxDefaultItems?: number;
  minItems?: number;
  maxItems?: number;
  minLength?: number;
  maxLength?: number;
  alwaysFakeOptionals?: boolean;
  fillProperties?: boolean;
  useDefaultValue?: boolean;
  useExamplesValue?: boolean;
  optionalsProbability?: number;
  refDepth?: number;
  refDepthMin?: number;
  refDepthMax?: number;
  resolveJsonPath?: boolean;
  pruneProperties?: string[];
}

interface OptionsFile {
  [key: string]: unknown;
}

const VERSION = "0.6.0";

function printHelp(): void {
  console.log(`
json-schema-faker v${VERSION}

Usage: jsf <schema.json> [output.json] [count] [options.json]
       jsf --help
       jsf --version

Generate fake JSON data from JSON Schema.

Arguments:
  schema.json     Path to JSON schema file (required)
  output.json     Path to output file (default: stdout)
  count           Number of items to generate (wraps in array)
  options.json    Path to options file (.js or .json)

Options via CLI flags:
  --seed <n>           Random seed for deterministic output
  --max-depth <n>      Maximum recursion depth (default: 5)
  --min-items <n>      Override minItems for arrays
  --max-items <n>      Override maxItems for arrays
  --min-length <n>     Override minLength for strings
  --max-length <n>     Override maxLength for strings
  --optionals <0-1>    Probability for optional properties (default: 0.5)
  --all-optionals      Include all optional properties
  --use-defaults       Use schema default values
  --use-examples       Use schema examples values
  --resolve-jsonpath   Enable JSONPath resolution
  --prune <props>      Comma-separated properties to remove
  --pretty             Pretty print output (default: true)
  --no-pretty          Compact output
  -h, --help           Show this help
  -v, --version        Show version

Examples:
  jsf schema.json
  jsf schema.json output.json
  jsf schema.json output.json 10
  jsf schema.json output.json none options.js
  jsf schema.json --seed 42 --all-optionals
  cat schema.json | jsf -
`);
}

function parseArgs(args: string[]): {
  schemaPath: string | null;
  outputPath: string | null;
  count: number | null;
  optionsPath: string | null;
  cliOptions: CliOptions;
  pretty: boolean;
} {
  const result = {
    schemaPath: null as string | null,
    outputPath: null as string | null,
    count: null as number | null,
    optionsPath: null as string | null,
    cliOptions: {} as CliOptions,
    pretty: true,
  };

  const positional: string[] = [];

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg === "-h" || arg === "--help") {
      printHelp();
      process.exit(0);
    }

    if (arg === "-v" || arg === "--version") {
      console.log(`json-schema-faker v${VERSION}`);
      process.exit(0);
    }

    if (arg === "--pretty") {
      result.pretty = true;
      continue;
    }

    if (arg === "--no-pretty") {
      result.pretty = false;
      continue;
    }

    if (arg === "--all-optionals") {
      result.cliOptions.alwaysFakeOptionals = true;
      continue;
    }

    if (arg === "--use-defaults") {
      result.cliOptions.useDefaultValue = true;
      continue;
    }

    if (arg === "--use-examples") {
      result.cliOptions.useExamplesValue = true;
      continue;
    }

    if (arg === "--resolve-jsonpath") {
      result.cliOptions.resolveJsonPath = true;
      continue;
    }

    if (arg === "--seed" && args[i + 1]) {
      result.cliOptions.seed = parseInt(args[++i], 10);
      continue;
    }

    if (arg === "--max-depth" && args[i + 1]) {
      result.cliOptions.maxDepth = parseInt(args[++i], 10);
      continue;
    }

    if (arg === "--min-items" && args[i + 1]) {
      result.cliOptions.minItems = parseInt(args[++i], 10);
      continue;
    }

    if (arg === "--max-items" && args[i + 1]) {
      result.cliOptions.maxItems = parseInt(args[++i], 10);
      continue;
    }

    if (arg === "--min-length" && args[i + 1]) {
      result.cliOptions.minLength = parseInt(args[++i], 10);
      continue;
    }

    if (arg === "--max-length" && args[i + 1]) {
      result.cliOptions.maxLength = parseInt(args[++i], 10);
      continue;
    }

    if (arg === "--optionals" && args[i + 1]) {
      result.cliOptions.optionalsProbability = parseFloat(args[++i]);
      continue;
    }

    if (arg === "--prune" && args[i + 1]) {
      result.cliOptions.pruneProperties = args[++i].split(",");
      continue;
    }

    if (arg === "--ref-depth" && args[i + 1]) {
      result.cliOptions.refDepth = parseInt(args[++i], 10);
      continue;
    }

    if (arg.startsWith("-")) {
      console.error(`Unknown option: ${arg}`);
      process.exit(1);
    }

    positional.push(arg);
  }

  // Parse positional arguments
  if (positional.length >= 1) {
    result.schemaPath = positional[0];
  }

  if (positional.length >= 2 && positional[1] !== "none") {
    result.outputPath = positional[1];
  }

  if (positional.length >= 3 && positional[2] !== "none") {
    result.count = parseInt(positional[2], 10);
  }

  if (positional.length >= 4 && positional[3] !== "none") {
    result.optionsPath = positional[3];
  }

  return result;
}

function loadOptionsFile(path: string): OptionsFile {
  const resolvedPath = resolve(path);

  if (!existsSync(resolvedPath)) {
    console.error(`Options file not found: ${resolvedPath}`);
    process.exit(1);
  }

  if (path.endsWith(".js") || path.endsWith(".mjs")) {
    // For .js files, we need to use dynamic import
    // This won't work with compiled binary, so we'll only support .json
    console.error(`JavaScript options files not supported in binary. Use .json instead.`);
    process.exit(1);
  }

  try {
    const content = readFileSync(resolvedPath, "utf-8");
    return JSON.parse(content);
  } catch (error) {
    console.error(`Failed to parse options file: ${resolvedPath}`);
    process.exit(1);
  }
}

async function readSchema(path: string): Promise<JsonSchema> {
  if (path === "-") {
    // Read from stdin
    const chunks: Buffer[] = [];
    for await (const chunk of process.stdin) {
      chunks.push(chunk);
    }
    const content = Buffer.concat(chunks).toString("utf-8");
    return JSON.parse(content);
  }

  const resolvedPath = resolve(path);

  if (!existsSync(resolvedPath)) {
    console.error(`Schema file not found: ${resolvedPath}`);
    process.exit(1);
  }

  try {
    const content = readFileSync(resolvedPath, "utf-8");
    return JSON.parse(content);
  } catch (error) {
    console.error(`Failed to parse schema file: ${resolvedPath}`);
    process.exit(1);
  }
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    printHelp();
    process.exit(0);
  }

  const {
    schemaPath,
    outputPath,
    count,
    optionsPath,
    cliOptions,
    pretty,
  } = parseArgs(args);

  if (!schemaPath) {
    console.error("Error: Schema file is required");
    process.exit(1);
  }

  // Load schema
  const schema = await readSchema(schemaPath);

  // Load options file if provided
  const fileOptions = optionsPath ? loadOptionsFile(optionsPath) : {};

  // Merge options (CLI takes precedence)
  const options = { ...fileOptions, ...cliOptions } as CliOptions;

  try {
    let result: unknown;

    if (count !== null && count > 1) {
      // Generate array of items
      const items: unknown[] = [];
      for (let i = 0; i < count; i++) {
        const item = await generate(schema, {
          ...options,
          seed: options.seed ? options.seed + i : undefined,
        });
        items.push(item);
      }
      result = items;
    } else {
      // Generate single item
      result = await generate(schema, options);
    }

    const output = pretty
      ? JSON.stringify(result, null, 2)
      : JSON.stringify(result);

    if (outputPath) {
      writeFileSync(resolve(outputPath), output + "\n");
      console.error(`Generated: ${resolve(outputPath)}`);
    } else {
      console.log(output);
    }
  } catch (error) {
    console.error("Error:", error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
