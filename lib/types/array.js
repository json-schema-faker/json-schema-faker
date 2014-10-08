/* global require, module */

module.exports = function(options) {
  "use strict";

  if (!options.items) {
    throw new Error("Missing items for array '" + JSON.stringify(options) + "'");
  }

  var $ = require("../util");

  var items = [],
      length = $.random(1, 5);

  for (var i  = 0; i <= length; i += 1) {
    items.push($.traverse(options.items));
  }

  return items;
};
