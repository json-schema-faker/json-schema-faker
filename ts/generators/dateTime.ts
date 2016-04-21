import random = require('../core/random');

/**
 * Generates randomized date time ISO format string.
 *
 * @returns {string}
 */
function dateTimeGenerator(): string {
  return new Date(random.number(0, 100000000000000)).toISOString();
}

export = dateTimeGenerator;
