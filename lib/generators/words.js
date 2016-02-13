var random = require('./../util/random');

var LIPSUM_WORDS = ('Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore'
  + ' et dolore magna aliqua Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea'
  + ' commodo consequat Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla'
  + ' pariatur Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est'
  + ' laborum').split(' ');

/**
 * Generates randomized array of single lorem ipsum words.
 *
 * @param min
 * @param max
 * @returns {Array.<string>}
 */
module.exports = function(min, max) {
  var words = random.shuffle(LIPSUM_WORDS),
      length = random(min || 1, Math.min(LIPSUM_WORDS.length, max || min || 5));

  return words.slice(0, length);
};
