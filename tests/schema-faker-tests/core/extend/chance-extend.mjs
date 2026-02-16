import Chance from 'chance';

export function getChance() {
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

export function register(ctx) {
  ctx.chance = getChance();
  return ctx;
}
