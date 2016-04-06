/**
 * JSON Schema TypeScript interface.
 *
 * fetched from https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/tv4/tv4.d.ts
 */
interface JsonSchema {
  [key: string]: any;
  title?: string;
  description?: string;
  id?: string;
  $schema?: string;
  type?: string;
  items?: any;
  properties?: any;
  patternProperties?: any;
  additionalProperties?: boolean;
  required?: string[];
  definitions?: any;
  default?: any;
}

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

interface INumberSchema extends IGeneratorSchema{
  multipleOf?: number;
  minimum?: number;
  maximum?: number;
  exclusiveMinimum?: boolean;
  exclusiveMaximum?: boolean;
}
