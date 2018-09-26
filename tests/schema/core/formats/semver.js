module.exports = {
  register(jsf) {
    return jsf.format({
      semver() {
        return jsf.random.randexp('\\d\\.\\d\\.[1-9]\\d?');
      },
    });
  },
};
