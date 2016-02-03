var LIPSUM_TEXT = 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum'.split(' ');

var random = require('../lib/util/random');

// minimal in-line faker stub
module.exports = {
  random: {
    number: function(opts) {
      return random(min, max);
    }
  },
  lorem: {
    words: function(max) {
      return random.shuffle(LIPSUM_TEXT).slice(0, max);
    }
  }
};
