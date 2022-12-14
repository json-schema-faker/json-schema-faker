import type { JsonValue, JsonObject } from 'type-fest';
import type { JSONSchema4, JSONSchema6, JSONSchema7 } from 'json-schema';

export type Schema = JSONSchema4 | JSONSchema6 | JSONSchema7;

export interface JSONSchemaFakerOptions {
  defaultInvalidTypeProduct?: boolean;
  defaultRandExpMax?: number;
  pruneProperties?: string[];
  ignoreProperties?: string[];
  ignoreMissingRefs?: boolean;
  failOnInvalidTypes?: boolean;
  failOnInvalidFormat?: boolean;
  alwaysFakeOptionals?: boolean;
  optionalsProbability?: number | false;
  fixedProbabilities?: boolean;
  useExamplesValue?: boolean;
  useDefaultValue?: boolean;
  requiredOnly?: boolean;
  omitNulls?: boolean;
  minItems?: number;
  maxItems?: number;
  minLength?: number;
  maxLength?: number;
  resolveJsonPath?: boolean;
  reuseProperties?: boolean;
  sortProperties?: boolean;
  fillProperties?: boolean;
  replaceEmptyByRandomValue?: boolean;
  random?: () => number | number;
  minDateTime?: Date | string | number;
  maxDateTime?: Date | string | number;
  renderTitle?: boolean;
  renderDescription?: boolean;
  renderComment?: boolean;
  refDepthMax?: number;
  refDepthMin?: number;
}

export type JSONSchemaFakerRefs = Schema[] | { [k: string]: Schema };

export interface JSONSchemaFakerDefine {
  (value: JsonValue, schema: JsonObject, property: string, rootSchema: Schema, propertyPath: string[]): JsonValue;
}

export interface JSONSchemaFakerFormat {
  (opts: { [k: string]: (value: Schema) => unknown }): void;
  (name: string, callback: (value: Schema) => unknown): void;
}

declare function JSONSchemaFakerOption(opts: JSONSchemaFakerOptions): void;
declare function JSONSchemaFakerOption(name: keyof JSONSchemaFakerOptions, value: any): void;
declare namespace JSONSchemaFakerOption {
  var getDefaults: () => JSONSchemaFakerOptions;
}

type JSONSchemaFakerObject = {
  VERSION: string;
  format: JSONSchemaFakerFormat;
  option: typeof JSONSchemaFakerOption;
  generate: (schema: Schema, refs?: JSONSchemaFakerRefs) => JsonValue;
  generateYAML: (schema: Schema, refs?: JSONSchemaFakerRefs) => string;
  resolve: (schema: Schema, refs?: JSONSchemaFakerRefs, cwd?: string) => Promise<JsonValue>;
  resolveYAML: (schema: Schema, refs?: JSONSchemaFakerRefs, cwd?: string) => Promise<string>;
  random: {
    date(step?: 'seconds' | 'minutes' | 'hours' | 'days' | 'weeks' | 'months' | 'years'): number | Date;
    pick(list: any[]): any;
    shuffle(list: any[]): any[];
    number(min?: number, max?: number, defMin?: number, defMax?: number, hasPrecision?: boolean): number;
    randexp(expr: string): string;
  };
  extend: (name: string, cb: (generator: any) => any) => typeof JSONSchemaFaker;
  define: (name: string, cb: JSONSchemaFakerDefine) => typeof JSONSchemaFaker;
  reset: (name: string) => typeof JSONSchemaFaker;
  locate: (name: string) => any;
}

export declare const JSONSchemaFaker: JSONSchemaFakerObject;

/** @deprecated The default export is deprecated; use the named export. See https://github.com/json-schema-faker/json-schema-faker/blob/master/docs/DEPRECATED.md */
declare const jsf: JSONSchemaFakerObject & {
  (schema: Schema, refs?: JSONSchemaFakerRefs, cwd?: string): JsonValue 
};
export default jsf;
