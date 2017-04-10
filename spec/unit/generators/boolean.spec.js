var booleanGenerator = require('../../../ts/generators/boolean').default;

describe("Boolean Generator", function() {
  it("should always return a boolean type", function() {
    expect(booleanGenerator()).toEqual(jasmine.any(Boolean));
  });
});
