import words from './words';
import random from '../core/random';

/**
 * Helper function used by thunkGenerator to produce some words for the final result.
 *
 * @returns {string}
 */
function produce() {
  const length = random.number(1, 5);

  return words(length).join(' ');
}

/**
 * Generates randomized concatenated string based on words generator.
 *
 * @returns {string}
 */
function thunkGenerator(min = 0, max = 140) {
  const _min = Math.max(0, min);
  const _max = random.number(_min, max);

  let result = produce();

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
