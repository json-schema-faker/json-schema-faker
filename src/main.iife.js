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

const jsf = require('./shared');

if (typeof window !== 'undefined') {
  jsf.setDependencies({
    ...window.JSONPath,
    $RefParser: window.$RefParser,
  });

  window.JSONSchemaFaker = jsf.default;
}

module.exports = jsf.default;
module.exports.JSONSchemaFaker = jsf.JSONSchemaFaker;
