var utils = require('../../../ts/core/utils').default;

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

  describe("typecast function", function() {
    var typecast = utils.typecast;

    it("should cast boolean to string", function() {
      expect(typecast(true, "string")).toEqual("true");
      expect(typecast(false, "string")).toEqual("false");
    });

    it("should cast number to string", function() {
      expect(typecast(8935768925789, "string")).toEqual("8935768925789");
      expect(typecast(234.76, "string")).toEqual("234.76");
    });

    it("should cast number to boolean", function() {
      expect(typecast(123, "boolean")).toBe(true);
      expect(typecast(0, "boolean")).toBe(false);
    });

    it("should cast string to number", function() {
      expect(typecast("8482", "number")).toEqual(8482);
      expect(typecast("827502.73", "number")).toEqual(827502.73);
      expect(typecast("-8.482", "number")).toEqual(-8.482);
    });

    it("should cast string to integer", function() {
      expect(typecast("8482", "integer")).toEqual(8482);
      expect(typecast("827502.73", "integer")).toEqual(827502);
      expect(typecast("-8.482", "integer")).toEqual(-8);
    });

    it("should cast string to boolean", function() {
      expect(typecast("", "boolean")).toBe(false);
      expect(typecast("1", "boolean")).toBe(true);
      expect(typecast(" ", "boolean")).toBe(true);
    });

  });
});
