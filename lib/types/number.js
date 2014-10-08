'use strict';

module.exports = function(value) {
  var $ = require('../util');

  return $.random(value.min, value.max);
};
