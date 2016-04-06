import words = require('../generators/words');
import random = require('../core/random');

function produce(): string {
  return words().join(' ');
}

/**
 * Generates randomized concatenated string based on words generator.
 *
 * @returns {string}
 */
function thunkGenerator(min: number = 0, max: number = 140): string {
  var min = Math.max(0, min),
    max = random.number(min, max),
    sample = produce();

  while (sample.length < min) {
    sample += produce();
  }

  if (sample.length > max) {
    sample = sample.substr(0, max);
  }

  return sample;
}

export = thunkGenerator;
