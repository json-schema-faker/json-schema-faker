/* global require, module */

module.exports = function(options) {
  "use strict";

  if (!options.properties) {
    throw new Error("Missing properties for object '" + JSON.stringify(options) + "'");
  }

  var $ = require("../util");

  return $.traverse(options.properties);
};
