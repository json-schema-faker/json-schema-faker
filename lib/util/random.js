'use strict';

var random = module.exports = function(min, max) {
  min = typeof min === 'undefined' ? random.MIN_NUMBER : min;
  max = typeof max === 'undefined' ? random.MAX_NUMBER : max;

  if (min !== +min) {
    throw new RangeError('Value ' + JSON.stringify(min) + ' is not-a-number');
  }

  if (max !== +max) {
    throw new RangeError('Value ' + JSON.stringify(min) + ' is not-a-number');
  }

  if (max < min || min === max) {
    throw new RangeError('Invalid range between: ' + min + ', ' + max);
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

random.MIN_NUMBER = -100;
random.MAX_NUMBER = 100;
