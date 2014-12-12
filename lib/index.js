'use strict';

var traverse = require('./util/traverse'),
    formats = require('./util/formats');

var deref = require('deref');

function generate(schema, refs) {
  var $ = deref();

  if (Array.isArray(refs)) {
    return traverse($(schema, refs, true));
  } else {
    $.refs = refs || {};
  }

  return traverse($(schema, true));
}

generate.formats = formats;

module.exports = generate;
