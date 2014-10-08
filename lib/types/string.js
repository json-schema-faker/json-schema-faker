/* global require, module */

module.exports = function() {
  "use strict";

  var $ = require("../util");

  return $.faker.lorem.words($.random(1, 5)).join(" ");
};
