"use strict";
var words = require('../generators/words');
var random = require('../core/random');
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
    var min = Math.max(0, min), max = random.number(min, max), sample = produce();
    while (sample.length < min) {
        sample += produce();
    }
    if (sample.length > max) {
        sample = sample.substr(0, max);
    }
    return sample;
}
module.exports = thunkGenerator;
