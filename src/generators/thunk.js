import words from '../generators/words';
import random from '../core/random';

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
function thunkGenerator(min = 0, max = 140) {
  var _min = Math.max(0, min),
    _max = random.number(_min, max),
    result = produce();

  // append until length is reached
  while (result.length < _min) {
    result += produce();
  }

  // cut if needed
  if (result.length > _max) {
    result = result.substr(0, _max);
  }

  return result;
}

export default thunkGenerator;
