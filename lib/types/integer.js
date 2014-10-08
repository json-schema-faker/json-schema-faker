'use strict';

module.exports = function(value) {
  var $ = require('../util');

  return Math.floor($.primitives.number(value));
};
