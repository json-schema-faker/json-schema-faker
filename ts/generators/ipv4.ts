import random = require('../core/random');

/**
 * Generates randomized ipv4 address.
 *
 * @returns {string}
 */
function ipv4Generator(): string {
  return [0, 0, 0, 0].map(function(): number {
    return random.number(0, 255);
  }).join('.');
}

export = ipv4Generator;
