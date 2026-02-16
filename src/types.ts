export type JsonSchema = JsonSchemaObject | boolean;

export interface JsonSchemaObject {
  // Meta
  $schema?: string;
  $id?: string;
  $ref?: string;
  $defs?: Record<string, JsonSchema>;
  definitions?: Record<string, JsonSchema>;

  // Type
  type?: string | string[];
  enum?: unknown[];
  const?: unknown;

  // Numeric
  minimum?: number;
  maximum?: number;
  exclusiveMinimum?: number;
  exclusiveMaximum?: number;
  multipleOf?: number;
  autoIncrement?: boolean;
  initialOffset?: number;

  // String
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  format?: string;

  // Array
  items?: JsonSchema;
  prefixItems?: JsonSchema[];
  contains?: JsonSchema;
  minItems?: number;
  maxItems?: number;
  uniqueItems?: boolean;
  minContains?: number;
  maxContains?: number;

  // Object
  properties?: Record<string, JsonSchema>;
  required?: string[];
  additionalProperties?: JsonSchema;
  patternProperties?: Record<string, JsonSchema>;
  minProperties?: number;
  maxProperties?: number;
  propertyNames?: JsonSchema;

  // Composition
  allOf?: JsonSchema[];
  anyOf?: JsonSchema[];
  oneOf?: JsonSchema[];
  not?: JsonSchema;
  if?: JsonSchema;
  then?: JsonSchema;
  else?: JsonSchema;

  // Allow additional keywords
  [key: string]: unknown;
}

export interface RefResolver {
  (ref: string): Promise<JsonSchema> | JsonSchema;
}

export interface RemoteResolverOptions {
  /** Base URL for resolving relative references */
  baseUrl?: string;
  /** Custom fetch function for HTTP requests */
  fetch?: (url: string) => Promise<Response>;
  /** Custom file reader function */
  readFile?: (path: string) => Promise<string>;
  /** Cache for resolved schemas */
  cache?: Map<string, JsonSchema>;
}

export interface GenerateOptions {
  seed?: number;
  maxDepth?: number;
  maxDefaultItems?: number;
  optionalPropertyProbability?: number;
  formats?: Record<string, (random: Random) => string>;
  refResolver?: RefResolver;
  /** Override schema minItems for array generation */
  minItems?: number;
  /** Override schema maxItems for array generation */
  maxItems?: number;
  /** Use schema default values when generating */
  useDefaultValue?: boolean;
  /** Always generate optional properties */
  alwaysFakeOptionals?: boolean;
  /** Alias for optionalPropertyProbability - probability (0-1) of generating optional properties */
  optionalsProbability?: number;
  /** Use fixed/deterministic probabilities for testing */
  fixedProbabilities?: boolean;
  /** Fill properties beyond required (for nested required propagation) */
  fillProperties?: boolean;
  /** External extensions for generating values (e.g., faker, chance) */
  extensions?: {
    /** @faker-js/faker instance */
    faker?: any;
    /** chance instance */
    chance?: any;
  };
  /** Enable jsonPath resolution for cross-references within generated data */
  resolveJsonPath?: boolean;
}

export interface GenerateContext {
  random: Random;
  maxDepth: number;
  maxDefaultItems: number;
  optionalPropertyProbability: number;
  depth: number;
  refRegistry: Map<string, JsonSchema>;
  refStack: Set<string>;
  formatRegistry: Map<string, (random: Random) => string>;
  refResolver?: RefResolver;
  /** Override schema minItems for array generation */
  minItems?: number;
  /** Override schema maxItems for array generation */
  maxItems?: number;
  /** Use schema default values when generating */
  useDefaultValue?: boolean;
  /** Current path in the schema (JSON pointer) */
  path: string;
  /** Always generate optional properties */
  alwaysFakeOptionals?: boolean;
  /** Probability (0-1) of generating optional properties - mirrors optionalsProbability option */
  optionalsProbability?: number;
  /** Use fixed/deterministic probabilities for testing */
  fixedProbabilities?: boolean;
  /** Fill properties beyond required (for nested required propagation) */
  fillProperties?: boolean;
  /** External extensions for generating values (e.g., faker, chance) */
  extensions?: {
    faker?: any;
    chance?: any;
  };
  /** Enable jsonPath resolution for cross-references within generated data */
  resolveJsonPath?: boolean;
  /** Counters for autoIncrement, keyed by path */
  autoIncrementCounters?: Map<string, number>;
}

export interface Random {
  next(): number;
  int(min: number, max: number): number;
  bool(probability?: number): boolean;
  pick<T>(arr: readonly T[]): T;
  shuffle<T>(arr: T[]): T[];
  fork(): Random;
}
