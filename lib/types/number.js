"use strict";
var random = require('../core/random');
var MIN_INTEGER = -100000000, MAX_INTEGER = 100000000;
var numberType = function numberType(value) {
    var min = typeof value.minimum === 'undefined' ? MIN_INTEGER : value.minimum, max = typeof value.maximum === 'undefined' ? MAX_INTEGER : value.maximum, multipleOf = value.multipleOf;
    if (multipleOf) {
        max = Math.floor(max / multipleOf) * multipleOf;
        min = Math.ceil(min / multipleOf) * multipleOf;
    }
    if (value.exclusiveMinimum && value.minimum && min === value.minimum) {
        min += multipleOf || 1;
    }
    if (value.exclusiveMaximum && value.maximum && max === value.maximum) {
        max -= multipleOf || 1;
    }
    if (min > max) {
        return NaN;
    }
    if (multipleOf) {
        return Math.floor(random.number(min, max) / multipleOf) * multipleOf;
    }
    return random.number(min, max, undefined, undefined, true);
};
module.exports = numberType;
