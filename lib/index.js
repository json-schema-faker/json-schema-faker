'use strict';

var $ = require('./util');

module.exports = function(schema) {
  return $.traverse(schema);
};
