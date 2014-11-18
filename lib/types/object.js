'use strict';

var traverse = require('../util/traverse');

module.exports = function(value) {
  if (!value.properties) {
    throw new Error('Missing properties for object "' + JSON.stringify(value) + '"');
  }

  return traverse(value.properties);
};
