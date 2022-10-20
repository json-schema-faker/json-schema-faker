/**
 ---
 $name: JSONSchemaFaker
 $footer:
  js: |
    (function (root, factory) {
      if (typeof define === 'function' && define.amd) {
        define(factory);
      } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
      } else {
        root.JSONSchemaFaker = factory();
      }
    }(typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : globalThis, () => JSONSchemaFaker));
 ---
 */

const { setDependencies } = require('./lib/vendor');
const JSONSchemaFaker = require('./lib').default;

if (typeof window !== 'undefined') {
  setDependencies({
    ...window.JSONPath,
    $RefParser: window.$RefParser,
  });

  window.JSONSchemaFaker = JSONSchemaFaker;
}

module.exports = JSONSchemaFaker;
module.exports.JSONSchemaFaker = JSONSchemaFaker;
