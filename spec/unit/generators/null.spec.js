var nullGenerator = require('../../../ts/generators/null').default;

describe("Null Generator", function() {
  it("should always return `null` value", function() {
    expect(nullGenerator()).toEqual(null);
  });
});
