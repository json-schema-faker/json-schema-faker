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

import jsf from './lib/index.mjs';

export { default } from './lib/index.mjs';
export const JSONSchemaFaker = jsf;
