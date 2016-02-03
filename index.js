module.exports = require('./lib/jsf')
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
