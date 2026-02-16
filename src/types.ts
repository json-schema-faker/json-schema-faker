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
  /** External extensions for generating values (e.g., faker, chance) */
  extensions?: {
    /** @faker-js/faker instance */
    faker?: any;
    /** chance instance */
    chance?: any;
  };
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
  /** External extensions for generating values (e.g., faker, chance) */
  extensions?: {
    faker?: any;
    chance?: any;
  };
}

export interface Random {
  next(): number;
  int(min: number, max: number): number;
  bool(probability?: number): boolean;
  pick<T>(arr: readonly T[]): T;
  shuffle<T>(arr: T[]): T[];
  fork(): Random;
}
