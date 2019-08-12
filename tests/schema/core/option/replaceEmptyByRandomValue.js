module.exports = {
  register(jsf) {
    return jsf.option({
      replaceEmptyByRandomValue: true,
    });
  },
};
