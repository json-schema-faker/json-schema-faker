var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/lib/vendor.mjs
var DEPENDENCIES, getDependencies, setDependencies;
var init_vendor = __esm({
  "src/lib/vendor.mjs"() {
    DEPENDENCIES = {};
    getDependencies = () => {
      return DEPENDENCIES;
    };
    setDependencies = (value) => {
      Object.assign(DEPENDENCIES, value);
    };
  }
});

// src/lib/class/Registry.mjs
var Registry, Registry_default;
var init_Registry = __esm({
  "src/lib/class/Registry.mjs"() {
    Registry = class {
      constructor() {
        this.data = {};
      }
      /**
       * Unregisters custom format(s)
       * @param name
       */
      unregister(name) {
        if (!name) {
          this.data = {};
        } else {
          delete this.data[name];
        }
      }
      /**
       * Registers custom format
       */
      register(name, callback) {
        this.data[name] = callback;
      }
      /**
       * Register many formats at one shot
       */
      registerMany(formats) {
        Object.keys(formats).forEach((name) => {
          this.data[name] = formats[name];
        });
      }
      /**
       * Returns element by registry key
       */
      get(name) {
        const format = this.data[name];
        return format;
      }
      /**
       * Returns the whole registry content
       */
      list() {
        return this.data;
      }
    };
    Registry_default = Registry;
  }
});

// src/lib/api/defaults.mjs
var defaults, defaults_default;
var init_defaults = __esm({
  "src/lib/api/defaults.mjs"() {
    defaults = {};
    defaults_default = defaults;
    defaults.defaultInvalidTypeProduct = void 0;
    defaults.defaultRandExpMax = 10;
    defaults.pruneProperties = [];
    defaults.ignoreProperties = [];
    defaults.ignoreMissingRefs = false;
    defaults.failOnInvalidTypes = true;
    defaults.failOnInvalidFormat = true;
    defaults.alwaysFakeOptionals = false;
    defaults.optionalsProbability = null;
    defaults.fixedProbabilities = false;
    defaults.useExamplesValue = false;
    defaults.useDefaultValue = false;
    defaults.requiredOnly = false;
    defaults.omitNulls = false;
    defaults.minItems = 0;
    defaults.maxItems = null;
    defaults.minLength = 0;
    defaults.maxLength = null;
    defaults.resolveJsonPath = false;
    defaults.reuseProperties = false;
    defaults.fillProperties = true;
    defaults.sortProperties = false;
    defaults.replaceEmptyByRandomValue = false;
    defaults.random = Math.random;
    defaults.minDateTime = /* @__PURE__ */ new Date("1889-12-31T00:00:00.000Z");
    defaults.maxDateTime = /* @__PURE__ */ new Date("1970-01-01T00:00:01.000Z");
    defaults.renderTitle = true;
    defaults.renderDescription = true;
    defaults.renderComment = false;
  }
});

// src/lib/class/OptionRegistry.mjs
var OptionRegistry, OptionRegistry_default;
var init_OptionRegistry = __esm({
  "src/lib/class/OptionRegistry.mjs"() {
    init_Registry();
    init_defaults();
    OptionRegistry = class extends Registry_default {
      constructor() {
        super();
        this.data = { ...defaults_default };
        this._defaults = defaults_default;
      }
      get defaults() {
        return { ...this._defaults };
      }
    };
    OptionRegistry_default = OptionRegistry;
  }
});

// src/lib/api/option.mjs
function optionAPI(nameOrOptionMap, optionalValue) {
  if (typeof nameOrOptionMap === "string") {
    if (typeof optionalValue !== "undefined") {
      return registry.register(nameOrOptionMap, optionalValue);
    }
    return registry.get(nameOrOptionMap);
  }
  return registry.registerMany(nameOrOptionMap);
}
var registry, option_default;
var init_option = __esm({
  "src/lib/api/option.mjs"() {
    init_OptionRegistry();
    registry = new OptionRegistry_default();
    optionAPI.getDefaults = () => registry.defaults;
    option_default = optionAPI;
  }
});

// src/lib/core/constants.mjs
var ALLOWED_TYPES, SCALAR_TYPES, ALL_TYPES, MOST_NEAR_DATETIME, MIN_INTEGER, MAX_INTEGER, MIN_NUMBER, MAX_NUMBER, constants_default;
var init_constants = __esm({
  "src/lib/core/constants.mjs"() {
    ALLOWED_TYPES = ["integer", "number", "string", "boolean"];
    SCALAR_TYPES = ALLOWED_TYPES.concat(["null"]);
    ALL_TYPES = ["array", "object"].concat(SCALAR_TYPES);
    MOST_NEAR_DATETIME = 2524608e6;
    MIN_INTEGER = -1e8;
    MAX_INTEGER = 1e8;
    MIN_NUMBER = -100;
    MAX_NUMBER = 100;
    constants_default = {
      ALLOWED_TYPES,
      SCALAR_TYPES,
      ALL_TYPES,
      MIN_NUMBER,
      MAX_NUMBER,
      MIN_INTEGER,
      MAX_INTEGER,
      MOST_NEAR_DATETIME
    };
  }
});

// node_modules/ret/lib/types.js
var require_types = __commonJS({
  "node_modules/ret/lib/types.js"(exports2, module2) {
    module2.exports = {
      ROOT: 0,
      GROUP: 1,
      POSITION: 2,
      SET: 3,
      RANGE: 4,
      REPETITION: 5,
      REFERENCE: 6,
      CHAR: 7
    };
  }
});

// node_modules/ret/lib/sets.js
var require_sets = __commonJS({
  "node_modules/ret/lib/sets.js"(exports2) {
    var types2 = require_types();
    var INTS = () => [{ type: types2.RANGE, from: 48, to: 57 }];
    var WORDS = () => {
      return [
        { type: types2.CHAR, value: 95 },
        { type: types2.RANGE, from: 97, to: 122 },
        { type: types2.RANGE, from: 65, to: 90 }
      ].concat(INTS());
    };
    var WHITESPACE = () => {
      return [
        { type: types2.CHAR, value: 9 },
        { type: types2.CHAR, value: 10 },
        { type: types2.CHAR, value: 11 },
        { type: types2.CHAR, value: 12 },
        { type: types2.CHAR, value: 13 },
        { type: types2.CHAR, value: 32 },
        { type: types2.CHAR, value: 160 },
        { type: types2.CHAR, value: 5760 },
        { type: types2.RANGE, from: 8192, to: 8202 },
        { type: types2.CHAR, value: 8232 },
        { type: types2.CHAR, value: 8233 },
        { type: types2.CHAR, value: 8239 },
        { type: types2.CHAR, value: 8287 },
        { type: types2.CHAR, value: 12288 },
        { type: types2.CHAR, value: 65279 }
      ];
    };
    var NOTANYCHAR = () => {
      return [
        { type: types2.CHAR, value: 10 },
        { type: types2.CHAR, value: 13 },
        { type: types2.CHAR, value: 8232 },
        { type: types2.CHAR, value: 8233 }
      ];
    };
    exports2.words = () => ({ type: types2.SET, set: WORDS(), not: false });
    exports2.notWords = () => ({ type: types2.SET, set: WORDS(), not: true });
    exports2.ints = () => ({ type: types2.SET, set: INTS(), not: false });
    exports2.notInts = () => ({ type: types2.SET, set: INTS(), not: true });
    exports2.whitespace = () => ({ type: types2.SET, set: WHITESPACE(), not: false });
    exports2.notWhitespace = () => ({ type: types2.SET, set: WHITESPACE(), not: true });
    exports2.anyChar = () => ({ type: types2.SET, set: NOTANYCHAR(), not: true });
  }
});

// node_modules/ret/lib/util.js
var require_util = __commonJS({
  "node_modules/ret/lib/util.js"(exports2) {
    var types2 = require_types();
    var sets = require_sets();
    var CTRL = "@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^ ?";
    var SLSH = { "0": 0, "t": 9, "n": 10, "v": 11, "f": 12, "r": 13 };
    exports2.strToChars = function(str) {
      var chars_regex = /(\[\\b\])|(\\)?\\(?:u([A-F0-9]{4})|x([A-F0-9]{2})|(0?[0-7]{2})|c([@A-Z[\\\]^?])|([0tnvfr]))/g;
      str = str.replace(chars_regex, function(s, b, lbs, a16, b16, c8, dctrl, eslsh) {
        if (lbs) {
          return s;
        }
        var code = b ? 8 : a16 ? parseInt(a16, 16) : b16 ? parseInt(b16, 16) : c8 ? parseInt(c8, 8) : dctrl ? CTRL.indexOf(dctrl) : SLSH[eslsh];
        var c = String.fromCharCode(code);
        if (/[[\]{}^$.|?*+()]/.test(c)) {
          c = "\\" + c;
        }
        return c;
      });
      return str;
    };
    exports2.tokenizeClass = (str, regexpStr) => {
      var tokens = [];
      var regexp = /\\(?:(w)|(d)|(s)|(W)|(D)|(S))|((?:(?:\\)(.)|([^\]\\]))-(?:\\)?([^\]]))|(\])|(?:\\)?([^])/g;
      var rs, c;
      while ((rs = regexp.exec(str)) != null) {
        if (rs[1]) {
          tokens.push(sets.words());
        } else if (rs[2]) {
          tokens.push(sets.ints());
        } else if (rs[3]) {
          tokens.push(sets.whitespace());
        } else if (rs[4]) {
          tokens.push(sets.notWords());
        } else if (rs[5]) {
          tokens.push(sets.notInts());
        } else if (rs[6]) {
          tokens.push(sets.notWhitespace());
        } else if (rs[7]) {
          tokens.push({
            type: types2.RANGE,
            from: (rs[8] || rs[9]).charCodeAt(0),
            to: rs[10].charCodeAt(0)
          });
        } else if (c = rs[12]) {
          tokens.push({
            type: types2.CHAR,
            value: c.charCodeAt(0)
          });
        } else {
          return [tokens, regexp.lastIndex];
        }
      }
      exports2.error(regexpStr, "Unterminated character class");
    };
    exports2.error = (regexp, msg) => {
      throw new SyntaxError("Invalid regular expression: /" + regexp + "/: " + msg);
    };
  }
});

// node_modules/ret/lib/positions.js
var require_positions = __commonJS({
  "node_modules/ret/lib/positions.js"(exports2) {
    var types2 = require_types();
    exports2.wordBoundary = () => ({ type: types2.POSITION, value: "b" });
    exports2.nonWordBoundary = () => ({ type: types2.POSITION, value: "B" });
    exports2.begin = () => ({ type: types2.POSITION, value: "^" });
    exports2.end = () => ({ type: types2.POSITION, value: "$" });
  }
});

// node_modules/ret/lib/index.js
var require_lib = __commonJS({
  "node_modules/ret/lib/index.js"(exports2, module2) {
    var util = require_util();
    var types2 = require_types();
    var sets = require_sets();
    var positions = require_positions();
    module2.exports = (regexpStr) => {
      var i = 0, l, c, start = { type: types2.ROOT, stack: [] }, lastGroup = start, last = start.stack, groupStack = [];
      var repeatErr = (i2) => {
        util.error(regexpStr, `Nothing to repeat at column ${i2 - 1}`);
      };
      var str = util.strToChars(regexpStr);
      l = str.length;
      while (i < l) {
        c = str[i++];
        switch (c) {
          case "\\":
            c = str[i++];
            switch (c) {
              case "b":
                last.push(positions.wordBoundary());
                break;
              case "B":
                last.push(positions.nonWordBoundary());
                break;
              case "w":
                last.push(sets.words());
                break;
              case "W":
                last.push(sets.notWords());
                break;
              case "d":
                last.push(sets.ints());
                break;
              case "D":
                last.push(sets.notInts());
                break;
              case "s":
                last.push(sets.whitespace());
                break;
              case "S":
                last.push(sets.notWhitespace());
                break;
              default:
                if (/\d/.test(c)) {
                  last.push({ type: types2.REFERENCE, value: parseInt(c, 10) });
                } else {
                  last.push({ type: types2.CHAR, value: c.charCodeAt(0) });
                }
            }
            break;
          case "^":
            last.push(positions.begin());
            break;
          case "$":
            last.push(positions.end());
            break;
          case "[":
            var not;
            if (str[i] === "^") {
              not = true;
              i++;
            } else {
              not = false;
            }
            var classTokens = util.tokenizeClass(str.slice(i), regexpStr);
            i += classTokens[1];
            last.push({
              type: types2.SET,
              set: classTokens[0],
              not
            });
            break;
          case ".":
            last.push(sets.anyChar());
            break;
          case "(":
            var group = {
              type: types2.GROUP,
              stack: [],
              remember: true
            };
            c = str[i];
            if (c === "?") {
              c = str[i + 1];
              i += 2;
              if (c === "=") {
                group.followedBy = true;
              } else if (c === "!") {
                group.notFollowedBy = true;
              } else if (c !== ":") {
                util.error(
                  regexpStr,
                  `Invalid group, character '${c}' after '?' at column ${i - 1}`
                );
              }
              group.remember = false;
            }
            last.push(group);
            groupStack.push(lastGroup);
            lastGroup = group;
            last = group.stack;
            break;
          case ")":
            if (groupStack.length === 0) {
              util.error(regexpStr, `Unmatched ) at column ${i - 1}`);
            }
            lastGroup = groupStack.pop();
            last = lastGroup.options ? lastGroup.options[lastGroup.options.length - 1] : lastGroup.stack;
            break;
          case "|":
            if (!lastGroup.options) {
              lastGroup.options = [lastGroup.stack];
              delete lastGroup.stack;
            }
            var stack = [];
            lastGroup.options.push(stack);
            last = stack;
            break;
          case "{":
            var rs = /^(\d+)(,(\d+)?)?\}/.exec(str.slice(i)), min, max;
            if (rs !== null) {
              if (last.length === 0) {
                repeatErr(i);
              }
              min = parseInt(rs[1], 10);
              max = rs[2] ? rs[3] ? parseInt(rs[3], 10) : Infinity : min;
              i += rs[0].length;
              last.push({
                type: types2.REPETITION,
                min,
                max,
                value: last.pop()
              });
            } else {
              last.push({
                type: types2.CHAR,
                value: 123
              });
            }
            break;
          case "?":
            if (last.length === 0) {
              repeatErr(i);
            }
            last.push({
              type: types2.REPETITION,
              min: 0,
              max: 1,
              value: last.pop()
            });
            break;
          case "+":
            if (last.length === 0) {
              repeatErr(i);
            }
            last.push({
              type: types2.REPETITION,
              min: 1,
              max: Infinity,
              value: last.pop()
            });
            break;
          case "*":
            if (last.length === 0) {
              repeatErr(i);
            }
            last.push({
              type: types2.REPETITION,
              min: 0,
              max: Infinity,
              value: last.pop()
            });
            break;
          default:
            last.push({
              type: types2.CHAR,
              value: c.charCodeAt(0)
            });
        }
      }
      if (groupStack.length !== 0) {
        util.error(regexpStr, "Unterminated group");
      }
      return start;
    };
    module2.exports.types = types2;
  }
});

// node_modules/drange/lib/index.js
var require_lib2 = __commonJS({
  "node_modules/drange/lib/index.js"(exports2, module2) {
    "use strict";
    var SubRange = class _SubRange {
      constructor(low, high) {
        this.low = low;
        this.high = high;
        this.length = 1 + high - low;
      }
      overlaps(range) {
        return !(this.high < range.low || this.low > range.high);
      }
      touches(range) {
        return !(this.high + 1 < range.low || this.low - 1 > range.high);
      }
      // Returns inclusive combination of SubRanges as a SubRange.
      add(range) {
        return new _SubRange(
          Math.min(this.low, range.low),
          Math.max(this.high, range.high)
        );
      }
      // Returns subtraction of SubRanges as an array of SubRanges.
      // (There's a case where subtraction divides it in 2)
      subtract(range) {
        if (range.low <= this.low && range.high >= this.high) {
          return [];
        } else if (range.low > this.low && range.high < this.high) {
          return [
            new _SubRange(this.low, range.low - 1),
            new _SubRange(range.high + 1, this.high)
          ];
        } else if (range.low <= this.low) {
          return [new _SubRange(range.high + 1, this.high)];
        } else {
          return [new _SubRange(this.low, range.low - 1)];
        }
      }
      toString() {
        return this.low == this.high ? this.low.toString() : this.low + "-" + this.high;
      }
    };
    var DRange = class _DRange {
      constructor(a, b) {
        this.ranges = [];
        this.length = 0;
        if (a != null)
          this.add(a, b);
      }
      _update_length() {
        this.length = this.ranges.reduce((previous, range) => {
          return previous + range.length;
        }, 0);
      }
      add(a, b) {
        var _add = (subrange) => {
          var i = 0;
          while (i < this.ranges.length && !subrange.touches(this.ranges[i])) {
            i++;
          }
          var newRanges = this.ranges.slice(0, i);
          while (i < this.ranges.length && subrange.touches(this.ranges[i])) {
            subrange = subrange.add(this.ranges[i]);
            i++;
          }
          newRanges.push(subrange);
          this.ranges = newRanges.concat(this.ranges.slice(i));
          this._update_length();
        };
        if (a instanceof _DRange) {
          a.ranges.forEach(_add);
        } else {
          if (b == null)
            b = a;
          _add(new SubRange(a, b));
        }
        return this;
      }
      subtract(a, b) {
        var _subtract = (subrange) => {
          var i = 0;
          while (i < this.ranges.length && !subrange.overlaps(this.ranges[i])) {
            i++;
          }
          var newRanges = this.ranges.slice(0, i);
          while (i < this.ranges.length && subrange.overlaps(this.ranges[i])) {
            newRanges = newRanges.concat(this.ranges[i].subtract(subrange));
            i++;
          }
          this.ranges = newRanges.concat(this.ranges.slice(i));
          this._update_length();
        };
        if (a instanceof _DRange) {
          a.ranges.forEach(_subtract);
        } else {
          if (b == null)
            b = a;
          _subtract(new SubRange(a, b));
        }
        return this;
      }
      intersect(a, b) {
        var newRanges = [];
        var _intersect = (subrange) => {
          var i = 0;
          while (i < this.ranges.length && !subrange.overlaps(this.ranges[i])) {
            i++;
          }
          while (i < this.ranges.length && subrange.overlaps(this.ranges[i])) {
            var low = Math.max(this.ranges[i].low, subrange.low);
            var high = Math.min(this.ranges[i].high, subrange.high);
            newRanges.push(new SubRange(low, high));
            i++;
          }
        };
        if (a instanceof _DRange) {
          a.ranges.forEach(_intersect);
        } else {
          if (b == null)
            b = a;
          _intersect(new SubRange(a, b));
        }
        this.ranges = newRanges;
        this._update_length();
        return this;
      }
      index(index) {
        var i = 0;
        while (i < this.ranges.length && this.ranges[i].length <= index) {
          index -= this.ranges[i].length;
          i++;
        }
        return this.ranges[i].low + index;
      }
      toString() {
        return "[ " + this.ranges.join(", ") + " ]";
      }
      clone() {
        return new _DRange(this);
      }
      numbers() {
        return this.ranges.reduce((result, subrange) => {
          var i = subrange.low;
          while (i <= subrange.high) {
            result.push(i);
            i++;
          }
          return result;
        }, []);
      }
      subranges() {
        return this.ranges.map((subrange) => ({
          low: subrange.low,
          high: subrange.high,
          length: 1 + subrange.high - subrange.low
        }));
      }
    };
    module2.exports = DRange;
  }
});

// node_modules/randexp/lib/randexp.js
var require_randexp = __commonJS({
  "node_modules/randexp/lib/randexp.js"(exports2, module2) {
    var ret = require_lib();
    var DRange = require_lib2();
    var types2 = ret.types;
    module2.exports = class RandExp2 {
      /**
       * @constructor
       * @param {RegExp|String} regexp
       * @param {String} m
       */
      constructor(regexp, m) {
        this._setDefaults(regexp);
        if (regexp instanceof RegExp) {
          this.ignoreCase = regexp.ignoreCase;
          this.multiline = regexp.multiline;
          regexp = regexp.source;
        } else if (typeof regexp === "string") {
          this.ignoreCase = m && m.indexOf("i") !== -1;
          this.multiline = m && m.indexOf("m") !== -1;
        } else {
          throw new Error("Expected a regexp or string");
        }
        this.tokens = ret(regexp);
      }
      /**
       * Checks if some custom properties have been set for this regexp.
       *
       * @param {RandExp} randexp
       * @param {RegExp} regexp
       */
      _setDefaults(regexp) {
        this.max = regexp.max != null ? regexp.max : RandExp2.prototype.max != null ? RandExp2.prototype.max : 100;
        this.defaultRange = regexp.defaultRange ? regexp.defaultRange : this.defaultRange.clone();
        if (regexp.randInt) {
          this.randInt = regexp.randInt;
        }
      }
      /**
       * Generates the random string.
       *
       * @return {String}
       */
      gen() {
        return this._gen(this.tokens, []);
      }
      /**
       * Generate random string modeled after given tokens.
       *
       * @param {Object} token
       * @param {Array.<String>} groups
       * @return {String}
       */
      _gen(token, groups) {
        var stack, str, n, i, l;
        switch (token.type) {
          case types2.ROOT:
          case types2.GROUP:
            if (token.followedBy || token.notFollowedBy) {
              return "";
            }
            if (token.remember && token.groupNumber === void 0) {
              token.groupNumber = groups.push(null) - 1;
            }
            stack = token.options ? this._randSelect(token.options) : token.stack;
            str = "";
            for (i = 0, l = stack.length; i < l; i++) {
              str += this._gen(stack[i], groups);
            }
            if (token.remember) {
              groups[token.groupNumber] = str;
            }
            return str;
          case types2.POSITION:
            return "";
          case types2.SET:
            var expandedSet = this._expand(token);
            if (!expandedSet.length) {
              return "";
            }
            return String.fromCharCode(this._randSelect(expandedSet));
          case types2.REPETITION:
            n = this.randInt(
              token.min,
              token.max === Infinity ? token.min + this.max : token.max
            );
            str = "";
            for (i = 0; i < n; i++) {
              str += this._gen(token.value, groups);
            }
            return str;
          case types2.REFERENCE:
            return groups[token.value - 1] || "";
          case types2.CHAR:
            var code = this.ignoreCase && this._randBool() ? this._toOtherCase(token.value) : token.value;
            return String.fromCharCode(code);
        }
      }
      /**
       * If code is alphabetic, converts to other case.
       * If not alphabetic, returns back code.
       *
       * @param {Number} code
       * @return {Number}
       */
      _toOtherCase(code) {
        return code + (97 <= code && code <= 122 ? -32 : 65 <= code && code <= 90 ? 32 : 0);
      }
      /**
       * Randomly returns a true or false value.
       *
       * @return {Boolean}
       */
      _randBool() {
        return !this.randInt(0, 1);
      }
      /**
       * Randomly selects and returns a value from the array.
       *
       * @param {Array.<Object>} arr
       * @return {Object}
       */
      _randSelect(arr) {
        if (arr instanceof DRange) {
          return arr.index(this.randInt(0, arr.length - 1));
        }
        return arr[this.randInt(0, arr.length - 1)];
      }
      /**
       * expands a token to a DiscontinuousRange of characters which has a
       * length and an index function (for random selecting)
       *
       * @param {Object} token
       * @return {DiscontinuousRange}
       */
      _expand(token) {
        if (token.type === ret.types.CHAR) {
          return new DRange(token.value);
        } else if (token.type === ret.types.RANGE) {
          return new DRange(token.from, token.to);
        } else {
          let drange = new DRange();
          for (let i = 0; i < token.set.length; i++) {
            let subrange = this._expand(token.set[i]);
            drange.add(subrange);
            if (this.ignoreCase) {
              for (let j = 0; j < subrange.length; j++) {
                let code = subrange.index(j);
                let otherCaseCode = this._toOtherCase(code);
                if (code !== otherCaseCode) {
                  drange.add(otherCaseCode);
                }
              }
            }
          }
          if (token.not) {
            return this.defaultRange.clone().subtract(drange);
          } else {
            return this.defaultRange.clone().intersect(drange);
          }
        }
      }
      /**
       * Randomly generates and returns a number between a and b (inclusive).
       *
       * @param {Number} a
       * @param {Number} b
       * @return {Number}
       */
      randInt(a, b) {
        return a + Math.floor(Math.random() * (1 + b - a));
      }
      /**
       * Default range of characters to generate from.
       */
      get defaultRange() {
        return this._range = this._range || new DRange(32, 126);
      }
      set defaultRange(range) {
        this._range = range;
      }
      /**
       *
       * Enables use of randexp with a shorter call.
       *
       * @param {RegExp|String| regexp}
       * @param {String} m
       * @return {String}
       */
      static randexp(regexp, m) {
        var randexp;
        if (typeof regexp === "string") {
          regexp = new RegExp(regexp, m);
        }
        if (regexp._randexp === void 0) {
          randexp = new RandExp2(regexp, m);
          regexp._randexp = randexp;
        } else {
          randexp = regexp._randexp;
          randexp._setDefaults(regexp);
        }
        return randexp.gen();
      }
      /**
       * Enables sugary /regexp/.gen syntax.
       */
      static sugar() {
        RegExp.prototype.gen = function() {
          return RandExp2.randexp(this);
        };
      }
    };
  }
});

// src/lib/core/random.mjs
function getRandomInteger(min, max) {
  min = typeof min === "undefined" ? constants_default.MIN_INTEGER : min;
  max = typeof max === "undefined" ? constants_default.MAX_INTEGER : max;
  return Math.floor(option_default("random")() * (max - min + 1)) + min;
}
function _randexp(value) {
  import_randexp.default.prototype.max = option_default("defaultRandExpMax");
  import_randexp.default.prototype.randInt = (a, b) => a + Math.floor(option_default("random")() * (1 + (b - a)));
  const re = new import_randexp.default(value);
  return re.gen();
}
function pick(collection) {
  return collection[Math.floor(option_default("random")() * collection.length)];
}
function shuffle(collection) {
  let tmp;
  let key;
  let length = collection.length;
  const copy = collection.slice();
  for (; length > 0; ) {
    key = Math.floor(option_default("random")() * length);
    length -= 1;
    tmp = copy[length];
    copy[length] = copy[key];
    copy[key] = tmp;
  }
  return copy;
}
function getRandom(min, max) {
  return option_default("random")() * (max - min) + min;
}
function number(min, max, defMin, defMax, hasPrecision = false) {
  defMin = typeof defMin === "undefined" ? constants_default.MIN_NUMBER : defMin;
  defMax = typeof defMax === "undefined" ? constants_default.MAX_NUMBER : defMax;
  min = typeof min === "undefined" ? defMin : min;
  max = typeof max === "undefined" ? defMax : max;
  if (max < min) {
    max += min;
  }
  if (hasPrecision) {
    return getRandom(min, max);
  }
  return getRandomInteger(min, max);
}
function by(type) {
  switch (type) {
    case "seconds":
      return number(0, 60) * 60;
    case "minutes":
      return number(15, 50) * 612;
    case "hours":
      return number(12, 72) * 36123;
    case "days":
      return number(7, 30) * 86412345;
    case "weeks":
      return number(4, 52) * 604812345;
    case "months":
      return number(2, 13) * 2592012345;
    case "years":
      return number(1, 20) * 31104012345;
    default:
      break;
  }
}
function date(step) {
  if (step) {
    return by(step);
  }
  let earliest = option_default("minDateTime");
  let latest = option_default("maxDateTime");
  if (typeof earliest === "string") {
    earliest = new Date(earliest);
  }
  if (typeof latest === "string") {
    latest = new Date(latest);
  }
  const now = (/* @__PURE__ */ new Date()).getTime();
  if (typeof earliest === "number") {
    earliest = new Date(now + earliest);
  }
  if (typeof latest === "number") {
    latest = new Date(now + latest);
  }
  return new Date(getRandom(earliest.getTime(), latest.getTime()));
}
var import_randexp, random_default;
var init_random = __esm({
  "src/lib/core/random.mjs"() {
    import_randexp = __toESM(require_randexp(), 1);
    init_option();
    init_constants();
    random_default = {
      pick,
      date,
      shuffle,
      number,
      randexp: _randexp
    };
  }
});

// src/lib/core/utils.mjs
function getLocalRef(obj, path, refs) {
  path = decodeURIComponent(path);
  if (refs && refs[path])
    return clone(refs[path]);
  const keyElements = path.replace("#/", "/").split("/");
  let schema = obj.$ref && refs && refs[obj.$ref] || obj;
  if (!schema && !keyElements[0]) {
    keyElements[0] = obj.$ref.split("#/")[0];
  }
  if (refs && path.includes("#/") && refs[keyElements[0]]) {
    schema = refs[keyElements.shift()];
  }
  if (!keyElements[0])
    keyElements.shift();
  while (schema && keyElements.length > 0) {
    const prop = keyElements.shift();
    if (!schema[prop]) {
      throw new Error(`Prop not found: ${prop} (${path})`);
    }
    schema = schema[prop];
  }
  return schema;
}
function isNumeric(value) {
  return typeof value === "string" && RE_NUMERIC.test(value);
}
function isScalar(value) {
  return ["number", "boolean"].includes(typeof value);
}
function hasProperties(obj, ...properties) {
  return properties.filter((key) => {
    return typeof obj[key] !== "undefined";
  }).length > 0;
}
function clampDate(value) {
  if (value.includes(" ")) {
    return new Date(value).toISOString().substr(0, 10);
  }
  let [year, month, day] = value.split("T")[0].split("-");
  month = `0${Math.max(1, Math.min(12, month))}`.slice(-2);
  day = `0${Math.max(1, Math.min(31, day))}`.slice(-2);
  return `${year}-${month}-${day}`;
}
function clampDateTime(value) {
  if (value.includes(" ")) {
    return new Date(value).toISOString().substr(0, 10);
  }
  const [datePart, timePart] = value.split("T");
  let [year, month, day] = datePart.split("-");
  let [hour, minute, second] = timePart.substr(0, 8).split(":");
  month = `0${Math.max(1, Math.min(12, month))}`.slice(-2);
  day = `0${Math.max(1, Math.min(31, day))}`.slice(-2);
  hour = `0${Math.max(1, Math.min(23, hour))}`.slice(-2);
  minute = `0${Math.max(1, Math.min(59, minute))}`.slice(-2);
  second = `0${Math.max(1, Math.min(59, second))}`.slice(-2);
  return `${year}-${month}-${day}T${hour}:${minute}:${second}.000Z`;
}
function typecast(type, schema, callback) {
  const params = {};
  switch (type || schema.type) {
    case "integer":
    case "number":
      if (typeof schema.minimum !== "undefined") {
        params.minimum = schema.minimum;
      }
      if (typeof schema.maximum !== "undefined") {
        params.maximum = schema.maximum;
      }
      if (schema.enum) {
        let min = Math.max(params.minimum || 0, 0);
        let max = Math.min(params.maximum || Infinity, Infinity);
        if (schema.exclusiveMinimum && min === schema.minimum) {
          min += schema.multipleOf || 1;
        }
        if (schema.exclusiveMaximum && max === schema.maximum) {
          max -= schema.multipleOf || 1;
        }
        if (min || max !== Infinity) {
          schema.enum = schema.enum.filter((x) => {
            if (x >= min && x <= max) {
              return true;
            }
            return false;
          });
        }
      }
      break;
    case "string": {
      params.minLength = option_default("minLength") || 0;
      params.maxLength = option_default("maxLength") || Number.MAX_SAFE_INTEGER;
      if (typeof schema.minLength !== "undefined") {
        params.minLength = Math.max(params.minLength, schema.minLength);
      }
      if (typeof schema.maxLength !== "undefined") {
        params.maxLength = Math.min(params.maxLength, schema.maxLength);
      }
      break;
    }
    default:
      break;
  }
  let value = callback(params);
  if (value === null || value === void 0) {
    return null;
  }
  switch (type || schema.type) {
    case "number":
      value = isNumeric(value) ? parseFloat(value) : value;
      break;
    case "integer":
      value = isNumeric(value) ? parseInt(value, 10) : value;
      break;
    case "boolean":
      value = !!value;
      break;
    case "string": {
      if (isScalar(value)) {
        return value;
      }
      value = String(value);
      const min = Math.max(params.minLength || 0, 0);
      const max = Math.min(params.maxLength || Infinity, Infinity);
      let prev;
      let noChangeCount = 0;
      while (value.length < min) {
        prev = value;
        if (!schema.pattern) {
          value += `${random_default.pick([" ", "/", "_", "-", "+", "=", "@", "^"])}${value}`;
        } else {
          value += random_default.randexp(schema.pattern);
        }
        if (value === prev) {
          noChangeCount += 1;
          if (noChangeCount === 3) {
            break;
          }
        } else {
          noChangeCount = 0;
        }
      }
      if (value.length > max) {
        value = value.substr(0, max);
      }
      switch (schema.format) {
        case "date-time":
        case "datetime":
          value = new Date(clampDateTime(value)).toISOString().replace(/([0-9])0+Z$/, "$1Z");
          break;
        case "full-date":
        case "date":
          value = new Date(clampDate(value)).toISOString().substr(0, 10);
          break;
        case "time":
          value = (/* @__PURE__ */ new Date(`1969-01-01 ${value}`)).toISOString().substr(11);
          break;
        default:
          break;
      }
      break;
    }
    default:
      break;
  }
  return value;
}
function merge(a, b) {
  Object.keys(b).forEach((key) => {
    if (typeof b[key] !== "object" || b[key] === null) {
      a[key] = b[key];
    } else if (Array.isArray(b[key])) {
      a[key] = a[key] || [];
      b[key].forEach((value, i) => {
        if (a.type === "array" && b.type === "array") {
          a[key][i] = merge(a[key][i] || {}, value, true);
        } else if (Array.isArray(a[key]) && a[key].indexOf(value) === -1) {
          a[key].push(value);
        }
      });
    } else if (typeof a[key] !== "object" || a[key] === null || Array.isArray(a[key])) {
      a[key] = merge({}, b[key]);
    } else {
      a[key] = merge(a[key], b[key]);
    }
  });
  return a;
}
function clone(obj, cache = /* @__PURE__ */ new Map()) {
  if (!obj || typeof obj !== "object") {
    return obj;
  }
  if (cache.has(obj)) {
    return cache.get(obj);
  }
  if (Array.isArray(obj)) {
    const arr = [];
    cache.set(obj, arr);
    arr.push(...obj.map((x) => clone(x, cache)));
    return arr;
  }
  const clonedObj = {};
  cache.set(obj, clonedObj);
  return Object.keys(obj).reduce((prev, cur) => {
    prev[cur] = clone(obj[cur], cache);
    return prev;
  }, clonedObj);
}
function short(schema) {
  const s = JSON.stringify(schema);
  const l = JSON.stringify(schema, null, 2);
  return s.length > 400 ? `${l.substr(0, 400)}...` : l;
}
function anyValue() {
  return random_default.pick([
    false,
    true,
    null,
    -1,
    NaN,
    Math.PI,
    Infinity,
    void 0,
    [],
    {},
    // FIXME: use built-in random?
    Math.random(),
    Math.random().toString(36).substr(2)
  ]);
}
function hasValue(schema, value) {
  if (schema.enum)
    return schema.enum.includes(value);
  if (schema.const)
    return schema.const === value;
}
function notValue(schema, parent) {
  const copy = merge({}, parent);
  if (typeof schema.minimum !== "undefined") {
    copy.maximum = schema.minimum;
    copy.exclusiveMaximum = true;
  }
  if (typeof schema.maximum !== "undefined") {
    copy.minimum = schema.maximum > copy.maximum ? 0 : schema.maximum;
    copy.exclusiveMinimum = true;
  }
  if (typeof schema.minLength !== "undefined") {
    copy.maxLength = schema.minLength;
  }
  if (typeof schema.maxLength !== "undefined") {
    copy.minLength = schema.maxLength > copy.maxLength ? 0 : schema.maxLength;
  }
  if (schema.type) {
    copy.type = random_default.pick(constants_default.SCALAR_TYPES.filter((x) => {
      const types2 = Array.isArray(schema.type) ? schema.type : [schema.type];
      return types2.every((type) => {
        if (x === "number" || x === "integer") {
          return type !== "number" && type !== "integer";
        }
        return x !== type;
      });
    }));
  } else if (schema.enum) {
    let value;
    do {
      value = anyValue();
    } while (schema.enum.indexOf(value) !== -1);
    copy.enum = [value];
  }
  if (schema.required && copy.properties) {
    schema.required.forEach((prop) => {
      delete copy.properties[prop];
    });
  }
  return copy;
}
function validateValueForSchema(value, schema) {
  const schemaHasMin = schema.minimum !== void 0;
  const schemaHasMax = schema.maximum !== void 0;
  return (schemaHasMin || schemaHasMax) && (!schemaHasMin || value >= schema.minimum) && (!schemaHasMax || value <= schema.maximum);
}
function validate(value, schemas) {
  return !schemas.every((schema) => validateValueForSchema(value, schema));
}
function validateValueForOneOf(value, oneOf) {
  const validCount = oneOf.reduce((count, schema) => count + (validateValueForSchema(value, schema) ? 1 : 0), 0);
  return validCount === 1;
}
function isKey(prop) {
  return ["enum", "const", "default", "examples", "required", "definitions", "items", "properties"].includes(prop);
}
function omitProps(obj, props) {
  return Object.keys(obj).filter((key) => !props.includes(key)).reduce((copy, k) => {
    if (Array.isArray(obj[k])) {
      copy[k] = obj[k].slice();
    } else {
      copy[k] = obj[k] instanceof Object ? merge({}, obj[k]) : obj[k];
    }
    return copy;
  }, {});
}
function template(value, schema) {
  if (Array.isArray(value)) {
    return value.map((x) => template(x, schema));
  }
  if (typeof value === "string") {
    value = value.replace(/#\{([\w.-]+)\}/g, (_, $1) => schema[$1]);
  }
  return value;
}
function isEmpty(value) {
  return Object.prototype.toString.call(value) === "[object Object]" && !Object.keys(value).length;
}
function shouldClean(key, schema) {
  schema = schema.items || schema;
  const alwaysFakeOptionals = option_default("alwaysFakeOptionals");
  const isRequired = Array.isArray(schema.required) && schema.required.includes(key) || alwaysFakeOptionals;
  const wasCleaned = typeof schema.thunk === "function" || schema.additionalProperties && typeof schema.additionalProperties.thunk === "function";
  return !isRequired && !wasCleaned;
}
function clean(obj, schema, isArray = false) {
  if (!obj || typeof obj !== "object") {
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map((value) => clean(value, schema, true)).filter((value) => typeof value !== "undefined");
  }
  Object.keys(obj).forEach((k) => {
    if (isEmpty(obj[k])) {
      if (shouldClean(k, schema)) {
        delete obj[k];
      }
    } else {
      let subSchema = schema;
      if (schema && schema.properties && schema.properties[k]) {
        subSchema = schema.properties[k];
      }
      const value = clean(obj[k], subSchema);
      if (!isEmpty(value)) {
        obj[k] = value;
      }
    }
    if (typeof obj[k] === "undefined") {
      delete obj[k];
    }
  });
  if (!Object.keys(obj).length && isArray) {
    return void 0;
  }
  return obj;
}
var RE_NUMERIC, utils_default;
var init_utils = __esm({
  "src/lib/core/utils.mjs"() {
    init_option();
    init_constants();
    init_random();
    RE_NUMERIC = /^(0|[1-9][0-9]*)$/;
    utils_default = {
      hasProperties,
      getLocalRef,
      omitProps,
      typecast,
      merge,
      clone,
      short,
      hasValue,
      notValue,
      anyValue,
      validate,
      validateValueForSchema,
      validateValueForOneOf,
      isKey,
      template,
      shouldClean,
      clean,
      isEmpty,
      clampDate
    };
  }
});

// src/lib/class/Container.mjs
function proxy(gen) {
  return (value, schema, property, rootSchema) => {
    let fn = value;
    let args = [];
    if (typeof value === "object") {
      fn = Object.keys(value)[0];
      if (Array.isArray(value[fn])) {
        args = value[fn];
      } else {
        args.push(value[fn]);
      }
    }
    const props = fn.split(".");
    let ctx = gen();
    while (props.length > 1) {
      ctx = ctx[props.shift()];
    }
    value = typeof ctx === "object" ? ctx[props[0]] : ctx;
    if (typeof value === "function") {
      value = value.apply(ctx, args.map((x) => utils_default.template(x, rootSchema)));
    }
    if (Object.prototype.toString.call(value) === "[object Object]") {
      Object.keys(value).forEach((key) => {
        if (typeof value[key] === "function") {
          throw new Error(`Cannot resolve value for '${property}: ${fn}', given: ${value}`);
        }
      });
    }
    return value;
  };
}
var Container, Container_default;
var init_Container = __esm({
  "src/lib/class/Container.mjs"() {
    init_utils();
    Container = class {
      constructor() {
        this.registry = {};
        this.support = {};
      }
      /**
       * Unregister extensions
       * @param name
       */
      reset(name) {
        if (!name) {
          this.registry = {};
          this.support = {};
        } else {
          delete this.registry[name];
          delete this.support[name];
        }
      }
      /**
       * Override dependency given by name
       * @param name
       * @param callback
       */
      extend(name, callback) {
        this.registry[name] = callback(this.registry[name]);
        if (!this.support[name]) {
          this.support[name] = proxy(() => this.registry[name]);
        }
      }
      /**
       * Set keyword support by name
       * @param name
       * @param callback
       */
      define(name, callback) {
        this.support[name] = callback;
      }
      /**
       * Returns dependency given by name
       * @param name
       * @returns {Dependency}
       */
      get(name) {
        if (typeof this.registry[name] === "undefined") {
          throw new ReferenceError(`'${name}' dependency doesn't exist.`);
        }
        return this.registry[name];
      }
      /**
       * Apply a custom keyword
       * @param schema
       */
      wrap(schema) {
        if (!("generate" in schema)) {
          const keys = Object.keys(schema);
          const context = {};
          let length = keys.length;
          while (length--) {
            const fn = keys[length].replace(/^x-/, "");
            const gen = this.support[fn];
            if (typeof gen === "function") {
              Object.defineProperty(schema, "generate", {
                configurable: false,
                enumerable: false,
                writable: false,
                value: (rootSchema, key) => gen.call(context, schema[keys[length]], schema, keys[length], rootSchema, key.slice())
                // eslint-disable-line
              });
              break;
            }
          }
        }
        return schema;
      }
    };
    Container_default = Container;
  }
});

// src/lib/api/format.mjs
function formatAPI(nameOrFormatMap, callback) {
  if (typeof nameOrFormatMap === "undefined") {
    return registry2.list();
  }
  if (typeof nameOrFormatMap === "string") {
    if (typeof callback === "function") {
      registry2.register(nameOrFormatMap, callback);
    } else if (callback === null || callback === false) {
      registry2.unregister(nameOrFormatMap);
    } else {
      return registry2.get(nameOrFormatMap);
    }
  } else {
    registry2.registerMany(nameOrFormatMap);
  }
}
var registry2, format_default;
var init_format = __esm({
  "src/lib/api/format.mjs"() {
    init_Registry();
    registry2 = new Registry_default();
    format_default = formatAPI;
  }
});

// src/lib/core/error.mjs
var ParseError, error_default;
var init_error = __esm({
  "src/lib/core/error.mjs"() {
    ParseError = class extends Error {
      constructor(message, path) {
        super();
        if (Error.captureStackTrace) {
          Error.captureStackTrace(this, this.constructor);
        }
        this.name = "ParseError";
        this.message = message;
        this.path = path;
      }
    };
    error_default = ParseError;
  }
});

// src/lib/core/infer.mjs
function matchesType(obj, lastElementInPath, inferredTypeProperties) {
  return Object.keys(obj).filter((prop) => {
    const isSubschema = subschemaProperties.indexOf(lastElementInPath) > -1;
    const inferredPropertyFound = inferredTypeProperties.indexOf(prop) > -1;
    if (inferredPropertyFound && !isSubschema) {
      return true;
    }
    return false;
  }).length > 0;
}
function inferType(obj, schemaPath) {
  const keys = Object.keys(inferredProperties);
  for (let i = 0; i < keys.length; i += 1) {
    const typeName = keys[i];
    const lastElementInPath = schemaPath[schemaPath.length - 1];
    if (matchesType(obj, lastElementInPath, inferredProperties[typeName])) {
      return typeName;
    }
  }
}
var inferredProperties, subschemaProperties, infer_default;
var init_infer = __esm({
  "src/lib/core/infer.mjs"() {
    inferredProperties = {
      array: [
        "additionalItems",
        "items",
        "maxItems",
        "minItems",
        "uniqueItems"
      ],
      integer: [
        "exclusiveMaximum",
        "exclusiveMinimum",
        "maximum",
        "minimum",
        "multipleOf"
      ],
      object: [
        "additionalProperties",
        "dependencies",
        "maxProperties",
        "minProperties",
        "patternProperties",
        "properties",
        "required"
      ],
      string: [
        "maxLength",
        "minLength",
        "pattern",
        "format"
      ]
    };
    inferredProperties.number = inferredProperties.integer;
    subschemaProperties = [
      "additionalItems",
      "items",
      "additionalProperties",
      "dependencies",
      "patternProperties",
      "properties"
    ];
    infer_default = inferType;
  }
});

// src/lib/generators/boolean.mjs
function booleanGenerator() {
  return option_default("random")() > 0.5;
}
var boolean_default;
var init_boolean = __esm({
  "src/lib/generators/boolean.mjs"() {
    init_option();
    boolean_default = booleanGenerator;
  }
});

// src/lib/types/boolean.mjs
var booleanType, boolean_default2;
var init_boolean2 = __esm({
  "src/lib/types/boolean.mjs"() {
    init_boolean();
    booleanType = boolean_default;
    boolean_default2 = booleanType;
  }
});

// src/lib/generators/null.mjs
function nullGenerator() {
  return null;
}
var null_default;
var init_null = __esm({
  "src/lib/generators/null.mjs"() {
    null_default = nullGenerator;
  }
});

// src/lib/types/null.mjs
var nullType, null_default2;
var init_null2 = __esm({
  "src/lib/types/null.mjs"() {
    init_null();
    nullType = null_default;
    null_default2 = nullType;
  }
});

// src/lib/types/array.mjs
function unique(path, items, value, sample, resolve2, traverseCallback) {
  const tmp = [];
  const seen = [];
  function walk(obj) {
    const json = JSON.stringify(obj.value);
    if (seen.indexOf(json) === -1) {
      seen.push(json);
      tmp.push(obj);
      return true;
    }
    return false;
  }
  items.forEach(walk);
  let limit = 100;
  while (tmp.length !== items.length) {
    if (!walk(traverseCallback(value.items || sample, path, resolve2))) {
      limit -= 1;
    }
    if (!limit) {
      break;
    }
  }
  return tmp;
}
function arrayType(value, path, resolve2, traverseCallback) {
  const items = [];
  if (!(value.items || value.additionalItems)) {
    if (utils_default.hasProperties(value, "minItems", "maxItems", "uniqueItems")) {
      if (value.minItems !== 0 || value.maxItems !== 0) {
        throw new error_default(`missing items for ${utils_default.short(value)}`, path);
      }
    }
    return items;
  }
  if (Array.isArray(value.items)) {
    return value.items.map((item, key) => {
      const itemSubpath = path.concat(["items", key]);
      return traverseCallback(item, itemSubpath, resolve2);
    });
  }
  let minItems = value.minItems;
  let maxItems = value.maxItems;
  const defaultMinItems = option_default("minItems");
  const defaultMaxItems = option_default("maxItems");
  if (defaultMinItems) {
    minItems = typeof minItems === "undefined" ? defaultMinItems : Math.min(defaultMinItems, minItems);
  }
  if (defaultMaxItems) {
    maxItems = typeof maxItems === "undefined" ? defaultMaxItems : Math.min(defaultMaxItems, maxItems);
    if (maxItems && maxItems > defaultMaxItems) {
      maxItems = defaultMaxItems;
    }
    if (minItems && minItems > defaultMaxItems) {
      minItems = maxItems;
    }
  }
  const optionalsProbability = option_default("alwaysFakeOptionals") === true ? 1 : option_default("optionalsProbability");
  const fixedProbabilities = option_default("alwaysFakeOptionals") || option_default("fixedProbabilities") || false;
  let length = random_default.number(minItems, maxItems, 1, 5);
  if (optionalsProbability !== null) {
    length = Math.max(fixedProbabilities ? Math.round((maxItems || length) * optionalsProbability) : Math.abs(random_default.number(minItems, maxItems) * optionalsProbability), minItems || 0);
  }
  const sample = typeof value.additionalItems === "object" ? value.additionalItems : {};
  for (let current = items.length; current < length; current += 1) {
    const itemSubpath = path.concat(["items", current]);
    const element = traverseCallback(value.items || sample, itemSubpath, resolve2);
    items.push(element);
  }
  if (value.contains && length > 0) {
    const idx = random_default.number(0, length - 1);
    items[idx] = traverseCallback(value.contains, path.concat(["items", idx]), resolve2);
  }
  if (value.uniqueItems) {
    return unique(path.concat(["items"]), items, value, sample, resolve2, traverseCallback);
  }
  return items;
}
var array_default;
var init_array = __esm({
  "src/lib/types/array.mjs"() {
    init_random();
    init_utils();
    init_error();
    init_option();
    array_default = arrayType;
  }
});

// src/lib/types/number.mjs
function numberType(value) {
  let min = typeof value.minimum === "undefined" || value.minimum === -Number.MAX_VALUE ? constants_default.MIN_INTEGER : value.minimum;
  let max = typeof value.maximum === "undefined" || value.maximum === Number.MAX_VALUE ? constants_default.MAX_INTEGER : value.maximum;
  const multipleOf = value.multipleOf;
  const decimals = multipleOf && String(multipleOf).match(/e-(\d)|\.(\d+)$/);
  if (decimals) {
    const number2 = (Math.random() * random_default.number(0, 10) + 1) * multipleOf;
    const truncate = decimals[1] || decimals[2].length;
    const result = parseFloat(number2.toFixed(truncate));
    const base = random_default.number(min, max - 1);
    if (!String(result).includes(".")) {
      return (base + result).toExponential();
    }
    return base + result;
  }
  if (multipleOf) {
    max = Math.floor(max / multipleOf) * multipleOf;
    min = Math.ceil(min / multipleOf) * multipleOf;
  }
  if (value.exclusiveMinimum && min === value.minimum) {
    min += multipleOf || 1;
  }
  if (value.exclusiveMaximum && max === value.maximum) {
    max -= multipleOf || 1;
  }
  if (min > max) {
    return NaN;
  }
  if (multipleOf) {
    let base = random_default.number(Math.floor(min / multipleOf), Math.floor(max / multipleOf)) * multipleOf;
    while (base < min) {
      base += multipleOf;
    }
    return base;
  }
  return random_default.number(min, max, void 0, void 0, value.type !== "integer");
}
var number_default;
var init_number = __esm({
  "src/lib/types/number.mjs"() {
    init_random();
    init_constants();
    number_default = numberType;
  }
});

// src/lib/types/integer.mjs
function integerType(value) {
  return Math.floor(number_default({ ...value }));
}
var integer_default;
var init_integer = __esm({
  "src/lib/types/integer.mjs"() {
    init_number();
    integer_default = integerType;
  }
});

// src/lib/generators/words.mjs
function wordsGenerator(length) {
  const words = random_default.shuffle(LIPSUM_WORDS);
  return words.slice(0, length);
}
var LIPSUM_WORDS, words_default;
var init_words = __esm({
  "src/lib/generators/words.mjs"() {
    init_random();
    LIPSUM_WORDS = `Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore
et dolore magna aliqua Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
commodo consequat Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
pariatur Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est
laborum`.split(/\W/);
    words_default = wordsGenerator;
  }
});

// src/lib/types/object.mjs
function objectType(value, path, resolve2, traverseCallback) {
  const props = {};
  const properties = value.properties || {};
  const patternProperties = value.patternProperties || {};
  const requiredProperties = typeof value.required === "boolean" ? [] : (value.required || []).slice();
  const allowsAdditional = value.additionalProperties !== false;
  const propertyKeys = Object.keys(properties);
  const patternPropertyKeys = Object.keys(patternProperties);
  const optionalProperties = propertyKeys.concat(patternPropertyKeys).reduce((_response, _key) => {
    if (requiredProperties.indexOf(_key) === -1)
      _response.push(_key);
    return _response;
  }, []);
  const allProperties = requiredProperties.concat(optionalProperties);
  const additionalProperties = allowsAdditional ? value.additionalProperties === true ? anyType : value.additionalProperties : value.additionalProperties;
  if (!allowsAdditional && propertyKeys.length === 0 && patternPropertyKeys.length === 0 && utils_default.hasProperties(value, "minProperties", "maxProperties", "dependencies", "required")) {
    return null;
  }
  if (option_default("requiredOnly") === true) {
    requiredProperties.forEach((key) => {
      if (properties[key]) {
        props[key] = properties[key];
      }
    });
    return traverseCallback(props, path.concat(["properties"]), resolve2, value);
  }
  const optionalsProbability = option_default("alwaysFakeOptionals") === true ? 1 : option_default("optionalsProbability");
  const fixedProbabilities = option_default("alwaysFakeOptionals") || option_default("fixedProbabilities") || false;
  const ignoreProperties = option_default("ignoreProperties") || [];
  const reuseProps = option_default("reuseProperties");
  const fillProps = option_default("fillProperties");
  const max = value.maxProperties || allProperties.length + (allowsAdditional ? random_default.number(1, 5) : 0);
  let min = Math.max(value.minProperties || 0, requiredProperties.length);
  let neededExtras = Math.max(0, allProperties.length - min);
  if (allProperties.length === 1 && !requiredProperties.length) {
    min = Math.max(random_default.number(fillProps ? 1 : 0, max), min);
  }
  if (optionalsProbability !== null) {
    if (fixedProbabilities === true) {
      neededExtras = Math.round(min - requiredProperties.length + optionalsProbability * (allProperties.length - min));
    } else {
      neededExtras = random_default.number(min - requiredProperties.length, optionalsProbability * (allProperties.length - min));
    }
  }
  const extraPropertiesRandomOrder = random_default.shuffle(optionalProperties).slice(0, neededExtras);
  const extraProperties = optionalProperties.filter((_item) => {
    return extraPropertiesRandomOrder.indexOf(_item) !== -1;
  });
  const _limit = optionalsProbability !== null || requiredProperties.length === max ? max : random_default.number(0, max);
  const _props = requiredProperties.concat(random_default.shuffle(extraProperties).slice(0, _limit)).slice(0, max);
  const _defns = [];
  const _deps = [];
  if (value.dependencies) {
    Object.keys(value.dependencies).forEach((prop) => {
      const _required = value.dependencies[prop];
      if (_props.indexOf(prop) !== -1) {
        if (Array.isArray(_required)) {
          _required.forEach((sub) => {
            if (_props.indexOf(sub) === -1) {
              _props.push(sub);
            }
          });
        } else if (Array.isArray(_required.oneOf || _required.anyOf)) {
          const values = _required.oneOf || _required.anyOf;
          _deps.push({ prop, values });
        } else {
          _defns.push(_required);
        }
      }
    });
    if (_defns.length) {
      delete value.dependencies;
      return traverseCallback({
        allOf: _defns.concat(value)
      }, path.concat(["properties"]), resolve2, value);
    }
  }
  const skipped = [];
  const missing = [];
  _props.forEach((key) => {
    if (properties[key] && ["{}", "true"].includes(JSON.stringify(properties[key].not))) {
      return;
    }
    for (let i = 0; i < ignoreProperties.length; i += 1) {
      if (ignoreProperties[i] instanceof RegExp && ignoreProperties[i].test(key) || typeof ignoreProperties[i] === "string" && ignoreProperties[i] === key || typeof ignoreProperties[i] === "function" && ignoreProperties[i](properties[key], key)) {
        skipped.push(key);
        return;
      }
    }
    if (additionalProperties === false) {
      if (requiredProperties.indexOf(key) !== -1) {
        props[key] = properties[key];
      }
    }
    if (properties[key]) {
      props[key] = properties[key];
    }
    let found;
    patternPropertyKeys.forEach((_key) => {
      if (key.match(new RegExp(_key))) {
        found = true;
        if (props[key]) {
          utils_default.merge(props[key], patternProperties[_key]);
        } else {
          props[random_default.randexp(key)] = patternProperties[_key];
        }
      }
    });
    if (!found) {
      const subschema = patternProperties[key] || additionalProperties;
      if (subschema && additionalProperties !== false) {
        props[patternProperties[key] ? random_default.randexp(key) : key] = properties[key] || subschema;
      } else {
        missing.push(key);
      }
    }
  });
  let current = Object.keys(props).length + (fillProps ? 0 : skipped.length);
  const hash = (suffix) => random_default.randexp(`_?[_a-f\\d]{1,3}${suffix ? "\\$?" : ""}`);
  function get(from) {
    let one;
    do {
      if (!from.length)
        break;
      one = from.shift();
    } while (props[one]);
    return one;
  }
  let minProps = min;
  if (allowsAdditional && !requiredProperties.length) {
    minProps = Math.max(optionalsProbability === null || additionalProperties ? random_default.number(fillProps ? 1 : 0, max) : 0, min);
  }
  if (!extraProperties.length && !neededExtras && allowsAdditional && fixedProbabilities === true && fillProps) {
    const limit = random_default.number(0, max);
    for (let i = 0; i < limit; i += 1) {
      props[words_default(1) + hash(limit[i])] = additionalProperties || anyType;
    }
  }
  while (fillProps) {
    if (!(patternPropertyKeys.length || allowsAdditional)) {
      break;
    }
    if (current >= minProps) {
      break;
    }
    if (allowsAdditional) {
      if (reuseProps && propertyKeys.length - current > minProps) {
        let count = 0;
        let key;
        do {
          count += 1;
          if (count > 1e3) {
            break;
          }
          key = get(requiredProperties) || random_default.pick(propertyKeys);
        } while (typeof props[key] !== "undefined");
        if (typeof props[key] === "undefined") {
          props[key] = properties[key];
          current += 1;
        }
      } else if (patternPropertyKeys.length && !additionalProperties) {
        const prop = random_default.pick(patternPropertyKeys);
        const word = random_default.randexp(prop);
        if (!props[word]) {
          props[word] = patternProperties[prop];
          current += 1;
        }
      } else {
        const word = get(requiredProperties) || words_default(1) + hash();
        if (!props[word]) {
          props[word] = additionalProperties || anyType;
          current += 1;
        }
      }
    }
    for (let i = 0; current < min && i < patternPropertyKeys.length; i += 1) {
      const _key = patternPropertyKeys[i];
      const word = random_default.randexp(_key);
      if (!props[word]) {
        props[word] = patternProperties[_key];
        current += 1;
      }
    }
  }
  if (requiredProperties.length === 0 && (!allowsAdditional || optionalsProbability === false)) {
    const maximum = random_default.number(min, max);
    for (; current < maximum; ) {
      const word = get(propertyKeys);
      if (word) {
        props[word] = properties[word];
      }
      current += 1;
    }
  }
  let sortedObj = props;
  if (option_default("sortProperties") !== null) {
    const originalKeys = Object.keys(properties);
    const sortedKeys = Object.keys(props).sort((a, b) => {
      return option_default("sortProperties") ? a.localeCompare(b) : originalKeys.indexOf(a) - originalKeys.indexOf(b);
    });
    sortedObj = sortedKeys.reduce((memo, key) => {
      memo[key] = props[key];
      return memo;
    }, {});
  }
  const result = traverseCallback(sortedObj, path.concat(["properties"]), resolve2, value);
  _deps.forEach((dep) => {
    for (const sub of dep.values) {
      if (utils_default.hasValue(sub.properties[dep.prop], result.value[dep.prop])) {
        Object.keys(sub.properties).forEach((next) => {
          if (next !== dep.prop) {
            utils_default.merge(result.value, traverseCallback(sub.properties, path.concat(["properties"]), resolve2, value).value);
          }
        });
        break;
      }
    }
  });
  return result;
}
var anyType, object_default;
var init_object = __esm({
  "src/lib/types/object.mjs"() {
    init_constants();
    init_random();
    init_words();
    init_utils();
    init_option();
    anyType = { type: constants_default.ALLOWED_TYPES };
    object_default = objectType;
  }
});

// src/lib/generators/thunk.mjs
function produce() {
  const length = random_default.number(1, 5);
  return words_default(length).join(" ");
}
function thunkGenerator(min = 0, max = 140) {
  const _min = Math.max(0, min);
  const _max = random_default.number(_min, max);
  let result = produce();
  while (result.length < _min) {
    result += produce();
  }
  if (result.length > _max) {
    result = result.substr(0, _max);
  }
  return result;
}
var thunk_default;
var init_thunk = __esm({
  "src/lib/generators/thunk.mjs"() {
    init_words();
    init_random();
    thunk_default = thunkGenerator;
  }
});

// src/lib/generators/ipv4.mjs
function ipv4Generator() {
  return [0, 0, 0, 0].map(() => {
    return random_default.number(0, 255);
  }).join(".");
}
var ipv4_default;
var init_ipv4 = __esm({
  "src/lib/generators/ipv4.mjs"() {
    init_random();
    ipv4_default = ipv4Generator;
  }
});

// src/lib/generators/dateTime.mjs
function dateTimeGenerator() {
  return random_default.date().toISOString();
}
var dateTime_default;
var init_dateTime = __esm({
  "src/lib/generators/dateTime.mjs"() {
    init_random();
    dateTime_default = dateTimeGenerator;
  }
});

// src/lib/generators/date.mjs
function dateGenerator() {
  return dateTime_default().slice(0, 10);
}
var date_default;
var init_date = __esm({
  "src/lib/generators/date.mjs"() {
    init_dateTime();
    date_default = dateGenerator;
  }
});

// src/lib/generators/time.mjs
function timeGenerator() {
  return dateTime_default().slice(11);
}
var time_default;
var init_time = __esm({
  "src/lib/generators/time.mjs"() {
    init_dateTime();
    time_default = timeGenerator;
  }
});

// src/lib/generators/coreFormat.mjs
function coreFormatGenerator(coreFormat) {
  return random_default.randexp(regexps[coreFormat]).replace(ALLOWED_FORMATS, (match, key) => {
    return random_default.randexp(regexps[key]);
  });
}
var FRAGMENT, URI_PATTERN, PARAM_PATTERN, regexps, ALLOWED_FORMATS, coreFormat_default;
var init_coreFormat = __esm({
  "src/lib/generators/coreFormat.mjs"() {
    init_random();
    FRAGMENT = "[a-zA-Z][a-zA-Z0-9+-.]*";
    URI_PATTERN = `https?://{hostname}(?:${FRAGMENT})+`;
    PARAM_PATTERN = "(?:\\?([a-z]{1,7}(=\\w{1,5})?&){0,3})?";
    regexps = {
      email: "[a-zA-Z\\d][a-zA-Z\\d-]{1,13}[a-zA-Z\\d]@{hostname}",
      hostname: "[a-zA-Z]{1,33}\\.[a-z]{2,4}",
      ipv6: "[a-f\\d]{4}(:[a-f\\d]{4}){7}",
      uri: URI_PATTERN,
      slug: "[a-zA-Z\\d_-]+",
      // types from draft-0[67] (?)
      "uri-reference": `${URI_PATTERN}${PARAM_PATTERN}`,
      "uri-template": URI_PATTERN.replace("(?:", "(?:/\\{[a-z][:a-zA-Z0-9-]*\\}|"),
      "json-pointer": `(/(?:${FRAGMENT.replace("]*", "/]*")}|~[01]))+`,
      // some types from https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.1.md#data-types (?)
      uuid: "^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$",
      duration: "^P(?!$)((\\d+Y)?(\\d+M)?(\\d+D)?(T(?=\\d)(\\d+H)?(\\d+M)?(\\d+S)?)?|(\\d+W)?)$"
    };
    regexps.iri = regexps["uri-reference"];
    regexps["iri-reference"] = regexps["uri-reference"];
    regexps["idn-email"] = regexps.email;
    regexps["idn-hostname"] = regexps.hostname;
    ALLOWED_FORMATS = new RegExp(`\\{(${Object.keys(regexps).join("|")})\\}`);
    coreFormat_default = coreFormatGenerator;
  }
});

// src/lib/types/string.mjs
function generateFormat(value, invalid) {
  const callback = format_default(value.format);
  if (typeof callback === "function") {
    return callback(value);
  }
  switch (value.format) {
    case "date-time":
    case "datetime":
      return dateTime_default();
    case "date":
      return date_default();
    case "time":
      return time_default();
    case "ipv4":
      return ipv4_default();
    case "regex":
      return ".+?";
    case "email":
    case "hostname":
    case "ipv6":
    case "uri":
    case "uri-reference":
    case "iri":
    case "iri-reference":
    case "idn-email":
    case "idn-hostname":
    case "json-pointer":
    case "slug":
    case "uri-template":
    case "uuid":
    case "duration":
      return coreFormat_default(value.format);
    default:
      if (typeof callback === "undefined") {
        if (option_default("failOnInvalidFormat")) {
          throw new Error(`unknown registry key ${utils_default.short(value.format)}`);
        } else {
          return invalid();
        }
      }
      throw new Error(`unsupported format '${value.format}'`);
  }
}
function stringType(value) {
  const output = utils_default.typecast("string", value, (opts) => {
    if (value.format) {
      return generateFormat(value, () => thunk_default(opts.minLength, opts.maxLength));
    }
    if (value.pattern) {
      return random_default.randexp(value.pattern);
    }
    return thunk_default(opts.minLength, opts.maxLength);
  });
  return output;
}
var string_default;
var init_string = __esm({
  "src/lib/types/string.mjs"() {
    init_thunk();
    init_ipv4();
    init_dateTime();
    init_date();
    init_time();
    init_coreFormat();
    init_option();
    init_format();
    init_random();
    init_utils();
    string_default = stringType;
  }
});

// src/lib/types/index.mjs
var typeMap, types_default;
var init_types = __esm({
  "src/lib/types/index.mjs"() {
    init_boolean2();
    init_null2();
    init_array();
    init_integer();
    init_number();
    init_object();
    init_string();
    typeMap = {
      boolean: boolean_default2,
      null: null_default2,
      array: array_default,
      integer: integer_default,
      number: number_default,
      object: object_default,
      string: string_default
    };
    types_default = typeMap;
  }
});

// src/lib/core/traverse.mjs
function getMeta({ $comment: comment, title, description }) {
  return Object.entries({ comment, title, description }).filter(([, value]) => value).reduce((memo, [k, v]) => {
    memo[k] = v;
    return memo;
  }, {});
}
function traverse(schema, path, resolve2, rootSchema) {
  schema = resolve2(schema, null, path);
  if (schema && (schema.oneOf || schema.anyOf || schema.allOf)) {
    schema = resolve2(schema, null, path);
  }
  if (!schema) {
    throw new Error(`Cannot traverse at '${path.join(".")}', given '${JSON.stringify(rootSchema)}'`);
  }
  const context = {
    ...getMeta(schema),
    schemaPath: path
  };
  if (path[path.length - 1] !== "properties") {
    if (option_default("useExamplesValue") && Array.isArray(schema.examples)) {
      const fixedExamples = schema.examples.concat("default" in schema ? [schema.default] : []);
      return { value: utils_default.typecast(null, schema, () => random_default.pick(fixedExamples)), context };
    }
    if (option_default("useExamplesValue") && typeof schema.example !== "undefined") {
      return { value: utils_default.typecast(null, schema, () => schema.example), context };
    }
    if (option_default("useDefaultValue") && "default" in schema) {
      if (schema.default !== "" || !option_default("replaceEmptyByRandomValue")) {
        return { value: schema.default, context };
      }
    }
    if ("template" in schema) {
      return { value: utils_default.template(schema.template, rootSchema), context };
    }
    if ("const" in schema) {
      return { value: schema.const, context };
    }
  }
  if (schema.not && typeof schema.not === "object") {
    schema = utils_default.notValue(schema.not, utils_default.omitProps(schema, ["not"]));
    if (schema.type && schema.type === "object") {
      const { value, context: innerContext } = traverse(schema, path.concat(["not"]), resolve2, rootSchema);
      return { value: utils_default.clean(value, schema, false), context: { ...context, items: innerContext } };
    }
  }
  if (typeof schema.thunk === "function") {
    const { value, context: innerContext } = traverse(schema.thunk(rootSchema), path, resolve2);
    return { value, context: { ...context, items: innerContext } };
  }
  if (schema.jsonPath) {
    return { value: schema, context };
  }
  let type = schema.type;
  if (Array.isArray(type)) {
    type = random_default.pick(type);
  } else if (typeof type === "undefined") {
    type = infer_default(schema, path) || type;
    if (type) {
      schema.type = type;
    }
  }
  if (typeof schema.generate === "function") {
    const retVal = utils_default.typecast(null, schema, () => schema.generate(rootSchema, path));
    const retType = retVal === null ? "null" : typeof retVal;
    if (retType === type || retType === "number" && type === "integer" || Array.isArray(retVal) && type === "array") {
      return { value: retVal, context };
    }
  }
  if (typeof schema.pattern === "string") {
    return { value: utils_default.typecast("string", schema, () => random_default.randexp(schema.pattern)), context };
  }
  if (Array.isArray(schema.enum)) {
    return { value: utils_default.typecast(null, schema, () => random_default.pick(schema.enum)), context };
  }
  if (typeof type === "string") {
    if (!types_default[type]) {
      if (option_default("failOnInvalidTypes")) {
        throw new error_default(`unknown primitive ${utils_default.short(type)}`, path.concat(["type"]));
      } else {
        const value = option_default("defaultInvalidTypeProduct");
        if (typeof value === "string" && types_default[value]) {
          return { value: types_default[value](schema, path, resolve2, traverse), context };
        }
        return { value, context };
      }
    } else {
      try {
        const innerResult = types_default[type](schema, path, resolve2, traverse);
        if (type === "array") {
          return {
            value: innerResult.map(({ value }) => value),
            context: {
              ...context,
              items: innerResult.map(
                Array.isArray(schema.items) ? ({ context: c }) => c : ({ context: c }) => ({
                  ...c,
                  // we have to remove the index from the path to get the real schema path
                  schemaPath: c.schemaPath.slice(0, -1)
                })
              )
            }
          };
        }
        if (type === "object") {
          return innerResult !== null ? { value: innerResult.value, context: { ...context, items: innerResult.context } } : { value: {}, context };
        }
        return { value: innerResult, context };
      } catch (e) {
        if (typeof e.path === "undefined") {
          throw new error_default(e.stack, path);
        }
        throw e;
      }
    }
  }
  let valueCopy = {};
  let contextCopy = { ...context };
  if (Array.isArray(schema)) {
    valueCopy = [];
  }
  const pruneProperties = option_default("pruneProperties") || [];
  Object.keys(schema).forEach((prop) => {
    if (pruneProperties.includes(prop))
      return;
    if (schema[prop] === null)
      return;
    if (typeof schema[prop] === "object" && prop !== "definitions") {
      const { value, context: innerContext } = traverse(schema[prop], path.concat([prop]), resolve2, valueCopy);
      valueCopy[prop] = utils_default.clean(value, schema[prop], false);
      contextCopy[prop] = innerContext;
      if (valueCopy[prop] === null && option_default("omitNulls")) {
        delete valueCopy[prop];
        delete contextCopy[prop];
      }
    } else {
      valueCopy[prop] = schema[prop];
    }
  });
  return { value: valueCopy, context: contextCopy };
}
var traverse_default;
var init_traverse = __esm({
  "src/lib/core/traverse.mjs"() {
    init_utils();
    init_random();
    init_error();
    init_infer();
    init_types();
    init_option();
    traverse_default = traverse;
  }
});

// src/lib/core/buildResolveSchema.mjs
var buildResolveSchema, buildResolveSchema_default;
var init_buildResolveSchema = __esm({
  "src/lib/core/buildResolveSchema.mjs"() {
    init_option();
    init_random();
    init_utils();
    buildResolveSchema = ({
      refs,
      schema,
      container: container2,
      synchronous,
      refDepthMax,
      refDepthMin
    }) => {
      const recursiveUtil = {};
      const seenRefs = {};
      let depth = 0;
      let lastRef;
      let lastPath;
      recursiveUtil.resolveSchema = (sub, index, rootPath) => {
        if (sub === null || sub === void 0) {
          return null;
        }
        if (typeof sub.generate === "function") {
          return sub;
        }
        const _id = sub.$id || sub.id;
        if (typeof _id === "string") {
          delete sub.id;
          delete sub.$id;
          delete sub.$schema;
        }
        if (typeof sub.$ref === "string") {
          const maxDepth = Math.max(refDepthMin, refDepthMax) - 1;
          if (sub.$ref === "#" || seenRefs[sub.$ref] < 0 || lastRef === sub.$ref && ++depth > maxDepth) {
            if (sub.$ref !== "#" && lastPath && lastPath.length === rootPath.length) {
              return utils_default.getLocalRef(schema, sub.$ref, synchronous && refs);
            }
            delete sub.$ref;
            return sub;
          }
          if (typeof seenRefs[sub.$ref] === "undefined") {
            seenRefs[sub.$ref] = random_default.number(refDepthMin, refDepthMax) - 1;
          }
          lastPath = rootPath;
          lastRef = sub.$ref;
          let ref;
          if (sub.$ref.indexOf("#/") === -1) {
            ref = refs[sub.$ref] || null;
          } else {
            ref = utils_default.getLocalRef(schema, sub.$ref, synchronous && refs) || null;
          }
          let fixed;
          if (typeof ref !== "undefined") {
            if (!ref && option_default("ignoreMissingRefs") !== true) {
              throw new Error(`Reference not found: ${sub.$ref}`);
            }
            seenRefs[sub.$ref] -= 1;
            utils_default.merge(sub, ref || {});
            fixed = synchronous && ref && ref.$ref;
          }
          if (!fixed)
            delete sub.$ref;
          return sub;
        }
        if (Array.isArray(sub.allOf)) {
          const schemas = sub.allOf;
          delete sub.allOf;
          schemas.forEach((subSchema) => {
            const _sub = recursiveUtil.resolveSchema(subSchema, null, rootPath);
            utils_default.merge(sub, typeof _sub.thunk === "function" ? _sub.thunk(sub) : _sub);
            if (Array.isArray(sub.allOf)) {
              recursiveUtil.resolveSchema(sub, index, rootPath);
            }
          });
        }
        if (Array.isArray(sub.oneOf || sub.anyOf) && rootPath[rootPath.length - 2] !== "dependencies") {
          const mix = sub.oneOf || sub.anyOf;
          if (sub.enum && sub.oneOf) {
            sub.enum = sub.enum.filter((x) => utils_default.validate(x, mix));
          }
          return {
            thunk(rootSchema) {
              const copy = utils_default.omitProps(sub, ["anyOf", "oneOf"]);
              const fixed = random_default.pick(mix);
              utils_default.merge(copy, fixed);
              mix.forEach((omit) => {
                if (omit.required && omit !== fixed) {
                  omit.required.forEach((key) => {
                    const includesKey = copy.required && copy.required.includes(key);
                    if (copy.properties && !includesKey) {
                      delete copy.properties[key];
                    }
                    if (rootSchema && rootSchema.properties) {
                      delete rootSchema.properties[key];
                    }
                  });
                }
              });
              return copy;
            }
          };
        }
        Object.keys(sub).forEach((prop) => {
          if ((Array.isArray(sub[prop]) || typeof sub[prop] === "object") && !utils_default.isKey(prop)) {
            sub[prop] = recursiveUtil.resolveSchema(sub[prop], prop, rootPath.concat(prop));
          }
        });
        if (rootPath) {
          const lastProp = rootPath[rootPath.length - 1];
          if (lastProp === "properties" || lastProp === "items") {
            return sub;
          }
        }
        return container2.wrap(sub);
      };
      return recursiveUtil;
    };
    buildResolveSchema_default = buildResolveSchema;
  }
});

// src/lib/core/run.mjs
function pick2(data) {
  return Array.isArray(data) ? random_default.pick(data) : data;
}
function cycle(data, reverse) {
  if (!Array.isArray(data)) {
    return data;
  }
  const value = reverse ? data.pop() : data.shift();
  if (reverse) {
    data.unshift(value);
  } else {
    data.push(value);
  }
  return value;
}
function resolve(obj, data, values, property) {
  if (!obj || typeof obj !== "object") {
    return obj;
  }
  if (!values) {
    values = {};
  }
  if (!data) {
    data = obj;
  }
  if (Array.isArray(obj)) {
    return obj.map((x) => resolve(x, data, values, property));
  }
  if (obj.jsonPath) {
    const { JSONPath: JSONPath2 } = getDependencies();
    const params = typeof obj.jsonPath !== "object" ? { path: obj.jsonPath } : obj.jsonPath;
    params.group = obj.group || params.group || property;
    params.cycle = obj.cycle || params.cycle || false;
    params.reverse = obj.reverse || params.reverse || false;
    params.count = obj.count || params.count || 1;
    const key = `${params.group}__${params.path}`;
    if (!values[key]) {
      if (params.count > 1) {
        values[key] = JSONPath2(params.path, data).slice(0, params.count);
      } else {
        values[key] = JSONPath2(params.path, data);
      }
    }
    if (params.cycle || params.reverse) {
      return cycle(values[key], params.reverse);
    }
    return pick2(values[key]);
  }
  Object.keys(obj).forEach((k) => {
    obj[k] = resolve(obj[k], data, values, k);
  });
  return obj;
}
function run(refs, schema, container2, synchronous) {
  if (Object.prototype.toString.call(schema) !== "[object Object]") {
    throw new Error(`Invalid input, expecting object but given ${typeof schema}`);
  }
  const refDepthMin = option_default("refDepthMin") || 0;
  const refDepthMax = option_default("refDepthMax") || 3;
  try {
    const { resolveSchema } = buildResolveSchema_default({
      refs,
      schema,
      container: container2,
      synchronous,
      refDepthMin,
      refDepthMax
    });
    const result = traverse_default(utils_default.clone(schema), [], resolveSchema);
    if (option_default("resolveJsonPath")) {
      return {
        value: resolve(result.value),
        context: result.context
      };
    }
    return result;
  } catch (e) {
    if (e.path) {
      throw new Error(`${e.message} in /${e.path.join("/")}`);
    } else {
      throw e;
    }
  }
}
var run_default;
var init_run = __esm({
  "src/lib/core/run.mjs"() {
    init_vendor();
    init_option();
    init_traverse();
    init_random();
    init_utils();
    init_buildResolveSchema();
    run_default = run;
  }
});

// src/lib/renderers/js.mjs
function renderJS(res) {
  return res.value;
}
var js_default;
var init_js = __esm({
  "src/lib/renderers/js.mjs"() {
    js_default = renderJS;
  }
});

// node_modules/yaml/dist/PlainValue-ec8e588e.js
var require_PlainValue_ec8e588e = __commonJS({
  "node_modules/yaml/dist/PlainValue-ec8e588e.js"(exports2) {
    "use strict";
    var Char = {
      ANCHOR: "&",
      COMMENT: "#",
      TAG: "!",
      DIRECTIVES_END: "-",
      DOCUMENT_END: "."
    };
    var Type = {
      ALIAS: "ALIAS",
      BLANK_LINE: "BLANK_LINE",
      BLOCK_FOLDED: "BLOCK_FOLDED",
      BLOCK_LITERAL: "BLOCK_LITERAL",
      COMMENT: "COMMENT",
      DIRECTIVE: "DIRECTIVE",
      DOCUMENT: "DOCUMENT",
      FLOW_MAP: "FLOW_MAP",
      FLOW_SEQ: "FLOW_SEQ",
      MAP: "MAP",
      MAP_KEY: "MAP_KEY",
      MAP_VALUE: "MAP_VALUE",
      PLAIN: "PLAIN",
      QUOTE_DOUBLE: "QUOTE_DOUBLE",
      QUOTE_SINGLE: "QUOTE_SINGLE",
      SEQ: "SEQ",
      SEQ_ITEM: "SEQ_ITEM"
    };
    var defaultTagPrefix = "tag:yaml.org,2002:";
    var defaultTags = {
      MAP: "tag:yaml.org,2002:map",
      SEQ: "tag:yaml.org,2002:seq",
      STR: "tag:yaml.org,2002:str"
    };
    function findLineStarts(src) {
      const ls = [0];
      let offset = src.indexOf("\n");
      while (offset !== -1) {
        offset += 1;
        ls.push(offset);
        offset = src.indexOf("\n", offset);
      }
      return ls;
    }
    function getSrcInfo(cst) {
      let lineStarts, src;
      if (typeof cst === "string") {
        lineStarts = findLineStarts(cst);
        src = cst;
      } else {
        if (Array.isArray(cst))
          cst = cst[0];
        if (cst && cst.context) {
          if (!cst.lineStarts)
            cst.lineStarts = findLineStarts(cst.context.src);
          lineStarts = cst.lineStarts;
          src = cst.context.src;
        }
      }
      return {
        lineStarts,
        src
      };
    }
    function getLinePos(offset, cst) {
      if (typeof offset !== "number" || offset < 0)
        return null;
      const {
        lineStarts,
        src
      } = getSrcInfo(cst);
      if (!lineStarts || !src || offset > src.length)
        return null;
      for (let i = 0; i < lineStarts.length; ++i) {
        const start = lineStarts[i];
        if (offset < start) {
          return {
            line: i,
            col: offset - lineStarts[i - 1] + 1
          };
        }
        if (offset === start)
          return {
            line: i + 1,
            col: 1
          };
      }
      const line = lineStarts.length;
      return {
        line,
        col: offset - lineStarts[line - 1] + 1
      };
    }
    function getLine(line, cst) {
      const {
        lineStarts,
        src
      } = getSrcInfo(cst);
      if (!lineStarts || !(line >= 1) || line > lineStarts.length)
        return null;
      const start = lineStarts[line - 1];
      let end = lineStarts[line];
      while (end && end > start && src[end - 1] === "\n")
        --end;
      return src.slice(start, end);
    }
    function getPrettyContext({
      start,
      end
    }, cst, maxWidth = 80) {
      let src = getLine(start.line, cst);
      if (!src)
        return null;
      let {
        col
      } = start;
      if (src.length > maxWidth) {
        if (col <= maxWidth - 10) {
          src = src.substr(0, maxWidth - 1) + "\u2026";
        } else {
          const halfWidth = Math.round(maxWidth / 2);
          if (src.length > col + halfWidth)
            src = src.substr(0, col + halfWidth - 1) + "\u2026";
          col -= src.length - maxWidth;
          src = "\u2026" + src.substr(1 - maxWidth);
        }
      }
      let errLen = 1;
      let errEnd = "";
      if (end) {
        if (end.line === start.line && col + (end.col - start.col) <= maxWidth + 1) {
          errLen = end.col - start.col;
        } else {
          errLen = Math.min(src.length + 1, maxWidth) - col;
          errEnd = "\u2026";
        }
      }
      const offset = col > 1 ? " ".repeat(col - 1) : "";
      const err = "^".repeat(errLen);
      return `${src}
${offset}${err}${errEnd}`;
    }
    var Range = class _Range {
      static copy(orig) {
        return new _Range(orig.start, orig.end);
      }
      constructor(start, end) {
        this.start = start;
        this.end = end || start;
      }
      isEmpty() {
        return typeof this.start !== "number" || !this.end || this.end <= this.start;
      }
      /**
       * Set `origStart` and `origEnd` to point to the original source range for
       * this node, which may differ due to dropped CR characters.
       *
       * @param {number[]} cr - Positions of dropped CR characters
       * @param {number} offset - Starting index of `cr` from the last call
       * @returns {number} - The next offset, matching the one found for `origStart`
       */
      setOrigRange(cr, offset) {
        const {
          start,
          end
        } = this;
        if (cr.length === 0 || end <= cr[0]) {
          this.origStart = start;
          this.origEnd = end;
          return offset;
        }
        let i = offset;
        while (i < cr.length) {
          if (cr[i] > start)
            break;
          else
            ++i;
        }
        this.origStart = start + i;
        const nextOffset = i;
        while (i < cr.length) {
          if (cr[i] >= end)
            break;
          else
            ++i;
        }
        this.origEnd = end + i;
        return nextOffset;
      }
    };
    var Node2 = class _Node {
      static addStringTerminator(src, offset, str) {
        if (str[str.length - 1] === "\n")
          return str;
        const next = _Node.endOfWhiteSpace(src, offset);
        return next >= src.length || src[next] === "\n" ? str + "\n" : str;
      }
      // ^(---|...)
      static atDocumentBoundary(src, offset, sep) {
        const ch0 = src[offset];
        if (!ch0)
          return true;
        const prev = src[offset - 1];
        if (prev && prev !== "\n")
          return false;
        if (sep) {
          if (ch0 !== sep)
            return false;
        } else {
          if (ch0 !== Char.DIRECTIVES_END && ch0 !== Char.DOCUMENT_END)
            return false;
        }
        const ch1 = src[offset + 1];
        const ch2 = src[offset + 2];
        if (ch1 !== ch0 || ch2 !== ch0)
          return false;
        const ch3 = src[offset + 3];
        return !ch3 || ch3 === "\n" || ch3 === "	" || ch3 === " ";
      }
      static endOfIdentifier(src, offset) {
        let ch = src[offset];
        const isVerbatim = ch === "<";
        const notOk = isVerbatim ? ["\n", "	", " ", ">"] : ["\n", "	", " ", "[", "]", "{", "}", ","];
        while (ch && notOk.indexOf(ch) === -1)
          ch = src[offset += 1];
        if (isVerbatim && ch === ">")
          offset += 1;
        return offset;
      }
      static endOfIndent(src, offset) {
        let ch = src[offset];
        while (ch === " ")
          ch = src[offset += 1];
        return offset;
      }
      static endOfLine(src, offset) {
        let ch = src[offset];
        while (ch && ch !== "\n")
          ch = src[offset += 1];
        return offset;
      }
      static endOfWhiteSpace(src, offset) {
        let ch = src[offset];
        while (ch === "	" || ch === " ")
          ch = src[offset += 1];
        return offset;
      }
      static startOfLine(src, offset) {
        let ch = src[offset - 1];
        if (ch === "\n")
          return offset;
        while (ch && ch !== "\n")
          ch = src[offset -= 1];
        return offset + 1;
      }
      /**
       * End of indentation, or null if the line's indent level is not more
       * than `indent`
       *
       * @param {string} src
       * @param {number} indent
       * @param {number} lineStart
       * @returns {?number}
       */
      static endOfBlockIndent(src, indent, lineStart) {
        const inEnd = _Node.endOfIndent(src, lineStart);
        if (inEnd > lineStart + indent) {
          return inEnd;
        } else {
          const wsEnd = _Node.endOfWhiteSpace(src, inEnd);
          const ch = src[wsEnd];
          if (!ch || ch === "\n")
            return wsEnd;
        }
        return null;
      }
      static atBlank(src, offset, endAsBlank) {
        const ch = src[offset];
        return ch === "\n" || ch === "	" || ch === " " || endAsBlank && !ch;
      }
      static nextNodeIsIndented(ch, indentDiff, indicatorAsIndent) {
        if (!ch || indentDiff < 0)
          return false;
        if (indentDiff > 0)
          return true;
        return indicatorAsIndent && ch === "-";
      }
      // should be at line or string end, or at next non-whitespace char
      static normalizeOffset(src, offset) {
        const ch = src[offset];
        return !ch ? offset : ch !== "\n" && src[offset - 1] === "\n" ? offset - 1 : _Node.endOfWhiteSpace(src, offset);
      }
      // fold single newline into space, multiple newlines to N - 1 newlines
      // presumes src[offset] === '\n'
      static foldNewline(src, offset, indent) {
        let inCount = 0;
        let error = false;
        let fold = "";
        let ch = src[offset + 1];
        while (ch === " " || ch === "	" || ch === "\n") {
          switch (ch) {
            case "\n":
              inCount = 0;
              offset += 1;
              fold += "\n";
              break;
            case "	":
              if (inCount <= indent)
                error = true;
              offset = _Node.endOfWhiteSpace(src, offset + 2) - 1;
              break;
            case " ":
              inCount += 1;
              offset += 1;
              break;
          }
          ch = src[offset + 1];
        }
        if (!fold)
          fold = " ";
        if (ch && inCount <= indent)
          error = true;
        return {
          fold,
          offset,
          error
        };
      }
      constructor(type, props, context) {
        Object.defineProperty(this, "context", {
          value: context || null,
          writable: true
        });
        this.error = null;
        this.range = null;
        this.valueRange = null;
        this.props = props || [];
        this.type = type;
        this.value = null;
      }
      getPropValue(idx, key, skipKey) {
        if (!this.context)
          return null;
        const {
          src
        } = this.context;
        const prop = this.props[idx];
        return prop && src[prop.start] === key ? src.slice(prop.start + (skipKey ? 1 : 0), prop.end) : null;
      }
      get anchor() {
        for (let i = 0; i < this.props.length; ++i) {
          const anchor = this.getPropValue(i, Char.ANCHOR, true);
          if (anchor != null)
            return anchor;
        }
        return null;
      }
      get comment() {
        const comments = [];
        for (let i = 0; i < this.props.length; ++i) {
          const comment = this.getPropValue(i, Char.COMMENT, true);
          if (comment != null)
            comments.push(comment);
        }
        return comments.length > 0 ? comments.join("\n") : null;
      }
      commentHasRequiredWhitespace(start) {
        const {
          src
        } = this.context;
        if (this.header && start === this.header.end)
          return false;
        if (!this.valueRange)
          return false;
        const {
          end
        } = this.valueRange;
        return start !== end || _Node.atBlank(src, end - 1);
      }
      get hasComment() {
        if (this.context) {
          const {
            src
          } = this.context;
          for (let i = 0; i < this.props.length; ++i) {
            if (src[this.props[i].start] === Char.COMMENT)
              return true;
          }
        }
        return false;
      }
      get hasProps() {
        if (this.context) {
          const {
            src
          } = this.context;
          for (let i = 0; i < this.props.length; ++i) {
            if (src[this.props[i].start] !== Char.COMMENT)
              return true;
          }
        }
        return false;
      }
      get includesTrailingLines() {
        return false;
      }
      get jsonLike() {
        const jsonLikeTypes = [Type.FLOW_MAP, Type.FLOW_SEQ, Type.QUOTE_DOUBLE, Type.QUOTE_SINGLE];
        return jsonLikeTypes.indexOf(this.type) !== -1;
      }
      get rangeAsLinePos() {
        if (!this.range || !this.context)
          return void 0;
        const start = getLinePos(this.range.start, this.context.root);
        if (!start)
          return void 0;
        const end = getLinePos(this.range.end, this.context.root);
        return {
          start,
          end
        };
      }
      get rawValue() {
        if (!this.valueRange || !this.context)
          return null;
        const {
          start,
          end
        } = this.valueRange;
        return this.context.src.slice(start, end);
      }
      get tag() {
        for (let i = 0; i < this.props.length; ++i) {
          const tag = this.getPropValue(i, Char.TAG, false);
          if (tag != null) {
            if (tag[1] === "<") {
              return {
                verbatim: tag.slice(2, -1)
              };
            } else {
              const [_, handle, suffix] = tag.match(/^(.*!)([^!]*)$/);
              return {
                handle,
                suffix
              };
            }
          }
        }
        return null;
      }
      get valueRangeContainsNewline() {
        if (!this.valueRange || !this.context)
          return false;
        const {
          start,
          end
        } = this.valueRange;
        const {
          src
        } = this.context;
        for (let i = start; i < end; ++i) {
          if (src[i] === "\n")
            return true;
        }
        return false;
      }
      parseComment(start) {
        const {
          src
        } = this.context;
        if (src[start] === Char.COMMENT) {
          const end = _Node.endOfLine(src, start + 1);
          const commentRange = new Range(start, end);
          this.props.push(commentRange);
          return end;
        }
        return start;
      }
      /**
       * Populates the `origStart` and `origEnd` values of all ranges for this
       * node. Extended by child classes to handle descendant nodes.
       *
       * @param {number[]} cr - Positions of dropped CR characters
       * @param {number} offset - Starting index of `cr` from the last call
       * @returns {number} - The next offset, matching the one found for `origStart`
       */
      setOrigRanges(cr, offset) {
        if (this.range)
          offset = this.range.setOrigRange(cr, offset);
        if (this.valueRange)
          this.valueRange.setOrigRange(cr, offset);
        this.props.forEach((prop) => prop.setOrigRange(cr, offset));
        return offset;
      }
      toString() {
        const {
          context: {
            src
          },
          range,
          value
        } = this;
        if (value != null)
          return value;
        const str = src.slice(range.start, range.end);
        return _Node.addStringTerminator(src, range.end, str);
      }
    };
    var YAMLError = class extends Error {
      constructor(name, source, message) {
        if (!message || !(source instanceof Node2))
          throw new Error(`Invalid arguments for new ${name}`);
        super();
        this.name = name;
        this.message = message;
        this.source = source;
      }
      makePretty() {
        if (!this.source)
          return;
        this.nodeType = this.source.type;
        const cst = this.source.context && this.source.context.root;
        if (typeof this.offset === "number") {
          this.range = new Range(this.offset, this.offset + 1);
          const start = cst && getLinePos(this.offset, cst);
          if (start) {
            const end = {
              line: start.line,
              col: start.col + 1
            };
            this.linePos = {
              start,
              end
            };
          }
          delete this.offset;
        } else {
          this.range = this.source.range;
          this.linePos = this.source.rangeAsLinePos;
        }
        if (this.linePos) {
          const {
            line,
            col
          } = this.linePos.start;
          this.message += ` at line ${line}, column ${col}`;
          const ctx = cst && getPrettyContext(this.linePos, cst);
          if (ctx)
            this.message += `:

${ctx}
`;
        }
        delete this.source;
      }
    };
    var YAMLReferenceError = class extends YAMLError {
      constructor(source, message) {
        super("YAMLReferenceError", source, message);
      }
    };
    var YAMLSemanticError = class extends YAMLError {
      constructor(source, message) {
        super("YAMLSemanticError", source, message);
      }
    };
    var YAMLSyntaxError = class extends YAMLError {
      constructor(source, message) {
        super("YAMLSyntaxError", source, message);
      }
    };
    var YAMLWarning = class extends YAMLError {
      constructor(source, message) {
        super("YAMLWarning", source, message);
      }
    };
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, {
          value,
          enumerable: true,
          configurable: true,
          writable: true
        });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    var PlainValue = class _PlainValue extends Node2 {
      static endOfLine(src, start, inFlow) {
        let ch = src[start];
        let offset = start;
        while (ch && ch !== "\n") {
          if (inFlow && (ch === "[" || ch === "]" || ch === "{" || ch === "}" || ch === ","))
            break;
          const next = src[offset + 1];
          if (ch === ":" && (!next || next === "\n" || next === "	" || next === " " || inFlow && next === ","))
            break;
          if ((ch === " " || ch === "	") && next === "#")
            break;
          offset += 1;
          ch = next;
        }
        return offset;
      }
      get strValue() {
        if (!this.valueRange || !this.context)
          return null;
        let {
          start,
          end
        } = this.valueRange;
        const {
          src
        } = this.context;
        let ch = src[end - 1];
        while (start < end && (ch === "\n" || ch === "	" || ch === " "))
          ch = src[--end - 1];
        let str = "";
        for (let i = start; i < end; ++i) {
          const ch2 = src[i];
          if (ch2 === "\n") {
            const {
              fold,
              offset
            } = Node2.foldNewline(src, i, -1);
            str += fold;
            i = offset;
          } else if (ch2 === " " || ch2 === "	") {
            const wsStart = i;
            let next = src[i + 1];
            while (i < end && (next === " " || next === "	")) {
              i += 1;
              next = src[i + 1];
            }
            if (next !== "\n")
              str += i > wsStart ? src.slice(wsStart, i + 1) : ch2;
          } else {
            str += ch2;
          }
        }
        const ch0 = src[start];
        switch (ch0) {
          case "	": {
            const msg = "Plain value cannot start with a tab character";
            const errors = [new YAMLSemanticError(this, msg)];
            return {
              errors,
              str
            };
          }
          case "@":
          case "`": {
            const msg = `Plain value cannot start with reserved character ${ch0}`;
            const errors = [new YAMLSemanticError(this, msg)];
            return {
              errors,
              str
            };
          }
          default:
            return str;
        }
      }
      parseBlockValue(start) {
        const {
          indent,
          inFlow,
          src
        } = this.context;
        let offset = start;
        let valueEnd = start;
        for (let ch = src[offset]; ch === "\n"; ch = src[offset]) {
          if (Node2.atDocumentBoundary(src, offset + 1))
            break;
          const end = Node2.endOfBlockIndent(src, indent, offset + 1);
          if (end === null || src[end] === "#")
            break;
          if (src[end] === "\n") {
            offset = end;
          } else {
            valueEnd = _PlainValue.endOfLine(src, end, inFlow);
            offset = valueEnd;
          }
        }
        if (this.valueRange.isEmpty())
          this.valueRange.start = start;
        this.valueRange.end = valueEnd;
        return valueEnd;
      }
      /**
       * Parses a plain value from the source
       *
       * Accepted forms are:
       * ```
       * #comment
       *
       * first line
       *
       * first line #comment
       *
       * first line
       * block
       * lines
       *
       * #comment
       * block
       * lines
       * ```
       * where block lines are empty or have an indent level greater than `indent`.
       *
       * @param {ParseContext} context
       * @param {number} start - Index of first character
       * @returns {number} - Index of the character after this scalar, may be `\n`
       */
      parse(context, start) {
        this.context = context;
        const {
          inFlow,
          src
        } = context;
        let offset = start;
        const ch = src[offset];
        if (ch && ch !== "#" && ch !== "\n") {
          offset = _PlainValue.endOfLine(src, start, inFlow);
        }
        this.valueRange = new Range(start, offset);
        offset = Node2.endOfWhiteSpace(src, offset);
        offset = this.parseComment(offset);
        if (!this.hasComment || this.valueRange.isEmpty()) {
          offset = this.parseBlockValue(offset);
        }
        return offset;
      }
    };
    exports2.Char = Char;
    exports2.Node = Node2;
    exports2.PlainValue = PlainValue;
    exports2.Range = Range;
    exports2.Type = Type;
    exports2.YAMLError = YAMLError;
    exports2.YAMLReferenceError = YAMLReferenceError;
    exports2.YAMLSemanticError = YAMLSemanticError;
    exports2.YAMLSyntaxError = YAMLSyntaxError;
    exports2.YAMLWarning = YAMLWarning;
    exports2._defineProperty = _defineProperty;
    exports2.defaultTagPrefix = defaultTagPrefix;
    exports2.defaultTags = defaultTags;
  }
});

// node_modules/yaml/dist/resolveSeq-d03cb037.js
var require_resolveSeq_d03cb037 = __commonJS({
  "node_modules/yaml/dist/resolveSeq-d03cb037.js"(exports2) {
    "use strict";
    var PlainValue = require_PlainValue_ec8e588e();
    function addCommentBefore(str, indent, comment) {
      if (!comment)
        return str;
      const cc = comment.replace(/[\s\S]^/gm, `$&${indent}#`);
      return `#${cc}
${indent}${str}`;
    }
    function addComment(str, indent, comment) {
      return !comment ? str : comment.indexOf("\n") === -1 ? `${str} #${comment}` : `${str}
` + comment.replace(/^/gm, `${indent || ""}#`);
    }
    var Node2 = class {
    };
    function toJSON(value, arg, ctx) {
      if (Array.isArray(value))
        return value.map((v, i) => toJSON(v, String(i), ctx));
      if (value && typeof value.toJSON === "function") {
        const anchor = ctx && ctx.anchors && ctx.anchors.get(value);
        if (anchor)
          ctx.onCreate = (res2) => {
            anchor.res = res2;
            delete ctx.onCreate;
          };
        const res = value.toJSON(arg, ctx);
        if (anchor && ctx.onCreate)
          ctx.onCreate(res);
        return res;
      }
      if ((!ctx || !ctx.keep) && typeof value === "bigint")
        return Number(value);
      return value;
    }
    var Scalar2 = class extends Node2 {
      constructor(value) {
        super();
        this.value = value;
      }
      toJSON(arg, ctx) {
        return ctx && ctx.keep ? this.value : toJSON(this.value, arg, ctx);
      }
      toString() {
        return String(this.value);
      }
    };
    function collectionFromPath(schema, path, value) {
      let v = value;
      for (let i = path.length - 1; i >= 0; --i) {
        const k = path[i];
        if (Number.isInteger(k) && k >= 0) {
          const a = [];
          a[k] = v;
          v = a;
        } else {
          const o = {};
          Object.defineProperty(o, k, {
            value: v,
            writable: true,
            enumerable: true,
            configurable: true
          });
          v = o;
        }
      }
      return schema.createNode(v, false);
    }
    var isEmptyPath = (path) => path == null || typeof path === "object" && path[Symbol.iterator]().next().done;
    var Collection2 = class _Collection extends Node2 {
      constructor(schema) {
        super();
        PlainValue._defineProperty(this, "items", []);
        this.schema = schema;
      }
      addIn(path, value) {
        if (isEmptyPath(path))
          this.add(value);
        else {
          const [key, ...rest] = path;
          const node = this.get(key, true);
          if (node instanceof _Collection)
            node.addIn(rest, value);
          else if (node === void 0 && this.schema)
            this.set(key, collectionFromPath(this.schema, rest, value));
          else
            throw new Error(`Expected YAML collection at ${key}. Remaining path: ${rest}`);
        }
      }
      deleteIn([key, ...rest]) {
        if (rest.length === 0)
          return this.delete(key);
        const node = this.get(key, true);
        if (node instanceof _Collection)
          return node.deleteIn(rest);
        else
          throw new Error(`Expected YAML collection at ${key}. Remaining path: ${rest}`);
      }
      getIn([key, ...rest], keepScalar) {
        const node = this.get(key, true);
        if (rest.length === 0)
          return !keepScalar && node instanceof Scalar2 ? node.value : node;
        else
          return node instanceof _Collection ? node.getIn(rest, keepScalar) : void 0;
      }
      hasAllNullValues() {
        return this.items.every((node) => {
          if (!node || node.type !== "PAIR")
            return false;
          const n = node.value;
          return n == null || n instanceof Scalar2 && n.value == null && !n.commentBefore && !n.comment && !n.tag;
        });
      }
      hasIn([key, ...rest]) {
        if (rest.length === 0)
          return this.has(key);
        const node = this.get(key, true);
        return node instanceof _Collection ? node.hasIn(rest) : false;
      }
      setIn([key, ...rest], value) {
        if (rest.length === 0) {
          this.set(key, value);
        } else {
          const node = this.get(key, true);
          if (node instanceof _Collection)
            node.setIn(rest, value);
          else if (node === void 0 && this.schema)
            this.set(key, collectionFromPath(this.schema, rest, value));
          else
            throw new Error(`Expected YAML collection at ${key}. Remaining path: ${rest}`);
        }
      }
      // overridden in implementations
      /* istanbul ignore next */
      toJSON() {
        return null;
      }
      toString(ctx, {
        blockItem,
        flowChars,
        isMap,
        itemIndent
      }, onComment, onChompKeep) {
        const {
          indent,
          indentStep,
          stringify
        } = ctx;
        const inFlow = this.type === PlainValue.Type.FLOW_MAP || this.type === PlainValue.Type.FLOW_SEQ || ctx.inFlow;
        if (inFlow)
          itemIndent += indentStep;
        const allNullValues = isMap && this.hasAllNullValues();
        ctx = Object.assign({}, ctx, {
          allNullValues,
          indent: itemIndent,
          inFlow,
          type: null
        });
        let chompKeep = false;
        let hasItemWithNewLine = false;
        const nodes = this.items.reduce((nodes2, item, i) => {
          let comment;
          if (item) {
            if (!chompKeep && item.spaceBefore)
              nodes2.push({
                type: "comment",
                str: ""
              });
            if (item.commentBefore)
              item.commentBefore.match(/^.*$/gm).forEach((line) => {
                nodes2.push({
                  type: "comment",
                  str: `#${line}`
                });
              });
            if (item.comment)
              comment = item.comment;
            if (inFlow && (!chompKeep && item.spaceBefore || item.commentBefore || item.comment || item.key && (item.key.commentBefore || item.key.comment) || item.value && (item.value.commentBefore || item.value.comment)))
              hasItemWithNewLine = true;
          }
          chompKeep = false;
          let str2 = stringify(item, ctx, () => comment = null, () => chompKeep = true);
          if (inFlow && !hasItemWithNewLine && str2.includes("\n"))
            hasItemWithNewLine = true;
          if (inFlow && i < this.items.length - 1)
            str2 += ",";
          str2 = addComment(str2, itemIndent, comment);
          if (chompKeep && (comment || inFlow))
            chompKeep = false;
          nodes2.push({
            type: "item",
            str: str2
          });
          return nodes2;
        }, []);
        let str;
        if (nodes.length === 0) {
          str = flowChars.start + flowChars.end;
        } else if (inFlow) {
          const {
            start,
            end
          } = flowChars;
          const strings = nodes.map((n) => n.str);
          if (hasItemWithNewLine || strings.reduce((sum, str2) => sum + str2.length + 2, 2) > _Collection.maxFlowStringSingleLineLength) {
            str = start;
            for (const s of strings) {
              str += s ? `
${indentStep}${indent}${s}` : "\n";
            }
            str += `
${indent}${end}`;
          } else {
            str = `${start} ${strings.join(" ")} ${end}`;
          }
        } else {
          const strings = nodes.map(blockItem);
          str = strings.shift();
          for (const s of strings)
            str += s ? `
${indent}${s}` : "\n";
        }
        if (this.comment) {
          str += "\n" + this.comment.replace(/^/gm, `${indent}#`);
          if (onComment)
            onComment();
        } else if (chompKeep && onChompKeep)
          onChompKeep();
        return str;
      }
    };
    PlainValue._defineProperty(Collection2, "maxFlowStringSingleLineLength", 60);
    function asItemIndex(key) {
      let idx = key instanceof Scalar2 ? key.value : key;
      if (idx && typeof idx === "string")
        idx = Number(idx);
      return Number.isInteger(idx) && idx >= 0 ? idx : null;
    }
    var YAMLSeq2 = class extends Collection2 {
      add(value) {
        this.items.push(value);
      }
      delete(key) {
        const idx = asItemIndex(key);
        if (typeof idx !== "number")
          return false;
        const del = this.items.splice(idx, 1);
        return del.length > 0;
      }
      get(key, keepScalar) {
        const idx = asItemIndex(key);
        if (typeof idx !== "number")
          return void 0;
        const it = this.items[idx];
        return !keepScalar && it instanceof Scalar2 ? it.value : it;
      }
      has(key) {
        const idx = asItemIndex(key);
        return typeof idx === "number" && idx < this.items.length;
      }
      set(key, value) {
        const idx = asItemIndex(key);
        if (typeof idx !== "number")
          throw new Error(`Expected a valid index, not ${key}.`);
        this.items[idx] = value;
      }
      toJSON(_, ctx) {
        const seq = [];
        if (ctx && ctx.onCreate)
          ctx.onCreate(seq);
        let i = 0;
        for (const item of this.items)
          seq.push(toJSON(item, String(i++), ctx));
        return seq;
      }
      toString(ctx, onComment, onChompKeep) {
        if (!ctx)
          return JSON.stringify(this);
        return super.toString(ctx, {
          blockItem: (n) => n.type === "comment" ? n.str : `- ${n.str}`,
          flowChars: {
            start: "[",
            end: "]"
          },
          isMap: false,
          itemIndent: (ctx.indent || "") + "  "
        }, onComment, onChompKeep);
      }
    };
    var stringifyKey = (key, jsKey, ctx) => {
      if (jsKey === null)
        return "";
      if (typeof jsKey !== "object")
        return String(jsKey);
      if (key instanceof Node2 && ctx && ctx.doc)
        return key.toString({
          anchors: /* @__PURE__ */ Object.create(null),
          doc: ctx.doc,
          indent: "",
          indentStep: ctx.indentStep,
          inFlow: true,
          inStringifyKey: true,
          stringify: ctx.stringify
        });
      return JSON.stringify(jsKey);
    };
    var Pair2 = class _Pair extends Node2 {
      constructor(key, value = null) {
        super();
        this.key = key;
        this.value = value;
        this.type = _Pair.Type.PAIR;
      }
      get commentBefore() {
        return this.key instanceof Node2 ? this.key.commentBefore : void 0;
      }
      set commentBefore(cb) {
        if (this.key == null)
          this.key = new Scalar2(null);
        if (this.key instanceof Node2)
          this.key.commentBefore = cb;
        else {
          const msg = "Pair.commentBefore is an alias for Pair.key.commentBefore. To set it, the key must be a Node.";
          throw new Error(msg);
        }
      }
      addToJSMap(ctx, map) {
        const key = toJSON(this.key, "", ctx);
        if (map instanceof Map) {
          const value = toJSON(this.value, key, ctx);
          map.set(key, value);
        } else if (map instanceof Set) {
          map.add(key);
        } else {
          const stringKey = stringifyKey(this.key, key, ctx);
          const value = toJSON(this.value, stringKey, ctx);
          if (stringKey in map)
            Object.defineProperty(map, stringKey, {
              value,
              writable: true,
              enumerable: true,
              configurable: true
            });
          else
            map[stringKey] = value;
        }
        return map;
      }
      toJSON(_, ctx) {
        const pair = ctx && ctx.mapAsMap ? /* @__PURE__ */ new Map() : {};
        return this.addToJSMap(ctx, pair);
      }
      toString(ctx, onComment, onChompKeep) {
        if (!ctx || !ctx.doc)
          return JSON.stringify(this);
        const {
          indent: indentSize,
          indentSeq,
          simpleKeys
        } = ctx.doc.options;
        let {
          key,
          value
        } = this;
        let keyComment = key instanceof Node2 && key.comment;
        if (simpleKeys) {
          if (keyComment) {
            throw new Error("With simple keys, key nodes cannot have comments");
          }
          if (key instanceof Collection2) {
            const msg = "With simple keys, collection cannot be used as a key value";
            throw new Error(msg);
          }
        }
        let explicitKey = !simpleKeys && (!key || keyComment || (key instanceof Node2 ? key instanceof Collection2 || key.type === PlainValue.Type.BLOCK_FOLDED || key.type === PlainValue.Type.BLOCK_LITERAL : typeof key === "object"));
        const {
          doc,
          indent,
          indentStep,
          stringify
        } = ctx;
        ctx = Object.assign({}, ctx, {
          implicitKey: !explicitKey,
          indent: indent + indentStep
        });
        let chompKeep = false;
        let str = stringify(key, ctx, () => keyComment = null, () => chompKeep = true);
        str = addComment(str, ctx.indent, keyComment);
        if (!explicitKey && str.length > 1024) {
          if (simpleKeys)
            throw new Error("With simple keys, single line scalar must not span more than 1024 characters");
          explicitKey = true;
        }
        if (ctx.allNullValues && !simpleKeys) {
          if (this.comment) {
            str = addComment(str, ctx.indent, this.comment);
            if (onComment)
              onComment();
          } else if (chompKeep && !keyComment && onChompKeep)
            onChompKeep();
          return ctx.inFlow && !explicitKey ? str : `? ${str}`;
        }
        str = explicitKey ? `? ${str}
${indent}:` : `${str}:`;
        if (this.comment) {
          str = addComment(str, ctx.indent, this.comment);
          if (onComment)
            onComment();
        }
        let vcb = "";
        let valueComment = null;
        if (value instanceof Node2) {
          if (value.spaceBefore)
            vcb = "\n";
          if (value.commentBefore) {
            const cs = value.commentBefore.replace(/^/gm, `${ctx.indent}#`);
            vcb += `
${cs}`;
          }
          valueComment = value.comment;
        } else if (value && typeof value === "object") {
          value = doc.schema.createNode(value, true);
        }
        ctx.implicitKey = false;
        if (!explicitKey && !this.comment && value instanceof Scalar2)
          ctx.indentAtStart = str.length + 1;
        chompKeep = false;
        if (!indentSeq && indentSize >= 2 && !ctx.inFlow && !explicitKey && value instanceof YAMLSeq2 && value.type !== PlainValue.Type.FLOW_SEQ && !value.tag && !doc.anchors.getName(value)) {
          ctx.indent = ctx.indent.substr(2);
        }
        const valueStr = stringify(value, ctx, () => valueComment = null, () => chompKeep = true);
        let ws = " ";
        if (vcb || this.comment) {
          ws = `${vcb}
${ctx.indent}`;
        } else if (!explicitKey && value instanceof Collection2) {
          const flow = valueStr[0] === "[" || valueStr[0] === "{";
          if (!flow || valueStr.includes("\n"))
            ws = `
${ctx.indent}`;
        } else if (valueStr[0] === "\n")
          ws = "";
        if (chompKeep && !valueComment && onChompKeep)
          onChompKeep();
        return addComment(str + ws + valueStr, ctx.indent, valueComment);
      }
    };
    PlainValue._defineProperty(Pair2, "Type", {
      PAIR: "PAIR",
      MERGE_PAIR: "MERGE_PAIR"
    });
    var getAliasCount = (node, anchors) => {
      if (node instanceof Alias2) {
        const anchor = anchors.get(node.source);
        return anchor.count * anchor.aliasCount;
      } else if (node instanceof Collection2) {
        let count = 0;
        for (const item of node.items) {
          const c = getAliasCount(item, anchors);
          if (c > count)
            count = c;
        }
        return count;
      } else if (node instanceof Pair2) {
        const kc = getAliasCount(node.key, anchors);
        const vc = getAliasCount(node.value, anchors);
        return Math.max(kc, vc);
      }
      return 1;
    };
    var Alias2 = class _Alias extends Node2 {
      static stringify({
        range,
        source
      }, {
        anchors,
        doc,
        implicitKey,
        inStringifyKey
      }) {
        let anchor = Object.keys(anchors).find((a) => anchors[a] === source);
        if (!anchor && inStringifyKey)
          anchor = doc.anchors.getName(source) || doc.anchors.newName();
        if (anchor)
          return `*${anchor}${implicitKey ? " " : ""}`;
        const msg = doc.anchors.getName(source) ? "Alias node must be after source node" : "Source node not found for alias node";
        throw new Error(`${msg} [${range}]`);
      }
      constructor(source) {
        super();
        this.source = source;
        this.type = PlainValue.Type.ALIAS;
      }
      set tag(t) {
        throw new Error("Alias nodes cannot have tags");
      }
      toJSON(arg, ctx) {
        if (!ctx)
          return toJSON(this.source, arg, ctx);
        const {
          anchors,
          maxAliasCount
        } = ctx;
        const anchor = anchors.get(this.source);
        if (!anchor || anchor.res === void 0) {
          const msg = "This should not happen: Alias anchor was not resolved?";
          if (this.cstNode)
            throw new PlainValue.YAMLReferenceError(this.cstNode, msg);
          else
            throw new ReferenceError(msg);
        }
        if (maxAliasCount >= 0) {
          anchor.count += 1;
          if (anchor.aliasCount === 0)
            anchor.aliasCount = getAliasCount(this.source, anchors);
          if (anchor.count * anchor.aliasCount > maxAliasCount) {
            const msg = "Excessive alias count indicates a resource exhaustion attack";
            if (this.cstNode)
              throw new PlainValue.YAMLReferenceError(this.cstNode, msg);
            else
              throw new ReferenceError(msg);
          }
        }
        return anchor.res;
      }
      // Only called when stringifying an alias mapping key while constructing
      // Object output.
      toString(ctx) {
        return _Alias.stringify(this, ctx);
      }
    };
    PlainValue._defineProperty(Alias2, "default", true);
    function findPair(items, key) {
      const k = key instanceof Scalar2 ? key.value : key;
      for (const it of items) {
        if (it instanceof Pair2) {
          if (it.key === key || it.key === k)
            return it;
          if (it.key && it.key.value === k)
            return it;
        }
      }
      return void 0;
    }
    var YAMLMap2 = class extends Collection2 {
      add(pair, overwrite) {
        if (!pair)
          pair = new Pair2(pair);
        else if (!(pair instanceof Pair2))
          pair = new Pair2(pair.key || pair, pair.value);
        const prev = findPair(this.items, pair.key);
        const sortEntries = this.schema && this.schema.sortMapEntries;
        if (prev) {
          if (overwrite)
            prev.value = pair.value;
          else
            throw new Error(`Key ${pair.key} already set`);
        } else if (sortEntries) {
          const i = this.items.findIndex((item) => sortEntries(pair, item) < 0);
          if (i === -1)
            this.items.push(pair);
          else
            this.items.splice(i, 0, pair);
        } else {
          this.items.push(pair);
        }
      }
      delete(key) {
        const it = findPair(this.items, key);
        if (!it)
          return false;
        const del = this.items.splice(this.items.indexOf(it), 1);
        return del.length > 0;
      }
      get(key, keepScalar) {
        const it = findPair(this.items, key);
        const node = it && it.value;
        return !keepScalar && node instanceof Scalar2 ? node.value : node;
      }
      has(key) {
        return !!findPair(this.items, key);
      }
      set(key, value) {
        this.add(new Pair2(key, value), true);
      }
      /**
       * @param {*} arg ignored
       * @param {*} ctx Conversion context, originally set in Document#toJSON()
       * @param {Class} Type If set, forces the returned collection type
       * @returns {*} Instance of Type, Map, or Object
       */
      toJSON(_, ctx, Type) {
        const map = Type ? new Type() : ctx && ctx.mapAsMap ? /* @__PURE__ */ new Map() : {};
        if (ctx && ctx.onCreate)
          ctx.onCreate(map);
        for (const item of this.items)
          item.addToJSMap(ctx, map);
        return map;
      }
      toString(ctx, onComment, onChompKeep) {
        if (!ctx)
          return JSON.stringify(this);
        for (const item of this.items) {
          if (!(item instanceof Pair2))
            throw new Error(`Map items must all be pairs; found ${JSON.stringify(item)} instead`);
        }
        return super.toString(ctx, {
          blockItem: (n) => n.str,
          flowChars: {
            start: "{",
            end: "}"
          },
          isMap: true,
          itemIndent: ctx.indent || ""
        }, onComment, onChompKeep);
      }
    };
    var MERGE_KEY = "<<";
    var Merge2 = class extends Pair2 {
      constructor(pair) {
        if (pair instanceof Pair2) {
          let seq = pair.value;
          if (!(seq instanceof YAMLSeq2)) {
            seq = new YAMLSeq2();
            seq.items.push(pair.value);
            seq.range = pair.value.range;
          }
          super(pair.key, seq);
          this.range = pair.range;
        } else {
          super(new Scalar2(MERGE_KEY), new YAMLSeq2());
        }
        this.type = Pair2.Type.MERGE_PAIR;
      }
      // If the value associated with a merge key is a single mapping node, each of
      // its key/value pairs is inserted into the current mapping, unless the key
      // already exists in it. If the value associated with the merge key is a
      // sequence, then this sequence is expected to contain mapping nodes and each
      // of these nodes is merged in turn according to its order in the sequence.
      // Keys in mapping nodes earlier in the sequence override keys specified in
      // later mapping nodes. -- http://yaml.org/type/merge.html
      addToJSMap(ctx, map) {
        for (const {
          source
        } of this.value.items) {
          if (!(source instanceof YAMLMap2))
            throw new Error("Merge sources must be maps");
          const srcMap = source.toJSON(null, ctx, Map);
          for (const [key, value] of srcMap) {
            if (map instanceof Map) {
              if (!map.has(key))
                map.set(key, value);
            } else if (map instanceof Set) {
              map.add(key);
            } else if (!Object.prototype.hasOwnProperty.call(map, key)) {
              Object.defineProperty(map, key, {
                value,
                writable: true,
                enumerable: true,
                configurable: true
              });
            }
          }
        }
        return map;
      }
      toString(ctx, onComment) {
        const seq = this.value;
        if (seq.items.length > 1)
          return super.toString(ctx, onComment);
        this.value = seq.items[0];
        const str = super.toString(ctx, onComment);
        this.value = seq;
        return str;
      }
    };
    var binaryOptions2 = {
      defaultType: PlainValue.Type.BLOCK_LITERAL,
      lineWidth: 76
    };
    var boolOptions2 = {
      trueStr: "true",
      falseStr: "false"
    };
    var intOptions2 = {
      asBigInt: false
    };
    var nullOptions2 = {
      nullStr: "null"
    };
    var strOptions2 = {
      defaultType: PlainValue.Type.PLAIN,
      doubleQuoted: {
        jsonEncoding: false,
        minMultiLineLength: 40
      },
      fold: {
        lineWidth: 80,
        minContentWidth: 20
      }
    };
    function resolveScalar(str, tags, scalarFallback) {
      for (const {
        format,
        test,
        resolve: resolve2
      } of tags) {
        if (test) {
          const match = str.match(test);
          if (match) {
            let res = resolve2.apply(null, match);
            if (!(res instanceof Scalar2))
              res = new Scalar2(res);
            if (format)
              res.format = format;
            return res;
          }
        }
      }
      if (scalarFallback)
        str = scalarFallback(str);
      return new Scalar2(str);
    }
    var FOLD_FLOW = "flow";
    var FOLD_BLOCK = "block";
    var FOLD_QUOTED = "quoted";
    var consumeMoreIndentedLines = (text, i) => {
      let ch = text[i + 1];
      while (ch === " " || ch === "	") {
        do {
          ch = text[i += 1];
        } while (ch && ch !== "\n");
        ch = text[i + 1];
      }
      return i;
    };
    function foldFlowLines(text, indent, mode, {
      indentAtStart,
      lineWidth = 80,
      minContentWidth = 20,
      onFold,
      onOverflow
    }) {
      if (!lineWidth || lineWidth < 0)
        return text;
      const endStep = Math.max(1 + minContentWidth, 1 + lineWidth - indent.length);
      if (text.length <= endStep)
        return text;
      const folds = [];
      const escapedFolds = {};
      let end = lineWidth - indent.length;
      if (typeof indentAtStart === "number") {
        if (indentAtStart > lineWidth - Math.max(2, minContentWidth))
          folds.push(0);
        else
          end = lineWidth - indentAtStart;
      }
      let split = void 0;
      let prev = void 0;
      let overflow = false;
      let i = -1;
      let escStart = -1;
      let escEnd = -1;
      if (mode === FOLD_BLOCK) {
        i = consumeMoreIndentedLines(text, i);
        if (i !== -1)
          end = i + endStep;
      }
      for (let ch; ch = text[i += 1]; ) {
        if (mode === FOLD_QUOTED && ch === "\\") {
          escStart = i;
          switch (text[i + 1]) {
            case "x":
              i += 3;
              break;
            case "u":
              i += 5;
              break;
            case "U":
              i += 9;
              break;
            default:
              i += 1;
          }
          escEnd = i;
        }
        if (ch === "\n") {
          if (mode === FOLD_BLOCK)
            i = consumeMoreIndentedLines(text, i);
          end = i + endStep;
          split = void 0;
        } else {
          if (ch === " " && prev && prev !== " " && prev !== "\n" && prev !== "	") {
            const next = text[i + 1];
            if (next && next !== " " && next !== "\n" && next !== "	")
              split = i;
          }
          if (i >= end) {
            if (split) {
              folds.push(split);
              end = split + endStep;
              split = void 0;
            } else if (mode === FOLD_QUOTED) {
              while (prev === " " || prev === "	") {
                prev = ch;
                ch = text[i += 1];
                overflow = true;
              }
              const j = i > escEnd + 1 ? i - 2 : escStart - 1;
              if (escapedFolds[j])
                return text;
              folds.push(j);
              escapedFolds[j] = true;
              end = j + endStep;
              split = void 0;
            } else {
              overflow = true;
            }
          }
        }
        prev = ch;
      }
      if (overflow && onOverflow)
        onOverflow();
      if (folds.length === 0)
        return text;
      if (onFold)
        onFold();
      let res = text.slice(0, folds[0]);
      for (let i2 = 0; i2 < folds.length; ++i2) {
        const fold = folds[i2];
        const end2 = folds[i2 + 1] || text.length;
        if (fold === 0)
          res = `
${indent}${text.slice(0, end2)}`;
        else {
          if (mode === FOLD_QUOTED && escapedFolds[fold])
            res += `${text[fold]}\\`;
          res += `
${indent}${text.slice(fold + 1, end2)}`;
        }
      }
      return res;
    }
    var getFoldOptions = ({
      indentAtStart
    }) => indentAtStart ? Object.assign({
      indentAtStart
    }, strOptions2.fold) : strOptions2.fold;
    var containsDocumentMarker = (str) => /^(%|---|\.\.\.)/m.test(str);
    function lineLengthOverLimit(str, lineWidth, indentLength) {
      if (!lineWidth || lineWidth < 0)
        return false;
      const limit = lineWidth - indentLength;
      const strLen = str.length;
      if (strLen <= limit)
        return false;
      for (let i = 0, start = 0; i < strLen; ++i) {
        if (str[i] === "\n") {
          if (i - start > limit)
            return true;
          start = i + 1;
          if (strLen - start <= limit)
            return false;
        }
      }
      return true;
    }
    function doubleQuotedString(value, ctx) {
      const {
        implicitKey
      } = ctx;
      const {
        jsonEncoding,
        minMultiLineLength
      } = strOptions2.doubleQuoted;
      const json = JSON.stringify(value);
      if (jsonEncoding)
        return json;
      const indent = ctx.indent || (containsDocumentMarker(value) ? "  " : "");
      let str = "";
      let start = 0;
      for (let i = 0, ch = json[i]; ch; ch = json[++i]) {
        if (ch === " " && json[i + 1] === "\\" && json[i + 2] === "n") {
          str += json.slice(start, i) + "\\ ";
          i += 1;
          start = i;
          ch = "\\";
        }
        if (ch === "\\")
          switch (json[i + 1]) {
            case "u":
              {
                str += json.slice(start, i);
                const code = json.substr(i + 2, 4);
                switch (code) {
                  case "0000":
                    str += "\\0";
                    break;
                  case "0007":
                    str += "\\a";
                    break;
                  case "000b":
                    str += "\\v";
                    break;
                  case "001b":
                    str += "\\e";
                    break;
                  case "0085":
                    str += "\\N";
                    break;
                  case "00a0":
                    str += "\\_";
                    break;
                  case "2028":
                    str += "\\L";
                    break;
                  case "2029":
                    str += "\\P";
                    break;
                  default:
                    if (code.substr(0, 2) === "00")
                      str += "\\x" + code.substr(2);
                    else
                      str += json.substr(i, 6);
                }
                i += 5;
                start = i + 1;
              }
              break;
            case "n":
              if (implicitKey || json[i + 2] === '"' || json.length < minMultiLineLength) {
                i += 1;
              } else {
                str += json.slice(start, i) + "\n\n";
                while (json[i + 2] === "\\" && json[i + 3] === "n" && json[i + 4] !== '"') {
                  str += "\n";
                  i += 2;
                }
                str += indent;
                if (json[i + 2] === " ")
                  str += "\\";
                i += 1;
                start = i + 1;
              }
              break;
            default:
              i += 1;
          }
      }
      str = start ? str + json.slice(start) : json;
      return implicitKey ? str : foldFlowLines(str, indent, FOLD_QUOTED, getFoldOptions(ctx));
    }
    function singleQuotedString(value, ctx) {
      if (ctx.implicitKey) {
        if (/\n/.test(value))
          return doubleQuotedString(value, ctx);
      } else {
        if (/[ \t]\n|\n[ \t]/.test(value))
          return doubleQuotedString(value, ctx);
      }
      const indent = ctx.indent || (containsDocumentMarker(value) ? "  " : "");
      const res = "'" + value.replace(/'/g, "''").replace(/\n+/g, `$&
${indent}`) + "'";
      return ctx.implicitKey ? res : foldFlowLines(res, indent, FOLD_FLOW, getFoldOptions(ctx));
    }
    function blockString({
      comment,
      type,
      value
    }, ctx, onComment, onChompKeep) {
      if (/\n[\t ]+$/.test(value) || /^\s*$/.test(value)) {
        return doubleQuotedString(value, ctx);
      }
      const indent = ctx.indent || (ctx.forceBlockIndent || containsDocumentMarker(value) ? "  " : "");
      const indentSize = indent ? "2" : "1";
      const literal = type === PlainValue.Type.BLOCK_FOLDED ? false : type === PlainValue.Type.BLOCK_LITERAL ? true : !lineLengthOverLimit(value, strOptions2.fold.lineWidth, indent.length);
      let header = literal ? "|" : ">";
      if (!value)
        return header + "\n";
      let wsStart = "";
      let wsEnd = "";
      value = value.replace(/[\n\t ]*$/, (ws) => {
        const n = ws.indexOf("\n");
        if (n === -1) {
          header += "-";
        } else if (value === ws || n !== ws.length - 1) {
          header += "+";
          if (onChompKeep)
            onChompKeep();
        }
        wsEnd = ws.replace(/\n$/, "");
        return "";
      }).replace(/^[\n ]*/, (ws) => {
        if (ws.indexOf(" ") !== -1)
          header += indentSize;
        const m = ws.match(/ +$/);
        if (m) {
          wsStart = ws.slice(0, -m[0].length);
          return m[0];
        } else {
          wsStart = ws;
          return "";
        }
      });
      if (wsEnd)
        wsEnd = wsEnd.replace(/\n+(?!\n|$)/g, `$&${indent}`);
      if (wsStart)
        wsStart = wsStart.replace(/\n+/g, `$&${indent}`);
      if (comment) {
        header += " #" + comment.replace(/ ?[\r\n]+/g, " ");
        if (onComment)
          onComment();
      }
      if (!value)
        return `${header}${indentSize}
${indent}${wsEnd}`;
      if (literal) {
        value = value.replace(/\n+/g, `$&${indent}`);
        return `${header}
${indent}${wsStart}${value}${wsEnd}`;
      }
      value = value.replace(/\n+/g, "\n$&").replace(/(?:^|\n)([\t ].*)(?:([\n\t ]*)\n(?![\n\t ]))?/g, "$1$2").replace(/\n+/g, `$&${indent}`);
      const body = foldFlowLines(`${wsStart}${value}${wsEnd}`, indent, FOLD_BLOCK, strOptions2.fold);
      return `${header}
${indent}${body}`;
    }
    function plainString(item, ctx, onComment, onChompKeep) {
      const {
        comment,
        type,
        value
      } = item;
      const {
        actualString,
        implicitKey,
        indent,
        inFlow
      } = ctx;
      if (implicitKey && /[\n[\]{},]/.test(value) || inFlow && /[[\]{},]/.test(value)) {
        return doubleQuotedString(value, ctx);
      }
      if (!value || /^[\n\t ,[\]{}#&*!|>'"%@`]|^[?-]$|^[?-][ \t]|[\n:][ \t]|[ \t]\n|[\n\t ]#|[\n\t :]$/.test(value)) {
        return implicitKey || inFlow || value.indexOf("\n") === -1 ? value.indexOf('"') !== -1 && value.indexOf("'") === -1 ? singleQuotedString(value, ctx) : doubleQuotedString(value, ctx) : blockString(item, ctx, onComment, onChompKeep);
      }
      if (!implicitKey && !inFlow && type !== PlainValue.Type.PLAIN && value.indexOf("\n") !== -1) {
        return blockString(item, ctx, onComment, onChompKeep);
      }
      if (indent === "" && containsDocumentMarker(value)) {
        ctx.forceBlockIndent = true;
        return blockString(item, ctx, onComment, onChompKeep);
      }
      const str = value.replace(/\n+/g, `$&
${indent}`);
      if (actualString) {
        const {
          tags
        } = ctx.doc.schema;
        const resolved = resolveScalar(str, tags, tags.scalarFallback).value;
        if (typeof resolved !== "string")
          return doubleQuotedString(value, ctx);
      }
      const body = implicitKey ? str : foldFlowLines(str, indent, FOLD_FLOW, getFoldOptions(ctx));
      if (comment && !inFlow && (body.indexOf("\n") !== -1 || comment.indexOf("\n") !== -1)) {
        if (onComment)
          onComment();
        return addCommentBefore(body, indent, comment);
      }
      return body;
    }
    function stringifyString(item, ctx, onComment, onChompKeep) {
      const {
        defaultType
      } = strOptions2;
      const {
        implicitKey,
        inFlow
      } = ctx;
      let {
        type,
        value
      } = item;
      if (typeof value !== "string") {
        value = String(value);
        item = Object.assign({}, item, {
          value
        });
      }
      const _stringify = (_type) => {
        switch (_type) {
          case PlainValue.Type.BLOCK_FOLDED:
          case PlainValue.Type.BLOCK_LITERAL:
            return blockString(item, ctx, onComment, onChompKeep);
          case PlainValue.Type.QUOTE_DOUBLE:
            return doubleQuotedString(value, ctx);
          case PlainValue.Type.QUOTE_SINGLE:
            return singleQuotedString(value, ctx);
          case PlainValue.Type.PLAIN:
            return plainString(item, ctx, onComment, onChompKeep);
          default:
            return null;
        }
      };
      if (type !== PlainValue.Type.QUOTE_DOUBLE && /[\x00-\x08\x0b-\x1f\x7f-\x9f]/.test(value)) {
        type = PlainValue.Type.QUOTE_DOUBLE;
      } else if ((implicitKey || inFlow) && (type === PlainValue.Type.BLOCK_FOLDED || type === PlainValue.Type.BLOCK_LITERAL)) {
        type = PlainValue.Type.QUOTE_DOUBLE;
      }
      let res = _stringify(type);
      if (res === null) {
        res = _stringify(defaultType);
        if (res === null)
          throw new Error(`Unsupported default string type ${defaultType}`);
      }
      return res;
    }
    function stringifyNumber({
      format,
      minFractionDigits,
      tag,
      value
    }) {
      if (typeof value === "bigint")
        return String(value);
      if (!isFinite(value))
        return isNaN(value) ? ".nan" : value < 0 ? "-.inf" : ".inf";
      let n = JSON.stringify(value);
      if (!format && minFractionDigits && (!tag || tag === "tag:yaml.org,2002:float") && /^\d/.test(n)) {
        let i = n.indexOf(".");
        if (i < 0) {
          i = n.length;
          n += ".";
        }
        let d = minFractionDigits - (n.length - i - 1);
        while (d-- > 0)
          n += "0";
      }
      return n;
    }
    function checkFlowCollectionEnd(errors, cst) {
      let char, name;
      switch (cst.type) {
        case PlainValue.Type.FLOW_MAP:
          char = "}";
          name = "flow map";
          break;
        case PlainValue.Type.FLOW_SEQ:
          char = "]";
          name = "flow sequence";
          break;
        default:
          errors.push(new PlainValue.YAMLSemanticError(cst, "Not a flow collection!?"));
          return;
      }
      let lastItem;
      for (let i = cst.items.length - 1; i >= 0; --i) {
        const item = cst.items[i];
        if (!item || item.type !== PlainValue.Type.COMMENT) {
          lastItem = item;
          break;
        }
      }
      if (lastItem && lastItem.char !== char) {
        const msg = `Expected ${name} to end with ${char}`;
        let err;
        if (typeof lastItem.offset === "number") {
          err = new PlainValue.YAMLSemanticError(cst, msg);
          err.offset = lastItem.offset + 1;
        } else {
          err = new PlainValue.YAMLSemanticError(lastItem, msg);
          if (lastItem.range && lastItem.range.end)
            err.offset = lastItem.range.end - lastItem.range.start;
        }
        errors.push(err);
      }
    }
    function checkFlowCommentSpace(errors, comment) {
      const prev = comment.context.src[comment.range.start - 1];
      if (prev !== "\n" && prev !== "	" && prev !== " ") {
        const msg = "Comments must be separated from other tokens by white space characters";
        errors.push(new PlainValue.YAMLSemanticError(comment, msg));
      }
    }
    function getLongKeyError(source, key) {
      const sk = String(key);
      const k = sk.substr(0, 8) + "..." + sk.substr(-8);
      return new PlainValue.YAMLSemanticError(source, `The "${k}" key is too long`);
    }
    function resolveComments(collection, comments) {
      for (const {
        afterKey,
        before,
        comment
      } of comments) {
        let item = collection.items[before];
        if (!item) {
          if (comment !== void 0) {
            if (collection.comment)
              collection.comment += "\n" + comment;
            else
              collection.comment = comment;
          }
        } else {
          if (afterKey && item.value)
            item = item.value;
          if (comment === void 0) {
            if (afterKey || !item.commentBefore)
              item.spaceBefore = true;
          } else {
            if (item.commentBefore)
              item.commentBefore += "\n" + comment;
            else
              item.commentBefore = comment;
          }
        }
      }
    }
    function resolveString(doc, node) {
      const res = node.strValue;
      if (!res)
        return "";
      if (typeof res === "string")
        return res;
      res.errors.forEach((error) => {
        if (!error.source)
          error.source = node;
        doc.errors.push(error);
      });
      return res.str;
    }
    function resolveTagHandle(doc, node) {
      const {
        handle,
        suffix
      } = node.tag;
      let prefix = doc.tagPrefixes.find((p) => p.handle === handle);
      if (!prefix) {
        const dtp = doc.getDefaults().tagPrefixes;
        if (dtp)
          prefix = dtp.find((p) => p.handle === handle);
        if (!prefix)
          throw new PlainValue.YAMLSemanticError(node, `The ${handle} tag handle is non-default and was not declared.`);
      }
      if (!suffix)
        throw new PlainValue.YAMLSemanticError(node, `The ${handle} tag has no suffix.`);
      if (handle === "!" && (doc.version || doc.options.version) === "1.0") {
        if (suffix[0] === "^") {
          doc.warnings.push(new PlainValue.YAMLWarning(node, "YAML 1.0 ^ tag expansion is not supported"));
          return suffix;
        }
        if (/[:/]/.test(suffix)) {
          const vocab = suffix.match(/^([a-z0-9-]+)\/(.*)/i);
          return vocab ? `tag:${vocab[1]}.yaml.org,2002:${vocab[2]}` : `tag:${suffix}`;
        }
      }
      return prefix.prefix + decodeURIComponent(suffix);
    }
    function resolveTagName(doc, node) {
      const {
        tag,
        type
      } = node;
      let nonSpecific = false;
      if (tag) {
        const {
          handle,
          suffix,
          verbatim
        } = tag;
        if (verbatim) {
          if (verbatim !== "!" && verbatim !== "!!")
            return verbatim;
          const msg = `Verbatim tags aren't resolved, so ${verbatim} is invalid.`;
          doc.errors.push(new PlainValue.YAMLSemanticError(node, msg));
        } else if (handle === "!" && !suffix) {
          nonSpecific = true;
        } else {
          try {
            return resolveTagHandle(doc, node);
          } catch (error) {
            doc.errors.push(error);
          }
        }
      }
      switch (type) {
        case PlainValue.Type.BLOCK_FOLDED:
        case PlainValue.Type.BLOCK_LITERAL:
        case PlainValue.Type.QUOTE_DOUBLE:
        case PlainValue.Type.QUOTE_SINGLE:
          return PlainValue.defaultTags.STR;
        case PlainValue.Type.FLOW_MAP:
        case PlainValue.Type.MAP:
          return PlainValue.defaultTags.MAP;
        case PlainValue.Type.FLOW_SEQ:
        case PlainValue.Type.SEQ:
          return PlainValue.defaultTags.SEQ;
        case PlainValue.Type.PLAIN:
          return nonSpecific ? PlainValue.defaultTags.STR : null;
        default:
          return null;
      }
    }
    function resolveByTagName(doc, node, tagName) {
      const {
        tags
      } = doc.schema;
      const matchWithTest = [];
      for (const tag of tags) {
        if (tag.tag === tagName) {
          if (tag.test)
            matchWithTest.push(tag);
          else {
            const res = tag.resolve(doc, node);
            return res instanceof Collection2 ? res : new Scalar2(res);
          }
        }
      }
      const str = resolveString(doc, node);
      if (typeof str === "string" && matchWithTest.length > 0)
        return resolveScalar(str, matchWithTest, tags.scalarFallback);
      return null;
    }
    function getFallbackTagName({
      type
    }) {
      switch (type) {
        case PlainValue.Type.FLOW_MAP:
        case PlainValue.Type.MAP:
          return PlainValue.defaultTags.MAP;
        case PlainValue.Type.FLOW_SEQ:
        case PlainValue.Type.SEQ:
          return PlainValue.defaultTags.SEQ;
        default:
          return PlainValue.defaultTags.STR;
      }
    }
    function resolveTag(doc, node, tagName) {
      try {
        const res = resolveByTagName(doc, node, tagName);
        if (res) {
          if (tagName && node.tag)
            res.tag = tagName;
          return res;
        }
      } catch (error) {
        if (!error.source)
          error.source = node;
        doc.errors.push(error);
        return null;
      }
      try {
        const fallback = getFallbackTagName(node);
        if (!fallback)
          throw new Error(`The tag ${tagName} is unavailable`);
        const msg = `The tag ${tagName} is unavailable, falling back to ${fallback}`;
        doc.warnings.push(new PlainValue.YAMLWarning(node, msg));
        const res = resolveByTagName(doc, node, fallback);
        res.tag = tagName;
        return res;
      } catch (error) {
        const refError = new PlainValue.YAMLReferenceError(node, error.message);
        refError.stack = error.stack;
        doc.errors.push(refError);
        return null;
      }
    }
    var isCollectionItem = (node) => {
      if (!node)
        return false;
      const {
        type
      } = node;
      return type === PlainValue.Type.MAP_KEY || type === PlainValue.Type.MAP_VALUE || type === PlainValue.Type.SEQ_ITEM;
    };
    function resolveNodeProps(errors, node) {
      const comments = {
        before: [],
        after: []
      };
      let hasAnchor = false;
      let hasTag = false;
      const props = isCollectionItem(node.context.parent) ? node.context.parent.props.concat(node.props) : node.props;
      for (const {
        start,
        end
      } of props) {
        switch (node.context.src[start]) {
          case PlainValue.Char.COMMENT: {
            if (!node.commentHasRequiredWhitespace(start)) {
              const msg = "Comments must be separated from other tokens by white space characters";
              errors.push(new PlainValue.YAMLSemanticError(node, msg));
            }
            const {
              header,
              valueRange
            } = node;
            const cc = valueRange && (start > valueRange.start || header && start > header.start) ? comments.after : comments.before;
            cc.push(node.context.src.slice(start + 1, end));
            break;
          }
          case PlainValue.Char.ANCHOR:
            if (hasAnchor) {
              const msg = "A node can have at most one anchor";
              errors.push(new PlainValue.YAMLSemanticError(node, msg));
            }
            hasAnchor = true;
            break;
          case PlainValue.Char.TAG:
            if (hasTag) {
              const msg = "A node can have at most one tag";
              errors.push(new PlainValue.YAMLSemanticError(node, msg));
            }
            hasTag = true;
            break;
        }
      }
      return {
        comments,
        hasAnchor,
        hasTag
      };
    }
    function resolveNodeValue(doc, node) {
      const {
        anchors,
        errors,
        schema
      } = doc;
      if (node.type === PlainValue.Type.ALIAS) {
        const name = node.rawValue;
        const src = anchors.getNode(name);
        if (!src) {
          const msg = `Aliased anchor not found: ${name}`;
          errors.push(new PlainValue.YAMLReferenceError(node, msg));
          return null;
        }
        const res = new Alias2(src);
        anchors._cstAliases.push(res);
        return res;
      }
      const tagName = resolveTagName(doc, node);
      if (tagName)
        return resolveTag(doc, node, tagName);
      if (node.type !== PlainValue.Type.PLAIN) {
        const msg = `Failed to resolve ${node.type} node here`;
        errors.push(new PlainValue.YAMLSyntaxError(node, msg));
        return null;
      }
      try {
        const str = resolveString(doc, node);
        return resolveScalar(str, schema.tags, schema.tags.scalarFallback);
      } catch (error) {
        if (!error.source)
          error.source = node;
        errors.push(error);
        return null;
      }
    }
    function resolveNode(doc, node) {
      if (!node)
        return null;
      if (node.error)
        doc.errors.push(node.error);
      const {
        comments,
        hasAnchor,
        hasTag
      } = resolveNodeProps(doc.errors, node);
      if (hasAnchor) {
        const {
          anchors
        } = doc;
        const name = node.anchor;
        const prev = anchors.getNode(name);
        if (prev)
          anchors.map[anchors.newName(name)] = prev;
        anchors.map[name] = node;
      }
      if (node.type === PlainValue.Type.ALIAS && (hasAnchor || hasTag)) {
        const msg = "An alias node must not specify any properties";
        doc.errors.push(new PlainValue.YAMLSemanticError(node, msg));
      }
      const res = resolveNodeValue(doc, node);
      if (res) {
        res.range = [node.range.start, node.range.end];
        if (doc.options.keepCstNodes)
          res.cstNode = node;
        if (doc.options.keepNodeTypes)
          res.type = node.type;
        const cb = comments.before.join("\n");
        if (cb) {
          res.commentBefore = res.commentBefore ? `${res.commentBefore}
${cb}` : cb;
        }
        const ca = comments.after.join("\n");
        if (ca)
          res.comment = res.comment ? `${res.comment}
${ca}` : ca;
      }
      return node.resolved = res;
    }
    function resolveMap(doc, cst) {
      if (cst.type !== PlainValue.Type.MAP && cst.type !== PlainValue.Type.FLOW_MAP) {
        const msg = `A ${cst.type} node cannot be resolved as a mapping`;
        doc.errors.push(new PlainValue.YAMLSyntaxError(cst, msg));
        return null;
      }
      const {
        comments,
        items
      } = cst.type === PlainValue.Type.FLOW_MAP ? resolveFlowMapItems(doc, cst) : resolveBlockMapItems(doc, cst);
      const map = new YAMLMap2();
      map.items = items;
      resolveComments(map, comments);
      let hasCollectionKey = false;
      for (let i = 0; i < items.length; ++i) {
        const {
          key: iKey
        } = items[i];
        if (iKey instanceof Collection2)
          hasCollectionKey = true;
        if (doc.schema.merge && iKey && iKey.value === MERGE_KEY) {
          items[i] = new Merge2(items[i]);
          const sources = items[i].value.items;
          let error = null;
          sources.some((node) => {
            if (node instanceof Alias2) {
              const {
                type
              } = node.source;
              if (type === PlainValue.Type.MAP || type === PlainValue.Type.FLOW_MAP)
                return false;
              return error = "Merge nodes aliases can only point to maps";
            }
            return error = "Merge nodes can only have Alias nodes as values";
          });
          if (error)
            doc.errors.push(new PlainValue.YAMLSemanticError(cst, error));
        } else {
          for (let j = i + 1; j < items.length; ++j) {
            const {
              key: jKey
            } = items[j];
            if (iKey === jKey || iKey && jKey && Object.prototype.hasOwnProperty.call(iKey, "value") && iKey.value === jKey.value) {
              const msg = `Map keys must be unique; "${iKey}" is repeated`;
              doc.errors.push(new PlainValue.YAMLSemanticError(cst, msg));
              break;
            }
          }
        }
      }
      if (hasCollectionKey && !doc.options.mapAsMap) {
        const warn = "Keys with collection values will be stringified as YAML due to JS Object restrictions. Use mapAsMap: true to avoid this.";
        doc.warnings.push(new PlainValue.YAMLWarning(cst, warn));
      }
      cst.resolved = map;
      return map;
    }
    var valueHasPairComment = ({
      context: {
        lineStart,
        node,
        src
      },
      props
    }) => {
      if (props.length === 0)
        return false;
      const {
        start
      } = props[0];
      if (node && start > node.valueRange.start)
        return false;
      if (src[start] !== PlainValue.Char.COMMENT)
        return false;
      for (let i = lineStart; i < start; ++i)
        if (src[i] === "\n")
          return false;
      return true;
    };
    function resolvePairComment(item, pair) {
      if (!valueHasPairComment(item))
        return;
      const comment = item.getPropValue(0, PlainValue.Char.COMMENT, true);
      let found = false;
      const cb = pair.value.commentBefore;
      if (cb && cb.startsWith(comment)) {
        pair.value.commentBefore = cb.substr(comment.length + 1);
        found = true;
      } else {
        const cc = pair.value.comment;
        if (!item.node && cc && cc.startsWith(comment)) {
          pair.value.comment = cc.substr(comment.length + 1);
          found = true;
        }
      }
      if (found)
        pair.comment = comment;
    }
    function resolveBlockMapItems(doc, cst) {
      const comments = [];
      const items = [];
      let key = void 0;
      let keyStart = null;
      for (let i = 0; i < cst.items.length; ++i) {
        const item = cst.items[i];
        switch (item.type) {
          case PlainValue.Type.BLANK_LINE:
            comments.push({
              afterKey: !!key,
              before: items.length
            });
            break;
          case PlainValue.Type.COMMENT:
            comments.push({
              afterKey: !!key,
              before: items.length,
              comment: item.comment
            });
            break;
          case PlainValue.Type.MAP_KEY:
            if (key !== void 0)
              items.push(new Pair2(key));
            if (item.error)
              doc.errors.push(item.error);
            key = resolveNode(doc, item.node);
            keyStart = null;
            break;
          case PlainValue.Type.MAP_VALUE:
            {
              if (key === void 0)
                key = null;
              if (item.error)
                doc.errors.push(item.error);
              if (!item.context.atLineStart && item.node && item.node.type === PlainValue.Type.MAP && !item.node.context.atLineStart) {
                const msg = "Nested mappings are not allowed in compact mappings";
                doc.errors.push(new PlainValue.YAMLSemanticError(item.node, msg));
              }
              let valueNode = item.node;
              if (!valueNode && item.props.length > 0) {
                valueNode = new PlainValue.PlainValue(PlainValue.Type.PLAIN, []);
                valueNode.context = {
                  parent: item,
                  src: item.context.src
                };
                const pos = item.range.start + 1;
                valueNode.range = {
                  start: pos,
                  end: pos
                };
                valueNode.valueRange = {
                  start: pos,
                  end: pos
                };
                if (typeof item.range.origStart === "number") {
                  const origPos = item.range.origStart + 1;
                  valueNode.range.origStart = valueNode.range.origEnd = origPos;
                  valueNode.valueRange.origStart = valueNode.valueRange.origEnd = origPos;
                }
              }
              const pair = new Pair2(key, resolveNode(doc, valueNode));
              resolvePairComment(item, pair);
              items.push(pair);
              if (key && typeof keyStart === "number") {
                if (item.range.start > keyStart + 1024)
                  doc.errors.push(getLongKeyError(cst, key));
              }
              key = void 0;
              keyStart = null;
            }
            break;
          default:
            if (key !== void 0)
              items.push(new Pair2(key));
            key = resolveNode(doc, item);
            keyStart = item.range.start;
            if (item.error)
              doc.errors.push(item.error);
            next:
              for (let j = i + 1; ; ++j) {
                const nextItem = cst.items[j];
                switch (nextItem && nextItem.type) {
                  case PlainValue.Type.BLANK_LINE:
                  case PlainValue.Type.COMMENT:
                    continue next;
                  case PlainValue.Type.MAP_VALUE:
                    break next;
                  default: {
                    const msg = "Implicit map keys need to be followed by map values";
                    doc.errors.push(new PlainValue.YAMLSemanticError(item, msg));
                    break next;
                  }
                }
              }
            if (item.valueRangeContainsNewline) {
              const msg = "Implicit map keys need to be on a single line";
              doc.errors.push(new PlainValue.YAMLSemanticError(item, msg));
            }
        }
      }
      if (key !== void 0)
        items.push(new Pair2(key));
      return {
        comments,
        items
      };
    }
    function resolveFlowMapItems(doc, cst) {
      const comments = [];
      const items = [];
      let key = void 0;
      let explicitKey = false;
      let next = "{";
      for (let i = 0; i < cst.items.length; ++i) {
        const item = cst.items[i];
        if (typeof item.char === "string") {
          const {
            char,
            offset
          } = item;
          if (char === "?" && key === void 0 && !explicitKey) {
            explicitKey = true;
            next = ":";
            continue;
          }
          if (char === ":") {
            if (key === void 0)
              key = null;
            if (next === ":") {
              next = ",";
              continue;
            }
          } else {
            if (explicitKey) {
              if (key === void 0 && char !== ",")
                key = null;
              explicitKey = false;
            }
            if (key !== void 0) {
              items.push(new Pair2(key));
              key = void 0;
              if (char === ",") {
                next = ":";
                continue;
              }
            }
          }
          if (char === "}") {
            if (i === cst.items.length - 1)
              continue;
          } else if (char === next) {
            next = ":";
            continue;
          }
          const msg = `Flow map contains an unexpected ${char}`;
          const err = new PlainValue.YAMLSyntaxError(cst, msg);
          err.offset = offset;
          doc.errors.push(err);
        } else if (item.type === PlainValue.Type.BLANK_LINE) {
          comments.push({
            afterKey: !!key,
            before: items.length
          });
        } else if (item.type === PlainValue.Type.COMMENT) {
          checkFlowCommentSpace(doc.errors, item);
          comments.push({
            afterKey: !!key,
            before: items.length,
            comment: item.comment
          });
        } else if (key === void 0) {
          if (next === ",")
            doc.errors.push(new PlainValue.YAMLSemanticError(item, "Separator , missing in flow map"));
          key = resolveNode(doc, item);
        } else {
          if (next !== ",")
            doc.errors.push(new PlainValue.YAMLSemanticError(item, "Indicator : missing in flow map entry"));
          items.push(new Pair2(key, resolveNode(doc, item)));
          key = void 0;
          explicitKey = false;
        }
      }
      checkFlowCollectionEnd(doc.errors, cst);
      if (key !== void 0)
        items.push(new Pair2(key));
      return {
        comments,
        items
      };
    }
    function resolveSeq(doc, cst) {
      if (cst.type !== PlainValue.Type.SEQ && cst.type !== PlainValue.Type.FLOW_SEQ) {
        const msg = `A ${cst.type} node cannot be resolved as a sequence`;
        doc.errors.push(new PlainValue.YAMLSyntaxError(cst, msg));
        return null;
      }
      const {
        comments,
        items
      } = cst.type === PlainValue.Type.FLOW_SEQ ? resolveFlowSeqItems(doc, cst) : resolveBlockSeqItems(doc, cst);
      const seq = new YAMLSeq2();
      seq.items = items;
      resolveComments(seq, comments);
      if (!doc.options.mapAsMap && items.some((it) => it instanceof Pair2 && it.key instanceof Collection2)) {
        const warn = "Keys with collection values will be stringified as YAML due to JS Object restrictions. Use mapAsMap: true to avoid this.";
        doc.warnings.push(new PlainValue.YAMLWarning(cst, warn));
      }
      cst.resolved = seq;
      return seq;
    }
    function resolveBlockSeqItems(doc, cst) {
      const comments = [];
      const items = [];
      for (let i = 0; i < cst.items.length; ++i) {
        const item = cst.items[i];
        switch (item.type) {
          case PlainValue.Type.BLANK_LINE:
            comments.push({
              before: items.length
            });
            break;
          case PlainValue.Type.COMMENT:
            comments.push({
              comment: item.comment,
              before: items.length
            });
            break;
          case PlainValue.Type.SEQ_ITEM:
            if (item.error)
              doc.errors.push(item.error);
            items.push(resolveNode(doc, item.node));
            if (item.hasProps) {
              const msg = "Sequence items cannot have tags or anchors before the - indicator";
              doc.errors.push(new PlainValue.YAMLSemanticError(item, msg));
            }
            break;
          default:
            if (item.error)
              doc.errors.push(item.error);
            doc.errors.push(new PlainValue.YAMLSyntaxError(item, `Unexpected ${item.type} node in sequence`));
        }
      }
      return {
        comments,
        items
      };
    }
    function resolveFlowSeqItems(doc, cst) {
      const comments = [];
      const items = [];
      let explicitKey = false;
      let key = void 0;
      let keyStart = null;
      let next = "[";
      let prevItem = null;
      for (let i = 0; i < cst.items.length; ++i) {
        const item = cst.items[i];
        if (typeof item.char === "string") {
          const {
            char,
            offset
          } = item;
          if (char !== ":" && (explicitKey || key !== void 0)) {
            if (explicitKey && key === void 0)
              key = next ? items.pop() : null;
            items.push(new Pair2(key));
            explicitKey = false;
            key = void 0;
            keyStart = null;
          }
          if (char === next) {
            next = null;
          } else if (!next && char === "?") {
            explicitKey = true;
          } else if (next !== "[" && char === ":" && key === void 0) {
            if (next === ",") {
              key = items.pop();
              if (key instanceof Pair2) {
                const msg = "Chaining flow sequence pairs is invalid";
                const err = new PlainValue.YAMLSemanticError(cst, msg);
                err.offset = offset;
                doc.errors.push(err);
              }
              if (!explicitKey && typeof keyStart === "number") {
                const keyEnd = item.range ? item.range.start : item.offset;
                if (keyEnd > keyStart + 1024)
                  doc.errors.push(getLongKeyError(cst, key));
                const {
                  src
                } = prevItem.context;
                for (let i2 = keyStart; i2 < keyEnd; ++i2)
                  if (src[i2] === "\n") {
                    const msg = "Implicit keys of flow sequence pairs need to be on a single line";
                    doc.errors.push(new PlainValue.YAMLSemanticError(prevItem, msg));
                    break;
                  }
              }
            } else {
              key = null;
            }
            keyStart = null;
            explicitKey = false;
            next = null;
          } else if (next === "[" || char !== "]" || i < cst.items.length - 1) {
            const msg = `Flow sequence contains an unexpected ${char}`;
            const err = new PlainValue.YAMLSyntaxError(cst, msg);
            err.offset = offset;
            doc.errors.push(err);
          }
        } else if (item.type === PlainValue.Type.BLANK_LINE) {
          comments.push({
            before: items.length
          });
        } else if (item.type === PlainValue.Type.COMMENT) {
          checkFlowCommentSpace(doc.errors, item);
          comments.push({
            comment: item.comment,
            before: items.length
          });
        } else {
          if (next) {
            const msg = `Expected a ${next} in flow sequence`;
            doc.errors.push(new PlainValue.YAMLSemanticError(item, msg));
          }
          const value = resolveNode(doc, item);
          if (key === void 0) {
            items.push(value);
            prevItem = item;
          } else {
            items.push(new Pair2(key, value));
            key = void 0;
          }
          keyStart = item.range.start;
          next = ",";
        }
      }
      checkFlowCollectionEnd(doc.errors, cst);
      if (key !== void 0)
        items.push(new Pair2(key));
      return {
        comments,
        items
      };
    }
    exports2.Alias = Alias2;
    exports2.Collection = Collection2;
    exports2.Merge = Merge2;
    exports2.Node = Node2;
    exports2.Pair = Pair2;
    exports2.Scalar = Scalar2;
    exports2.YAMLMap = YAMLMap2;
    exports2.YAMLSeq = YAMLSeq2;
    exports2.addComment = addComment;
    exports2.binaryOptions = binaryOptions2;
    exports2.boolOptions = boolOptions2;
    exports2.findPair = findPair;
    exports2.intOptions = intOptions2;
    exports2.isEmptyPath = isEmptyPath;
    exports2.nullOptions = nullOptions2;
    exports2.resolveMap = resolveMap;
    exports2.resolveNode = resolveNode;
    exports2.resolveSeq = resolveSeq;
    exports2.resolveString = resolveString;
    exports2.strOptions = strOptions2;
    exports2.stringifyNumber = stringifyNumber;
    exports2.stringifyString = stringifyString;
    exports2.toJSON = toJSON;
  }
});

// node_modules/yaml/dist/warnings-1000a372.js
var require_warnings_1000a372 = __commonJS({
  "node_modules/yaml/dist/warnings-1000a372.js"(exports2) {
    "use strict";
    var PlainValue = require_PlainValue_ec8e588e();
    var resolveSeq = require_resolveSeq_d03cb037();
    var binary = {
      identify: (value) => value instanceof Uint8Array,
      // Buffer inherits from Uint8Array
      default: false,
      tag: "tag:yaml.org,2002:binary",
      /**
       * Returns a Buffer in node and an Uint8Array in browsers
       *
       * To use the resulting buffer as an image, you'll want to do something like:
       *
       *   const blob = new Blob([buffer], { type: 'image/jpeg' })
       *   document.querySelector('#photo').src = URL.createObjectURL(blob)
       */
      resolve: (doc, node) => {
        const src = resolveSeq.resolveString(doc, node);
        if (typeof Buffer === "function") {
          return Buffer.from(src, "base64");
        } else if (typeof atob === "function") {
          const str = atob(src.replace(/[\n\r]/g, ""));
          const buffer = new Uint8Array(str.length);
          for (let i = 0; i < str.length; ++i)
            buffer[i] = str.charCodeAt(i);
          return buffer;
        } else {
          const msg = "This environment does not support reading binary tags; either Buffer or atob is required";
          doc.errors.push(new PlainValue.YAMLReferenceError(node, msg));
          return null;
        }
      },
      options: resolveSeq.binaryOptions,
      stringify: ({
        comment,
        type,
        value
      }, ctx, onComment, onChompKeep) => {
        let src;
        if (typeof Buffer === "function") {
          src = value instanceof Buffer ? value.toString("base64") : Buffer.from(value.buffer).toString("base64");
        } else if (typeof btoa === "function") {
          let s = "";
          for (let i = 0; i < value.length; ++i)
            s += String.fromCharCode(value[i]);
          src = btoa(s);
        } else {
          throw new Error("This environment does not support writing binary tags; either Buffer or btoa is required");
        }
        if (!type)
          type = resolveSeq.binaryOptions.defaultType;
        if (type === PlainValue.Type.QUOTE_DOUBLE) {
          value = src;
        } else {
          const {
            lineWidth
          } = resolveSeq.binaryOptions;
          const n = Math.ceil(src.length / lineWidth);
          const lines = new Array(n);
          for (let i = 0, o = 0; i < n; ++i, o += lineWidth) {
            lines[i] = src.substr(o, lineWidth);
          }
          value = lines.join(type === PlainValue.Type.BLOCK_LITERAL ? "\n" : " ");
        }
        return resolveSeq.stringifyString({
          comment,
          type,
          value
        }, ctx, onComment, onChompKeep);
      }
    };
    function parsePairs(doc, cst) {
      const seq = resolveSeq.resolveSeq(doc, cst);
      for (let i = 0; i < seq.items.length; ++i) {
        let item = seq.items[i];
        if (item instanceof resolveSeq.Pair)
          continue;
        else if (item instanceof resolveSeq.YAMLMap) {
          if (item.items.length > 1) {
            const msg = "Each pair must have its own sequence indicator";
            throw new PlainValue.YAMLSemanticError(cst, msg);
          }
          const pair = item.items[0] || new resolveSeq.Pair();
          if (item.commentBefore)
            pair.commentBefore = pair.commentBefore ? `${item.commentBefore}
${pair.commentBefore}` : item.commentBefore;
          if (item.comment)
            pair.comment = pair.comment ? `${item.comment}
${pair.comment}` : item.comment;
          item = pair;
        }
        seq.items[i] = item instanceof resolveSeq.Pair ? item : new resolveSeq.Pair(item);
      }
      return seq;
    }
    function createPairs(schema, iterable, ctx) {
      const pairs2 = new resolveSeq.YAMLSeq(schema);
      pairs2.tag = "tag:yaml.org,2002:pairs";
      for (const it of iterable) {
        let key, value;
        if (Array.isArray(it)) {
          if (it.length === 2) {
            key = it[0];
            value = it[1];
          } else
            throw new TypeError(`Expected [key, value] tuple: ${it}`);
        } else if (it && it instanceof Object) {
          const keys = Object.keys(it);
          if (keys.length === 1) {
            key = keys[0];
            value = it[key];
          } else
            throw new TypeError(`Expected { key: value } tuple: ${it}`);
        } else {
          key = it;
        }
        const pair = schema.createPair(key, value, ctx);
        pairs2.items.push(pair);
      }
      return pairs2;
    }
    var pairs = {
      default: false,
      tag: "tag:yaml.org,2002:pairs",
      resolve: parsePairs,
      createNode: createPairs
    };
    var YAMLOMap = class _YAMLOMap extends resolveSeq.YAMLSeq {
      constructor() {
        super();
        PlainValue._defineProperty(this, "add", resolveSeq.YAMLMap.prototype.add.bind(this));
        PlainValue._defineProperty(this, "delete", resolveSeq.YAMLMap.prototype.delete.bind(this));
        PlainValue._defineProperty(this, "get", resolveSeq.YAMLMap.prototype.get.bind(this));
        PlainValue._defineProperty(this, "has", resolveSeq.YAMLMap.prototype.has.bind(this));
        PlainValue._defineProperty(this, "set", resolveSeq.YAMLMap.prototype.set.bind(this));
        this.tag = _YAMLOMap.tag;
      }
      toJSON(_, ctx) {
        const map = /* @__PURE__ */ new Map();
        if (ctx && ctx.onCreate)
          ctx.onCreate(map);
        for (const pair of this.items) {
          let key, value;
          if (pair instanceof resolveSeq.Pair) {
            key = resolveSeq.toJSON(pair.key, "", ctx);
            value = resolveSeq.toJSON(pair.value, key, ctx);
          } else {
            key = resolveSeq.toJSON(pair, "", ctx);
          }
          if (map.has(key))
            throw new Error("Ordered maps must not include duplicate keys");
          map.set(key, value);
        }
        return map;
      }
    };
    PlainValue._defineProperty(YAMLOMap, "tag", "tag:yaml.org,2002:omap");
    function parseOMap(doc, cst) {
      const pairs2 = parsePairs(doc, cst);
      const seenKeys = [];
      for (const {
        key
      } of pairs2.items) {
        if (key instanceof resolveSeq.Scalar) {
          if (seenKeys.includes(key.value)) {
            const msg = "Ordered maps must not include duplicate keys";
            throw new PlainValue.YAMLSemanticError(cst, msg);
          } else {
            seenKeys.push(key.value);
          }
        }
      }
      return Object.assign(new YAMLOMap(), pairs2);
    }
    function createOMap(schema, iterable, ctx) {
      const pairs2 = createPairs(schema, iterable, ctx);
      const omap2 = new YAMLOMap();
      omap2.items = pairs2.items;
      return omap2;
    }
    var omap = {
      identify: (value) => value instanceof Map,
      nodeClass: YAMLOMap,
      default: false,
      tag: "tag:yaml.org,2002:omap",
      resolve: parseOMap,
      createNode: createOMap
    };
    var YAMLSet = class _YAMLSet extends resolveSeq.YAMLMap {
      constructor() {
        super();
        this.tag = _YAMLSet.tag;
      }
      add(key) {
        const pair = key instanceof resolveSeq.Pair ? key : new resolveSeq.Pair(key);
        const prev = resolveSeq.findPair(this.items, pair.key);
        if (!prev)
          this.items.push(pair);
      }
      get(key, keepPair) {
        const pair = resolveSeq.findPair(this.items, key);
        return !keepPair && pair instanceof resolveSeq.Pair ? pair.key instanceof resolveSeq.Scalar ? pair.key.value : pair.key : pair;
      }
      set(key, value) {
        if (typeof value !== "boolean")
          throw new Error(`Expected boolean value for set(key, value) in a YAML set, not ${typeof value}`);
        const prev = resolveSeq.findPair(this.items, key);
        if (prev && !value) {
          this.items.splice(this.items.indexOf(prev), 1);
        } else if (!prev && value) {
          this.items.push(new resolveSeq.Pair(key));
        }
      }
      toJSON(_, ctx) {
        return super.toJSON(_, ctx, Set);
      }
      toString(ctx, onComment, onChompKeep) {
        if (!ctx)
          return JSON.stringify(this);
        if (this.hasAllNullValues())
          return super.toString(ctx, onComment, onChompKeep);
        else
          throw new Error("Set items must all have null values");
      }
    };
    PlainValue._defineProperty(YAMLSet, "tag", "tag:yaml.org,2002:set");
    function parseSet(doc, cst) {
      const map = resolveSeq.resolveMap(doc, cst);
      if (!map.hasAllNullValues())
        throw new PlainValue.YAMLSemanticError(cst, "Set items must all have null values");
      return Object.assign(new YAMLSet(), map);
    }
    function createSet(schema, iterable, ctx) {
      const set2 = new YAMLSet();
      for (const value of iterable)
        set2.items.push(schema.createPair(value, null, ctx));
      return set2;
    }
    var set = {
      identify: (value) => value instanceof Set,
      nodeClass: YAMLSet,
      default: false,
      tag: "tag:yaml.org,2002:set",
      resolve: parseSet,
      createNode: createSet
    };
    var parseSexagesimal = (sign, parts) => {
      const n = parts.split(":").reduce((n2, p) => n2 * 60 + Number(p), 0);
      return sign === "-" ? -n : n;
    };
    var stringifySexagesimal = ({
      value
    }) => {
      if (isNaN(value) || !isFinite(value))
        return resolveSeq.stringifyNumber(value);
      let sign = "";
      if (value < 0) {
        sign = "-";
        value = Math.abs(value);
      }
      const parts = [value % 60];
      if (value < 60) {
        parts.unshift(0);
      } else {
        value = Math.round((value - parts[0]) / 60);
        parts.unshift(value % 60);
        if (value >= 60) {
          value = Math.round((value - parts[0]) / 60);
          parts.unshift(value);
        }
      }
      return sign + parts.map((n) => n < 10 ? "0" + String(n) : String(n)).join(":").replace(/000000\d*$/, "");
    };
    var intTime = {
      identify: (value) => typeof value === "number",
      default: true,
      tag: "tag:yaml.org,2002:int",
      format: "TIME",
      test: /^([-+]?)([0-9][0-9_]*(?::[0-5]?[0-9])+)$/,
      resolve: (str, sign, parts) => parseSexagesimal(sign, parts.replace(/_/g, "")),
      stringify: stringifySexagesimal
    };
    var floatTime = {
      identify: (value) => typeof value === "number",
      default: true,
      tag: "tag:yaml.org,2002:float",
      format: "TIME",
      test: /^([-+]?)([0-9][0-9_]*(?::[0-5]?[0-9])+\.[0-9_]*)$/,
      resolve: (str, sign, parts) => parseSexagesimal(sign, parts.replace(/_/g, "")),
      stringify: stringifySexagesimal
    };
    var timestamp = {
      identify: (value) => value instanceof Date,
      default: true,
      tag: "tag:yaml.org,2002:timestamp",
      // If the time zone is omitted, the timestamp is assumed to be specified in UTC. The time part
      // may be omitted altogether, resulting in a date format. In such a case, the time part is
      // assumed to be 00:00:00Z (start of day, UTC).
      test: RegExp("^(?:([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})(?:(?:t|T|[ \\t]+)([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}(\\.[0-9]+)?)(?:[ \\t]*(Z|[-+][012]?[0-9](?::[0-9]{2})?))?)?)$"),
      resolve: (str, year, month, day, hour, minute, second, millisec, tz) => {
        if (millisec)
          millisec = (millisec + "00").substr(1, 3);
        let date2 = Date.UTC(year, month - 1, day, hour || 0, minute || 0, second || 0, millisec || 0);
        if (tz && tz !== "Z") {
          let d = parseSexagesimal(tz[0], tz.slice(1));
          if (Math.abs(d) < 30)
            d *= 60;
          date2 -= 6e4 * d;
        }
        return new Date(date2);
      },
      stringify: ({
        value
      }) => value.toISOString().replace(/((T00:00)?:00)?\.000Z$/, "")
    };
    function shouldWarn(deprecation) {
      const env = typeof process !== "undefined" && process.env || {};
      if (deprecation) {
        if (typeof YAML_SILENCE_DEPRECATION_WARNINGS !== "undefined")
          return !YAML_SILENCE_DEPRECATION_WARNINGS;
        return !env.YAML_SILENCE_DEPRECATION_WARNINGS;
      }
      if (typeof YAML_SILENCE_WARNINGS !== "undefined")
        return !YAML_SILENCE_WARNINGS;
      return !env.YAML_SILENCE_WARNINGS;
    }
    function warn(warning, type) {
      if (shouldWarn(false)) {
        const emit = typeof process !== "undefined" && process.emitWarning;
        if (emit)
          emit(warning, type);
        else {
          console.warn(type ? `${type}: ${warning}` : warning);
        }
      }
    }
    function warnFileDeprecation(filename) {
      if (shouldWarn(true)) {
        const path = filename.replace(/.*yaml[/\\]/i, "").replace(/\.js$/, "").replace(/\\/g, "/");
        warn(`The endpoint 'yaml/${path}' will be removed in a future release.`, "DeprecationWarning");
      }
    }
    var warned = {};
    function warnOptionDeprecation(name, alternative) {
      if (!warned[name] && shouldWarn(true)) {
        warned[name] = true;
        let msg = `The option '${name}' will be removed in a future release`;
        msg += alternative ? `, use '${alternative}' instead.` : ".";
        warn(msg, "DeprecationWarning");
      }
    }
    exports2.binary = binary;
    exports2.floatTime = floatTime;
    exports2.intTime = intTime;
    exports2.omap = omap;
    exports2.pairs = pairs;
    exports2.set = set;
    exports2.timestamp = timestamp;
    exports2.warn = warn;
    exports2.warnFileDeprecation = warnFileDeprecation;
    exports2.warnOptionDeprecation = warnOptionDeprecation;
  }
});

// node_modules/yaml/dist/Schema-88e323a7.js
var require_Schema_88e323a7 = __commonJS({
  "node_modules/yaml/dist/Schema-88e323a7.js"(exports2) {
    "use strict";
    var PlainValue = require_PlainValue_ec8e588e();
    var resolveSeq = require_resolveSeq_d03cb037();
    var warnings = require_warnings_1000a372();
    function createMap(schema, obj, ctx) {
      const map2 = new resolveSeq.YAMLMap(schema);
      if (obj instanceof Map) {
        for (const [key, value] of obj)
          map2.items.push(schema.createPair(key, value, ctx));
      } else if (obj && typeof obj === "object") {
        for (const key of Object.keys(obj))
          map2.items.push(schema.createPair(key, obj[key], ctx));
      }
      if (typeof schema.sortMapEntries === "function") {
        map2.items.sort(schema.sortMapEntries);
      }
      return map2;
    }
    var map = {
      createNode: createMap,
      default: true,
      nodeClass: resolveSeq.YAMLMap,
      tag: "tag:yaml.org,2002:map",
      resolve: resolveSeq.resolveMap
    };
    function createSeq(schema, obj, ctx) {
      const seq2 = new resolveSeq.YAMLSeq(schema);
      if (obj && obj[Symbol.iterator]) {
        for (const it of obj) {
          const v = schema.createNode(it, ctx.wrapScalars, null, ctx);
          seq2.items.push(v);
        }
      }
      return seq2;
    }
    var seq = {
      createNode: createSeq,
      default: true,
      nodeClass: resolveSeq.YAMLSeq,
      tag: "tag:yaml.org,2002:seq",
      resolve: resolveSeq.resolveSeq
    };
    var string = {
      identify: (value) => typeof value === "string",
      default: true,
      tag: "tag:yaml.org,2002:str",
      resolve: resolveSeq.resolveString,
      stringify(item, ctx, onComment, onChompKeep) {
        ctx = Object.assign({
          actualString: true
        }, ctx);
        return resolveSeq.stringifyString(item, ctx, onComment, onChompKeep);
      },
      options: resolveSeq.strOptions
    };
    var failsafe = [map, seq, string];
    var intIdentify$2 = (value) => typeof value === "bigint" || Number.isInteger(value);
    var intResolve$1 = (src, part, radix) => resolveSeq.intOptions.asBigInt ? BigInt(src) : parseInt(part, radix);
    function intStringify$1(node, radix, prefix) {
      const {
        value
      } = node;
      if (intIdentify$2(value) && value >= 0)
        return prefix + value.toString(radix);
      return resolveSeq.stringifyNumber(node);
    }
    var nullObj = {
      identify: (value) => value == null,
      createNode: (schema, value, ctx) => ctx.wrapScalars ? new resolveSeq.Scalar(null) : null,
      default: true,
      tag: "tag:yaml.org,2002:null",
      test: /^(?:~|[Nn]ull|NULL)?$/,
      resolve: () => null,
      options: resolveSeq.nullOptions,
      stringify: () => resolveSeq.nullOptions.nullStr
    };
    var boolObj = {
      identify: (value) => typeof value === "boolean",
      default: true,
      tag: "tag:yaml.org,2002:bool",
      test: /^(?:[Tt]rue|TRUE|[Ff]alse|FALSE)$/,
      resolve: (str) => str[0] === "t" || str[0] === "T",
      options: resolveSeq.boolOptions,
      stringify: ({
        value
      }) => value ? resolveSeq.boolOptions.trueStr : resolveSeq.boolOptions.falseStr
    };
    var octObj = {
      identify: (value) => intIdentify$2(value) && value >= 0,
      default: true,
      tag: "tag:yaml.org,2002:int",
      format: "OCT",
      test: /^0o([0-7]+)$/,
      resolve: (str, oct) => intResolve$1(str, oct, 8),
      options: resolveSeq.intOptions,
      stringify: (node) => intStringify$1(node, 8, "0o")
    };
    var intObj = {
      identify: intIdentify$2,
      default: true,
      tag: "tag:yaml.org,2002:int",
      test: /^[-+]?[0-9]+$/,
      resolve: (str) => intResolve$1(str, str, 10),
      options: resolveSeq.intOptions,
      stringify: resolveSeq.stringifyNumber
    };
    var hexObj = {
      identify: (value) => intIdentify$2(value) && value >= 0,
      default: true,
      tag: "tag:yaml.org,2002:int",
      format: "HEX",
      test: /^0x([0-9a-fA-F]+)$/,
      resolve: (str, hex) => intResolve$1(str, hex, 16),
      options: resolveSeq.intOptions,
      stringify: (node) => intStringify$1(node, 16, "0x")
    };
    var nanObj = {
      identify: (value) => typeof value === "number",
      default: true,
      tag: "tag:yaml.org,2002:float",
      test: /^(?:[-+]?\.inf|(\.nan))$/i,
      resolve: (str, nan) => nan ? NaN : str[0] === "-" ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY,
      stringify: resolveSeq.stringifyNumber
    };
    var expObj = {
      identify: (value) => typeof value === "number",
      default: true,
      tag: "tag:yaml.org,2002:float",
      format: "EXP",
      test: /^[-+]?(?:\.[0-9]+|[0-9]+(?:\.[0-9]*)?)[eE][-+]?[0-9]+$/,
      resolve: (str) => parseFloat(str),
      stringify: ({
        value
      }) => Number(value).toExponential()
    };
    var floatObj = {
      identify: (value) => typeof value === "number",
      default: true,
      tag: "tag:yaml.org,2002:float",
      test: /^[-+]?(?:\.([0-9]+)|[0-9]+\.([0-9]*))$/,
      resolve(str, frac1, frac2) {
        const frac = frac1 || frac2;
        const node = new resolveSeq.Scalar(parseFloat(str));
        if (frac && frac[frac.length - 1] === "0")
          node.minFractionDigits = frac.length;
        return node;
      },
      stringify: resolveSeq.stringifyNumber
    };
    var core = failsafe.concat([nullObj, boolObj, octObj, intObj, hexObj, nanObj, expObj, floatObj]);
    var intIdentify$1 = (value) => typeof value === "bigint" || Number.isInteger(value);
    var stringifyJSON = ({
      value
    }) => JSON.stringify(value);
    var json = [map, seq, {
      identify: (value) => typeof value === "string",
      default: true,
      tag: "tag:yaml.org,2002:str",
      resolve: resolveSeq.resolveString,
      stringify: stringifyJSON
    }, {
      identify: (value) => value == null,
      createNode: (schema, value, ctx) => ctx.wrapScalars ? new resolveSeq.Scalar(null) : null,
      default: true,
      tag: "tag:yaml.org,2002:null",
      test: /^null$/,
      resolve: () => null,
      stringify: stringifyJSON
    }, {
      identify: (value) => typeof value === "boolean",
      default: true,
      tag: "tag:yaml.org,2002:bool",
      test: /^true|false$/,
      resolve: (str) => str === "true",
      stringify: stringifyJSON
    }, {
      identify: intIdentify$1,
      default: true,
      tag: "tag:yaml.org,2002:int",
      test: /^-?(?:0|[1-9][0-9]*)$/,
      resolve: (str) => resolveSeq.intOptions.asBigInt ? BigInt(str) : parseInt(str, 10),
      stringify: ({
        value
      }) => intIdentify$1(value) ? value.toString() : JSON.stringify(value)
    }, {
      identify: (value) => typeof value === "number",
      default: true,
      tag: "tag:yaml.org,2002:float",
      test: /^-?(?:0|[1-9][0-9]*)(?:\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$/,
      resolve: (str) => parseFloat(str),
      stringify: stringifyJSON
    }];
    json.scalarFallback = (str) => {
      throw new SyntaxError(`Unresolved plain scalar ${JSON.stringify(str)}`);
    };
    var boolStringify = ({
      value
    }) => value ? resolveSeq.boolOptions.trueStr : resolveSeq.boolOptions.falseStr;
    var intIdentify = (value) => typeof value === "bigint" || Number.isInteger(value);
    function intResolve(sign, src, radix) {
      let str = src.replace(/_/g, "");
      if (resolveSeq.intOptions.asBigInt) {
        switch (radix) {
          case 2:
            str = `0b${str}`;
            break;
          case 8:
            str = `0o${str}`;
            break;
          case 16:
            str = `0x${str}`;
            break;
        }
        const n2 = BigInt(str);
        return sign === "-" ? BigInt(-1) * n2 : n2;
      }
      const n = parseInt(str, radix);
      return sign === "-" ? -1 * n : n;
    }
    function intStringify(node, radix, prefix) {
      const {
        value
      } = node;
      if (intIdentify(value)) {
        const str = value.toString(radix);
        return value < 0 ? "-" + prefix + str.substr(1) : prefix + str;
      }
      return resolveSeq.stringifyNumber(node);
    }
    var yaml11 = failsafe.concat([{
      identify: (value) => value == null,
      createNode: (schema, value, ctx) => ctx.wrapScalars ? new resolveSeq.Scalar(null) : null,
      default: true,
      tag: "tag:yaml.org,2002:null",
      test: /^(?:~|[Nn]ull|NULL)?$/,
      resolve: () => null,
      options: resolveSeq.nullOptions,
      stringify: () => resolveSeq.nullOptions.nullStr
    }, {
      identify: (value) => typeof value === "boolean",
      default: true,
      tag: "tag:yaml.org,2002:bool",
      test: /^(?:Y|y|[Yy]es|YES|[Tt]rue|TRUE|[Oo]n|ON)$/,
      resolve: () => true,
      options: resolveSeq.boolOptions,
      stringify: boolStringify
    }, {
      identify: (value) => typeof value === "boolean",
      default: true,
      tag: "tag:yaml.org,2002:bool",
      test: /^(?:N|n|[Nn]o|NO|[Ff]alse|FALSE|[Oo]ff|OFF)$/i,
      resolve: () => false,
      options: resolveSeq.boolOptions,
      stringify: boolStringify
    }, {
      identify: intIdentify,
      default: true,
      tag: "tag:yaml.org,2002:int",
      format: "BIN",
      test: /^([-+]?)0b([0-1_]+)$/,
      resolve: (str, sign, bin) => intResolve(sign, bin, 2),
      stringify: (node) => intStringify(node, 2, "0b")
    }, {
      identify: intIdentify,
      default: true,
      tag: "tag:yaml.org,2002:int",
      format: "OCT",
      test: /^([-+]?)0([0-7_]+)$/,
      resolve: (str, sign, oct) => intResolve(sign, oct, 8),
      stringify: (node) => intStringify(node, 8, "0")
    }, {
      identify: intIdentify,
      default: true,
      tag: "tag:yaml.org,2002:int",
      test: /^([-+]?)([0-9][0-9_]*)$/,
      resolve: (str, sign, abs) => intResolve(sign, abs, 10),
      stringify: resolveSeq.stringifyNumber
    }, {
      identify: intIdentify,
      default: true,
      tag: "tag:yaml.org,2002:int",
      format: "HEX",
      test: /^([-+]?)0x([0-9a-fA-F_]+)$/,
      resolve: (str, sign, hex) => intResolve(sign, hex, 16),
      stringify: (node) => intStringify(node, 16, "0x")
    }, {
      identify: (value) => typeof value === "number",
      default: true,
      tag: "tag:yaml.org,2002:float",
      test: /^(?:[-+]?\.inf|(\.nan))$/i,
      resolve: (str, nan) => nan ? NaN : str[0] === "-" ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY,
      stringify: resolveSeq.stringifyNumber
    }, {
      identify: (value) => typeof value === "number",
      default: true,
      tag: "tag:yaml.org,2002:float",
      format: "EXP",
      test: /^[-+]?([0-9][0-9_]*)?(\.[0-9_]*)?[eE][-+]?[0-9]+$/,
      resolve: (str) => parseFloat(str.replace(/_/g, "")),
      stringify: ({
        value
      }) => Number(value).toExponential()
    }, {
      identify: (value) => typeof value === "number",
      default: true,
      tag: "tag:yaml.org,2002:float",
      test: /^[-+]?(?:[0-9][0-9_]*)?\.([0-9_]*)$/,
      resolve(str, frac) {
        const node = new resolveSeq.Scalar(parseFloat(str.replace(/_/g, "")));
        if (frac) {
          const f = frac.replace(/_/g, "");
          if (f[f.length - 1] === "0")
            node.minFractionDigits = f.length;
        }
        return node;
      },
      stringify: resolveSeq.stringifyNumber
    }], warnings.binary, warnings.omap, warnings.pairs, warnings.set, warnings.intTime, warnings.floatTime, warnings.timestamp);
    var schemas = {
      core,
      failsafe,
      json,
      yaml11
    };
    var tags = {
      binary: warnings.binary,
      bool: boolObj,
      float: floatObj,
      floatExp: expObj,
      floatNaN: nanObj,
      floatTime: warnings.floatTime,
      int: intObj,
      intHex: hexObj,
      intOct: octObj,
      intTime: warnings.intTime,
      map,
      null: nullObj,
      omap: warnings.omap,
      pairs: warnings.pairs,
      seq,
      set: warnings.set,
      timestamp: warnings.timestamp
    };
    function findTagObject(value, tagName, tags2) {
      if (tagName) {
        const match = tags2.filter((t) => t.tag === tagName);
        const tagObj = match.find((t) => !t.format) || match[0];
        if (!tagObj)
          throw new Error(`Tag ${tagName} not found`);
        return tagObj;
      }
      return tags2.find((t) => (t.identify && t.identify(value) || t.class && value instanceof t.class) && !t.format);
    }
    function createNode(value, tagName, ctx) {
      if (value instanceof resolveSeq.Node)
        return value;
      const {
        defaultPrefix,
        onTagObj,
        prevObjects,
        schema,
        wrapScalars
      } = ctx;
      if (tagName && tagName.startsWith("!!"))
        tagName = defaultPrefix + tagName.slice(2);
      let tagObj = findTagObject(value, tagName, schema.tags);
      if (!tagObj) {
        if (typeof value.toJSON === "function")
          value = value.toJSON();
        if (!value || typeof value !== "object")
          return wrapScalars ? new resolveSeq.Scalar(value) : value;
        tagObj = value instanceof Map ? map : value[Symbol.iterator] ? seq : map;
      }
      if (onTagObj) {
        onTagObj(tagObj);
        delete ctx.onTagObj;
      }
      const obj = {
        value: void 0,
        node: void 0
      };
      if (value && typeof value === "object" && prevObjects) {
        const prev = prevObjects.get(value);
        if (prev) {
          const alias = new resolveSeq.Alias(prev);
          ctx.aliasNodes.push(alias);
          return alias;
        }
        obj.value = value;
        prevObjects.set(value, obj);
      }
      obj.node = tagObj.createNode ? tagObj.createNode(ctx.schema, value, ctx) : wrapScalars ? new resolveSeq.Scalar(value) : value;
      if (tagName && obj.node instanceof resolveSeq.Node)
        obj.node.tag = tagName;
      return obj.node;
    }
    function getSchemaTags(schemas2, knownTags, customTags, schemaId) {
      let tags2 = schemas2[schemaId.replace(/\W/g, "")];
      if (!tags2) {
        const keys = Object.keys(schemas2).map((key) => JSON.stringify(key)).join(", ");
        throw new Error(`Unknown schema "${schemaId}"; use one of ${keys}`);
      }
      if (Array.isArray(customTags)) {
        for (const tag of customTags)
          tags2 = tags2.concat(tag);
      } else if (typeof customTags === "function") {
        tags2 = customTags(tags2.slice());
      }
      for (let i = 0; i < tags2.length; ++i) {
        const tag = tags2[i];
        if (typeof tag === "string") {
          const tagObj = knownTags[tag];
          if (!tagObj) {
            const keys = Object.keys(knownTags).map((key) => JSON.stringify(key)).join(", ");
            throw new Error(`Unknown custom tag "${tag}"; use one of ${keys}`);
          }
          tags2[i] = tagObj;
        }
      }
      return tags2;
    }
    var sortMapEntriesByKey = (a, b) => a.key < b.key ? -1 : a.key > b.key ? 1 : 0;
    var Schema2 = class _Schema {
      // TODO: remove in v2
      // TODO: remove in v2
      constructor({
        customTags,
        merge: merge2,
        schema,
        sortMapEntries,
        tags: deprecatedCustomTags
      }) {
        this.merge = !!merge2;
        this.name = schema;
        this.sortMapEntries = sortMapEntries === true ? sortMapEntriesByKey : sortMapEntries || null;
        if (!customTags && deprecatedCustomTags)
          warnings.warnOptionDeprecation("tags", "customTags");
        this.tags = getSchemaTags(schemas, tags, customTags || deprecatedCustomTags, schema);
      }
      createNode(value, wrapScalars, tagName, ctx) {
        const baseCtx = {
          defaultPrefix: _Schema.defaultPrefix,
          schema: this,
          wrapScalars
        };
        const createCtx = ctx ? Object.assign(ctx, baseCtx) : baseCtx;
        return createNode(value, tagName, createCtx);
      }
      createPair(key, value, ctx) {
        if (!ctx)
          ctx = {
            wrapScalars: true
          };
        const k = this.createNode(key, ctx.wrapScalars, null, ctx);
        const v = this.createNode(value, ctx.wrapScalars, null, ctx);
        return new resolveSeq.Pair(k, v);
      }
    };
    PlainValue._defineProperty(Schema2, "defaultPrefix", PlainValue.defaultTagPrefix);
    PlainValue._defineProperty(Schema2, "defaultTags", PlainValue.defaultTags);
    exports2.Schema = Schema2;
  }
});

// node_modules/yaml/dist/types.js
var require_types2 = __commonJS({
  "node_modules/yaml/dist/types.js"(exports2) {
    "use strict";
    var resolveSeq = require_resolveSeq_d03cb037();
    var Schema2 = require_Schema_88e323a7();
    require_PlainValue_ec8e588e();
    require_warnings_1000a372();
    exports2.Alias = resolveSeq.Alias;
    exports2.Collection = resolveSeq.Collection;
    exports2.Merge = resolveSeq.Merge;
    exports2.Node = resolveSeq.Node;
    exports2.Pair = resolveSeq.Pair;
    exports2.Scalar = resolveSeq.Scalar;
    exports2.YAMLMap = resolveSeq.YAMLMap;
    exports2.YAMLSeq = resolveSeq.YAMLSeq;
    exports2.binaryOptions = resolveSeq.binaryOptions;
    exports2.boolOptions = resolveSeq.boolOptions;
    exports2.intOptions = resolveSeq.intOptions;
    exports2.nullOptions = resolveSeq.nullOptions;
    exports2.strOptions = resolveSeq.strOptions;
    exports2.Schema = Schema2.Schema;
  }
});

// node_modules/yaml/types.mjs
var import_types2, binaryOptions, boolOptions, intOptions, nullOptions, strOptions, Schema, Alias, Collection, Merge, Node, Pair, Scalar, YAMLMap, YAMLSeq;
var init_types2 = __esm({
  "node_modules/yaml/types.mjs"() {
    import_types2 = __toESM(require_types2(), 1);
    binaryOptions = import_types2.default.binaryOptions;
    boolOptions = import_types2.default.boolOptions;
    intOptions = import_types2.default.intOptions;
    nullOptions = import_types2.default.nullOptions;
    strOptions = import_types2.default.strOptions;
    Schema = import_types2.default.Schema;
    Alias = import_types2.default.Alias;
    Collection = import_types2.default.Collection;
    Merge = import_types2.default.Merge;
    Node = import_types2.default.Node;
    Pair = import_types2.default.Pair;
    Scalar = import_types2.default.Scalar;
    YAMLMap = import_types2.default.YAMLMap;
    YAMLSeq = import_types2.default.YAMLSeq;
  }
});

// src/lib/renderers/yaml.mjs
function getIn(obj, path) {
  return path.reduce((v, k) => k in v ? v[k] : {}, obj);
}
function addComments(context, path, commentNode, iterNode = commentNode) {
  const { title, description, comment } = getIn(context, path);
  const lines = [];
  if (option_default("renderTitle") && title) {
    lines.push(` ${title}`, "");
  }
  if (option_default("renderDescription") && description) {
    lines.push(` ${description}`);
  }
  if (option_default("renderComment") && comment) {
    lines.push(` ${comment}`);
  }
  commentNode.commentBefore = lines.join("\n");
  if (iterNode instanceof YAMLMap) {
    iterNode.items.forEach((n) => {
      addComments(context, [...path, "items", n.key.value], n.key, n.value);
    });
  } else if (iterNode instanceof YAMLSeq) {
    iterNode.items.forEach((n, i) => {
      addComments(context, [...path, "items", i], n);
    });
  }
}
function renderYAML({ value, context }) {
  const nodes = yaml_default.createNode(value);
  addComments(context, [], nodes);
  const doc = new yaml_default.Document();
  doc.contents = nodes;
  return doc.toString();
}
var yaml_default;
var init_yaml = __esm({
  "src/lib/renderers/yaml.mjs"() {
    init_yaml();
    init_types2();
    init_option();
    yaml_default = renderYAML;
  }
});

// src/lib/renderers/index.mjs
var init_renderers = __esm({
  "src/lib/renderers/index.mjs"() {
    init_js();
    init_yaml();
  }
});

// src/lib/index.mjs
function setupKeywords() {
  container.define("autoIncrement", function autoIncrement(value, schema) {
    if (!this.offset) {
      const min = schema.minimum || 1;
      const max = min + constants_default.MAX_NUMBER;
      const offset = value.initialOffset || schema.initialOffset;
      this.offset = offset || random_default.number(min, max);
    }
    if (value) {
      return this.offset++;
    }
    return schema;
  });
  container.define("sequentialDate", function sequentialDate(value, schema) {
    if (!this.now) {
      this.now = random_default.date();
    }
    if (value) {
      schema = this.now.toISOString();
      value = value === true ? "days" : value;
      if (["seconds", "minutes", "hours", "days", "weeks", "months", "years"].indexOf(value) === -1) {
        throw new Error(`Unsupported increment by ${utils_default.short(value)}`);
      }
      this.now.setTime(this.now.getTime() + random_default.date(value));
    }
    return schema;
  });
}
function getRefs(refs, schema) {
  let $refs = {};
  if (Array.isArray(refs)) {
    refs.forEach((_schema) => {
      $refs[_schema.$id || _schema.id] = _schema;
    });
  } else {
    $refs = refs || {};
  }
  function walk(obj) {
    if (!obj || typeof obj !== "object")
      return;
    if (Array.isArray(obj))
      return obj.forEach(walk);
    const _id = obj.$id || obj.id;
    if (typeof _id === "string" && !$refs[_id]) {
      $refs[_id] = obj;
    }
    Object.keys(obj).forEach((key) => {
      walk(obj[key]);
    });
  }
  walk(refs);
  walk(schema);
  return $refs;
}
var container, jsf, JSONSchemaFaker, lib_default;
var init_lib = __esm({
  "src/lib/index.mjs"() {
    init_vendor();
    init_Container();
    init_format();
    init_option();
    init_constants();
    init_random();
    init_utils();
    init_run();
    init_renderers();
    container = new Container_default();
    jsf = (schema, refs, cwd) => {
      console.debug("[json-schema-faker] calling JSONSchemaFaker() is deprecated, call either .generate() or .resolve()");
      if (cwd) {
        console.debug("[json-schema-faker] local references are only supported by calling .resolve()");
      }
      return jsf.generate(schema, refs);
    };
    jsf.generateWithContext = (schema, refs) => {
      const $refs = getRefs(refs, schema);
      return run_default($refs, schema, container, true);
    };
    jsf.generate = (schema, refs) => js_default(
      jsf.generateWithContext(schema, refs)
    );
    jsf.generateYAML = (schema, refs) => yaml_default(
      jsf.generateWithContext(schema, refs)
    );
    jsf.resolveWithContext = (schema, refs, cwd) => {
      if (typeof refs === "string") {
        cwd = refs;
        refs = {};
      }
      cwd = cwd || (typeof process !== "undefined" && typeof process.cwd === "function" ? process.cwd() : "");
      cwd = `${cwd.replace(/\/+$/, "")}/`;
      const $refs = getRefs(refs, schema);
      const fixedRefs = {
        order: 1,
        canRead(file) {
          const key = file.url.replace("/:", ":");
          return $refs[key] || $refs[key.split("/").pop()];
        },
        read(file, callback) {
          try {
            callback(null, this.canRead(file));
          } catch (e) {
            callback(e);
          }
        }
      };
      const { $RefParser: $RefParser2 } = getDependencies();
      return $RefParser2.bundle(cwd, schema, {
        resolve: {
          file: { order: 100 },
          http: { order: 200 },
          fixedRefs
        },
        dereference: {
          circular: "ignore"
        }
      }).then((sub) => run_default($refs, sub, container)).catch((e) => {
        throw new Error(`Error while resolving schema (${e.message})`);
      });
    };
    jsf.resolve = (schema, refs, cwd) => jsf.resolveWithContext(schema, refs, cwd).then(js_default);
    jsf.resolveYAML = (schema, refs, cwd) => jsf.resolveWithContext(schema, refs, cwd).then(yaml_default);
    setupKeywords();
    jsf.format = format_default;
    jsf.option = option_default;
    jsf.random = random_default;
    jsf.extend = (name, cb) => {
      container.extend(name, cb);
      return jsf;
    };
    jsf.define = (name, cb) => {
      container.define(name, cb);
      return jsf;
    };
    jsf.reset = (name) => {
      container.reset(name);
      setupKeywords();
      return jsf;
    };
    jsf.locate = (name) => {
      return container.get(name);
    };
    jsf.VERSION = "0.5.3";
    JSONSchemaFaker = { ...jsf };
    lib_default = jsf;
  }
});

// src/lib/main.mjs
var main_exports = {};
__export(main_exports, {
  JSONSchemaFaker: () => JSONSchemaFaker,
  default: () => lib_default
});
var import_json_schema_ref_parser, import_jsonpath_plus;
var init_main = __esm({
  "src/lib/main.mjs"() {
    import_json_schema_ref_parser = __toESM(require("json-schema-ref-parser"), 1);
    import_jsonpath_plus = require("jsonpath-plus");
    init_vendor();
    init_lib();
    setDependencies({ $RefParser: import_json_schema_ref_parser.default, JSONPath: import_jsonpath_plus.JSONPath });
  }
});

// src/src/main.cjs.js
var jsf2 = (init_main(), __toCommonJS(main_exports)).default;
module.exports = jsf2;
module.exports.JSONSchemaFaker = { ...jsf2 };
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2xpYi92ZW5kb3IubWpzIiwgIi4uL3NyYy9saWIvY2xhc3MvUmVnaXN0cnkubWpzIiwgIi4uL3NyYy9saWIvYXBpL2RlZmF1bHRzLm1qcyIsICIuLi9zcmMvbGliL2NsYXNzL09wdGlvblJlZ2lzdHJ5Lm1qcyIsICIuLi9zcmMvbGliL2FwaS9vcHRpb24ubWpzIiwgIi4uL3NyYy9saWIvY29yZS9jb25zdGFudHMubWpzIiwgIi4uL25vZGVfbW9kdWxlcy9yZXQvbGliL3R5cGVzLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9yZXQvbGliL3NldHMuanMiLCAiLi4vbm9kZV9tb2R1bGVzL3JldC9saWIvdXRpbC5qcyIsICIuLi9ub2RlX21vZHVsZXMvcmV0L2xpYi9wb3NpdGlvbnMuanMiLCAiLi4vbm9kZV9tb2R1bGVzL3JldC9saWIvaW5kZXguanMiLCAiLi4vbm9kZV9tb2R1bGVzL2RyYW5nZS9saWIvaW5kZXguanMiLCAiLi4vbm9kZV9tb2R1bGVzL3JhbmRleHAvbGliL3JhbmRleHAuanMiLCAiLi4vc3JjL2xpYi9jb3JlL3JhbmRvbS5tanMiLCAiLi4vc3JjL2xpYi9jb3JlL3V0aWxzLm1qcyIsICIuLi9zcmMvbGliL2NsYXNzL0NvbnRhaW5lci5tanMiLCAiLi4vc3JjL2xpYi9hcGkvZm9ybWF0Lm1qcyIsICIuLi9zcmMvbGliL2NvcmUvZXJyb3IubWpzIiwgIi4uL3NyYy9saWIvY29yZS9pbmZlci5tanMiLCAiLi4vc3JjL2xpYi9nZW5lcmF0b3JzL2Jvb2xlYW4ubWpzIiwgIi4uL3NyYy9saWIvdHlwZXMvYm9vbGVhbi5tanMiLCAiLi4vc3JjL2xpYi9nZW5lcmF0b3JzL251bGwubWpzIiwgIi4uL3NyYy9saWIvdHlwZXMvbnVsbC5tanMiLCAiLi4vc3JjL2xpYi90eXBlcy9hcnJheS5tanMiLCAiLi4vc3JjL2xpYi90eXBlcy9udW1iZXIubWpzIiwgIi4uL3NyYy9saWIvdHlwZXMvaW50ZWdlci5tanMiLCAiLi4vc3JjL2xpYi9nZW5lcmF0b3JzL3dvcmRzLm1qcyIsICIuLi9zcmMvbGliL3R5cGVzL29iamVjdC5tanMiLCAiLi4vc3JjL2xpYi9nZW5lcmF0b3JzL3RodW5rLm1qcyIsICIuLi9zcmMvbGliL2dlbmVyYXRvcnMvaXB2NC5tanMiLCAiLi4vc3JjL2xpYi9nZW5lcmF0b3JzL2RhdGVUaW1lLm1qcyIsICIuLi9zcmMvbGliL2dlbmVyYXRvcnMvZGF0ZS5tanMiLCAiLi4vc3JjL2xpYi9nZW5lcmF0b3JzL3RpbWUubWpzIiwgIi4uL3NyYy9saWIvZ2VuZXJhdG9ycy9jb3JlRm9ybWF0Lm1qcyIsICIuLi9zcmMvbGliL3R5cGVzL3N0cmluZy5tanMiLCAiLi4vc3JjL2xpYi90eXBlcy9pbmRleC5tanMiLCAiLi4vc3JjL2xpYi9jb3JlL3RyYXZlcnNlLm1qcyIsICIuLi9zcmMvbGliL2NvcmUvYnVpbGRSZXNvbHZlU2NoZW1hLm1qcyIsICIuLi9zcmMvbGliL2NvcmUvcnVuLm1qcyIsICIuLi9zcmMvbGliL3JlbmRlcmVycy9qcy5tanMiLCAiLi4vbm9kZV9tb2R1bGVzL3lhbWwvZGlzdC9QbGFpblZhbHVlLWVjOGU1ODhlLmpzIiwgIi4uL25vZGVfbW9kdWxlcy95YW1sL2Rpc3QvcmVzb2x2ZVNlcS1kMDNjYjAzNy5qcyIsICIuLi9ub2RlX21vZHVsZXMveWFtbC9kaXN0L3dhcm5pbmdzLTEwMDBhMzcyLmpzIiwgIi4uL25vZGVfbW9kdWxlcy95YW1sL2Rpc3QvU2NoZW1hLTg4ZTMyM2E3LmpzIiwgIi4uL25vZGVfbW9kdWxlcy95YW1sL2Rpc3QvdHlwZXMuanMiLCAiLi4vbm9kZV9tb2R1bGVzL3lhbWwvdHlwZXMubWpzIiwgIi4uL3NyYy9saWIvcmVuZGVyZXJzL3lhbWwubWpzIiwgIi4uL3NyYy9saWIvcmVuZGVyZXJzL2luZGV4Lm1qcyIsICIuLi9zcmMvbGliL2luZGV4Lm1qcyIsICIuLi9zcmMvbGliL21haW4ubWpzIiwgIi4uL3NyYy9zcmMvbWFpbi5janMuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IERFUEVOREVOQ0lFUyA9IHt9O1xuXG5leHBvcnQgY29uc3QgZ2V0RGVwZW5kZW5jaWVzID0gKCkgPT4ge1xuICByZXR1cm4gREVQRU5ERU5DSUVTO1xufTtcblxuZXhwb3J0IGNvbnN0IHNldERlcGVuZGVuY2llcyA9IHZhbHVlID0+IHtcbiAgT2JqZWN0LmFzc2lnbihERVBFTkRFTkNJRVMsIHZhbHVlKTtcbn07XG4iLCAiLyoqXG4gKiBUaGlzIGNsYXNzIGRlZmluZXMgYSByZWdpc3RyeSBmb3IgY3VzdG9tIGZvcm1hdHMgdXNlZCB3aXRoaW4gSlNGLlxuICovXG5jbGFzcyBSZWdpc3RyeSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIC8vIGVtcHR5IGJ5IGRlZmF1bHRcbiAgICB0aGlzLmRhdGEgPSB7fTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVbnJlZ2lzdGVycyBjdXN0b20gZm9ybWF0KHMpXG4gICAqIEBwYXJhbSBuYW1lXG4gICAqL1xuICB1bnJlZ2lzdGVyKG5hbWUpIHtcbiAgICBpZiAoIW5hbWUpIHtcbiAgICAgIHRoaXMuZGF0YSA9IHt9O1xuICAgIH0gZWxzZSB7XG4gICAgICBkZWxldGUgdGhpcy5kYXRhW25hbWVdO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlcnMgY3VzdG9tIGZvcm1hdFxuICAgKi9cbiAgcmVnaXN0ZXIobmFtZSwgY2FsbGJhY2spIHtcbiAgICB0aGlzLmRhdGFbbmFtZV0gPSBjYWxsYmFjaztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlciBtYW55IGZvcm1hdHMgYXQgb25lIHNob3RcbiAgICovXG4gIHJlZ2lzdGVyTWFueShmb3JtYXRzKSB7XG4gICAgT2JqZWN0LmtleXMoZm9ybWF0cykuZm9yRWFjaChuYW1lID0+IHtcbiAgICAgIHRoaXMuZGF0YVtuYW1lXSA9IGZvcm1hdHNbbmFtZV07XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBlbGVtZW50IGJ5IHJlZ2lzdHJ5IGtleVxuICAgKi9cbiAgZ2V0KG5hbWUpIHtcbiAgICBjb25zdCBmb3JtYXQgPSB0aGlzLmRhdGFbbmFtZV07XG5cbiAgICByZXR1cm4gZm9ybWF0O1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHdob2xlIHJlZ2lzdHJ5IGNvbnRlbnRcbiAgICovXG4gIGxpc3QoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGF0YTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBSZWdpc3RyeTtcbiIsICJjb25zdCBkZWZhdWx0cyA9IHt9O1xuXG5leHBvcnQgZGVmYXVsdCBkZWZhdWx0cztcblxuZGVmYXVsdHMuZGVmYXVsdEludmFsaWRUeXBlUHJvZHVjdCA9IHVuZGVmaW5lZDtcbmRlZmF1bHRzLmRlZmF1bHRSYW5kRXhwTWF4ID0gMTA7XG5cbmRlZmF1bHRzLnBydW5lUHJvcGVydGllcyA9IFtdO1xuZGVmYXVsdHMuaWdub3JlUHJvcGVydGllcyA9IFtdO1xuZGVmYXVsdHMuaWdub3JlTWlzc2luZ1JlZnMgPSBmYWxzZTtcbmRlZmF1bHRzLmZhaWxPbkludmFsaWRUeXBlcyA9IHRydWU7XG5kZWZhdWx0cy5mYWlsT25JbnZhbGlkRm9ybWF0ID0gdHJ1ZTtcblxuZGVmYXVsdHMuYWx3YXlzRmFrZU9wdGlvbmFscyA9IGZhbHNlO1xuZGVmYXVsdHMub3B0aW9uYWxzUHJvYmFiaWxpdHkgPSBudWxsO1xuZGVmYXVsdHMuZml4ZWRQcm9iYWJpbGl0aWVzID0gZmFsc2U7XG5kZWZhdWx0cy51c2VFeGFtcGxlc1ZhbHVlID0gZmFsc2U7XG5kZWZhdWx0cy51c2VEZWZhdWx0VmFsdWUgPSBmYWxzZTtcbmRlZmF1bHRzLnJlcXVpcmVkT25seSA9IGZhbHNlO1xuZGVmYXVsdHMub21pdE51bGxzID0gZmFsc2U7XG5cbmRlZmF1bHRzLm1pbkl0ZW1zID0gMDtcbmRlZmF1bHRzLm1heEl0ZW1zID0gbnVsbDtcbmRlZmF1bHRzLm1pbkxlbmd0aCA9IDA7XG5kZWZhdWx0cy5tYXhMZW5ndGggPSBudWxsO1xuXG5kZWZhdWx0cy5yZXNvbHZlSnNvblBhdGggPSBmYWxzZTtcbmRlZmF1bHRzLnJldXNlUHJvcGVydGllcyA9IGZhbHNlO1xuZGVmYXVsdHMuZmlsbFByb3BlcnRpZXMgPSB0cnVlO1xuZGVmYXVsdHMuc29ydFByb3BlcnRpZXMgPSBmYWxzZTtcbmRlZmF1bHRzLnJlcGxhY2VFbXB0eUJ5UmFuZG9tVmFsdWUgPSBmYWxzZTtcblxuZGVmYXVsdHMucmFuZG9tID0gTWF0aC5yYW5kb207XG5kZWZhdWx0cy5taW5EYXRlVGltZSA9IG5ldyBEYXRlKCcxODg5LTEyLTMxVDAwOjAwOjAwLjAwMFonKTtcbmRlZmF1bHRzLm1heERhdGVUaW1lID0gbmV3IERhdGUoJzE5NzAtMDEtMDFUMDA6MDA6MDEuMDAwWicpO1xuXG5kZWZhdWx0cy5yZW5kZXJUaXRsZSA9IHRydWU7XG5kZWZhdWx0cy5yZW5kZXJEZXNjcmlwdGlvbiA9IHRydWU7XG5kZWZhdWx0cy5yZW5kZXJDb21tZW50ID0gZmFsc2U7XG4iLCAiaW1wb3J0IFJlZ2lzdHJ5IGZyb20gJy4vUmVnaXN0cnkubWpzJztcbmltcG9ydCBkZWZhdWx0cyBmcm9tICcuLi9hcGkvZGVmYXVsdHMubWpzJztcblxuLyoqXG4gKiBUaGlzIGNsYXNzIGRlZmluZXMgYSByZWdpc3RyeSBmb3IgY3VzdG9tIHNldHRpbmdzIHVzZWQgd2l0aGluIEpTRi5cbiAqL1xuY2xhc3MgT3B0aW9uUmVnaXN0cnkgZXh0ZW5kcyBSZWdpc3RyeSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5kYXRhID0geyAuLi5kZWZhdWx0cyB9O1xuICAgIHRoaXMuX2RlZmF1bHRzID0gZGVmYXVsdHM7XG4gIH1cblxuICBnZXQgZGVmYXVsdHMoKSB7XG4gICAgcmV0dXJuIHsgLi4udGhpcy5fZGVmYXVsdHMgfTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBPcHRpb25SZWdpc3RyeTtcbiIsICJpbXBvcnQgT3B0aW9uUmVnaXN0cnkgZnJvbSAnLi4vY2xhc3MvT3B0aW9uUmVnaXN0cnkubWpzJztcblxuLy8gaW5zdGFudGlhdGVcbmNvbnN0IHJlZ2lzdHJ5ID0gbmV3IE9wdGlvblJlZ2lzdHJ5KCk7XG5cbi8qKlxuICogQ3VzdG9tIG9wdGlvbiBBUElcbiAqXG4gKiBAcGFyYW0gbmFtZU9yT3B0aW9uTWFwXG4gKiBAcmV0dXJucyB7YW55fVxuICovXG5mdW5jdGlvbiBvcHRpb25BUEkobmFtZU9yT3B0aW9uTWFwLCBvcHRpb25hbFZhbHVlKSB7XG4gIGlmICh0eXBlb2YgbmFtZU9yT3B0aW9uTWFwID09PSAnc3RyaW5nJykge1xuICAgIGlmICh0eXBlb2Ygb3B0aW9uYWxWYWx1ZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJldHVybiByZWdpc3RyeS5yZWdpc3RlcihuYW1lT3JPcHRpb25NYXAsIG9wdGlvbmFsVmFsdWUpO1xuICAgIH1cblxuICAgIHJldHVybiByZWdpc3RyeS5nZXQobmFtZU9yT3B0aW9uTWFwKTtcbiAgfVxuXG4gIHJldHVybiByZWdpc3RyeS5yZWdpc3Rlck1hbnkobmFtZU9yT3B0aW9uTWFwKTtcbn1cblxub3B0aW9uQVBJLmdldERlZmF1bHRzID0gKCkgPT4gcmVnaXN0cnkuZGVmYXVsdHM7XG5cbmV4cG9ydCBkZWZhdWx0IG9wdGlvbkFQSTtcbiIsICJjb25zdCBBTExPV0VEX1RZUEVTID0gWydpbnRlZ2VyJywgJ251bWJlcicsICdzdHJpbmcnLCAnYm9vbGVhbiddO1xuY29uc3QgU0NBTEFSX1RZUEVTID0gQUxMT1dFRF9UWVBFUy5jb25jYXQoWydudWxsJ10pO1xuY29uc3QgQUxMX1RZUEVTID0gWydhcnJheScsICdvYmplY3QnXS5jb25jYXQoU0NBTEFSX1RZUEVTKTtcblxuY29uc3QgTU9TVF9ORUFSX0RBVEVUSU1FID0gMjUyNDYwODAwMDAwMDtcblxuY29uc3QgTUlOX0lOVEVHRVIgPSAtMTAwMDAwMDAwO1xuY29uc3QgTUFYX0lOVEVHRVIgPSAxMDAwMDAwMDA7XG5cbmNvbnN0IE1JTl9OVU1CRVIgPSAtMTAwO1xuY29uc3QgTUFYX05VTUJFUiA9IDEwMDtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBBTExPV0VEX1RZUEVTLFxuICBTQ0FMQVJfVFlQRVMsXG4gIEFMTF9UWVBFUyxcbiAgTUlOX05VTUJFUixcbiAgTUFYX05VTUJFUixcbiAgTUlOX0lOVEVHRVIsXG4gIE1BWF9JTlRFR0VSLFxuICBNT1NUX05FQVJfREFURVRJTUUsXG59O1xuIiwgIm1vZHVsZS5leHBvcnRzID0ge1xuICBST09UICAgICAgIDogMCxcbiAgR1JPVVAgICAgICA6IDEsXG4gIFBPU0lUSU9OICAgOiAyLFxuICBTRVQgICAgICAgIDogMyxcbiAgUkFOR0UgICAgICA6IDQsXG4gIFJFUEVUSVRJT04gOiA1LFxuICBSRUZFUkVOQ0UgIDogNixcbiAgQ0hBUiAgICAgICA6IDcsXG59O1xuIiwgImNvbnN0IHR5cGVzID0gcmVxdWlyZSgnLi90eXBlcycpO1xuXG5jb25zdCBJTlRTID0gKCkgPT4gW3sgdHlwZTogdHlwZXMuUkFOR0UgLCBmcm9tOiA0OCwgdG86IDU3IH1dO1xuXG5jb25zdCBXT1JEUyA9ICgpID0+IHtcbiAgcmV0dXJuIFtcbiAgICB7IHR5cGU6IHR5cGVzLkNIQVIsIHZhbHVlOiA5NSB9LFxuICAgIHsgdHlwZTogdHlwZXMuUkFOR0UsIGZyb206IDk3LCB0bzogMTIyIH0sXG4gICAgeyB0eXBlOiB0eXBlcy5SQU5HRSwgZnJvbTogNjUsIHRvOiA5MCB9XG4gIF0uY29uY2F0KElOVFMoKSk7XG59O1xuXG5jb25zdCBXSElURVNQQUNFID0gKCkgPT4ge1xuICByZXR1cm4gW1xuICAgIHsgdHlwZTogdHlwZXMuQ0hBUiwgdmFsdWU6IDkgfSxcbiAgICB7IHR5cGU6IHR5cGVzLkNIQVIsIHZhbHVlOiAxMCB9LFxuICAgIHsgdHlwZTogdHlwZXMuQ0hBUiwgdmFsdWU6IDExIH0sXG4gICAgeyB0eXBlOiB0eXBlcy5DSEFSLCB2YWx1ZTogMTIgfSxcbiAgICB7IHR5cGU6IHR5cGVzLkNIQVIsIHZhbHVlOiAxMyB9LFxuICAgIHsgdHlwZTogdHlwZXMuQ0hBUiwgdmFsdWU6IDMyIH0sXG4gICAgeyB0eXBlOiB0eXBlcy5DSEFSLCB2YWx1ZTogMTYwIH0sXG4gICAgeyB0eXBlOiB0eXBlcy5DSEFSLCB2YWx1ZTogNTc2MCB9LFxuICAgIHsgdHlwZTogdHlwZXMuUkFOR0UsIGZyb206IDgxOTIsIHRvOiA4MjAyIH0sXG4gICAgeyB0eXBlOiB0eXBlcy5DSEFSLCB2YWx1ZTogODIzMiB9LFxuICAgIHsgdHlwZTogdHlwZXMuQ0hBUiwgdmFsdWU6IDgyMzMgfSxcbiAgICB7IHR5cGU6IHR5cGVzLkNIQVIsIHZhbHVlOiA4MjM5IH0sXG4gICAgeyB0eXBlOiB0eXBlcy5DSEFSLCB2YWx1ZTogODI4NyB9LFxuICAgIHsgdHlwZTogdHlwZXMuQ0hBUiwgdmFsdWU6IDEyMjg4IH0sXG4gICAgeyB0eXBlOiB0eXBlcy5DSEFSLCB2YWx1ZTogNjUyNzkgfVxuICBdO1xufTtcblxuY29uc3QgTk9UQU5ZQ0hBUiA9ICgpID0+IHtcbiAgcmV0dXJuIFtcbiAgICB7IHR5cGU6IHR5cGVzLkNIQVIsIHZhbHVlOiAxMCB9LFxuICAgIHsgdHlwZTogdHlwZXMuQ0hBUiwgdmFsdWU6IDEzIH0sXG4gICAgeyB0eXBlOiB0eXBlcy5DSEFSLCB2YWx1ZTogODIzMiB9LFxuICAgIHsgdHlwZTogdHlwZXMuQ0hBUiwgdmFsdWU6IDgyMzMgfSxcbiAgXTtcbn07XG5cbi8vIFByZWRlZmluZWQgY2xhc3Mgb2JqZWN0cy5cbmV4cG9ydHMud29yZHMgPSAoKSA9PiAoeyB0eXBlOiB0eXBlcy5TRVQsIHNldDogV09SRFMoKSwgbm90OiBmYWxzZSB9KTtcbmV4cG9ydHMubm90V29yZHMgPSAoKSA9PiAoeyB0eXBlOiB0eXBlcy5TRVQsIHNldDogV09SRFMoKSwgbm90OiB0cnVlIH0pO1xuZXhwb3J0cy5pbnRzID0gKCkgPT4gKHsgdHlwZTogdHlwZXMuU0VULCBzZXQ6IElOVFMoKSwgbm90OiBmYWxzZSB9KTtcbmV4cG9ydHMubm90SW50cyA9ICgpID0+ICh7IHR5cGU6IHR5cGVzLlNFVCwgc2V0OiBJTlRTKCksIG5vdDogdHJ1ZSB9KTtcbmV4cG9ydHMud2hpdGVzcGFjZSA9ICgpID0+ICh7IHR5cGU6IHR5cGVzLlNFVCwgc2V0OiBXSElURVNQQUNFKCksIG5vdDogZmFsc2UgfSk7XG5leHBvcnRzLm5vdFdoaXRlc3BhY2UgPSAoKSA9PiAoeyB0eXBlOiB0eXBlcy5TRVQsIHNldDogV0hJVEVTUEFDRSgpLCBub3Q6IHRydWUgfSk7XG5leHBvcnRzLmFueUNoYXIgPSAoKSA9PiAoeyB0eXBlOiB0eXBlcy5TRVQsIHNldDogTk9UQU5ZQ0hBUigpLCBub3Q6IHRydWUgfSk7XG4iLCAiY29uc3QgdHlwZXMgPSByZXF1aXJlKCcuL3R5cGVzJyk7XG5jb25zdCBzZXRzICA9IHJlcXVpcmUoJy4vc2V0cycpO1xuXG5cbmNvbnN0IENUUkwgPSAnQEFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaW1xcXFxdXiA/JztcbmNvbnN0IFNMU0ggPSB7ICcwJzogMCwgJ3QnOiA5LCAnbic6IDEwLCAndic6IDExLCAnZic6IDEyLCAncic6IDEzIH07XG5cbi8qKlxuICogRmluZHMgY2hhcmFjdGVyIHJlcHJlc2VudGF0aW9ucyBpbiBzdHIgYW5kIGNvbnZlcnQgYWxsIHRvXG4gKiB0aGVpciByZXNwZWN0aXZlIGNoYXJhY3RlcnNcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmV4cG9ydHMuc3RyVG9DaGFycyA9IGZ1bmN0aW9uKHN0cikge1xuICAvKiBqc2hpbnQgbWF4bGVuOiBmYWxzZSAqL1xuICB2YXIgY2hhcnNfcmVnZXggPSAvKFxcW1xcXFxiXFxdKXwoXFxcXCk/XFxcXCg/OnUoW0EtRjAtOV17NH0pfHgoW0EtRjAtOV17Mn0pfCgwP1swLTddezJ9KXxjKFtAQS1aW1xcXFxcXF1eP10pfChbMHRudmZyXSkpL2c7XG4gIHN0ciA9IHN0ci5yZXBsYWNlKGNoYXJzX3JlZ2V4LCBmdW5jdGlvbihzLCBiLCBsYnMsIGExNiwgYjE2LCBjOCwgZGN0cmwsIGVzbHNoKSB7XG4gICAgaWYgKGxicykge1xuICAgICAgcmV0dXJuIHM7XG4gICAgfVxuXG4gICAgdmFyIGNvZGUgPSBiID8gOCA6XG4gICAgICBhMTYgICA/IHBhcnNlSW50KGExNiwgMTYpIDpcbiAgICAgIGIxNiAgID8gcGFyc2VJbnQoYjE2LCAxNikgOlxuICAgICAgYzggICAgPyBwYXJzZUludChjOCwgICA4KSA6XG4gICAgICBkY3RybCA/IENUUkwuaW5kZXhPZihkY3RybCkgOlxuICAgICAgU0xTSFtlc2xzaF07XG5cbiAgICB2YXIgYyA9IFN0cmluZy5mcm9tQ2hhckNvZGUoY29kZSk7XG5cbiAgICAvLyBFc2NhcGUgc3BlY2lhbCByZWdleCBjaGFyYWN0ZXJzLlxuICAgIGlmICgvW1tcXF17fV4kLnw/KisoKV0vLnRlc3QoYykpIHtcbiAgICAgIGMgPSAnXFxcXCcgKyBjO1xuICAgIH1cblxuICAgIHJldHVybiBjO1xuICB9KTtcblxuICByZXR1cm4gc3RyO1xufTtcblxuXG4vKipcbiAqIHR1cm5zIGNsYXNzIGludG8gdG9rZW5zXG4gKiByZWFkcyBzdHIgdW50aWwgaXQgZW5jb3VudGVycyBhIF0gbm90IHByZWNlZWRlZCBieSBhIFxcXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHBhcmFtIHtTdHJpbmd9IHJlZ2V4cFN0clxuICogQHJldHVybiB7QXJyYXkuPEFycmF5LjxPYmplY3Q+LCBOdW1iZXI+fVxuICovXG5leHBvcnRzLnRva2VuaXplQ2xhc3MgPSAoc3RyLCByZWdleHBTdHIpID0+IHtcbiAgLyoganNoaW50IG1heGxlbjogZmFsc2UgKi9cbiAgdmFyIHRva2VucyA9IFtdO1xuICB2YXIgcmVnZXhwID0gL1xcXFwoPzoodyl8KGQpfChzKXwoVyl8KEQpfChTKSl8KCg/Oig/OlxcXFwpKC4pfChbXlxcXVxcXFxdKSktKD86XFxcXCk/KFteXFxdXSkpfChcXF0pfCg/OlxcXFwpPyhbXl0pL2c7XG4gIHZhciBycywgYztcblxuXG4gIHdoaWxlICgocnMgPSByZWdleHAuZXhlYyhzdHIpKSAhPSBudWxsKSB7XG4gICAgaWYgKHJzWzFdKSB7XG4gICAgICB0b2tlbnMucHVzaChzZXRzLndvcmRzKCkpO1xuXG4gICAgfSBlbHNlIGlmIChyc1syXSkge1xuICAgICAgdG9rZW5zLnB1c2goc2V0cy5pbnRzKCkpO1xuXG4gICAgfSBlbHNlIGlmIChyc1szXSkge1xuICAgICAgdG9rZW5zLnB1c2goc2V0cy53aGl0ZXNwYWNlKCkpO1xuXG4gICAgfSBlbHNlIGlmIChyc1s0XSkge1xuICAgICAgdG9rZW5zLnB1c2goc2V0cy5ub3RXb3JkcygpKTtcblxuICAgIH0gZWxzZSBpZiAocnNbNV0pIHtcbiAgICAgIHRva2Vucy5wdXNoKHNldHMubm90SW50cygpKTtcblxuICAgIH0gZWxzZSBpZiAocnNbNl0pIHtcbiAgICAgIHRva2Vucy5wdXNoKHNldHMubm90V2hpdGVzcGFjZSgpKTtcblxuICAgIH0gZWxzZSBpZiAocnNbN10pIHtcbiAgICAgIHRva2Vucy5wdXNoKHtcbiAgICAgICAgdHlwZTogdHlwZXMuUkFOR0UsXG4gICAgICAgIGZyb206IChyc1s4XSB8fCByc1s5XSkuY2hhckNvZGVBdCgwKSxcbiAgICAgICAgdG86IHJzWzEwXS5jaGFyQ29kZUF0KDApLFxuICAgICAgfSk7XG5cbiAgICB9IGVsc2UgaWYgKChjID0gcnNbMTJdKSkge1xuICAgICAgdG9rZW5zLnB1c2goe1xuICAgICAgICB0eXBlOiB0eXBlcy5DSEFSLFxuICAgICAgICB2YWx1ZTogYy5jaGFyQ29kZUF0KDApLFxuICAgICAgfSk7XG5cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFt0b2tlbnMsIHJlZ2V4cC5sYXN0SW5kZXhdO1xuICAgIH1cbiAgfVxuXG4gIGV4cG9ydHMuZXJyb3IocmVnZXhwU3RyLCAnVW50ZXJtaW5hdGVkIGNoYXJhY3RlciBjbGFzcycpO1xufTtcblxuXG4vKipcbiAqIFNob3J0Y3V0IHRvIHRocm93IGVycm9ycy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gcmVnZXhwXG4gKiBAcGFyYW0ge1N0cmluZ30gbXNnXG4gKi9cbmV4cG9ydHMuZXJyb3IgPSAocmVnZXhwLCBtc2cpID0+IHtcbiAgdGhyb3cgbmV3IFN5bnRheEVycm9yKCdJbnZhbGlkIHJlZ3VsYXIgZXhwcmVzc2lvbjogLycgKyByZWdleHAgKyAnLzogJyArIG1zZyk7XG59O1xuIiwgImNvbnN0IHR5cGVzID0gcmVxdWlyZSgnLi90eXBlcycpO1xuZXhwb3J0cy53b3JkQm91bmRhcnkgPSAoKSA9PiAoeyB0eXBlOiB0eXBlcy5QT1NJVElPTiwgdmFsdWU6ICdiJyB9KTtcbmV4cG9ydHMubm9uV29yZEJvdW5kYXJ5ID0gKCkgPT4gKHsgdHlwZTogdHlwZXMuUE9TSVRJT04sIHZhbHVlOiAnQicgfSk7XG5leHBvcnRzLmJlZ2luID0gKCkgPT4gKHsgdHlwZTogdHlwZXMuUE9TSVRJT04sIHZhbHVlOiAnXicgfSk7XG5leHBvcnRzLmVuZCA9ICgpID0+ICh7IHR5cGU6IHR5cGVzLlBPU0lUSU9OLCB2YWx1ZTogJyQnIH0pO1xuIiwgImNvbnN0IHV0aWwgICAgICA9IHJlcXVpcmUoJy4vdXRpbCcpO1xuY29uc3QgdHlwZXMgICAgID0gcmVxdWlyZSgnLi90eXBlcycpO1xuY29uc3Qgc2V0cyAgICAgID0gcmVxdWlyZSgnLi9zZXRzJyk7XG5jb25zdCBwb3NpdGlvbnMgPSByZXF1aXJlKCcuL3Bvc2l0aW9ucycpO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gKHJlZ2V4cFN0cikgPT4ge1xuICB2YXIgaSA9IDAsIGwsIGMsXG4gICAgc3RhcnQgPSB7IHR5cGU6IHR5cGVzLlJPT1QsIHN0YWNrOiBbXX0sXG5cbiAgICAvLyBLZWVwIHRyYWNrIG9mIGxhc3QgY2xhdXNlL2dyb3VwIGFuZCBzdGFjay5cbiAgICBsYXN0R3JvdXAgPSBzdGFydCxcbiAgICBsYXN0ID0gc3RhcnQuc3RhY2ssXG4gICAgZ3JvdXBTdGFjayA9IFtdO1xuXG5cbiAgdmFyIHJlcGVhdEVyciA9IChpKSA9PiB7XG4gICAgdXRpbC5lcnJvcihyZWdleHBTdHIsIGBOb3RoaW5nIHRvIHJlcGVhdCBhdCBjb2x1bW4gJHtpIC0gMX1gKTtcbiAgfTtcblxuICAvLyBEZWNvZGUgYSBmZXcgZXNjYXBlZCBjaGFyYWN0ZXJzLlxuICB2YXIgc3RyID0gdXRpbC5zdHJUb0NoYXJzKHJlZ2V4cFN0cik7XG4gIGwgPSBzdHIubGVuZ3RoO1xuXG4gIC8vIEl0ZXJhdGUgdGhyb3VnaCBlYWNoIGNoYXJhY3RlciBpbiBzdHJpbmcuXG4gIHdoaWxlIChpIDwgbCkge1xuICAgIGMgPSBzdHJbaSsrXTtcblxuICAgIHN3aXRjaCAoYykge1xuICAgICAgLy8gSGFuZGxlIGVzY2FwZWQgY2hhcmFjdGVycywgaW5jbHVlcyBhIGZldyBzZXRzLlxuICAgICAgY2FzZSAnXFxcXCc6XG4gICAgICAgIGMgPSBzdHJbaSsrXTtcblxuICAgICAgICBzd2l0Y2ggKGMpIHtcbiAgICAgICAgICBjYXNlICdiJzpcbiAgICAgICAgICAgIGxhc3QucHVzaChwb3NpdGlvbnMud29yZEJvdW5kYXJ5KCkpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICBjYXNlICdCJzpcbiAgICAgICAgICAgIGxhc3QucHVzaChwb3NpdGlvbnMubm9uV29yZEJvdW5kYXJ5KCkpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICBjYXNlICd3JzpcbiAgICAgICAgICAgIGxhc3QucHVzaChzZXRzLndvcmRzKCkpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICBjYXNlICdXJzpcbiAgICAgICAgICAgIGxhc3QucHVzaChzZXRzLm5vdFdvcmRzKCkpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICBjYXNlICdkJzpcbiAgICAgICAgICAgIGxhc3QucHVzaChzZXRzLmludHMoKSk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGNhc2UgJ0QnOlxuICAgICAgICAgICAgbGFzdC5wdXNoKHNldHMubm90SW50cygpKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgY2FzZSAncyc6XG4gICAgICAgICAgICBsYXN0LnB1c2goc2V0cy53aGl0ZXNwYWNlKCkpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICBjYXNlICdTJzpcbiAgICAgICAgICAgIGxhc3QucHVzaChzZXRzLm5vdFdoaXRlc3BhY2UoKSk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAvLyBDaGVjayBpZiBjIGlzIGludGVnZXIuXG4gICAgICAgICAgICAvLyBJbiB3aGljaCBjYXNlIGl0J3MgYSByZWZlcmVuY2UuXG4gICAgICAgICAgICBpZiAoL1xcZC8udGVzdChjKSkge1xuICAgICAgICAgICAgICBsYXN0LnB1c2goeyB0eXBlOiB0eXBlcy5SRUZFUkVOQ0UsIHZhbHVlOiBwYXJzZUludChjLCAxMCkgfSk7XG5cbiAgICAgICAgICAgIC8vIEVzY2FwZWQgY2hhcmFjdGVyLlxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgbGFzdC5wdXNoKHsgdHlwZTogdHlwZXMuQ0hBUiwgdmFsdWU6IGMuY2hhckNvZGVBdCgwKSB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGJyZWFrO1xuXG5cbiAgICAgIC8vIFBvc2l0aW9uYWxzLlxuICAgICAgY2FzZSAnXic6XG4gICAgICAgIGxhc3QucHVzaChwb3NpdGlvbnMuYmVnaW4oKSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICckJzpcbiAgICAgICAgbGFzdC5wdXNoKHBvc2l0aW9ucy5lbmQoKSk7XG4gICAgICAgIGJyZWFrO1xuXG5cbiAgICAgIC8vIEhhbmRsZSBjdXN0b20gc2V0cy5cbiAgICAgIGNhc2UgJ1snOlxuICAgICAgICAvLyBDaGVjayBpZiB0aGlzIGNsYXNzIGlzICdhbnRpJyBpLmUuIFteYWJjXS5cbiAgICAgICAgdmFyIG5vdDtcbiAgICAgICAgaWYgKHN0cltpXSA9PT0gJ14nKSB7XG4gICAgICAgICAgbm90ID0gdHJ1ZTtcbiAgICAgICAgICBpKys7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbm90ID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBHZXQgYWxsIHRoZSBjaGFyYWN0ZXJzIGluIGNsYXNzLlxuICAgICAgICB2YXIgY2xhc3NUb2tlbnMgPSB1dGlsLnRva2VuaXplQ2xhc3Moc3RyLnNsaWNlKGkpLCByZWdleHBTdHIpO1xuXG4gICAgICAgIC8vIEluY3JlYXNlIGluZGV4IGJ5IGxlbmd0aCBvZiBjbGFzcy5cbiAgICAgICAgaSArPSBjbGFzc1Rva2Vuc1sxXTtcbiAgICAgICAgbGFzdC5wdXNoKHtcbiAgICAgICAgICB0eXBlOiB0eXBlcy5TRVQsXG4gICAgICAgICAgc2V0OiBjbGFzc1Rva2Vuc1swXSxcbiAgICAgICAgICBub3QsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGJyZWFrO1xuXG5cbiAgICAgIC8vIENsYXNzIG9mIGFueSBjaGFyYWN0ZXIgZXhjZXB0IFxcbi5cbiAgICAgIGNhc2UgJy4nOlxuICAgICAgICBsYXN0LnB1c2goc2V0cy5hbnlDaGFyKCkpO1xuICAgICAgICBicmVhaztcblxuXG4gICAgICAvLyBQdXNoIGdyb3VwIG9udG8gc3RhY2suXG4gICAgICBjYXNlICcoJzpcbiAgICAgICAgLy8gQ3JlYXRlIGdyb3VwLlxuICAgICAgICB2YXIgZ3JvdXAgPSB7XG4gICAgICAgICAgdHlwZTogdHlwZXMuR1JPVVAsXG4gICAgICAgICAgc3RhY2s6IFtdLFxuICAgICAgICAgIHJlbWVtYmVyOiB0cnVlLFxuICAgICAgICB9O1xuXG4gICAgICAgIGMgPSBzdHJbaV07XG5cbiAgICAgICAgLy8gSWYgaWYgdGhpcyBpcyBhIHNwZWNpYWwga2luZCBvZiBncm91cC5cbiAgICAgICAgaWYgKGMgPT09ICc/Jykge1xuICAgICAgICAgIGMgPSBzdHJbaSArIDFdO1xuICAgICAgICAgIGkgKz0gMjtcblxuICAgICAgICAgIC8vIE1hdGNoIGlmIGZvbGxvd2VkIGJ5LlxuICAgICAgICAgIGlmIChjID09PSAnPScpIHtcbiAgICAgICAgICAgIGdyb3VwLmZvbGxvd2VkQnkgPSB0cnVlO1xuXG4gICAgICAgICAgLy8gTWF0Y2ggaWYgbm90IGZvbGxvd2VkIGJ5LlxuICAgICAgICAgIH0gZWxzZSBpZiAoYyA9PT0gJyEnKSB7XG4gICAgICAgICAgICBncm91cC5ub3RGb2xsb3dlZEJ5ID0gdHJ1ZTtcblxuICAgICAgICAgIH0gZWxzZSBpZiAoYyAhPT0gJzonKSB7XG4gICAgICAgICAgICB1dGlsLmVycm9yKHJlZ2V4cFN0cixcbiAgICAgICAgICAgICAgYEludmFsaWQgZ3JvdXAsIGNoYXJhY3RlciAnJHtjfSdgICtcbiAgICAgICAgICAgICAgYCBhZnRlciAnPycgYXQgY29sdW1uICR7aSAtIDF9YCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZ3JvdXAucmVtZW1iZXIgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEluc2VydCBzdWJncm91cCBpbnRvIGN1cnJlbnQgZ3JvdXAgc3RhY2suXG4gICAgICAgIGxhc3QucHVzaChncm91cCk7XG5cbiAgICAgICAgLy8gUmVtZW1iZXIgdGhlIGN1cnJlbnQgZ3JvdXAgZm9yIHdoZW4gdGhlIGdyb3VwIGNsb3Nlcy5cbiAgICAgICAgZ3JvdXBTdGFjay5wdXNoKGxhc3RHcm91cCk7XG5cbiAgICAgICAgLy8gTWFrZSB0aGlzIG5ldyBncm91cCB0aGUgY3VycmVudCBncm91cC5cbiAgICAgICAgbGFzdEdyb3VwID0gZ3JvdXA7XG4gICAgICAgIGxhc3QgPSBncm91cC5zdGFjaztcbiAgICAgICAgYnJlYWs7XG5cblxuICAgICAgLy8gUG9wIGdyb3VwIG91dCBvZiBzdGFjay5cbiAgICAgIGNhc2UgJyknOlxuICAgICAgICBpZiAoZ3JvdXBTdGFjay5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICB1dGlsLmVycm9yKHJlZ2V4cFN0ciwgYFVubWF0Y2hlZCApIGF0IGNvbHVtbiAke2kgLSAxfWApO1xuICAgICAgICB9XG4gICAgICAgIGxhc3RHcm91cCA9IGdyb3VwU3RhY2sucG9wKCk7XG5cbiAgICAgICAgLy8gQ2hlY2sgaWYgdGhpcyBncm91cCBoYXMgYSBQSVBFLlxuICAgICAgICAvLyBUbyBnZXQgYmFjayB0aGUgY29ycmVjdCBsYXN0IHN0YWNrLlxuICAgICAgICBsYXN0ID0gbGFzdEdyb3VwLm9wdGlvbnMgP1xuICAgICAgICAgIGxhc3RHcm91cC5vcHRpb25zW2xhc3RHcm91cC5vcHRpb25zLmxlbmd0aCAtIDFdIDogbGFzdEdyb3VwLnN0YWNrO1xuICAgICAgICBicmVhaztcblxuXG4gICAgICAvLyBVc2UgcGlwZSBjaGFyYWN0ZXIgdG8gZ2l2ZSBtb3JlIGNob2ljZXMuXG4gICAgICBjYXNlICd8JzpcbiAgICAgICAgLy8gQ3JlYXRlIGFycmF5IHdoZXJlIG9wdGlvbnMgYXJlIGlmIHRoaXMgaXMgdGhlIGZpcnN0IFBJUEVcbiAgICAgICAgLy8gaW4gdGhpcyBjbGF1c2UuXG4gICAgICAgIGlmICghbGFzdEdyb3VwLm9wdGlvbnMpIHtcbiAgICAgICAgICBsYXN0R3JvdXAub3B0aW9ucyA9IFtsYXN0R3JvdXAuc3RhY2tdO1xuICAgICAgICAgIGRlbGV0ZSBsYXN0R3JvdXAuc3RhY2s7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDcmVhdGUgYSBuZXcgc3RhY2sgYW5kIGFkZCB0byBvcHRpb25zIGZvciByZXN0IG9mIGNsYXVzZS5cbiAgICAgICAgdmFyIHN0YWNrID0gW107XG4gICAgICAgIGxhc3RHcm91cC5vcHRpb25zLnB1c2goc3RhY2spO1xuICAgICAgICBsYXN0ID0gc3RhY2s7XG4gICAgICAgIGJyZWFrO1xuXG5cbiAgICAgIC8vIFJlcGV0aXRpb24uXG4gICAgICAvLyBGb3IgZXZlcnkgcmVwZXRpdGlvbiwgcmVtb3ZlIGxhc3QgZWxlbWVudCBmcm9tIGxhc3Qgc3RhY2tcbiAgICAgIC8vIHRoZW4gaW5zZXJ0IGJhY2sgYSBSQU5HRSBvYmplY3QuXG4gICAgICAvLyBUaGlzIGRlc2lnbiBpcyBjaG9zZW4gYmVjYXVzZSB0aGVyZSBjb3VsZCBiZSBtb3JlIHRoYW5cbiAgICAgIC8vIG9uZSByZXBldGl0aW9uIHN5bWJvbHMgaW4gYSByZWdleCBpLmUuIGBhPyt7MiwzfWAuXG4gICAgICBjYXNlICd7JzpcbiAgICAgICAgdmFyIHJzID0gL14oXFxkKykoLChcXGQrKT8pP1xcfS8uZXhlYyhzdHIuc2xpY2UoaSkpLCBtaW4sIG1heDtcbiAgICAgICAgaWYgKHJzICE9PSBudWxsKSB7XG4gICAgICAgICAgaWYgKGxhc3QubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXBlYXRFcnIoaSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIG1pbiA9IHBhcnNlSW50KHJzWzFdLCAxMCk7XG4gICAgICAgICAgbWF4ID0gcnNbMl0gPyByc1szXSA/IHBhcnNlSW50KHJzWzNdLCAxMCkgOiBJbmZpbml0eSA6IG1pbjtcbiAgICAgICAgICBpICs9IHJzWzBdLmxlbmd0aDtcblxuICAgICAgICAgIGxhc3QucHVzaCh7XG4gICAgICAgICAgICB0eXBlOiB0eXBlcy5SRVBFVElUSU9OLFxuICAgICAgICAgICAgbWluLFxuICAgICAgICAgICAgbWF4LFxuICAgICAgICAgICAgdmFsdWU6IGxhc3QucG9wKCksXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbGFzdC5wdXNoKHtcbiAgICAgICAgICAgIHR5cGU6IHR5cGVzLkNIQVIsXG4gICAgICAgICAgICB2YWx1ZTogMTIzLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICc/JzpcbiAgICAgICAgaWYgKGxhc3QubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgcmVwZWF0RXJyKGkpO1xuICAgICAgICB9XG4gICAgICAgIGxhc3QucHVzaCh7XG4gICAgICAgICAgdHlwZTogdHlwZXMuUkVQRVRJVElPTixcbiAgICAgICAgICBtaW46IDAsXG4gICAgICAgICAgbWF4OiAxLFxuICAgICAgICAgIHZhbHVlOiBsYXN0LnBvcCgpLFxuICAgICAgICB9KTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgJysnOlxuICAgICAgICBpZiAobGFzdC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICByZXBlYXRFcnIoaSk7XG4gICAgICAgIH1cbiAgICAgICAgbGFzdC5wdXNoKHtcbiAgICAgICAgICB0eXBlOiB0eXBlcy5SRVBFVElUSU9OLFxuICAgICAgICAgIG1pbjogMSxcbiAgICAgICAgICBtYXg6IEluZmluaXR5LFxuICAgICAgICAgIHZhbHVlOiBsYXN0LnBvcCgpLFxuICAgICAgICB9KTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgJyonOlxuICAgICAgICBpZiAobGFzdC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICByZXBlYXRFcnIoaSk7XG4gICAgICAgIH1cbiAgICAgICAgbGFzdC5wdXNoKHtcbiAgICAgICAgICB0eXBlOiB0eXBlcy5SRVBFVElUSU9OLFxuICAgICAgICAgIG1pbjogMCxcbiAgICAgICAgICBtYXg6IEluZmluaXR5LFxuICAgICAgICAgIHZhbHVlOiBsYXN0LnBvcCgpLFxuICAgICAgICB9KTtcbiAgICAgICAgYnJlYWs7XG5cblxuICAgICAgLy8gRGVmYXVsdCBpcyBhIGNoYXJhY3RlciB0aGF0IGlzIG5vdCBgXFxbXSgpe30/KypeJGAuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBsYXN0LnB1c2goe1xuICAgICAgICAgIHR5cGU6IHR5cGVzLkNIQVIsXG4gICAgICAgICAgdmFsdWU6IGMuY2hhckNvZGVBdCgwKSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gIH1cblxuICAvLyBDaGVjayBpZiBhbnkgZ3JvdXBzIGhhdmUgbm90IGJlZW4gY2xvc2VkLlxuICBpZiAoZ3JvdXBTdGFjay5sZW5ndGggIT09IDApIHtcbiAgICB1dGlsLmVycm9yKHJlZ2V4cFN0ciwgJ1VudGVybWluYXRlZCBncm91cCcpO1xuICB9XG5cbiAgcmV0dXJuIHN0YXJ0O1xufTtcblxubW9kdWxlLmV4cG9ydHMudHlwZXMgPSB0eXBlcztcbiIsICIndXNlIHN0cmljdCc7XG4vKiBlc2xpbnQgaW5kZW50OiA0ICovXG5cblxuLy8gUHJpdmF0ZSBoZWxwZXIgY2xhc3NcbmNsYXNzIFN1YlJhbmdlIHtcbiAgICBjb25zdHJ1Y3Rvcihsb3csIGhpZ2gpIHtcbiAgICAgICAgdGhpcy5sb3cgPSBsb3c7XG4gICAgICAgIHRoaXMuaGlnaCA9IGhpZ2g7XG4gICAgICAgIHRoaXMubGVuZ3RoID0gMSArIGhpZ2ggLSBsb3c7XG4gICAgfVxuXG4gICAgb3ZlcmxhcHMocmFuZ2UpIHtcbiAgICAgICAgcmV0dXJuICEodGhpcy5oaWdoIDwgcmFuZ2UubG93IHx8IHRoaXMubG93ID4gcmFuZ2UuaGlnaCk7XG4gICAgfVxuXG4gICAgdG91Y2hlcyhyYW5nZSkge1xuICAgICAgICByZXR1cm4gISh0aGlzLmhpZ2ggKyAxIDwgcmFuZ2UubG93IHx8IHRoaXMubG93IC0gMSA+IHJhbmdlLmhpZ2gpO1xuICAgIH1cblxuICAgIC8vIFJldHVybnMgaW5jbHVzaXZlIGNvbWJpbmF0aW9uIG9mIFN1YlJhbmdlcyBhcyBhIFN1YlJhbmdlLlxuICAgIGFkZChyYW5nZSkge1xuICAgICAgICByZXR1cm4gbmV3IFN1YlJhbmdlKFxuICAgICAgICAgICAgTWF0aC5taW4odGhpcy5sb3csIHJhbmdlLmxvdyksXG4gICAgICAgICAgICBNYXRoLm1heCh0aGlzLmhpZ2gsIHJhbmdlLmhpZ2gpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gUmV0dXJucyBzdWJ0cmFjdGlvbiBvZiBTdWJSYW5nZXMgYXMgYW4gYXJyYXkgb2YgU3ViUmFuZ2VzLlxuICAgIC8vIChUaGVyZSdzIGEgY2FzZSB3aGVyZSBzdWJ0cmFjdGlvbiBkaXZpZGVzIGl0IGluIDIpXG4gICAgc3VidHJhY3QocmFuZ2UpIHtcbiAgICAgICAgaWYgKHJhbmdlLmxvdyA8PSB0aGlzLmxvdyAmJiByYW5nZS5oaWdoID49IHRoaXMuaGlnaCkge1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9IGVsc2UgaWYgKHJhbmdlLmxvdyA+IHRoaXMubG93ICYmIHJhbmdlLmhpZ2ggPCB0aGlzLmhpZ2gpIHtcbiAgICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAgICAgbmV3IFN1YlJhbmdlKHRoaXMubG93LCByYW5nZS5sb3cgLSAxKSxcbiAgICAgICAgICAgICAgICBuZXcgU3ViUmFuZ2UocmFuZ2UuaGlnaCArIDEsIHRoaXMuaGlnaClcbiAgICAgICAgICAgIF07XG4gICAgICAgIH0gZWxzZSBpZiAocmFuZ2UubG93IDw9IHRoaXMubG93KSB7XG4gICAgICAgICAgICByZXR1cm4gW25ldyBTdWJSYW5nZShyYW5nZS5oaWdoICsgMSwgdGhpcy5oaWdoKV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gW25ldyBTdWJSYW5nZSh0aGlzLmxvdywgcmFuZ2UubG93IC0gMSldO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdG9TdHJpbmcoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxvdyA9PSB0aGlzLmhpZ2ggP1xuICAgICAgICAgICAgdGhpcy5sb3cudG9TdHJpbmcoKSA6IHRoaXMubG93ICsgJy0nICsgdGhpcy5oaWdoO1xuICAgIH1cbn1cblxuXG5jbGFzcyBEUmFuZ2Uge1xuICAgIGNvbnN0cnVjdG9yKGEsIGIpIHtcbiAgICAgICAgdGhpcy5yYW5nZXMgPSBbXTtcbiAgICAgICAgdGhpcy5sZW5ndGggPSAwO1xuICAgICAgICBpZiAoYSAhPSBudWxsKSB0aGlzLmFkZChhLCBiKTtcbiAgICB9XG5cbiAgICBfdXBkYXRlX2xlbmd0aCgpIHtcbiAgICAgICAgdGhpcy5sZW5ndGggPSB0aGlzLnJhbmdlcy5yZWR1Y2UoKHByZXZpb3VzLCByYW5nZSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHByZXZpb3VzICsgcmFuZ2UubGVuZ3RoO1xuICAgICAgICB9LCAwKTtcbiAgICB9XG5cbiAgICBhZGQoYSwgYikge1xuICAgICAgICB2YXIgX2FkZCA9IChzdWJyYW5nZSkgPT4ge1xuICAgICAgICAgICAgdmFyIGkgPSAwO1xuICAgICAgICAgICAgd2hpbGUgKGkgPCB0aGlzLnJhbmdlcy5sZW5ndGggJiYgIXN1YnJhbmdlLnRvdWNoZXModGhpcy5yYW5nZXNbaV0pKSB7XG4gICAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIG5ld1JhbmdlcyA9IHRoaXMucmFuZ2VzLnNsaWNlKDAsIGkpO1xuICAgICAgICAgICAgd2hpbGUgKGkgPCB0aGlzLnJhbmdlcy5sZW5ndGggJiYgc3VicmFuZ2UudG91Y2hlcyh0aGlzLnJhbmdlc1tpXSkpIHtcbiAgICAgICAgICAgICAgICBzdWJyYW5nZSA9IHN1YnJhbmdlLmFkZCh0aGlzLnJhbmdlc1tpXSk7XG4gICAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbmV3UmFuZ2VzLnB1c2goc3VicmFuZ2UpO1xuICAgICAgICAgICAgdGhpcy5yYW5nZXMgPSBuZXdSYW5nZXMuY29uY2F0KHRoaXMucmFuZ2VzLnNsaWNlKGkpKTtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZV9sZW5ndGgoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChhIGluc3RhbmNlb2YgRFJhbmdlKSB7XG4gICAgICAgICAgICBhLnJhbmdlcy5mb3JFYWNoKF9hZGQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGIgPT0gbnVsbCkgYiA9IGE7XG4gICAgICAgICAgICBfYWRkKG5ldyBTdWJSYW5nZShhLCBiKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgc3VidHJhY3QoYSwgYikge1xuICAgICAgICB2YXIgX3N1YnRyYWN0ID0gKHN1YnJhbmdlKSA9PiB7XG4gICAgICAgICAgICB2YXIgaSA9IDA7XG4gICAgICAgICAgICB3aGlsZSAoaSA8IHRoaXMucmFuZ2VzLmxlbmd0aCAmJiAhc3VicmFuZ2Uub3ZlcmxhcHModGhpcy5yYW5nZXNbaV0pKSB7XG4gICAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIG5ld1JhbmdlcyA9IHRoaXMucmFuZ2VzLnNsaWNlKDAsIGkpO1xuICAgICAgICAgICAgd2hpbGUgKGkgPCB0aGlzLnJhbmdlcy5sZW5ndGggJiYgc3VicmFuZ2Uub3ZlcmxhcHModGhpcy5yYW5nZXNbaV0pKSB7XG4gICAgICAgICAgICAgICAgbmV3UmFuZ2VzID0gbmV3UmFuZ2VzLmNvbmNhdCh0aGlzLnJhbmdlc1tpXS5zdWJ0cmFjdChzdWJyYW5nZSkpO1xuICAgICAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucmFuZ2VzID0gbmV3UmFuZ2VzLmNvbmNhdCh0aGlzLnJhbmdlcy5zbGljZShpKSk7XG4gICAgICAgICAgICB0aGlzLl91cGRhdGVfbGVuZ3RoKCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKGEgaW5zdGFuY2VvZiBEUmFuZ2UpIHtcbiAgICAgICAgICAgIGEucmFuZ2VzLmZvckVhY2goX3N1YnRyYWN0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChiID09IG51bGwpIGIgPSBhO1xuICAgICAgICAgICAgX3N1YnRyYWN0KG5ldyBTdWJSYW5nZShhLCBiKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgaW50ZXJzZWN0KGEsIGIpIHtcbiAgICAgICAgdmFyIG5ld1JhbmdlcyA9IFtdO1xuICAgICAgICB2YXIgX2ludGVyc2VjdCA9IChzdWJyYW5nZSkgPT4ge1xuICAgICAgICAgICAgdmFyIGkgPSAwO1xuICAgICAgICAgICAgd2hpbGUgKGkgPCB0aGlzLnJhbmdlcy5sZW5ndGggJiYgIXN1YnJhbmdlLm92ZXJsYXBzKHRoaXMucmFuZ2VzW2ldKSkge1xuICAgICAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHdoaWxlIChpIDwgdGhpcy5yYW5nZXMubGVuZ3RoICYmIHN1YnJhbmdlLm92ZXJsYXBzKHRoaXMucmFuZ2VzW2ldKSkge1xuICAgICAgICAgICAgICAgIHZhciBsb3cgPSBNYXRoLm1heCh0aGlzLnJhbmdlc1tpXS5sb3csIHN1YnJhbmdlLmxvdyk7XG4gICAgICAgICAgICAgICAgdmFyIGhpZ2ggPSBNYXRoLm1pbih0aGlzLnJhbmdlc1tpXS5oaWdoLCBzdWJyYW5nZS5oaWdoKTtcbiAgICAgICAgICAgICAgICBuZXdSYW5nZXMucHVzaChuZXcgU3ViUmFuZ2UobG93LCBoaWdoKSk7XG4gICAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChhIGluc3RhbmNlb2YgRFJhbmdlKSB7XG4gICAgICAgICAgICBhLnJhbmdlcy5mb3JFYWNoKF9pbnRlcnNlY3QpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGIgPT0gbnVsbCkgYiA9IGE7XG4gICAgICAgICAgICBfaW50ZXJzZWN0KG5ldyBTdWJSYW5nZShhLCBiKSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yYW5nZXMgPSBuZXdSYW5nZXM7XG4gICAgICAgIHRoaXMuX3VwZGF0ZV9sZW5ndGgoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgaW5kZXgoaW5kZXgpIHtcbiAgICAgICAgdmFyIGkgPSAwO1xuICAgICAgICB3aGlsZSAoaSA8IHRoaXMucmFuZ2VzLmxlbmd0aCAmJiB0aGlzLnJhbmdlc1tpXS5sZW5ndGggPD0gaW5kZXgpIHtcbiAgICAgICAgICAgIGluZGV4IC09IHRoaXMucmFuZ2VzW2ldLmxlbmd0aDtcbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5yYW5nZXNbaV0ubG93ICsgaW5kZXg7XG4gICAgfVxuXG4gICAgdG9TdHJpbmcoKSB7XG4gICAgICAgIHJldHVybiAnWyAnICsgdGhpcy5yYW5nZXMuam9pbignLCAnKSArICcgXSc7XG4gICAgfVxuXG4gICAgY2xvbmUoKSB7XG4gICAgICAgIHJldHVybiBuZXcgRFJhbmdlKHRoaXMpO1xuICAgIH1cblxuICAgIG51bWJlcnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJhbmdlcy5yZWR1Y2UoKHJlc3VsdCwgc3VicmFuZ2UpID0+IHtcbiAgICAgICAgICAgIHZhciBpID0gc3VicmFuZ2UubG93O1xuICAgICAgICAgICAgd2hpbGUgKGkgPD0gc3VicmFuZ2UuaGlnaCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGkpO1xuICAgICAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH0sIFtdKTtcbiAgICB9XG5cbiAgICBzdWJyYW5nZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJhbmdlcy5tYXAoKHN1YnJhbmdlKSA9PiAoe1xuICAgICAgICAgICAgbG93OiBzdWJyYW5nZS5sb3csXG4gICAgICAgICAgICBoaWdoOiBzdWJyYW5nZS5oaWdoLFxuICAgICAgICAgICAgbGVuZ3RoOiAxICsgc3VicmFuZ2UuaGlnaCAtIHN1YnJhbmdlLmxvd1xuICAgICAgICB9KSk7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IERSYW5nZTtcbiIsICJjb25zdCByZXQgICAgPSByZXF1aXJlKCdyZXQnKTtcbmNvbnN0IERSYW5nZSA9IHJlcXVpcmUoJ2RyYW5nZScpO1xuY29uc3QgdHlwZXMgID0gcmV0LnR5cGVzO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gY2xhc3MgUmFuZEV4cCB7XG4gIC8qKlxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQHBhcmFtIHtSZWdFeHB8U3RyaW5nfSByZWdleHBcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1cbiAgICovXG4gIGNvbnN0cnVjdG9yKHJlZ2V4cCwgbSkge1xuICAgIHRoaXMuX3NldERlZmF1bHRzKHJlZ2V4cCk7XG4gICAgaWYgKHJlZ2V4cCBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgICAgdGhpcy5pZ25vcmVDYXNlID0gcmVnZXhwLmlnbm9yZUNhc2U7XG4gICAgICB0aGlzLm11bHRpbGluZSA9IHJlZ2V4cC5tdWx0aWxpbmU7XG4gICAgICByZWdleHAgPSByZWdleHAuc291cmNlO1xuXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgcmVnZXhwID09PSAnc3RyaW5nJykge1xuICAgICAgdGhpcy5pZ25vcmVDYXNlID0gbSAmJiBtLmluZGV4T2YoJ2knKSAhPT0gLTE7XG4gICAgICB0aGlzLm11bHRpbGluZSA9IG0gJiYgbS5pbmRleE9mKCdtJykgIT09IC0xO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIGEgcmVnZXhwIG9yIHN0cmluZycpO1xuICAgIH1cblxuICAgIHRoaXMudG9rZW5zID0gcmV0KHJlZ2V4cCk7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgc29tZSBjdXN0b20gcHJvcGVydGllcyBoYXZlIGJlZW4gc2V0IGZvciB0aGlzIHJlZ2V4cC5cbiAgICpcbiAgICogQHBhcmFtIHtSYW5kRXhwfSByYW5kZXhwXG4gICAqIEBwYXJhbSB7UmVnRXhwfSByZWdleHBcbiAgICovXG4gIF9zZXREZWZhdWx0cyhyZWdleHApIHtcbiAgICAvLyBXaGVuIGEgcmVwZXRpdGlvbmFsIHRva2VuIGhhcyBpdHMgbWF4IHNldCB0byBJbmZpbml0ZSxcbiAgICAvLyByYW5kZXhwIHdvbid0IGFjdHVhbGx5IGdlbmVyYXRlIGEgcmFuZG9tIGFtb3VudCBiZXR3ZWVuIG1pbiBhbmQgSW5maW5pdGVcbiAgICAvLyBpbnN0ZWFkIGl0IHdpbGwgc2VlIEluZmluaXRlIGFzIG1pbiArIDEwMC5cbiAgICB0aGlzLm1heCA9IHJlZ2V4cC5tYXggIT0gbnVsbCA/IHJlZ2V4cC5tYXggOlxuICAgICAgUmFuZEV4cC5wcm90b3R5cGUubWF4ICE9IG51bGwgPyBSYW5kRXhwLnByb3RvdHlwZS5tYXggOiAxMDA7XG5cbiAgICAvLyBUaGlzIGFsbG93cyBleHBhbmRpbmcgdG8gaW5jbHVkZSBhZGRpdGlvbmFsIGNoYXJhY3RlcnNcbiAgICAvLyBmb3IgaW5zdGFuY2U6IFJhbmRFeHAuZGVmYXVsdFJhbmdlLmFkZCgwLCA2NTUzNSk7XG4gICAgdGhpcy5kZWZhdWx0UmFuZ2UgPSByZWdleHAuZGVmYXVsdFJhbmdlID9cbiAgICAgIHJlZ2V4cC5kZWZhdWx0UmFuZ2UgOiB0aGlzLmRlZmF1bHRSYW5nZS5jbG9uZSgpO1xuXG4gICAgaWYgKHJlZ2V4cC5yYW5kSW50KSB7XG4gICAgICB0aGlzLnJhbmRJbnQgPSByZWdleHAucmFuZEludDtcbiAgICB9XG4gIH1cblxuXG4gIC8qKlxuICAgKiBHZW5lcmF0ZXMgdGhlIHJhbmRvbSBzdHJpbmcuXG4gICAqXG4gICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICovXG4gIGdlbigpIHtcbiAgICByZXR1cm4gdGhpcy5fZ2VuKHRoaXMudG9rZW5zLCBbXSk7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBHZW5lcmF0ZSByYW5kb20gc3RyaW5nIG1vZGVsZWQgYWZ0ZXIgZ2l2ZW4gdG9rZW5zLlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gdG9rZW5cbiAgICogQHBhcmFtIHtBcnJheS48U3RyaW5nPn0gZ3JvdXBzXG4gICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICovXG4gIF9nZW4odG9rZW4sIGdyb3Vwcykge1xuICAgIHZhciBzdGFjaywgc3RyLCBuLCBpLCBsO1xuXG4gICAgc3dpdGNoICh0b2tlbi50eXBlKSB7XG4gICAgICBjYXNlIHR5cGVzLlJPT1Q6XG4gICAgICBjYXNlIHR5cGVzLkdST1VQOlxuICAgICAgICAvLyBJZ25vcmUgbG9va2FoZWFkcyBmb3Igbm93LlxuICAgICAgICBpZiAodG9rZW4uZm9sbG93ZWRCeSB8fCB0b2tlbi5ub3RGb2xsb3dlZEJ5KSB7IHJldHVybiAnJzsgfVxuXG4gICAgICAgIC8vIEluc2VydCBwbGFjZWhvbGRlciB1bnRpbCBncm91cCBzdHJpbmcgaXMgZ2VuZXJhdGVkLlxuICAgICAgICBpZiAodG9rZW4ucmVtZW1iZXIgJiYgdG9rZW4uZ3JvdXBOdW1iZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHRva2VuLmdyb3VwTnVtYmVyID0gZ3JvdXBzLnB1c2gobnVsbCkgLSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RhY2sgPSB0b2tlbi5vcHRpb25zID9cbiAgICAgICAgICB0aGlzLl9yYW5kU2VsZWN0KHRva2VuLm9wdGlvbnMpIDogdG9rZW4uc3RhY2s7XG5cbiAgICAgICAgc3RyID0gJyc7XG4gICAgICAgIGZvciAoaSA9IDAsIGwgPSBzdGFjay5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICBzdHIgKz0gdGhpcy5fZ2VuKHN0YWNrW2ldLCBncm91cHMpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRva2VuLnJlbWVtYmVyKSB7XG4gICAgICAgICAgZ3JvdXBzW3Rva2VuLmdyb3VwTnVtYmVyXSA9IHN0cjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3RyO1xuXG4gICAgICBjYXNlIHR5cGVzLlBPU0lUSU9OOlxuICAgICAgICAvLyBEbyBub3RoaW5nIGZvciBub3cuXG4gICAgICAgIHJldHVybiAnJztcblxuICAgICAgY2FzZSB0eXBlcy5TRVQ6XG4gICAgICAgIHZhciBleHBhbmRlZFNldCA9IHRoaXMuX2V4cGFuZCh0b2tlbik7XG4gICAgICAgIGlmICghZXhwYW5kZWRTZXQubGVuZ3RoKSB7IHJldHVybiAnJzsgfVxuICAgICAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZSh0aGlzLl9yYW5kU2VsZWN0KGV4cGFuZGVkU2V0KSk7XG5cbiAgICAgIGNhc2UgdHlwZXMuUkVQRVRJVElPTjpcbiAgICAgICAgLy8gUmFuZG9tbHkgZ2VuZXJhdGUgbnVtYmVyIGJldHdlZW4gbWluIGFuZCBtYXguXG4gICAgICAgIG4gPSB0aGlzLnJhbmRJbnQodG9rZW4ubWluLFxuICAgICAgICAgIHRva2VuLm1heCA9PT0gSW5maW5pdHkgPyB0b2tlbi5taW4gKyB0aGlzLm1heCA6IHRva2VuLm1heCk7XG5cbiAgICAgICAgc3RyID0gJyc7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICBzdHIgKz0gdGhpcy5fZ2VuKHRva2VuLnZhbHVlLCBncm91cHMpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHN0cjtcblxuICAgICAgY2FzZSB0eXBlcy5SRUZFUkVOQ0U6XG4gICAgICAgIHJldHVybiBncm91cHNbdG9rZW4udmFsdWUgLSAxXSB8fCAnJztcblxuICAgICAgY2FzZSB0eXBlcy5DSEFSOlxuICAgICAgICB2YXIgY29kZSA9IHRoaXMuaWdub3JlQ2FzZSAmJiB0aGlzLl9yYW5kQm9vbCgpID9cbiAgICAgICAgICB0aGlzLl90b090aGVyQ2FzZSh0b2tlbi52YWx1ZSkgOiB0b2tlbi52YWx1ZTtcbiAgICAgICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoY29kZSk7XG4gICAgfVxuICB9XG5cblxuICAvKipcbiAgICogSWYgY29kZSBpcyBhbHBoYWJldGljLCBjb252ZXJ0cyB0byBvdGhlciBjYXNlLlxuICAgKiBJZiBub3QgYWxwaGFiZXRpYywgcmV0dXJucyBiYWNrIGNvZGUuXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBjb2RlXG4gICAqIEByZXR1cm4ge051bWJlcn1cbiAgICovXG4gIF90b090aGVyQ2FzZShjb2RlKSB7XG4gICAgcmV0dXJuIGNvZGUgKyAoOTcgPD0gY29kZSAmJiBjb2RlIDw9IDEyMiA/IC0zMiA6XG4gICAgICA2NSA8PSBjb2RlICYmIGNvZGUgPD0gOTAgID8gIDMyIDogMCk7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBSYW5kb21seSByZXR1cm5zIGEgdHJ1ZSBvciBmYWxzZSB2YWx1ZS5cbiAgICpcbiAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICovXG4gIF9yYW5kQm9vbCgpIHtcbiAgICByZXR1cm4gIXRoaXMucmFuZEludCgwLCAxKTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIFJhbmRvbWx5IHNlbGVjdHMgYW5kIHJldHVybnMgYSB2YWx1ZSBmcm9tIHRoZSBhcnJheS5cbiAgICpcbiAgICogQHBhcmFtIHtBcnJheS48T2JqZWN0Pn0gYXJyXG4gICAqIEByZXR1cm4ge09iamVjdH1cbiAgICovXG4gIF9yYW5kU2VsZWN0KGFycikge1xuICAgIGlmIChhcnIgaW5zdGFuY2VvZiBEUmFuZ2UpIHtcbiAgICAgIHJldHVybiBhcnIuaW5kZXgodGhpcy5yYW5kSW50KDAsIGFyci5sZW5ndGggLSAxKSk7XG4gICAgfVxuICAgIHJldHVybiBhcnJbdGhpcy5yYW5kSW50KDAsIGFyci5sZW5ndGggLSAxKV07XG4gIH1cblxuXG4gIC8qKlxuICAgKiBleHBhbmRzIGEgdG9rZW4gdG8gYSBEaXNjb250aW51b3VzUmFuZ2Ugb2YgY2hhcmFjdGVycyB3aGljaCBoYXMgYVxuICAgKiBsZW5ndGggYW5kIGFuIGluZGV4IGZ1bmN0aW9uIChmb3IgcmFuZG9tIHNlbGVjdGluZylcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHRva2VuXG4gICAqIEByZXR1cm4ge0Rpc2NvbnRpbnVvdXNSYW5nZX1cbiAgICovXG4gIF9leHBhbmQodG9rZW4pIHtcbiAgICBpZiAodG9rZW4udHlwZSA9PT0gcmV0LnR5cGVzLkNIQVIpIHtcbiAgICAgIHJldHVybiBuZXcgRFJhbmdlKHRva2VuLnZhbHVlKTtcbiAgICB9IGVsc2UgaWYgKHRva2VuLnR5cGUgPT09IHJldC50eXBlcy5SQU5HRSkge1xuICAgICAgcmV0dXJuIG5ldyBEUmFuZ2UodG9rZW4uZnJvbSwgdG9rZW4udG8pO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgZHJhbmdlID0gbmV3IERSYW5nZSgpO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b2tlbi5zZXQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGV0IHN1YnJhbmdlID0gdGhpcy5fZXhwYW5kKHRva2VuLnNldFtpXSk7XG4gICAgICAgIGRyYW5nZS5hZGQoc3VicmFuZ2UpO1xuICAgICAgICBpZiAodGhpcy5pZ25vcmVDYXNlKSB7XG4gICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBzdWJyYW5nZS5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgbGV0IGNvZGUgPSBzdWJyYW5nZS5pbmRleChqKTtcbiAgICAgICAgICAgIGxldCBvdGhlckNhc2VDb2RlID0gdGhpcy5fdG9PdGhlckNhc2UoY29kZSk7XG4gICAgICAgICAgICBpZiAoY29kZSAhPT0gb3RoZXJDYXNlQ29kZSkge1xuICAgICAgICAgICAgICBkcmFuZ2UuYWRkKG90aGVyQ2FzZUNvZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHRva2VuLm5vdCkge1xuICAgICAgICByZXR1cm4gdGhpcy5kZWZhdWx0UmFuZ2UuY2xvbmUoKS5zdWJ0cmFjdChkcmFuZ2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGVmYXVsdFJhbmdlLmNsb25lKCkuaW50ZXJzZWN0KGRyYW5nZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cblxuICAvKipcbiAgICogUmFuZG9tbHkgZ2VuZXJhdGVzIGFuZCByZXR1cm5zIGEgbnVtYmVyIGJldHdlZW4gYSBhbmQgYiAoaW5jbHVzaXZlKS5cbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGFcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGJcbiAgICogQHJldHVybiB7TnVtYmVyfVxuICAgKi9cbiAgcmFuZEludChhLCBiKSB7XG4gICAgcmV0dXJuIGEgKyBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoMSArIGIgLSBhKSk7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBEZWZhdWx0IHJhbmdlIG9mIGNoYXJhY3RlcnMgdG8gZ2VuZXJhdGUgZnJvbS5cbiAgICovXG4gIGdldCBkZWZhdWx0UmFuZ2UoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3JhbmdlID0gdGhpcy5fcmFuZ2UgfHwgbmV3IERSYW5nZSgzMiwgMTI2KTtcbiAgfVxuXG4gIHNldCBkZWZhdWx0UmFuZ2UocmFuZ2UpIHtcbiAgICB0aGlzLl9yYW5nZSA9IHJhbmdlO1xuICB9XG5cblxuICAvKipcbiAgICpcbiAgICogRW5hYmxlcyB1c2Ugb2YgcmFuZGV4cCB3aXRoIGEgc2hvcnRlciBjYWxsLlxuICAgKlxuICAgKiBAcGFyYW0ge1JlZ0V4cHxTdHJpbmd8IHJlZ2V4cH1cbiAgICogQHBhcmFtIHtTdHJpbmd9IG1cbiAgICogQHJldHVybiB7U3RyaW5nfVxuICAgKi9cbiAgc3RhdGljIHJhbmRleHAocmVnZXhwLCBtKSB7XG4gICAgdmFyIHJhbmRleHA7XG4gICAgaWYodHlwZW9mIHJlZ2V4cCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJlZ2V4cCA9IG5ldyBSZWdFeHAocmVnZXhwLCBtKTtcbiAgICB9XG5cbiAgICBpZiAocmVnZXhwLl9yYW5kZXhwID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJhbmRleHAgPSBuZXcgUmFuZEV4cChyZWdleHAsIG0pO1xuICAgICAgcmVnZXhwLl9yYW5kZXhwID0gcmFuZGV4cDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmFuZGV4cCA9IHJlZ2V4cC5fcmFuZGV4cDtcbiAgICAgIHJhbmRleHAuX3NldERlZmF1bHRzKHJlZ2V4cCk7XG4gICAgfVxuICAgIHJldHVybiByYW5kZXhwLmdlbigpO1xuICB9XG5cblxuICAvKipcbiAgICogRW5hYmxlcyBzdWdhcnkgL3JlZ2V4cC8uZ2VuIHN5bnRheC5cbiAgICovXG4gIHN0YXRpYyBzdWdhcigpIHtcbiAgICAvKiBlc2hpbnQgZnJlZXplOmZhbHNlICovXG4gICAgUmVnRXhwLnByb3RvdHlwZS5nZW4gPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBSYW5kRXhwLnJhbmRleHAodGhpcyk7XG4gICAgfTtcbiAgfVxufTtcbiIsICJpbXBvcnQgUmFuZEV4cCBmcm9tICdyYW5kZXhwJztcblxuaW1wb3J0IG9wdGlvbkFQSSBmcm9tICcuLi9hcGkvb3B0aW9uLm1qcyc7XG5pbXBvcnQgZW52IGZyb20gJy4vY29uc3RhbnRzLm1qcyc7XG5cbmZ1bmN0aW9uIGdldFJhbmRvbUludGVnZXIobWluLCBtYXgpIHtcbiAgbWluID0gdHlwZW9mIG1pbiA9PT0gJ3VuZGVmaW5lZCcgPyBlbnYuTUlOX0lOVEVHRVIgOiBtaW47XG4gIG1heCA9IHR5cGVvZiBtYXggPT09ICd1bmRlZmluZWQnID8gZW52Lk1BWF9JTlRFR0VSIDogbWF4O1xuXG4gIHJldHVybiBNYXRoLmZsb29yKG9wdGlvbkFQSSgncmFuZG9tJykoKSAqICgobWF4IC0gbWluKSArIDEpKSArIG1pbjtcbn1cblxuZnVuY3Rpb24gX3JhbmRleHAodmFsdWUpIHtcbiAgLy8gc2V0IG1heGltdW0gZGVmYXVsdCwgc2VlICMxOTNcbiAgUmFuZEV4cC5wcm90b3R5cGUubWF4ID0gb3B0aW9uQVBJKCdkZWZhdWx0UmFuZEV4cE1heCcpO1xuXG4gIC8vIHNhbWUgaW1wbGVtZW50YXRpb24gYXMgdGhlIG9yaWdpbmFsIGV4Y2VwdCB1c2luZyBvdXIgcmFuZG9tXG4gIFJhbmRFeHAucHJvdG90eXBlLnJhbmRJbnQgPSAoYSwgYikgPT4gYSArIE1hdGguZmxvb3Iob3B0aW9uQVBJKCdyYW5kb20nKSgpICogKDEgKyAoYiAtIGEpKSk7XG5cbiAgY29uc3QgcmUgPSBuZXcgUmFuZEV4cCh2YWx1ZSk7XG5cbiAgcmV0dXJuIHJlLmdlbigpO1xufVxuXG4vKipcbiAqIFJldHVybnMgcmFuZG9tIGVsZW1lbnQgb2YgYSBjb2xsZWN0aW9uXG4gKlxuICogQHBhcmFtIGNvbGxlY3Rpb25cbiAqIEByZXR1cm5zIHtUfVxuICovXG5mdW5jdGlvbiBwaWNrKGNvbGxlY3Rpb24pIHtcbiAgcmV0dXJuIGNvbGxlY3Rpb25bTWF0aC5mbG9vcihvcHRpb25BUEkoJ3JhbmRvbScpKCkgKiBjb2xsZWN0aW9uLmxlbmd0aCldO1xufVxuXG4vKipcbiAqIFJldHVybnMgc2h1ZmZsZWQgY29sbGVjdGlvbiBvZiBlbGVtZW50c1xuICpcbiAqIEBwYXJhbSBjb2xsZWN0aW9uXG4gKiBAcmV0dXJucyB7VFtdfVxuICovXG5mdW5jdGlvbiBzaHVmZmxlKGNvbGxlY3Rpb24pIHtcbiAgbGV0IHRtcDtcbiAgbGV0IGtleTtcbiAgbGV0IGxlbmd0aCA9IGNvbGxlY3Rpb24ubGVuZ3RoO1xuXG4gIGNvbnN0IGNvcHkgPSBjb2xsZWN0aW9uLnNsaWNlKCk7XG5cbiAgZm9yICg7IGxlbmd0aCA+IDA7KSB7XG4gICAga2V5ID0gTWF0aC5mbG9vcihvcHRpb25BUEkoJ3JhbmRvbScpKCkgKiBsZW5ndGgpO1xuICAgIC8vIHN3YXBcbiAgICBsZW5ndGggLT0gMTtcbiAgICB0bXAgPSBjb3B5W2xlbmd0aF07XG4gICAgY29weVtsZW5ndGhdID0gY29weVtrZXldO1xuICAgIGNvcHlba2V5XSA9IHRtcDtcbiAgfVxuXG4gIHJldHVybiBjb3B5O1xufVxuXG5cbi8qKlxuICogUmV0dXJucyBhIHJhbmRvbSBpbnRlZ2VyIGJldHdlZW4gbWluIChpbmNsdXNpdmUpIGFuZCBtYXggKGluY2x1c2l2ZSlcbiAqIFVzaW5nIE1hdGgucm91bmQoKSB3aWxsIGdpdmUgeW91IGEgbm9uLXVuaWZvcm0gZGlzdHJpYnV0aW9uIVxuICogQHNlZSBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8xNTI3ODIwLzc2OTM4NFxuICovXG5mdW5jdGlvbiBnZXRSYW5kb20obWluLCBtYXgpIHtcbiAgcmV0dXJuIChvcHRpb25BUEkoJ3JhbmRvbScpKCkgKiAobWF4IC0gbWluKSkgKyBtaW47XG59XG5cbi8qKlxuICogR2VuZXJhdGVzIHJhbmRvbSBudW1iZXIgYWNjb3JkaW5nIHRvIHBhcmFtZXRlcnMgcGFzc2VkXG4gKlxuICogQHBhcmFtIG1pblxuICogQHBhcmFtIG1heFxuICogQHBhcmFtIGRlZk1pblxuICogQHBhcmFtIGRlZk1heFxuICogQHBhcmFtIGhhc1ByZWNpc2lvblxuICogQHJldHVybnMge251bWJlcn1cbiAqL1xuZnVuY3Rpb24gbnVtYmVyKG1pbiwgbWF4LCBkZWZNaW4sIGRlZk1heCwgaGFzUHJlY2lzaW9uID0gZmFsc2UpIHtcbiAgZGVmTWluID0gdHlwZW9mIGRlZk1pbiA9PT0gJ3VuZGVmaW5lZCcgPyBlbnYuTUlOX05VTUJFUiA6IGRlZk1pbjtcbiAgZGVmTWF4ID0gdHlwZW9mIGRlZk1heCA9PT0gJ3VuZGVmaW5lZCcgPyBlbnYuTUFYX05VTUJFUiA6IGRlZk1heDtcblxuICBtaW4gPSB0eXBlb2YgbWluID09PSAndW5kZWZpbmVkJyA/IGRlZk1pbiA6IG1pbjtcbiAgbWF4ID0gdHlwZW9mIG1heCA9PT0gJ3VuZGVmaW5lZCcgPyBkZWZNYXggOiBtYXg7XG5cbiAgaWYgKG1heCA8IG1pbikge1xuICAgIG1heCArPSBtaW47XG4gIH1cblxuICBpZiAoaGFzUHJlY2lzaW9uKSB7XG4gICAgcmV0dXJuIGdldFJhbmRvbShtaW4sIG1heCk7XG4gIH1cblxuICByZXR1cm4gZ2V0UmFuZG9tSW50ZWdlcihtaW4sIG1heCk7XG59XG5cbmZ1bmN0aW9uIGJ5KHR5cGUpIHtcbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSAnc2Vjb25kcyc6XG4gICAgICByZXR1cm4gbnVtYmVyKDAsIDYwKSAqIDYwO1xuXG4gICAgY2FzZSAnbWludXRlcyc6XG4gICAgICByZXR1cm4gbnVtYmVyKDE1LCA1MCkgKiA2MTI7XG5cbiAgICBjYXNlICdob3Vycyc6XG4gICAgICByZXR1cm4gbnVtYmVyKDEyLCA3MikgKiAzNjEyMztcblxuICAgIGNhc2UgJ2RheXMnOlxuICAgICAgcmV0dXJuIG51bWJlcig3LCAzMCkgKiA4NjQxMjM0NTtcblxuICAgIGNhc2UgJ3dlZWtzJzpcbiAgICAgIHJldHVybiBudW1iZXIoNCwgNTIpICogNjA0ODEyMzQ1O1xuXG4gICAgY2FzZSAnbW9udGhzJzpcbiAgICAgIHJldHVybiBudW1iZXIoMiwgMTMpICogMjU5MjAxMjM0NTtcblxuICAgIGNhc2UgJ3llYXJzJzpcbiAgICAgIHJldHVybiBudW1iZXIoMSwgMjApICogMzExMDQwMTIzNDU7XG5cbiAgICBkZWZhdWx0OiBicmVhaztcbiAgfVxufVxuXG5mdW5jdGlvbiBkYXRlKHN0ZXApIHtcbiAgaWYgKHN0ZXApIHtcbiAgICByZXR1cm4gYnkoc3RlcCk7XG4gIH1cblxuICBsZXQgZWFybGllc3QgPSBvcHRpb25BUEkoJ21pbkRhdGVUaW1lJyk7XG4gIGxldCBsYXRlc3QgPSBvcHRpb25BUEkoJ21heERhdGVUaW1lJyk7XG5cbiAgLy8gY29udmVydCB0byBkYXRlIGlmIHN0cmluZ1xuICBpZiAodHlwZW9mIGVhcmxpZXN0ID09PSAnc3RyaW5nJykge1xuICAgIGVhcmxpZXN0ID0gbmV3IERhdGUoZWFybGllc3QpO1xuICB9XG4gIGlmICh0eXBlb2YgbGF0ZXN0ID09PSAnc3RyaW5nJykge1xuICAgIGxhdGVzdCA9IG5ldyBEYXRlKGxhdGVzdCk7XG4gIH1cblxuICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgLy8gY29udmVydCB0byBkYXRlIGlmIG51bWJlclxuICBpZiAodHlwZW9mIGVhcmxpZXN0ID09PSAnbnVtYmVyJykge1xuICAgIGVhcmxpZXN0ID0gbmV3IERhdGUobm93ICsgZWFybGllc3QpO1xuICB9XG4gIGlmICh0eXBlb2YgbGF0ZXN0ID09PSAnbnVtYmVyJykge1xuICAgIGxhdGVzdCA9IG5ldyBEYXRlKG5vdyArIGxhdGVzdCk7XG4gIH1cblxuICByZXR1cm4gbmV3IERhdGUoZ2V0UmFuZG9tKGVhcmxpZXN0LmdldFRpbWUoKSwgbGF0ZXN0LmdldFRpbWUoKSkpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHBpY2ssXG4gIGRhdGUsXG4gIHNodWZmbGUsXG4gIG51bWJlcixcbiAgcmFuZGV4cDogX3JhbmRleHAsXG59O1xuIiwgImltcG9ydCBvcHRpb25BUEkgZnJvbSAnLi4vYXBpL29wdGlvbi5tanMnO1xuaW1wb3J0IGVudiBmcm9tICcuL2NvbnN0YW50cy5tanMnO1xuaW1wb3J0IHJhbmRvbSBmcm9tICcuL3JhbmRvbS5tanMnO1xuXG5jb25zdCBSRV9OVU1FUklDID0gL14oMHxbMS05XVswLTldKikkLztcblxuZnVuY3Rpb24gZ2V0TG9jYWxSZWYob2JqLCBwYXRoLCByZWZzKSB7XG4gIHBhdGggPSBkZWNvZGVVUklDb21wb25lbnQocGF0aCk7XG5cbiAgaWYgKHJlZnMgJiYgcmVmc1twYXRoXSkgcmV0dXJuIGNsb25lKHJlZnNbcGF0aF0pOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG5cbiAgY29uc3Qga2V5RWxlbWVudHMgPSBwYXRoLnJlcGxhY2UoJyMvJywgJy8nKS5zcGxpdCgnLycpO1xuXG4gIGxldCBzY2hlbWEgPSAob2JqLiRyZWYgJiYgcmVmcyAmJiByZWZzW29iai4kcmVmXSkgfHwgb2JqO1xuICBpZiAoIXNjaGVtYSAmJiAha2V5RWxlbWVudHNbMF0pIHtcbiAgICBrZXlFbGVtZW50c1swXSA9IG9iai4kcmVmLnNwbGl0KCcjLycpWzBdO1xuICB9XG4gIGlmIChyZWZzICYmIHBhdGguaW5jbHVkZXMoJyMvJykgJiYgcmVmc1trZXlFbGVtZW50c1swXV0pIHtcbiAgICBzY2hlbWEgPSByZWZzW2tleUVsZW1lbnRzLnNoaWZ0KCldO1xuICB9XG5cbiAgaWYgKCFrZXlFbGVtZW50c1swXSkga2V5RWxlbWVudHMuc2hpZnQoKTtcblxuICB3aGlsZSAoc2NoZW1hICYmIGtleUVsZW1lbnRzLmxlbmd0aCA+IDApIHtcbiAgICBjb25zdCBwcm9wID0ga2V5RWxlbWVudHMuc2hpZnQoKTtcblxuICAgIGlmICghc2NoZW1hW3Byb3BdKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFByb3Agbm90IGZvdW5kOiAke3Byb3B9ICgke3BhdGh9KWApO1xuICAgIH1cblxuICAgIHNjaGVtYSA9IHNjaGVtYVtwcm9wXTtcbiAgfVxuICByZXR1cm4gc2NoZW1hO1xufVxuXG4vKipcbiAqIFJldHVybnMgdHJ1ZS9mYWxzZSBpZiBnaXZlbiB2YWx1ZSBjYW4gYmUgdHJlYXRlZCBhcyBudW1iZXIvaW50ZWdlclxuICpcbiAqIEBwYXJhbSB2YWx1ZVxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGlzTnVtZXJpYyh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyAmJiBSRV9OVU1FUklDLnRlc3QodmFsdWUpO1xufVxuXG4vKipcbiAqIFJldHVybnMgdHJ1ZS9mYWxzZSBpZiBnaXZlbiB2YWx1ZSBpcyBhIG51bWJlciBvciBib29sZWFuXG4gKlxuICogQHBhcmFtIHZhbHVlXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gaXNTY2FsYXIodmFsdWUpIHtcbiAgcmV0dXJuIFsnbnVtYmVyJywgJ2Jvb2xlYW4nXS5pbmNsdWRlcyh0eXBlb2YgdmFsdWUpO1xufVxuXG4gLyoqXG4gKiBSZXR1cm5zIHRydWUvZmFsc2Ugd2hldGhlciB0aGUgb2JqZWN0IHBhcmFtZXRlciBoYXMgaXRzIG93biBwcm9wZXJ0aWVzIGRlZmluZWRcbiAqXG4gKiBAcGFyYW0gb2JqXG4gKiBAcGFyYW0gcHJvcGVydGllc1xuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGhhc1Byb3BlcnRpZXMob2JqLCAuLi5wcm9wZXJ0aWVzKSB7XG4gIHJldHVybiBwcm9wZXJ0aWVzLmZpbHRlcihrZXkgPT4ge1xuICAgIHJldHVybiB0eXBlb2Ygb2JqW2tleV0gIT09ICd1bmRlZmluZWQnO1xuICB9KS5sZW5ndGggPiAwO1xufVxuXG4vKipcbiAqIE5vcm1hbGl6ZSBnZW5lcmF0ZWQgZGF0ZSBZWVlZLU1NLUREIHRvIG5vdCBoYXZlXG4gKiBvdXQgb2YgcmFuZ2UgdmFsdWVzXG4gKlxuICogQHBhcmFtIHZhbHVlXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBjbGFtcERhdGUodmFsdWUpIHtcbiAgaWYgKHZhbHVlLmluY2x1ZGVzKCcgJykpIHtcbiAgICByZXR1cm4gbmV3IERhdGUodmFsdWUpLnRvSVNPU3RyaW5nKCkuc3Vic3RyKDAsIDEwKTtcbiAgfVxuXG4gIGxldCBbeWVhciwgbW9udGgsIGRheV0gPSB2YWx1ZS5zcGxpdCgnVCcpWzBdLnNwbGl0KCctJyk7XG5cbiAgbW9udGggPSBgMCR7TWF0aC5tYXgoMSwgTWF0aC5taW4oMTIsIG1vbnRoKSl9YC5zbGljZSgtMik7XG4gIGRheSA9IGAwJHtNYXRoLm1heCgxLCBNYXRoLm1pbigzMSwgZGF5KSl9YC5zbGljZSgtMik7XG5cbiAgcmV0dXJuIGAke3llYXJ9LSR7bW9udGh9LSR7ZGF5fWA7XG59XG5cbi8qKlxuICogTm9ybWFsaXplIGdlbmVyYXRlZCBkYXRlLXRpbWUgdmFsdWVzIFlZWVktTU0tRERUSEg6bW06c3MgdG8gbm90IGhhdmVcbiAqIG91dCBvZiByYW5nZSB2YWx1ZXNcbiAqXG4gKiBAcGFyYW0gdmFsdWVcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGNsYW1wRGF0ZVRpbWUodmFsdWUpIHtcbiAgaWYgKHZhbHVlLmluY2x1ZGVzKCcgJykpIHtcbiAgICByZXR1cm4gbmV3IERhdGUodmFsdWUpLnRvSVNPU3RyaW5nKCkuc3Vic3RyKDAsIDEwKTtcbiAgfVxuXG4gIGNvbnN0IFtkYXRlUGFydCwgdGltZVBhcnRdID0gdmFsdWUuc3BsaXQoJ1QnKTtcbiAgbGV0IFt5ZWFyLCBtb250aCwgZGF5XSA9IGRhdGVQYXJ0LnNwbGl0KCctJyk7XG4gIGxldCBbaG91ciwgbWludXRlLCBzZWNvbmRdID0gdGltZVBhcnQuc3Vic3RyKDAsIDgpLnNwbGl0KCc6Jyk7XG5cbiAgbW9udGggPSBgMCR7TWF0aC5tYXgoMSwgTWF0aC5taW4oMTIsIG1vbnRoKSl9YC5zbGljZSgtMik7XG4gIGRheSA9IGAwJHtNYXRoLm1heCgxLCBNYXRoLm1pbigzMSwgZGF5KSl9YC5zbGljZSgtMik7XG4gIGhvdXIgPSBgMCR7TWF0aC5tYXgoMSwgTWF0aC5taW4oMjMsIGhvdXIpKX1gLnNsaWNlKC0yKTtcbiAgbWludXRlID0gYDAke01hdGgubWF4KDEsIE1hdGgubWluKDU5LCBtaW51dGUpKX1gLnNsaWNlKC0yKTtcbiAgc2Vjb25kID0gYDAke01hdGgubWF4KDEsIE1hdGgubWluKDU5LCBzZWNvbmQpKX1gLnNsaWNlKC0yKTtcblxuICByZXR1cm4gYCR7eWVhcn0tJHttb250aH0tJHtkYXl9VCR7aG91cn06JHttaW51dGV9OiR7c2Vjb25kfS4wMDBaYDtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHR5cGVjYXN0ZWQgdmFsdWUuXG4gKiBFeHRlcm5hbCBnZW5lcmF0b3JzIChmYWtlciwgY2hhbmNlLCBjYXN1YWwpIG1heSByZXR1cm4gZGF0YSBpbiBub24tZXhwZWN0ZWQgZm9ybWF0cywgc3VjaCBhcyBzdHJpbmcsIHdoZW4geW91IG1pZ2h0IGV4cGVjdCBhblxuICogaW50ZWdlci4gVGhpcyBmdW5jdGlvbiBpcyB1c2VkIHRvIGZvcmNlIHRoZSB0eXBlY2FzdC4gVGhpcyBpcyB0aGUgYmFzZSBmb3JtYXR0ZXIgZm9yIGFsbCByZXN1bHQgdmFsdWVzLlxuICpcbiAqIEBwYXJhbSB0eXBlXG4gKiBAcGFyYW0gc2NoZW1hXG4gKiBAcGFyYW0gY2FsbGJhY2tcbiAqIEByZXR1cm5zIHthbnl9XG4gKi9cbmZ1bmN0aW9uIHR5cGVjYXN0KHR5cGUsIHNjaGVtYSwgY2FsbGJhY2spIHtcbiAgY29uc3QgcGFyYW1zID0ge307XG5cbiAgLy8gbm9ybWFsaXplIGNvbnN0cmFpbnRzXG4gIHN3aXRjaCAodHlwZSB8fCBzY2hlbWEudHlwZSkge1xuICAgIGNhc2UgJ2ludGVnZXInOlxuICAgIGNhc2UgJ251bWJlcic6XG4gICAgICBpZiAodHlwZW9mIHNjaGVtYS5taW5pbXVtICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBwYXJhbXMubWluaW11bSA9IHNjaGVtYS5taW5pbXVtO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIHNjaGVtYS5tYXhpbXVtICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBwYXJhbXMubWF4aW11bSA9IHNjaGVtYS5tYXhpbXVtO1xuICAgICAgfVxuXG4gICAgICBpZiAoc2NoZW1hLmVudW0pIHtcbiAgICAgICAgbGV0IG1pbiA9IE1hdGgubWF4KHBhcmFtcy5taW5pbXVtIHx8IDAsIDApO1xuICAgICAgICBsZXQgbWF4ID0gTWF0aC5taW4ocGFyYW1zLm1heGltdW0gfHwgSW5maW5pdHksIEluZmluaXR5KTtcblxuICAgICAgICBpZiAoc2NoZW1hLmV4Y2x1c2l2ZU1pbmltdW0gJiYgbWluID09PSBzY2hlbWEubWluaW11bSkge1xuICAgICAgICAgIG1pbiArPSBzY2hlbWEubXVsdGlwbGVPZiB8fCAxO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNjaGVtYS5leGNsdXNpdmVNYXhpbXVtICYmIG1heCA9PT0gc2NoZW1hLm1heGltdW0pIHtcbiAgICAgICAgICBtYXggLT0gc2NoZW1hLm11bHRpcGxlT2YgfHwgMTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGRpc2NhcmQgb3V0LW9mLWJvdW5kcyBlbnVtZXJhdGlvbnNcbiAgICAgICAgaWYgKG1pbiB8fCBtYXggIT09IEluZmluaXR5KSB7XG4gICAgICAgICAgc2NoZW1hLmVudW0gPSBzY2hlbWEuZW51bS5maWx0ZXIoeCA9PiB7XG4gICAgICAgICAgICBpZiAoeCA+PSBtaW4gJiYgeCA8PSBtYXgpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBicmVhaztcblxuICAgIGNhc2UgJ3N0cmluZyc6IHtcbiAgICAgIHBhcmFtcy5taW5MZW5ndGggPSBvcHRpb25BUEkoJ21pbkxlbmd0aCcpIHx8IDA7XG4gICAgICBwYXJhbXMubWF4TGVuZ3RoID0gb3B0aW9uQVBJKCdtYXhMZW5ndGgnKSB8fCBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUjtcblxuICAgICAgaWYgKHR5cGVvZiBzY2hlbWEubWluTGVuZ3RoICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBwYXJhbXMubWluTGVuZ3RoID0gTWF0aC5tYXgocGFyYW1zLm1pbkxlbmd0aCwgc2NoZW1hLm1pbkxlbmd0aCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2Ygc2NoZW1hLm1heExlbmd0aCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcGFyYW1zLm1heExlbmd0aCA9IE1hdGgubWluKHBhcmFtcy5tYXhMZW5ndGgsIHNjaGVtYS5tYXhMZW5ndGgpO1xuICAgICAgfVxuXG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICBkZWZhdWx0OiBicmVhaztcbiAgfVxuXG4gIC8vIGV4ZWN1dGUgZ2VuZXJhdG9yXG4gIGxldCB2YWx1ZSA9IGNhbGxiYWNrKHBhcmFtcyk7XG5cbiAgLy8gYWxsb3cgbnVsbCB2YWx1ZXMgdG8gYmUgcmV0dXJuZWRcbiAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8vIG5vcm1hbGl6ZSBvdXRwdXQgdmFsdWVcbiAgc3dpdGNoICh0eXBlIHx8IHNjaGVtYS50eXBlKSB7XG4gICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgIHZhbHVlID0gaXNOdW1lcmljKHZhbHVlKSA/IHBhcnNlRmxvYXQodmFsdWUpIDogdmFsdWU7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgJ2ludGVnZXInOlxuICAgICAgdmFsdWUgPSBpc051bWVyaWModmFsdWUpID8gcGFyc2VJbnQodmFsdWUsIDEwKSA6IHZhbHVlO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlICdib29sZWFuJzpcbiAgICAgIHZhbHVlID0gISF2YWx1ZTtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSAnc3RyaW5nJzoge1xuICAgICAgaWYgKGlzU2NhbGFyKHZhbHVlKSkge1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICB9XG5cbiAgICAgIHZhbHVlID0gU3RyaW5nKHZhbHVlKTtcblxuICAgICAgY29uc3QgbWluID0gTWF0aC5tYXgocGFyYW1zLm1pbkxlbmd0aCB8fCAwLCAwKTtcbiAgICAgIGNvbnN0IG1heCA9IE1hdGgubWluKHBhcmFtcy5tYXhMZW5ndGggfHwgSW5maW5pdHksIEluZmluaXR5KTtcblxuICAgICAgbGV0IHByZXY7XG4gICAgICBsZXQgbm9DaGFuZ2VDb3VudCA9IDA7XG5cbiAgICAgIHdoaWxlICh2YWx1ZS5sZW5ndGggPCBtaW4pIHtcbiAgICAgICAgcHJldiA9IHZhbHVlO1xuXG4gICAgICAgIGlmICghc2NoZW1hLnBhdHRlcm4pIHtcbiAgICAgICAgICB2YWx1ZSArPSBgJHtyYW5kb20ucGljayhbJyAnLCAnLycsICdfJywgJy0nLCAnKycsICc9JywgJ0AnLCAnXiddKX0ke3ZhbHVlfWA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFsdWUgKz0gcmFuZG9tLnJhbmRleHAoc2NoZW1hLnBhdHRlcm4pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gYXZvaWQgaW5maW5pdGUtbG9vcHMgd2hpbGUgZmlsbGluZyBzdHJpbmdzLCBpZiBubyBjaGFuZ2VzXG4gICAgICAgIC8vIGFyZSBtYWRlIHdlIGp1c3QgYnJlYWsgdGhlIGxvb3AuLi4gc2VlICM1NDBcbiAgICAgICAgaWYgKHZhbHVlID09PSBwcmV2KSB7XG4gICAgICAgICAgbm9DaGFuZ2VDb3VudCArPSAxO1xuICAgICAgICAgIGlmIChub0NoYW5nZUNvdW50ID09PSAzKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbm9DaGFuZ2VDb3VudCA9IDA7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHZhbHVlLmxlbmd0aCA+IG1heCkge1xuICAgICAgICB2YWx1ZSA9IHZhbHVlLnN1YnN0cigwLCBtYXgpO1xuICAgICAgfVxuXG4gICAgICBzd2l0Y2ggKHNjaGVtYS5mb3JtYXQpIHtcbiAgICAgICAgY2FzZSAnZGF0ZS10aW1lJzpcbiAgICAgICAgY2FzZSAnZGF0ZXRpbWUnOlxuICAgICAgICAgIHZhbHVlID0gbmV3IERhdGUoY2xhbXBEYXRlVGltZSh2YWx1ZSkpLnRvSVNPU3RyaW5nKCkucmVwbGFjZSgvKFswLTldKTArWiQvLCAnJDFaJyk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnZnVsbC1kYXRlJzpcbiAgICAgICAgY2FzZSAnZGF0ZSc6XG4gICAgICAgICAgdmFsdWUgPSBuZXcgRGF0ZShjbGFtcERhdGUodmFsdWUpKS50b0lTT1N0cmluZygpLnN1YnN0cigwLCAxMCk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAndGltZSc6XG4gICAgICAgICAgdmFsdWUgPSBuZXcgRGF0ZShgMTk2OS0wMS0wMSAke3ZhbHVlfWApLnRvSVNPU3RyaW5nKCkuc3Vic3RyKDExKTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgZGVmYXVsdDogYnJlYWs7XG4gIH1cblxuICByZXR1cm4gdmFsdWU7XG59XG5cbmZ1bmN0aW9uIG1lcmdlKGEsIGIpIHtcbiAgT2JqZWN0LmtleXMoYikuZm9yRWFjaChrZXkgPT4ge1xuICAgIGlmICh0eXBlb2YgYltrZXldICE9PSAnb2JqZWN0JyB8fCBiW2tleV0gPT09IG51bGwpIHtcbiAgICAgIGFba2V5XSA9IGJba2V5XTtcbiAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoYltrZXldKSkge1xuICAgICAgYVtrZXldID0gYVtrZXldIHx8IFtdO1xuICAgICAgLy8gZml4ICMyOTIgLSBza2lwIGR1cGxpY2F0ZWQgdmFsdWVzIGZyb20gbWVyZ2Ugb2JqZWN0IChiKVxuICAgICAgYltrZXldLmZvckVhY2goKHZhbHVlLCBpKSA9PiB7XG4gICAgICAgIGlmIChhLnR5cGUgPT09ICdhcnJheScgJiYgYi50eXBlID09PSAnYXJyYXknKSB7XG4gICAgICAgICAgYVtrZXldW2ldID0gbWVyZ2UoYVtrZXldW2ldIHx8IHt9LCB2YWx1ZSwgdHJ1ZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShhW2tleV0pICYmIGFba2V5XS5pbmRleE9mKHZhbHVlKSA9PT0gLTEpIHtcbiAgICAgICAgICBhW2tleV0ucHVzaCh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGFba2V5XSAhPT0gJ29iamVjdCcgfHwgYVtrZXldID09PSBudWxsIHx8IEFycmF5LmlzQXJyYXkoYVtrZXldKSkge1xuICAgICAgYVtrZXldID0gbWVyZ2Uoe30sIGJba2V5XSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFba2V5XSA9IG1lcmdlKGFba2V5XSwgYltrZXldKTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBhO1xufVxuXG5mdW5jdGlvbiBjbG9uZShvYmosIGNhY2hlID0gbmV3IE1hcCgpKSB7XG4gIGlmICghb2JqIHx8IHR5cGVvZiBvYmogIT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIG9iajtcbiAgfVxuXG4gIGlmIChjYWNoZS5oYXMob2JqKSkge1xuICAgIHJldHVybiBjYWNoZS5nZXQob2JqKTtcbiAgfVxuXG4gIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcbiAgICBjb25zdCBhcnIgPSBbXTtcbiAgICBjYWNoZS5zZXQob2JqLCBhcnIpO1xuXG4gICAgYXJyLnB1c2goLi4ub2JqLm1hcCh4ID0+IGNsb25lKHgsIGNhY2hlKSkpO1xuICAgIHJldHVybiBhcnI7XG4gIH1cblxuICBjb25zdCBjbG9uZWRPYmogPSB7fTtcbiAgY2FjaGUuc2V0KG9iaiwgY2xvbmVkT2JqKTtcblxuICByZXR1cm4gT2JqZWN0LmtleXMob2JqKS5yZWR1Y2UoKHByZXYsIGN1cikgPT4ge1xuICAgIHByZXZbY3VyXSA9IGNsb25lKG9ialtjdXJdLCBjYWNoZSk7XG4gICAgcmV0dXJuIHByZXY7XG4gIH0sIGNsb25lZE9iaik7XG59XG5cbmZ1bmN0aW9uIHNob3J0KHNjaGVtYSkge1xuICBjb25zdCBzID0gSlNPTi5zdHJpbmdpZnkoc2NoZW1hKTtcbiAgY29uc3QgbCA9IEpTT04uc3RyaW5naWZ5KHNjaGVtYSwgbnVsbCwgMik7XG5cbiAgcmV0dXJuIHMubGVuZ3RoID4gNDAwID8gYCR7bC5zdWJzdHIoMCwgNDAwKX0uLi5gIDogbDtcbn1cblxuZnVuY3Rpb24gYW55VmFsdWUoKSB7XG4gIHJldHVybiByYW5kb20ucGljayhbXG4gICAgZmFsc2UsXG4gICAgdHJ1ZSxcbiAgICBudWxsLFxuICAgIC0xLFxuICAgIE5hTixcbiAgICBNYXRoLlBJLFxuICAgIEluZmluaXR5LFxuICAgIHVuZGVmaW5lZCxcbiAgICBbXSxcbiAgICB7fSxcbiAgICAvLyBGSVhNRTogdXNlIGJ1aWx0LWluIHJhbmRvbT9cbiAgICBNYXRoLnJhbmRvbSgpLFxuICAgIE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cigyKSxcbiAgXSk7XG59XG5cbmZ1bmN0aW9uIGhhc1ZhbHVlKHNjaGVtYSwgdmFsdWUpIHtcbiAgaWYgKHNjaGVtYS5lbnVtKSByZXR1cm4gc2NoZW1hLmVudW0uaW5jbHVkZXModmFsdWUpO1xuICBpZiAoc2NoZW1hLmNvbnN0KSByZXR1cm4gc2NoZW1hLmNvbnN0ID09PSB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gbm90VmFsdWUoc2NoZW1hLCBwYXJlbnQpIHtcbiAgY29uc3QgY29weSA9IG1lcmdlKHt9LCBwYXJlbnQpO1xuXG4gIGlmICh0eXBlb2Ygc2NoZW1hLm1pbmltdW0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgY29weS5tYXhpbXVtID0gc2NoZW1hLm1pbmltdW07XG4gICAgY29weS5leGNsdXNpdmVNYXhpbXVtID0gdHJ1ZTtcbiAgfVxuXG4gIGlmICh0eXBlb2Ygc2NoZW1hLm1heGltdW0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgY29weS5taW5pbXVtID0gc2NoZW1hLm1heGltdW0gPiBjb3B5Lm1heGltdW0gPyAwIDogc2NoZW1hLm1heGltdW07XG4gICAgY29weS5leGNsdXNpdmVNaW5pbXVtID0gdHJ1ZTtcbiAgfVxuXG4gIGlmICh0eXBlb2Ygc2NoZW1hLm1pbkxlbmd0aCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBjb3B5Lm1heExlbmd0aCA9IHNjaGVtYS5taW5MZW5ndGg7XG4gIH1cblxuICBpZiAodHlwZW9mIHNjaGVtYS5tYXhMZW5ndGggIT09ICd1bmRlZmluZWQnKSB7XG4gICAgY29weS5taW5MZW5ndGggPSBzY2hlbWEubWF4TGVuZ3RoID4gY29weS5tYXhMZW5ndGggPyAwIDogc2NoZW1hLm1heExlbmd0aDtcbiAgfVxuXG4gIGlmIChzY2hlbWEudHlwZSkge1xuICAgIGNvcHkudHlwZSA9IHJhbmRvbS5waWNrKGVudi5TQ0FMQVJfVFlQRVMuZmlsdGVyKHggPT4ge1xuICAgICAgY29uc3QgdHlwZXMgPSBBcnJheS5pc0FycmF5KHNjaGVtYS50eXBlKSA/IHNjaGVtYS50eXBlIDogW3NjaGVtYS50eXBlXTtcblxuICAgICAgcmV0dXJuIHR5cGVzLmV2ZXJ5KHR5cGUgPT4ge1xuICAgICAgICAvLyB0cmVhdCBib3RoIHR5cGVzIGFzIF9zaW1pbGFyIGVub3VnaF8gdG8gYmUgc2tpcHBlZCBlcXVhbFxuICAgICAgICBpZiAoeCA9PT0gJ251bWJlcicgfHwgeCA9PT0gJ2ludGVnZXInKSB7XG4gICAgICAgICAgcmV0dXJuIHR5cGUgIT09ICdudW1iZXInICYmIHR5cGUgIT09ICdpbnRlZ2VyJztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB4ICE9PSB0eXBlO1xuICAgICAgfSk7XG4gICAgfSkpO1xuICB9IGVsc2UgaWYgKHNjaGVtYS5lbnVtKSB7XG4gICAgbGV0IHZhbHVlO1xuXG4gICAgZG8ge1xuICAgICAgdmFsdWUgPSBhbnlWYWx1ZSgpO1xuICAgIH0gd2hpbGUgKHNjaGVtYS5lbnVtLmluZGV4T2YodmFsdWUpICE9PSAtMSk7XG5cbiAgICBjb3B5LmVudW0gPSBbdmFsdWVdO1xuICB9XG5cbiAgaWYgKHNjaGVtYS5yZXF1aXJlZCAmJiBjb3B5LnByb3BlcnRpZXMpIHtcbiAgICBzY2hlbWEucmVxdWlyZWQuZm9yRWFjaChwcm9wID0+IHtcbiAgICAgIGRlbGV0ZSBjb3B5LnByb3BlcnRpZXNbcHJvcF07XG4gICAgfSk7XG4gIH1cblxuICAvLyBUT0RPOiBleHBsb3JlIG1vcmUgc2NlbmFyaW9zXG5cbiAgcmV0dXJuIGNvcHk7XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlVmFsdWVGb3JTY2hlbWEodmFsdWUsIHNjaGVtYSkge1xuICBjb25zdCBzY2hlbWFIYXNNaW4gPSBzY2hlbWEubWluaW11bSAhPT0gdW5kZWZpbmVkO1xuICBjb25zdCBzY2hlbWFIYXNNYXggPSBzY2hlbWEubWF4aW11bSAhPT0gdW5kZWZpbmVkO1xuXG4gIHJldHVybiAoXG4gICAgKHNjaGVtYUhhc01pbiB8fCBzY2hlbWFIYXNNYXgpXG4gICAgJiYgKCFzY2hlbWFIYXNNaW4gfHwgdmFsdWUgPj0gc2NoZW1hLm1pbmltdW0pXG4gICAgJiYgKCFzY2hlbWFIYXNNYXggfHwgdmFsdWUgPD0gc2NoZW1hLm1heGltdW0pXG4gICk7XG59XG5cbi8vIEZJWE1FOiBldmFsdWF0ZSBtb3JlIGNvbnN0cmFpbnRzP1xuZnVuY3Rpb24gdmFsaWRhdGUodmFsdWUsIHNjaGVtYXMpIHtcbiAgcmV0dXJuICFzY2hlbWFzLmV2ZXJ5KHNjaGVtYSA9PiB2YWxpZGF0ZVZhbHVlRm9yU2NoZW1hKHZhbHVlLCBzY2hlbWEpKTtcbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVWYWx1ZUZvck9uZU9mKHZhbHVlLCBvbmVPZikge1xuICBjb25zdCB2YWxpZENvdW50ID0gb25lT2YucmVkdWNlKChjb3VudCwgc2NoZW1hKSA9PiAoY291bnQgKyAoKHZhbGlkYXRlVmFsdWVGb3JTY2hlbWEodmFsdWUsIHNjaGVtYSkpID8gMSA6IDApKSwgMCk7XG4gIHJldHVybiB2YWxpZENvdW50ID09PSAxO1xufVxuXG5mdW5jdGlvbiBpc0tleShwcm9wKSB7XG4gIHJldHVybiBbJ2VudW0nLCAnY29uc3QnLCAnZGVmYXVsdCcsICdleGFtcGxlcycsICdyZXF1aXJlZCcsICdkZWZpbml0aW9ucycsICdpdGVtcycsICdwcm9wZXJ0aWVzJ10uaW5jbHVkZXMocHJvcCk7XG59XG5cbmZ1bmN0aW9uIG9taXRQcm9wcyhvYmosIHByb3BzKSB7XG4gIHJldHVybiBPYmplY3Qua2V5cyhvYmopXG4gICAgLmZpbHRlcihrZXkgPT4gIXByb3BzLmluY2x1ZGVzKGtleSkpXG4gICAgLnJlZHVjZSgoY29weSwgaykgPT4ge1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkob2JqW2tdKSkge1xuICAgICAgICBjb3B5W2tdID0gb2JqW2tdLnNsaWNlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb3B5W2tdID0gb2JqW2tdIGluc3RhbmNlb2YgT2JqZWN0XG4gICAgICAgICAgPyBtZXJnZSh7fSwgb2JqW2tdKVxuICAgICAgICAgIDogb2JqW2tdO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY29weTtcbiAgICB9LCB7fSk7XG59XG5cbmZ1bmN0aW9uIHRlbXBsYXRlKHZhbHVlLCBzY2hlbWEpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgcmV0dXJuIHZhbHVlLm1hcCh4ID0+IHRlbXBsYXRlKHgsIHNjaGVtYSkpO1xuICB9XG5cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoLyNcXHsoW1xcdy4tXSspXFx9L2csIChfLCAkMSkgPT4gc2NoZW1hWyQxXSk7XG4gIH1cblxuICByZXR1cm4gdmFsdWU7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGdpdmVuIG9iamVjdCBpcyBlbXB0eSAoaGFzIG5vIHByb3BlcnRpZXMpXG4gKlxuICogQHBhcmFtIHZhbHVlXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gaXNFbXB0eSh2YWx1ZSkge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKSA9PT0gJ1tvYmplY3QgT2JqZWN0XScgJiYgIU9iamVjdC5rZXlzKHZhbHVlKS5sZW5ndGg7XG59XG5cbi8qKlxuICogQ2hlY2tzIGdpdmVuIGtleSBpcyByZXF1aXJlZCBvciBpZiBzb3VyY2Ugb2JqZWN0IHdhcyBjcmVhdGVkIGJ5IGEgc3Vicm91dGluZSAoYWxyZWFkeSBjbGVhbmVkKVxuICpcbiAqIEBwYXJhbSBrZXlcbiAqIEBwYXJhbSBzY2hlbWFcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBzaG91bGRDbGVhbihrZXksIHNjaGVtYSkge1xuICBzY2hlbWEgPSBzY2hlbWEuaXRlbXMgfHwgc2NoZW1hO1xuXG4gIC8vIGZpeDogd2hlbiBhbHdheXNGYWtlT3B0aW9uYWxzIGlzIHRydWUsIG5lZWQgc2V0IGlzUmVxdWlyZWQgdG8gdHJ1ZSwgc2VlIGJ1ZzpodHRwczovL2dpdGh1Yi5jb20vanNvbi1zY2hlbWEtZmFrZXIvanNvbi1zY2hlbWEtZmFrZXIvaXNzdWVzLzc2MVxuICBjb25zdCBhbHdheXNGYWtlT3B0aW9uYWxzID0gb3B0aW9uQVBJKCdhbHdheXNGYWtlT3B0aW9uYWxzJyk7XG4gIGNvbnN0IGlzUmVxdWlyZWQgPSAoQXJyYXkuaXNBcnJheShzY2hlbWEucmVxdWlyZWQpICYmIHNjaGVtYS5yZXF1aXJlZC5pbmNsdWRlcyhrZXkpKSB8fCBhbHdheXNGYWtlT3B0aW9uYWxzO1xuICBjb25zdCB3YXNDbGVhbmVkID0gdHlwZW9mIHNjaGVtYS50aHVuayA9PT0gJ2Z1bmN0aW9uJyB8fCAoc2NoZW1hLmFkZGl0aW9uYWxQcm9wZXJ0aWVzICYmIHR5cGVvZiBzY2hlbWEuYWRkaXRpb25hbFByb3BlcnRpZXMudGh1bmsgPT09ICdmdW5jdGlvbicpO1xuXG4gIHJldHVybiAhaXNSZXF1aXJlZCAmJiAhd2FzQ2xlYW5lZDtcbn1cblxuLyoqXG4gKiBDbGVhbnMgdXAgdGhlIHNvdXJjZSBvYmplY3QgcmVtb3ZpbmcgZW1wdHkgb2JqZWN0cyBhbmQgdW5kZWZpbmVkIHZhbHVlc1xuICogV2lsbCBub3QgcmVtb3ZlIHZhbHVlcyB3aGljaCBhcmUgc3BlY2lmaWVkIGFzIGByZXF1aXJlZGBcbiAqXG4gKiBAcGFyYW0gb2JqXG4gKiBAcGFyYW0gc2NoZW1hXG4gKiBAcGFyYW0gaXNBcnJheVxuICogQHJldHVybnMge2FueX1cbiAqL1xuZnVuY3Rpb24gY2xlYW4ob2JqLCBzY2hlbWEsIGlzQXJyYXkgPSBmYWxzZSkge1xuICBpZiAoIW9iaiB8fCB0eXBlb2Ygb2JqICE9PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBvYmo7XG4gIH1cblxuICBpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XG4gICAgcmV0dXJuIG9ialxuICAgICAgLm1hcCh2YWx1ZSA9PiBjbGVhbih2YWx1ZSwgc2NoZW1hLCB0cnVlKSlcbiAgICAgIC5maWx0ZXIodmFsdWUgPT4gdHlwZW9mIHZhbHVlICE9PSAndW5kZWZpbmVkJyk7XG4gIH1cblxuICBPYmplY3Qua2V5cyhvYmopLmZvckVhY2goayA9PiB7XG4gICAgaWYgKGlzRW1wdHkob2JqW2tdKSkge1xuICAgICAgaWYgKHNob3VsZENsZWFuKGssIHNjaGVtYSkpIHtcbiAgICAgICAgZGVsZXRlIG9ialtrXTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gc2hvdWxkIG9idGFpbiB0aGUgY29ycmVjdCBzY2hlbWFcbiAgICAgIGxldCBzdWJTY2hlbWEgPSBzY2hlbWE7XG4gICAgICBpZiAoc2NoZW1hICYmIHNjaGVtYS5wcm9wZXJ0aWVzICYmIHNjaGVtYS5wcm9wZXJ0aWVzW2tdKSB7XG4gICAgICAgIHN1YlNjaGVtYSA9IHNjaGVtYS5wcm9wZXJ0aWVzW2tdO1xuICAgICAgfVxuICAgICAgY29uc3QgdmFsdWUgPSBjbGVhbihvYmpba10sIHN1YlNjaGVtYSk7XG5cbiAgICAgIGlmICghaXNFbXB0eSh2YWx1ZSkpIHtcbiAgICAgICAgb2JqW2tdID0gdmFsdWU7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0eXBlb2Ygb2JqW2tdID09PSAndW5kZWZpbmVkJykge1xuICAgICAgZGVsZXRlIG9ialtrXTtcbiAgICB9XG4gIH0pO1xuXG4gIGlmICghT2JqZWN0LmtleXMob2JqKS5sZW5ndGggJiYgaXNBcnJheSkge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICByZXR1cm4gb2JqO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGhhc1Byb3BlcnRpZXMsXG4gIGdldExvY2FsUmVmLFxuICBvbWl0UHJvcHMsXG4gIHR5cGVjYXN0LFxuICBtZXJnZSxcbiAgY2xvbmUsXG4gIHNob3J0LFxuICBoYXNWYWx1ZSxcbiAgbm90VmFsdWUsXG4gIGFueVZhbHVlLFxuICB2YWxpZGF0ZSxcbiAgdmFsaWRhdGVWYWx1ZUZvclNjaGVtYSxcbiAgdmFsaWRhdGVWYWx1ZUZvck9uZU9mLFxuICBpc0tleSxcbiAgdGVtcGxhdGUsXG4gIHNob3VsZENsZWFuLFxuICBjbGVhbixcbiAgaXNFbXB0eSxcbiAgY2xhbXBEYXRlLFxufTtcbiIsICJpbXBvcnQgdXRpbCBmcm9tICcuLi9jb3JlL3V0aWxzLm1qcyc7XG5cbi8vIGR5bmFtaWMgcHJveHkgZm9yIGN1c3RvbSBnZW5lcmF0b3JzXG5mdW5jdGlvbiBwcm94eShnZW4pIHtcbiAgcmV0dXJuICh2YWx1ZSwgc2NoZW1hLCBwcm9wZXJ0eSwgcm9vdFNjaGVtYSkgPT4ge1xuICAgIGxldCBmbiA9IHZhbHVlO1xuICAgIGxldCBhcmdzID0gW107XG5cbiAgICAvLyBzdXBwb3J0IGZvciBuZXN0ZWQgb2JqZWN0LCBmaXJzdC1rZXkgaXMgdGhlIGdlbmVyYXRvclxuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgICBmbiA9IE9iamVjdC5rZXlzKHZhbHVlKVswXTtcblxuICAgICAgLy8gdHJlYXQgdGhlIGdpdmVuIGFycmF5IGFzIGFyZ3VtZW50cyxcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlW2ZuXSkpIHtcbiAgICAgICAgLy8gaWYgdGhlIGdlbmVyYXRvciBpcyBleHBlY3RpbmcgYXJyYXlzIHRoZXkgc2hvdWxkIGJlIG5lc3RlZCwgZS5nLiBgW1sxLCAyLCAzXSwgdHJ1ZSwgLi4uXWBcbiAgICAgICAgYXJncyA9IHZhbHVlW2ZuXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFyZ3MucHVzaCh2YWx1ZVtmbl0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIHN1cHBvcnQgZm9yIGtleXBhdGhzLCBlLmcuIFwiaW50ZXJuZXQuZW1haWxcIlxuICAgIGNvbnN0IHByb3BzID0gZm4uc3BsaXQoJy4nKTtcblxuICAgIC8vIHJldHJpZXZlIGEgZnJlc2ggZGVwZW5kZW5jeVxuICAgIGxldCBjdHggPSBnZW4oKTtcblxuICAgIHdoaWxlIChwcm9wcy5sZW5ndGggPiAxKSB7XG4gICAgICBjdHggPSBjdHhbcHJvcHMuc2hpZnQoKV07XG4gICAgfVxuXG4gICAgLy8gcmV0cmlldmUgbGFzdCB2YWx1ZSBmcm9tIGNvbnRleHQgb2JqZWN0XG4gICAgdmFsdWUgPSB0eXBlb2YgY3R4ID09PSAnb2JqZWN0JyA/IGN0eFtwcm9wc1swXV0gOiBjdHg7XG5cbiAgICAvLyBpbnZva2UgZHluYW1pYyBnZW5lcmF0b3JzXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdmFsdWUgPSB2YWx1ZS5hcHBseShjdHgsIGFyZ3MubWFwKHggPT4gdXRpbC50ZW1wbGF0ZSh4LCByb290U2NoZW1hKSkpO1xuICAgIH1cblxuICAgIC8vIHRlc3QgZm9yIHBlbmRpbmcgY2FsbGJhY2tzXG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT09ICdbb2JqZWN0IE9iamVjdF0nKSB7XG4gICAgICBPYmplY3Qua2V5cyh2YWx1ZSkuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIHZhbHVlW2tleV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENhbm5vdCByZXNvbHZlIHZhbHVlIGZvciAnJHtwcm9wZXJ0eX06ICR7Zm59JywgZ2l2ZW46ICR7dmFsdWV9YCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiB2YWx1ZTtcbiAgfTtcbn1cblxuLyoqXG4gKiBDb250YWluZXIgaXMgdXNlZCB0byB3cmFwIGV4dGVybmFsIGdlbmVyYXRvcnMgKGZha2VyLCBjaGFuY2UsIGNhc3VhbCwgZXRjLikgYW5kIGl0cyBkZXBlbmRlbmNpZXMuXG4gKlxuICogLSBganNmLmV4dGVuZCgnZmFrZXInKWAgd2lsbCBlbmhhbmNlIG9yIGRlZmluZSB0aGUgZ2l2ZW4gZGVwZW5kZW5jeS5cbiAqIC0gYGpzZi5kZWZpbmUoJ2Zha2VyJylgIHdpbGwgcHJvdmlkZSB0aGUgXCJmYWtlclwiIGtleXdvcmQgc3VwcG9ydC5cbiAqXG4gKiBSYW5kRXhwIGlzIG5vdCBsb25nZXIgY29uc2lkZXJlZCBhbiBcImV4dGVuc2lvblwiLlxuICovXG5jbGFzcyBDb250YWluZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICAvLyBkeW5hbWljIHJlcXVpcmVzIC0gaGFuZGxlIGFsbCBkZXBlbmRlbmNpZXNcbiAgICAvLyB0aGV5IHdpbGwgTk9UIGJlIGluY2x1ZGVkIG9uIHRoZSBidW5kbGVcbiAgICB0aGlzLnJlZ2lzdHJ5ID0ge307XG4gICAgdGhpcy5zdXBwb3J0ID0ge307XG4gIH1cblxuICAvKipcbiAgICogVW5yZWdpc3RlciBleHRlbnNpb25zXG4gICAqIEBwYXJhbSBuYW1lXG4gICAqL1xuICByZXNldChuYW1lKSB7XG4gICAgaWYgKCFuYW1lKSB7XG4gICAgICB0aGlzLnJlZ2lzdHJ5ID0ge307XG4gICAgICB0aGlzLnN1cHBvcnQgPSB7fTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGVsZXRlIHRoaXMucmVnaXN0cnlbbmFtZV07XG4gICAgICBkZWxldGUgdGhpcy5zdXBwb3J0W25hbWVdO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBPdmVycmlkZSBkZXBlbmRlbmN5IGdpdmVuIGJ5IG5hbWVcbiAgICogQHBhcmFtIG5hbWVcbiAgICogQHBhcmFtIGNhbGxiYWNrXG4gICAqL1xuICBleHRlbmQobmFtZSwgY2FsbGJhY2spIHtcbiAgICB0aGlzLnJlZ2lzdHJ5W25hbWVdID0gY2FsbGJhY2sodGhpcy5yZWdpc3RyeVtuYW1lXSk7XG5cbiAgICAvLyBidWlsdC1pbiBwcm94eSAoY2FuIGJlIG92ZXJyaWRkZW4pXG4gICAgaWYgKCF0aGlzLnN1cHBvcnRbbmFtZV0pIHtcbiAgICAgIHRoaXMuc3VwcG9ydFtuYW1lXSA9IHByb3h5KCgpID0+IHRoaXMucmVnaXN0cnlbbmFtZV0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQga2V5d29yZCBzdXBwb3J0IGJ5IG5hbWVcbiAgICogQHBhcmFtIG5hbWVcbiAgICogQHBhcmFtIGNhbGxiYWNrXG4gICAqL1xuICBkZWZpbmUobmFtZSwgY2FsbGJhY2spIHtcbiAgICB0aGlzLnN1cHBvcnRbbmFtZV0gPSBjYWxsYmFjaztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGRlcGVuZGVuY3kgZ2l2ZW4gYnkgbmFtZVxuICAgKiBAcGFyYW0gbmFtZVxuICAgKiBAcmV0dXJucyB7RGVwZW5kZW5jeX1cbiAgICovXG4gIGdldChuYW1lKSB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLnJlZ2lzdHJ5W25hbWVdID09PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKGAnJHtuYW1lfScgZGVwZW5kZW5jeSBkb2Vzbid0IGV4aXN0LmApO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5yZWdpc3RyeVtuYW1lXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBseSBhIGN1c3RvbSBrZXl3b3JkXG4gICAqIEBwYXJhbSBzY2hlbWFcbiAgICovXG4gIHdyYXAoc2NoZW1hKSB7XG4gICAgaWYgKCEoJ2dlbmVyYXRlJyBpbiBzY2hlbWEpKSB7XG4gICAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoc2NoZW1hKTtcbiAgICAgIGNvbnN0IGNvbnRleHQgPSB7fTtcblxuICAgICAgbGV0IGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuXG4gICAgICB3aGlsZSAobGVuZ3RoLS0pIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgICBjb25zdCBmbiA9IGtleXNbbGVuZ3RoXS5yZXBsYWNlKC9eeC0vLCAnJyk7XG4gICAgICAgIGNvbnN0IGdlbiA9IHRoaXMuc3VwcG9ydFtmbl07XG5cbiAgICAgICAgaWYgKHR5cGVvZiBnZW4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoc2NoZW1hLCAnZ2VuZXJhdGUnLCB7XG4gICAgICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICAgICAgICB2YWx1ZTogKHJvb3RTY2hlbWEsIGtleSkgPT4gZ2VuLmNhbGwoY29udGV4dCwgc2NoZW1hW2tleXNbbGVuZ3RoXV0sIHNjaGVtYSwga2V5c1tsZW5ndGhdLCByb290U2NoZW1hLCBrZXkuc2xpY2UoKSksIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc2NoZW1hO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENvbnRhaW5lcjtcbiIsICJpbXBvcnQgUmVnaXN0cnkgZnJvbSAnLi4vY2xhc3MvUmVnaXN0cnkubWpzJztcblxuLy8gaW5zdGFudGlhdGVcbmNvbnN0IHJlZ2lzdHJ5ID0gbmV3IFJlZ2lzdHJ5KCk7XG5cbi8qKlxuICogQ3VzdG9tIGZvcm1hdCBBUElcbiAqXG4gKiBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9qc29uLXNjaGVtYS1mYWtlci9qc29uLXNjaGVtYS1mYWtlciNjdXN0b20tZm9ybWF0c1xuICogQHBhcmFtIG5hbWVPckZvcm1hdE1hcFxuICogQHBhcmFtIGNhbGxiYWNrXG4gKiBAcmV0dXJucyB7YW55fVxuICovXG5mdW5jdGlvbiBmb3JtYXRBUEkobmFtZU9yRm9ybWF0TWFwLCBjYWxsYmFjaykge1xuICBpZiAodHlwZW9mIG5hbWVPckZvcm1hdE1hcCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4gcmVnaXN0cnkubGlzdCgpO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBuYW1lT3JGb3JtYXRNYXAgPT09ICdzdHJpbmcnKSB7XG4gICAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmVnaXN0cnkucmVnaXN0ZXIobmFtZU9yRm9ybWF0TWFwLCBjYWxsYmFjayk7XG4gICAgfSBlbHNlIGlmIChjYWxsYmFjayA9PT0gbnVsbCB8fCBjYWxsYmFjayA9PT0gZmFsc2UpIHtcbiAgICAgIHJlZ2lzdHJ5LnVucmVnaXN0ZXIobmFtZU9yRm9ybWF0TWFwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHJlZ2lzdHJ5LmdldChuYW1lT3JGb3JtYXRNYXApO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICByZWdpc3RyeS5yZWdpc3Rlck1hbnkobmFtZU9yRm9ybWF0TWFwKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBmb3JtYXRBUEk7XG4iLCAiY2xhc3MgUGFyc2VFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgY29uc3RydWN0b3IobWVzc2FnZSwgcGF0aCkge1xuICAgIHN1cGVyKCk7XG4gICAgaWYgKEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKSB7XG4gICAgICBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSh0aGlzLCB0aGlzLmNvbnN0cnVjdG9yKTtcbiAgICB9XG4gICAgdGhpcy5uYW1lID0gJ1BhcnNlRXJyb3InO1xuICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgdGhpcy5wYXRoID0gcGF0aDtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQYXJzZUVycm9yO1xuIiwgImNvbnN0IGluZmVycmVkUHJvcGVydGllcyA9IHtcbiAgYXJyYXk6IFtcbiAgICAnYWRkaXRpb25hbEl0ZW1zJyxcbiAgICAnaXRlbXMnLFxuICAgICdtYXhJdGVtcycsXG4gICAgJ21pbkl0ZW1zJyxcbiAgICAndW5pcXVlSXRlbXMnLFxuICBdLFxuICBpbnRlZ2VyOiBbXG4gICAgJ2V4Y2x1c2l2ZU1heGltdW0nLFxuICAgICdleGNsdXNpdmVNaW5pbXVtJyxcbiAgICAnbWF4aW11bScsXG4gICAgJ21pbmltdW0nLFxuICAgICdtdWx0aXBsZU9mJyxcbiAgXSxcbiAgb2JqZWN0OiBbXG4gICAgJ2FkZGl0aW9uYWxQcm9wZXJ0aWVzJyxcbiAgICAnZGVwZW5kZW5jaWVzJyxcbiAgICAnbWF4UHJvcGVydGllcycsXG4gICAgJ21pblByb3BlcnRpZXMnLFxuICAgICdwYXR0ZXJuUHJvcGVydGllcycsXG4gICAgJ3Byb3BlcnRpZXMnLFxuICAgICdyZXF1aXJlZCcsXG4gIF0sXG4gIHN0cmluZzogW1xuICAgICdtYXhMZW5ndGgnLFxuICAgICdtaW5MZW5ndGgnLFxuICAgICdwYXR0ZXJuJyxcbiAgICAnZm9ybWF0JyxcbiAgXSxcbn07XG5cbmluZmVycmVkUHJvcGVydGllcy5udW1iZXIgPSBpbmZlcnJlZFByb3BlcnRpZXMuaW50ZWdlcjtcblxuY29uc3Qgc3Vic2NoZW1hUHJvcGVydGllcyA9IFtcbiAgJ2FkZGl0aW9uYWxJdGVtcycsXG4gICdpdGVtcycsXG4gICdhZGRpdGlvbmFsUHJvcGVydGllcycsXG4gICdkZXBlbmRlbmNpZXMnLFxuICAncGF0dGVyblByb3BlcnRpZXMnLFxuICAncHJvcGVydGllcycsXG5dO1xuXG4vKipcbiAqIEl0ZXJhdGVzIHRocm91Z2ggYWxsIGtleXMgb2YgYG9iamAgYW5kOlxuICogLSBjaGVja3Mgd2hldGhlciB0aG9zZSBrZXlzIG1hdGNoIHByb3BlcnRpZXMgb2YgYSBnaXZlbiBpbmZlcnJlZCB0eXBlXG4gKiAtIG1ha2VzIHN1cmUgdGhhdCBgb2JqYCBpcyBub3QgYSBzdWJzY2hlbWE7IF9EbyBub3QgYXR0ZW1wdCB0byBpbmZlciBwcm9wZXJ0aWVzIG5hbWVkIGFzIHN1YnNjaGVtYSBjb250YWluZXJzLiBUaGVcbiAqIHJlYXNvbiBmb3IgdGhpcyBpcyB0aGF0IGFueSBwcm9wZXJ0eSBuYW1lIHdpdGhpbiB0aG9zZSBjb250YWluZXJzIHRoYXQgbWF0Y2hlcyBvbmUgb2YgdGhlIHByb3BlcnRpZXMgdXNlZCBmb3JcbiAqIGluZmVycmluZyBtaXNzaW5nIHR5cGUgdmFsdWVzIGNhdXNlcyB0aGUgY29udGFpbmVyIGl0c2VsZiB0byBnZXQgcHJvY2Vzc2VkIHdoaWNoIGxlYWRzIHRvIGludmFsaWQgb3V0cHV0LiAoSXNzdWUgNjIpX1xuICpcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBtYXRjaGVzVHlwZShvYmosIGxhc3RFbGVtZW50SW5QYXRoLCBpbmZlcnJlZFR5cGVQcm9wZXJ0aWVzKSB7XG4gIHJldHVybiBPYmplY3Qua2V5cyhvYmopLmZpbHRlcihwcm9wID0+IHtcbiAgICBjb25zdCBpc1N1YnNjaGVtYSA9IHN1YnNjaGVtYVByb3BlcnRpZXMuaW5kZXhPZihsYXN0RWxlbWVudEluUGF0aCkgPiAtMTtcbiAgICBjb25zdCBpbmZlcnJlZFByb3BlcnR5Rm91bmQgPSBpbmZlcnJlZFR5cGVQcm9wZXJ0aWVzLmluZGV4T2YocHJvcCkgPiAtMTtcblxuICAgIGlmIChpbmZlcnJlZFByb3BlcnR5Rm91bmQgJiYgIWlzU3Vic2NoZW1hKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH0pLmxlbmd0aCA+IDA7XG59XG5cbi8qKlxuICogQ2hlY2tzIHdoZXRoZXIgZ2l2ZW4gYG9iamAgdHlwZSBtaWdodCBiZSBpbmZlcnJlZC4gVGhlIG1lY2hhbmlzbSBpdGVyYXRlcyB0aHJvdWdoIGFsbCBpbmZlcnJlZCB0eXBlcyBkZWZpbml0aW9ucyxcbiAqIHRyaWVzIHRvIG1hdGNoIGFsbG93ZWQgcHJvcGVydGllcyB3aXRoIHByb3BlcnRpZXMgb2YgZ2l2ZW4gYG9iamAuIFJldHVybnMgdHlwZSBuYW1lLCBpZiBpbmZlcnJlZCwgb3IgbnVsbC5cbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfG51bGx9XG4gKi9cbmZ1bmN0aW9uIGluZmVyVHlwZShvYmosIHNjaGVtYVBhdGgpIHtcbiAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKGluZmVycmVkUHJvcGVydGllcyk7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgY29uc3QgdHlwZU5hbWUgPSBrZXlzW2ldO1xuICAgIGNvbnN0IGxhc3RFbGVtZW50SW5QYXRoID0gc2NoZW1hUGF0aFtzY2hlbWFQYXRoLmxlbmd0aCAtIDFdO1xuXG4gICAgaWYgKG1hdGNoZXNUeXBlKG9iaiwgbGFzdEVsZW1lbnRJblBhdGgsIGluZmVycmVkUHJvcGVydGllc1t0eXBlTmFtZV0pKSB7XG4gICAgICByZXR1cm4gdHlwZU5hbWU7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGluZmVyVHlwZTtcbiIsICJpbXBvcnQgb3B0aW9uQVBJIGZyb20gJy4uL2FwaS9vcHRpb24ubWpzJztcblxuLyoqXG4gKiBHZW5lcmF0ZXMgcmFuZG9taXplZCBib29sZWFuIHZhbHVlLlxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBib29sZWFuR2VuZXJhdG9yKCkge1xuICByZXR1cm4gb3B0aW9uQVBJKCdyYW5kb20nKSgpID4gMC41O1xufVxuXG5leHBvcnQgZGVmYXVsdCBib29sZWFuR2VuZXJhdG9yO1xuIiwgImltcG9ydCBib29sZWFuR2VuZXJhdG9yIGZyb20gJy4uL2dlbmVyYXRvcnMvYm9vbGVhbi5tanMnO1xuXG5jb25zdCBib29sZWFuVHlwZSA9IGJvb2xlYW5HZW5lcmF0b3I7XG5cbmV4cG9ydCBkZWZhdWx0IGJvb2xlYW5UeXBlO1xuIiwgIi8qKlxuICogR2VuZXJhdGVzIG51bGwgdmFsdWUuXG4gKlxuICogQHJldHVybnMge251bGx9XG4gKi9cbmZ1bmN0aW9uIG51bGxHZW5lcmF0b3IoKSB7XG4gIHJldHVybiBudWxsO1xufVxuXG5leHBvcnQgZGVmYXVsdCBudWxsR2VuZXJhdG9yO1xuIiwgImltcG9ydCBudWxsR2VuZXJhdG9yIGZyb20gJy4uL2dlbmVyYXRvcnMvbnVsbC5tanMnO1xuXG5jb25zdCBudWxsVHlwZSA9IG51bGxHZW5lcmF0b3I7XG5cbmV4cG9ydCBkZWZhdWx0IG51bGxUeXBlO1xuIiwgImltcG9ydCByYW5kb20gZnJvbSAnLi4vY29yZS9yYW5kb20ubWpzJztcbmltcG9ydCB1dGlscyBmcm9tICcuLi9jb3JlL3V0aWxzLm1qcyc7XG5pbXBvcnQgUGFyc2VFcnJvciBmcm9tICcuLi9jb3JlL2Vycm9yLm1qcyc7XG5pbXBvcnQgb3B0aW9uQVBJIGZyb20gJy4uL2FwaS9vcHRpb24ubWpzJztcblxuLy8gVE9ETyBwcm92aWRlIHR5cGVzXG5mdW5jdGlvbiB1bmlxdWUocGF0aCwgaXRlbXMsIHZhbHVlLCBzYW1wbGUsIHJlc29sdmUsIHRyYXZlcnNlQ2FsbGJhY2spIHtcbiAgY29uc3QgdG1wID0gW107XG4gIGNvbnN0IHNlZW4gPSBbXTtcblxuICBmdW5jdGlvbiB3YWxrKG9iaikge1xuICAgIGNvbnN0IGpzb24gPSBKU09OLnN0cmluZ2lmeShvYmoudmFsdWUpO1xuXG4gICAgaWYgKHNlZW4uaW5kZXhPZihqc29uKSA9PT0gLTEpIHtcbiAgICAgIHNlZW4ucHVzaChqc29uKTtcbiAgICAgIHRtcC5wdXNoKG9iaik7XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGl0ZW1zLmZvckVhY2god2Fsayk7XG5cbiAgLy8gVE9ETzogZmluZCBhIGJldHRlciBzb2x1dGlvbj9cbiAgbGV0IGxpbWl0ID0gMTAwO1xuXG4gIHdoaWxlICh0bXAubGVuZ3RoICE9PSBpdGVtcy5sZW5ndGgpIHtcbiAgICBpZiAoIXdhbGsodHJhdmVyc2VDYWxsYmFjayh2YWx1ZS5pdGVtcyB8fCBzYW1wbGUsIHBhdGgsIHJlc29sdmUpKSkge1xuICAgICAgbGltaXQgLT0gMTtcbiAgICB9XG5cbiAgICBpZiAoIWxpbWl0KSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdG1wO1xufVxuXG4vLyBUT0RPIHByb3ZpZGUgdHlwZXNcbmZ1bmN0aW9uIGFycmF5VHlwZSh2YWx1ZSwgcGF0aCwgcmVzb2x2ZSwgdHJhdmVyc2VDYWxsYmFjaykge1xuICBjb25zdCBpdGVtcyA9IFtdO1xuXG4gIGlmICghKHZhbHVlLml0ZW1zIHx8IHZhbHVlLmFkZGl0aW9uYWxJdGVtcykpIHtcbiAgICBpZiAodXRpbHMuaGFzUHJvcGVydGllcyh2YWx1ZSwgJ21pbkl0ZW1zJywgJ21heEl0ZW1zJywgJ3VuaXF1ZUl0ZW1zJykpIHtcbiAgICAgIGlmICh2YWx1ZS5taW5JdGVtcyAhPT0gMCB8fCB2YWx1ZS5tYXhJdGVtcyAhPT0gMCkge1xuICAgICAgICB0aHJvdyBuZXcgUGFyc2VFcnJvcihgbWlzc2luZyBpdGVtcyBmb3IgJHt1dGlscy5zaG9ydCh2YWx1ZSl9YCwgcGF0aCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBpdGVtcztcbiAgfVxuXG4gIGlmIChBcnJheS5pc0FycmF5KHZhbHVlLml0ZW1zKSkge1xuICAgIHJldHVybiB2YWx1ZS5pdGVtcy5tYXAoKGl0ZW0sIGtleSkgPT4ge1xuICAgICAgY29uc3QgaXRlbVN1YnBhdGggPSBwYXRoLmNvbmNhdChbJ2l0ZW1zJywga2V5XSk7XG5cbiAgICAgIHJldHVybiB0cmF2ZXJzZUNhbGxiYWNrKGl0ZW0sIGl0ZW1TdWJwYXRoLCByZXNvbHZlKTtcbiAgICB9KTtcbiAgfVxuXG4gIGxldCBtaW5JdGVtcyA9IHZhbHVlLm1pbkl0ZW1zO1xuICBsZXQgbWF4SXRlbXMgPSB2YWx1ZS5tYXhJdGVtcztcblxuICBjb25zdCBkZWZhdWx0TWluSXRlbXMgPSBvcHRpb25BUEkoJ21pbkl0ZW1zJyk7XG4gIGNvbnN0IGRlZmF1bHRNYXhJdGVtcyA9IG9wdGlvbkFQSSgnbWF4SXRlbXMnKTtcblxuICBpZiAoZGVmYXVsdE1pbkl0ZW1zKSB7XG4gICAgLy8gZml4IGJvdW5kYXJpZXNcbiAgICBtaW5JdGVtcyA9IHR5cGVvZiBtaW5JdGVtcyA9PT0gJ3VuZGVmaW5lZCdcbiAgICAgID8gZGVmYXVsdE1pbkl0ZW1zXG4gICAgICA6IE1hdGgubWluKGRlZmF1bHRNaW5JdGVtcywgbWluSXRlbXMpO1xuICB9XG5cbiAgaWYgKGRlZmF1bHRNYXhJdGVtcykge1xuICAgIG1heEl0ZW1zID0gdHlwZW9mIG1heEl0ZW1zID09PSAndW5kZWZpbmVkJ1xuICAgICAgPyBkZWZhdWx0TWF4SXRlbXNcbiAgICAgIDogTWF0aC5taW4oZGVmYXVsdE1heEl0ZW1zLCBtYXhJdGVtcyk7XG5cbiAgICAvLyBEb24ndCBhbGxvdyB1c2VyIHRvIHNldCBtYXggaXRlbXMgYWJvdmUgb3VyIG1heGltdW1cbiAgICBpZiAobWF4SXRlbXMgJiYgbWF4SXRlbXMgPiBkZWZhdWx0TWF4SXRlbXMpIHtcbiAgICAgIG1heEl0ZW1zID0gZGVmYXVsdE1heEl0ZW1zO1xuICAgIH1cblxuICAgIC8vIERvbid0IGFsbG93IHVzZXIgdG8gc2V0IG1pbiBpdGVtcyBhYm92ZSBvdXIgbWF4aW11bVxuICAgIGlmIChtaW5JdGVtcyAmJiBtaW5JdGVtcyA+IGRlZmF1bHRNYXhJdGVtcykge1xuICAgICAgbWluSXRlbXMgPSBtYXhJdGVtcztcbiAgICB9XG4gIH1cblxuICBjb25zdCBvcHRpb25hbHNQcm9iYWJpbGl0eSA9IG9wdGlvbkFQSSgnYWx3YXlzRmFrZU9wdGlvbmFscycpID09PSB0cnVlID8gMS4wIDogb3B0aW9uQVBJKCdvcHRpb25hbHNQcm9iYWJpbGl0eScpO1xuICBjb25zdCBmaXhlZFByb2JhYmlsaXRpZXMgPSBvcHRpb25BUEkoJ2Fsd2F5c0Zha2VPcHRpb25hbHMnKSB8fCBvcHRpb25BUEkoJ2ZpeGVkUHJvYmFiaWxpdGllcycpIHx8IGZhbHNlO1xuXG4gIGxldCBsZW5ndGggPSByYW5kb20ubnVtYmVyKG1pbkl0ZW1zLCBtYXhJdGVtcywgMSwgNSk7XG5cbiAgaWYgKG9wdGlvbmFsc1Byb2JhYmlsaXR5ICE9PSBudWxsKSB7XG4gICAgbGVuZ3RoID0gTWF0aC5tYXgoZml4ZWRQcm9iYWJpbGl0aWVzXG4gICAgICA/IE1hdGgucm91bmQoKG1heEl0ZW1zIHx8IGxlbmd0aCkgKiBvcHRpb25hbHNQcm9iYWJpbGl0eSlcbiAgICAgIDogTWF0aC5hYnMocmFuZG9tLm51bWJlcihtaW5JdGVtcywgbWF4SXRlbXMpICogb3B0aW9uYWxzUHJvYmFiaWxpdHkpLCBtaW5JdGVtcyB8fCAwKTtcbiAgfVxuXG4gIC8vIFRPRE8gYmVsb3cgbG9va3MgYmFkLiBTaG91bGQgYWRkaXRpb25hbEl0ZW1zIGJlIGNvcGllZCBhcy1pcz9cbiAgY29uc3Qgc2FtcGxlID0gdHlwZW9mIHZhbHVlLmFkZGl0aW9uYWxJdGVtcyA9PT0gJ29iamVjdCcgPyB2YWx1ZS5hZGRpdGlvbmFsSXRlbXMgOiB7fTtcblxuICBmb3IgKGxldCBjdXJyZW50ID0gaXRlbXMubGVuZ3RoOyBjdXJyZW50IDwgbGVuZ3RoOyBjdXJyZW50ICs9IDEpIHtcbiAgICBjb25zdCBpdGVtU3VicGF0aCA9IHBhdGguY29uY2F0KFsnaXRlbXMnLCBjdXJyZW50XSk7XG4gICAgY29uc3QgZWxlbWVudCA9IHRyYXZlcnNlQ2FsbGJhY2sodmFsdWUuaXRlbXMgfHwgc2FtcGxlLCBpdGVtU3VicGF0aCwgcmVzb2x2ZSk7XG5cbiAgICBpdGVtcy5wdXNoKGVsZW1lbnQpO1xuICB9XG5cbiAgaWYgKHZhbHVlLmNvbnRhaW5zICYmIGxlbmd0aCA+IDApIHtcbiAgICBjb25zdCBpZHggPSByYW5kb20ubnVtYmVyKDAsIGxlbmd0aCAtIDEpO1xuXG4gICAgaXRlbXNbaWR4XSA9IHRyYXZlcnNlQ2FsbGJhY2sodmFsdWUuY29udGFpbnMsIHBhdGguY29uY2F0KFsnaXRlbXMnLCBpZHhdKSwgcmVzb2x2ZSk7XG4gIH1cblxuICBpZiAodmFsdWUudW5pcXVlSXRlbXMpIHtcbiAgICByZXR1cm4gdW5pcXVlKHBhdGguY29uY2F0KFsnaXRlbXMnXSksIGl0ZW1zLCB2YWx1ZSwgc2FtcGxlLCByZXNvbHZlLCB0cmF2ZXJzZUNhbGxiYWNrKTtcbiAgfVxuXG4gIHJldHVybiBpdGVtcztcbn1cblxuZXhwb3J0IGRlZmF1bHQgYXJyYXlUeXBlO1xuIiwgImltcG9ydCByYW5kb20gZnJvbSAnLi4vY29yZS9yYW5kb20ubWpzJztcbmltcG9ydCBlbnYgZnJvbSAnLi4vY29yZS9jb25zdGFudHMubWpzJztcblxuZnVuY3Rpb24gbnVtYmVyVHlwZSh2YWx1ZSkge1xuICBsZXQgbWluID0gKHR5cGVvZiB2YWx1ZS5taW5pbXVtID09PSAndW5kZWZpbmVkJyB8fCB2YWx1ZS5taW5pbXVtID09PSAtTnVtYmVyLk1BWF9WQUxVRSkgPyBlbnYuTUlOX0lOVEVHRVIgOiB2YWx1ZS5taW5pbXVtO1xuICBsZXQgbWF4ID0gKHR5cGVvZiB2YWx1ZS5tYXhpbXVtID09PSAndW5kZWZpbmVkJyB8fCB2YWx1ZS5tYXhpbXVtID09PSBOdW1iZXIuTUFYX1ZBTFVFKSA/IGVudi5NQVhfSU5URUdFUiA6IHZhbHVlLm1heGltdW07XG5cbiAgY29uc3QgbXVsdGlwbGVPZiA9IHZhbHVlLm11bHRpcGxlT2Y7XG4gIGNvbnN0IGRlY2ltYWxzID0gbXVsdGlwbGVPZiAmJiBTdHJpbmcobXVsdGlwbGVPZikubWF0Y2goL2UtKFxcZCl8XFwuKFxcZCspJC8pO1xuXG4gIGlmIChkZWNpbWFscykge1xuICAgIGNvbnN0IG51bWJlciA9ICgoTWF0aC5yYW5kb20oKSAqIHJhbmRvbS5udW1iZXIoMCwgMTApKSArIDEpICogbXVsdGlwbGVPZjtcbiAgICBjb25zdCB0cnVuY2F0ZSA9IGRlY2ltYWxzWzFdIHx8IGRlY2ltYWxzWzJdLmxlbmd0aDtcbiAgICBjb25zdCByZXN1bHQgPSBwYXJzZUZsb2F0KG51bWJlci50b0ZpeGVkKHRydW5jYXRlKSk7XG4gICAgY29uc3QgYmFzZSA9IHJhbmRvbS5udW1iZXIobWluLCBtYXggLSAxKTtcblxuICAgIGlmICghU3RyaW5nKHJlc3VsdCkuaW5jbHVkZXMoJy4nKSkge1xuICAgICAgcmV0dXJuIChiYXNlICsgcmVzdWx0KS50b0V4cG9uZW50aWFsKCk7XG4gICAgfVxuICAgIHJldHVybiBiYXNlICsgcmVzdWx0O1xuICB9XG5cbiAgaWYgKG11bHRpcGxlT2YpIHtcbiAgICBtYXggPSBNYXRoLmZsb29yKG1heCAvIG11bHRpcGxlT2YpICogbXVsdGlwbGVPZjtcbiAgICBtaW4gPSBNYXRoLmNlaWwobWluIC8gbXVsdGlwbGVPZikgKiBtdWx0aXBsZU9mO1xuICB9XG5cbiAgaWYgKHZhbHVlLmV4Y2x1c2l2ZU1pbmltdW0gJiYgbWluID09PSB2YWx1ZS5taW5pbXVtKSB7XG4gICAgbWluICs9IG11bHRpcGxlT2YgfHwgMTtcbiAgfVxuXG4gIGlmICh2YWx1ZS5leGNsdXNpdmVNYXhpbXVtICYmIG1heCA9PT0gdmFsdWUubWF4aW11bSkge1xuICAgIG1heCAtPSBtdWx0aXBsZU9mIHx8IDE7XG4gIH1cblxuICBpZiAobWluID4gbWF4KSB7XG4gICAgcmV0dXJuIE5hTjtcbiAgfVxuXG4gIGlmIChtdWx0aXBsZU9mKSB7XG4gICAgbGV0IGJhc2UgPSByYW5kb20ubnVtYmVyKE1hdGguZmxvb3IobWluIC8gbXVsdGlwbGVPZiksIE1hdGguZmxvb3IobWF4IC8gbXVsdGlwbGVPZikpICogbXVsdGlwbGVPZjtcblxuICAgIHdoaWxlIChiYXNlIDwgbWluKSB7XG4gICAgICBiYXNlICs9IG11bHRpcGxlT2Y7XG4gICAgfVxuXG4gICAgcmV0dXJuIGJhc2U7XG4gIH1cblxuICByZXR1cm4gcmFuZG9tLm51bWJlcihtaW4sIG1heCwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHZhbHVlLnR5cGUgIT09ICdpbnRlZ2VyJyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IG51bWJlclR5cGU7XG4iLCAiaW1wb3J0IG51bWJlciBmcm9tICcuL251bWJlci5tanMnO1xuXG4vLyBUaGUgYGludGVnZXJgIHR5cGUgaXMganVzdCBhIHdyYXBwZXIgZm9yIHRoZSBgbnVtYmVyYCB0eXBlLiBUaGUgYG51bWJlcmAgdHlwZVxuLy8gcmV0dXJucyBmbG9hdGluZyBwb2ludCBudW1iZXJzLCBhbmQgYGludGVnZXJgIHR5cGUgdHJ1bmNhdGVzIHRoZSBmcmFjdGlvblxuLy8gcGFydCwgbGVhdmluZyB0aGUgcmVzdWx0IGFzIGFuIGludGVnZXIuXG5cbmZ1bmN0aW9uIGludGVnZXJUeXBlKHZhbHVlKSB7XG4gIHJldHVybiBNYXRoLmZsb29yKG51bWJlcih7IC4uLnZhbHVlIH0pKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW50ZWdlclR5cGU7XG4iLCAiaW1wb3J0IHJhbmRvbSBmcm9tICcuLi9jb3JlL3JhbmRvbS5tanMnO1xuXG5jb25zdCBMSVBTVU1fV09SRFMgPSBgTG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQgY29uc2VjdGV0dXIgYWRpcGlzaWNpbmcgZWxpdCBzZWQgZG8gZWl1c21vZCB0ZW1wb3IgaW5jaWRpZHVudCB1dCBsYWJvcmVcbmV0IGRvbG9yZSBtYWduYSBhbGlxdWEgVXQgZW5pbSBhZCBtaW5pbSB2ZW5pYW0gcXVpcyBub3N0cnVkIGV4ZXJjaXRhdGlvbiB1bGxhbWNvIGxhYm9yaXMgbmlzaSB1dCBhbGlxdWlwIGV4IGVhXG5jb21tb2RvIGNvbnNlcXVhdCBEdWlzIGF1dGUgaXJ1cmUgZG9sb3IgaW4gcmVwcmVoZW5kZXJpdCBpbiB2b2x1cHRhdGUgdmVsaXQgZXNzZSBjaWxsdW0gZG9sb3JlIGV1IGZ1Z2lhdCBudWxsYVxucGFyaWF0dXIgRXhjZXB0ZXVyIHNpbnQgb2NjYWVjYXQgY3VwaWRhdGF0IG5vbiBwcm9pZGVudCBzdW50IGluIGN1bHBhIHF1aSBvZmZpY2lhIGRlc2VydW50IG1vbGxpdCBhbmltIGlkIGVzdFxubGFib3J1bWAuc3BsaXQoL1xcVy8pO1xuXG4vKipcbiAqIEdlbmVyYXRlcyByYW5kb21pemVkIGFycmF5IG9mIHNpbmdsZSBsb3JlbSBpcHN1bSB3b3Jkcy5cbiAqXG4gKiBAcGFyYW0gbGVuZ3RoXG4gKiBAcmV0dXJucyB7QXJyYXkuPHN0cmluZz59XG4gKi9cbmZ1bmN0aW9uIHdvcmRzR2VuZXJhdG9yKGxlbmd0aCkge1xuICBjb25zdCB3b3JkcyA9IHJhbmRvbS5zaHVmZmxlKExJUFNVTV9XT1JEUyk7XG5cbiAgcmV0dXJuIHdvcmRzLnNsaWNlKDAsIGxlbmd0aCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHdvcmRzR2VuZXJhdG9yO1xuIiwgImltcG9ydCBjb25zdGFudHMgZnJvbSAnLi4vY29yZS9jb25zdGFudHMubWpzJztcbmltcG9ydCByYW5kb20gZnJvbSAnLi4vY29yZS9yYW5kb20ubWpzJztcbmltcG9ydCB3b3JkcyBmcm9tICcuLi9nZW5lcmF0b3JzL3dvcmRzLm1qcyc7XG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vY29yZS91dGlscy5tanMnO1xuaW1wb3J0IG9wdGlvbkFQSSBmcm9tICcuLi9hcGkvb3B0aW9uLm1qcyc7XG5cbi8vIGZhbGxiYWNrIGdlbmVyYXRvclxuY29uc3QgYW55VHlwZSA9IHsgdHlwZTogY29uc3RhbnRzLkFMTE9XRURfVFlQRVMgfTtcblxuLy8gVE9ETyBwcm92aWRlIHR5cGVzXG5mdW5jdGlvbiBvYmplY3RUeXBlKHZhbHVlLCBwYXRoLCByZXNvbHZlLCB0cmF2ZXJzZUNhbGxiYWNrKSB7XG4gIGNvbnN0IHByb3BzID0ge307XG5cbiAgY29uc3QgcHJvcGVydGllcyA9IHZhbHVlLnByb3BlcnRpZXMgfHwge307XG4gIGNvbnN0IHBhdHRlcm5Qcm9wZXJ0aWVzID0gdmFsdWUucGF0dGVyblByb3BlcnRpZXMgfHwge307XG4gIGNvbnN0IHJlcXVpcmVkUHJvcGVydGllcyA9IHR5cGVvZiB2YWx1ZS5yZXF1aXJlZCA9PT0gJ2Jvb2xlYW4nID8gW10gOiAodmFsdWUucmVxdWlyZWQgfHwgW10pLnNsaWNlKCk7XG4gIGNvbnN0IGFsbG93c0FkZGl0aW9uYWwgPSB2YWx1ZS5hZGRpdGlvbmFsUHJvcGVydGllcyAhPT0gZmFsc2U7XG5cbiAgY29uc3QgcHJvcGVydHlLZXlzID0gT2JqZWN0LmtleXMocHJvcGVydGllcyk7XG4gIGNvbnN0IHBhdHRlcm5Qcm9wZXJ0eUtleXMgPSBPYmplY3Qua2V5cyhwYXR0ZXJuUHJvcGVydGllcyk7XG4gIGNvbnN0IG9wdGlvbmFsUHJvcGVydGllcyA9IHByb3BlcnR5S2V5cy5jb25jYXQocGF0dGVyblByb3BlcnR5S2V5cykucmVkdWNlKChfcmVzcG9uc2UsIF9rZXkpID0+IHtcbiAgICBpZiAocmVxdWlyZWRQcm9wZXJ0aWVzLmluZGV4T2YoX2tleSkgPT09IC0xKSBfcmVzcG9uc2UucHVzaChfa2V5KTtcbiAgICByZXR1cm4gX3Jlc3BvbnNlO1xuICB9LCBbXSk7XG4gIGNvbnN0IGFsbFByb3BlcnRpZXMgPSByZXF1aXJlZFByb3BlcnRpZXMuY29uY2F0KG9wdGlvbmFsUHJvcGVydGllcyk7XG5cbiAgY29uc3QgYWRkaXRpb25hbFByb3BlcnRpZXMgPSBhbGxvd3NBZGRpdGlvbmFsIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICA/ICh2YWx1ZS5hZGRpdGlvbmFsUHJvcGVydGllcyA9PT0gdHJ1ZSA/IGFueVR5cGUgOiB2YWx1ZS5hZGRpdGlvbmFsUHJvcGVydGllcylcbiAgICA6IHZhbHVlLmFkZGl0aW9uYWxQcm9wZXJ0aWVzO1xuXG4gIGlmICghYWxsb3dzQWRkaXRpb25hbFxuICAgICYmIHByb3BlcnR5S2V5cy5sZW5ndGggPT09IDBcbiAgICAmJiBwYXR0ZXJuUHJvcGVydHlLZXlzLmxlbmd0aCA9PT0gMFxuICAgICYmIHV0aWxzLmhhc1Byb3BlcnRpZXModmFsdWUsICdtaW5Qcm9wZXJ0aWVzJywgJ21heFByb3BlcnRpZXMnLCAnZGVwZW5kZW5jaWVzJywgJ3JlcXVpcmVkJylcbiAgKSB7XG4gICAgLy8ganVzdCBub3RoaW5nXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBpZiAob3B0aW9uQVBJKCdyZXF1aXJlZE9ubHknKSA9PT0gdHJ1ZSkge1xuICAgIHJlcXVpcmVkUHJvcGVydGllcy5mb3JFYWNoKGtleSA9PiB7XG4gICAgICBpZiAocHJvcGVydGllc1trZXldKSB7XG4gICAgICAgIHByb3BzW2tleV0gPSBwcm9wZXJ0aWVzW2tleV07XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdHJhdmVyc2VDYWxsYmFjayhwcm9wcywgcGF0aC5jb25jYXQoWydwcm9wZXJ0aWVzJ10pLCByZXNvbHZlLCB2YWx1ZSk7XG4gIH1cblxuICBjb25zdCBvcHRpb25hbHNQcm9iYWJpbGl0eSA9IG9wdGlvbkFQSSgnYWx3YXlzRmFrZU9wdGlvbmFscycpID09PSB0cnVlID8gMS4wIDogb3B0aW9uQVBJKCdvcHRpb25hbHNQcm9iYWJpbGl0eScpO1xuICBjb25zdCBmaXhlZFByb2JhYmlsaXRpZXMgPSBvcHRpb25BUEkoJ2Fsd2F5c0Zha2VPcHRpb25hbHMnKSB8fCBvcHRpb25BUEkoJ2ZpeGVkUHJvYmFiaWxpdGllcycpIHx8IGZhbHNlO1xuICBjb25zdCBpZ25vcmVQcm9wZXJ0aWVzID0gb3B0aW9uQVBJKCdpZ25vcmVQcm9wZXJ0aWVzJykgfHwgW107XG4gIGNvbnN0IHJldXNlUHJvcHMgPSBvcHRpb25BUEkoJ3JldXNlUHJvcGVydGllcycpO1xuICBjb25zdCBmaWxsUHJvcHMgPSBvcHRpb25BUEkoJ2ZpbGxQcm9wZXJ0aWVzJyk7XG5cbiAgY29uc3QgbWF4ID0gdmFsdWUubWF4UHJvcGVydGllcyB8fCAoYWxsUHJvcGVydGllcy5sZW5ndGggKyAoYWxsb3dzQWRkaXRpb25hbCA/IHJhbmRvbS5udW1iZXIoMSwgNSkgOiAwKSk7XG5cbiAgbGV0IG1pbiA9IE1hdGgubWF4KHZhbHVlLm1pblByb3BlcnRpZXMgfHwgMCwgcmVxdWlyZWRQcm9wZXJ0aWVzLmxlbmd0aCk7XG4gIGxldCBuZWVkZWRFeHRyYXMgPSBNYXRoLm1heCgwLCBhbGxQcm9wZXJ0aWVzLmxlbmd0aCAtIG1pbik7XG5cbiAgaWYgKGFsbFByb3BlcnRpZXMubGVuZ3RoID09PSAxICYmICFyZXF1aXJlZFByb3BlcnRpZXMubGVuZ3RoKSB7XG4gICAgbWluID0gTWF0aC5tYXgocmFuZG9tLm51bWJlcihmaWxsUHJvcHMgPyAxIDogMCwgbWF4KSwgbWluKTtcbiAgfVxuXG4gIGlmIChvcHRpb25hbHNQcm9iYWJpbGl0eSAhPT0gbnVsbCkge1xuICAgIGlmIChmaXhlZFByb2JhYmlsaXRpZXMgPT09IHRydWUpIHtcbiAgICAgIG5lZWRlZEV4dHJhcyA9IE1hdGgucm91bmQoKG1pbiAtIHJlcXVpcmVkUHJvcGVydGllcy5sZW5ndGgpICsgKG9wdGlvbmFsc1Byb2JhYmlsaXR5ICogKGFsbFByb3BlcnRpZXMubGVuZ3RoIC0gbWluKSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBuZWVkZWRFeHRyYXMgPSByYW5kb20ubnVtYmVyKG1pbiAtIHJlcXVpcmVkUHJvcGVydGllcy5sZW5ndGgsIG9wdGlvbmFsc1Byb2JhYmlsaXR5ICogKGFsbFByb3BlcnRpZXMubGVuZ3RoIC0gbWluKSk7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgZXh0cmFQcm9wZXJ0aWVzUmFuZG9tT3JkZXIgPSByYW5kb20uc2h1ZmZsZShvcHRpb25hbFByb3BlcnRpZXMpLnNsaWNlKDAsIG5lZWRlZEV4dHJhcyk7XG4gIGNvbnN0IGV4dHJhUHJvcGVydGllcyA9IG9wdGlvbmFsUHJvcGVydGllcy5maWx0ZXIoX2l0ZW0gPT4ge1xuICAgIHJldHVybiBleHRyYVByb3BlcnRpZXNSYW5kb21PcmRlci5pbmRleE9mKF9pdGVtKSAhPT0gLTE7XG4gIH0pO1xuXG4gIC8vIHByb3BlcnRpZXMgYXJlIHJlYWQgZnJvbSByaWdodC10by1sZWZ0XG4gIGNvbnN0IF9saW1pdCA9IG9wdGlvbmFsc1Byb2JhYmlsaXR5ICE9PSBudWxsIHx8IHJlcXVpcmVkUHJvcGVydGllcy5sZW5ndGggPT09IG1heCA/IG1heCA6IHJhbmRvbS5udW1iZXIoMCwgbWF4KTtcbiAgY29uc3QgX3Byb3BzID0gcmVxdWlyZWRQcm9wZXJ0aWVzLmNvbmNhdChyYW5kb20uc2h1ZmZsZShleHRyYVByb3BlcnRpZXMpLnNsaWNlKDAsIF9saW1pdCkpLnNsaWNlKDAsIG1heCk7XG4gIGNvbnN0IF9kZWZucyA9IFtdO1xuICBjb25zdCBfZGVwcyA9IFtdO1xuXG4gIGlmICh2YWx1ZS5kZXBlbmRlbmNpZXMpIHtcbiAgICBPYmplY3Qua2V5cyh2YWx1ZS5kZXBlbmRlbmNpZXMpLmZvckVhY2gocHJvcCA9PiB7XG4gICAgICBjb25zdCBfcmVxdWlyZWQgPSB2YWx1ZS5kZXBlbmRlbmNpZXNbcHJvcF07XG5cbiAgICAgIGlmIChfcHJvcHMuaW5kZXhPZihwcm9wKSAhPT0gLTEpIHtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoX3JlcXVpcmVkKSkge1xuICAgICAgICAgIC8vIHByb3BlcnR5LWRlcGVuZGVuY2llc1xuICAgICAgICAgIF9yZXF1aXJlZC5mb3JFYWNoKHN1YiA9PiB7XG4gICAgICAgICAgICBpZiAoX3Byb3BzLmluZGV4T2Yoc3ViKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgX3Byb3BzLnB1c2goc3ViKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KF9yZXF1aXJlZC5vbmVPZiB8fCBfcmVxdWlyZWQuYW55T2YpKSB7XG4gICAgICAgICAgY29uc3QgdmFsdWVzID0gX3JlcXVpcmVkLm9uZU9mIHx8IF9yZXF1aXJlZC5hbnlPZjtcblxuICAgICAgICAgIF9kZXBzLnB1c2goeyBwcm9wLCB2YWx1ZXMgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgX2RlZm5zLnB1c2goX3JlcXVpcmVkKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gc2NoZW1hLWRlcGVuZGVuY2llc1xuICAgIGlmIChfZGVmbnMubGVuZ3RoKSB7XG4gICAgICBkZWxldGUgdmFsdWUuZGVwZW5kZW5jaWVzO1xuXG4gICAgICByZXR1cm4gdHJhdmVyc2VDYWxsYmFjayh7XG4gICAgICAgIGFsbE9mOiBfZGVmbnMuY29uY2F0KHZhbHVlKSxcbiAgICAgIH0sIHBhdGguY29uY2F0KFsncHJvcGVydGllcyddKSwgcmVzb2x2ZSwgdmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHNraXBwZWQgPSBbXTtcbiAgY29uc3QgbWlzc2luZyA9IFtdO1xuXG4gIF9wcm9wcy5mb3JFYWNoKGtleSA9PiB7XG4gICAgaWYgKHByb3BlcnRpZXNba2V5XSAmJiBbJ3t9JywgJ3RydWUnXS5pbmNsdWRlcyhKU09OLnN0cmluZ2lmeShwcm9wZXJ0aWVzW2tleV0ubm90KSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGlnbm9yZVByb3BlcnRpZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGlmICgoaWdub3JlUHJvcGVydGllc1tpXSBpbnN0YW5jZW9mIFJlZ0V4cCAmJiBpZ25vcmVQcm9wZXJ0aWVzW2ldLnRlc3Qoa2V5KSlcbiAgICAgICAgfHwgKHR5cGVvZiBpZ25vcmVQcm9wZXJ0aWVzW2ldID09PSAnc3RyaW5nJyAmJiBpZ25vcmVQcm9wZXJ0aWVzW2ldID09PSBrZXkpXG4gICAgICAgIHx8ICh0eXBlb2YgaWdub3JlUHJvcGVydGllc1tpXSA9PT0gJ2Z1bmN0aW9uJyAmJiBpZ25vcmVQcm9wZXJ0aWVzW2ldKHByb3BlcnRpZXNba2V5XSwga2V5KSkpIHtcbiAgICAgICAgc2tpcHBlZC5wdXNoKGtleSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoYWRkaXRpb25hbFByb3BlcnRpZXMgPT09IGZhbHNlKSB7XG4gICAgICBpZiAocmVxdWlyZWRQcm9wZXJ0aWVzLmluZGV4T2Yoa2V5KSAhPT0gLTEpIHtcbiAgICAgICAgcHJvcHNba2V5XSA9IHByb3BlcnRpZXNba2V5XTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocHJvcGVydGllc1trZXldKSB7XG4gICAgICBwcm9wc1trZXldID0gcHJvcGVydGllc1trZXldO1xuICAgIH1cblxuICAgIGxldCBmb3VuZDtcblxuICAgIC8vIHRoZW4gdHJ5IHBhdHRlcm5Qcm9wZXJ0aWVzXG4gICAgcGF0dGVyblByb3BlcnR5S2V5cy5mb3JFYWNoKF9rZXkgPT4ge1xuICAgICAgaWYgKGtleS5tYXRjaChuZXcgUmVnRXhwKF9rZXkpKSkge1xuICAgICAgICBmb3VuZCA9IHRydWU7XG5cbiAgICAgICAgaWYgKHByb3BzW2tleV0pIHtcbiAgICAgICAgICB1dGlscy5tZXJnZShwcm9wc1trZXldLCBwYXR0ZXJuUHJvcGVydGllc1tfa2V5XSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcHJvcHNbcmFuZG9tLnJhbmRleHAoa2V5KV0gPSBwYXR0ZXJuUHJvcGVydGllc1tfa2V5XTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKCFmb3VuZCkge1xuICAgICAgLy8gdHJ5IHBhdHRlcm5Qcm9wZXJ0aWVzIGFnYWluLFxuICAgICAgY29uc3Qgc3Vic2NoZW1hID0gcGF0dGVyblByb3BlcnRpZXNba2V5XSB8fCBhZGRpdGlvbmFsUHJvcGVydGllcztcblxuICAgICAgLy8gRklYTUU6IGFsbG93IGFueVR5cGUgYXMgZmFsbGJhY2sgd2hlbiBubyBzdWJzY2hlbWEgaXMgZ2l2ZW4/XG5cbiAgICAgIGlmIChzdWJzY2hlbWEgJiYgYWRkaXRpb25hbFByb3BlcnRpZXMgIT09IGZhbHNlKSB7XG4gICAgICAgIC8vIG90aGVyd2lzZSB3ZSBjYW4gdXNlIGFkZGl0aW9uYWxQcm9wZXJ0aWVzP1xuICAgICAgICBwcm9wc1twYXR0ZXJuUHJvcGVydGllc1trZXldID8gcmFuZG9tLnJhbmRleHAoa2V5KSA6IGtleV0gPSBwcm9wZXJ0aWVzW2tleV0gfHwgc3Vic2NoZW1hO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbWlzc2luZy5wdXNoKGtleSk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICAvLyBkaXNjYXJkIGFscmVhZHkgaWdub3JlZCBwcm9wcyBpZiB0aGV5J3JlIG5vdCByZXF1aXJlZCB0byBiZSBmaWxsZWQuLi5cbiAgbGV0IGN1cnJlbnQgPSBPYmplY3Qua2V5cyhwcm9wcykubGVuZ3RoICsgKGZpbGxQcm9wcyA/IDAgOiBza2lwcGVkLmxlbmd0aCk7XG5cbiAgLy8gZ2VuZXJhdGUgZHluYW1pYyBzdWZmaXggZm9yIGFkZGl0aW9uYWwgcHJvcHMuLi5cbiAgY29uc3QgaGFzaCA9IHN1ZmZpeCA9PiByYW5kb20ucmFuZGV4cChgXz9bX2EtZlxcXFxkXXsxLDN9JHtzdWZmaXggPyAnXFxcXCQ/JyA6ICcnfWApO1xuXG4gIGZ1bmN0aW9uIGdldChmcm9tKSB7XG4gICAgbGV0IG9uZTtcblxuICAgIGRvIHtcbiAgICAgIGlmICghZnJvbS5sZW5ndGgpIGJyZWFrO1xuICAgICAgb25lID0gZnJvbS5zaGlmdCgpO1xuICAgIH0gd2hpbGUgKHByb3BzW29uZV0pO1xuXG4gICAgcmV0dXJuIG9uZTtcbiAgfVxuXG4gIGxldCBtaW5Qcm9wcyA9IG1pbjtcbiAgaWYgKGFsbG93c0FkZGl0aW9uYWwgJiYgIXJlcXVpcmVkUHJvcGVydGllcy5sZW5ndGgpIHtcbiAgICBtaW5Qcm9wcyA9IE1hdGgubWF4KG9wdGlvbmFsc1Byb2JhYmlsaXR5ID09PSBudWxsIHx8IGFkZGl0aW9uYWxQcm9wZXJ0aWVzID8gcmFuZG9tLm51bWJlcihmaWxsUHJvcHMgPyAxIDogMCwgbWF4KSA6IDAsIG1pbik7XG4gIH1cblxuICBpZiAoIWV4dHJhUHJvcGVydGllcy5sZW5ndGggJiYgIW5lZWRlZEV4dHJhcyAmJiBhbGxvd3NBZGRpdGlvbmFsICYmIGZpeGVkUHJvYmFiaWxpdGllcyA9PT0gdHJ1ZSAmJiBmaWxsUHJvcHMpIHtcbiAgICBjb25zdCBsaW1pdCA9IHJhbmRvbS5udW1iZXIoMCwgbWF4KTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGltaXQ7IGkgKz0gMSkge1xuICAgICAgcHJvcHNbd29yZHMoMSkgKyBoYXNoKGxpbWl0W2ldKV0gPSBhZGRpdGlvbmFsUHJvcGVydGllcyB8fCBhbnlUeXBlO1xuICAgIH1cbiAgfVxuXG4gIHdoaWxlIChmaWxsUHJvcHMpIHtcbiAgICBpZiAoIShwYXR0ZXJuUHJvcGVydHlLZXlzLmxlbmd0aCB8fCBhbGxvd3NBZGRpdGlvbmFsKSkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgaWYgKGN1cnJlbnQgPj0gbWluUHJvcHMpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGlmIChhbGxvd3NBZGRpdGlvbmFsKSB7XG4gICAgICBpZiAocmV1c2VQcm9wcyAmJiAoKHByb3BlcnR5S2V5cy5sZW5ndGggLSBjdXJyZW50KSA+IG1pblByb3BzKSkge1xuICAgICAgICBsZXQgY291bnQgPSAwO1xuICAgICAgICBsZXQga2V5O1xuXG4gICAgICAgIGRvIHtcbiAgICAgICAgICBjb3VudCArPSAxO1xuXG4gICAgICAgICAgLy8gc2tpcCBsYXJnZSBvYmplY3RzXG4gICAgICAgICAgaWYgKGNvdW50ID4gMTAwMCkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAga2V5ID0gZ2V0KHJlcXVpcmVkUHJvcGVydGllcykgfHwgcmFuZG9tLnBpY2socHJvcGVydHlLZXlzKTtcbiAgICAgICAgfSB3aGlsZSAodHlwZW9mIHByb3BzW2tleV0gIT09ICd1bmRlZmluZWQnKTtcblxuICAgICAgICBpZiAodHlwZW9mIHByb3BzW2tleV0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgcHJvcHNba2V5XSA9IHByb3BlcnRpZXNba2V5XTtcbiAgICAgICAgICBjdXJyZW50ICs9IDE7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAocGF0dGVyblByb3BlcnR5S2V5cy5sZW5ndGggJiYgIWFkZGl0aW9uYWxQcm9wZXJ0aWVzKSB7XG4gICAgICAgIGNvbnN0IHByb3AgPSByYW5kb20ucGljayhwYXR0ZXJuUHJvcGVydHlLZXlzKTtcbiAgICAgICAgY29uc3Qgd29yZCA9IHJhbmRvbS5yYW5kZXhwKHByb3ApO1xuXG4gICAgICAgIGlmICghcHJvcHNbd29yZF0pIHtcbiAgICAgICAgICBwcm9wc1t3b3JkXSA9IHBhdHRlcm5Qcm9wZXJ0aWVzW3Byb3BdO1xuICAgICAgICAgIGN1cnJlbnQgKz0gMTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3Qgd29yZCA9IGdldChyZXF1aXJlZFByb3BlcnRpZXMpIHx8ICh3b3JkcygxKSArIGhhc2goKSk7XG5cbiAgICAgICAgaWYgKCFwcm9wc1t3b3JkXSkge1xuICAgICAgICAgIHByb3BzW3dvcmRdID0gYWRkaXRpb25hbFByb3BlcnRpZXMgfHwgYW55VHlwZTtcbiAgICAgICAgICBjdXJyZW50ICs9IDE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgY3VycmVudCA8IG1pbiAmJiBpIDwgcGF0dGVyblByb3BlcnR5S2V5cy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgY29uc3QgX2tleSA9IHBhdHRlcm5Qcm9wZXJ0eUtleXNbaV07XG4gICAgICBjb25zdCB3b3JkID0gcmFuZG9tLnJhbmRleHAoX2tleSk7XG5cblxuICAgICAgaWYgKCFwcm9wc1t3b3JkXSkge1xuICAgICAgICBwcm9wc1t3b3JkXSA9IHBhdHRlcm5Qcm9wZXJ0aWVzW19rZXldO1xuICAgICAgICBjdXJyZW50ICs9IDE7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gZmlsbCB1cC10byB0aGlzIHZhbHVlIGFuZCBubyBtb3JlIVxuICBpZiAocmVxdWlyZWRQcm9wZXJ0aWVzLmxlbmd0aCA9PT0gMCAmJiAoIWFsbG93c0FkZGl0aW9uYWwgfHwgb3B0aW9uYWxzUHJvYmFiaWxpdHkgPT09IGZhbHNlKSkge1xuICAgIGNvbnN0IG1heGltdW0gPSByYW5kb20ubnVtYmVyKG1pbiwgbWF4KTtcblxuICAgIGZvciAoOyBjdXJyZW50IDwgbWF4aW11bTspIHtcbiAgICAgIGNvbnN0IHdvcmQgPSBnZXQocHJvcGVydHlLZXlzKTtcblxuICAgICAgaWYgKHdvcmQpIHtcbiAgICAgICAgcHJvcHNbd29yZF0gPSBwcm9wZXJ0aWVzW3dvcmRdO1xuICAgICAgfVxuXG4gICAgICBjdXJyZW50ICs9IDE7XG4gICAgfVxuICB9XG5cbiAgbGV0IHNvcnRlZE9iaiA9IHByb3BzO1xuICBpZiAob3B0aW9uQVBJKCdzb3J0UHJvcGVydGllcycpICE9PSBudWxsKSB7XG4gICAgY29uc3Qgb3JpZ2luYWxLZXlzID0gT2JqZWN0LmtleXMocHJvcGVydGllcyk7XG4gICAgY29uc3Qgc29ydGVkS2V5cyA9IE9iamVjdC5rZXlzKHByb3BzKS5zb3J0KChhLCBiKSA9PiB7XG4gICAgICByZXR1cm4gb3B0aW9uQVBJKCdzb3J0UHJvcGVydGllcycpID8gYS5sb2NhbGVDb21wYXJlKGIpIDogb3JpZ2luYWxLZXlzLmluZGV4T2YoYSkgLSBvcmlnaW5hbEtleXMuaW5kZXhPZihiKTtcbiAgICB9KTtcblxuICAgIHNvcnRlZE9iaiA9IHNvcnRlZEtleXMucmVkdWNlKChtZW1vLCBrZXkpID0+IHtcbiAgICAgIG1lbW9ba2V5XSA9IHByb3BzW2tleV07XG4gICAgICByZXR1cm4gbWVtbztcbiAgICB9LCB7fSk7XG4gIH1cblxuICBjb25zdCByZXN1bHQgPSB0cmF2ZXJzZUNhbGxiYWNrKHNvcnRlZE9iaiwgcGF0aC5jb25jYXQoWydwcm9wZXJ0aWVzJ10pLCByZXNvbHZlLCB2YWx1ZSk7XG5cbiAgX2RlcHMuZm9yRWFjaChkZXAgPT4ge1xuICAgIGZvciAoY29uc3Qgc3ViIG9mIGRlcC52YWx1ZXMpIHtcbiAgICAgIC8vIFRPRE86IHRoaXMgd291bGQgbm90IGNoZWNrIGFsbCBwb3NzaWJpbGl0aWVzLCB0byBkbyBzbywgd2Ugc2hvdWxkIFwidmFsaWRhdGVcIiB0aGVcbiAgICAgIC8vIGdlbmVyYXRlZCB2YWx1ZSBhZ2FpbnN0IGV2ZXJ5IHNjaGVtYS4uLiBob3dldmVyLCBJIGRvbid0IHdhbnQgdG8gaW5jbHVkZSBhIHZhbGlkYXRvci4uLlxuICAgICAgaWYgKHV0aWxzLmhhc1ZhbHVlKHN1Yi5wcm9wZXJ0aWVzW2RlcC5wcm9wXSwgcmVzdWx0LnZhbHVlW2RlcC5wcm9wXSkpIHtcbiAgICAgICAgT2JqZWN0LmtleXMoc3ViLnByb3BlcnRpZXMpLmZvckVhY2gobmV4dCA9PiB7XG4gICAgICAgICAgaWYgKG5leHQgIT09IGRlcC5wcm9wKSB7XG4gICAgICAgICAgICB1dGlscy5tZXJnZShyZXN1bHQudmFsdWUsIHRyYXZlcnNlQ2FsbGJhY2soc3ViLnByb3BlcnRpZXMsIHBhdGguY29uY2F0KFsncHJvcGVydGllcyddKSwgcmVzb2x2ZSwgdmFsdWUpLnZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IG9iamVjdFR5cGU7XG4iLCAiaW1wb3J0IHdvcmRzIGZyb20gJy4vd29yZHMubWpzJztcbmltcG9ydCByYW5kb20gZnJvbSAnLi4vY29yZS9yYW5kb20ubWpzJztcblxuLyoqXG4gKiBIZWxwZXIgZnVuY3Rpb24gdXNlZCBieSB0aHVua0dlbmVyYXRvciB0byBwcm9kdWNlIHNvbWUgd29yZHMgZm9yIHRoZSBmaW5hbCByZXN1bHQuXG4gKlxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gcHJvZHVjZSgpIHtcbiAgY29uc3QgbGVuZ3RoID0gcmFuZG9tLm51bWJlcigxLCA1KTtcblxuICByZXR1cm4gd29yZHMobGVuZ3RoKS5qb2luKCcgJyk7XG59XG5cbi8qKlxuICogR2VuZXJhdGVzIHJhbmRvbWl6ZWQgY29uY2F0ZW5hdGVkIHN0cmluZyBiYXNlZCBvbiB3b3JkcyBnZW5lcmF0b3IuXG4gKlxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gdGh1bmtHZW5lcmF0b3IobWluID0gMCwgbWF4ID0gMTQwKSB7XG4gIGNvbnN0IF9taW4gPSBNYXRoLm1heCgwLCBtaW4pO1xuICBjb25zdCBfbWF4ID0gcmFuZG9tLm51bWJlcihfbWluLCBtYXgpO1xuXG4gIGxldCByZXN1bHQgPSBwcm9kdWNlKCk7XG5cbiAgLy8gYXBwZW5kIHVudGlsIGxlbmd0aCBpcyByZWFjaGVkXG4gIHdoaWxlIChyZXN1bHQubGVuZ3RoIDwgX21pbikge1xuICAgIHJlc3VsdCArPSBwcm9kdWNlKCk7XG4gIH1cblxuICAvLyBjdXQgaWYgbmVlZGVkXG4gIGlmIChyZXN1bHQubGVuZ3RoID4gX21heCkge1xuICAgIHJlc3VsdCA9IHJlc3VsdC5zdWJzdHIoMCwgX21heCk7XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZGVmYXVsdCB0aHVua0dlbmVyYXRvcjtcbiIsICJpbXBvcnQgcmFuZG9tIGZyb20gJy4uL2NvcmUvcmFuZG9tLm1qcyc7XG5cbi8qKlxuICogR2VuZXJhdGVzIHJhbmRvbWl6ZWQgaXB2NCBhZGRyZXNzLlxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGlwdjRHZW5lcmF0b3IoKSB7XG4gIHJldHVybiBbMCwgMCwgMCwgMF0ubWFwKCgpID0+IHtcbiAgICByZXR1cm4gcmFuZG9tLm51bWJlcigwLCAyNTUpO1xuICB9KS5qb2luKCcuJyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGlwdjRHZW5lcmF0b3I7XG4iLCAiaW1wb3J0IHJhbmRvbSBmcm9tICcuLi9jb3JlL3JhbmRvbS5tanMnO1xuXG4vKipcbiAqIEdlbmVyYXRlcyByYW5kb21pemVkIGRhdGUgdGltZSBJU08gZm9ybWF0IHN0cmluZy5cbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBkYXRlVGltZUdlbmVyYXRvcigpIHtcbiAgcmV0dXJuIHJhbmRvbS5kYXRlKCkudG9JU09TdHJpbmcoKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZGF0ZVRpbWVHZW5lcmF0b3I7XG4iLCAiaW1wb3J0IGRhdGVUaW1lR2VuZXJhdG9yIGZyb20gJy4vZGF0ZVRpbWUubWpzJztcblxuLyoqXG4gKiBHZW5lcmF0ZXMgcmFuZG9taXplZCBkYXRlIGZvcm1hdCBzdHJpbmcuXG4gKlxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gZGF0ZUdlbmVyYXRvcigpIHtcbiAgcmV0dXJuIGRhdGVUaW1lR2VuZXJhdG9yKCkuc2xpY2UoMCwgMTApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBkYXRlR2VuZXJhdG9yO1xuIiwgImltcG9ydCBkYXRlVGltZUdlbmVyYXRvciBmcm9tICcuL2RhdGVUaW1lLm1qcyc7XG5cbi8qKlxuICogR2VuZXJhdGVzIHJhbmRvbWl6ZWQgdGltZSBmb3JtYXQgc3RyaW5nLlxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIHRpbWVHZW5lcmF0b3IoKSB7XG4gIHJldHVybiBkYXRlVGltZUdlbmVyYXRvcigpLnNsaWNlKDExKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdGltZUdlbmVyYXRvcjtcbiIsICJpbXBvcnQgcmFuZG9tIGZyb20gJy4uL2NvcmUvcmFuZG9tLm1qcyc7XG5cbmNvbnN0IEZSQUdNRU5UID0gJ1thLXpBLVpdW2EtekEtWjAtOSstLl0qJztcbmNvbnN0IFVSSV9QQVRURVJOID0gYGh0dHBzPzovL3tob3N0bmFtZX0oPzoke0ZSQUdNRU5UfSkrYDtcbmNvbnN0IFBBUkFNX1BBVFRFUk4gPSAnKD86XFxcXD8oW2Etel17MSw3fSg9XFxcXHd7MSw1fSk/Jil7MCwzfSk/JztcblxuLyoqXG4gKiBQcmVkZWZpbmVkIGNvcmUgZm9ybWF0c1xuICogQHR5cGUge1trZXk6IHN0cmluZ106IHN0cmluZ31cbiAqL1xuY29uc3QgcmVnZXhwcyA9IHtcbiAgZW1haWw6ICdbYS16QS1aXFxcXGRdW2EtekEtWlxcXFxkLV17MSwxM31bYS16QS1aXFxcXGRdQHtob3N0bmFtZX0nLFxuICBob3N0bmFtZTogJ1thLXpBLVpdezEsMzN9XFxcXC5bYS16XXsyLDR9JyxcbiAgaXB2NjogJ1thLWZcXFxcZF17NH0oOlthLWZcXFxcZF17NH0pezd9JyxcbiAgdXJpOiBVUklfUEFUVEVSTixcbiAgc2x1ZzogJ1thLXpBLVpcXFxcZF8tXSsnLFxuXG4gIC8vIHR5cGVzIGZyb20gZHJhZnQtMFs2N10gKD8pXG4gICd1cmktcmVmZXJlbmNlJzogYCR7VVJJX1BBVFRFUk59JHtQQVJBTV9QQVRURVJOfWAsXG4gICd1cmktdGVtcGxhdGUnOiBVUklfUEFUVEVSTi5yZXBsYWNlKCcoPzonLCAnKD86L1xcXFx7W2Etel1bOmEtekEtWjAtOS1dKlxcXFx9fCcpLFxuICAnanNvbi1wb2ludGVyJzogYCgvKD86JHtGUkFHTUVOVC5yZXBsYWNlKCddKicsICcvXSonKX18flswMV0pKStgLFxuXG4gIC8vIHNvbWUgdHlwZXMgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vT0FJL09wZW5BUEktU3BlY2lmaWNhdGlvbi9ibG9iL21hc3Rlci92ZXJzaW9ucy8zLjAuMS5tZCNkYXRhLXR5cGVzICg/KVxuICB1dWlkOiAnXlswLTlhLWZdezh9LSg/OlswLTlhLWZdezR9LSl7M31bMC05YS1mXXsxMn0kJyxcblxuICBkdXJhdGlvbjogJ15QKD8hJCkoKFxcXFxkK1kpPyhcXFxcZCtNKT8oXFxcXGQrRCk/KFQoPz1cXFxcZCkoXFxcXGQrSCk/KFxcXFxkK00pPyhcXFxcZCtTKT8pP3woXFxcXGQrVyk/KSQnLFxufTtcblxucmVnZXhwcy5pcmkgPSByZWdleHBzWyd1cmktcmVmZXJlbmNlJ107XG5yZWdleHBzWydpcmktcmVmZXJlbmNlJ10gPSByZWdleHBzWyd1cmktcmVmZXJlbmNlJ107XG5cbnJlZ2V4cHNbJ2lkbi1lbWFpbCddID0gcmVnZXhwcy5lbWFpbDtcbnJlZ2V4cHNbJ2lkbi1ob3N0bmFtZSddID0gcmVnZXhwcy5ob3N0bmFtZTtcblxuY29uc3QgQUxMT1dFRF9GT1JNQVRTID0gbmV3IFJlZ0V4cChgXFxcXHsoJHtPYmplY3Qua2V5cyhyZWdleHBzKS5qb2luKCd8Jyl9KVxcXFx9YCk7XG5cbi8qKlxuICogR2VuZXJhdGVzIHJhbmRvbWl6ZWQgc3RyaW5nIGJhc2luZyBvbiBhIGJ1aWx0LWluIHJlZ2V4IGZvcm1hdFxuICpcbiAqIEBwYXJhbSBjb3JlRm9ybWF0XG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBjb3JlRm9ybWF0R2VuZXJhdG9yKGNvcmVGb3JtYXQpIHtcbiAgcmV0dXJuIHJhbmRvbS5yYW5kZXhwKHJlZ2V4cHNbY29yZUZvcm1hdF0pLnJlcGxhY2UoQUxMT1dFRF9GT1JNQVRTLCAobWF0Y2gsIGtleSkgPT4ge1xuICAgIHJldHVybiByYW5kb20ucmFuZGV4cChyZWdleHBzW2tleV0pO1xuICB9KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY29yZUZvcm1hdEdlbmVyYXRvcjtcbiIsICJpbXBvcnQgdGh1bmsgZnJvbSAnLi4vZ2VuZXJhdG9ycy90aHVuay5tanMnO1xuaW1wb3J0IGlwdjQgZnJvbSAnLi4vZ2VuZXJhdG9ycy9pcHY0Lm1qcyc7XG5pbXBvcnQgZGF0ZVRpbWUgZnJvbSAnLi4vZ2VuZXJhdG9ycy9kYXRlVGltZS5tanMnO1xuaW1wb3J0IGRhdGUgZnJvbSAnLi4vZ2VuZXJhdG9ycy9kYXRlLm1qcyc7XG5pbXBvcnQgdGltZSBmcm9tICcuLi9nZW5lcmF0b3JzL3RpbWUubWpzJztcbmltcG9ydCBjb3JlRm9ybWF0IGZyb20gJy4uL2dlbmVyYXRvcnMvY29yZUZvcm1hdC5tanMnO1xuaW1wb3J0IG9wdGlvbkFQSSBmcm9tICcuLi9hcGkvb3B0aW9uLm1qcyc7XG5pbXBvcnQgZm9ybWF0IGZyb20gJy4uL2FwaS9mb3JtYXQubWpzJztcbmltcG9ydCByYW5kb20gZnJvbSAnLi4vY29yZS9yYW5kb20ubWpzJztcbmltcG9ydCB1dGlscyBmcm9tICcuLi9jb3JlL3V0aWxzLm1qcyc7XG5cbmZ1bmN0aW9uIGdlbmVyYXRlRm9ybWF0KHZhbHVlLCBpbnZhbGlkKSB7XG4gIGNvbnN0IGNhbGxiYWNrID0gZm9ybWF0KHZhbHVlLmZvcm1hdCk7XG5cbiAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBjYWxsYmFjayh2YWx1ZSk7XG4gIH1cblxuICBzd2l0Y2ggKHZhbHVlLmZvcm1hdCkge1xuICAgIGNhc2UgJ2RhdGUtdGltZSc6XG4gICAgY2FzZSAnZGF0ZXRpbWUnOlxuICAgICAgcmV0dXJuIGRhdGVUaW1lKCk7XG4gICAgY2FzZSAnZGF0ZSc6XG4gICAgICByZXR1cm4gZGF0ZSgpO1xuICAgIGNhc2UgJ3RpbWUnOlxuICAgICAgcmV0dXJuIHRpbWUoKTtcbiAgICBjYXNlICdpcHY0JzpcbiAgICAgIHJldHVybiBpcHY0KCk7XG4gICAgY2FzZSAncmVnZXgnOlxuICAgICAgLy8gVE9ETzogZGlzY3Vzc1xuICAgICAgcmV0dXJuICcuKz8nO1xuICAgIGNhc2UgJ2VtYWlsJzpcbiAgICBjYXNlICdob3N0bmFtZSc6XG4gICAgY2FzZSAnaXB2Nic6XG4gICAgY2FzZSAndXJpJzpcbiAgICBjYXNlICd1cmktcmVmZXJlbmNlJzpcbiAgICBjYXNlICdpcmknOlxuICAgIGNhc2UgJ2lyaS1yZWZlcmVuY2UnOlxuICAgIGNhc2UgJ2lkbi1lbWFpbCc6XG4gICAgY2FzZSAnaWRuLWhvc3RuYW1lJzpcbiAgICBjYXNlICdqc29uLXBvaW50ZXInOlxuICAgIGNhc2UgJ3NsdWcnOlxuICAgIGNhc2UgJ3VyaS10ZW1wbGF0ZSc6XG4gICAgY2FzZSAndXVpZCc6XG4gICAgY2FzZSAnZHVyYXRpb24nOlxuICAgICAgcmV0dXJuIGNvcmVGb3JtYXQodmFsdWUuZm9ybWF0KTtcbiAgICBkZWZhdWx0OlxuICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgaWYgKG9wdGlvbkFQSSgnZmFpbE9uSW52YWxpZEZvcm1hdCcpKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGB1bmtub3duIHJlZ2lzdHJ5IGtleSAke3V0aWxzLnNob3J0KHZhbHVlLmZvcm1hdCl9YCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGludmFsaWQoKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYHVuc3VwcG9ydGVkIGZvcm1hdCAnJHt2YWx1ZS5mb3JtYXR9J2ApO1xuICB9XG59XG5cbmZ1bmN0aW9uIHN0cmluZ1R5cGUodmFsdWUpIHtcbiAgLy8gaGVyZSB3ZSBuZWVkIHRvIGZvcmNlIHR5cGUgdG8gZml4ICM0NjdcbiAgY29uc3Qgb3V0cHV0ID0gdXRpbHMudHlwZWNhc3QoJ3N0cmluZycsIHZhbHVlLCBvcHRzID0+IHtcbiAgICBpZiAodmFsdWUuZm9ybWF0KSB7XG4gICAgICByZXR1cm4gZ2VuZXJhdGVGb3JtYXQodmFsdWUsICgpID0+IHRodW5rKG9wdHMubWluTGVuZ3RoLCBvcHRzLm1heExlbmd0aCkpO1xuICAgIH1cblxuICAgIGlmICh2YWx1ZS5wYXR0ZXJuKSB7XG4gICAgICByZXR1cm4gcmFuZG9tLnJhbmRleHAodmFsdWUucGF0dGVybik7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRodW5rKG9wdHMubWluTGVuZ3RoLCBvcHRzLm1heExlbmd0aCk7XG4gIH0pO1xuXG4gIHJldHVybiBvdXRwdXQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHN0cmluZ1R5cGU7XG4iLCAiaW1wb3J0IF9ib29sZWFuIGZyb20gJy4vYm9vbGVhbi5tanMnO1xuaW1wb3J0IF9udWxsIGZyb20gJy4vbnVsbC5tanMnO1xuaW1wb3J0IF9hcnJheSBmcm9tICcuL2FycmF5Lm1qcyc7XG5pbXBvcnQgX2ludGVnZXIgZnJvbSAnLi9pbnRlZ2VyLm1qcyc7XG5pbXBvcnQgX251bWJlciBmcm9tICcuL251bWJlci5tanMnO1xuaW1wb3J0IF9vYmplY3QgZnJvbSAnLi9vYmplY3QubWpzJztcbmltcG9ydCBfc3RyaW5nIGZyb20gJy4vc3RyaW5nLm1qcyc7XG5cbmNvbnN0IHR5cGVNYXAgPSB7XG4gIGJvb2xlYW46IF9ib29sZWFuLFxuICBudWxsOiBfbnVsbCxcbiAgYXJyYXk6IF9hcnJheSxcbiAgaW50ZWdlcjogX2ludGVnZXIsXG4gIG51bWJlcjogX251bWJlcixcbiAgb2JqZWN0OiBfb2JqZWN0LFxuICBzdHJpbmc6IF9zdHJpbmcsXG59O1xuXG5leHBvcnQgZGVmYXVsdCB0eXBlTWFwO1xuIiwgImltcG9ydCB1dGlscyBmcm9tICcuL3V0aWxzLm1qcyc7XG5pbXBvcnQgcmFuZG9tIGZyb20gJy4vcmFuZG9tLm1qcyc7XG5pbXBvcnQgUGFyc2VFcnJvciBmcm9tICcuL2Vycm9yLm1qcyc7XG5pbXBvcnQgaW5mZXJUeXBlIGZyb20gJy4vaW5mZXIubWpzJztcbmltcG9ydCB0eXBlcyBmcm9tICcuLi90eXBlcy9pbmRleC5tanMnO1xuaW1wb3J0IG9wdGlvbkFQSSBmcm9tICcuLi9hcGkvb3B0aW9uLm1qcyc7XG5cbmZ1bmN0aW9uIGdldE1ldGEoeyAkY29tbWVudDogY29tbWVudCwgdGl0bGUsIGRlc2NyaXB0aW9uIH0pIHtcbiAgcmV0dXJuIE9iamVjdC5lbnRyaWVzKHsgY29tbWVudCwgdGl0bGUsIGRlc2NyaXB0aW9uIH0pXG4gICAgLmZpbHRlcigoWywgdmFsdWVdKSA9PiB2YWx1ZSlcbiAgICAucmVkdWNlKChtZW1vLCBbaywgdl0pID0+IHtcbiAgICAgIG1lbW9ba10gPSB2O1xuICAgICAgcmV0dXJuIG1lbW87XG4gICAgfSwge30pO1xufVxuXG4vLyBUT0RPIHByb3ZpZGUgdHlwZXNcbmZ1bmN0aW9uIHRyYXZlcnNlKHNjaGVtYSwgcGF0aCwgcmVzb2x2ZSwgcm9vdFNjaGVtYSkge1xuICBzY2hlbWEgPSByZXNvbHZlKHNjaGVtYSwgbnVsbCwgcGF0aCk7XG5cbiAgaWYgKHNjaGVtYSAmJiAoc2NoZW1hLm9uZU9mIHx8IHNjaGVtYS5hbnlPZiB8fCBzY2hlbWEuYWxsT2YpKSB7XG4gICAgc2NoZW1hID0gcmVzb2x2ZShzY2hlbWEsIG51bGwsIHBhdGgpO1xuICB9XG5cbiAgaWYgKCFzY2hlbWEpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYENhbm5vdCB0cmF2ZXJzZSBhdCAnJHtwYXRoLmpvaW4oJy4nKX0nLCBnaXZlbiAnJHtKU09OLnN0cmluZ2lmeShyb290U2NoZW1hKX0nYCk7XG4gIH1cblxuICBjb25zdCBjb250ZXh0ID0ge1xuICAgIC4uLmdldE1ldGEoc2NoZW1hKSxcbiAgICBzY2hlbWFQYXRoOiBwYXRoLFxuICB9O1xuXG4gIC8vIGRlZmF1bHQgdmFsdWVzIGhhcyBoaWdoZXIgcHJlY2VkZW5jZVxuICBpZiAocGF0aFtwYXRoLmxlbmd0aCAtIDFdICE9PSAncHJvcGVydGllcycpIHtcbiAgICAvLyBleGFtcGxlIHZhbHVlcyBoYXZlIGhpZ2hlc3QgcHJlY2VkZW5jZVxuICAgIGlmIChvcHRpb25BUEkoJ3VzZUV4YW1wbGVzVmFsdWUnKSAmJiBBcnJheS5pc0FycmF5KHNjaGVtYS5leGFtcGxlcykpIHtcbiAgICAgIC8vIGluY2x1ZGUgYGRlZmF1bHRgIHZhbHVlIGFzIGV4YW1wbGUgdG9vXG4gICAgICBjb25zdCBmaXhlZEV4YW1wbGVzID0gc2NoZW1hLmV4YW1wbGVzXG4gICAgICAgIC5jb25jYXQoJ2RlZmF1bHQnIGluIHNjaGVtYSA/IFtzY2hlbWEuZGVmYXVsdF0gOiBbXSk7XG5cbiAgICAgIHJldHVybiB7IHZhbHVlOiB1dGlscy50eXBlY2FzdChudWxsLCBzY2hlbWEsICgpID0+IHJhbmRvbS5waWNrKGZpeGVkRXhhbXBsZXMpKSwgY29udGV4dCB9O1xuICAgIH1cbiAgICAvLyBJZiBzY2hlbWEgY29udGFpbnMgc2luZ2xlIGV4YW1wbGUgcHJvcGVydHlcbiAgICBpZiAob3B0aW9uQVBJKCd1c2VFeGFtcGxlc1ZhbHVlJykgJiYgdHlwZW9mIHNjaGVtYS5leGFtcGxlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgcmV0dXJuIHsgdmFsdWU6IHV0aWxzLnR5cGVjYXN0KG51bGwsIHNjaGVtYSwgKCkgPT4gc2NoZW1hLmV4YW1wbGUpLCBjb250ZXh0IH07XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbkFQSSgndXNlRGVmYXVsdFZhbHVlJykgJiYgJ2RlZmF1bHQnIGluIHNjaGVtYSkge1xuICAgICAgaWYgKHNjaGVtYS5kZWZhdWx0ICE9PSAnJyB8fCAhb3B0aW9uQVBJKCdyZXBsYWNlRW1wdHlCeVJhbmRvbVZhbHVlJykpIHtcbiAgICAgICAgcmV0dXJuIHsgdmFsdWU6IHNjaGVtYS5kZWZhdWx0LCBjb250ZXh0IH07XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCd0ZW1wbGF0ZScgaW4gc2NoZW1hKSB7XG4gICAgICByZXR1cm4geyB2YWx1ZTogdXRpbHMudGVtcGxhdGUoc2NoZW1hLnRlbXBsYXRlLCByb290U2NoZW1hKSwgY29udGV4dCB9O1xuICAgIH1cblxuICAgIGlmICgnY29uc3QnIGluIHNjaGVtYSkge1xuICAgICAgcmV0dXJuIHsgdmFsdWU6IHNjaGVtYS5jb25zdCwgY29udGV4dCB9O1xuICAgIH1cbiAgfVxuXG4gIGlmIChzY2hlbWEubm90ICYmIHR5cGVvZiBzY2hlbWEubm90ID09PSAnb2JqZWN0Jykge1xuICAgIHNjaGVtYSA9IHV0aWxzLm5vdFZhbHVlKHNjaGVtYS5ub3QsIHV0aWxzLm9taXRQcm9wcyhzY2hlbWEsIFsnbm90J10pKTtcblxuICAgIC8vIGJ1aWxkIG5ldyBvYmplY3QgdmFsdWUgZnJvbSBub3Qtc2NoZW1hIVxuICAgIGlmIChzY2hlbWEudHlwZSAmJiBzY2hlbWEudHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGNvbnN0IHsgdmFsdWUsIGNvbnRleHQ6IGlubmVyQ29udGV4dCB9ID0gdHJhdmVyc2Uoc2NoZW1hLCBwYXRoLmNvbmNhdChbJ25vdCddKSwgcmVzb2x2ZSwgcm9vdFNjaGVtYSk7XG4gICAgICByZXR1cm4geyB2YWx1ZTogdXRpbHMuY2xlYW4odmFsdWUsIHNjaGVtYSwgZmFsc2UpLCBjb250ZXh0OiB7IC4uLmNvbnRleHQsIGl0ZW1zOiBpbm5lckNvbnRleHQgfSB9O1xuICAgIH1cbiAgfVxuXG4gIC8vIHRodW5rcyBjYW4gcmV0dXJuIHN1Yi1zY2hlbWFzXG4gIGlmICh0eXBlb2Ygc2NoZW1hLnRodW5rID09PSAnZnVuY3Rpb24nKSB7XG4gICAgLy8gcmVzdWx0IGlzIGFscmVhZHkgY2xlYW5lZCBpbiB0aHVua1xuICAgIGNvbnN0IHsgdmFsdWUsIGNvbnRleHQ6IGlubmVyQ29udGV4dCB9ID0gdHJhdmVyc2Uoc2NoZW1hLnRodW5rKHJvb3RTY2hlbWEpLCBwYXRoLCByZXNvbHZlKTtcbiAgICByZXR1cm4geyB2YWx1ZSwgY29udGV4dDogeyAuLi5jb250ZXh0LCBpdGVtczogaW5uZXJDb250ZXh0IH0gfTtcbiAgfVxuXG4gIC8vIHNob3J0LWNpcmN1aXQgYXMgd2UgZG9uJ3QgcGxhbiBnZW5lcmF0ZSBtb3JlIHZhbHVlcyFcbiAgaWYgKHNjaGVtYS5qc29uUGF0aCkge1xuICAgIHJldHVybiB7IHZhbHVlOiBzY2hlbWEsIGNvbnRleHQgfTtcbiAgfVxuXG4gIC8vIFRPRE8gcmVtb3ZlIHRoZSB1Z2x5IG92ZXJjb21lXG4gIGxldCB0eXBlID0gc2NoZW1hLnR5cGU7XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkodHlwZSkpIHtcbiAgICB0eXBlID0gcmFuZG9tLnBpY2sodHlwZSk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIHR5cGUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgLy8gQXR0ZW1wdCB0byBpbmZlciB0aGUgdHlwZVxuICAgIHR5cGUgPSBpbmZlclR5cGUoc2NoZW1hLCBwYXRoKSB8fCB0eXBlO1xuXG4gICAgaWYgKHR5cGUpIHtcbiAgICAgIHNjaGVtYS50eXBlID0gdHlwZTtcbiAgICB9XG4gIH1cblxuICBpZiAodHlwZW9mIHNjaGVtYS5nZW5lcmF0ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNvbnN0IHJldFZhbCA9IHV0aWxzLnR5cGVjYXN0KG51bGwsIHNjaGVtYSwgKCkgPT4gc2NoZW1hLmdlbmVyYXRlKHJvb3RTY2hlbWEsIHBhdGgpKTtcbiAgICBjb25zdCByZXRUeXBlID0gcmV0VmFsID09PSBudWxsID8gJ251bGwnIDogdHlwZW9mIHJldFZhbDtcbiAgICBpZiAocmV0VHlwZSA9PT0gdHlwZVxuICAgICAgfHwgKHJldFR5cGUgPT09ICdudW1iZXInICYmIHR5cGUgPT09ICdpbnRlZ2VyJylcbiAgICAgIHx8IChBcnJheS5pc0FycmF5KHJldFZhbCkgJiYgdHlwZSA9PT0gJ2FycmF5JykpIHtcbiAgICAgIHJldHVybiB7IHZhbHVlOiByZXRWYWwsIGNvbnRleHQgfTtcbiAgICB9XG4gIH1cblxuICBpZiAodHlwZW9mIHNjaGVtYS5wYXR0ZXJuID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiB7IHZhbHVlOiB1dGlscy50eXBlY2FzdCgnc3RyaW5nJywgc2NoZW1hLCAoKSA9PiByYW5kb20ucmFuZGV4cChzY2hlbWEucGF0dGVybikpLCBjb250ZXh0IH07XG4gIH1cblxuICBpZiAoQXJyYXkuaXNBcnJheShzY2hlbWEuZW51bSkpIHtcbiAgICByZXR1cm4geyB2YWx1ZTogdXRpbHMudHlwZWNhc3QobnVsbCwgc2NoZW1hLCAoKSA9PiByYW5kb20ucGljayhzY2hlbWEuZW51bSkpLCBjb250ZXh0IH07XG4gIH1cblxuICBpZiAodHlwZW9mIHR5cGUgPT09ICdzdHJpbmcnKSB7XG4gICAgaWYgKCF0eXBlc1t0eXBlXSkge1xuICAgICAgaWYgKG9wdGlvbkFQSSgnZmFpbE9uSW52YWxpZFR5cGVzJykpIHtcbiAgICAgICAgdGhyb3cgbmV3IFBhcnNlRXJyb3IoYHVua25vd24gcHJpbWl0aXZlICR7dXRpbHMuc2hvcnQodHlwZSl9YCwgcGF0aC5jb25jYXQoWyd0eXBlJ10pKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gb3B0aW9uQVBJKCdkZWZhdWx0SW52YWxpZFR5cGVQcm9kdWN0Jyk7XG5cbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgJiYgdHlwZXNbdmFsdWVdKSB7XG4gICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IHR5cGVzW3ZhbHVlXShzY2hlbWEsIHBhdGgsIHJlc29sdmUsIHRyYXZlcnNlKSwgY29udGV4dCB9O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHsgdmFsdWUsIGNvbnRleHQgfTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgaW5uZXJSZXN1bHQgPSB0eXBlc1t0eXBlXShzY2hlbWEsIHBhdGgsIHJlc29sdmUsIHRyYXZlcnNlKTtcbiAgICAgICAgaWYgKHR5cGUgPT09ICdhcnJheScpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmFsdWU6IGlubmVyUmVzdWx0Lm1hcCgoeyB2YWx1ZSB9KSA9PiB2YWx1ZSksXG4gICAgICAgICAgICBjb250ZXh0OiB7XG4gICAgICAgICAgICAgIC4uLmNvbnRleHQsXG4gICAgICAgICAgICAgIGl0ZW1zOiBpbm5lclJlc3VsdC5tYXAoXG4gICAgICAgICAgICAgICAgQXJyYXkuaXNBcnJheShzY2hlbWEuaXRlbXMpXG4gICAgICAgICAgICAgICAgICA/ICh7IGNvbnRleHQ6IGMgfSkgPT4gY1xuICAgICAgICAgICAgICAgICAgOiAoeyBjb250ZXh0OiBjIH0pID0+ICh7XG4gICAgICAgICAgICAgICAgICAgIC4uLmMsXG4gICAgICAgICAgICAgICAgICAgIC8vIHdlIGhhdmUgdG8gcmVtb3ZlIHRoZSBpbmRleCBmcm9tIHRoZSBwYXRoIHRvIGdldCB0aGUgcmVhbCBzY2hlbWEgcGF0aFxuICAgICAgICAgICAgICAgICAgICBzY2hlbWFQYXRoOiBjLnNjaGVtYVBhdGguc2xpY2UoMCwgLTEpLFxuICAgICAgICAgICAgICAgICAgfSkpLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgIHJldHVybiBpbm5lclJlc3VsdCAhPT0gbnVsbFxuICAgICAgICAgICAgPyB7IHZhbHVlOiBpbm5lclJlc3VsdC52YWx1ZSwgY29udGV4dDogeyAuLi5jb250ZXh0LCBpdGVtczogaW5uZXJSZXN1bHQuY29udGV4dCB9IH1cbiAgICAgICAgICAgIDogeyB2YWx1ZToge30sIGNvbnRleHQgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyB2YWx1ZTogaW5uZXJSZXN1bHQsIGNvbnRleHQgfTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBlLnBhdGggPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFBhcnNlRXJyb3IoZS5zdGFjaywgcGF0aCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBsZXQgdmFsdWVDb3B5ID0ge307XG4gIGxldCBjb250ZXh0Q29weSA9IHsgLi4uY29udGV4dCB9O1xuXG4gIGlmIChBcnJheS5pc0FycmF5KHNjaGVtYSkpIHtcbiAgICB2YWx1ZUNvcHkgPSBbXTtcbiAgfVxuXG4gIGNvbnN0IHBydW5lUHJvcGVydGllcyA9IG9wdGlvbkFQSSgncHJ1bmVQcm9wZXJ0aWVzJykgfHwgW107XG5cbiAgT2JqZWN0LmtleXMoc2NoZW1hKS5mb3JFYWNoKHByb3AgPT4ge1xuICAgIGlmIChwcnVuZVByb3BlcnRpZXMuaW5jbHVkZXMocHJvcCkpIHJldHVybjtcbiAgICBpZiAoc2NoZW1hW3Byb3BdID09PSBudWxsKSByZXR1cm47XG4gICAgaWYgKHR5cGVvZiBzY2hlbWFbcHJvcF0gPT09ICdvYmplY3QnICYmIHByb3AgIT09ICdkZWZpbml0aW9ucycpIHtcbiAgICAgIGNvbnN0IHsgdmFsdWUsIGNvbnRleHQ6IGlubmVyQ29udGV4dCB9ID0gdHJhdmVyc2Uoc2NoZW1hW3Byb3BdLCBwYXRoLmNvbmNhdChbcHJvcF0pLCByZXNvbHZlLCB2YWx1ZUNvcHkpO1xuICAgICAgdmFsdWVDb3B5W3Byb3BdID0gdXRpbHMuY2xlYW4odmFsdWUsIHNjaGVtYVtwcm9wXSwgZmFsc2UpO1xuICAgICAgY29udGV4dENvcHlbcHJvcF0gPSBpbm5lckNvbnRleHQ7XG5cbiAgICAgIGlmICh2YWx1ZUNvcHlbcHJvcF0gPT09IG51bGwgJiYgb3B0aW9uQVBJKCdvbWl0TnVsbHMnKSkge1xuICAgICAgICBkZWxldGUgdmFsdWVDb3B5W3Byb3BdO1xuICAgICAgICBkZWxldGUgY29udGV4dENvcHlbcHJvcF07XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhbHVlQ29weVtwcm9wXSA9IHNjaGVtYVtwcm9wXTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiB7IHZhbHVlOiB2YWx1ZUNvcHksIGNvbnRleHQ6IGNvbnRleHRDb3B5IH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IHRyYXZlcnNlO1xuIiwgImltcG9ydCBvcHRpb25BUEkgZnJvbSAnLi4vYXBpL29wdGlvbi5tanMnO1xuaW1wb3J0IHJhbmRvbSBmcm9tICcuL3JhbmRvbS5tanMnO1xuaW1wb3J0IHV0aWxzIGZyb20gJy4vdXRpbHMubWpzJztcblxuY29uc3QgYnVpbGRSZXNvbHZlU2NoZW1hID0gKHtcbiAgcmVmcyxcbiAgc2NoZW1hLFxuICBjb250YWluZXIsXG4gIHN5bmNocm9ub3VzLFxuICByZWZEZXB0aE1heCxcbiAgcmVmRGVwdGhNaW4sXG59KSA9PiB7XG4gIGNvbnN0IHJlY3Vyc2l2ZVV0aWwgPSB7fTtcbiAgY29uc3Qgc2VlblJlZnMgPSB7fTtcblxuICBsZXQgZGVwdGggPSAwO1xuICBsZXQgbGFzdFJlZjtcbiAgbGV0IGxhc3RQYXRoO1xuXG4gIHJlY3Vyc2l2ZVV0aWwucmVzb2x2ZVNjaGVtYSA9IChzdWIsIGluZGV4LCByb290UGF0aCkgPT4ge1xuICAgIC8vIHByZXZlbnQgbnVsbCBzdWIgZnJvbSBkZWZhdWx0L2V4YW1wbGUgbnVsbCB2YWx1ZXMgdG8gdGhyb3dcbiAgICBpZiAoc3ViID09PSBudWxsIHx8IHN1YiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHN1Yi5nZW5lcmF0ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIHN1YjtcbiAgICB9XG5cbiAgICAvLyBjbGVhbnVwXG4gICAgY29uc3QgX2lkID0gc3ViLiRpZCB8fCBzdWIuaWQ7XG5cbiAgICBpZiAodHlwZW9mIF9pZCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGRlbGV0ZSBzdWIuaWQ7XG4gICAgICBkZWxldGUgc3ViLiRpZDtcbiAgICAgIGRlbGV0ZSBzdWIuJHNjaGVtYTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHN1Yi4kcmVmID09PSAnc3RyaW5nJykge1xuICAgICAgY29uc3QgbWF4RGVwdGggPSBNYXRoLm1heChyZWZEZXB0aE1pbiwgcmVmRGVwdGhNYXgpIC0gMTtcblxuICAgICAgLy8gaW5jcmVhc2luZyBkZXB0aCBvbmx5IGZvciByZXBlYXRlZCByZWZzIHNlZW1zIHRvIGJlIGZpeGluZyAjMjU4XG4gICAgICBpZiAoc3ViLiRyZWYgPT09ICcjJyB8fCBzZWVuUmVmc1tzdWIuJHJlZl0gPCAwIHx8IChsYXN0UmVmID09PSBzdWIuJHJlZiAmJiArK2RlcHRoID4gbWF4RGVwdGgpKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgICAgaWYgKHN1Yi4kcmVmICE9PSAnIycgJiYgbGFzdFBhdGggJiYgbGFzdFBhdGgubGVuZ3RoID09PSByb290UGF0aC5sZW5ndGgpIHtcbiAgICAgICAgICByZXR1cm4gdXRpbHMuZ2V0TG9jYWxSZWYoc2NoZW1hLCBzdWIuJHJlZiwgc3luY2hyb25vdXMgJiYgcmVmcyk7XG4gICAgICAgIH1cbiAgICAgICAgZGVsZXRlIHN1Yi4kcmVmO1xuICAgICAgICByZXR1cm4gc3ViO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIHNlZW5SZWZzW3N1Yi4kcmVmXSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgc2VlblJlZnNbc3ViLiRyZWZdID0gcmFuZG9tLm51bWJlcihyZWZEZXB0aE1pbiwgcmVmRGVwdGhNYXgpIC0gMTtcbiAgICAgIH1cblxuICAgICAgbGFzdFBhdGggPSByb290UGF0aDtcbiAgICAgIGxhc3RSZWYgPSBzdWIuJHJlZjtcblxuICAgICAgbGV0IHJlZjtcblxuICAgICAgaWYgKHN1Yi4kcmVmLmluZGV4T2YoJyMvJykgPT09IC0xKSB7XG4gICAgICAgIHJlZiA9IHJlZnNbc3ViLiRyZWZdIHx8IG51bGw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZWYgPSB1dGlscy5nZXRMb2NhbFJlZihzY2hlbWEsIHN1Yi4kcmVmLCBzeW5jaHJvbm91cyAmJiByZWZzKSB8fCBudWxsO1xuICAgICAgfVxuXG4gICAgICBsZXQgZml4ZWQ7XG4gICAgICBpZiAodHlwZW9mIHJlZiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgaWYgKCFyZWYgJiYgb3B0aW9uQVBJKCdpZ25vcmVNaXNzaW5nUmVmcycpICE9PSB0cnVlKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBSZWZlcmVuY2Ugbm90IGZvdW5kOiAke3N1Yi4kcmVmfWApO1xuICAgICAgICB9XG5cbiAgICAgICAgc2VlblJlZnNbc3ViLiRyZWZdIC09IDE7XG4gICAgICAgIHV0aWxzLm1lcmdlKHN1YiwgcmVmIHx8IHt9KTtcbiAgICAgICAgZml4ZWQgPSBzeW5jaHJvbm91cyAmJiByZWYgJiYgcmVmLiRyZWY7XG4gICAgICB9XG5cbiAgICAgIC8vIGp1c3QgcmVtb3ZlIHRoZSByZWZlcmVuY2VcbiAgICAgIGlmICghZml4ZWQpIGRlbGV0ZSBzdWIuJHJlZjtcbiAgICAgIHJldHVybiBzdWI7XG4gICAgfVxuXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoc3ViLmFsbE9mKSkge1xuICAgICAgY29uc3Qgc2NoZW1hcyA9IHN1Yi5hbGxPZjtcblxuICAgICAgZGVsZXRlIHN1Yi5hbGxPZjtcblxuICAgICAgLy8gdGhpcyBpcyB0aGUgb25seSBjYXNlIHdoZXJlIGFsbCBzdWItc2NoZW1hc1xuICAgICAgLy8gbXVzdCBiZSByZXNvbHZlZCBiZWZvcmUgYW55IG1lcmdlXG4gICAgICBzY2hlbWFzLmZvckVhY2goc3ViU2NoZW1hID0+IHtcbiAgICAgICAgY29uc3QgX3N1YiA9IHJlY3Vyc2l2ZVV0aWwucmVzb2x2ZVNjaGVtYShzdWJTY2hlbWEsIG51bGwsIHJvb3RQYXRoKTtcblxuICAgICAgICAvLyBjYWxsIGdpdmVuIHRodW5rcyBpZiBwcmVzZW50XG4gICAgICAgIHV0aWxzLm1lcmdlKHN1YiwgdHlwZW9mIF9zdWIudGh1bmsgPT09ICdmdW5jdGlvbidcbiAgICAgICAgICA/IF9zdWIudGh1bmsoc3ViKVxuICAgICAgICAgIDogX3N1Yik7XG5cbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoc3ViLmFsbE9mKSkge1xuICAgICAgICAgIHJlY3Vyc2l2ZVV0aWwucmVzb2x2ZVNjaGVtYShzdWIsIGluZGV4LCByb290UGF0aCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChBcnJheS5pc0FycmF5KHN1Yi5vbmVPZiB8fCBzdWIuYW55T2YpICYmIHJvb3RQYXRoW3Jvb3RQYXRoLmxlbmd0aCAtIDJdICE9PSAnZGVwZW5kZW5jaWVzJykge1xuICAgICAgY29uc3QgbWl4ID0gc3ViLm9uZU9mIHx8IHN1Yi5hbnlPZjtcblxuICAgICAgLy8gdGVzdCBldmVyeSB2YWx1ZSBmcm9tIHRoZSBlbnVtIGFnYWluc3QgZWFjaC1vbmVPZlxuICAgICAgLy8gc2NoZW1hLCBvbmx5IHZhbHVlcyB0aGF0IHZhbGlkYXRlIG9uY2UgYXJlIGtlcHRcbiAgICAgIGlmIChzdWIuZW51bSAmJiBzdWIub25lT2YpIHtcbiAgICAgICAgc3ViLmVudW0gPSBzdWIuZW51bS5maWx0ZXIoeCA9PiB1dGlscy52YWxpZGF0ZSh4LCBtaXgpKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdGh1bmsocm9vdFNjaGVtYSkge1xuICAgICAgICAgIGNvbnN0IGNvcHkgPSB1dGlscy5vbWl0UHJvcHMoc3ViLCBbJ2FueU9mJywgJ29uZU9mJ10pO1xuICAgICAgICAgIGNvbnN0IGZpeGVkID0gcmFuZG9tLnBpY2sobWl4KTtcblxuICAgICAgICAgIHV0aWxzLm1lcmdlKGNvcHksIGZpeGVkKTtcblxuICAgICAgICAgIC8vIHJlbW92ZSBhZGRpdGlvbmFsIHByb3BlcnRpZXMgZnJvbSBtZXJnZWQgc2NoZW1hc1xuICAgICAgICAgIG1peC5mb3JFYWNoKG9taXQgPT4ge1xuICAgICAgICAgICAgaWYgKG9taXQucmVxdWlyZWQgJiYgb21pdCAhPT0gZml4ZWQpIHtcbiAgICAgICAgICAgICAgb21pdC5yZXF1aXJlZC5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgaW5jbHVkZXNLZXkgPSBjb3B5LnJlcXVpcmVkICYmIGNvcHkucmVxdWlyZWQuaW5jbHVkZXMoa2V5KTtcbiAgICAgICAgICAgICAgICBpZiAoY29weS5wcm9wZXJ0aWVzICYmICFpbmNsdWRlc0tleSkge1xuICAgICAgICAgICAgICAgICAgZGVsZXRlIGNvcHkucHJvcGVydGllc1trZXldO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChyb290U2NoZW1hICYmIHJvb3RTY2hlbWEucHJvcGVydGllcykge1xuICAgICAgICAgICAgICAgICAgZGVsZXRlIHJvb3RTY2hlbWEucHJvcGVydGllc1trZXldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICByZXR1cm4gY29weTtcbiAgICAgICAgfSxcbiAgICAgIH07XG4gICAgfVxuXG4gICAgT2JqZWN0LmtleXMoc3ViKS5mb3JFYWNoKHByb3AgPT4ge1xuICAgICAgaWYgKChBcnJheS5pc0FycmF5KHN1Yltwcm9wXSkgfHwgdHlwZW9mIHN1Yltwcm9wXSA9PT0gJ29iamVjdCcpICYmICF1dGlscy5pc0tleShwcm9wKSkge1xuICAgICAgICBzdWJbcHJvcF0gPSByZWN1cnNpdmVVdGlsLnJlc29sdmVTY2hlbWEoc3ViW3Byb3BdLCBwcm9wLCByb290UGF0aC5jb25jYXQocHJvcCkpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gYXZvaWQgZXh0cmEgY2FsbHMgb24gc3ViLXNjaGVtYXMsIGZpeGVzICM0NThcbiAgICBpZiAocm9vdFBhdGgpIHtcbiAgICAgIGNvbnN0IGxhc3RQcm9wID0gcm9vdFBhdGhbcm9vdFBhdGgubGVuZ3RoIC0gMV07XG5cbiAgICAgIGlmIChsYXN0UHJvcCA9PT0gJ3Byb3BlcnRpZXMnIHx8IGxhc3RQcm9wID09PSAnaXRlbXMnKSB7XG4gICAgICAgIHJldHVybiBzdWI7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbnRhaW5lci53cmFwKHN1Yik7XG4gIH07XG5cbiAgcmV0dXJuIHJlY3Vyc2l2ZVV0aWw7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBidWlsZFJlc29sdmVTY2hlbWE7XG4iLCAiaW1wb3J0IHsgZ2V0RGVwZW5kZW5jaWVzIH0gZnJvbSAnLi4vdmVuZG9yLm1qcyc7XG5pbXBvcnQgb3B0aW9uQVBJIGZyb20gJy4uL2FwaS9vcHRpb24ubWpzJztcbmltcG9ydCB0cmF2ZXJzZSBmcm9tICcuL3RyYXZlcnNlLm1qcyc7XG5pbXBvcnQgcmFuZG9tIGZyb20gJy4vcmFuZG9tLm1qcyc7XG5pbXBvcnQgdXRpbHMgZnJvbSAnLi91dGlscy5tanMnO1xuaW1wb3J0IGJ1aWxkUmVzb2x2ZVNjaGVtYSBmcm9tICcuL2J1aWxkUmVzb2x2ZVNjaGVtYS5tanMnO1xuXG5mdW5jdGlvbiBwaWNrKGRhdGEpIHtcbiAgcmV0dXJuIEFycmF5LmlzQXJyYXkoZGF0YSlcbiAgICA/IHJhbmRvbS5waWNrKGRhdGEpXG4gICAgOiBkYXRhO1xufVxuXG5mdW5jdGlvbiBjeWNsZShkYXRhLCByZXZlcnNlKSB7XG4gIGlmICghQXJyYXkuaXNBcnJheShkYXRhKSkge1xuICAgIHJldHVybiBkYXRhO1xuICB9XG5cbiAgY29uc3QgdmFsdWUgPSByZXZlcnNlXG4gICAgPyBkYXRhLnBvcCgpXG4gICAgOiBkYXRhLnNoaWZ0KCk7XG5cbiAgaWYgKHJldmVyc2UpIHtcbiAgICBkYXRhLnVuc2hpZnQodmFsdWUpO1xuICB9IGVsc2Uge1xuICAgIGRhdGEucHVzaCh2YWx1ZSk7XG4gIH1cblxuICByZXR1cm4gdmFsdWU7XG59XG5cbmZ1bmN0aW9uIHJlc29sdmUob2JqLCBkYXRhLCB2YWx1ZXMsIHByb3BlcnR5KSB7XG4gIGlmICghb2JqIHx8IHR5cGVvZiBvYmogIT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIG9iajtcbiAgfVxuXG4gIGlmICghdmFsdWVzKSB7XG4gICAgdmFsdWVzID0ge307XG4gIH1cblxuICBpZiAoIWRhdGEpIHtcbiAgICBkYXRhID0gb2JqO1xuICB9XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xuICAgIHJldHVybiBvYmoubWFwKHggPT4gcmVzb2x2ZSh4LCBkYXRhLCB2YWx1ZXMsIHByb3BlcnR5KSk7XG4gIH1cblxuICBpZiAob2JqLmpzb25QYXRoKSB7XG4gICAgY29uc3QgeyBKU09OUGF0aCB9ID0gZ2V0RGVwZW5kZW5jaWVzKCk7XG5cbiAgICBjb25zdCBwYXJhbXMgPSB0eXBlb2Ygb2JqLmpzb25QYXRoICE9PSAnb2JqZWN0J1xuICAgICAgPyB7IHBhdGg6IG9iai5qc29uUGF0aCB9XG4gICAgICA6IG9iai5qc29uUGF0aDtcblxuICAgIHBhcmFtcy5ncm91cCA9IG9iai5ncm91cCB8fCBwYXJhbXMuZ3JvdXAgfHwgcHJvcGVydHk7XG4gICAgcGFyYW1zLmN5Y2xlID0gb2JqLmN5Y2xlIHx8IHBhcmFtcy5jeWNsZSB8fCBmYWxzZTtcbiAgICBwYXJhbXMucmV2ZXJzZSA9IG9iai5yZXZlcnNlIHx8IHBhcmFtcy5yZXZlcnNlIHx8IGZhbHNlO1xuICAgIHBhcmFtcy5jb3VudCA9IG9iai5jb3VudCB8fCBwYXJhbXMuY291bnQgfHwgMTtcblxuICAgIGNvbnN0IGtleSA9IGAke3BhcmFtcy5ncm91cH1fXyR7cGFyYW1zLnBhdGh9YDtcblxuICAgIGlmICghdmFsdWVzW2tleV0pIHtcbiAgICAgIGlmIChwYXJhbXMuY291bnQgPiAxKSB7XG4gICAgICAgIHZhbHVlc1trZXldID0gSlNPTlBhdGgocGFyYW1zLnBhdGgsIGRhdGEpLnNsaWNlKDAsIHBhcmFtcy5jb3VudCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWx1ZXNba2V5XSA9IEpTT05QYXRoKHBhcmFtcy5wYXRoLCBkYXRhKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocGFyYW1zLmN5Y2xlIHx8IHBhcmFtcy5yZXZlcnNlKSB7XG4gICAgICByZXR1cm4gY3ljbGUodmFsdWVzW2tleV0sIHBhcmFtcy5yZXZlcnNlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcGljayh2YWx1ZXNba2V5XSk7XG4gIH1cblxuICBPYmplY3Qua2V5cyhvYmopLmZvckVhY2goayA9PiB7XG4gICAgb2JqW2tdID0gcmVzb2x2ZShvYmpba10sIGRhdGEsIHZhbHVlcywgayk7XG4gIH0pO1xuXG4gIHJldHVybiBvYmo7XG59XG5cbi8vIFRPRE8gcHJvdmlkZSB0eXBlcz9cbmZ1bmN0aW9uIHJ1bihyZWZzLCBzY2hlbWEsIGNvbnRhaW5lciwgc3luY2hyb25vdXMpIHtcbiAgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChzY2hlbWEpICE9PSAnW29iamVjdCBPYmplY3RdJykge1xuICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBpbnB1dCwgZXhwZWN0aW5nIG9iamVjdCBidXQgZ2l2ZW4gJHt0eXBlb2Ygc2NoZW1hfWApO1xuICB9XG5cbiAgY29uc3QgcmVmRGVwdGhNaW4gPSBvcHRpb25BUEkoJ3JlZkRlcHRoTWluJykgfHwgMDtcbiAgY29uc3QgcmVmRGVwdGhNYXggPSBvcHRpb25BUEkoJ3JlZkRlcHRoTWF4JykgfHwgMztcblxuICB0cnkge1xuICAgIGNvbnN0IHsgcmVzb2x2ZVNjaGVtYSB9ID0gYnVpbGRSZXNvbHZlU2NoZW1hKHtcbiAgICAgIHJlZnMsXG4gICAgICBzY2hlbWEsXG4gICAgICBjb250YWluZXIsXG4gICAgICBzeW5jaHJvbm91cyxcbiAgICAgIHJlZkRlcHRoTWluLFxuICAgICAgcmVmRGVwdGhNYXgsXG4gICAgfSk7XG4gICAgY29uc3QgcmVzdWx0ID0gdHJhdmVyc2UodXRpbHMuY2xvbmUoc2NoZW1hKSwgW10sIHJlc29sdmVTY2hlbWEpO1xuXG4gICAgaWYgKG9wdGlvbkFQSSgncmVzb2x2ZUpzb25QYXRoJykpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHZhbHVlOiByZXNvbHZlKHJlc3VsdC52YWx1ZSksXG4gICAgICAgIGNvbnRleHQ6IHJlc3VsdC5jb250ZXh0LFxuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9IGNhdGNoIChlKSB7XG4gICAgaWYgKGUucGF0aCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGAke2UubWVzc2FnZX0gaW4gLyR7ZS5wYXRoLmpvaW4oJy8nKX1gKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgZTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgcnVuO1xuIiwgImZ1bmN0aW9uIHJlbmRlckpTKHJlcykge1xuICByZXR1cm4gcmVzLnZhbHVlO1xufVxuXG5leHBvcnQgZGVmYXVsdCByZW5kZXJKUztcbiIsICIndXNlIHN0cmljdCc7XG5cbmNvbnN0IENoYXIgPSB7XG4gIEFOQ0hPUjogJyYnLFxuICBDT01NRU5UOiAnIycsXG4gIFRBRzogJyEnLFxuICBESVJFQ1RJVkVTX0VORDogJy0nLFxuICBET0NVTUVOVF9FTkQ6ICcuJ1xufTtcbmNvbnN0IFR5cGUgPSB7XG4gIEFMSUFTOiAnQUxJQVMnLFxuICBCTEFOS19MSU5FOiAnQkxBTktfTElORScsXG4gIEJMT0NLX0ZPTERFRDogJ0JMT0NLX0ZPTERFRCcsXG4gIEJMT0NLX0xJVEVSQUw6ICdCTE9DS19MSVRFUkFMJyxcbiAgQ09NTUVOVDogJ0NPTU1FTlQnLFxuICBESVJFQ1RJVkU6ICdESVJFQ1RJVkUnLFxuICBET0NVTUVOVDogJ0RPQ1VNRU5UJyxcbiAgRkxPV19NQVA6ICdGTE9XX01BUCcsXG4gIEZMT1dfU0VROiAnRkxPV19TRVEnLFxuICBNQVA6ICdNQVAnLFxuICBNQVBfS0VZOiAnTUFQX0tFWScsXG4gIE1BUF9WQUxVRTogJ01BUF9WQUxVRScsXG4gIFBMQUlOOiAnUExBSU4nLFxuICBRVU9URV9ET1VCTEU6ICdRVU9URV9ET1VCTEUnLFxuICBRVU9URV9TSU5HTEU6ICdRVU9URV9TSU5HTEUnLFxuICBTRVE6ICdTRVEnLFxuICBTRVFfSVRFTTogJ1NFUV9JVEVNJ1xufTtcbmNvbnN0IGRlZmF1bHRUYWdQcmVmaXggPSAndGFnOnlhbWwub3JnLDIwMDI6JztcbmNvbnN0IGRlZmF1bHRUYWdzID0ge1xuICBNQVA6ICd0YWc6eWFtbC5vcmcsMjAwMjptYXAnLFxuICBTRVE6ICd0YWc6eWFtbC5vcmcsMjAwMjpzZXEnLFxuICBTVFI6ICd0YWc6eWFtbC5vcmcsMjAwMjpzdHInXG59O1xuXG5mdW5jdGlvbiBmaW5kTGluZVN0YXJ0cyhzcmMpIHtcbiAgY29uc3QgbHMgPSBbMF07XG4gIGxldCBvZmZzZXQgPSBzcmMuaW5kZXhPZignXFxuJyk7XG5cbiAgd2hpbGUgKG9mZnNldCAhPT0gLTEpIHtcbiAgICBvZmZzZXQgKz0gMTtcbiAgICBscy5wdXNoKG9mZnNldCk7XG4gICAgb2Zmc2V0ID0gc3JjLmluZGV4T2YoJ1xcbicsIG9mZnNldCk7XG4gIH1cblxuICByZXR1cm4gbHM7XG59XG5cbmZ1bmN0aW9uIGdldFNyY0luZm8oY3N0KSB7XG4gIGxldCBsaW5lU3RhcnRzLCBzcmM7XG5cbiAgaWYgKHR5cGVvZiBjc3QgPT09ICdzdHJpbmcnKSB7XG4gICAgbGluZVN0YXJ0cyA9IGZpbmRMaW5lU3RhcnRzKGNzdCk7XG4gICAgc3JjID0gY3N0O1xuICB9IGVsc2Uge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGNzdCkpIGNzdCA9IGNzdFswXTtcblxuICAgIGlmIChjc3QgJiYgY3N0LmNvbnRleHQpIHtcbiAgICAgIGlmICghY3N0LmxpbmVTdGFydHMpIGNzdC5saW5lU3RhcnRzID0gZmluZExpbmVTdGFydHMoY3N0LmNvbnRleHQuc3JjKTtcbiAgICAgIGxpbmVTdGFydHMgPSBjc3QubGluZVN0YXJ0cztcbiAgICAgIHNyYyA9IGNzdC5jb250ZXh0LnNyYztcbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGxpbmVTdGFydHMsXG4gICAgc3JjXG4gIH07XG59XG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IExpbmVQb3MgLSBPbmUtaW5kZXhlZCBwb3NpdGlvbiBpbiB0aGUgc291cmNlXG4gKiBAcHJvcGVydHkge251bWJlcn0gbGluZVxuICogQHByb3BlcnR5IHtudW1iZXJ9IGNvbFxuICovXG5cbi8qKlxuICogRGV0ZXJtaW5lIHRoZSBsaW5lL2NvbCBwb3NpdGlvbiBtYXRjaGluZyBhIGNoYXJhY3RlciBvZmZzZXQuXG4gKlxuICogQWNjZXB0cyBhIHNvdXJjZSBzdHJpbmcgb3IgYSBDU1QgZG9jdW1lbnQgYXMgdGhlIHNlY29uZCBwYXJhbWV0ZXIuIFdpdGhcbiAqIHRoZSBsYXR0ZXIsIHN0YXJ0aW5nIGluZGljZXMgZm9yIGxpbmVzIGFyZSBjYWNoZWQgaW4gdGhlIGRvY3VtZW50IGFzXG4gKiBgbGluZVN0YXJ0czogbnVtYmVyW11gLlxuICpcbiAqIFJldHVybnMgYSBvbmUtaW5kZXhlZCBgeyBsaW5lLCBjb2wgfWAgbG9jYXRpb24gaWYgZm91bmQsIG9yXG4gKiBgdW5kZWZpbmVkYCBvdGhlcndpc2UuXG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IG9mZnNldFxuICogQHBhcmFtIHtzdHJpbmd8RG9jdW1lbnR8RG9jdW1lbnRbXX0gY3N0XG4gKiBAcmV0dXJucyB7P0xpbmVQb3N9XG4gKi9cblxuXG5mdW5jdGlvbiBnZXRMaW5lUG9zKG9mZnNldCwgY3N0KSB7XG4gIGlmICh0eXBlb2Ygb2Zmc2V0ICE9PSAnbnVtYmVyJyB8fCBvZmZzZXQgPCAwKSByZXR1cm4gbnVsbDtcbiAgY29uc3Qge1xuICAgIGxpbmVTdGFydHMsXG4gICAgc3JjXG4gIH0gPSBnZXRTcmNJbmZvKGNzdCk7XG4gIGlmICghbGluZVN0YXJ0cyB8fCAhc3JjIHx8IG9mZnNldCA+IHNyYy5sZW5ndGgpIHJldHVybiBudWxsO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGluZVN0YXJ0cy5sZW5ndGg7ICsraSkge1xuICAgIGNvbnN0IHN0YXJ0ID0gbGluZVN0YXJ0c1tpXTtcblxuICAgIGlmIChvZmZzZXQgPCBzdGFydCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbGluZTogaSxcbiAgICAgICAgY29sOiBvZmZzZXQgLSBsaW5lU3RhcnRzW2kgLSAxXSArIDFcbiAgICAgIH07XG4gICAgfVxuXG4gICAgaWYgKG9mZnNldCA9PT0gc3RhcnQpIHJldHVybiB7XG4gICAgICBsaW5lOiBpICsgMSxcbiAgICAgIGNvbDogMVxuICAgIH07XG4gIH1cblxuICBjb25zdCBsaW5lID0gbGluZVN0YXJ0cy5sZW5ndGg7XG4gIHJldHVybiB7XG4gICAgbGluZSxcbiAgICBjb2w6IG9mZnNldCAtIGxpbmVTdGFydHNbbGluZSAtIDFdICsgMVxuICB9O1xufVxuLyoqXG4gKiBHZXQgYSBzcGVjaWZpZWQgbGluZSBmcm9tIHRoZSBzb3VyY2UuXG4gKlxuICogQWNjZXB0cyBhIHNvdXJjZSBzdHJpbmcgb3IgYSBDU1QgZG9jdW1lbnQgYXMgdGhlIHNlY29uZCBwYXJhbWV0ZXIuIFdpdGhcbiAqIHRoZSBsYXR0ZXIsIHN0YXJ0aW5nIGluZGljZXMgZm9yIGxpbmVzIGFyZSBjYWNoZWQgaW4gdGhlIGRvY3VtZW50IGFzXG4gKiBgbGluZVN0YXJ0czogbnVtYmVyW11gLlxuICpcbiAqIFJldHVybnMgdGhlIGxpbmUgYXMgYSBzdHJpbmcgaWYgZm91bmQsIG9yIGBudWxsYCBvdGhlcndpc2UuXG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IGxpbmUgT25lLWluZGV4ZWQgbGluZSBudW1iZXJcbiAqIEBwYXJhbSB7c3RyaW5nfERvY3VtZW50fERvY3VtZW50W119IGNzdFxuICogQHJldHVybnMgez9zdHJpbmd9XG4gKi9cblxuZnVuY3Rpb24gZ2V0TGluZShsaW5lLCBjc3QpIHtcbiAgY29uc3Qge1xuICAgIGxpbmVTdGFydHMsXG4gICAgc3JjXG4gIH0gPSBnZXRTcmNJbmZvKGNzdCk7XG4gIGlmICghbGluZVN0YXJ0cyB8fCAhKGxpbmUgPj0gMSkgfHwgbGluZSA+IGxpbmVTdGFydHMubGVuZ3RoKSByZXR1cm4gbnVsbDtcbiAgY29uc3Qgc3RhcnQgPSBsaW5lU3RhcnRzW2xpbmUgLSAxXTtcbiAgbGV0IGVuZCA9IGxpbmVTdGFydHNbbGluZV07IC8vIHVuZGVmaW5lZCBmb3IgbGFzdCBsaW5lOyB0aGF0J3Mgb2sgZm9yIHNsaWNlKClcblxuICB3aGlsZSAoZW5kICYmIGVuZCA+IHN0YXJ0ICYmIHNyY1tlbmQgLSAxXSA9PT0gJ1xcbicpIC0tZW5kO1xuXG4gIHJldHVybiBzcmMuc2xpY2Uoc3RhcnQsIGVuZCk7XG59XG4vKipcbiAqIFByZXR0eS1wcmludCB0aGUgc3RhcnRpbmcgbGluZSBmcm9tIHRoZSBzb3VyY2UgaW5kaWNhdGVkIGJ5IHRoZSByYW5nZSBgcG9zYFxuICpcbiAqIFRyaW1zIG91dHB1dCB0byBgbWF4V2lkdGhgIGNoYXJzIHdoaWxlIGtlZXBpbmcgdGhlIHN0YXJ0aW5nIGNvbHVtbiB2aXNpYmxlLFxuICogdXNpbmcgYFx1MjAyNmAgYXQgZWl0aGVyIGVuZCB0byBpbmRpY2F0ZSBkcm9wcGVkIGNoYXJhY3RlcnMuXG4gKlxuICogUmV0dXJucyBhIHR3by1saW5lIHN0cmluZyAob3IgYG51bGxgKSB3aXRoIGBcXG5gIGFzIHNlcGFyYXRvcjsgdGhlIHNlY29uZCBsaW5lXG4gKiB3aWxsIGhvbGQgYXBwcm9wcmlhdGVseSBpbmRlbnRlZCBgXmAgbWFya3MgaW5kaWNhdGluZyB0aGUgY29sdW1uIHJhbmdlLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBwb3NcbiAqIEBwYXJhbSB7TGluZVBvc30gcG9zLnN0YXJ0XG4gKiBAcGFyYW0ge0xpbmVQb3N9IFtwb3MuZW5kXVxuICogQHBhcmFtIHtzdHJpbmd8RG9jdW1lbnR8RG9jdW1lbnRbXSp9IGNzdFxuICogQHBhcmFtIHtudW1iZXJ9IFttYXhXaWR0aD04MF1cbiAqIEByZXR1cm5zIHs/c3RyaW5nfVxuICovXG5cbmZ1bmN0aW9uIGdldFByZXR0eUNvbnRleHQoe1xuICBzdGFydCxcbiAgZW5kXG59LCBjc3QsIG1heFdpZHRoID0gODApIHtcbiAgbGV0IHNyYyA9IGdldExpbmUoc3RhcnQubGluZSwgY3N0KTtcbiAgaWYgKCFzcmMpIHJldHVybiBudWxsO1xuICBsZXQge1xuICAgIGNvbFxuICB9ID0gc3RhcnQ7XG5cbiAgaWYgKHNyYy5sZW5ndGggPiBtYXhXaWR0aCkge1xuICAgIGlmIChjb2wgPD0gbWF4V2lkdGggLSAxMCkge1xuICAgICAgc3JjID0gc3JjLnN1YnN0cigwLCBtYXhXaWR0aCAtIDEpICsgJ1x1MjAyNic7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGhhbGZXaWR0aCA9IE1hdGgucm91bmQobWF4V2lkdGggLyAyKTtcbiAgICAgIGlmIChzcmMubGVuZ3RoID4gY29sICsgaGFsZldpZHRoKSBzcmMgPSBzcmMuc3Vic3RyKDAsIGNvbCArIGhhbGZXaWR0aCAtIDEpICsgJ1x1MjAyNic7XG4gICAgICBjb2wgLT0gc3JjLmxlbmd0aCAtIG1heFdpZHRoO1xuICAgICAgc3JjID0gJ1x1MjAyNicgKyBzcmMuc3Vic3RyKDEgLSBtYXhXaWR0aCk7XG4gICAgfVxuICB9XG5cbiAgbGV0IGVyckxlbiA9IDE7XG4gIGxldCBlcnJFbmQgPSAnJztcblxuICBpZiAoZW5kKSB7XG4gICAgaWYgKGVuZC5saW5lID09PSBzdGFydC5saW5lICYmIGNvbCArIChlbmQuY29sIC0gc3RhcnQuY29sKSA8PSBtYXhXaWR0aCArIDEpIHtcbiAgICAgIGVyckxlbiA9IGVuZC5jb2wgLSBzdGFydC5jb2w7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVyckxlbiA9IE1hdGgubWluKHNyYy5sZW5ndGggKyAxLCBtYXhXaWR0aCkgLSBjb2w7XG4gICAgICBlcnJFbmQgPSAnXHUyMDI2JztcbiAgICB9XG4gIH1cblxuICBjb25zdCBvZmZzZXQgPSBjb2wgPiAxID8gJyAnLnJlcGVhdChjb2wgLSAxKSA6ICcnO1xuICBjb25zdCBlcnIgPSAnXicucmVwZWF0KGVyckxlbik7XG4gIHJldHVybiBgJHtzcmN9XFxuJHtvZmZzZXR9JHtlcnJ9JHtlcnJFbmR9YDtcbn1cblxuY2xhc3MgUmFuZ2Uge1xuICBzdGF0aWMgY29weShvcmlnKSB7XG4gICAgcmV0dXJuIG5ldyBSYW5nZShvcmlnLnN0YXJ0LCBvcmlnLmVuZCk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihzdGFydCwgZW5kKSB7XG4gICAgdGhpcy5zdGFydCA9IHN0YXJ0O1xuICAgIHRoaXMuZW5kID0gZW5kIHx8IHN0YXJ0O1xuICB9XG5cbiAgaXNFbXB0eSgpIHtcbiAgICByZXR1cm4gdHlwZW9mIHRoaXMuc3RhcnQgIT09ICdudW1iZXInIHx8ICF0aGlzLmVuZCB8fCB0aGlzLmVuZCA8PSB0aGlzLnN0YXJ0O1xuICB9XG4gIC8qKlxuICAgKiBTZXQgYG9yaWdTdGFydGAgYW5kIGBvcmlnRW5kYCB0byBwb2ludCB0byB0aGUgb3JpZ2luYWwgc291cmNlIHJhbmdlIGZvclxuICAgKiB0aGlzIG5vZGUsIHdoaWNoIG1heSBkaWZmZXIgZHVlIHRvIGRyb3BwZWQgQ1IgY2hhcmFjdGVycy5cbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJbXX0gY3IgLSBQb3NpdGlvbnMgb2YgZHJvcHBlZCBDUiBjaGFyYWN0ZXJzXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBvZmZzZXQgLSBTdGFydGluZyBpbmRleCBvZiBgY3JgIGZyb20gdGhlIGxhc3QgY2FsbFxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSAtIFRoZSBuZXh0IG9mZnNldCwgbWF0Y2hpbmcgdGhlIG9uZSBmb3VuZCBmb3IgYG9yaWdTdGFydGBcbiAgICovXG5cblxuICBzZXRPcmlnUmFuZ2UoY3IsIG9mZnNldCkge1xuICAgIGNvbnN0IHtcbiAgICAgIHN0YXJ0LFxuICAgICAgZW5kXG4gICAgfSA9IHRoaXM7XG5cbiAgICBpZiAoY3IubGVuZ3RoID09PSAwIHx8IGVuZCA8PSBjclswXSkge1xuICAgICAgdGhpcy5vcmlnU3RhcnQgPSBzdGFydDtcbiAgICAgIHRoaXMub3JpZ0VuZCA9IGVuZDtcbiAgICAgIHJldHVybiBvZmZzZXQ7XG4gICAgfVxuXG4gICAgbGV0IGkgPSBvZmZzZXQ7XG5cbiAgICB3aGlsZSAoaSA8IGNyLmxlbmd0aCkge1xuICAgICAgaWYgKGNyW2ldID4gc3RhcnQpIGJyZWFrO2Vsc2UgKytpO1xuICAgIH1cblxuICAgIHRoaXMub3JpZ1N0YXJ0ID0gc3RhcnQgKyBpO1xuICAgIGNvbnN0IG5leHRPZmZzZXQgPSBpO1xuXG4gICAgd2hpbGUgKGkgPCBjci5sZW5ndGgpIHtcbiAgICAgIC8vIGlmIGVuZCB3YXMgYXQgXFxuLCBpdCBzaG91bGQgbm93IGJlIGF0IFxcclxuICAgICAgaWYgKGNyW2ldID49IGVuZCkgYnJlYWs7ZWxzZSArK2k7XG4gICAgfVxuXG4gICAgdGhpcy5vcmlnRW5kID0gZW5kICsgaTtcbiAgICByZXR1cm4gbmV4dE9mZnNldDtcbiAgfVxuXG59XG5cbi8qKiBSb290IGNsYXNzIG9mIGFsbCBub2RlcyAqL1xuXG5jbGFzcyBOb2RlIHtcbiAgc3RhdGljIGFkZFN0cmluZ1Rlcm1pbmF0b3Ioc3JjLCBvZmZzZXQsIHN0cikge1xuICAgIGlmIChzdHJbc3RyLmxlbmd0aCAtIDFdID09PSAnXFxuJykgcmV0dXJuIHN0cjtcbiAgICBjb25zdCBuZXh0ID0gTm9kZS5lbmRPZldoaXRlU3BhY2Uoc3JjLCBvZmZzZXQpO1xuICAgIHJldHVybiBuZXh0ID49IHNyYy5sZW5ndGggfHwgc3JjW25leHRdID09PSAnXFxuJyA/IHN0ciArICdcXG4nIDogc3RyO1xuICB9IC8vIF4oLS0tfC4uLilcblxuXG4gIHN0YXRpYyBhdERvY3VtZW50Qm91bmRhcnkoc3JjLCBvZmZzZXQsIHNlcCkge1xuICAgIGNvbnN0IGNoMCA9IHNyY1tvZmZzZXRdO1xuICAgIGlmICghY2gwKSByZXR1cm4gdHJ1ZTtcbiAgICBjb25zdCBwcmV2ID0gc3JjW29mZnNldCAtIDFdO1xuICAgIGlmIChwcmV2ICYmIHByZXYgIT09ICdcXG4nKSByZXR1cm4gZmFsc2U7XG5cbiAgICBpZiAoc2VwKSB7XG4gICAgICBpZiAoY2gwICE9PSBzZXApIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGNoMCAhPT0gQ2hhci5ESVJFQ1RJVkVTX0VORCAmJiBjaDAgIT09IENoYXIuRE9DVU1FTlRfRU5EKSByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgY2gxID0gc3JjW29mZnNldCArIDFdO1xuICAgIGNvbnN0IGNoMiA9IHNyY1tvZmZzZXQgKyAyXTtcbiAgICBpZiAoY2gxICE9PSBjaDAgfHwgY2gyICE9PSBjaDApIHJldHVybiBmYWxzZTtcbiAgICBjb25zdCBjaDMgPSBzcmNbb2Zmc2V0ICsgM107XG4gICAgcmV0dXJuICFjaDMgfHwgY2gzID09PSAnXFxuJyB8fCBjaDMgPT09ICdcXHQnIHx8IGNoMyA9PT0gJyAnO1xuICB9XG5cbiAgc3RhdGljIGVuZE9mSWRlbnRpZmllcihzcmMsIG9mZnNldCkge1xuICAgIGxldCBjaCA9IHNyY1tvZmZzZXRdO1xuICAgIGNvbnN0IGlzVmVyYmF0aW0gPSBjaCA9PT0gJzwnO1xuICAgIGNvbnN0IG5vdE9rID0gaXNWZXJiYXRpbSA/IFsnXFxuJywgJ1xcdCcsICcgJywgJz4nXSA6IFsnXFxuJywgJ1xcdCcsICcgJywgJ1snLCAnXScsICd7JywgJ30nLCAnLCddO1xuXG4gICAgd2hpbGUgKGNoICYmIG5vdE9rLmluZGV4T2YoY2gpID09PSAtMSkgY2ggPSBzcmNbb2Zmc2V0ICs9IDFdO1xuXG4gICAgaWYgKGlzVmVyYmF0aW0gJiYgY2ggPT09ICc+Jykgb2Zmc2V0ICs9IDE7XG4gICAgcmV0dXJuIG9mZnNldDtcbiAgfVxuXG4gIHN0YXRpYyBlbmRPZkluZGVudChzcmMsIG9mZnNldCkge1xuICAgIGxldCBjaCA9IHNyY1tvZmZzZXRdO1xuXG4gICAgd2hpbGUgKGNoID09PSAnICcpIGNoID0gc3JjW29mZnNldCArPSAxXTtcblxuICAgIHJldHVybiBvZmZzZXQ7XG4gIH1cblxuICBzdGF0aWMgZW5kT2ZMaW5lKHNyYywgb2Zmc2V0KSB7XG4gICAgbGV0IGNoID0gc3JjW29mZnNldF07XG5cbiAgICB3aGlsZSAoY2ggJiYgY2ggIT09ICdcXG4nKSBjaCA9IHNyY1tvZmZzZXQgKz0gMV07XG5cbiAgICByZXR1cm4gb2Zmc2V0O1xuICB9XG5cbiAgc3RhdGljIGVuZE9mV2hpdGVTcGFjZShzcmMsIG9mZnNldCkge1xuICAgIGxldCBjaCA9IHNyY1tvZmZzZXRdO1xuXG4gICAgd2hpbGUgKGNoID09PSAnXFx0JyB8fCBjaCA9PT0gJyAnKSBjaCA9IHNyY1tvZmZzZXQgKz0gMV07XG5cbiAgICByZXR1cm4gb2Zmc2V0O1xuICB9XG5cbiAgc3RhdGljIHN0YXJ0T2ZMaW5lKHNyYywgb2Zmc2V0KSB7XG4gICAgbGV0IGNoID0gc3JjW29mZnNldCAtIDFdO1xuICAgIGlmIChjaCA9PT0gJ1xcbicpIHJldHVybiBvZmZzZXQ7XG5cbiAgICB3aGlsZSAoY2ggJiYgY2ggIT09ICdcXG4nKSBjaCA9IHNyY1tvZmZzZXQgLT0gMV07XG5cbiAgICByZXR1cm4gb2Zmc2V0ICsgMTtcbiAgfVxuICAvKipcbiAgICogRW5kIG9mIGluZGVudGF0aW9uLCBvciBudWxsIGlmIHRoZSBsaW5lJ3MgaW5kZW50IGxldmVsIGlzIG5vdCBtb3JlXG4gICAqIHRoYW4gYGluZGVudGBcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHNyY1xuICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZW50XG4gICAqIEBwYXJhbSB7bnVtYmVyfSBsaW5lU3RhcnRcbiAgICogQHJldHVybnMgez9udW1iZXJ9XG4gICAqL1xuXG5cbiAgc3RhdGljIGVuZE9mQmxvY2tJbmRlbnQoc3JjLCBpbmRlbnQsIGxpbmVTdGFydCkge1xuICAgIGNvbnN0IGluRW5kID0gTm9kZS5lbmRPZkluZGVudChzcmMsIGxpbmVTdGFydCk7XG5cbiAgICBpZiAoaW5FbmQgPiBsaW5lU3RhcnQgKyBpbmRlbnQpIHtcbiAgICAgIHJldHVybiBpbkVuZDtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3Qgd3NFbmQgPSBOb2RlLmVuZE9mV2hpdGVTcGFjZShzcmMsIGluRW5kKTtcbiAgICAgIGNvbnN0IGNoID0gc3JjW3dzRW5kXTtcbiAgICAgIGlmICghY2ggfHwgY2ggPT09ICdcXG4nKSByZXR1cm4gd3NFbmQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBzdGF0aWMgYXRCbGFuayhzcmMsIG9mZnNldCwgZW5kQXNCbGFuaykge1xuICAgIGNvbnN0IGNoID0gc3JjW29mZnNldF07XG4gICAgcmV0dXJuIGNoID09PSAnXFxuJyB8fCBjaCA9PT0gJ1xcdCcgfHwgY2ggPT09ICcgJyB8fCBlbmRBc0JsYW5rICYmICFjaDtcbiAgfVxuXG4gIHN0YXRpYyBuZXh0Tm9kZUlzSW5kZW50ZWQoY2gsIGluZGVudERpZmYsIGluZGljYXRvckFzSW5kZW50KSB7XG4gICAgaWYgKCFjaCB8fCBpbmRlbnREaWZmIDwgMCkgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChpbmRlbnREaWZmID4gMCkgcmV0dXJuIHRydWU7XG4gICAgcmV0dXJuIGluZGljYXRvckFzSW5kZW50ICYmIGNoID09PSAnLSc7XG4gIH0gLy8gc2hvdWxkIGJlIGF0IGxpbmUgb3Igc3RyaW5nIGVuZCwgb3IgYXQgbmV4dCBub24td2hpdGVzcGFjZSBjaGFyXG5cblxuICBzdGF0aWMgbm9ybWFsaXplT2Zmc2V0KHNyYywgb2Zmc2V0KSB7XG4gICAgY29uc3QgY2ggPSBzcmNbb2Zmc2V0XTtcbiAgICByZXR1cm4gIWNoID8gb2Zmc2V0IDogY2ggIT09ICdcXG4nICYmIHNyY1tvZmZzZXQgLSAxXSA9PT0gJ1xcbicgPyBvZmZzZXQgLSAxIDogTm9kZS5lbmRPZldoaXRlU3BhY2Uoc3JjLCBvZmZzZXQpO1xuICB9IC8vIGZvbGQgc2luZ2xlIG5ld2xpbmUgaW50byBzcGFjZSwgbXVsdGlwbGUgbmV3bGluZXMgdG8gTiAtIDEgbmV3bGluZXNcbiAgLy8gcHJlc3VtZXMgc3JjW29mZnNldF0gPT09ICdcXG4nXG5cblxuICBzdGF0aWMgZm9sZE5ld2xpbmUoc3JjLCBvZmZzZXQsIGluZGVudCkge1xuICAgIGxldCBpbkNvdW50ID0gMDtcbiAgICBsZXQgZXJyb3IgPSBmYWxzZTtcbiAgICBsZXQgZm9sZCA9ICcnO1xuICAgIGxldCBjaCA9IHNyY1tvZmZzZXQgKyAxXTtcblxuICAgIHdoaWxlIChjaCA9PT0gJyAnIHx8IGNoID09PSAnXFx0JyB8fCBjaCA9PT0gJ1xcbicpIHtcbiAgICAgIHN3aXRjaCAoY2gpIHtcbiAgICAgICAgY2FzZSAnXFxuJzpcbiAgICAgICAgICBpbkNvdW50ID0gMDtcbiAgICAgICAgICBvZmZzZXQgKz0gMTtcbiAgICAgICAgICBmb2xkICs9ICdcXG4nO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ1xcdCc6XG4gICAgICAgICAgaWYgKGluQ291bnQgPD0gaW5kZW50KSBlcnJvciA9IHRydWU7XG4gICAgICAgICAgb2Zmc2V0ID0gTm9kZS5lbmRPZldoaXRlU3BhY2Uoc3JjLCBvZmZzZXQgKyAyKSAtIDE7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnICc6XG4gICAgICAgICAgaW5Db3VudCArPSAxO1xuICAgICAgICAgIG9mZnNldCArPSAxO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBjaCA9IHNyY1tvZmZzZXQgKyAxXTtcbiAgICB9XG5cbiAgICBpZiAoIWZvbGQpIGZvbGQgPSAnICc7XG4gICAgaWYgKGNoICYmIGluQ291bnQgPD0gaW5kZW50KSBlcnJvciA9IHRydWU7XG4gICAgcmV0dXJuIHtcbiAgICAgIGZvbGQsXG4gICAgICBvZmZzZXQsXG4gICAgICBlcnJvclxuICAgIH07XG4gIH1cblxuICBjb25zdHJ1Y3Rvcih0eXBlLCBwcm9wcywgY29udGV4dCkge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnY29udGV4dCcsIHtcbiAgICAgIHZhbHVlOiBjb250ZXh0IHx8IG51bGwsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIHRoaXMuZXJyb3IgPSBudWxsO1xuICAgIHRoaXMucmFuZ2UgPSBudWxsO1xuICAgIHRoaXMudmFsdWVSYW5nZSA9IG51bGw7XG4gICAgdGhpcy5wcm9wcyA9IHByb3BzIHx8IFtdO1xuICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgdGhpcy52YWx1ZSA9IG51bGw7XG4gIH1cblxuICBnZXRQcm9wVmFsdWUoaWR4LCBrZXksIHNraXBLZXkpIHtcbiAgICBpZiAoIXRoaXMuY29udGV4dCkgcmV0dXJuIG51bGw7XG4gICAgY29uc3Qge1xuICAgICAgc3JjXG4gICAgfSA9IHRoaXMuY29udGV4dDtcbiAgICBjb25zdCBwcm9wID0gdGhpcy5wcm9wc1tpZHhdO1xuICAgIHJldHVybiBwcm9wICYmIHNyY1twcm9wLnN0YXJ0XSA9PT0ga2V5ID8gc3JjLnNsaWNlKHByb3Auc3RhcnQgKyAoc2tpcEtleSA/IDEgOiAwKSwgcHJvcC5lbmQpIDogbnVsbDtcbiAgfVxuXG4gIGdldCBhbmNob3IoKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnByb3BzLmxlbmd0aDsgKytpKSB7XG4gICAgICBjb25zdCBhbmNob3IgPSB0aGlzLmdldFByb3BWYWx1ZShpLCBDaGFyLkFOQ0hPUiwgdHJ1ZSk7XG4gICAgICBpZiAoYW5jaG9yICE9IG51bGwpIHJldHVybiBhbmNob3I7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBnZXQgY29tbWVudCgpIHtcbiAgICBjb25zdCBjb21tZW50cyA9IFtdO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnByb3BzLmxlbmd0aDsgKytpKSB7XG4gICAgICBjb25zdCBjb21tZW50ID0gdGhpcy5nZXRQcm9wVmFsdWUoaSwgQ2hhci5DT01NRU5ULCB0cnVlKTtcbiAgICAgIGlmIChjb21tZW50ICE9IG51bGwpIGNvbW1lbnRzLnB1c2goY29tbWVudCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbW1lbnRzLmxlbmd0aCA+IDAgPyBjb21tZW50cy5qb2luKCdcXG4nKSA6IG51bGw7XG4gIH1cblxuICBjb21tZW50SGFzUmVxdWlyZWRXaGl0ZXNwYWNlKHN0YXJ0KSB7XG4gICAgY29uc3Qge1xuICAgICAgc3JjXG4gICAgfSA9IHRoaXMuY29udGV4dDtcbiAgICBpZiAodGhpcy5oZWFkZXIgJiYgc3RhcnQgPT09IHRoaXMuaGVhZGVyLmVuZCkgcmV0dXJuIGZhbHNlO1xuICAgIGlmICghdGhpcy52YWx1ZVJhbmdlKSByZXR1cm4gZmFsc2U7XG4gICAgY29uc3Qge1xuICAgICAgZW5kXG4gICAgfSA9IHRoaXMudmFsdWVSYW5nZTtcbiAgICByZXR1cm4gc3RhcnQgIT09IGVuZCB8fCBOb2RlLmF0Qmxhbmsoc3JjLCBlbmQgLSAxKTtcbiAgfVxuXG4gIGdldCBoYXNDb21tZW50KCkge1xuICAgIGlmICh0aGlzLmNvbnRleHQpIHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgc3JjXG4gICAgICB9ID0gdGhpcy5jb250ZXh0O1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucHJvcHMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYgKHNyY1t0aGlzLnByb3BzW2ldLnN0YXJ0XSA9PT0gQ2hhci5DT01NRU5UKSByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBnZXQgaGFzUHJvcHMoKSB7XG4gICAgaWYgKHRoaXMuY29udGV4dCkge1xuICAgICAgY29uc3Qge1xuICAgICAgICBzcmNcbiAgICAgIH0gPSB0aGlzLmNvbnRleHQ7XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5wcm9wcy5sZW5ndGg7ICsraSkge1xuICAgICAgICBpZiAoc3JjW3RoaXMucHJvcHNbaV0uc3RhcnRdICE9PSBDaGFyLkNPTU1FTlQpIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGdldCBpbmNsdWRlc1RyYWlsaW5nTGluZXMoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZ2V0IGpzb25MaWtlKCkge1xuICAgIGNvbnN0IGpzb25MaWtlVHlwZXMgPSBbVHlwZS5GTE9XX01BUCwgVHlwZS5GTE9XX1NFUSwgVHlwZS5RVU9URV9ET1VCTEUsIFR5cGUuUVVPVEVfU0lOR0xFXTtcbiAgICByZXR1cm4ganNvbkxpa2VUeXBlcy5pbmRleE9mKHRoaXMudHlwZSkgIT09IC0xO1xuICB9XG5cbiAgZ2V0IHJhbmdlQXNMaW5lUG9zKCkge1xuICAgIGlmICghdGhpcy5yYW5nZSB8fCAhdGhpcy5jb250ZXh0KSByZXR1cm4gdW5kZWZpbmVkO1xuICAgIGNvbnN0IHN0YXJ0ID0gZ2V0TGluZVBvcyh0aGlzLnJhbmdlLnN0YXJ0LCB0aGlzLmNvbnRleHQucm9vdCk7XG4gICAgaWYgKCFzdGFydCkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICBjb25zdCBlbmQgPSBnZXRMaW5lUG9zKHRoaXMucmFuZ2UuZW5kLCB0aGlzLmNvbnRleHQucm9vdCk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXJ0LFxuICAgICAgZW5kXG4gICAgfTtcbiAgfVxuXG4gIGdldCByYXdWYWx1ZSgpIHtcbiAgICBpZiAoIXRoaXMudmFsdWVSYW5nZSB8fCAhdGhpcy5jb250ZXh0KSByZXR1cm4gbnVsbDtcbiAgICBjb25zdCB7XG4gICAgICBzdGFydCxcbiAgICAgIGVuZFxuICAgIH0gPSB0aGlzLnZhbHVlUmFuZ2U7XG4gICAgcmV0dXJuIHRoaXMuY29udGV4dC5zcmMuc2xpY2Uoc3RhcnQsIGVuZCk7XG4gIH1cblxuICBnZXQgdGFnKCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5wcm9wcy5sZW5ndGg7ICsraSkge1xuICAgICAgY29uc3QgdGFnID0gdGhpcy5nZXRQcm9wVmFsdWUoaSwgQ2hhci5UQUcsIGZhbHNlKTtcblxuICAgICAgaWYgKHRhZyAhPSBudWxsKSB7XG4gICAgICAgIGlmICh0YWdbMV0gPT09ICc8Jykge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2ZXJiYXRpbTogdGFnLnNsaWNlKDIsIC0xKVxuICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gICAgICAgICAgY29uc3QgW18sIGhhbmRsZSwgc3VmZml4XSA9IHRhZy5tYXRjaCgvXiguKiEpKFteIV0qKSQvKTtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaGFuZGxlLFxuICAgICAgICAgICAgc3VmZml4XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgZ2V0IHZhbHVlUmFuZ2VDb250YWluc05ld2xpbmUoKSB7XG4gICAgaWYgKCF0aGlzLnZhbHVlUmFuZ2UgfHwgIXRoaXMuY29udGV4dCkgcmV0dXJuIGZhbHNlO1xuICAgIGNvbnN0IHtcbiAgICAgIHN0YXJ0LFxuICAgICAgZW5kXG4gICAgfSA9IHRoaXMudmFsdWVSYW5nZTtcbiAgICBjb25zdCB7XG4gICAgICBzcmNcbiAgICB9ID0gdGhpcy5jb250ZXh0O1xuXG4gICAgZm9yIChsZXQgaSA9IHN0YXJ0OyBpIDwgZW5kOyArK2kpIHtcbiAgICAgIGlmIChzcmNbaV0gPT09ICdcXG4nKSByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBwYXJzZUNvbW1lbnQoc3RhcnQpIHtcbiAgICBjb25zdCB7XG4gICAgICBzcmNcbiAgICB9ID0gdGhpcy5jb250ZXh0O1xuXG4gICAgaWYgKHNyY1tzdGFydF0gPT09IENoYXIuQ09NTUVOVCkge1xuICAgICAgY29uc3QgZW5kID0gTm9kZS5lbmRPZkxpbmUoc3JjLCBzdGFydCArIDEpO1xuICAgICAgY29uc3QgY29tbWVudFJhbmdlID0gbmV3IFJhbmdlKHN0YXJ0LCBlbmQpO1xuICAgICAgdGhpcy5wcm9wcy5wdXNoKGNvbW1lbnRSYW5nZSk7XG4gICAgICByZXR1cm4gZW5kO1xuICAgIH1cblxuICAgIHJldHVybiBzdGFydDtcbiAgfVxuICAvKipcbiAgICogUG9wdWxhdGVzIHRoZSBgb3JpZ1N0YXJ0YCBhbmQgYG9yaWdFbmRgIHZhbHVlcyBvZiBhbGwgcmFuZ2VzIGZvciB0aGlzXG4gICAqIG5vZGUuIEV4dGVuZGVkIGJ5IGNoaWxkIGNsYXNzZXMgdG8gaGFuZGxlIGRlc2NlbmRhbnQgbm9kZXMuXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyW119IGNyIC0gUG9zaXRpb25zIG9mIGRyb3BwZWQgQ1IgY2hhcmFjdGVyc1xuICAgKiBAcGFyYW0ge251bWJlcn0gb2Zmc2V0IC0gU3RhcnRpbmcgaW5kZXggb2YgYGNyYCBmcm9tIHRoZSBsYXN0IGNhbGxcbiAgICogQHJldHVybnMge251bWJlcn0gLSBUaGUgbmV4dCBvZmZzZXQsIG1hdGNoaW5nIHRoZSBvbmUgZm91bmQgZm9yIGBvcmlnU3RhcnRgXG4gICAqL1xuXG5cbiAgc2V0T3JpZ1Jhbmdlcyhjciwgb2Zmc2V0KSB7XG4gICAgaWYgKHRoaXMucmFuZ2UpIG9mZnNldCA9IHRoaXMucmFuZ2Uuc2V0T3JpZ1JhbmdlKGNyLCBvZmZzZXQpO1xuICAgIGlmICh0aGlzLnZhbHVlUmFuZ2UpIHRoaXMudmFsdWVSYW5nZS5zZXRPcmlnUmFuZ2UoY3IsIG9mZnNldCk7XG4gICAgdGhpcy5wcm9wcy5mb3JFYWNoKHByb3AgPT4gcHJvcC5zZXRPcmlnUmFuZ2UoY3IsIG9mZnNldCkpO1xuICAgIHJldHVybiBvZmZzZXQ7XG4gIH1cblxuICB0b1N0cmluZygpIHtcbiAgICBjb25zdCB7XG4gICAgICBjb250ZXh0OiB7XG4gICAgICAgIHNyY1xuICAgICAgfSxcbiAgICAgIHJhbmdlLFxuICAgICAgdmFsdWVcbiAgICB9ID0gdGhpcztcbiAgICBpZiAodmFsdWUgIT0gbnVsbCkgcmV0dXJuIHZhbHVlO1xuICAgIGNvbnN0IHN0ciA9IHNyYy5zbGljZShyYW5nZS5zdGFydCwgcmFuZ2UuZW5kKTtcbiAgICByZXR1cm4gTm9kZS5hZGRTdHJpbmdUZXJtaW5hdG9yKHNyYywgcmFuZ2UuZW5kLCBzdHIpO1xuICB9XG5cbn1cblxuY2xhc3MgWUFNTEVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICBjb25zdHJ1Y3RvcihuYW1lLCBzb3VyY2UsIG1lc3NhZ2UpIHtcbiAgICBpZiAoIW1lc3NhZ2UgfHwgIShzb3VyY2UgaW5zdGFuY2VvZiBOb2RlKSkgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGFyZ3VtZW50cyBmb3IgbmV3ICR7bmFtZX1gKTtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgICB0aGlzLnNvdXJjZSA9IHNvdXJjZTtcbiAgfVxuXG4gIG1ha2VQcmV0dHkoKSB7XG4gICAgaWYgKCF0aGlzLnNvdXJjZSkgcmV0dXJuO1xuICAgIHRoaXMubm9kZVR5cGUgPSB0aGlzLnNvdXJjZS50eXBlO1xuICAgIGNvbnN0IGNzdCA9IHRoaXMuc291cmNlLmNvbnRleHQgJiYgdGhpcy5zb3VyY2UuY29udGV4dC5yb290O1xuXG4gICAgaWYgKHR5cGVvZiB0aGlzLm9mZnNldCA9PT0gJ251bWJlcicpIHtcbiAgICAgIHRoaXMucmFuZ2UgPSBuZXcgUmFuZ2UodGhpcy5vZmZzZXQsIHRoaXMub2Zmc2V0ICsgMSk7XG4gICAgICBjb25zdCBzdGFydCA9IGNzdCAmJiBnZXRMaW5lUG9zKHRoaXMub2Zmc2V0LCBjc3QpO1xuXG4gICAgICBpZiAoc3RhcnQpIHtcbiAgICAgICAgY29uc3QgZW5kID0ge1xuICAgICAgICAgIGxpbmU6IHN0YXJ0LmxpbmUsXG4gICAgICAgICAgY29sOiBzdGFydC5jb2wgKyAxXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMubGluZVBvcyA9IHtcbiAgICAgICAgICBzdGFydCxcbiAgICAgICAgICBlbmRcbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgZGVsZXRlIHRoaXMub2Zmc2V0O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJhbmdlID0gdGhpcy5zb3VyY2UucmFuZ2U7XG4gICAgICB0aGlzLmxpbmVQb3MgPSB0aGlzLnNvdXJjZS5yYW5nZUFzTGluZVBvcztcbiAgICB9XG5cbiAgICBpZiAodGhpcy5saW5lUG9zKSB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIGxpbmUsXG4gICAgICAgIGNvbFxuICAgICAgfSA9IHRoaXMubGluZVBvcy5zdGFydDtcbiAgICAgIHRoaXMubWVzc2FnZSArPSBgIGF0IGxpbmUgJHtsaW5lfSwgY29sdW1uICR7Y29sfWA7XG4gICAgICBjb25zdCBjdHggPSBjc3QgJiYgZ2V0UHJldHR5Q29udGV4dCh0aGlzLmxpbmVQb3MsIGNzdCk7XG4gICAgICBpZiAoY3R4KSB0aGlzLm1lc3NhZ2UgKz0gYDpcXG5cXG4ke2N0eH1cXG5gO1xuICAgIH1cblxuICAgIGRlbGV0ZSB0aGlzLnNvdXJjZTtcbiAgfVxuXG59XG5jbGFzcyBZQU1MUmVmZXJlbmNlRXJyb3IgZXh0ZW5kcyBZQU1MRXJyb3Ige1xuICBjb25zdHJ1Y3Rvcihzb3VyY2UsIG1lc3NhZ2UpIHtcbiAgICBzdXBlcignWUFNTFJlZmVyZW5jZUVycm9yJywgc291cmNlLCBtZXNzYWdlKTtcbiAgfVxuXG59XG5jbGFzcyBZQU1MU2VtYW50aWNFcnJvciBleHRlbmRzIFlBTUxFcnJvciB7XG4gIGNvbnN0cnVjdG9yKHNvdXJjZSwgbWVzc2FnZSkge1xuICAgIHN1cGVyKCdZQU1MU2VtYW50aWNFcnJvcicsIHNvdXJjZSwgbWVzc2FnZSk7XG4gIH1cblxufVxuY2xhc3MgWUFNTFN5bnRheEVycm9yIGV4dGVuZHMgWUFNTEVycm9yIHtcbiAgY29uc3RydWN0b3Ioc291cmNlLCBtZXNzYWdlKSB7XG4gICAgc3VwZXIoJ1lBTUxTeW50YXhFcnJvcicsIHNvdXJjZSwgbWVzc2FnZSk7XG4gIH1cblxufVxuY2xhc3MgWUFNTFdhcm5pbmcgZXh0ZW5kcyBZQU1MRXJyb3Ige1xuICBjb25zdHJ1Y3Rvcihzb3VyY2UsIG1lc3NhZ2UpIHtcbiAgICBzdXBlcignWUFNTFdhcm5pbmcnLCBzb3VyY2UsIG1lc3NhZ2UpO1xuICB9XG5cbn1cblxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkge1xuICBpZiAoa2V5IGluIG9iaikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiBvYmo7XG59XG5cbmNsYXNzIFBsYWluVmFsdWUgZXh0ZW5kcyBOb2RlIHtcbiAgc3RhdGljIGVuZE9mTGluZShzcmMsIHN0YXJ0LCBpbkZsb3cpIHtcbiAgICBsZXQgY2ggPSBzcmNbc3RhcnRdO1xuICAgIGxldCBvZmZzZXQgPSBzdGFydDtcblxuICAgIHdoaWxlIChjaCAmJiBjaCAhPT0gJ1xcbicpIHtcbiAgICAgIGlmIChpbkZsb3cgJiYgKGNoID09PSAnWycgfHwgY2ggPT09ICddJyB8fCBjaCA9PT0gJ3snIHx8IGNoID09PSAnfScgfHwgY2ggPT09ICcsJykpIGJyZWFrO1xuICAgICAgY29uc3QgbmV4dCA9IHNyY1tvZmZzZXQgKyAxXTtcbiAgICAgIGlmIChjaCA9PT0gJzonICYmICghbmV4dCB8fCBuZXh0ID09PSAnXFxuJyB8fCBuZXh0ID09PSAnXFx0JyB8fCBuZXh0ID09PSAnICcgfHwgaW5GbG93ICYmIG5leHQgPT09ICcsJykpIGJyZWFrO1xuICAgICAgaWYgKChjaCA9PT0gJyAnIHx8IGNoID09PSAnXFx0JykgJiYgbmV4dCA9PT0gJyMnKSBicmVhaztcbiAgICAgIG9mZnNldCArPSAxO1xuICAgICAgY2ggPSBuZXh0O1xuICAgIH1cblxuICAgIHJldHVybiBvZmZzZXQ7XG4gIH1cblxuICBnZXQgc3RyVmFsdWUoKSB7XG4gICAgaWYgKCF0aGlzLnZhbHVlUmFuZ2UgfHwgIXRoaXMuY29udGV4dCkgcmV0dXJuIG51bGw7XG4gICAgbGV0IHtcbiAgICAgIHN0YXJ0LFxuICAgICAgZW5kXG4gICAgfSA9IHRoaXMudmFsdWVSYW5nZTtcbiAgICBjb25zdCB7XG4gICAgICBzcmNcbiAgICB9ID0gdGhpcy5jb250ZXh0O1xuICAgIGxldCBjaCA9IHNyY1tlbmQgLSAxXTtcblxuICAgIHdoaWxlIChzdGFydCA8IGVuZCAmJiAoY2ggPT09ICdcXG4nIHx8IGNoID09PSAnXFx0JyB8fCBjaCA9PT0gJyAnKSkgY2ggPSBzcmNbLS1lbmQgLSAxXTtcblxuICAgIGxldCBzdHIgPSAnJztcblxuICAgIGZvciAobGV0IGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKSB7XG4gICAgICBjb25zdCBjaCA9IHNyY1tpXTtcblxuICAgICAgaWYgKGNoID09PSAnXFxuJykge1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgZm9sZCxcbiAgICAgICAgICBvZmZzZXRcbiAgICAgICAgfSA9IE5vZGUuZm9sZE5ld2xpbmUoc3JjLCBpLCAtMSk7XG4gICAgICAgIHN0ciArPSBmb2xkO1xuICAgICAgICBpID0gb2Zmc2V0O1xuICAgICAgfSBlbHNlIGlmIChjaCA9PT0gJyAnIHx8IGNoID09PSAnXFx0Jykge1xuICAgICAgICAvLyB0cmltIHRyYWlsaW5nIHdoaXRlc3BhY2VcbiAgICAgICAgY29uc3Qgd3NTdGFydCA9IGk7XG4gICAgICAgIGxldCBuZXh0ID0gc3JjW2kgKyAxXTtcblxuICAgICAgICB3aGlsZSAoaSA8IGVuZCAmJiAobmV4dCA9PT0gJyAnIHx8IG5leHQgPT09ICdcXHQnKSkge1xuICAgICAgICAgIGkgKz0gMTtcbiAgICAgICAgICBuZXh0ID0gc3JjW2kgKyAxXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChuZXh0ICE9PSAnXFxuJykgc3RyICs9IGkgPiB3c1N0YXJ0ID8gc3JjLnNsaWNlKHdzU3RhcnQsIGkgKyAxKSA6IGNoO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3RyICs9IGNoO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGNoMCA9IHNyY1tzdGFydF07XG5cbiAgICBzd2l0Y2ggKGNoMCkge1xuICAgICAgY2FzZSAnXFx0JzpcbiAgICAgICAge1xuICAgICAgICAgIGNvbnN0IG1zZyA9ICdQbGFpbiB2YWx1ZSBjYW5ub3Qgc3RhcnQgd2l0aCBhIHRhYiBjaGFyYWN0ZXInO1xuICAgICAgICAgIGNvbnN0IGVycm9ycyA9IFtuZXcgWUFNTFNlbWFudGljRXJyb3IodGhpcywgbXNnKV07XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGVycm9ycyxcbiAgICAgICAgICAgIHN0clxuICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgY2FzZSAnQCc6XG4gICAgICBjYXNlICdgJzpcbiAgICAgICAge1xuICAgICAgICAgIGNvbnN0IG1zZyA9IGBQbGFpbiB2YWx1ZSBjYW5ub3Qgc3RhcnQgd2l0aCByZXNlcnZlZCBjaGFyYWN0ZXIgJHtjaDB9YDtcbiAgICAgICAgICBjb25zdCBlcnJvcnMgPSBbbmV3IFlBTUxTZW1hbnRpY0Vycm9yKHRoaXMsIG1zZyldO1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBlcnJvcnMsXG4gICAgICAgICAgICBzdHJcbiAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgfVxuICB9XG5cbiAgcGFyc2VCbG9ja1ZhbHVlKHN0YXJ0KSB7XG4gICAgY29uc3Qge1xuICAgICAgaW5kZW50LFxuICAgICAgaW5GbG93LFxuICAgICAgc3JjXG4gICAgfSA9IHRoaXMuY29udGV4dDtcbiAgICBsZXQgb2Zmc2V0ID0gc3RhcnQ7XG4gICAgbGV0IHZhbHVlRW5kID0gc3RhcnQ7XG5cbiAgICBmb3IgKGxldCBjaCA9IHNyY1tvZmZzZXRdOyBjaCA9PT0gJ1xcbic7IGNoID0gc3JjW29mZnNldF0pIHtcbiAgICAgIGlmIChOb2RlLmF0RG9jdW1lbnRCb3VuZGFyeShzcmMsIG9mZnNldCArIDEpKSBicmVhaztcbiAgICAgIGNvbnN0IGVuZCA9IE5vZGUuZW5kT2ZCbG9ja0luZGVudChzcmMsIGluZGVudCwgb2Zmc2V0ICsgMSk7XG4gICAgICBpZiAoZW5kID09PSBudWxsIHx8IHNyY1tlbmRdID09PSAnIycpIGJyZWFrO1xuXG4gICAgICBpZiAoc3JjW2VuZF0gPT09ICdcXG4nKSB7XG4gICAgICAgIG9mZnNldCA9IGVuZDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbHVlRW5kID0gUGxhaW5WYWx1ZS5lbmRPZkxpbmUoc3JjLCBlbmQsIGluRmxvdyk7XG4gICAgICAgIG9mZnNldCA9IHZhbHVlRW5kO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLnZhbHVlUmFuZ2UuaXNFbXB0eSgpKSB0aGlzLnZhbHVlUmFuZ2Uuc3RhcnQgPSBzdGFydDtcbiAgICB0aGlzLnZhbHVlUmFuZ2UuZW5kID0gdmFsdWVFbmQ7XG4gICAgcmV0dXJuIHZhbHVlRW5kO1xuICB9XG4gIC8qKlxuICAgKiBQYXJzZXMgYSBwbGFpbiB2YWx1ZSBmcm9tIHRoZSBzb3VyY2VcbiAgICpcbiAgICogQWNjZXB0ZWQgZm9ybXMgYXJlOlxuICAgKiBgYGBcbiAgICogI2NvbW1lbnRcbiAgICpcbiAgICogZmlyc3QgbGluZVxuICAgKlxuICAgKiBmaXJzdCBsaW5lICNjb21tZW50XG4gICAqXG4gICAqIGZpcnN0IGxpbmVcbiAgICogYmxvY2tcbiAgICogbGluZXNcbiAgICpcbiAgICogI2NvbW1lbnRcbiAgICogYmxvY2tcbiAgICogbGluZXNcbiAgICogYGBgXG4gICAqIHdoZXJlIGJsb2NrIGxpbmVzIGFyZSBlbXB0eSBvciBoYXZlIGFuIGluZGVudCBsZXZlbCBncmVhdGVyIHRoYW4gYGluZGVudGAuXG4gICAqXG4gICAqIEBwYXJhbSB7UGFyc2VDb250ZXh0fSBjb250ZXh0XG4gICAqIEBwYXJhbSB7bnVtYmVyfSBzdGFydCAtIEluZGV4IG9mIGZpcnN0IGNoYXJhY3RlclxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSAtIEluZGV4IG9mIHRoZSBjaGFyYWN0ZXIgYWZ0ZXIgdGhpcyBzY2FsYXIsIG1heSBiZSBgXFxuYFxuICAgKi9cblxuXG4gIHBhcnNlKGNvbnRleHQsIHN0YXJ0KSB7XG4gICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgICBjb25zdCB7XG4gICAgICBpbkZsb3csXG4gICAgICBzcmNcbiAgICB9ID0gY29udGV4dDtcbiAgICBsZXQgb2Zmc2V0ID0gc3RhcnQ7XG4gICAgY29uc3QgY2ggPSBzcmNbb2Zmc2V0XTtcblxuICAgIGlmIChjaCAmJiBjaCAhPT0gJyMnICYmIGNoICE9PSAnXFxuJykge1xuICAgICAgb2Zmc2V0ID0gUGxhaW5WYWx1ZS5lbmRPZkxpbmUoc3JjLCBzdGFydCwgaW5GbG93KTtcbiAgICB9XG5cbiAgICB0aGlzLnZhbHVlUmFuZ2UgPSBuZXcgUmFuZ2Uoc3RhcnQsIG9mZnNldCk7XG4gICAgb2Zmc2V0ID0gTm9kZS5lbmRPZldoaXRlU3BhY2Uoc3JjLCBvZmZzZXQpO1xuICAgIG9mZnNldCA9IHRoaXMucGFyc2VDb21tZW50KG9mZnNldCk7XG5cbiAgICBpZiAoIXRoaXMuaGFzQ29tbWVudCB8fCB0aGlzLnZhbHVlUmFuZ2UuaXNFbXB0eSgpKSB7XG4gICAgICBvZmZzZXQgPSB0aGlzLnBhcnNlQmxvY2tWYWx1ZShvZmZzZXQpO1xuICAgIH1cblxuICAgIHJldHVybiBvZmZzZXQ7XG4gIH1cblxufVxuXG5leHBvcnRzLkNoYXIgPSBDaGFyO1xuZXhwb3J0cy5Ob2RlID0gTm9kZTtcbmV4cG9ydHMuUGxhaW5WYWx1ZSA9IFBsYWluVmFsdWU7XG5leHBvcnRzLlJhbmdlID0gUmFuZ2U7XG5leHBvcnRzLlR5cGUgPSBUeXBlO1xuZXhwb3J0cy5ZQU1MRXJyb3IgPSBZQU1MRXJyb3I7XG5leHBvcnRzLllBTUxSZWZlcmVuY2VFcnJvciA9IFlBTUxSZWZlcmVuY2VFcnJvcjtcbmV4cG9ydHMuWUFNTFNlbWFudGljRXJyb3IgPSBZQU1MU2VtYW50aWNFcnJvcjtcbmV4cG9ydHMuWUFNTFN5bnRheEVycm9yID0gWUFNTFN5bnRheEVycm9yO1xuZXhwb3J0cy5ZQU1MV2FybmluZyA9IFlBTUxXYXJuaW5nO1xuZXhwb3J0cy5fZGVmaW5lUHJvcGVydHkgPSBfZGVmaW5lUHJvcGVydHk7XG5leHBvcnRzLmRlZmF1bHRUYWdQcmVmaXggPSBkZWZhdWx0VGFnUHJlZml4O1xuZXhwb3J0cy5kZWZhdWx0VGFncyA9IGRlZmF1bHRUYWdzO1xuIiwgIid1c2Ugc3RyaWN0JztcblxudmFyIFBsYWluVmFsdWUgPSByZXF1aXJlKCcuL1BsYWluVmFsdWUtZWM4ZTU4OGUuanMnKTtcblxuZnVuY3Rpb24gYWRkQ29tbWVudEJlZm9yZShzdHIsIGluZGVudCwgY29tbWVudCkge1xuICBpZiAoIWNvbW1lbnQpIHJldHVybiBzdHI7XG4gIGNvbnN0IGNjID0gY29tbWVudC5yZXBsYWNlKC9bXFxzXFxTXV4vZ20sIGAkJiR7aW5kZW50fSNgKTtcbiAgcmV0dXJuIGAjJHtjY31cXG4ke2luZGVudH0ke3N0cn1gO1xufVxuZnVuY3Rpb24gYWRkQ29tbWVudChzdHIsIGluZGVudCwgY29tbWVudCkge1xuICByZXR1cm4gIWNvbW1lbnQgPyBzdHIgOiBjb21tZW50LmluZGV4T2YoJ1xcbicpID09PSAtMSA/IGAke3N0cn0gIyR7Y29tbWVudH1gIDogYCR7c3RyfVxcbmAgKyBjb21tZW50LnJlcGxhY2UoL14vZ20sIGAke2luZGVudCB8fCAnJ30jYCk7XG59XG5cbmNsYXNzIE5vZGUge31cblxuZnVuY3Rpb24gdG9KU09OKHZhbHVlLCBhcmcsIGN0eCkge1xuICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHJldHVybiB2YWx1ZS5tYXAoKHYsIGkpID0+IHRvSlNPTih2LCBTdHJpbmcoaSksIGN0eCkpO1xuXG4gIGlmICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUudG9KU09OID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY29uc3QgYW5jaG9yID0gY3R4ICYmIGN0eC5hbmNob3JzICYmIGN0eC5hbmNob3JzLmdldCh2YWx1ZSk7XG4gICAgaWYgKGFuY2hvcikgY3R4Lm9uQ3JlYXRlID0gcmVzID0+IHtcbiAgICAgIGFuY2hvci5yZXMgPSByZXM7XG4gICAgICBkZWxldGUgY3R4Lm9uQ3JlYXRlO1xuICAgIH07XG4gICAgY29uc3QgcmVzID0gdmFsdWUudG9KU09OKGFyZywgY3R4KTtcbiAgICBpZiAoYW5jaG9yICYmIGN0eC5vbkNyZWF0ZSkgY3R4Lm9uQ3JlYXRlKHJlcyk7XG4gICAgcmV0dXJuIHJlcztcbiAgfVxuXG4gIGlmICgoIWN0eCB8fCAhY3R4LmtlZXApICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ2JpZ2ludCcpIHJldHVybiBOdW1iZXIodmFsdWUpO1xuICByZXR1cm4gdmFsdWU7XG59XG5cbmNsYXNzIFNjYWxhciBleHRlbmRzIE5vZGUge1xuICBjb25zdHJ1Y3Rvcih2YWx1ZSkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgdG9KU09OKGFyZywgY3R4KSB7XG4gICAgcmV0dXJuIGN0eCAmJiBjdHgua2VlcCA/IHRoaXMudmFsdWUgOiB0b0pTT04odGhpcy52YWx1ZSwgYXJnLCBjdHgpO1xuICB9XG5cbiAgdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIFN0cmluZyh0aGlzLnZhbHVlKTtcbiAgfVxuXG59XG5cbmZ1bmN0aW9uIGNvbGxlY3Rpb25Gcm9tUGF0aChzY2hlbWEsIHBhdGgsIHZhbHVlKSB7XG4gIGxldCB2ID0gdmFsdWU7XG5cbiAgZm9yIChsZXQgaSA9IHBhdGgubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICBjb25zdCBrID0gcGF0aFtpXTtcblxuICAgIGlmIChOdW1iZXIuaXNJbnRlZ2VyKGspICYmIGsgPj0gMCkge1xuICAgICAgY29uc3QgYSA9IFtdO1xuICAgICAgYVtrXSA9IHY7XG4gICAgICB2ID0gYTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgbyA9IHt9O1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGssIHtcbiAgICAgICAgdmFsdWU6IHYsXG4gICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgIH0pO1xuICAgICAgdiA9IG87XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHNjaGVtYS5jcmVhdGVOb2RlKHYsIGZhbHNlKTtcbn0gLy8gbnVsbCwgdW5kZWZpbmVkLCBvciBhbiBlbXB0eSBub24tc3RyaW5nIGl0ZXJhYmxlIChlLmcuIFtdKVxuXG5cbmNvbnN0IGlzRW1wdHlQYXRoID0gcGF0aCA9PiBwYXRoID09IG51bGwgfHwgdHlwZW9mIHBhdGggPT09ICdvYmplY3QnICYmIHBhdGhbU3ltYm9sLml0ZXJhdG9yXSgpLm5leHQoKS5kb25lO1xuY2xhc3MgQ29sbGVjdGlvbiBleHRlbmRzIE5vZGUge1xuICBjb25zdHJ1Y3RvcihzY2hlbWEpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgUGxhaW5WYWx1ZS5fZGVmaW5lUHJvcGVydHkodGhpcywgXCJpdGVtc1wiLCBbXSk7XG5cbiAgICB0aGlzLnNjaGVtYSA9IHNjaGVtYTtcbiAgfVxuXG4gIGFkZEluKHBhdGgsIHZhbHVlKSB7XG4gICAgaWYgKGlzRW1wdHlQYXRoKHBhdGgpKSB0aGlzLmFkZCh2YWx1ZSk7ZWxzZSB7XG4gICAgICBjb25zdCBba2V5LCAuLi5yZXN0XSA9IHBhdGg7XG4gICAgICBjb25zdCBub2RlID0gdGhpcy5nZXQoa2V5LCB0cnVlKTtcbiAgICAgIGlmIChub2RlIGluc3RhbmNlb2YgQ29sbGVjdGlvbikgbm9kZS5hZGRJbihyZXN0LCB2YWx1ZSk7ZWxzZSBpZiAobm9kZSA9PT0gdW5kZWZpbmVkICYmIHRoaXMuc2NoZW1hKSB0aGlzLnNldChrZXksIGNvbGxlY3Rpb25Gcm9tUGF0aCh0aGlzLnNjaGVtYSwgcmVzdCwgdmFsdWUpKTtlbHNlIHRocm93IG5ldyBFcnJvcihgRXhwZWN0ZWQgWUFNTCBjb2xsZWN0aW9uIGF0ICR7a2V5fS4gUmVtYWluaW5nIHBhdGg6ICR7cmVzdH1gKTtcbiAgICB9XG4gIH1cblxuICBkZWxldGVJbihba2V5LCAuLi5yZXN0XSkge1xuICAgIGlmIChyZXN0Lmxlbmd0aCA9PT0gMCkgcmV0dXJuIHRoaXMuZGVsZXRlKGtleSk7XG4gICAgY29uc3Qgbm9kZSA9IHRoaXMuZ2V0KGtleSwgdHJ1ZSk7XG4gICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBDb2xsZWN0aW9uKSByZXR1cm4gbm9kZS5kZWxldGVJbihyZXN0KTtlbHNlIHRocm93IG5ldyBFcnJvcihgRXhwZWN0ZWQgWUFNTCBjb2xsZWN0aW9uIGF0ICR7a2V5fS4gUmVtYWluaW5nIHBhdGg6ICR7cmVzdH1gKTtcbiAgfVxuXG4gIGdldEluKFtrZXksIC4uLnJlc3RdLCBrZWVwU2NhbGFyKSB7XG4gICAgY29uc3Qgbm9kZSA9IHRoaXMuZ2V0KGtleSwgdHJ1ZSk7XG4gICAgaWYgKHJlc3QubGVuZ3RoID09PSAwKSByZXR1cm4gIWtlZXBTY2FsYXIgJiYgbm9kZSBpbnN0YW5jZW9mIFNjYWxhciA/IG5vZGUudmFsdWUgOiBub2RlO2Vsc2UgcmV0dXJuIG5vZGUgaW5zdGFuY2VvZiBDb2xsZWN0aW9uID8gbm9kZS5nZXRJbihyZXN0LCBrZWVwU2NhbGFyKSA6IHVuZGVmaW5lZDtcbiAgfVxuXG4gIGhhc0FsbE51bGxWYWx1ZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXRlbXMuZXZlcnkobm9kZSA9PiB7XG4gICAgICBpZiAoIW5vZGUgfHwgbm9kZS50eXBlICE9PSAnUEFJUicpIHJldHVybiBmYWxzZTtcbiAgICAgIGNvbnN0IG4gPSBub2RlLnZhbHVlO1xuICAgICAgcmV0dXJuIG4gPT0gbnVsbCB8fCBuIGluc3RhbmNlb2YgU2NhbGFyICYmIG4udmFsdWUgPT0gbnVsbCAmJiAhbi5jb21tZW50QmVmb3JlICYmICFuLmNvbW1lbnQgJiYgIW4udGFnO1xuICAgIH0pO1xuICB9XG5cbiAgaGFzSW4oW2tleSwgLi4ucmVzdF0pIHtcbiAgICBpZiAocmVzdC5sZW5ndGggPT09IDApIHJldHVybiB0aGlzLmhhcyhrZXkpO1xuICAgIGNvbnN0IG5vZGUgPSB0aGlzLmdldChrZXksIHRydWUpO1xuICAgIHJldHVybiBub2RlIGluc3RhbmNlb2YgQ29sbGVjdGlvbiA/IG5vZGUuaGFzSW4ocmVzdCkgOiBmYWxzZTtcbiAgfVxuXG4gIHNldEluKFtrZXksIC4uLnJlc3RdLCB2YWx1ZSkge1xuICAgIGlmIChyZXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhpcy5zZXQoa2V5LCB2YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IG5vZGUgPSB0aGlzLmdldChrZXksIHRydWUpO1xuICAgICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBDb2xsZWN0aW9uKSBub2RlLnNldEluKHJlc3QsIHZhbHVlKTtlbHNlIGlmIChub2RlID09PSB1bmRlZmluZWQgJiYgdGhpcy5zY2hlbWEpIHRoaXMuc2V0KGtleSwgY29sbGVjdGlvbkZyb21QYXRoKHRoaXMuc2NoZW1hLCByZXN0LCB2YWx1ZSkpO2Vsc2UgdGhyb3cgbmV3IEVycm9yKGBFeHBlY3RlZCBZQU1MIGNvbGxlY3Rpb24gYXQgJHtrZXl9LiBSZW1haW5pbmcgcGF0aDogJHtyZXN0fWApO1xuICAgIH1cbiAgfSAvLyBvdmVycmlkZGVuIGluIGltcGxlbWVudGF0aW9uc1xuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG5cblxuICB0b0pTT04oKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICB0b1N0cmluZyhjdHgsIHtcbiAgICBibG9ja0l0ZW0sXG4gICAgZmxvd0NoYXJzLFxuICAgIGlzTWFwLFxuICAgIGl0ZW1JbmRlbnRcbiAgfSwgb25Db21tZW50LCBvbkNob21wS2VlcCkge1xuICAgIGNvbnN0IHtcbiAgICAgIGluZGVudCxcbiAgICAgIGluZGVudFN0ZXAsXG4gICAgICBzdHJpbmdpZnlcbiAgICB9ID0gY3R4O1xuICAgIGNvbnN0IGluRmxvdyA9IHRoaXMudHlwZSA9PT0gUGxhaW5WYWx1ZS5UeXBlLkZMT1dfTUFQIHx8IHRoaXMudHlwZSA9PT0gUGxhaW5WYWx1ZS5UeXBlLkZMT1dfU0VRIHx8IGN0eC5pbkZsb3c7XG4gICAgaWYgKGluRmxvdykgaXRlbUluZGVudCArPSBpbmRlbnRTdGVwO1xuICAgIGNvbnN0IGFsbE51bGxWYWx1ZXMgPSBpc01hcCAmJiB0aGlzLmhhc0FsbE51bGxWYWx1ZXMoKTtcbiAgICBjdHggPSBPYmplY3QuYXNzaWduKHt9LCBjdHgsIHtcbiAgICAgIGFsbE51bGxWYWx1ZXMsXG4gICAgICBpbmRlbnQ6IGl0ZW1JbmRlbnQsXG4gICAgICBpbkZsb3csXG4gICAgICB0eXBlOiBudWxsXG4gICAgfSk7XG4gICAgbGV0IGNob21wS2VlcCA9IGZhbHNlO1xuICAgIGxldCBoYXNJdGVtV2l0aE5ld0xpbmUgPSBmYWxzZTtcbiAgICBjb25zdCBub2RlcyA9IHRoaXMuaXRlbXMucmVkdWNlKChub2RlcywgaXRlbSwgaSkgPT4ge1xuICAgICAgbGV0IGNvbW1lbnQ7XG5cbiAgICAgIGlmIChpdGVtKSB7XG4gICAgICAgIGlmICghY2hvbXBLZWVwICYmIGl0ZW0uc3BhY2VCZWZvcmUpIG5vZGVzLnB1c2goe1xuICAgICAgICAgIHR5cGU6ICdjb21tZW50JyxcbiAgICAgICAgICBzdHI6ICcnXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoaXRlbS5jb21tZW50QmVmb3JlKSBpdGVtLmNvbW1lbnRCZWZvcmUubWF0Y2goL14uKiQvZ20pLmZvckVhY2gobGluZSA9PiB7XG4gICAgICAgICAgbm9kZXMucHVzaCh7XG4gICAgICAgICAgICB0eXBlOiAnY29tbWVudCcsXG4gICAgICAgICAgICBzdHI6IGAjJHtsaW5lfWBcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChpdGVtLmNvbW1lbnQpIGNvbW1lbnQgPSBpdGVtLmNvbW1lbnQ7XG4gICAgICAgIGlmIChpbkZsb3cgJiYgKCFjaG9tcEtlZXAgJiYgaXRlbS5zcGFjZUJlZm9yZSB8fCBpdGVtLmNvbW1lbnRCZWZvcmUgfHwgaXRlbS5jb21tZW50IHx8IGl0ZW0ua2V5ICYmIChpdGVtLmtleS5jb21tZW50QmVmb3JlIHx8IGl0ZW0ua2V5LmNvbW1lbnQpIHx8IGl0ZW0udmFsdWUgJiYgKGl0ZW0udmFsdWUuY29tbWVudEJlZm9yZSB8fCBpdGVtLnZhbHVlLmNvbW1lbnQpKSkgaGFzSXRlbVdpdGhOZXdMaW5lID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgY2hvbXBLZWVwID0gZmFsc2U7XG4gICAgICBsZXQgc3RyID0gc3RyaW5naWZ5KGl0ZW0sIGN0eCwgKCkgPT4gY29tbWVudCA9IG51bGwsICgpID0+IGNob21wS2VlcCA9IHRydWUpO1xuICAgICAgaWYgKGluRmxvdyAmJiAhaGFzSXRlbVdpdGhOZXdMaW5lICYmIHN0ci5pbmNsdWRlcygnXFxuJykpIGhhc0l0ZW1XaXRoTmV3TGluZSA9IHRydWU7XG4gICAgICBpZiAoaW5GbG93ICYmIGkgPCB0aGlzLml0ZW1zLmxlbmd0aCAtIDEpIHN0ciArPSAnLCc7XG4gICAgICBzdHIgPSBhZGRDb21tZW50KHN0ciwgaXRlbUluZGVudCwgY29tbWVudCk7XG4gICAgICBpZiAoY2hvbXBLZWVwICYmIChjb21tZW50IHx8IGluRmxvdykpIGNob21wS2VlcCA9IGZhbHNlO1xuICAgICAgbm9kZXMucHVzaCh7XG4gICAgICAgIHR5cGU6ICdpdGVtJyxcbiAgICAgICAgc3RyXG4gICAgICB9KTtcbiAgICAgIHJldHVybiBub2RlcztcbiAgICB9LCBbXSk7XG4gICAgbGV0IHN0cjtcblxuICAgIGlmIChub2Rlcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHN0ciA9IGZsb3dDaGFycy5zdGFydCArIGZsb3dDaGFycy5lbmQ7XG4gICAgfSBlbHNlIGlmIChpbkZsb3cpIHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgc3RhcnQsXG4gICAgICAgIGVuZFxuICAgICAgfSA9IGZsb3dDaGFycztcbiAgICAgIGNvbnN0IHN0cmluZ3MgPSBub2Rlcy5tYXAobiA9PiBuLnN0cik7XG5cbiAgICAgIGlmIChoYXNJdGVtV2l0aE5ld0xpbmUgfHwgc3RyaW5ncy5yZWR1Y2UoKHN1bSwgc3RyKSA9PiBzdW0gKyBzdHIubGVuZ3RoICsgMiwgMikgPiBDb2xsZWN0aW9uLm1heEZsb3dTdHJpbmdTaW5nbGVMaW5lTGVuZ3RoKSB7XG4gICAgICAgIHN0ciA9IHN0YXJ0O1xuXG4gICAgICAgIGZvciAoY29uc3QgcyBvZiBzdHJpbmdzKSB7XG4gICAgICAgICAgc3RyICs9IHMgPyBgXFxuJHtpbmRlbnRTdGVwfSR7aW5kZW50fSR7c31gIDogJ1xcbic7XG4gICAgICAgIH1cblxuICAgICAgICBzdHIgKz0gYFxcbiR7aW5kZW50fSR7ZW5kfWA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdHIgPSBgJHtzdGFydH0gJHtzdHJpbmdzLmpvaW4oJyAnKX0gJHtlbmR9YDtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3Qgc3RyaW5ncyA9IG5vZGVzLm1hcChibG9ja0l0ZW0pO1xuICAgICAgc3RyID0gc3RyaW5ncy5zaGlmdCgpO1xuXG4gICAgICBmb3IgKGNvbnN0IHMgb2Ygc3RyaW5ncykgc3RyICs9IHMgPyBgXFxuJHtpbmRlbnR9JHtzfWAgOiAnXFxuJztcbiAgICB9XG5cbiAgICBpZiAodGhpcy5jb21tZW50KSB7XG4gICAgICBzdHIgKz0gJ1xcbicgKyB0aGlzLmNvbW1lbnQucmVwbGFjZSgvXi9nbSwgYCR7aW5kZW50fSNgKTtcbiAgICAgIGlmIChvbkNvbW1lbnQpIG9uQ29tbWVudCgpO1xuICAgIH0gZWxzZSBpZiAoY2hvbXBLZWVwICYmIG9uQ2hvbXBLZWVwKSBvbkNob21wS2VlcCgpO1xuXG4gICAgcmV0dXJuIHN0cjtcbiAgfVxuXG59XG5cblBsYWluVmFsdWUuX2RlZmluZVByb3BlcnR5KENvbGxlY3Rpb24sIFwibWF4Rmxvd1N0cmluZ1NpbmdsZUxpbmVMZW5ndGhcIiwgNjApO1xuXG5mdW5jdGlvbiBhc0l0ZW1JbmRleChrZXkpIHtcbiAgbGV0IGlkeCA9IGtleSBpbnN0YW5jZW9mIFNjYWxhciA/IGtleS52YWx1ZSA6IGtleTtcbiAgaWYgKGlkeCAmJiB0eXBlb2YgaWR4ID09PSAnc3RyaW5nJykgaWR4ID0gTnVtYmVyKGlkeCk7XG4gIHJldHVybiBOdW1iZXIuaXNJbnRlZ2VyKGlkeCkgJiYgaWR4ID49IDAgPyBpZHggOiBudWxsO1xufVxuXG5jbGFzcyBZQU1MU2VxIGV4dGVuZHMgQ29sbGVjdGlvbiB7XG4gIGFkZCh2YWx1ZSkge1xuICAgIHRoaXMuaXRlbXMucHVzaCh2YWx1ZSk7XG4gIH1cblxuICBkZWxldGUoa2V5KSB7XG4gICAgY29uc3QgaWR4ID0gYXNJdGVtSW5kZXgoa2V5KTtcbiAgICBpZiAodHlwZW9mIGlkeCAhPT0gJ251bWJlcicpIHJldHVybiBmYWxzZTtcbiAgICBjb25zdCBkZWwgPSB0aGlzLml0ZW1zLnNwbGljZShpZHgsIDEpO1xuICAgIHJldHVybiBkZWwubGVuZ3RoID4gMDtcbiAgfVxuXG4gIGdldChrZXksIGtlZXBTY2FsYXIpIHtcbiAgICBjb25zdCBpZHggPSBhc0l0ZW1JbmRleChrZXkpO1xuICAgIGlmICh0eXBlb2YgaWR4ICE9PSAnbnVtYmVyJykgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICBjb25zdCBpdCA9IHRoaXMuaXRlbXNbaWR4XTtcbiAgICByZXR1cm4gIWtlZXBTY2FsYXIgJiYgaXQgaW5zdGFuY2VvZiBTY2FsYXIgPyBpdC52YWx1ZSA6IGl0O1xuICB9XG5cbiAgaGFzKGtleSkge1xuICAgIGNvbnN0IGlkeCA9IGFzSXRlbUluZGV4KGtleSk7XG4gICAgcmV0dXJuIHR5cGVvZiBpZHggPT09ICdudW1iZXInICYmIGlkeCA8IHRoaXMuaXRlbXMubGVuZ3RoO1xuICB9XG5cbiAgc2V0KGtleSwgdmFsdWUpIHtcbiAgICBjb25zdCBpZHggPSBhc0l0ZW1JbmRleChrZXkpO1xuICAgIGlmICh0eXBlb2YgaWR4ICE9PSAnbnVtYmVyJykgdGhyb3cgbmV3IEVycm9yKGBFeHBlY3RlZCBhIHZhbGlkIGluZGV4LCBub3QgJHtrZXl9LmApO1xuICAgIHRoaXMuaXRlbXNbaWR4XSA9IHZhbHVlO1xuICB9XG5cbiAgdG9KU09OKF8sIGN0eCkge1xuICAgIGNvbnN0IHNlcSA9IFtdO1xuICAgIGlmIChjdHggJiYgY3R4Lm9uQ3JlYXRlKSBjdHgub25DcmVhdGUoc2VxKTtcbiAgICBsZXQgaSA9IDA7XG5cbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgdGhpcy5pdGVtcykgc2VxLnB1c2godG9KU09OKGl0ZW0sIFN0cmluZyhpKyspLCBjdHgpKTtcblxuICAgIHJldHVybiBzZXE7XG4gIH1cblxuICB0b1N0cmluZyhjdHgsIG9uQ29tbWVudCwgb25DaG9tcEtlZXApIHtcbiAgICBpZiAoIWN0eCkgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHRoaXMpO1xuICAgIHJldHVybiBzdXBlci50b1N0cmluZyhjdHgsIHtcbiAgICAgIGJsb2NrSXRlbTogbiA9PiBuLnR5cGUgPT09ICdjb21tZW50JyA/IG4uc3RyIDogYC0gJHtuLnN0cn1gLFxuICAgICAgZmxvd0NoYXJzOiB7XG4gICAgICAgIHN0YXJ0OiAnWycsXG4gICAgICAgIGVuZDogJ10nXG4gICAgICB9LFxuICAgICAgaXNNYXA6IGZhbHNlLFxuICAgICAgaXRlbUluZGVudDogKGN0eC5pbmRlbnQgfHwgJycpICsgJyAgJ1xuICAgIH0sIG9uQ29tbWVudCwgb25DaG9tcEtlZXApO1xuICB9XG5cbn1cblxuY29uc3Qgc3RyaW5naWZ5S2V5ID0gKGtleSwganNLZXksIGN0eCkgPT4ge1xuICBpZiAoanNLZXkgPT09IG51bGwpIHJldHVybiAnJztcbiAgaWYgKHR5cGVvZiBqc0tleSAhPT0gJ29iamVjdCcpIHJldHVybiBTdHJpbmcoanNLZXkpO1xuICBpZiAoa2V5IGluc3RhbmNlb2YgTm9kZSAmJiBjdHggJiYgY3R4LmRvYykgcmV0dXJuIGtleS50b1N0cmluZyh7XG4gICAgYW5jaG9yczogT2JqZWN0LmNyZWF0ZShudWxsKSxcbiAgICBkb2M6IGN0eC5kb2MsXG4gICAgaW5kZW50OiAnJyxcbiAgICBpbmRlbnRTdGVwOiBjdHguaW5kZW50U3RlcCxcbiAgICBpbkZsb3c6IHRydWUsXG4gICAgaW5TdHJpbmdpZnlLZXk6IHRydWUsXG4gICAgc3RyaW5naWZ5OiBjdHguc3RyaW5naWZ5XG4gIH0pO1xuICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoanNLZXkpO1xufTtcblxuY2xhc3MgUGFpciBleHRlbmRzIE5vZGUge1xuICBjb25zdHJ1Y3RvcihrZXksIHZhbHVlID0gbnVsbCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5rZXkgPSBrZXk7XG4gICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIHRoaXMudHlwZSA9IFBhaXIuVHlwZS5QQUlSO1xuICB9XG5cbiAgZ2V0IGNvbW1lbnRCZWZvcmUoKSB7XG4gICAgcmV0dXJuIHRoaXMua2V5IGluc3RhbmNlb2YgTm9kZSA/IHRoaXMua2V5LmNvbW1lbnRCZWZvcmUgOiB1bmRlZmluZWQ7XG4gIH1cblxuICBzZXQgY29tbWVudEJlZm9yZShjYikge1xuICAgIGlmICh0aGlzLmtleSA9PSBudWxsKSB0aGlzLmtleSA9IG5ldyBTY2FsYXIobnVsbCk7XG4gICAgaWYgKHRoaXMua2V5IGluc3RhbmNlb2YgTm9kZSkgdGhpcy5rZXkuY29tbWVudEJlZm9yZSA9IGNiO2Vsc2Uge1xuICAgICAgY29uc3QgbXNnID0gJ1BhaXIuY29tbWVudEJlZm9yZSBpcyBhbiBhbGlhcyBmb3IgUGFpci5rZXkuY29tbWVudEJlZm9yZS4gVG8gc2V0IGl0LCB0aGUga2V5IG11c3QgYmUgYSBOb2RlLic7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IobXNnKTtcbiAgICB9XG4gIH1cblxuICBhZGRUb0pTTWFwKGN0eCwgbWFwKSB7XG4gICAgY29uc3Qga2V5ID0gdG9KU09OKHRoaXMua2V5LCAnJywgY3R4KTtcblxuICAgIGlmIChtYXAgaW5zdGFuY2VvZiBNYXApIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gdG9KU09OKHRoaXMudmFsdWUsIGtleSwgY3R4KTtcbiAgICAgIG1hcC5zZXQoa2V5LCB2YWx1ZSk7XG4gICAgfSBlbHNlIGlmIChtYXAgaW5zdGFuY2VvZiBTZXQpIHtcbiAgICAgIG1hcC5hZGQoa2V5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3Qgc3RyaW5nS2V5ID0gc3RyaW5naWZ5S2V5KHRoaXMua2V5LCBrZXksIGN0eCk7XG4gICAgICBjb25zdCB2YWx1ZSA9IHRvSlNPTih0aGlzLnZhbHVlLCBzdHJpbmdLZXksIGN0eCk7XG4gICAgICBpZiAoc3RyaW5nS2V5IGluIG1hcCkgT2JqZWN0LmRlZmluZVByb3BlcnR5KG1hcCwgc3RyaW5nS2V5LCB7XG4gICAgICAgIHZhbHVlLFxuICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICB9KTtlbHNlIG1hcFtzdHJpbmdLZXldID0gdmFsdWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1hcDtcbiAgfVxuXG4gIHRvSlNPTihfLCBjdHgpIHtcbiAgICBjb25zdCBwYWlyID0gY3R4ICYmIGN0eC5tYXBBc01hcCA/IG5ldyBNYXAoKSA6IHt9O1xuICAgIHJldHVybiB0aGlzLmFkZFRvSlNNYXAoY3R4LCBwYWlyKTtcbiAgfVxuXG4gIHRvU3RyaW5nKGN0eCwgb25Db21tZW50LCBvbkNob21wS2VlcCkge1xuICAgIGlmICghY3R4IHx8ICFjdHguZG9jKSByZXR1cm4gSlNPTi5zdHJpbmdpZnkodGhpcyk7XG4gICAgY29uc3Qge1xuICAgICAgaW5kZW50OiBpbmRlbnRTaXplLFxuICAgICAgaW5kZW50U2VxLFxuICAgICAgc2ltcGxlS2V5c1xuICAgIH0gPSBjdHguZG9jLm9wdGlvbnM7XG4gICAgbGV0IHtcbiAgICAgIGtleSxcbiAgICAgIHZhbHVlXG4gICAgfSA9IHRoaXM7XG4gICAgbGV0IGtleUNvbW1lbnQgPSBrZXkgaW5zdGFuY2VvZiBOb2RlICYmIGtleS5jb21tZW50O1xuXG4gICAgaWYgKHNpbXBsZUtleXMpIHtcbiAgICAgIGlmIChrZXlDb21tZW50KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignV2l0aCBzaW1wbGUga2V5cywga2V5IG5vZGVzIGNhbm5vdCBoYXZlIGNvbW1lbnRzJyk7XG4gICAgICB9XG5cbiAgICAgIGlmIChrZXkgaW5zdGFuY2VvZiBDb2xsZWN0aW9uKSB7XG4gICAgICAgIGNvbnN0IG1zZyA9ICdXaXRoIHNpbXBsZSBrZXlzLCBjb2xsZWN0aW9uIGNhbm5vdCBiZSB1c2VkIGFzIGEga2V5IHZhbHVlJztcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1zZyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IGV4cGxpY2l0S2V5ID0gIXNpbXBsZUtleXMgJiYgKCFrZXkgfHwga2V5Q29tbWVudCB8fCAoa2V5IGluc3RhbmNlb2YgTm9kZSA/IGtleSBpbnN0YW5jZW9mIENvbGxlY3Rpb24gfHwga2V5LnR5cGUgPT09IFBsYWluVmFsdWUuVHlwZS5CTE9DS19GT0xERUQgfHwga2V5LnR5cGUgPT09IFBsYWluVmFsdWUuVHlwZS5CTE9DS19MSVRFUkFMIDogdHlwZW9mIGtleSA9PT0gJ29iamVjdCcpKTtcbiAgICBjb25zdCB7XG4gICAgICBkb2MsXG4gICAgICBpbmRlbnQsXG4gICAgICBpbmRlbnRTdGVwLFxuICAgICAgc3RyaW5naWZ5XG4gICAgfSA9IGN0eDtcbiAgICBjdHggPSBPYmplY3QuYXNzaWduKHt9LCBjdHgsIHtcbiAgICAgIGltcGxpY2l0S2V5OiAhZXhwbGljaXRLZXksXG4gICAgICBpbmRlbnQ6IGluZGVudCArIGluZGVudFN0ZXBcbiAgICB9KTtcbiAgICBsZXQgY2hvbXBLZWVwID0gZmFsc2U7XG4gICAgbGV0IHN0ciA9IHN0cmluZ2lmeShrZXksIGN0eCwgKCkgPT4ga2V5Q29tbWVudCA9IG51bGwsICgpID0+IGNob21wS2VlcCA9IHRydWUpO1xuICAgIHN0ciA9IGFkZENvbW1lbnQoc3RyLCBjdHguaW5kZW50LCBrZXlDb21tZW50KTtcblxuICAgIGlmICghZXhwbGljaXRLZXkgJiYgc3RyLmxlbmd0aCA+IDEwMjQpIHtcbiAgICAgIGlmIChzaW1wbGVLZXlzKSB0aHJvdyBuZXcgRXJyb3IoJ1dpdGggc2ltcGxlIGtleXMsIHNpbmdsZSBsaW5lIHNjYWxhciBtdXN0IG5vdCBzcGFuIG1vcmUgdGhhbiAxMDI0IGNoYXJhY3RlcnMnKTtcbiAgICAgIGV4cGxpY2l0S2V5ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoY3R4LmFsbE51bGxWYWx1ZXMgJiYgIXNpbXBsZUtleXMpIHtcbiAgICAgIGlmICh0aGlzLmNvbW1lbnQpIHtcbiAgICAgICAgc3RyID0gYWRkQ29tbWVudChzdHIsIGN0eC5pbmRlbnQsIHRoaXMuY29tbWVudCk7XG4gICAgICAgIGlmIChvbkNvbW1lbnQpIG9uQ29tbWVudCgpO1xuICAgICAgfSBlbHNlIGlmIChjaG9tcEtlZXAgJiYgIWtleUNvbW1lbnQgJiYgb25DaG9tcEtlZXApIG9uQ2hvbXBLZWVwKCk7XG5cbiAgICAgIHJldHVybiBjdHguaW5GbG93ICYmICFleHBsaWNpdEtleSA/IHN0ciA6IGA/ICR7c3RyfWA7XG4gICAgfVxuXG4gICAgc3RyID0gZXhwbGljaXRLZXkgPyBgPyAke3N0cn1cXG4ke2luZGVudH06YCA6IGAke3N0cn06YDtcblxuICAgIGlmICh0aGlzLmNvbW1lbnQpIHtcbiAgICAgIC8vIGV4cGVjdGVkIChidXQgbm90IHN0cmljdGx5IHJlcXVpcmVkKSB0byBiZSBhIHNpbmdsZS1saW5lIGNvbW1lbnRcbiAgICAgIHN0ciA9IGFkZENvbW1lbnQoc3RyLCBjdHguaW5kZW50LCB0aGlzLmNvbW1lbnQpO1xuICAgICAgaWYgKG9uQ29tbWVudCkgb25Db21tZW50KCk7XG4gICAgfVxuXG4gICAgbGV0IHZjYiA9ICcnO1xuICAgIGxldCB2YWx1ZUNvbW1lbnQgPSBudWxsO1xuXG4gICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgTm9kZSkge1xuICAgICAgaWYgKHZhbHVlLnNwYWNlQmVmb3JlKSB2Y2IgPSAnXFxuJztcblxuICAgICAgaWYgKHZhbHVlLmNvbW1lbnRCZWZvcmUpIHtcbiAgICAgICAgY29uc3QgY3MgPSB2YWx1ZS5jb21tZW50QmVmb3JlLnJlcGxhY2UoL14vZ20sIGAke2N0eC5pbmRlbnR9I2ApO1xuICAgICAgICB2Y2IgKz0gYFxcbiR7Y3N9YDtcbiAgICAgIH1cblxuICAgICAgdmFsdWVDb21tZW50ID0gdmFsdWUuY29tbWVudDtcbiAgICB9IGVsc2UgaWYgKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHZhbHVlID0gZG9jLnNjaGVtYS5jcmVhdGVOb2RlKHZhbHVlLCB0cnVlKTtcbiAgICB9XG5cbiAgICBjdHguaW1wbGljaXRLZXkgPSBmYWxzZTtcbiAgICBpZiAoIWV4cGxpY2l0S2V5ICYmICF0aGlzLmNvbW1lbnQgJiYgdmFsdWUgaW5zdGFuY2VvZiBTY2FsYXIpIGN0eC5pbmRlbnRBdFN0YXJ0ID0gc3RyLmxlbmd0aCArIDE7XG4gICAgY2hvbXBLZWVwID0gZmFsc2U7XG5cbiAgICBpZiAoIWluZGVudFNlcSAmJiBpbmRlbnRTaXplID49IDIgJiYgIWN0eC5pbkZsb3cgJiYgIWV4cGxpY2l0S2V5ICYmIHZhbHVlIGluc3RhbmNlb2YgWUFNTFNlcSAmJiB2YWx1ZS50eXBlICE9PSBQbGFpblZhbHVlLlR5cGUuRkxPV19TRVEgJiYgIXZhbHVlLnRhZyAmJiAhZG9jLmFuY2hvcnMuZ2V0TmFtZSh2YWx1ZSkpIHtcbiAgICAgIC8vIElmIGluZGVudFNlcSA9PT0gZmFsc2UsIGNvbnNpZGVyICctICcgYXMgcGFydCBvZiBpbmRlbnRhdGlvbiB3aGVyZSBwb3NzaWJsZVxuICAgICAgY3R4LmluZGVudCA9IGN0eC5pbmRlbnQuc3Vic3RyKDIpO1xuICAgIH1cblxuICAgIGNvbnN0IHZhbHVlU3RyID0gc3RyaW5naWZ5KHZhbHVlLCBjdHgsICgpID0+IHZhbHVlQ29tbWVudCA9IG51bGwsICgpID0+IGNob21wS2VlcCA9IHRydWUpO1xuICAgIGxldCB3cyA9ICcgJztcblxuICAgIGlmICh2Y2IgfHwgdGhpcy5jb21tZW50KSB7XG4gICAgICB3cyA9IGAke3ZjYn1cXG4ke2N0eC5pbmRlbnR9YDtcbiAgICB9IGVsc2UgaWYgKCFleHBsaWNpdEtleSAmJiB2YWx1ZSBpbnN0YW5jZW9mIENvbGxlY3Rpb24pIHtcbiAgICAgIGNvbnN0IGZsb3cgPSB2YWx1ZVN0clswXSA9PT0gJ1snIHx8IHZhbHVlU3RyWzBdID09PSAneyc7XG4gICAgICBpZiAoIWZsb3cgfHwgdmFsdWVTdHIuaW5jbHVkZXMoJ1xcbicpKSB3cyA9IGBcXG4ke2N0eC5pbmRlbnR9YDtcbiAgICB9IGVsc2UgaWYgKHZhbHVlU3RyWzBdID09PSAnXFxuJykgd3MgPSAnJztcblxuICAgIGlmIChjaG9tcEtlZXAgJiYgIXZhbHVlQ29tbWVudCAmJiBvbkNob21wS2VlcCkgb25DaG9tcEtlZXAoKTtcbiAgICByZXR1cm4gYWRkQ29tbWVudChzdHIgKyB3cyArIHZhbHVlU3RyLCBjdHguaW5kZW50LCB2YWx1ZUNvbW1lbnQpO1xuICB9XG5cbn1cblxuUGxhaW5WYWx1ZS5fZGVmaW5lUHJvcGVydHkoUGFpciwgXCJUeXBlXCIsIHtcbiAgUEFJUjogJ1BBSVInLFxuICBNRVJHRV9QQUlSOiAnTUVSR0VfUEFJUidcbn0pO1xuXG5jb25zdCBnZXRBbGlhc0NvdW50ID0gKG5vZGUsIGFuY2hvcnMpID0+IHtcbiAgaWYgKG5vZGUgaW5zdGFuY2VvZiBBbGlhcykge1xuICAgIGNvbnN0IGFuY2hvciA9IGFuY2hvcnMuZ2V0KG5vZGUuc291cmNlKTtcbiAgICByZXR1cm4gYW5jaG9yLmNvdW50ICogYW5jaG9yLmFsaWFzQ291bnQ7XG4gIH0gZWxzZSBpZiAobm9kZSBpbnN0YW5jZW9mIENvbGxlY3Rpb24pIHtcbiAgICBsZXQgY291bnQgPSAwO1xuXG4gICAgZm9yIChjb25zdCBpdGVtIG9mIG5vZGUuaXRlbXMpIHtcbiAgICAgIGNvbnN0IGMgPSBnZXRBbGlhc0NvdW50KGl0ZW0sIGFuY2hvcnMpO1xuICAgICAgaWYgKGMgPiBjb3VudCkgY291bnQgPSBjO1xuICAgIH1cblxuICAgIHJldHVybiBjb3VudDtcbiAgfSBlbHNlIGlmIChub2RlIGluc3RhbmNlb2YgUGFpcikge1xuICAgIGNvbnN0IGtjID0gZ2V0QWxpYXNDb3VudChub2RlLmtleSwgYW5jaG9ycyk7XG4gICAgY29uc3QgdmMgPSBnZXRBbGlhc0NvdW50KG5vZGUudmFsdWUsIGFuY2hvcnMpO1xuICAgIHJldHVybiBNYXRoLm1heChrYywgdmMpO1xuICB9XG5cbiAgcmV0dXJuIDE7XG59O1xuXG5jbGFzcyBBbGlhcyBleHRlbmRzIE5vZGUge1xuICBzdGF0aWMgc3RyaW5naWZ5KHtcbiAgICByYW5nZSxcbiAgICBzb3VyY2VcbiAgfSwge1xuICAgIGFuY2hvcnMsXG4gICAgZG9jLFxuICAgIGltcGxpY2l0S2V5LFxuICAgIGluU3RyaW5naWZ5S2V5XG4gIH0pIHtcbiAgICBsZXQgYW5jaG9yID0gT2JqZWN0LmtleXMoYW5jaG9ycykuZmluZChhID0+IGFuY2hvcnNbYV0gPT09IHNvdXJjZSk7XG4gICAgaWYgKCFhbmNob3IgJiYgaW5TdHJpbmdpZnlLZXkpIGFuY2hvciA9IGRvYy5hbmNob3JzLmdldE5hbWUoc291cmNlKSB8fCBkb2MuYW5jaG9ycy5uZXdOYW1lKCk7XG4gICAgaWYgKGFuY2hvcikgcmV0dXJuIGAqJHthbmNob3J9JHtpbXBsaWNpdEtleSA/ICcgJyA6ICcnfWA7XG4gICAgY29uc3QgbXNnID0gZG9jLmFuY2hvcnMuZ2V0TmFtZShzb3VyY2UpID8gJ0FsaWFzIG5vZGUgbXVzdCBiZSBhZnRlciBzb3VyY2Ugbm9kZScgOiAnU291cmNlIG5vZGUgbm90IGZvdW5kIGZvciBhbGlhcyBub2RlJztcbiAgICB0aHJvdyBuZXcgRXJyb3IoYCR7bXNnfSBbJHtyYW5nZX1dYCk7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihzb3VyY2UpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuc291cmNlID0gc291cmNlO1xuICAgIHRoaXMudHlwZSA9IFBsYWluVmFsdWUuVHlwZS5BTElBUztcbiAgfVxuXG4gIHNldCB0YWcodCkge1xuICAgIHRocm93IG5ldyBFcnJvcignQWxpYXMgbm9kZXMgY2Fubm90IGhhdmUgdGFncycpO1xuICB9XG5cbiAgdG9KU09OKGFyZywgY3R4KSB7XG4gICAgaWYgKCFjdHgpIHJldHVybiB0b0pTT04odGhpcy5zb3VyY2UsIGFyZywgY3R4KTtcbiAgICBjb25zdCB7XG4gICAgICBhbmNob3JzLFxuICAgICAgbWF4QWxpYXNDb3VudFxuICAgIH0gPSBjdHg7XG4gICAgY29uc3QgYW5jaG9yID0gYW5jaG9ycy5nZXQodGhpcy5zb3VyY2UpO1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuXG4gICAgaWYgKCFhbmNob3IgfHwgYW5jaG9yLnJlcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb25zdCBtc2cgPSAnVGhpcyBzaG91bGQgbm90IGhhcHBlbjogQWxpYXMgYW5jaG9yIHdhcyBub3QgcmVzb2x2ZWQ/JztcbiAgICAgIGlmICh0aGlzLmNzdE5vZGUpIHRocm93IG5ldyBQbGFpblZhbHVlLllBTUxSZWZlcmVuY2VFcnJvcih0aGlzLmNzdE5vZGUsIG1zZyk7ZWxzZSB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IobXNnKTtcbiAgICB9XG5cbiAgICBpZiAobWF4QWxpYXNDb3VudCA+PSAwKSB7XG4gICAgICBhbmNob3IuY291bnQgKz0gMTtcbiAgICAgIGlmIChhbmNob3IuYWxpYXNDb3VudCA9PT0gMCkgYW5jaG9yLmFsaWFzQ291bnQgPSBnZXRBbGlhc0NvdW50KHRoaXMuc291cmNlLCBhbmNob3JzKTtcblxuICAgICAgaWYgKGFuY2hvci5jb3VudCAqIGFuY2hvci5hbGlhc0NvdW50ID4gbWF4QWxpYXNDb3VudCkge1xuICAgICAgICBjb25zdCBtc2cgPSAnRXhjZXNzaXZlIGFsaWFzIGNvdW50IGluZGljYXRlcyBhIHJlc291cmNlIGV4aGF1c3Rpb24gYXR0YWNrJztcbiAgICAgICAgaWYgKHRoaXMuY3N0Tm9kZSkgdGhyb3cgbmV3IFBsYWluVmFsdWUuWUFNTFJlZmVyZW5jZUVycm9yKHRoaXMuY3N0Tm9kZSwgbXNnKTtlbHNlIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihtc2cpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBhbmNob3IucmVzO1xuICB9IC8vIE9ubHkgY2FsbGVkIHdoZW4gc3RyaW5naWZ5aW5nIGFuIGFsaWFzIG1hcHBpbmcga2V5IHdoaWxlIGNvbnN0cnVjdGluZ1xuICAvLyBPYmplY3Qgb3V0cHV0LlxuXG5cbiAgdG9TdHJpbmcoY3R4KSB7XG4gICAgcmV0dXJuIEFsaWFzLnN0cmluZ2lmeSh0aGlzLCBjdHgpO1xuICB9XG5cbn1cblxuUGxhaW5WYWx1ZS5fZGVmaW5lUHJvcGVydHkoQWxpYXMsIFwiZGVmYXVsdFwiLCB0cnVlKTtcblxuZnVuY3Rpb24gZmluZFBhaXIoaXRlbXMsIGtleSkge1xuICBjb25zdCBrID0ga2V5IGluc3RhbmNlb2YgU2NhbGFyID8ga2V5LnZhbHVlIDoga2V5O1xuXG4gIGZvciAoY29uc3QgaXQgb2YgaXRlbXMpIHtcbiAgICBpZiAoaXQgaW5zdGFuY2VvZiBQYWlyKSB7XG4gICAgICBpZiAoaXQua2V5ID09PSBrZXkgfHwgaXQua2V5ID09PSBrKSByZXR1cm4gaXQ7XG4gICAgICBpZiAoaXQua2V5ICYmIGl0LmtleS52YWx1ZSA9PT0gaykgcmV0dXJuIGl0O1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB1bmRlZmluZWQ7XG59XG5jbGFzcyBZQU1MTWFwIGV4dGVuZHMgQ29sbGVjdGlvbiB7XG4gIGFkZChwYWlyLCBvdmVyd3JpdGUpIHtcbiAgICBpZiAoIXBhaXIpIHBhaXIgPSBuZXcgUGFpcihwYWlyKTtlbHNlIGlmICghKHBhaXIgaW5zdGFuY2VvZiBQYWlyKSkgcGFpciA9IG5ldyBQYWlyKHBhaXIua2V5IHx8IHBhaXIsIHBhaXIudmFsdWUpO1xuICAgIGNvbnN0IHByZXYgPSBmaW5kUGFpcih0aGlzLml0ZW1zLCBwYWlyLmtleSk7XG4gICAgY29uc3Qgc29ydEVudHJpZXMgPSB0aGlzLnNjaGVtYSAmJiB0aGlzLnNjaGVtYS5zb3J0TWFwRW50cmllcztcblxuICAgIGlmIChwcmV2KSB7XG4gICAgICBpZiAob3ZlcndyaXRlKSBwcmV2LnZhbHVlID0gcGFpci52YWx1ZTtlbHNlIHRocm93IG5ldyBFcnJvcihgS2V5ICR7cGFpci5rZXl9IGFscmVhZHkgc2V0YCk7XG4gICAgfSBlbHNlIGlmIChzb3J0RW50cmllcykge1xuICAgICAgY29uc3QgaSA9IHRoaXMuaXRlbXMuZmluZEluZGV4KGl0ZW0gPT4gc29ydEVudHJpZXMocGFpciwgaXRlbSkgPCAwKTtcbiAgICAgIGlmIChpID09PSAtMSkgdGhpcy5pdGVtcy5wdXNoKHBhaXIpO2Vsc2UgdGhpcy5pdGVtcy5zcGxpY2UoaSwgMCwgcGFpcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaXRlbXMucHVzaChwYWlyKTtcbiAgICB9XG4gIH1cblxuICBkZWxldGUoa2V5KSB7XG4gICAgY29uc3QgaXQgPSBmaW5kUGFpcih0aGlzLml0ZW1zLCBrZXkpO1xuICAgIGlmICghaXQpIHJldHVybiBmYWxzZTtcbiAgICBjb25zdCBkZWwgPSB0aGlzLml0ZW1zLnNwbGljZSh0aGlzLml0ZW1zLmluZGV4T2YoaXQpLCAxKTtcbiAgICByZXR1cm4gZGVsLmxlbmd0aCA+IDA7XG4gIH1cblxuICBnZXQoa2V5LCBrZWVwU2NhbGFyKSB7XG4gICAgY29uc3QgaXQgPSBmaW5kUGFpcih0aGlzLml0ZW1zLCBrZXkpO1xuICAgIGNvbnN0IG5vZGUgPSBpdCAmJiBpdC52YWx1ZTtcbiAgICByZXR1cm4gIWtlZXBTY2FsYXIgJiYgbm9kZSBpbnN0YW5jZW9mIFNjYWxhciA/IG5vZGUudmFsdWUgOiBub2RlO1xuICB9XG5cbiAgaGFzKGtleSkge1xuICAgIHJldHVybiAhIWZpbmRQYWlyKHRoaXMuaXRlbXMsIGtleSk7XG4gIH1cblxuICBzZXQoa2V5LCB2YWx1ZSkge1xuICAgIHRoaXMuYWRkKG5ldyBQYWlyKGtleSwgdmFsdWUpLCB0cnVlKTtcbiAgfVxuICAvKipcbiAgICogQHBhcmFtIHsqfSBhcmcgaWdub3JlZFxuICAgKiBAcGFyYW0geyp9IGN0eCBDb252ZXJzaW9uIGNvbnRleHQsIG9yaWdpbmFsbHkgc2V0IGluIERvY3VtZW50I3RvSlNPTigpXG4gICAqIEBwYXJhbSB7Q2xhc3N9IFR5cGUgSWYgc2V0LCBmb3JjZXMgdGhlIHJldHVybmVkIGNvbGxlY3Rpb24gdHlwZVxuICAgKiBAcmV0dXJucyB7Kn0gSW5zdGFuY2Ugb2YgVHlwZSwgTWFwLCBvciBPYmplY3RcbiAgICovXG5cblxuICB0b0pTT04oXywgY3R4LCBUeXBlKSB7XG4gICAgY29uc3QgbWFwID0gVHlwZSA/IG5ldyBUeXBlKCkgOiBjdHggJiYgY3R4Lm1hcEFzTWFwID8gbmV3IE1hcCgpIDoge307XG4gICAgaWYgKGN0eCAmJiBjdHgub25DcmVhdGUpIGN0eC5vbkNyZWF0ZShtYXApO1xuXG4gICAgZm9yIChjb25zdCBpdGVtIG9mIHRoaXMuaXRlbXMpIGl0ZW0uYWRkVG9KU01hcChjdHgsIG1hcCk7XG5cbiAgICByZXR1cm4gbWFwO1xuICB9XG5cbiAgdG9TdHJpbmcoY3R4LCBvbkNvbW1lbnQsIG9uQ2hvbXBLZWVwKSB7XG4gICAgaWYgKCFjdHgpIHJldHVybiBKU09OLnN0cmluZ2lmeSh0aGlzKTtcblxuICAgIGZvciAoY29uc3QgaXRlbSBvZiB0aGlzLml0ZW1zKSB7XG4gICAgICBpZiAoIShpdGVtIGluc3RhbmNlb2YgUGFpcikpIHRocm93IG5ldyBFcnJvcihgTWFwIGl0ZW1zIG11c3QgYWxsIGJlIHBhaXJzOyBmb3VuZCAke0pTT04uc3RyaW5naWZ5KGl0ZW0pfSBpbnN0ZWFkYCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN1cGVyLnRvU3RyaW5nKGN0eCwge1xuICAgICAgYmxvY2tJdGVtOiBuID0+IG4uc3RyLFxuICAgICAgZmxvd0NoYXJzOiB7XG4gICAgICAgIHN0YXJ0OiAneycsXG4gICAgICAgIGVuZDogJ30nXG4gICAgICB9LFxuICAgICAgaXNNYXA6IHRydWUsXG4gICAgICBpdGVtSW5kZW50OiBjdHguaW5kZW50IHx8ICcnXG4gICAgfSwgb25Db21tZW50LCBvbkNob21wS2VlcCk7XG4gIH1cblxufVxuXG5jb25zdCBNRVJHRV9LRVkgPSAnPDwnO1xuY2xhc3MgTWVyZ2UgZXh0ZW5kcyBQYWlyIHtcbiAgY29uc3RydWN0b3IocGFpcikge1xuICAgIGlmIChwYWlyIGluc3RhbmNlb2YgUGFpcikge1xuICAgICAgbGV0IHNlcSA9IHBhaXIudmFsdWU7XG5cbiAgICAgIGlmICghKHNlcSBpbnN0YW5jZW9mIFlBTUxTZXEpKSB7XG4gICAgICAgIHNlcSA9IG5ldyBZQU1MU2VxKCk7XG4gICAgICAgIHNlcS5pdGVtcy5wdXNoKHBhaXIudmFsdWUpO1xuICAgICAgICBzZXEucmFuZ2UgPSBwYWlyLnZhbHVlLnJhbmdlO1xuICAgICAgfVxuXG4gICAgICBzdXBlcihwYWlyLmtleSwgc2VxKTtcbiAgICAgIHRoaXMucmFuZ2UgPSBwYWlyLnJhbmdlO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdXBlcihuZXcgU2NhbGFyKE1FUkdFX0tFWSksIG5ldyBZQU1MU2VxKCkpO1xuICAgIH1cblxuICAgIHRoaXMudHlwZSA9IFBhaXIuVHlwZS5NRVJHRV9QQUlSO1xuICB9IC8vIElmIHRoZSB2YWx1ZSBhc3NvY2lhdGVkIHdpdGggYSBtZXJnZSBrZXkgaXMgYSBzaW5nbGUgbWFwcGluZyBub2RlLCBlYWNoIG9mXG4gIC8vIGl0cyBrZXkvdmFsdWUgcGFpcnMgaXMgaW5zZXJ0ZWQgaW50byB0aGUgY3VycmVudCBtYXBwaW5nLCB1bmxlc3MgdGhlIGtleVxuICAvLyBhbHJlYWR5IGV4aXN0cyBpbiBpdC4gSWYgdGhlIHZhbHVlIGFzc29jaWF0ZWQgd2l0aCB0aGUgbWVyZ2Uga2V5IGlzIGFcbiAgLy8gc2VxdWVuY2UsIHRoZW4gdGhpcyBzZXF1ZW5jZSBpcyBleHBlY3RlZCB0byBjb250YWluIG1hcHBpbmcgbm9kZXMgYW5kIGVhY2hcbiAgLy8gb2YgdGhlc2Ugbm9kZXMgaXMgbWVyZ2VkIGluIHR1cm4gYWNjb3JkaW5nIHRvIGl0cyBvcmRlciBpbiB0aGUgc2VxdWVuY2UuXG4gIC8vIEtleXMgaW4gbWFwcGluZyBub2RlcyBlYXJsaWVyIGluIHRoZSBzZXF1ZW5jZSBvdmVycmlkZSBrZXlzIHNwZWNpZmllZCBpblxuICAvLyBsYXRlciBtYXBwaW5nIG5vZGVzLiAtLSBodHRwOi8veWFtbC5vcmcvdHlwZS9tZXJnZS5odG1sXG5cblxuICBhZGRUb0pTTWFwKGN0eCwgbWFwKSB7XG4gICAgZm9yIChjb25zdCB7XG4gICAgICBzb3VyY2VcbiAgICB9IG9mIHRoaXMudmFsdWUuaXRlbXMpIHtcbiAgICAgIGlmICghKHNvdXJjZSBpbnN0YW5jZW9mIFlBTUxNYXApKSB0aHJvdyBuZXcgRXJyb3IoJ01lcmdlIHNvdXJjZXMgbXVzdCBiZSBtYXBzJyk7XG4gICAgICBjb25zdCBzcmNNYXAgPSBzb3VyY2UudG9KU09OKG51bGwsIGN0eCwgTWFwKTtcblxuICAgICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2Ygc3JjTWFwKSB7XG4gICAgICAgIGlmIChtYXAgaW5zdGFuY2VvZiBNYXApIHtcbiAgICAgICAgICBpZiAoIW1hcC5oYXMoa2V5KSkgbWFwLnNldChrZXksIHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIGlmIChtYXAgaW5zdGFuY2VvZiBTZXQpIHtcbiAgICAgICAgICBtYXAuYWRkKGtleSk7XG4gICAgICAgIH0gZWxzZSBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtYXAsIGtleSkpIHtcbiAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobWFwLCBrZXksIHtcbiAgICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbWFwO1xuICB9XG5cbiAgdG9TdHJpbmcoY3R4LCBvbkNvbW1lbnQpIHtcbiAgICBjb25zdCBzZXEgPSB0aGlzLnZhbHVlO1xuICAgIGlmIChzZXEuaXRlbXMubGVuZ3RoID4gMSkgcmV0dXJuIHN1cGVyLnRvU3RyaW5nKGN0eCwgb25Db21tZW50KTtcbiAgICB0aGlzLnZhbHVlID0gc2VxLml0ZW1zWzBdO1xuICAgIGNvbnN0IHN0ciA9IHN1cGVyLnRvU3RyaW5nKGN0eCwgb25Db21tZW50KTtcbiAgICB0aGlzLnZhbHVlID0gc2VxO1xuICAgIHJldHVybiBzdHI7XG4gIH1cblxufVxuXG5jb25zdCBiaW5hcnlPcHRpb25zID0ge1xuICBkZWZhdWx0VHlwZTogUGxhaW5WYWx1ZS5UeXBlLkJMT0NLX0xJVEVSQUwsXG4gIGxpbmVXaWR0aDogNzZcbn07XG5jb25zdCBib29sT3B0aW9ucyA9IHtcbiAgdHJ1ZVN0cjogJ3RydWUnLFxuICBmYWxzZVN0cjogJ2ZhbHNlJ1xufTtcbmNvbnN0IGludE9wdGlvbnMgPSB7XG4gIGFzQmlnSW50OiBmYWxzZVxufTtcbmNvbnN0IG51bGxPcHRpb25zID0ge1xuICBudWxsU3RyOiAnbnVsbCdcbn07XG5jb25zdCBzdHJPcHRpb25zID0ge1xuICBkZWZhdWx0VHlwZTogUGxhaW5WYWx1ZS5UeXBlLlBMQUlOLFxuICBkb3VibGVRdW90ZWQ6IHtcbiAgICBqc29uRW5jb2Rpbmc6IGZhbHNlLFxuICAgIG1pbk11bHRpTGluZUxlbmd0aDogNDBcbiAgfSxcbiAgZm9sZDoge1xuICAgIGxpbmVXaWR0aDogODAsXG4gICAgbWluQ29udGVudFdpZHRoOiAyMFxuICB9XG59O1xuXG5mdW5jdGlvbiByZXNvbHZlU2NhbGFyKHN0ciwgdGFncywgc2NhbGFyRmFsbGJhY2spIHtcbiAgZm9yIChjb25zdCB7XG4gICAgZm9ybWF0LFxuICAgIHRlc3QsXG4gICAgcmVzb2x2ZVxuICB9IG9mIHRhZ3MpIHtcbiAgICBpZiAodGVzdCkge1xuICAgICAgY29uc3QgbWF0Y2ggPSBzdHIubWF0Y2godGVzdCk7XG5cbiAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICBsZXQgcmVzID0gcmVzb2x2ZS5hcHBseShudWxsLCBtYXRjaCk7XG4gICAgICAgIGlmICghKHJlcyBpbnN0YW5jZW9mIFNjYWxhcikpIHJlcyA9IG5ldyBTY2FsYXIocmVzKTtcbiAgICAgICAgaWYgKGZvcm1hdCkgcmVzLmZvcm1hdCA9IGZvcm1hdDtcbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpZiAoc2NhbGFyRmFsbGJhY2spIHN0ciA9IHNjYWxhckZhbGxiYWNrKHN0cik7XG4gIHJldHVybiBuZXcgU2NhbGFyKHN0cik7XG59XG5cbmNvbnN0IEZPTERfRkxPVyA9ICdmbG93JztcbmNvbnN0IEZPTERfQkxPQ0sgPSAnYmxvY2snO1xuY29uc3QgRk9MRF9RVU9URUQgPSAncXVvdGVkJzsgLy8gcHJlc3VtZXMgaSsxIGlzIGF0IHRoZSBzdGFydCBvZiBhIGxpbmVcbi8vIHJldHVybnMgaW5kZXggb2YgbGFzdCBuZXdsaW5lIGluIG1vcmUtaW5kZW50ZWQgYmxvY2tcblxuY29uc3QgY29uc3VtZU1vcmVJbmRlbnRlZExpbmVzID0gKHRleHQsIGkpID0+IHtcbiAgbGV0IGNoID0gdGV4dFtpICsgMV07XG5cbiAgd2hpbGUgKGNoID09PSAnICcgfHwgY2ggPT09ICdcXHQnKSB7XG4gICAgZG8ge1xuICAgICAgY2ggPSB0ZXh0W2kgKz0gMV07XG4gICAgfSB3aGlsZSAoY2ggJiYgY2ggIT09ICdcXG4nKTtcblxuICAgIGNoID0gdGV4dFtpICsgMV07XG4gIH1cblxuICByZXR1cm4gaTtcbn07XG4vKipcbiAqIFRyaWVzIHRvIGtlZXAgaW5wdXQgYXQgdXAgdG8gYGxpbmVXaWR0aGAgY2hhcmFjdGVycywgc3BsaXR0aW5nIG9ubHkgb24gc3BhY2VzXG4gKiBub3QgZm9sbG93ZWQgYnkgbmV3bGluZXMgb3Igc3BhY2VzIHVubGVzcyBgbW9kZWAgaXMgYCdxdW90ZWQnYC4gTGluZXMgYXJlXG4gKiB0ZXJtaW5hdGVkIHdpdGggYFxcbmAgYW5kIHN0YXJ0ZWQgd2l0aCBgaW5kZW50YC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxuICogQHBhcmFtIHtzdHJpbmd9IGluZGVudFxuICogQHBhcmFtIHtzdHJpbmd9IFttb2RlPSdmbG93J10gYCdibG9jaydgIHByZXZlbnRzIG1vcmUtaW5kZW50ZWQgbGluZXNcbiAqICAgZnJvbSBiZWluZyBmb2xkZWQ7IGAncXVvdGVkJ2AgYWxsb3dzIGZvciBgXFxgIGVzY2FwZXMsIGluY2x1ZGluZyBlc2NhcGVkXG4gKiAgIG5ld2xpbmVzXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLmluZGVudEF0U3RhcnRdIEFjY291bnRzIGZvciBsZWFkaW5nIGNvbnRlbnRzIG9uXG4gKiAgIHRoZSBmaXJzdCBsaW5lLCBkZWZhdWx0aW5nIHRvIGBpbmRlbnQubGVuZ3RoYFxuICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLmxpbmVXaWR0aD04MF1cbiAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5taW5Db250ZW50V2lkdGg9MjBdIEFsbG93IGhpZ2hseSBpbmRlbnRlZCBsaW5lcyB0b1xuICogICBzdHJldGNoIHRoZSBsaW5lIHdpZHRoIG9yIGluZGVudCBjb250ZW50IGZyb20gdGhlIHN0YXJ0XG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBvcHRpb25zLm9uRm9sZCBDYWxsZWQgb25jZSBpZiB0aGUgdGV4dCBpcyBmb2xkZWRcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IG9wdGlvbnMub25Gb2xkIENhbGxlZCBvbmNlIGlmIGFueSBsaW5lIG9mIHRleHQgZXhjZWVkc1xuICogICBsaW5lV2lkdGggY2hhcmFjdGVyc1xuICovXG5cblxuZnVuY3Rpb24gZm9sZEZsb3dMaW5lcyh0ZXh0LCBpbmRlbnQsIG1vZGUsIHtcbiAgaW5kZW50QXRTdGFydCxcbiAgbGluZVdpZHRoID0gODAsXG4gIG1pbkNvbnRlbnRXaWR0aCA9IDIwLFxuICBvbkZvbGQsXG4gIG9uT3ZlcmZsb3dcbn0pIHtcbiAgaWYgKCFsaW5lV2lkdGggfHwgbGluZVdpZHRoIDwgMCkgcmV0dXJuIHRleHQ7XG4gIGNvbnN0IGVuZFN0ZXAgPSBNYXRoLm1heCgxICsgbWluQ29udGVudFdpZHRoLCAxICsgbGluZVdpZHRoIC0gaW5kZW50Lmxlbmd0aCk7XG4gIGlmICh0ZXh0Lmxlbmd0aCA8PSBlbmRTdGVwKSByZXR1cm4gdGV4dDtcbiAgY29uc3QgZm9sZHMgPSBbXTtcbiAgY29uc3QgZXNjYXBlZEZvbGRzID0ge307XG4gIGxldCBlbmQgPSBsaW5lV2lkdGggLSBpbmRlbnQubGVuZ3RoO1xuXG4gIGlmICh0eXBlb2YgaW5kZW50QXRTdGFydCA9PT0gJ251bWJlcicpIHtcbiAgICBpZiAoaW5kZW50QXRTdGFydCA+IGxpbmVXaWR0aCAtIE1hdGgubWF4KDIsIG1pbkNvbnRlbnRXaWR0aCkpIGZvbGRzLnB1c2goMCk7ZWxzZSBlbmQgPSBsaW5lV2lkdGggLSBpbmRlbnRBdFN0YXJ0O1xuICB9XG5cbiAgbGV0IHNwbGl0ID0gdW5kZWZpbmVkO1xuICBsZXQgcHJldiA9IHVuZGVmaW5lZDtcbiAgbGV0IG92ZXJmbG93ID0gZmFsc2U7XG4gIGxldCBpID0gLTE7XG4gIGxldCBlc2NTdGFydCA9IC0xO1xuICBsZXQgZXNjRW5kID0gLTE7XG5cbiAgaWYgKG1vZGUgPT09IEZPTERfQkxPQ0spIHtcbiAgICBpID0gY29uc3VtZU1vcmVJbmRlbnRlZExpbmVzKHRleHQsIGkpO1xuICAgIGlmIChpICE9PSAtMSkgZW5kID0gaSArIGVuZFN0ZXA7XG4gIH1cblxuICBmb3IgKGxldCBjaDsgY2ggPSB0ZXh0W2kgKz0gMV07KSB7XG4gICAgaWYgKG1vZGUgPT09IEZPTERfUVVPVEVEICYmIGNoID09PSAnXFxcXCcpIHtcbiAgICAgIGVzY1N0YXJ0ID0gaTtcblxuICAgICAgc3dpdGNoICh0ZXh0W2kgKyAxXSkge1xuICAgICAgICBjYXNlICd4JzpcbiAgICAgICAgICBpICs9IDM7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAndSc6XG4gICAgICAgICAgaSArPSA1O1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ1UnOlxuICAgICAgICAgIGkgKz0gOTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGkgKz0gMTtcbiAgICAgIH1cblxuICAgICAgZXNjRW5kID0gaTtcbiAgICB9XG5cbiAgICBpZiAoY2ggPT09ICdcXG4nKSB7XG4gICAgICBpZiAobW9kZSA9PT0gRk9MRF9CTE9DSykgaSA9IGNvbnN1bWVNb3JlSW5kZW50ZWRMaW5lcyh0ZXh0LCBpKTtcbiAgICAgIGVuZCA9IGkgKyBlbmRTdGVwO1xuICAgICAgc3BsaXQgPSB1bmRlZmluZWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChjaCA9PT0gJyAnICYmIHByZXYgJiYgcHJldiAhPT0gJyAnICYmIHByZXYgIT09ICdcXG4nICYmIHByZXYgIT09ICdcXHQnKSB7XG4gICAgICAgIC8vIHNwYWNlIHN1cnJvdW5kZWQgYnkgbm9uLXNwYWNlIGNhbiBiZSByZXBsYWNlZCB3aXRoIG5ld2xpbmUgKyBpbmRlbnRcbiAgICAgICAgY29uc3QgbmV4dCA9IHRleHRbaSArIDFdO1xuICAgICAgICBpZiAobmV4dCAmJiBuZXh0ICE9PSAnICcgJiYgbmV4dCAhPT0gJ1xcbicgJiYgbmV4dCAhPT0gJ1xcdCcpIHNwbGl0ID0gaTtcbiAgICAgIH1cblxuICAgICAgaWYgKGkgPj0gZW5kKSB7XG4gICAgICAgIGlmIChzcGxpdCkge1xuICAgICAgICAgIGZvbGRzLnB1c2goc3BsaXQpO1xuICAgICAgICAgIGVuZCA9IHNwbGl0ICsgZW5kU3RlcDtcbiAgICAgICAgICBzcGxpdCA9IHVuZGVmaW5lZDtcbiAgICAgICAgfSBlbHNlIGlmIChtb2RlID09PSBGT0xEX1FVT1RFRCkge1xuICAgICAgICAgIC8vIHdoaXRlLXNwYWNlIGNvbGxlY3RlZCBhdCBlbmQgbWF5IHN0cmV0Y2ggcGFzdCBsaW5lV2lkdGhcbiAgICAgICAgICB3aGlsZSAocHJldiA9PT0gJyAnIHx8IHByZXYgPT09ICdcXHQnKSB7XG4gICAgICAgICAgICBwcmV2ID0gY2g7XG4gICAgICAgICAgICBjaCA9IHRleHRbaSArPSAxXTtcbiAgICAgICAgICAgIG92ZXJmbG93ID0gdHJ1ZTtcbiAgICAgICAgICB9IC8vIEFjY291bnQgZm9yIG5ld2xpbmUgZXNjYXBlLCBidXQgZG9uJ3QgYnJlYWsgcHJlY2VkaW5nIGVzY2FwZVxuXG5cbiAgICAgICAgICBjb25zdCBqID0gaSA+IGVzY0VuZCArIDEgPyBpIC0gMiA6IGVzY1N0YXJ0IC0gMTsgLy8gQmFpbCBvdXQgaWYgbGluZVdpZHRoICYgbWluQ29udGVudFdpZHRoIGFyZSBzaG9ydGVyIHRoYW4gYW4gZXNjYXBlIHN0cmluZ1xuXG4gICAgICAgICAgaWYgKGVzY2FwZWRGb2xkc1tqXSkgcmV0dXJuIHRleHQ7XG4gICAgICAgICAgZm9sZHMucHVzaChqKTtcbiAgICAgICAgICBlc2NhcGVkRm9sZHNbal0gPSB0cnVlO1xuICAgICAgICAgIGVuZCA9IGogKyBlbmRTdGVwO1xuICAgICAgICAgIHNwbGl0ID0gdW5kZWZpbmVkO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG92ZXJmbG93ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHByZXYgPSBjaDtcbiAgfVxuXG4gIGlmIChvdmVyZmxvdyAmJiBvbk92ZXJmbG93KSBvbk92ZXJmbG93KCk7XG4gIGlmIChmb2xkcy5sZW5ndGggPT09IDApIHJldHVybiB0ZXh0O1xuICBpZiAob25Gb2xkKSBvbkZvbGQoKTtcbiAgbGV0IHJlcyA9IHRleHQuc2xpY2UoMCwgZm9sZHNbMF0pO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZm9sZHMubGVuZ3RoOyArK2kpIHtcbiAgICBjb25zdCBmb2xkID0gZm9sZHNbaV07XG4gICAgY29uc3QgZW5kID0gZm9sZHNbaSArIDFdIHx8IHRleHQubGVuZ3RoO1xuICAgIGlmIChmb2xkID09PSAwKSByZXMgPSBgXFxuJHtpbmRlbnR9JHt0ZXh0LnNsaWNlKDAsIGVuZCl9YDtlbHNlIHtcbiAgICAgIGlmIChtb2RlID09PSBGT0xEX1FVT1RFRCAmJiBlc2NhcGVkRm9sZHNbZm9sZF0pIHJlcyArPSBgJHt0ZXh0W2ZvbGRdfVxcXFxgO1xuICAgICAgcmVzICs9IGBcXG4ke2luZGVudH0ke3RleHQuc2xpY2UoZm9sZCArIDEsIGVuZCl9YDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzO1xufVxuXG5jb25zdCBnZXRGb2xkT3B0aW9ucyA9ICh7XG4gIGluZGVudEF0U3RhcnRcbn0pID0+IGluZGVudEF0U3RhcnQgPyBPYmplY3QuYXNzaWduKHtcbiAgaW5kZW50QXRTdGFydFxufSwgc3RyT3B0aW9ucy5mb2xkKSA6IHN0ck9wdGlvbnMuZm9sZDsgLy8gQWxzbyBjaGVja3MgZm9yIGxpbmVzIHN0YXJ0aW5nIHdpdGggJSwgYXMgcGFyc2luZyB0aGUgb3V0cHV0IGFzIFlBTUwgMS4xIHdpbGxcbi8vIHByZXN1bWUgdGhhdCdzIHN0YXJ0aW5nIGEgbmV3IGRvY3VtZW50LlxuXG5cbmNvbnN0IGNvbnRhaW5zRG9jdW1lbnRNYXJrZXIgPSBzdHIgPT4gL14oJXwtLS18XFwuXFwuXFwuKS9tLnRlc3Qoc3RyKTtcblxuZnVuY3Rpb24gbGluZUxlbmd0aE92ZXJMaW1pdChzdHIsIGxpbmVXaWR0aCwgaW5kZW50TGVuZ3RoKSB7XG4gIGlmICghbGluZVdpZHRoIHx8IGxpbmVXaWR0aCA8IDApIHJldHVybiBmYWxzZTtcbiAgY29uc3QgbGltaXQgPSBsaW5lV2lkdGggLSBpbmRlbnRMZW5ndGg7XG4gIGNvbnN0IHN0ckxlbiA9IHN0ci5sZW5ndGg7XG4gIGlmIChzdHJMZW4gPD0gbGltaXQpIHJldHVybiBmYWxzZTtcblxuICBmb3IgKGxldCBpID0gMCwgc3RhcnQgPSAwOyBpIDwgc3RyTGVuOyArK2kpIHtcbiAgICBpZiAoc3RyW2ldID09PSAnXFxuJykge1xuICAgICAgaWYgKGkgLSBzdGFydCA+IGxpbWl0KSByZXR1cm4gdHJ1ZTtcbiAgICAgIHN0YXJ0ID0gaSArIDE7XG4gICAgICBpZiAoc3RyTGVuIC0gc3RhcnQgPD0gbGltaXQpIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gZG91YmxlUXVvdGVkU3RyaW5nKHZhbHVlLCBjdHgpIHtcbiAgY29uc3Qge1xuICAgIGltcGxpY2l0S2V5XG4gIH0gPSBjdHg7XG4gIGNvbnN0IHtcbiAgICBqc29uRW5jb2RpbmcsXG4gICAgbWluTXVsdGlMaW5lTGVuZ3RoXG4gIH0gPSBzdHJPcHRpb25zLmRvdWJsZVF1b3RlZDtcbiAgY29uc3QganNvbiA9IEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcbiAgaWYgKGpzb25FbmNvZGluZykgcmV0dXJuIGpzb247XG4gIGNvbnN0IGluZGVudCA9IGN0eC5pbmRlbnQgfHwgKGNvbnRhaW5zRG9jdW1lbnRNYXJrZXIodmFsdWUpID8gJyAgJyA6ICcnKTtcbiAgbGV0IHN0ciA9ICcnO1xuICBsZXQgc3RhcnQgPSAwO1xuXG4gIGZvciAobGV0IGkgPSAwLCBjaCA9IGpzb25baV07IGNoOyBjaCA9IGpzb25bKytpXSkge1xuICAgIGlmIChjaCA9PT0gJyAnICYmIGpzb25baSArIDFdID09PSAnXFxcXCcgJiYganNvbltpICsgMl0gPT09ICduJykge1xuICAgICAgLy8gc3BhY2UgYmVmb3JlIG5ld2xpbmUgbmVlZHMgdG8gYmUgZXNjYXBlZCB0byBub3QgYmUgZm9sZGVkXG4gICAgICBzdHIgKz0ganNvbi5zbGljZShzdGFydCwgaSkgKyAnXFxcXCAnO1xuICAgICAgaSArPSAxO1xuICAgICAgc3RhcnQgPSBpO1xuICAgICAgY2ggPSAnXFxcXCc7XG4gICAgfVxuXG4gICAgaWYgKGNoID09PSAnXFxcXCcpIHN3aXRjaCAoanNvbltpICsgMV0pIHtcbiAgICAgIGNhc2UgJ3UnOlxuICAgICAgICB7XG4gICAgICAgICAgc3RyICs9IGpzb24uc2xpY2Uoc3RhcnQsIGkpO1xuICAgICAgICAgIGNvbnN0IGNvZGUgPSBqc29uLnN1YnN0cihpICsgMiwgNCk7XG5cbiAgICAgICAgICBzd2l0Y2ggKGNvZGUpIHtcbiAgICAgICAgICAgIGNhc2UgJzAwMDAnOlxuICAgICAgICAgICAgICBzdHIgKz0gJ1xcXFwwJztcbiAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJzAwMDcnOlxuICAgICAgICAgICAgICBzdHIgKz0gJ1xcXFxhJztcbiAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJzAwMGInOlxuICAgICAgICAgICAgICBzdHIgKz0gJ1xcXFx2JztcbiAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJzAwMWInOlxuICAgICAgICAgICAgICBzdHIgKz0gJ1xcXFxlJztcbiAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJzAwODUnOlxuICAgICAgICAgICAgICBzdHIgKz0gJ1xcXFxOJztcbiAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJzAwYTAnOlxuICAgICAgICAgICAgICBzdHIgKz0gJ1xcXFxfJztcbiAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJzIwMjgnOlxuICAgICAgICAgICAgICBzdHIgKz0gJ1xcXFxMJztcbiAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJzIwMjknOlxuICAgICAgICAgICAgICBzdHIgKz0gJ1xcXFxQJztcbiAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIGlmIChjb2RlLnN1YnN0cigwLCAyKSA9PT0gJzAwJykgc3RyICs9ICdcXFxceCcgKyBjb2RlLnN1YnN0cigyKTtlbHNlIHN0ciArPSBqc29uLnN1YnN0cihpLCA2KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpICs9IDU7XG4gICAgICAgICAgc3RhcnQgPSBpICsgMTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnbic6XG4gICAgICAgIGlmIChpbXBsaWNpdEtleSB8fCBqc29uW2kgKyAyXSA9PT0gJ1wiJyB8fCBqc29uLmxlbmd0aCA8IG1pbk11bHRpTGluZUxlbmd0aCkge1xuICAgICAgICAgIGkgKz0gMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBmb2xkaW5nIHdpbGwgZWF0IGZpcnN0IG5ld2xpbmVcbiAgICAgICAgICBzdHIgKz0ganNvbi5zbGljZShzdGFydCwgaSkgKyAnXFxuXFxuJztcblxuICAgICAgICAgIHdoaWxlIChqc29uW2kgKyAyXSA9PT0gJ1xcXFwnICYmIGpzb25baSArIDNdID09PSAnbicgJiYganNvbltpICsgNF0gIT09ICdcIicpIHtcbiAgICAgICAgICAgIHN0ciArPSAnXFxuJztcbiAgICAgICAgICAgIGkgKz0gMjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBzdHIgKz0gaW5kZW50OyAvLyBzcGFjZSBhZnRlciBuZXdsaW5lIG5lZWRzIHRvIGJlIGVzY2FwZWQgdG8gbm90IGJlIGZvbGRlZFxuXG4gICAgICAgICAgaWYgKGpzb25baSArIDJdID09PSAnICcpIHN0ciArPSAnXFxcXCc7XG4gICAgICAgICAgaSArPSAxO1xuICAgICAgICAgIHN0YXJ0ID0gaSArIDE7XG4gICAgICAgIH1cblxuICAgICAgICBicmVhaztcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgaSArPSAxO1xuICAgIH1cbiAgfVxuXG4gIHN0ciA9IHN0YXJ0ID8gc3RyICsganNvbi5zbGljZShzdGFydCkgOiBqc29uO1xuICByZXR1cm4gaW1wbGljaXRLZXkgPyBzdHIgOiBmb2xkRmxvd0xpbmVzKHN0ciwgaW5kZW50LCBGT0xEX1FVT1RFRCwgZ2V0Rm9sZE9wdGlvbnMoY3R4KSk7XG59XG5cbmZ1bmN0aW9uIHNpbmdsZVF1b3RlZFN0cmluZyh2YWx1ZSwgY3R4KSB7XG4gIGlmIChjdHguaW1wbGljaXRLZXkpIHtcbiAgICBpZiAoL1xcbi8udGVzdCh2YWx1ZSkpIHJldHVybiBkb3VibGVRdW90ZWRTdHJpbmcodmFsdWUsIGN0eCk7XG4gIH0gZWxzZSB7XG4gICAgLy8gc2luZ2xlIHF1b3RlZCBzdHJpbmcgY2FuJ3QgaGF2ZSBsZWFkaW5nIG9yIHRyYWlsaW5nIHdoaXRlc3BhY2UgYXJvdW5kIG5ld2xpbmVcbiAgICBpZiAoL1sgXFx0XVxcbnxcXG5bIFxcdF0vLnRlc3QodmFsdWUpKSByZXR1cm4gZG91YmxlUXVvdGVkU3RyaW5nKHZhbHVlLCBjdHgpO1xuICB9XG5cbiAgY29uc3QgaW5kZW50ID0gY3R4LmluZGVudCB8fCAoY29udGFpbnNEb2N1bWVudE1hcmtlcih2YWx1ZSkgPyAnICAnIDogJycpO1xuICBjb25zdCByZXMgPSBcIidcIiArIHZhbHVlLnJlcGxhY2UoLycvZywgXCInJ1wiKS5yZXBsYWNlKC9cXG4rL2csIGAkJlxcbiR7aW5kZW50fWApICsgXCInXCI7XG4gIHJldHVybiBjdHguaW1wbGljaXRLZXkgPyByZXMgOiBmb2xkRmxvd0xpbmVzKHJlcywgaW5kZW50LCBGT0xEX0ZMT1csIGdldEZvbGRPcHRpb25zKGN0eCkpO1xufVxuXG5mdW5jdGlvbiBibG9ja1N0cmluZyh7XG4gIGNvbW1lbnQsXG4gIHR5cGUsXG4gIHZhbHVlXG59LCBjdHgsIG9uQ29tbWVudCwgb25DaG9tcEtlZXApIHtcbiAgLy8gMS4gQmxvY2sgY2FuJ3QgZW5kIGluIHdoaXRlc3BhY2UgdW5sZXNzIHRoZSBsYXN0IGxpbmUgaXMgbm9uLWVtcHR5LlxuICAvLyAyLiBTdHJpbmdzIGNvbnNpc3Rpbmcgb2Ygb25seSB3aGl0ZXNwYWNlIGFyZSBiZXN0IHJlbmRlcmVkIGV4cGxpY2l0bHkuXG4gIGlmICgvXFxuW1xcdCBdKyQvLnRlc3QodmFsdWUpIHx8IC9eXFxzKiQvLnRlc3QodmFsdWUpKSB7XG4gICAgcmV0dXJuIGRvdWJsZVF1b3RlZFN0cmluZyh2YWx1ZSwgY3R4KTtcbiAgfVxuXG4gIGNvbnN0IGluZGVudCA9IGN0eC5pbmRlbnQgfHwgKGN0eC5mb3JjZUJsb2NrSW5kZW50IHx8IGNvbnRhaW5zRG9jdW1lbnRNYXJrZXIodmFsdWUpID8gJyAgJyA6ICcnKTtcbiAgY29uc3QgaW5kZW50U2l6ZSA9IGluZGVudCA/ICcyJyA6ICcxJzsgLy8gcm9vdCBpcyBhdCAtMVxuXG4gIGNvbnN0IGxpdGVyYWwgPSB0eXBlID09PSBQbGFpblZhbHVlLlR5cGUuQkxPQ0tfRk9MREVEID8gZmFsc2UgOiB0eXBlID09PSBQbGFpblZhbHVlLlR5cGUuQkxPQ0tfTElURVJBTCA/IHRydWUgOiAhbGluZUxlbmd0aE92ZXJMaW1pdCh2YWx1ZSwgc3RyT3B0aW9ucy5mb2xkLmxpbmVXaWR0aCwgaW5kZW50Lmxlbmd0aCk7XG4gIGxldCBoZWFkZXIgPSBsaXRlcmFsID8gJ3wnIDogJz4nO1xuICBpZiAoIXZhbHVlKSByZXR1cm4gaGVhZGVyICsgJ1xcbic7XG4gIGxldCB3c1N0YXJ0ID0gJyc7XG4gIGxldCB3c0VuZCA9ICcnO1xuICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoL1tcXG5cXHQgXSokLywgd3MgPT4ge1xuICAgIGNvbnN0IG4gPSB3cy5pbmRleE9mKCdcXG4nKTtcblxuICAgIGlmIChuID09PSAtMSkge1xuICAgICAgaGVhZGVyICs9ICctJzsgLy8gc3RyaXBcbiAgICB9IGVsc2UgaWYgKHZhbHVlID09PSB3cyB8fCBuICE9PSB3cy5sZW5ndGggLSAxKSB7XG4gICAgICBoZWFkZXIgKz0gJysnOyAvLyBrZWVwXG5cbiAgICAgIGlmIChvbkNob21wS2VlcCkgb25DaG9tcEtlZXAoKTtcbiAgICB9XG5cbiAgICB3c0VuZCA9IHdzLnJlcGxhY2UoL1xcbiQvLCAnJyk7XG4gICAgcmV0dXJuICcnO1xuICB9KS5yZXBsYWNlKC9eW1xcbiBdKi8sIHdzID0+IHtcbiAgICBpZiAod3MuaW5kZXhPZignICcpICE9PSAtMSkgaGVhZGVyICs9IGluZGVudFNpemU7XG4gICAgY29uc3QgbSA9IHdzLm1hdGNoKC8gKyQvKTtcblxuICAgIGlmIChtKSB7XG4gICAgICB3c1N0YXJ0ID0gd3Muc2xpY2UoMCwgLW1bMF0ubGVuZ3RoKTtcbiAgICAgIHJldHVybiBtWzBdO1xuICAgIH0gZWxzZSB7XG4gICAgICB3c1N0YXJ0ID0gd3M7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICB9KTtcbiAgaWYgKHdzRW5kKSB3c0VuZCA9IHdzRW5kLnJlcGxhY2UoL1xcbisoPyFcXG58JCkvZywgYCQmJHtpbmRlbnR9YCk7XG4gIGlmICh3c1N0YXJ0KSB3c1N0YXJ0ID0gd3NTdGFydC5yZXBsYWNlKC9cXG4rL2csIGAkJiR7aW5kZW50fWApO1xuXG4gIGlmIChjb21tZW50KSB7XG4gICAgaGVhZGVyICs9ICcgIycgKyBjb21tZW50LnJlcGxhY2UoLyA/W1xcclxcbl0rL2csICcgJyk7XG4gICAgaWYgKG9uQ29tbWVudCkgb25Db21tZW50KCk7XG4gIH1cblxuICBpZiAoIXZhbHVlKSByZXR1cm4gYCR7aGVhZGVyfSR7aW5kZW50U2l6ZX1cXG4ke2luZGVudH0ke3dzRW5kfWA7XG5cbiAgaWYgKGxpdGVyYWwpIHtcbiAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoL1xcbisvZywgYCQmJHtpbmRlbnR9YCk7XG4gICAgcmV0dXJuIGAke2hlYWRlcn1cXG4ke2luZGVudH0ke3dzU3RhcnR9JHt2YWx1ZX0ke3dzRW5kfWA7XG4gIH1cblxuICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoL1xcbisvZywgJ1xcbiQmJykucmVwbGFjZSgvKD86XnxcXG4pKFtcXHQgXS4qKSg/OihbXFxuXFx0IF0qKVxcbig/IVtcXG5cXHQgXSkpPy9nLCAnJDEkMicpIC8vIG1vcmUtaW5kZW50ZWQgbGluZXMgYXJlbid0IGZvbGRlZFxuICAvLyAgICAgICAgIF4gaW5kLmxpbmUgIF4gZW1wdHkgICAgIF4gY2FwdHVyZSBuZXh0IGVtcHR5IGxpbmVzIG9ubHkgYXQgZW5kIG9mIGluZGVudFxuICAucmVwbGFjZSgvXFxuKy9nLCBgJCYke2luZGVudH1gKTtcbiAgY29uc3QgYm9keSA9IGZvbGRGbG93TGluZXMoYCR7d3NTdGFydH0ke3ZhbHVlfSR7d3NFbmR9YCwgaW5kZW50LCBGT0xEX0JMT0NLLCBzdHJPcHRpb25zLmZvbGQpO1xuICByZXR1cm4gYCR7aGVhZGVyfVxcbiR7aW5kZW50fSR7Ym9keX1gO1xufVxuXG5mdW5jdGlvbiBwbGFpblN0cmluZyhpdGVtLCBjdHgsIG9uQ29tbWVudCwgb25DaG9tcEtlZXApIHtcbiAgY29uc3Qge1xuICAgIGNvbW1lbnQsXG4gICAgdHlwZSxcbiAgICB2YWx1ZVxuICB9ID0gaXRlbTtcbiAgY29uc3Qge1xuICAgIGFjdHVhbFN0cmluZyxcbiAgICBpbXBsaWNpdEtleSxcbiAgICBpbmRlbnQsXG4gICAgaW5GbG93XG4gIH0gPSBjdHg7XG5cbiAgaWYgKGltcGxpY2l0S2V5ICYmIC9bXFxuW1xcXXt9LF0vLnRlc3QodmFsdWUpIHx8IGluRmxvdyAmJiAvW1tcXF17fSxdLy50ZXN0KHZhbHVlKSkge1xuICAgIHJldHVybiBkb3VibGVRdW90ZWRTdHJpbmcodmFsdWUsIGN0eCk7XG4gIH1cblxuICBpZiAoIXZhbHVlIHx8IC9eW1xcblxcdCAsW1xcXXt9IyYqIXw+J1wiJUBgXXxeWz8tXSR8Xls/LV1bIFxcdF18W1xcbjpdWyBcXHRdfFsgXFx0XVxcbnxbXFxuXFx0IF0jfFtcXG5cXHQgOl0kLy50ZXN0KHZhbHVlKSkge1xuICAgIC8vIG5vdCBhbGxvd2VkOlxuICAgIC8vIC0gZW1wdHkgc3RyaW5nLCAnLScgb3IgJz8nXG4gICAgLy8gLSBzdGFydCB3aXRoIGFuIGluZGljYXRvciBjaGFyYWN0ZXIgKGV4Y2VwdCBbPzotXSkgb3IgL1s/LV0gL1xuICAgIC8vIC0gJ1xcbiAnLCAnOiAnIG9yICcgXFxuJyBhbnl3aGVyZVxuICAgIC8vIC0gJyMnIG5vdCBwcmVjZWRlZCBieSBhIG5vbi1zcGFjZSBjaGFyXG4gICAgLy8gLSBlbmQgd2l0aCAnICcgb3IgJzonXG4gICAgcmV0dXJuIGltcGxpY2l0S2V5IHx8IGluRmxvdyB8fCB2YWx1ZS5pbmRleE9mKCdcXG4nKSA9PT0gLTEgPyB2YWx1ZS5pbmRleE9mKCdcIicpICE9PSAtMSAmJiB2YWx1ZS5pbmRleE9mKFwiJ1wiKSA9PT0gLTEgPyBzaW5nbGVRdW90ZWRTdHJpbmcodmFsdWUsIGN0eCkgOiBkb3VibGVRdW90ZWRTdHJpbmcodmFsdWUsIGN0eCkgOiBibG9ja1N0cmluZyhpdGVtLCBjdHgsIG9uQ29tbWVudCwgb25DaG9tcEtlZXApO1xuICB9XG5cbiAgaWYgKCFpbXBsaWNpdEtleSAmJiAhaW5GbG93ICYmIHR5cGUgIT09IFBsYWluVmFsdWUuVHlwZS5QTEFJTiAmJiB2YWx1ZS5pbmRleE9mKCdcXG4nKSAhPT0gLTEpIHtcbiAgICAvLyBXaGVyZSBhbGxvd2VkICYgdHlwZSBub3Qgc2V0IGV4cGxpY2l0bHksIHByZWZlciBibG9jayBzdHlsZSBmb3IgbXVsdGlsaW5lIHN0cmluZ3NcbiAgICByZXR1cm4gYmxvY2tTdHJpbmcoaXRlbSwgY3R4LCBvbkNvbW1lbnQsIG9uQ2hvbXBLZWVwKTtcbiAgfVxuXG4gIGlmIChpbmRlbnQgPT09ICcnICYmIGNvbnRhaW5zRG9jdW1lbnRNYXJrZXIodmFsdWUpKSB7XG4gICAgY3R4LmZvcmNlQmxvY2tJbmRlbnQgPSB0cnVlO1xuICAgIHJldHVybiBibG9ja1N0cmluZyhpdGVtLCBjdHgsIG9uQ29tbWVudCwgb25DaG9tcEtlZXApO1xuICB9XG5cbiAgY29uc3Qgc3RyID0gdmFsdWUucmVwbGFjZSgvXFxuKy9nLCBgJCZcXG4ke2luZGVudH1gKTsgLy8gVmVyaWZ5IHRoYXQgb3V0cHV0IHdpbGwgYmUgcGFyc2VkIGFzIGEgc3RyaW5nLCBhcyBlLmcuIHBsYWluIG51bWJlcnMgYW5kXG4gIC8vIGJvb2xlYW5zIGdldCBwYXJzZWQgd2l0aCB0aG9zZSB0eXBlcyBpbiB2MS4yIChlLmcuICc0MicsICd0cnVlJyAmICcwLjllLTMnKSxcbiAgLy8gYW5kIG90aGVycyBpbiB2MS4xLlxuXG4gIGlmIChhY3R1YWxTdHJpbmcpIHtcbiAgICBjb25zdCB7XG4gICAgICB0YWdzXG4gICAgfSA9IGN0eC5kb2Muc2NoZW1hO1xuICAgIGNvbnN0IHJlc29sdmVkID0gcmVzb2x2ZVNjYWxhcihzdHIsIHRhZ3MsIHRhZ3Muc2NhbGFyRmFsbGJhY2spLnZhbHVlO1xuICAgIGlmICh0eXBlb2YgcmVzb2x2ZWQgIT09ICdzdHJpbmcnKSByZXR1cm4gZG91YmxlUXVvdGVkU3RyaW5nKHZhbHVlLCBjdHgpO1xuICB9XG5cbiAgY29uc3QgYm9keSA9IGltcGxpY2l0S2V5ID8gc3RyIDogZm9sZEZsb3dMaW5lcyhzdHIsIGluZGVudCwgRk9MRF9GTE9XLCBnZXRGb2xkT3B0aW9ucyhjdHgpKTtcblxuICBpZiAoY29tbWVudCAmJiAhaW5GbG93ICYmIChib2R5LmluZGV4T2YoJ1xcbicpICE9PSAtMSB8fCBjb21tZW50LmluZGV4T2YoJ1xcbicpICE9PSAtMSkpIHtcbiAgICBpZiAob25Db21tZW50KSBvbkNvbW1lbnQoKTtcbiAgICByZXR1cm4gYWRkQ29tbWVudEJlZm9yZShib2R5LCBpbmRlbnQsIGNvbW1lbnQpO1xuICB9XG5cbiAgcmV0dXJuIGJvZHk7XG59XG5cbmZ1bmN0aW9uIHN0cmluZ2lmeVN0cmluZyhpdGVtLCBjdHgsIG9uQ29tbWVudCwgb25DaG9tcEtlZXApIHtcbiAgY29uc3Qge1xuICAgIGRlZmF1bHRUeXBlXG4gIH0gPSBzdHJPcHRpb25zO1xuICBjb25zdCB7XG4gICAgaW1wbGljaXRLZXksXG4gICAgaW5GbG93XG4gIH0gPSBjdHg7XG4gIGxldCB7XG4gICAgdHlwZSxcbiAgICB2YWx1ZVxuICB9ID0gaXRlbTtcblxuICBpZiAodHlwZW9mIHZhbHVlICE9PSAnc3RyaW5nJykge1xuICAgIHZhbHVlID0gU3RyaW5nKHZhbHVlKTtcbiAgICBpdGVtID0gT2JqZWN0LmFzc2lnbih7fSwgaXRlbSwge1xuICAgICAgdmFsdWVcbiAgICB9KTtcbiAgfVxuXG4gIGNvbnN0IF9zdHJpbmdpZnkgPSBfdHlwZSA9PiB7XG4gICAgc3dpdGNoIChfdHlwZSkge1xuICAgICAgY2FzZSBQbGFpblZhbHVlLlR5cGUuQkxPQ0tfRk9MREVEOlxuICAgICAgY2FzZSBQbGFpblZhbHVlLlR5cGUuQkxPQ0tfTElURVJBTDpcbiAgICAgICAgcmV0dXJuIGJsb2NrU3RyaW5nKGl0ZW0sIGN0eCwgb25Db21tZW50LCBvbkNob21wS2VlcCk7XG5cbiAgICAgIGNhc2UgUGxhaW5WYWx1ZS5UeXBlLlFVT1RFX0RPVUJMRTpcbiAgICAgICAgcmV0dXJuIGRvdWJsZVF1b3RlZFN0cmluZyh2YWx1ZSwgY3R4KTtcblxuICAgICAgY2FzZSBQbGFpblZhbHVlLlR5cGUuUVVPVEVfU0lOR0xFOlxuICAgICAgICByZXR1cm4gc2luZ2xlUXVvdGVkU3RyaW5nKHZhbHVlLCBjdHgpO1xuXG4gICAgICBjYXNlIFBsYWluVmFsdWUuVHlwZS5QTEFJTjpcbiAgICAgICAgcmV0dXJuIHBsYWluU3RyaW5nKGl0ZW0sIGN0eCwgb25Db21tZW50LCBvbkNob21wS2VlcCk7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfTtcblxuICBpZiAodHlwZSAhPT0gUGxhaW5WYWx1ZS5UeXBlLlFVT1RFX0RPVUJMRSAmJiAvW1xceDAwLVxceDA4XFx4MGItXFx4MWZcXHg3Zi1cXHg5Zl0vLnRlc3QodmFsdWUpKSB7XG4gICAgLy8gZm9yY2UgZG91YmxlIHF1b3RlcyBvbiBjb250cm9sIGNoYXJhY3RlcnNcbiAgICB0eXBlID0gUGxhaW5WYWx1ZS5UeXBlLlFVT1RFX0RPVUJMRTtcbiAgfSBlbHNlIGlmICgoaW1wbGljaXRLZXkgfHwgaW5GbG93KSAmJiAodHlwZSA9PT0gUGxhaW5WYWx1ZS5UeXBlLkJMT0NLX0ZPTERFRCB8fCB0eXBlID09PSBQbGFpblZhbHVlLlR5cGUuQkxPQ0tfTElURVJBTCkpIHtcbiAgICAvLyBzaG91bGQgbm90IGhhcHBlbjsgYmxvY2tzIGFyZSBub3QgdmFsaWQgaW5zaWRlIGZsb3cgY29udGFpbmVyc1xuICAgIHR5cGUgPSBQbGFpblZhbHVlLlR5cGUuUVVPVEVfRE9VQkxFO1xuICB9XG5cbiAgbGV0IHJlcyA9IF9zdHJpbmdpZnkodHlwZSk7XG5cbiAgaWYgKHJlcyA9PT0gbnVsbCkge1xuICAgIHJlcyA9IF9zdHJpbmdpZnkoZGVmYXVsdFR5cGUpO1xuICAgIGlmIChyZXMgPT09IG51bGwpIHRocm93IG5ldyBFcnJvcihgVW5zdXBwb3J0ZWQgZGVmYXVsdCBzdHJpbmcgdHlwZSAke2RlZmF1bHRUeXBlfWApO1xuICB9XG5cbiAgcmV0dXJuIHJlcztcbn1cblxuZnVuY3Rpb24gc3RyaW5naWZ5TnVtYmVyKHtcbiAgZm9ybWF0LFxuICBtaW5GcmFjdGlvbkRpZ2l0cyxcbiAgdGFnLFxuICB2YWx1ZVxufSkge1xuICBpZiAodHlwZW9mIHZhbHVlID09PSAnYmlnaW50JykgcmV0dXJuIFN0cmluZyh2YWx1ZSk7XG4gIGlmICghaXNGaW5pdGUodmFsdWUpKSByZXR1cm4gaXNOYU4odmFsdWUpID8gJy5uYW4nIDogdmFsdWUgPCAwID8gJy0uaW5mJyA6ICcuaW5mJztcbiAgbGV0IG4gPSBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XG5cbiAgaWYgKCFmb3JtYXQgJiYgbWluRnJhY3Rpb25EaWdpdHMgJiYgKCF0YWcgfHwgdGFnID09PSAndGFnOnlhbWwub3JnLDIwMDI6ZmxvYXQnKSAmJiAvXlxcZC8udGVzdChuKSkge1xuICAgIGxldCBpID0gbi5pbmRleE9mKCcuJyk7XG5cbiAgICBpZiAoaSA8IDApIHtcbiAgICAgIGkgPSBuLmxlbmd0aDtcbiAgICAgIG4gKz0gJy4nO1xuICAgIH1cblxuICAgIGxldCBkID0gbWluRnJhY3Rpb25EaWdpdHMgLSAobi5sZW5ndGggLSBpIC0gMSk7XG5cbiAgICB3aGlsZSAoZC0tID4gMCkgbiArPSAnMCc7XG4gIH1cblxuICByZXR1cm4gbjtcbn1cblxuZnVuY3Rpb24gY2hlY2tGbG93Q29sbGVjdGlvbkVuZChlcnJvcnMsIGNzdCkge1xuICBsZXQgY2hhciwgbmFtZTtcblxuICBzd2l0Y2ggKGNzdC50eXBlKSB7XG4gICAgY2FzZSBQbGFpblZhbHVlLlR5cGUuRkxPV19NQVA6XG4gICAgICBjaGFyID0gJ30nO1xuICAgICAgbmFtZSA9ICdmbG93IG1hcCc7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgUGxhaW5WYWx1ZS5UeXBlLkZMT1dfU0VROlxuICAgICAgY2hhciA9ICddJztcbiAgICAgIG5hbWUgPSAnZmxvdyBzZXF1ZW5jZSc7XG4gICAgICBicmVhaztcblxuICAgIGRlZmF1bHQ6XG4gICAgICBlcnJvcnMucHVzaChuZXcgUGxhaW5WYWx1ZS5ZQU1MU2VtYW50aWNFcnJvcihjc3QsICdOb3QgYSBmbG93IGNvbGxlY3Rpb24hPycpKTtcbiAgICAgIHJldHVybjtcbiAgfVxuXG4gIGxldCBsYXN0SXRlbTtcblxuICBmb3IgKGxldCBpID0gY3N0Lml0ZW1zLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgY29uc3QgaXRlbSA9IGNzdC5pdGVtc1tpXTtcblxuICAgIGlmICghaXRlbSB8fCBpdGVtLnR5cGUgIT09IFBsYWluVmFsdWUuVHlwZS5DT01NRU5UKSB7XG4gICAgICBsYXN0SXRlbSA9IGl0ZW07XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBpZiAobGFzdEl0ZW0gJiYgbGFzdEl0ZW0uY2hhciAhPT0gY2hhcikge1xuICAgIGNvbnN0IG1zZyA9IGBFeHBlY3RlZCAke25hbWV9IHRvIGVuZCB3aXRoICR7Y2hhcn1gO1xuICAgIGxldCBlcnI7XG5cbiAgICBpZiAodHlwZW9mIGxhc3RJdGVtLm9mZnNldCA9PT0gJ251bWJlcicpIHtcbiAgICAgIGVyciA9IG5ldyBQbGFpblZhbHVlLllBTUxTZW1hbnRpY0Vycm9yKGNzdCwgbXNnKTtcbiAgICAgIGVyci5vZmZzZXQgPSBsYXN0SXRlbS5vZmZzZXQgKyAxO1xuICAgIH0gZWxzZSB7XG4gICAgICBlcnIgPSBuZXcgUGxhaW5WYWx1ZS5ZQU1MU2VtYW50aWNFcnJvcihsYXN0SXRlbSwgbXNnKTtcbiAgICAgIGlmIChsYXN0SXRlbS5yYW5nZSAmJiBsYXN0SXRlbS5yYW5nZS5lbmQpIGVyci5vZmZzZXQgPSBsYXN0SXRlbS5yYW5nZS5lbmQgLSBsYXN0SXRlbS5yYW5nZS5zdGFydDtcbiAgICB9XG5cbiAgICBlcnJvcnMucHVzaChlcnIpO1xuICB9XG59XG5mdW5jdGlvbiBjaGVja0Zsb3dDb21tZW50U3BhY2UoZXJyb3JzLCBjb21tZW50KSB7XG4gIGNvbnN0IHByZXYgPSBjb21tZW50LmNvbnRleHQuc3JjW2NvbW1lbnQucmFuZ2Uuc3RhcnQgLSAxXTtcblxuICBpZiAocHJldiAhPT0gJ1xcbicgJiYgcHJldiAhPT0gJ1xcdCcgJiYgcHJldiAhPT0gJyAnKSB7XG4gICAgY29uc3QgbXNnID0gJ0NvbW1lbnRzIG11c3QgYmUgc2VwYXJhdGVkIGZyb20gb3RoZXIgdG9rZW5zIGJ5IHdoaXRlIHNwYWNlIGNoYXJhY3RlcnMnO1xuICAgIGVycm9ycy5wdXNoKG5ldyBQbGFpblZhbHVlLllBTUxTZW1hbnRpY0Vycm9yKGNvbW1lbnQsIG1zZykpO1xuICB9XG59XG5mdW5jdGlvbiBnZXRMb25nS2V5RXJyb3Ioc291cmNlLCBrZXkpIHtcbiAgY29uc3Qgc2sgPSBTdHJpbmcoa2V5KTtcbiAgY29uc3QgayA9IHNrLnN1YnN0cigwLCA4KSArICcuLi4nICsgc2suc3Vic3RyKC04KTtcbiAgcmV0dXJuIG5ldyBQbGFpblZhbHVlLllBTUxTZW1hbnRpY0Vycm9yKHNvdXJjZSwgYFRoZSBcIiR7a31cIiBrZXkgaXMgdG9vIGxvbmdgKTtcbn1cbmZ1bmN0aW9uIHJlc29sdmVDb21tZW50cyhjb2xsZWN0aW9uLCBjb21tZW50cykge1xuICBmb3IgKGNvbnN0IHtcbiAgICBhZnRlcktleSxcbiAgICBiZWZvcmUsXG4gICAgY29tbWVudFxuICB9IG9mIGNvbW1lbnRzKSB7XG4gICAgbGV0IGl0ZW0gPSBjb2xsZWN0aW9uLml0ZW1zW2JlZm9yZV07XG5cbiAgICBpZiAoIWl0ZW0pIHtcbiAgICAgIGlmIChjb21tZW50ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKGNvbGxlY3Rpb24uY29tbWVudCkgY29sbGVjdGlvbi5jb21tZW50ICs9ICdcXG4nICsgY29tbWVudDtlbHNlIGNvbGxlY3Rpb24uY29tbWVudCA9IGNvbW1lbnQ7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChhZnRlcktleSAmJiBpdGVtLnZhbHVlKSBpdGVtID0gaXRlbS52YWx1ZTtcblxuICAgICAgaWYgKGNvbW1lbnQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoYWZ0ZXJLZXkgfHwgIWl0ZW0uY29tbWVudEJlZm9yZSkgaXRlbS5zcGFjZUJlZm9yZSA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoaXRlbS5jb21tZW50QmVmb3JlKSBpdGVtLmNvbW1lbnRCZWZvcmUgKz0gJ1xcbicgKyBjb21tZW50O2Vsc2UgaXRlbS5jb21tZW50QmVmb3JlID0gY29tbWVudDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLy8gb24gZXJyb3IsIHdpbGwgcmV0dXJuIHsgc3RyOiBzdHJpbmcsIGVycm9yczogRXJyb3JbXSB9XG5mdW5jdGlvbiByZXNvbHZlU3RyaW5nKGRvYywgbm9kZSkge1xuICBjb25zdCByZXMgPSBub2RlLnN0clZhbHVlO1xuICBpZiAoIXJlcykgcmV0dXJuICcnO1xuICBpZiAodHlwZW9mIHJlcyA9PT0gJ3N0cmluZycpIHJldHVybiByZXM7XG4gIHJlcy5lcnJvcnMuZm9yRWFjaChlcnJvciA9PiB7XG4gICAgaWYgKCFlcnJvci5zb3VyY2UpIGVycm9yLnNvdXJjZSA9IG5vZGU7XG4gICAgZG9jLmVycm9ycy5wdXNoKGVycm9yKTtcbiAgfSk7XG4gIHJldHVybiByZXMuc3RyO1xufVxuXG5mdW5jdGlvbiByZXNvbHZlVGFnSGFuZGxlKGRvYywgbm9kZSkge1xuICBjb25zdCB7XG4gICAgaGFuZGxlLFxuICAgIHN1ZmZpeFxuICB9ID0gbm9kZS50YWc7XG4gIGxldCBwcmVmaXggPSBkb2MudGFnUHJlZml4ZXMuZmluZChwID0+IHAuaGFuZGxlID09PSBoYW5kbGUpO1xuXG4gIGlmICghcHJlZml4KSB7XG4gICAgY29uc3QgZHRwID0gZG9jLmdldERlZmF1bHRzKCkudGFnUHJlZml4ZXM7XG4gICAgaWYgKGR0cCkgcHJlZml4ID0gZHRwLmZpbmQocCA9PiBwLmhhbmRsZSA9PT0gaGFuZGxlKTtcbiAgICBpZiAoIXByZWZpeCkgdGhyb3cgbmV3IFBsYWluVmFsdWUuWUFNTFNlbWFudGljRXJyb3Iobm9kZSwgYFRoZSAke2hhbmRsZX0gdGFnIGhhbmRsZSBpcyBub24tZGVmYXVsdCBhbmQgd2FzIG5vdCBkZWNsYXJlZC5gKTtcbiAgfVxuXG4gIGlmICghc3VmZml4KSB0aHJvdyBuZXcgUGxhaW5WYWx1ZS5ZQU1MU2VtYW50aWNFcnJvcihub2RlLCBgVGhlICR7aGFuZGxlfSB0YWcgaGFzIG5vIHN1ZmZpeC5gKTtcblxuICBpZiAoaGFuZGxlID09PSAnIScgJiYgKGRvYy52ZXJzaW9uIHx8IGRvYy5vcHRpb25zLnZlcnNpb24pID09PSAnMS4wJykge1xuICAgIGlmIChzdWZmaXhbMF0gPT09ICdeJykge1xuICAgICAgZG9jLndhcm5pbmdzLnB1c2gobmV3IFBsYWluVmFsdWUuWUFNTFdhcm5pbmcobm9kZSwgJ1lBTUwgMS4wIF4gdGFnIGV4cGFuc2lvbiBpcyBub3Qgc3VwcG9ydGVkJykpO1xuICAgICAgcmV0dXJuIHN1ZmZpeDtcbiAgICB9XG5cbiAgICBpZiAoL1s6L10vLnRlc3Qoc3VmZml4KSkge1xuICAgICAgLy8gd29yZC9mb28gLT4gdGFnOndvcmQueWFtbC5vcmcsMjAwMjpmb29cbiAgICAgIGNvbnN0IHZvY2FiID0gc3VmZml4Lm1hdGNoKC9eKFthLXowLTktXSspXFwvKC4qKS9pKTtcbiAgICAgIHJldHVybiB2b2NhYiA/IGB0YWc6JHt2b2NhYlsxXX0ueWFtbC5vcmcsMjAwMjoke3ZvY2FiWzJdfWAgOiBgdGFnOiR7c3VmZml4fWA7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHByZWZpeC5wcmVmaXggKyBkZWNvZGVVUklDb21wb25lbnQoc3VmZml4KTtcbn1cblxuZnVuY3Rpb24gcmVzb2x2ZVRhZ05hbWUoZG9jLCBub2RlKSB7XG4gIGNvbnN0IHtcbiAgICB0YWcsXG4gICAgdHlwZVxuICB9ID0gbm9kZTtcbiAgbGV0IG5vblNwZWNpZmljID0gZmFsc2U7XG5cbiAgaWYgKHRhZykge1xuICAgIGNvbnN0IHtcbiAgICAgIGhhbmRsZSxcbiAgICAgIHN1ZmZpeCxcbiAgICAgIHZlcmJhdGltXG4gICAgfSA9IHRhZztcblxuICAgIGlmICh2ZXJiYXRpbSkge1xuICAgICAgaWYgKHZlcmJhdGltICE9PSAnIScgJiYgdmVyYmF0aW0gIT09ICchIScpIHJldHVybiB2ZXJiYXRpbTtcbiAgICAgIGNvbnN0IG1zZyA9IGBWZXJiYXRpbSB0YWdzIGFyZW4ndCByZXNvbHZlZCwgc28gJHt2ZXJiYXRpbX0gaXMgaW52YWxpZC5gO1xuICAgICAgZG9jLmVycm9ycy5wdXNoKG5ldyBQbGFpblZhbHVlLllBTUxTZW1hbnRpY0Vycm9yKG5vZGUsIG1zZykpO1xuICAgIH0gZWxzZSBpZiAoaGFuZGxlID09PSAnIScgJiYgIXN1ZmZpeCkge1xuICAgICAgbm9uU3BlY2lmaWMgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0cnkge1xuICAgICAgICByZXR1cm4gcmVzb2x2ZVRhZ0hhbmRsZShkb2MsIG5vZGUpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgZG9jLmVycm9ycy5wdXNoKGVycm9yKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlIFBsYWluVmFsdWUuVHlwZS5CTE9DS19GT0xERUQ6XG4gICAgY2FzZSBQbGFpblZhbHVlLlR5cGUuQkxPQ0tfTElURVJBTDpcbiAgICBjYXNlIFBsYWluVmFsdWUuVHlwZS5RVU9URV9ET1VCTEU6XG4gICAgY2FzZSBQbGFpblZhbHVlLlR5cGUuUVVPVEVfU0lOR0xFOlxuICAgICAgcmV0dXJuIFBsYWluVmFsdWUuZGVmYXVsdFRhZ3MuU1RSO1xuXG4gICAgY2FzZSBQbGFpblZhbHVlLlR5cGUuRkxPV19NQVA6XG4gICAgY2FzZSBQbGFpblZhbHVlLlR5cGUuTUFQOlxuICAgICAgcmV0dXJuIFBsYWluVmFsdWUuZGVmYXVsdFRhZ3MuTUFQO1xuXG4gICAgY2FzZSBQbGFpblZhbHVlLlR5cGUuRkxPV19TRVE6XG4gICAgY2FzZSBQbGFpblZhbHVlLlR5cGUuU0VROlxuICAgICAgcmV0dXJuIFBsYWluVmFsdWUuZGVmYXVsdFRhZ3MuU0VRO1xuXG4gICAgY2FzZSBQbGFpblZhbHVlLlR5cGUuUExBSU46XG4gICAgICByZXR1cm4gbm9uU3BlY2lmaWMgPyBQbGFpblZhbHVlLmRlZmF1bHRUYWdzLlNUUiA6IG51bGw7XG5cbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVzb2x2ZUJ5VGFnTmFtZShkb2MsIG5vZGUsIHRhZ05hbWUpIHtcbiAgY29uc3Qge1xuICAgIHRhZ3NcbiAgfSA9IGRvYy5zY2hlbWE7XG4gIGNvbnN0IG1hdGNoV2l0aFRlc3QgPSBbXTtcblxuICBmb3IgKGNvbnN0IHRhZyBvZiB0YWdzKSB7XG4gICAgaWYgKHRhZy50YWcgPT09IHRhZ05hbWUpIHtcbiAgICAgIGlmICh0YWcudGVzdCkgbWF0Y2hXaXRoVGVzdC5wdXNoKHRhZyk7ZWxzZSB7XG4gICAgICAgIGNvbnN0IHJlcyA9IHRhZy5yZXNvbHZlKGRvYywgbm9kZSk7XG4gICAgICAgIHJldHVybiByZXMgaW5zdGFuY2VvZiBDb2xsZWN0aW9uID8gcmVzIDogbmV3IFNjYWxhcihyZXMpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHN0ciA9IHJlc29sdmVTdHJpbmcoZG9jLCBub2RlKTtcbiAgaWYgKHR5cGVvZiBzdHIgPT09ICdzdHJpbmcnICYmIG1hdGNoV2l0aFRlc3QubGVuZ3RoID4gMCkgcmV0dXJuIHJlc29sdmVTY2FsYXIoc3RyLCBtYXRjaFdpdGhUZXN0LCB0YWdzLnNjYWxhckZhbGxiYWNrKTtcbiAgcmV0dXJuIG51bGw7XG59XG5cbmZ1bmN0aW9uIGdldEZhbGxiYWNrVGFnTmFtZSh7XG4gIHR5cGVcbn0pIHtcbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSBQbGFpblZhbHVlLlR5cGUuRkxPV19NQVA6XG4gICAgY2FzZSBQbGFpblZhbHVlLlR5cGUuTUFQOlxuICAgICAgcmV0dXJuIFBsYWluVmFsdWUuZGVmYXVsdFRhZ3MuTUFQO1xuXG4gICAgY2FzZSBQbGFpblZhbHVlLlR5cGUuRkxPV19TRVE6XG4gICAgY2FzZSBQbGFpblZhbHVlLlR5cGUuU0VROlxuICAgICAgcmV0dXJuIFBsYWluVmFsdWUuZGVmYXVsdFRhZ3MuU0VRO1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBQbGFpblZhbHVlLmRlZmF1bHRUYWdzLlNUUjtcbiAgfVxufVxuXG5mdW5jdGlvbiByZXNvbHZlVGFnKGRvYywgbm9kZSwgdGFnTmFtZSkge1xuICB0cnkge1xuICAgIGNvbnN0IHJlcyA9IHJlc29sdmVCeVRhZ05hbWUoZG9jLCBub2RlLCB0YWdOYW1lKTtcblxuICAgIGlmIChyZXMpIHtcbiAgICAgIGlmICh0YWdOYW1lICYmIG5vZGUudGFnKSByZXMudGFnID0gdGFnTmFtZTtcbiAgICAgIHJldHVybiByZXM7XG4gICAgfVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgIGlmICghZXJyb3Iuc291cmNlKSBlcnJvci5zb3VyY2UgPSBub2RlO1xuICAgIGRvYy5lcnJvcnMucHVzaChlcnJvcik7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICB0cnkge1xuICAgIGNvbnN0IGZhbGxiYWNrID0gZ2V0RmFsbGJhY2tUYWdOYW1lKG5vZGUpO1xuICAgIGlmICghZmFsbGJhY2spIHRocm93IG5ldyBFcnJvcihgVGhlIHRhZyAke3RhZ05hbWV9IGlzIHVuYXZhaWxhYmxlYCk7XG4gICAgY29uc3QgbXNnID0gYFRoZSB0YWcgJHt0YWdOYW1lfSBpcyB1bmF2YWlsYWJsZSwgZmFsbGluZyBiYWNrIHRvICR7ZmFsbGJhY2t9YDtcbiAgICBkb2Mud2FybmluZ3MucHVzaChuZXcgUGxhaW5WYWx1ZS5ZQU1MV2FybmluZyhub2RlLCBtc2cpKTtcbiAgICBjb25zdCByZXMgPSByZXNvbHZlQnlUYWdOYW1lKGRvYywgbm9kZSwgZmFsbGJhY2spO1xuICAgIHJlcy50YWcgPSB0YWdOYW1lO1xuICAgIHJldHVybiByZXM7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc3QgcmVmRXJyb3IgPSBuZXcgUGxhaW5WYWx1ZS5ZQU1MUmVmZXJlbmNlRXJyb3Iobm9kZSwgZXJyb3IubWVzc2FnZSk7XG4gICAgcmVmRXJyb3Iuc3RhY2sgPSBlcnJvci5zdGFjaztcbiAgICBkb2MuZXJyb3JzLnB1c2gocmVmRXJyb3IpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG59XG5cbmNvbnN0IGlzQ29sbGVjdGlvbkl0ZW0gPSBub2RlID0+IHtcbiAgaWYgKCFub2RlKSByZXR1cm4gZmFsc2U7XG4gIGNvbnN0IHtcbiAgICB0eXBlXG4gIH0gPSBub2RlO1xuICByZXR1cm4gdHlwZSA9PT0gUGxhaW5WYWx1ZS5UeXBlLk1BUF9LRVkgfHwgdHlwZSA9PT0gUGxhaW5WYWx1ZS5UeXBlLk1BUF9WQUxVRSB8fCB0eXBlID09PSBQbGFpblZhbHVlLlR5cGUuU0VRX0lURU07XG59O1xuXG5mdW5jdGlvbiByZXNvbHZlTm9kZVByb3BzKGVycm9ycywgbm9kZSkge1xuICBjb25zdCBjb21tZW50cyA9IHtcbiAgICBiZWZvcmU6IFtdLFxuICAgIGFmdGVyOiBbXVxuICB9O1xuICBsZXQgaGFzQW5jaG9yID0gZmFsc2U7XG4gIGxldCBoYXNUYWcgPSBmYWxzZTtcbiAgY29uc3QgcHJvcHMgPSBpc0NvbGxlY3Rpb25JdGVtKG5vZGUuY29udGV4dC5wYXJlbnQpID8gbm9kZS5jb250ZXh0LnBhcmVudC5wcm9wcy5jb25jYXQobm9kZS5wcm9wcykgOiBub2RlLnByb3BzO1xuXG4gIGZvciAoY29uc3Qge1xuICAgIHN0YXJ0LFxuICAgIGVuZFxuICB9IG9mIHByb3BzKSB7XG4gICAgc3dpdGNoIChub2RlLmNvbnRleHQuc3JjW3N0YXJ0XSkge1xuICAgICAgY2FzZSBQbGFpblZhbHVlLkNoYXIuQ09NTUVOVDpcbiAgICAgICAge1xuICAgICAgICAgIGlmICghbm9kZS5jb21tZW50SGFzUmVxdWlyZWRXaGl0ZXNwYWNlKHN0YXJ0KSkge1xuICAgICAgICAgICAgY29uc3QgbXNnID0gJ0NvbW1lbnRzIG11c3QgYmUgc2VwYXJhdGVkIGZyb20gb3RoZXIgdG9rZW5zIGJ5IHdoaXRlIHNwYWNlIGNoYXJhY3RlcnMnO1xuICAgICAgICAgICAgZXJyb3JzLnB1c2gobmV3IFBsYWluVmFsdWUuWUFNTFNlbWFudGljRXJyb3Iobm9kZSwgbXNnKSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgaGVhZGVyLFxuICAgICAgICAgICAgdmFsdWVSYW5nZVxuICAgICAgICAgIH0gPSBub2RlO1xuICAgICAgICAgIGNvbnN0IGNjID0gdmFsdWVSYW5nZSAmJiAoc3RhcnQgPiB2YWx1ZVJhbmdlLnN0YXJ0IHx8IGhlYWRlciAmJiBzdGFydCA+IGhlYWRlci5zdGFydCkgPyBjb21tZW50cy5hZnRlciA6IGNvbW1lbnRzLmJlZm9yZTtcbiAgICAgICAgICBjYy5wdXNoKG5vZGUuY29udGV4dC5zcmMuc2xpY2Uoc3RhcnQgKyAxLCBlbmQpKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgLy8gQWN0dWFsIGFuY2hvciAmIHRhZyByZXNvbHV0aW9uIGlzIGhhbmRsZWQgYnkgc2NoZW1hLCBoZXJlIHdlIGp1c3QgY29tcGxhaW5cblxuICAgICAgY2FzZSBQbGFpblZhbHVlLkNoYXIuQU5DSE9SOlxuICAgICAgICBpZiAoaGFzQW5jaG9yKSB7XG4gICAgICAgICAgY29uc3QgbXNnID0gJ0Egbm9kZSBjYW4gaGF2ZSBhdCBtb3N0IG9uZSBhbmNob3InO1xuICAgICAgICAgIGVycm9ycy5wdXNoKG5ldyBQbGFpblZhbHVlLllBTUxTZW1hbnRpY0Vycm9yKG5vZGUsIG1zZykpO1xuICAgICAgICB9XG5cbiAgICAgICAgaGFzQW5jaG9yID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgUGxhaW5WYWx1ZS5DaGFyLlRBRzpcbiAgICAgICAgaWYgKGhhc1RhZykge1xuICAgICAgICAgIGNvbnN0IG1zZyA9ICdBIG5vZGUgY2FuIGhhdmUgYXQgbW9zdCBvbmUgdGFnJztcbiAgICAgICAgICBlcnJvcnMucHVzaChuZXcgUGxhaW5WYWx1ZS5ZQU1MU2VtYW50aWNFcnJvcihub2RlLCBtc2cpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGhhc1RhZyA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgY29tbWVudHMsXG4gICAgaGFzQW5jaG9yLFxuICAgIGhhc1RhZ1xuICB9O1xufVxuXG5mdW5jdGlvbiByZXNvbHZlTm9kZVZhbHVlKGRvYywgbm9kZSkge1xuICBjb25zdCB7XG4gICAgYW5jaG9ycyxcbiAgICBlcnJvcnMsXG4gICAgc2NoZW1hXG4gIH0gPSBkb2M7XG5cbiAgaWYgKG5vZGUudHlwZSA9PT0gUGxhaW5WYWx1ZS5UeXBlLkFMSUFTKSB7XG4gICAgY29uc3QgbmFtZSA9IG5vZGUucmF3VmFsdWU7XG4gICAgY29uc3Qgc3JjID0gYW5jaG9ycy5nZXROb2RlKG5hbWUpO1xuXG4gICAgaWYgKCFzcmMpIHtcbiAgICAgIGNvbnN0IG1zZyA9IGBBbGlhc2VkIGFuY2hvciBub3QgZm91bmQ6ICR7bmFtZX1gO1xuICAgICAgZXJyb3JzLnB1c2gobmV3IFBsYWluVmFsdWUuWUFNTFJlZmVyZW5jZUVycm9yKG5vZGUsIG1zZykpO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSAvLyBMYXp5IHJlc29sdXRpb24gZm9yIGNpcmN1bGFyIHJlZmVyZW5jZXNcblxuXG4gICAgY29uc3QgcmVzID0gbmV3IEFsaWFzKHNyYyk7XG5cbiAgICBhbmNob3JzLl9jc3RBbGlhc2VzLnB1c2gocmVzKTtcblxuICAgIHJldHVybiByZXM7XG4gIH1cblxuICBjb25zdCB0YWdOYW1lID0gcmVzb2x2ZVRhZ05hbWUoZG9jLCBub2RlKTtcbiAgaWYgKHRhZ05hbWUpIHJldHVybiByZXNvbHZlVGFnKGRvYywgbm9kZSwgdGFnTmFtZSk7XG5cbiAgaWYgKG5vZGUudHlwZSAhPT0gUGxhaW5WYWx1ZS5UeXBlLlBMQUlOKSB7XG4gICAgY29uc3QgbXNnID0gYEZhaWxlZCB0byByZXNvbHZlICR7bm9kZS50eXBlfSBub2RlIGhlcmVgO1xuICAgIGVycm9ycy5wdXNoKG5ldyBQbGFpblZhbHVlLllBTUxTeW50YXhFcnJvcihub2RlLCBtc2cpKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHRyeSB7XG4gICAgY29uc3Qgc3RyID0gcmVzb2x2ZVN0cmluZyhkb2MsIG5vZGUpO1xuICAgIHJldHVybiByZXNvbHZlU2NhbGFyKHN0ciwgc2NoZW1hLnRhZ3MsIHNjaGVtYS50YWdzLnNjYWxhckZhbGxiYWNrKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBpZiAoIWVycm9yLnNvdXJjZSkgZXJyb3Iuc291cmNlID0gbm9kZTtcbiAgICBlcnJvcnMucHVzaChlcnJvcik7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn0gLy8gc2V0cyBub2RlLnJlc29sdmVkIG9uIHN1Y2Nlc3NcblxuXG5mdW5jdGlvbiByZXNvbHZlTm9kZShkb2MsIG5vZGUpIHtcbiAgaWYgKCFub2RlKSByZXR1cm4gbnVsbDtcbiAgaWYgKG5vZGUuZXJyb3IpIGRvYy5lcnJvcnMucHVzaChub2RlLmVycm9yKTtcbiAgY29uc3Qge1xuICAgIGNvbW1lbnRzLFxuICAgIGhhc0FuY2hvcixcbiAgICBoYXNUYWdcbiAgfSA9IHJlc29sdmVOb2RlUHJvcHMoZG9jLmVycm9ycywgbm9kZSk7XG5cbiAgaWYgKGhhc0FuY2hvcikge1xuICAgIGNvbnN0IHtcbiAgICAgIGFuY2hvcnNcbiAgICB9ID0gZG9jO1xuICAgIGNvbnN0IG5hbWUgPSBub2RlLmFuY2hvcjtcbiAgICBjb25zdCBwcmV2ID0gYW5jaG9ycy5nZXROb2RlKG5hbWUpOyAvLyBBdCB0aGlzIHBvaW50LCBhbGlhc2VzIGZvciBhbnkgcHJlY2VkaW5nIG5vZGUgd2l0aCB0aGUgc2FtZSBhbmNob3JcbiAgICAvLyBuYW1lIGhhdmUgYWxyZWFkeSBiZWVuIHJlc29sdmVkLCBzbyBpdCBtYXkgc2FmZWx5IGJlIHJlbmFtZWQuXG5cbiAgICBpZiAocHJldikgYW5jaG9ycy5tYXBbYW5jaG9ycy5uZXdOYW1lKG5hbWUpXSA9IHByZXY7IC8vIER1cmluZyBwYXJzaW5nLCB3ZSBuZWVkIHRvIHN0b3JlIHRoZSBDU1Qgbm9kZSBpbiBhbmNob3JzLm1hcCBhc1xuICAgIC8vIGFuY2hvcnMgbmVlZCB0byBiZSBhdmFpbGFibGUgZHVyaW5nIHJlc29sdXRpb24gdG8gYWxsb3cgZm9yXG4gICAgLy8gY2lyY3VsYXIgcmVmZXJlbmNlcy5cblxuICAgIGFuY2hvcnMubWFwW25hbWVdID0gbm9kZTtcbiAgfVxuXG4gIGlmIChub2RlLnR5cGUgPT09IFBsYWluVmFsdWUuVHlwZS5BTElBUyAmJiAoaGFzQW5jaG9yIHx8IGhhc1RhZykpIHtcbiAgICBjb25zdCBtc2cgPSAnQW4gYWxpYXMgbm9kZSBtdXN0IG5vdCBzcGVjaWZ5IGFueSBwcm9wZXJ0aWVzJztcbiAgICBkb2MuZXJyb3JzLnB1c2gobmV3IFBsYWluVmFsdWUuWUFNTFNlbWFudGljRXJyb3Iobm9kZSwgbXNnKSk7XG4gIH1cblxuICBjb25zdCByZXMgPSByZXNvbHZlTm9kZVZhbHVlKGRvYywgbm9kZSk7XG5cbiAgaWYgKHJlcykge1xuICAgIHJlcy5yYW5nZSA9IFtub2RlLnJhbmdlLnN0YXJ0LCBub2RlLnJhbmdlLmVuZF07XG4gICAgaWYgKGRvYy5vcHRpb25zLmtlZXBDc3ROb2RlcykgcmVzLmNzdE5vZGUgPSBub2RlO1xuICAgIGlmIChkb2Mub3B0aW9ucy5rZWVwTm9kZVR5cGVzKSByZXMudHlwZSA9IG5vZGUudHlwZTtcbiAgICBjb25zdCBjYiA9IGNvbW1lbnRzLmJlZm9yZS5qb2luKCdcXG4nKTtcblxuICAgIGlmIChjYikge1xuICAgICAgcmVzLmNvbW1lbnRCZWZvcmUgPSByZXMuY29tbWVudEJlZm9yZSA/IGAke3Jlcy5jb21tZW50QmVmb3JlfVxcbiR7Y2J9YCA6IGNiO1xuICAgIH1cblxuICAgIGNvbnN0IGNhID0gY29tbWVudHMuYWZ0ZXIuam9pbignXFxuJyk7XG4gICAgaWYgKGNhKSByZXMuY29tbWVudCA9IHJlcy5jb21tZW50ID8gYCR7cmVzLmNvbW1lbnR9XFxuJHtjYX1gIDogY2E7XG4gIH1cblxuICByZXR1cm4gbm9kZS5yZXNvbHZlZCA9IHJlcztcbn1cblxuZnVuY3Rpb24gcmVzb2x2ZU1hcChkb2MsIGNzdCkge1xuICBpZiAoY3N0LnR5cGUgIT09IFBsYWluVmFsdWUuVHlwZS5NQVAgJiYgY3N0LnR5cGUgIT09IFBsYWluVmFsdWUuVHlwZS5GTE9XX01BUCkge1xuICAgIGNvbnN0IG1zZyA9IGBBICR7Y3N0LnR5cGV9IG5vZGUgY2Fubm90IGJlIHJlc29sdmVkIGFzIGEgbWFwcGluZ2A7XG4gICAgZG9jLmVycm9ycy5wdXNoKG5ldyBQbGFpblZhbHVlLllBTUxTeW50YXhFcnJvcihjc3QsIG1zZykpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgY29uc3Qge1xuICAgIGNvbW1lbnRzLFxuICAgIGl0ZW1zXG4gIH0gPSBjc3QudHlwZSA9PT0gUGxhaW5WYWx1ZS5UeXBlLkZMT1dfTUFQID8gcmVzb2x2ZUZsb3dNYXBJdGVtcyhkb2MsIGNzdCkgOiByZXNvbHZlQmxvY2tNYXBJdGVtcyhkb2MsIGNzdCk7XG4gIGNvbnN0IG1hcCA9IG5ldyBZQU1MTWFwKCk7XG4gIG1hcC5pdGVtcyA9IGl0ZW1zO1xuICByZXNvbHZlQ29tbWVudHMobWFwLCBjb21tZW50cyk7XG4gIGxldCBoYXNDb2xsZWN0aW9uS2V5ID0gZmFsc2U7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7ICsraSkge1xuICAgIGNvbnN0IHtcbiAgICAgIGtleTogaUtleVxuICAgIH0gPSBpdGVtc1tpXTtcbiAgICBpZiAoaUtleSBpbnN0YW5jZW9mIENvbGxlY3Rpb24pIGhhc0NvbGxlY3Rpb25LZXkgPSB0cnVlO1xuXG4gICAgaWYgKGRvYy5zY2hlbWEubWVyZ2UgJiYgaUtleSAmJiBpS2V5LnZhbHVlID09PSBNRVJHRV9LRVkpIHtcbiAgICAgIGl0ZW1zW2ldID0gbmV3IE1lcmdlKGl0ZW1zW2ldKTtcbiAgICAgIGNvbnN0IHNvdXJjZXMgPSBpdGVtc1tpXS52YWx1ZS5pdGVtcztcbiAgICAgIGxldCBlcnJvciA9IG51bGw7XG4gICAgICBzb3VyY2VzLnNvbWUobm9kZSA9PiB7XG4gICAgICAgIGlmIChub2RlIGluc3RhbmNlb2YgQWxpYXMpIHtcbiAgICAgICAgICAvLyBEdXJpbmcgcGFyc2luZywgYWxpYXMgc291cmNlcyBhcmUgQ1NUIG5vZGVzOyB0byBhY2NvdW50IGZvclxuICAgICAgICAgIC8vIGNpcmN1bGFyIHJlZmVyZW5jZXMgdGhlaXIgcmVzb2x2ZWQgdmFsdWVzIGNhbid0IGJlIHVzZWQgaGVyZS5cbiAgICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICB0eXBlXG4gICAgICAgICAgfSA9IG5vZGUuc291cmNlO1xuICAgICAgICAgIGlmICh0eXBlID09PSBQbGFpblZhbHVlLlR5cGUuTUFQIHx8IHR5cGUgPT09IFBsYWluVmFsdWUuVHlwZS5GTE9XX01BUCkgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIHJldHVybiBlcnJvciA9ICdNZXJnZSBub2RlcyBhbGlhc2VzIGNhbiBvbmx5IHBvaW50IHRvIG1hcHMnO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGVycm9yID0gJ01lcmdlIG5vZGVzIGNhbiBvbmx5IGhhdmUgQWxpYXMgbm9kZXMgYXMgdmFsdWVzJztcbiAgICAgIH0pO1xuICAgICAgaWYgKGVycm9yKSBkb2MuZXJyb3JzLnB1c2gobmV3IFBsYWluVmFsdWUuWUFNTFNlbWFudGljRXJyb3IoY3N0LCBlcnJvcikpO1xuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGxldCBqID0gaSArIDE7IGogPCBpdGVtcy5sZW5ndGg7ICsraikge1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAga2V5OiBqS2V5XG4gICAgICAgIH0gPSBpdGVtc1tqXTtcblxuICAgICAgICBpZiAoaUtleSA9PT0gaktleSB8fCBpS2V5ICYmIGpLZXkgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGlLZXksICd2YWx1ZScpICYmIGlLZXkudmFsdWUgPT09IGpLZXkudmFsdWUpIHtcbiAgICAgICAgICBjb25zdCBtc2cgPSBgTWFwIGtleXMgbXVzdCBiZSB1bmlxdWU7IFwiJHtpS2V5fVwiIGlzIHJlcGVhdGVkYDtcbiAgICAgICAgICBkb2MuZXJyb3JzLnB1c2gobmV3IFBsYWluVmFsdWUuWUFNTFNlbWFudGljRXJyb3IoY3N0LCBtc2cpKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlmIChoYXNDb2xsZWN0aW9uS2V5ICYmICFkb2Mub3B0aW9ucy5tYXBBc01hcCkge1xuICAgIGNvbnN0IHdhcm4gPSAnS2V5cyB3aXRoIGNvbGxlY3Rpb24gdmFsdWVzIHdpbGwgYmUgc3RyaW5naWZpZWQgYXMgWUFNTCBkdWUgdG8gSlMgT2JqZWN0IHJlc3RyaWN0aW9ucy4gVXNlIG1hcEFzTWFwOiB0cnVlIHRvIGF2b2lkIHRoaXMuJztcbiAgICBkb2Mud2FybmluZ3MucHVzaChuZXcgUGxhaW5WYWx1ZS5ZQU1MV2FybmluZyhjc3QsIHdhcm4pKTtcbiAgfVxuXG4gIGNzdC5yZXNvbHZlZCA9IG1hcDtcbiAgcmV0dXJuIG1hcDtcbn1cblxuY29uc3QgdmFsdWVIYXNQYWlyQ29tbWVudCA9ICh7XG4gIGNvbnRleHQ6IHtcbiAgICBsaW5lU3RhcnQsXG4gICAgbm9kZSxcbiAgICBzcmNcbiAgfSxcbiAgcHJvcHNcbn0pID0+IHtcbiAgaWYgKHByb3BzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIGZhbHNlO1xuICBjb25zdCB7XG4gICAgc3RhcnRcbiAgfSA9IHByb3BzWzBdO1xuICBpZiAobm9kZSAmJiBzdGFydCA+IG5vZGUudmFsdWVSYW5nZS5zdGFydCkgcmV0dXJuIGZhbHNlO1xuICBpZiAoc3JjW3N0YXJ0XSAhPT0gUGxhaW5WYWx1ZS5DaGFyLkNPTU1FTlQpIHJldHVybiBmYWxzZTtcblxuICBmb3IgKGxldCBpID0gbGluZVN0YXJ0OyBpIDwgc3RhcnQ7ICsraSkgaWYgKHNyY1tpXSA9PT0gJ1xcbicpIHJldHVybiBmYWxzZTtcblxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbmZ1bmN0aW9uIHJlc29sdmVQYWlyQ29tbWVudChpdGVtLCBwYWlyKSB7XG4gIGlmICghdmFsdWVIYXNQYWlyQ29tbWVudChpdGVtKSkgcmV0dXJuO1xuICBjb25zdCBjb21tZW50ID0gaXRlbS5nZXRQcm9wVmFsdWUoMCwgUGxhaW5WYWx1ZS5DaGFyLkNPTU1FTlQsIHRydWUpO1xuICBsZXQgZm91bmQgPSBmYWxzZTtcbiAgY29uc3QgY2IgPSBwYWlyLnZhbHVlLmNvbW1lbnRCZWZvcmU7XG5cbiAgaWYgKGNiICYmIGNiLnN0YXJ0c1dpdGgoY29tbWVudCkpIHtcbiAgICBwYWlyLnZhbHVlLmNvbW1lbnRCZWZvcmUgPSBjYi5zdWJzdHIoY29tbWVudC5sZW5ndGggKyAxKTtcbiAgICBmb3VuZCA9IHRydWU7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgY2MgPSBwYWlyLnZhbHVlLmNvbW1lbnQ7XG5cbiAgICBpZiAoIWl0ZW0ubm9kZSAmJiBjYyAmJiBjYy5zdGFydHNXaXRoKGNvbW1lbnQpKSB7XG4gICAgICBwYWlyLnZhbHVlLmNvbW1lbnQgPSBjYy5zdWJzdHIoY29tbWVudC5sZW5ndGggKyAxKTtcbiAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBpZiAoZm91bmQpIHBhaXIuY29tbWVudCA9IGNvbW1lbnQ7XG59XG5cbmZ1bmN0aW9uIHJlc29sdmVCbG9ja01hcEl0ZW1zKGRvYywgY3N0KSB7XG4gIGNvbnN0IGNvbW1lbnRzID0gW107XG4gIGNvbnN0IGl0ZW1zID0gW107XG4gIGxldCBrZXkgPSB1bmRlZmluZWQ7XG4gIGxldCBrZXlTdGFydCA9IG51bGw7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjc3QuaXRlbXMubGVuZ3RoOyArK2kpIHtcbiAgICBjb25zdCBpdGVtID0gY3N0Lml0ZW1zW2ldO1xuXG4gICAgc3dpdGNoIChpdGVtLnR5cGUpIHtcbiAgICAgIGNhc2UgUGxhaW5WYWx1ZS5UeXBlLkJMQU5LX0xJTkU6XG4gICAgICAgIGNvbW1lbnRzLnB1c2goe1xuICAgICAgICAgIGFmdGVyS2V5OiAhIWtleSxcbiAgICAgICAgICBiZWZvcmU6IGl0ZW1zLmxlbmd0aFxuICAgICAgICB9KTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgUGxhaW5WYWx1ZS5UeXBlLkNPTU1FTlQ6XG4gICAgICAgIGNvbW1lbnRzLnB1c2goe1xuICAgICAgICAgIGFmdGVyS2V5OiAhIWtleSxcbiAgICAgICAgICBiZWZvcmU6IGl0ZW1zLmxlbmd0aCxcbiAgICAgICAgICBjb21tZW50OiBpdGVtLmNvbW1lbnRcbiAgICAgICAgfSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIFBsYWluVmFsdWUuVHlwZS5NQVBfS0VZOlxuICAgICAgICBpZiAoa2V5ICE9PSB1bmRlZmluZWQpIGl0ZW1zLnB1c2gobmV3IFBhaXIoa2V5KSk7XG4gICAgICAgIGlmIChpdGVtLmVycm9yKSBkb2MuZXJyb3JzLnB1c2goaXRlbS5lcnJvcik7XG4gICAgICAgIGtleSA9IHJlc29sdmVOb2RlKGRvYywgaXRlbS5ub2RlKTtcbiAgICAgICAga2V5U3RhcnQgPSBudWxsO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBQbGFpblZhbHVlLlR5cGUuTUFQX1ZBTFVFOlxuICAgICAgICB7XG4gICAgICAgICAgaWYgKGtleSA9PT0gdW5kZWZpbmVkKSBrZXkgPSBudWxsO1xuICAgICAgICAgIGlmIChpdGVtLmVycm9yKSBkb2MuZXJyb3JzLnB1c2goaXRlbS5lcnJvcik7XG5cbiAgICAgICAgICBpZiAoIWl0ZW0uY29udGV4dC5hdExpbmVTdGFydCAmJiBpdGVtLm5vZGUgJiYgaXRlbS5ub2RlLnR5cGUgPT09IFBsYWluVmFsdWUuVHlwZS5NQVAgJiYgIWl0ZW0ubm9kZS5jb250ZXh0LmF0TGluZVN0YXJ0KSB7XG4gICAgICAgICAgICBjb25zdCBtc2cgPSAnTmVzdGVkIG1hcHBpbmdzIGFyZSBub3QgYWxsb3dlZCBpbiBjb21wYWN0IG1hcHBpbmdzJztcbiAgICAgICAgICAgIGRvYy5lcnJvcnMucHVzaChuZXcgUGxhaW5WYWx1ZS5ZQU1MU2VtYW50aWNFcnJvcihpdGVtLm5vZGUsIG1zZykpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGxldCB2YWx1ZU5vZGUgPSBpdGVtLm5vZGU7XG5cbiAgICAgICAgICBpZiAoIXZhbHVlTm9kZSAmJiBpdGVtLnByb3BzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIC8vIENvbW1lbnRzIG9uIGFuIGVtcHR5IG1hcHBpbmcgdmFsdWUgbmVlZCB0byBiZSBwcmVzZXJ2ZWQsIHNvIHdlXG4gICAgICAgICAgICAvLyBuZWVkIHRvIGNvbnN0cnVjdCBhIG1pbmltYWwgZW1wdHkgbm9kZSBoZXJlIHRvIHVzZSBpbnN0ZWFkIG9mIHRoZVxuICAgICAgICAgICAgLy8gbWlzc2luZyBgaXRlbS5ub2RlYC4gLS0gZWVtZWxpL3lhbWwjMTlcbiAgICAgICAgICAgIHZhbHVlTm9kZSA9IG5ldyBQbGFpblZhbHVlLlBsYWluVmFsdWUoUGxhaW5WYWx1ZS5UeXBlLlBMQUlOLCBbXSk7XG4gICAgICAgICAgICB2YWx1ZU5vZGUuY29udGV4dCA9IHtcbiAgICAgICAgICAgICAgcGFyZW50OiBpdGVtLFxuICAgICAgICAgICAgICBzcmM6IGl0ZW0uY29udGV4dC5zcmNcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjb25zdCBwb3MgPSBpdGVtLnJhbmdlLnN0YXJ0ICsgMTtcbiAgICAgICAgICAgIHZhbHVlTm9kZS5yYW5nZSA9IHtcbiAgICAgICAgICAgICAgc3RhcnQ6IHBvcyxcbiAgICAgICAgICAgICAgZW5kOiBwb3NcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB2YWx1ZU5vZGUudmFsdWVSYW5nZSA9IHtcbiAgICAgICAgICAgICAgc3RhcnQ6IHBvcyxcbiAgICAgICAgICAgICAgZW5kOiBwb3NcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgaXRlbS5yYW5nZS5vcmlnU3RhcnQgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgIGNvbnN0IG9yaWdQb3MgPSBpdGVtLnJhbmdlLm9yaWdTdGFydCArIDE7XG4gICAgICAgICAgICAgIHZhbHVlTm9kZS5yYW5nZS5vcmlnU3RhcnQgPSB2YWx1ZU5vZGUucmFuZ2Uub3JpZ0VuZCA9IG9yaWdQb3M7XG4gICAgICAgICAgICAgIHZhbHVlTm9kZS52YWx1ZVJhbmdlLm9yaWdTdGFydCA9IHZhbHVlTm9kZS52YWx1ZVJhbmdlLm9yaWdFbmQgPSBvcmlnUG9zO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IHBhaXIgPSBuZXcgUGFpcihrZXksIHJlc29sdmVOb2RlKGRvYywgdmFsdWVOb2RlKSk7XG4gICAgICAgICAgcmVzb2x2ZVBhaXJDb21tZW50KGl0ZW0sIHBhaXIpO1xuICAgICAgICAgIGl0ZW1zLnB1c2gocGFpcik7XG5cbiAgICAgICAgICBpZiAoa2V5ICYmIHR5cGVvZiBrZXlTdGFydCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIGlmIChpdGVtLnJhbmdlLnN0YXJ0ID4ga2V5U3RhcnQgKyAxMDI0KSBkb2MuZXJyb3JzLnB1c2goZ2V0TG9uZ0tleUVycm9yKGNzdCwga2V5KSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAga2V5ID0gdW5kZWZpbmVkO1xuICAgICAgICAgIGtleVN0YXJ0ID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgaWYgKGtleSAhPT0gdW5kZWZpbmVkKSBpdGVtcy5wdXNoKG5ldyBQYWlyKGtleSkpO1xuICAgICAgICBrZXkgPSByZXNvbHZlTm9kZShkb2MsIGl0ZW0pO1xuICAgICAgICBrZXlTdGFydCA9IGl0ZW0ucmFuZ2Uuc3RhcnQ7XG4gICAgICAgIGlmIChpdGVtLmVycm9yKSBkb2MuZXJyb3JzLnB1c2goaXRlbS5lcnJvcik7XG5cbiAgICAgICAgbmV4dDogZm9yIChsZXQgaiA9IGkgKyAxOzsgKytqKSB7XG4gICAgICAgICAgY29uc3QgbmV4dEl0ZW0gPSBjc3QuaXRlbXNbal07XG5cbiAgICAgICAgICBzd2l0Y2ggKG5leHRJdGVtICYmIG5leHRJdGVtLnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgUGxhaW5WYWx1ZS5UeXBlLkJMQU5LX0xJTkU6XG4gICAgICAgICAgICBjYXNlIFBsYWluVmFsdWUuVHlwZS5DT01NRU5UOlxuICAgICAgICAgICAgICBjb250aW51ZSBuZXh0O1xuXG4gICAgICAgICAgICBjYXNlIFBsYWluVmFsdWUuVHlwZS5NQVBfVkFMVUU6XG4gICAgICAgICAgICAgIGJyZWFrIG5leHQ7XG5cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBjb25zdCBtc2cgPSAnSW1wbGljaXQgbWFwIGtleXMgbmVlZCB0byBiZSBmb2xsb3dlZCBieSBtYXAgdmFsdWVzJztcbiAgICAgICAgICAgICAgICBkb2MuZXJyb3JzLnB1c2gobmV3IFBsYWluVmFsdWUuWUFNTFNlbWFudGljRXJyb3IoaXRlbSwgbXNnKSk7XG4gICAgICAgICAgICAgICAgYnJlYWsgbmV4dDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpdGVtLnZhbHVlUmFuZ2VDb250YWluc05ld2xpbmUpIHtcbiAgICAgICAgICBjb25zdCBtc2cgPSAnSW1wbGljaXQgbWFwIGtleXMgbmVlZCB0byBiZSBvbiBhIHNpbmdsZSBsaW5lJztcbiAgICAgICAgICBkb2MuZXJyb3JzLnB1c2gobmV3IFBsYWluVmFsdWUuWUFNTFNlbWFudGljRXJyb3IoaXRlbSwgbXNnKSk7XG4gICAgICAgIH1cblxuICAgIH1cbiAgfVxuXG4gIGlmIChrZXkgIT09IHVuZGVmaW5lZCkgaXRlbXMucHVzaChuZXcgUGFpcihrZXkpKTtcbiAgcmV0dXJuIHtcbiAgICBjb21tZW50cyxcbiAgICBpdGVtc1xuICB9O1xufVxuXG5mdW5jdGlvbiByZXNvbHZlRmxvd01hcEl0ZW1zKGRvYywgY3N0KSB7XG4gIGNvbnN0IGNvbW1lbnRzID0gW107XG4gIGNvbnN0IGl0ZW1zID0gW107XG4gIGxldCBrZXkgPSB1bmRlZmluZWQ7XG4gIGxldCBleHBsaWNpdEtleSA9IGZhbHNlO1xuICBsZXQgbmV4dCA9ICd7JztcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGNzdC5pdGVtcy5sZW5ndGg7ICsraSkge1xuICAgIGNvbnN0IGl0ZW0gPSBjc3QuaXRlbXNbaV07XG5cbiAgICBpZiAodHlwZW9mIGl0ZW0uY2hhciA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgY2hhcixcbiAgICAgICAgb2Zmc2V0XG4gICAgICB9ID0gaXRlbTtcblxuICAgICAgaWYgKGNoYXIgPT09ICc/JyAmJiBrZXkgPT09IHVuZGVmaW5lZCAmJiAhZXhwbGljaXRLZXkpIHtcbiAgICAgICAgZXhwbGljaXRLZXkgPSB0cnVlO1xuICAgICAgICBuZXh0ID0gJzonO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKGNoYXIgPT09ICc6Jykge1xuICAgICAgICBpZiAoa2V5ID09PSB1bmRlZmluZWQpIGtleSA9IG51bGw7XG5cbiAgICAgICAgaWYgKG5leHQgPT09ICc6Jykge1xuICAgICAgICAgIG5leHQgPSAnLCc7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChleHBsaWNpdEtleSkge1xuICAgICAgICAgIGlmIChrZXkgPT09IHVuZGVmaW5lZCAmJiBjaGFyICE9PSAnLCcpIGtleSA9IG51bGw7XG4gICAgICAgICAgZXhwbGljaXRLZXkgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChrZXkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGl0ZW1zLnB1c2gobmV3IFBhaXIoa2V5KSk7XG4gICAgICAgICAga2V5ID0gdW5kZWZpbmVkO1xuXG4gICAgICAgICAgaWYgKGNoYXIgPT09ICcsJykge1xuICAgICAgICAgICAgbmV4dCA9ICc6JztcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoY2hhciA9PT0gJ30nKSB7XG4gICAgICAgIGlmIChpID09PSBjc3QuaXRlbXMubGVuZ3RoIC0gMSkgY29udGludWU7XG4gICAgICB9IGVsc2UgaWYgKGNoYXIgPT09IG5leHQpIHtcbiAgICAgICAgbmV4dCA9ICc6JztcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG1zZyA9IGBGbG93IG1hcCBjb250YWlucyBhbiB1bmV4cGVjdGVkICR7Y2hhcn1gO1xuICAgICAgY29uc3QgZXJyID0gbmV3IFBsYWluVmFsdWUuWUFNTFN5bnRheEVycm9yKGNzdCwgbXNnKTtcbiAgICAgIGVyci5vZmZzZXQgPSBvZmZzZXQ7XG4gICAgICBkb2MuZXJyb3JzLnB1c2goZXJyKTtcbiAgICB9IGVsc2UgaWYgKGl0ZW0udHlwZSA9PT0gUGxhaW5WYWx1ZS5UeXBlLkJMQU5LX0xJTkUpIHtcbiAgICAgIGNvbW1lbnRzLnB1c2goe1xuICAgICAgICBhZnRlcktleTogISFrZXksXG4gICAgICAgIGJlZm9yZTogaXRlbXMubGVuZ3RoXG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKGl0ZW0udHlwZSA9PT0gUGxhaW5WYWx1ZS5UeXBlLkNPTU1FTlQpIHtcbiAgICAgIGNoZWNrRmxvd0NvbW1lbnRTcGFjZShkb2MuZXJyb3JzLCBpdGVtKTtcbiAgICAgIGNvbW1lbnRzLnB1c2goe1xuICAgICAgICBhZnRlcktleTogISFrZXksXG4gICAgICAgIGJlZm9yZTogaXRlbXMubGVuZ3RoLFxuICAgICAgICBjb21tZW50OiBpdGVtLmNvbW1lbnRcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoa2V5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmIChuZXh0ID09PSAnLCcpIGRvYy5lcnJvcnMucHVzaChuZXcgUGxhaW5WYWx1ZS5ZQU1MU2VtYW50aWNFcnJvcihpdGVtLCAnU2VwYXJhdG9yICwgbWlzc2luZyBpbiBmbG93IG1hcCcpKTtcbiAgICAgIGtleSA9IHJlc29sdmVOb2RlKGRvYywgaXRlbSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChuZXh0ICE9PSAnLCcpIGRvYy5lcnJvcnMucHVzaChuZXcgUGxhaW5WYWx1ZS5ZQU1MU2VtYW50aWNFcnJvcihpdGVtLCAnSW5kaWNhdG9yIDogbWlzc2luZyBpbiBmbG93IG1hcCBlbnRyeScpKTtcbiAgICAgIGl0ZW1zLnB1c2gobmV3IFBhaXIoa2V5LCByZXNvbHZlTm9kZShkb2MsIGl0ZW0pKSk7XG4gICAgICBrZXkgPSB1bmRlZmluZWQ7XG4gICAgICBleHBsaWNpdEtleSA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGNoZWNrRmxvd0NvbGxlY3Rpb25FbmQoZG9jLmVycm9ycywgY3N0KTtcbiAgaWYgKGtleSAhPT0gdW5kZWZpbmVkKSBpdGVtcy5wdXNoKG5ldyBQYWlyKGtleSkpO1xuICByZXR1cm4ge1xuICAgIGNvbW1lbnRzLFxuICAgIGl0ZW1zXG4gIH07XG59XG5cbmZ1bmN0aW9uIHJlc29sdmVTZXEoZG9jLCBjc3QpIHtcbiAgaWYgKGNzdC50eXBlICE9PSBQbGFpblZhbHVlLlR5cGUuU0VRICYmIGNzdC50eXBlICE9PSBQbGFpblZhbHVlLlR5cGUuRkxPV19TRVEpIHtcbiAgICBjb25zdCBtc2cgPSBgQSAke2NzdC50eXBlfSBub2RlIGNhbm5vdCBiZSByZXNvbHZlZCBhcyBhIHNlcXVlbmNlYDtcbiAgICBkb2MuZXJyb3JzLnB1c2gobmV3IFBsYWluVmFsdWUuWUFNTFN5bnRheEVycm9yKGNzdCwgbXNnKSk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBjb25zdCB7XG4gICAgY29tbWVudHMsXG4gICAgaXRlbXNcbiAgfSA9IGNzdC50eXBlID09PSBQbGFpblZhbHVlLlR5cGUuRkxPV19TRVEgPyByZXNvbHZlRmxvd1NlcUl0ZW1zKGRvYywgY3N0KSA6IHJlc29sdmVCbG9ja1NlcUl0ZW1zKGRvYywgY3N0KTtcbiAgY29uc3Qgc2VxID0gbmV3IFlBTUxTZXEoKTtcbiAgc2VxLml0ZW1zID0gaXRlbXM7XG4gIHJlc29sdmVDb21tZW50cyhzZXEsIGNvbW1lbnRzKTtcblxuICBpZiAoIWRvYy5vcHRpb25zLm1hcEFzTWFwICYmIGl0ZW1zLnNvbWUoaXQgPT4gaXQgaW5zdGFuY2VvZiBQYWlyICYmIGl0LmtleSBpbnN0YW5jZW9mIENvbGxlY3Rpb24pKSB7XG4gICAgY29uc3Qgd2FybiA9ICdLZXlzIHdpdGggY29sbGVjdGlvbiB2YWx1ZXMgd2lsbCBiZSBzdHJpbmdpZmllZCBhcyBZQU1MIGR1ZSB0byBKUyBPYmplY3QgcmVzdHJpY3Rpb25zLiBVc2UgbWFwQXNNYXA6IHRydWUgdG8gYXZvaWQgdGhpcy4nO1xuICAgIGRvYy53YXJuaW5ncy5wdXNoKG5ldyBQbGFpblZhbHVlLllBTUxXYXJuaW5nKGNzdCwgd2FybikpO1xuICB9XG5cbiAgY3N0LnJlc29sdmVkID0gc2VxO1xuICByZXR1cm4gc2VxO1xufVxuXG5mdW5jdGlvbiByZXNvbHZlQmxvY2tTZXFJdGVtcyhkb2MsIGNzdCkge1xuICBjb25zdCBjb21tZW50cyA9IFtdO1xuICBjb25zdCBpdGVtcyA9IFtdO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY3N0Lml0ZW1zLmxlbmd0aDsgKytpKSB7XG4gICAgY29uc3QgaXRlbSA9IGNzdC5pdGVtc1tpXTtcblxuICAgIHN3aXRjaCAoaXRlbS50eXBlKSB7XG4gICAgICBjYXNlIFBsYWluVmFsdWUuVHlwZS5CTEFOS19MSU5FOlxuICAgICAgICBjb21tZW50cy5wdXNoKHtcbiAgICAgICAgICBiZWZvcmU6IGl0ZW1zLmxlbmd0aFxuICAgICAgICB9KTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgUGxhaW5WYWx1ZS5UeXBlLkNPTU1FTlQ6XG4gICAgICAgIGNvbW1lbnRzLnB1c2goe1xuICAgICAgICAgIGNvbW1lbnQ6IGl0ZW0uY29tbWVudCxcbiAgICAgICAgICBiZWZvcmU6IGl0ZW1zLmxlbmd0aFxuICAgICAgICB9KTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgUGxhaW5WYWx1ZS5UeXBlLlNFUV9JVEVNOlxuICAgICAgICBpZiAoaXRlbS5lcnJvcikgZG9jLmVycm9ycy5wdXNoKGl0ZW0uZXJyb3IpO1xuICAgICAgICBpdGVtcy5wdXNoKHJlc29sdmVOb2RlKGRvYywgaXRlbS5ub2RlKSk7XG5cbiAgICAgICAgaWYgKGl0ZW0uaGFzUHJvcHMpIHtcbiAgICAgICAgICBjb25zdCBtc2cgPSAnU2VxdWVuY2UgaXRlbXMgY2Fubm90IGhhdmUgdGFncyBvciBhbmNob3JzIGJlZm9yZSB0aGUgLSBpbmRpY2F0b3InO1xuICAgICAgICAgIGRvYy5lcnJvcnMucHVzaChuZXcgUGxhaW5WYWx1ZS5ZQU1MU2VtYW50aWNFcnJvcihpdGVtLCBtc2cpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBpZiAoaXRlbS5lcnJvcikgZG9jLmVycm9ycy5wdXNoKGl0ZW0uZXJyb3IpO1xuICAgICAgICBkb2MuZXJyb3JzLnB1c2gobmV3IFBsYWluVmFsdWUuWUFNTFN5bnRheEVycm9yKGl0ZW0sIGBVbmV4cGVjdGVkICR7aXRlbS50eXBlfSBub2RlIGluIHNlcXVlbmNlYCkpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgY29tbWVudHMsXG4gICAgaXRlbXNcbiAgfTtcbn1cblxuZnVuY3Rpb24gcmVzb2x2ZUZsb3dTZXFJdGVtcyhkb2MsIGNzdCkge1xuICBjb25zdCBjb21tZW50cyA9IFtdO1xuICBjb25zdCBpdGVtcyA9IFtdO1xuICBsZXQgZXhwbGljaXRLZXkgPSBmYWxzZTtcbiAgbGV0IGtleSA9IHVuZGVmaW5lZDtcbiAgbGV0IGtleVN0YXJ0ID0gbnVsbDtcbiAgbGV0IG5leHQgPSAnWyc7XG4gIGxldCBwcmV2SXRlbSA9IG51bGw7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjc3QuaXRlbXMubGVuZ3RoOyArK2kpIHtcbiAgICBjb25zdCBpdGVtID0gY3N0Lml0ZW1zW2ldO1xuXG4gICAgaWYgKHR5cGVvZiBpdGVtLmNoYXIgPT09ICdzdHJpbmcnKSB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIGNoYXIsXG4gICAgICAgIG9mZnNldFxuICAgICAgfSA9IGl0ZW07XG5cbiAgICAgIGlmIChjaGFyICE9PSAnOicgJiYgKGV4cGxpY2l0S2V5IHx8IGtleSAhPT0gdW5kZWZpbmVkKSkge1xuICAgICAgICBpZiAoZXhwbGljaXRLZXkgJiYga2V5ID09PSB1bmRlZmluZWQpIGtleSA9IG5leHQgPyBpdGVtcy5wb3AoKSA6IG51bGw7XG4gICAgICAgIGl0ZW1zLnB1c2gobmV3IFBhaXIoa2V5KSk7XG4gICAgICAgIGV4cGxpY2l0S2V5ID0gZmFsc2U7XG4gICAgICAgIGtleSA9IHVuZGVmaW5lZDtcbiAgICAgICAga2V5U3RhcnQgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICBpZiAoY2hhciA9PT0gbmV4dCkge1xuICAgICAgICBuZXh0ID0gbnVsbDtcbiAgICAgIH0gZWxzZSBpZiAoIW5leHQgJiYgY2hhciA9PT0gJz8nKSB7XG4gICAgICAgIGV4cGxpY2l0S2V5ID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSBpZiAobmV4dCAhPT0gJ1snICYmIGNoYXIgPT09ICc6JyAmJiBrZXkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAobmV4dCA9PT0gJywnKSB7XG4gICAgICAgICAga2V5ID0gaXRlbXMucG9wKCk7XG5cbiAgICAgICAgICBpZiAoa2V5IGluc3RhbmNlb2YgUGFpcikge1xuICAgICAgICAgICAgY29uc3QgbXNnID0gJ0NoYWluaW5nIGZsb3cgc2VxdWVuY2UgcGFpcnMgaXMgaW52YWxpZCc7XG4gICAgICAgICAgICBjb25zdCBlcnIgPSBuZXcgUGxhaW5WYWx1ZS5ZQU1MU2VtYW50aWNFcnJvcihjc3QsIG1zZyk7XG4gICAgICAgICAgICBlcnIub2Zmc2V0ID0gb2Zmc2V0O1xuICAgICAgICAgICAgZG9jLmVycm9ycy5wdXNoKGVycik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKCFleHBsaWNpdEtleSAmJiB0eXBlb2Yga2V5U3RhcnQgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICBjb25zdCBrZXlFbmQgPSBpdGVtLnJhbmdlID8gaXRlbS5yYW5nZS5zdGFydCA6IGl0ZW0ub2Zmc2V0O1xuICAgICAgICAgICAgaWYgKGtleUVuZCA+IGtleVN0YXJ0ICsgMTAyNCkgZG9jLmVycm9ycy5wdXNoKGdldExvbmdLZXlFcnJvcihjc3QsIGtleSkpO1xuICAgICAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgICBzcmNcbiAgICAgICAgICAgIH0gPSBwcmV2SXRlbS5jb250ZXh0O1xuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0ga2V5U3RhcnQ7IGkgPCBrZXlFbmQ7ICsraSkgaWYgKHNyY1tpXSA9PT0gJ1xcbicpIHtcbiAgICAgICAgICAgICAgY29uc3QgbXNnID0gJ0ltcGxpY2l0IGtleXMgb2YgZmxvdyBzZXF1ZW5jZSBwYWlycyBuZWVkIHRvIGJlIG9uIGEgc2luZ2xlIGxpbmUnO1xuICAgICAgICAgICAgICBkb2MuZXJyb3JzLnB1c2gobmV3IFBsYWluVmFsdWUuWUFNTFNlbWFudGljRXJyb3IocHJldkl0ZW0sIG1zZykpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAga2V5ID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGtleVN0YXJ0ID0gbnVsbDtcbiAgICAgICAgZXhwbGljaXRLZXkgPSBmYWxzZTtcbiAgICAgICAgbmV4dCA9IG51bGw7XG4gICAgICB9IGVsc2UgaWYgKG5leHQgPT09ICdbJyB8fCBjaGFyICE9PSAnXScgfHwgaSA8IGNzdC5pdGVtcy5sZW5ndGggLSAxKSB7XG4gICAgICAgIGNvbnN0IG1zZyA9IGBGbG93IHNlcXVlbmNlIGNvbnRhaW5zIGFuIHVuZXhwZWN0ZWQgJHtjaGFyfWA7XG4gICAgICAgIGNvbnN0IGVyciA9IG5ldyBQbGFpblZhbHVlLllBTUxTeW50YXhFcnJvcihjc3QsIG1zZyk7XG4gICAgICAgIGVyci5vZmZzZXQgPSBvZmZzZXQ7XG4gICAgICAgIGRvYy5lcnJvcnMucHVzaChlcnIpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoaXRlbS50eXBlID09PSBQbGFpblZhbHVlLlR5cGUuQkxBTktfTElORSkge1xuICAgICAgY29tbWVudHMucHVzaCh7XG4gICAgICAgIGJlZm9yZTogaXRlbXMubGVuZ3RoXG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKGl0ZW0udHlwZSA9PT0gUGxhaW5WYWx1ZS5UeXBlLkNPTU1FTlQpIHtcbiAgICAgIGNoZWNrRmxvd0NvbW1lbnRTcGFjZShkb2MuZXJyb3JzLCBpdGVtKTtcbiAgICAgIGNvbW1lbnRzLnB1c2goe1xuICAgICAgICBjb21tZW50OiBpdGVtLmNvbW1lbnQsXG4gICAgICAgIGJlZm9yZTogaXRlbXMubGVuZ3RoXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKG5leHQpIHtcbiAgICAgICAgY29uc3QgbXNnID0gYEV4cGVjdGVkIGEgJHtuZXh0fSBpbiBmbG93IHNlcXVlbmNlYDtcbiAgICAgICAgZG9jLmVycm9ycy5wdXNoKG5ldyBQbGFpblZhbHVlLllBTUxTZW1hbnRpY0Vycm9yKGl0ZW0sIG1zZykpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCB2YWx1ZSA9IHJlc29sdmVOb2RlKGRvYywgaXRlbSk7XG5cbiAgICAgIGlmIChrZXkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpdGVtcy5wdXNoKHZhbHVlKTtcbiAgICAgICAgcHJldkl0ZW0gPSBpdGVtO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaXRlbXMucHVzaChuZXcgUGFpcihrZXksIHZhbHVlKSk7XG4gICAgICAgIGtleSA9IHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgICAga2V5U3RhcnQgPSBpdGVtLnJhbmdlLnN0YXJ0O1xuICAgICAgbmV4dCA9ICcsJztcbiAgICB9XG4gIH1cblxuICBjaGVja0Zsb3dDb2xsZWN0aW9uRW5kKGRvYy5lcnJvcnMsIGNzdCk7XG4gIGlmIChrZXkgIT09IHVuZGVmaW5lZCkgaXRlbXMucHVzaChuZXcgUGFpcihrZXkpKTtcbiAgcmV0dXJuIHtcbiAgICBjb21tZW50cyxcbiAgICBpdGVtc1xuICB9O1xufVxuXG5leHBvcnRzLkFsaWFzID0gQWxpYXM7XG5leHBvcnRzLkNvbGxlY3Rpb24gPSBDb2xsZWN0aW9uO1xuZXhwb3J0cy5NZXJnZSA9IE1lcmdlO1xuZXhwb3J0cy5Ob2RlID0gTm9kZTtcbmV4cG9ydHMuUGFpciA9IFBhaXI7XG5leHBvcnRzLlNjYWxhciA9IFNjYWxhcjtcbmV4cG9ydHMuWUFNTE1hcCA9IFlBTUxNYXA7XG5leHBvcnRzLllBTUxTZXEgPSBZQU1MU2VxO1xuZXhwb3J0cy5hZGRDb21tZW50ID0gYWRkQ29tbWVudDtcbmV4cG9ydHMuYmluYXJ5T3B0aW9ucyA9IGJpbmFyeU9wdGlvbnM7XG5leHBvcnRzLmJvb2xPcHRpb25zID0gYm9vbE9wdGlvbnM7XG5leHBvcnRzLmZpbmRQYWlyID0gZmluZFBhaXI7XG5leHBvcnRzLmludE9wdGlvbnMgPSBpbnRPcHRpb25zO1xuZXhwb3J0cy5pc0VtcHR5UGF0aCA9IGlzRW1wdHlQYXRoO1xuZXhwb3J0cy5udWxsT3B0aW9ucyA9IG51bGxPcHRpb25zO1xuZXhwb3J0cy5yZXNvbHZlTWFwID0gcmVzb2x2ZU1hcDtcbmV4cG9ydHMucmVzb2x2ZU5vZGUgPSByZXNvbHZlTm9kZTtcbmV4cG9ydHMucmVzb2x2ZVNlcSA9IHJlc29sdmVTZXE7XG5leHBvcnRzLnJlc29sdmVTdHJpbmcgPSByZXNvbHZlU3RyaW5nO1xuZXhwb3J0cy5zdHJPcHRpb25zID0gc3RyT3B0aW9ucztcbmV4cG9ydHMuc3RyaW5naWZ5TnVtYmVyID0gc3RyaW5naWZ5TnVtYmVyO1xuZXhwb3J0cy5zdHJpbmdpZnlTdHJpbmcgPSBzdHJpbmdpZnlTdHJpbmc7XG5leHBvcnRzLnRvSlNPTiA9IHRvSlNPTjtcbiIsICIndXNlIHN0cmljdCc7XG5cbnZhciBQbGFpblZhbHVlID0gcmVxdWlyZSgnLi9QbGFpblZhbHVlLWVjOGU1ODhlLmpzJyk7XG52YXIgcmVzb2x2ZVNlcSA9IHJlcXVpcmUoJy4vcmVzb2x2ZVNlcS1kMDNjYjAzNy5qcycpO1xuXG4vKiBnbG9iYWwgYXRvYiwgYnRvYSwgQnVmZmVyICovXG5jb25zdCBiaW5hcnkgPSB7XG4gIGlkZW50aWZ5OiB2YWx1ZSA9PiB2YWx1ZSBpbnN0YW5jZW9mIFVpbnQ4QXJyYXksXG4gIC8vIEJ1ZmZlciBpbmhlcml0cyBmcm9tIFVpbnQ4QXJyYXlcbiAgZGVmYXVsdDogZmFsc2UsXG4gIHRhZzogJ3RhZzp5YW1sLm9yZywyMDAyOmJpbmFyeScsXG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBCdWZmZXIgaW4gbm9kZSBhbmQgYW4gVWludDhBcnJheSBpbiBicm93c2Vyc1xuICAgKlxuICAgKiBUbyB1c2UgdGhlIHJlc3VsdGluZyBidWZmZXIgYXMgYW4gaW1hZ2UsIHlvdSdsbCB3YW50IHRvIGRvIHNvbWV0aGluZyBsaWtlOlxuICAgKlxuICAgKiAgIGNvbnN0IGJsb2IgPSBuZXcgQmxvYihbYnVmZmVyXSwgeyB0eXBlOiAnaW1hZ2UvanBlZycgfSlcbiAgICogICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGhvdG8nKS5zcmMgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpXG4gICAqL1xuICByZXNvbHZlOiAoZG9jLCBub2RlKSA9PiB7XG4gICAgY29uc3Qgc3JjID0gcmVzb2x2ZVNlcS5yZXNvbHZlU3RyaW5nKGRvYywgbm9kZSk7XG5cbiAgICBpZiAodHlwZW9mIEJ1ZmZlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIEJ1ZmZlci5mcm9tKHNyYywgJ2Jhc2U2NCcpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGF0b2IgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIC8vIE9uIElFIDExLCBhdG9iKCkgY2FuJ3QgaGFuZGxlIG5ld2xpbmVzXG4gICAgICBjb25zdCBzdHIgPSBhdG9iKHNyYy5yZXBsYWNlKC9bXFxuXFxyXS9nLCAnJykpO1xuICAgICAgY29uc3QgYnVmZmVyID0gbmV3IFVpbnQ4QXJyYXkoc3RyLmxlbmd0aCk7XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgKytpKSBidWZmZXJbaV0gPSBzdHIuY2hhckNvZGVBdChpKTtcblxuICAgICAgcmV0dXJuIGJ1ZmZlcjtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgbXNnID0gJ1RoaXMgZW52aXJvbm1lbnQgZG9lcyBub3Qgc3VwcG9ydCByZWFkaW5nIGJpbmFyeSB0YWdzOyBlaXRoZXIgQnVmZmVyIG9yIGF0b2IgaXMgcmVxdWlyZWQnO1xuICAgICAgZG9jLmVycm9ycy5wdXNoKG5ldyBQbGFpblZhbHVlLllBTUxSZWZlcmVuY2VFcnJvcihub2RlLCBtc2cpKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfSxcbiAgb3B0aW9uczogcmVzb2x2ZVNlcS5iaW5hcnlPcHRpb25zLFxuICBzdHJpbmdpZnk6ICh7XG4gICAgY29tbWVudCxcbiAgICB0eXBlLFxuICAgIHZhbHVlXG4gIH0sIGN0eCwgb25Db21tZW50LCBvbkNob21wS2VlcCkgPT4ge1xuICAgIGxldCBzcmM7XG5cbiAgICBpZiAodHlwZW9mIEJ1ZmZlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgc3JjID0gdmFsdWUgaW5zdGFuY2VvZiBCdWZmZXIgPyB2YWx1ZS50b1N0cmluZygnYmFzZTY0JykgOiBCdWZmZXIuZnJvbSh2YWx1ZS5idWZmZXIpLnRvU3RyaW5nKCdiYXNlNjQnKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBidG9hID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBsZXQgcyA9ICcnO1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZhbHVlLmxlbmd0aDsgKytpKSBzICs9IFN0cmluZy5mcm9tQ2hhckNvZGUodmFsdWVbaV0pO1xuXG4gICAgICBzcmMgPSBidG9hKHMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoaXMgZW52aXJvbm1lbnQgZG9lcyBub3Qgc3VwcG9ydCB3cml0aW5nIGJpbmFyeSB0YWdzOyBlaXRoZXIgQnVmZmVyIG9yIGJ0b2EgaXMgcmVxdWlyZWQnKTtcbiAgICB9XG5cbiAgICBpZiAoIXR5cGUpIHR5cGUgPSByZXNvbHZlU2VxLmJpbmFyeU9wdGlvbnMuZGVmYXVsdFR5cGU7XG5cbiAgICBpZiAodHlwZSA9PT0gUGxhaW5WYWx1ZS5UeXBlLlFVT1RFX0RPVUJMRSkge1xuICAgICAgdmFsdWUgPSBzcmM7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgbGluZVdpZHRoXG4gICAgICB9ID0gcmVzb2x2ZVNlcS5iaW5hcnlPcHRpb25zO1xuICAgICAgY29uc3QgbiA9IE1hdGguY2VpbChzcmMubGVuZ3RoIC8gbGluZVdpZHRoKTtcbiAgICAgIGNvbnN0IGxpbmVzID0gbmV3IEFycmF5KG4pO1xuXG4gICAgICBmb3IgKGxldCBpID0gMCwgbyA9IDA7IGkgPCBuOyArK2ksIG8gKz0gbGluZVdpZHRoKSB7XG4gICAgICAgIGxpbmVzW2ldID0gc3JjLnN1YnN0cihvLCBsaW5lV2lkdGgpO1xuICAgICAgfVxuXG4gICAgICB2YWx1ZSA9IGxpbmVzLmpvaW4odHlwZSA9PT0gUGxhaW5WYWx1ZS5UeXBlLkJMT0NLX0xJVEVSQUwgPyAnXFxuJyA6ICcgJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc29sdmVTZXEuc3RyaW5naWZ5U3RyaW5nKHtcbiAgICAgIGNvbW1lbnQsXG4gICAgICB0eXBlLFxuICAgICAgdmFsdWVcbiAgICB9LCBjdHgsIG9uQ29tbWVudCwgb25DaG9tcEtlZXApO1xuICB9XG59O1xuXG5mdW5jdGlvbiBwYXJzZVBhaXJzKGRvYywgY3N0KSB7XG4gIGNvbnN0IHNlcSA9IHJlc29sdmVTZXEucmVzb2x2ZVNlcShkb2MsIGNzdCk7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZXEuaXRlbXMubGVuZ3RoOyArK2kpIHtcbiAgICBsZXQgaXRlbSA9IHNlcS5pdGVtc1tpXTtcbiAgICBpZiAoaXRlbSBpbnN0YW5jZW9mIHJlc29sdmVTZXEuUGFpcikgY29udGludWU7ZWxzZSBpZiAoaXRlbSBpbnN0YW5jZW9mIHJlc29sdmVTZXEuWUFNTE1hcCkge1xuICAgICAgaWYgKGl0ZW0uaXRlbXMubGVuZ3RoID4gMSkge1xuICAgICAgICBjb25zdCBtc2cgPSAnRWFjaCBwYWlyIG11c3QgaGF2ZSBpdHMgb3duIHNlcXVlbmNlIGluZGljYXRvcic7XG4gICAgICAgIHRocm93IG5ldyBQbGFpblZhbHVlLllBTUxTZW1hbnRpY0Vycm9yKGNzdCwgbXNnKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcGFpciA9IGl0ZW0uaXRlbXNbMF0gfHwgbmV3IHJlc29sdmVTZXEuUGFpcigpO1xuICAgICAgaWYgKGl0ZW0uY29tbWVudEJlZm9yZSkgcGFpci5jb21tZW50QmVmb3JlID0gcGFpci5jb21tZW50QmVmb3JlID8gYCR7aXRlbS5jb21tZW50QmVmb3JlfVxcbiR7cGFpci5jb21tZW50QmVmb3JlfWAgOiBpdGVtLmNvbW1lbnRCZWZvcmU7XG4gICAgICBpZiAoaXRlbS5jb21tZW50KSBwYWlyLmNvbW1lbnQgPSBwYWlyLmNvbW1lbnQgPyBgJHtpdGVtLmNvbW1lbnR9XFxuJHtwYWlyLmNvbW1lbnR9YCA6IGl0ZW0uY29tbWVudDtcbiAgICAgIGl0ZW0gPSBwYWlyO1xuICAgIH1cbiAgICBzZXEuaXRlbXNbaV0gPSBpdGVtIGluc3RhbmNlb2YgcmVzb2x2ZVNlcS5QYWlyID8gaXRlbSA6IG5ldyByZXNvbHZlU2VxLlBhaXIoaXRlbSk7XG4gIH1cblxuICByZXR1cm4gc2VxO1xufVxuZnVuY3Rpb24gY3JlYXRlUGFpcnMoc2NoZW1hLCBpdGVyYWJsZSwgY3R4KSB7XG4gIGNvbnN0IHBhaXJzID0gbmV3IHJlc29sdmVTZXEuWUFNTFNlcShzY2hlbWEpO1xuICBwYWlycy50YWcgPSAndGFnOnlhbWwub3JnLDIwMDI6cGFpcnMnO1xuXG4gIGZvciAoY29uc3QgaXQgb2YgaXRlcmFibGUpIHtcbiAgICBsZXQga2V5LCB2YWx1ZTtcblxuICAgIGlmIChBcnJheS5pc0FycmF5KGl0KSkge1xuICAgICAgaWYgKGl0Lmxlbmd0aCA9PT0gMikge1xuICAgICAgICBrZXkgPSBpdFswXTtcbiAgICAgICAgdmFsdWUgPSBpdFsxXTtcbiAgICAgIH0gZWxzZSB0aHJvdyBuZXcgVHlwZUVycm9yKGBFeHBlY3RlZCBba2V5LCB2YWx1ZV0gdHVwbGU6ICR7aXR9YCk7XG4gICAgfSBlbHNlIGlmIChpdCAmJiBpdCBpbnN0YW5jZW9mIE9iamVjdCkge1xuICAgICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKGl0KTtcblxuICAgICAgaWYgKGtleXMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIGtleSA9IGtleXNbMF07XG4gICAgICAgIHZhbHVlID0gaXRba2V5XTtcbiAgICAgIH0gZWxzZSB0aHJvdyBuZXcgVHlwZUVycm9yKGBFeHBlY3RlZCB7IGtleTogdmFsdWUgfSB0dXBsZTogJHtpdH1gKTtcbiAgICB9IGVsc2Uge1xuICAgICAga2V5ID0gaXQ7XG4gICAgfVxuXG4gICAgY29uc3QgcGFpciA9IHNjaGVtYS5jcmVhdGVQYWlyKGtleSwgdmFsdWUsIGN0eCk7XG4gICAgcGFpcnMuaXRlbXMucHVzaChwYWlyKTtcbiAgfVxuXG4gIHJldHVybiBwYWlycztcbn1cbmNvbnN0IHBhaXJzID0ge1xuICBkZWZhdWx0OiBmYWxzZSxcbiAgdGFnOiAndGFnOnlhbWwub3JnLDIwMDI6cGFpcnMnLFxuICByZXNvbHZlOiBwYXJzZVBhaXJzLFxuICBjcmVhdGVOb2RlOiBjcmVhdGVQYWlyc1xufTtcblxuY2xhc3MgWUFNTE9NYXAgZXh0ZW5kcyByZXNvbHZlU2VxLllBTUxTZXEge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgUGxhaW5WYWx1ZS5fZGVmaW5lUHJvcGVydHkodGhpcywgXCJhZGRcIiwgcmVzb2x2ZVNlcS5ZQU1MTWFwLnByb3RvdHlwZS5hZGQuYmluZCh0aGlzKSk7XG5cbiAgICBQbGFpblZhbHVlLl9kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcImRlbGV0ZVwiLCByZXNvbHZlU2VxLllBTUxNYXAucHJvdG90eXBlLmRlbGV0ZS5iaW5kKHRoaXMpKTtcblxuICAgIFBsYWluVmFsdWUuX2RlZmluZVByb3BlcnR5KHRoaXMsIFwiZ2V0XCIsIHJlc29sdmVTZXEuWUFNTE1hcC5wcm90b3R5cGUuZ2V0LmJpbmQodGhpcykpO1xuXG4gICAgUGxhaW5WYWx1ZS5fZGVmaW5lUHJvcGVydHkodGhpcywgXCJoYXNcIiwgcmVzb2x2ZVNlcS5ZQU1MTWFwLnByb3RvdHlwZS5oYXMuYmluZCh0aGlzKSk7XG5cbiAgICBQbGFpblZhbHVlLl9kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcInNldFwiLCByZXNvbHZlU2VxLllBTUxNYXAucHJvdG90eXBlLnNldC5iaW5kKHRoaXMpKTtcblxuICAgIHRoaXMudGFnID0gWUFNTE9NYXAudGFnO1xuICB9XG5cbiAgdG9KU09OKF8sIGN0eCkge1xuICAgIGNvbnN0IG1hcCA9IG5ldyBNYXAoKTtcbiAgICBpZiAoY3R4ICYmIGN0eC5vbkNyZWF0ZSkgY3R4Lm9uQ3JlYXRlKG1hcCk7XG5cbiAgICBmb3IgKGNvbnN0IHBhaXIgb2YgdGhpcy5pdGVtcykge1xuICAgICAgbGV0IGtleSwgdmFsdWU7XG5cbiAgICAgIGlmIChwYWlyIGluc3RhbmNlb2YgcmVzb2x2ZVNlcS5QYWlyKSB7XG4gICAgICAgIGtleSA9IHJlc29sdmVTZXEudG9KU09OKHBhaXIua2V5LCAnJywgY3R4KTtcbiAgICAgICAgdmFsdWUgPSByZXNvbHZlU2VxLnRvSlNPTihwYWlyLnZhbHVlLCBrZXksIGN0eCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBrZXkgPSByZXNvbHZlU2VxLnRvSlNPTihwYWlyLCAnJywgY3R4KTtcbiAgICAgIH1cblxuICAgICAgaWYgKG1hcC5oYXMoa2V5KSkgdGhyb3cgbmV3IEVycm9yKCdPcmRlcmVkIG1hcHMgbXVzdCBub3QgaW5jbHVkZSBkdXBsaWNhdGUga2V5cycpO1xuICAgICAgbWFwLnNldChrZXksIHZhbHVlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWFwO1xuICB9XG5cbn1cblxuUGxhaW5WYWx1ZS5fZGVmaW5lUHJvcGVydHkoWUFNTE9NYXAsIFwidGFnXCIsICd0YWc6eWFtbC5vcmcsMjAwMjpvbWFwJyk7XG5cbmZ1bmN0aW9uIHBhcnNlT01hcChkb2MsIGNzdCkge1xuICBjb25zdCBwYWlycyA9IHBhcnNlUGFpcnMoZG9jLCBjc3QpO1xuICBjb25zdCBzZWVuS2V5cyA9IFtdO1xuXG4gIGZvciAoY29uc3Qge1xuICAgIGtleVxuICB9IG9mIHBhaXJzLml0ZW1zKSB7XG4gICAgaWYgKGtleSBpbnN0YW5jZW9mIHJlc29sdmVTZXEuU2NhbGFyKSB7XG4gICAgICBpZiAoc2VlbktleXMuaW5jbHVkZXMoa2V5LnZhbHVlKSkge1xuICAgICAgICBjb25zdCBtc2cgPSAnT3JkZXJlZCBtYXBzIG11c3Qgbm90IGluY2x1ZGUgZHVwbGljYXRlIGtleXMnO1xuICAgICAgICB0aHJvdyBuZXcgUGxhaW5WYWx1ZS5ZQU1MU2VtYW50aWNFcnJvcihjc3QsIG1zZyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZWVuS2V5cy5wdXNoKGtleS52YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIE9iamVjdC5hc3NpZ24obmV3IFlBTUxPTWFwKCksIHBhaXJzKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlT01hcChzY2hlbWEsIGl0ZXJhYmxlLCBjdHgpIHtcbiAgY29uc3QgcGFpcnMgPSBjcmVhdGVQYWlycyhzY2hlbWEsIGl0ZXJhYmxlLCBjdHgpO1xuICBjb25zdCBvbWFwID0gbmV3IFlBTUxPTWFwKCk7XG4gIG9tYXAuaXRlbXMgPSBwYWlycy5pdGVtcztcbiAgcmV0dXJuIG9tYXA7XG59XG5cbmNvbnN0IG9tYXAgPSB7XG4gIGlkZW50aWZ5OiB2YWx1ZSA9PiB2YWx1ZSBpbnN0YW5jZW9mIE1hcCxcbiAgbm9kZUNsYXNzOiBZQU1MT01hcCxcbiAgZGVmYXVsdDogZmFsc2UsXG4gIHRhZzogJ3RhZzp5YW1sLm9yZywyMDAyOm9tYXAnLFxuICByZXNvbHZlOiBwYXJzZU9NYXAsXG4gIGNyZWF0ZU5vZGU6IGNyZWF0ZU9NYXBcbn07XG5cbmNsYXNzIFlBTUxTZXQgZXh0ZW5kcyByZXNvbHZlU2VxLllBTUxNYXAge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMudGFnID0gWUFNTFNldC50YWc7XG4gIH1cblxuICBhZGQoa2V5KSB7XG4gICAgY29uc3QgcGFpciA9IGtleSBpbnN0YW5jZW9mIHJlc29sdmVTZXEuUGFpciA/IGtleSA6IG5ldyByZXNvbHZlU2VxLlBhaXIoa2V5KTtcbiAgICBjb25zdCBwcmV2ID0gcmVzb2x2ZVNlcS5maW5kUGFpcih0aGlzLml0ZW1zLCBwYWlyLmtleSk7XG4gICAgaWYgKCFwcmV2KSB0aGlzLml0ZW1zLnB1c2gocGFpcik7XG4gIH1cblxuICBnZXQoa2V5LCBrZWVwUGFpcikge1xuICAgIGNvbnN0IHBhaXIgPSByZXNvbHZlU2VxLmZpbmRQYWlyKHRoaXMuaXRlbXMsIGtleSk7XG4gICAgcmV0dXJuICFrZWVwUGFpciAmJiBwYWlyIGluc3RhbmNlb2YgcmVzb2x2ZVNlcS5QYWlyID8gcGFpci5rZXkgaW5zdGFuY2VvZiByZXNvbHZlU2VxLlNjYWxhciA/IHBhaXIua2V5LnZhbHVlIDogcGFpci5rZXkgOiBwYWlyO1xuICB9XG5cbiAgc2V0KGtleSwgdmFsdWUpIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnYm9vbGVhbicpIHRocm93IG5ldyBFcnJvcihgRXhwZWN0ZWQgYm9vbGVhbiB2YWx1ZSBmb3Igc2V0KGtleSwgdmFsdWUpIGluIGEgWUFNTCBzZXQsIG5vdCAke3R5cGVvZiB2YWx1ZX1gKTtcbiAgICBjb25zdCBwcmV2ID0gcmVzb2x2ZVNlcS5maW5kUGFpcih0aGlzLml0ZW1zLCBrZXkpO1xuXG4gICAgaWYgKHByZXYgJiYgIXZhbHVlKSB7XG4gICAgICB0aGlzLml0ZW1zLnNwbGljZSh0aGlzLml0ZW1zLmluZGV4T2YocHJldiksIDEpO1xuICAgIH0gZWxzZSBpZiAoIXByZXYgJiYgdmFsdWUpIHtcbiAgICAgIHRoaXMuaXRlbXMucHVzaChuZXcgcmVzb2x2ZVNlcS5QYWlyKGtleSkpO1xuICAgIH1cbiAgfVxuXG4gIHRvSlNPTihfLCBjdHgpIHtcbiAgICByZXR1cm4gc3VwZXIudG9KU09OKF8sIGN0eCwgU2V0KTtcbiAgfVxuXG4gIHRvU3RyaW5nKGN0eCwgb25Db21tZW50LCBvbkNob21wS2VlcCkge1xuICAgIGlmICghY3R4KSByZXR1cm4gSlNPTi5zdHJpbmdpZnkodGhpcyk7XG4gICAgaWYgKHRoaXMuaGFzQWxsTnVsbFZhbHVlcygpKSByZXR1cm4gc3VwZXIudG9TdHJpbmcoY3R4LCBvbkNvbW1lbnQsIG9uQ2hvbXBLZWVwKTtlbHNlIHRocm93IG5ldyBFcnJvcignU2V0IGl0ZW1zIG11c3QgYWxsIGhhdmUgbnVsbCB2YWx1ZXMnKTtcbiAgfVxuXG59XG5cblBsYWluVmFsdWUuX2RlZmluZVByb3BlcnR5KFlBTUxTZXQsIFwidGFnXCIsICd0YWc6eWFtbC5vcmcsMjAwMjpzZXQnKTtcblxuZnVuY3Rpb24gcGFyc2VTZXQoZG9jLCBjc3QpIHtcbiAgY29uc3QgbWFwID0gcmVzb2x2ZVNlcS5yZXNvbHZlTWFwKGRvYywgY3N0KTtcbiAgaWYgKCFtYXAuaGFzQWxsTnVsbFZhbHVlcygpKSB0aHJvdyBuZXcgUGxhaW5WYWx1ZS5ZQU1MU2VtYW50aWNFcnJvcihjc3QsICdTZXQgaXRlbXMgbXVzdCBhbGwgaGF2ZSBudWxsIHZhbHVlcycpO1xuICByZXR1cm4gT2JqZWN0LmFzc2lnbihuZXcgWUFNTFNldCgpLCBtYXApO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVTZXQoc2NoZW1hLCBpdGVyYWJsZSwgY3R4KSB7XG4gIGNvbnN0IHNldCA9IG5ldyBZQU1MU2V0KCk7XG5cbiAgZm9yIChjb25zdCB2YWx1ZSBvZiBpdGVyYWJsZSkgc2V0Lml0ZW1zLnB1c2goc2NoZW1hLmNyZWF0ZVBhaXIodmFsdWUsIG51bGwsIGN0eCkpO1xuXG4gIHJldHVybiBzZXQ7XG59XG5cbmNvbnN0IHNldCA9IHtcbiAgaWRlbnRpZnk6IHZhbHVlID0+IHZhbHVlIGluc3RhbmNlb2YgU2V0LFxuICBub2RlQ2xhc3M6IFlBTUxTZXQsXG4gIGRlZmF1bHQ6IGZhbHNlLFxuICB0YWc6ICd0YWc6eWFtbC5vcmcsMjAwMjpzZXQnLFxuICByZXNvbHZlOiBwYXJzZVNldCxcbiAgY3JlYXRlTm9kZTogY3JlYXRlU2V0XG59O1xuXG5jb25zdCBwYXJzZVNleGFnZXNpbWFsID0gKHNpZ24sIHBhcnRzKSA9PiB7XG4gIGNvbnN0IG4gPSBwYXJ0cy5zcGxpdCgnOicpLnJlZHVjZSgobiwgcCkgPT4gbiAqIDYwICsgTnVtYmVyKHApLCAwKTtcbiAgcmV0dXJuIHNpZ24gPT09ICctJyA/IC1uIDogbjtcbn07IC8vIGhoaGg6bW06c3Muc3NzXG5cblxuY29uc3Qgc3RyaW5naWZ5U2V4YWdlc2ltYWwgPSAoe1xuICB2YWx1ZVxufSkgPT4ge1xuICBpZiAoaXNOYU4odmFsdWUpIHx8ICFpc0Zpbml0ZSh2YWx1ZSkpIHJldHVybiByZXNvbHZlU2VxLnN0cmluZ2lmeU51bWJlcih2YWx1ZSk7XG4gIGxldCBzaWduID0gJyc7XG5cbiAgaWYgKHZhbHVlIDwgMCkge1xuICAgIHNpZ24gPSAnLSc7XG4gICAgdmFsdWUgPSBNYXRoLmFicyh2YWx1ZSk7XG4gIH1cblxuICBjb25zdCBwYXJ0cyA9IFt2YWx1ZSAlIDYwXTsgLy8gc2Vjb25kcywgaW5jbHVkaW5nIG1zXG5cbiAgaWYgKHZhbHVlIDwgNjApIHtcbiAgICBwYXJ0cy51bnNoaWZ0KDApOyAvLyBhdCBsZWFzdCBvbmUgOiBpcyByZXF1aXJlZFxuICB9IGVsc2Uge1xuICAgIHZhbHVlID0gTWF0aC5yb3VuZCgodmFsdWUgLSBwYXJ0c1swXSkgLyA2MCk7XG4gICAgcGFydHMudW5zaGlmdCh2YWx1ZSAlIDYwKTsgLy8gbWludXRlc1xuXG4gICAgaWYgKHZhbHVlID49IDYwKSB7XG4gICAgICB2YWx1ZSA9IE1hdGgucm91bmQoKHZhbHVlIC0gcGFydHNbMF0pIC8gNjApO1xuICAgICAgcGFydHMudW5zaGlmdCh2YWx1ZSk7IC8vIGhvdXJzXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHNpZ24gKyBwYXJ0cy5tYXAobiA9PiBuIDwgMTAgPyAnMCcgKyBTdHJpbmcobikgOiBTdHJpbmcobikpLmpvaW4oJzonKS5yZXBsYWNlKC8wMDAwMDBcXGQqJC8sICcnKSAvLyAlIDYwIG1heSBpbnRyb2R1Y2UgZXJyb3JcbiAgO1xufTtcblxuY29uc3QgaW50VGltZSA9IHtcbiAgaWRlbnRpZnk6IHZhbHVlID0+IHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicsXG4gIGRlZmF1bHQ6IHRydWUsXG4gIHRhZzogJ3RhZzp5YW1sLm9yZywyMDAyOmludCcsXG4gIGZvcm1hdDogJ1RJTUUnLFxuICB0ZXN0OiAvXihbLStdPykoWzAtOV1bMC05X10qKD86OlswLTVdP1swLTldKSspJC8sXG4gIHJlc29sdmU6IChzdHIsIHNpZ24sIHBhcnRzKSA9PiBwYXJzZVNleGFnZXNpbWFsKHNpZ24sIHBhcnRzLnJlcGxhY2UoL18vZywgJycpKSxcbiAgc3RyaW5naWZ5OiBzdHJpbmdpZnlTZXhhZ2VzaW1hbFxufTtcbmNvbnN0IGZsb2F0VGltZSA9IHtcbiAgaWRlbnRpZnk6IHZhbHVlID0+IHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicsXG4gIGRlZmF1bHQ6IHRydWUsXG4gIHRhZzogJ3RhZzp5YW1sLm9yZywyMDAyOmZsb2F0JyxcbiAgZm9ybWF0OiAnVElNRScsXG4gIHRlc3Q6IC9eKFstK10/KShbMC05XVswLTlfXSooPzo6WzAtNV0/WzAtOV0pK1xcLlswLTlfXSopJC8sXG4gIHJlc29sdmU6IChzdHIsIHNpZ24sIHBhcnRzKSA9PiBwYXJzZVNleGFnZXNpbWFsKHNpZ24sIHBhcnRzLnJlcGxhY2UoL18vZywgJycpKSxcbiAgc3RyaW5naWZ5OiBzdHJpbmdpZnlTZXhhZ2VzaW1hbFxufTtcbmNvbnN0IHRpbWVzdGFtcCA9IHtcbiAgaWRlbnRpZnk6IHZhbHVlID0+IHZhbHVlIGluc3RhbmNlb2YgRGF0ZSxcbiAgZGVmYXVsdDogdHJ1ZSxcbiAgdGFnOiAndGFnOnlhbWwub3JnLDIwMDI6dGltZXN0YW1wJyxcbiAgLy8gSWYgdGhlIHRpbWUgem9uZSBpcyBvbWl0dGVkLCB0aGUgdGltZXN0YW1wIGlzIGFzc3VtZWQgdG8gYmUgc3BlY2lmaWVkIGluIFVUQy4gVGhlIHRpbWUgcGFydFxuICAvLyBtYXkgYmUgb21pdHRlZCBhbHRvZ2V0aGVyLCByZXN1bHRpbmcgaW4gYSBkYXRlIGZvcm1hdC4gSW4gc3VjaCBhIGNhc2UsIHRoZSB0aW1lIHBhcnQgaXNcbiAgLy8gYXNzdW1lZCB0byBiZSAwMDowMDowMFogKHN0YXJ0IG9mIGRheSwgVVRDKS5cbiAgdGVzdDogUmVnRXhwKCdeKD86JyArICcoWzAtOV17NH0pLShbMC05XXsxLDJ9KS0oWzAtOV17MSwyfSknICsgLy8gWVlZWS1NbS1EZFxuICAnKD86KD86dHxUfFsgXFxcXHRdKyknICsgLy8gdCB8IFQgfCB3aGl0ZXNwYWNlXG4gICcoWzAtOV17MSwyfSk6KFswLTldezEsMn0pOihbMC05XXsxLDJ9KFxcXFwuWzAtOV0rKT8pJyArIC8vIEhoOk1tOlNzKC5zcyk/XG4gICcoPzpbIFxcXFx0XSooWnxbLStdWzAxMl0/WzAtOV0oPzo6WzAtOV17Mn0pPykpPycgKyAvLyBaIHwgKzUgfCAtMDM6MzBcbiAgJyk/JyArICcpJCcpLFxuICByZXNvbHZlOiAoc3RyLCB5ZWFyLCBtb250aCwgZGF5LCBob3VyLCBtaW51dGUsIHNlY29uZCwgbWlsbGlzZWMsIHR6KSA9PiB7XG4gICAgaWYgKG1pbGxpc2VjKSBtaWxsaXNlYyA9IChtaWxsaXNlYyArICcwMCcpLnN1YnN0cigxLCAzKTtcbiAgICBsZXQgZGF0ZSA9IERhdGUuVVRDKHllYXIsIG1vbnRoIC0gMSwgZGF5LCBob3VyIHx8IDAsIG1pbnV0ZSB8fCAwLCBzZWNvbmQgfHwgMCwgbWlsbGlzZWMgfHwgMCk7XG5cbiAgICBpZiAodHogJiYgdHogIT09ICdaJykge1xuICAgICAgbGV0IGQgPSBwYXJzZVNleGFnZXNpbWFsKHR6WzBdLCB0ei5zbGljZSgxKSk7XG4gICAgICBpZiAoTWF0aC5hYnMoZCkgPCAzMCkgZCAqPSA2MDtcbiAgICAgIGRhdGUgLT0gNjAwMDAgKiBkO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgRGF0ZShkYXRlKTtcbiAgfSxcbiAgc3RyaW5naWZ5OiAoe1xuICAgIHZhbHVlXG4gIH0pID0+IHZhbHVlLnRvSVNPU3RyaW5nKCkucmVwbGFjZSgvKChUMDA6MDApPzowMCk/XFwuMDAwWiQvLCAnJylcbn07XG5cbi8qIGdsb2JhbCBjb25zb2xlLCBwcm9jZXNzLCBZQU1MX1NJTEVOQ0VfREVQUkVDQVRJT05fV0FSTklOR1MsIFlBTUxfU0lMRU5DRV9XQVJOSU5HUyAqL1xuZnVuY3Rpb24gc2hvdWxkV2FybihkZXByZWNhdGlvbikge1xuICBjb25zdCBlbnYgPSB0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYgcHJvY2Vzcy5lbnYgfHwge307XG5cbiAgaWYgKGRlcHJlY2F0aW9uKSB7XG4gICAgaWYgKHR5cGVvZiBZQU1MX1NJTEVOQ0VfREVQUkVDQVRJT05fV0FSTklOR1MgIT09ICd1bmRlZmluZWQnKSByZXR1cm4gIVlBTUxfU0lMRU5DRV9ERVBSRUNBVElPTl9XQVJOSU5HUztcbiAgICByZXR1cm4gIWVudi5ZQU1MX1NJTEVOQ0VfREVQUkVDQVRJT05fV0FSTklOR1M7XG4gIH1cblxuICBpZiAodHlwZW9mIFlBTUxfU0lMRU5DRV9XQVJOSU5HUyAhPT0gJ3VuZGVmaW5lZCcpIHJldHVybiAhWUFNTF9TSUxFTkNFX1dBUk5JTkdTO1xuICByZXR1cm4gIWVudi5ZQU1MX1NJTEVOQ0VfV0FSTklOR1M7XG59XG5cbmZ1bmN0aW9uIHdhcm4od2FybmluZywgdHlwZSkge1xuICBpZiAoc2hvdWxkV2FybihmYWxzZSkpIHtcbiAgICBjb25zdCBlbWl0ID0gdHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnICYmIHByb2Nlc3MuZW1pdFdhcm5pbmc7IC8vIFRoaXMgd2lsbCB0aHJvdyBpbiBKZXN0IGlmIGB3YXJuaW5nYCBpcyBhbiBFcnJvciBpbnN0YW5jZSBkdWUgdG9cbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svamVzdC9pc3N1ZXMvMjU0OVxuXG4gICAgaWYgKGVtaXQpIGVtaXQod2FybmluZywgdHlwZSk7ZWxzZSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgY29uc29sZS53YXJuKHR5cGUgPyBgJHt0eXBlfTogJHt3YXJuaW5nfWAgOiB3YXJuaW5nKTtcbiAgICB9XG4gIH1cbn1cbmZ1bmN0aW9uIHdhcm5GaWxlRGVwcmVjYXRpb24oZmlsZW5hbWUpIHtcbiAgaWYgKHNob3VsZFdhcm4odHJ1ZSkpIHtcbiAgICBjb25zdCBwYXRoID0gZmlsZW5hbWUucmVwbGFjZSgvLip5YW1sWy9cXFxcXS9pLCAnJykucmVwbGFjZSgvXFwuanMkLywgJycpLnJlcGxhY2UoL1xcXFwvZywgJy8nKTtcbiAgICB3YXJuKGBUaGUgZW5kcG9pbnQgJ3lhbWwvJHtwYXRofScgd2lsbCBiZSByZW1vdmVkIGluIGEgZnV0dXJlIHJlbGVhc2UuYCwgJ0RlcHJlY2F0aW9uV2FybmluZycpO1xuICB9XG59XG5jb25zdCB3YXJuZWQgPSB7fTtcbmZ1bmN0aW9uIHdhcm5PcHRpb25EZXByZWNhdGlvbihuYW1lLCBhbHRlcm5hdGl2ZSkge1xuICBpZiAoIXdhcm5lZFtuYW1lXSAmJiBzaG91bGRXYXJuKHRydWUpKSB7XG4gICAgd2FybmVkW25hbWVdID0gdHJ1ZTtcbiAgICBsZXQgbXNnID0gYFRoZSBvcHRpb24gJyR7bmFtZX0nIHdpbGwgYmUgcmVtb3ZlZCBpbiBhIGZ1dHVyZSByZWxlYXNlYDtcbiAgICBtc2cgKz0gYWx0ZXJuYXRpdmUgPyBgLCB1c2UgJyR7YWx0ZXJuYXRpdmV9JyBpbnN0ZWFkLmAgOiAnLic7XG4gICAgd2Fybihtc2csICdEZXByZWNhdGlvbldhcm5pbmcnKTtcbiAgfVxufVxuXG5leHBvcnRzLmJpbmFyeSA9IGJpbmFyeTtcbmV4cG9ydHMuZmxvYXRUaW1lID0gZmxvYXRUaW1lO1xuZXhwb3J0cy5pbnRUaW1lID0gaW50VGltZTtcbmV4cG9ydHMub21hcCA9IG9tYXA7XG5leHBvcnRzLnBhaXJzID0gcGFpcnM7XG5leHBvcnRzLnNldCA9IHNldDtcbmV4cG9ydHMudGltZXN0YW1wID0gdGltZXN0YW1wO1xuZXhwb3J0cy53YXJuID0gd2FybjtcbmV4cG9ydHMud2FybkZpbGVEZXByZWNhdGlvbiA9IHdhcm5GaWxlRGVwcmVjYXRpb247XG5leHBvcnRzLndhcm5PcHRpb25EZXByZWNhdGlvbiA9IHdhcm5PcHRpb25EZXByZWNhdGlvbjtcbiIsICIndXNlIHN0cmljdCc7XG5cbnZhciBQbGFpblZhbHVlID0gcmVxdWlyZSgnLi9QbGFpblZhbHVlLWVjOGU1ODhlLmpzJyk7XG52YXIgcmVzb2x2ZVNlcSA9IHJlcXVpcmUoJy4vcmVzb2x2ZVNlcS1kMDNjYjAzNy5qcycpO1xudmFyIHdhcm5pbmdzID0gcmVxdWlyZSgnLi93YXJuaW5ncy0xMDAwYTM3Mi5qcycpO1xuXG5mdW5jdGlvbiBjcmVhdGVNYXAoc2NoZW1hLCBvYmosIGN0eCkge1xuICBjb25zdCBtYXAgPSBuZXcgcmVzb2x2ZVNlcS5ZQU1MTWFwKHNjaGVtYSk7XG5cbiAgaWYgKG9iaiBpbnN0YW5jZW9mIE1hcCkge1xuICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIG9iaikgbWFwLml0ZW1zLnB1c2goc2NoZW1hLmNyZWF0ZVBhaXIoa2V5LCB2YWx1ZSwgY3R4KSk7XG4gIH0gZWxzZSBpZiAob2JqICYmIHR5cGVvZiBvYmogPT09ICdvYmplY3QnKSB7XG4gICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMob2JqKSkgbWFwLml0ZW1zLnB1c2goc2NoZW1hLmNyZWF0ZVBhaXIoa2V5LCBvYmpba2V5XSwgY3R4KSk7XG4gIH1cblxuICBpZiAodHlwZW9mIHNjaGVtYS5zb3J0TWFwRW50cmllcyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIG1hcC5pdGVtcy5zb3J0KHNjaGVtYS5zb3J0TWFwRW50cmllcyk7XG4gIH1cblxuICByZXR1cm4gbWFwO1xufVxuXG5jb25zdCBtYXAgPSB7XG4gIGNyZWF0ZU5vZGU6IGNyZWF0ZU1hcCxcbiAgZGVmYXVsdDogdHJ1ZSxcbiAgbm9kZUNsYXNzOiByZXNvbHZlU2VxLllBTUxNYXAsXG4gIHRhZzogJ3RhZzp5YW1sLm9yZywyMDAyOm1hcCcsXG4gIHJlc29sdmU6IHJlc29sdmVTZXEucmVzb2x2ZU1hcFxufTtcblxuZnVuY3Rpb24gY3JlYXRlU2VxKHNjaGVtYSwgb2JqLCBjdHgpIHtcbiAgY29uc3Qgc2VxID0gbmV3IHJlc29sdmVTZXEuWUFNTFNlcShzY2hlbWEpO1xuXG4gIGlmIChvYmogJiYgb2JqW1N5bWJvbC5pdGVyYXRvcl0pIHtcbiAgICBmb3IgKGNvbnN0IGl0IG9mIG9iaikge1xuICAgICAgY29uc3QgdiA9IHNjaGVtYS5jcmVhdGVOb2RlKGl0LCBjdHgud3JhcFNjYWxhcnMsIG51bGwsIGN0eCk7XG4gICAgICBzZXEuaXRlbXMucHVzaCh2KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gc2VxO1xufVxuXG5jb25zdCBzZXEgPSB7XG4gIGNyZWF0ZU5vZGU6IGNyZWF0ZVNlcSxcbiAgZGVmYXVsdDogdHJ1ZSxcbiAgbm9kZUNsYXNzOiByZXNvbHZlU2VxLllBTUxTZXEsXG4gIHRhZzogJ3RhZzp5YW1sLm9yZywyMDAyOnNlcScsXG4gIHJlc29sdmU6IHJlc29sdmVTZXEucmVzb2x2ZVNlcVxufTtcblxuY29uc3Qgc3RyaW5nID0ge1xuICBpZGVudGlmeTogdmFsdWUgPT4gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyxcbiAgZGVmYXVsdDogdHJ1ZSxcbiAgdGFnOiAndGFnOnlhbWwub3JnLDIwMDI6c3RyJyxcbiAgcmVzb2x2ZTogcmVzb2x2ZVNlcS5yZXNvbHZlU3RyaW5nLFxuXG4gIHN0cmluZ2lmeShpdGVtLCBjdHgsIG9uQ29tbWVudCwgb25DaG9tcEtlZXApIHtcbiAgICBjdHggPSBPYmplY3QuYXNzaWduKHtcbiAgICAgIGFjdHVhbFN0cmluZzogdHJ1ZVxuICAgIH0sIGN0eCk7XG4gICAgcmV0dXJuIHJlc29sdmVTZXEuc3RyaW5naWZ5U3RyaW5nKGl0ZW0sIGN0eCwgb25Db21tZW50LCBvbkNob21wS2VlcCk7XG4gIH0sXG5cbiAgb3B0aW9uczogcmVzb2x2ZVNlcS5zdHJPcHRpb25zXG59O1xuXG5jb25zdCBmYWlsc2FmZSA9IFttYXAsIHNlcSwgc3RyaW5nXTtcblxuLyogZ2xvYmFsIEJpZ0ludCAqL1xuXG5jb25zdCBpbnRJZGVudGlmeSQyID0gdmFsdWUgPT4gdHlwZW9mIHZhbHVlID09PSAnYmlnaW50JyB8fCBOdW1iZXIuaXNJbnRlZ2VyKHZhbHVlKTtcblxuY29uc3QgaW50UmVzb2x2ZSQxID0gKHNyYywgcGFydCwgcmFkaXgpID0+IHJlc29sdmVTZXEuaW50T3B0aW9ucy5hc0JpZ0ludCA/IEJpZ0ludChzcmMpIDogcGFyc2VJbnQocGFydCwgcmFkaXgpO1xuXG5mdW5jdGlvbiBpbnRTdHJpbmdpZnkkMShub2RlLCByYWRpeCwgcHJlZml4KSB7XG4gIGNvbnN0IHtcbiAgICB2YWx1ZVxuICB9ID0gbm9kZTtcbiAgaWYgKGludElkZW50aWZ5JDIodmFsdWUpICYmIHZhbHVlID49IDApIHJldHVybiBwcmVmaXggKyB2YWx1ZS50b1N0cmluZyhyYWRpeCk7XG4gIHJldHVybiByZXNvbHZlU2VxLnN0cmluZ2lmeU51bWJlcihub2RlKTtcbn1cblxuY29uc3QgbnVsbE9iaiA9IHtcbiAgaWRlbnRpZnk6IHZhbHVlID0+IHZhbHVlID09IG51bGwsXG4gIGNyZWF0ZU5vZGU6IChzY2hlbWEsIHZhbHVlLCBjdHgpID0+IGN0eC53cmFwU2NhbGFycyA/IG5ldyByZXNvbHZlU2VxLlNjYWxhcihudWxsKSA6IG51bGwsXG4gIGRlZmF1bHQ6IHRydWUsXG4gIHRhZzogJ3RhZzp5YW1sLm9yZywyMDAyOm51bGwnLFxuICB0ZXN0OiAvXig/On58W05uXXVsbHxOVUxMKT8kLyxcbiAgcmVzb2x2ZTogKCkgPT4gbnVsbCxcbiAgb3B0aW9uczogcmVzb2x2ZVNlcS5udWxsT3B0aW9ucyxcbiAgc3RyaW5naWZ5OiAoKSA9PiByZXNvbHZlU2VxLm51bGxPcHRpb25zLm51bGxTdHJcbn07XG5jb25zdCBib29sT2JqID0ge1xuICBpZGVudGlmeTogdmFsdWUgPT4gdHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbicsXG4gIGRlZmF1bHQ6IHRydWUsXG4gIHRhZzogJ3RhZzp5YW1sLm9yZywyMDAyOmJvb2wnLFxuICB0ZXN0OiAvXig/OltUdF1ydWV8VFJVRXxbRmZdYWxzZXxGQUxTRSkkLyxcbiAgcmVzb2x2ZTogc3RyID0+IHN0clswXSA9PT0gJ3QnIHx8IHN0clswXSA9PT0gJ1QnLFxuICBvcHRpb25zOiByZXNvbHZlU2VxLmJvb2xPcHRpb25zLFxuICBzdHJpbmdpZnk6ICh7XG4gICAgdmFsdWVcbiAgfSkgPT4gdmFsdWUgPyByZXNvbHZlU2VxLmJvb2xPcHRpb25zLnRydWVTdHIgOiByZXNvbHZlU2VxLmJvb2xPcHRpb25zLmZhbHNlU3RyXG59O1xuY29uc3Qgb2N0T2JqID0ge1xuICBpZGVudGlmeTogdmFsdWUgPT4gaW50SWRlbnRpZnkkMih2YWx1ZSkgJiYgdmFsdWUgPj0gMCxcbiAgZGVmYXVsdDogdHJ1ZSxcbiAgdGFnOiAndGFnOnlhbWwub3JnLDIwMDI6aW50JyxcbiAgZm9ybWF0OiAnT0NUJyxcbiAgdGVzdDogL14wbyhbMC03XSspJC8sXG4gIHJlc29sdmU6IChzdHIsIG9jdCkgPT4gaW50UmVzb2x2ZSQxKHN0ciwgb2N0LCA4KSxcbiAgb3B0aW9uczogcmVzb2x2ZVNlcS5pbnRPcHRpb25zLFxuICBzdHJpbmdpZnk6IG5vZGUgPT4gaW50U3RyaW5naWZ5JDEobm9kZSwgOCwgJzBvJylcbn07XG5jb25zdCBpbnRPYmogPSB7XG4gIGlkZW50aWZ5OiBpbnRJZGVudGlmeSQyLFxuICBkZWZhdWx0OiB0cnVlLFxuICB0YWc6ICd0YWc6eWFtbC5vcmcsMjAwMjppbnQnLFxuICB0ZXN0OiAvXlstK10/WzAtOV0rJC8sXG4gIHJlc29sdmU6IHN0ciA9PiBpbnRSZXNvbHZlJDEoc3RyLCBzdHIsIDEwKSxcbiAgb3B0aW9uczogcmVzb2x2ZVNlcS5pbnRPcHRpb25zLFxuICBzdHJpbmdpZnk6IHJlc29sdmVTZXEuc3RyaW5naWZ5TnVtYmVyXG59O1xuY29uc3QgaGV4T2JqID0ge1xuICBpZGVudGlmeTogdmFsdWUgPT4gaW50SWRlbnRpZnkkMih2YWx1ZSkgJiYgdmFsdWUgPj0gMCxcbiAgZGVmYXVsdDogdHJ1ZSxcbiAgdGFnOiAndGFnOnlhbWwub3JnLDIwMDI6aW50JyxcbiAgZm9ybWF0OiAnSEVYJyxcbiAgdGVzdDogL14weChbMC05YS1mQS1GXSspJC8sXG4gIHJlc29sdmU6IChzdHIsIGhleCkgPT4gaW50UmVzb2x2ZSQxKHN0ciwgaGV4LCAxNiksXG4gIG9wdGlvbnM6IHJlc29sdmVTZXEuaW50T3B0aW9ucyxcbiAgc3RyaW5naWZ5OiBub2RlID0+IGludFN0cmluZ2lmeSQxKG5vZGUsIDE2LCAnMHgnKVxufTtcbmNvbnN0IG5hbk9iaiA9IHtcbiAgaWRlbnRpZnk6IHZhbHVlID0+IHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicsXG4gIGRlZmF1bHQ6IHRydWUsXG4gIHRhZzogJ3RhZzp5YW1sLm9yZywyMDAyOmZsb2F0JyxcbiAgdGVzdDogL14oPzpbLStdP1xcLmluZnwoXFwubmFuKSkkL2ksXG4gIHJlc29sdmU6IChzdHIsIG5hbikgPT4gbmFuID8gTmFOIDogc3RyWzBdID09PSAnLScgPyBOdW1iZXIuTkVHQVRJVkVfSU5GSU5JVFkgOiBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFksXG4gIHN0cmluZ2lmeTogcmVzb2x2ZVNlcS5zdHJpbmdpZnlOdW1iZXJcbn07XG5jb25zdCBleHBPYmogPSB7XG4gIGlkZW50aWZ5OiB2YWx1ZSA9PiB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInLFxuICBkZWZhdWx0OiB0cnVlLFxuICB0YWc6ICd0YWc6eWFtbC5vcmcsMjAwMjpmbG9hdCcsXG4gIGZvcm1hdDogJ0VYUCcsXG4gIHRlc3Q6IC9eWy0rXT8oPzpcXC5bMC05XSt8WzAtOV0rKD86XFwuWzAtOV0qKT8pW2VFXVstK10/WzAtOV0rJC8sXG4gIHJlc29sdmU6IHN0ciA9PiBwYXJzZUZsb2F0KHN0ciksXG4gIHN0cmluZ2lmeTogKHtcbiAgICB2YWx1ZVxuICB9KSA9PiBOdW1iZXIodmFsdWUpLnRvRXhwb25lbnRpYWwoKVxufTtcbmNvbnN0IGZsb2F0T2JqID0ge1xuICBpZGVudGlmeTogdmFsdWUgPT4gdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyxcbiAgZGVmYXVsdDogdHJ1ZSxcbiAgdGFnOiAndGFnOnlhbWwub3JnLDIwMDI6ZmxvYXQnLFxuICB0ZXN0OiAvXlstK10/KD86XFwuKFswLTldKyl8WzAtOV0rXFwuKFswLTldKikpJC8sXG5cbiAgcmVzb2x2ZShzdHIsIGZyYWMxLCBmcmFjMikge1xuICAgIGNvbnN0IGZyYWMgPSBmcmFjMSB8fCBmcmFjMjtcbiAgICBjb25zdCBub2RlID0gbmV3IHJlc29sdmVTZXEuU2NhbGFyKHBhcnNlRmxvYXQoc3RyKSk7XG4gICAgaWYgKGZyYWMgJiYgZnJhY1tmcmFjLmxlbmd0aCAtIDFdID09PSAnMCcpIG5vZGUubWluRnJhY3Rpb25EaWdpdHMgPSBmcmFjLmxlbmd0aDtcbiAgICByZXR1cm4gbm9kZTtcbiAgfSxcblxuICBzdHJpbmdpZnk6IHJlc29sdmVTZXEuc3RyaW5naWZ5TnVtYmVyXG59O1xuY29uc3QgY29yZSA9IGZhaWxzYWZlLmNvbmNhdChbbnVsbE9iaiwgYm9vbE9iaiwgb2N0T2JqLCBpbnRPYmosIGhleE9iaiwgbmFuT2JqLCBleHBPYmosIGZsb2F0T2JqXSk7XG5cbi8qIGdsb2JhbCBCaWdJbnQgKi9cblxuY29uc3QgaW50SWRlbnRpZnkkMSA9IHZhbHVlID0+IHR5cGVvZiB2YWx1ZSA9PT0gJ2JpZ2ludCcgfHwgTnVtYmVyLmlzSW50ZWdlcih2YWx1ZSk7XG5cbmNvbnN0IHN0cmluZ2lmeUpTT04gPSAoe1xuICB2YWx1ZVxufSkgPT4gSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xuXG5jb25zdCBqc29uID0gW21hcCwgc2VxLCB7XG4gIGlkZW50aWZ5OiB2YWx1ZSA9PiB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnLFxuICBkZWZhdWx0OiB0cnVlLFxuICB0YWc6ICd0YWc6eWFtbC5vcmcsMjAwMjpzdHInLFxuICByZXNvbHZlOiByZXNvbHZlU2VxLnJlc29sdmVTdHJpbmcsXG4gIHN0cmluZ2lmeTogc3RyaW5naWZ5SlNPTlxufSwge1xuICBpZGVudGlmeTogdmFsdWUgPT4gdmFsdWUgPT0gbnVsbCxcbiAgY3JlYXRlTm9kZTogKHNjaGVtYSwgdmFsdWUsIGN0eCkgPT4gY3R4LndyYXBTY2FsYXJzID8gbmV3IHJlc29sdmVTZXEuU2NhbGFyKG51bGwpIDogbnVsbCxcbiAgZGVmYXVsdDogdHJ1ZSxcbiAgdGFnOiAndGFnOnlhbWwub3JnLDIwMDI6bnVsbCcsXG4gIHRlc3Q6IC9ebnVsbCQvLFxuICByZXNvbHZlOiAoKSA9PiBudWxsLFxuICBzdHJpbmdpZnk6IHN0cmluZ2lmeUpTT05cbn0sIHtcbiAgaWRlbnRpZnk6IHZhbHVlID0+IHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nLFxuICBkZWZhdWx0OiB0cnVlLFxuICB0YWc6ICd0YWc6eWFtbC5vcmcsMjAwMjpib29sJyxcbiAgdGVzdDogL150cnVlfGZhbHNlJC8sXG4gIHJlc29sdmU6IHN0ciA9PiBzdHIgPT09ICd0cnVlJyxcbiAgc3RyaW5naWZ5OiBzdHJpbmdpZnlKU09OXG59LCB7XG4gIGlkZW50aWZ5OiBpbnRJZGVudGlmeSQxLFxuICBkZWZhdWx0OiB0cnVlLFxuICB0YWc6ICd0YWc6eWFtbC5vcmcsMjAwMjppbnQnLFxuICB0ZXN0OiAvXi0/KD86MHxbMS05XVswLTldKikkLyxcbiAgcmVzb2x2ZTogc3RyID0+IHJlc29sdmVTZXEuaW50T3B0aW9ucy5hc0JpZ0ludCA/IEJpZ0ludChzdHIpIDogcGFyc2VJbnQoc3RyLCAxMCksXG4gIHN0cmluZ2lmeTogKHtcbiAgICB2YWx1ZVxuICB9KSA9PiBpbnRJZGVudGlmeSQxKHZhbHVlKSA/IHZhbHVlLnRvU3RyaW5nKCkgOiBKU09OLnN0cmluZ2lmeSh2YWx1ZSlcbn0sIHtcbiAgaWRlbnRpZnk6IHZhbHVlID0+IHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicsXG4gIGRlZmF1bHQ6IHRydWUsXG4gIHRhZzogJ3RhZzp5YW1sLm9yZywyMDAyOmZsb2F0JyxcbiAgdGVzdDogL14tPyg/OjB8WzEtOV1bMC05XSopKD86XFwuWzAtOV0qKT8oPzpbZUVdWy0rXT9bMC05XSspPyQvLFxuICByZXNvbHZlOiBzdHIgPT4gcGFyc2VGbG9hdChzdHIpLFxuICBzdHJpbmdpZnk6IHN0cmluZ2lmeUpTT05cbn1dO1xuXG5qc29uLnNjYWxhckZhbGxiYWNrID0gc3RyID0+IHtcbiAgdGhyb3cgbmV3IFN5bnRheEVycm9yKGBVbnJlc29sdmVkIHBsYWluIHNjYWxhciAke0pTT04uc3RyaW5naWZ5KHN0cil9YCk7XG59O1xuXG4vKiBnbG9iYWwgQmlnSW50ICovXG5cbmNvbnN0IGJvb2xTdHJpbmdpZnkgPSAoe1xuICB2YWx1ZVxufSkgPT4gdmFsdWUgPyByZXNvbHZlU2VxLmJvb2xPcHRpb25zLnRydWVTdHIgOiByZXNvbHZlU2VxLmJvb2xPcHRpb25zLmZhbHNlU3RyO1xuXG5jb25zdCBpbnRJZGVudGlmeSA9IHZhbHVlID0+IHR5cGVvZiB2YWx1ZSA9PT0gJ2JpZ2ludCcgfHwgTnVtYmVyLmlzSW50ZWdlcih2YWx1ZSk7XG5cbmZ1bmN0aW9uIGludFJlc29sdmUoc2lnbiwgc3JjLCByYWRpeCkge1xuICBsZXQgc3RyID0gc3JjLnJlcGxhY2UoL18vZywgJycpO1xuXG4gIGlmIChyZXNvbHZlU2VxLmludE9wdGlvbnMuYXNCaWdJbnQpIHtcbiAgICBzd2l0Y2ggKHJhZGl4KSB7XG4gICAgICBjYXNlIDI6XG4gICAgICAgIHN0ciA9IGAwYiR7c3RyfWA7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIDg6XG4gICAgICAgIHN0ciA9IGAwbyR7c3RyfWA7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIDE2OlxuICAgICAgICBzdHIgPSBgMHgke3N0cn1gO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBjb25zdCBuID0gQmlnSW50KHN0cik7XG4gICAgcmV0dXJuIHNpZ24gPT09ICctJyA/IEJpZ0ludCgtMSkgKiBuIDogbjtcbiAgfVxuXG4gIGNvbnN0IG4gPSBwYXJzZUludChzdHIsIHJhZGl4KTtcbiAgcmV0dXJuIHNpZ24gPT09ICctJyA/IC0xICogbiA6IG47XG59XG5cbmZ1bmN0aW9uIGludFN0cmluZ2lmeShub2RlLCByYWRpeCwgcHJlZml4KSB7XG4gIGNvbnN0IHtcbiAgICB2YWx1ZVxuICB9ID0gbm9kZTtcblxuICBpZiAoaW50SWRlbnRpZnkodmFsdWUpKSB7XG4gICAgY29uc3Qgc3RyID0gdmFsdWUudG9TdHJpbmcocmFkaXgpO1xuICAgIHJldHVybiB2YWx1ZSA8IDAgPyAnLScgKyBwcmVmaXggKyBzdHIuc3Vic3RyKDEpIDogcHJlZml4ICsgc3RyO1xuICB9XG5cbiAgcmV0dXJuIHJlc29sdmVTZXEuc3RyaW5naWZ5TnVtYmVyKG5vZGUpO1xufVxuXG5jb25zdCB5YW1sMTEgPSBmYWlsc2FmZS5jb25jYXQoW3tcbiAgaWRlbnRpZnk6IHZhbHVlID0+IHZhbHVlID09IG51bGwsXG4gIGNyZWF0ZU5vZGU6IChzY2hlbWEsIHZhbHVlLCBjdHgpID0+IGN0eC53cmFwU2NhbGFycyA/IG5ldyByZXNvbHZlU2VxLlNjYWxhcihudWxsKSA6IG51bGwsXG4gIGRlZmF1bHQ6IHRydWUsXG4gIHRhZzogJ3RhZzp5YW1sLm9yZywyMDAyOm51bGwnLFxuICB0ZXN0OiAvXig/On58W05uXXVsbHxOVUxMKT8kLyxcbiAgcmVzb2x2ZTogKCkgPT4gbnVsbCxcbiAgb3B0aW9uczogcmVzb2x2ZVNlcS5udWxsT3B0aW9ucyxcbiAgc3RyaW5naWZ5OiAoKSA9PiByZXNvbHZlU2VxLm51bGxPcHRpb25zLm51bGxTdHJcbn0sIHtcbiAgaWRlbnRpZnk6IHZhbHVlID0+IHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nLFxuICBkZWZhdWx0OiB0cnVlLFxuICB0YWc6ICd0YWc6eWFtbC5vcmcsMjAwMjpib29sJyxcbiAgdGVzdDogL14oPzpZfHl8W1l5XWVzfFlFU3xbVHRdcnVlfFRSVUV8W09vXW58T04pJC8sXG4gIHJlc29sdmU6ICgpID0+IHRydWUsXG4gIG9wdGlvbnM6IHJlc29sdmVTZXEuYm9vbE9wdGlvbnMsXG4gIHN0cmluZ2lmeTogYm9vbFN0cmluZ2lmeVxufSwge1xuICBpZGVudGlmeTogdmFsdWUgPT4gdHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbicsXG4gIGRlZmF1bHQ6IHRydWUsXG4gIHRhZzogJ3RhZzp5YW1sLm9yZywyMDAyOmJvb2wnLFxuICB0ZXN0OiAvXig/Ok58bnxbTm5db3xOT3xbRmZdYWxzZXxGQUxTRXxbT29dZmZ8T0ZGKSQvaSxcbiAgcmVzb2x2ZTogKCkgPT4gZmFsc2UsXG4gIG9wdGlvbnM6IHJlc29sdmVTZXEuYm9vbE9wdGlvbnMsXG4gIHN0cmluZ2lmeTogYm9vbFN0cmluZ2lmeVxufSwge1xuICBpZGVudGlmeTogaW50SWRlbnRpZnksXG4gIGRlZmF1bHQ6IHRydWUsXG4gIHRhZzogJ3RhZzp5YW1sLm9yZywyMDAyOmludCcsXG4gIGZvcm1hdDogJ0JJTicsXG4gIHRlc3Q6IC9eKFstK10/KTBiKFswLTFfXSspJC8sXG4gIHJlc29sdmU6IChzdHIsIHNpZ24sIGJpbikgPT4gaW50UmVzb2x2ZShzaWduLCBiaW4sIDIpLFxuICBzdHJpbmdpZnk6IG5vZGUgPT4gaW50U3RyaW5naWZ5KG5vZGUsIDIsICcwYicpXG59LCB7XG4gIGlkZW50aWZ5OiBpbnRJZGVudGlmeSxcbiAgZGVmYXVsdDogdHJ1ZSxcbiAgdGFnOiAndGFnOnlhbWwub3JnLDIwMDI6aW50JyxcbiAgZm9ybWF0OiAnT0NUJyxcbiAgdGVzdDogL14oWy0rXT8pMChbMC03X10rKSQvLFxuICByZXNvbHZlOiAoc3RyLCBzaWduLCBvY3QpID0+IGludFJlc29sdmUoc2lnbiwgb2N0LCA4KSxcbiAgc3RyaW5naWZ5OiBub2RlID0+IGludFN0cmluZ2lmeShub2RlLCA4LCAnMCcpXG59LCB7XG4gIGlkZW50aWZ5OiBpbnRJZGVudGlmeSxcbiAgZGVmYXVsdDogdHJ1ZSxcbiAgdGFnOiAndGFnOnlhbWwub3JnLDIwMDI6aW50JyxcbiAgdGVzdDogL14oWy0rXT8pKFswLTldWzAtOV9dKikkLyxcbiAgcmVzb2x2ZTogKHN0ciwgc2lnbiwgYWJzKSA9PiBpbnRSZXNvbHZlKHNpZ24sIGFicywgMTApLFxuICBzdHJpbmdpZnk6IHJlc29sdmVTZXEuc3RyaW5naWZ5TnVtYmVyXG59LCB7XG4gIGlkZW50aWZ5OiBpbnRJZGVudGlmeSxcbiAgZGVmYXVsdDogdHJ1ZSxcbiAgdGFnOiAndGFnOnlhbWwub3JnLDIwMDI6aW50JyxcbiAgZm9ybWF0OiAnSEVYJyxcbiAgdGVzdDogL14oWy0rXT8pMHgoWzAtOWEtZkEtRl9dKykkLyxcbiAgcmVzb2x2ZTogKHN0ciwgc2lnbiwgaGV4KSA9PiBpbnRSZXNvbHZlKHNpZ24sIGhleCwgMTYpLFxuICBzdHJpbmdpZnk6IG5vZGUgPT4gaW50U3RyaW5naWZ5KG5vZGUsIDE2LCAnMHgnKVxufSwge1xuICBpZGVudGlmeTogdmFsdWUgPT4gdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyxcbiAgZGVmYXVsdDogdHJ1ZSxcbiAgdGFnOiAndGFnOnlhbWwub3JnLDIwMDI6ZmxvYXQnLFxuICB0ZXN0OiAvXig/OlstK10/XFwuaW5mfChcXC5uYW4pKSQvaSxcbiAgcmVzb2x2ZTogKHN0ciwgbmFuKSA9PiBuYW4gPyBOYU4gOiBzdHJbMF0gPT09ICctJyA/IE51bWJlci5ORUdBVElWRV9JTkZJTklUWSA6IE51bWJlci5QT1NJVElWRV9JTkZJTklUWSxcbiAgc3RyaW5naWZ5OiByZXNvbHZlU2VxLnN0cmluZ2lmeU51bWJlclxufSwge1xuICBpZGVudGlmeTogdmFsdWUgPT4gdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyxcbiAgZGVmYXVsdDogdHJ1ZSxcbiAgdGFnOiAndGFnOnlhbWwub3JnLDIwMDI6ZmxvYXQnLFxuICBmb3JtYXQ6ICdFWFAnLFxuICB0ZXN0OiAvXlstK10/KFswLTldWzAtOV9dKik/KFxcLlswLTlfXSopP1tlRV1bLStdP1swLTldKyQvLFxuICByZXNvbHZlOiBzdHIgPT4gcGFyc2VGbG9hdChzdHIucmVwbGFjZSgvXy9nLCAnJykpLFxuICBzdHJpbmdpZnk6ICh7XG4gICAgdmFsdWVcbiAgfSkgPT4gTnVtYmVyKHZhbHVlKS50b0V4cG9uZW50aWFsKClcbn0sIHtcbiAgaWRlbnRpZnk6IHZhbHVlID0+IHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicsXG4gIGRlZmF1bHQ6IHRydWUsXG4gIHRhZzogJ3RhZzp5YW1sLm9yZywyMDAyOmZsb2F0JyxcbiAgdGVzdDogL15bLStdPyg/OlswLTldWzAtOV9dKik/XFwuKFswLTlfXSopJC8sXG5cbiAgcmVzb2x2ZShzdHIsIGZyYWMpIHtcbiAgICBjb25zdCBub2RlID0gbmV3IHJlc29sdmVTZXEuU2NhbGFyKHBhcnNlRmxvYXQoc3RyLnJlcGxhY2UoL18vZywgJycpKSk7XG5cbiAgICBpZiAoZnJhYykge1xuICAgICAgY29uc3QgZiA9IGZyYWMucmVwbGFjZSgvXy9nLCAnJyk7XG4gICAgICBpZiAoZltmLmxlbmd0aCAtIDFdID09PSAnMCcpIG5vZGUubWluRnJhY3Rpb25EaWdpdHMgPSBmLmxlbmd0aDtcbiAgICB9XG5cbiAgICByZXR1cm4gbm9kZTtcbiAgfSxcblxuICBzdHJpbmdpZnk6IHJlc29sdmVTZXEuc3RyaW5naWZ5TnVtYmVyXG59XSwgd2FybmluZ3MuYmluYXJ5LCB3YXJuaW5ncy5vbWFwLCB3YXJuaW5ncy5wYWlycywgd2FybmluZ3Muc2V0LCB3YXJuaW5ncy5pbnRUaW1lLCB3YXJuaW5ncy5mbG9hdFRpbWUsIHdhcm5pbmdzLnRpbWVzdGFtcCk7XG5cbmNvbnN0IHNjaGVtYXMgPSB7XG4gIGNvcmUsXG4gIGZhaWxzYWZlLFxuICBqc29uLFxuICB5YW1sMTFcbn07XG5jb25zdCB0YWdzID0ge1xuICBiaW5hcnk6IHdhcm5pbmdzLmJpbmFyeSxcbiAgYm9vbDogYm9vbE9iaixcbiAgZmxvYXQ6IGZsb2F0T2JqLFxuICBmbG9hdEV4cDogZXhwT2JqLFxuICBmbG9hdE5hTjogbmFuT2JqLFxuICBmbG9hdFRpbWU6IHdhcm5pbmdzLmZsb2F0VGltZSxcbiAgaW50OiBpbnRPYmosXG4gIGludEhleDogaGV4T2JqLFxuICBpbnRPY3Q6IG9jdE9iaixcbiAgaW50VGltZTogd2FybmluZ3MuaW50VGltZSxcbiAgbWFwLFxuICBudWxsOiBudWxsT2JqLFxuICBvbWFwOiB3YXJuaW5ncy5vbWFwLFxuICBwYWlyczogd2FybmluZ3MucGFpcnMsXG4gIHNlcSxcbiAgc2V0OiB3YXJuaW5ncy5zZXQsXG4gIHRpbWVzdGFtcDogd2FybmluZ3MudGltZXN0YW1wXG59O1xuXG5mdW5jdGlvbiBmaW5kVGFnT2JqZWN0KHZhbHVlLCB0YWdOYW1lLCB0YWdzKSB7XG4gIGlmICh0YWdOYW1lKSB7XG4gICAgY29uc3QgbWF0Y2ggPSB0YWdzLmZpbHRlcih0ID0+IHQudGFnID09PSB0YWdOYW1lKTtcbiAgICBjb25zdCB0YWdPYmogPSBtYXRjaC5maW5kKHQgPT4gIXQuZm9ybWF0KSB8fCBtYXRjaFswXTtcbiAgICBpZiAoIXRhZ09iaikgdGhyb3cgbmV3IEVycm9yKGBUYWcgJHt0YWdOYW1lfSBub3QgZm91bmRgKTtcbiAgICByZXR1cm4gdGFnT2JqO1xuICB9IC8vIFRPRE86IGRlcHJlY2F0ZS9yZW1vdmUgY2xhc3MgY2hlY2tcblxuXG4gIHJldHVybiB0YWdzLmZpbmQodCA9PiAodC5pZGVudGlmeSAmJiB0LmlkZW50aWZ5KHZhbHVlKSB8fCB0LmNsYXNzICYmIHZhbHVlIGluc3RhbmNlb2YgdC5jbGFzcykgJiYgIXQuZm9ybWF0KTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlTm9kZSh2YWx1ZSwgdGFnTmFtZSwgY3R4KSB7XG4gIGlmICh2YWx1ZSBpbnN0YW5jZW9mIHJlc29sdmVTZXEuTm9kZSkgcmV0dXJuIHZhbHVlO1xuICBjb25zdCB7XG4gICAgZGVmYXVsdFByZWZpeCxcbiAgICBvblRhZ09iaixcbiAgICBwcmV2T2JqZWN0cyxcbiAgICBzY2hlbWEsXG4gICAgd3JhcFNjYWxhcnNcbiAgfSA9IGN0eDtcbiAgaWYgKHRhZ05hbWUgJiYgdGFnTmFtZS5zdGFydHNXaXRoKCchIScpKSB0YWdOYW1lID0gZGVmYXVsdFByZWZpeCArIHRhZ05hbWUuc2xpY2UoMik7XG4gIGxldCB0YWdPYmogPSBmaW5kVGFnT2JqZWN0KHZhbHVlLCB0YWdOYW1lLCBzY2hlbWEudGFncyk7XG5cbiAgaWYgKCF0YWdPYmopIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlLnRvSlNPTiA9PT0gJ2Z1bmN0aW9uJykgdmFsdWUgPSB2YWx1ZS50b0pTT04oKTtcbiAgICBpZiAoIXZhbHVlIHx8IHR5cGVvZiB2YWx1ZSAhPT0gJ29iamVjdCcpIHJldHVybiB3cmFwU2NhbGFycyA/IG5ldyByZXNvbHZlU2VxLlNjYWxhcih2YWx1ZSkgOiB2YWx1ZTtcbiAgICB0YWdPYmogPSB2YWx1ZSBpbnN0YW5jZW9mIE1hcCA/IG1hcCA6IHZhbHVlW1N5bWJvbC5pdGVyYXRvcl0gPyBzZXEgOiBtYXA7XG4gIH1cblxuICBpZiAob25UYWdPYmopIHtcbiAgICBvblRhZ09iaih0YWdPYmopO1xuICAgIGRlbGV0ZSBjdHgub25UYWdPYmo7XG4gIH0gLy8gRGV0ZWN0IGR1cGxpY2F0ZSByZWZlcmVuY2VzIHRvIHRoZSBzYW1lIG9iamVjdCAmIHVzZSBBbGlhcyBub2RlcyBmb3IgYWxsXG4gIC8vIGFmdGVyIGZpcnN0LiBUaGUgYG9iamAgd3JhcHBlciBhbGxvd3MgZm9yIGNpcmN1bGFyIHJlZmVyZW5jZXMgdG8gcmVzb2x2ZS5cblxuXG4gIGNvbnN0IG9iaiA9IHtcbiAgICB2YWx1ZTogdW5kZWZpbmVkLFxuICAgIG5vZGU6IHVuZGVmaW5lZFxuICB9O1xuXG4gIGlmICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHByZXZPYmplY3RzKSB7XG4gICAgY29uc3QgcHJldiA9IHByZXZPYmplY3RzLmdldCh2YWx1ZSk7XG5cbiAgICBpZiAocHJldikge1xuICAgICAgY29uc3QgYWxpYXMgPSBuZXcgcmVzb2x2ZVNlcS5BbGlhcyhwcmV2KTsgLy8gbGVhdmVzIHNvdXJjZSBkaXJ0eTsgbXVzdCBiZSBjbGVhbmVkIGJ5IGNhbGxlclxuXG4gICAgICBjdHguYWxpYXNOb2Rlcy5wdXNoKGFsaWFzKTsgLy8gZGVmaW5lZCBhbG9uZyB3aXRoIHByZXZPYmplY3RzXG5cbiAgICAgIHJldHVybiBhbGlhcztcbiAgICB9XG5cbiAgICBvYmoudmFsdWUgPSB2YWx1ZTtcbiAgICBwcmV2T2JqZWN0cy5zZXQodmFsdWUsIG9iaik7XG4gIH1cblxuICBvYmoubm9kZSA9IHRhZ09iai5jcmVhdGVOb2RlID8gdGFnT2JqLmNyZWF0ZU5vZGUoY3R4LnNjaGVtYSwgdmFsdWUsIGN0eCkgOiB3cmFwU2NhbGFycyA/IG5ldyByZXNvbHZlU2VxLlNjYWxhcih2YWx1ZSkgOiB2YWx1ZTtcbiAgaWYgKHRhZ05hbWUgJiYgb2JqLm5vZGUgaW5zdGFuY2VvZiByZXNvbHZlU2VxLk5vZGUpIG9iai5ub2RlLnRhZyA9IHRhZ05hbWU7XG4gIHJldHVybiBvYmoubm9kZTtcbn1cblxuZnVuY3Rpb24gZ2V0U2NoZW1hVGFncyhzY2hlbWFzLCBrbm93blRhZ3MsIGN1c3RvbVRhZ3MsIHNjaGVtYUlkKSB7XG4gIGxldCB0YWdzID0gc2NoZW1hc1tzY2hlbWFJZC5yZXBsYWNlKC9cXFcvZywgJycpXTsgLy8gJ3lhbWwtMS4xJyAtPiAneWFtbDExJ1xuXG4gIGlmICghdGFncykge1xuICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhzY2hlbWFzKS5tYXAoa2V5ID0+IEpTT04uc3RyaW5naWZ5KGtleSkpLmpvaW4oJywgJyk7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duIHNjaGVtYSBcIiR7c2NoZW1hSWR9XCI7IHVzZSBvbmUgb2YgJHtrZXlzfWApO1xuICB9XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkoY3VzdG9tVGFncykpIHtcbiAgICBmb3IgKGNvbnN0IHRhZyBvZiBjdXN0b21UYWdzKSB0YWdzID0gdGFncy5jb25jYXQodGFnKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgY3VzdG9tVGFncyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHRhZ3MgPSBjdXN0b21UYWdzKHRhZ3Muc2xpY2UoKSk7XG4gIH1cblxuICBmb3IgKGxldCBpID0gMDsgaSA8IHRhZ3MubGVuZ3RoOyArK2kpIHtcbiAgICBjb25zdCB0YWcgPSB0YWdzW2ldO1xuXG4gICAgaWYgKHR5cGVvZiB0YWcgPT09ICdzdHJpbmcnKSB7XG4gICAgICBjb25zdCB0YWdPYmogPSBrbm93blRhZ3NbdGFnXTtcblxuICAgICAgaWYgKCF0YWdPYmopIHtcbiAgICAgICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKGtub3duVGFncykubWFwKGtleSA9PiBKU09OLnN0cmluZ2lmeShrZXkpKS5qb2luKCcsICcpO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gY3VzdG9tIHRhZyBcIiR7dGFnfVwiOyB1c2Ugb25lIG9mICR7a2V5c31gKTtcbiAgICAgIH1cblxuICAgICAgdGFnc1tpXSA9IHRhZ09iajtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGFncztcbn1cblxuY29uc3Qgc29ydE1hcEVudHJpZXNCeUtleSA9IChhLCBiKSA9PiBhLmtleSA8IGIua2V5ID8gLTEgOiBhLmtleSA+IGIua2V5ID8gMSA6IDA7XG5cbmNsYXNzIFNjaGVtYSB7XG4gIC8vIFRPRE86IHJlbW92ZSBpbiB2MlxuICAvLyBUT0RPOiByZW1vdmUgaW4gdjJcbiAgY29uc3RydWN0b3Ioe1xuICAgIGN1c3RvbVRhZ3MsXG4gICAgbWVyZ2UsXG4gICAgc2NoZW1hLFxuICAgIHNvcnRNYXBFbnRyaWVzLFxuICAgIHRhZ3M6IGRlcHJlY2F0ZWRDdXN0b21UYWdzXG4gIH0pIHtcbiAgICB0aGlzLm1lcmdlID0gISFtZXJnZTtcbiAgICB0aGlzLm5hbWUgPSBzY2hlbWE7XG4gICAgdGhpcy5zb3J0TWFwRW50cmllcyA9IHNvcnRNYXBFbnRyaWVzID09PSB0cnVlID8gc29ydE1hcEVudHJpZXNCeUtleSA6IHNvcnRNYXBFbnRyaWVzIHx8IG51bGw7XG4gICAgaWYgKCFjdXN0b21UYWdzICYmIGRlcHJlY2F0ZWRDdXN0b21UYWdzKSB3YXJuaW5ncy53YXJuT3B0aW9uRGVwcmVjYXRpb24oJ3RhZ3MnLCAnY3VzdG9tVGFncycpO1xuICAgIHRoaXMudGFncyA9IGdldFNjaGVtYVRhZ3Moc2NoZW1hcywgdGFncywgY3VzdG9tVGFncyB8fCBkZXByZWNhdGVkQ3VzdG9tVGFncywgc2NoZW1hKTtcbiAgfVxuXG4gIGNyZWF0ZU5vZGUodmFsdWUsIHdyYXBTY2FsYXJzLCB0YWdOYW1lLCBjdHgpIHtcbiAgICBjb25zdCBiYXNlQ3R4ID0ge1xuICAgICAgZGVmYXVsdFByZWZpeDogU2NoZW1hLmRlZmF1bHRQcmVmaXgsXG4gICAgICBzY2hlbWE6IHRoaXMsXG4gICAgICB3cmFwU2NhbGFyc1xuICAgIH07XG4gICAgY29uc3QgY3JlYXRlQ3R4ID0gY3R4ID8gT2JqZWN0LmFzc2lnbihjdHgsIGJhc2VDdHgpIDogYmFzZUN0eDtcbiAgICByZXR1cm4gY3JlYXRlTm9kZSh2YWx1ZSwgdGFnTmFtZSwgY3JlYXRlQ3R4KTtcbiAgfVxuXG4gIGNyZWF0ZVBhaXIoa2V5LCB2YWx1ZSwgY3R4KSB7XG4gICAgaWYgKCFjdHgpIGN0eCA9IHtcbiAgICAgIHdyYXBTY2FsYXJzOiB0cnVlXG4gICAgfTtcbiAgICBjb25zdCBrID0gdGhpcy5jcmVhdGVOb2RlKGtleSwgY3R4LndyYXBTY2FsYXJzLCBudWxsLCBjdHgpO1xuICAgIGNvbnN0IHYgPSB0aGlzLmNyZWF0ZU5vZGUodmFsdWUsIGN0eC53cmFwU2NhbGFycywgbnVsbCwgY3R4KTtcbiAgICByZXR1cm4gbmV3IHJlc29sdmVTZXEuUGFpcihrLCB2KTtcbiAgfVxuXG59XG5cblBsYWluVmFsdWUuX2RlZmluZVByb3BlcnR5KFNjaGVtYSwgXCJkZWZhdWx0UHJlZml4XCIsIFBsYWluVmFsdWUuZGVmYXVsdFRhZ1ByZWZpeCk7XG5cblBsYWluVmFsdWUuX2RlZmluZVByb3BlcnR5KFNjaGVtYSwgXCJkZWZhdWx0VGFnc1wiLCBQbGFpblZhbHVlLmRlZmF1bHRUYWdzKTtcblxuZXhwb3J0cy5TY2hlbWEgPSBTY2hlbWE7XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG52YXIgcmVzb2x2ZVNlcSA9IHJlcXVpcmUoJy4vcmVzb2x2ZVNlcS1kMDNjYjAzNy5qcycpO1xudmFyIFNjaGVtYSA9IHJlcXVpcmUoJy4vU2NoZW1hLTg4ZTMyM2E3LmpzJyk7XG5yZXF1aXJlKCcuL1BsYWluVmFsdWUtZWM4ZTU4OGUuanMnKTtcbnJlcXVpcmUoJy4vd2FybmluZ3MtMTAwMGEzNzIuanMnKTtcblxuXG5cbmV4cG9ydHMuQWxpYXMgPSByZXNvbHZlU2VxLkFsaWFzO1xuZXhwb3J0cy5Db2xsZWN0aW9uID0gcmVzb2x2ZVNlcS5Db2xsZWN0aW9uO1xuZXhwb3J0cy5NZXJnZSA9IHJlc29sdmVTZXEuTWVyZ2U7XG5leHBvcnRzLk5vZGUgPSByZXNvbHZlU2VxLk5vZGU7XG5leHBvcnRzLlBhaXIgPSByZXNvbHZlU2VxLlBhaXI7XG5leHBvcnRzLlNjYWxhciA9IHJlc29sdmVTZXEuU2NhbGFyO1xuZXhwb3J0cy5ZQU1MTWFwID0gcmVzb2x2ZVNlcS5ZQU1MTWFwO1xuZXhwb3J0cy5ZQU1MU2VxID0gcmVzb2x2ZVNlcS5ZQU1MU2VxO1xuZXhwb3J0cy5iaW5hcnlPcHRpb25zID0gcmVzb2x2ZVNlcS5iaW5hcnlPcHRpb25zO1xuZXhwb3J0cy5ib29sT3B0aW9ucyA9IHJlc29sdmVTZXEuYm9vbE9wdGlvbnM7XG5leHBvcnRzLmludE9wdGlvbnMgPSByZXNvbHZlU2VxLmludE9wdGlvbnM7XG5leHBvcnRzLm51bGxPcHRpb25zID0gcmVzb2x2ZVNlcS5udWxsT3B0aW9ucztcbmV4cG9ydHMuc3RyT3B0aW9ucyA9IHJlc29sdmVTZXEuc3RyT3B0aW9ucztcbmV4cG9ydHMuU2NoZW1hID0gU2NoZW1hLlNjaGVtYTtcbiIsICJpbXBvcnQgdHlwZXMgZnJvbSAnLi9kaXN0L3R5cGVzLmpzJ1xuXG5leHBvcnQgY29uc3QgYmluYXJ5T3B0aW9ucyA9IHR5cGVzLmJpbmFyeU9wdGlvbnNcbmV4cG9ydCBjb25zdCBib29sT3B0aW9ucyA9IHR5cGVzLmJvb2xPcHRpb25zXG5leHBvcnQgY29uc3QgaW50T3B0aW9ucyA9IHR5cGVzLmludE9wdGlvbnNcbmV4cG9ydCBjb25zdCBudWxsT3B0aW9ucyA9IHR5cGVzLm51bGxPcHRpb25zXG5leHBvcnQgY29uc3Qgc3RyT3B0aW9ucyA9IHR5cGVzLnN0ck9wdGlvbnNcblxuZXhwb3J0IGNvbnN0IFNjaGVtYSA9IHR5cGVzLlNjaGVtYVxuZXhwb3J0IGNvbnN0IEFsaWFzID0gdHlwZXMuQWxpYXNcbmV4cG9ydCBjb25zdCBDb2xsZWN0aW9uID0gdHlwZXMuQ29sbGVjdGlvblxuZXhwb3J0IGNvbnN0IE1lcmdlID0gdHlwZXMuTWVyZ2VcbmV4cG9ydCBjb25zdCBOb2RlID0gdHlwZXMuTm9kZVxuZXhwb3J0IGNvbnN0IFBhaXIgPSB0eXBlcy5QYWlyXG5leHBvcnQgY29uc3QgU2NhbGFyID0gdHlwZXMuU2NhbGFyXG5leHBvcnQgY29uc3QgWUFNTE1hcCA9IHR5cGVzLllBTUxNYXBcbmV4cG9ydCBjb25zdCBZQU1MU2VxID0gdHlwZXMuWUFNTFNlcVxuIiwgImltcG9ydCB5YW1sIGZyb20gJ3lhbWwnO1xuaW1wb3J0IHsgWUFNTE1hcCwgWUFNTFNlcSB9IGZyb20gJ3lhbWwvdHlwZXMnO1xuaW1wb3J0IG9wdGlvbkFQSSBmcm9tICcuLi9hcGkvb3B0aW9uLm1qcyc7XG5cbmZ1bmN0aW9uIGdldEluKG9iaiwgcGF0aCkge1xuICByZXR1cm4gcGF0aC5yZWR1Y2UoKHYsIGspID0+IChrIGluIHYgPyB2W2tdIDoge30pLCBvYmopO1xufVxuXG5mdW5jdGlvbiBhZGRDb21tZW50cyhjb250ZXh0LCBwYXRoLCBjb21tZW50Tm9kZSwgaXRlck5vZGUgPSBjb21tZW50Tm9kZSkge1xuICBjb25zdCB7IHRpdGxlLCBkZXNjcmlwdGlvbiwgY29tbWVudCB9ID0gZ2V0SW4oY29udGV4dCwgcGF0aCk7XG4gIGNvbnN0IGxpbmVzID0gW107XG5cbiAgaWYgKG9wdGlvbkFQSSgncmVuZGVyVGl0bGUnKSAmJiB0aXRsZSkge1xuICAgIGxpbmVzLnB1c2goYCAke3RpdGxlfWAsICcnKTtcbiAgfVxuICBpZiAob3B0aW9uQVBJKCdyZW5kZXJEZXNjcmlwdGlvbicpICYmIGRlc2NyaXB0aW9uKSB7XG4gICAgbGluZXMucHVzaChgICR7ZGVzY3JpcHRpb259YCk7XG4gIH1cbiAgaWYgKG9wdGlvbkFQSSgncmVuZGVyQ29tbWVudCcpICYmIGNvbW1lbnQpIHtcbiAgICBsaW5lcy5wdXNoKGAgJHtjb21tZW50fWApO1xuICB9XG5cbiAgY29tbWVudE5vZGUuY29tbWVudEJlZm9yZSA9IGxpbmVzLmpvaW4oJ1xcbicpO1xuXG4gIGlmIChpdGVyTm9kZSBpbnN0YW5jZW9mIFlBTUxNYXApIHtcbiAgICBpdGVyTm9kZS5pdGVtcy5mb3JFYWNoKG4gPT4ge1xuICAgICAgYWRkQ29tbWVudHMoY29udGV4dCwgWy4uLnBhdGgsICdpdGVtcycsIG4ua2V5LnZhbHVlXSwgbi5rZXksIG4udmFsdWUpO1xuICAgIH0pO1xuICB9IGVsc2UgaWYgKGl0ZXJOb2RlIGluc3RhbmNlb2YgWUFNTFNlcSkge1xuICAgIGl0ZXJOb2RlLml0ZW1zLmZvckVhY2goKG4sIGkpID0+IHtcbiAgICAgIGFkZENvbW1lbnRzKGNvbnRleHQsIFsuLi5wYXRoLCAnaXRlbXMnLCBpXSwgbik7XG4gICAgfSk7XG4gIH1cbn1cblxuLyoqIFJlbmRlciBZQU1MIHN0cmluZyBmcm9tIHRoZSBnZW5lcmF0ZWQgdmFsdWUgYW5kIGNvbnRleHRcbiAqXG4gKiBAcGFyYW0gdmFsdWVcbiAqIEBwYXJhbSBjb250ZXh0XG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiByZW5kZXJZQU1MKHsgdmFsdWUsIGNvbnRleHQgfSkge1xuICBjb25zdCBub2RlcyA9IHlhbWwuY3JlYXRlTm9kZSh2YWx1ZSk7XG5cbiAgYWRkQ29tbWVudHMoY29udGV4dCwgW10sIG5vZGVzKTtcblxuICBjb25zdCBkb2MgPSBuZXcgeWFtbC5Eb2N1bWVudCgpO1xuICBkb2MuY29udGVudHMgPSBub2RlcztcblxuICByZXR1cm4gZG9jLnRvU3RyaW5nKCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHJlbmRlcllBTUw7XG4iLCAiaW1wb3J0IHJlbmRlckpTIGZyb20gJy4vanMubWpzJztcbmltcG9ydCByZW5kZXJZQU1MIGZyb20gJy4veWFtbC5tanMnO1xuXG5leHBvcnQge1xuICByZW5kZXJKUyxcbiAgcmVuZGVyWUFNTCxcbn07XG4iLCAiaW1wb3J0IHsgZ2V0RGVwZW5kZW5jaWVzIH0gZnJvbSAnLi92ZW5kb3IubWpzJztcbmltcG9ydCBDb250YWluZXIgZnJvbSAnLi9jbGFzcy9Db250YWluZXIubWpzJztcbmltcG9ydCBmb3JtYXQgZnJvbSAnLi9hcGkvZm9ybWF0Lm1qcyc7XG5pbXBvcnQgb3B0aW9uIGZyb20gJy4vYXBpL29wdGlvbi5tanMnO1xuaW1wb3J0IGVudiBmcm9tICcuL2NvcmUvY29uc3RhbnRzLm1qcyc7XG5pbXBvcnQgcmFuZG9tIGZyb20gJy4vY29yZS9yYW5kb20ubWpzJztcbmltcG9ydCB1dGlscyBmcm9tICcuL2NvcmUvdXRpbHMubWpzJztcbmltcG9ydCBydW4gZnJvbSAnLi9jb3JlL3J1bi5tanMnO1xuaW1wb3J0IHsgcmVuZGVySlMsIHJlbmRlcllBTUwgfSBmcm9tICcuL3JlbmRlcmVycy9pbmRleC5tanMnO1xuXG5jb25zdCBjb250YWluZXIgPSBuZXcgQ29udGFpbmVyKCk7XG5cbmZ1bmN0aW9uIHNldHVwS2V5d29yZHMoKSB7XG4gIC8vIHNhZmUgYXV0by1pbmNyZW1lbnQgdmFsdWVzXG4gIGNvbnRhaW5lci5kZWZpbmUoJ2F1dG9JbmNyZW1lbnQnLCBmdW5jdGlvbiBhdXRvSW5jcmVtZW50KHZhbHVlLCBzY2hlbWEpIHtcbiAgICBpZiAoIXRoaXMub2Zmc2V0KSB7XG4gICAgICBjb25zdCBtaW4gPSBzY2hlbWEubWluaW11bSB8fCAxO1xuICAgICAgY29uc3QgbWF4ID0gbWluICsgZW52Lk1BWF9OVU1CRVI7XG4gICAgICBjb25zdCBvZmZzZXQgPSB2YWx1ZS5pbml0aWFsT2Zmc2V0IHx8IHNjaGVtYS5pbml0aWFsT2Zmc2V0O1xuXG4gICAgICB0aGlzLm9mZnNldCA9IG9mZnNldCB8fCByYW5kb20ubnVtYmVyKG1pbiwgbWF4KTtcbiAgICB9XG5cbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIHJldHVybiB0aGlzLm9mZnNldCsrOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgfVxuXG4gICAgcmV0dXJuIHNjaGVtYTtcbiAgfSk7XG5cbiAgLy8gc2FmZS1hbmQtc2VxdWVudGlhbCBkYXRlc1xuICBjb250YWluZXIuZGVmaW5lKCdzZXF1ZW50aWFsRGF0ZScsIGZ1bmN0aW9uIHNlcXVlbnRpYWxEYXRlKHZhbHVlLCBzY2hlbWEpIHtcbiAgICBpZiAoIXRoaXMubm93KSB7XG4gICAgICB0aGlzLm5vdyA9IHJhbmRvbS5kYXRlKCk7XG4gICAgfVxuXG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICBzY2hlbWEgPSB0aGlzLm5vdy50b0lTT1N0cmluZygpO1xuICAgICAgdmFsdWUgPSB2YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICA/ICdkYXlzJ1xuICAgICAgICA6IHZhbHVlO1xuXG4gICAgICBpZiAoWydzZWNvbmRzJywgJ21pbnV0ZXMnLCAnaG91cnMnLCAnZGF5cycsICd3ZWVrcycsICdtb250aHMnLCAneWVhcnMnXS5pbmRleE9mKHZhbHVlKSA9PT0gLTEpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbnN1cHBvcnRlZCBpbmNyZW1lbnQgYnkgJHt1dGlscy5zaG9ydCh2YWx1ZSl9YCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMubm93LnNldFRpbWUodGhpcy5ub3cuZ2V0VGltZSgpICsgcmFuZG9tLmRhdGUodmFsdWUpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc2NoZW1hO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gZ2V0UmVmcyhyZWZzLCBzY2hlbWEpIHtcbiAgbGV0ICRyZWZzID0ge307XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkocmVmcykpIHtcbiAgICByZWZzLmZvckVhY2goX3NjaGVtYSA9PiB7XG4gICAgICAkcmVmc1tfc2NoZW1hLiRpZCB8fCBfc2NoZW1hLmlkXSA9IF9zY2hlbWE7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgJHJlZnMgPSByZWZzIHx8IHt9O1xuICB9XG5cbiAgZnVuY3Rpb24gd2FsayhvYmopIHtcbiAgICBpZiAoIW9iaiB8fCB0eXBlb2Ygb2JqICE9PSAnb2JqZWN0JykgcmV0dXJuO1xuICAgIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHJldHVybiBvYmouZm9yRWFjaCh3YWxrKTtcblxuICAgIGNvbnN0IF9pZCA9IG9iai4kaWQgfHwgb2JqLmlkO1xuXG4gICAgaWYgKHR5cGVvZiBfaWQgPT09ICdzdHJpbmcnICYmICEkcmVmc1tfaWRdKSB7XG4gICAgICAkcmVmc1tfaWRdID0gb2JqO1xuICAgIH1cblxuICAgIE9iamVjdC5rZXlzKG9iaikuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgd2FsayhvYmpba2V5XSk7XG4gICAgfSk7XG4gIH1cblxuICB3YWxrKHJlZnMpO1xuICB3YWxrKHNjaGVtYSk7XG5cbiAgcmV0dXJuICRyZWZzO1xufVxuXG5jb25zdCBqc2YgPSAoc2NoZW1hLCByZWZzLCBjd2QpID0+IHtcbiAgY29uc29sZS5kZWJ1ZygnW2pzb24tc2NoZW1hLWZha2VyXSBjYWxsaW5nIEpTT05TY2hlbWFGYWtlcigpIGlzIGRlcHJlY2F0ZWQsIGNhbGwgZWl0aGVyIC5nZW5lcmF0ZSgpIG9yIC5yZXNvbHZlKCknKTtcblxuICBpZiAoY3dkKSB7XG4gICAgY29uc29sZS5kZWJ1ZygnW2pzb24tc2NoZW1hLWZha2VyXSBsb2NhbCByZWZlcmVuY2VzIGFyZSBvbmx5IHN1cHBvcnRlZCBieSBjYWxsaW5nIC5yZXNvbHZlKCknKTtcbiAgfVxuXG4gIHJldHVybiBqc2YuZ2VuZXJhdGUoc2NoZW1hLCByZWZzKTtcbn07XG5cbmpzZi5nZW5lcmF0ZVdpdGhDb250ZXh0ID0gKHNjaGVtYSwgcmVmcykgPT4ge1xuICBjb25zdCAkcmVmcyA9IGdldFJlZnMocmVmcywgc2NoZW1hKTtcblxuICByZXR1cm4gcnVuKCRyZWZzLCBzY2hlbWEsIGNvbnRhaW5lciwgdHJ1ZSk7XG59O1xuXG5qc2YuZ2VuZXJhdGUgPSAoc2NoZW1hLCByZWZzKSA9PiByZW5kZXJKUyhcbiAgICBqc2YuZ2VuZXJhdGVXaXRoQ29udGV4dChzY2hlbWEsIHJlZnMpLFxuICApO1xuXG5qc2YuZ2VuZXJhdGVZQU1MID0gKHNjaGVtYSwgcmVmcykgPT4gcmVuZGVyWUFNTChcbiAgICBqc2YuZ2VuZXJhdGVXaXRoQ29udGV4dChzY2hlbWEsIHJlZnMpLFxuICApO1xuXG5qc2YucmVzb2x2ZVdpdGhDb250ZXh0ID0gKHNjaGVtYSwgcmVmcywgY3dkKSA9PiB7XG4gIGlmICh0eXBlb2YgcmVmcyA9PT0gJ3N0cmluZycpIHtcbiAgICBjd2QgPSByZWZzO1xuICAgIHJlZnMgPSB7fTtcbiAgfVxuXG4gIC8vIG5vcm1hbGl6ZSBiYXNlZGlyIChicm93c2VyIGF3YXJlKVxuICBjd2QgPSBjd2QgfHwgKHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgcHJvY2Vzcy5jd2QgPT09ICdmdW5jdGlvbicgPyBwcm9jZXNzLmN3ZCgpIDogJycpO1xuICBjd2QgPSBgJHtjd2QucmVwbGFjZSgvXFwvKyQvLCAnJyl9L2A7XG5cbiAgY29uc3QgJHJlZnMgPSBnZXRSZWZzKHJlZnMsIHNjaGVtYSk7XG5cbiAgLy8gaWRlbnRpY2FsIHNldHVwIGFzIGpzb24tc2NoZW1hLXNlcXVlbGl6ZXJcbiAgY29uc3QgZml4ZWRSZWZzID0ge1xuICAgIG9yZGVyOiAxLFxuICAgIGNhblJlYWQoZmlsZSkge1xuICAgICAgY29uc3Qga2V5ID0gZmlsZS51cmwucmVwbGFjZSgnLzonLCAnOicpO1xuXG4gICAgICByZXR1cm4gJHJlZnNba2V5XSB8fCAkcmVmc1trZXkuc3BsaXQoJy8nKS5wb3AoKV07XG4gICAgfSxcbiAgICByZWFkKGZpbGUsIGNhbGxiYWNrKSB7XG4gICAgICB0cnkge1xuICAgICAgICBjYWxsYmFjayhudWxsLCB0aGlzLmNhblJlYWQoZmlsZSkpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWxsYmFjayhlKTtcbiAgICAgIH1cbiAgICB9LFxuICB9O1xuXG4gIGNvbnN0IHsgJFJlZlBhcnNlciB9ID0gZ2V0RGVwZW5kZW5jaWVzKCk7XG5cbiAgcmV0dXJuICRSZWZQYXJzZXJcbiAgICAuYnVuZGxlKGN3ZCwgc2NoZW1hLCB7XG4gICAgICByZXNvbHZlOiB7XG4gICAgICAgIGZpbGU6IHsgb3JkZXI6IDEwMCB9LFxuICAgICAgICBodHRwOiB7IG9yZGVyOiAyMDAgfSxcbiAgICAgICAgZml4ZWRSZWZzLFxuICAgICAgfSxcbiAgICAgIGRlcmVmZXJlbmNlOiB7XG4gICAgICAgIGNpcmN1bGFyOiAnaWdub3JlJyxcbiAgICAgIH0sXG4gICAgfSkudGhlbihzdWIgPT4gcnVuKCRyZWZzLCBzdWIsIGNvbnRhaW5lcikpXG4gICAgLmNhdGNoKGUgPT4ge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBFcnJvciB3aGlsZSByZXNvbHZpbmcgc2NoZW1hICgke2UubWVzc2FnZX0pYCk7XG4gICAgfSk7XG59O1xuXG5qc2YucmVzb2x2ZSA9IChzY2hlbWEsIHJlZnMsIGN3ZCkgPT4ganNmLnJlc29sdmVXaXRoQ29udGV4dChzY2hlbWEsIHJlZnMsIGN3ZCkudGhlbihyZW5kZXJKUyk7XG5cbmpzZi5yZXNvbHZlWUFNTCA9IChzY2hlbWEsIHJlZnMsIGN3ZCkgPT4ganNmLnJlc29sdmVXaXRoQ29udGV4dChzY2hlbWEsIHJlZnMsIGN3ZCkudGhlbihyZW5kZXJZQU1MKTtcblxuc2V0dXBLZXl3b3JkcygpO1xuXG5qc2YuZm9ybWF0ID0gZm9ybWF0O1xuanNmLm9wdGlvbiA9IG9wdGlvbjtcbmpzZi5yYW5kb20gPSByYW5kb207XG5cbi8vIHJldHVybnMgaXRzZWxmIGZvciBjaGFpbmluZ1xuanNmLmV4dGVuZCA9IChuYW1lLCBjYikgPT4ge1xuICBjb250YWluZXIuZXh0ZW5kKG5hbWUsIGNiKTtcbiAgcmV0dXJuIGpzZjtcbn07XG5cbmpzZi5kZWZpbmUgPSAobmFtZSwgY2IpID0+IHtcbiAgY29udGFpbmVyLmRlZmluZShuYW1lLCBjYik7XG4gIHJldHVybiBqc2Y7XG59O1xuXG5qc2YucmVzZXQgPSBuYW1lID0+IHtcbiAgY29udGFpbmVyLnJlc2V0KG5hbWUpO1xuICBzZXR1cEtleXdvcmRzKCk7XG4gIHJldHVybiBqc2Y7XG59O1xuXG5qc2YubG9jYXRlID0gbmFtZSA9PiB7XG4gIHJldHVybiBjb250YWluZXIuZ2V0KG5hbWUpO1xufTtcblxuanNmLlZFUlNJT04gPSBwcm9jZXNzLmVudi5WRVJTSU9OIHx8ICdIRUFEJztcblxuLy8gRXhwb3J0IGFuIG9iamVjdCB0aGF0IGhhcyBhbGwgb2YganNmKCkncyBwcm9wZXJ0aWVzIGFuZCBpcyBub3QgYSBmdW5jdGlvblxuLy8gQ2FsbGluZyBqc2YoKSBpcyBkZXByZWNhdGVkIGluIGZhdm9yIG9mIEpTT05TY2hlbWFGYWtlci5nZW5lcmF0ZSgpIC8gSlNPTlNjaGVtYUZha2VyLnJlc29sdmUoKVxuZXhwb3J0IGNvbnN0IEpTT05TY2hlbWFGYWtlciA9IHsgLi4uanNmIH07XG5cbi8vIEZvciBiYWNrd2FyZCBjb21wYXRpYmlsaXR5IHdlIHN0aWxsIGV4cG9ydCB0aGUganNmIGZ1bmN0aW9uXG5leHBvcnQgZGVmYXVsdCBqc2Y7XG4iLCAiaW1wb3J0ICRSZWZQYXJzZXIgZnJvbSAnanNvbi1zY2hlbWEtcmVmLXBhcnNlcic7XG5pbXBvcnQgeyBKU09OUGF0aCB9IGZyb20gJ2pzb25wYXRoLXBsdXMnO1xuXG5pbXBvcnQgeyBzZXREZXBlbmRlbmNpZXMgfSBmcm9tICcuL3ZlbmRvci5tanMnO1xuXG5zZXREZXBlbmRlbmNpZXMoeyAkUmVmUGFyc2VyLCBKU09OUGF0aCB9KTtcblxuZXhwb3J0IHsgZGVmYXVsdCwgSlNPTlNjaGVtYUZha2VyIH0gZnJvbSAnLi9pbmRleC5tanMnO1xuIiwgImNvbnN0IGpzZiA9IHJlcXVpcmUoJy4vbGliL21haW4nKS5kZWZhdWx0O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGpzZjtcbm1vZHVsZS5leHBvcnRzLkpTT05TY2hlbWFGYWtlciA9IHsgLi4uanNmIH07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQU0sY0FFTyxpQkFJQTtBQU5iO0FBQUE7QUFBQSxJQUFNLGVBQWUsQ0FBQztBQUVmLElBQU0sa0JBQWtCLE1BQU07QUFDbkMsYUFBTztBQUFBLElBQ1Q7QUFFTyxJQUFNLGtCQUFrQixXQUFTO0FBQ3RDLGFBQU8sT0FBTyxjQUFjLEtBQUs7QUFBQSxJQUNuQztBQUFBO0FBQUE7OztBQ1JBLElBR00sVUFtREM7QUF0RFA7QUFBQTtBQUdBLElBQU0sV0FBTixNQUFlO0FBQUEsTUFDYixjQUFjO0FBRVosYUFBSyxPQUFPLENBQUM7QUFBQSxNQUNmO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQU1BLFdBQVcsTUFBTTtBQUNmLFlBQUksQ0FBQyxNQUFNO0FBQ1QsZUFBSyxPQUFPLENBQUM7QUFBQSxRQUNmLE9BQU87QUFDTCxpQkFBTyxLQUFLLEtBQUssSUFBSTtBQUFBLFFBQ3ZCO0FBQUEsTUFDRjtBQUFBO0FBQUE7QUFBQTtBQUFBLE1BS0EsU0FBUyxNQUFNLFVBQVU7QUFDdkIsYUFBSyxLQUFLLElBQUksSUFBSTtBQUFBLE1BQ3BCO0FBQUE7QUFBQTtBQUFBO0FBQUEsTUFLQSxhQUFhLFNBQVM7QUFDcEIsZUFBTyxLQUFLLE9BQU8sRUFBRSxRQUFRLFVBQVE7QUFDbkMsZUFBSyxLQUFLLElBQUksSUFBSSxRQUFRLElBQUk7QUFBQSxRQUNoQyxD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cyIsICJleHBvcnRzIiwgInR5cGVzIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgInR5cGVzIiwgImkiLCAicmVxdWlyZV9saWIiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAidHlwZXMiLCAiUmFuZEV4cCIsICJSYW5kRXhwIiwgInR5cGVzIiwgInJlZ2lzdHJ5IiwgImJvb2xlYW5fZGVmYXVsdCIsICJpbml0X2Jvb2xlYW4iLCAibnVsbF9kZWZhdWx0IiwgImluaXRfbnVsbCIsICJyZXNvbHZlIiwgIm51bWJlciIsICJyZXNvbHZlIiwgImluaXRfYm9vbGVhbiIsICJpbml0X251bGwiLCAiYm9vbGVhbl9kZWZhdWx0IiwgIm51bGxfZGVmYXVsdCIsICJyZXNvbHZlIiwgImNvbnRhaW5lciIsICJwaWNrIiwgIkpTT05QYXRoIiwgImNvbnRhaW5lciIsICJleHBvcnRzIiwgIk5vZGUiLCAiY2giLCAiZXhwb3J0cyIsICJOb2RlIiwgInJlcyIsICJTY2FsYXIiLCAiQ29sbGVjdGlvbiIsICJub2RlcyIsICJzdHIiLCAiWUFNTFNlcSIsICJQYWlyIiwgIkFsaWFzIiwgIllBTUxNYXAiLCAiTWVyZ2UiLCAiYmluYXJ5T3B0aW9ucyIsICJib29sT3B0aW9ucyIsICJpbnRPcHRpb25zIiwgIm51bGxPcHRpb25zIiwgInN0ck9wdGlvbnMiLCAicmVzb2x2ZSIsICJpIiwgImVuZCIsICJleHBvcnRzIiwgInBhaXJzIiwgIm9tYXAiLCAic2V0IiwgIm4iLCAiZGF0ZSIsICJleHBvcnRzIiwgIm1hcCIsICJzZXEiLCAibiIsICJ0YWdzIiwgInNjaGVtYXMiLCAiU2NoZW1hIiwgIm1lcmdlIiwgInJlcXVpcmVfdHlwZXMiLCAiZXhwb3J0cyIsICJTY2hlbWEiLCAiaW1wb3J0X3R5cGVzIiwgImluaXRfdHlwZXMiLCAidHlwZXMiLCAiaW5pdF90eXBlcyIsICIkUmVmUGFyc2VyIiwgIiRSZWZQYXJzZXIiLCAianNmIl0KfQo=
