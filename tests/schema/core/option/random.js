const seedrandom = require('seedrandom');

module.exports = {
  register(jsf) {
    return jsf.option('random', seedrandom('some seed'));
  },
};
