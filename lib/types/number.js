/* global require, module */

module.exports = function(options) {
  "use strict";

  var $ = require("../util");

  return $.random(options.min, options.max);
};
