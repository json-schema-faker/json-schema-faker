module.exports = {
  register(jsf) {
    return jsf.option({
      useDefaultValue: true,
      optionalsProbability: 0.0,
    });
  },
};
