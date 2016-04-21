var utils = require('../../../lib/core/utils');

describe("Utils", function () {

  describe("hasProperties function", function () {
    var bigObject = {
      "some": "keys",
      "existing": "on",
      "the": "object"
    };

    var smallObject = {
      "some": "keys"
    };

    it("should return true when one key being checked", function () {
      expect(utils.hasProperties(bigObject, "some")).toBe(true);
      expect(utils.hasProperties(bigObject, "existing")).toBe(true);
      expect(utils.hasProperties(bigObject, "the")).toBe(true);
      expect(utils.hasProperties(smallObject, "some")).toBe(true);
    });

    it("should return true when all keys being checked", function () {
      expect(utils.hasProperties(bigObject, "some", "existing", "the")).toBe(true);
      expect(utils.hasProperties(smallObject, "some", "existing", "the")).toBe(true);
    });

    it("should return false when no keys exist on object", function () {
      expect(utils.hasProperties(bigObject, "different")).toBe(false);
      expect(utils.hasProperties(smallObject, "different")).toBe(false);
    });
  });

  describe("getSubAttribute function", function () {
    var object = {
      "outer": {
        "inner": {
          "key": "value"
        }
      }
    };

    it("should return a leaf if chain is long enough", function () {
      expect(utils.getSubAttribute(object, "outer.inner.key")).toEqual("value");
      expect(utils.getSubAttribute(object, "outer.inner.key.help.me")).toEqual("value");
    });

    it("should return a subobject if the chain doesn't reach a leaf (is shorter)", function () {
      expect(utils.getSubAttribute(object, "outer.inner")).toEqual({"key": "value"});
    });

    it("should return a subobject of the valid chain part (and ignore the invalid chain part)", function () {
      expect(utils.getSubAttribute(object, "outer.help.me")).toEqual({"inner": {"key": "value"}});
      expect(utils.getSubAttribute(object, "help.me")).toEqual(object);
    });
  });

});
