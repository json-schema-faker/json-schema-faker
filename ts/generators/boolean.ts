var option = require('../api/option');

/**
 * Generates randomized boolean value.
 *
 * @returns {boolean}
 */
function booleanGenerator(): boolean {
  return option('random')() > 0.5;
}

export = booleanGenerator;
