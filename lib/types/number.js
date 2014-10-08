/* global require, module */

module.exports = function(value) {
  "use strict";

  var $ = require("../util");

  return $.random(value.min, value.max);
};
