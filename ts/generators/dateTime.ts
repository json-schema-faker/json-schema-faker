import random from '../core/random';
import env from '../core/constants';

/**
 * Generates randomized date time ISO format string.
 *
 * @returns {string}
 */
function dateTimeGenerator(): string {
  var date = new Date();
  var days = random.number(-1000, env.MOST_NEAR_DATETIME);

  date.setTime(date.getTime() - days);

  return date.toISOString();
}

export default dateTimeGenerator;
