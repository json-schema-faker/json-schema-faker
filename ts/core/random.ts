/// <reference path="../index.d.ts" />

import option from '../api/option';

/**
 * Returns random element of a collection
 *
 * @param collection
 * @returns {T}
 */
function pick<T>(collection: T[]): T {
  return collection[Math.floor(option('random')() * collection.length)];
}

/**
 * Returns shuffled collection of elements
 *
 * @param collection
 * @returns {T[]}
 */
function shuffle<T>(collection: T[]): T[] {
  var tmp: T,
    key: number,
    copy: T[] = collection.slice(),
    length: number = collection.length;

  for (; length > 0;) {
    key = Math.floor(option('random')() * length);
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
var MIN_NUMBER = -100,
    MAX_NUMBER = 100;


/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 * @see http://stackoverflow.com/a/1527820/769384
 */
function getRandomInt(min: number, max: number): number {
  return Math.floor(option('random')() * (max - min + 1)) + min;
}

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
function number(min?: number, max?: number, defMin?: number, defMax?: number, hasPrecision: boolean = false): number {
  defMin = typeof defMin === 'undefined' ? MIN_NUMBER : defMin;
  defMax = typeof defMax === 'undefined' ? MAX_NUMBER : defMax;

  min = typeof min === 'undefined' ? defMin : min;
  max = typeof max === 'undefined' ? defMax : max;

  if (max < min) {
    max += min;
  }

  var result: number = getRandomInt(min, max);

  if (!hasPrecision) {
    return parseInt(result + '', 10);
  }

  return result;
}

export default {
  pick: pick,
  shuffle: shuffle,
  number: number,
};
