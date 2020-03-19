module.exports = {
  extend() {
    var Mock = require('mockjs');

    return {
      mock: function (xx) {
        return Mock.mock(xx);
      }
    };
  },
  register(jsf) {
    return jsf.extend('mock', this.extend);
  },
};
