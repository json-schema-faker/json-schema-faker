"use strict";
var random = require('../core/random');
var MIN_INTEGER = -100000000, MAX_INTEGER = 100000000, FLOAT_DIFFERENCE = 0.1;
function numberType(value) {
    var min = typeof value.minimum === 'undefined' ? MIN_INTEGER : value.minimum, max = typeof value.maximum === 'undefined' ? MAX_INTEGER : value.maximum, multipleOf = value.multipleOf;
    if (multipleOf) {
        max = Math.floor(max / multipleOf) * multipleOf;
        min = Math.ceil(min / multipleOf) * multipleOf;
    }
    // if both numbers are integers the difference should be an integer too,
    // otherwise having values like { min: 1, max: 1.5 } will produce invalid values (NaN)
    var fixedUnit = ((min % 1) === 0 && (max % 1) === 0) ? 1 : FLOAT_DIFFERENCE;
    if (value.exclusiveMinimum && value.minimum && min === value.minimum) {
        min += multipleOf || fixedUnit;
    }
    if (value.exclusiveMaximum && value.maximum && max === value.maximum) {
        max -= multipleOf || fixedUnit;
    }
    if (min > max) {
        return NaN;
    }
    if (multipleOf) {
        return Math.floor(random.number(min, max) / multipleOf) * multipleOf;
    }
    return random.number(min, max, undefined, undefined, true);
}
module.exports = numberType;
