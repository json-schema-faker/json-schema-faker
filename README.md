# json-schema-faker

Generate valid JSON data from JSON Schema definitions. Zero production dependencies.

```typescript
import { generate } from "json-schema-faker";

const data = await generate({
  type: "object",
  properties: {
    name: { type: "string", minLength: 2 },
    age: { type: "integer", minimum: 0, maximum: 120 },
    email: { type: "string", format: "email" },
    tags: { type: "array", items: { type: "string" }, maxItems: 3 }
  },
  required: ["name", "email"]
});
```

## Features

- Supports JSON Schema 2019-09 and 2020-12
- Deterministic output via seeded PRNG (Mulberry32)
- All standard types: null, boolean, integer, number, string, array, object
- Composition keywords: `allOf`, `anyOf`, `oneOf`, `not`, `if`/`then`/`else` (JSON Schema 2020-12)
- `$ref` resolution with cycle detection and configurable recursion depth
- Remote `$ref` resolution (HTTP/file) via `createRemoteResolver()`
- Built-in format generators: date-time, email, uri, hostname, ipv4/ipv6, uuid, json-pointer
- Regex `pattern` support via AST-based string generator
- Built-in keywords: `autoIncrement`, `template` (string interpolation)
- Extension support for [faker](https://fakerjs.dev/) and [chance](https://chancejs.com/)
- Custom format registration via `registerFormat()`
- Custom keyword extensions via `define()`

## Install

```bash
npm install json-schema-faker
# or
bun add json-schema-faker
```

## API

### `generate(schema, options?)`

Generate a value from a JSON Schema. Returns `Promise<unknown>`.

```typescript
const value = await generate({ type: "string", format: "email" });
```

### `createGenerator(options?)`

Create a reusable generator with auto-incrementing seeds, producing different output on each call.

```typescript
const gen = createGenerator({ seed: 42 });
const a = await gen.generate(schema); // seed 42
const b = await gen.generate(schema); // seed 43
```

### `registerFormat(name, generator)`

Register a custom format generator globally.

```typescript
registerFormat("phone", (random) => {
  const area = random.int(200, 999);
  const num = random.int(1000000, 9999999);
  return `+1-${area}-${num}`;
});
```

### `createRemoteResolver(options?)`

Create a `$ref` resolver for external schemas (URLs or files).

```typescript
import { generate, createRemoteResolver } from "json-schema-faker";

const resolver = createRemoteResolver({
  baseUrl: "https://example.com/schemas/"
});

await generate(schema, { refResolver: resolver });
```

### `define(name, callback)`

Register a custom keyword generator. The callback receives `value` (keyword value from schema) and `schema` (full schema). Use `this` to persist state across calls.

```typescript
define("counter", function() {
  return ++this.count;
});

define("uuid", function() {
  return crypto.randomUUID();
});
```

### `reset(name?)`

Clear registered custom keywords. Call without arguments to clear all.

```typescript
reset("counter"); // clear specific
reset();          // clear all
```

## Options

```typescript
await generate(schema, {
  // Seeding & limits
  seed: 12345,                       // Random seed (default: 1)
  maxDepth: 5,                       // Max recursion depth (default: 5)
  maxDefaultItems: 3,                // Default max array items (default: 3)

  // Property generation
  optionalsProbability: 0.5,           // Probability of optional properties (default: 0.5)
  alwaysFakeOptionals: true,           // Always generate optional properties
  fillProperties: true,                // Fill beyond required properties
  fixedProbabilities: true,            // Deterministic probabilities for testing
  pruneProperties: ["internal"],       // Remove properties from output

  // Schema overrides
  minItems: 2,                       // Override schema minItems
  maxItems: 10,                      // Override schema maxItems
  minLength: 5,                      // Override schema minLength
  maxLength: 20,                     // Override schema maxLength

  // Value sources
  useDefaultValue: true,             // Use schema `default` values
  useExamplesValue: true,            // Use schema `examples` values

  // $ref recursion
  refDepthMin: 1,                    // Minimum $ref recursion depth
  refDepthMax: 5,                    // Maximum $ref recursion depth
  refDepth: 3,                       // Set both min and max to same value

  // Date-time range
  minDateTime: "2000-01-01",
  maxDateTime: "2025-12-31",

  // Invalid types
  failOnInvalidTypes: false,         // Return default instead of throwing
  defaultInvalidTypeProduct: null,   // Value for invalid types

  // Extensions
  resolveJsonPath: true,             // Enable jsonPath cross-references
  validateSchemaVersion: true,       // Throw on unsupported $schema
  formats: {                         // Inline custom formats
    custom: (random) => "value"
  },
  refResolver: myResolver,          // Custom $ref resolver
  extensions: {                      // faker/chance instances
    faker: fakerInstance,
    chance: chanceInstance,
  }
});
```

## Extensions (faker / chance)

Use faker or chance to generate realistic data. Works for all types:

```typescript
import { faker } from "@faker-js/faker";

await generate({
  type: "object",
  properties: {
    name: { type: "string", faker: "person.fullName" },
    email: { faker: "internet.email" },
    age: { type: "integer", faker: { "number.int": [{ min: 18, max: 65 }] } },
    active: { type: "boolean", chance: "bool" },
  }
}, { extensions: { faker } });
```

Values are automatically cast to match the schema's `type`.

## CLI

Install globally to use from command line:

```bash
npm install -g json-schema-faker
jsf schema.json
```

### CLI Usage

```bash
jsf <schema.json> [options]
```

**Arguments:**
- `schema.json` - Path to JSON schema file (use `-` for stdin)

**Options:**
```
-o, --output <file>   Output file path (default: stdout)
-c, --count <n>       Generate N items as array
    --options <file>  Path to options JSON file
    --seed <n>        Random seed for deterministic output
    --max-depth <n>   Maximum recursion depth (default: 5)
    --min-items <n>   Override minItems for arrays
    --max-items <n>   Override maxItems for arrays
    --min-length <n>  Override minLength for strings
    --max-length <n>  Override maxLength for strings
    --optionals <0-1> Probability for optional properties
    --all-optionals   Include all optional properties
    --use-defaults    Use schema default values
    --use-examples    Use schema examples values
    --resolve-jsonpath Enable JSONPath resolution
    --prune <props>   Comma-separated properties to remove
    --pretty          Pretty print output (default)
    --no-pretty       Compact output
```

**Examples:**
```bash
# Generate to stdout
jsf schema.json

# Generate to file
jsf schema.json -o output.json

# Generate 10 items as array
jsf schema.json -c 10

# With seed for reproducible output
jsf schema.json --seed 42

# Include all optional properties
jsf schema.json --all-optionals

# Combine options
jsf schema.json -o output.json -c 5 --seed 42

# Read from stdin
cat schema.json | jsf -
```

### Standalone Binaries

Download platform-specific binaries from [GitHub Releases](https://github.com/json-schema-faker/json-schema-faker/releases):
- `jsf-linux-x64`
- `jsf-linux-arm64`
- `jsf-darwin-x64` (macOS Intel)
- `jsf-darwin-arm64` (macOS Apple Silicon)
- `jsf-windows-x64.exe`

## Development

```bash
make dev          # Run development mode (tequio-dev)
make test         # Run all tests
make test_all     # Run all tests including skipped
make typecheck    # TypeScript type checking
make build        # Build the project
make check        # Run typecheck + test
make ci           # Full CI check (typecheck + test_all + build)
```

## License

MIT

> The new implementation reuses the `v0.5.x` ideas but is rewritten in TypeScript for Bun with zero production dependencies.
>
> It emphasizes a clear, typed API (generate, createGenerator, registerFormat, createRemoteResolver) and a focused runtime suitable for Node-like or Bun environments.
>
> If you rely on the original behavior or want historical reference, you can review the previous work at: [https://github.com/json-schema-faker/json-schema-faker/tree/0.5.x][jsf]

[jsf]: https://github.com/json-schema-faker/json-schema-faker/tree/0.5.x
