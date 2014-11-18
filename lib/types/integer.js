'use strict';

var number = require('./number');

module.exports = function(value) {
  return Math.floor(number(value));
};
