/* global require, module */

module.exports = function(value) {
  "use strict";

  return Math.floor(require("./number")(value));
};
