module.exports = {
  extend() {
    let Mock = require('mockjs');

    return {
      mock(xx) {
        return Mock.mock(xx);
      },
    };
  },
  register(jsf) {
    return jsf.extend('mock', this.extend);
  },
};
