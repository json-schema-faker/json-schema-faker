import words from '../generators/words';
import random from '../core/random';

/**
 * Helper function used by thunkGenerator to produce some words for the final result.
 *
 * @returns {string}
 */
function produce(): string {
  var length: number = random.number(1, 5);
  return words(length).join(' ');
}

/**
 * Generates randomized concatenated string based on words generator.
 *
 * @returns {string}
 */
function thunkGenerator(min: number = 0, max: number = 140): string {
  var min: number = Math.max(0, min),
    max: number = random.number(min, max),
    result: string = produce();

  // append until length is reached
  while (result.length < min) {
    result += produce();
  }

  // cut if needed
  if (result.length > max) {
    result = result.substr(0, max);
  }

  return result;
}

export default thunkGenerator;
