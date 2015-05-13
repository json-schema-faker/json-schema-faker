'use strict';

var container = require('./container');

var faker = container.get('faker');

var random = module.exports = function(min, max, defMin, defMax) {
  var isInteger = true;

  if (typeof min === 'boolean') {
    // non-integer values
    isInteger = min;
    min = arguments[1];
    max = arguments[2];
    defMin = arguments[3];
    defMax = arguments[4];
  }

  defMin = typeof defMin === 'undefined' ? random.MIN_NUMBER : defMin;
  defMax = typeof defMax === 'undefined' ? random.MAX_NUMBER : defMax;

  if (typeof max === 'undefined' && min > defMax) {
    defMax += min;
  }

  min = typeof min === 'undefined' ? defMin : min;
  max = typeof max === 'undefined' ? defMax : max;

  if (min !== +min) {
    throw new RangeError('value ' + JSON.stringify(min) + ' is not-a-number');
  }

  if (max !== +max) {
    throw new RangeError('value ' + JSON.stringify(min) + ' is not-a-number');
  }

  if (max < min) {
    throw new RangeError('invalid range between: ' + min + ', ' + max);
  }

  return faker.random.number({
    min: min,
    max: Math.max(max, min + 1),
    precision: isInteger ? 1 : Math.random()
  });
};

random.shuffle = function(obj) {
  var copy = obj.slice(),
      length = obj.length;

  for (; length > 0;) {
    var key = Math.floor(Math.random() * length),
        tmp = copy[--length];

    copy[length] = copy[key];
    copy[key] = tmp;
  }

  return copy;
};

random.pick = function(obj) {
  return obj[Math.floor(Math.random() * obj.length)];
};

random.MIN_NUMBER = -100;
random.MAX_NUMBER = 100;
