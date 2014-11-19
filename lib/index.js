'use strict';

var traverse = require('./util/traverse');

var deref = require('deref');

module.exports = function(schema, refs) {
  return traverse(deref()(schema, refs, true));
};
