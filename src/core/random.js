/// <reference path="../index.d.ts" />

import optionAPI from '../api/option';
import env from '../core/constants';

import RandExp from 'randexp';

function _randexp(value) {
  // set maximum default, see #193
  RandExp.prototype.max = optionAPI('defaultRandExpMax');

  // same implementation as the original except using our random
  RandExp.prototype.randInt = (a, b) =>
    a + Math.floor(optionAPI('random')() * (1 + b - a));

  var re = new RandExp(value);

  return re.gen();
}

/**
 * Returns random element of a collection
 *
 * @param collection
 * @returns {T}
 */
function pick(collection) {
  return collection[Math.floor(optionAPI('random')() * collection.length)];
}

/**
 * Returns shuffled collection of elements
 *
 * @param collection
 * @returns {T[]}
 */
function shuffle(collection) {
  var tmp,
    key,
    copy = collection.slice(),
    length = collection.length;

  for (; length > 0;) {
    key = Math.floor(optionAPI('random')() * length);
    // swap
    tmp = copy[--length];
    copy[length] = copy[key];
    copy[key] = tmp;
  }

  return copy;
}


/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 * @see http://stackoverflow.com/a/1527820/769384
 */
function getRandom(min, max) {
  return optionAPI('random')() * (max - min) + min;
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
function number(min, max, defMin, defMax, hasPrecision = false) {
  defMin = typeof defMin === 'undefined' ? env.MIN_NUMBER : defMin;
  defMax = typeof defMax === 'undefined' ? env.MAX_NUMBER : defMax;

  min = typeof min === 'undefined' ? defMin : min;
  max = typeof max === 'undefined' ? defMax : max;

  if (max < min) {
    max += min;
  }

  var result = getRandom(min, max);

  if (!hasPrecision) {
    return Math.round(result);
  }

  return result;
}

function by(type) {
  switch (type) {
    case 'seconds':
      return number(0, 60) * 60;

    case 'minutes':
      return number(15, 50) * 612;

    case 'hours':
      return number(12, 72) * 36123;

    case 'days':
      return number(7, 30) * 86412345;

    case 'weeks':
      return number(4, 52) * 604812345;

    case 'months':
      return number(2, 13) * 2592012345;

    case 'years':
      return number(1, 20) * 31104012345;
  }
}

function date(step) {
  if (step) {
    return by(step);
  }

  var now = new Date();
  var days = number(-1000, env.MOST_NEAR_DATETIME);

  now.setTime(now.getTime() - days);

  return now;
}

export default {
  pick: pick,
  date: date,
  randexp: _randexp,
  shuffle: shuffle,
  number: number,
};
