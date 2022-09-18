import Mock from 'mockjs';

export function extend() {
  return {
    mock(xx) {
      return Mock.mock(xx);
    },
  };
}

export function register(jsf) {
  return jsf.extend('mock', this.extend);
}
