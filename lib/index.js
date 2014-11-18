'use strict';

var traverse = require('./util/traverse');

module.exports = function(schema) {
  return traverse(schema);
};
