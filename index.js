module.exports = require('./lib')
  .extend('casual', function() {
    try {
      return require('casual-cjs');
    } catch (e) {
      return null;
    }
  })
  .extend('chance', function() {
    try {
      return require('chance').Chance();
    } catch (e) {
      return null;
    }
  })
  .extend('faker', function() {
    try {
      return require('faker');
    } catch (e) {
      return null;
    }
  });
