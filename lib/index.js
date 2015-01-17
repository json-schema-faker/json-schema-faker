'use strict';

var traverse = require('./util/traverse'),
    formats = require('./util/formats');

var deref = require('deref');

function generate(schema, refs) {
  var $ = deref();

  try {
    if (Array.isArray(refs)) {
      return traverse($(schema, refs, true));
    } else {
      $.refs = refs || {};
    }

    return traverse($(schema, true));
  } catch (e) {
    if (e.path) {
      throw new Error(e.message + ' in ' + '/' + e.path.join('/'));
    } else {
      throw e;
    }
  }
}

generate.formats = formats;

module.exports = generate;
