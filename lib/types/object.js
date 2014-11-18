'use strict';

var traverse = require('../util/traverse');

module.exports = function(value) {
  if (!value.properties) {
    throw new Error('Missing properties for object "' + JSON.stringify(value) + '"');
  }

  var props = {},
      reqs = value.required || [];

  for (var key in value.properties) {
    var skip = Math.random() > 0.5;

    if (!(skip && reqs.indexOf(key) === -1)) {
      props[key] = value.properties[key];
    }
  }

  return traverse(props);
};
