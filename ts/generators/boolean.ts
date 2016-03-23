/**
 * Generates randomized boolean value.
 *
 * @returns {boolean}
 */
function booleanGenerator(): boolean {
  return Math.random() > 0.5;
}

export = booleanGenerator;
