import random from '../core/random';

/**
 * Generates randomized date time ISO format string.
 *
 * @returns {string}
 */
function dateTimeGenerator() {
  return random.date().toISOString();
}

export default dateTimeGenerator;
