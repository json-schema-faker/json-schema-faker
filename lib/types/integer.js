/* global require, module */

module.exports = function(options) {
  "use strict";

  return Math.floor(require("./number")(options));
};
