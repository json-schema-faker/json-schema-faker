'use strict';

var MIN_INTEGER = -100000000,
    MAX_INTEGER = 100000000,
    DEFAULT_PRECISION   = .00001;

var container = require('../util/container'),
    string = require('./string');

var faker = container.get('faker');

module.exports = function(value) {
  if (value.faker || value.chance) {
    return string(value);
  }

  var multipleOf = value.multipleOf;

  var min = typeof value.minimum === 'undefined' ? MIN_INTEGER : value.minimum,
      max = typeof value.maximum === 'undefined' ? MAX_INTEGER : value.maximum;

  var fakerPrecision = multipleOf || DEFAULT_PRECISION;

  if (multipleOf) {
    max = Math.floor(max / multipleOf) * multipleOf;
    min = Math.ceil(min / multipleOf) * multipleOf;
  }


  if (value.exclusiveMinimum && value.minimum && min === value.minimum) {
    min += fakerPrecision;
  }
  if (value.exclusiveMaximum && value.maximum && max === value.maximum) {
    max -= fakerPrecision;
  }

  if (min > max) {
    return null;
  }
  return faker.random.number({min: min, max: max, precision: fakerPrecision});
};
