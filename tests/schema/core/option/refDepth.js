module.exports = {
  register(jsf) {
    return jsf.option({
      refDepthMin: 6,
      refDepthMax: 6,
      minItems: 1,
      maxItems: 1,
      alwaysFakeOptionals: true,
    });
  },
};
