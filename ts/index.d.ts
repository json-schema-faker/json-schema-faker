/**
 * JSF basic schema extension
 */
interface IGeneratorSchema {
  faker?: any;
  chance?: any;
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
  type?: string | string[]; // see http://json-schema.org/latest/json-schema-validation.html "5.5.2.1 valid values"
  items?: any;
  properties?: any;
  patternProperties?: any;
  additionalProperties?: boolean;
  required?: string[];
  definitions?: any;
  default?: any;
}

/**
 * This interface represents outer JSF object that is accessible by the end users.
 * It is a stateful function (combined of additional functionalities) and needs a separate type.
 */
interface jsfAPI {
  (schema: JsonSchema, refs?: any): any;
  format: Function;
  extend: Function;
}
