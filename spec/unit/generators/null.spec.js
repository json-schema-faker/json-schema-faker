var nullGenerator = require('../../../lib/generators/null');

describe("Null Generator", function() {
  it("should always return `null` value", function() {
    expect(nullGenerator()).toEqual(null);
  });
});
