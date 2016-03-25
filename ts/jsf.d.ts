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
