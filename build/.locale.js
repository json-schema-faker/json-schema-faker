module.exports = require('../lib')
  .extend('faker', function() {
    try {
      return require('faker/locale/<%= lang %>');
    } catch (e) {
      return null;
    }
  });
