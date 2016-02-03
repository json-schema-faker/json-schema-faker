module.exports = require('./lib/jsf')
  .extend('chance', function() {
    return require('chance').Chance();
  })
  .extend('faker', function() {
    return require('faker');
  });
