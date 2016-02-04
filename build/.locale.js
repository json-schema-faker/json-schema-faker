module.exports = require('../lib/jsf')
  .extend('faker', function() {
    try {
      return require('faker/locale/<%= lang %>');
    } catch (e) {
      return null;
    }
  });
