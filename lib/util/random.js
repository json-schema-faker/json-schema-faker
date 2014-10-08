/* global module */

const MAX_NUMBER = 100;
const MIN_NUMBER = -100;

module.exports = function(min, max) {
  "use strict";

  min = typeof min === "undefined" ? MIN_NUMBER : min;
  max = typeof max === "undefined" ? MAX_NUMBER : max;

  return Math.floor(Math.random() * (max - min + 1)) + min;
};
