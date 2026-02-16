import { faker } from '@faker-js/faker/locale/de';

export function getFaker() {
  faker.mixin = (namespace, fnObject) => {
    faker[namespace] = fnObject;
  };

  faker.mixin('custom', {
    statement(length) {
      return `${faker.name.firstName()} has ${faker.finance.amount()} on ${faker.finance.account(length)}.`;
    },
    returnThisValue(val) {
      return val;
    },
  });

  return faker;
}

export function register(ctx) {
  ctx.faker = getFaker();
  return ctx;
}
