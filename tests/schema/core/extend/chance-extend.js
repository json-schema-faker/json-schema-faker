module.exports = {
  extend() {
    const Chance = require('chance');
    const chance = new Chance();

    chance.mixin({
      user() {
        return {
          first: chance.first(),
          last: chance.last(),
          email: chance.email(),
        };
      },
    });

    return chance;
  },
  register(jsf) {
    return jsf.extend('chance', this.extend);
  },
};
