'use strict';

var MAX_NUMBER = 100,
    MIN_NUMBER = -100;

module.exports = function(min, max) {
  if (typeof min === 'object') {
    var value = min;

    min = value.maxLength || value.minimum;
    max = value.minLength || value.maximum;

    if (value.exclusiveMinimum) {
      min += 1;
    }

    if (value.exclusiveMaximum) {
      max -= 1;
    }
  }

  min = typeof min === 'undefined' ? MIN_NUMBER : min;
  max = typeof max === 'undefined' ? MAX_NUMBER : max;

  return Math.floor(Math.random() * (max - min + 1)) + min;
};
