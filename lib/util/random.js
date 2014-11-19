'use strict';

var MAX_NUMBER = 100,
    MIN_NUMBER = -100;

var random = module.exports = function(value) {
  if (typeof value !== 'object') {
    return random({
      minimum: arguments[0],
      maximum: arguments[1]
    });
  }

  var min = typeof value.minimum !== 'undefined' ? value.minimum : MIN_NUMBER,
      max = typeof value.maximum !== 'undefined' ? value.maximum : MAX_NUMBER;

  min = typeof value.minLength !== 'undefined' ? value.minLength : min;
  max = typeof value.maxLength !== 'undefined' ? value.maxLength : max;

  if (value.type === 'number' || value.type === 'integer') {
    if (value.exclusiveMinimum) {
      min += 1;
    }

    if (value.exclusiveMaximum) {
      max -= 1;
    }

    if (value.multipleOf) {
      return random(Math.floor(min / value.multipleOf), Math.floor(max / value.multipleOf)) * value.multipleOf;
    }
  }

  if (max < min || min === max) {
    throw new RangeError('Invalid range between: ' + min + ', ' + max);
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
};
