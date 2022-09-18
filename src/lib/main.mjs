import $RefParser from 'json-schema-ref-parser';
import { JSONPath } from 'jsonpath-plus';

import { setDependencies } from './vendor.mjs';

setDependencies({ $RefParser, JSONPath });

import jsf from './index.mjs';

export { default } from './index.mjs';
export const JSONSchemaFaker = jsf;
