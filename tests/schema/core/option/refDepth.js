const seedrandom = require('seedrandom');

module.exports = {
  register(jsf) {
    return jsf.option({
      minItems: 1,
      maxItems: 1,
      alwaysFakeOptionals: true,
      random: seedrandom('some seed'),
    });
  },
};
