/**
 * JSF basic schema extension
 */
interface IGeneratorSchema {
  faker?: any;
  'x-faker'?: any;
  chance?: any;
  'x-chance'?: any;
}

interface IStringSchema extends IGeneratorSchema {
  format?: string;
  pattern?: RegExp;
  minLength?: number;
  maxLength?: number;
}

interface INumberSchema extends IGeneratorSchema {
  multipleOf?: number;
  minimum?: number;
  maximum?: number;
  exclusiveMinimum?: boolean;
  exclusiveMaximum?: boolean;
}

interface IArraySchema extends IGeneratorSchema {
  items?: IObjectSchema|IObjectSchema[];
  additionalItems?: boolean|IObjectSchema;
  minItems?: number;
  maxItems?: number;
  uniqueItems?: boolean;
}

interface IPropertySchema {
  [property: string]: IObjectSchema;
}

interface IObjectSchema extends IGeneratorSchema {
  additionalProperties?: boolean;
  required?: string[];
  properties?: IPropertySchema;
  patternProperties?: IPropertySchema; // RegExp should be the index of this structure (see "5.4.4.1. Valid values" in http://json-schema.org/latest/json-schema-validation.html), but RegExp-key-based maps are unsupported in TypeScript
  minProperties?: number;
  maxProperties?: number;
}

type ISchemaInternalType = "string" | "integer" | "number" | "object" | "array";

/**
 * JSON Schema TypeScript interface.
 *
 * fetched from https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/tv4/tv4.d.ts
 */
interface JsonSchema extends IGeneratorSchema {
  [key: string]: any;
  title?: string;
  description?: string;
  id?: string;
  enum?: any[];
  $schema?: string;
  type?: ISchemaInternalType; // | string[] // see http://json-schema.org/latest/json-schema-validation.html "5.5.2.1 valid values"
  items?: any;
  properties?: any;
  patternProperties?: any;
  additionalProperties?: boolean;
  required?: string[];
  definitions?: any;
  default?: any;
}

declare type SchemaPath = string[];

declare type StackTrace = string[];

/**
 * This interface is used to check consistency between type generators (string, boolean, array, etc.)
 */
interface FTypeGenerator {
  (value?: IGeneratorSchema, path?: SchemaPath, resolve?: Function, traverseCallback?: Function): any;
}

interface IStringMap {
  [format: string]: string;
}

/**
 * This interface represents outer JSF object that is accessible by the end users.
 * It is a stateful function (combined of additional functionalities) and needs a separate type.
 */
interface jsfAPI {
  (schema: JsonSchema, refs?: any): any;
  format: Function;
  option: Function;
  extend: Function;
  version: string;
}

// quick and dirty overcome
// TODO provide proper definitions
declare module 'randexp' { var randexp: any; export = randexp; }
declare module 'deref' { var $: any; export = $; }
