if (typeof process !== 'undefined') {
  global.location = { href: `${process.cwd()}/` };
}

import './vendor.js';

import { setDependencies } from './shared.js';

/* global $RefParser, JSONPath */
if (typeof $RefParser !== 'undefined' && typeof JSONPath !== 'undefined') {
  setDependencies({ ...JSONPath, $RefParser });
}

export { default, JSONSchemaFaker } from './shared.js';
