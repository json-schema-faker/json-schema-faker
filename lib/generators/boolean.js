"use strict";
var option = require('../api/option');
/**
 * Generates randomized boolean value.
 *
 * @returns {boolean}
 */
function booleanGenerator() {
    return option('random')() > 0.5;
}
module.exports = booleanGenerator;
