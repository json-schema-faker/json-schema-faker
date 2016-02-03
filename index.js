module.exports = require('./lib/jsf')
  .extend('faker', function() {
    return require('faker');
  });
