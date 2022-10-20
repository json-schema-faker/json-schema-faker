import $RefParser from 'json-schema-ref-parser';
import { JSONPath } from 'jsonpath-plus';

import { setDependencies } from './vendor.mjs';

setDependencies({ $RefParser, JSONPath });

export { default, JSONSchemaFaker } from './index.mjs';
