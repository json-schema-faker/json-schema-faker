import Mock from 'mockjs';

export function getMock() {
  return {
    mock(xx) {
      return Mock.mock(xx);
    },
  };
}

export function register(ctx) {
  ctx.mock = getMock();
  return ctx;
}
