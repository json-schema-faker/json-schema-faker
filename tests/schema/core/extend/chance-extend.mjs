import Chance from 'chance';

export function extend() {
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
}

export function register(jsf) {
  return jsf.extend('chance', this.extend);
}
