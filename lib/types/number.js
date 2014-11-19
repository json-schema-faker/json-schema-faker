'use strict';

var random = require('../util/random');

module.exports = function(value) {
  if (value.multipleOf) {
    return random(value) * value.multipleOf;
  }

  return random(value);
};
