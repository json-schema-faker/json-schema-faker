"use strict";
var words = require('../generators/words');
var random = require('../core/random');
/**
 * Helper function used by thunkGenerator to produce some words for the final result.
 *
 * @returns {string}
 */
function produce() {
    var length = random.number(1, 5);
    return words(length).join(' ');
}
/**
 * Generates randomized concatenated string based on words generator.
 *
 * @returns {string}
 */
function thunkGenerator(min, max) {
    if (min === void 0) { min = 0; }
    if (max === void 0) { max = 140; }
    var min = Math.max(0, min), max = random.number(min, max), result = produce();
    // append until length is reached
    while (result.length < min) {
        result += produce();
    }
    // cut if needed
    if (result.length > max) {
        result = result.substr(0, max);
    }
    return result;
}
module.exports = thunkGenerator;
