"use strict";
/**
 * Generates randomized boolean value.
 *
 * @returns {boolean}
 */
function booleanGenerator() {
    return Math.random() > 0.5;
}
module.exports = booleanGenerator;
