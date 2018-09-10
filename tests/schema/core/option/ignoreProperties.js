module.exports = {
  register(jsf) {
    return jsf.option({
      fillProperties: false,
      ignoreProperties: ['foo', /^b/, x => x.default === 42],
    });
  },
};
