/* global require, module */

module.exports = function(value) {
  "use strict";

  if (!value.items) {
    throw new Error("Missing items for array '" + JSON.stringify(value) + "'");
  }

  var $ = require("../util");

  var items = [],
      length = $.random(1, 5);

  for (var i  = 0; i <= length; i += 1) {
    items.push($.traverse(value.items));
  }

  return items;
};
