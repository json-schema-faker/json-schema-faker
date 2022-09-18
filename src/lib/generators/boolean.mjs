import optionAPI from '../api/option.mjs';

/**
 * Generates randomized boolean value.
 *
 * @returns {boolean}
 */
function booleanGenerator() {
  return optionAPI('random')() > 0.5;
}

export default booleanGenerator;
