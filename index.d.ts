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
  (opts: { [k: string]: string[] | boolean | number | Function }): void;
  (name: string, callback: Function): void;
}

declare function JSONSchemaFakerOption(opts: { [k: string]: string[] | boolean | number | Function }): void;
declare function JSONSchemaFakerOption(name: keyof JSONSchemaFakerOptions, value: string[] | boolean | number | Function): void;
declare namespace JSONSchemaFakerOption {
  var getDefaults: () => JSONSchemaFakerOptions;
}

declare function JSONSchemaFaker(schema: JSONSchema4, refs?: JSONSchemaFakerRefs, cwd?: string): JsonValue;
declare namespace JSONSchemaFaker {
  var VERSION: string;
  var format: JSONSchemaFakerFormat;
  var option: typeof JSONSchemaFakerOption;
  var generate: (schema: JSONSchema4, refs?: JSONSchemaFakerRefs) => void;
  var generateYAML: (schema: JSONSchema4, refs?: JSONSchemaFakerRefs) => void;
  var resolve: (schema: JSONSchema4, refs?: JSONSchemaFakerRefs) => void;
  var resolveYAML: (schema: JSONSchema4, refs?: JSONSchemaFakerRefs) => void;
  var random: {
    date(step?: 'seconds' | 'minutes' | 'hours' | 'days' | 'weeks' | 'months' | 'years'): number | Date;
    pick(list: any[]): any;
    shuffle(list: any[]): any[];
    number(min?: number, max?: number, defMin?: number, defMax?: number, hasPrecision?: boolean): number;
    randexp(expr: string): string;
  };
  var extend: (name: string, cb: (generator: any) => any) => void;
  var define: (name: string, cb: JSONSchemaFakerDefine) => void;
  var reset: (name: string) => typeof JSONSchemaFaker;
  var locate: (name: string) => any;
}

export default JSONSchemaFaker;
