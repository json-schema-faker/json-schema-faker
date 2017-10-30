import random from '../core/random';

/**
 * Generates randomized date time ISO format string.
 *
 * @returns {string}
 */
function dateTimeGenerator(): string {
  return random.date().toISOString();
}

export default dateTimeGenerator;
