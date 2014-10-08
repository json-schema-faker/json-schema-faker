'use strict';

module.exports = function() {
  var $ = require('../util');

  return $.faker.lorem.words($.random(1, 5)).join(' ');
};
