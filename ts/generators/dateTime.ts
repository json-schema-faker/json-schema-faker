import random from '../core/random';

const MOST_NEAR_DATETIME = 2524608000000;

/**
 * Generates randomized date time ISO format string.
 *
 * @returns {string}
 */
function dateTimeGenerator(): string {
  var date = new Date();
  var days = random.number(-1000, MOST_NEAR_DATETIME);

  date.setTime(date.getTime() - days);

  return date.toISOString();
}

export default dateTimeGenerator;
