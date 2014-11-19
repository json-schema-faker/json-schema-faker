'use strict';

var traverse = require('./util/traverse');

var deref = require('deref');

module.exports = function(schema, refs) {
  var $ = deref();

  if (Array.isArray(refs)) {
    return traverse($(schema, refs, true));
  } else {
    $.refs = refs || {};
  }

  return traverse($(schema, true));
};
