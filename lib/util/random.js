var container = require('./container');

var random = module.exports = function(min, max, defMin, defMax) {
  var faker = container.get('faker');

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

  min = typeof min === 'undefined' ? defMin : min;
  max = typeof max === 'undefined' ? defMax : max;

  if (max < min) {
    max += min;
  }

  return faker.random.number({
    min: min,
    max: max,
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
