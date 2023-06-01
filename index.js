import $RefParser from '@apidevtools/json-schema-ref-parser';
import { JSONPath } from 'jsonpath-plus';

import { setDependencies } from './dist/shared.js';

setDependencies({ JSONPath, $RefParser });

export { default, JSONSchemaFaker } from './dist/shared.js';
