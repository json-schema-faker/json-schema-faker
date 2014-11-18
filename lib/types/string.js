'use strict';

var faker = require('faker');

var random = require('../util/random');

module.exports = function() {
  return faker.lorem.words(random(1, 5)).join(' ');
};
