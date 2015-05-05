'use strict';

var number = require('./number');

module.exports = function(value) {
  value.hasPrecision = false;

  return Math.floor(number(value));
};
