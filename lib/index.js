/* global require, module */

module.exports = function(schema) {
  "use strict";

  var $ = require("./util");

  return $.traverse(schema);
};
