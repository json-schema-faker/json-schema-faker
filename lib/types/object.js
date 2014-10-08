'use strict';

module.exports = function(value) {
  if (!value.properties) {
    throw new Error('Missing properties for object "' + JSON.stringify(value) + '"');
  }

  var $ = require('../util');

  return $.traverse(value.properties);
};
