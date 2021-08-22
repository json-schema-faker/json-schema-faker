import type { JsonValue, JsonObject } from 'type-fest';
import type { JSONSchema4 } from 'json-schema';

export interface JSONSchemaFakerOptions {
  defaultInvalidTypeProduct?: boolean;
  defaultRandExpMax?: number;
  pruneProperties?: string[];
  ignoreProperties?: string[];
  ignoreMissingRefs?: boolean;
  failOnInvalidTypes?: boolean;
  failOnInvalidFormat?: boolean;
  alwaysFakeOptionals?: boolean;
  optionalsProbability?: boolean;
  fixedProbabilities?: boolean;
  useExamplesValue?: boolean;
  useDefaultValue?: boolean;
  requiredOnly?: boolean;
  minItems?: number;
  maxItems?: number;
  minLength?: number;
  maxLength?: number;
  resolveJsonPath?: boolean;
  reuseProperties?: boolean;
  fillProperties?: boolean;
  replaceEmptyByRandomValue?: boolean;
  random?(): number;
  renderTitle?: boolean;
  renderDescription?: boolean;
  renderComment?: boolean;
}

export type JSONSchemaFakerRefs = JSONSchema4[] | { [k: string]: JSONSchema4 };

export interface JSONSchemaFakerDefine {
  (value: JsonValue, schema: JsonObject, property: string, rootSchema: JSONSchema4, propertyPath: string[]): JsonValue;
}

interface JSONSchemaFakerFormat {
  (opts: { [k: string]: (value: JSONSchema4) => string }): void;
  (name: string, callback: (value: JSONSchema4) => string): void;
}

declare function JSONSchemaFakerOption(opts: JSONSchemaFakerOptions): void;
declare function JSONSchemaFakerOption(name: keyof JSONSchemaFakerOptions, value: any): void;
declare namespace JSONSchemaFakerOption {
  var getDefaults: () => JSONSchemaFakerOptions;
}

declare function JSONSchemaFaker(schema: JSONSchema4, refs?: JSONSchemaFakerRefs, cwd?: string): JsonValue;
declare namespace JSONSchemaFaker {
  var VERSION: string;
  var format: JSONSchemaFakerFormat;
  var option: typeof JSONSchemaFakerOption;
  var generate: (schema: JSONSchema4, refs?: JSONSchemaFakerRefs) => JsonValue;
  var generateYAML: (schema: JSONSchema4, refs?: JSONSchemaFakerRefs) => string;
  var resolve: (schema: JSONSchema4, refs?: JSONSchemaFakerRefs, cwd?: string) => Promise<JsonValue>;
  var resolveYAML: (schema: JSONSchema4, refs?: JSONSchemaFakerRefs, cwd?: string) => Promise<string>;
  var random: {
    date(step?: 'seconds' | 'minutes' | 'hours' | 'days' | 'weeks' | 'months' | 'years'): number | Date;
    pick(list: any[]): any;
    shuffle(list: any[]): any[];
    number(min?: number, max?: number, defMin?: number, defMax?: number, hasPrecision?: boolean): number;
    randexp(expr: string): string;
  };
  var extend: (name: string, cb: (generator: any) => any) => typeof JSONSchemaFaker;
  var define: (name: string, cb: JSONSchemaFakerDefine) => typeof JSONSchemaFaker;
  var reset: (name: string) => typeof JSONSchemaFaker;
  var locate: (name: string) => any;
}

export default JSONSchemaFaker;
