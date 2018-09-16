module.exports = {
  register(jsf) {
    return jsf.option({
      useDefaultValue: true,
      fixedProbabilities: true,
      optionalsProbability: 1.0,
    });
  },
};
