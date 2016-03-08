function random(min, max, defMin, defMax) {
  var hasPrecision = false;

  if (typeof min === 'object') {
    hasPrecision = min.hasPrecision;
    max = min.max;
    defMin = min.defMin;
    defMax = min.defMax;
    min = min.min;
  }

  defMin = typeof defMin === 'undefined' ? random.MIN_NUMBER : defMin;
  defMax = typeof defMax === 'undefined' ? random.MAX_NUMBER : defMax;

  min = typeof min === 'undefined' ? defMin : min;
  max = typeof max === 'undefined' ? defMax : max;

  if (max < min) {
    max += min;
  }

  var number = Math.random() * (max - min) + min;

  if (!hasPrecision) {
    return parseInt(number, 10);
  }

  return number;
}

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

module.exports = random;
