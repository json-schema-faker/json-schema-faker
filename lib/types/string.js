'use strict';

var faker = require('faker'),
    Randexp = require('randexp');

var random = require('../util/random');

module.exports = function(value) {
  if (value.pattern) {
    return Randexp.randexp(value.pattern);
  }

  if (value.minLength || value.maxLength) {
    var min = Math.max(0, value.minLength || 0),
        max = random(min, value.maxLength);

    return Randexp.randexp('.{' + min + ',' + max + '}');
  }

  return faker.lorem.words(random(1, 5)).join(' ');
};
