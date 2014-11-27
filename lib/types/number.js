'use strict';

var random = require('../util/random');

module.exports = function(value) {
  var min = typeof value.minimum === 'undefined' ? random.MIN_NUMBER : value.minimum,
      max = typeof value.maximum === 'undefined' ? random.MAX_NUMBER : value.maximum;

  if (value.exclusiveMinimum && value.minimum) {
    min += 1;
  }

  if (value.exclusiveMaximum && value.maximum) {
    max -= 1;
  }

  if (value.multipleOf) {
    var base = random(Math.floor(min / value.multipleOf), Math.floor(max / value.multipleOf)) * value.multipleOf;

    while (base < min) {
      base += value.multipleOf;
    }

    return base;
  }

  return random(min, max);
};
