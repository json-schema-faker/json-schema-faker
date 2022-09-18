import dateTimeGenerator from './dateTime.mjs';

/**
 * Generates randomized time format string.
 *
 * @returns {string}
 */
function timeGenerator() {
  return dateTimeGenerator().slice(11);
}

export default timeGenerator;
