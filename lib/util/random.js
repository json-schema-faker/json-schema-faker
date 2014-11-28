'use strict';

var random = module.exports = function(min, max, defMin, defMax) {
  defMin = typeof defMin === 'undefined' ? random.MIN_NUMBER : defMin;
  defMax = typeof defMax === 'undefined' ? random.MAX_NUMBER : defMax;

  min = typeof min === 'undefined' ? defMin : min;
  max = typeof max === 'undefined' ? defMax : max;

  if (min !== +min) {
    throw new RangeError('Value ' + JSON.stringify(min) + ' is not-a-number');
  }

  if (max !== +max) {
    throw new RangeError('Value ' + JSON.stringify(min) + ' is not-a-number');
  }

  if (max < min) {
    throw new RangeError('Invalid range between: ' + min + ', ' + max);
  }

  return Math.floor(Math.random() * (Math.max(max, min + 1) - min + 1)) + min;
};

random.MIN_INTEGER = -100000000;
random.MAX_INTEGER = 100000000;

random.MIN_NUMBER = -100;
random.MAX_NUMBER = 100;
