var numberType = require('../../../ts/types/number').default;

describe("Number Generator", function() {
  it("should return number with a fractional part", function() {
    var n = numberType({});
    expect(n).not.toEqual(Math.floor(n));
  });
});
