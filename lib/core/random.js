/// <reference path="../index.d.ts" />
"use strict";
/**
 * Returns random element of a collection
 *
 * @param collection
 * @returns {T}
 */
function pick(collection) {
    return collection[Math.floor(Math.random() * collection.length)];
}
/**
 * Returns shuffled collection of elements
 *
 * @param collection
 * @returns {T[]}
 */
function shuffle(collection) {
    var tmp, key, copy = collection.slice(), length = collection.length;
    for (; length > 0;) {
        key = Math.floor(Math.random() * length);
        // swap
        tmp = copy[--length];
        copy[length] = copy[key];
        copy[key] = tmp;
    }
    return copy;
}
/**
 * These values determine default range for random.number function
 *
 * @type {number}
 */
var MIN_NUMBER = -100, MAX_NUMBER = 100;
/**
 * Generates random number according to parameters passed
 *
 * @param min
 * @param max
 * @param defMin
 * @param defMax
 * @param hasPrecision
 * @returns {number}
 */
function number(min, max, defMin, defMax, hasPrecision) {
    if (hasPrecision === void 0) { hasPrecision = false; }
    defMin = typeof defMin === 'undefined' ? MIN_NUMBER : defMin;
    defMax = typeof defMax === 'undefined' ? MAX_NUMBER : defMax;
    min = typeof min === 'undefined' ? defMin : min;
    max = typeof max === 'undefined' ? defMax : max;
    if (max < min) {
        max += min;
    }
    var result = Math.random() * (max - min) + min;
    if (!hasPrecision) {
        return parseInt(result + '', 10);
    }
    return result;
}
module.exports = {
    pick: pick,
    shuffle: shuffle,
    number: number
};
