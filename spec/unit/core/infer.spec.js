var infer = require('../../../lib/core/infer');

describe("Infer", function () {

  it("should infer `array` type when `additionalItems` property exists on top-level schema", function () {
    var schema = {
      "additionalItems": true
    };

    expect(infer(schema, "")).toEqual("array");
  });
});
