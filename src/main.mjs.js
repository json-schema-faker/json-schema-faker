/**
  ---
  $banner:
    js: import './vendor.js';
  ---
  */

import { setDependencies } from './lib/vendor.mjs';

/* global $RefParser, JSONPath */
if (typeof $RefParser !== 'undefined' && typeof JSONPath !== 'undefined') {
  setDependencies({ ...JSONPath, $RefParser });
}

export { default, JSONSchemaFaker } from './lib/index.mjs';
