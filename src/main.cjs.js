import $RefParser from 'json-schema-ref-parser';
import { JSONPath } from 'jsonpath-plus';

import { setDependencies } from './lib/vendor';

setDependencies({ $RefParser, JSONPath });

export { default } from './lib';
