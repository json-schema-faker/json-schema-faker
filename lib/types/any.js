'use strict';

var types = ['array', 'boolean', 'null', 'number', 'integer', 'object', 'string'];

var random = require('../util/random');

module.exports = function(value) {
  var primitives = require('../util/primitives');

  var key = types[random(0, types.length - 1)];

  // TODO: how to generate this "any" values?
  if (key === 'object' && !value.properties) {
    value.properties = {};
  }

  if (key === 'array' && !value.items) {
    value.items = [];
  }

  return primitives[key](value);
};
