import optionAPI from '../api/option';

/**
 * Generates randomized boolean value.
 *
 * @returns {boolean}
 */
function booleanGenerator(): boolean {
  return optionAPI('random')() > 0.5;
}

export default booleanGenerator;
