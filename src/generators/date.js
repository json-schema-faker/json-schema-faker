import dateTimeGenerator from './dateTime';

/**
 * Generates randomized date format string.
 *
 * @returns {string}
 */
function dateGenerator() {
  return dateTimeGenerator().slice(0, 10);
}

export default dateGenerator;
