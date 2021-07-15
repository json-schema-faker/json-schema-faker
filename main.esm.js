import './vendor.js';
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __reExport = (target, module, desc) => {
  if (module && typeof module === "object" || typeof module === "function") {
    for (let key of __getOwnPropNames(module))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module) => {
  return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", module && module.__esModule && "default" in module ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
};

// src/lib/vendor.js
var require_vendor = __commonJS({
  "src/lib/vendor.js"(exports, module) {
    var DEPENDENCIES = {};
    var getDependencies = () => {
      return DEPENDENCIES;
    };
    var setDependencies2 = (value) => {
      Object.assign(DEPENDENCIES, value);
    };
    Object.assign(module.exports, { getDependencies, setDependencies: setDependencies2 });
  }
});

// src/lib/class/Registry.js
var require_Registry = __commonJS({
  "src/lib/class/Registry.js"(exports, module) {
    var Registry = class {
      constructor() {
        this.data = {};
      }
      unregister(name) {
        if (!name) {
          this.data = {};
        } else {
          delete this.data[name];
        }
      }
      register(name, callback) {
        this.data[name] = callback;
      }
      registerMany(formats) {
        Object.keys(formats).forEach((name) => {
          this.data[name] = formats[name];
        });
      }
      get(name) {
        const format = this.data[name];
        return format;
      }
      list() {
        return this.data;
      }
    };
    var Registry_default = Registry;
    module.exports = Registry_default;
  }
});

// src/lib/api/defaults.js
var require_defaults = __commonJS({
  "src/lib/api/defaults.js"(exports, module) {
    var defaults = {};
    var defaults_default = defaults;
    defaults.defaultInvalidTypeProduct = void 0;
    defaults.defaultRandExpMax = 10;
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
    defaults.minItems = 0;
    defaults.maxItems = null;
    defaults.minLength = 0;
    defaults.maxLength = null;
    defaults.resolveJsonPath = false;
    defaults.reuseProperties = false;
    defaults.fillProperties = true;
    defaults.replaceEmptyByRandomValue = false;
    defaults.random = Math.random;
    defaults.renderTitle = true;
    defaults.renderDescription = true;
    defaults.renderComment = false;
    module.exports = defaults_default;
  }
});

// src/lib/class/OptionRegistry.js
var require_OptionRegistry = __commonJS({
  "src/lib/class/OptionRegistry.js"(exports, module) {
    var Registry = require_Registry();
    var defaults = require_defaults();
    var OptionRegistry = class extends Registry {
      constructor() {
        super();
        this.data = { ...defaults };
        this._defaults = defaults;
      }
      get defaults() {
        return { ...this._defaults };
      }
    };
    var OptionRegistry_default = OptionRegistry;
    module.exports = OptionRegistry_default;
  }
});

// src/lib/api/option.js
var require_option = __commonJS({
  "src/lib/api/option.js"(exports, module) {
    var OptionRegistry = require_OptionRegistry();
    var registry = new OptionRegistry();
    function optionAPI(nameOrOptionMap, optionalValue) {
      if (typeof nameOrOptionMap === "string") {
        if (typeof optionalValue !== "undefined") {
          return registry.register(nameOrOptionMap, optionalValue);
        }
        return registry.get(nameOrOptionMap);
      }
      return registry.registerMany(nameOrOptionMap);
    }
    optionAPI.getDefaults = () => registry.defaults;
    var option_default = optionAPI;
    module.exports = option_default;
  }
});

// src/lib/core/constants.js
var require_constants = __commonJS({
  "src/lib/core/constants.js"(exports, module) {
    var ALLOWED_TYPES = ["integer", "number", "string", "boolean"];
    var SCALAR_TYPES = ALLOWED_TYPES.concat(["null"]);
    var ALL_TYPES = ["array", "object"].concat(SCALAR_TYPES);
    var MOST_NEAR_DATETIME = 2524608e6;
    var MIN_INTEGER = -1e8;
    var MAX_INTEGER = 1e8;
    var MIN_NUMBER = -100;
    var MAX_NUMBER = 100;
    var constants_default = {
      ALLOWED_TYPES,
      SCALAR_TYPES,
      ALL_TYPES,
      MIN_NUMBER,
      MAX_NUMBER,
      MIN_INTEGER,
      MAX_INTEGER,
      MOST_NEAR_DATETIME
    };
    module.exports = constants_default;
  }
});

// node_modules/ret/lib/types.js
var require_types = __commonJS({
  "node_modules/ret/lib/types.js"(exports, module) {
    module.exports = {
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
  "node_modules/ret/lib/sets.js"(exports) {
    var types = require_types();
    var INTS = () => [{ type: types.RANGE, from: 48, to: 57 }];
    var WORDS = () => {
      return [
        { type: types.CHAR, value: 95 },
        { type: types.RANGE, from: 97, to: 122 },
        { type: types.RANGE, from: 65, to: 90 }
      ].concat(INTS());
    };
    var WHITESPACE = () => {
      return [
        { type: types.CHAR, value: 9 },
        { type: types.CHAR, value: 10 },
        { type: types.CHAR, value: 11 },
        { type: types.CHAR, value: 12 },
        { type: types.CHAR, value: 13 },
        { type: types.CHAR, value: 32 },
        { type: types.CHAR, value: 160 },
        { type: types.CHAR, value: 5760 },
        { type: types.RANGE, from: 8192, to: 8202 },
        { type: types.CHAR, value: 8232 },
        { type: types.CHAR, value: 8233 },
        { type: types.CHAR, value: 8239 },
        { type: types.CHAR, value: 8287 },
        { type: types.CHAR, value: 12288 },
        { type: types.CHAR, value: 65279 }
      ];
    };
    var NOTANYCHAR = () => {
      return [
        { type: types.CHAR, value: 10 },
        { type: types.CHAR, value: 13 },
        { type: types.CHAR, value: 8232 },
        { type: types.CHAR, value: 8233 }
      ];
    };
    exports.words = () => ({ type: types.SET, set: WORDS(), not: false });
    exports.notWords = () => ({ type: types.SET, set: WORDS(), not: true });
    exports.ints = () => ({ type: types.SET, set: INTS(), not: false });
    exports.notInts = () => ({ type: types.SET, set: INTS(), not: true });
    exports.whitespace = () => ({ type: types.SET, set: WHITESPACE(), not: false });
    exports.notWhitespace = () => ({ type: types.SET, set: WHITESPACE(), not: true });
    exports.anyChar = () => ({ type: types.SET, set: NOTANYCHAR(), not: true });
  }
});

// node_modules/ret/lib/util.js
var require_util = __commonJS({
  "node_modules/ret/lib/util.js"(exports) {
    var types = require_types();
    var sets = require_sets();
    var CTRL = "@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^ ?";
    var SLSH = { "0": 0, "t": 9, "n": 10, "v": 11, "f": 12, "r": 13 };
    exports.strToChars = function(str) {
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
    exports.tokenizeClass = (str, regexpStr) => {
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
            type: types.RANGE,
            from: (rs[8] || rs[9]).charCodeAt(0),
            to: rs[10].charCodeAt(0)
          });
        } else if (c = rs[12]) {
          tokens.push({
            type: types.CHAR,
            value: c.charCodeAt(0)
          });
        } else {
          return [tokens, regexp.lastIndex];
        }
      }
      exports.error(regexpStr, "Unterminated character class");
    };
    exports.error = (regexp, msg) => {
      throw new SyntaxError("Invalid regular expression: /" + regexp + "/: " + msg);
    };
  }
});

// node_modules/ret/lib/positions.js
var require_positions = __commonJS({
  "node_modules/ret/lib/positions.js"(exports) {
    var types = require_types();
    exports.wordBoundary = () => ({ type: types.POSITION, value: "b" });
    exports.nonWordBoundary = () => ({ type: types.POSITION, value: "B" });
    exports.begin = () => ({ type: types.POSITION, value: "^" });
    exports.end = () => ({ type: types.POSITION, value: "$" });
  }
});

// node_modules/ret/lib/index.js
var require_lib = __commonJS({
  "node_modules/ret/lib/index.js"(exports, module) {
    var util = require_util();
    var types = require_types();
    var sets = require_sets();
    var positions = require_positions();
    module.exports = (regexpStr) => {
      var i = 0, l, c, start = { type: types.ROOT, stack: [] }, lastGroup = start, last = start.stack, groupStack = [];
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
                  last.push({ type: types.REFERENCE, value: parseInt(c, 10) });
                } else {
                  last.push({ type: types.CHAR, value: c.charCodeAt(0) });
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
              type: types.SET,
              set: classTokens[0],
              not
            });
            break;
          case ".":
            last.push(sets.anyChar());
            break;
          case "(":
            var group = {
              type: types.GROUP,
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
                util.error(regexpStr, `Invalid group, character '${c}' after '?' at column ${i - 1}`);
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
                type: types.REPETITION,
                min,
                max,
                value: last.pop()
              });
            } else {
              last.push({
                type: types.CHAR,
                value: 123
              });
            }
            break;
          case "?":
            if (last.length === 0) {
              repeatErr(i);
            }
            last.push({
              type: types.REPETITION,
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
              type: types.REPETITION,
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
              type: types.REPETITION,
              min: 0,
              max: Infinity,
              value: last.pop()
            });
            break;
          default:
            last.push({
              type: types.CHAR,
              value: c.charCodeAt(0)
            });
        }
      }
      if (groupStack.length !== 0) {
        util.error(regexpStr, "Unterminated group");
      }
      return start;
    };
    module.exports.types = types;
  }
});

// node_modules/drange/lib/index.js
var require_lib2 = __commonJS({
  "node_modules/drange/lib/index.js"(exports, module) {
    "use strict";
    var SubRange = class {
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
      add(range) {
        return new SubRange(Math.min(this.low, range.low), Math.max(this.high, range.high));
      }
      subtract(range) {
        if (range.low <= this.low && range.high >= this.high) {
          return [];
        } else if (range.low > this.low && range.high < this.high) {
          return [
            new SubRange(this.low, range.low - 1),
            new SubRange(range.high + 1, this.high)
          ];
        } else if (range.low <= this.low) {
          return [new SubRange(range.high + 1, this.high)];
        } else {
          return [new SubRange(this.low, range.low - 1)];
        }
      }
      toString() {
        return this.low == this.high ? this.low.toString() : this.low + "-" + this.high;
      }
    };
    var DRange = class {
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
        if (a instanceof DRange) {
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
        if (a instanceof DRange) {
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
        if (a instanceof DRange) {
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
        return new DRange(this);
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
    module.exports = DRange;
  }
});

// node_modules/randexp/lib/randexp.js
var require_randexp = __commonJS({
  "node_modules/randexp/lib/randexp.js"(exports, module) {
    var ret = require_lib();
    var DRange = require_lib2();
    var types = ret.types;
    module.exports = class RandExp {
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
      _setDefaults(regexp) {
        this.max = regexp.max != null ? regexp.max : RandExp.prototype.max != null ? RandExp.prototype.max : 100;
        this.defaultRange = regexp.defaultRange ? regexp.defaultRange : this.defaultRange.clone();
        if (regexp.randInt) {
          this.randInt = regexp.randInt;
        }
      }
      gen() {
        return this._gen(this.tokens, []);
      }
      _gen(token, groups) {
        var stack, str, n, i, l;
        switch (token.type) {
          case types.ROOT:
          case types.GROUP:
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
          case types.POSITION:
            return "";
          case types.SET:
            var expandedSet = this._expand(token);
            if (!expandedSet.length) {
              return "";
            }
            return String.fromCharCode(this._randSelect(expandedSet));
          case types.REPETITION:
            n = this.randInt(token.min, token.max === Infinity ? token.min + this.max : token.max);
            str = "";
            for (i = 0; i < n; i++) {
              str += this._gen(token.value, groups);
            }
            return str;
          case types.REFERENCE:
            return groups[token.value - 1] || "";
          case types.CHAR:
            var code = this.ignoreCase && this._randBool() ? this._toOtherCase(token.value) : token.value;
            return String.fromCharCode(code);
        }
      }
      _toOtherCase(code) {
        return code + (97 <= code && code <= 122 ? -32 : 65 <= code && code <= 90 ? 32 : 0);
      }
      _randBool() {
        return !this.randInt(0, 1);
      }
      _randSelect(arr) {
        if (arr instanceof DRange) {
          return arr.index(this.randInt(0, arr.length - 1));
        }
        return arr[this.randInt(0, arr.length - 1)];
      }
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
      randInt(a, b) {
        return a + Math.floor(Math.random() * (1 + b - a));
      }
      get defaultRange() {
        return this._range = this._range || new DRange(32, 126);
      }
      set defaultRange(range) {
        this._range = range;
      }
      static randexp(regexp, m) {
        var randexp;
        if (typeof regexp === "string") {
          regexp = new RegExp(regexp, m);
        }
        if (regexp._randexp === void 0) {
          randexp = new RandExp(regexp, m);
          regexp._randexp = randexp;
        } else {
          randexp = regexp._randexp;
          randexp._setDefaults(regexp);
        }
        return randexp.gen();
      }
      static sugar() {
        RegExp.prototype.gen = function() {
          return RandExp.randexp(this);
        };
      }
    };
  }
});

// src/lib/core/random.js
var require_random = __commonJS({
  "src/lib/core/random.js"(exports, module) {
    var RandExp = require_randexp();
    var optionAPI = require_option();
    var env = require_constants();
    function getRandomInteger(min, max) {
      min = typeof min === "undefined" ? env.MIN_INTEGER : min;
      max = typeof max === "undefined" ? env.MAX_INTEGER : max;
      return Math.floor(optionAPI("random")() * (max - min + 1)) + min;
    }
    function _randexp(value) {
      RandExp.prototype.max = optionAPI("defaultRandExpMax");
      RandExp.prototype.randInt = (a, b) => a + Math.floor(optionAPI("random")() * (1 + (b - a)));
      const re = new RandExp(value);
      return re.gen();
    }
    function pick(collection) {
      return collection[Math.floor(optionAPI("random")() * collection.length)];
    }
    function shuffle(collection) {
      let tmp;
      let key;
      let length = collection.length;
      const copy = collection.slice();
      for (; length > 0; ) {
        key = Math.floor(optionAPI("random")() * length);
        length -= 1;
        tmp = copy[length];
        copy[length] = copy[key];
        copy[key] = tmp;
      }
      return copy;
    }
    function getRandom(min, max) {
      return optionAPI("random")() * (max - min) + min;
    }
    function number(min, max, defMin, defMax, hasPrecision = false) {
      defMin = typeof defMin === "undefined" ? env.MIN_NUMBER : defMin;
      defMax = typeof defMax === "undefined" ? env.MAX_NUMBER : defMax;
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
      const now = new Date();
      const days = number(-1e3, env.MOST_NEAR_DATETIME);
      now.setTime(now.getTime() - days);
      return now;
    }
    var random_default = {
      pick,
      date,
      shuffle,
      number,
      randexp: _randexp
    };
    module.exports = random_default;
  }
});

// src/lib/core/utils.js
var require_utils = __commonJS({
  "src/lib/core/utils.js"(exports, module) {
    var optionAPI = require_option();
    var env = require_constants();
    var random = require_random();
    function getLocalRef(obj, path, refs) {
      const keyElements = path.replace("#/", "/").split("/");
      let schema = obj.$ref && refs ? refs[obj.$ref] : obj;
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
      month = Math.max(1, Math.min(12, month));
      day = Math.max(1, Math.min(31, day));
      return `${year}-${month}-${day}`;
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
          params.minLength = optionAPI("minLength") || 0;
          params.maxLength = optionAPI("maxLength") || Number.MAX_SAFE_INTEGER;
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
          value = parseFloat(value);
          break;
        case "integer":
          value = parseInt(value, 10);
          break;
        case "boolean":
          value = !!value;
          break;
        case "string": {
          value = String(value);
          const min = Math.max(params.minLength || 0, 0);
          const max = Math.min(params.maxLength || Infinity, Infinity);
          let prev;
          let noChangeCount = 0;
          while (value.length < min) {
            prev = value;
            if (!schema.pattern) {
              value += `${random.pick([" ", "/", "_", "-", "+", "=", "@", "^"])}${value}`;
            } else {
              value += random.randexp(schema.pattern);
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
              value = new Date(clampDate(value)).toISOString().replace(/([0-9])0+Z$/, "$1Z");
              break;
            case "full-date":
            case "date":
              value = new Date(clampDate(value)).toISOString().substr(0, 10);
              break;
            case "time":
              value = new Date(`1969-01-01 ${value}`).toISOString().substr(11);
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
          b[key].forEach((value) => {
            if (Array.isArray(a[key]) && a[key].indexOf(value) === -1) {
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
    function clone(obj, cache = new Map()) {
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
      return random.pick([
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
        Math.random(),
        Math.random().toString(36).substr(2)
      ]);
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
        copy.type = random.pick(env.SCALAR_TYPES.filter((x) => {
          const types = Array.isArray(schema.type) ? schema.type : [schema.type];
          return types.every((type) => {
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
      const isRequired = Array.isArray(schema.required) && schema.required.includes(key);
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
          const value = clean(obj[k], schema);
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
    var utils_default = {
      hasProperties,
      getLocalRef,
      omitProps,
      typecast,
      merge,
      clone,
      short,
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
    module.exports = utils_default;
  }
});

// src/lib/class/Container.js
var require_Container = __commonJS({
  "src/lib/class/Container.js"(exports, module) {
    var import_utils = __toModule(require_utils());
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
          value = value.apply(ctx, args.map((x) => import_utils.default.template(x, rootSchema)));
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
    var Container = class {
      constructor() {
        this.registry = {};
        this.support = {};
      }
      reset(name) {
        if (!name) {
          this.registry = {};
          this.support = {};
        } else {
          delete this.registry[name];
          delete this.support[name];
        }
      }
      extend(name, callback) {
        this.registry[name] = callback(this.registry[name]);
        if (!this.support[name]) {
          this.support[name] = proxy(() => this.registry[name]);
        }
      }
      define(name, callback) {
        this.support[name] = callback;
      }
      get(name) {
        if (typeof this.registry[name] === "undefined") {
          throw new ReferenceError(`'${name}' dependency doesn't exist.`);
        }
        return this.registry[name];
      }
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
              });
              break;
            }
          }
        }
        return schema;
      }
    };
    var Container_default = Container;
    module.exports = Container_default;
  }
});

// src/lib/api/format.js
var require_format = __commonJS({
  "src/lib/api/format.js"(exports, module) {
    var Registry = require_Registry();
    var registry = new Registry();
    function formatAPI(nameOrFormatMap, callback) {
      if (typeof nameOrFormatMap === "undefined") {
        return registry.list();
      }
      if (typeof nameOrFormatMap === "string") {
        if (typeof callback === "function") {
          registry.register(nameOrFormatMap, callback);
        } else if (callback === null || callback === false) {
          registry.unregister(nameOrFormatMap);
        } else {
          return registry.get(nameOrFormatMap);
        }
      } else {
        registry.registerMany(nameOrFormatMap);
      }
    }
    var format_default = formatAPI;
    module.exports = format_default;
  }
});

// src/lib/core/error.js
var require_error = __commonJS({
  "src/lib/core/error.js"(exports, module) {
    var ParseError = class extends Error {
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
    var error_default = ParseError;
    module.exports = error_default;
  }
});

// src/lib/core/infer.js
var require_infer = __commonJS({
  "src/lib/core/infer.js"(exports, module) {
    var inferredProperties = {
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
    var subschemaProperties = [
      "additionalItems",
      "items",
      "additionalProperties",
      "dependencies",
      "patternProperties",
      "properties"
    ];
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
    var infer_default = inferType;
    module.exports = infer_default;
  }
});

// src/lib/generators/boolean.js
var require_boolean = __commonJS({
  "src/lib/generators/boolean.js"(exports, module) {
    var optionAPI = require_option();
    function booleanGenerator() {
      return optionAPI("random")() > 0.5;
    }
    var boolean_default = booleanGenerator;
    module.exports = boolean_default;
  }
});

// src/lib/types/boolean.js
var require_boolean2 = __commonJS({
  "src/lib/types/boolean.js"(exports, module) {
    var booleanGenerator = require_boolean();
    var booleanType = booleanGenerator;
    var boolean_default = booleanType;
    module.exports = boolean_default;
  }
});

// src/lib/generators/null.js
var require_null = __commonJS({
  "src/lib/generators/null.js"(exports, module) {
    function nullGenerator() {
      return null;
    }
    var null_default = nullGenerator;
    module.exports = null_default;
  }
});

// src/lib/types/null.js
var require_null2 = __commonJS({
  "src/lib/types/null.js"(exports, module) {
    var nullGenerator = require_null();
    var nullType = nullGenerator;
    var null_default = nullType;
    module.exports = null_default;
  }
});

// src/lib/types/array.js
var require_array = __commonJS({
  "src/lib/types/array.js"(exports, module) {
    var random = require_random();
    var utils = require_utils();
    var ParseError = require_error();
    var optionAPI = require_option();
    function unique(path, items, value, sample, resolve, traverseCallback) {
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
        if (!walk(traverseCallback(value.items || sample, path, resolve))) {
          limit -= 1;
        }
        if (!limit) {
          break;
        }
      }
      return tmp;
    }
    function arrayType(value, path, resolve, traverseCallback) {
      const items = [];
      if (!(value.items || value.additionalItems)) {
        if (utils.hasProperties(value, "minItems", "maxItems", "uniqueItems")) {
          throw new ParseError(`missing items for ${utils.short(value)}`, path);
        }
        return items;
      }
      if (Array.isArray(value.items)) {
        return value.items.map((item, key) => {
          const itemSubpath = path.concat(["items", key]);
          return traverseCallback(item, itemSubpath, resolve);
        });
      }
      let minItems = value.minItems;
      let maxItems = value.maxItems;
      const defaultMinItems = optionAPI("minItems");
      const defaultMaxItems = optionAPI("maxItems");
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
      const optionalsProbability = optionAPI("alwaysFakeOptionals") === true ? 1 : optionAPI("optionalsProbability");
      const fixedProbabilities = optionAPI("alwaysFakeOptionals") || optionAPI("fixedProbabilities") || false;
      let length = random.number(minItems, maxItems, 1, 5);
      if (optionalsProbability !== null) {
        length = Math.max(fixedProbabilities ? Math.round((maxItems || length) * optionalsProbability) : Math.abs(random.number(minItems, maxItems) * optionalsProbability), minItems || 0);
      }
      const sample = typeof value.additionalItems === "object" ? value.additionalItems : {};
      for (let current = items.length; current < length; current += 1) {
        const itemSubpath = path.concat(["items", current]);
        const element = traverseCallback(value.items || sample, itemSubpath, resolve);
        items.push(element);
      }
      if (value.contains && length > 0) {
        const idx = random.number(0, length - 1);
        items[idx] = traverseCallback(value.contains, path.concat(["items", idx]), resolve);
      }
      if (value.uniqueItems) {
        return unique(path.concat(["items"]), items, value, sample, resolve, traverseCallback);
      }
      return items;
    }
    var array_default = arrayType;
    module.exports = array_default;
  }
});

// src/lib/types/number.js
var require_number = __commonJS({
  "src/lib/types/number.js"(exports, module) {
    var random = require_random();
    var env = require_constants();
    function numberType(value) {
      let min = typeof value.minimum === "undefined" ? env.MIN_INTEGER : value.minimum;
      let max = typeof value.maximum === "undefined" ? env.MAX_INTEGER : value.maximum;
      const multipleOf = value.multipleOf;
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
        if (String(multipleOf).indexOf(".") === -1) {
          let base = random.number(Math.floor(min / multipleOf), Math.floor(max / multipleOf)) * multipleOf;
          while (base < min) {
            base += value.multipleOf;
          }
          return base;
        }
        const boundary = (max - min) / multipleOf;
        let num;
        let fix;
        do {
          num = random.number(0, boundary) * multipleOf;
          fix = num / multipleOf % 1;
        } while (fix !== 0);
        return min + num;
      }
      return random.number(min, max, void 0, void 0, true);
    }
    var number_default = numberType;
    module.exports = number_default;
  }
});

// src/lib/types/integer.js
var require_integer = __commonJS({
  "src/lib/types/integer.js"(exports, module) {
    var number = require_number();
    function integerType(value) {
      return number({ multipleOf: 1, ...value });
    }
    var integer_default = integerType;
    module.exports = integer_default;
  }
});

// src/lib/generators/words.js
var require_words = __commonJS({
  "src/lib/generators/words.js"(exports, module) {
    var random = require_random();
    var LIPSUM_WORDS = `Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore
et dolore magna aliqua Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
commodo consequat Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
pariatur Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est
laborum`.split(/\W/);
    function wordsGenerator(length) {
      const words = random.shuffle(LIPSUM_WORDS);
      return words.slice(0, length);
    }
    var words_default = wordsGenerator;
    module.exports = words_default;
  }
});

// src/lib/types/object.js
var require_object = __commonJS({
  "src/lib/types/object.js"(exports, module) {
    var constants = require_constants();
    var random = require_random();
    var words = require_words();
    var utils = require_utils();
    var optionAPI = require_option();
    var anyType = { type: constants.ALLOWED_TYPES };
    function objectType(value, path, resolve, traverseCallback) {
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
      if (!allowsAdditional && propertyKeys.length === 0 && patternPropertyKeys.length === 0 && utils.hasProperties(value, "minProperties", "maxProperties", "dependencies", "required")) {
        return null;
      }
      if (optionAPI("requiredOnly") === true) {
        requiredProperties.forEach((key) => {
          if (properties[key]) {
            props[key] = properties[key];
          }
        });
        return traverseCallback(props, path.concat(["properties"]), resolve, value);
      }
      const optionalsProbability = optionAPI("alwaysFakeOptionals") === true ? 1 : optionAPI("optionalsProbability");
      const fixedProbabilities = optionAPI("alwaysFakeOptionals") || optionAPI("fixedProbabilities") || false;
      const ignoreProperties = optionAPI("ignoreProperties") || [];
      const reuseProps = optionAPI("reuseProperties");
      const fillProps = optionAPI("fillProperties");
      const max = value.maxProperties || allProperties.length + (allowsAdditional ? random.number(1, 5) : 0);
      let min = Math.max(value.minProperties || 0, requiredProperties.length);
      let neededExtras = Math.max(0, allProperties.length - min);
      if (allProperties.length === 1 && !requiredProperties.length) {
        min = Math.max(random.number(fillProps ? 1 : 0, max), min);
      }
      if (optionalsProbability !== null) {
        if (fixedProbabilities === true) {
          neededExtras = Math.round(min - requiredProperties.length + optionalsProbability * (allProperties.length - min));
        } else {
          neededExtras = random.number(min - requiredProperties.length, optionalsProbability * (allProperties.length - min));
        }
      }
      const extraPropertiesRandomOrder = random.shuffle(optionalProperties).slice(0, neededExtras);
      const extraProperties = optionalProperties.filter((_item) => {
        return extraPropertiesRandomOrder.indexOf(_item) !== -1;
      });
      const _limit = optionalsProbability !== null || requiredProperties.length === max ? max : random.number(0, max);
      const _props = requiredProperties.concat(random.shuffle(extraProperties).slice(0, _limit)).slice(0, max);
      const _defns = [];
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
            } else {
              _defns.push(_required);
            }
          }
        });
        if (_defns.length) {
          delete value.dependencies;
          return traverseCallback({
            allOf: _defns.concat(value)
          }, path.concat(["properties"]), resolve, value);
        }
      }
      const skipped = [];
      const missing = [];
      _props.forEach((key) => {
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
              utils.merge(props[key], patternProperties[_key]);
            } else {
              props[random.randexp(key)] = patternProperties[_key];
            }
          }
        });
        if (!found) {
          const subschema = patternProperties[key] || additionalProperties;
          if (subschema && additionalProperties !== false) {
            props[patternProperties[key] ? random.randexp(key) : key] = properties[key] || subschema;
          } else {
            missing.push(key);
          }
        }
      });
      let current = Object.keys(props).length + (fillProps ? 0 : skipped.length);
      const hash = (suffix) => random.randexp(`_?[_a-f\\d]{1,3}${suffix ? "\\$?" : ""}`);
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
        minProps = Math.max(optionalsProbability === null || additionalProperties ? random.number(fillProps ? 1 : 0, max) : 0, min);
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
              key = get(requiredProperties) || random.pick(propertyKeys);
            } while (typeof props[key] !== "undefined");
            if (typeof props[key] === "undefined") {
              props[key] = properties[key];
              current += 1;
            }
          } else if (patternPropertyKeys.length && !additionalProperties) {
            const prop = random.pick(patternPropertyKeys);
            const word = random.randexp(prop);
            if (!props[word]) {
              props[word] = patternProperties[prop];
              current += 1;
            }
          } else {
            const word = get(requiredProperties) || words(1) + hash();
            if (!props[word]) {
              props[word] = additionalProperties || anyType;
              current += 1;
            }
          }
        }
        for (let i = 0; current < min && i < patternPropertyKeys.length; i += 1) {
          const _key = patternPropertyKeys[i];
          const word = random.randexp(_key);
          if (!props[word]) {
            props[word] = patternProperties[_key];
            current += 1;
          }
        }
      }
      if (requiredProperties.length === 0 && (!allowsAdditional || optionalsProbability === false)) {
        const maximum = random.number(min, max);
        for (; current < maximum; ) {
          const word = get(propertyKeys);
          if (word) {
            props[word] = properties[word];
          }
          current += 1;
        }
      }
      return traverseCallback(props, path.concat(["properties"]), resolve, value);
    }
    var object_default = objectType;
    module.exports = object_default;
  }
});

// src/lib/generators/thunk.js
var require_thunk = __commonJS({
  "src/lib/generators/thunk.js"(exports, module) {
    var words = require_words();
    var random = require_random();
    function produce() {
      const length = random.number(1, 5);
      return words(length).join(" ");
    }
    function thunkGenerator(min = 0, max = 140) {
      const _min = Math.max(0, min);
      const _max = random.number(_min, max);
      let result = produce();
      while (result.length < _min) {
        result += produce();
      }
      if (result.length > _max) {
        result = result.substr(0, _max);
      }
      return result;
    }
    var thunk_default = thunkGenerator;
    module.exports = thunk_default;
  }
});

// src/lib/generators/ipv4.js
var require_ipv4 = __commonJS({
  "src/lib/generators/ipv4.js"(exports, module) {
    var random = require_random();
    function ipv4Generator() {
      return [0, 0, 0, 0].map(() => {
        return random.number(0, 255);
      }).join(".");
    }
    var ipv4_default = ipv4Generator;
    module.exports = ipv4_default;
  }
});

// src/lib/generators/dateTime.js
var require_dateTime = __commonJS({
  "src/lib/generators/dateTime.js"(exports, module) {
    var random = require_random();
    function dateTimeGenerator() {
      return random.date().toISOString();
    }
    var dateTime_default = dateTimeGenerator;
    module.exports = dateTime_default;
  }
});

// src/lib/generators/date.js
var require_date = __commonJS({
  "src/lib/generators/date.js"(exports, module) {
    var dateTimeGenerator = require_dateTime();
    function dateGenerator() {
      return dateTimeGenerator().slice(0, 10);
    }
    var date_default = dateGenerator;
    module.exports = date_default;
  }
});

// src/lib/generators/time.js
var require_time = __commonJS({
  "src/lib/generators/time.js"(exports, module) {
    var dateTimeGenerator = require_dateTime();
    function timeGenerator() {
      return dateTimeGenerator().slice(11);
    }
    var time_default = timeGenerator;
    module.exports = time_default;
  }
});

// src/lib/generators/coreFormat.js
var require_coreFormat = __commonJS({
  "src/lib/generators/coreFormat.js"(exports, module) {
    var random = require_random();
    var FRAGMENT = "[a-zA-Z][a-zA-Z0-9+-.]*";
    var URI_PATTERN = `https?://{hostname}(?:${FRAGMENT})+`;
    var PARAM_PATTERN = "(?:\\?([a-z]{1,7}(=\\w{1,5})?&){0,3})?";
    var regexps = {
      email: "[a-zA-Z\\d][a-zA-Z\\d-]{1,13}[a-zA-Z\\d]@{hostname}",
      hostname: "[a-zA-Z]{1,33}\\.[a-z]{2,4}",
      ipv6: "[a-f\\d]{4}(:[a-f\\d]{4}){7}",
      uri: URI_PATTERN,
      slug: "[a-zA-Z\\d_-]+",
      "uri-reference": `${URI_PATTERN}${PARAM_PATTERN}`,
      "uri-template": URI_PATTERN.replace("(?:", "(?:/\\{[a-z][:a-zA-Z0-9-]*\\}|"),
      "json-pointer": `(/(?:${FRAGMENT.replace("]*", "/]*")}|~[01]))+`,
      uuid: "^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$"
    };
    regexps.iri = regexps["uri-reference"];
    regexps["iri-reference"] = regexps["uri-reference"];
    regexps["idn-email"] = regexps.email;
    regexps["idn-hostname"] = regexps.hostname;
    var ALLOWED_FORMATS = new RegExp(`\\{(${Object.keys(regexps).join("|")})\\}`);
    function coreFormatGenerator(coreFormat) {
      return random.randexp(regexps[coreFormat]).replace(ALLOWED_FORMATS, (match, key) => {
        return random.randexp(regexps[key]);
      });
    }
    var coreFormat_default = coreFormatGenerator;
    module.exports = coreFormat_default;
  }
});

// src/lib/types/string.js
var require_string = __commonJS({
  "src/lib/types/string.js"(exports, module) {
    var thunk = require_thunk();
    var ipv4 = require_ipv4();
    var dateTime = require_dateTime();
    var date = require_date();
    var time = require_time();
    var coreFormat = require_coreFormat();
    var optionAPI = require_option();
    var format = require_format();
    var random = require_random();
    var utils = require_utils();
    function generateFormat(value, invalid) {
      const callback = format(value.format);
      if (typeof callback === "function") {
        return callback(value);
      }
      switch (value.format) {
        case "date-time":
        case "datetime":
          return dateTime();
        case "date":
          return date();
        case "time":
          return time();
        case "ipv4":
          return ipv4();
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
          return coreFormat(value.format);
        default:
          if (typeof callback === "undefined") {
            if (optionAPI("failOnInvalidFormat")) {
              throw new Error(`unknown registry key ${utils.short(value.format)}`);
            } else {
              return invalid();
            }
          }
          throw new Error(`unsupported format '${value.format}'`);
      }
    }
    function stringType(value) {
      const output = utils.typecast("string", value, (opts) => {
        if (value.format) {
          return generateFormat(value, () => thunk(opts.minLength, opts.maxLength));
        }
        if (value.pattern) {
          return random.randexp(value.pattern);
        }
        return thunk(opts.minLength, opts.maxLength);
      });
      return output;
    }
    var string_default = stringType;
    module.exports = string_default;
  }
});

// src/lib/types/index.js
var require_types2 = __commonJS({
  "src/lib/types/index.js"(exports, module) {
    var _boolean = require_boolean2();
    var _null = require_null2();
    var _array = require_array();
    var _integer = require_integer();
    var _number = require_number();
    var _object = require_object();
    var _string = require_string();
    var typeMap = {
      boolean: _boolean,
      null: _null,
      array: _array,
      integer: _integer,
      number: _number,
      object: _object,
      string: _string
    };
    var types_default = typeMap;
    module.exports = types_default;
  }
});

// src/lib/core/traverse.js
var require_traverse = __commonJS({
  "src/lib/core/traverse.js"(exports, module) {
    var utils = require_utils();
    var random = require_random();
    var ParseError = require_error();
    var inferType = require_infer();
    var types = require_types2();
    var optionAPI = require_option();
    function getMeta({ $comment: comment, title, description }) {
      return Object.entries({ comment, title, description }).filter(([, value]) => value).reduce((memo, [k, v]) => {
        memo[k] = v;
        return memo;
      }, {});
    }
    function traverse(schema, path, resolve, rootSchema) {
      schema = resolve(schema, null, path);
      if (schema && (schema.oneOf || schema.anyOf || schema.allOf)) {
        schema = resolve(schema, null, path);
      }
      if (!schema) {
        return;
      }
      const context = {
        ...getMeta(schema),
        schemaPath: path
      };
      if (path[path.length - 1] !== "properties") {
        if (optionAPI("useExamplesValue") && Array.isArray(schema.examples)) {
          const fixedExamples = schema.examples.concat("default" in schema ? [schema.default] : []);
          return { value: utils.typecast(null, schema, () => random.pick(fixedExamples)), context };
        }
        if (optionAPI("useDefaultValue") && "default" in schema) {
          if (schema.default !== "" || !optionAPI("replaceEmptyByRandomValue")) {
            return { value: schema.default, context };
          }
        }
        if ("template" in schema) {
          return { value: utils.template(schema.template, rootSchema), context };
        }
        if ("const" in schema) {
          return { value: schema.const, context };
        }
      }
      if (schema.not && typeof schema.not === "object") {
        schema = utils.notValue(schema.not, utils.omitProps(schema, ["not"]));
        if (schema.type && schema.type === "object") {
          const { value, context: innerContext } = traverse(schema, path.concat(["not"]), resolve, rootSchema);
          return { value: utils.clean(value, schema, false), context: { ...context, items: innerContext } };
        }
      }
      if (typeof schema.thunk === "function") {
        const { value, context: innerContext } = traverse(schema.thunk(rootSchema), path, resolve);
        return { value, context: { ...context, items: innerContext } };
      }
      if (typeof schema.generate === "function") {
        const retval = utils.typecast(null, schema, () => schema.generate(rootSchema, path));
        const type2 = retval === null ? "null" : typeof retval;
        if (type2 === schema.type || Array.isArray(schema.type) && schema.type.includes(type2) || type2 === "number" && schema.type === "integer" || Array.isArray(retval) && schema.type === "array") {
          return { value: retval, context };
        }
      }
      if (typeof schema.pattern === "string") {
        return { value: utils.typecast("string", schema, () => random.randexp(schema.pattern)), context };
      }
      if (Array.isArray(schema.enum)) {
        return { value: utils.typecast(null, schema, () => random.pick(schema.enum)), context };
      }
      if (schema.jsonPath) {
        return { value: schema, context };
      }
      let type = schema.type;
      if (Array.isArray(type)) {
        type = random.pick(type);
      } else if (typeof type === "undefined") {
        type = inferType(schema, path) || type;
        if (type) {
          schema.type = type;
        }
      }
      if (typeof type === "string") {
        if (!types[type]) {
          if (optionAPI("failOnInvalidTypes")) {
            throw new ParseError(`unknown primitive ${utils.short(type)}`, path.concat(["type"]));
          } else {
            const value = optionAPI("defaultInvalidTypeProduct");
            if (typeof value === "string" && types[value]) {
              return { value: types[value](schema, path, resolve, traverse), context };
            }
            return { value, context };
          }
        } else {
          try {
            const innerResult = types[type](schema, path, resolve, traverse);
            if (type === "array") {
              return {
                value: innerResult.map(({ value }) => value),
                context: {
                  ...context,
                  items: innerResult.map(Array.isArray(schema.items) ? ({ context: c }) => c : ({ context: c }) => ({
                    ...c,
                    schemaPath: c.schemaPath.slice(0, -1)
                  }))
                }
              };
            }
            if (type === "object") {
              return { value: innerResult.value, context: { ...context, items: innerResult.context } };
            }
            return { value: innerResult, context };
          } catch (e) {
            if (typeof e.path === "undefined") {
              throw new ParseError(e.stack, path);
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
      Object.keys(schema).forEach((prop) => {
        if (typeof schema[prop] === "object" && prop !== "definitions") {
          const { value, context: innerContext } = traverse(schema[prop], path.concat([prop]), resolve, valueCopy);
          valueCopy[prop] = utils.clean(value, schema[prop], false);
          contextCopy[prop] = innerContext;
        } else {
          valueCopy[prop] = schema[prop];
        }
      });
      return { value: valueCopy, context: contextCopy };
    }
    var traverse_default = traverse;
    module.exports = traverse_default;
  }
});

// src/lib/core/buildResolveSchema.js
var require_buildResolveSchema = __commonJS({
  "src/lib/core/buildResolveSchema.js"(exports, module) {
    var optionAPI = require_option();
    var random = require_random();
    var utils = require_utils();
    var buildResolveSchema = ({
      refs,
      schema,
      container,
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
              return utils.getLocalRef(schema, sub.$ref, synchronous && refs);
            }
            delete sub.$ref;
            return sub;
          }
          if (typeof seenRefs[sub.$ref] === "undefined") {
            seenRefs[sub.$ref] = random.number(refDepthMin, refDepthMax) - 1;
          }
          lastPath = rootPath;
          lastRef = sub.$ref;
          let ref;
          if (sub.$ref.indexOf("#/") === -1) {
            ref = refs[sub.$ref] || null;
          } else {
            ref = utils.getLocalRef(schema, sub.$ref, synchronous && refs) || null;
          }
          let fixed;
          if (typeof ref !== "undefined") {
            if (!ref && optionAPI("ignoreMissingRefs") !== true) {
              throw new Error(`Reference not found: ${sub.$ref}`);
            }
            seenRefs[sub.$ref] -= 1;
            utils.merge(sub, ref || {});
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
            utils.merge(sub, typeof _sub.thunk === "function" ? _sub.thunk(sub) : _sub);
            if (Array.isArray(sub.allOf)) {
              recursiveUtil.resolveSchema(sub, index, rootPath);
            }
          });
        }
        if (Array.isArray(sub.oneOf || sub.anyOf)) {
          const mix = sub.oneOf || sub.anyOf;
          if (sub.enum && sub.oneOf) {
            sub.enum = sub.enum.filter((x) => utils.validate(x, mix));
          }
          return {
            thunk(rootSchema) {
              const copy = utils.omitProps(sub, ["anyOf", "oneOf"]);
              const fixed = random.pick(mix);
              utils.merge(copy, fixed);
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
          if ((Array.isArray(sub[prop]) || typeof sub[prop] === "object") && !utils.isKey(prop)) {
            sub[prop] = recursiveUtil.resolveSchema(sub[prop], prop, rootPath.concat(prop));
          }
        });
        if (rootPath) {
          const lastProp = rootPath[rootPath.length - 1];
          if (lastProp === "properties" || lastProp === "items") {
            return sub;
          }
        }
        return container.wrap(sub);
      };
      return recursiveUtil;
    };
    var buildResolveSchema_default = buildResolveSchema;
    module.exports = buildResolveSchema_default;
  }
});

// src/lib/core/run.js
var require_run = __commonJS({
  "src/lib/core/run.js"(exports, module) {
    var { getDependencies } = require_vendor();
    var optionAPI = require_option();
    var traverse = require_traverse();
    var random = require_random();
    var utils = require_utils();
    var buildResolveSchema = require_buildResolveSchema();
    function pick(data) {
      return Array.isArray(data) ? random.pick(data) : data;
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
        return pick(values[key]);
      }
      Object.keys(obj).forEach((k) => {
        obj[k] = resolve(obj[k], data, values, k);
      });
      return obj;
    }
    function run(refs, schema, container, synchronous) {
      if (Object.prototype.toString.call(schema) !== "[object Object]") {
        throw new Error(`Invalid input, expecting object but given ${typeof schema}`);
      }
      const refDepthMin = optionAPI("refDepthMin") || 0;
      const refDepthMax = optionAPI("refDepthMax") || 3;
      try {
        const { resolveSchema } = buildResolveSchema({
          refs,
          schema,
          container,
          synchronous,
          refDepthMin,
          refDepthMax
        });
        const result = traverse(utils.clone(schema), [], resolveSchema);
        if (optionAPI("resolveJsonPath")) {
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
    var run_default = run;
    module.exports = run_default;
  }
});

// src/lib/renderers/js.js
var require_js = __commonJS({
  "src/lib/renderers/js.js"(exports, module) {
    function renderJS(res) {
      return res.value;
    }
    var js_default = renderJS;
    module.exports = js_default;
  }
});

// node_modules/yaml/dist/PlainValue-ec8e588e.js
var require_PlainValue_ec8e588e = __commonJS({
  "node_modules/yaml/dist/PlainValue-ec8e588e.js"(exports) {
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
    var Range = class {
      static copy(orig) {
        return new Range(orig.start, orig.end);
      }
      constructor(start, end) {
        this.start = start;
        this.end = end || start;
      }
      isEmpty() {
        return typeof this.start !== "number" || !this.end || this.end <= this.start;
      }
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
    var Node = class {
      static addStringTerminator(src, offset, str) {
        if (str[str.length - 1] === "\n")
          return str;
        const next = Node.endOfWhiteSpace(src, offset);
        return next >= src.length || src[next] === "\n" ? str + "\n" : str;
      }
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
      static endOfBlockIndent(src, indent, lineStart) {
        const inEnd = Node.endOfIndent(src, lineStart);
        if (inEnd > lineStart + indent) {
          return inEnd;
        } else {
          const wsEnd = Node.endOfWhiteSpace(src, inEnd);
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
      static normalizeOffset(src, offset) {
        const ch = src[offset];
        return !ch ? offset : ch !== "\n" && src[offset - 1] === "\n" ? offset - 1 : Node.endOfWhiteSpace(src, offset);
      }
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
              offset = Node.endOfWhiteSpace(src, offset + 2) - 1;
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
        return start !== end || Node.atBlank(src, end - 1);
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
          const end = Node.endOfLine(src, start + 1);
          const commentRange = new Range(start, end);
          this.props.push(commentRange);
          return end;
        }
        return start;
      }
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
        return Node.addStringTerminator(src, range.end, str);
      }
    };
    var YAMLError = class extends Error {
      constructor(name, source, message) {
        if (!message || !(source instanceof Node))
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
    var PlainValue = class extends Node {
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
            } = Node.foldNewline(src, i, -1);
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
          if (Node.atDocumentBoundary(src, offset + 1))
            break;
          const end = Node.endOfBlockIndent(src, indent, offset + 1);
          if (end === null || src[end] === "#")
            break;
          if (src[end] === "\n") {
            offset = end;
          } else {
            valueEnd = PlainValue.endOfLine(src, end, inFlow);
            offset = valueEnd;
          }
        }
        if (this.valueRange.isEmpty())
          this.valueRange.start = start;
        this.valueRange.end = valueEnd;
        return valueEnd;
      }
      parse(context, start) {
        this.context = context;
        const {
          inFlow,
          src
        } = context;
        let offset = start;
        const ch = src[offset];
        if (ch && ch !== "#" && ch !== "\n") {
          offset = PlainValue.endOfLine(src, start, inFlow);
        }
        this.valueRange = new Range(start, offset);
        offset = Node.endOfWhiteSpace(src, offset);
        offset = this.parseComment(offset);
        if (!this.hasComment || this.valueRange.isEmpty()) {
          offset = this.parseBlockValue(offset);
        }
        return offset;
      }
    };
    exports.Char = Char;
    exports.Node = Node;
    exports.PlainValue = PlainValue;
    exports.Range = Range;
    exports.Type = Type;
    exports.YAMLError = YAMLError;
    exports.YAMLReferenceError = YAMLReferenceError;
    exports.YAMLSemanticError = YAMLSemanticError;
    exports.YAMLSyntaxError = YAMLSyntaxError;
    exports.YAMLWarning = YAMLWarning;
    exports._defineProperty = _defineProperty;
    exports.defaultTagPrefix = defaultTagPrefix;
    exports.defaultTags = defaultTags;
  }
});

// node_modules/yaml/dist/resolveSeq-d03cb037.js
var require_resolveSeq_d03cb037 = __commonJS({
  "node_modules/yaml/dist/resolveSeq-d03cb037.js"(exports) {
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
    var Node = class {
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
    var Scalar = class extends Node {
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
    var Collection = class extends Node {
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
          if (node instanceof Collection)
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
        if (node instanceof Collection)
          return node.deleteIn(rest);
        else
          throw new Error(`Expected YAML collection at ${key}. Remaining path: ${rest}`);
      }
      getIn([key, ...rest], keepScalar) {
        const node = this.get(key, true);
        if (rest.length === 0)
          return !keepScalar && node instanceof Scalar ? node.value : node;
        else
          return node instanceof Collection ? node.getIn(rest, keepScalar) : void 0;
      }
      hasAllNullValues() {
        return this.items.every((node) => {
          if (!node || node.type !== "PAIR")
            return false;
          const n = node.value;
          return n == null || n instanceof Scalar && n.value == null && !n.commentBefore && !n.comment && !n.tag;
        });
      }
      hasIn([key, ...rest]) {
        if (rest.length === 0)
          return this.has(key);
        const node = this.get(key, true);
        return node instanceof Collection ? node.hasIn(rest) : false;
      }
      setIn([key, ...rest], value) {
        if (rest.length === 0) {
          this.set(key, value);
        } else {
          const node = this.get(key, true);
          if (node instanceof Collection)
            node.setIn(rest, value);
          else if (node === void 0 && this.schema)
            this.set(key, collectionFromPath(this.schema, rest, value));
          else
            throw new Error(`Expected YAML collection at ${key}. Remaining path: ${rest}`);
        }
      }
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
          if (hasItemWithNewLine || strings.reduce((sum, str2) => sum + str2.length + 2, 2) > Collection.maxFlowStringSingleLineLength) {
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
    PlainValue._defineProperty(Collection, "maxFlowStringSingleLineLength", 60);
    function asItemIndex(key) {
      let idx = key instanceof Scalar ? key.value : key;
      if (idx && typeof idx === "string")
        idx = Number(idx);
      return Number.isInteger(idx) && idx >= 0 ? idx : null;
    }
    var YAMLSeq = class extends Collection {
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
        return !keepScalar && it instanceof Scalar ? it.value : it;
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
      if (key instanceof Node && ctx && ctx.doc)
        return key.toString({
          anchors: Object.create(null),
          doc: ctx.doc,
          indent: "",
          indentStep: ctx.indentStep,
          inFlow: true,
          inStringifyKey: true,
          stringify: ctx.stringify
        });
      return JSON.stringify(jsKey);
    };
    var Pair = class extends Node {
      constructor(key, value = null) {
        super();
        this.key = key;
        this.value = value;
        this.type = Pair.Type.PAIR;
      }
      get commentBefore() {
        return this.key instanceof Node ? this.key.commentBefore : void 0;
      }
      set commentBefore(cb) {
        if (this.key == null)
          this.key = new Scalar(null);
        if (this.key instanceof Node)
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
        const pair = ctx && ctx.mapAsMap ? new Map() : {};
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
        let keyComment = key instanceof Node && key.comment;
        if (simpleKeys) {
          if (keyComment) {
            throw new Error("With simple keys, key nodes cannot have comments");
          }
          if (key instanceof Collection) {
            const msg = "With simple keys, collection cannot be used as a key value";
            throw new Error(msg);
          }
        }
        let explicitKey = !simpleKeys && (!key || keyComment || (key instanceof Node ? key instanceof Collection || key.type === PlainValue.Type.BLOCK_FOLDED || key.type === PlainValue.Type.BLOCK_LITERAL : typeof key === "object"));
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
        if (value instanceof Node) {
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
        if (!explicitKey && !this.comment && value instanceof Scalar)
          ctx.indentAtStart = str.length + 1;
        chompKeep = false;
        if (!indentSeq && indentSize >= 2 && !ctx.inFlow && !explicitKey && value instanceof YAMLSeq && value.type !== PlainValue.Type.FLOW_SEQ && !value.tag && !doc.anchors.getName(value)) {
          ctx.indent = ctx.indent.substr(2);
        }
        const valueStr = stringify(value, ctx, () => valueComment = null, () => chompKeep = true);
        let ws = " ";
        if (vcb || this.comment) {
          ws = `${vcb}
${ctx.indent}`;
        } else if (!explicitKey && value instanceof Collection) {
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
    PlainValue._defineProperty(Pair, "Type", {
      PAIR: "PAIR",
      MERGE_PAIR: "MERGE_PAIR"
    });
    var getAliasCount = (node, anchors) => {
      if (node instanceof Alias) {
        const anchor = anchors.get(node.source);
        return anchor.count * anchor.aliasCount;
      } else if (node instanceof Collection) {
        let count = 0;
        for (const item of node.items) {
          const c = getAliasCount(item, anchors);
          if (c > count)
            count = c;
        }
        return count;
      } else if (node instanceof Pair) {
        const kc = getAliasCount(node.key, anchors);
        const vc = getAliasCount(node.value, anchors);
        return Math.max(kc, vc);
      }
      return 1;
    };
    var Alias = class extends Node {
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
      toString(ctx) {
        return Alias.stringify(this, ctx);
      }
    };
    PlainValue._defineProperty(Alias, "default", true);
    function findPair(items, key) {
      const k = key instanceof Scalar ? key.value : key;
      for (const it of items) {
        if (it instanceof Pair) {
          if (it.key === key || it.key === k)
            return it;
          if (it.key && it.key.value === k)
            return it;
        }
      }
      return void 0;
    }
    var YAMLMap = class extends Collection {
      add(pair, overwrite) {
        if (!pair)
          pair = new Pair(pair);
        else if (!(pair instanceof Pair))
          pair = new Pair(pair.key || pair, pair.value);
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
        return !keepScalar && node instanceof Scalar ? node.value : node;
      }
      has(key) {
        return !!findPair(this.items, key);
      }
      set(key, value) {
        this.add(new Pair(key, value), true);
      }
      toJSON(_, ctx, Type) {
        const map = Type ? new Type() : ctx && ctx.mapAsMap ? new Map() : {};
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
          if (!(item instanceof Pair))
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
    var Merge = class extends Pair {
      constructor(pair) {
        if (pair instanceof Pair) {
          let seq = pair.value;
          if (!(seq instanceof YAMLSeq)) {
            seq = new YAMLSeq();
            seq.items.push(pair.value);
            seq.range = pair.value.range;
          }
          super(pair.key, seq);
          this.range = pair.range;
        } else {
          super(new Scalar(MERGE_KEY), new YAMLSeq());
        }
        this.type = Pair.Type.MERGE_PAIR;
      }
      addToJSMap(ctx, map) {
        for (const {
          source
        } of this.value.items) {
          if (!(source instanceof YAMLMap))
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
    var binaryOptions = {
      defaultType: PlainValue.Type.BLOCK_LITERAL,
      lineWidth: 76
    };
    var boolOptions = {
      trueStr: "true",
      falseStr: "false"
    };
    var intOptions = {
      asBigInt: false
    };
    var nullOptions = {
      nullStr: "null"
    };
    var strOptions = {
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
        resolve
      } of tags) {
        if (test) {
          const match = str.match(test);
          if (match) {
            let res = resolve.apply(null, match);
            if (!(res instanceof Scalar))
              res = new Scalar(res);
            if (format)
              res.format = format;
            return res;
          }
        }
      }
      if (scalarFallback)
        str = scalarFallback(str);
      return new Scalar(str);
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
    }, strOptions.fold) : strOptions.fold;
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
      } = strOptions.doubleQuoted;
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
      const literal = type === PlainValue.Type.BLOCK_FOLDED ? false : type === PlainValue.Type.BLOCK_LITERAL ? true : !lineLengthOverLimit(value, strOptions.fold.lineWidth, indent.length);
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
      const body = foldFlowLines(`${wsStart}${value}${wsEnd}`, indent, FOLD_BLOCK, strOptions.fold);
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
      } = strOptions;
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
            return res instanceof Collection ? res : new Scalar(res);
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
        const res = new Alias(src);
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
      const map = new YAMLMap();
      map.items = items;
      resolveComments(map, comments);
      let hasCollectionKey = false;
      for (let i = 0; i < items.length; ++i) {
        const {
          key: iKey
        } = items[i];
        if (iKey instanceof Collection)
          hasCollectionKey = true;
        if (doc.schema.merge && iKey && iKey.value === MERGE_KEY) {
          items[i] = new Merge(items[i]);
          const sources = items[i].value.items;
          let error = null;
          sources.some((node) => {
            if (node instanceof Alias) {
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
              items.push(new Pair(key));
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
              const pair = new Pair(key, resolveNode(doc, valueNode));
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
              items.push(new Pair(key));
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
        items.push(new Pair(key));
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
              items.push(new Pair(key));
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
          items.push(new Pair(key, resolveNode(doc, item)));
          key = void 0;
          explicitKey = false;
        }
      }
      checkFlowCollectionEnd(doc.errors, cst);
      if (key !== void 0)
        items.push(new Pair(key));
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
      const seq = new YAMLSeq();
      seq.items = items;
      resolveComments(seq, comments);
      if (!doc.options.mapAsMap && items.some((it) => it instanceof Pair && it.key instanceof Collection)) {
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
            items.push(new Pair(key));
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
              if (key instanceof Pair) {
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
            items.push(new Pair(key, value));
            key = void 0;
          }
          keyStart = item.range.start;
          next = ",";
        }
      }
      checkFlowCollectionEnd(doc.errors, cst);
      if (key !== void 0)
        items.push(new Pair(key));
      return {
        comments,
        items
      };
    }
    exports.Alias = Alias;
    exports.Collection = Collection;
    exports.Merge = Merge;
    exports.Node = Node;
    exports.Pair = Pair;
    exports.Scalar = Scalar;
    exports.YAMLMap = YAMLMap;
    exports.YAMLSeq = YAMLSeq;
    exports.addComment = addComment;
    exports.binaryOptions = binaryOptions;
    exports.boolOptions = boolOptions;
    exports.findPair = findPair;
    exports.intOptions = intOptions;
    exports.isEmptyPath = isEmptyPath;
    exports.nullOptions = nullOptions;
    exports.resolveMap = resolveMap;
    exports.resolveNode = resolveNode;
    exports.resolveSeq = resolveSeq;
    exports.resolveString = resolveString;
    exports.strOptions = strOptions;
    exports.stringifyNumber = stringifyNumber;
    exports.stringifyString = stringifyString;
    exports.toJSON = toJSON;
  }
});

// node_modules/yaml/dist/warnings-1000a372.js
var require_warnings_1000a372 = __commonJS({
  "node_modules/yaml/dist/warnings-1000a372.js"(exports) {
    "use strict";
    var PlainValue = require_PlainValue_ec8e588e();
    var resolveSeq = require_resolveSeq_d03cb037();
    var binary = {
      identify: (value) => value instanceof Uint8Array,
      default: false,
      tag: "tag:yaml.org,2002:binary",
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
    var YAMLOMap = class extends resolveSeq.YAMLSeq {
      constructor() {
        super();
        PlainValue._defineProperty(this, "add", resolveSeq.YAMLMap.prototype.add.bind(this));
        PlainValue._defineProperty(this, "delete", resolveSeq.YAMLMap.prototype.delete.bind(this));
        PlainValue._defineProperty(this, "get", resolveSeq.YAMLMap.prototype.get.bind(this));
        PlainValue._defineProperty(this, "has", resolveSeq.YAMLMap.prototype.has.bind(this));
        PlainValue._defineProperty(this, "set", resolveSeq.YAMLMap.prototype.set.bind(this));
        this.tag = YAMLOMap.tag;
      }
      toJSON(_, ctx) {
        const map = new Map();
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
    var YAMLSet = class extends resolveSeq.YAMLMap {
      constructor() {
        super();
        this.tag = YAMLSet.tag;
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
      test: RegExp("^(?:([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})(?:(?:t|T|[ \\t]+)([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}(\\.[0-9]+)?)(?:[ \\t]*(Z|[-+][012]?[0-9](?::[0-9]{2})?))?)?)$"),
      resolve: (str, year, month, day, hour, minute, second, millisec, tz) => {
        if (millisec)
          millisec = (millisec + "00").substr(1, 3);
        let date = Date.UTC(year, month - 1, day, hour || 0, minute || 0, second || 0, millisec || 0);
        if (tz && tz !== "Z") {
          let d = parseSexagesimal(tz[0], tz.slice(1));
          if (Math.abs(d) < 30)
            d *= 60;
          date -= 6e4 * d;
        }
        return new Date(date);
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
    exports.binary = binary;
    exports.floatTime = floatTime;
    exports.intTime = intTime;
    exports.omap = omap;
    exports.pairs = pairs;
    exports.set = set;
    exports.timestamp = timestamp;
    exports.warn = warn;
    exports.warnFileDeprecation = warnFileDeprecation;
    exports.warnOptionDeprecation = warnOptionDeprecation;
  }
});

// node_modules/yaml/dist/Schema-88e323a7.js
var require_Schema_88e323a7 = __commonJS({
  "node_modules/yaml/dist/Schema-88e323a7.js"(exports) {
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
    var Schema = class {
      constructor({
        customTags,
        merge,
        schema,
        sortMapEntries,
        tags: deprecatedCustomTags
      }) {
        this.merge = !!merge;
        this.name = schema;
        this.sortMapEntries = sortMapEntries === true ? sortMapEntriesByKey : sortMapEntries || null;
        if (!customTags && deprecatedCustomTags)
          warnings.warnOptionDeprecation("tags", "customTags");
        this.tags = getSchemaTags(schemas, tags, customTags || deprecatedCustomTags, schema);
      }
      createNode(value, wrapScalars, tagName, ctx) {
        const baseCtx = {
          defaultPrefix: Schema.defaultPrefix,
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
    PlainValue._defineProperty(Schema, "defaultPrefix", PlainValue.defaultTagPrefix);
    PlainValue._defineProperty(Schema, "defaultTags", PlainValue.defaultTags);
    exports.Schema = Schema;
  }
});

// node_modules/yaml/dist/types.js
var require_types3 = __commonJS({
  "node_modules/yaml/dist/types.js"(exports) {
    "use strict";
    var resolveSeq = require_resolveSeq_d03cb037();
    var Schema = require_Schema_88e323a7();
    require_PlainValue_ec8e588e();
    require_warnings_1000a372();
    exports.Alias = resolveSeq.Alias;
    exports.Collection = resolveSeq.Collection;
    exports.Merge = resolveSeq.Merge;
    exports.Node = resolveSeq.Node;
    exports.Pair = resolveSeq.Pair;
    exports.Scalar = resolveSeq.Scalar;
    exports.YAMLMap = resolveSeq.YAMLMap;
    exports.YAMLSeq = resolveSeq.YAMLSeq;
    exports.binaryOptions = resolveSeq.binaryOptions;
    exports.boolOptions = resolveSeq.boolOptions;
    exports.intOptions = resolveSeq.intOptions;
    exports.nullOptions = resolveSeq.nullOptions;
    exports.strOptions = resolveSeq.strOptions;
    exports.Schema = Schema.Schema;
  }
});

// node_modules/yaml/types.js
var require_types4 = __commonJS({
  "node_modules/yaml/types.js"(exports) {
    var types = require_types3();
    exports.binaryOptions = types.binaryOptions;
    exports.boolOptions = types.boolOptions;
    exports.intOptions = types.intOptions;
    exports.nullOptions = types.nullOptions;
    exports.strOptions = types.strOptions;
    exports.Schema = types.Schema;
    exports.Alias = types.Alias;
    exports.Collection = types.Collection;
    exports.Merge = types.Merge;
    exports.Node = types.Node;
    exports.Pair = types.Pair;
    exports.Scalar = types.Scalar;
    exports.YAMLMap = types.YAMLMap;
    exports.YAMLSeq = types.YAMLSeq;
  }
});

// src/lib/renderers/yaml.js
var require_yaml = __commonJS({
  "src/lib/renderers/yaml.js"(exports, module) {
    var yaml = require_yaml();
    var { YAMLMap, YAMLSeq } = require_types4();
    var optionAPI = require_option();
    function getIn(obj, path) {
      return path.reduce((v, k) => k in v ? v[k] : {}, obj);
    }
    function addComments(context, path, commentNode, iterNode = commentNode) {
      const { title, description, comment } = getIn(context, path);
      const lines = [];
      if (optionAPI("renderTitle") && title) {
        lines.push(` ${title}`, "");
      }
      if (optionAPI("renderDescription") && description) {
        lines.push(` ${description}`);
      }
      if (optionAPI("renderComment") && comment) {
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
      const nodes = yaml.createNode(value);
      addComments(context, [], nodes);
      const doc = new yaml.Document();
      doc.contents = nodes;
      return doc.toString();
    }
    var yaml_default = renderYAML;
    module.exports = yaml_default;
  }
});

// src/lib/renderers/index.js
var require_renderers = __commonJS({
  "src/lib/renderers/index.js"(exports, module) {
    var renderJS = require_js();
    var renderYAML = require_yaml();
    Object.assign(module.exports, { renderJS, renderYAML });
  }
});

// src/lib/index.js
var require_lib3 = __commonJS({
  "src/lib/index.js"(exports, module) {
    var { getDependencies } = require_vendor();
    var Container = require_Container();
    var format = require_format();
    var option = require_option();
    var env = require_constants();
    var random = require_random();
    var utils = require_utils();
    var run = require_run();
    var { renderJS, renderYAML } = require_renderers();
    var container = new Container();
    function setupKeywords() {
      container.define("autoIncrement", function autoIncrement(value, schema) {
        if (!this.offset) {
          const min = schema.minimum || 1;
          const max = min + env.MAX_NUMBER;
          const offset = value.initialOffset || schema.initialOffset;
          this.offset = offset || random.number(min, max);
        }
        if (value === true) {
          return this.offset++;
        }
        return schema;
      });
      container.define("sequentialDate", function sequentialDate(value, schema) {
        if (!this.now) {
          this.now = random.date();
        }
        if (value) {
          schema = this.now.toISOString();
          value = value === true ? "days" : value;
          if (["seconds", "minutes", "hours", "days", "weeks", "months", "years"].indexOf(value) === -1) {
            throw new Error(`Unsupported increment by ${utils.short(value)}`);
          }
          this.now.setTime(this.now.getTime() + random.date(value));
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
    var jsf = (schema, refs, cwd) => {
      console.log("[json-schema-faker] calling JsonSchemaFaker() is deprecated, call either .generate() or .resolve()");
      if (cwd) {
        console.log("[json-schema-faker] references are only supported by calling .resolve()");
      }
      return jsf.generate(schema, refs);
    };
    jsf.generateWithContext = (schema, refs) => {
      const $refs = getRefs(refs, schema);
      return run($refs, schema, container, true);
    };
    jsf.generate = (schema, refs) => renderJS(jsf.generateWithContext(schema, refs));
    jsf.generateYAML = (schema, refs) => renderYAML(jsf.generateWithContext(schema, refs));
    jsf.resolveWithContext = (schema, refs, cwd) => {
      if (typeof refs === "string") {
        cwd = refs;
        refs = {};
      }
      cwd = cwd || (typeof process !== "undefined" ? process.cwd() : "");
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
      }).then((sub) => run($refs, sub, container)).catch((e) => {
        throw new Error(`Error while resolving schema (${e.message})`);
      });
    };
    jsf.resolve = (schema, refs, cwd) => jsf.resolveWithContext(schema, refs, cwd).then(renderJS);
    jsf.resolveYAML = (schema, refs, cwd) => jsf.resolveWithContext(schema, refs, cwd).then(renderYAML);
    setupKeywords();
    jsf.format = format;
    jsf.option = option;
    jsf.random = random;
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
    var VERSION = "0.5.0-rcv.35";
    if (typeof VERSION !== "undefined") {
      jsf.VERSION = VERSION;
    }
    var lib_default = jsf;
    module.exports = lib_default;
  }
});

// src/main.esm.js
var import_vendor = __toModule(require_vendor());
var import_lib = __toModule(require_lib3());
if (typeof $RefParser !== "undefined" && typeof JSONPath !== "undefined") {
  (0, import_vendor.setDependencies)({ ...JSONPath, $RefParser });
}
var export_default = import_lib.default;
export {
  export_default as default
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9hbHZhcm8vV29ya3NwYWNlL2pzb24tc2NoZW1hLWZha2VyL3NyYy9saWIvVXNlcnMvYWx2YXJvL1dvcmtzcGFjZS9qc29uLXNjaGVtYS1mYWtlci9zcmMvbGliL3ZlbmRvci5qcyIsIi9Vc2Vycy9hbHZhcm8vV29ya3NwYWNlL2pzb24tc2NoZW1hLWZha2VyL3NyYy9saWIvY2xhc3MvVXNlcnMvYWx2YXJvL1dvcmtzcGFjZS9qc29uLXNjaGVtYS1mYWtlci9zcmMvbGliL2NsYXNzL1JlZ2lzdHJ5LmpzIiwiL1VzZXJzL2FsdmFyby9Xb3Jrc3BhY2UvanNvbi1zY2hlbWEtZmFrZXIvc3JjL2xpYi9hcGkvVXNlcnMvYWx2YXJvL1dvcmtzcGFjZS9qc29uLXNjaGVtYS1mYWtlci9zcmMvbGliL2FwaS9kZWZhdWx0cy5qcyIsIi9Vc2Vycy9hbHZhcm8vV29ya3NwYWNlL2pzb24tc2NoZW1hLWZha2VyL3NyYy9saWIvY2xhc3MvVXNlcnMvYWx2YXJvL1dvcmtzcGFjZS9qc29uLXNjaGVtYS1mYWtlci9zcmMvbGliL2NsYXNzL09wdGlvblJlZ2lzdHJ5LmpzIiwiL1VzZXJzL2FsdmFyby9Xb3Jrc3BhY2UvanNvbi1zY2hlbWEtZmFrZXIvc3JjL2xpYi9hcGkvVXNlcnMvYWx2YXJvL1dvcmtzcGFjZS9qc29uLXNjaGVtYS1mYWtlci9zcmMvbGliL2FwaS9vcHRpb24uanMiLCIvVXNlcnMvYWx2YXJvL1dvcmtzcGFjZS9qc29uLXNjaGVtYS1mYWtlci9zcmMvbGliL2NvcmUvVXNlcnMvYWx2YXJvL1dvcmtzcGFjZS9qc29uLXNjaGVtYS1mYWtlci9zcmMvbGliL2NvcmUvY29uc3RhbnRzLmpzIiwiL1VzZXJzL2FsdmFyby9Xb3Jrc3BhY2UvanNvbi1zY2hlbWEtZmFrZXIvbm9kZV9tb2R1bGVzL3JldC9saWIvdHlwZXMuanMiLCIvVXNlcnMvYWx2YXJvL1dvcmtzcGFjZS9qc29uLXNjaGVtYS1mYWtlci9ub2RlX21vZHVsZXMvcmV0L2xpYi9zZXRzLmpzIiwiL1VzZXJzL2FsdmFyby9Xb3Jrc3BhY2UvanNvbi1zY2hlbWEtZmFrZXIvbm9kZV9tb2R1bGVzL3JldC9saWIvdXRpbC5qcyIsIi9Vc2Vycy9hbHZhcm8vV29ya3NwYWNlL2pzb24tc2NoZW1hLWZha2VyL25vZGVfbW9kdWxlcy9yZXQvbGliL3Bvc2l0aW9ucy5qcyIsIi9Vc2Vycy9hbHZhcm8vV29ya3NwYWNlL2pzb24tc2NoZW1hLWZha2VyL25vZGVfbW9kdWxlcy9yZXQvbGliL2luZGV4LmpzIiwiL1VzZXJzL2FsdmFyby9Xb3Jrc3BhY2UvanNvbi1zY2hlbWEtZmFrZXIvbm9kZV9tb2R1bGVzL2RyYW5nZS9saWIvaW5kZXguanMiLCIvVXNlcnMvYWx2YXJvL1dvcmtzcGFjZS9qc29uLXNjaGVtYS1mYWtlci9ub2RlX21vZHVsZXMvcmFuZGV4cC9saWIvcmFuZGV4cC5qcyIsIi9Vc2Vycy9hbHZhcm8vV29ya3NwYWNlL2pzb24tc2NoZW1hLWZha2VyL3NyYy9saWIvY29yZS9Vc2Vycy9hbHZhcm8vV29ya3NwYWNlL2pzb24tc2NoZW1hLWZha2VyL3NyYy9saWIvY29yZS9yYW5kb20uanMiLCIvVXNlcnMvYWx2YXJvL1dvcmtzcGFjZS9qc29uLXNjaGVtYS1mYWtlci9zcmMvbGliL2NvcmUvVXNlcnMvYWx2YXJvL1dvcmtzcGFjZS9qc29uLXNjaGVtYS1mYWtlci9zcmMvbGliL2NvcmUvdXRpbHMuanMiLCIvVXNlcnMvYWx2YXJvL1dvcmtzcGFjZS9qc29uLXNjaGVtYS1mYWtlci9zcmMvbGliL2NsYXNzL1VzZXJzL2FsdmFyby9Xb3Jrc3BhY2UvanNvbi1zY2hlbWEtZmFrZXIvc3JjL2xpYi9jbGFzcy9Db250YWluZXIuanMiLCIvVXNlcnMvYWx2YXJvL1dvcmtzcGFjZS9qc29uLXNjaGVtYS1mYWtlci9zcmMvbGliL2FwaS9Vc2Vycy9hbHZhcm8vV29ya3NwYWNlL2pzb24tc2NoZW1hLWZha2VyL3NyYy9saWIvYXBpL2Zvcm1hdC5qcyIsIi9Vc2Vycy9hbHZhcm8vV29ya3NwYWNlL2pzb24tc2NoZW1hLWZha2VyL3NyYy9saWIvY29yZS9Vc2Vycy9hbHZhcm8vV29ya3NwYWNlL2pzb24tc2NoZW1hLWZha2VyL3NyYy9saWIvY29yZS9lcnJvci5qcyIsIi9Vc2Vycy9hbHZhcm8vV29ya3NwYWNlL2pzb24tc2NoZW1hLWZha2VyL3NyYy9saWIvY29yZS9Vc2Vycy9hbHZhcm8vV29ya3NwYWNlL2pzb24tc2NoZW1hLWZha2VyL3NyYy9saWIvY29yZS9pbmZlci5qcyIsIi9Vc2Vycy9hbHZhcm8vV29ya3NwYWNlL2pzb24tc2NoZW1hLWZha2VyL3NyYy9saWIvZ2VuZXJhdG9ycy9Vc2Vycy9hbHZhcm8vV29ya3NwYWNlL2pzb24tc2NoZW1hLWZha2VyL3NyYy9saWIvZ2VuZXJhdG9ycy9ib29sZWFuLmpzIiwiL1VzZXJzL2FsdmFyby9Xb3Jrc3BhY2UvanNvbi1zY2hlbWEtZmFrZXIvc3JjL2xpYi90eXBlcy9Vc2Vycy9hbHZhcm8vV29ya3NwYWNlL2pzb24tc2NoZW1hLWZha2VyL3NyYy9saWIvdHlwZXMvYm9vbGVhbi5qcyIsIi9Vc2Vycy9hbHZhcm8vV29ya3NwYWNlL2pzb24tc2NoZW1hLWZha2VyL3NyYy9saWIvZ2VuZXJhdG9ycy9Vc2Vycy9hbHZhcm8vV29ya3NwYWNlL2pzb24tc2NoZW1hLWZha2VyL3NyYy9saWIvZ2VuZXJhdG9ycy9udWxsLmpzIiwiL1VzZXJzL2FsdmFyby9Xb3Jrc3BhY2UvanNvbi1zY2hlbWEtZmFrZXIvc3JjL2xpYi90eXBlcy9Vc2Vycy9hbHZhcm8vV29ya3NwYWNlL2pzb24tc2NoZW1hLWZha2VyL3NyYy9saWIvdHlwZXMvbnVsbC5qcyIsIi9Vc2Vycy9hbHZhcm8vV29ya3NwYWNlL2pzb24tc2NoZW1hLWZha2VyL3NyYy9saWIvdHlwZXMvVXNlcnMvYWx2YXJvL1dvcmtzcGFjZS9qc29uLXNjaGVtYS1mYWtlci9zcmMvbGliL3R5cGVzL2FycmF5LmpzIiwiL1VzZXJzL2FsdmFyby9Xb3Jrc3BhY2UvanNvbi1zY2hlbWEtZmFrZXIvc3JjL2xpYi90eXBlcy9Vc2Vycy9hbHZhcm8vV29ya3NwYWNlL2pzb24tc2NoZW1hLWZha2VyL3NyYy9saWIvdHlwZXMvbnVtYmVyLmpzIiwiL1VzZXJzL2FsdmFyby9Xb3Jrc3BhY2UvanNvbi1zY2hlbWEtZmFrZXIvc3JjL2xpYi90eXBlcy9Vc2Vycy9hbHZhcm8vV29ya3NwYWNlL2pzb24tc2NoZW1hLWZha2VyL3NyYy9saWIvdHlwZXMvaW50ZWdlci5qcyIsIi9Vc2Vycy9hbHZhcm8vV29ya3NwYWNlL2pzb24tc2NoZW1hLWZha2VyL3NyYy9saWIvZ2VuZXJhdG9ycy9Vc2Vycy9hbHZhcm8vV29ya3NwYWNlL2pzb24tc2NoZW1hLWZha2VyL3NyYy9saWIvZ2VuZXJhdG9ycy93b3Jkcy5qcyIsIi9Vc2Vycy9hbHZhcm8vV29ya3NwYWNlL2pzb24tc2NoZW1hLWZha2VyL3NyYy9saWIvdHlwZXMvVXNlcnMvYWx2YXJvL1dvcmtzcGFjZS9qc29uLXNjaGVtYS1mYWtlci9zcmMvbGliL3R5cGVzL29iamVjdC5qcyIsIi9Vc2Vycy9hbHZhcm8vV29ya3NwYWNlL2pzb24tc2NoZW1hLWZha2VyL3NyYy9saWIvZ2VuZXJhdG9ycy9Vc2Vycy9hbHZhcm8vV29ya3NwYWNlL2pzb24tc2NoZW1hLWZha2VyL3NyYy9saWIvZ2VuZXJhdG9ycy90aHVuay5qcyIsIi9Vc2Vycy9hbHZhcm8vV29ya3NwYWNlL2pzb24tc2NoZW1hLWZha2VyL3NyYy9saWIvZ2VuZXJhdG9ycy9Vc2Vycy9hbHZhcm8vV29ya3NwYWNlL2pzb24tc2NoZW1hLWZha2VyL3NyYy9saWIvZ2VuZXJhdG9ycy9pcHY0LmpzIiwiL1VzZXJzL2FsdmFyby9Xb3Jrc3BhY2UvanNvbi1zY2hlbWEtZmFrZXIvc3JjL2xpYi9nZW5lcmF0b3JzL1VzZXJzL2FsdmFyby9Xb3Jrc3BhY2UvanNvbi1zY2hlbWEtZmFrZXIvc3JjL2xpYi9nZW5lcmF0b3JzL2RhdGVUaW1lLmpzIiwiL1VzZXJzL2FsdmFyby9Xb3Jrc3BhY2UvanNvbi1zY2hlbWEtZmFrZXIvc3JjL2xpYi9nZW5lcmF0b3JzL1VzZXJzL2FsdmFyby9Xb3Jrc3BhY2UvanNvbi1zY2hlbWEtZmFrZXIvc3JjL2xpYi9nZW5lcmF0b3JzL2RhdGUuanMiLCIvVXNlcnMvYWx2YXJvL1dvcmtzcGFjZS9qc29uLXNjaGVtYS1mYWtlci9zcmMvbGliL2dlbmVyYXRvcnMvVXNlcnMvYWx2YXJvL1dvcmtzcGFjZS9qc29uLXNjaGVtYS1mYWtlci9zcmMvbGliL2dlbmVyYXRvcnMvdGltZS5qcyIsIi9Vc2Vycy9hbHZhcm8vV29ya3NwYWNlL2pzb24tc2NoZW1hLWZha2VyL3NyYy9saWIvZ2VuZXJhdG9ycy9Vc2Vycy9hbHZhcm8vV29ya3NwYWNlL2pzb24tc2NoZW1hLWZha2VyL3NyYy9saWIvZ2VuZXJhdG9ycy9jb3JlRm9ybWF0LmpzIiwiL1VzZXJzL2FsdmFyby9Xb3Jrc3BhY2UvanNvbi1zY2hlbWEtZmFrZXIvc3JjL2xpYi90eXBlcy9Vc2Vycy9hbHZhcm8vV29ya3NwYWNlL2pzb24tc2NoZW1hLWZha2VyL3NyYy9saWIvdHlwZXMvc3RyaW5nLmpzIiwiL1VzZXJzL2FsdmFyby9Xb3Jrc3BhY2UvanNvbi1zY2hlbWEtZmFrZXIvc3JjL2xpYi90eXBlcy9Vc2Vycy9hbHZhcm8vV29ya3NwYWNlL2pzb24tc2NoZW1hLWZha2VyL3NyYy9saWIvdHlwZXMvaW5kZXguanMiLCIvVXNlcnMvYWx2YXJvL1dvcmtzcGFjZS9qc29uLXNjaGVtYS1mYWtlci9zcmMvbGliL2NvcmUvVXNlcnMvYWx2YXJvL1dvcmtzcGFjZS9qc29uLXNjaGVtYS1mYWtlci9zcmMvbGliL2NvcmUvdHJhdmVyc2UuanMiLCIvVXNlcnMvYWx2YXJvL1dvcmtzcGFjZS9qc29uLXNjaGVtYS1mYWtlci9zcmMvbGliL2NvcmUvVXNlcnMvYWx2YXJvL1dvcmtzcGFjZS9qc29uLXNjaGVtYS1mYWtlci9zcmMvbGliL2NvcmUvYnVpbGRSZXNvbHZlU2NoZW1hLmpzIiwiL1VzZXJzL2FsdmFyby9Xb3Jrc3BhY2UvanNvbi1zY2hlbWEtZmFrZXIvc3JjL2xpYi9jb3JlL1VzZXJzL2FsdmFyby9Xb3Jrc3BhY2UvanNvbi1zY2hlbWEtZmFrZXIvc3JjL2xpYi9jb3JlL3J1bi5qcyIsIi9Vc2Vycy9hbHZhcm8vV29ya3NwYWNlL2pzb24tc2NoZW1hLWZha2VyL3NyYy9saWIvcmVuZGVyZXJzL1VzZXJzL2FsdmFyby9Xb3Jrc3BhY2UvanNvbi1zY2hlbWEtZmFrZXIvc3JjL2xpYi9yZW5kZXJlcnMvanMuanMiLCIvVXNlcnMvYWx2YXJvL1dvcmtzcGFjZS9qc29uLXNjaGVtYS1mYWtlci9ub2RlX21vZHVsZXMveWFtbC9kaXN0L1BsYWluVmFsdWUtZWM4ZTU4OGUuanMiLCIvVXNlcnMvYWx2YXJvL1dvcmtzcGFjZS9qc29uLXNjaGVtYS1mYWtlci9ub2RlX21vZHVsZXMveWFtbC9kaXN0L3Jlc29sdmVTZXEtZDAzY2IwMzcuanMiLCIvVXNlcnMvYWx2YXJvL1dvcmtzcGFjZS9qc29uLXNjaGVtYS1mYWtlci9ub2RlX21vZHVsZXMveWFtbC9kaXN0L3dhcm5pbmdzLTEwMDBhMzcyLmpzIiwiL1VzZXJzL2FsdmFyby9Xb3Jrc3BhY2UvanNvbi1zY2hlbWEtZmFrZXIvbm9kZV9tb2R1bGVzL3lhbWwvZGlzdC9TY2hlbWEtODhlMzIzYTcuanMiLCIvVXNlcnMvYWx2YXJvL1dvcmtzcGFjZS9qc29uLXNjaGVtYS1mYWtlci9ub2RlX21vZHVsZXMveWFtbC9kaXN0L3R5cGVzLmpzIiwiL1VzZXJzL2FsdmFyby9Xb3Jrc3BhY2UvanNvbi1zY2hlbWEtZmFrZXIvbm9kZV9tb2R1bGVzL3lhbWwvdHlwZXMuanMiLCIvVXNlcnMvYWx2YXJvL1dvcmtzcGFjZS9qc29uLXNjaGVtYS1mYWtlci9zcmMvbGliL3JlbmRlcmVycy9Vc2Vycy9hbHZhcm8vV29ya3NwYWNlL2pzb24tc2NoZW1hLWZha2VyL3NyYy9saWIvcmVuZGVyZXJzL3lhbWwuanMiLCIvVXNlcnMvYWx2YXJvL1dvcmtzcGFjZS9qc29uLXNjaGVtYS1mYWtlci9zcmMvbGliL3JlbmRlcmVycy9Vc2Vycy9hbHZhcm8vV29ya3NwYWNlL2pzb24tc2NoZW1hLWZha2VyL3NyYy9saWIvcmVuZGVyZXJzL2luZGV4LmpzIiwiL1VzZXJzL2FsdmFyby9Xb3Jrc3BhY2UvanNvbi1zY2hlbWEtZmFrZXIvc3JjL2xpYi9Vc2Vycy9hbHZhcm8vV29ya3NwYWNlL2pzb24tc2NoZW1hLWZha2VyL3NyYy9saWIvaW5kZXguanMiLCIvVXNlcnMvYWx2YXJvL1dvcmtzcGFjZS9qc29uLXNjaGVtYS1mYWtlci9zcmMvbWFpbi5lc20uanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgREVQRU5ERU5DSUVTID0ge307XG5cbmV4cG9ydCBjb25zdCBnZXREZXBlbmRlbmNpZXMgPSAoKSA9PiB7XG4gIHJldHVybiBERVBFTkRFTkNJRVM7XG59O1xuXG5leHBvcnQgY29uc3Qgc2V0RGVwZW5kZW5jaWVzID0gdmFsdWUgPT4ge1xuICBPYmplY3QuYXNzaWduKERFUEVOREVOQ0lFUywgdmFsdWUpO1xufTtcbiIsIi8qKlxuICogVGhpcyBjbGFzcyBkZWZpbmVzIGEgcmVnaXN0cnkgZm9yIGN1c3RvbSBmb3JtYXRzIHVzZWQgd2l0aGluIEpTRi5cbiAqL1xuY2xhc3MgUmVnaXN0cnkge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICAvLyBlbXB0eSBieSBkZWZhdWx0XG4gICAgdGhpcy5kYXRhID0ge307XG4gIH1cblxuICAvKipcbiAgICogVW5yZWdpc3RlcnMgY3VzdG9tIGZvcm1hdChzKVxuICAgKiBAcGFyYW0gbmFtZVxuICAgKi9cbiAgdW5yZWdpc3RlcihuYW1lKSB7XG4gICAgaWYgKCFuYW1lKSB7XG4gICAgICB0aGlzLmRhdGEgPSB7fTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGVsZXRlIHRoaXMuZGF0YVtuYW1lXTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVnaXN0ZXJzIGN1c3RvbSBmb3JtYXRcbiAgICovXG4gIHJlZ2lzdGVyKG5hbWUsIGNhbGxiYWNrKSB7XG4gICAgdGhpcy5kYXRhW25hbWVdID0gY2FsbGJhY2s7XG4gIH1cblxuICAvKipcbiAgICogUmVnaXN0ZXIgbWFueSBmb3JtYXRzIGF0IG9uZSBzaG90XG4gICAqL1xuICByZWdpc3Rlck1hbnkoZm9ybWF0cykge1xuICAgIE9iamVjdC5rZXlzKGZvcm1hdHMpLmZvckVhY2gobmFtZSA9PiB7XG4gICAgICB0aGlzLmRhdGFbbmFtZV0gPSBmb3JtYXRzW25hbWVdO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgZWxlbWVudCBieSByZWdpc3RyeSBrZXlcbiAgICovXG4gIGdldChuYW1lKSB7XG4gICAgY29uc3QgZm9ybWF0ID0gdGhpcy5kYXRhW25hbWVdO1xuXG4gICAgcmV0dXJuIGZvcm1hdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSB3aG9sZSByZWdpc3RyeSBjb250ZW50XG4gICAqL1xuICBsaXN0KCkge1xuICAgIHJldHVybiB0aGlzLmRhdGE7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUmVnaXN0cnk7XG4iLCJjb25zdCBkZWZhdWx0cyA9IHt9O1xuXG5leHBvcnQgZGVmYXVsdCBkZWZhdWx0cztcblxuZGVmYXVsdHMuZGVmYXVsdEludmFsaWRUeXBlUHJvZHVjdCA9IHVuZGVmaW5lZDtcbmRlZmF1bHRzLmRlZmF1bHRSYW5kRXhwTWF4ID0gMTA7XG5cbmRlZmF1bHRzLmlnbm9yZVByb3BlcnRpZXMgPSBbXTtcbmRlZmF1bHRzLmlnbm9yZU1pc3NpbmdSZWZzID0gZmFsc2U7XG5kZWZhdWx0cy5mYWlsT25JbnZhbGlkVHlwZXMgPSB0cnVlO1xuZGVmYXVsdHMuZmFpbE9uSW52YWxpZEZvcm1hdCA9IHRydWU7XG5cbmRlZmF1bHRzLmFsd2F5c0Zha2VPcHRpb25hbHMgPSBmYWxzZTtcbmRlZmF1bHRzLm9wdGlvbmFsc1Byb2JhYmlsaXR5ID0gbnVsbDtcbmRlZmF1bHRzLmZpeGVkUHJvYmFiaWxpdGllcyA9IGZhbHNlO1xuZGVmYXVsdHMudXNlRXhhbXBsZXNWYWx1ZSA9IGZhbHNlO1xuZGVmYXVsdHMudXNlRGVmYXVsdFZhbHVlID0gZmFsc2U7XG5kZWZhdWx0cy5yZXF1aXJlZE9ubHkgPSBmYWxzZTtcblxuZGVmYXVsdHMubWluSXRlbXMgPSAwO1xuZGVmYXVsdHMubWF4SXRlbXMgPSBudWxsO1xuZGVmYXVsdHMubWluTGVuZ3RoID0gMDtcbmRlZmF1bHRzLm1heExlbmd0aCA9IG51bGw7XG5cbmRlZmF1bHRzLnJlc29sdmVKc29uUGF0aCA9IGZhbHNlO1xuZGVmYXVsdHMucmV1c2VQcm9wZXJ0aWVzID0gZmFsc2U7XG5kZWZhdWx0cy5maWxsUHJvcGVydGllcyA9IHRydWU7XG5kZWZhdWx0cy5yZXBsYWNlRW1wdHlCeVJhbmRvbVZhbHVlID0gZmFsc2U7XG5cbmRlZmF1bHRzLnJhbmRvbSA9IE1hdGgucmFuZG9tO1xuXG5kZWZhdWx0cy5yZW5kZXJUaXRsZSA9IHRydWU7XG5kZWZhdWx0cy5yZW5kZXJEZXNjcmlwdGlvbiA9IHRydWU7XG5kZWZhdWx0cy5yZW5kZXJDb21tZW50ID0gZmFsc2U7XG4iLCJpbXBvcnQgUmVnaXN0cnkgZnJvbSAnLi9SZWdpc3RyeSc7XG5pbXBvcnQgZGVmYXVsdHMgZnJvbSAnLi4vYXBpL2RlZmF1bHRzJztcblxuLyoqXG4gKiBUaGlzIGNsYXNzIGRlZmluZXMgYSByZWdpc3RyeSBmb3IgY3VzdG9tIHNldHRpbmdzIHVzZWQgd2l0aGluIEpTRi5cbiAqL1xuY2xhc3MgT3B0aW9uUmVnaXN0cnkgZXh0ZW5kcyBSZWdpc3RyeSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5kYXRhID0geyAuLi5kZWZhdWx0cyB9O1xuICAgIHRoaXMuX2RlZmF1bHRzID0gZGVmYXVsdHM7XG4gIH1cblxuICBnZXQgZGVmYXVsdHMoKSB7XG4gICAgcmV0dXJuIHsgLi4udGhpcy5fZGVmYXVsdHMgfTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBPcHRpb25SZWdpc3RyeTtcbiIsImltcG9ydCBPcHRpb25SZWdpc3RyeSBmcm9tICcuLi9jbGFzcy9PcHRpb25SZWdpc3RyeSc7XG5cbi8vIGluc3RhbnRpYXRlXG5jb25zdCByZWdpc3RyeSA9IG5ldyBPcHRpb25SZWdpc3RyeSgpO1xuXG4vKipcbiAqIEN1c3RvbSBvcHRpb24gQVBJXG4gKlxuICogQHBhcmFtIG5hbWVPck9wdGlvbk1hcFxuICogQHJldHVybnMge2FueX1cbiAqL1xuZnVuY3Rpb24gb3B0aW9uQVBJKG5hbWVPck9wdGlvbk1hcCwgb3B0aW9uYWxWYWx1ZSkge1xuICBpZiAodHlwZW9mIG5hbWVPck9wdGlvbk1hcCA9PT0gJ3N0cmluZycpIHtcbiAgICBpZiAodHlwZW9mIG9wdGlvbmFsVmFsdWUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICByZXR1cm4gcmVnaXN0cnkucmVnaXN0ZXIobmFtZU9yT3B0aW9uTWFwLCBvcHRpb25hbFZhbHVlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVnaXN0cnkuZ2V0KG5hbWVPck9wdGlvbk1hcCk7XG4gIH1cblxuICByZXR1cm4gcmVnaXN0cnkucmVnaXN0ZXJNYW55KG5hbWVPck9wdGlvbk1hcCk7XG59XG5cbm9wdGlvbkFQSS5nZXREZWZhdWx0cyA9ICgpID0+IHJlZ2lzdHJ5LmRlZmF1bHRzO1xuXG5leHBvcnQgZGVmYXVsdCBvcHRpb25BUEk7XG4iLCJjb25zdCBBTExPV0VEX1RZUEVTID0gWydpbnRlZ2VyJywgJ251bWJlcicsICdzdHJpbmcnLCAnYm9vbGVhbiddO1xuY29uc3QgU0NBTEFSX1RZUEVTID0gQUxMT1dFRF9UWVBFUy5jb25jYXQoWydudWxsJ10pO1xuY29uc3QgQUxMX1RZUEVTID0gWydhcnJheScsICdvYmplY3QnXS5jb25jYXQoU0NBTEFSX1RZUEVTKTtcblxuY29uc3QgTU9TVF9ORUFSX0RBVEVUSU1FID0gMjUyNDYwODAwMDAwMDtcblxuY29uc3QgTUlOX0lOVEVHRVIgPSAtMTAwMDAwMDAwO1xuY29uc3QgTUFYX0lOVEVHRVIgPSAxMDAwMDAwMDA7XG5cbmNvbnN0IE1JTl9OVU1CRVIgPSAtMTAwO1xuY29uc3QgTUFYX05VTUJFUiA9IDEwMDtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBBTExPV0VEX1RZUEVTLFxuICBTQ0FMQVJfVFlQRVMsXG4gIEFMTF9UWVBFUyxcbiAgTUlOX05VTUJFUixcbiAgTUFYX05VTUJFUixcbiAgTUlOX0lOVEVHRVIsXG4gIE1BWF9JTlRFR0VSLFxuICBNT1NUX05FQVJfREFURVRJTUUsXG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIFJPT1QgICAgICAgOiAwLFxuICBHUk9VUCAgICAgIDogMSxcbiAgUE9TSVRJT04gICA6IDIsXG4gIFNFVCAgICAgICAgOiAzLFxuICBSQU5HRSAgICAgIDogNCxcbiAgUkVQRVRJVElPTiA6IDUsXG4gIFJFRkVSRU5DRSAgOiA2LFxuICBDSEFSICAgICAgIDogNyxcbn07XG4iLCJjb25zdCB0eXBlcyA9IHJlcXVpcmUoJy4vdHlwZXMnKTtcblxuY29uc3QgSU5UUyA9ICgpID0+IFt7IHR5cGU6IHR5cGVzLlJBTkdFICwgZnJvbTogNDgsIHRvOiA1NyB9XTtcblxuY29uc3QgV09SRFMgPSAoKSA9PiB7XG4gIHJldHVybiBbXG4gICAgeyB0eXBlOiB0eXBlcy5DSEFSLCB2YWx1ZTogOTUgfSxcbiAgICB7IHR5cGU6IHR5cGVzLlJBTkdFLCBmcm9tOiA5NywgdG86IDEyMiB9LFxuICAgIHsgdHlwZTogdHlwZXMuUkFOR0UsIGZyb206IDY1LCB0bzogOTAgfVxuICBdLmNvbmNhdChJTlRTKCkpO1xufTtcblxuY29uc3QgV0hJVEVTUEFDRSA9ICgpID0+IHtcbiAgcmV0dXJuIFtcbiAgICB7IHR5cGU6IHR5cGVzLkNIQVIsIHZhbHVlOiA5IH0sXG4gICAgeyB0eXBlOiB0eXBlcy5DSEFSLCB2YWx1ZTogMTAgfSxcbiAgICB7IHR5cGU6IHR5cGVzLkNIQVIsIHZhbHVlOiAxMSB9LFxuICAgIHsgdHlwZTogdHlwZXMuQ0hBUiwgdmFsdWU6IDEyIH0sXG4gICAgeyB0eXBlOiB0eXBlcy5DSEFSLCB2YWx1ZTogMTMgfSxcbiAgICB7IHR5cGU6IHR5cGVzLkNIQVIsIHZhbHVlOiAzMiB9LFxuICAgIHsgdHlwZTogdHlwZXMuQ0hBUiwgdmFsdWU6IDE2MCB9LFxuICAgIHsgdHlwZTogdHlwZXMuQ0hBUiwgdmFsdWU6IDU3NjAgfSxcbiAgICB7IHR5cGU6IHR5cGVzLlJBTkdFLCBmcm9tOiA4MTkyLCB0bzogODIwMiB9LFxuICAgIHsgdHlwZTogdHlwZXMuQ0hBUiwgdmFsdWU6IDgyMzIgfSxcbiAgICB7IHR5cGU6IHR5cGVzLkNIQVIsIHZhbHVlOiA4MjMzIH0sXG4gICAgeyB0eXBlOiB0eXBlcy5DSEFSLCB2YWx1ZTogODIzOSB9LFxuICAgIHsgdHlwZTogdHlwZXMuQ0hBUiwgdmFsdWU6IDgyODcgfSxcbiAgICB7IHR5cGU6IHR5cGVzLkNIQVIsIHZhbHVlOiAxMjI4OCB9LFxuICAgIHsgdHlwZTogdHlwZXMuQ0hBUiwgdmFsdWU6IDY1Mjc5IH1cbiAgXTtcbn07XG5cbmNvbnN0IE5PVEFOWUNIQVIgPSAoKSA9PiB7XG4gIHJldHVybiBbXG4gICAgeyB0eXBlOiB0eXBlcy5DSEFSLCB2YWx1ZTogMTAgfSxcbiAgICB7IHR5cGU6IHR5cGVzLkNIQVIsIHZhbHVlOiAxMyB9LFxuICAgIHsgdHlwZTogdHlwZXMuQ0hBUiwgdmFsdWU6IDgyMzIgfSxcbiAgICB7IHR5cGU6IHR5cGVzLkNIQVIsIHZhbHVlOiA4MjMzIH0sXG4gIF07XG59O1xuXG4vLyBQcmVkZWZpbmVkIGNsYXNzIG9iamVjdHMuXG5leHBvcnRzLndvcmRzID0gKCkgPT4gKHsgdHlwZTogdHlwZXMuU0VULCBzZXQ6IFdPUkRTKCksIG5vdDogZmFsc2UgfSk7XG5leHBvcnRzLm5vdFdvcmRzID0gKCkgPT4gKHsgdHlwZTogdHlwZXMuU0VULCBzZXQ6IFdPUkRTKCksIG5vdDogdHJ1ZSB9KTtcbmV4cG9ydHMuaW50cyA9ICgpID0+ICh7IHR5cGU6IHR5cGVzLlNFVCwgc2V0OiBJTlRTKCksIG5vdDogZmFsc2UgfSk7XG5leHBvcnRzLm5vdEludHMgPSAoKSA9PiAoeyB0eXBlOiB0eXBlcy5TRVQsIHNldDogSU5UUygpLCBub3Q6IHRydWUgfSk7XG5leHBvcnRzLndoaXRlc3BhY2UgPSAoKSA9PiAoeyB0eXBlOiB0eXBlcy5TRVQsIHNldDogV0hJVEVTUEFDRSgpLCBub3Q6IGZhbHNlIH0pO1xuZXhwb3J0cy5ub3RXaGl0ZXNwYWNlID0gKCkgPT4gKHsgdHlwZTogdHlwZXMuU0VULCBzZXQ6IFdISVRFU1BBQ0UoKSwgbm90OiB0cnVlIH0pO1xuZXhwb3J0cy5hbnlDaGFyID0gKCkgPT4gKHsgdHlwZTogdHlwZXMuU0VULCBzZXQ6IE5PVEFOWUNIQVIoKSwgbm90OiB0cnVlIH0pO1xuIiwiY29uc3QgdHlwZXMgPSByZXF1aXJlKCcuL3R5cGVzJyk7XG5jb25zdCBzZXRzICA9IHJlcXVpcmUoJy4vc2V0cycpO1xuXG5cbmNvbnN0IENUUkwgPSAnQEFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaW1xcXFxdXiA/JztcbmNvbnN0IFNMU0ggPSB7ICcwJzogMCwgJ3QnOiA5LCAnbic6IDEwLCAndic6IDExLCAnZic6IDEyLCAncic6IDEzIH07XG5cbi8qKlxuICogRmluZHMgY2hhcmFjdGVyIHJlcHJlc2VudGF0aW9ucyBpbiBzdHIgYW5kIGNvbnZlcnQgYWxsIHRvXG4gKiB0aGVpciByZXNwZWN0aXZlIGNoYXJhY3RlcnNcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmV4cG9ydHMuc3RyVG9DaGFycyA9IGZ1bmN0aW9uKHN0cikge1xuICAvKiBqc2hpbnQgbWF4bGVuOiBmYWxzZSAqL1xuICB2YXIgY2hhcnNfcmVnZXggPSAvKFxcW1xcXFxiXFxdKXwoXFxcXCk/XFxcXCg/OnUoW0EtRjAtOV17NH0pfHgoW0EtRjAtOV17Mn0pfCgwP1swLTddezJ9KXxjKFtAQS1aW1xcXFxcXF1eP10pfChbMHRudmZyXSkpL2c7XG4gIHN0ciA9IHN0ci5yZXBsYWNlKGNoYXJzX3JlZ2V4LCBmdW5jdGlvbihzLCBiLCBsYnMsIGExNiwgYjE2LCBjOCwgZGN0cmwsIGVzbHNoKSB7XG4gICAgaWYgKGxicykge1xuICAgICAgcmV0dXJuIHM7XG4gICAgfVxuXG4gICAgdmFyIGNvZGUgPSBiID8gOCA6XG4gICAgICBhMTYgICA/IHBhcnNlSW50KGExNiwgMTYpIDpcbiAgICAgIGIxNiAgID8gcGFyc2VJbnQoYjE2LCAxNikgOlxuICAgICAgYzggICAgPyBwYXJzZUludChjOCwgICA4KSA6XG4gICAgICBkY3RybCA/IENUUkwuaW5kZXhPZihkY3RybCkgOlxuICAgICAgU0xTSFtlc2xzaF07XG5cbiAgICB2YXIgYyA9IFN0cmluZy5mcm9tQ2hhckNvZGUoY29kZSk7XG5cbiAgICAvLyBFc2NhcGUgc3BlY2lhbCByZWdleCBjaGFyYWN0ZXJzLlxuICAgIGlmICgvW1tcXF17fV4kLnw/KisoKV0vLnRlc3QoYykpIHtcbiAgICAgIGMgPSAnXFxcXCcgKyBjO1xuICAgIH1cblxuICAgIHJldHVybiBjO1xuICB9KTtcblxuICByZXR1cm4gc3RyO1xufTtcblxuXG4vKipcbiAqIHR1cm5zIGNsYXNzIGludG8gdG9rZW5zXG4gKiByZWFkcyBzdHIgdW50aWwgaXQgZW5jb3VudGVycyBhIF0gbm90IHByZWNlZWRlZCBieSBhIFxcXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHBhcmFtIHtTdHJpbmd9IHJlZ2V4cFN0clxuICogQHJldHVybiB7QXJyYXkuPEFycmF5LjxPYmplY3Q+LCBOdW1iZXI+fVxuICovXG5leHBvcnRzLnRva2VuaXplQ2xhc3MgPSAoc3RyLCByZWdleHBTdHIpID0+IHtcbiAgLyoganNoaW50IG1heGxlbjogZmFsc2UgKi9cbiAgdmFyIHRva2VucyA9IFtdO1xuICB2YXIgcmVnZXhwID0gL1xcXFwoPzoodyl8KGQpfChzKXwoVyl8KEQpfChTKSl8KCg/Oig/OlxcXFwpKC4pfChbXlxcXVxcXFxdKSktKD86XFxcXCk/KFteXFxdXSkpfChcXF0pfCg/OlxcXFwpPyhbXl0pL2c7XG4gIHZhciBycywgYztcblxuXG4gIHdoaWxlICgocnMgPSByZWdleHAuZXhlYyhzdHIpKSAhPSBudWxsKSB7XG4gICAgaWYgKHJzWzFdKSB7XG4gICAgICB0b2tlbnMucHVzaChzZXRzLndvcmRzKCkpO1xuXG4gICAgfSBlbHNlIGlmIChyc1syXSkge1xuICAgICAgdG9rZW5zLnB1c2goc2V0cy5pbnRzKCkpO1xuXG4gICAgfSBlbHNlIGlmIChyc1szXSkge1xuICAgICAgdG9rZW5zLnB1c2goc2V0cy53aGl0ZXNwYWNlKCkpO1xuXG4gICAgfSBlbHNlIGlmIChyc1s0XSkge1xuICAgICAgdG9rZW5zLnB1c2goc2V0cy5ub3RXb3JkcygpKTtcblxuICAgIH0gZWxzZSBpZiAocnNbNV0pIHtcbiAgICAgIHRva2Vucy5wdXNoKHNldHMubm90SW50cygpKTtcblxuICAgIH0gZWxzZSBpZiAocnNbNl0pIHtcbiAgICAgIHRva2Vucy5wdXNoKHNldHMubm90V2hpdGVzcGFjZSgpKTtcblxuICAgIH0gZWxzZSBpZiAocnNbN10pIHtcbiAgICAgIHRva2Vucy5wdXNoKHtcbiAgICAgICAgdHlwZTogdHlwZXMuUkFOR0UsXG4gICAgICAgIGZyb206IChyc1s4XSB8fCByc1s5XSkuY2hhckNvZGVBdCgwKSxcbiAgICAgICAgdG86IHJzWzEwXS5jaGFyQ29kZUF0KDApLFxuICAgICAgfSk7XG5cbiAgICB9IGVsc2UgaWYgKChjID0gcnNbMTJdKSkge1xuICAgICAgdG9rZW5zLnB1c2goe1xuICAgICAgICB0eXBlOiB0eXBlcy5DSEFSLFxuICAgICAgICB2YWx1ZTogYy5jaGFyQ29kZUF0KDApLFxuICAgICAgfSk7XG5cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFt0b2tlbnMsIHJlZ2V4cC5sYXN0SW5kZXhdO1xuICAgIH1cbiAgfVxuXG4gIGV4cG9ydHMuZXJyb3IocmVnZXhwU3RyLCAnVW50ZXJtaW5hdGVkIGNoYXJhY3RlciBjbGFzcycpO1xufTtcblxuXG4vKipcbiAqIFNob3J0Y3V0IHRvIHRocm93IGVycm9ycy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gcmVnZXhwXG4gKiBAcGFyYW0ge1N0cmluZ30gbXNnXG4gKi9cbmV4cG9ydHMuZXJyb3IgPSAocmVnZXhwLCBtc2cpID0+IHtcbiAgdGhyb3cgbmV3IFN5bnRheEVycm9yKCdJbnZhbGlkIHJlZ3VsYXIgZXhwcmVzc2lvbjogLycgKyByZWdleHAgKyAnLzogJyArIG1zZyk7XG59O1xuIiwiY29uc3QgdHlwZXMgPSByZXF1aXJlKCcuL3R5cGVzJyk7XG5leHBvcnRzLndvcmRCb3VuZGFyeSA9ICgpID0+ICh7IHR5cGU6IHR5cGVzLlBPU0lUSU9OLCB2YWx1ZTogJ2InIH0pO1xuZXhwb3J0cy5ub25Xb3JkQm91bmRhcnkgPSAoKSA9PiAoeyB0eXBlOiB0eXBlcy5QT1NJVElPTiwgdmFsdWU6ICdCJyB9KTtcbmV4cG9ydHMuYmVnaW4gPSAoKSA9PiAoeyB0eXBlOiB0eXBlcy5QT1NJVElPTiwgdmFsdWU6ICdeJyB9KTtcbmV4cG9ydHMuZW5kID0gKCkgPT4gKHsgdHlwZTogdHlwZXMuUE9TSVRJT04sIHZhbHVlOiAnJCcgfSk7XG4iLCJjb25zdCB1dGlsICAgICAgPSByZXF1aXJlKCcuL3V0aWwnKTtcbmNvbnN0IHR5cGVzICAgICA9IHJlcXVpcmUoJy4vdHlwZXMnKTtcbmNvbnN0IHNldHMgICAgICA9IHJlcXVpcmUoJy4vc2V0cycpO1xuY29uc3QgcG9zaXRpb25zID0gcmVxdWlyZSgnLi9wb3NpdGlvbnMnKTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IChyZWdleHBTdHIpID0+IHtcbiAgdmFyIGkgPSAwLCBsLCBjLFxuICAgIHN0YXJ0ID0geyB0eXBlOiB0eXBlcy5ST09ULCBzdGFjazogW119LFxuXG4gICAgLy8gS2VlcCB0cmFjayBvZiBsYXN0IGNsYXVzZS9ncm91cCBhbmQgc3RhY2suXG4gICAgbGFzdEdyb3VwID0gc3RhcnQsXG4gICAgbGFzdCA9IHN0YXJ0LnN0YWNrLFxuICAgIGdyb3VwU3RhY2sgPSBbXTtcblxuXG4gIHZhciByZXBlYXRFcnIgPSAoaSkgPT4ge1xuICAgIHV0aWwuZXJyb3IocmVnZXhwU3RyLCBgTm90aGluZyB0byByZXBlYXQgYXQgY29sdW1uICR7aSAtIDF9YCk7XG4gIH07XG5cbiAgLy8gRGVjb2RlIGEgZmV3IGVzY2FwZWQgY2hhcmFjdGVycy5cbiAgdmFyIHN0ciA9IHV0aWwuc3RyVG9DaGFycyhyZWdleHBTdHIpO1xuICBsID0gc3RyLmxlbmd0aDtcblxuICAvLyBJdGVyYXRlIHRocm91Z2ggZWFjaCBjaGFyYWN0ZXIgaW4gc3RyaW5nLlxuICB3aGlsZSAoaSA8IGwpIHtcbiAgICBjID0gc3RyW2krK107XG5cbiAgICBzd2l0Y2ggKGMpIHtcbiAgICAgIC8vIEhhbmRsZSBlc2NhcGVkIGNoYXJhY3RlcnMsIGluY2x1ZXMgYSBmZXcgc2V0cy5cbiAgICAgIGNhc2UgJ1xcXFwnOlxuICAgICAgICBjID0gc3RyW2krK107XG5cbiAgICAgICAgc3dpdGNoIChjKSB7XG4gICAgICAgICAgY2FzZSAnYic6XG4gICAgICAgICAgICBsYXN0LnB1c2gocG9zaXRpb25zLndvcmRCb3VuZGFyeSgpKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgY2FzZSAnQic6XG4gICAgICAgICAgICBsYXN0LnB1c2gocG9zaXRpb25zLm5vbldvcmRCb3VuZGFyeSgpKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgY2FzZSAndyc6XG4gICAgICAgICAgICBsYXN0LnB1c2goc2V0cy53b3JkcygpKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgY2FzZSAnVyc6XG4gICAgICAgICAgICBsYXN0LnB1c2goc2V0cy5ub3RXb3JkcygpKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgY2FzZSAnZCc6XG4gICAgICAgICAgICBsYXN0LnB1c2goc2V0cy5pbnRzKCkpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICBjYXNlICdEJzpcbiAgICAgICAgICAgIGxhc3QucHVzaChzZXRzLm5vdEludHMoKSk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGNhc2UgJ3MnOlxuICAgICAgICAgICAgbGFzdC5wdXNoKHNldHMud2hpdGVzcGFjZSgpKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgY2FzZSAnUyc6XG4gICAgICAgICAgICBsYXN0LnB1c2goc2V0cy5ub3RXaGl0ZXNwYWNlKCkpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgLy8gQ2hlY2sgaWYgYyBpcyBpbnRlZ2VyLlxuICAgICAgICAgICAgLy8gSW4gd2hpY2ggY2FzZSBpdCdzIGEgcmVmZXJlbmNlLlxuICAgICAgICAgICAgaWYgKC9cXGQvLnRlc3QoYykpIHtcbiAgICAgICAgICAgICAgbGFzdC5wdXNoKHsgdHlwZTogdHlwZXMuUkVGRVJFTkNFLCB2YWx1ZTogcGFyc2VJbnQoYywgMTApIH0pO1xuXG4gICAgICAgICAgICAvLyBFc2NhcGVkIGNoYXJhY3Rlci5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGxhc3QucHVzaCh7IHR5cGU6IHR5cGVzLkNIQVIsIHZhbHVlOiBjLmNoYXJDb2RlQXQoMCkgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBicmVhaztcblxuXG4gICAgICAvLyBQb3NpdGlvbmFscy5cbiAgICAgIGNhc2UgJ14nOlxuICAgICAgICBsYXN0LnB1c2gocG9zaXRpb25zLmJlZ2luKCkpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnJCc6XG4gICAgICAgIGxhc3QucHVzaChwb3NpdGlvbnMuZW5kKCkpO1xuICAgICAgICBicmVhaztcblxuXG4gICAgICAvLyBIYW5kbGUgY3VzdG9tIHNldHMuXG4gICAgICBjYXNlICdbJzpcbiAgICAgICAgLy8gQ2hlY2sgaWYgdGhpcyBjbGFzcyBpcyAnYW50aScgaS5lLiBbXmFiY10uXG4gICAgICAgIHZhciBub3Q7XG4gICAgICAgIGlmIChzdHJbaV0gPT09ICdeJykge1xuICAgICAgICAgIG5vdCA9IHRydWU7XG4gICAgICAgICAgaSsrO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG5vdCA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gR2V0IGFsbCB0aGUgY2hhcmFjdGVycyBpbiBjbGFzcy5cbiAgICAgICAgdmFyIGNsYXNzVG9rZW5zID0gdXRpbC50b2tlbml6ZUNsYXNzKHN0ci5zbGljZShpKSwgcmVnZXhwU3RyKTtcblxuICAgICAgICAvLyBJbmNyZWFzZSBpbmRleCBieSBsZW5ndGggb2YgY2xhc3MuXG4gICAgICAgIGkgKz0gY2xhc3NUb2tlbnNbMV07XG4gICAgICAgIGxhc3QucHVzaCh7XG4gICAgICAgICAgdHlwZTogdHlwZXMuU0VULFxuICAgICAgICAgIHNldDogY2xhc3NUb2tlbnNbMF0sXG4gICAgICAgICAgbm90LFxuICAgICAgICB9KTtcblxuICAgICAgICBicmVhaztcblxuXG4gICAgICAvLyBDbGFzcyBvZiBhbnkgY2hhcmFjdGVyIGV4Y2VwdCBcXG4uXG4gICAgICBjYXNlICcuJzpcbiAgICAgICAgbGFzdC5wdXNoKHNldHMuYW55Q2hhcigpKTtcbiAgICAgICAgYnJlYWs7XG5cblxuICAgICAgLy8gUHVzaCBncm91cCBvbnRvIHN0YWNrLlxuICAgICAgY2FzZSAnKCc6XG4gICAgICAgIC8vIENyZWF0ZSBncm91cC5cbiAgICAgICAgdmFyIGdyb3VwID0ge1xuICAgICAgICAgIHR5cGU6IHR5cGVzLkdST1VQLFxuICAgICAgICAgIHN0YWNrOiBbXSxcbiAgICAgICAgICByZW1lbWJlcjogdHJ1ZSxcbiAgICAgICAgfTtcblxuICAgICAgICBjID0gc3RyW2ldO1xuXG4gICAgICAgIC8vIElmIGlmIHRoaXMgaXMgYSBzcGVjaWFsIGtpbmQgb2YgZ3JvdXAuXG4gICAgICAgIGlmIChjID09PSAnPycpIHtcbiAgICAgICAgICBjID0gc3RyW2kgKyAxXTtcbiAgICAgICAgICBpICs9IDI7XG5cbiAgICAgICAgICAvLyBNYXRjaCBpZiBmb2xsb3dlZCBieS5cbiAgICAgICAgICBpZiAoYyA9PT0gJz0nKSB7XG4gICAgICAgICAgICBncm91cC5mb2xsb3dlZEJ5ID0gdHJ1ZTtcblxuICAgICAgICAgIC8vIE1hdGNoIGlmIG5vdCBmb2xsb3dlZCBieS5cbiAgICAgICAgICB9IGVsc2UgaWYgKGMgPT09ICchJykge1xuICAgICAgICAgICAgZ3JvdXAubm90Rm9sbG93ZWRCeSA9IHRydWU7XG5cbiAgICAgICAgICB9IGVsc2UgaWYgKGMgIT09ICc6Jykge1xuICAgICAgICAgICAgdXRpbC5lcnJvcihyZWdleHBTdHIsXG4gICAgICAgICAgICAgIGBJbnZhbGlkIGdyb3VwLCBjaGFyYWN0ZXIgJyR7Y30nYCArXG4gICAgICAgICAgICAgIGAgYWZ0ZXIgJz8nIGF0IGNvbHVtbiAke2kgLSAxfWApO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGdyb3VwLnJlbWVtYmVyID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJbnNlcnQgc3ViZ3JvdXAgaW50byBjdXJyZW50IGdyb3VwIHN0YWNrLlxuICAgICAgICBsYXN0LnB1c2goZ3JvdXApO1xuXG4gICAgICAgIC8vIFJlbWVtYmVyIHRoZSBjdXJyZW50IGdyb3VwIGZvciB3aGVuIHRoZSBncm91cCBjbG9zZXMuXG4gICAgICAgIGdyb3VwU3RhY2sucHVzaChsYXN0R3JvdXApO1xuXG4gICAgICAgIC8vIE1ha2UgdGhpcyBuZXcgZ3JvdXAgdGhlIGN1cnJlbnQgZ3JvdXAuXG4gICAgICAgIGxhc3RHcm91cCA9IGdyb3VwO1xuICAgICAgICBsYXN0ID0gZ3JvdXAuc3RhY2s7XG4gICAgICAgIGJyZWFrO1xuXG5cbiAgICAgIC8vIFBvcCBncm91cCBvdXQgb2Ygc3RhY2suXG4gICAgICBjYXNlICcpJzpcbiAgICAgICAgaWYgKGdyb3VwU3RhY2subGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgdXRpbC5lcnJvcihyZWdleHBTdHIsIGBVbm1hdGNoZWQgKSBhdCBjb2x1bW4gJHtpIC0gMX1gKTtcbiAgICAgICAgfVxuICAgICAgICBsYXN0R3JvdXAgPSBncm91cFN0YWNrLnBvcCgpO1xuXG4gICAgICAgIC8vIENoZWNrIGlmIHRoaXMgZ3JvdXAgaGFzIGEgUElQRS5cbiAgICAgICAgLy8gVG8gZ2V0IGJhY2sgdGhlIGNvcnJlY3QgbGFzdCBzdGFjay5cbiAgICAgICAgbGFzdCA9IGxhc3RHcm91cC5vcHRpb25zID9cbiAgICAgICAgICBsYXN0R3JvdXAub3B0aW9uc1tsYXN0R3JvdXAub3B0aW9ucy5sZW5ndGggLSAxXSA6IGxhc3RHcm91cC5zdGFjaztcbiAgICAgICAgYnJlYWs7XG5cblxuICAgICAgLy8gVXNlIHBpcGUgY2hhcmFjdGVyIHRvIGdpdmUgbW9yZSBjaG9pY2VzLlxuICAgICAgY2FzZSAnfCc6XG4gICAgICAgIC8vIENyZWF0ZSBhcnJheSB3aGVyZSBvcHRpb25zIGFyZSBpZiB0aGlzIGlzIHRoZSBmaXJzdCBQSVBFXG4gICAgICAgIC8vIGluIHRoaXMgY2xhdXNlLlxuICAgICAgICBpZiAoIWxhc3RHcm91cC5vcHRpb25zKSB7XG4gICAgICAgICAgbGFzdEdyb3VwLm9wdGlvbnMgPSBbbGFzdEdyb3VwLnN0YWNrXTtcbiAgICAgICAgICBkZWxldGUgbGFzdEdyb3VwLnN0YWNrO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ3JlYXRlIGEgbmV3IHN0YWNrIGFuZCBhZGQgdG8gb3B0aW9ucyBmb3IgcmVzdCBvZiBjbGF1c2UuXG4gICAgICAgIHZhciBzdGFjayA9IFtdO1xuICAgICAgICBsYXN0R3JvdXAub3B0aW9ucy5wdXNoKHN0YWNrKTtcbiAgICAgICAgbGFzdCA9IHN0YWNrO1xuICAgICAgICBicmVhaztcblxuXG4gICAgICAvLyBSZXBldGl0aW9uLlxuICAgICAgLy8gRm9yIGV2ZXJ5IHJlcGV0aXRpb24sIHJlbW92ZSBsYXN0IGVsZW1lbnQgZnJvbSBsYXN0IHN0YWNrXG4gICAgICAvLyB0aGVuIGluc2VydCBiYWNrIGEgUkFOR0Ugb2JqZWN0LlxuICAgICAgLy8gVGhpcyBkZXNpZ24gaXMgY2hvc2VuIGJlY2F1c2UgdGhlcmUgY291bGQgYmUgbW9yZSB0aGFuXG4gICAgICAvLyBvbmUgcmVwZXRpdGlvbiBzeW1ib2xzIGluIGEgcmVnZXggaS5lLiBgYT8rezIsM31gLlxuICAgICAgY2FzZSAneyc6XG4gICAgICAgIHZhciBycyA9IC9eKFxcZCspKCwoXFxkKyk/KT9cXH0vLmV4ZWMoc3RyLnNsaWNlKGkpKSwgbWluLCBtYXg7XG4gICAgICAgIGlmIChycyAhPT0gbnVsbCkge1xuICAgICAgICAgIGlmIChsYXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmVwZWF0RXJyKGkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBtaW4gPSBwYXJzZUludChyc1sxXSwgMTApO1xuICAgICAgICAgIG1heCA9IHJzWzJdID8gcnNbM10gPyBwYXJzZUludChyc1szXSwgMTApIDogSW5maW5pdHkgOiBtaW47XG4gICAgICAgICAgaSArPSByc1swXS5sZW5ndGg7XG5cbiAgICAgICAgICBsYXN0LnB1c2goe1xuICAgICAgICAgICAgdHlwZTogdHlwZXMuUkVQRVRJVElPTixcbiAgICAgICAgICAgIG1pbixcbiAgICAgICAgICAgIG1heCxcbiAgICAgICAgICAgIHZhbHVlOiBsYXN0LnBvcCgpLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxhc3QucHVzaCh7XG4gICAgICAgICAgICB0eXBlOiB0eXBlcy5DSEFSLFxuICAgICAgICAgICAgdmFsdWU6IDEyMyxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnPyc6XG4gICAgICAgIGlmIChsYXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHJlcGVhdEVycihpKTtcbiAgICAgICAgfVxuICAgICAgICBsYXN0LnB1c2goe1xuICAgICAgICAgIHR5cGU6IHR5cGVzLlJFUEVUSVRJT04sXG4gICAgICAgICAgbWluOiAwLFxuICAgICAgICAgIG1heDogMSxcbiAgICAgICAgICB2YWx1ZTogbGFzdC5wb3AoKSxcbiAgICAgICAgfSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICcrJzpcbiAgICAgICAgaWYgKGxhc3QubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgcmVwZWF0RXJyKGkpO1xuICAgICAgICB9XG4gICAgICAgIGxhc3QucHVzaCh7XG4gICAgICAgICAgdHlwZTogdHlwZXMuUkVQRVRJVElPTixcbiAgICAgICAgICBtaW46IDEsXG4gICAgICAgICAgbWF4OiBJbmZpbml0eSxcbiAgICAgICAgICB2YWx1ZTogbGFzdC5wb3AoKSxcbiAgICAgICAgfSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICcqJzpcbiAgICAgICAgaWYgKGxhc3QubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgcmVwZWF0RXJyKGkpO1xuICAgICAgICB9XG4gICAgICAgIGxhc3QucHVzaCh7XG4gICAgICAgICAgdHlwZTogdHlwZXMuUkVQRVRJVElPTixcbiAgICAgICAgICBtaW46IDAsXG4gICAgICAgICAgbWF4OiBJbmZpbml0eSxcbiAgICAgICAgICB2YWx1ZTogbGFzdC5wb3AoKSxcbiAgICAgICAgfSk7XG4gICAgICAgIGJyZWFrO1xuXG5cbiAgICAgIC8vIERlZmF1bHQgaXMgYSBjaGFyYWN0ZXIgdGhhdCBpcyBub3QgYFxcW10oKXt9PysqXiRgLlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgbGFzdC5wdXNoKHtcbiAgICAgICAgICB0eXBlOiB0eXBlcy5DSEFSLFxuICAgICAgICAgIHZhbHVlOiBjLmNoYXJDb2RlQXQoMCksXG4gICAgICAgIH0pO1xuICAgIH1cblxuICB9XG5cbiAgLy8gQ2hlY2sgaWYgYW55IGdyb3VwcyBoYXZlIG5vdCBiZWVuIGNsb3NlZC5cbiAgaWYgKGdyb3VwU3RhY2subGVuZ3RoICE9PSAwKSB7XG4gICAgdXRpbC5lcnJvcihyZWdleHBTdHIsICdVbnRlcm1pbmF0ZWQgZ3JvdXAnKTtcbiAgfVxuXG4gIHJldHVybiBzdGFydDtcbn07XG5cbm1vZHVsZS5leHBvcnRzLnR5cGVzID0gdHlwZXM7XG4iLCIndXNlIHN0cmljdCc7XG4vKiBlc2xpbnQgaW5kZW50OiA0ICovXG5cblxuLy8gUHJpdmF0ZSBoZWxwZXIgY2xhc3NcbmNsYXNzIFN1YlJhbmdlIHtcbiAgICBjb25zdHJ1Y3Rvcihsb3csIGhpZ2gpIHtcbiAgICAgICAgdGhpcy5sb3cgPSBsb3c7XG4gICAgICAgIHRoaXMuaGlnaCA9IGhpZ2g7XG4gICAgICAgIHRoaXMubGVuZ3RoID0gMSArIGhpZ2ggLSBsb3c7XG4gICAgfVxuXG4gICAgb3ZlcmxhcHMocmFuZ2UpIHtcbiAgICAgICAgcmV0dXJuICEodGhpcy5oaWdoIDwgcmFuZ2UubG93IHx8IHRoaXMubG93ID4gcmFuZ2UuaGlnaCk7XG4gICAgfVxuXG4gICAgdG91Y2hlcyhyYW5nZSkge1xuICAgICAgICByZXR1cm4gISh0aGlzLmhpZ2ggKyAxIDwgcmFuZ2UubG93IHx8IHRoaXMubG93IC0gMSA+IHJhbmdlLmhpZ2gpO1xuICAgIH1cblxuICAgIC8vIFJldHVybnMgaW5jbHVzaXZlIGNvbWJpbmF0aW9uIG9mIFN1YlJhbmdlcyBhcyBhIFN1YlJhbmdlLlxuICAgIGFkZChyYW5nZSkge1xuICAgICAgICByZXR1cm4gbmV3IFN1YlJhbmdlKFxuICAgICAgICAgICAgTWF0aC5taW4odGhpcy5sb3csIHJhbmdlLmxvdyksXG4gICAgICAgICAgICBNYXRoLm1heCh0aGlzLmhpZ2gsIHJhbmdlLmhpZ2gpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gUmV0dXJucyBzdWJ0cmFjdGlvbiBvZiBTdWJSYW5nZXMgYXMgYW4gYXJyYXkgb2YgU3ViUmFuZ2VzLlxuICAgIC8vIChUaGVyZSdzIGEgY2FzZSB3aGVyZSBzdWJ0cmFjdGlvbiBkaXZpZGVzIGl0IGluIDIpXG4gICAgc3VidHJhY3QocmFuZ2UpIHtcbiAgICAgICAgaWYgKHJhbmdlLmxvdyA8PSB0aGlzLmxvdyAmJiByYW5nZS5oaWdoID49IHRoaXMuaGlnaCkge1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9IGVsc2UgaWYgKHJhbmdlLmxvdyA+IHRoaXMubG93ICYmIHJhbmdlLmhpZ2ggPCB0aGlzLmhpZ2gpIHtcbiAgICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAgICAgbmV3IFN1YlJhbmdlKHRoaXMubG93LCByYW5nZS5sb3cgLSAxKSxcbiAgICAgICAgICAgICAgICBuZXcgU3ViUmFuZ2UocmFuZ2UuaGlnaCArIDEsIHRoaXMuaGlnaClcbiAgICAgICAgICAgIF07XG4gICAgICAgIH0gZWxzZSBpZiAocmFuZ2UubG93IDw9IHRoaXMubG93KSB7XG4gICAgICAgICAgICByZXR1cm4gW25ldyBTdWJSYW5nZShyYW5nZS5oaWdoICsgMSwgdGhpcy5oaWdoKV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gW25ldyBTdWJSYW5nZSh0aGlzLmxvdywgcmFuZ2UubG93IC0gMSldO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdG9TdHJpbmcoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxvdyA9PSB0aGlzLmhpZ2ggP1xuICAgICAgICAgICAgdGhpcy5sb3cudG9TdHJpbmcoKSA6IHRoaXMubG93ICsgJy0nICsgdGhpcy5oaWdoO1xuICAgIH1cbn1cblxuXG5jbGFzcyBEUmFuZ2Uge1xuICAgIGNvbnN0cnVjdG9yKGEsIGIpIHtcbiAgICAgICAgdGhpcy5yYW5nZXMgPSBbXTtcbiAgICAgICAgdGhpcy5sZW5ndGggPSAwO1xuICAgICAgICBpZiAoYSAhPSBudWxsKSB0aGlzLmFkZChhLCBiKTtcbiAgICB9XG5cbiAgICBfdXBkYXRlX2xlbmd0aCgpIHtcbiAgICAgICAgdGhpcy5sZW5ndGggPSB0aGlzLnJhbmdlcy5yZWR1Y2UoKHByZXZpb3VzLCByYW5nZSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHByZXZpb3VzICsgcmFuZ2UubGVuZ3RoO1xuICAgICAgICB9LCAwKTtcbiAgICB9XG5cbiAgICBhZGQoYSwgYikge1xuICAgICAgICB2YXIgX2FkZCA9IChzdWJyYW5nZSkgPT4ge1xuICAgICAgICAgICAgdmFyIGkgPSAwO1xuICAgICAgICAgICAgd2hpbGUgKGkgPCB0aGlzLnJhbmdlcy5sZW5ndGggJiYgIXN1YnJhbmdlLnRvdWNoZXModGhpcy5yYW5nZXNbaV0pKSB7XG4gICAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIG5ld1JhbmdlcyA9IHRoaXMucmFuZ2VzLnNsaWNlKDAsIGkpO1xuICAgICAgICAgICAgd2hpbGUgKGkgPCB0aGlzLnJhbmdlcy5sZW5ndGggJiYgc3VicmFuZ2UudG91Y2hlcyh0aGlzLnJhbmdlc1tpXSkpIHtcbiAgICAgICAgICAgICAgICBzdWJyYW5nZSA9IHN1YnJhbmdlLmFkZCh0aGlzLnJhbmdlc1tpXSk7XG4gICAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbmV3UmFuZ2VzLnB1c2goc3VicmFuZ2UpO1xuICAgICAgICAgICAgdGhpcy5yYW5nZXMgPSBuZXdSYW5nZXMuY29uY2F0KHRoaXMucmFuZ2VzLnNsaWNlKGkpKTtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZV9sZW5ndGgoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChhIGluc3RhbmNlb2YgRFJhbmdlKSB7XG4gICAgICAgICAgICBhLnJhbmdlcy5mb3JFYWNoKF9hZGQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGIgPT0gbnVsbCkgYiA9IGE7XG4gICAgICAgICAgICBfYWRkKG5ldyBTdWJSYW5nZShhLCBiKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgc3VidHJhY3QoYSwgYikge1xuICAgICAgICB2YXIgX3N1YnRyYWN0ID0gKHN1YnJhbmdlKSA9PiB7XG4gICAgICAgICAgICB2YXIgaSA9IDA7XG4gICAgICAgICAgICB3aGlsZSAoaSA8IHRoaXMucmFuZ2VzLmxlbmd0aCAmJiAhc3VicmFuZ2Uub3ZlcmxhcHModGhpcy5yYW5nZXNbaV0pKSB7XG4gICAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIG5ld1JhbmdlcyA9IHRoaXMucmFuZ2VzLnNsaWNlKDAsIGkpO1xuICAgICAgICAgICAgd2hpbGUgKGkgPCB0aGlzLnJhbmdlcy5sZW5ndGggJiYgc3VicmFuZ2Uub3ZlcmxhcHModGhpcy5yYW5nZXNbaV0pKSB7XG4gICAgICAgICAgICAgICAgbmV3UmFuZ2VzID0gbmV3UmFuZ2VzLmNvbmNhdCh0aGlzLnJhbmdlc1tpXS5zdWJ0cmFjdChzdWJyYW5nZSkpO1xuICAgICAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucmFuZ2VzID0gbmV3UmFuZ2VzLmNvbmNhdCh0aGlzLnJhbmdlcy5zbGljZShpKSk7XG4gICAgICAgICAgICB0aGlzLl91cGRhdGVfbGVuZ3RoKCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKGEgaW5zdGFuY2VvZiBEUmFuZ2UpIHtcbiAgICAgICAgICAgIGEucmFuZ2VzLmZvckVhY2goX3N1YnRyYWN0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChiID09IG51bGwpIGIgPSBhO1xuICAgICAgICAgICAgX3N1YnRyYWN0KG5ldyBTdWJSYW5nZShhLCBiKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgaW50ZXJzZWN0KGEsIGIpIHtcbiAgICAgICAgdmFyIG5ld1JhbmdlcyA9IFtdO1xuICAgICAgICB2YXIgX2ludGVyc2VjdCA9IChzdWJyYW5nZSkgPT4ge1xuICAgICAgICAgICAgdmFyIGkgPSAwO1xuICAgICAgICAgICAgd2hpbGUgKGkgPCB0aGlzLnJhbmdlcy5sZW5ndGggJiYgIXN1YnJhbmdlLm92ZXJsYXBzKHRoaXMucmFuZ2VzW2ldKSkge1xuICAgICAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHdoaWxlIChpIDwgdGhpcy5yYW5nZXMubGVuZ3RoICYmIHN1YnJhbmdlLm92ZXJsYXBzKHRoaXMucmFuZ2VzW2ldKSkge1xuICAgICAgICAgICAgICAgIHZhciBsb3cgPSBNYXRoLm1heCh0aGlzLnJhbmdlc1tpXS5sb3csIHN1YnJhbmdlLmxvdyk7XG4gICAgICAgICAgICAgICAgdmFyIGhpZ2ggPSBNYXRoLm1pbih0aGlzLnJhbmdlc1tpXS5oaWdoLCBzdWJyYW5nZS5oaWdoKTtcbiAgICAgICAgICAgICAgICBuZXdSYW5nZXMucHVzaChuZXcgU3ViUmFuZ2UobG93LCBoaWdoKSk7XG4gICAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChhIGluc3RhbmNlb2YgRFJhbmdlKSB7XG4gICAgICAgICAgICBhLnJhbmdlcy5mb3JFYWNoKF9pbnRlcnNlY3QpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGIgPT0gbnVsbCkgYiA9IGE7XG4gICAgICAgICAgICBfaW50ZXJzZWN0KG5ldyBTdWJSYW5nZShhLCBiKSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yYW5nZXMgPSBuZXdSYW5nZXM7XG4gICAgICAgIHRoaXMuX3VwZGF0ZV9sZW5ndGgoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgaW5kZXgoaW5kZXgpIHtcbiAgICAgICAgdmFyIGkgPSAwO1xuICAgICAgICB3aGlsZSAoaSA8IHRoaXMucmFuZ2VzLmxlbmd0aCAmJiB0aGlzLnJhbmdlc1tpXS5sZW5ndGggPD0gaW5kZXgpIHtcbiAgICAgICAgICAgIGluZGV4IC09IHRoaXMucmFuZ2VzW2ldLmxlbmd0aDtcbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5yYW5nZXNbaV0ubG93ICsgaW5kZXg7XG4gICAgfVxuXG4gICAgdG9TdHJpbmcoKSB7XG4gICAgICAgIHJldHVybiAnWyAnICsgdGhpcy5yYW5nZXMuam9pbignLCAnKSArICcgXSc7XG4gICAgfVxuXG4gICAgY2xvbmUoKSB7XG4gICAgICAgIHJldHVybiBuZXcgRFJhbmdlKHRoaXMpO1xuICAgIH1cblxuICAgIG51bWJlcnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJhbmdlcy5yZWR1Y2UoKHJlc3VsdCwgc3VicmFuZ2UpID0+IHtcbiAgICAgICAgICAgIHZhciBpID0gc3VicmFuZ2UubG93O1xuICAgICAgICAgICAgd2hpbGUgKGkgPD0gc3VicmFuZ2UuaGlnaCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGkpO1xuICAgICAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH0sIFtdKTtcbiAgICB9XG5cbiAgICBzdWJyYW5nZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJhbmdlcy5tYXAoKHN1YnJhbmdlKSA9PiAoe1xuICAgICAgICAgICAgbG93OiBzdWJyYW5nZS5sb3csXG4gICAgICAgICAgICBoaWdoOiBzdWJyYW5nZS5oaWdoLFxuICAgICAgICAgICAgbGVuZ3RoOiAxICsgc3VicmFuZ2UuaGlnaCAtIHN1YnJhbmdlLmxvd1xuICAgICAgICB9KSk7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IERSYW5nZTtcbiIsImNvbnN0IHJldCAgICA9IHJlcXVpcmUoJ3JldCcpO1xuY29uc3QgRFJhbmdlID0gcmVxdWlyZSgnZHJhbmdlJyk7XG5jb25zdCB0eXBlcyAgPSByZXQudHlwZXM7XG5cblxubW9kdWxlLmV4cG9ydHMgPSBjbGFzcyBSYW5kRXhwIHtcbiAgLyoqXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0ge1JlZ0V4cHxTdHJpbmd9IHJlZ2V4cFxuICAgKiBAcGFyYW0ge1N0cmluZ30gbVxuICAgKi9cbiAgY29uc3RydWN0b3IocmVnZXhwLCBtKSB7XG4gICAgdGhpcy5fc2V0RGVmYXVsdHMocmVnZXhwKTtcbiAgICBpZiAocmVnZXhwIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICB0aGlzLmlnbm9yZUNhc2UgPSByZWdleHAuaWdub3JlQ2FzZTtcbiAgICAgIHRoaXMubXVsdGlsaW5lID0gcmVnZXhwLm11bHRpbGluZTtcbiAgICAgIHJlZ2V4cCA9IHJlZ2V4cC5zb3VyY2U7XG5cbiAgICB9IGVsc2UgaWYgKHR5cGVvZiByZWdleHAgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aGlzLmlnbm9yZUNhc2UgPSBtICYmIG0uaW5kZXhPZignaScpICE9PSAtMTtcbiAgICAgIHRoaXMubXVsdGlsaW5lID0gbSAmJiBtLmluZGV4T2YoJ20nKSAhPT0gLTE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgYSByZWdleHAgb3Igc3RyaW5nJyk7XG4gICAgfVxuXG4gICAgdGhpcy50b2tlbnMgPSByZXQocmVnZXhwKTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiBzb21lIGN1c3RvbSBwcm9wZXJ0aWVzIGhhdmUgYmVlbiBzZXQgZm9yIHRoaXMgcmVnZXhwLlxuICAgKlxuICAgKiBAcGFyYW0ge1JhbmRFeHB9IHJhbmRleHBcbiAgICogQHBhcmFtIHtSZWdFeHB9IHJlZ2V4cFxuICAgKi9cbiAgX3NldERlZmF1bHRzKHJlZ2V4cCkge1xuICAgIC8vIFdoZW4gYSByZXBldGl0aW9uYWwgdG9rZW4gaGFzIGl0cyBtYXggc2V0IHRvIEluZmluaXRlLFxuICAgIC8vIHJhbmRleHAgd29uJ3QgYWN0dWFsbHkgZ2VuZXJhdGUgYSByYW5kb20gYW1vdW50IGJldHdlZW4gbWluIGFuZCBJbmZpbml0ZVxuICAgIC8vIGluc3RlYWQgaXQgd2lsbCBzZWUgSW5maW5pdGUgYXMgbWluICsgMTAwLlxuICAgIHRoaXMubWF4ID0gcmVnZXhwLm1heCAhPSBudWxsID8gcmVnZXhwLm1heCA6XG4gICAgICBSYW5kRXhwLnByb3RvdHlwZS5tYXggIT0gbnVsbCA/IFJhbmRFeHAucHJvdG90eXBlLm1heCA6IDEwMDtcblxuICAgIC8vIFRoaXMgYWxsb3dzIGV4cGFuZGluZyB0byBpbmNsdWRlIGFkZGl0aW9uYWwgY2hhcmFjdGVyc1xuICAgIC8vIGZvciBpbnN0YW5jZTogUmFuZEV4cC5kZWZhdWx0UmFuZ2UuYWRkKDAsIDY1NTM1KTtcbiAgICB0aGlzLmRlZmF1bHRSYW5nZSA9IHJlZ2V4cC5kZWZhdWx0UmFuZ2UgP1xuICAgICAgcmVnZXhwLmRlZmF1bHRSYW5nZSA6IHRoaXMuZGVmYXVsdFJhbmdlLmNsb25lKCk7XG5cbiAgICBpZiAocmVnZXhwLnJhbmRJbnQpIHtcbiAgICAgIHRoaXMucmFuZEludCA9IHJlZ2V4cC5yYW5kSW50O1xuICAgIH1cbiAgfVxuXG5cbiAgLyoqXG4gICAqIEdlbmVyYXRlcyB0aGUgcmFuZG9tIHN0cmluZy5cbiAgICpcbiAgICogQHJldHVybiB7U3RyaW5nfVxuICAgKi9cbiAgZ2VuKCkge1xuICAgIHJldHVybiB0aGlzLl9nZW4odGhpcy50b2tlbnMsIFtdKTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIEdlbmVyYXRlIHJhbmRvbSBzdHJpbmcgbW9kZWxlZCBhZnRlciBnaXZlbiB0b2tlbnMuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSB0b2tlblxuICAgKiBAcGFyYW0ge0FycmF5LjxTdHJpbmc+fSBncm91cHNcbiAgICogQHJldHVybiB7U3RyaW5nfVxuICAgKi9cbiAgX2dlbih0b2tlbiwgZ3JvdXBzKSB7XG4gICAgdmFyIHN0YWNrLCBzdHIsIG4sIGksIGw7XG5cbiAgICBzd2l0Y2ggKHRva2VuLnR5cGUpIHtcbiAgICAgIGNhc2UgdHlwZXMuUk9PVDpcbiAgICAgIGNhc2UgdHlwZXMuR1JPVVA6XG4gICAgICAgIC8vIElnbm9yZSBsb29rYWhlYWRzIGZvciBub3cuXG4gICAgICAgIGlmICh0b2tlbi5mb2xsb3dlZEJ5IHx8IHRva2VuLm5vdEZvbGxvd2VkQnkpIHsgcmV0dXJuICcnOyB9XG5cbiAgICAgICAgLy8gSW5zZXJ0IHBsYWNlaG9sZGVyIHVudGlsIGdyb3VwIHN0cmluZyBpcyBnZW5lcmF0ZWQuXG4gICAgICAgIGlmICh0b2tlbi5yZW1lbWJlciAmJiB0b2tlbi5ncm91cE51bWJlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgdG9rZW4uZ3JvdXBOdW1iZXIgPSBncm91cHMucHVzaChudWxsKSAtIDE7XG4gICAgICAgIH1cblxuICAgICAgICBzdGFjayA9IHRva2VuLm9wdGlvbnMgP1xuICAgICAgICAgIHRoaXMuX3JhbmRTZWxlY3QodG9rZW4ub3B0aW9ucykgOiB0b2tlbi5zdGFjaztcblxuICAgICAgICBzdHIgPSAnJztcbiAgICAgICAgZm9yIChpID0gMCwgbCA9IHN0YWNrLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgIHN0ciArPSB0aGlzLl9nZW4oc3RhY2tbaV0sIGdyb3Vwcyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodG9rZW4ucmVtZW1iZXIpIHtcbiAgICAgICAgICBncm91cHNbdG9rZW4uZ3JvdXBOdW1iZXJdID0gc3RyO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdHI7XG5cbiAgICAgIGNhc2UgdHlwZXMuUE9TSVRJT046XG4gICAgICAgIC8vIERvIG5vdGhpbmcgZm9yIG5vdy5cbiAgICAgICAgcmV0dXJuICcnO1xuXG4gICAgICBjYXNlIHR5cGVzLlNFVDpcbiAgICAgICAgdmFyIGV4cGFuZGVkU2V0ID0gdGhpcy5fZXhwYW5kKHRva2VuKTtcbiAgICAgICAgaWYgKCFleHBhbmRlZFNldC5sZW5ndGgpIHsgcmV0dXJuICcnOyB9XG4gICAgICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKHRoaXMuX3JhbmRTZWxlY3QoZXhwYW5kZWRTZXQpKTtcblxuICAgICAgY2FzZSB0eXBlcy5SRVBFVElUSU9OOlxuICAgICAgICAvLyBSYW5kb21seSBnZW5lcmF0ZSBudW1iZXIgYmV0d2VlbiBtaW4gYW5kIG1heC5cbiAgICAgICAgbiA9IHRoaXMucmFuZEludCh0b2tlbi5taW4sXG4gICAgICAgICAgdG9rZW4ubWF4ID09PSBJbmZpbml0eSA/IHRva2VuLm1pbiArIHRoaXMubWF4IDogdG9rZW4ubWF4KTtcblxuICAgICAgICBzdHIgPSAnJztcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IG47IGkrKykge1xuICAgICAgICAgIHN0ciArPSB0aGlzLl9nZW4odG9rZW4udmFsdWUsIGdyb3Vwcyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc3RyO1xuXG4gICAgICBjYXNlIHR5cGVzLlJFRkVSRU5DRTpcbiAgICAgICAgcmV0dXJuIGdyb3Vwc1t0b2tlbi52YWx1ZSAtIDFdIHx8ICcnO1xuXG4gICAgICBjYXNlIHR5cGVzLkNIQVI6XG4gICAgICAgIHZhciBjb2RlID0gdGhpcy5pZ25vcmVDYXNlICYmIHRoaXMuX3JhbmRCb29sKCkgP1xuICAgICAgICAgIHRoaXMuX3RvT3RoZXJDYXNlKHRva2VuLnZhbHVlKSA6IHRva2VuLnZhbHVlO1xuICAgICAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZShjb2RlKTtcbiAgICB9XG4gIH1cblxuXG4gIC8qKlxuICAgKiBJZiBjb2RlIGlzIGFscGhhYmV0aWMsIGNvbnZlcnRzIHRvIG90aGVyIGNhc2UuXG4gICAqIElmIG5vdCBhbHBoYWJldGljLCByZXR1cm5zIGJhY2sgY29kZS5cbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGNvZGVcbiAgICogQHJldHVybiB7TnVtYmVyfVxuICAgKi9cbiAgX3RvT3RoZXJDYXNlKGNvZGUpIHtcbiAgICByZXR1cm4gY29kZSArICg5NyA8PSBjb2RlICYmIGNvZGUgPD0gMTIyID8gLTMyIDpcbiAgICAgIDY1IDw9IGNvZGUgJiYgY29kZSA8PSA5MCAgPyAgMzIgOiAwKTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIFJhbmRvbWx5IHJldHVybnMgYSB0cnVlIG9yIGZhbHNlIHZhbHVlLlxuICAgKlxuICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgKi9cbiAgX3JhbmRCb29sKCkge1xuICAgIHJldHVybiAhdGhpcy5yYW5kSW50KDAsIDEpO1xuICB9XG5cblxuICAvKipcbiAgICogUmFuZG9tbHkgc2VsZWN0cyBhbmQgcmV0dXJucyBhIHZhbHVlIGZyb20gdGhlIGFycmF5LlxuICAgKlxuICAgKiBAcGFyYW0ge0FycmF5LjxPYmplY3Q+fSBhcnJcbiAgICogQHJldHVybiB7T2JqZWN0fVxuICAgKi9cbiAgX3JhbmRTZWxlY3QoYXJyKSB7XG4gICAgaWYgKGFyciBpbnN0YW5jZW9mIERSYW5nZSkge1xuICAgICAgcmV0dXJuIGFyci5pbmRleCh0aGlzLnJhbmRJbnQoMCwgYXJyLmxlbmd0aCAtIDEpKTtcbiAgICB9XG4gICAgcmV0dXJuIGFyclt0aGlzLnJhbmRJbnQoMCwgYXJyLmxlbmd0aCAtIDEpXTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIGV4cGFuZHMgYSB0b2tlbiB0byBhIERpc2NvbnRpbnVvdXNSYW5nZSBvZiBjaGFyYWN0ZXJzIHdoaWNoIGhhcyBhXG4gICAqIGxlbmd0aCBhbmQgYW4gaW5kZXggZnVuY3Rpb24gKGZvciByYW5kb20gc2VsZWN0aW5nKVxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gdG9rZW5cbiAgICogQHJldHVybiB7RGlzY29udGludW91c1JhbmdlfVxuICAgKi9cbiAgX2V4cGFuZCh0b2tlbikge1xuICAgIGlmICh0b2tlbi50eXBlID09PSByZXQudHlwZXMuQ0hBUikge1xuICAgICAgcmV0dXJuIG5ldyBEUmFuZ2UodG9rZW4udmFsdWUpO1xuICAgIH0gZWxzZSBpZiAodG9rZW4udHlwZSA9PT0gcmV0LnR5cGVzLlJBTkdFKSB7XG4gICAgICByZXR1cm4gbmV3IERSYW5nZSh0b2tlbi5mcm9tLCB0b2tlbi50byk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBkcmFuZ2UgPSBuZXcgRFJhbmdlKCk7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRva2VuLnNldC5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgc3VicmFuZ2UgPSB0aGlzLl9leHBhbmQodG9rZW4uc2V0W2ldKTtcbiAgICAgICAgZHJhbmdlLmFkZChzdWJyYW5nZSk7XG4gICAgICAgIGlmICh0aGlzLmlnbm9yZUNhc2UpIHtcbiAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHN1YnJhbmdlLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICBsZXQgY29kZSA9IHN1YnJhbmdlLmluZGV4KGopO1xuICAgICAgICAgICAgbGV0IG90aGVyQ2FzZUNvZGUgPSB0aGlzLl90b090aGVyQ2FzZShjb2RlKTtcbiAgICAgICAgICAgIGlmIChjb2RlICE9PSBvdGhlckNhc2VDb2RlKSB7XG4gICAgICAgICAgICAgIGRyYW5nZS5hZGQob3RoZXJDYXNlQ29kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAodG9rZW4ubm90KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRlZmF1bHRSYW5nZS5jbG9uZSgpLnN1YnRyYWN0KGRyYW5nZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5kZWZhdWx0UmFuZ2UuY2xvbmUoKS5pbnRlcnNlY3QoZHJhbmdlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuXG4gIC8qKlxuICAgKiBSYW5kb21seSBnZW5lcmF0ZXMgYW5kIHJldHVybnMgYSBudW1iZXIgYmV0d2VlbiBhIGFuZCBiIChpbmNsdXNpdmUpLlxuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gYVxuICAgKiBAcGFyYW0ge051bWJlcn0gYlxuICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAqL1xuICByYW5kSW50KGEsIGIpIHtcbiAgICByZXR1cm4gYSArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICgxICsgYiAtIGEpKTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIERlZmF1bHQgcmFuZ2Ugb2YgY2hhcmFjdGVycyB0byBnZW5lcmF0ZSBmcm9tLlxuICAgKi9cbiAgZ2V0IGRlZmF1bHRSYW5nZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fcmFuZ2UgPSB0aGlzLl9yYW5nZSB8fCBuZXcgRFJhbmdlKDMyLCAxMjYpO1xuICB9XG5cbiAgc2V0IGRlZmF1bHRSYW5nZShyYW5nZSkge1xuICAgIHRoaXMuX3JhbmdlID0gcmFuZ2U7XG4gIH1cblxuXG4gIC8qKlxuICAgKlxuICAgKiBFbmFibGVzIHVzZSBvZiByYW5kZXhwIHdpdGggYSBzaG9ydGVyIGNhbGwuXG4gICAqXG4gICAqIEBwYXJhbSB7UmVnRXhwfFN0cmluZ3wgcmVnZXhwfVxuICAgKiBAcGFyYW0ge1N0cmluZ30gbVxuICAgKiBAcmV0dXJuIHtTdHJpbmd9XG4gICAqL1xuICBzdGF0aWMgcmFuZGV4cChyZWdleHAsIG0pIHtcbiAgICB2YXIgcmFuZGV4cDtcbiAgICBpZih0eXBlb2YgcmVnZXhwID09PSAnc3RyaW5nJykge1xuICAgICAgcmVnZXhwID0gbmV3IFJlZ0V4cChyZWdleHAsIG0pO1xuICAgIH1cblxuICAgIGlmIChyZWdleHAuX3JhbmRleHAgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmFuZGV4cCA9IG5ldyBSYW5kRXhwKHJlZ2V4cCwgbSk7XG4gICAgICByZWdleHAuX3JhbmRleHAgPSByYW5kZXhwO1xuICAgIH0gZWxzZSB7XG4gICAgICByYW5kZXhwID0gcmVnZXhwLl9yYW5kZXhwO1xuICAgICAgcmFuZGV4cC5fc2V0RGVmYXVsdHMocmVnZXhwKTtcbiAgICB9XG4gICAgcmV0dXJuIHJhbmRleHAuZ2VuKCk7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBFbmFibGVzIHN1Z2FyeSAvcmVnZXhwLy5nZW4gc3ludGF4LlxuICAgKi9cbiAgc3RhdGljIHN1Z2FyKCkge1xuICAgIC8qIGVzaGludCBmcmVlemU6ZmFsc2UgKi9cbiAgICBSZWdFeHAucHJvdG90eXBlLmdlbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIFJhbmRFeHAucmFuZGV4cCh0aGlzKTtcbiAgICB9O1xuICB9XG59O1xuIiwiaW1wb3J0IFJhbmRFeHAgZnJvbSAncmFuZGV4cCc7XG5cbmltcG9ydCBvcHRpb25BUEkgZnJvbSAnLi4vYXBpL29wdGlvbic7XG5pbXBvcnQgZW52IGZyb20gJy4vY29uc3RhbnRzJztcblxuZnVuY3Rpb24gZ2V0UmFuZG9tSW50ZWdlcihtaW4sIG1heCkge1xuICBtaW4gPSB0eXBlb2YgbWluID09PSAndW5kZWZpbmVkJyA/IGVudi5NSU5fSU5URUdFUiA6IG1pbjtcbiAgbWF4ID0gdHlwZW9mIG1heCA9PT0gJ3VuZGVmaW5lZCcgPyBlbnYuTUFYX0lOVEVHRVIgOiBtYXg7XG5cbiAgcmV0dXJuIE1hdGguZmxvb3Iob3B0aW9uQVBJKCdyYW5kb20nKSgpICogKChtYXggLSBtaW4pICsgMSkpICsgbWluO1xufVxuXG5mdW5jdGlvbiBfcmFuZGV4cCh2YWx1ZSkge1xuICAvLyBzZXQgbWF4aW11bSBkZWZhdWx0LCBzZWUgIzE5M1xuICBSYW5kRXhwLnByb3RvdHlwZS5tYXggPSBvcHRpb25BUEkoJ2RlZmF1bHRSYW5kRXhwTWF4Jyk7XG5cbiAgLy8gc2FtZSBpbXBsZW1lbnRhdGlvbiBhcyB0aGUgb3JpZ2luYWwgZXhjZXB0IHVzaW5nIG91ciByYW5kb21cbiAgUmFuZEV4cC5wcm90b3R5cGUucmFuZEludCA9IChhLCBiKSA9PiBhICsgTWF0aC5mbG9vcihvcHRpb25BUEkoJ3JhbmRvbScpKCkgKiAoMSArIChiIC0gYSkpKTtcblxuICBjb25zdCByZSA9IG5ldyBSYW5kRXhwKHZhbHVlKTtcblxuICByZXR1cm4gcmUuZ2VuKCk7XG59XG5cbi8qKlxuICogUmV0dXJucyByYW5kb20gZWxlbWVudCBvZiBhIGNvbGxlY3Rpb25cbiAqXG4gKiBAcGFyYW0gY29sbGVjdGlvblxuICogQHJldHVybnMge1R9XG4gKi9cbmZ1bmN0aW9uIHBpY2soY29sbGVjdGlvbikge1xuICByZXR1cm4gY29sbGVjdGlvbltNYXRoLmZsb29yKG9wdGlvbkFQSSgncmFuZG9tJykoKSAqIGNvbGxlY3Rpb24ubGVuZ3RoKV07XG59XG5cbi8qKlxuICogUmV0dXJucyBzaHVmZmxlZCBjb2xsZWN0aW9uIG9mIGVsZW1lbnRzXG4gKlxuICogQHBhcmFtIGNvbGxlY3Rpb25cbiAqIEByZXR1cm5zIHtUW119XG4gKi9cbmZ1bmN0aW9uIHNodWZmbGUoY29sbGVjdGlvbikge1xuICBsZXQgdG1wO1xuICBsZXQga2V5O1xuICBsZXQgbGVuZ3RoID0gY29sbGVjdGlvbi5sZW5ndGg7XG5cbiAgY29uc3QgY29weSA9IGNvbGxlY3Rpb24uc2xpY2UoKTtcblxuICBmb3IgKDsgbGVuZ3RoID4gMDspIHtcbiAgICBrZXkgPSBNYXRoLmZsb29yKG9wdGlvbkFQSSgncmFuZG9tJykoKSAqIGxlbmd0aCk7XG4gICAgLy8gc3dhcFxuICAgIGxlbmd0aCAtPSAxO1xuICAgIHRtcCA9IGNvcHlbbGVuZ3RoXTtcbiAgICBjb3B5W2xlbmd0aF0gPSBjb3B5W2tleV07XG4gICAgY29weVtrZXldID0gdG1wO1xuICB9XG5cbiAgcmV0dXJuIGNvcHk7XG59XG5cblxuLyoqXG4gKiBSZXR1cm5zIGEgcmFuZG9tIGludGVnZXIgYmV0d2VlbiBtaW4gKGluY2x1c2l2ZSkgYW5kIG1heCAoaW5jbHVzaXZlKVxuICogVXNpbmcgTWF0aC5yb3VuZCgpIHdpbGwgZ2l2ZSB5b3UgYSBub24tdW5pZm9ybSBkaXN0cmlidXRpb24hXG4gKiBAc2VlIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzE1Mjc4MjAvNzY5Mzg0XG4gKi9cbmZ1bmN0aW9uIGdldFJhbmRvbShtaW4sIG1heCkge1xuICByZXR1cm4gKG9wdGlvbkFQSSgncmFuZG9tJykoKSAqIChtYXggLSBtaW4pKSArIG1pbjtcbn1cblxuLyoqXG4gKiBHZW5lcmF0ZXMgcmFuZG9tIG51bWJlciBhY2NvcmRpbmcgdG8gcGFyYW1ldGVycyBwYXNzZWRcbiAqXG4gKiBAcGFyYW0gbWluXG4gKiBAcGFyYW0gbWF4XG4gKiBAcGFyYW0gZGVmTWluXG4gKiBAcGFyYW0gZGVmTWF4XG4gKiBAcGFyYW0gaGFzUHJlY2lzaW9uXG4gKiBAcmV0dXJucyB7bnVtYmVyfVxuICovXG5mdW5jdGlvbiBudW1iZXIobWluLCBtYXgsIGRlZk1pbiwgZGVmTWF4LCBoYXNQcmVjaXNpb24gPSBmYWxzZSkge1xuICBkZWZNaW4gPSB0eXBlb2YgZGVmTWluID09PSAndW5kZWZpbmVkJyA/IGVudi5NSU5fTlVNQkVSIDogZGVmTWluO1xuICBkZWZNYXggPSB0eXBlb2YgZGVmTWF4ID09PSAndW5kZWZpbmVkJyA/IGVudi5NQVhfTlVNQkVSIDogZGVmTWF4O1xuXG4gIG1pbiA9IHR5cGVvZiBtaW4gPT09ICd1bmRlZmluZWQnID8gZGVmTWluIDogbWluO1xuICBtYXggPSB0eXBlb2YgbWF4ID09PSAndW5kZWZpbmVkJyA/IGRlZk1heCA6IG1heDtcblxuICBpZiAobWF4IDwgbWluKSB7XG4gICAgbWF4ICs9IG1pbjtcbiAgfVxuXG4gIGlmIChoYXNQcmVjaXNpb24pIHtcbiAgICByZXR1cm4gZ2V0UmFuZG9tKG1pbiwgbWF4KTtcbiAgfVxuXG4gIHJldHVybiBnZXRSYW5kb21JbnRlZ2VyKG1pbiwgbWF4KTtcbn1cblxuZnVuY3Rpb24gYnkodHlwZSkge1xuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlICdzZWNvbmRzJzpcbiAgICAgIHJldHVybiBudW1iZXIoMCwgNjApICogNjA7XG5cbiAgICBjYXNlICdtaW51dGVzJzpcbiAgICAgIHJldHVybiBudW1iZXIoMTUsIDUwKSAqIDYxMjtcblxuICAgIGNhc2UgJ2hvdXJzJzpcbiAgICAgIHJldHVybiBudW1iZXIoMTIsIDcyKSAqIDM2MTIzO1xuXG4gICAgY2FzZSAnZGF5cyc6XG4gICAgICByZXR1cm4gbnVtYmVyKDcsIDMwKSAqIDg2NDEyMzQ1O1xuXG4gICAgY2FzZSAnd2Vla3MnOlxuICAgICAgcmV0dXJuIG51bWJlcig0LCA1MikgKiA2MDQ4MTIzNDU7XG5cbiAgICBjYXNlICdtb250aHMnOlxuICAgICAgcmV0dXJuIG51bWJlcigyLCAxMykgKiAyNTkyMDEyMzQ1O1xuXG4gICAgY2FzZSAneWVhcnMnOlxuICAgICAgcmV0dXJuIG51bWJlcigxLCAyMCkgKiAzMTEwNDAxMjM0NTtcblxuICAgIGRlZmF1bHQ6IGJyZWFrO1xuICB9XG59XG5cbmZ1bmN0aW9uIGRhdGUoc3RlcCkge1xuICBpZiAoc3RlcCkge1xuICAgIHJldHVybiBieShzdGVwKTtcbiAgfVxuXG4gIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XG4gIGNvbnN0IGRheXMgPSBudW1iZXIoLTEwMDAsIGVudi5NT1NUX05FQVJfREFURVRJTUUpO1xuXG4gIG5vdy5zZXRUaW1lKG5vdy5nZXRUaW1lKCkgLSBkYXlzKTtcblxuICByZXR1cm4gbm93O1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHBpY2ssXG4gIGRhdGUsXG4gIHNodWZmbGUsXG4gIG51bWJlcixcbiAgcmFuZGV4cDogX3JhbmRleHAsXG59O1xuIiwiaW1wb3J0IG9wdGlvbkFQSSBmcm9tICcuLi9hcGkvb3B0aW9uJztcbmltcG9ydCBlbnYgZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IHJhbmRvbSBmcm9tICcuL3JhbmRvbSc7XG5cbmZ1bmN0aW9uIGdldExvY2FsUmVmKG9iaiwgcGF0aCwgcmVmcykge1xuICBjb25zdCBrZXlFbGVtZW50cyA9IHBhdGgucmVwbGFjZSgnIy8nLCAnLycpLnNwbGl0KCcvJyk7XG5cbiAgbGV0IHNjaGVtYSA9IG9iai4kcmVmICYmIHJlZnMgPyByZWZzW29iai4kcmVmXSA6IG9iajtcbiAgaWYgKHJlZnMgJiYgcGF0aC5pbmNsdWRlcygnIy8nKSAmJiByZWZzW2tleUVsZW1lbnRzWzBdXSkge1xuICAgIHNjaGVtYSA9IHJlZnNba2V5RWxlbWVudHMuc2hpZnQoKV07XG4gIH1cblxuICBpZiAoIWtleUVsZW1lbnRzWzBdKSBrZXlFbGVtZW50cy5zaGlmdCgpO1xuXG4gIHdoaWxlIChzY2hlbWEgJiYga2V5RWxlbWVudHMubGVuZ3RoID4gMCkge1xuICAgIGNvbnN0IHByb3AgPSBrZXlFbGVtZW50cy5zaGlmdCgpO1xuXG4gICAgaWYgKCFzY2hlbWFbcHJvcF0pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgUHJvcCBub3QgZm91bmQ6ICR7cHJvcH0gKCR7cGF0aH0pYCk7XG4gICAgfVxuXG4gICAgc2NoZW1hID0gc2NoZW1hW3Byb3BdO1xuICB9XG4gIHJldHVybiBzY2hlbWE7XG59XG5cbi8qKlxuICogUmV0dXJucyB0cnVlL2ZhbHNlIHdoZXRoZXIgdGhlIG9iamVjdCBwYXJhbWV0ZXIgaGFzIGl0cyBvd24gcHJvcGVydGllcyBkZWZpbmVkXG4gKlxuICogQHBhcmFtIG9ialxuICogQHBhcmFtIHByb3BlcnRpZXNcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBoYXNQcm9wZXJ0aWVzKG9iaiwgLi4ucHJvcGVydGllcykge1xuICByZXR1cm4gcHJvcGVydGllcy5maWx0ZXIoa2V5ID0+IHtcbiAgICByZXR1cm4gdHlwZW9mIG9ialtrZXldICE9PSAndW5kZWZpbmVkJztcbiAgfSkubGVuZ3RoID4gMDtcbn1cblxuLyoqXG4gKiBOb3JtYWxpemUgZ2VuZXJhdGVkIGRhdGUgWVlZWS1NTS1ERCB0byBub3QgaGF2ZVxuICogb3V0IG9mIHJhbmdlIHZhbHVlc1xuICpcbiAqIEBwYXJhbSB2YWx1ZVxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gY2xhbXBEYXRlKHZhbHVlKSB7XG4gIGlmICh2YWx1ZS5pbmNsdWRlcygnICcpKSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKHZhbHVlKS50b0lTT1N0cmluZygpLnN1YnN0cigwLCAxMCk7XG4gIH1cblxuICBsZXQgW3llYXIsIG1vbnRoLCBkYXldID0gdmFsdWUuc3BsaXQoJ1QnKVswXS5zcGxpdCgnLScpO1xuXG4gIG1vbnRoID0gTWF0aC5tYXgoMSwgTWF0aC5taW4oMTIsIG1vbnRoKSk7XG4gIGRheSA9IE1hdGgubWF4KDEsIE1hdGgubWluKDMxLCBkYXkpKTtcblxuICByZXR1cm4gYCR7eWVhcn0tJHttb250aH0tJHtkYXl9YDtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHR5cGVjYXN0ZWQgdmFsdWUuXG4gKiBFeHRlcm5hbCBnZW5lcmF0b3JzIChmYWtlciwgY2hhbmNlLCBjYXN1YWwpIG1heSByZXR1cm4gZGF0YSBpbiBub24tZXhwZWN0ZWQgZm9ybWF0cywgc3VjaCBhcyBzdHJpbmcsIHdoZW4geW91IG1pZ2h0IGV4cGVjdCBhblxuICogaW50ZWdlci4gVGhpcyBmdW5jdGlvbiBpcyB1c2VkIHRvIGZvcmNlIHRoZSB0eXBlY2FzdC4gVGhpcyBpcyB0aGUgYmFzZSBmb3JtYXR0ZXIgZm9yIGFsbCByZXN1bHQgdmFsdWVzLlxuICpcbiAqIEBwYXJhbSB0eXBlXG4gKiBAcGFyYW0gc2NoZW1hXG4gKiBAcGFyYW0gY2FsbGJhY2tcbiAqIEByZXR1cm5zIHthbnl9XG4gKi9cbmZ1bmN0aW9uIHR5cGVjYXN0KHR5cGUsIHNjaGVtYSwgY2FsbGJhY2spIHtcbiAgY29uc3QgcGFyYW1zID0ge307XG5cbiAgLy8gbm9ybWFsaXplIGNvbnN0cmFpbnRzXG4gIHN3aXRjaCAodHlwZSB8fCBzY2hlbWEudHlwZSkge1xuICAgIGNhc2UgJ2ludGVnZXInOlxuICAgIGNhc2UgJ251bWJlcic6XG4gICAgICBpZiAodHlwZW9mIHNjaGVtYS5taW5pbXVtICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBwYXJhbXMubWluaW11bSA9IHNjaGVtYS5taW5pbXVtO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIHNjaGVtYS5tYXhpbXVtICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBwYXJhbXMubWF4aW11bSA9IHNjaGVtYS5tYXhpbXVtO1xuICAgICAgfVxuXG4gICAgICBpZiAoc2NoZW1hLmVudW0pIHtcbiAgICAgICAgbGV0IG1pbiA9IE1hdGgubWF4KHBhcmFtcy5taW5pbXVtIHx8IDAsIDApO1xuICAgICAgICBsZXQgbWF4ID0gTWF0aC5taW4ocGFyYW1zLm1heGltdW0gfHwgSW5maW5pdHksIEluZmluaXR5KTtcblxuICAgICAgICBpZiAoc2NoZW1hLmV4Y2x1c2l2ZU1pbmltdW0gJiYgbWluID09PSBzY2hlbWEubWluaW11bSkge1xuICAgICAgICAgIG1pbiArPSBzY2hlbWEubXVsdGlwbGVPZiB8fCAxO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNjaGVtYS5leGNsdXNpdmVNYXhpbXVtICYmIG1heCA9PT0gc2NoZW1hLm1heGltdW0pIHtcbiAgICAgICAgICBtYXggLT0gc2NoZW1hLm11bHRpcGxlT2YgfHwgMTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGRpc2NhcmQgb3V0LW9mLWJvdW5kcyBlbnVtZXJhdGlvbnNcbiAgICAgICAgaWYgKG1pbiB8fCBtYXggIT09IEluZmluaXR5KSB7XG4gICAgICAgICAgc2NoZW1hLmVudW0gPSBzY2hlbWEuZW51bS5maWx0ZXIoeCA9PiB7XG4gICAgICAgICAgICBpZiAoeCA+PSBtaW4gJiYgeCA8PSBtYXgpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBicmVhaztcblxuICAgIGNhc2UgJ3N0cmluZyc6IHtcbiAgICAgIHBhcmFtcy5taW5MZW5ndGggPSBvcHRpb25BUEkoJ21pbkxlbmd0aCcpIHx8IDA7XG4gICAgICBwYXJhbXMubWF4TGVuZ3RoID0gb3B0aW9uQVBJKCdtYXhMZW5ndGgnKSB8fCBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUjtcblxuICAgICAgaWYgKHR5cGVvZiBzY2hlbWEubWluTGVuZ3RoICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBwYXJhbXMubWluTGVuZ3RoID0gTWF0aC5tYXgocGFyYW1zLm1pbkxlbmd0aCwgc2NoZW1hLm1pbkxlbmd0aCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2Ygc2NoZW1hLm1heExlbmd0aCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcGFyYW1zLm1heExlbmd0aCA9IE1hdGgubWluKHBhcmFtcy5tYXhMZW5ndGgsIHNjaGVtYS5tYXhMZW5ndGgpO1xuICAgICAgfVxuXG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICBkZWZhdWx0OiBicmVhaztcbiAgfVxuXG4gIC8vIGV4ZWN1dGUgZ2VuZXJhdG9yXG4gIGxldCB2YWx1ZSA9IGNhbGxiYWNrKHBhcmFtcyk7XG5cbiAgLy8gYWxsb3cgbnVsbCB2YWx1ZXMgdG8gYmUgcmV0dXJuZWRcbiAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8vIG5vcm1hbGl6ZSBvdXRwdXQgdmFsdWVcbiAgc3dpdGNoICh0eXBlIHx8IHNjaGVtYS50eXBlKSB7XG4gICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgIHZhbHVlID0gcGFyc2VGbG9hdCh2YWx1ZSk7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgJ2ludGVnZXInOlxuICAgICAgdmFsdWUgPSBwYXJzZUludCh2YWx1ZSwgMTApO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlICdib29sZWFuJzpcbiAgICAgIHZhbHVlID0gISF2YWx1ZTtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSAnc3RyaW5nJzoge1xuICAgICAgdmFsdWUgPSBTdHJpbmcodmFsdWUpO1xuXG4gICAgICBjb25zdCBtaW4gPSBNYXRoLm1heChwYXJhbXMubWluTGVuZ3RoIHx8IDAsIDApO1xuICAgICAgY29uc3QgbWF4ID0gTWF0aC5taW4ocGFyYW1zLm1heExlbmd0aCB8fCBJbmZpbml0eSwgSW5maW5pdHkpO1xuXG4gICAgICBsZXQgcHJldjtcbiAgICAgIGxldCBub0NoYW5nZUNvdW50ID0gMDtcblxuICAgICAgd2hpbGUgKHZhbHVlLmxlbmd0aCA8IG1pbikge1xuICAgICAgICBwcmV2ID0gdmFsdWU7XG5cbiAgICAgICAgaWYgKCFzY2hlbWEucGF0dGVybikge1xuICAgICAgICAgIHZhbHVlICs9IGAke3JhbmRvbS5waWNrKFsnICcsICcvJywgJ18nLCAnLScsICcrJywgJz0nLCAnQCcsICdeJ10pfSR7dmFsdWV9YDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YWx1ZSArPSByYW5kb20ucmFuZGV4cChzY2hlbWEucGF0dGVybik7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBhdm9pZCBpbmZpbml0ZS1sb29wcyB3aGlsZSBmaWxsaW5nIHN0cmluZ3MsIGlmIG5vIGNoYW5nZXNcbiAgICAgICAgLy8gYXJlIG1hZGUgd2UganVzdCBicmVhayB0aGUgbG9vcC4uLiBzZWUgIzU0MFxuICAgICAgICBpZiAodmFsdWUgPT09IHByZXYpIHtcbiAgICAgICAgICBub0NoYW5nZUNvdW50ICs9IDE7XG4gICAgICAgICAgaWYgKG5vQ2hhbmdlQ291bnQgPT09IDMpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBub0NoYW5nZUNvdW50ID0gMDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAodmFsdWUubGVuZ3RoID4gbWF4KSB7XG4gICAgICAgIHZhbHVlID0gdmFsdWUuc3Vic3RyKDAsIG1heCk7XG4gICAgICB9XG5cbiAgICAgIHN3aXRjaCAoc2NoZW1hLmZvcm1hdCkge1xuICAgICAgICBjYXNlICdkYXRlLXRpbWUnOlxuICAgICAgICBjYXNlICdkYXRldGltZSc6XG4gICAgICAgICAgdmFsdWUgPSBuZXcgRGF0ZShjbGFtcERhdGUodmFsdWUpKS50b0lTT1N0cmluZygpLnJlcGxhY2UoLyhbMC05XSkwK1okLywgJyQxWicpO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ2Z1bGwtZGF0ZSc6XG4gICAgICAgIGNhc2UgJ2RhdGUnOlxuICAgICAgICAgIHZhbHVlID0gbmV3IERhdGUoY2xhbXBEYXRlKHZhbHVlKSkudG9JU09TdHJpbmcoKS5zdWJzdHIoMCwgMTApO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ3RpbWUnOlxuICAgICAgICAgIHZhbHVlID0gbmV3IERhdGUoYDE5NjktMDEtMDEgJHt2YWx1ZX1gKS50b0lTT1N0cmluZygpLnN1YnN0cigxMSk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGRlZmF1bHQ6IGJyZWFrO1xuICB9XG5cbiAgcmV0dXJuIHZhbHVlO1xufVxuXG5mdW5jdGlvbiBtZXJnZShhLCBiKSB7XG4gIE9iamVjdC5rZXlzKGIpLmZvckVhY2goa2V5ID0+IHtcbiAgICBpZiAodHlwZW9mIGJba2V5XSAhPT0gJ29iamVjdCcgfHwgYltrZXldID09PSBudWxsKSB7XG4gICAgICBhW2tleV0gPSBiW2tleV07XG4gICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGJba2V5XSkpIHtcbiAgICAgIGFba2V5XSA9IGFba2V5XSB8fCBbXTtcbiAgICAgIC8vIGZpeCAjMjkyIC0gc2tpcCBkdXBsaWNhdGVkIHZhbHVlcyBmcm9tIG1lcmdlIG9iamVjdCAoYilcbiAgICAgIGJba2V5XS5mb3JFYWNoKHZhbHVlID0+IHtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoYVtrZXldKSAmJiBhW2tleV0uaW5kZXhPZih2YWx1ZSkgPT09IC0xKSB7XG4gICAgICAgICAgYVtrZXldLnB1c2godmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBhW2tleV0gIT09ICdvYmplY3QnIHx8IGFba2V5XSA9PT0gbnVsbCB8fCBBcnJheS5pc0FycmF5KGFba2V5XSkpIHtcbiAgICAgIGFba2V5XSA9IG1lcmdlKHt9LCBiW2tleV0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBhW2tleV0gPSBtZXJnZShhW2tleV0sIGJba2V5XSk7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gYTtcbn1cblxuZnVuY3Rpb24gY2xvbmUob2JqLCBjYWNoZSA9IG5ldyBNYXAoKSkge1xuICBpZiAoIW9iaiB8fCB0eXBlb2Ygb2JqICE9PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBvYmo7XG4gIH1cblxuICBpZiAoY2FjaGUuaGFzKG9iaikpIHtcbiAgICByZXR1cm4gY2FjaGUuZ2V0KG9iaik7XG4gIH1cblxuICBpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XG4gICAgY29uc3QgYXJyID0gW107XG4gICAgY2FjaGUuc2V0KG9iaiwgYXJyKTtcblxuICAgIGFyci5wdXNoKC4uLm9iai5tYXAoeCA9PiBjbG9uZSh4LCBjYWNoZSkpKTtcbiAgICByZXR1cm4gYXJyO1xuICB9XG5cbiAgY29uc3QgY2xvbmVkT2JqID0ge307XG4gIGNhY2hlLnNldChvYmosIGNsb25lZE9iaik7XG5cbiAgcmV0dXJuIE9iamVjdC5rZXlzKG9iaikucmVkdWNlKChwcmV2LCBjdXIpID0+IHtcbiAgICBwcmV2W2N1cl0gPSBjbG9uZShvYmpbY3VyXSwgY2FjaGUpO1xuICAgIHJldHVybiBwcmV2O1xuICB9LCBjbG9uZWRPYmopO1xufVxuXG5mdW5jdGlvbiBzaG9ydChzY2hlbWEpIHtcbiAgY29uc3QgcyA9IEpTT04uc3RyaW5naWZ5KHNjaGVtYSk7XG4gIGNvbnN0IGwgPSBKU09OLnN0cmluZ2lmeShzY2hlbWEsIG51bGwsIDIpO1xuXG4gIHJldHVybiBzLmxlbmd0aCA+IDQwMCA/IGAke2wuc3Vic3RyKDAsIDQwMCl9Li4uYCA6IGw7XG59XG5cbmZ1bmN0aW9uIGFueVZhbHVlKCkge1xuICByZXR1cm4gcmFuZG9tLnBpY2soW1xuICAgIGZhbHNlLFxuICAgIHRydWUsXG4gICAgbnVsbCxcbiAgICAtMSxcbiAgICBOYU4sXG4gICAgTWF0aC5QSSxcbiAgICBJbmZpbml0eSxcbiAgICB1bmRlZmluZWQsXG4gICAgW10sXG4gICAge30sXG4gICAgLy8gRklYTUU6IHVzZSBidWlsdC1pbiByYW5kb20/XG4gICAgTWF0aC5yYW5kb20oKSxcbiAgICBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHIoMiksXG4gIF0pO1xufVxuXG5mdW5jdGlvbiBub3RWYWx1ZShzY2hlbWEsIHBhcmVudCkge1xuICBjb25zdCBjb3B5ID0gbWVyZ2Uoe30sIHBhcmVudCk7XG5cbiAgaWYgKHR5cGVvZiBzY2hlbWEubWluaW11bSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBjb3B5Lm1heGltdW0gPSBzY2hlbWEubWluaW11bTtcbiAgICBjb3B5LmV4Y2x1c2l2ZU1heGltdW0gPSB0cnVlO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBzY2hlbWEubWF4aW11bSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBjb3B5Lm1pbmltdW0gPSBzY2hlbWEubWF4aW11bSA+IGNvcHkubWF4aW11bSA/IDAgOiBzY2hlbWEubWF4aW11bTtcbiAgICBjb3B5LmV4Y2x1c2l2ZU1pbmltdW0gPSB0cnVlO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBzY2hlbWEubWluTGVuZ3RoICE9PSAndW5kZWZpbmVkJykge1xuICAgIGNvcHkubWF4TGVuZ3RoID0gc2NoZW1hLm1pbkxlbmd0aDtcbiAgfVxuXG4gIGlmICh0eXBlb2Ygc2NoZW1hLm1heExlbmd0aCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBjb3B5Lm1pbkxlbmd0aCA9IHNjaGVtYS5tYXhMZW5ndGggPiBjb3B5Lm1heExlbmd0aCA/IDAgOiBzY2hlbWEubWF4TGVuZ3RoO1xuICB9XG5cbiAgaWYgKHNjaGVtYS50eXBlKSB7XG4gICAgY29weS50eXBlID0gcmFuZG9tLnBpY2soZW52LlNDQUxBUl9UWVBFUy5maWx0ZXIoeCA9PiB7XG4gICAgICBjb25zdCB0eXBlcyA9IEFycmF5LmlzQXJyYXkoc2NoZW1hLnR5cGUpID8gc2NoZW1hLnR5cGUgOiBbc2NoZW1hLnR5cGVdO1xuXG4gICAgICByZXR1cm4gdHlwZXMuZXZlcnkodHlwZSA9PiB7XG4gICAgICAgIC8vIHRyZWF0IGJvdGggdHlwZXMgYXMgX3NpbWlsYXIgZW5vdWdoXyB0byBiZSBza2lwcGVkIGVxdWFsXG4gICAgICAgIGlmICh4ID09PSAnbnVtYmVyJyB8fCB4ID09PSAnaW50ZWdlcicpIHtcbiAgICAgICAgICByZXR1cm4gdHlwZSAhPT0gJ251bWJlcicgJiYgdHlwZSAhPT0gJ2ludGVnZXInO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHggIT09IHR5cGU7XG4gICAgICB9KTtcbiAgICB9KSk7XG4gIH0gZWxzZSBpZiAoc2NoZW1hLmVudW0pIHtcbiAgICBsZXQgdmFsdWU7XG5cbiAgICBkbyB7XG4gICAgICB2YWx1ZSA9IGFueVZhbHVlKCk7XG4gICAgfSB3aGlsZSAoc2NoZW1hLmVudW0uaW5kZXhPZih2YWx1ZSkgIT09IC0xKTtcblxuICAgIGNvcHkuZW51bSA9IFt2YWx1ZV07XG4gIH1cblxuICBpZiAoc2NoZW1hLnJlcXVpcmVkICYmIGNvcHkucHJvcGVydGllcykge1xuICAgIHNjaGVtYS5yZXF1aXJlZC5mb3JFYWNoKHByb3AgPT4ge1xuICAgICAgZGVsZXRlIGNvcHkucHJvcGVydGllc1twcm9wXTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIFRPRE86IGV4cGxvcmUgbW9yZSBzY2VuYXJpb3NcblxuICByZXR1cm4gY29weTtcbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVWYWx1ZUZvclNjaGVtYSh2YWx1ZSwgc2NoZW1hKSB7XG4gIGNvbnN0IHNjaGVtYUhhc01pbiA9IHNjaGVtYS5taW5pbXVtICE9PSB1bmRlZmluZWQ7XG4gIGNvbnN0IHNjaGVtYUhhc01heCA9IHNjaGVtYS5tYXhpbXVtICE9PSB1bmRlZmluZWQ7XG5cbiAgcmV0dXJuIChcbiAgICAoc2NoZW1hSGFzTWluIHx8IHNjaGVtYUhhc01heClcbiAgICAmJiAoIXNjaGVtYUhhc01pbiB8fCB2YWx1ZSA+PSBzY2hlbWEubWluaW11bSlcbiAgICAmJiAoIXNjaGVtYUhhc01heCB8fCB2YWx1ZSA8PSBzY2hlbWEubWF4aW11bSlcbiAgKTtcbn1cblxuLy8gRklYTUU6IGV2YWx1YXRlIG1vcmUgY29uc3RyYWludHM/XG5mdW5jdGlvbiB2YWxpZGF0ZSh2YWx1ZSwgc2NoZW1hcykge1xuICByZXR1cm4gIXNjaGVtYXMuZXZlcnkoc2NoZW1hID0+IHZhbGlkYXRlVmFsdWVGb3JTY2hlbWEodmFsdWUsIHNjaGVtYSkpO1xufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZVZhbHVlRm9yT25lT2YodmFsdWUsIG9uZU9mKSB7XG4gIGNvbnN0IHZhbGlkQ291bnQgPSBvbmVPZi5yZWR1Y2UoKGNvdW50LCBzY2hlbWEpID0+IChjb3VudCArICgodmFsaWRhdGVWYWx1ZUZvclNjaGVtYSh2YWx1ZSwgc2NoZW1hKSkgPyAxIDogMCkpLCAwKTtcbiAgcmV0dXJuIHZhbGlkQ291bnQgPT09IDE7XG59XG5cbmZ1bmN0aW9uIGlzS2V5KHByb3ApIHtcbiAgcmV0dXJuIFsnZW51bScsICdjb25zdCcsICdkZWZhdWx0JywgJ2V4YW1wbGVzJywgJ3JlcXVpcmVkJywgJ2RlZmluaXRpb25zJywgJ2l0ZW1zJywgJ3Byb3BlcnRpZXMnXS5pbmNsdWRlcyhwcm9wKTtcbn1cblxuZnVuY3Rpb24gb21pdFByb3BzKG9iaiwgcHJvcHMpIHtcbiAgcmV0dXJuIE9iamVjdC5rZXlzKG9iailcbiAgICAuZmlsdGVyKGtleSA9PiAhcHJvcHMuaW5jbHVkZXMoa2V5KSlcbiAgICAucmVkdWNlKChjb3B5LCBrKSA9PiB7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShvYmpba10pKSB7XG4gICAgICAgIGNvcHlba10gPSBvYmpba10uc2xpY2UoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvcHlba10gPSBvYmpba10gaW5zdGFuY2VvZiBPYmplY3RcbiAgICAgICAgICA/IG1lcmdlKHt9LCBvYmpba10pXG4gICAgICAgICAgOiBvYmpba107XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb3B5O1xuICAgIH0sIHt9KTtcbn1cblxuZnVuY3Rpb24gdGVtcGxhdGUodmFsdWUsIHNjaGVtYSkge1xuICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICByZXR1cm4gdmFsdWUubWFwKHggPT4gdGVtcGxhdGUoeCwgc2NoZW1hKSk7XG4gIH1cblxuICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZSgvI1xceyhbXFx3Li1dKylcXH0vZywgKF8sICQxKSA9PiBzY2hlbWFbJDFdKTtcbiAgfVxuXG4gIHJldHVybiB2YWx1ZTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgZ2l2ZW4gb2JqZWN0IGlzIGVtcHR5IChoYXMgbm8gcHJvcGVydGllcylcbiAqXG4gKiBAcGFyYW0gdmFsdWVcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBpc0VtcHR5KHZhbHVlKSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpID09PSAnW29iamVjdCBPYmplY3RdJyAmJiAhT2JqZWN0LmtleXModmFsdWUpLmxlbmd0aDtcbn1cblxuLyoqXG4gKiBDaGVja3MgZ2l2ZW4ga2V5IGlzIHJlcXVpcmVkIG9yIGlmIHNvdXJjZSBvYmplY3Qgd2FzIGNyZWF0ZWQgYnkgYSBzdWJyb3V0aW5lIChhbHJlYWR5IGNsZWFuZWQpXG4gKlxuICogQHBhcmFtIGtleVxuICogQHBhcmFtIHNjaGVtYVxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIHNob3VsZENsZWFuKGtleSwgc2NoZW1hKSB7XG4gIGNvbnN0IGlzUmVxdWlyZWQgPSBBcnJheS5pc0FycmF5KHNjaGVtYS5yZXF1aXJlZCkgJiYgc2NoZW1hLnJlcXVpcmVkLmluY2x1ZGVzKGtleSk7XG4gIGNvbnN0IHdhc0NsZWFuZWQgPSB0eXBlb2Ygc2NoZW1hLnRodW5rID09PSAnZnVuY3Rpb24nIHx8IChzY2hlbWEuYWRkaXRpb25hbFByb3BlcnRpZXMgJiYgdHlwZW9mIHNjaGVtYS5hZGRpdGlvbmFsUHJvcGVydGllcy50aHVuayA9PT0gJ2Z1bmN0aW9uJyk7XG5cbiAgcmV0dXJuICFpc1JlcXVpcmVkICYmICF3YXNDbGVhbmVkO1xufVxuXG4vKipcbiAqIENsZWFucyB1cCB0aGUgc291cmNlIG9iamVjdCByZW1vdmluZyBlbXB0eSBvYmplY3RzIGFuZCB1bmRlZmluZWQgdmFsdWVzXG4gKiBXaWxsIG5vdCByZW1vdmUgdmFsdWVzIHdoaWNoIGFyZSBzcGVjaWZpZWQgYXMgYHJlcXVpcmVkYFxuICpcbiAqIEBwYXJhbSBvYmpcbiAqIEBwYXJhbSBzY2hlbWFcbiAqIEBwYXJhbSBpc0FycmF5XG4gKiBAcmV0dXJucyB7YW55fVxuICovXG5mdW5jdGlvbiBjbGVhbihvYmosIHNjaGVtYSwgaXNBcnJheSA9IGZhbHNlKSB7XG4gIGlmICghb2JqIHx8IHR5cGVvZiBvYmogIT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIG9iajtcbiAgfVxuXG4gIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcbiAgICByZXR1cm4gb2JqXG4gICAgICAubWFwKHZhbHVlID0+IGNsZWFuKHZhbHVlLCBzY2hlbWEsIHRydWUpKVxuICAgICAgLmZpbHRlcih2YWx1ZSA9PiB0eXBlb2YgdmFsdWUgIT09ICd1bmRlZmluZWQnKTtcbiAgfVxuXG4gIE9iamVjdC5rZXlzKG9iaikuZm9yRWFjaChrID0+IHtcbiAgICBpZiAoaXNFbXB0eShvYmpba10pKSB7XG4gICAgICBpZiAoc2hvdWxkQ2xlYW4oaywgc2NoZW1hKSkge1xuICAgICAgICBkZWxldGUgb2JqW2tdO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IGNsZWFuKG9ialtrXSwgc2NoZW1hKTtcblxuICAgICAgaWYgKCFpc0VtcHR5KHZhbHVlKSkge1xuICAgICAgICBvYmpba10gPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHR5cGVvZiBvYmpba10gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBkZWxldGUgb2JqW2tdO1xuICAgIH1cbiAgfSk7XG5cbiAgaWYgKCFPYmplY3Qua2V5cyhvYmopLmxlbmd0aCAmJiBpc0FycmF5KSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIHJldHVybiBvYmo7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgaGFzUHJvcGVydGllcyxcbiAgZ2V0TG9jYWxSZWYsXG4gIG9taXRQcm9wcyxcbiAgdHlwZWNhc3QsXG4gIG1lcmdlLFxuICBjbG9uZSxcbiAgc2hvcnQsXG4gIG5vdFZhbHVlLFxuICBhbnlWYWx1ZSxcbiAgdmFsaWRhdGUsXG4gIHZhbGlkYXRlVmFsdWVGb3JTY2hlbWEsXG4gIHZhbGlkYXRlVmFsdWVGb3JPbmVPZixcbiAgaXNLZXksXG4gIHRlbXBsYXRlLFxuICBzaG91bGRDbGVhbixcbiAgY2xlYW4sXG4gIGlzRW1wdHksXG4gIGNsYW1wRGF0ZSxcbn07XG4iLCJpbXBvcnQgdXRpbCBmcm9tICcuLi9jb3JlL3V0aWxzJztcblxuLy8gZHluYW1pYyBwcm94eSBmb3IgY3VzdG9tIGdlbmVyYXRvcnNcbmZ1bmN0aW9uIHByb3h5KGdlbikge1xuICByZXR1cm4gKHZhbHVlLCBzY2hlbWEsIHByb3BlcnR5LCByb290U2NoZW1hKSA9PiB7XG4gICAgbGV0IGZuID0gdmFsdWU7XG4gICAgbGV0IGFyZ3MgPSBbXTtcblxuICAgIC8vIHN1cHBvcnQgZm9yIG5lc3RlZCBvYmplY3QsIGZpcnN0LWtleSBpcyB0aGUgZ2VuZXJhdG9yXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGZuID0gT2JqZWN0LmtleXModmFsdWUpWzBdO1xuXG4gICAgICAvLyB0cmVhdCB0aGUgZ2l2ZW4gYXJyYXkgYXMgYXJndW1lbnRzLFxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWVbZm5dKSkge1xuICAgICAgICAvLyBpZiB0aGUgZ2VuZXJhdG9yIGlzIGV4cGVjdGluZyBhcnJheXMgdGhleSBzaG91bGQgYmUgbmVzdGVkLCBlLmcuIGBbWzEsIDIsIDNdLCB0cnVlLCAuLi5dYFxuICAgICAgICBhcmdzID0gdmFsdWVbZm5dO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYXJncy5wdXNoKHZhbHVlW2ZuXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gc3VwcG9ydCBmb3Iga2V5cGF0aHMsIGUuZy4gXCJpbnRlcm5ldC5lbWFpbFwiXG4gICAgY29uc3QgcHJvcHMgPSBmbi5zcGxpdCgnLicpO1xuXG4gICAgLy8gcmV0cmlldmUgYSBmcmVzaCBkZXBlbmRlbmN5XG4gICAgbGV0IGN0eCA9IGdlbigpO1xuXG4gICAgd2hpbGUgKHByb3BzLmxlbmd0aCA+IDEpIHtcbiAgICAgIGN0eCA9IGN0eFtwcm9wcy5zaGlmdCgpXTtcbiAgICB9XG5cbiAgICAvLyByZXRyaWV2ZSBsYXN0IHZhbHVlIGZyb20gY29udGV4dCBvYmplY3RcbiAgICB2YWx1ZSA9IHR5cGVvZiBjdHggPT09ICdvYmplY3QnID8gY3R4W3Byb3BzWzBdXSA6IGN0eDtcblxuICAgIC8vIGludm9rZSBkeW5hbWljIGdlbmVyYXRvcnNcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB2YWx1ZSA9IHZhbHVlLmFwcGx5KGN0eCwgYXJncy5tYXAoeCA9PiB1dGlsLnRlbXBsYXRlKHgsIHJvb3RTY2hlbWEpKSk7XG4gICAgfVxuXG4gICAgLy8gdGVzdCBmb3IgcGVuZGluZyBjYWxsYmFja3NcbiAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKSA9PT0gJ1tvYmplY3QgT2JqZWN0XScpIHtcbiAgICAgIE9iamVjdC5rZXlzKHZhbHVlKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWVba2V5XSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgQ2Fubm90IHJlc29sdmUgdmFsdWUgZm9yICcke3Byb3BlcnR5fTogJHtmbn0nLCBnaXZlbjogJHt2YWx1ZX1gKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbHVlO1xuICB9O1xufVxuXG4vKipcbiAqIENvbnRhaW5lciBpcyB1c2VkIHRvIHdyYXAgZXh0ZXJuYWwgZ2VuZXJhdG9ycyAoZmFrZXIsIGNoYW5jZSwgY2FzdWFsLCBldGMuKSBhbmQgaXRzIGRlcGVuZGVuY2llcy5cbiAqXG4gKiAtIGBqc2YuZXh0ZW5kKCdmYWtlcicpYCB3aWxsIGVuaGFuY2Ugb3IgZGVmaW5lIHRoZSBnaXZlbiBkZXBlbmRlbmN5LlxuICogLSBganNmLmRlZmluZSgnZmFrZXInKWAgd2lsbCBwcm92aWRlIHRoZSBcImZha2VyXCIga2V5d29yZCBzdXBwb3J0LlxuICpcbiAqIFJhbmRFeHAgaXMgbm90IGxvbmdlciBjb25zaWRlcmVkIGFuIFwiZXh0ZW5zaW9uXCIuXG4gKi9cbmNsYXNzIENvbnRhaW5lciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIC8vIGR5bmFtaWMgcmVxdWlyZXMgLSBoYW5kbGUgYWxsIGRlcGVuZGVuY2llc1xuICAgIC8vIHRoZXkgd2lsbCBOT1QgYmUgaW5jbHVkZWQgb24gdGhlIGJ1bmRsZVxuICAgIHRoaXMucmVnaXN0cnkgPSB7fTtcbiAgICB0aGlzLnN1cHBvcnQgPSB7fTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVbnJlZ2lzdGVyIGV4dGVuc2lvbnNcbiAgICogQHBhcmFtIG5hbWVcbiAgICovXG4gIHJlc2V0KG5hbWUpIHtcbiAgICBpZiAoIW5hbWUpIHtcbiAgICAgIHRoaXMucmVnaXN0cnkgPSB7fTtcbiAgICAgIHRoaXMuc3VwcG9ydCA9IHt9O1xuICAgIH0gZWxzZSB7XG4gICAgICBkZWxldGUgdGhpcy5yZWdpc3RyeVtuYW1lXTtcbiAgICAgIGRlbGV0ZSB0aGlzLnN1cHBvcnRbbmFtZV07XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE92ZXJyaWRlIGRlcGVuZGVuY3kgZ2l2ZW4gYnkgbmFtZVxuICAgKiBAcGFyYW0gbmFtZVxuICAgKiBAcGFyYW0gY2FsbGJhY2tcbiAgICovXG4gIGV4dGVuZChuYW1lLCBjYWxsYmFjaykge1xuICAgIHRoaXMucmVnaXN0cnlbbmFtZV0gPSBjYWxsYmFjayh0aGlzLnJlZ2lzdHJ5W25hbWVdKTtcblxuICAgIC8vIGJ1aWx0LWluIHByb3h5IChjYW4gYmUgb3ZlcnJpZGRlbilcbiAgICBpZiAoIXRoaXMuc3VwcG9ydFtuYW1lXSkge1xuICAgICAgdGhpcy5zdXBwb3J0W25hbWVdID0gcHJveHkoKCkgPT4gdGhpcy5yZWdpc3RyeVtuYW1lXSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNldCBrZXl3b3JkIHN1cHBvcnQgYnkgbmFtZVxuICAgKiBAcGFyYW0gbmFtZVxuICAgKiBAcGFyYW0gY2FsbGJhY2tcbiAgICovXG4gIGRlZmluZShuYW1lLCBjYWxsYmFjaykge1xuICAgIHRoaXMuc3VwcG9ydFtuYW1lXSA9IGNhbGxiYWNrO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgZGVwZW5kZW5jeSBnaXZlbiBieSBuYW1lXG4gICAqIEBwYXJhbSBuYW1lXG4gICAqIEByZXR1cm5zIHtEZXBlbmRlbmN5fVxuICAgKi9cbiAgZ2V0KG5hbWUpIHtcbiAgICBpZiAodHlwZW9mIHRoaXMucmVnaXN0cnlbbmFtZV0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoYCcke25hbWV9JyBkZXBlbmRlbmN5IGRvZXNuJ3QgZXhpc3QuYCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnJlZ2lzdHJ5W25hbWVdO1xuICB9XG5cbiAgLyoqXG4gICAqIEFwcGx5IGEgY3VzdG9tIGtleXdvcmRcbiAgICogQHBhcmFtIHNjaGVtYVxuICAgKi9cbiAgd3JhcChzY2hlbWEpIHtcbiAgICBpZiAoISgnZ2VuZXJhdGUnIGluIHNjaGVtYSkpIHtcbiAgICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhzY2hlbWEpO1xuICAgICAgY29uc3QgY29udGV4dCA9IHt9O1xuXG4gICAgICBsZXQgbGVuZ3RoID0ga2V5cy5sZW5ndGg7XG5cbiAgICAgIHdoaWxlIChsZW5ndGgtLSkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICAgIGNvbnN0IGZuID0ga2V5c1tsZW5ndGhdLnJlcGxhY2UoL154LS8sICcnKTtcbiAgICAgICAgY29uc3QgZ2VuID0gdGhpcy5zdXBwb3J0W2ZuXTtcblxuICAgICAgICBpZiAodHlwZW9mIGdlbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShzY2hlbWEsICdnZW5lcmF0ZScsIHtcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIHZhbHVlOiAocm9vdFNjaGVtYSwga2V5KSA9PiBnZW4uY2FsbChjb250ZXh0LCBzY2hlbWFba2V5c1tsZW5ndGhdXSwgc2NoZW1hLCBrZXlzW2xlbmd0aF0sIHJvb3RTY2hlbWEsIGtleS5zbGljZSgpKSwgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzY2hlbWE7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ29udGFpbmVyO1xuIiwiaW1wb3J0IFJlZ2lzdHJ5IGZyb20gJy4uL2NsYXNzL1JlZ2lzdHJ5JztcblxuLy8gaW5zdGFudGlhdGVcbmNvbnN0IHJlZ2lzdHJ5ID0gbmV3IFJlZ2lzdHJ5KCk7XG5cbi8qKlxuICogQ3VzdG9tIGZvcm1hdCBBUElcbiAqXG4gKiBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9qc29uLXNjaGVtYS1mYWtlci9qc29uLXNjaGVtYS1mYWtlciNjdXN0b20tZm9ybWF0c1xuICogQHBhcmFtIG5hbWVPckZvcm1hdE1hcFxuICogQHBhcmFtIGNhbGxiYWNrXG4gKiBAcmV0dXJucyB7YW55fVxuICovXG5mdW5jdGlvbiBmb3JtYXRBUEkobmFtZU9yRm9ybWF0TWFwLCBjYWxsYmFjaykge1xuICBpZiAodHlwZW9mIG5hbWVPckZvcm1hdE1hcCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4gcmVnaXN0cnkubGlzdCgpO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBuYW1lT3JGb3JtYXRNYXAgPT09ICdzdHJpbmcnKSB7XG4gICAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmVnaXN0cnkucmVnaXN0ZXIobmFtZU9yRm9ybWF0TWFwLCBjYWxsYmFjayk7XG4gICAgfSBlbHNlIGlmIChjYWxsYmFjayA9PT0gbnVsbCB8fCBjYWxsYmFjayA9PT0gZmFsc2UpIHtcbiAgICAgIHJlZ2lzdHJ5LnVucmVnaXN0ZXIobmFtZU9yRm9ybWF0TWFwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHJlZ2lzdHJ5LmdldChuYW1lT3JGb3JtYXRNYXApO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICByZWdpc3RyeS5yZWdpc3Rlck1hbnkobmFtZU9yRm9ybWF0TWFwKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBmb3JtYXRBUEk7XG4iLCJjbGFzcyBQYXJzZUVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICBjb25zdHJ1Y3RvcihtZXNzYWdlLCBwYXRoKSB7XG4gICAgc3VwZXIoKTtcbiAgICBpZiAoRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UpIHtcbiAgICAgIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKHRoaXMsIHRoaXMuY29uc3RydWN0b3IpO1xuICAgIH1cbiAgICB0aGlzLm5hbWUgPSAnUGFyc2VFcnJvcic7XG4gICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgICB0aGlzLnBhdGggPSBwYXRoO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBhcnNlRXJyb3I7XG4iLCJjb25zdCBpbmZlcnJlZFByb3BlcnRpZXMgPSB7XG4gIGFycmF5OiBbXG4gICAgJ2FkZGl0aW9uYWxJdGVtcycsXG4gICAgJ2l0ZW1zJyxcbiAgICAnbWF4SXRlbXMnLFxuICAgICdtaW5JdGVtcycsXG4gICAgJ3VuaXF1ZUl0ZW1zJyxcbiAgXSxcbiAgaW50ZWdlcjogW1xuICAgICdleGNsdXNpdmVNYXhpbXVtJyxcbiAgICAnZXhjbHVzaXZlTWluaW11bScsXG4gICAgJ21heGltdW0nLFxuICAgICdtaW5pbXVtJyxcbiAgICAnbXVsdGlwbGVPZicsXG4gIF0sXG4gIG9iamVjdDogW1xuICAgICdhZGRpdGlvbmFsUHJvcGVydGllcycsXG4gICAgJ2RlcGVuZGVuY2llcycsXG4gICAgJ21heFByb3BlcnRpZXMnLFxuICAgICdtaW5Qcm9wZXJ0aWVzJyxcbiAgICAncGF0dGVyblByb3BlcnRpZXMnLFxuICAgICdwcm9wZXJ0aWVzJyxcbiAgICAncmVxdWlyZWQnLFxuICBdLFxuICBzdHJpbmc6IFtcbiAgICAnbWF4TGVuZ3RoJyxcbiAgICAnbWluTGVuZ3RoJyxcbiAgICAncGF0dGVybicsXG4gICAgJ2Zvcm1hdCcsXG4gIF0sXG59O1xuXG5pbmZlcnJlZFByb3BlcnRpZXMubnVtYmVyID0gaW5mZXJyZWRQcm9wZXJ0aWVzLmludGVnZXI7XG5cbmNvbnN0IHN1YnNjaGVtYVByb3BlcnRpZXMgPSBbXG4gICdhZGRpdGlvbmFsSXRlbXMnLFxuICAnaXRlbXMnLFxuICAnYWRkaXRpb25hbFByb3BlcnRpZXMnLFxuICAnZGVwZW5kZW5jaWVzJyxcbiAgJ3BhdHRlcm5Qcm9wZXJ0aWVzJyxcbiAgJ3Byb3BlcnRpZXMnLFxuXTtcblxuLyoqXG4gKiBJdGVyYXRlcyB0aHJvdWdoIGFsbCBrZXlzIG9mIGBvYmpgIGFuZDpcbiAqIC0gY2hlY2tzIHdoZXRoZXIgdGhvc2Uga2V5cyBtYXRjaCBwcm9wZXJ0aWVzIG9mIGEgZ2l2ZW4gaW5mZXJyZWQgdHlwZVxuICogLSBtYWtlcyBzdXJlIHRoYXQgYG9iamAgaXMgbm90IGEgc3Vic2NoZW1hOyBfRG8gbm90IGF0dGVtcHQgdG8gaW5mZXIgcHJvcGVydGllcyBuYW1lZCBhcyBzdWJzY2hlbWEgY29udGFpbmVycy4gVGhlXG4gKiByZWFzb24gZm9yIHRoaXMgaXMgdGhhdCBhbnkgcHJvcGVydHkgbmFtZSB3aXRoaW4gdGhvc2UgY29udGFpbmVycyB0aGF0IG1hdGNoZXMgb25lIG9mIHRoZSBwcm9wZXJ0aWVzIHVzZWQgZm9yXG4gKiBpbmZlcnJpbmcgbWlzc2luZyB0eXBlIHZhbHVlcyBjYXVzZXMgdGhlIGNvbnRhaW5lciBpdHNlbGYgdG8gZ2V0IHByb2Nlc3NlZCB3aGljaCBsZWFkcyB0byBpbnZhbGlkIG91dHB1dC4gKElzc3VlIDYyKV9cbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gbWF0Y2hlc1R5cGUob2JqLCBsYXN0RWxlbWVudEluUGF0aCwgaW5mZXJyZWRUeXBlUHJvcGVydGllcykge1xuICByZXR1cm4gT2JqZWN0LmtleXMob2JqKS5maWx0ZXIocHJvcCA9PiB7XG4gICAgY29uc3QgaXNTdWJzY2hlbWEgPSBzdWJzY2hlbWFQcm9wZXJ0aWVzLmluZGV4T2YobGFzdEVsZW1lbnRJblBhdGgpID4gLTE7XG4gICAgY29uc3QgaW5mZXJyZWRQcm9wZXJ0eUZvdW5kID0gaW5mZXJyZWRUeXBlUHJvcGVydGllcy5pbmRleE9mKHByb3ApID4gLTE7XG5cbiAgICBpZiAoaW5mZXJyZWRQcm9wZXJ0eUZvdW5kICYmICFpc1N1YnNjaGVtYSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9KS5sZW5ndGggPiAwO1xufVxuXG4vKipcbiAqIENoZWNrcyB3aGV0aGVyIGdpdmVuIGBvYmpgIHR5cGUgbWlnaHQgYmUgaW5mZXJyZWQuIFRoZSBtZWNoYW5pc20gaXRlcmF0ZXMgdGhyb3VnaCBhbGwgaW5mZXJyZWQgdHlwZXMgZGVmaW5pdGlvbnMsXG4gKiB0cmllcyB0byBtYXRjaCBhbGxvd2VkIHByb3BlcnRpZXMgd2l0aCBwcm9wZXJ0aWVzIG9mIGdpdmVuIGBvYmpgLiBSZXR1cm5zIHR5cGUgbmFtZSwgaWYgaW5mZXJyZWQsIG9yIG51bGwuXG4gKlxuICogQHJldHVybnMge3N0cmluZ3xudWxsfVxuICovXG5mdW5jdGlvbiBpbmZlclR5cGUob2JqLCBzY2hlbWFQYXRoKSB7XG4gIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhpbmZlcnJlZFByb3BlcnRpZXMpO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkgKz0gMSkge1xuICAgIGNvbnN0IHR5cGVOYW1lID0ga2V5c1tpXTtcbiAgICBjb25zdCBsYXN0RWxlbWVudEluUGF0aCA9IHNjaGVtYVBhdGhbc2NoZW1hUGF0aC5sZW5ndGggLSAxXTtcblxuICAgIGlmIChtYXRjaGVzVHlwZShvYmosIGxhc3RFbGVtZW50SW5QYXRoLCBpbmZlcnJlZFByb3BlcnRpZXNbdHlwZU5hbWVdKSkge1xuICAgICAgcmV0dXJuIHR5cGVOYW1lO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBpbmZlclR5cGU7XG4iLCJpbXBvcnQgb3B0aW9uQVBJIGZyb20gJy4uL2FwaS9vcHRpb24nO1xuXG4vKipcbiAqIEdlbmVyYXRlcyByYW5kb21pemVkIGJvb2xlYW4gdmFsdWUuXG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGJvb2xlYW5HZW5lcmF0b3IoKSB7XG4gIHJldHVybiBvcHRpb25BUEkoJ3JhbmRvbScpKCkgPiAwLjU7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJvb2xlYW5HZW5lcmF0b3I7XG4iLCJpbXBvcnQgYm9vbGVhbkdlbmVyYXRvciBmcm9tICcuLi9nZW5lcmF0b3JzL2Jvb2xlYW4nO1xuXG5jb25zdCBib29sZWFuVHlwZSA9IGJvb2xlYW5HZW5lcmF0b3I7XG5cbmV4cG9ydCBkZWZhdWx0IGJvb2xlYW5UeXBlO1xuIiwiLyoqXG4gKiBHZW5lcmF0ZXMgbnVsbCB2YWx1ZS5cbiAqXG4gKiBAcmV0dXJucyB7bnVsbH1cbiAqL1xuZnVuY3Rpb24gbnVsbEdlbmVyYXRvcigpIHtcbiAgcmV0dXJuIG51bGw7XG59XG5cbmV4cG9ydCBkZWZhdWx0IG51bGxHZW5lcmF0b3I7XG4iLCJpbXBvcnQgbnVsbEdlbmVyYXRvciBmcm9tICcuLi9nZW5lcmF0b3JzL251bGwnO1xuXG5jb25zdCBudWxsVHlwZSA9IG51bGxHZW5lcmF0b3I7XG5cbmV4cG9ydCBkZWZhdWx0IG51bGxUeXBlO1xuIiwiaW1wb3J0IHJhbmRvbSBmcm9tICcuLi9jb3JlL3JhbmRvbSc7XG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vY29yZS91dGlscyc7XG5pbXBvcnQgUGFyc2VFcnJvciBmcm9tICcuLi9jb3JlL2Vycm9yJztcbmltcG9ydCBvcHRpb25BUEkgZnJvbSAnLi4vYXBpL29wdGlvbic7XG5cbi8vIFRPRE8gcHJvdmlkZSB0eXBlc1xuZnVuY3Rpb24gdW5pcXVlKHBhdGgsIGl0ZW1zLCB2YWx1ZSwgc2FtcGxlLCByZXNvbHZlLCB0cmF2ZXJzZUNhbGxiYWNrKSB7XG4gIGNvbnN0IHRtcCA9IFtdO1xuICBjb25zdCBzZWVuID0gW107XG5cbiAgZnVuY3Rpb24gd2FsayhvYmopIHtcbiAgICBjb25zdCBqc29uID0gSlNPTi5zdHJpbmdpZnkob2JqLnZhbHVlKTtcblxuICAgIGlmIChzZWVuLmluZGV4T2YoanNvbikgPT09IC0xKSB7XG4gICAgICBzZWVuLnB1c2goanNvbik7XG4gICAgICB0bXAucHVzaChvYmopO1xuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpdGVtcy5mb3JFYWNoKHdhbGspO1xuXG4gIC8vIFRPRE86IGZpbmQgYSBiZXR0ZXIgc29sdXRpb24/XG4gIGxldCBsaW1pdCA9IDEwMDtcblxuICB3aGlsZSAodG1wLmxlbmd0aCAhPT0gaXRlbXMubGVuZ3RoKSB7XG4gICAgaWYgKCF3YWxrKHRyYXZlcnNlQ2FsbGJhY2sodmFsdWUuaXRlbXMgfHwgc2FtcGxlLCBwYXRoLCByZXNvbHZlKSkpIHtcbiAgICAgIGxpbWl0IC09IDE7XG4gICAgfVxuXG4gICAgaWYgKCFsaW1pdCkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRtcDtcbn1cblxuLy8gVE9ETyBwcm92aWRlIHR5cGVzXG5mdW5jdGlvbiBhcnJheVR5cGUodmFsdWUsIHBhdGgsIHJlc29sdmUsIHRyYXZlcnNlQ2FsbGJhY2spIHtcbiAgY29uc3QgaXRlbXMgPSBbXTtcblxuICBpZiAoISh2YWx1ZS5pdGVtcyB8fCB2YWx1ZS5hZGRpdGlvbmFsSXRlbXMpKSB7XG4gICAgaWYgKHV0aWxzLmhhc1Byb3BlcnRpZXModmFsdWUsICdtaW5JdGVtcycsICdtYXhJdGVtcycsICd1bmlxdWVJdGVtcycpKSB7XG4gICAgICB0aHJvdyBuZXcgUGFyc2VFcnJvcihgbWlzc2luZyBpdGVtcyBmb3IgJHt1dGlscy5zaG9ydCh2YWx1ZSl9YCwgcGF0aCk7XG4gICAgfVxuICAgIHJldHVybiBpdGVtcztcbiAgfVxuXG4gIGlmIChBcnJheS5pc0FycmF5KHZhbHVlLml0ZW1zKSkge1xuICAgIHJldHVybiB2YWx1ZS5pdGVtcy5tYXAoKGl0ZW0sIGtleSkgPT4ge1xuICAgICAgY29uc3QgaXRlbVN1YnBhdGggPSBwYXRoLmNvbmNhdChbJ2l0ZW1zJywga2V5XSk7XG5cbiAgICAgIHJldHVybiB0cmF2ZXJzZUNhbGxiYWNrKGl0ZW0sIGl0ZW1TdWJwYXRoLCByZXNvbHZlKTtcbiAgICB9KTtcbiAgfVxuXG4gIGxldCBtaW5JdGVtcyA9IHZhbHVlLm1pbkl0ZW1zO1xuICBsZXQgbWF4SXRlbXMgPSB2YWx1ZS5tYXhJdGVtcztcblxuICBjb25zdCBkZWZhdWx0TWluSXRlbXMgPSBvcHRpb25BUEkoJ21pbkl0ZW1zJyk7XG4gIGNvbnN0IGRlZmF1bHRNYXhJdGVtcyA9IG9wdGlvbkFQSSgnbWF4SXRlbXMnKTtcblxuICBpZiAoZGVmYXVsdE1pbkl0ZW1zKSB7XG4gICAgLy8gZml4IGJvdW5kYXJpZXNcbiAgICBtaW5JdGVtcyA9IHR5cGVvZiBtaW5JdGVtcyA9PT0gJ3VuZGVmaW5lZCdcbiAgICAgID8gZGVmYXVsdE1pbkl0ZW1zXG4gICAgICA6IE1hdGgubWluKGRlZmF1bHRNaW5JdGVtcywgbWluSXRlbXMpO1xuICB9XG5cbiAgaWYgKGRlZmF1bHRNYXhJdGVtcykge1xuICAgIG1heEl0ZW1zID0gdHlwZW9mIG1heEl0ZW1zID09PSAndW5kZWZpbmVkJ1xuICAgICAgPyBkZWZhdWx0TWF4SXRlbXNcbiAgICAgIDogTWF0aC5taW4oZGVmYXVsdE1heEl0ZW1zLCBtYXhJdGVtcyk7XG5cbiAgICAvLyBEb24ndCBhbGxvdyB1c2VyIHRvIHNldCBtYXggaXRlbXMgYWJvdmUgb3VyIG1heGltdW1cbiAgICBpZiAobWF4SXRlbXMgJiYgbWF4SXRlbXMgPiBkZWZhdWx0TWF4SXRlbXMpIHtcbiAgICAgIG1heEl0ZW1zID0gZGVmYXVsdE1heEl0ZW1zO1xuICAgIH1cblxuICAgIC8vIERvbid0IGFsbG93IHVzZXIgdG8gc2V0IG1pbiBpdGVtcyBhYm92ZSBvdXIgbWF4aW11bVxuICAgIGlmIChtaW5JdGVtcyAmJiBtaW5JdGVtcyA+IGRlZmF1bHRNYXhJdGVtcykge1xuICAgICAgbWluSXRlbXMgPSBtYXhJdGVtcztcbiAgICB9XG4gIH1cblxuICBjb25zdCBvcHRpb25hbHNQcm9iYWJpbGl0eSA9IG9wdGlvbkFQSSgnYWx3YXlzRmFrZU9wdGlvbmFscycpID09PSB0cnVlID8gMS4wIDogb3B0aW9uQVBJKCdvcHRpb25hbHNQcm9iYWJpbGl0eScpO1xuICBjb25zdCBmaXhlZFByb2JhYmlsaXRpZXMgPSBvcHRpb25BUEkoJ2Fsd2F5c0Zha2VPcHRpb25hbHMnKSB8fCBvcHRpb25BUEkoJ2ZpeGVkUHJvYmFiaWxpdGllcycpIHx8IGZhbHNlO1xuXG4gIGxldCBsZW5ndGggPSByYW5kb20ubnVtYmVyKG1pbkl0ZW1zLCBtYXhJdGVtcywgMSwgNSk7XG5cbiAgaWYgKG9wdGlvbmFsc1Byb2JhYmlsaXR5ICE9PSBudWxsKSB7XG4gICAgbGVuZ3RoID0gTWF0aC5tYXgoZml4ZWRQcm9iYWJpbGl0aWVzXG4gICAgICA/IE1hdGgucm91bmQoKG1heEl0ZW1zIHx8IGxlbmd0aCkgKiBvcHRpb25hbHNQcm9iYWJpbGl0eSlcbiAgICAgIDogTWF0aC5hYnMocmFuZG9tLm51bWJlcihtaW5JdGVtcywgbWF4SXRlbXMpICogb3B0aW9uYWxzUHJvYmFiaWxpdHkpLCBtaW5JdGVtcyB8fCAwKTtcbiAgfVxuXG4gIC8vIFRPRE8gYmVsb3cgbG9va3MgYmFkLiBTaG91bGQgYWRkaXRpb25hbEl0ZW1zIGJlIGNvcGllZCBhcy1pcz9cbiAgY29uc3Qgc2FtcGxlID0gdHlwZW9mIHZhbHVlLmFkZGl0aW9uYWxJdGVtcyA9PT0gJ29iamVjdCcgPyB2YWx1ZS5hZGRpdGlvbmFsSXRlbXMgOiB7fTtcblxuICBmb3IgKGxldCBjdXJyZW50ID0gaXRlbXMubGVuZ3RoOyBjdXJyZW50IDwgbGVuZ3RoOyBjdXJyZW50ICs9IDEpIHtcbiAgICBjb25zdCBpdGVtU3VicGF0aCA9IHBhdGguY29uY2F0KFsnaXRlbXMnLCBjdXJyZW50XSk7XG4gICAgY29uc3QgZWxlbWVudCA9IHRyYXZlcnNlQ2FsbGJhY2sodmFsdWUuaXRlbXMgfHwgc2FtcGxlLCBpdGVtU3VicGF0aCwgcmVzb2x2ZSk7XG5cbiAgICBpdGVtcy5wdXNoKGVsZW1lbnQpO1xuICB9XG5cbiAgaWYgKHZhbHVlLmNvbnRhaW5zICYmIGxlbmd0aCA+IDApIHtcbiAgICBjb25zdCBpZHggPSByYW5kb20ubnVtYmVyKDAsIGxlbmd0aCAtIDEpO1xuXG4gICAgaXRlbXNbaWR4XSA9IHRyYXZlcnNlQ2FsbGJhY2sodmFsdWUuY29udGFpbnMsIHBhdGguY29uY2F0KFsnaXRlbXMnLCBpZHhdKSwgcmVzb2x2ZSk7XG4gIH1cblxuICBpZiAodmFsdWUudW5pcXVlSXRlbXMpIHtcbiAgICByZXR1cm4gdW5pcXVlKHBhdGguY29uY2F0KFsnaXRlbXMnXSksIGl0ZW1zLCB2YWx1ZSwgc2FtcGxlLCByZXNvbHZlLCB0cmF2ZXJzZUNhbGxiYWNrKTtcbiAgfVxuXG4gIHJldHVybiBpdGVtcztcbn1cblxuZXhwb3J0IGRlZmF1bHQgYXJyYXlUeXBlO1xuIiwiaW1wb3J0IHJhbmRvbSBmcm9tICcuLi9jb3JlL3JhbmRvbSc7XG5pbXBvcnQgZW52IGZyb20gJy4uL2NvcmUvY29uc3RhbnRzJztcblxuZnVuY3Rpb24gbnVtYmVyVHlwZSh2YWx1ZSkge1xuICBsZXQgbWluID0gdHlwZW9mIHZhbHVlLm1pbmltdW0gPT09ICd1bmRlZmluZWQnID8gZW52Lk1JTl9JTlRFR0VSIDogdmFsdWUubWluaW11bTtcbiAgbGV0IG1heCA9IHR5cGVvZiB2YWx1ZS5tYXhpbXVtID09PSAndW5kZWZpbmVkJyA/IGVudi5NQVhfSU5URUdFUiA6IHZhbHVlLm1heGltdW07XG5cbiAgY29uc3QgbXVsdGlwbGVPZiA9IHZhbHVlLm11bHRpcGxlT2Y7XG5cbiAgaWYgKG11bHRpcGxlT2YpIHtcbiAgICBtYXggPSBNYXRoLmZsb29yKG1heCAvIG11bHRpcGxlT2YpICogbXVsdGlwbGVPZjtcbiAgICBtaW4gPSBNYXRoLmNlaWwobWluIC8gbXVsdGlwbGVPZikgKiBtdWx0aXBsZU9mO1xuICB9XG5cbiAgaWYgKHZhbHVlLmV4Y2x1c2l2ZU1pbmltdW0gJiYgbWluID09PSB2YWx1ZS5taW5pbXVtKSB7XG4gICAgbWluICs9IG11bHRpcGxlT2YgfHwgMTtcbiAgfVxuXG4gIGlmICh2YWx1ZS5leGNsdXNpdmVNYXhpbXVtICYmIG1heCA9PT0gdmFsdWUubWF4aW11bSkge1xuICAgIG1heCAtPSBtdWx0aXBsZU9mIHx8IDE7XG4gIH1cblxuICBpZiAobWluID4gbWF4KSB7XG4gICAgcmV0dXJuIE5hTjtcbiAgfVxuXG4gIGlmIChtdWx0aXBsZU9mKSB7XG4gICAgaWYgKFN0cmluZyhtdWx0aXBsZU9mKS5pbmRleE9mKCcuJykgPT09IC0xKSB7XG4gICAgICBsZXQgYmFzZSA9IHJhbmRvbS5udW1iZXIoTWF0aC5mbG9vcihtaW4gLyBtdWx0aXBsZU9mKSwgTWF0aC5mbG9vcihtYXggLyBtdWx0aXBsZU9mKSkgKiBtdWx0aXBsZU9mO1xuXG4gICAgICB3aGlsZSAoYmFzZSA8IG1pbikge1xuICAgICAgICBiYXNlICs9IHZhbHVlLm11bHRpcGxlT2Y7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBiYXNlO1xuICAgIH1cblxuICAgIGNvbnN0IGJvdW5kYXJ5ID0gKG1heCAtIG1pbikgLyBtdWx0aXBsZU9mO1xuXG4gICAgbGV0IG51bTtcbiAgICBsZXQgZml4O1xuXG4gICAgZG8ge1xuICAgICAgbnVtID0gcmFuZG9tLm51bWJlcigwLCBib3VuZGFyeSkgKiBtdWx0aXBsZU9mO1xuICAgICAgZml4ID0gKG51bSAvIG11bHRpcGxlT2YpICUgMTtcbiAgICB9IHdoaWxlIChmaXggIT09IDApO1xuXG4gICAgLy8gRklYTUU6IGh0dHBzOi8vZ2l0aHViLmNvbS9qc29uLXNjaGVtYS1mYWtlci9qc29uLXNjaGVtYS1mYWtlci9pc3N1ZXMvMzc5XG5cbiAgICByZXR1cm4gbWluICsgbnVtO1xuICB9XG5cbiAgcmV0dXJuIHJhbmRvbS5udW1iZXIobWluLCBtYXgsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB0cnVlKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgbnVtYmVyVHlwZTtcbiIsImltcG9ydCBudW1iZXIgZnJvbSAnLi9udW1iZXInO1xuXG4vLyBUaGUgYGludGVnZXJgIHR5cGUgaXMganVzdCBhIHdyYXBwZXIgZm9yIHRoZSBgbnVtYmVyYCB0eXBlLiBUaGUgYG51bWJlcmAgdHlwZVxuLy8gcmV0dXJucyBmbG9hdGluZyBwb2ludCBudW1iZXJzLCBhbmQgYGludGVnZXJgIHR5cGUgdHJ1bmNhdGVzIHRoZSBmcmFjdGlvblxuLy8gcGFydCwgbGVhdmluZyB0aGUgcmVzdWx0IGFzIGFuIGludGVnZXIuXG5cbmZ1bmN0aW9uIGludGVnZXJUeXBlKHZhbHVlKSB7XG4gIHJldHVybiBudW1iZXIoeyBtdWx0aXBsZU9mOiAxLCAuLi52YWx1ZSB9KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW50ZWdlclR5cGU7XG4iLCJpbXBvcnQgcmFuZG9tIGZyb20gJy4uL2NvcmUvcmFuZG9tJztcblxuY29uc3QgTElQU1VNX1dPUkRTID0gYExvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0IGNvbnNlY3RldHVyIGFkaXBpc2ljaW5nIGVsaXQgc2VkIGRvIGVpdXNtb2QgdGVtcG9yIGluY2lkaWR1bnQgdXQgbGFib3JlXG5ldCBkb2xvcmUgbWFnbmEgYWxpcXVhIFV0IGVuaW0gYWQgbWluaW0gdmVuaWFtIHF1aXMgbm9zdHJ1ZCBleGVyY2l0YXRpb24gdWxsYW1jbyBsYWJvcmlzIG5pc2kgdXQgYWxpcXVpcCBleCBlYVxuY29tbW9kbyBjb25zZXF1YXQgRHVpcyBhdXRlIGlydXJlIGRvbG9yIGluIHJlcHJlaGVuZGVyaXQgaW4gdm9sdXB0YXRlIHZlbGl0IGVzc2UgY2lsbHVtIGRvbG9yZSBldSBmdWdpYXQgbnVsbGFcbnBhcmlhdHVyIEV4Y2VwdGV1ciBzaW50IG9jY2FlY2F0IGN1cGlkYXRhdCBub24gcHJvaWRlbnQgc3VudCBpbiBjdWxwYSBxdWkgb2ZmaWNpYSBkZXNlcnVudCBtb2xsaXQgYW5pbSBpZCBlc3RcbmxhYm9ydW1gLnNwbGl0KC9cXFcvKTtcblxuLyoqXG4gKiBHZW5lcmF0ZXMgcmFuZG9taXplZCBhcnJheSBvZiBzaW5nbGUgbG9yZW0gaXBzdW0gd29yZHMuXG4gKlxuICogQHBhcmFtIGxlbmd0aFxuICogQHJldHVybnMge0FycmF5LjxzdHJpbmc+fVxuICovXG5mdW5jdGlvbiB3b3Jkc0dlbmVyYXRvcihsZW5ndGgpIHtcbiAgY29uc3Qgd29yZHMgPSByYW5kb20uc2h1ZmZsZShMSVBTVU1fV09SRFMpO1xuXG4gIHJldHVybiB3b3Jkcy5zbGljZSgwLCBsZW5ndGgpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB3b3Jkc0dlbmVyYXRvcjtcbiIsImltcG9ydCBjb25zdGFudHMgZnJvbSAnLi4vY29yZS9jb25zdGFudHMnO1xuaW1wb3J0IHJhbmRvbSBmcm9tICcuLi9jb3JlL3JhbmRvbSc7XG5pbXBvcnQgd29yZHMgZnJvbSAnLi4vZ2VuZXJhdG9ycy93b3Jkcyc7XG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vY29yZS91dGlscyc7XG5pbXBvcnQgb3B0aW9uQVBJIGZyb20gJy4uL2FwaS9vcHRpb24nO1xuXG4vLyBmYWxsYmFjayBnZW5lcmF0b3JcbmNvbnN0IGFueVR5cGUgPSB7IHR5cGU6IGNvbnN0YW50cy5BTExPV0VEX1RZUEVTIH07XG5cbi8vIFRPRE8gcHJvdmlkZSB0eXBlc1xuZnVuY3Rpb24gb2JqZWN0VHlwZSh2YWx1ZSwgcGF0aCwgcmVzb2x2ZSwgdHJhdmVyc2VDYWxsYmFjaykge1xuICBjb25zdCBwcm9wcyA9IHt9O1xuXG4gIGNvbnN0IHByb3BlcnRpZXMgPSB2YWx1ZS5wcm9wZXJ0aWVzIHx8IHt9O1xuICBjb25zdCBwYXR0ZXJuUHJvcGVydGllcyA9IHZhbHVlLnBhdHRlcm5Qcm9wZXJ0aWVzIHx8IHt9O1xuICBjb25zdCByZXF1aXJlZFByb3BlcnRpZXMgPSB0eXBlb2YgdmFsdWUucmVxdWlyZWQgPT09ICdib29sZWFuJyA/IFtdIDogKHZhbHVlLnJlcXVpcmVkIHx8IFtdKS5zbGljZSgpO1xuICBjb25zdCBhbGxvd3NBZGRpdGlvbmFsID0gdmFsdWUuYWRkaXRpb25hbFByb3BlcnRpZXMgIT09IGZhbHNlO1xuXG4gIGNvbnN0IHByb3BlcnR5S2V5cyA9IE9iamVjdC5rZXlzKHByb3BlcnRpZXMpO1xuICBjb25zdCBwYXR0ZXJuUHJvcGVydHlLZXlzID0gT2JqZWN0LmtleXMocGF0dGVyblByb3BlcnRpZXMpO1xuICBjb25zdCBvcHRpb25hbFByb3BlcnRpZXMgPSBwcm9wZXJ0eUtleXMuY29uY2F0KHBhdHRlcm5Qcm9wZXJ0eUtleXMpLnJlZHVjZSgoX3Jlc3BvbnNlLCBfa2V5KSA9PiB7XG4gICAgaWYgKHJlcXVpcmVkUHJvcGVydGllcy5pbmRleE9mKF9rZXkpID09PSAtMSkgX3Jlc3BvbnNlLnB1c2goX2tleSk7XG4gICAgcmV0dXJuIF9yZXNwb25zZTtcbiAgfSwgW10pO1xuICBjb25zdCBhbGxQcm9wZXJ0aWVzID0gcmVxdWlyZWRQcm9wZXJ0aWVzLmNvbmNhdChvcHRpb25hbFByb3BlcnRpZXMpO1xuXG4gIGNvbnN0IGFkZGl0aW9uYWxQcm9wZXJ0aWVzID0gYWxsb3dzQWRkaXRpb25hbCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgPyAodmFsdWUuYWRkaXRpb25hbFByb3BlcnRpZXMgPT09IHRydWUgPyBhbnlUeXBlIDogdmFsdWUuYWRkaXRpb25hbFByb3BlcnRpZXMpXG4gICAgOiB2YWx1ZS5hZGRpdGlvbmFsUHJvcGVydGllcztcblxuICBpZiAoIWFsbG93c0FkZGl0aW9uYWxcbiAgICAmJiBwcm9wZXJ0eUtleXMubGVuZ3RoID09PSAwXG4gICAgJiYgcGF0dGVyblByb3BlcnR5S2V5cy5sZW5ndGggPT09IDBcbiAgICAmJiB1dGlscy5oYXNQcm9wZXJ0aWVzKHZhbHVlLCAnbWluUHJvcGVydGllcycsICdtYXhQcm9wZXJ0aWVzJywgJ2RlcGVuZGVuY2llcycsICdyZXF1aXJlZCcpXG4gICkge1xuICAgIC8vIGp1c3Qgbm90aGluZ1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgaWYgKG9wdGlvbkFQSSgncmVxdWlyZWRPbmx5JykgPT09IHRydWUpIHtcbiAgICByZXF1aXJlZFByb3BlcnRpZXMuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgaWYgKHByb3BlcnRpZXNba2V5XSkge1xuICAgICAgICBwcm9wc1trZXldID0gcHJvcGVydGllc1trZXldO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRyYXZlcnNlQ2FsbGJhY2socHJvcHMsIHBhdGguY29uY2F0KFsncHJvcGVydGllcyddKSwgcmVzb2x2ZSwgdmFsdWUpO1xuICB9XG5cbiAgY29uc3Qgb3B0aW9uYWxzUHJvYmFiaWxpdHkgPSBvcHRpb25BUEkoJ2Fsd2F5c0Zha2VPcHRpb25hbHMnKSA9PT0gdHJ1ZSA/IDEuMCA6IG9wdGlvbkFQSSgnb3B0aW9uYWxzUHJvYmFiaWxpdHknKTtcbiAgY29uc3QgZml4ZWRQcm9iYWJpbGl0aWVzID0gb3B0aW9uQVBJKCdhbHdheXNGYWtlT3B0aW9uYWxzJykgfHwgb3B0aW9uQVBJKCdmaXhlZFByb2JhYmlsaXRpZXMnKSB8fCBmYWxzZTtcbiAgY29uc3QgaWdub3JlUHJvcGVydGllcyA9IG9wdGlvbkFQSSgnaWdub3JlUHJvcGVydGllcycpIHx8IFtdO1xuICBjb25zdCByZXVzZVByb3BzID0gb3B0aW9uQVBJKCdyZXVzZVByb3BlcnRpZXMnKTtcbiAgY29uc3QgZmlsbFByb3BzID0gb3B0aW9uQVBJKCdmaWxsUHJvcGVydGllcycpO1xuXG4gIGNvbnN0IG1heCA9IHZhbHVlLm1heFByb3BlcnRpZXMgfHwgKGFsbFByb3BlcnRpZXMubGVuZ3RoICsgKGFsbG93c0FkZGl0aW9uYWwgPyByYW5kb20ubnVtYmVyKDEsIDUpIDogMCkpO1xuXG4gIGxldCBtaW4gPSBNYXRoLm1heCh2YWx1ZS5taW5Qcm9wZXJ0aWVzIHx8IDAsIHJlcXVpcmVkUHJvcGVydGllcy5sZW5ndGgpO1xuICBsZXQgbmVlZGVkRXh0cmFzID0gTWF0aC5tYXgoMCwgYWxsUHJvcGVydGllcy5sZW5ndGggLSBtaW4pO1xuXG4gIGlmIChhbGxQcm9wZXJ0aWVzLmxlbmd0aCA9PT0gMSAmJiAhcmVxdWlyZWRQcm9wZXJ0aWVzLmxlbmd0aCkge1xuICAgIG1pbiA9IE1hdGgubWF4KHJhbmRvbS5udW1iZXIoZmlsbFByb3BzID8gMSA6IDAsIG1heCksIG1pbik7XG4gIH1cblxuICBpZiAob3B0aW9uYWxzUHJvYmFiaWxpdHkgIT09IG51bGwpIHtcbiAgICBpZiAoZml4ZWRQcm9iYWJpbGl0aWVzID09PSB0cnVlKSB7XG4gICAgICBuZWVkZWRFeHRyYXMgPSBNYXRoLnJvdW5kKChtaW4gLSByZXF1aXJlZFByb3BlcnRpZXMubGVuZ3RoKSArIChvcHRpb25hbHNQcm9iYWJpbGl0eSAqIChhbGxQcm9wZXJ0aWVzLmxlbmd0aCAtIG1pbikpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbmVlZGVkRXh0cmFzID0gcmFuZG9tLm51bWJlcihtaW4gLSByZXF1aXJlZFByb3BlcnRpZXMubGVuZ3RoLCBvcHRpb25hbHNQcm9iYWJpbGl0eSAqIChhbGxQcm9wZXJ0aWVzLmxlbmd0aCAtIG1pbikpO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGV4dHJhUHJvcGVydGllc1JhbmRvbU9yZGVyID0gcmFuZG9tLnNodWZmbGUob3B0aW9uYWxQcm9wZXJ0aWVzKS5zbGljZSgwLCBuZWVkZWRFeHRyYXMpO1xuICBjb25zdCBleHRyYVByb3BlcnRpZXMgPSBvcHRpb25hbFByb3BlcnRpZXMuZmlsdGVyKF9pdGVtID0+IHtcbiAgICByZXR1cm4gZXh0cmFQcm9wZXJ0aWVzUmFuZG9tT3JkZXIuaW5kZXhPZihfaXRlbSkgIT09IC0xO1xuICB9KTtcblxuICAvLyBwcm9wZXJ0aWVzIGFyZSByZWFkIGZyb20gcmlnaHQtdG8tbGVmdFxuICBjb25zdCBfbGltaXQgPSBvcHRpb25hbHNQcm9iYWJpbGl0eSAhPT0gbnVsbCB8fCByZXF1aXJlZFByb3BlcnRpZXMubGVuZ3RoID09PSBtYXggPyBtYXggOiByYW5kb20ubnVtYmVyKDAsIG1heCk7XG4gIGNvbnN0IF9wcm9wcyA9IHJlcXVpcmVkUHJvcGVydGllcy5jb25jYXQocmFuZG9tLnNodWZmbGUoZXh0cmFQcm9wZXJ0aWVzKS5zbGljZSgwLCBfbGltaXQpKS5zbGljZSgwLCBtYXgpO1xuICBjb25zdCBfZGVmbnMgPSBbXTtcblxuICBpZiAodmFsdWUuZGVwZW5kZW5jaWVzKSB7XG4gICAgT2JqZWN0LmtleXModmFsdWUuZGVwZW5kZW5jaWVzKS5mb3JFYWNoKHByb3AgPT4ge1xuICAgICAgY29uc3QgX3JlcXVpcmVkID0gdmFsdWUuZGVwZW5kZW5jaWVzW3Byb3BdO1xuXG4gICAgICBpZiAoX3Byb3BzLmluZGV4T2YocHJvcCkgIT09IC0xKSB7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KF9yZXF1aXJlZCkpIHtcbiAgICAgICAgICAvLyBwcm9wZXJ0eS1kZXBlbmRlbmNpZXNcbiAgICAgICAgICBfcmVxdWlyZWQuZm9yRWFjaChzdWIgPT4ge1xuICAgICAgICAgICAgaWYgKF9wcm9wcy5pbmRleE9mKHN1YikgPT09IC0xKSB7XG4gICAgICAgICAgICAgIF9wcm9wcy5wdXNoKHN1Yik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgX2RlZm5zLnB1c2goX3JlcXVpcmVkKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gc2NoZW1hLWRlcGVuZGVuY2llc1xuICAgIGlmIChfZGVmbnMubGVuZ3RoKSB7XG4gICAgICBkZWxldGUgdmFsdWUuZGVwZW5kZW5jaWVzO1xuXG4gICAgICByZXR1cm4gdHJhdmVyc2VDYWxsYmFjayh7XG4gICAgICAgIGFsbE9mOiBfZGVmbnMuY29uY2F0KHZhbHVlKSxcbiAgICAgIH0sIHBhdGguY29uY2F0KFsncHJvcGVydGllcyddKSwgcmVzb2x2ZSwgdmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHNraXBwZWQgPSBbXTtcbiAgY29uc3QgbWlzc2luZyA9IFtdO1xuXG4gIF9wcm9wcy5mb3JFYWNoKGtleSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpZ25vcmVQcm9wZXJ0aWVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBpZiAoKGlnbm9yZVByb3BlcnRpZXNbaV0gaW5zdGFuY2VvZiBSZWdFeHAgJiYgaWdub3JlUHJvcGVydGllc1tpXS50ZXN0KGtleSkpXG4gICAgICAgIHx8ICh0eXBlb2YgaWdub3JlUHJvcGVydGllc1tpXSA9PT0gJ3N0cmluZycgJiYgaWdub3JlUHJvcGVydGllc1tpXSA9PT0ga2V5KVxuICAgICAgICB8fCAodHlwZW9mIGlnbm9yZVByb3BlcnRpZXNbaV0gPT09ICdmdW5jdGlvbicgJiYgaWdub3JlUHJvcGVydGllc1tpXShwcm9wZXJ0aWVzW2tleV0sIGtleSkpKSB7XG4gICAgICAgIHNraXBwZWQucHVzaChrZXkpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGFkZGl0aW9uYWxQcm9wZXJ0aWVzID09PSBmYWxzZSkge1xuICAgICAgaWYgKHJlcXVpcmVkUHJvcGVydGllcy5pbmRleE9mKGtleSkgIT09IC0xKSB7XG4gICAgICAgIHByb3BzW2tleV0gPSBwcm9wZXJ0aWVzW2tleV07XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHByb3BlcnRpZXNba2V5XSkge1xuICAgICAgcHJvcHNba2V5XSA9IHByb3BlcnRpZXNba2V5XTtcbiAgICB9XG5cbiAgICBsZXQgZm91bmQ7XG5cbiAgICAvLyB0aGVuIHRyeSBwYXR0ZXJuUHJvcGVydGllc1xuICAgIHBhdHRlcm5Qcm9wZXJ0eUtleXMuZm9yRWFjaChfa2V5ID0+IHtcbiAgICAgIGlmIChrZXkubWF0Y2gobmV3IFJlZ0V4cChfa2V5KSkpIHtcbiAgICAgICAgZm91bmQgPSB0cnVlO1xuXG4gICAgICAgIGlmIChwcm9wc1trZXldKSB7XG4gICAgICAgICAgdXRpbHMubWVyZ2UocHJvcHNba2V5XSwgcGF0dGVyblByb3BlcnRpZXNbX2tleV0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHByb3BzW3JhbmRvbS5yYW5kZXhwKGtleSldID0gcGF0dGVyblByb3BlcnRpZXNbX2tleV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmICghZm91bmQpIHtcbiAgICAgIC8vIHRyeSBwYXR0ZXJuUHJvcGVydGllcyBhZ2FpbixcbiAgICAgIGNvbnN0IHN1YnNjaGVtYSA9IHBhdHRlcm5Qcm9wZXJ0aWVzW2tleV0gfHwgYWRkaXRpb25hbFByb3BlcnRpZXM7XG5cbiAgICAgIC8vIEZJWE1FOiBhbGxvdyBhbnlUeXBlIGFzIGZhbGxiYWNrIHdoZW4gbm8gc3Vic2NoZW1hIGlzIGdpdmVuP1xuXG4gICAgICBpZiAoc3Vic2NoZW1hICYmIGFkZGl0aW9uYWxQcm9wZXJ0aWVzICE9PSBmYWxzZSkge1xuICAgICAgICAvLyBvdGhlcndpc2Ugd2UgY2FuIHVzZSBhZGRpdGlvbmFsUHJvcGVydGllcz9cbiAgICAgICAgcHJvcHNbcGF0dGVyblByb3BlcnRpZXNba2V5XSA/IHJhbmRvbS5yYW5kZXhwKGtleSkgOiBrZXldID0gcHJvcGVydGllc1trZXldIHx8IHN1YnNjaGVtYTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1pc3NpbmcucHVzaChrZXkpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgLy8gZGlzY2FyZCBhbHJlYWR5IGlnbm9yZWQgcHJvcHMgaWYgdGhleSdyZSBub3QgcmVxdWlyZWQgdG8gYmUgZmlsbGVkLi4uXG4gIGxldCBjdXJyZW50ID0gT2JqZWN0LmtleXMocHJvcHMpLmxlbmd0aCArIChmaWxsUHJvcHMgPyAwIDogc2tpcHBlZC5sZW5ndGgpO1xuXG4gIC8vIGdlbmVyYXRlIGR5bmFtaWMgc3VmZml4IGZvciBhZGRpdGlvbmFsIHByb3BzLi4uXG4gIGNvbnN0IGhhc2ggPSBzdWZmaXggPT4gcmFuZG9tLnJhbmRleHAoYF8/W19hLWZcXFxcZF17MSwzfSR7c3VmZml4ID8gJ1xcXFwkPycgOiAnJ31gKTtcblxuICBmdW5jdGlvbiBnZXQoZnJvbSkge1xuICAgIGxldCBvbmU7XG5cbiAgICBkbyB7XG4gICAgICBpZiAoIWZyb20ubGVuZ3RoKSBicmVhaztcbiAgICAgIG9uZSA9IGZyb20uc2hpZnQoKTtcbiAgICB9IHdoaWxlIChwcm9wc1tvbmVdKTtcblxuICAgIHJldHVybiBvbmU7XG4gIH1cblxuICBsZXQgbWluUHJvcHMgPSBtaW47XG4gIGlmIChhbGxvd3NBZGRpdGlvbmFsICYmICFyZXF1aXJlZFByb3BlcnRpZXMubGVuZ3RoKSB7XG4gICAgbWluUHJvcHMgPSBNYXRoLm1heChvcHRpb25hbHNQcm9iYWJpbGl0eSA9PT0gbnVsbCB8fCBhZGRpdGlvbmFsUHJvcGVydGllcyA/IHJhbmRvbS5udW1iZXIoZmlsbFByb3BzID8gMSA6IDAsIG1heCkgOiAwLCBtaW4pO1xuICB9XG5cbiAgd2hpbGUgKGZpbGxQcm9wcykge1xuICAgIGlmICghKHBhdHRlcm5Qcm9wZXJ0eUtleXMubGVuZ3RoIHx8IGFsbG93c0FkZGl0aW9uYWwpKSB7XG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICBpZiAoY3VycmVudCA+PSBtaW5Qcm9wcykge1xuICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgaWYgKGFsbG93c0FkZGl0aW9uYWwpIHtcbiAgICAgIGlmIChyZXVzZVByb3BzICYmICgocHJvcGVydHlLZXlzLmxlbmd0aCAtIGN1cnJlbnQpID4gbWluUHJvcHMpKSB7XG4gICAgICAgIGxldCBjb3VudCA9IDA7XG4gICAgICAgIGxldCBrZXk7XG5cbiAgICAgICAgZG8ge1xuICAgICAgICAgIGNvdW50ICs9IDE7XG5cbiAgICAgICAgICAvLyBza2lwIGxhcmdlIG9iamVjdHNcbiAgICAgICAgICBpZiAoY291bnQgPiAxMDAwKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBrZXkgPSBnZXQocmVxdWlyZWRQcm9wZXJ0aWVzKSB8fCByYW5kb20ucGljayhwcm9wZXJ0eUtleXMpO1xuICAgICAgICB9IHdoaWxlICh0eXBlb2YgcHJvcHNba2V5XSAhPT0gJ3VuZGVmaW5lZCcpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgcHJvcHNba2V5XSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICBwcm9wc1trZXldID0gcHJvcGVydGllc1trZXldO1xuICAgICAgICAgIGN1cnJlbnQgKz0gMTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChwYXR0ZXJuUHJvcGVydHlLZXlzLmxlbmd0aCAmJiAhYWRkaXRpb25hbFByb3BlcnRpZXMpIHtcbiAgICAgICAgY29uc3QgcHJvcCA9IHJhbmRvbS5waWNrKHBhdHRlcm5Qcm9wZXJ0eUtleXMpO1xuICAgICAgICBjb25zdCB3b3JkID0gcmFuZG9tLnJhbmRleHAocHJvcCk7XG5cbiAgICAgICAgaWYgKCFwcm9wc1t3b3JkXSkge1xuICAgICAgICAgIHByb3BzW3dvcmRdID0gcGF0dGVyblByb3BlcnRpZXNbcHJvcF07XG4gICAgICAgICAgY3VycmVudCArPSAxO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCB3b3JkID0gZ2V0KHJlcXVpcmVkUHJvcGVydGllcykgfHwgKHdvcmRzKDEpICsgaGFzaCgpKTtcblxuICAgICAgICBpZiAoIXByb3BzW3dvcmRdKSB7XG4gICAgICAgICAgcHJvcHNbd29yZF0gPSBhZGRpdGlvbmFsUHJvcGVydGllcyB8fCBhbnlUeXBlO1xuICAgICAgICAgIGN1cnJlbnQgKz0gMTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBjdXJyZW50IDwgbWluICYmIGkgPCBwYXR0ZXJuUHJvcGVydHlLZXlzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBjb25zdCBfa2V5ID0gcGF0dGVyblByb3BlcnR5S2V5c1tpXTtcbiAgICAgIGNvbnN0IHdvcmQgPSByYW5kb20ucmFuZGV4cChfa2V5KTtcblxuXG4gICAgICBpZiAoIXByb3BzW3dvcmRdKSB7XG4gICAgICAgIHByb3BzW3dvcmRdID0gcGF0dGVyblByb3BlcnRpZXNbX2tleV07XG4gICAgICAgIGN1cnJlbnQgKz0gMTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBmaWxsIHVwLXRvIHRoaXMgdmFsdWUgYW5kIG5vIG1vcmUhXG4gIGlmIChyZXF1aXJlZFByb3BlcnRpZXMubGVuZ3RoID09PSAwICYmICghYWxsb3dzQWRkaXRpb25hbCB8fCBvcHRpb25hbHNQcm9iYWJpbGl0eSA9PT0gZmFsc2UpKSB7XG4gICAgY29uc3QgbWF4aW11bSA9IHJhbmRvbS5udW1iZXIobWluLCBtYXgpO1xuXG4gICAgZm9yICg7IGN1cnJlbnQgPCBtYXhpbXVtOykge1xuICAgICAgY29uc3Qgd29yZCA9IGdldChwcm9wZXJ0eUtleXMpO1xuXG4gICAgICBpZiAod29yZCkge1xuICAgICAgICBwcm9wc1t3b3JkXSA9IHByb3BlcnRpZXNbd29yZF07XG4gICAgICB9XG5cbiAgICAgIGN1cnJlbnQgKz0gMTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHJhdmVyc2VDYWxsYmFjayhwcm9wcywgcGF0aC5jb25jYXQoWydwcm9wZXJ0aWVzJ10pLCByZXNvbHZlLCB2YWx1ZSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IG9iamVjdFR5cGU7XG4iLCJpbXBvcnQgd29yZHMgZnJvbSAnLi93b3Jkcyc7XG5pbXBvcnQgcmFuZG9tIGZyb20gJy4uL2NvcmUvcmFuZG9tJztcblxuLyoqXG4gKiBIZWxwZXIgZnVuY3Rpb24gdXNlZCBieSB0aHVua0dlbmVyYXRvciB0byBwcm9kdWNlIHNvbWUgd29yZHMgZm9yIHRoZSBmaW5hbCByZXN1bHQuXG4gKlxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gcHJvZHVjZSgpIHtcbiAgY29uc3QgbGVuZ3RoID0gcmFuZG9tLm51bWJlcigxLCA1KTtcblxuICByZXR1cm4gd29yZHMobGVuZ3RoKS5qb2luKCcgJyk7XG59XG5cbi8qKlxuICogR2VuZXJhdGVzIHJhbmRvbWl6ZWQgY29uY2F0ZW5hdGVkIHN0cmluZyBiYXNlZCBvbiB3b3JkcyBnZW5lcmF0b3IuXG4gKlxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gdGh1bmtHZW5lcmF0b3IobWluID0gMCwgbWF4ID0gMTQwKSB7XG4gIGNvbnN0IF9taW4gPSBNYXRoLm1heCgwLCBtaW4pO1xuICBjb25zdCBfbWF4ID0gcmFuZG9tLm51bWJlcihfbWluLCBtYXgpO1xuXG4gIGxldCByZXN1bHQgPSBwcm9kdWNlKCk7XG5cbiAgLy8gYXBwZW5kIHVudGlsIGxlbmd0aCBpcyByZWFjaGVkXG4gIHdoaWxlIChyZXN1bHQubGVuZ3RoIDwgX21pbikge1xuICAgIHJlc3VsdCArPSBwcm9kdWNlKCk7XG4gIH1cblxuICAvLyBjdXQgaWYgbmVlZGVkXG4gIGlmIChyZXN1bHQubGVuZ3RoID4gX21heCkge1xuICAgIHJlc3VsdCA9IHJlc3VsdC5zdWJzdHIoMCwgX21heCk7XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZGVmYXVsdCB0aHVua0dlbmVyYXRvcjtcbiIsImltcG9ydCByYW5kb20gZnJvbSAnLi4vY29yZS9yYW5kb20nO1xuXG4vKipcbiAqIEdlbmVyYXRlcyByYW5kb21pemVkIGlwdjQgYWRkcmVzcy5cbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBpcHY0R2VuZXJhdG9yKCkge1xuICByZXR1cm4gWzAsIDAsIDAsIDBdLm1hcCgoKSA9PiB7XG4gICAgcmV0dXJuIHJhbmRvbS5udW1iZXIoMCwgMjU1KTtcbiAgfSkuam9pbignLicpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpcHY0R2VuZXJhdG9yO1xuIiwiaW1wb3J0IHJhbmRvbSBmcm9tICcuLi9jb3JlL3JhbmRvbSc7XG5cbi8qKlxuICogR2VuZXJhdGVzIHJhbmRvbWl6ZWQgZGF0ZSB0aW1lIElTTyBmb3JtYXQgc3RyaW5nLlxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGRhdGVUaW1lR2VuZXJhdG9yKCkge1xuICByZXR1cm4gcmFuZG9tLmRhdGUoKS50b0lTT1N0cmluZygpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBkYXRlVGltZUdlbmVyYXRvcjtcbiIsImltcG9ydCBkYXRlVGltZUdlbmVyYXRvciBmcm9tICcuL2RhdGVUaW1lJztcblxuLyoqXG4gKiBHZW5lcmF0ZXMgcmFuZG9taXplZCBkYXRlIGZvcm1hdCBzdHJpbmcuXG4gKlxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gZGF0ZUdlbmVyYXRvcigpIHtcbiAgcmV0dXJuIGRhdGVUaW1lR2VuZXJhdG9yKCkuc2xpY2UoMCwgMTApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBkYXRlR2VuZXJhdG9yO1xuIiwiaW1wb3J0IGRhdGVUaW1lR2VuZXJhdG9yIGZyb20gJy4vZGF0ZVRpbWUnO1xuXG4vKipcbiAqIEdlbmVyYXRlcyByYW5kb21pemVkIHRpbWUgZm9ybWF0IHN0cmluZy5cbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiB0aW1lR2VuZXJhdG9yKCkge1xuICByZXR1cm4gZGF0ZVRpbWVHZW5lcmF0b3IoKS5zbGljZSgxMSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHRpbWVHZW5lcmF0b3I7XG4iLCJpbXBvcnQgcmFuZG9tIGZyb20gJy4uL2NvcmUvcmFuZG9tJztcblxuY29uc3QgRlJBR01FTlQgPSAnW2EtekEtWl1bYS16QS1aMC05Ky0uXSonO1xuY29uc3QgVVJJX1BBVFRFUk4gPSBgaHR0cHM/Oi8ve2hvc3RuYW1lfSg/OiR7RlJBR01FTlR9KStgO1xuY29uc3QgUEFSQU1fUEFUVEVSTiA9ICcoPzpcXFxcPyhbYS16XXsxLDd9KD1cXFxcd3sxLDV9KT8mKXswLDN9KT8nO1xuXG4vKipcbiAqIFByZWRlZmluZWQgY29yZSBmb3JtYXRzXG4gKiBAdHlwZSB7W2tleTogc3RyaW5nXTogc3RyaW5nfVxuICovXG5jb25zdCByZWdleHBzID0ge1xuICBlbWFpbDogJ1thLXpBLVpcXFxcZF1bYS16QS1aXFxcXGQtXXsxLDEzfVthLXpBLVpcXFxcZF1Ae2hvc3RuYW1lfScsXG4gIGhvc3RuYW1lOiAnW2EtekEtWl17MSwzM31cXFxcLlthLXpdezIsNH0nLFxuICBpcHY2OiAnW2EtZlxcXFxkXXs0fSg6W2EtZlxcXFxkXXs0fSl7N30nLFxuICB1cmk6IFVSSV9QQVRURVJOLFxuICBzbHVnOiAnW2EtekEtWlxcXFxkXy1dKycsXG5cbiAgLy8gdHlwZXMgZnJvbSBkcmFmdC0wWzY3XSAoPylcbiAgJ3VyaS1yZWZlcmVuY2UnOiBgJHtVUklfUEFUVEVSTn0ke1BBUkFNX1BBVFRFUk59YCxcbiAgJ3VyaS10ZW1wbGF0ZSc6IFVSSV9QQVRURVJOLnJlcGxhY2UoJyg/OicsICcoPzovXFxcXHtbYS16XVs6YS16QS1aMC05LV0qXFxcXH18JyksXG4gICdqc29uLXBvaW50ZXInOiBgKC8oPzoke0ZSQUdNRU5ULnJlcGxhY2UoJ10qJywgJy9dKicpfXx+WzAxXSkpK2AsXG5cbiAgLy8gc29tZSB0eXBlcyBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9PQUkvT3BlbkFQSS1TcGVjaWZpY2F0aW9uL2Jsb2IvbWFzdGVyL3ZlcnNpb25zLzMuMC4xLm1kI2RhdGEtdHlwZXMgKD8pXG4gIHV1aWQ6ICdeWzAtOWEtZl17OH0tKD86WzAtOWEtZl17NH0tKXszfVswLTlhLWZdezEyfSQnLFxufTtcblxucmVnZXhwcy5pcmkgPSByZWdleHBzWyd1cmktcmVmZXJlbmNlJ107XG5yZWdleHBzWydpcmktcmVmZXJlbmNlJ10gPSByZWdleHBzWyd1cmktcmVmZXJlbmNlJ107XG5cbnJlZ2V4cHNbJ2lkbi1lbWFpbCddID0gcmVnZXhwcy5lbWFpbDtcbnJlZ2V4cHNbJ2lkbi1ob3N0bmFtZSddID0gcmVnZXhwcy5ob3N0bmFtZTtcblxuY29uc3QgQUxMT1dFRF9GT1JNQVRTID0gbmV3IFJlZ0V4cChgXFxcXHsoJHtPYmplY3Qua2V5cyhyZWdleHBzKS5qb2luKCd8Jyl9KVxcXFx9YCk7XG5cbi8qKlxuICogR2VuZXJhdGVzIHJhbmRvbWl6ZWQgc3RyaW5nIGJhc2luZyBvbiBhIGJ1aWx0LWluIHJlZ2V4IGZvcm1hdFxuICpcbiAqIEBwYXJhbSBjb3JlRm9ybWF0XG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBjb3JlRm9ybWF0R2VuZXJhdG9yKGNvcmVGb3JtYXQpIHtcbiAgcmV0dXJuIHJhbmRvbS5yYW5kZXhwKHJlZ2V4cHNbY29yZUZvcm1hdF0pLnJlcGxhY2UoQUxMT1dFRF9GT1JNQVRTLCAobWF0Y2gsIGtleSkgPT4ge1xuICAgIHJldHVybiByYW5kb20ucmFuZGV4cChyZWdleHBzW2tleV0pO1xuICB9KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY29yZUZvcm1hdEdlbmVyYXRvcjtcbiIsImltcG9ydCB0aHVuayBmcm9tICcuLi9nZW5lcmF0b3JzL3RodW5rJztcbmltcG9ydCBpcHY0IGZyb20gJy4uL2dlbmVyYXRvcnMvaXB2NCc7XG5pbXBvcnQgZGF0ZVRpbWUgZnJvbSAnLi4vZ2VuZXJhdG9ycy9kYXRlVGltZSc7XG5pbXBvcnQgZGF0ZSBmcm9tICcuLi9nZW5lcmF0b3JzL2RhdGUnO1xuaW1wb3J0IHRpbWUgZnJvbSAnLi4vZ2VuZXJhdG9ycy90aW1lJztcbmltcG9ydCBjb3JlRm9ybWF0IGZyb20gJy4uL2dlbmVyYXRvcnMvY29yZUZvcm1hdCc7XG5pbXBvcnQgb3B0aW9uQVBJIGZyb20gJy4uL2FwaS9vcHRpb24nO1xuaW1wb3J0IGZvcm1hdCBmcm9tICcuLi9hcGkvZm9ybWF0JztcbmltcG9ydCByYW5kb20gZnJvbSAnLi4vY29yZS9yYW5kb20nO1xuaW1wb3J0IHV0aWxzIGZyb20gJy4uL2NvcmUvdXRpbHMnO1xuXG5mdW5jdGlvbiBnZW5lcmF0ZUZvcm1hdCh2YWx1ZSwgaW52YWxpZCkge1xuICBjb25zdCBjYWxsYmFjayA9IGZvcm1hdCh2YWx1ZS5mb3JtYXQpO1xuXG4gIGlmICh0eXBlb2YgY2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gY2FsbGJhY2sodmFsdWUpO1xuICB9XG5cbiAgc3dpdGNoICh2YWx1ZS5mb3JtYXQpIHtcbiAgICBjYXNlICdkYXRlLXRpbWUnOlxuICAgIGNhc2UgJ2RhdGV0aW1lJzpcbiAgICAgIHJldHVybiBkYXRlVGltZSgpO1xuICAgIGNhc2UgJ2RhdGUnOlxuICAgICAgcmV0dXJuIGRhdGUoKTtcbiAgICBjYXNlICd0aW1lJzpcbiAgICAgIHJldHVybiB0aW1lKCk7XG4gICAgY2FzZSAnaXB2NCc6XG4gICAgICByZXR1cm4gaXB2NCgpO1xuICAgIGNhc2UgJ3JlZ2V4JzpcbiAgICAgIC8vIFRPRE86IGRpc2N1c3NcbiAgICAgIHJldHVybiAnLis/JztcbiAgICBjYXNlICdlbWFpbCc6XG4gICAgY2FzZSAnaG9zdG5hbWUnOlxuICAgIGNhc2UgJ2lwdjYnOlxuICAgIGNhc2UgJ3VyaSc6XG4gICAgY2FzZSAndXJpLXJlZmVyZW5jZSc6XG4gICAgY2FzZSAnaXJpJzpcbiAgICBjYXNlICdpcmktcmVmZXJlbmNlJzpcbiAgICBjYXNlICdpZG4tZW1haWwnOlxuICAgIGNhc2UgJ2lkbi1ob3N0bmFtZSc6XG4gICAgY2FzZSAnanNvbi1wb2ludGVyJzpcbiAgICBjYXNlICdzbHVnJzpcbiAgICBjYXNlICd1cmktdGVtcGxhdGUnOlxuICAgIGNhc2UgJ3V1aWQnOlxuICAgICAgcmV0dXJuIGNvcmVGb3JtYXQodmFsdWUuZm9ybWF0KTtcbiAgICBkZWZhdWx0OlxuICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgaWYgKG9wdGlvbkFQSSgnZmFpbE9uSW52YWxpZEZvcm1hdCcpKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGB1bmtub3duIHJlZ2lzdHJ5IGtleSAke3V0aWxzLnNob3J0KHZhbHVlLmZvcm1hdCl9YCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGludmFsaWQoKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYHVuc3VwcG9ydGVkIGZvcm1hdCAnJHt2YWx1ZS5mb3JtYXR9J2ApO1xuICB9XG59XG5cbmZ1bmN0aW9uIHN0cmluZ1R5cGUodmFsdWUpIHtcbiAgLy8gaGVyZSB3ZSBuZWVkIHRvIGZvcmNlIHR5cGUgdG8gZml4ICM0NjdcbiAgY29uc3Qgb3V0cHV0ID0gdXRpbHMudHlwZWNhc3QoJ3N0cmluZycsIHZhbHVlLCBvcHRzID0+IHtcbiAgICBpZiAodmFsdWUuZm9ybWF0KSB7XG4gICAgICByZXR1cm4gZ2VuZXJhdGVGb3JtYXQodmFsdWUsICgpID0+IHRodW5rKG9wdHMubWluTGVuZ3RoLCBvcHRzLm1heExlbmd0aCkpO1xuICAgIH1cblxuICAgIGlmICh2YWx1ZS5wYXR0ZXJuKSB7XG4gICAgICByZXR1cm4gcmFuZG9tLnJhbmRleHAodmFsdWUucGF0dGVybik7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRodW5rKG9wdHMubWluTGVuZ3RoLCBvcHRzLm1heExlbmd0aCk7XG4gIH0pO1xuXG4gIHJldHVybiBvdXRwdXQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHN0cmluZ1R5cGU7XG4iLCJpbXBvcnQgX2Jvb2xlYW4gZnJvbSAnLi9ib29sZWFuJztcbmltcG9ydCBfbnVsbCBmcm9tICcuL251bGwnO1xuaW1wb3J0IF9hcnJheSBmcm9tICcuL2FycmF5JztcbmltcG9ydCBfaW50ZWdlciBmcm9tICcuL2ludGVnZXInO1xuaW1wb3J0IF9udW1iZXIgZnJvbSAnLi9udW1iZXInO1xuaW1wb3J0IF9vYmplY3QgZnJvbSAnLi9vYmplY3QnO1xuaW1wb3J0IF9zdHJpbmcgZnJvbSAnLi9zdHJpbmcnO1xuXG5jb25zdCB0eXBlTWFwID0ge1xuICBib29sZWFuOiBfYm9vbGVhbixcbiAgbnVsbDogX251bGwsXG4gIGFycmF5OiBfYXJyYXksXG4gIGludGVnZXI6IF9pbnRlZ2VyLFxuICBudW1iZXI6IF9udW1iZXIsXG4gIG9iamVjdDogX29iamVjdCxcbiAgc3RyaW5nOiBfc3RyaW5nLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgdHlwZU1hcDtcbiIsImltcG9ydCB1dGlscyBmcm9tICcuL3V0aWxzJztcbmltcG9ydCByYW5kb20gZnJvbSAnLi9yYW5kb20nO1xuaW1wb3J0IFBhcnNlRXJyb3IgZnJvbSAnLi9lcnJvcic7XG5pbXBvcnQgaW5mZXJUeXBlIGZyb20gJy4vaW5mZXInO1xuaW1wb3J0IHR5cGVzIGZyb20gJy4uL3R5cGVzL2luZGV4JztcbmltcG9ydCBvcHRpb25BUEkgZnJvbSAnLi4vYXBpL29wdGlvbic7XG5cbmZ1bmN0aW9uIGdldE1ldGEoeyAkY29tbWVudDogY29tbWVudCwgdGl0bGUsIGRlc2NyaXB0aW9uIH0pIHtcbiAgcmV0dXJuIE9iamVjdC5lbnRyaWVzKHsgY29tbWVudCwgdGl0bGUsIGRlc2NyaXB0aW9uIH0pXG4gICAgLmZpbHRlcigoWywgdmFsdWVdKSA9PiB2YWx1ZSlcbiAgICAucmVkdWNlKChtZW1vLCBbaywgdl0pID0+IHtcbiAgICAgIG1lbW9ba10gPSB2O1xuICAgICAgcmV0dXJuIG1lbW87XG4gICAgfSwge30pO1xufVxuXG4vLyBUT0RPIHByb3ZpZGUgdHlwZXNcbmZ1bmN0aW9uIHRyYXZlcnNlKHNjaGVtYSwgcGF0aCwgcmVzb2x2ZSwgcm9vdFNjaGVtYSkge1xuICBzY2hlbWEgPSByZXNvbHZlKHNjaGVtYSwgbnVsbCwgcGF0aCk7XG5cbiAgaWYgKHNjaGVtYSAmJiAoc2NoZW1hLm9uZU9mIHx8IHNjaGVtYS5hbnlPZiB8fCBzY2hlbWEuYWxsT2YpKSB7XG4gICAgc2NoZW1hID0gcmVzb2x2ZShzY2hlbWEsIG51bGwsIHBhdGgpO1xuICB9XG5cbiAgaWYgKCFzY2hlbWEpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBjb250ZXh0ID0ge1xuICAgIC4uLmdldE1ldGEoc2NoZW1hKSxcbiAgICBzY2hlbWFQYXRoOiBwYXRoLFxuICB9O1xuXG4gIC8vIGRlZmF1bHQgdmFsdWVzIGhhcyBoaWdoZXIgcHJlY2VkZW5jZVxuICBpZiAocGF0aFtwYXRoLmxlbmd0aCAtIDFdICE9PSAncHJvcGVydGllcycpIHtcbiAgICAvLyBleGFtcGxlIHZhbHVlcyBoYXZlIGhpZ2hlc3QgcHJlY2VkZW5jZVxuICAgIGlmIChvcHRpb25BUEkoJ3VzZUV4YW1wbGVzVmFsdWUnKSAmJiBBcnJheS5pc0FycmF5KHNjaGVtYS5leGFtcGxlcykpIHtcbiAgICAgIC8vIGluY2x1ZGUgYGRlZmF1bHRgIHZhbHVlIGFzIGV4YW1wbGUgdG9vXG4gICAgICBjb25zdCBmaXhlZEV4YW1wbGVzID0gc2NoZW1hLmV4YW1wbGVzXG4gICAgICAgIC5jb25jYXQoJ2RlZmF1bHQnIGluIHNjaGVtYSA/IFtzY2hlbWEuZGVmYXVsdF0gOiBbXSk7XG5cbiAgICAgIHJldHVybiB7IHZhbHVlOiB1dGlscy50eXBlY2FzdChudWxsLCBzY2hlbWEsICgpID0+IHJhbmRvbS5waWNrKGZpeGVkRXhhbXBsZXMpKSwgY29udGV4dCB9O1xuICAgIH1cblxuICAgIGlmIChvcHRpb25BUEkoJ3VzZURlZmF1bHRWYWx1ZScpICYmICdkZWZhdWx0JyBpbiBzY2hlbWEpIHtcbiAgICAgIGlmIChzY2hlbWEuZGVmYXVsdCAhPT0gJycgfHwgIW9wdGlvbkFQSSgncmVwbGFjZUVtcHR5QnlSYW5kb21WYWx1ZScpKSB7XG4gICAgICAgIHJldHVybiB7IHZhbHVlOiBzY2hlbWEuZGVmYXVsdCwgY29udGV4dCB9O1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICgndGVtcGxhdGUnIGluIHNjaGVtYSkge1xuICAgICAgcmV0dXJuIHsgdmFsdWU6IHV0aWxzLnRlbXBsYXRlKHNjaGVtYS50ZW1wbGF0ZSwgcm9vdFNjaGVtYSksIGNvbnRleHQgfTtcbiAgICB9XG5cbiAgICBpZiAoJ2NvbnN0JyBpbiBzY2hlbWEpIHtcbiAgICAgIHJldHVybiB7IHZhbHVlOiBzY2hlbWEuY29uc3QsIGNvbnRleHQgfTtcbiAgICB9XG4gIH1cblxuICBpZiAoc2NoZW1hLm5vdCAmJiB0eXBlb2Ygc2NoZW1hLm5vdCA9PT0gJ29iamVjdCcpIHtcbiAgICBzY2hlbWEgPSB1dGlscy5ub3RWYWx1ZShzY2hlbWEubm90LCB1dGlscy5vbWl0UHJvcHMoc2NoZW1hLCBbJ25vdCddKSk7XG5cbiAgICAvLyBidWlsZCBuZXcgb2JqZWN0IHZhbHVlIGZyb20gbm90LXNjaGVtYSFcbiAgICBpZiAoc2NoZW1hLnR5cGUgJiYgc2NoZW1hLnR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgICBjb25zdCB7IHZhbHVlLCBjb250ZXh0OiBpbm5lckNvbnRleHQgfSA9IHRyYXZlcnNlKHNjaGVtYSwgcGF0aC5jb25jYXQoWydub3QnXSksIHJlc29sdmUsIHJvb3RTY2hlbWEpO1xuICAgICAgcmV0dXJuIHsgdmFsdWU6IHV0aWxzLmNsZWFuKHZhbHVlLCBzY2hlbWEsIGZhbHNlKSwgY29udGV4dDogeyAuLi5jb250ZXh0LCBpdGVtczogaW5uZXJDb250ZXh0IH0gfTtcbiAgICB9XG4gIH1cblxuICAvLyB0aHVua3MgY2FuIHJldHVybiBzdWItc2NoZW1hc1xuICBpZiAodHlwZW9mIHNjaGVtYS50aHVuayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIC8vIHJlc3VsdCBpcyBhbHJlYWR5IGNsZWFuZWQgaW4gdGh1bmtcbiAgICBjb25zdCB7IHZhbHVlLCBjb250ZXh0OiBpbm5lckNvbnRleHQgfSA9IHRyYXZlcnNlKHNjaGVtYS50aHVuayhyb290U2NoZW1hKSwgcGF0aCwgcmVzb2x2ZSk7XG4gICAgcmV0dXJuIHsgdmFsdWUsIGNvbnRleHQ6IHsgLi4uY29udGV4dCwgaXRlbXM6IGlubmVyQ29udGV4dCB9IH07XG4gIH1cblxuICBpZiAodHlwZW9mIHNjaGVtYS5nZW5lcmF0ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNvbnN0IHJldHZhbCA9IHV0aWxzLnR5cGVjYXN0KG51bGwsIHNjaGVtYSwgKCkgPT4gc2NoZW1hLmdlbmVyYXRlKHJvb3RTY2hlbWEsIHBhdGgpKTtcbiAgICBjb25zdCB0eXBlID0gcmV0dmFsID09PSBudWxsID8gJ251bGwnIDogdHlwZW9mIHJldHZhbDtcbiAgICBpZiAodHlwZSA9PT0gc2NoZW1hLnR5cGVcbiAgICAgIHx8IChBcnJheS5pc0FycmF5KHNjaGVtYS50eXBlKSAmJiBzY2hlbWEudHlwZS5pbmNsdWRlcyh0eXBlKSlcbiAgICAgIHx8ICh0eXBlID09PSAnbnVtYmVyJyAmJiBzY2hlbWEudHlwZSA9PT0gJ2ludGVnZXInKVxuICAgICAgfHwgKEFycmF5LmlzQXJyYXkocmV0dmFsKSAmJiBzY2hlbWEudHlwZSA9PT0gJ2FycmF5JykpIHtcbiAgICAgIHJldHVybiB7IHZhbHVlOiByZXR2YWwsIGNvbnRleHQgfTtcbiAgICB9XG4gIH1cblxuICBpZiAodHlwZW9mIHNjaGVtYS5wYXR0ZXJuID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiB7IHZhbHVlOiB1dGlscy50eXBlY2FzdCgnc3RyaW5nJywgc2NoZW1hLCAoKSA9PiByYW5kb20ucmFuZGV4cChzY2hlbWEucGF0dGVybikpLCBjb250ZXh0IH07XG4gIH1cblxuICBpZiAoQXJyYXkuaXNBcnJheShzY2hlbWEuZW51bSkpIHtcbiAgICByZXR1cm4geyB2YWx1ZTogdXRpbHMudHlwZWNhc3QobnVsbCwgc2NoZW1hLCAoKSA9PiByYW5kb20ucGljayhzY2hlbWEuZW51bSkpLCBjb250ZXh0IH07XG4gIH1cblxuICAvLyBzaG9ydC1jaXJjdWl0IGFzIHdlIGRvbid0IHBsYW4gZ2VuZXJhdGUgbW9yZSB2YWx1ZXMhXG4gIGlmIChzY2hlbWEuanNvblBhdGgpIHtcbiAgICByZXR1cm4geyB2YWx1ZTogc2NoZW1hLCBjb250ZXh0IH07XG4gIH1cblxuICAvLyBUT0RPIHJlbW92ZSB0aGUgdWdseSBvdmVyY29tZVxuICBsZXQgdHlwZSA9IHNjaGVtYS50eXBlO1xuXG4gIGlmIChBcnJheS5pc0FycmF5KHR5cGUpKSB7XG4gICAgdHlwZSA9IHJhbmRvbS5waWNrKHR5cGUpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiB0eXBlID09PSAndW5kZWZpbmVkJykge1xuICAgIC8vIEF0dGVtcHQgdG8gaW5mZXIgdGhlIHR5cGVcbiAgICB0eXBlID0gaW5mZXJUeXBlKHNjaGVtYSwgcGF0aCkgfHwgdHlwZTtcblxuICAgIGlmICh0eXBlKSB7XG4gICAgICBzY2hlbWEudHlwZSA9IHR5cGU7XG4gICAgfVxuICB9XG5cbiAgaWYgKHR5cGVvZiB0eXBlID09PSAnc3RyaW5nJykge1xuICAgIGlmICghdHlwZXNbdHlwZV0pIHtcbiAgICAgIGlmIChvcHRpb25BUEkoJ2ZhaWxPbkludmFsaWRUeXBlcycpKSB7XG4gICAgICAgIHRocm93IG5ldyBQYXJzZUVycm9yKGB1bmtub3duIHByaW1pdGl2ZSAke3V0aWxzLnNob3J0KHR5cGUpfWAsIHBhdGguY29uY2F0KFsndHlwZSddKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IG9wdGlvbkFQSSgnZGVmYXVsdEludmFsaWRUeXBlUHJvZHVjdCcpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnICYmIHR5cGVzW3ZhbHVlXSkge1xuICAgICAgICAgIHJldHVybiB7IHZhbHVlOiB0eXBlc1t2YWx1ZV0oc2NoZW1hLCBwYXRoLCByZXNvbHZlLCB0cmF2ZXJzZSksIGNvbnRleHQgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7IHZhbHVlLCBjb250ZXh0IH07XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGlubmVyUmVzdWx0ID0gdHlwZXNbdHlwZV0oc2NoZW1hLCBwYXRoLCByZXNvbHZlLCB0cmF2ZXJzZSk7XG4gICAgICAgIGlmICh0eXBlID09PSAnYXJyYXknKSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZhbHVlOiBpbm5lclJlc3VsdC5tYXAoKHsgdmFsdWUgfSkgPT4gdmFsdWUpLFxuICAgICAgICAgICAgY29udGV4dDoge1xuICAgICAgICAgICAgICAuLi5jb250ZXh0LFxuICAgICAgICAgICAgICBpdGVtczogaW5uZXJSZXN1bHQubWFwKFxuICAgICAgICAgICAgICAgIEFycmF5LmlzQXJyYXkoc2NoZW1hLml0ZW1zKVxuICAgICAgICAgICAgICAgICAgPyAoeyBjb250ZXh0OiBjIH0pID0+IGNcbiAgICAgICAgICAgICAgICAgIDogKHsgY29udGV4dDogYyB9KSA9PiAoe1xuICAgICAgICAgICAgICAgICAgICAuLi5jLFxuICAgICAgICAgICAgICAgICAgICAvLyB3ZSBoYXZlIHRvIHJlbW92ZSB0aGUgaW5kZXggZnJvbSB0aGUgcGF0aCB0byBnZXQgdGhlIHJlYWwgc2NoZW1hIHBhdGhcbiAgICAgICAgICAgICAgICAgICAgc2NoZW1hUGF0aDogYy5zY2hlbWFQYXRoLnNsaWNlKDAsIC0xKSxcbiAgICAgICAgICAgICAgICAgIH0pKSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICByZXR1cm4geyB2YWx1ZTogaW5uZXJSZXN1bHQudmFsdWUsIGNvbnRleHQ6IHsgLi4uY29udGV4dCwgaXRlbXM6IGlubmVyUmVzdWx0LmNvbnRleHQgfSB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IHZhbHVlOiBpbm5lclJlc3VsdCwgY29udGV4dCB9O1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBpZiAodHlwZW9mIGUucGF0aCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgUGFyc2VFcnJvcihlLnN0YWNrLCBwYXRoKTtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGxldCB2YWx1ZUNvcHkgPSB7fTtcbiAgbGV0IGNvbnRleHRDb3B5ID0geyAuLi5jb250ZXh0IH07XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkoc2NoZW1hKSkge1xuICAgIHZhbHVlQ29weSA9IFtdO1xuICB9XG5cbiAgT2JqZWN0LmtleXMoc2NoZW1hKS5mb3JFYWNoKHByb3AgPT4ge1xuICAgIGlmICh0eXBlb2Ygc2NoZW1hW3Byb3BdID09PSAnb2JqZWN0JyAmJiBwcm9wICE9PSAnZGVmaW5pdGlvbnMnKSB7XG4gICAgICBjb25zdCB7IHZhbHVlLCBjb250ZXh0OiBpbm5lckNvbnRleHQgfSA9IHRyYXZlcnNlKHNjaGVtYVtwcm9wXSwgcGF0aC5jb25jYXQoW3Byb3BdKSwgcmVzb2x2ZSwgdmFsdWVDb3B5KTtcbiAgICAgIHZhbHVlQ29weVtwcm9wXSA9IHV0aWxzLmNsZWFuKHZhbHVlLCBzY2hlbWFbcHJvcF0sIGZhbHNlKTtcbiAgICAgIGNvbnRleHRDb3B5W3Byb3BdID0gaW5uZXJDb250ZXh0O1xuICAgIH0gZWxzZSB7XG4gICAgICB2YWx1ZUNvcHlbcHJvcF0gPSBzY2hlbWFbcHJvcF07XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4geyB2YWx1ZTogdmFsdWVDb3B5LCBjb250ZXh0OiBjb250ZXh0Q29weSB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCB0cmF2ZXJzZTtcbiIsImltcG9ydCBvcHRpb25BUEkgZnJvbSAnLi4vYXBpL29wdGlvbic7XG5pbXBvcnQgcmFuZG9tIGZyb20gJy4vcmFuZG9tJztcbmltcG9ydCB1dGlscyBmcm9tICcuL3V0aWxzJztcblxuY29uc3QgYnVpbGRSZXNvbHZlU2NoZW1hID0gKHtcbiAgcmVmcyxcbiAgc2NoZW1hLFxuICBjb250YWluZXIsXG4gIHN5bmNocm9ub3VzLFxuICByZWZEZXB0aE1heCxcbiAgcmVmRGVwdGhNaW4sXG59KSA9PiB7XG4gIGNvbnN0IHJlY3Vyc2l2ZVV0aWwgPSB7fTtcbiAgY29uc3Qgc2VlblJlZnMgPSB7fTtcblxuICBsZXQgZGVwdGggPSAwO1xuICBsZXQgbGFzdFJlZjtcbiAgbGV0IGxhc3RQYXRoO1xuXG4gIHJlY3Vyc2l2ZVV0aWwucmVzb2x2ZVNjaGVtYSA9IChzdWIsIGluZGV4LCByb290UGF0aCkgPT4ge1xuICAgIC8vIHByZXZlbnQgbnVsbCBzdWIgZnJvbSBkZWZhdWx0L2V4YW1wbGUgbnVsbCB2YWx1ZXMgdG8gdGhyb3dcbiAgICBpZiAoc3ViID09PSBudWxsIHx8IHN1YiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHN1Yi5nZW5lcmF0ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIHN1YjtcbiAgICB9XG5cbiAgICAvLyBjbGVhbnVwXG4gICAgY29uc3QgX2lkID0gc3ViLiRpZCB8fCBzdWIuaWQ7XG5cbiAgICBpZiAodHlwZW9mIF9pZCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGRlbGV0ZSBzdWIuaWQ7XG4gICAgICBkZWxldGUgc3ViLiRpZDtcbiAgICAgIGRlbGV0ZSBzdWIuJHNjaGVtYTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHN1Yi4kcmVmID09PSAnc3RyaW5nJykge1xuICAgICAgY29uc3QgbWF4RGVwdGggPSBNYXRoLm1heChyZWZEZXB0aE1pbiwgcmVmRGVwdGhNYXgpIC0gMTtcblxuICAgICAgLy8gaW5jcmVhc2luZyBkZXB0aCBvbmx5IGZvciByZXBlYXRlZCByZWZzIHNlZW1zIHRvIGJlIGZpeGluZyAjMjU4XG4gICAgICBpZiAoc3ViLiRyZWYgPT09ICcjJyB8fCBzZWVuUmVmc1tzdWIuJHJlZl0gPCAwIHx8IChsYXN0UmVmID09PSBzdWIuJHJlZiAmJiArK2RlcHRoID4gbWF4RGVwdGgpKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgICAgaWYgKHN1Yi4kcmVmICE9PSAnIycgJiYgbGFzdFBhdGggJiYgbGFzdFBhdGgubGVuZ3RoID09PSByb290UGF0aC5sZW5ndGgpIHtcbiAgICAgICAgICByZXR1cm4gdXRpbHMuZ2V0TG9jYWxSZWYoc2NoZW1hLCBzdWIuJHJlZiwgc3luY2hyb25vdXMgJiYgcmVmcyk7XG4gICAgICAgIH1cbiAgICAgICAgZGVsZXRlIHN1Yi4kcmVmO1xuICAgICAgICByZXR1cm4gc3ViO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIHNlZW5SZWZzW3N1Yi4kcmVmXSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgc2VlblJlZnNbc3ViLiRyZWZdID0gcmFuZG9tLm51bWJlcihyZWZEZXB0aE1pbiwgcmVmRGVwdGhNYXgpIC0gMTtcbiAgICAgIH1cblxuICAgICAgbGFzdFBhdGggPSByb290UGF0aDtcbiAgICAgIGxhc3RSZWYgPSBzdWIuJHJlZjtcblxuICAgICAgbGV0IHJlZjtcblxuICAgICAgaWYgKHN1Yi4kcmVmLmluZGV4T2YoJyMvJykgPT09IC0xKSB7XG4gICAgICAgIHJlZiA9IHJlZnNbc3ViLiRyZWZdIHx8IG51bGw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZWYgPSB1dGlscy5nZXRMb2NhbFJlZihzY2hlbWEsIHN1Yi4kcmVmLCBzeW5jaHJvbm91cyAmJiByZWZzKSB8fCBudWxsO1xuICAgICAgfVxuXG4gICAgICBsZXQgZml4ZWQ7XG4gICAgICBpZiAodHlwZW9mIHJlZiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgaWYgKCFyZWYgJiYgb3B0aW9uQVBJKCdpZ25vcmVNaXNzaW5nUmVmcycpICE9PSB0cnVlKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBSZWZlcmVuY2Ugbm90IGZvdW5kOiAke3N1Yi4kcmVmfWApO1xuICAgICAgICB9XG5cbiAgICAgICAgc2VlblJlZnNbc3ViLiRyZWZdIC09IDE7XG4gICAgICAgIHV0aWxzLm1lcmdlKHN1YiwgcmVmIHx8IHt9KTtcbiAgICAgICAgZml4ZWQgPSBzeW5jaHJvbm91cyAmJiByZWYgJiYgcmVmLiRyZWY7XG4gICAgICB9XG5cbiAgICAgIC8vIGp1c3QgcmVtb3ZlIHRoZSByZWZlcmVuY2VcbiAgICAgIGlmICghZml4ZWQpIGRlbGV0ZSBzdWIuJHJlZjtcbiAgICAgIHJldHVybiBzdWI7XG4gICAgfVxuXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoc3ViLmFsbE9mKSkge1xuICAgICAgY29uc3Qgc2NoZW1hcyA9IHN1Yi5hbGxPZjtcblxuICAgICAgZGVsZXRlIHN1Yi5hbGxPZjtcblxuICAgICAgLy8gdGhpcyBpcyB0aGUgb25seSBjYXNlIHdoZXJlIGFsbCBzdWItc2NoZW1hc1xuICAgICAgLy8gbXVzdCBiZSByZXNvbHZlZCBiZWZvcmUgYW55IG1lcmdlXG4gICAgICBzY2hlbWFzLmZvckVhY2goc3ViU2NoZW1hID0+IHtcbiAgICAgICAgY29uc3QgX3N1YiA9IHJlY3Vyc2l2ZVV0aWwucmVzb2x2ZVNjaGVtYShzdWJTY2hlbWEsIG51bGwsIHJvb3RQYXRoKTtcblxuICAgICAgICAvLyBjYWxsIGdpdmVuIHRodW5rcyBpZiBwcmVzZW50XG4gICAgICAgIHV0aWxzLm1lcmdlKHN1YiwgdHlwZW9mIF9zdWIudGh1bmsgPT09ICdmdW5jdGlvbidcbiAgICAgICAgICA/IF9zdWIudGh1bmsoc3ViKVxuICAgICAgICAgIDogX3N1Yik7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHN1Yi5hbGxPZikpIHtcbiAgICAgICAgICByZWN1cnNpdmVVdGlsLnJlc29sdmVTY2hlbWEoc3ViLCBpbmRleCwgcm9vdFBhdGgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheShzdWIub25lT2YgfHwgc3ViLmFueU9mKSkge1xuICAgICAgY29uc3QgbWl4ID0gc3ViLm9uZU9mIHx8IHN1Yi5hbnlPZjtcblxuICAgICAgLy8gdGVzdCBldmVyeSB2YWx1ZSBmcm9tIHRoZSBlbnVtIGFnYWluc3QgZWFjaC1vbmVPZlxuICAgICAgLy8gc2NoZW1hLCBvbmx5IHZhbHVlcyB0aGF0IHZhbGlkYXRlIG9uY2UgYXJlIGtlcHRcbiAgICAgIGlmIChzdWIuZW51bSAmJiBzdWIub25lT2YpIHtcbiAgICAgICAgc3ViLmVudW0gPSBzdWIuZW51bS5maWx0ZXIoeCA9PiB1dGlscy52YWxpZGF0ZSh4LCBtaXgpKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdGh1bmsocm9vdFNjaGVtYSkge1xuICAgICAgICAgIGNvbnN0IGNvcHkgPSB1dGlscy5vbWl0UHJvcHMoc3ViLCBbJ2FueU9mJywgJ29uZU9mJ10pO1xuICAgICAgICAgIGNvbnN0IGZpeGVkID0gcmFuZG9tLnBpY2sobWl4KTtcblxuICAgICAgICAgIHV0aWxzLm1lcmdlKGNvcHksIGZpeGVkKTtcblxuICAgICAgICAgIC8vIHJlbW92ZSBhZGRpdGlvbmFsIHByb3BlcnRpZXMgZnJvbSBtZXJnZWQgc2NoZW1hc1xuICAgICAgICAgIG1peC5mb3JFYWNoKG9taXQgPT4ge1xuICAgICAgICAgICAgaWYgKG9taXQucmVxdWlyZWQgJiYgb21pdCAhPT0gZml4ZWQpIHtcbiAgICAgICAgICAgICAgb21pdC5yZXF1aXJlZC5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgaW5jbHVkZXNLZXkgPSBjb3B5LnJlcXVpcmVkICYmIGNvcHkucmVxdWlyZWQuaW5jbHVkZXMoa2V5KTtcbiAgICAgICAgICAgICAgICBpZiAoY29weS5wcm9wZXJ0aWVzICYmICFpbmNsdWRlc0tleSkge1xuICAgICAgICAgICAgICAgICAgZGVsZXRlIGNvcHkucHJvcGVydGllc1trZXldO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChyb290U2NoZW1hICYmIHJvb3RTY2hlbWEucHJvcGVydGllcykge1xuICAgICAgICAgICAgICAgICAgZGVsZXRlIHJvb3RTY2hlbWEucHJvcGVydGllc1trZXldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICByZXR1cm4gY29weTtcbiAgICAgICAgfSxcbiAgICAgIH07XG4gICAgfVxuXG4gICAgT2JqZWN0LmtleXMoc3ViKS5mb3JFYWNoKHByb3AgPT4ge1xuICAgICAgaWYgKChBcnJheS5pc0FycmF5KHN1Yltwcm9wXSkgfHwgdHlwZW9mIHN1Yltwcm9wXSA9PT0gJ29iamVjdCcpICYmICF1dGlscy5pc0tleShwcm9wKSkge1xuICAgICAgICBzdWJbcHJvcF0gPSByZWN1cnNpdmVVdGlsLnJlc29sdmVTY2hlbWEoc3ViW3Byb3BdLCBwcm9wLCByb290UGF0aC5jb25jYXQocHJvcCkpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gYXZvaWQgZXh0cmEgY2FsbHMgb24gc3ViLXNjaGVtYXMsIGZpeGVzICM0NThcbiAgICBpZiAocm9vdFBhdGgpIHtcbiAgICAgIGNvbnN0IGxhc3RQcm9wID0gcm9vdFBhdGhbcm9vdFBhdGgubGVuZ3RoIC0gMV07XG5cbiAgICAgIGlmIChsYXN0UHJvcCA9PT0gJ3Byb3BlcnRpZXMnIHx8IGxhc3RQcm9wID09PSAnaXRlbXMnKSB7XG4gICAgICAgIHJldHVybiBzdWI7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbnRhaW5lci53cmFwKHN1Yik7XG4gIH07XG5cbiAgcmV0dXJuIHJlY3Vyc2l2ZVV0aWw7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBidWlsZFJlc29sdmVTY2hlbWE7XG4iLCJpbXBvcnQgeyBnZXREZXBlbmRlbmNpZXMgfSBmcm9tICcuLi92ZW5kb3InO1xuaW1wb3J0IG9wdGlvbkFQSSBmcm9tICcuLi9hcGkvb3B0aW9uJztcbmltcG9ydCB0cmF2ZXJzZSBmcm9tICcuL3RyYXZlcnNlJztcbmltcG9ydCByYW5kb20gZnJvbSAnLi9yYW5kb20nO1xuaW1wb3J0IHV0aWxzIGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IGJ1aWxkUmVzb2x2ZVNjaGVtYSBmcm9tICcuL2J1aWxkUmVzb2x2ZVNjaGVtYSc7XG5cbmZ1bmN0aW9uIHBpY2soZGF0YSkge1xuICByZXR1cm4gQXJyYXkuaXNBcnJheShkYXRhKVxuICAgID8gcmFuZG9tLnBpY2soZGF0YSlcbiAgICA6IGRhdGE7XG59XG5cbmZ1bmN0aW9uIGN5Y2xlKGRhdGEsIHJldmVyc2UpIHtcbiAgaWYgKCFBcnJheS5pc0FycmF5KGRhdGEpKSB7XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICBjb25zdCB2YWx1ZSA9IHJldmVyc2VcbiAgICA/IGRhdGEucG9wKClcbiAgICA6IGRhdGEuc2hpZnQoKTtcblxuICBpZiAocmV2ZXJzZSkge1xuICAgIGRhdGEudW5zaGlmdCh2YWx1ZSk7XG4gIH0gZWxzZSB7XG4gICAgZGF0YS5wdXNoKHZhbHVlKTtcbiAgfVxuXG4gIHJldHVybiB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gcmVzb2x2ZShvYmosIGRhdGEsIHZhbHVlcywgcHJvcGVydHkpIHtcbiAgaWYgKCFvYmogfHwgdHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gb2JqO1xuICB9XG5cbiAgaWYgKCF2YWx1ZXMpIHtcbiAgICB2YWx1ZXMgPSB7fTtcbiAgfVxuXG4gIGlmICghZGF0YSkge1xuICAgIGRhdGEgPSBvYmo7XG4gIH1cblxuICBpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XG4gICAgcmV0dXJuIG9iai5tYXAoeCA9PiByZXNvbHZlKHgsIGRhdGEsIHZhbHVlcywgcHJvcGVydHkpKTtcbiAgfVxuXG4gIGlmIChvYmouanNvblBhdGgpIHtcbiAgICBjb25zdCB7IEpTT05QYXRoIH0gPSBnZXREZXBlbmRlbmNpZXMoKTtcblxuICAgIGNvbnN0IHBhcmFtcyA9IHR5cGVvZiBvYmouanNvblBhdGggIT09ICdvYmplY3QnXG4gICAgICA/IHsgcGF0aDogb2JqLmpzb25QYXRoIH1cbiAgICAgIDogb2JqLmpzb25QYXRoO1xuXG4gICAgcGFyYW1zLmdyb3VwID0gb2JqLmdyb3VwIHx8IHBhcmFtcy5ncm91cCB8fCBwcm9wZXJ0eTtcbiAgICBwYXJhbXMuY3ljbGUgPSBvYmouY3ljbGUgfHwgcGFyYW1zLmN5Y2xlIHx8IGZhbHNlO1xuICAgIHBhcmFtcy5yZXZlcnNlID0gb2JqLnJldmVyc2UgfHwgcGFyYW1zLnJldmVyc2UgfHwgZmFsc2U7XG4gICAgcGFyYW1zLmNvdW50ID0gb2JqLmNvdW50IHx8IHBhcmFtcy5jb3VudCB8fCAxO1xuXG4gICAgY29uc3Qga2V5ID0gYCR7cGFyYW1zLmdyb3VwfV9fJHtwYXJhbXMucGF0aH1gO1xuXG4gICAgaWYgKCF2YWx1ZXNba2V5XSkge1xuICAgICAgaWYgKHBhcmFtcy5jb3VudCA+IDEpIHtcbiAgICAgICAgdmFsdWVzW2tleV0gPSBKU09OUGF0aChwYXJhbXMucGF0aCwgZGF0YSkuc2xpY2UoMCwgcGFyYW1zLmNvdW50KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbHVlc1trZXldID0gSlNPTlBhdGgocGFyYW1zLnBhdGgsIGRhdGEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChwYXJhbXMuY3ljbGUgfHwgcGFyYW1zLnJldmVyc2UpIHtcbiAgICAgIHJldHVybiBjeWNsZSh2YWx1ZXNba2V5XSwgcGFyYW1zLnJldmVyc2UpO1xuICAgIH1cblxuICAgIHJldHVybiBwaWNrKHZhbHVlc1trZXldKTtcbiAgfVxuXG4gIE9iamVjdC5rZXlzKG9iaikuZm9yRWFjaChrID0+IHtcbiAgICBvYmpba10gPSByZXNvbHZlKG9ialtrXSwgZGF0YSwgdmFsdWVzLCBrKTtcbiAgfSk7XG5cbiAgcmV0dXJuIG9iajtcbn1cblxuLy8gVE9ETyBwcm92aWRlIHR5cGVzP1xuZnVuY3Rpb24gcnVuKHJlZnMsIHNjaGVtYSwgY29udGFpbmVyLCBzeW5jaHJvbm91cykge1xuICBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHNjaGVtYSkgIT09ICdbb2JqZWN0IE9iamVjdF0nKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGlucHV0LCBleHBlY3Rpbmcgb2JqZWN0IGJ1dCBnaXZlbiAke3R5cGVvZiBzY2hlbWF9YCk7XG4gIH1cblxuICBjb25zdCByZWZEZXB0aE1pbiA9IG9wdGlvbkFQSSgncmVmRGVwdGhNaW4nKSB8fCAwO1xuICBjb25zdCByZWZEZXB0aE1heCA9IG9wdGlvbkFQSSgncmVmRGVwdGhNYXgnKSB8fCAzO1xuXG4gIHRyeSB7XG4gICAgY29uc3QgeyByZXNvbHZlU2NoZW1hIH0gPSBidWlsZFJlc29sdmVTY2hlbWEoe1xuICAgICAgcmVmcyxcbiAgICAgIHNjaGVtYSxcbiAgICAgIGNvbnRhaW5lcixcbiAgICAgIHN5bmNocm9ub3VzLFxuICAgICAgcmVmRGVwdGhNaW4sXG4gICAgICByZWZEZXB0aE1heCxcbiAgICB9KTtcbiAgICBjb25zdCByZXN1bHQgPSB0cmF2ZXJzZSh1dGlscy5jbG9uZShzY2hlbWEpLCBbXSwgcmVzb2x2ZVNjaGVtYSk7XG5cbiAgICBpZiAob3B0aW9uQVBJKCdyZXNvbHZlSnNvblBhdGgnKSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdmFsdWU6IHJlc29sdmUocmVzdWx0LnZhbHVlKSxcbiAgICAgICAgY29udGV4dDogcmVzdWx0LmNvbnRleHQsXG4gICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBpZiAoZS5wYXRoKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7ZS5tZXNzYWdlfSBpbiAvJHtlLnBhdGguam9pbignLycpfWApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBlO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBydW47XG4iLCJmdW5jdGlvbiByZW5kZXJKUyhyZXMpIHtcbiAgcmV0dXJuIHJlcy52YWx1ZTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgcmVuZGVySlM7XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IENoYXIgPSB7XG4gIEFOQ0hPUjogJyYnLFxuICBDT01NRU5UOiAnIycsXG4gIFRBRzogJyEnLFxuICBESVJFQ1RJVkVTX0VORDogJy0nLFxuICBET0NVTUVOVF9FTkQ6ICcuJ1xufTtcbmNvbnN0IFR5cGUgPSB7XG4gIEFMSUFTOiAnQUxJQVMnLFxuICBCTEFOS19MSU5FOiAnQkxBTktfTElORScsXG4gIEJMT0NLX0ZPTERFRDogJ0JMT0NLX0ZPTERFRCcsXG4gIEJMT0NLX0xJVEVSQUw6ICdCTE9DS19MSVRFUkFMJyxcbiAgQ09NTUVOVDogJ0NPTU1FTlQnLFxuICBESVJFQ1RJVkU6ICdESVJFQ1RJVkUnLFxuICBET0NVTUVOVDogJ0RPQ1VNRU5UJyxcbiAgRkxPV19NQVA6ICdGTE9XX01BUCcsXG4gIEZMT1dfU0VROiAnRkxPV19TRVEnLFxuICBNQVA6ICdNQVAnLFxuICBNQVBfS0VZOiAnTUFQX0tFWScsXG4gIE1BUF9WQUxVRTogJ01BUF9WQUxVRScsXG4gIFBMQUlOOiAnUExBSU4nLFxuICBRVU9URV9ET1VCTEU6ICdRVU9URV9ET1VCTEUnLFxuICBRVU9URV9TSU5HTEU6ICdRVU9URV9TSU5HTEUnLFxuICBTRVE6ICdTRVEnLFxuICBTRVFfSVRFTTogJ1NFUV9JVEVNJ1xufTtcbmNvbnN0IGRlZmF1bHRUYWdQcmVmaXggPSAndGFnOnlhbWwub3JnLDIwMDI6JztcbmNvbnN0IGRlZmF1bHRUYWdzID0ge1xuICBNQVA6ICd0YWc6eWFtbC5vcmcsMjAwMjptYXAnLFxuICBTRVE6ICd0YWc6eWFtbC5vcmcsMjAwMjpzZXEnLFxuICBTVFI6ICd0YWc6eWFtbC5vcmcsMjAwMjpzdHInXG59O1xuXG5mdW5jdGlvbiBmaW5kTGluZVN0YXJ0cyhzcmMpIHtcbiAgY29uc3QgbHMgPSBbMF07XG4gIGxldCBvZmZzZXQgPSBzcmMuaW5kZXhPZignXFxuJyk7XG5cbiAgd2hpbGUgKG9mZnNldCAhPT0gLTEpIHtcbiAgICBvZmZzZXQgKz0gMTtcbiAgICBscy5wdXNoKG9mZnNldCk7XG4gICAgb2Zmc2V0ID0gc3JjLmluZGV4T2YoJ1xcbicsIG9mZnNldCk7XG4gIH1cblxuICByZXR1cm4gbHM7XG59XG5cbmZ1bmN0aW9uIGdldFNyY0luZm8oY3N0KSB7XG4gIGxldCBsaW5lU3RhcnRzLCBzcmM7XG5cbiAgaWYgKHR5cGVvZiBjc3QgPT09ICdzdHJpbmcnKSB7XG4gICAgbGluZVN0YXJ0cyA9IGZpbmRMaW5lU3RhcnRzKGNzdCk7XG4gICAgc3JjID0gY3N0O1xuICB9IGVsc2Uge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGNzdCkpIGNzdCA9IGNzdFswXTtcblxuICAgIGlmIChjc3QgJiYgY3N0LmNvbnRleHQpIHtcbiAgICAgIGlmICghY3N0LmxpbmVTdGFydHMpIGNzdC5saW5lU3RhcnRzID0gZmluZExpbmVTdGFydHMoY3N0LmNvbnRleHQuc3JjKTtcbiAgICAgIGxpbmVTdGFydHMgPSBjc3QubGluZVN0YXJ0cztcbiAgICAgIHNyYyA9IGNzdC5jb250ZXh0LnNyYztcbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGxpbmVTdGFydHMsXG4gICAgc3JjXG4gIH07XG59XG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IExpbmVQb3MgLSBPbmUtaW5kZXhlZCBwb3NpdGlvbiBpbiB0aGUgc291cmNlXG4gKiBAcHJvcGVydHkge251bWJlcn0gbGluZVxuICogQHByb3BlcnR5IHtudW1iZXJ9IGNvbFxuICovXG5cbi8qKlxuICogRGV0ZXJtaW5lIHRoZSBsaW5lL2NvbCBwb3NpdGlvbiBtYXRjaGluZyBhIGNoYXJhY3RlciBvZmZzZXQuXG4gKlxuICogQWNjZXB0cyBhIHNvdXJjZSBzdHJpbmcgb3IgYSBDU1QgZG9jdW1lbnQgYXMgdGhlIHNlY29uZCBwYXJhbWV0ZXIuIFdpdGhcbiAqIHRoZSBsYXR0ZXIsIHN0YXJ0aW5nIGluZGljZXMgZm9yIGxpbmVzIGFyZSBjYWNoZWQgaW4gdGhlIGRvY3VtZW50IGFzXG4gKiBgbGluZVN0YXJ0czogbnVtYmVyW11gLlxuICpcbiAqIFJldHVybnMgYSBvbmUtaW5kZXhlZCBgeyBsaW5lLCBjb2wgfWAgbG9jYXRpb24gaWYgZm91bmQsIG9yXG4gKiBgdW5kZWZpbmVkYCBvdGhlcndpc2UuXG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IG9mZnNldFxuICogQHBhcmFtIHtzdHJpbmd8RG9jdW1lbnR8RG9jdW1lbnRbXX0gY3N0XG4gKiBAcmV0dXJucyB7P0xpbmVQb3N9XG4gKi9cblxuXG5mdW5jdGlvbiBnZXRMaW5lUG9zKG9mZnNldCwgY3N0KSB7XG4gIGlmICh0eXBlb2Ygb2Zmc2V0ICE9PSAnbnVtYmVyJyB8fCBvZmZzZXQgPCAwKSByZXR1cm4gbnVsbDtcbiAgY29uc3Qge1xuICAgIGxpbmVTdGFydHMsXG4gICAgc3JjXG4gIH0gPSBnZXRTcmNJbmZvKGNzdCk7XG4gIGlmICghbGluZVN0YXJ0cyB8fCAhc3JjIHx8IG9mZnNldCA+IHNyYy5sZW5ndGgpIHJldHVybiBudWxsO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGluZVN0YXJ0cy5sZW5ndGg7ICsraSkge1xuICAgIGNvbnN0IHN0YXJ0ID0gbGluZVN0YXJ0c1tpXTtcblxuICAgIGlmIChvZmZzZXQgPCBzdGFydCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbGluZTogaSxcbiAgICAgICAgY29sOiBvZmZzZXQgLSBsaW5lU3RhcnRzW2kgLSAxXSArIDFcbiAgICAgIH07XG4gICAgfVxuXG4gICAgaWYgKG9mZnNldCA9PT0gc3RhcnQpIHJldHVybiB7XG4gICAgICBsaW5lOiBpICsgMSxcbiAgICAgIGNvbDogMVxuICAgIH07XG4gIH1cblxuICBjb25zdCBsaW5lID0gbGluZVN0YXJ0cy5sZW5ndGg7XG4gIHJldHVybiB7XG4gICAgbGluZSxcbiAgICBjb2w6IG9mZnNldCAtIGxpbmVTdGFydHNbbGluZSAtIDFdICsgMVxuICB9O1xufVxuLyoqXG4gKiBHZXQgYSBzcGVjaWZpZWQgbGluZSBmcm9tIHRoZSBzb3VyY2UuXG4gKlxuICogQWNjZXB0cyBhIHNvdXJjZSBzdHJpbmcgb3IgYSBDU1QgZG9jdW1lbnQgYXMgdGhlIHNlY29uZCBwYXJhbWV0ZXIuIFdpdGhcbiAqIHRoZSBsYXR0ZXIsIHN0YXJ0aW5nIGluZGljZXMgZm9yIGxpbmVzIGFyZSBjYWNoZWQgaW4gdGhlIGRvY3VtZW50IGFzXG4gKiBgbGluZVN0YXJ0czogbnVtYmVyW11gLlxuICpcbiAqIFJldHVybnMgdGhlIGxpbmUgYXMgYSBzdHJpbmcgaWYgZm91bmQsIG9yIGBudWxsYCBvdGhlcndpc2UuXG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IGxpbmUgT25lLWluZGV4ZWQgbGluZSBudW1iZXJcbiAqIEBwYXJhbSB7c3RyaW5nfERvY3VtZW50fERvY3VtZW50W119IGNzdFxuICogQHJldHVybnMgez9zdHJpbmd9XG4gKi9cblxuZnVuY3Rpb24gZ2V0TGluZShsaW5lLCBjc3QpIHtcbiAgY29uc3Qge1xuICAgIGxpbmVTdGFydHMsXG4gICAgc3JjXG4gIH0gPSBnZXRTcmNJbmZvKGNzdCk7XG4gIGlmICghbGluZVN0YXJ0cyB8fCAhKGxpbmUgPj0gMSkgfHwgbGluZSA+IGxpbmVTdGFydHMubGVuZ3RoKSByZXR1cm4gbnVsbDtcbiAgY29uc3Qgc3RhcnQgPSBsaW5lU3RhcnRzW2xpbmUgLSAxXTtcbiAgbGV0IGVuZCA9IGxpbmVTdGFydHNbbGluZV07IC8vIHVuZGVmaW5lZCBmb3IgbGFzdCBsaW5lOyB0aGF0J3Mgb2sgZm9yIHNsaWNlKClcblxuICB3aGlsZSAoZW5kICYmIGVuZCA+IHN0YXJ0ICYmIHNyY1tlbmQgLSAxXSA9PT0gJ1xcbicpIC0tZW5kO1xuXG4gIHJldHVybiBzcmMuc2xpY2Uoc3RhcnQsIGVuZCk7XG59XG4vKipcbiAqIFByZXR0eS1wcmludCB0aGUgc3RhcnRpbmcgbGluZSBmcm9tIHRoZSBzb3VyY2UgaW5kaWNhdGVkIGJ5IHRoZSByYW5nZSBgcG9zYFxuICpcbiAqIFRyaW1zIG91dHB1dCB0byBgbWF4V2lkdGhgIGNoYXJzIHdoaWxlIGtlZXBpbmcgdGhlIHN0YXJ0aW5nIGNvbHVtbiB2aXNpYmxlLFxuICogdXNpbmcgYOKApmAgYXQgZWl0aGVyIGVuZCB0byBpbmRpY2F0ZSBkcm9wcGVkIGNoYXJhY3RlcnMuXG4gKlxuICogUmV0dXJucyBhIHR3by1saW5lIHN0cmluZyAob3IgYG51bGxgKSB3aXRoIGBcXG5gIGFzIHNlcGFyYXRvcjsgdGhlIHNlY29uZCBsaW5lXG4gKiB3aWxsIGhvbGQgYXBwcm9wcmlhdGVseSBpbmRlbnRlZCBgXmAgbWFya3MgaW5kaWNhdGluZyB0aGUgY29sdW1uIHJhbmdlLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBwb3NcbiAqIEBwYXJhbSB7TGluZVBvc30gcG9zLnN0YXJ0XG4gKiBAcGFyYW0ge0xpbmVQb3N9IFtwb3MuZW5kXVxuICogQHBhcmFtIHtzdHJpbmd8RG9jdW1lbnR8RG9jdW1lbnRbXSp9IGNzdFxuICogQHBhcmFtIHtudW1iZXJ9IFttYXhXaWR0aD04MF1cbiAqIEByZXR1cm5zIHs/c3RyaW5nfVxuICovXG5cbmZ1bmN0aW9uIGdldFByZXR0eUNvbnRleHQoe1xuICBzdGFydCxcbiAgZW5kXG59LCBjc3QsIG1heFdpZHRoID0gODApIHtcbiAgbGV0IHNyYyA9IGdldExpbmUoc3RhcnQubGluZSwgY3N0KTtcbiAgaWYgKCFzcmMpIHJldHVybiBudWxsO1xuICBsZXQge1xuICAgIGNvbFxuICB9ID0gc3RhcnQ7XG5cbiAgaWYgKHNyYy5sZW5ndGggPiBtYXhXaWR0aCkge1xuICAgIGlmIChjb2wgPD0gbWF4V2lkdGggLSAxMCkge1xuICAgICAgc3JjID0gc3JjLnN1YnN0cigwLCBtYXhXaWR0aCAtIDEpICsgJ+KApic7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGhhbGZXaWR0aCA9IE1hdGgucm91bmQobWF4V2lkdGggLyAyKTtcbiAgICAgIGlmIChzcmMubGVuZ3RoID4gY29sICsgaGFsZldpZHRoKSBzcmMgPSBzcmMuc3Vic3RyKDAsIGNvbCArIGhhbGZXaWR0aCAtIDEpICsgJ+KApic7XG4gICAgICBjb2wgLT0gc3JjLmxlbmd0aCAtIG1heFdpZHRoO1xuICAgICAgc3JjID0gJ+KApicgKyBzcmMuc3Vic3RyKDEgLSBtYXhXaWR0aCk7XG4gICAgfVxuICB9XG5cbiAgbGV0IGVyckxlbiA9IDE7XG4gIGxldCBlcnJFbmQgPSAnJztcblxuICBpZiAoZW5kKSB7XG4gICAgaWYgKGVuZC5saW5lID09PSBzdGFydC5saW5lICYmIGNvbCArIChlbmQuY29sIC0gc3RhcnQuY29sKSA8PSBtYXhXaWR0aCArIDEpIHtcbiAgICAgIGVyckxlbiA9IGVuZC5jb2wgLSBzdGFydC5jb2w7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVyckxlbiA9IE1hdGgubWluKHNyYy5sZW5ndGggKyAxLCBtYXhXaWR0aCkgLSBjb2w7XG4gICAgICBlcnJFbmQgPSAn4oCmJztcbiAgICB9XG4gIH1cblxuICBjb25zdCBvZmZzZXQgPSBjb2wgPiAxID8gJyAnLnJlcGVhdChjb2wgLSAxKSA6ICcnO1xuICBjb25zdCBlcnIgPSAnXicucmVwZWF0KGVyckxlbik7XG4gIHJldHVybiBgJHtzcmN9XFxuJHtvZmZzZXR9JHtlcnJ9JHtlcnJFbmR9YDtcbn1cblxuY2xhc3MgUmFuZ2Uge1xuICBzdGF0aWMgY29weShvcmlnKSB7XG4gICAgcmV0dXJuIG5ldyBSYW5nZShvcmlnLnN0YXJ0LCBvcmlnLmVuZCk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihzdGFydCwgZW5kKSB7XG4gICAgdGhpcy5zdGFydCA9IHN0YXJ0O1xuICAgIHRoaXMuZW5kID0gZW5kIHx8IHN0YXJ0O1xuICB9XG5cbiAgaXNFbXB0eSgpIHtcbiAgICByZXR1cm4gdHlwZW9mIHRoaXMuc3RhcnQgIT09ICdudW1iZXInIHx8ICF0aGlzLmVuZCB8fCB0aGlzLmVuZCA8PSB0aGlzLnN0YXJ0O1xuICB9XG4gIC8qKlxuICAgKiBTZXQgYG9yaWdTdGFydGAgYW5kIGBvcmlnRW5kYCB0byBwb2ludCB0byB0aGUgb3JpZ2luYWwgc291cmNlIHJhbmdlIGZvclxuICAgKiB0aGlzIG5vZGUsIHdoaWNoIG1heSBkaWZmZXIgZHVlIHRvIGRyb3BwZWQgQ1IgY2hhcmFjdGVycy5cbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJbXX0gY3IgLSBQb3NpdGlvbnMgb2YgZHJvcHBlZCBDUiBjaGFyYWN0ZXJzXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBvZmZzZXQgLSBTdGFydGluZyBpbmRleCBvZiBgY3JgIGZyb20gdGhlIGxhc3QgY2FsbFxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSAtIFRoZSBuZXh0IG9mZnNldCwgbWF0Y2hpbmcgdGhlIG9uZSBmb3VuZCBmb3IgYG9yaWdTdGFydGBcbiAgICovXG5cblxuICBzZXRPcmlnUmFuZ2UoY3IsIG9mZnNldCkge1xuICAgIGNvbnN0IHtcbiAgICAgIHN0YXJ0LFxuICAgICAgZW5kXG4gICAgfSA9IHRoaXM7XG5cbiAgICBpZiAoY3IubGVuZ3RoID09PSAwIHx8IGVuZCA8PSBjclswXSkge1xuICAgICAgdGhpcy5vcmlnU3RhcnQgPSBzdGFydDtcbiAgICAgIHRoaXMub3JpZ0VuZCA9IGVuZDtcbiAgICAgIHJldHVybiBvZmZzZXQ7XG4gICAgfVxuXG4gICAgbGV0IGkgPSBvZmZzZXQ7XG5cbiAgICB3aGlsZSAoaSA8IGNyLmxlbmd0aCkge1xuICAgICAgaWYgKGNyW2ldID4gc3RhcnQpIGJyZWFrO2Vsc2UgKytpO1xuICAgIH1cblxuICAgIHRoaXMub3JpZ1N0YXJ0ID0gc3RhcnQgKyBpO1xuICAgIGNvbnN0IG5leHRPZmZzZXQgPSBpO1xuXG4gICAgd2hpbGUgKGkgPCBjci5sZW5ndGgpIHtcbiAgICAgIC8vIGlmIGVuZCB3YXMgYXQgXFxuLCBpdCBzaG91bGQgbm93IGJlIGF0IFxcclxuICAgICAgaWYgKGNyW2ldID49IGVuZCkgYnJlYWs7ZWxzZSArK2k7XG4gICAgfVxuXG4gICAgdGhpcy5vcmlnRW5kID0gZW5kICsgaTtcbiAgICByZXR1cm4gbmV4dE9mZnNldDtcbiAgfVxuXG59XG5cbi8qKiBSb290IGNsYXNzIG9mIGFsbCBub2RlcyAqL1xuXG5jbGFzcyBOb2RlIHtcbiAgc3RhdGljIGFkZFN0cmluZ1Rlcm1pbmF0b3Ioc3JjLCBvZmZzZXQsIHN0cikge1xuICAgIGlmIChzdHJbc3RyLmxlbmd0aCAtIDFdID09PSAnXFxuJykgcmV0dXJuIHN0cjtcbiAgICBjb25zdCBuZXh0ID0gTm9kZS5lbmRPZldoaXRlU3BhY2Uoc3JjLCBvZmZzZXQpO1xuICAgIHJldHVybiBuZXh0ID49IHNyYy5sZW5ndGggfHwgc3JjW25leHRdID09PSAnXFxuJyA/IHN0ciArICdcXG4nIDogc3RyO1xuICB9IC8vIF4oLS0tfC4uLilcblxuXG4gIHN0YXRpYyBhdERvY3VtZW50Qm91bmRhcnkoc3JjLCBvZmZzZXQsIHNlcCkge1xuICAgIGNvbnN0IGNoMCA9IHNyY1tvZmZzZXRdO1xuICAgIGlmICghY2gwKSByZXR1cm4gdHJ1ZTtcbiAgICBjb25zdCBwcmV2ID0gc3JjW29mZnNldCAtIDFdO1xuICAgIGlmIChwcmV2ICYmIHByZXYgIT09ICdcXG4nKSByZXR1cm4gZmFsc2U7XG5cbiAgICBpZiAoc2VwKSB7XG4gICAgICBpZiAoY2gwICE9PSBzZXApIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGNoMCAhPT0gQ2hhci5ESVJFQ1RJVkVTX0VORCAmJiBjaDAgIT09IENoYXIuRE9DVU1FTlRfRU5EKSByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgY2gxID0gc3JjW29mZnNldCArIDFdO1xuICAgIGNvbnN0IGNoMiA9IHNyY1tvZmZzZXQgKyAyXTtcbiAgICBpZiAoY2gxICE9PSBjaDAgfHwgY2gyICE9PSBjaDApIHJldHVybiBmYWxzZTtcbiAgICBjb25zdCBjaDMgPSBzcmNbb2Zmc2V0ICsgM107XG4gICAgcmV0dXJuICFjaDMgfHwgY2gzID09PSAnXFxuJyB8fCBjaDMgPT09ICdcXHQnIHx8IGNoMyA9PT0gJyAnO1xuICB9XG5cbiAgc3RhdGljIGVuZE9mSWRlbnRpZmllcihzcmMsIG9mZnNldCkge1xuICAgIGxldCBjaCA9IHNyY1tvZmZzZXRdO1xuICAgIGNvbnN0IGlzVmVyYmF0aW0gPSBjaCA9PT0gJzwnO1xuICAgIGNvbnN0IG5vdE9rID0gaXNWZXJiYXRpbSA/IFsnXFxuJywgJ1xcdCcsICcgJywgJz4nXSA6IFsnXFxuJywgJ1xcdCcsICcgJywgJ1snLCAnXScsICd7JywgJ30nLCAnLCddO1xuXG4gICAgd2hpbGUgKGNoICYmIG5vdE9rLmluZGV4T2YoY2gpID09PSAtMSkgY2ggPSBzcmNbb2Zmc2V0ICs9IDFdO1xuXG4gICAgaWYgKGlzVmVyYmF0aW0gJiYgY2ggPT09ICc+Jykgb2Zmc2V0ICs9IDE7XG4gICAgcmV0dXJuIG9mZnNldDtcbiAgfVxuXG4gIHN0YXRpYyBlbmRPZkluZGVudChzcmMsIG9mZnNldCkge1xuICAgIGxldCBjaCA9IHNyY1tvZmZzZXRdO1xuXG4gICAgd2hpbGUgKGNoID09PSAnICcpIGNoID0gc3JjW29mZnNldCArPSAxXTtcblxuICAgIHJldHVybiBvZmZzZXQ7XG4gIH1cblxuICBzdGF0aWMgZW5kT2ZMaW5lKHNyYywgb2Zmc2V0KSB7XG4gICAgbGV0IGNoID0gc3JjW29mZnNldF07XG5cbiAgICB3aGlsZSAoY2ggJiYgY2ggIT09ICdcXG4nKSBjaCA9IHNyY1tvZmZzZXQgKz0gMV07XG5cbiAgICByZXR1cm4gb2Zmc2V0O1xuICB9XG5cbiAgc3RhdGljIGVuZE9mV2hpdGVTcGFjZShzcmMsIG9mZnNldCkge1xuICAgIGxldCBjaCA9IHNyY1tvZmZzZXRdO1xuXG4gICAgd2hpbGUgKGNoID09PSAnXFx0JyB8fCBjaCA9PT0gJyAnKSBjaCA9IHNyY1tvZmZzZXQgKz0gMV07XG5cbiAgICByZXR1cm4gb2Zmc2V0O1xuICB9XG5cbiAgc3RhdGljIHN0YXJ0T2ZMaW5lKHNyYywgb2Zmc2V0KSB7XG4gICAgbGV0IGNoID0gc3JjW29mZnNldCAtIDFdO1xuICAgIGlmIChjaCA9PT0gJ1xcbicpIHJldHVybiBvZmZzZXQ7XG5cbiAgICB3aGlsZSAoY2ggJiYgY2ggIT09ICdcXG4nKSBjaCA9IHNyY1tvZmZzZXQgLT0gMV07XG5cbiAgICByZXR1cm4gb2Zmc2V0ICsgMTtcbiAgfVxuICAvKipcbiAgICogRW5kIG9mIGluZGVudGF0aW9uLCBvciBudWxsIGlmIHRoZSBsaW5lJ3MgaW5kZW50IGxldmVsIGlzIG5vdCBtb3JlXG4gICAqIHRoYW4gYGluZGVudGBcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHNyY1xuICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZW50XG4gICAqIEBwYXJhbSB7bnVtYmVyfSBsaW5lU3RhcnRcbiAgICogQHJldHVybnMgez9udW1iZXJ9XG4gICAqL1xuXG5cbiAgc3RhdGljIGVuZE9mQmxvY2tJbmRlbnQoc3JjLCBpbmRlbnQsIGxpbmVTdGFydCkge1xuICAgIGNvbnN0IGluRW5kID0gTm9kZS5lbmRPZkluZGVudChzcmMsIGxpbmVTdGFydCk7XG5cbiAgICBpZiAoaW5FbmQgPiBsaW5lU3RhcnQgKyBpbmRlbnQpIHtcbiAgICAgIHJldHVybiBpbkVuZDtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3Qgd3NFbmQgPSBOb2RlLmVuZE9mV2hpdGVTcGFjZShzcmMsIGluRW5kKTtcbiAgICAgIGNvbnN0IGNoID0gc3JjW3dzRW5kXTtcbiAgICAgIGlmICghY2ggfHwgY2ggPT09ICdcXG4nKSByZXR1cm4gd3NFbmQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBzdGF0aWMgYXRCbGFuayhzcmMsIG9mZnNldCwgZW5kQXNCbGFuaykge1xuICAgIGNvbnN0IGNoID0gc3JjW29mZnNldF07XG4gICAgcmV0dXJuIGNoID09PSAnXFxuJyB8fCBjaCA9PT0gJ1xcdCcgfHwgY2ggPT09ICcgJyB8fCBlbmRBc0JsYW5rICYmICFjaDtcbiAgfVxuXG4gIHN0YXRpYyBuZXh0Tm9kZUlzSW5kZW50ZWQoY2gsIGluZGVudERpZmYsIGluZGljYXRvckFzSW5kZW50KSB7XG4gICAgaWYgKCFjaCB8fCBpbmRlbnREaWZmIDwgMCkgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChpbmRlbnREaWZmID4gMCkgcmV0dXJuIHRydWU7XG4gICAgcmV0dXJuIGluZGljYXRvckFzSW5kZW50ICYmIGNoID09PSAnLSc7XG4gIH0gLy8gc2hvdWxkIGJlIGF0IGxpbmUgb3Igc3RyaW5nIGVuZCwgb3IgYXQgbmV4dCBub24td2hpdGVzcGFjZSBjaGFyXG5cblxuICBzdGF0aWMgbm9ybWFsaXplT2Zmc2V0KHNyYywgb2Zmc2V0KSB7XG4gICAgY29uc3QgY2ggPSBzcmNbb2Zmc2V0XTtcbiAgICByZXR1cm4gIWNoID8gb2Zmc2V0IDogY2ggIT09ICdcXG4nICYmIHNyY1tvZmZzZXQgLSAxXSA9PT0gJ1xcbicgPyBvZmZzZXQgLSAxIDogTm9kZS5lbmRPZldoaXRlU3BhY2Uoc3JjLCBvZmZzZXQpO1xuICB9IC8vIGZvbGQgc2luZ2xlIG5ld2xpbmUgaW50byBzcGFjZSwgbXVsdGlwbGUgbmV3bGluZXMgdG8gTiAtIDEgbmV3bGluZXNcbiAgLy8gcHJlc3VtZXMgc3JjW29mZnNldF0gPT09ICdcXG4nXG5cblxuICBzdGF0aWMgZm9sZE5ld2xpbmUoc3JjLCBvZmZzZXQsIGluZGVudCkge1xuICAgIGxldCBpbkNvdW50ID0gMDtcbiAgICBsZXQgZXJyb3IgPSBmYWxzZTtcbiAgICBsZXQgZm9sZCA9ICcnO1xuICAgIGxldCBjaCA9IHNyY1tvZmZzZXQgKyAxXTtcblxuICAgIHdoaWxlIChjaCA9PT0gJyAnIHx8IGNoID09PSAnXFx0JyB8fCBjaCA9PT0gJ1xcbicpIHtcbiAgICAgIHN3aXRjaCAoY2gpIHtcbiAgICAgICAgY2FzZSAnXFxuJzpcbiAgICAgICAgICBpbkNvdW50ID0gMDtcbiAgICAgICAgICBvZmZzZXQgKz0gMTtcbiAgICAgICAgICBmb2xkICs9ICdcXG4nO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ1xcdCc6XG4gICAgICAgICAgaWYgKGluQ291bnQgPD0gaW5kZW50KSBlcnJvciA9IHRydWU7XG4gICAgICAgICAgb2Zmc2V0ID0gTm9kZS5lbmRPZldoaXRlU3BhY2Uoc3JjLCBvZmZzZXQgKyAyKSAtIDE7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnICc6XG4gICAgICAgICAgaW5Db3VudCArPSAxO1xuICAgICAgICAgIG9mZnNldCArPSAxO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBjaCA9IHNyY1tvZmZzZXQgKyAxXTtcbiAgICB9XG5cbiAgICBpZiAoIWZvbGQpIGZvbGQgPSAnICc7XG4gICAgaWYgKGNoICYmIGluQ291bnQgPD0gaW5kZW50KSBlcnJvciA9IHRydWU7XG4gICAgcmV0dXJuIHtcbiAgICAgIGZvbGQsXG4gICAgICBvZmZzZXQsXG4gICAgICBlcnJvclxuICAgIH07XG4gIH1cblxuICBjb25zdHJ1Y3Rvcih0eXBlLCBwcm9wcywgY29udGV4dCkge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnY29udGV4dCcsIHtcbiAgICAgIHZhbHVlOiBjb250ZXh0IHx8IG51bGwsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIHRoaXMuZXJyb3IgPSBudWxsO1xuICAgIHRoaXMucmFuZ2UgPSBudWxsO1xuICAgIHRoaXMudmFsdWVSYW5nZSA9IG51bGw7XG4gICAgdGhpcy5wcm9wcyA9IHByb3BzIHx8IFtdO1xuICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgdGhpcy52YWx1ZSA9IG51bGw7XG4gIH1cblxuICBnZXRQcm9wVmFsdWUoaWR4LCBrZXksIHNraXBLZXkpIHtcbiAgICBpZiAoIXRoaXMuY29udGV4dCkgcmV0dXJuIG51bGw7XG4gICAgY29uc3Qge1xuICAgICAgc3JjXG4gICAgfSA9IHRoaXMuY29udGV4dDtcbiAgICBjb25zdCBwcm9wID0gdGhpcy5wcm9wc1tpZHhdO1xuICAgIHJldHVybiBwcm9wICYmIHNyY1twcm9wLnN0YXJ0XSA9PT0ga2V5ID8gc3JjLnNsaWNlKHByb3Auc3RhcnQgKyAoc2tpcEtleSA/IDEgOiAwKSwgcHJvcC5lbmQpIDogbnVsbDtcbiAgfVxuXG4gIGdldCBhbmNob3IoKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnByb3BzLmxlbmd0aDsgKytpKSB7XG4gICAgICBjb25zdCBhbmNob3IgPSB0aGlzLmdldFByb3BWYWx1ZShpLCBDaGFyLkFOQ0hPUiwgdHJ1ZSk7XG4gICAgICBpZiAoYW5jaG9yICE9IG51bGwpIHJldHVybiBhbmNob3I7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBnZXQgY29tbWVudCgpIHtcbiAgICBjb25zdCBjb21tZW50cyA9IFtdO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnByb3BzLmxlbmd0aDsgKytpKSB7XG4gICAgICBjb25zdCBjb21tZW50ID0gdGhpcy5nZXRQcm9wVmFsdWUoaSwgQ2hhci5DT01NRU5ULCB0cnVlKTtcbiAgICAgIGlmIChjb21tZW50ICE9IG51bGwpIGNvbW1lbnRzLnB1c2goY29tbWVudCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbW1lbnRzLmxlbmd0aCA+IDAgPyBjb21tZW50cy5qb2luKCdcXG4nKSA6IG51bGw7XG4gIH1cblxuICBjb21tZW50SGFzUmVxdWlyZWRXaGl0ZXNwYWNlKHN0YXJ0KSB7XG4gICAgY29uc3Qge1xuICAgICAgc3JjXG4gICAgfSA9IHRoaXMuY29udGV4dDtcbiAgICBpZiAodGhpcy5oZWFkZXIgJiYgc3RhcnQgPT09IHRoaXMuaGVhZGVyLmVuZCkgcmV0dXJuIGZhbHNlO1xuICAgIGlmICghdGhpcy52YWx1ZVJhbmdlKSByZXR1cm4gZmFsc2U7XG4gICAgY29uc3Qge1xuICAgICAgZW5kXG4gICAgfSA9IHRoaXMudmFsdWVSYW5nZTtcbiAgICByZXR1cm4gc3RhcnQgIT09IGVuZCB8fCBOb2RlLmF0Qmxhbmsoc3JjLCBlbmQgLSAxKTtcbiAgfVxuXG4gIGdldCBoYXNDb21tZW50KCkge1xuICAgIGlmICh0aGlzLmNvbnRleHQpIHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgc3JjXG4gICAgICB9ID0gdGhpcy5jb250ZXh0O1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucHJvcHMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYgKHNyY1t0aGlzLnByb3BzW2ldLnN0YXJ0XSA9PT0gQ2hhci5DT01NRU5UKSByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBnZXQgaGFzUHJvcHMoKSB7XG4gICAgaWYgKHRoaXMuY29udGV4dCkge1xuICAgICAgY29uc3Qge1xuICAgICAgICBzcmNcbiAgICAgIH0gPSB0aGlzLmNvbnRleHQ7XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5wcm9wcy5sZW5ndGg7ICsraSkge1xuICAgICAgICBpZiAoc3JjW3RoaXMucHJvcHNbaV0uc3RhcnRdICE9PSBDaGFyLkNPTU1FTlQpIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGdldCBpbmNsdWRlc1RyYWlsaW5nTGluZXMoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZ2V0IGpzb25MaWtlKCkge1xuICAgIGNvbnN0IGpzb25MaWtlVHlwZXMgPSBbVHlwZS5GTE9XX01BUCwgVHlwZS5GTE9XX1NFUSwgVHlwZS5RVU9URV9ET1VCTEUsIFR5cGUuUVVPVEVfU0lOR0xFXTtcbiAgICByZXR1cm4ganNvbkxpa2VUeXBlcy5pbmRleE9mKHRoaXMudHlwZSkgIT09IC0xO1xuICB9XG5cbiAgZ2V0IHJhbmdlQXNMaW5lUG9zKCkge1xuICAgIGlmICghdGhpcy5yYW5nZSB8fCAhdGhpcy5jb250ZXh0KSByZXR1cm4gdW5kZWZpbmVkO1xuICAgIGNvbnN0IHN0YXJ0ID0gZ2V0TGluZVBvcyh0aGlzLnJhbmdlLnN0YXJ0LCB0aGlzLmNvbnRleHQucm9vdCk7XG4gICAgaWYgKCFzdGFydCkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICBjb25zdCBlbmQgPSBnZXRMaW5lUG9zKHRoaXMucmFuZ2UuZW5kLCB0aGlzLmNvbnRleHQucm9vdCk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXJ0LFxuICAgICAgZW5kXG4gICAgfTtcbiAgfVxuXG4gIGdldCByYXdWYWx1ZSgpIHtcbiAgICBpZiAoIXRoaXMudmFsdWVSYW5nZSB8fCAhdGhpcy5jb250ZXh0KSByZXR1cm4gbnVsbDtcbiAgICBjb25zdCB7XG4gICAgICBzdGFydCxcbiAgICAgIGVuZFxuICAgIH0gPSB0aGlzLnZhbHVlUmFuZ2U7XG4gICAgcmV0dXJuIHRoaXMuY29udGV4dC5zcmMuc2xpY2Uoc3RhcnQsIGVuZCk7XG4gIH1cblxuICBnZXQgdGFnKCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5wcm9wcy5sZW5ndGg7ICsraSkge1xuICAgICAgY29uc3QgdGFnID0gdGhpcy5nZXRQcm9wVmFsdWUoaSwgQ2hhci5UQUcsIGZhbHNlKTtcblxuICAgICAgaWYgKHRhZyAhPSBudWxsKSB7XG4gICAgICAgIGlmICh0YWdbMV0gPT09ICc8Jykge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2ZXJiYXRpbTogdGFnLnNsaWNlKDIsIC0xKVxuICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gICAgICAgICAgY29uc3QgW18sIGhhbmRsZSwgc3VmZml4XSA9IHRhZy5tYXRjaCgvXiguKiEpKFteIV0qKSQvKTtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaGFuZGxlLFxuICAgICAgICAgICAgc3VmZml4XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgZ2V0IHZhbHVlUmFuZ2VDb250YWluc05ld2xpbmUoKSB7XG4gICAgaWYgKCF0aGlzLnZhbHVlUmFuZ2UgfHwgIXRoaXMuY29udGV4dCkgcmV0dXJuIGZhbHNlO1xuICAgIGNvbnN0IHtcbiAgICAgIHN0YXJ0LFxuICAgICAgZW5kXG4gICAgfSA9IHRoaXMudmFsdWVSYW5nZTtcbiAgICBjb25zdCB7XG4gICAgICBzcmNcbiAgICB9ID0gdGhpcy5jb250ZXh0O1xuXG4gICAgZm9yIChsZXQgaSA9IHN0YXJ0OyBpIDwgZW5kOyArK2kpIHtcbiAgICAgIGlmIChzcmNbaV0gPT09ICdcXG4nKSByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBwYXJzZUNvbW1lbnQoc3RhcnQpIHtcbiAgICBjb25zdCB7XG4gICAgICBzcmNcbiAgICB9ID0gdGhpcy5jb250ZXh0O1xuXG4gICAgaWYgKHNyY1tzdGFydF0gPT09IENoYXIuQ09NTUVOVCkge1xuICAgICAgY29uc3QgZW5kID0gTm9kZS5lbmRPZkxpbmUoc3JjLCBzdGFydCArIDEpO1xuICAgICAgY29uc3QgY29tbWVudFJhbmdlID0gbmV3IFJhbmdlKHN0YXJ0LCBlbmQpO1xuICAgICAgdGhpcy5wcm9wcy5wdXNoKGNvbW1lbnRSYW5nZSk7XG4gICAgICByZXR1cm4gZW5kO1xuICAgIH1cblxuICAgIHJldHVybiBzdGFydDtcbiAgfVxuICAvKipcbiAgICogUG9wdWxhdGVzIHRoZSBgb3JpZ1N0YXJ0YCBhbmQgYG9yaWdFbmRgIHZhbHVlcyBvZiBhbGwgcmFuZ2VzIGZvciB0aGlzXG4gICAqIG5vZGUuIEV4dGVuZGVkIGJ5IGNoaWxkIGNsYXNzZXMgdG8gaGFuZGxlIGRlc2NlbmRhbnQgbm9kZXMuXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyW119IGNyIC0gUG9zaXRpb25zIG9mIGRyb3BwZWQgQ1IgY2hhcmFjdGVyc1xuICAgKiBAcGFyYW0ge251bWJlcn0gb2Zmc2V0IC0gU3RhcnRpbmcgaW5kZXggb2YgYGNyYCBmcm9tIHRoZSBsYXN0IGNhbGxcbiAgICogQHJldHVybnMge251bWJlcn0gLSBUaGUgbmV4dCBvZmZzZXQsIG1hdGNoaW5nIHRoZSBvbmUgZm91bmQgZm9yIGBvcmlnU3RhcnRgXG4gICAqL1xuXG5cbiAgc2V0T3JpZ1Jhbmdlcyhjciwgb2Zmc2V0KSB7XG4gICAgaWYgKHRoaXMucmFuZ2UpIG9mZnNldCA9IHRoaXMucmFuZ2Uuc2V0T3JpZ1JhbmdlKGNyLCBvZmZzZXQpO1xuICAgIGlmICh0aGlzLnZhbHVlUmFuZ2UpIHRoaXMudmFsdWVSYW5nZS5zZXRPcmlnUmFuZ2UoY3IsIG9mZnNldCk7XG4gICAgdGhpcy5wcm9wcy5mb3JFYWNoKHByb3AgPT4gcHJvcC5zZXRPcmlnUmFuZ2UoY3IsIG9mZnNldCkpO1xuICAgIHJldHVybiBvZmZzZXQ7XG4gIH1cblxuICB0b1N0cmluZygpIHtcbiAgICBjb25zdCB7XG4gICAgICBjb250ZXh0OiB7XG4gICAgICAgIHNyY1xuICAgICAgfSxcbiAgICAgIHJhbmdlLFxuICAgICAgdmFsdWVcbiAgICB9ID0gdGhpcztcbiAgICBpZiAodmFsdWUgIT0gbnVsbCkgcmV0dXJuIHZhbHVlO1xuICAgIGNvbnN0IHN0ciA9IHNyYy5zbGljZShyYW5nZS5zdGFydCwgcmFuZ2UuZW5kKTtcbiAgICByZXR1cm4gTm9kZS5hZGRTdHJpbmdUZXJtaW5hdG9yKHNyYywgcmFuZ2UuZW5kLCBzdHIpO1xuICB9XG5cbn1cblxuY2xhc3MgWUFNTEVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICBjb25zdHJ1Y3RvcihuYW1lLCBzb3VyY2UsIG1lc3NhZ2UpIHtcbiAgICBpZiAoIW1lc3NhZ2UgfHwgIShzb3VyY2UgaW5zdGFuY2VvZiBOb2RlKSkgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGFyZ3VtZW50cyBmb3IgbmV3ICR7bmFtZX1gKTtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgICB0aGlzLnNvdXJjZSA9IHNvdXJjZTtcbiAgfVxuXG4gIG1ha2VQcmV0dHkoKSB7XG4gICAgaWYgKCF0aGlzLnNvdXJjZSkgcmV0dXJuO1xuICAgIHRoaXMubm9kZVR5cGUgPSB0aGlzLnNvdXJjZS50eXBlO1xuICAgIGNvbnN0IGNzdCA9IHRoaXMuc291cmNlLmNvbnRleHQgJiYgdGhpcy5zb3VyY2UuY29udGV4dC5yb290O1xuXG4gICAgaWYgKHR5cGVvZiB0aGlzLm9mZnNldCA9PT0gJ251bWJlcicpIHtcbiAgICAgIHRoaXMucmFuZ2UgPSBuZXcgUmFuZ2UodGhpcy5vZmZzZXQsIHRoaXMub2Zmc2V0ICsgMSk7XG4gICAgICBjb25zdCBzdGFydCA9IGNzdCAmJiBnZXRMaW5lUG9zKHRoaXMub2Zmc2V0LCBjc3QpO1xuXG4gICAgICBpZiAoc3RhcnQpIHtcbiAgICAgICAgY29uc3QgZW5kID0ge1xuICAgICAgICAgIGxpbmU6IHN0YXJ0LmxpbmUsXG4gICAgICAgICAgY29sOiBzdGFydC5jb2wgKyAxXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMubGluZVBvcyA9IHtcbiAgICAgICAgICBzdGFydCxcbiAgICAgICAgICBlbmRcbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgZGVsZXRlIHRoaXMub2Zmc2V0O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJhbmdlID0gdGhpcy5zb3VyY2UucmFuZ2U7XG4gICAgICB0aGlzLmxpbmVQb3MgPSB0aGlzLnNvdXJjZS5yYW5nZUFzTGluZVBvcztcbiAgICB9XG5cbiAgICBpZiAodGhpcy5saW5lUG9zKSB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIGxpbmUsXG4gICAgICAgIGNvbFxuICAgICAgfSA9IHRoaXMubGluZVBvcy5zdGFydDtcbiAgICAgIHRoaXMubWVzc2FnZSArPSBgIGF0IGxpbmUgJHtsaW5lfSwgY29sdW1uICR7Y29sfWA7XG4gICAgICBjb25zdCBjdHggPSBjc3QgJiYgZ2V0UHJldHR5Q29udGV4dCh0aGlzLmxpbmVQb3MsIGNzdCk7XG4gICAgICBpZiAoY3R4KSB0aGlzLm1lc3NhZ2UgKz0gYDpcXG5cXG4ke2N0eH1cXG5gO1xuICAgIH1cblxuICAgIGRlbGV0ZSB0aGlzLnNvdXJjZTtcbiAgfVxuXG59XG5jbGFzcyBZQU1MUmVmZXJlbmNlRXJyb3IgZXh0ZW5kcyBZQU1MRXJyb3Ige1xuICBjb25zdHJ1Y3Rvcihzb3VyY2UsIG1lc3NhZ2UpIHtcbiAgICBzdXBlcignWUFNTFJlZmVyZW5jZUVycm9yJywgc291cmNlLCBtZXNzYWdlKTtcbiAgfVxuXG59XG5jbGFzcyBZQU1MU2VtYW50aWNFcnJvciBleHRlbmRzIFlBTUxFcnJvciB7XG4gIGNvbnN0cnVjdG9yKHNvdXJjZSwgbWVzc2FnZSkge1xuICAgIHN1cGVyKCdZQU1MU2VtYW50aWNFcnJvcicsIHNvdXJjZSwgbWVzc2FnZSk7XG4gIH1cblxufVxuY2xhc3MgWUFNTFN5bnRheEVycm9yIGV4dGVuZHMgWUFNTEVycm9yIHtcbiAgY29uc3RydWN0b3Ioc291cmNlLCBtZXNzYWdlKSB7XG4gICAgc3VwZXIoJ1lBTUxTeW50YXhFcnJvcicsIHNvdXJjZSwgbWVzc2FnZSk7XG4gIH1cblxufVxuY2xhc3MgWUFNTFdhcm5pbmcgZXh0ZW5kcyBZQU1MRXJyb3Ige1xuICBjb25zdHJ1Y3Rvcihzb3VyY2UsIG1lc3NhZ2UpIHtcbiAgICBzdXBlcignWUFNTFdhcm5pbmcnLCBzb3VyY2UsIG1lc3NhZ2UpO1xuICB9XG5cbn1cblxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkge1xuICBpZiAoa2V5IGluIG9iaikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiBvYmo7XG59XG5cbmNsYXNzIFBsYWluVmFsdWUgZXh0ZW5kcyBOb2RlIHtcbiAgc3RhdGljIGVuZE9mTGluZShzcmMsIHN0YXJ0LCBpbkZsb3cpIHtcbiAgICBsZXQgY2ggPSBzcmNbc3RhcnRdO1xuICAgIGxldCBvZmZzZXQgPSBzdGFydDtcblxuICAgIHdoaWxlIChjaCAmJiBjaCAhPT0gJ1xcbicpIHtcbiAgICAgIGlmIChpbkZsb3cgJiYgKGNoID09PSAnWycgfHwgY2ggPT09ICddJyB8fCBjaCA9PT0gJ3snIHx8IGNoID09PSAnfScgfHwgY2ggPT09ICcsJykpIGJyZWFrO1xuICAgICAgY29uc3QgbmV4dCA9IHNyY1tvZmZzZXQgKyAxXTtcbiAgICAgIGlmIChjaCA9PT0gJzonICYmICghbmV4dCB8fCBuZXh0ID09PSAnXFxuJyB8fCBuZXh0ID09PSAnXFx0JyB8fCBuZXh0ID09PSAnICcgfHwgaW5GbG93ICYmIG5leHQgPT09ICcsJykpIGJyZWFrO1xuICAgICAgaWYgKChjaCA9PT0gJyAnIHx8IGNoID09PSAnXFx0JykgJiYgbmV4dCA9PT0gJyMnKSBicmVhaztcbiAgICAgIG9mZnNldCArPSAxO1xuICAgICAgY2ggPSBuZXh0O1xuICAgIH1cblxuICAgIHJldHVybiBvZmZzZXQ7XG4gIH1cblxuICBnZXQgc3RyVmFsdWUoKSB7XG4gICAgaWYgKCF0aGlzLnZhbHVlUmFuZ2UgfHwgIXRoaXMuY29udGV4dCkgcmV0dXJuIG51bGw7XG4gICAgbGV0IHtcbiAgICAgIHN0YXJ0LFxuICAgICAgZW5kXG4gICAgfSA9IHRoaXMudmFsdWVSYW5nZTtcbiAgICBjb25zdCB7XG4gICAgICBzcmNcbiAgICB9ID0gdGhpcy5jb250ZXh0O1xuICAgIGxldCBjaCA9IHNyY1tlbmQgLSAxXTtcblxuICAgIHdoaWxlIChzdGFydCA8IGVuZCAmJiAoY2ggPT09ICdcXG4nIHx8IGNoID09PSAnXFx0JyB8fCBjaCA9PT0gJyAnKSkgY2ggPSBzcmNbLS1lbmQgLSAxXTtcblxuICAgIGxldCBzdHIgPSAnJztcblxuICAgIGZvciAobGV0IGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKSB7XG4gICAgICBjb25zdCBjaCA9IHNyY1tpXTtcblxuICAgICAgaWYgKGNoID09PSAnXFxuJykge1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgZm9sZCxcbiAgICAgICAgICBvZmZzZXRcbiAgICAgICAgfSA9IE5vZGUuZm9sZE5ld2xpbmUoc3JjLCBpLCAtMSk7XG4gICAgICAgIHN0ciArPSBmb2xkO1xuICAgICAgICBpID0gb2Zmc2V0O1xuICAgICAgfSBlbHNlIGlmIChjaCA9PT0gJyAnIHx8IGNoID09PSAnXFx0Jykge1xuICAgICAgICAvLyB0cmltIHRyYWlsaW5nIHdoaXRlc3BhY2VcbiAgICAgICAgY29uc3Qgd3NTdGFydCA9IGk7XG4gICAgICAgIGxldCBuZXh0ID0gc3JjW2kgKyAxXTtcblxuICAgICAgICB3aGlsZSAoaSA8IGVuZCAmJiAobmV4dCA9PT0gJyAnIHx8IG5leHQgPT09ICdcXHQnKSkge1xuICAgICAgICAgIGkgKz0gMTtcbiAgICAgICAgICBuZXh0ID0gc3JjW2kgKyAxXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChuZXh0ICE9PSAnXFxuJykgc3RyICs9IGkgPiB3c1N0YXJ0ID8gc3JjLnNsaWNlKHdzU3RhcnQsIGkgKyAxKSA6IGNoO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3RyICs9IGNoO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGNoMCA9IHNyY1tzdGFydF07XG5cbiAgICBzd2l0Y2ggKGNoMCkge1xuICAgICAgY2FzZSAnXFx0JzpcbiAgICAgICAge1xuICAgICAgICAgIGNvbnN0IG1zZyA9ICdQbGFpbiB2YWx1ZSBjYW5ub3Qgc3RhcnQgd2l0aCBhIHRhYiBjaGFyYWN0ZXInO1xuICAgICAgICAgIGNvbnN0IGVycm9ycyA9IFtuZXcgWUFNTFNlbWFudGljRXJyb3IodGhpcywgbXNnKV07XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGVycm9ycyxcbiAgICAgICAgICAgIHN0clxuICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgY2FzZSAnQCc6XG4gICAgICBjYXNlICdgJzpcbiAgICAgICAge1xuICAgICAgICAgIGNvbnN0IG1zZyA9IGBQbGFpbiB2YWx1ZSBjYW5ub3Qgc3RhcnQgd2l0aCByZXNlcnZlZCBjaGFyYWN0ZXIgJHtjaDB9YDtcbiAgICAgICAgICBjb25zdCBlcnJvcnMgPSBbbmV3IFlBTUxTZW1hbnRpY0Vycm9yKHRoaXMsIG1zZyldO1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBlcnJvcnMsXG4gICAgICAgICAgICBzdHJcbiAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgfVxuICB9XG5cbiAgcGFyc2VCbG9ja1ZhbHVlKHN0YXJ0KSB7XG4gICAgY29uc3Qge1xuICAgICAgaW5kZW50LFxuICAgICAgaW5GbG93LFxuICAgICAgc3JjXG4gICAgfSA9IHRoaXMuY29udGV4dDtcbiAgICBsZXQgb2Zmc2V0ID0gc3RhcnQ7XG4gICAgbGV0IHZhbHVlRW5kID0gc3RhcnQ7XG5cbiAgICBmb3IgKGxldCBjaCA9IHNyY1tvZmZzZXRdOyBjaCA9PT0gJ1xcbic7IGNoID0gc3JjW29mZnNldF0pIHtcbiAgICAgIGlmIChOb2RlLmF0RG9jdW1lbnRCb3VuZGFyeShzcmMsIG9mZnNldCArIDEpKSBicmVhaztcbiAgICAgIGNvbnN0IGVuZCA9IE5vZGUuZW5kT2ZCbG9ja0luZGVudChzcmMsIGluZGVudCwgb2Zmc2V0ICsgMSk7XG4gICAgICBpZiAoZW5kID09PSBudWxsIHx8IHNyY1tlbmRdID09PSAnIycpIGJyZWFrO1xuXG4gICAgICBpZiAoc3JjW2VuZF0gPT09ICdcXG4nKSB7XG4gICAgICAgIG9mZnNldCA9IGVuZDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbHVlRW5kID0gUGxhaW5WYWx1ZS5lbmRPZkxpbmUoc3JjLCBlbmQsIGluRmxvdyk7XG4gICAgICAgIG9mZnNldCA9IHZhbHVlRW5kO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLnZhbHVlUmFuZ2UuaXNFbXB0eSgpKSB0aGlzLnZhbHVlUmFuZ2Uuc3RhcnQgPSBzdGFydDtcbiAgICB0aGlzLnZhbHVlUmFuZ2UuZW5kID0gdmFsdWVFbmQ7XG4gICAgcmV0dXJuIHZhbHVlRW5kO1xuICB9XG4gIC8qKlxuICAgKiBQYXJzZXMgYSBwbGFpbiB2YWx1ZSBmcm9tIHRoZSBzb3VyY2VcbiAgICpcbiAgICogQWNjZXB0ZWQgZm9ybXMgYXJlOlxuICAgKiBgYGBcbiAgICogI2NvbW1lbnRcbiAgICpcbiAgICogZmlyc3QgbGluZVxuICAgKlxuICAgKiBmaXJzdCBsaW5lICNjb21tZW50XG4gICAqXG4gICAqIGZpcnN0IGxpbmVcbiAgICogYmxvY2tcbiAgICogbGluZXNcbiAgICpcbiAgICogI2NvbW1lbnRcbiAgICogYmxvY2tcbiAgICogbGluZXNcbiAgICogYGBgXG4gICAqIHdoZXJlIGJsb2NrIGxpbmVzIGFyZSBlbXB0eSBvciBoYXZlIGFuIGluZGVudCBsZXZlbCBncmVhdGVyIHRoYW4gYGluZGVudGAuXG4gICAqXG4gICAqIEBwYXJhbSB7UGFyc2VDb250ZXh0fSBjb250ZXh0XG4gICAqIEBwYXJhbSB7bnVtYmVyfSBzdGFydCAtIEluZGV4IG9mIGZpcnN0IGNoYXJhY3RlclxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSAtIEluZGV4IG9mIHRoZSBjaGFyYWN0ZXIgYWZ0ZXIgdGhpcyBzY2FsYXIsIG1heSBiZSBgXFxuYFxuICAgKi9cblxuXG4gIHBhcnNlKGNvbnRleHQsIHN0YXJ0KSB7XG4gICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgICBjb25zdCB7XG4gICAgICBpbkZsb3csXG4gICAgICBzcmNcbiAgICB9ID0gY29udGV4dDtcbiAgICBsZXQgb2Zmc2V0ID0gc3RhcnQ7XG4gICAgY29uc3QgY2ggPSBzcmNbb2Zmc2V0XTtcblxuICAgIGlmIChjaCAmJiBjaCAhPT0gJyMnICYmIGNoICE9PSAnXFxuJykge1xuICAgICAgb2Zmc2V0ID0gUGxhaW5WYWx1ZS5lbmRPZkxpbmUoc3JjLCBzdGFydCwgaW5GbG93KTtcbiAgICB9XG5cbiAgICB0aGlzLnZhbHVlUmFuZ2UgPSBuZXcgUmFuZ2Uoc3RhcnQsIG9mZnNldCk7XG4gICAgb2Zmc2V0ID0gTm9kZS5lbmRPZldoaXRlU3BhY2Uoc3JjLCBvZmZzZXQpO1xuICAgIG9mZnNldCA9IHRoaXMucGFyc2VDb21tZW50KG9mZnNldCk7XG5cbiAgICBpZiAoIXRoaXMuaGFzQ29tbWVudCB8fCB0aGlzLnZhbHVlUmFuZ2UuaXNFbXB0eSgpKSB7XG4gICAgICBvZmZzZXQgPSB0aGlzLnBhcnNlQmxvY2tWYWx1ZShvZmZzZXQpO1xuICAgIH1cblxuICAgIHJldHVybiBvZmZzZXQ7XG4gIH1cblxufVxuXG5leHBvcnRzLkNoYXIgPSBDaGFyO1xuZXhwb3J0cy5Ob2RlID0gTm9kZTtcbmV4cG9ydHMuUGxhaW5WYWx1ZSA9IFBsYWluVmFsdWU7XG5leHBvcnRzLlJhbmdlID0gUmFuZ2U7XG5leHBvcnRzLlR5cGUgPSBUeXBlO1xuZXhwb3J0cy5ZQU1MRXJyb3IgPSBZQU1MRXJyb3I7XG5leHBvcnRzLllBTUxSZWZlcmVuY2VFcnJvciA9IFlBTUxSZWZlcmVuY2VFcnJvcjtcbmV4cG9ydHMuWUFNTFNlbWFudGljRXJyb3IgPSBZQU1MU2VtYW50aWNFcnJvcjtcbmV4cG9ydHMuWUFNTFN5bnRheEVycm9yID0gWUFNTFN5bnRheEVycm9yO1xuZXhwb3J0cy5ZQU1MV2FybmluZyA9IFlBTUxXYXJuaW5nO1xuZXhwb3J0cy5fZGVmaW5lUHJvcGVydHkgPSBfZGVmaW5lUHJvcGVydHk7XG5leHBvcnRzLmRlZmF1bHRUYWdQcmVmaXggPSBkZWZhdWx0VGFnUHJlZml4O1xuZXhwb3J0cy5kZWZhdWx0VGFncyA9IGRlZmF1bHRUYWdzO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgUGxhaW5WYWx1ZSA9IHJlcXVpcmUoJy4vUGxhaW5WYWx1ZS1lYzhlNTg4ZS5qcycpO1xuXG5mdW5jdGlvbiBhZGRDb21tZW50QmVmb3JlKHN0ciwgaW5kZW50LCBjb21tZW50KSB7XG4gIGlmICghY29tbWVudCkgcmV0dXJuIHN0cjtcbiAgY29uc3QgY2MgPSBjb21tZW50LnJlcGxhY2UoL1tcXHNcXFNdXi9nbSwgYCQmJHtpbmRlbnR9I2ApO1xuICByZXR1cm4gYCMke2NjfVxcbiR7aW5kZW50fSR7c3RyfWA7XG59XG5mdW5jdGlvbiBhZGRDb21tZW50KHN0ciwgaW5kZW50LCBjb21tZW50KSB7XG4gIHJldHVybiAhY29tbWVudCA/IHN0ciA6IGNvbW1lbnQuaW5kZXhPZignXFxuJykgPT09IC0xID8gYCR7c3RyfSAjJHtjb21tZW50fWAgOiBgJHtzdHJ9XFxuYCArIGNvbW1lbnQucmVwbGFjZSgvXi9nbSwgYCR7aW5kZW50IHx8ICcnfSNgKTtcbn1cblxuY2xhc3MgTm9kZSB7fVxuXG5mdW5jdGlvbiB0b0pTT04odmFsdWUsIGFyZywgY3R4KSB7XG4gIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkgcmV0dXJuIHZhbHVlLm1hcCgodiwgaSkgPT4gdG9KU09OKHYsIFN0cmluZyhpKSwgY3R4KSk7XG5cbiAgaWYgKHZhbHVlICYmIHR5cGVvZiB2YWx1ZS50b0pTT04gPT09ICdmdW5jdGlvbicpIHtcbiAgICBjb25zdCBhbmNob3IgPSBjdHggJiYgY3R4LmFuY2hvcnMgJiYgY3R4LmFuY2hvcnMuZ2V0KHZhbHVlKTtcbiAgICBpZiAoYW5jaG9yKSBjdHgub25DcmVhdGUgPSByZXMgPT4ge1xuICAgICAgYW5jaG9yLnJlcyA9IHJlcztcbiAgICAgIGRlbGV0ZSBjdHgub25DcmVhdGU7XG4gICAgfTtcbiAgICBjb25zdCByZXMgPSB2YWx1ZS50b0pTT04oYXJnLCBjdHgpO1xuICAgIGlmIChhbmNob3IgJiYgY3R4Lm9uQ3JlYXRlKSBjdHgub25DcmVhdGUocmVzKTtcbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgaWYgKCghY3R4IHx8ICFjdHgua2VlcCkgJiYgdHlwZW9mIHZhbHVlID09PSAnYmlnaW50JykgcmV0dXJuIE51bWJlcih2YWx1ZSk7XG4gIHJldHVybiB2YWx1ZTtcbn1cblxuY2xhc3MgU2NhbGFyIGV4dGVuZHMgTm9kZSB7XG4gIGNvbnN0cnVjdG9yKHZhbHVlKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICB0b0pTT04oYXJnLCBjdHgpIHtcbiAgICByZXR1cm4gY3R4ICYmIGN0eC5rZWVwID8gdGhpcy52YWx1ZSA6IHRvSlNPTih0aGlzLnZhbHVlLCBhcmcsIGN0eCk7XG4gIH1cblxuICB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gU3RyaW5nKHRoaXMudmFsdWUpO1xuICB9XG5cbn1cblxuZnVuY3Rpb24gY29sbGVjdGlvbkZyb21QYXRoKHNjaGVtYSwgcGF0aCwgdmFsdWUpIHtcbiAgbGV0IHYgPSB2YWx1ZTtcblxuICBmb3IgKGxldCBpID0gcGF0aC5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgIGNvbnN0IGsgPSBwYXRoW2ldO1xuXG4gICAgaWYgKE51bWJlci5pc0ludGVnZXIoaykgJiYgayA+PSAwKSB7XG4gICAgICBjb25zdCBhID0gW107XG4gICAgICBhW2tdID0gdjtcbiAgICAgIHYgPSBhO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBvID0ge307XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgaywge1xuICAgICAgICB2YWx1ZTogdixcbiAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgfSk7XG4gICAgICB2ID0gbztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gc2NoZW1hLmNyZWF0ZU5vZGUodiwgZmFsc2UpO1xufSAvLyBudWxsLCB1bmRlZmluZWQsIG9yIGFuIGVtcHR5IG5vbi1zdHJpbmcgaXRlcmFibGUgKGUuZy4gW10pXG5cblxuY29uc3QgaXNFbXB0eVBhdGggPSBwYXRoID0+IHBhdGggPT0gbnVsbCB8fCB0eXBlb2YgcGF0aCA9PT0gJ29iamVjdCcgJiYgcGF0aFtTeW1ib2wuaXRlcmF0b3JdKCkubmV4dCgpLmRvbmU7XG5jbGFzcyBDb2xsZWN0aW9uIGV4dGVuZHMgTm9kZSB7XG4gIGNvbnN0cnVjdG9yKHNjaGVtYSkge1xuICAgIHN1cGVyKCk7XG5cbiAgICBQbGFpblZhbHVlLl9kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcIml0ZW1zXCIsIFtdKTtcblxuICAgIHRoaXMuc2NoZW1hID0gc2NoZW1hO1xuICB9XG5cbiAgYWRkSW4ocGF0aCwgdmFsdWUpIHtcbiAgICBpZiAoaXNFbXB0eVBhdGgocGF0aCkpIHRoaXMuYWRkKHZhbHVlKTtlbHNlIHtcbiAgICAgIGNvbnN0IFtrZXksIC4uLnJlc3RdID0gcGF0aDtcbiAgICAgIGNvbnN0IG5vZGUgPSB0aGlzLmdldChrZXksIHRydWUpO1xuICAgICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBDb2xsZWN0aW9uKSBub2RlLmFkZEluKHJlc3QsIHZhbHVlKTtlbHNlIGlmIChub2RlID09PSB1bmRlZmluZWQgJiYgdGhpcy5zY2hlbWEpIHRoaXMuc2V0KGtleSwgY29sbGVjdGlvbkZyb21QYXRoKHRoaXMuc2NoZW1hLCByZXN0LCB2YWx1ZSkpO2Vsc2UgdGhyb3cgbmV3IEVycm9yKGBFeHBlY3RlZCBZQU1MIGNvbGxlY3Rpb24gYXQgJHtrZXl9LiBSZW1haW5pbmcgcGF0aDogJHtyZXN0fWApO1xuICAgIH1cbiAgfVxuXG4gIGRlbGV0ZUluKFtrZXksIC4uLnJlc3RdKSB7XG4gICAgaWYgKHJlc3QubGVuZ3RoID09PSAwKSByZXR1cm4gdGhpcy5kZWxldGUoa2V5KTtcbiAgICBjb25zdCBub2RlID0gdGhpcy5nZXQoa2V5LCB0cnVlKTtcbiAgICBpZiAobm9kZSBpbnN0YW5jZW9mIENvbGxlY3Rpb24pIHJldHVybiBub2RlLmRlbGV0ZUluKHJlc3QpO2Vsc2UgdGhyb3cgbmV3IEVycm9yKGBFeHBlY3RlZCBZQU1MIGNvbGxlY3Rpb24gYXQgJHtrZXl9LiBSZW1haW5pbmcgcGF0aDogJHtyZXN0fWApO1xuICB9XG5cbiAgZ2V0SW4oW2tleSwgLi4ucmVzdF0sIGtlZXBTY2FsYXIpIHtcbiAgICBjb25zdCBub2RlID0gdGhpcy5nZXQoa2V5LCB0cnVlKTtcbiAgICBpZiAocmVzdC5sZW5ndGggPT09IDApIHJldHVybiAha2VlcFNjYWxhciAmJiBub2RlIGluc3RhbmNlb2YgU2NhbGFyID8gbm9kZS52YWx1ZSA6IG5vZGU7ZWxzZSByZXR1cm4gbm9kZSBpbnN0YW5jZW9mIENvbGxlY3Rpb24gPyBub2RlLmdldEluKHJlc3QsIGtlZXBTY2FsYXIpIDogdW5kZWZpbmVkO1xuICB9XG5cbiAgaGFzQWxsTnVsbFZhbHVlcygpIHtcbiAgICByZXR1cm4gdGhpcy5pdGVtcy5ldmVyeShub2RlID0+IHtcbiAgICAgIGlmICghbm9kZSB8fCBub2RlLnR5cGUgIT09ICdQQUlSJykgcmV0dXJuIGZhbHNlO1xuICAgICAgY29uc3QgbiA9IG5vZGUudmFsdWU7XG4gICAgICByZXR1cm4gbiA9PSBudWxsIHx8IG4gaW5zdGFuY2VvZiBTY2FsYXIgJiYgbi52YWx1ZSA9PSBudWxsICYmICFuLmNvbW1lbnRCZWZvcmUgJiYgIW4uY29tbWVudCAmJiAhbi50YWc7XG4gICAgfSk7XG4gIH1cblxuICBoYXNJbihba2V5LCAuLi5yZXN0XSkge1xuICAgIGlmIChyZXN0Lmxlbmd0aCA9PT0gMCkgcmV0dXJuIHRoaXMuaGFzKGtleSk7XG4gICAgY29uc3Qgbm9kZSA9IHRoaXMuZ2V0KGtleSwgdHJ1ZSk7XG4gICAgcmV0dXJuIG5vZGUgaW5zdGFuY2VvZiBDb2xsZWN0aW9uID8gbm9kZS5oYXNJbihyZXN0KSA6IGZhbHNlO1xuICB9XG5cbiAgc2V0SW4oW2tleSwgLi4ucmVzdF0sIHZhbHVlKSB7XG4gICAgaWYgKHJlc3QubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aGlzLnNldChrZXksIHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3Qgbm9kZSA9IHRoaXMuZ2V0KGtleSwgdHJ1ZSk7XG4gICAgICBpZiAobm9kZSBpbnN0YW5jZW9mIENvbGxlY3Rpb24pIG5vZGUuc2V0SW4ocmVzdCwgdmFsdWUpO2Vsc2UgaWYgKG5vZGUgPT09IHVuZGVmaW5lZCAmJiB0aGlzLnNjaGVtYSkgdGhpcy5zZXQoa2V5LCBjb2xsZWN0aW9uRnJvbVBhdGgodGhpcy5zY2hlbWEsIHJlc3QsIHZhbHVlKSk7ZWxzZSB0aHJvdyBuZXcgRXJyb3IoYEV4cGVjdGVkIFlBTUwgY29sbGVjdGlvbiBhdCAke2tleX0uIFJlbWFpbmluZyBwYXRoOiAke3Jlc3R9YCk7XG4gICAgfVxuICB9IC8vIG92ZXJyaWRkZW4gaW4gaW1wbGVtZW50YXRpb25zXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cblxuXG4gIHRvSlNPTigpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHRvU3RyaW5nKGN0eCwge1xuICAgIGJsb2NrSXRlbSxcbiAgICBmbG93Q2hhcnMsXG4gICAgaXNNYXAsXG4gICAgaXRlbUluZGVudFxuICB9LCBvbkNvbW1lbnQsIG9uQ2hvbXBLZWVwKSB7XG4gICAgY29uc3Qge1xuICAgICAgaW5kZW50LFxuICAgICAgaW5kZW50U3RlcCxcbiAgICAgIHN0cmluZ2lmeVxuICAgIH0gPSBjdHg7XG4gICAgY29uc3QgaW5GbG93ID0gdGhpcy50eXBlID09PSBQbGFpblZhbHVlLlR5cGUuRkxPV19NQVAgfHwgdGhpcy50eXBlID09PSBQbGFpblZhbHVlLlR5cGUuRkxPV19TRVEgfHwgY3R4LmluRmxvdztcbiAgICBpZiAoaW5GbG93KSBpdGVtSW5kZW50ICs9IGluZGVudFN0ZXA7XG4gICAgY29uc3QgYWxsTnVsbFZhbHVlcyA9IGlzTWFwICYmIHRoaXMuaGFzQWxsTnVsbFZhbHVlcygpO1xuICAgIGN0eCA9IE9iamVjdC5hc3NpZ24oe30sIGN0eCwge1xuICAgICAgYWxsTnVsbFZhbHVlcyxcbiAgICAgIGluZGVudDogaXRlbUluZGVudCxcbiAgICAgIGluRmxvdyxcbiAgICAgIHR5cGU6IG51bGxcbiAgICB9KTtcbiAgICBsZXQgY2hvbXBLZWVwID0gZmFsc2U7XG4gICAgbGV0IGhhc0l0ZW1XaXRoTmV3TGluZSA9IGZhbHNlO1xuICAgIGNvbnN0IG5vZGVzID0gdGhpcy5pdGVtcy5yZWR1Y2UoKG5vZGVzLCBpdGVtLCBpKSA9PiB7XG4gICAgICBsZXQgY29tbWVudDtcblxuICAgICAgaWYgKGl0ZW0pIHtcbiAgICAgICAgaWYgKCFjaG9tcEtlZXAgJiYgaXRlbS5zcGFjZUJlZm9yZSkgbm9kZXMucHVzaCh7XG4gICAgICAgICAgdHlwZTogJ2NvbW1lbnQnLFxuICAgICAgICAgIHN0cjogJydcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChpdGVtLmNvbW1lbnRCZWZvcmUpIGl0ZW0uY29tbWVudEJlZm9yZS5tYXRjaCgvXi4qJC9nbSkuZm9yRWFjaChsaW5lID0+IHtcbiAgICAgICAgICBub2Rlcy5wdXNoKHtcbiAgICAgICAgICAgIHR5cGU6ICdjb21tZW50JyxcbiAgICAgICAgICAgIHN0cjogYCMke2xpbmV9YFxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGl0ZW0uY29tbWVudCkgY29tbWVudCA9IGl0ZW0uY29tbWVudDtcbiAgICAgICAgaWYgKGluRmxvdyAmJiAoIWNob21wS2VlcCAmJiBpdGVtLnNwYWNlQmVmb3JlIHx8IGl0ZW0uY29tbWVudEJlZm9yZSB8fCBpdGVtLmNvbW1lbnQgfHwgaXRlbS5rZXkgJiYgKGl0ZW0ua2V5LmNvbW1lbnRCZWZvcmUgfHwgaXRlbS5rZXkuY29tbWVudCkgfHwgaXRlbS52YWx1ZSAmJiAoaXRlbS52YWx1ZS5jb21tZW50QmVmb3JlIHx8IGl0ZW0udmFsdWUuY29tbWVudCkpKSBoYXNJdGVtV2l0aE5ld0xpbmUgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICBjaG9tcEtlZXAgPSBmYWxzZTtcbiAgICAgIGxldCBzdHIgPSBzdHJpbmdpZnkoaXRlbSwgY3R4LCAoKSA9PiBjb21tZW50ID0gbnVsbCwgKCkgPT4gY2hvbXBLZWVwID0gdHJ1ZSk7XG4gICAgICBpZiAoaW5GbG93ICYmICFoYXNJdGVtV2l0aE5ld0xpbmUgJiYgc3RyLmluY2x1ZGVzKCdcXG4nKSkgaGFzSXRlbVdpdGhOZXdMaW5lID0gdHJ1ZTtcbiAgICAgIGlmIChpbkZsb3cgJiYgaSA8IHRoaXMuaXRlbXMubGVuZ3RoIC0gMSkgc3RyICs9ICcsJztcbiAgICAgIHN0ciA9IGFkZENvbW1lbnQoc3RyLCBpdGVtSW5kZW50LCBjb21tZW50KTtcbiAgICAgIGlmIChjaG9tcEtlZXAgJiYgKGNvbW1lbnQgfHwgaW5GbG93KSkgY2hvbXBLZWVwID0gZmFsc2U7XG4gICAgICBub2Rlcy5wdXNoKHtcbiAgICAgICAgdHlwZTogJ2l0ZW0nLFxuICAgICAgICBzdHJcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIG5vZGVzO1xuICAgIH0sIFtdKTtcbiAgICBsZXQgc3RyO1xuXG4gICAgaWYgKG5vZGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgc3RyID0gZmxvd0NoYXJzLnN0YXJ0ICsgZmxvd0NoYXJzLmVuZDtcbiAgICB9IGVsc2UgaWYgKGluRmxvdykge1xuICAgICAgY29uc3Qge1xuICAgICAgICBzdGFydCxcbiAgICAgICAgZW5kXG4gICAgICB9ID0gZmxvd0NoYXJzO1xuICAgICAgY29uc3Qgc3RyaW5ncyA9IG5vZGVzLm1hcChuID0+IG4uc3RyKTtcblxuICAgICAgaWYgKGhhc0l0ZW1XaXRoTmV3TGluZSB8fCBzdHJpbmdzLnJlZHVjZSgoc3VtLCBzdHIpID0+IHN1bSArIHN0ci5sZW5ndGggKyAyLCAyKSA+IENvbGxlY3Rpb24ubWF4Rmxvd1N0cmluZ1NpbmdsZUxpbmVMZW5ndGgpIHtcbiAgICAgICAgc3RyID0gc3RhcnQ7XG5cbiAgICAgICAgZm9yIChjb25zdCBzIG9mIHN0cmluZ3MpIHtcbiAgICAgICAgICBzdHIgKz0gcyA/IGBcXG4ke2luZGVudFN0ZXB9JHtpbmRlbnR9JHtzfWAgOiAnXFxuJztcbiAgICAgICAgfVxuXG4gICAgICAgIHN0ciArPSBgXFxuJHtpbmRlbnR9JHtlbmR9YDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0ciA9IGAke3N0YXJ0fSAke3N0cmluZ3Muam9pbignICcpfSAke2VuZH1gO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBzdHJpbmdzID0gbm9kZXMubWFwKGJsb2NrSXRlbSk7XG4gICAgICBzdHIgPSBzdHJpbmdzLnNoaWZ0KCk7XG5cbiAgICAgIGZvciAoY29uc3QgcyBvZiBzdHJpbmdzKSBzdHIgKz0gcyA/IGBcXG4ke2luZGVudH0ke3N9YCA6ICdcXG4nO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmNvbW1lbnQpIHtcbiAgICAgIHN0ciArPSAnXFxuJyArIHRoaXMuY29tbWVudC5yZXBsYWNlKC9eL2dtLCBgJHtpbmRlbnR9I2ApO1xuICAgICAgaWYgKG9uQ29tbWVudCkgb25Db21tZW50KCk7XG4gICAgfSBlbHNlIGlmIChjaG9tcEtlZXAgJiYgb25DaG9tcEtlZXApIG9uQ2hvbXBLZWVwKCk7XG5cbiAgICByZXR1cm4gc3RyO1xuICB9XG5cbn1cblxuUGxhaW5WYWx1ZS5fZGVmaW5lUHJvcGVydHkoQ29sbGVjdGlvbiwgXCJtYXhGbG93U3RyaW5nU2luZ2xlTGluZUxlbmd0aFwiLCA2MCk7XG5cbmZ1bmN0aW9uIGFzSXRlbUluZGV4KGtleSkge1xuICBsZXQgaWR4ID0ga2V5IGluc3RhbmNlb2YgU2NhbGFyID8ga2V5LnZhbHVlIDoga2V5O1xuICBpZiAoaWR4ICYmIHR5cGVvZiBpZHggPT09ICdzdHJpbmcnKSBpZHggPSBOdW1iZXIoaWR4KTtcbiAgcmV0dXJuIE51bWJlci5pc0ludGVnZXIoaWR4KSAmJiBpZHggPj0gMCA/IGlkeCA6IG51bGw7XG59XG5cbmNsYXNzIFlBTUxTZXEgZXh0ZW5kcyBDb2xsZWN0aW9uIHtcbiAgYWRkKHZhbHVlKSB7XG4gICAgdGhpcy5pdGVtcy5wdXNoKHZhbHVlKTtcbiAgfVxuXG4gIGRlbGV0ZShrZXkpIHtcbiAgICBjb25zdCBpZHggPSBhc0l0ZW1JbmRleChrZXkpO1xuICAgIGlmICh0eXBlb2YgaWR4ICE9PSAnbnVtYmVyJykgcmV0dXJuIGZhbHNlO1xuICAgIGNvbnN0IGRlbCA9IHRoaXMuaXRlbXMuc3BsaWNlKGlkeCwgMSk7XG4gICAgcmV0dXJuIGRlbC5sZW5ndGggPiAwO1xuICB9XG5cbiAgZ2V0KGtleSwga2VlcFNjYWxhcikge1xuICAgIGNvbnN0IGlkeCA9IGFzSXRlbUluZGV4KGtleSk7XG4gICAgaWYgKHR5cGVvZiBpZHggIT09ICdudW1iZXInKSByZXR1cm4gdW5kZWZpbmVkO1xuICAgIGNvbnN0IGl0ID0gdGhpcy5pdGVtc1tpZHhdO1xuICAgIHJldHVybiAha2VlcFNjYWxhciAmJiBpdCBpbnN0YW5jZW9mIFNjYWxhciA/IGl0LnZhbHVlIDogaXQ7XG4gIH1cblxuICBoYXMoa2V5KSB7XG4gICAgY29uc3QgaWR4ID0gYXNJdGVtSW5kZXgoa2V5KTtcbiAgICByZXR1cm4gdHlwZW9mIGlkeCA9PT0gJ251bWJlcicgJiYgaWR4IDwgdGhpcy5pdGVtcy5sZW5ndGg7XG4gIH1cblxuICBzZXQoa2V5LCB2YWx1ZSkge1xuICAgIGNvbnN0IGlkeCA9IGFzSXRlbUluZGV4KGtleSk7XG4gICAgaWYgKHR5cGVvZiBpZHggIT09ICdudW1iZXInKSB0aHJvdyBuZXcgRXJyb3IoYEV4cGVjdGVkIGEgdmFsaWQgaW5kZXgsIG5vdCAke2tleX0uYCk7XG4gICAgdGhpcy5pdGVtc1tpZHhdID0gdmFsdWU7XG4gIH1cblxuICB0b0pTT04oXywgY3R4KSB7XG4gICAgY29uc3Qgc2VxID0gW107XG4gICAgaWYgKGN0eCAmJiBjdHgub25DcmVhdGUpIGN0eC5vbkNyZWF0ZShzZXEpO1xuICAgIGxldCBpID0gMDtcblxuICAgIGZvciAoY29uc3QgaXRlbSBvZiB0aGlzLml0ZW1zKSBzZXEucHVzaCh0b0pTT04oaXRlbSwgU3RyaW5nKGkrKyksIGN0eCkpO1xuXG4gICAgcmV0dXJuIHNlcTtcbiAgfVxuXG4gIHRvU3RyaW5nKGN0eCwgb25Db21tZW50LCBvbkNob21wS2VlcCkge1xuICAgIGlmICghY3R4KSByZXR1cm4gSlNPTi5zdHJpbmdpZnkodGhpcyk7XG4gICAgcmV0dXJuIHN1cGVyLnRvU3RyaW5nKGN0eCwge1xuICAgICAgYmxvY2tJdGVtOiBuID0+IG4udHlwZSA9PT0gJ2NvbW1lbnQnID8gbi5zdHIgOiBgLSAke24uc3RyfWAsXG4gICAgICBmbG93Q2hhcnM6IHtcbiAgICAgICAgc3RhcnQ6ICdbJyxcbiAgICAgICAgZW5kOiAnXSdcbiAgICAgIH0sXG4gICAgICBpc01hcDogZmFsc2UsXG4gICAgICBpdGVtSW5kZW50OiAoY3R4LmluZGVudCB8fCAnJykgKyAnICAnXG4gICAgfSwgb25Db21tZW50LCBvbkNob21wS2VlcCk7XG4gIH1cblxufVxuXG5jb25zdCBzdHJpbmdpZnlLZXkgPSAoa2V5LCBqc0tleSwgY3R4KSA9PiB7XG4gIGlmIChqc0tleSA9PT0gbnVsbCkgcmV0dXJuICcnO1xuICBpZiAodHlwZW9mIGpzS2V5ICE9PSAnb2JqZWN0JykgcmV0dXJuIFN0cmluZyhqc0tleSk7XG4gIGlmIChrZXkgaW5zdGFuY2VvZiBOb2RlICYmIGN0eCAmJiBjdHguZG9jKSByZXR1cm4ga2V5LnRvU3RyaW5nKHtcbiAgICBhbmNob3JzOiBPYmplY3QuY3JlYXRlKG51bGwpLFxuICAgIGRvYzogY3R4LmRvYyxcbiAgICBpbmRlbnQ6ICcnLFxuICAgIGluZGVudFN0ZXA6IGN0eC5pbmRlbnRTdGVwLFxuICAgIGluRmxvdzogdHJ1ZSxcbiAgICBpblN0cmluZ2lmeUtleTogdHJ1ZSxcbiAgICBzdHJpbmdpZnk6IGN0eC5zdHJpbmdpZnlcbiAgfSk7XG4gIHJldHVybiBKU09OLnN0cmluZ2lmeShqc0tleSk7XG59O1xuXG5jbGFzcyBQYWlyIGV4dGVuZHMgTm9kZSB7XG4gIGNvbnN0cnVjdG9yKGtleSwgdmFsdWUgPSBudWxsKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmtleSA9IGtleTtcbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy50eXBlID0gUGFpci5UeXBlLlBBSVI7XG4gIH1cblxuICBnZXQgY29tbWVudEJlZm9yZSgpIHtcbiAgICByZXR1cm4gdGhpcy5rZXkgaW5zdGFuY2VvZiBOb2RlID8gdGhpcy5rZXkuY29tbWVudEJlZm9yZSA6IHVuZGVmaW5lZDtcbiAgfVxuXG4gIHNldCBjb21tZW50QmVmb3JlKGNiKSB7XG4gICAgaWYgKHRoaXMua2V5ID09IG51bGwpIHRoaXMua2V5ID0gbmV3IFNjYWxhcihudWxsKTtcbiAgICBpZiAodGhpcy5rZXkgaW5zdGFuY2VvZiBOb2RlKSB0aGlzLmtleS5jb21tZW50QmVmb3JlID0gY2I7ZWxzZSB7XG4gICAgICBjb25zdCBtc2cgPSAnUGFpci5jb21tZW50QmVmb3JlIGlzIGFuIGFsaWFzIGZvciBQYWlyLmtleS5jb21tZW50QmVmb3JlLiBUbyBzZXQgaXQsIHRoZSBrZXkgbXVzdCBiZSBhIE5vZGUuJztcbiAgICAgIHRocm93IG5ldyBFcnJvcihtc2cpO1xuICAgIH1cbiAgfVxuXG4gIGFkZFRvSlNNYXAoY3R4LCBtYXApIHtcbiAgICBjb25zdCBrZXkgPSB0b0pTT04odGhpcy5rZXksICcnLCBjdHgpO1xuXG4gICAgaWYgKG1hcCBpbnN0YW5jZW9mIE1hcCkge1xuICAgICAgY29uc3QgdmFsdWUgPSB0b0pTT04odGhpcy52YWx1ZSwga2V5LCBjdHgpO1xuICAgICAgbWFwLnNldChrZXksIHZhbHVlKTtcbiAgICB9IGVsc2UgaWYgKG1hcCBpbnN0YW5jZW9mIFNldCkge1xuICAgICAgbWFwLmFkZChrZXkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBzdHJpbmdLZXkgPSBzdHJpbmdpZnlLZXkodGhpcy5rZXksIGtleSwgY3R4KTtcbiAgICAgIGNvbnN0IHZhbHVlID0gdG9KU09OKHRoaXMudmFsdWUsIHN0cmluZ0tleSwgY3R4KTtcbiAgICAgIGlmIChzdHJpbmdLZXkgaW4gbWFwKSBPYmplY3QuZGVmaW5lUHJvcGVydHkobWFwLCBzdHJpbmdLZXksIHtcbiAgICAgICAgdmFsdWUsXG4gICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgIH0pO2Vsc2UgbWFwW3N0cmluZ0tleV0gPSB2YWx1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWFwO1xuICB9XG5cbiAgdG9KU09OKF8sIGN0eCkge1xuICAgIGNvbnN0IHBhaXIgPSBjdHggJiYgY3R4Lm1hcEFzTWFwID8gbmV3IE1hcCgpIDoge307XG4gICAgcmV0dXJuIHRoaXMuYWRkVG9KU01hcChjdHgsIHBhaXIpO1xuICB9XG5cbiAgdG9TdHJpbmcoY3R4LCBvbkNvbW1lbnQsIG9uQ2hvbXBLZWVwKSB7XG4gICAgaWYgKCFjdHggfHwgIWN0eC5kb2MpIHJldHVybiBKU09OLnN0cmluZ2lmeSh0aGlzKTtcbiAgICBjb25zdCB7XG4gICAgICBpbmRlbnQ6IGluZGVudFNpemUsXG4gICAgICBpbmRlbnRTZXEsXG4gICAgICBzaW1wbGVLZXlzXG4gICAgfSA9IGN0eC5kb2Mub3B0aW9ucztcbiAgICBsZXQge1xuICAgICAga2V5LFxuICAgICAgdmFsdWVcbiAgICB9ID0gdGhpcztcbiAgICBsZXQga2V5Q29tbWVudCA9IGtleSBpbnN0YW5jZW9mIE5vZGUgJiYga2V5LmNvbW1lbnQ7XG5cbiAgICBpZiAoc2ltcGxlS2V5cykge1xuICAgICAgaWYgKGtleUNvbW1lbnQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdXaXRoIHNpbXBsZSBrZXlzLCBrZXkgbm9kZXMgY2Fubm90IGhhdmUgY29tbWVudHMnKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGtleSBpbnN0YW5jZW9mIENvbGxlY3Rpb24pIHtcbiAgICAgICAgY29uc3QgbXNnID0gJ1dpdGggc2ltcGxlIGtleXMsIGNvbGxlY3Rpb24gY2Fubm90IGJlIHVzZWQgYXMgYSBrZXkgdmFsdWUnO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IobXNnKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgZXhwbGljaXRLZXkgPSAhc2ltcGxlS2V5cyAmJiAoIWtleSB8fCBrZXlDb21tZW50IHx8IChrZXkgaW5zdGFuY2VvZiBOb2RlID8ga2V5IGluc3RhbmNlb2YgQ29sbGVjdGlvbiB8fCBrZXkudHlwZSA9PT0gUGxhaW5WYWx1ZS5UeXBlLkJMT0NLX0ZPTERFRCB8fCBrZXkudHlwZSA9PT0gUGxhaW5WYWx1ZS5UeXBlLkJMT0NLX0xJVEVSQUwgOiB0eXBlb2Yga2V5ID09PSAnb2JqZWN0JykpO1xuICAgIGNvbnN0IHtcbiAgICAgIGRvYyxcbiAgICAgIGluZGVudCxcbiAgICAgIGluZGVudFN0ZXAsXG4gICAgICBzdHJpbmdpZnlcbiAgICB9ID0gY3R4O1xuICAgIGN0eCA9IE9iamVjdC5hc3NpZ24oe30sIGN0eCwge1xuICAgICAgaW1wbGljaXRLZXk6ICFleHBsaWNpdEtleSxcbiAgICAgIGluZGVudDogaW5kZW50ICsgaW5kZW50U3RlcFxuICAgIH0pO1xuICAgIGxldCBjaG9tcEtlZXAgPSBmYWxzZTtcbiAgICBsZXQgc3RyID0gc3RyaW5naWZ5KGtleSwgY3R4LCAoKSA9PiBrZXlDb21tZW50ID0gbnVsbCwgKCkgPT4gY2hvbXBLZWVwID0gdHJ1ZSk7XG4gICAgc3RyID0gYWRkQ29tbWVudChzdHIsIGN0eC5pbmRlbnQsIGtleUNvbW1lbnQpO1xuXG4gICAgaWYgKCFleHBsaWNpdEtleSAmJiBzdHIubGVuZ3RoID4gMTAyNCkge1xuICAgICAgaWYgKHNpbXBsZUtleXMpIHRocm93IG5ldyBFcnJvcignV2l0aCBzaW1wbGUga2V5cywgc2luZ2xlIGxpbmUgc2NhbGFyIG11c3Qgbm90IHNwYW4gbW9yZSB0aGFuIDEwMjQgY2hhcmFjdGVycycpO1xuICAgICAgZXhwbGljaXRLZXkgPSB0cnVlO1xuICAgIH1cblxuICAgIGlmIChjdHguYWxsTnVsbFZhbHVlcyAmJiAhc2ltcGxlS2V5cykge1xuICAgICAgaWYgKHRoaXMuY29tbWVudCkge1xuICAgICAgICBzdHIgPSBhZGRDb21tZW50KHN0ciwgY3R4LmluZGVudCwgdGhpcy5jb21tZW50KTtcbiAgICAgICAgaWYgKG9uQ29tbWVudCkgb25Db21tZW50KCk7XG4gICAgICB9IGVsc2UgaWYgKGNob21wS2VlcCAmJiAha2V5Q29tbWVudCAmJiBvbkNob21wS2VlcCkgb25DaG9tcEtlZXAoKTtcblxuICAgICAgcmV0dXJuIGN0eC5pbkZsb3cgJiYgIWV4cGxpY2l0S2V5ID8gc3RyIDogYD8gJHtzdHJ9YDtcbiAgICB9XG5cbiAgICBzdHIgPSBleHBsaWNpdEtleSA/IGA/ICR7c3RyfVxcbiR7aW5kZW50fTpgIDogYCR7c3RyfTpgO1xuXG4gICAgaWYgKHRoaXMuY29tbWVudCkge1xuICAgICAgLy8gZXhwZWN0ZWQgKGJ1dCBub3Qgc3RyaWN0bHkgcmVxdWlyZWQpIHRvIGJlIGEgc2luZ2xlLWxpbmUgY29tbWVudFxuICAgICAgc3RyID0gYWRkQ29tbWVudChzdHIsIGN0eC5pbmRlbnQsIHRoaXMuY29tbWVudCk7XG4gICAgICBpZiAob25Db21tZW50KSBvbkNvbW1lbnQoKTtcbiAgICB9XG5cbiAgICBsZXQgdmNiID0gJyc7XG4gICAgbGV0IHZhbHVlQ29tbWVudCA9IG51bGw7XG5cbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBOb2RlKSB7XG4gICAgICBpZiAodmFsdWUuc3BhY2VCZWZvcmUpIHZjYiA9ICdcXG4nO1xuXG4gICAgICBpZiAodmFsdWUuY29tbWVudEJlZm9yZSkge1xuICAgICAgICBjb25zdCBjcyA9IHZhbHVlLmNvbW1lbnRCZWZvcmUucmVwbGFjZSgvXi9nbSwgYCR7Y3R4LmluZGVudH0jYCk7XG4gICAgICAgIHZjYiArPSBgXFxuJHtjc31gO1xuICAgICAgfVxuXG4gICAgICB2YWx1ZUNvbW1lbnQgPSB2YWx1ZS5jb21tZW50O1xuICAgIH0gZWxzZSBpZiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgICAgdmFsdWUgPSBkb2Muc2NoZW1hLmNyZWF0ZU5vZGUodmFsdWUsIHRydWUpO1xuICAgIH1cblxuICAgIGN0eC5pbXBsaWNpdEtleSA9IGZhbHNlO1xuICAgIGlmICghZXhwbGljaXRLZXkgJiYgIXRoaXMuY29tbWVudCAmJiB2YWx1ZSBpbnN0YW5jZW9mIFNjYWxhcikgY3R4LmluZGVudEF0U3RhcnQgPSBzdHIubGVuZ3RoICsgMTtcbiAgICBjaG9tcEtlZXAgPSBmYWxzZTtcblxuICAgIGlmICghaW5kZW50U2VxICYmIGluZGVudFNpemUgPj0gMiAmJiAhY3R4LmluRmxvdyAmJiAhZXhwbGljaXRLZXkgJiYgdmFsdWUgaW5zdGFuY2VvZiBZQU1MU2VxICYmIHZhbHVlLnR5cGUgIT09IFBsYWluVmFsdWUuVHlwZS5GTE9XX1NFUSAmJiAhdmFsdWUudGFnICYmICFkb2MuYW5jaG9ycy5nZXROYW1lKHZhbHVlKSkge1xuICAgICAgLy8gSWYgaW5kZW50U2VxID09PSBmYWxzZSwgY29uc2lkZXIgJy0gJyBhcyBwYXJ0IG9mIGluZGVudGF0aW9uIHdoZXJlIHBvc3NpYmxlXG4gICAgICBjdHguaW5kZW50ID0gY3R4LmluZGVudC5zdWJzdHIoMik7XG4gICAgfVxuXG4gICAgY29uc3QgdmFsdWVTdHIgPSBzdHJpbmdpZnkodmFsdWUsIGN0eCwgKCkgPT4gdmFsdWVDb21tZW50ID0gbnVsbCwgKCkgPT4gY2hvbXBLZWVwID0gdHJ1ZSk7XG4gICAgbGV0IHdzID0gJyAnO1xuXG4gICAgaWYgKHZjYiB8fCB0aGlzLmNvbW1lbnQpIHtcbiAgICAgIHdzID0gYCR7dmNifVxcbiR7Y3R4LmluZGVudH1gO1xuICAgIH0gZWxzZSBpZiAoIWV4cGxpY2l0S2V5ICYmIHZhbHVlIGluc3RhbmNlb2YgQ29sbGVjdGlvbikge1xuICAgICAgY29uc3QgZmxvdyA9IHZhbHVlU3RyWzBdID09PSAnWycgfHwgdmFsdWVTdHJbMF0gPT09ICd7JztcbiAgICAgIGlmICghZmxvdyB8fCB2YWx1ZVN0ci5pbmNsdWRlcygnXFxuJykpIHdzID0gYFxcbiR7Y3R4LmluZGVudH1gO1xuICAgIH0gZWxzZSBpZiAodmFsdWVTdHJbMF0gPT09ICdcXG4nKSB3cyA9ICcnO1xuXG4gICAgaWYgKGNob21wS2VlcCAmJiAhdmFsdWVDb21tZW50ICYmIG9uQ2hvbXBLZWVwKSBvbkNob21wS2VlcCgpO1xuICAgIHJldHVybiBhZGRDb21tZW50KHN0ciArIHdzICsgdmFsdWVTdHIsIGN0eC5pbmRlbnQsIHZhbHVlQ29tbWVudCk7XG4gIH1cblxufVxuXG5QbGFpblZhbHVlLl9kZWZpbmVQcm9wZXJ0eShQYWlyLCBcIlR5cGVcIiwge1xuICBQQUlSOiAnUEFJUicsXG4gIE1FUkdFX1BBSVI6ICdNRVJHRV9QQUlSJ1xufSk7XG5cbmNvbnN0IGdldEFsaWFzQ291bnQgPSAobm9kZSwgYW5jaG9ycykgPT4ge1xuICBpZiAobm9kZSBpbnN0YW5jZW9mIEFsaWFzKSB7XG4gICAgY29uc3QgYW5jaG9yID0gYW5jaG9ycy5nZXQobm9kZS5zb3VyY2UpO1xuICAgIHJldHVybiBhbmNob3IuY291bnQgKiBhbmNob3IuYWxpYXNDb3VudDtcbiAgfSBlbHNlIGlmIChub2RlIGluc3RhbmNlb2YgQ29sbGVjdGlvbikge1xuICAgIGxldCBjb3VudCA9IDA7XG5cbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2Ygbm9kZS5pdGVtcykge1xuICAgICAgY29uc3QgYyA9IGdldEFsaWFzQ291bnQoaXRlbSwgYW5jaG9ycyk7XG4gICAgICBpZiAoYyA+IGNvdW50KSBjb3VudCA9IGM7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvdW50O1xuICB9IGVsc2UgaWYgKG5vZGUgaW5zdGFuY2VvZiBQYWlyKSB7XG4gICAgY29uc3Qga2MgPSBnZXRBbGlhc0NvdW50KG5vZGUua2V5LCBhbmNob3JzKTtcbiAgICBjb25zdCB2YyA9IGdldEFsaWFzQ291bnQobm9kZS52YWx1ZSwgYW5jaG9ycyk7XG4gICAgcmV0dXJuIE1hdGgubWF4KGtjLCB2Yyk7XG4gIH1cblxuICByZXR1cm4gMTtcbn07XG5cbmNsYXNzIEFsaWFzIGV4dGVuZHMgTm9kZSB7XG4gIHN0YXRpYyBzdHJpbmdpZnkoe1xuICAgIHJhbmdlLFxuICAgIHNvdXJjZVxuICB9LCB7XG4gICAgYW5jaG9ycyxcbiAgICBkb2MsXG4gICAgaW1wbGljaXRLZXksXG4gICAgaW5TdHJpbmdpZnlLZXlcbiAgfSkge1xuICAgIGxldCBhbmNob3IgPSBPYmplY3Qua2V5cyhhbmNob3JzKS5maW5kKGEgPT4gYW5jaG9yc1thXSA9PT0gc291cmNlKTtcbiAgICBpZiAoIWFuY2hvciAmJiBpblN0cmluZ2lmeUtleSkgYW5jaG9yID0gZG9jLmFuY2hvcnMuZ2V0TmFtZShzb3VyY2UpIHx8IGRvYy5hbmNob3JzLm5ld05hbWUoKTtcbiAgICBpZiAoYW5jaG9yKSByZXR1cm4gYCoke2FuY2hvcn0ke2ltcGxpY2l0S2V5ID8gJyAnIDogJyd9YDtcbiAgICBjb25zdCBtc2cgPSBkb2MuYW5jaG9ycy5nZXROYW1lKHNvdXJjZSkgPyAnQWxpYXMgbm9kZSBtdXN0IGJlIGFmdGVyIHNvdXJjZSBub2RlJyA6ICdTb3VyY2Ugbm9kZSBub3QgZm91bmQgZm9yIGFsaWFzIG5vZGUnO1xuICAgIHRocm93IG5ldyBFcnJvcihgJHttc2d9IFske3JhbmdlfV1gKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHNvdXJjZSkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5zb3VyY2UgPSBzb3VyY2U7XG4gICAgdGhpcy50eXBlID0gUGxhaW5WYWx1ZS5UeXBlLkFMSUFTO1xuICB9XG5cbiAgc2V0IHRhZyh0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdBbGlhcyBub2RlcyBjYW5ub3QgaGF2ZSB0YWdzJyk7XG4gIH1cblxuICB0b0pTT04oYXJnLCBjdHgpIHtcbiAgICBpZiAoIWN0eCkgcmV0dXJuIHRvSlNPTih0aGlzLnNvdXJjZSwgYXJnLCBjdHgpO1xuICAgIGNvbnN0IHtcbiAgICAgIGFuY2hvcnMsXG4gICAgICBtYXhBbGlhc0NvdW50XG4gICAgfSA9IGN0eDtcbiAgICBjb25zdCBhbmNob3IgPSBhbmNob3JzLmdldCh0aGlzLnNvdXJjZSk7XG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG5cbiAgICBpZiAoIWFuY2hvciB8fCBhbmNob3IucmVzID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnN0IG1zZyA9ICdUaGlzIHNob3VsZCBub3QgaGFwcGVuOiBBbGlhcyBhbmNob3Igd2FzIG5vdCByZXNvbHZlZD8nO1xuICAgICAgaWYgKHRoaXMuY3N0Tm9kZSkgdGhyb3cgbmV3IFBsYWluVmFsdWUuWUFNTFJlZmVyZW5jZUVycm9yKHRoaXMuY3N0Tm9kZSwgbXNnKTtlbHNlIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihtc2cpO1xuICAgIH1cblxuICAgIGlmIChtYXhBbGlhc0NvdW50ID49IDApIHtcbiAgICAgIGFuY2hvci5jb3VudCArPSAxO1xuICAgICAgaWYgKGFuY2hvci5hbGlhc0NvdW50ID09PSAwKSBhbmNob3IuYWxpYXNDb3VudCA9IGdldEFsaWFzQ291bnQodGhpcy5zb3VyY2UsIGFuY2hvcnMpO1xuXG4gICAgICBpZiAoYW5jaG9yLmNvdW50ICogYW5jaG9yLmFsaWFzQ291bnQgPiBtYXhBbGlhc0NvdW50KSB7XG4gICAgICAgIGNvbnN0IG1zZyA9ICdFeGNlc3NpdmUgYWxpYXMgY291bnQgaW5kaWNhdGVzIGEgcmVzb3VyY2UgZXhoYXVzdGlvbiBhdHRhY2snO1xuICAgICAgICBpZiAodGhpcy5jc3ROb2RlKSB0aHJvdyBuZXcgUGxhaW5WYWx1ZS5ZQU1MUmVmZXJlbmNlRXJyb3IodGhpcy5jc3ROb2RlLCBtc2cpO2Vsc2UgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKG1zZyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGFuY2hvci5yZXM7XG4gIH0gLy8gT25seSBjYWxsZWQgd2hlbiBzdHJpbmdpZnlpbmcgYW4gYWxpYXMgbWFwcGluZyBrZXkgd2hpbGUgY29uc3RydWN0aW5nXG4gIC8vIE9iamVjdCBvdXRwdXQuXG5cblxuICB0b1N0cmluZyhjdHgpIHtcbiAgICByZXR1cm4gQWxpYXMuc3RyaW5naWZ5KHRoaXMsIGN0eCk7XG4gIH1cblxufVxuXG5QbGFpblZhbHVlLl9kZWZpbmVQcm9wZXJ0eShBbGlhcywgXCJkZWZhdWx0XCIsIHRydWUpO1xuXG5mdW5jdGlvbiBmaW5kUGFpcihpdGVtcywga2V5KSB7XG4gIGNvbnN0IGsgPSBrZXkgaW5zdGFuY2VvZiBTY2FsYXIgPyBrZXkudmFsdWUgOiBrZXk7XG5cbiAgZm9yIChjb25zdCBpdCBvZiBpdGVtcykge1xuICAgIGlmIChpdCBpbnN0YW5jZW9mIFBhaXIpIHtcbiAgICAgIGlmIChpdC5rZXkgPT09IGtleSB8fCBpdC5rZXkgPT09IGspIHJldHVybiBpdDtcbiAgICAgIGlmIChpdC5rZXkgJiYgaXQua2V5LnZhbHVlID09PSBrKSByZXR1cm4gaXQ7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cbmNsYXNzIFlBTUxNYXAgZXh0ZW5kcyBDb2xsZWN0aW9uIHtcbiAgYWRkKHBhaXIsIG92ZXJ3cml0ZSkge1xuICAgIGlmICghcGFpcikgcGFpciA9IG5ldyBQYWlyKHBhaXIpO2Vsc2UgaWYgKCEocGFpciBpbnN0YW5jZW9mIFBhaXIpKSBwYWlyID0gbmV3IFBhaXIocGFpci5rZXkgfHwgcGFpciwgcGFpci52YWx1ZSk7XG4gICAgY29uc3QgcHJldiA9IGZpbmRQYWlyKHRoaXMuaXRlbXMsIHBhaXIua2V5KTtcbiAgICBjb25zdCBzb3J0RW50cmllcyA9IHRoaXMuc2NoZW1hICYmIHRoaXMuc2NoZW1hLnNvcnRNYXBFbnRyaWVzO1xuXG4gICAgaWYgKHByZXYpIHtcbiAgICAgIGlmIChvdmVyd3JpdGUpIHByZXYudmFsdWUgPSBwYWlyLnZhbHVlO2Vsc2UgdGhyb3cgbmV3IEVycm9yKGBLZXkgJHtwYWlyLmtleX0gYWxyZWFkeSBzZXRgKTtcbiAgICB9IGVsc2UgaWYgKHNvcnRFbnRyaWVzKSB7XG4gICAgICBjb25zdCBpID0gdGhpcy5pdGVtcy5maW5kSW5kZXgoaXRlbSA9PiBzb3J0RW50cmllcyhwYWlyLCBpdGVtKSA8IDApO1xuICAgICAgaWYgKGkgPT09IC0xKSB0aGlzLml0ZW1zLnB1c2gocGFpcik7ZWxzZSB0aGlzLml0ZW1zLnNwbGljZShpLCAwLCBwYWlyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pdGVtcy5wdXNoKHBhaXIpO1xuICAgIH1cbiAgfVxuXG4gIGRlbGV0ZShrZXkpIHtcbiAgICBjb25zdCBpdCA9IGZpbmRQYWlyKHRoaXMuaXRlbXMsIGtleSk7XG4gICAgaWYgKCFpdCkgcmV0dXJuIGZhbHNlO1xuICAgIGNvbnN0IGRlbCA9IHRoaXMuaXRlbXMuc3BsaWNlKHRoaXMuaXRlbXMuaW5kZXhPZihpdCksIDEpO1xuICAgIHJldHVybiBkZWwubGVuZ3RoID4gMDtcbiAgfVxuXG4gIGdldChrZXksIGtlZXBTY2FsYXIpIHtcbiAgICBjb25zdCBpdCA9IGZpbmRQYWlyKHRoaXMuaXRlbXMsIGtleSk7XG4gICAgY29uc3Qgbm9kZSA9IGl0ICYmIGl0LnZhbHVlO1xuICAgIHJldHVybiAha2VlcFNjYWxhciAmJiBub2RlIGluc3RhbmNlb2YgU2NhbGFyID8gbm9kZS52YWx1ZSA6IG5vZGU7XG4gIH1cblxuICBoYXMoa2V5KSB7XG4gICAgcmV0dXJuICEhZmluZFBhaXIodGhpcy5pdGVtcywga2V5KTtcbiAgfVxuXG4gIHNldChrZXksIHZhbHVlKSB7XG4gICAgdGhpcy5hZGQobmV3IFBhaXIoa2V5LCB2YWx1ZSksIHRydWUpO1xuICB9XG4gIC8qKlxuICAgKiBAcGFyYW0geyp9IGFyZyBpZ25vcmVkXG4gICAqIEBwYXJhbSB7Kn0gY3R4IENvbnZlcnNpb24gY29udGV4dCwgb3JpZ2luYWxseSBzZXQgaW4gRG9jdW1lbnQjdG9KU09OKClcbiAgICogQHBhcmFtIHtDbGFzc30gVHlwZSBJZiBzZXQsIGZvcmNlcyB0aGUgcmV0dXJuZWQgY29sbGVjdGlvbiB0eXBlXG4gICAqIEByZXR1cm5zIHsqfSBJbnN0YW5jZSBvZiBUeXBlLCBNYXAsIG9yIE9iamVjdFxuICAgKi9cblxuXG4gIHRvSlNPTihfLCBjdHgsIFR5cGUpIHtcbiAgICBjb25zdCBtYXAgPSBUeXBlID8gbmV3IFR5cGUoKSA6IGN0eCAmJiBjdHgubWFwQXNNYXAgPyBuZXcgTWFwKCkgOiB7fTtcbiAgICBpZiAoY3R4ICYmIGN0eC5vbkNyZWF0ZSkgY3R4Lm9uQ3JlYXRlKG1hcCk7XG5cbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgdGhpcy5pdGVtcykgaXRlbS5hZGRUb0pTTWFwKGN0eCwgbWFwKTtcblxuICAgIHJldHVybiBtYXA7XG4gIH1cblxuICB0b1N0cmluZyhjdHgsIG9uQ29tbWVudCwgb25DaG9tcEtlZXApIHtcbiAgICBpZiAoIWN0eCkgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHRoaXMpO1xuXG4gICAgZm9yIChjb25zdCBpdGVtIG9mIHRoaXMuaXRlbXMpIHtcbiAgICAgIGlmICghKGl0ZW0gaW5zdGFuY2VvZiBQYWlyKSkgdGhyb3cgbmV3IEVycm9yKGBNYXAgaXRlbXMgbXVzdCBhbGwgYmUgcGFpcnM7IGZvdW5kICR7SlNPTi5zdHJpbmdpZnkoaXRlbSl9IGluc3RlYWRgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc3VwZXIudG9TdHJpbmcoY3R4LCB7XG4gICAgICBibG9ja0l0ZW06IG4gPT4gbi5zdHIsXG4gICAgICBmbG93Q2hhcnM6IHtcbiAgICAgICAgc3RhcnQ6ICd7JyxcbiAgICAgICAgZW5kOiAnfSdcbiAgICAgIH0sXG4gICAgICBpc01hcDogdHJ1ZSxcbiAgICAgIGl0ZW1JbmRlbnQ6IGN0eC5pbmRlbnQgfHwgJydcbiAgICB9LCBvbkNvbW1lbnQsIG9uQ2hvbXBLZWVwKTtcbiAgfVxuXG59XG5cbmNvbnN0IE1FUkdFX0tFWSA9ICc8PCc7XG5jbGFzcyBNZXJnZSBleHRlbmRzIFBhaXIge1xuICBjb25zdHJ1Y3RvcihwYWlyKSB7XG4gICAgaWYgKHBhaXIgaW5zdGFuY2VvZiBQYWlyKSB7XG4gICAgICBsZXQgc2VxID0gcGFpci52YWx1ZTtcblxuICAgICAgaWYgKCEoc2VxIGluc3RhbmNlb2YgWUFNTFNlcSkpIHtcbiAgICAgICAgc2VxID0gbmV3IFlBTUxTZXEoKTtcbiAgICAgICAgc2VxLml0ZW1zLnB1c2gocGFpci52YWx1ZSk7XG4gICAgICAgIHNlcS5yYW5nZSA9IHBhaXIudmFsdWUucmFuZ2U7XG4gICAgICB9XG5cbiAgICAgIHN1cGVyKHBhaXIua2V5LCBzZXEpO1xuICAgICAgdGhpcy5yYW5nZSA9IHBhaXIucmFuZ2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN1cGVyKG5ldyBTY2FsYXIoTUVSR0VfS0VZKSwgbmV3IFlBTUxTZXEoKSk7XG4gICAgfVxuXG4gICAgdGhpcy50eXBlID0gUGFpci5UeXBlLk1FUkdFX1BBSVI7XG4gIH0gLy8gSWYgdGhlIHZhbHVlIGFzc29jaWF0ZWQgd2l0aCBhIG1lcmdlIGtleSBpcyBhIHNpbmdsZSBtYXBwaW5nIG5vZGUsIGVhY2ggb2ZcbiAgLy8gaXRzIGtleS92YWx1ZSBwYWlycyBpcyBpbnNlcnRlZCBpbnRvIHRoZSBjdXJyZW50IG1hcHBpbmcsIHVubGVzcyB0aGUga2V5XG4gIC8vIGFscmVhZHkgZXhpc3RzIGluIGl0LiBJZiB0aGUgdmFsdWUgYXNzb2NpYXRlZCB3aXRoIHRoZSBtZXJnZSBrZXkgaXMgYVxuICAvLyBzZXF1ZW5jZSwgdGhlbiB0aGlzIHNlcXVlbmNlIGlzIGV4cGVjdGVkIHRvIGNvbnRhaW4gbWFwcGluZyBub2RlcyBhbmQgZWFjaFxuICAvLyBvZiB0aGVzZSBub2RlcyBpcyBtZXJnZWQgaW4gdHVybiBhY2NvcmRpbmcgdG8gaXRzIG9yZGVyIGluIHRoZSBzZXF1ZW5jZS5cbiAgLy8gS2V5cyBpbiBtYXBwaW5nIG5vZGVzIGVhcmxpZXIgaW4gdGhlIHNlcXVlbmNlIG92ZXJyaWRlIGtleXMgc3BlY2lmaWVkIGluXG4gIC8vIGxhdGVyIG1hcHBpbmcgbm9kZXMuIC0tIGh0dHA6Ly95YW1sLm9yZy90eXBlL21lcmdlLmh0bWxcblxuXG4gIGFkZFRvSlNNYXAoY3R4LCBtYXApIHtcbiAgICBmb3IgKGNvbnN0IHtcbiAgICAgIHNvdXJjZVxuICAgIH0gb2YgdGhpcy52YWx1ZS5pdGVtcykge1xuICAgICAgaWYgKCEoc291cmNlIGluc3RhbmNlb2YgWUFNTE1hcCkpIHRocm93IG5ldyBFcnJvcignTWVyZ2Ugc291cmNlcyBtdXN0IGJlIG1hcHMnKTtcbiAgICAgIGNvbnN0IHNyY01hcCA9IHNvdXJjZS50b0pTT04obnVsbCwgY3R4LCBNYXApO1xuXG4gICAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBzcmNNYXApIHtcbiAgICAgICAgaWYgKG1hcCBpbnN0YW5jZW9mIE1hcCkge1xuICAgICAgICAgIGlmICghbWFwLmhhcyhrZXkpKSBtYXAuc2V0KGtleSwgdmFsdWUpO1xuICAgICAgICB9IGVsc2UgaWYgKG1hcCBpbnN0YW5jZW9mIFNldCkge1xuICAgICAgICAgIG1hcC5hZGQoa2V5KTtcbiAgICAgICAgfSBlbHNlIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1hcCwga2V5KSkge1xuICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtYXAsIGtleSwge1xuICAgICAgICAgICAgdmFsdWUsXG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBtYXA7XG4gIH1cblxuICB0b1N0cmluZyhjdHgsIG9uQ29tbWVudCkge1xuICAgIGNvbnN0IHNlcSA9IHRoaXMudmFsdWU7XG4gICAgaWYgKHNlcS5pdGVtcy5sZW5ndGggPiAxKSByZXR1cm4gc3VwZXIudG9TdHJpbmcoY3R4LCBvbkNvbW1lbnQpO1xuICAgIHRoaXMudmFsdWUgPSBzZXEuaXRlbXNbMF07XG4gICAgY29uc3Qgc3RyID0gc3VwZXIudG9TdHJpbmcoY3R4LCBvbkNvbW1lbnQpO1xuICAgIHRoaXMudmFsdWUgPSBzZXE7XG4gICAgcmV0dXJuIHN0cjtcbiAgfVxuXG59XG5cbmNvbnN0IGJpbmFyeU9wdGlvbnMgPSB7XG4gIGRlZmF1bHRUeXBlOiBQbGFpblZhbHVlLlR5cGUuQkxPQ0tfTElURVJBTCxcbiAgbGluZVdpZHRoOiA3NlxufTtcbmNvbnN0IGJvb2xPcHRpb25zID0ge1xuICB0cnVlU3RyOiAndHJ1ZScsXG4gIGZhbHNlU3RyOiAnZmFsc2UnXG59O1xuY29uc3QgaW50T3B0aW9ucyA9IHtcbiAgYXNCaWdJbnQ6IGZhbHNlXG59O1xuY29uc3QgbnVsbE9wdGlvbnMgPSB7XG4gIG51bGxTdHI6ICdudWxsJ1xufTtcbmNvbnN0IHN0ck9wdGlvbnMgPSB7XG4gIGRlZmF1bHRUeXBlOiBQbGFpblZhbHVlLlR5cGUuUExBSU4sXG4gIGRvdWJsZVF1b3RlZDoge1xuICAgIGpzb25FbmNvZGluZzogZmFsc2UsXG4gICAgbWluTXVsdGlMaW5lTGVuZ3RoOiA0MFxuICB9LFxuICBmb2xkOiB7XG4gICAgbGluZVdpZHRoOiA4MCxcbiAgICBtaW5Db250ZW50V2lkdGg6IDIwXG4gIH1cbn07XG5cbmZ1bmN0aW9uIHJlc29sdmVTY2FsYXIoc3RyLCB0YWdzLCBzY2FsYXJGYWxsYmFjaykge1xuICBmb3IgKGNvbnN0IHtcbiAgICBmb3JtYXQsXG4gICAgdGVzdCxcbiAgICByZXNvbHZlXG4gIH0gb2YgdGFncykge1xuICAgIGlmICh0ZXN0KSB7XG4gICAgICBjb25zdCBtYXRjaCA9IHN0ci5tYXRjaCh0ZXN0KTtcblxuICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgIGxldCByZXMgPSByZXNvbHZlLmFwcGx5KG51bGwsIG1hdGNoKTtcbiAgICAgICAgaWYgKCEocmVzIGluc3RhbmNlb2YgU2NhbGFyKSkgcmVzID0gbmV3IFNjYWxhcihyZXMpO1xuICAgICAgICBpZiAoZm9ybWF0KSByZXMuZm9ybWF0ID0gZm9ybWF0O1xuICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlmIChzY2FsYXJGYWxsYmFjaykgc3RyID0gc2NhbGFyRmFsbGJhY2soc3RyKTtcbiAgcmV0dXJuIG5ldyBTY2FsYXIoc3RyKTtcbn1cblxuY29uc3QgRk9MRF9GTE9XID0gJ2Zsb3cnO1xuY29uc3QgRk9MRF9CTE9DSyA9ICdibG9jayc7XG5jb25zdCBGT0xEX1FVT1RFRCA9ICdxdW90ZWQnOyAvLyBwcmVzdW1lcyBpKzEgaXMgYXQgdGhlIHN0YXJ0IG9mIGEgbGluZVxuLy8gcmV0dXJucyBpbmRleCBvZiBsYXN0IG5ld2xpbmUgaW4gbW9yZS1pbmRlbnRlZCBibG9ja1xuXG5jb25zdCBjb25zdW1lTW9yZUluZGVudGVkTGluZXMgPSAodGV4dCwgaSkgPT4ge1xuICBsZXQgY2ggPSB0ZXh0W2kgKyAxXTtcblxuICB3aGlsZSAoY2ggPT09ICcgJyB8fCBjaCA9PT0gJ1xcdCcpIHtcbiAgICBkbyB7XG4gICAgICBjaCA9IHRleHRbaSArPSAxXTtcbiAgICB9IHdoaWxlIChjaCAmJiBjaCAhPT0gJ1xcbicpO1xuXG4gICAgY2ggPSB0ZXh0W2kgKyAxXTtcbiAgfVxuXG4gIHJldHVybiBpO1xufTtcbi8qKlxuICogVHJpZXMgdG8ga2VlcCBpbnB1dCBhdCB1cCB0byBgbGluZVdpZHRoYCBjaGFyYWN0ZXJzLCBzcGxpdHRpbmcgb25seSBvbiBzcGFjZXNcbiAqIG5vdCBmb2xsb3dlZCBieSBuZXdsaW5lcyBvciBzcGFjZXMgdW5sZXNzIGBtb2RlYCBpcyBgJ3F1b3RlZCdgLiBMaW5lcyBhcmVcbiAqIHRlcm1pbmF0ZWQgd2l0aCBgXFxuYCBhbmQgc3RhcnRlZCB3aXRoIGBpbmRlbnRgLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XG4gKiBAcGFyYW0ge3N0cmluZ30gaW5kZW50XG4gKiBAcGFyYW0ge3N0cmluZ30gW21vZGU9J2Zsb3cnXSBgJ2Jsb2NrJ2AgcHJldmVudHMgbW9yZS1pbmRlbnRlZCBsaW5lc1xuICogICBmcm9tIGJlaW5nIGZvbGRlZDsgYCdxdW90ZWQnYCBhbGxvd3MgZm9yIGBcXGAgZXNjYXBlcywgaW5jbHVkaW5nIGVzY2FwZWRcbiAqICAgbmV3bGluZXNcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMuaW5kZW50QXRTdGFydF0gQWNjb3VudHMgZm9yIGxlYWRpbmcgY29udGVudHMgb25cbiAqICAgdGhlIGZpcnN0IGxpbmUsIGRlZmF1bHRpbmcgdG8gYGluZGVudC5sZW5ndGhgXG4gKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMubGluZVdpZHRoPTgwXVxuICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLm1pbkNvbnRlbnRXaWR0aD0yMF0gQWxsb3cgaGlnaGx5IGluZGVudGVkIGxpbmVzIHRvXG4gKiAgIHN0cmV0Y2ggdGhlIGxpbmUgd2lkdGggb3IgaW5kZW50IGNvbnRlbnQgZnJvbSB0aGUgc3RhcnRcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IG9wdGlvbnMub25Gb2xkIENhbGxlZCBvbmNlIGlmIHRoZSB0ZXh0IGlzIGZvbGRlZFxuICogQHBhcmFtIHtmdW5jdGlvbn0gb3B0aW9ucy5vbkZvbGQgQ2FsbGVkIG9uY2UgaWYgYW55IGxpbmUgb2YgdGV4dCBleGNlZWRzXG4gKiAgIGxpbmVXaWR0aCBjaGFyYWN0ZXJzXG4gKi9cblxuXG5mdW5jdGlvbiBmb2xkRmxvd0xpbmVzKHRleHQsIGluZGVudCwgbW9kZSwge1xuICBpbmRlbnRBdFN0YXJ0LFxuICBsaW5lV2lkdGggPSA4MCxcbiAgbWluQ29udGVudFdpZHRoID0gMjAsXG4gIG9uRm9sZCxcbiAgb25PdmVyZmxvd1xufSkge1xuICBpZiAoIWxpbmVXaWR0aCB8fCBsaW5lV2lkdGggPCAwKSByZXR1cm4gdGV4dDtcbiAgY29uc3QgZW5kU3RlcCA9IE1hdGgubWF4KDEgKyBtaW5Db250ZW50V2lkdGgsIDEgKyBsaW5lV2lkdGggLSBpbmRlbnQubGVuZ3RoKTtcbiAgaWYgKHRleHQubGVuZ3RoIDw9IGVuZFN0ZXApIHJldHVybiB0ZXh0O1xuICBjb25zdCBmb2xkcyA9IFtdO1xuICBjb25zdCBlc2NhcGVkRm9sZHMgPSB7fTtcbiAgbGV0IGVuZCA9IGxpbmVXaWR0aCAtIGluZGVudC5sZW5ndGg7XG5cbiAgaWYgKHR5cGVvZiBpbmRlbnRBdFN0YXJ0ID09PSAnbnVtYmVyJykge1xuICAgIGlmIChpbmRlbnRBdFN0YXJ0ID4gbGluZVdpZHRoIC0gTWF0aC5tYXgoMiwgbWluQ29udGVudFdpZHRoKSkgZm9sZHMucHVzaCgwKTtlbHNlIGVuZCA9IGxpbmVXaWR0aCAtIGluZGVudEF0U3RhcnQ7XG4gIH1cblxuICBsZXQgc3BsaXQgPSB1bmRlZmluZWQ7XG4gIGxldCBwcmV2ID0gdW5kZWZpbmVkO1xuICBsZXQgb3ZlcmZsb3cgPSBmYWxzZTtcbiAgbGV0IGkgPSAtMTtcbiAgbGV0IGVzY1N0YXJ0ID0gLTE7XG4gIGxldCBlc2NFbmQgPSAtMTtcblxuICBpZiAobW9kZSA9PT0gRk9MRF9CTE9DSykge1xuICAgIGkgPSBjb25zdW1lTW9yZUluZGVudGVkTGluZXModGV4dCwgaSk7XG4gICAgaWYgKGkgIT09IC0xKSBlbmQgPSBpICsgZW5kU3RlcDtcbiAgfVxuXG4gIGZvciAobGV0IGNoOyBjaCA9IHRleHRbaSArPSAxXTspIHtcbiAgICBpZiAobW9kZSA9PT0gRk9MRF9RVU9URUQgJiYgY2ggPT09ICdcXFxcJykge1xuICAgICAgZXNjU3RhcnQgPSBpO1xuXG4gICAgICBzd2l0Y2ggKHRleHRbaSArIDFdKSB7XG4gICAgICAgIGNhc2UgJ3gnOlxuICAgICAgICAgIGkgKz0gMztcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICd1JzpcbiAgICAgICAgICBpICs9IDU7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnVSc6XG4gICAgICAgICAgaSArPSA5O1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgaSArPSAxO1xuICAgICAgfVxuXG4gICAgICBlc2NFbmQgPSBpO1xuICAgIH1cblxuICAgIGlmIChjaCA9PT0gJ1xcbicpIHtcbiAgICAgIGlmIChtb2RlID09PSBGT0xEX0JMT0NLKSBpID0gY29uc3VtZU1vcmVJbmRlbnRlZExpbmVzKHRleHQsIGkpO1xuICAgICAgZW5kID0gaSArIGVuZFN0ZXA7XG4gICAgICBzcGxpdCA9IHVuZGVmaW5lZDtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGNoID09PSAnICcgJiYgcHJldiAmJiBwcmV2ICE9PSAnICcgJiYgcHJldiAhPT0gJ1xcbicgJiYgcHJldiAhPT0gJ1xcdCcpIHtcbiAgICAgICAgLy8gc3BhY2Ugc3Vycm91bmRlZCBieSBub24tc3BhY2UgY2FuIGJlIHJlcGxhY2VkIHdpdGggbmV3bGluZSArIGluZGVudFxuICAgICAgICBjb25zdCBuZXh0ID0gdGV4dFtpICsgMV07XG4gICAgICAgIGlmIChuZXh0ICYmIG5leHQgIT09ICcgJyAmJiBuZXh0ICE9PSAnXFxuJyAmJiBuZXh0ICE9PSAnXFx0Jykgc3BsaXQgPSBpO1xuICAgICAgfVxuXG4gICAgICBpZiAoaSA+PSBlbmQpIHtcbiAgICAgICAgaWYgKHNwbGl0KSB7XG4gICAgICAgICAgZm9sZHMucHVzaChzcGxpdCk7XG4gICAgICAgICAgZW5kID0gc3BsaXQgKyBlbmRTdGVwO1xuICAgICAgICAgIHNwbGl0ID0gdW5kZWZpbmVkO1xuICAgICAgICB9IGVsc2UgaWYgKG1vZGUgPT09IEZPTERfUVVPVEVEKSB7XG4gICAgICAgICAgLy8gd2hpdGUtc3BhY2UgY29sbGVjdGVkIGF0IGVuZCBtYXkgc3RyZXRjaCBwYXN0IGxpbmVXaWR0aFxuICAgICAgICAgIHdoaWxlIChwcmV2ID09PSAnICcgfHwgcHJldiA9PT0gJ1xcdCcpIHtcbiAgICAgICAgICAgIHByZXYgPSBjaDtcbiAgICAgICAgICAgIGNoID0gdGV4dFtpICs9IDFdO1xuICAgICAgICAgICAgb3ZlcmZsb3cgPSB0cnVlO1xuICAgICAgICAgIH0gLy8gQWNjb3VudCBmb3IgbmV3bGluZSBlc2NhcGUsIGJ1dCBkb24ndCBicmVhayBwcmVjZWRpbmcgZXNjYXBlXG5cblxuICAgICAgICAgIGNvbnN0IGogPSBpID4gZXNjRW5kICsgMSA/IGkgLSAyIDogZXNjU3RhcnQgLSAxOyAvLyBCYWlsIG91dCBpZiBsaW5lV2lkdGggJiBtaW5Db250ZW50V2lkdGggYXJlIHNob3J0ZXIgdGhhbiBhbiBlc2NhcGUgc3RyaW5nXG5cbiAgICAgICAgICBpZiAoZXNjYXBlZEZvbGRzW2pdKSByZXR1cm4gdGV4dDtcbiAgICAgICAgICBmb2xkcy5wdXNoKGopO1xuICAgICAgICAgIGVzY2FwZWRGb2xkc1tqXSA9IHRydWU7XG4gICAgICAgICAgZW5kID0gaiArIGVuZFN0ZXA7XG4gICAgICAgICAgc3BsaXQgPSB1bmRlZmluZWQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb3ZlcmZsb3cgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcHJldiA9IGNoO1xuICB9XG5cbiAgaWYgKG92ZXJmbG93ICYmIG9uT3ZlcmZsb3cpIG9uT3ZlcmZsb3coKTtcbiAgaWYgKGZvbGRzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIHRleHQ7XG4gIGlmIChvbkZvbGQpIG9uRm9sZCgpO1xuICBsZXQgcmVzID0gdGV4dC5zbGljZSgwLCBmb2xkc1swXSk7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBmb2xkcy5sZW5ndGg7ICsraSkge1xuICAgIGNvbnN0IGZvbGQgPSBmb2xkc1tpXTtcbiAgICBjb25zdCBlbmQgPSBmb2xkc1tpICsgMV0gfHwgdGV4dC5sZW5ndGg7XG4gICAgaWYgKGZvbGQgPT09IDApIHJlcyA9IGBcXG4ke2luZGVudH0ke3RleHQuc2xpY2UoMCwgZW5kKX1gO2Vsc2Uge1xuICAgICAgaWYgKG1vZGUgPT09IEZPTERfUVVPVEVEICYmIGVzY2FwZWRGb2xkc1tmb2xkXSkgcmVzICs9IGAke3RleHRbZm9sZF19XFxcXGA7XG4gICAgICByZXMgKz0gYFxcbiR7aW5kZW50fSR7dGV4dC5zbGljZShmb2xkICsgMSwgZW5kKX1gO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXM7XG59XG5cbmNvbnN0IGdldEZvbGRPcHRpb25zID0gKHtcbiAgaW5kZW50QXRTdGFydFxufSkgPT4gaW5kZW50QXRTdGFydCA/IE9iamVjdC5hc3NpZ24oe1xuICBpbmRlbnRBdFN0YXJ0XG59LCBzdHJPcHRpb25zLmZvbGQpIDogc3RyT3B0aW9ucy5mb2xkOyAvLyBBbHNvIGNoZWNrcyBmb3IgbGluZXMgc3RhcnRpbmcgd2l0aCAlLCBhcyBwYXJzaW5nIHRoZSBvdXRwdXQgYXMgWUFNTCAxLjEgd2lsbFxuLy8gcHJlc3VtZSB0aGF0J3Mgc3RhcnRpbmcgYSBuZXcgZG9jdW1lbnQuXG5cblxuY29uc3QgY29udGFpbnNEb2N1bWVudE1hcmtlciA9IHN0ciA9PiAvXiglfC0tLXxcXC5cXC5cXC4pL20udGVzdChzdHIpO1xuXG5mdW5jdGlvbiBsaW5lTGVuZ3RoT3ZlckxpbWl0KHN0ciwgbGluZVdpZHRoLCBpbmRlbnRMZW5ndGgpIHtcbiAgaWYgKCFsaW5lV2lkdGggfHwgbGluZVdpZHRoIDwgMCkgcmV0dXJuIGZhbHNlO1xuICBjb25zdCBsaW1pdCA9IGxpbmVXaWR0aCAtIGluZGVudExlbmd0aDtcbiAgY29uc3Qgc3RyTGVuID0gc3RyLmxlbmd0aDtcbiAgaWYgKHN0ckxlbiA8PSBsaW1pdCkgcmV0dXJuIGZhbHNlO1xuXG4gIGZvciAobGV0IGkgPSAwLCBzdGFydCA9IDA7IGkgPCBzdHJMZW47ICsraSkge1xuICAgIGlmIChzdHJbaV0gPT09ICdcXG4nKSB7XG4gICAgICBpZiAoaSAtIHN0YXJ0ID4gbGltaXQpIHJldHVybiB0cnVlO1xuICAgICAgc3RhcnQgPSBpICsgMTtcbiAgICAgIGlmIChzdHJMZW4gLSBzdGFydCA8PSBsaW1pdCkgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBkb3VibGVRdW90ZWRTdHJpbmcodmFsdWUsIGN0eCkge1xuICBjb25zdCB7XG4gICAgaW1wbGljaXRLZXlcbiAgfSA9IGN0eDtcbiAgY29uc3Qge1xuICAgIGpzb25FbmNvZGluZyxcbiAgICBtaW5NdWx0aUxpbmVMZW5ndGhcbiAgfSA9IHN0ck9wdGlvbnMuZG91YmxlUXVvdGVkO1xuICBjb25zdCBqc29uID0gSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xuICBpZiAoanNvbkVuY29kaW5nKSByZXR1cm4ganNvbjtcbiAgY29uc3QgaW5kZW50ID0gY3R4LmluZGVudCB8fCAoY29udGFpbnNEb2N1bWVudE1hcmtlcih2YWx1ZSkgPyAnICAnIDogJycpO1xuICBsZXQgc3RyID0gJyc7XG4gIGxldCBzdGFydCA9IDA7XG5cbiAgZm9yIChsZXQgaSA9IDAsIGNoID0ganNvbltpXTsgY2g7IGNoID0ganNvblsrK2ldKSB7XG4gICAgaWYgKGNoID09PSAnICcgJiYganNvbltpICsgMV0gPT09ICdcXFxcJyAmJiBqc29uW2kgKyAyXSA9PT0gJ24nKSB7XG4gICAgICAvLyBzcGFjZSBiZWZvcmUgbmV3bGluZSBuZWVkcyB0byBiZSBlc2NhcGVkIHRvIG5vdCBiZSBmb2xkZWRcbiAgICAgIHN0ciArPSBqc29uLnNsaWNlKHN0YXJ0LCBpKSArICdcXFxcICc7XG4gICAgICBpICs9IDE7XG4gICAgICBzdGFydCA9IGk7XG4gICAgICBjaCA9ICdcXFxcJztcbiAgICB9XG5cbiAgICBpZiAoY2ggPT09ICdcXFxcJykgc3dpdGNoIChqc29uW2kgKyAxXSkge1xuICAgICAgY2FzZSAndSc6XG4gICAgICAgIHtcbiAgICAgICAgICBzdHIgKz0ganNvbi5zbGljZShzdGFydCwgaSk7XG4gICAgICAgICAgY29uc3QgY29kZSA9IGpzb24uc3Vic3RyKGkgKyAyLCA0KTtcblxuICAgICAgICAgIHN3aXRjaCAoY29kZSkge1xuICAgICAgICAgICAgY2FzZSAnMDAwMCc6XG4gICAgICAgICAgICAgIHN0ciArPSAnXFxcXDAnO1xuICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnMDAwNyc6XG4gICAgICAgICAgICAgIHN0ciArPSAnXFxcXGEnO1xuICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnMDAwYic6XG4gICAgICAgICAgICAgIHN0ciArPSAnXFxcXHYnO1xuICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnMDAxYic6XG4gICAgICAgICAgICAgIHN0ciArPSAnXFxcXGUnO1xuICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnMDA4NSc6XG4gICAgICAgICAgICAgIHN0ciArPSAnXFxcXE4nO1xuICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnMDBhMCc6XG4gICAgICAgICAgICAgIHN0ciArPSAnXFxcXF8nO1xuICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnMjAyOCc6XG4gICAgICAgICAgICAgIHN0ciArPSAnXFxcXEwnO1xuICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnMjAyOSc6XG4gICAgICAgICAgICAgIHN0ciArPSAnXFxcXFAnO1xuICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgaWYgKGNvZGUuc3Vic3RyKDAsIDIpID09PSAnMDAnKSBzdHIgKz0gJ1xcXFx4JyArIGNvZGUuc3Vic3RyKDIpO2Vsc2Ugc3RyICs9IGpzb24uc3Vic3RyKGksIDYpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGkgKz0gNTtcbiAgICAgICAgICBzdGFydCA9IGkgKyAxO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICduJzpcbiAgICAgICAgaWYgKGltcGxpY2l0S2V5IHx8IGpzb25baSArIDJdID09PSAnXCInIHx8IGpzb24ubGVuZ3RoIDwgbWluTXVsdGlMaW5lTGVuZ3RoKSB7XG4gICAgICAgICAgaSArPSAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGZvbGRpbmcgd2lsbCBlYXQgZmlyc3QgbmV3bGluZVxuICAgICAgICAgIHN0ciArPSBqc29uLnNsaWNlKHN0YXJ0LCBpKSArICdcXG5cXG4nO1xuXG4gICAgICAgICAgd2hpbGUgKGpzb25baSArIDJdID09PSAnXFxcXCcgJiYganNvbltpICsgM10gPT09ICduJyAmJiBqc29uW2kgKyA0XSAhPT0gJ1wiJykge1xuICAgICAgICAgICAgc3RyICs9ICdcXG4nO1xuICAgICAgICAgICAgaSArPSAyO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHN0ciArPSBpbmRlbnQ7IC8vIHNwYWNlIGFmdGVyIG5ld2xpbmUgbmVlZHMgdG8gYmUgZXNjYXBlZCB0byBub3QgYmUgZm9sZGVkXG5cbiAgICAgICAgICBpZiAoanNvbltpICsgMl0gPT09ICcgJykgc3RyICs9ICdcXFxcJztcbiAgICAgICAgICBpICs9IDE7XG4gICAgICAgICAgc3RhcnQgPSBpICsgMTtcbiAgICAgICAgfVxuXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBpICs9IDE7XG4gICAgfVxuICB9XG5cbiAgc3RyID0gc3RhcnQgPyBzdHIgKyBqc29uLnNsaWNlKHN0YXJ0KSA6IGpzb247XG4gIHJldHVybiBpbXBsaWNpdEtleSA/IHN0ciA6IGZvbGRGbG93TGluZXMoc3RyLCBpbmRlbnQsIEZPTERfUVVPVEVELCBnZXRGb2xkT3B0aW9ucyhjdHgpKTtcbn1cblxuZnVuY3Rpb24gc2luZ2xlUXVvdGVkU3RyaW5nKHZhbHVlLCBjdHgpIHtcbiAgaWYgKGN0eC5pbXBsaWNpdEtleSkge1xuICAgIGlmICgvXFxuLy50ZXN0KHZhbHVlKSkgcmV0dXJuIGRvdWJsZVF1b3RlZFN0cmluZyh2YWx1ZSwgY3R4KTtcbiAgfSBlbHNlIHtcbiAgICAvLyBzaW5nbGUgcXVvdGVkIHN0cmluZyBjYW4ndCBoYXZlIGxlYWRpbmcgb3IgdHJhaWxpbmcgd2hpdGVzcGFjZSBhcm91bmQgbmV3bGluZVxuICAgIGlmICgvWyBcXHRdXFxufFxcblsgXFx0XS8udGVzdCh2YWx1ZSkpIHJldHVybiBkb3VibGVRdW90ZWRTdHJpbmcodmFsdWUsIGN0eCk7XG4gIH1cblxuICBjb25zdCBpbmRlbnQgPSBjdHguaW5kZW50IHx8IChjb250YWluc0RvY3VtZW50TWFya2VyKHZhbHVlKSA/ICcgICcgOiAnJyk7XG4gIGNvbnN0IHJlcyA9IFwiJ1wiICsgdmFsdWUucmVwbGFjZSgvJy9nLCBcIicnXCIpLnJlcGxhY2UoL1xcbisvZywgYCQmXFxuJHtpbmRlbnR9YCkgKyBcIidcIjtcbiAgcmV0dXJuIGN0eC5pbXBsaWNpdEtleSA/IHJlcyA6IGZvbGRGbG93TGluZXMocmVzLCBpbmRlbnQsIEZPTERfRkxPVywgZ2V0Rm9sZE9wdGlvbnMoY3R4KSk7XG59XG5cbmZ1bmN0aW9uIGJsb2NrU3RyaW5nKHtcbiAgY29tbWVudCxcbiAgdHlwZSxcbiAgdmFsdWVcbn0sIGN0eCwgb25Db21tZW50LCBvbkNob21wS2VlcCkge1xuICAvLyAxLiBCbG9jayBjYW4ndCBlbmQgaW4gd2hpdGVzcGFjZSB1bmxlc3MgdGhlIGxhc3QgbGluZSBpcyBub24tZW1wdHkuXG4gIC8vIDIuIFN0cmluZ3MgY29uc2lzdGluZyBvZiBvbmx5IHdoaXRlc3BhY2UgYXJlIGJlc3QgcmVuZGVyZWQgZXhwbGljaXRseS5cbiAgaWYgKC9cXG5bXFx0IF0rJC8udGVzdCh2YWx1ZSkgfHwgL15cXHMqJC8udGVzdCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gZG91YmxlUXVvdGVkU3RyaW5nKHZhbHVlLCBjdHgpO1xuICB9XG5cbiAgY29uc3QgaW5kZW50ID0gY3R4LmluZGVudCB8fCAoY3R4LmZvcmNlQmxvY2tJbmRlbnQgfHwgY29udGFpbnNEb2N1bWVudE1hcmtlcih2YWx1ZSkgPyAnICAnIDogJycpO1xuICBjb25zdCBpbmRlbnRTaXplID0gaW5kZW50ID8gJzInIDogJzEnOyAvLyByb290IGlzIGF0IC0xXG5cbiAgY29uc3QgbGl0ZXJhbCA9IHR5cGUgPT09IFBsYWluVmFsdWUuVHlwZS5CTE9DS19GT0xERUQgPyBmYWxzZSA6IHR5cGUgPT09IFBsYWluVmFsdWUuVHlwZS5CTE9DS19MSVRFUkFMID8gdHJ1ZSA6ICFsaW5lTGVuZ3RoT3ZlckxpbWl0KHZhbHVlLCBzdHJPcHRpb25zLmZvbGQubGluZVdpZHRoLCBpbmRlbnQubGVuZ3RoKTtcbiAgbGV0IGhlYWRlciA9IGxpdGVyYWwgPyAnfCcgOiAnPic7XG4gIGlmICghdmFsdWUpIHJldHVybiBoZWFkZXIgKyAnXFxuJztcbiAgbGV0IHdzU3RhcnQgPSAnJztcbiAgbGV0IHdzRW5kID0gJyc7XG4gIHZhbHVlID0gdmFsdWUucmVwbGFjZSgvW1xcblxcdCBdKiQvLCB3cyA9PiB7XG4gICAgY29uc3QgbiA9IHdzLmluZGV4T2YoJ1xcbicpO1xuXG4gICAgaWYgKG4gPT09IC0xKSB7XG4gICAgICBoZWFkZXIgKz0gJy0nOyAvLyBzdHJpcFxuICAgIH0gZWxzZSBpZiAodmFsdWUgPT09IHdzIHx8IG4gIT09IHdzLmxlbmd0aCAtIDEpIHtcbiAgICAgIGhlYWRlciArPSAnKyc7IC8vIGtlZXBcblxuICAgICAgaWYgKG9uQ2hvbXBLZWVwKSBvbkNob21wS2VlcCgpO1xuICAgIH1cblxuICAgIHdzRW5kID0gd3MucmVwbGFjZSgvXFxuJC8sICcnKTtcbiAgICByZXR1cm4gJyc7XG4gIH0pLnJlcGxhY2UoL15bXFxuIF0qLywgd3MgPT4ge1xuICAgIGlmICh3cy5pbmRleE9mKCcgJykgIT09IC0xKSBoZWFkZXIgKz0gaW5kZW50U2l6ZTtcbiAgICBjb25zdCBtID0gd3MubWF0Y2goLyArJC8pO1xuXG4gICAgaWYgKG0pIHtcbiAgICAgIHdzU3RhcnQgPSB3cy5zbGljZSgwLCAtbVswXS5sZW5ndGgpO1xuICAgICAgcmV0dXJuIG1bMF07XG4gICAgfSBlbHNlIHtcbiAgICAgIHdzU3RhcnQgPSB3cztcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gIH0pO1xuICBpZiAod3NFbmQpIHdzRW5kID0gd3NFbmQucmVwbGFjZSgvXFxuKyg/IVxcbnwkKS9nLCBgJCYke2luZGVudH1gKTtcbiAgaWYgKHdzU3RhcnQpIHdzU3RhcnQgPSB3c1N0YXJ0LnJlcGxhY2UoL1xcbisvZywgYCQmJHtpbmRlbnR9YCk7XG5cbiAgaWYgKGNvbW1lbnQpIHtcbiAgICBoZWFkZXIgKz0gJyAjJyArIGNvbW1lbnQucmVwbGFjZSgvID9bXFxyXFxuXSsvZywgJyAnKTtcbiAgICBpZiAob25Db21tZW50KSBvbkNvbW1lbnQoKTtcbiAgfVxuXG4gIGlmICghdmFsdWUpIHJldHVybiBgJHtoZWFkZXJ9JHtpbmRlbnRTaXplfVxcbiR7aW5kZW50fSR7d3NFbmR9YDtcblxuICBpZiAobGl0ZXJhbCkge1xuICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZSgvXFxuKy9nLCBgJCYke2luZGVudH1gKTtcbiAgICByZXR1cm4gYCR7aGVhZGVyfVxcbiR7aW5kZW50fSR7d3NTdGFydH0ke3ZhbHVlfSR7d3NFbmR9YDtcbiAgfVxuXG4gIHZhbHVlID0gdmFsdWUucmVwbGFjZSgvXFxuKy9nLCAnXFxuJCYnKS5yZXBsYWNlKC8oPzpefFxcbikoW1xcdCBdLiopKD86KFtcXG5cXHQgXSopXFxuKD8hW1xcblxcdCBdKSk/L2csICckMSQyJykgLy8gbW9yZS1pbmRlbnRlZCBsaW5lcyBhcmVuJ3QgZm9sZGVkXG4gIC8vICAgICAgICAgXiBpbmQubGluZSAgXiBlbXB0eSAgICAgXiBjYXB0dXJlIG5leHQgZW1wdHkgbGluZXMgb25seSBhdCBlbmQgb2YgaW5kZW50XG4gIC5yZXBsYWNlKC9cXG4rL2csIGAkJiR7aW5kZW50fWApO1xuICBjb25zdCBib2R5ID0gZm9sZEZsb3dMaW5lcyhgJHt3c1N0YXJ0fSR7dmFsdWV9JHt3c0VuZH1gLCBpbmRlbnQsIEZPTERfQkxPQ0ssIHN0ck9wdGlvbnMuZm9sZCk7XG4gIHJldHVybiBgJHtoZWFkZXJ9XFxuJHtpbmRlbnR9JHtib2R5fWA7XG59XG5cbmZ1bmN0aW9uIHBsYWluU3RyaW5nKGl0ZW0sIGN0eCwgb25Db21tZW50LCBvbkNob21wS2VlcCkge1xuICBjb25zdCB7XG4gICAgY29tbWVudCxcbiAgICB0eXBlLFxuICAgIHZhbHVlXG4gIH0gPSBpdGVtO1xuICBjb25zdCB7XG4gICAgYWN0dWFsU3RyaW5nLFxuICAgIGltcGxpY2l0S2V5LFxuICAgIGluZGVudCxcbiAgICBpbkZsb3dcbiAgfSA9IGN0eDtcblxuICBpZiAoaW1wbGljaXRLZXkgJiYgL1tcXG5bXFxde30sXS8udGVzdCh2YWx1ZSkgfHwgaW5GbG93ICYmIC9bW1xcXXt9LF0vLnRlc3QodmFsdWUpKSB7XG4gICAgcmV0dXJuIGRvdWJsZVF1b3RlZFN0cmluZyh2YWx1ZSwgY3R4KTtcbiAgfVxuXG4gIGlmICghdmFsdWUgfHwgL15bXFxuXFx0ICxbXFxde30jJiohfD4nXCIlQGBdfF5bPy1dJHxeWz8tXVsgXFx0XXxbXFxuOl1bIFxcdF18WyBcXHRdXFxufFtcXG5cXHQgXSN8W1xcblxcdCA6XSQvLnRlc3QodmFsdWUpKSB7XG4gICAgLy8gbm90IGFsbG93ZWQ6XG4gICAgLy8gLSBlbXB0eSBzdHJpbmcsICctJyBvciAnPydcbiAgICAvLyAtIHN0YXJ0IHdpdGggYW4gaW5kaWNhdG9yIGNoYXJhY3RlciAoZXhjZXB0IFs/Oi1dKSBvciAvWz8tXSAvXG4gICAgLy8gLSAnXFxuICcsICc6ICcgb3IgJyBcXG4nIGFueXdoZXJlXG4gICAgLy8gLSAnIycgbm90IHByZWNlZGVkIGJ5IGEgbm9uLXNwYWNlIGNoYXJcbiAgICAvLyAtIGVuZCB3aXRoICcgJyBvciAnOidcbiAgICByZXR1cm4gaW1wbGljaXRLZXkgfHwgaW5GbG93IHx8IHZhbHVlLmluZGV4T2YoJ1xcbicpID09PSAtMSA/IHZhbHVlLmluZGV4T2YoJ1wiJykgIT09IC0xICYmIHZhbHVlLmluZGV4T2YoXCInXCIpID09PSAtMSA/IHNpbmdsZVF1b3RlZFN0cmluZyh2YWx1ZSwgY3R4KSA6IGRvdWJsZVF1b3RlZFN0cmluZyh2YWx1ZSwgY3R4KSA6IGJsb2NrU3RyaW5nKGl0ZW0sIGN0eCwgb25Db21tZW50LCBvbkNob21wS2VlcCk7XG4gIH1cblxuICBpZiAoIWltcGxpY2l0S2V5ICYmICFpbkZsb3cgJiYgdHlwZSAhPT0gUGxhaW5WYWx1ZS5UeXBlLlBMQUlOICYmIHZhbHVlLmluZGV4T2YoJ1xcbicpICE9PSAtMSkge1xuICAgIC8vIFdoZXJlIGFsbG93ZWQgJiB0eXBlIG5vdCBzZXQgZXhwbGljaXRseSwgcHJlZmVyIGJsb2NrIHN0eWxlIGZvciBtdWx0aWxpbmUgc3RyaW5nc1xuICAgIHJldHVybiBibG9ja1N0cmluZyhpdGVtLCBjdHgsIG9uQ29tbWVudCwgb25DaG9tcEtlZXApO1xuICB9XG5cbiAgaWYgKGluZGVudCA9PT0gJycgJiYgY29udGFpbnNEb2N1bWVudE1hcmtlcih2YWx1ZSkpIHtcbiAgICBjdHguZm9yY2VCbG9ja0luZGVudCA9IHRydWU7XG4gICAgcmV0dXJuIGJsb2NrU3RyaW5nKGl0ZW0sIGN0eCwgb25Db21tZW50LCBvbkNob21wS2VlcCk7XG4gIH1cblxuICBjb25zdCBzdHIgPSB2YWx1ZS5yZXBsYWNlKC9cXG4rL2csIGAkJlxcbiR7aW5kZW50fWApOyAvLyBWZXJpZnkgdGhhdCBvdXRwdXQgd2lsbCBiZSBwYXJzZWQgYXMgYSBzdHJpbmcsIGFzIGUuZy4gcGxhaW4gbnVtYmVycyBhbmRcbiAgLy8gYm9vbGVhbnMgZ2V0IHBhcnNlZCB3aXRoIHRob3NlIHR5cGVzIGluIHYxLjIgKGUuZy4gJzQyJywgJ3RydWUnICYgJzAuOWUtMycpLFxuICAvLyBhbmQgb3RoZXJzIGluIHYxLjEuXG5cbiAgaWYgKGFjdHVhbFN0cmluZykge1xuICAgIGNvbnN0IHtcbiAgICAgIHRhZ3NcbiAgICB9ID0gY3R4LmRvYy5zY2hlbWE7XG4gICAgY29uc3QgcmVzb2x2ZWQgPSByZXNvbHZlU2NhbGFyKHN0ciwgdGFncywgdGFncy5zY2FsYXJGYWxsYmFjaykudmFsdWU7XG4gICAgaWYgKHR5cGVvZiByZXNvbHZlZCAhPT0gJ3N0cmluZycpIHJldHVybiBkb3VibGVRdW90ZWRTdHJpbmcodmFsdWUsIGN0eCk7XG4gIH1cblxuICBjb25zdCBib2R5ID0gaW1wbGljaXRLZXkgPyBzdHIgOiBmb2xkRmxvd0xpbmVzKHN0ciwgaW5kZW50LCBGT0xEX0ZMT1csIGdldEZvbGRPcHRpb25zKGN0eCkpO1xuXG4gIGlmIChjb21tZW50ICYmICFpbkZsb3cgJiYgKGJvZHkuaW5kZXhPZignXFxuJykgIT09IC0xIHx8IGNvbW1lbnQuaW5kZXhPZignXFxuJykgIT09IC0xKSkge1xuICAgIGlmIChvbkNvbW1lbnQpIG9uQ29tbWVudCgpO1xuICAgIHJldHVybiBhZGRDb21tZW50QmVmb3JlKGJvZHksIGluZGVudCwgY29tbWVudCk7XG4gIH1cblxuICByZXR1cm4gYm9keTtcbn1cblxuZnVuY3Rpb24gc3RyaW5naWZ5U3RyaW5nKGl0ZW0sIGN0eCwgb25Db21tZW50LCBvbkNob21wS2VlcCkge1xuICBjb25zdCB7XG4gICAgZGVmYXVsdFR5cGVcbiAgfSA9IHN0ck9wdGlvbnM7XG4gIGNvbnN0IHtcbiAgICBpbXBsaWNpdEtleSxcbiAgICBpbkZsb3dcbiAgfSA9IGN0eDtcbiAgbGV0IHtcbiAgICB0eXBlLFxuICAgIHZhbHVlXG4gIH0gPSBpdGVtO1xuXG4gIGlmICh0eXBlb2YgdmFsdWUgIT09ICdzdHJpbmcnKSB7XG4gICAgdmFsdWUgPSBTdHJpbmcodmFsdWUpO1xuICAgIGl0ZW0gPSBPYmplY3QuYXNzaWduKHt9LCBpdGVtLCB7XG4gICAgICB2YWx1ZVxuICAgIH0pO1xuICB9XG5cbiAgY29uc3QgX3N0cmluZ2lmeSA9IF90eXBlID0+IHtcbiAgICBzd2l0Y2ggKF90eXBlKSB7XG4gICAgICBjYXNlIFBsYWluVmFsdWUuVHlwZS5CTE9DS19GT0xERUQ6XG4gICAgICBjYXNlIFBsYWluVmFsdWUuVHlwZS5CTE9DS19MSVRFUkFMOlxuICAgICAgICByZXR1cm4gYmxvY2tTdHJpbmcoaXRlbSwgY3R4LCBvbkNvbW1lbnQsIG9uQ2hvbXBLZWVwKTtcblxuICAgICAgY2FzZSBQbGFpblZhbHVlLlR5cGUuUVVPVEVfRE9VQkxFOlxuICAgICAgICByZXR1cm4gZG91YmxlUXVvdGVkU3RyaW5nKHZhbHVlLCBjdHgpO1xuXG4gICAgICBjYXNlIFBsYWluVmFsdWUuVHlwZS5RVU9URV9TSU5HTEU6XG4gICAgICAgIHJldHVybiBzaW5nbGVRdW90ZWRTdHJpbmcodmFsdWUsIGN0eCk7XG5cbiAgICAgIGNhc2UgUGxhaW5WYWx1ZS5UeXBlLlBMQUlOOlxuICAgICAgICByZXR1cm4gcGxhaW5TdHJpbmcoaXRlbSwgY3R4LCBvbkNvbW1lbnQsIG9uQ2hvbXBLZWVwKTtcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9O1xuXG4gIGlmICh0eXBlICE9PSBQbGFpblZhbHVlLlR5cGUuUVVPVEVfRE9VQkxFICYmIC9bXFx4MDAtXFx4MDhcXHgwYi1cXHgxZlxceDdmLVxceDlmXS8udGVzdCh2YWx1ZSkpIHtcbiAgICAvLyBmb3JjZSBkb3VibGUgcXVvdGVzIG9uIGNvbnRyb2wgY2hhcmFjdGVyc1xuICAgIHR5cGUgPSBQbGFpblZhbHVlLlR5cGUuUVVPVEVfRE9VQkxFO1xuICB9IGVsc2UgaWYgKChpbXBsaWNpdEtleSB8fCBpbkZsb3cpICYmICh0eXBlID09PSBQbGFpblZhbHVlLlR5cGUuQkxPQ0tfRk9MREVEIHx8IHR5cGUgPT09IFBsYWluVmFsdWUuVHlwZS5CTE9DS19MSVRFUkFMKSkge1xuICAgIC8vIHNob3VsZCBub3QgaGFwcGVuOyBibG9ja3MgYXJlIG5vdCB2YWxpZCBpbnNpZGUgZmxvdyBjb250YWluZXJzXG4gICAgdHlwZSA9IFBsYWluVmFsdWUuVHlwZS5RVU9URV9ET1VCTEU7XG4gIH1cblxuICBsZXQgcmVzID0gX3N0cmluZ2lmeSh0eXBlKTtcblxuICBpZiAocmVzID09PSBudWxsKSB7XG4gICAgcmVzID0gX3N0cmluZ2lmeShkZWZhdWx0VHlwZSk7XG4gICAgaWYgKHJlcyA9PT0gbnVsbCkgdGhyb3cgbmV3IEVycm9yKGBVbnN1cHBvcnRlZCBkZWZhdWx0IHN0cmluZyB0eXBlICR7ZGVmYXVsdFR5cGV9YCk7XG4gIH1cblxuICByZXR1cm4gcmVzO1xufVxuXG5mdW5jdGlvbiBzdHJpbmdpZnlOdW1iZXIoe1xuICBmb3JtYXQsXG4gIG1pbkZyYWN0aW9uRGlnaXRzLFxuICB0YWcsXG4gIHZhbHVlXG59KSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdiaWdpbnQnKSByZXR1cm4gU3RyaW5nKHZhbHVlKTtcbiAgaWYgKCFpc0Zpbml0ZSh2YWx1ZSkpIHJldHVybiBpc05hTih2YWx1ZSkgPyAnLm5hbicgOiB2YWx1ZSA8IDAgPyAnLS5pbmYnIDogJy5pbmYnO1xuICBsZXQgbiA9IEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcblxuICBpZiAoIWZvcm1hdCAmJiBtaW5GcmFjdGlvbkRpZ2l0cyAmJiAoIXRhZyB8fCB0YWcgPT09ICd0YWc6eWFtbC5vcmcsMjAwMjpmbG9hdCcpICYmIC9eXFxkLy50ZXN0KG4pKSB7XG4gICAgbGV0IGkgPSBuLmluZGV4T2YoJy4nKTtcblxuICAgIGlmIChpIDwgMCkge1xuICAgICAgaSA9IG4ubGVuZ3RoO1xuICAgICAgbiArPSAnLic7XG4gICAgfVxuXG4gICAgbGV0IGQgPSBtaW5GcmFjdGlvbkRpZ2l0cyAtIChuLmxlbmd0aCAtIGkgLSAxKTtcblxuICAgIHdoaWxlIChkLS0gPiAwKSBuICs9ICcwJztcbiAgfVxuXG4gIHJldHVybiBuO1xufVxuXG5mdW5jdGlvbiBjaGVja0Zsb3dDb2xsZWN0aW9uRW5kKGVycm9ycywgY3N0KSB7XG4gIGxldCBjaGFyLCBuYW1lO1xuXG4gIHN3aXRjaCAoY3N0LnR5cGUpIHtcbiAgICBjYXNlIFBsYWluVmFsdWUuVHlwZS5GTE9XX01BUDpcbiAgICAgIGNoYXIgPSAnfSc7XG4gICAgICBuYW1lID0gJ2Zsb3cgbWFwJztcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSBQbGFpblZhbHVlLlR5cGUuRkxPV19TRVE6XG4gICAgICBjaGFyID0gJ10nO1xuICAgICAgbmFtZSA9ICdmbG93IHNlcXVlbmNlJztcbiAgICAgIGJyZWFrO1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIGVycm9ycy5wdXNoKG5ldyBQbGFpblZhbHVlLllBTUxTZW1hbnRpY0Vycm9yKGNzdCwgJ05vdCBhIGZsb3cgY29sbGVjdGlvbiE/JykpO1xuICAgICAgcmV0dXJuO1xuICB9XG5cbiAgbGV0IGxhc3RJdGVtO1xuXG4gIGZvciAobGV0IGkgPSBjc3QuaXRlbXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICBjb25zdCBpdGVtID0gY3N0Lml0ZW1zW2ldO1xuXG4gICAgaWYgKCFpdGVtIHx8IGl0ZW0udHlwZSAhPT0gUGxhaW5WYWx1ZS5UeXBlLkNPTU1FTlQpIHtcbiAgICAgIGxhc3RJdGVtID0gaXRlbTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIGlmIChsYXN0SXRlbSAmJiBsYXN0SXRlbS5jaGFyICE9PSBjaGFyKSB7XG4gICAgY29uc3QgbXNnID0gYEV4cGVjdGVkICR7bmFtZX0gdG8gZW5kIHdpdGggJHtjaGFyfWA7XG4gICAgbGV0IGVycjtcblxuICAgIGlmICh0eXBlb2YgbGFzdEl0ZW0ub2Zmc2V0ID09PSAnbnVtYmVyJykge1xuICAgICAgZXJyID0gbmV3IFBsYWluVmFsdWUuWUFNTFNlbWFudGljRXJyb3IoY3N0LCBtc2cpO1xuICAgICAgZXJyLm9mZnNldCA9IGxhc3RJdGVtLm9mZnNldCArIDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVyciA9IG5ldyBQbGFpblZhbHVlLllBTUxTZW1hbnRpY0Vycm9yKGxhc3RJdGVtLCBtc2cpO1xuICAgICAgaWYgKGxhc3RJdGVtLnJhbmdlICYmIGxhc3RJdGVtLnJhbmdlLmVuZCkgZXJyLm9mZnNldCA9IGxhc3RJdGVtLnJhbmdlLmVuZCAtIGxhc3RJdGVtLnJhbmdlLnN0YXJ0O1xuICAgIH1cblxuICAgIGVycm9ycy5wdXNoKGVycik7XG4gIH1cbn1cbmZ1bmN0aW9uIGNoZWNrRmxvd0NvbW1lbnRTcGFjZShlcnJvcnMsIGNvbW1lbnQpIHtcbiAgY29uc3QgcHJldiA9IGNvbW1lbnQuY29udGV4dC5zcmNbY29tbWVudC5yYW5nZS5zdGFydCAtIDFdO1xuXG4gIGlmIChwcmV2ICE9PSAnXFxuJyAmJiBwcmV2ICE9PSAnXFx0JyAmJiBwcmV2ICE9PSAnICcpIHtcbiAgICBjb25zdCBtc2cgPSAnQ29tbWVudHMgbXVzdCBiZSBzZXBhcmF0ZWQgZnJvbSBvdGhlciB0b2tlbnMgYnkgd2hpdGUgc3BhY2UgY2hhcmFjdGVycyc7XG4gICAgZXJyb3JzLnB1c2gobmV3IFBsYWluVmFsdWUuWUFNTFNlbWFudGljRXJyb3IoY29tbWVudCwgbXNnKSk7XG4gIH1cbn1cbmZ1bmN0aW9uIGdldExvbmdLZXlFcnJvcihzb3VyY2UsIGtleSkge1xuICBjb25zdCBzayA9IFN0cmluZyhrZXkpO1xuICBjb25zdCBrID0gc2suc3Vic3RyKDAsIDgpICsgJy4uLicgKyBzay5zdWJzdHIoLTgpO1xuICByZXR1cm4gbmV3IFBsYWluVmFsdWUuWUFNTFNlbWFudGljRXJyb3Ioc291cmNlLCBgVGhlIFwiJHtrfVwiIGtleSBpcyB0b28gbG9uZ2ApO1xufVxuZnVuY3Rpb24gcmVzb2x2ZUNvbW1lbnRzKGNvbGxlY3Rpb24sIGNvbW1lbnRzKSB7XG4gIGZvciAoY29uc3Qge1xuICAgIGFmdGVyS2V5LFxuICAgIGJlZm9yZSxcbiAgICBjb21tZW50XG4gIH0gb2YgY29tbWVudHMpIHtcbiAgICBsZXQgaXRlbSA9IGNvbGxlY3Rpb24uaXRlbXNbYmVmb3JlXTtcblxuICAgIGlmICghaXRlbSkge1xuICAgICAgaWYgKGNvbW1lbnQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoY29sbGVjdGlvbi5jb21tZW50KSBjb2xsZWN0aW9uLmNvbW1lbnQgKz0gJ1xcbicgKyBjb21tZW50O2Vsc2UgY29sbGVjdGlvbi5jb21tZW50ID0gY29tbWVudDtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGFmdGVyS2V5ICYmIGl0ZW0udmFsdWUpIGl0ZW0gPSBpdGVtLnZhbHVlO1xuXG4gICAgICBpZiAoY29tbWVudCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChhZnRlcktleSB8fCAhaXRlbS5jb21tZW50QmVmb3JlKSBpdGVtLnNwYWNlQmVmb3JlID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChpdGVtLmNvbW1lbnRCZWZvcmUpIGl0ZW0uY29tbWVudEJlZm9yZSArPSAnXFxuJyArIGNvbW1lbnQ7ZWxzZSBpdGVtLmNvbW1lbnRCZWZvcmUgPSBjb21tZW50O1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vLyBvbiBlcnJvciwgd2lsbCByZXR1cm4geyBzdHI6IHN0cmluZywgZXJyb3JzOiBFcnJvcltdIH1cbmZ1bmN0aW9uIHJlc29sdmVTdHJpbmcoZG9jLCBub2RlKSB7XG4gIGNvbnN0IHJlcyA9IG5vZGUuc3RyVmFsdWU7XG4gIGlmICghcmVzKSByZXR1cm4gJyc7XG4gIGlmICh0eXBlb2YgcmVzID09PSAnc3RyaW5nJykgcmV0dXJuIHJlcztcbiAgcmVzLmVycm9ycy5mb3JFYWNoKGVycm9yID0+IHtcbiAgICBpZiAoIWVycm9yLnNvdXJjZSkgZXJyb3Iuc291cmNlID0gbm9kZTtcbiAgICBkb2MuZXJyb3JzLnB1c2goZXJyb3IpO1xuICB9KTtcbiAgcmV0dXJuIHJlcy5zdHI7XG59XG5cbmZ1bmN0aW9uIHJlc29sdmVUYWdIYW5kbGUoZG9jLCBub2RlKSB7XG4gIGNvbnN0IHtcbiAgICBoYW5kbGUsXG4gICAgc3VmZml4XG4gIH0gPSBub2RlLnRhZztcbiAgbGV0IHByZWZpeCA9IGRvYy50YWdQcmVmaXhlcy5maW5kKHAgPT4gcC5oYW5kbGUgPT09IGhhbmRsZSk7XG5cbiAgaWYgKCFwcmVmaXgpIHtcbiAgICBjb25zdCBkdHAgPSBkb2MuZ2V0RGVmYXVsdHMoKS50YWdQcmVmaXhlcztcbiAgICBpZiAoZHRwKSBwcmVmaXggPSBkdHAuZmluZChwID0+IHAuaGFuZGxlID09PSBoYW5kbGUpO1xuICAgIGlmICghcHJlZml4KSB0aHJvdyBuZXcgUGxhaW5WYWx1ZS5ZQU1MU2VtYW50aWNFcnJvcihub2RlLCBgVGhlICR7aGFuZGxlfSB0YWcgaGFuZGxlIGlzIG5vbi1kZWZhdWx0IGFuZCB3YXMgbm90IGRlY2xhcmVkLmApO1xuICB9XG5cbiAgaWYgKCFzdWZmaXgpIHRocm93IG5ldyBQbGFpblZhbHVlLllBTUxTZW1hbnRpY0Vycm9yKG5vZGUsIGBUaGUgJHtoYW5kbGV9IHRhZyBoYXMgbm8gc3VmZml4LmApO1xuXG4gIGlmIChoYW5kbGUgPT09ICchJyAmJiAoZG9jLnZlcnNpb24gfHwgZG9jLm9wdGlvbnMudmVyc2lvbikgPT09ICcxLjAnKSB7XG4gICAgaWYgKHN1ZmZpeFswXSA9PT0gJ14nKSB7XG4gICAgICBkb2Mud2FybmluZ3MucHVzaChuZXcgUGxhaW5WYWx1ZS5ZQU1MV2FybmluZyhub2RlLCAnWUFNTCAxLjAgXiB0YWcgZXhwYW5zaW9uIGlzIG5vdCBzdXBwb3J0ZWQnKSk7XG4gICAgICByZXR1cm4gc3VmZml4O1xuICAgIH1cblxuICAgIGlmICgvWzovXS8udGVzdChzdWZmaXgpKSB7XG4gICAgICAvLyB3b3JkL2ZvbyAtPiB0YWc6d29yZC55YW1sLm9yZywyMDAyOmZvb1xuICAgICAgY29uc3Qgdm9jYWIgPSBzdWZmaXgubWF0Y2goL14oW2EtejAtOS1dKylcXC8oLiopL2kpO1xuICAgICAgcmV0dXJuIHZvY2FiID8gYHRhZzoke3ZvY2FiWzFdfS55YW1sLm9yZywyMDAyOiR7dm9jYWJbMl19YCA6IGB0YWc6JHtzdWZmaXh9YDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcHJlZml4LnByZWZpeCArIGRlY29kZVVSSUNvbXBvbmVudChzdWZmaXgpO1xufVxuXG5mdW5jdGlvbiByZXNvbHZlVGFnTmFtZShkb2MsIG5vZGUpIHtcbiAgY29uc3Qge1xuICAgIHRhZyxcbiAgICB0eXBlXG4gIH0gPSBub2RlO1xuICBsZXQgbm9uU3BlY2lmaWMgPSBmYWxzZTtcblxuICBpZiAodGFnKSB7XG4gICAgY29uc3Qge1xuICAgICAgaGFuZGxlLFxuICAgICAgc3VmZml4LFxuICAgICAgdmVyYmF0aW1cbiAgICB9ID0gdGFnO1xuXG4gICAgaWYgKHZlcmJhdGltKSB7XG4gICAgICBpZiAodmVyYmF0aW0gIT09ICchJyAmJiB2ZXJiYXRpbSAhPT0gJyEhJykgcmV0dXJuIHZlcmJhdGltO1xuICAgICAgY29uc3QgbXNnID0gYFZlcmJhdGltIHRhZ3MgYXJlbid0IHJlc29sdmVkLCBzbyAke3ZlcmJhdGltfSBpcyBpbnZhbGlkLmA7XG4gICAgICBkb2MuZXJyb3JzLnB1c2gobmV3IFBsYWluVmFsdWUuWUFNTFNlbWFudGljRXJyb3Iobm9kZSwgbXNnKSk7XG4gICAgfSBlbHNlIGlmIChoYW5kbGUgPT09ICchJyAmJiAhc3VmZml4KSB7XG4gICAgICBub25TcGVjaWZpYyA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJldHVybiByZXNvbHZlVGFnSGFuZGxlKGRvYywgbm9kZSk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBkb2MuZXJyb3JzLnB1c2goZXJyb3IpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHN3aXRjaCAodHlwZSkge1xuICAgIGNhc2UgUGxhaW5WYWx1ZS5UeXBlLkJMT0NLX0ZPTERFRDpcbiAgICBjYXNlIFBsYWluVmFsdWUuVHlwZS5CTE9DS19MSVRFUkFMOlxuICAgIGNhc2UgUGxhaW5WYWx1ZS5UeXBlLlFVT1RFX0RPVUJMRTpcbiAgICBjYXNlIFBsYWluVmFsdWUuVHlwZS5RVU9URV9TSU5HTEU6XG4gICAgICByZXR1cm4gUGxhaW5WYWx1ZS5kZWZhdWx0VGFncy5TVFI7XG5cbiAgICBjYXNlIFBsYWluVmFsdWUuVHlwZS5GTE9XX01BUDpcbiAgICBjYXNlIFBsYWluVmFsdWUuVHlwZS5NQVA6XG4gICAgICByZXR1cm4gUGxhaW5WYWx1ZS5kZWZhdWx0VGFncy5NQVA7XG5cbiAgICBjYXNlIFBsYWluVmFsdWUuVHlwZS5GTE9XX1NFUTpcbiAgICBjYXNlIFBsYWluVmFsdWUuVHlwZS5TRVE6XG4gICAgICByZXR1cm4gUGxhaW5WYWx1ZS5kZWZhdWx0VGFncy5TRVE7XG5cbiAgICBjYXNlIFBsYWluVmFsdWUuVHlwZS5QTEFJTjpcbiAgICAgIHJldHVybiBub25TcGVjaWZpYyA/IFBsYWluVmFsdWUuZGVmYXVsdFRhZ3MuU1RSIDogbnVsbDtcblxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuXG5mdW5jdGlvbiByZXNvbHZlQnlUYWdOYW1lKGRvYywgbm9kZSwgdGFnTmFtZSkge1xuICBjb25zdCB7XG4gICAgdGFnc1xuICB9ID0gZG9jLnNjaGVtYTtcbiAgY29uc3QgbWF0Y2hXaXRoVGVzdCA9IFtdO1xuXG4gIGZvciAoY29uc3QgdGFnIG9mIHRhZ3MpIHtcbiAgICBpZiAodGFnLnRhZyA9PT0gdGFnTmFtZSkge1xuICAgICAgaWYgKHRhZy50ZXN0KSBtYXRjaFdpdGhUZXN0LnB1c2godGFnKTtlbHNlIHtcbiAgICAgICAgY29uc3QgcmVzID0gdGFnLnJlc29sdmUoZG9jLCBub2RlKTtcbiAgICAgICAgcmV0dXJuIHJlcyBpbnN0YW5jZW9mIENvbGxlY3Rpb24gPyByZXMgOiBuZXcgU2NhbGFyKHJlcyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY29uc3Qgc3RyID0gcmVzb2x2ZVN0cmluZyhkb2MsIG5vZGUpO1xuICBpZiAodHlwZW9mIHN0ciA9PT0gJ3N0cmluZycgJiYgbWF0Y2hXaXRoVGVzdC5sZW5ndGggPiAwKSByZXR1cm4gcmVzb2x2ZVNjYWxhcihzdHIsIG1hdGNoV2l0aFRlc3QsIHRhZ3Muc2NhbGFyRmFsbGJhY2spO1xuICByZXR1cm4gbnVsbDtcbn1cblxuZnVuY3Rpb24gZ2V0RmFsbGJhY2tUYWdOYW1lKHtcbiAgdHlwZVxufSkge1xuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlIFBsYWluVmFsdWUuVHlwZS5GTE9XX01BUDpcbiAgICBjYXNlIFBsYWluVmFsdWUuVHlwZS5NQVA6XG4gICAgICByZXR1cm4gUGxhaW5WYWx1ZS5kZWZhdWx0VGFncy5NQVA7XG5cbiAgICBjYXNlIFBsYWluVmFsdWUuVHlwZS5GTE9XX1NFUTpcbiAgICBjYXNlIFBsYWluVmFsdWUuVHlwZS5TRVE6XG4gICAgICByZXR1cm4gUGxhaW5WYWx1ZS5kZWZhdWx0VGFncy5TRVE7XG5cbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIFBsYWluVmFsdWUuZGVmYXVsdFRhZ3MuU1RSO1xuICB9XG59XG5cbmZ1bmN0aW9uIHJlc29sdmVUYWcoZG9jLCBub2RlLCB0YWdOYW1lKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgcmVzID0gcmVzb2x2ZUJ5VGFnTmFtZShkb2MsIG5vZGUsIHRhZ05hbWUpO1xuXG4gICAgaWYgKHJlcykge1xuICAgICAgaWYgKHRhZ05hbWUgJiYgbm9kZS50YWcpIHJlcy50YWcgPSB0YWdOYW1lO1xuICAgICAgcmV0dXJuIHJlcztcbiAgICB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgaWYgKCFlcnJvci5zb3VyY2UpIGVycm9yLnNvdXJjZSA9IG5vZGU7XG4gICAgZG9jLmVycm9ycy5wdXNoKGVycm9yKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHRyeSB7XG4gICAgY29uc3QgZmFsbGJhY2sgPSBnZXRGYWxsYmFja1RhZ05hbWUobm9kZSk7XG4gICAgaWYgKCFmYWxsYmFjaykgdGhyb3cgbmV3IEVycm9yKGBUaGUgdGFnICR7dGFnTmFtZX0gaXMgdW5hdmFpbGFibGVgKTtcbiAgICBjb25zdCBtc2cgPSBgVGhlIHRhZyAke3RhZ05hbWV9IGlzIHVuYXZhaWxhYmxlLCBmYWxsaW5nIGJhY2sgdG8gJHtmYWxsYmFja31gO1xuICAgIGRvYy53YXJuaW5ncy5wdXNoKG5ldyBQbGFpblZhbHVlLllBTUxXYXJuaW5nKG5vZGUsIG1zZykpO1xuICAgIGNvbnN0IHJlcyA9IHJlc29sdmVCeVRhZ05hbWUoZG9jLCBub2RlLCBmYWxsYmFjayk7XG4gICAgcmVzLnRhZyA9IHRhZ05hbWU7XG4gICAgcmV0dXJuIHJlcztcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zdCByZWZFcnJvciA9IG5ldyBQbGFpblZhbHVlLllBTUxSZWZlcmVuY2VFcnJvcihub2RlLCBlcnJvci5tZXNzYWdlKTtcbiAgICByZWZFcnJvci5zdGFjayA9IGVycm9yLnN0YWNrO1xuICAgIGRvYy5lcnJvcnMucHVzaChyZWZFcnJvcik7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cblxuY29uc3QgaXNDb2xsZWN0aW9uSXRlbSA9IG5vZGUgPT4ge1xuICBpZiAoIW5vZGUpIHJldHVybiBmYWxzZTtcbiAgY29uc3Qge1xuICAgIHR5cGVcbiAgfSA9IG5vZGU7XG4gIHJldHVybiB0eXBlID09PSBQbGFpblZhbHVlLlR5cGUuTUFQX0tFWSB8fCB0eXBlID09PSBQbGFpblZhbHVlLlR5cGUuTUFQX1ZBTFVFIHx8IHR5cGUgPT09IFBsYWluVmFsdWUuVHlwZS5TRVFfSVRFTTtcbn07XG5cbmZ1bmN0aW9uIHJlc29sdmVOb2RlUHJvcHMoZXJyb3JzLCBub2RlKSB7XG4gIGNvbnN0IGNvbW1lbnRzID0ge1xuICAgIGJlZm9yZTogW10sXG4gICAgYWZ0ZXI6IFtdXG4gIH07XG4gIGxldCBoYXNBbmNob3IgPSBmYWxzZTtcbiAgbGV0IGhhc1RhZyA9IGZhbHNlO1xuICBjb25zdCBwcm9wcyA9IGlzQ29sbGVjdGlvbkl0ZW0obm9kZS5jb250ZXh0LnBhcmVudCkgPyBub2RlLmNvbnRleHQucGFyZW50LnByb3BzLmNvbmNhdChub2RlLnByb3BzKSA6IG5vZGUucHJvcHM7XG5cbiAgZm9yIChjb25zdCB7XG4gICAgc3RhcnQsXG4gICAgZW5kXG4gIH0gb2YgcHJvcHMpIHtcbiAgICBzd2l0Y2ggKG5vZGUuY29udGV4dC5zcmNbc3RhcnRdKSB7XG4gICAgICBjYXNlIFBsYWluVmFsdWUuQ2hhci5DT01NRU5UOlxuICAgICAgICB7XG4gICAgICAgICAgaWYgKCFub2RlLmNvbW1lbnRIYXNSZXF1aXJlZFdoaXRlc3BhY2Uoc3RhcnQpKSB7XG4gICAgICAgICAgICBjb25zdCBtc2cgPSAnQ29tbWVudHMgbXVzdCBiZSBzZXBhcmF0ZWQgZnJvbSBvdGhlciB0b2tlbnMgYnkgd2hpdGUgc3BhY2UgY2hhcmFjdGVycyc7XG4gICAgICAgICAgICBlcnJvcnMucHVzaChuZXcgUGxhaW5WYWx1ZS5ZQU1MU2VtYW50aWNFcnJvcihub2RlLCBtc2cpKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICBoZWFkZXIsXG4gICAgICAgICAgICB2YWx1ZVJhbmdlXG4gICAgICAgICAgfSA9IG5vZGU7XG4gICAgICAgICAgY29uc3QgY2MgPSB2YWx1ZVJhbmdlICYmIChzdGFydCA+IHZhbHVlUmFuZ2Uuc3RhcnQgfHwgaGVhZGVyICYmIHN0YXJ0ID4gaGVhZGVyLnN0YXJ0KSA/IGNvbW1lbnRzLmFmdGVyIDogY29tbWVudHMuYmVmb3JlO1xuICAgICAgICAgIGNjLnB1c2gobm9kZS5jb250ZXh0LnNyYy5zbGljZShzdGFydCArIDEsIGVuZCkpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAvLyBBY3R1YWwgYW5jaG9yICYgdGFnIHJlc29sdXRpb24gaXMgaGFuZGxlZCBieSBzY2hlbWEsIGhlcmUgd2UganVzdCBjb21wbGFpblxuXG4gICAgICBjYXNlIFBsYWluVmFsdWUuQ2hhci5BTkNIT1I6XG4gICAgICAgIGlmIChoYXNBbmNob3IpIHtcbiAgICAgICAgICBjb25zdCBtc2cgPSAnQSBub2RlIGNhbiBoYXZlIGF0IG1vc3Qgb25lIGFuY2hvcic7XG4gICAgICAgICAgZXJyb3JzLnB1c2gobmV3IFBsYWluVmFsdWUuWUFNTFNlbWFudGljRXJyb3Iobm9kZSwgbXNnKSk7XG4gICAgICAgIH1cblxuICAgICAgICBoYXNBbmNob3IgPSB0cnVlO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBQbGFpblZhbHVlLkNoYXIuVEFHOlxuICAgICAgICBpZiAoaGFzVGFnKSB7XG4gICAgICAgICAgY29uc3QgbXNnID0gJ0Egbm9kZSBjYW4gaGF2ZSBhdCBtb3N0IG9uZSB0YWcnO1xuICAgICAgICAgIGVycm9ycy5wdXNoKG5ldyBQbGFpblZhbHVlLllBTUxTZW1hbnRpY0Vycm9yKG5vZGUsIG1zZykpO1xuICAgICAgICB9XG5cbiAgICAgICAgaGFzVGFnID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBjb21tZW50cyxcbiAgICBoYXNBbmNob3IsXG4gICAgaGFzVGFnXG4gIH07XG59XG5cbmZ1bmN0aW9uIHJlc29sdmVOb2RlVmFsdWUoZG9jLCBub2RlKSB7XG4gIGNvbnN0IHtcbiAgICBhbmNob3JzLFxuICAgIGVycm9ycyxcbiAgICBzY2hlbWFcbiAgfSA9IGRvYztcblxuICBpZiAobm9kZS50eXBlID09PSBQbGFpblZhbHVlLlR5cGUuQUxJQVMpIHtcbiAgICBjb25zdCBuYW1lID0gbm9kZS5yYXdWYWx1ZTtcbiAgICBjb25zdCBzcmMgPSBhbmNob3JzLmdldE5vZGUobmFtZSk7XG5cbiAgICBpZiAoIXNyYykge1xuICAgICAgY29uc3QgbXNnID0gYEFsaWFzZWQgYW5jaG9yIG5vdCBmb3VuZDogJHtuYW1lfWA7XG4gICAgICBlcnJvcnMucHVzaChuZXcgUGxhaW5WYWx1ZS5ZQU1MUmVmZXJlbmNlRXJyb3Iobm9kZSwgbXNnKSk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9IC8vIExhenkgcmVzb2x1dGlvbiBmb3IgY2lyY3VsYXIgcmVmZXJlbmNlc1xuXG5cbiAgICBjb25zdCByZXMgPSBuZXcgQWxpYXMoc3JjKTtcblxuICAgIGFuY2hvcnMuX2NzdEFsaWFzZXMucHVzaChyZXMpO1xuXG4gICAgcmV0dXJuIHJlcztcbiAgfVxuXG4gIGNvbnN0IHRhZ05hbWUgPSByZXNvbHZlVGFnTmFtZShkb2MsIG5vZGUpO1xuICBpZiAodGFnTmFtZSkgcmV0dXJuIHJlc29sdmVUYWcoZG9jLCBub2RlLCB0YWdOYW1lKTtcblxuICBpZiAobm9kZS50eXBlICE9PSBQbGFpblZhbHVlLlR5cGUuUExBSU4pIHtcbiAgICBjb25zdCBtc2cgPSBgRmFpbGVkIHRvIHJlc29sdmUgJHtub2RlLnR5cGV9IG5vZGUgaGVyZWA7XG4gICAgZXJyb3JzLnB1c2gobmV3IFBsYWluVmFsdWUuWUFNTFN5bnRheEVycm9yKG5vZGUsIG1zZykpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBzdHIgPSByZXNvbHZlU3RyaW5nKGRvYywgbm9kZSk7XG4gICAgcmV0dXJuIHJlc29sdmVTY2FsYXIoc3RyLCBzY2hlbWEudGFncywgc2NoZW1hLnRhZ3Muc2NhbGFyRmFsbGJhY2spO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGlmICghZXJyb3Iuc291cmNlKSBlcnJvci5zb3VyY2UgPSBub2RlO1xuICAgIGVycm9ycy5wdXNoKGVycm9yKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufSAvLyBzZXRzIG5vZGUucmVzb2x2ZWQgb24gc3VjY2Vzc1xuXG5cbmZ1bmN0aW9uIHJlc29sdmVOb2RlKGRvYywgbm9kZSkge1xuICBpZiAoIW5vZGUpIHJldHVybiBudWxsO1xuICBpZiAobm9kZS5lcnJvcikgZG9jLmVycm9ycy5wdXNoKG5vZGUuZXJyb3IpO1xuICBjb25zdCB7XG4gICAgY29tbWVudHMsXG4gICAgaGFzQW5jaG9yLFxuICAgIGhhc1RhZ1xuICB9ID0gcmVzb2x2ZU5vZGVQcm9wcyhkb2MuZXJyb3JzLCBub2RlKTtcblxuICBpZiAoaGFzQW5jaG9yKSB7XG4gICAgY29uc3Qge1xuICAgICAgYW5jaG9yc1xuICAgIH0gPSBkb2M7XG4gICAgY29uc3QgbmFtZSA9IG5vZGUuYW5jaG9yO1xuICAgIGNvbnN0IHByZXYgPSBhbmNob3JzLmdldE5vZGUobmFtZSk7IC8vIEF0IHRoaXMgcG9pbnQsIGFsaWFzZXMgZm9yIGFueSBwcmVjZWRpbmcgbm9kZSB3aXRoIHRoZSBzYW1lIGFuY2hvclxuICAgIC8vIG5hbWUgaGF2ZSBhbHJlYWR5IGJlZW4gcmVzb2x2ZWQsIHNvIGl0IG1heSBzYWZlbHkgYmUgcmVuYW1lZC5cblxuICAgIGlmIChwcmV2KSBhbmNob3JzLm1hcFthbmNob3JzLm5ld05hbWUobmFtZSldID0gcHJldjsgLy8gRHVyaW5nIHBhcnNpbmcsIHdlIG5lZWQgdG8gc3RvcmUgdGhlIENTVCBub2RlIGluIGFuY2hvcnMubWFwIGFzXG4gICAgLy8gYW5jaG9ycyBuZWVkIHRvIGJlIGF2YWlsYWJsZSBkdXJpbmcgcmVzb2x1dGlvbiB0byBhbGxvdyBmb3JcbiAgICAvLyBjaXJjdWxhciByZWZlcmVuY2VzLlxuXG4gICAgYW5jaG9ycy5tYXBbbmFtZV0gPSBub2RlO1xuICB9XG5cbiAgaWYgKG5vZGUudHlwZSA9PT0gUGxhaW5WYWx1ZS5UeXBlLkFMSUFTICYmIChoYXNBbmNob3IgfHwgaGFzVGFnKSkge1xuICAgIGNvbnN0IG1zZyA9ICdBbiBhbGlhcyBub2RlIG11c3Qgbm90IHNwZWNpZnkgYW55IHByb3BlcnRpZXMnO1xuICAgIGRvYy5lcnJvcnMucHVzaChuZXcgUGxhaW5WYWx1ZS5ZQU1MU2VtYW50aWNFcnJvcihub2RlLCBtc2cpKTtcbiAgfVxuXG4gIGNvbnN0IHJlcyA9IHJlc29sdmVOb2RlVmFsdWUoZG9jLCBub2RlKTtcblxuICBpZiAocmVzKSB7XG4gICAgcmVzLnJhbmdlID0gW25vZGUucmFuZ2Uuc3RhcnQsIG5vZGUucmFuZ2UuZW5kXTtcbiAgICBpZiAoZG9jLm9wdGlvbnMua2VlcENzdE5vZGVzKSByZXMuY3N0Tm9kZSA9IG5vZGU7XG4gICAgaWYgKGRvYy5vcHRpb25zLmtlZXBOb2RlVHlwZXMpIHJlcy50eXBlID0gbm9kZS50eXBlO1xuICAgIGNvbnN0IGNiID0gY29tbWVudHMuYmVmb3JlLmpvaW4oJ1xcbicpO1xuXG4gICAgaWYgKGNiKSB7XG4gICAgICByZXMuY29tbWVudEJlZm9yZSA9IHJlcy5jb21tZW50QmVmb3JlID8gYCR7cmVzLmNvbW1lbnRCZWZvcmV9XFxuJHtjYn1gIDogY2I7XG4gICAgfVxuXG4gICAgY29uc3QgY2EgPSBjb21tZW50cy5hZnRlci5qb2luKCdcXG4nKTtcbiAgICBpZiAoY2EpIHJlcy5jb21tZW50ID0gcmVzLmNvbW1lbnQgPyBgJHtyZXMuY29tbWVudH1cXG4ke2NhfWAgOiBjYTtcbiAgfVxuXG4gIHJldHVybiBub2RlLnJlc29sdmVkID0gcmVzO1xufVxuXG5mdW5jdGlvbiByZXNvbHZlTWFwKGRvYywgY3N0KSB7XG4gIGlmIChjc3QudHlwZSAhPT0gUGxhaW5WYWx1ZS5UeXBlLk1BUCAmJiBjc3QudHlwZSAhPT0gUGxhaW5WYWx1ZS5UeXBlLkZMT1dfTUFQKSB7XG4gICAgY29uc3QgbXNnID0gYEEgJHtjc3QudHlwZX0gbm9kZSBjYW5ub3QgYmUgcmVzb2x2ZWQgYXMgYSBtYXBwaW5nYDtcbiAgICBkb2MuZXJyb3JzLnB1c2gobmV3IFBsYWluVmFsdWUuWUFNTFN5bnRheEVycm9yKGNzdCwgbXNnKSk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBjb25zdCB7XG4gICAgY29tbWVudHMsXG4gICAgaXRlbXNcbiAgfSA9IGNzdC50eXBlID09PSBQbGFpblZhbHVlLlR5cGUuRkxPV19NQVAgPyByZXNvbHZlRmxvd01hcEl0ZW1zKGRvYywgY3N0KSA6IHJlc29sdmVCbG9ja01hcEl0ZW1zKGRvYywgY3N0KTtcbiAgY29uc3QgbWFwID0gbmV3IFlBTUxNYXAoKTtcbiAgbWFwLml0ZW1zID0gaXRlbXM7XG4gIHJlc29sdmVDb21tZW50cyhtYXAsIGNvbW1lbnRzKTtcbiAgbGV0IGhhc0NvbGxlY3Rpb25LZXkgPSBmYWxzZTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgKytpKSB7XG4gICAgY29uc3Qge1xuICAgICAga2V5OiBpS2V5XG4gICAgfSA9IGl0ZW1zW2ldO1xuICAgIGlmIChpS2V5IGluc3RhbmNlb2YgQ29sbGVjdGlvbikgaGFzQ29sbGVjdGlvbktleSA9IHRydWU7XG5cbiAgICBpZiAoZG9jLnNjaGVtYS5tZXJnZSAmJiBpS2V5ICYmIGlLZXkudmFsdWUgPT09IE1FUkdFX0tFWSkge1xuICAgICAgaXRlbXNbaV0gPSBuZXcgTWVyZ2UoaXRlbXNbaV0pO1xuICAgICAgY29uc3Qgc291cmNlcyA9IGl0ZW1zW2ldLnZhbHVlLml0ZW1zO1xuICAgICAgbGV0IGVycm9yID0gbnVsbDtcbiAgICAgIHNvdXJjZXMuc29tZShub2RlID0+IHtcbiAgICAgICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBBbGlhcykge1xuICAgICAgICAgIC8vIER1cmluZyBwYXJzaW5nLCBhbGlhcyBzb3VyY2VzIGFyZSBDU1Qgbm9kZXM7IHRvIGFjY291bnQgZm9yXG4gICAgICAgICAgLy8gY2lyY3VsYXIgcmVmZXJlbmNlcyB0aGVpciByZXNvbHZlZCB2YWx1ZXMgY2FuJ3QgYmUgdXNlZCBoZXJlLlxuICAgICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgIHR5cGVcbiAgICAgICAgICB9ID0gbm9kZS5zb3VyY2U7XG4gICAgICAgICAgaWYgKHR5cGUgPT09IFBsYWluVmFsdWUuVHlwZS5NQVAgfHwgdHlwZSA9PT0gUGxhaW5WYWx1ZS5UeXBlLkZMT1dfTUFQKSByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgcmV0dXJuIGVycm9yID0gJ01lcmdlIG5vZGVzIGFsaWFzZXMgY2FuIG9ubHkgcG9pbnQgdG8gbWFwcyc7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZXJyb3IgPSAnTWVyZ2Ugbm9kZXMgY2FuIG9ubHkgaGF2ZSBBbGlhcyBub2RlcyBhcyB2YWx1ZXMnO1xuICAgICAgfSk7XG4gICAgICBpZiAoZXJyb3IpIGRvYy5lcnJvcnMucHVzaChuZXcgUGxhaW5WYWx1ZS5ZQU1MU2VtYW50aWNFcnJvcihjc3QsIGVycm9yKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAobGV0IGogPSBpICsgMTsgaiA8IGl0ZW1zLmxlbmd0aDsgKytqKSB7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICBrZXk6IGpLZXlcbiAgICAgICAgfSA9IGl0ZW1zW2pdO1xuXG4gICAgICAgIGlmIChpS2V5ID09PSBqS2V5IHx8IGlLZXkgJiYgaktleSAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaUtleSwgJ3ZhbHVlJykgJiYgaUtleS52YWx1ZSA9PT0gaktleS52YWx1ZSkge1xuICAgICAgICAgIGNvbnN0IG1zZyA9IGBNYXAga2V5cyBtdXN0IGJlIHVuaXF1ZTsgXCIke2lLZXl9XCIgaXMgcmVwZWF0ZWRgO1xuICAgICAgICAgIGRvYy5lcnJvcnMucHVzaChuZXcgUGxhaW5WYWx1ZS5ZQU1MU2VtYW50aWNFcnJvcihjc3QsIG1zZykpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKGhhc0NvbGxlY3Rpb25LZXkgJiYgIWRvYy5vcHRpb25zLm1hcEFzTWFwKSB7XG4gICAgY29uc3Qgd2FybiA9ICdLZXlzIHdpdGggY29sbGVjdGlvbiB2YWx1ZXMgd2lsbCBiZSBzdHJpbmdpZmllZCBhcyBZQU1MIGR1ZSB0byBKUyBPYmplY3QgcmVzdHJpY3Rpb25zLiBVc2UgbWFwQXNNYXA6IHRydWUgdG8gYXZvaWQgdGhpcy4nO1xuICAgIGRvYy53YXJuaW5ncy5wdXNoKG5ldyBQbGFpblZhbHVlLllBTUxXYXJuaW5nKGNzdCwgd2FybikpO1xuICB9XG5cbiAgY3N0LnJlc29sdmVkID0gbWFwO1xuICByZXR1cm4gbWFwO1xufVxuXG5jb25zdCB2YWx1ZUhhc1BhaXJDb21tZW50ID0gKHtcbiAgY29udGV4dDoge1xuICAgIGxpbmVTdGFydCxcbiAgICBub2RlLFxuICAgIHNyY1xuICB9LFxuICBwcm9wc1xufSkgPT4ge1xuICBpZiAocHJvcHMubGVuZ3RoID09PSAwKSByZXR1cm4gZmFsc2U7XG4gIGNvbnN0IHtcbiAgICBzdGFydFxuICB9ID0gcHJvcHNbMF07XG4gIGlmIChub2RlICYmIHN0YXJ0ID4gbm9kZS52YWx1ZVJhbmdlLnN0YXJ0KSByZXR1cm4gZmFsc2U7XG4gIGlmIChzcmNbc3RhcnRdICE9PSBQbGFpblZhbHVlLkNoYXIuQ09NTUVOVCkgcmV0dXJuIGZhbHNlO1xuXG4gIGZvciAobGV0IGkgPSBsaW5lU3RhcnQ7IGkgPCBzdGFydDsgKytpKSBpZiAoc3JjW2ldID09PSAnXFxuJykgcmV0dXJuIGZhbHNlO1xuXG4gIHJldHVybiB0cnVlO1xufTtcblxuZnVuY3Rpb24gcmVzb2x2ZVBhaXJDb21tZW50KGl0ZW0sIHBhaXIpIHtcbiAgaWYgKCF2YWx1ZUhhc1BhaXJDb21tZW50KGl0ZW0pKSByZXR1cm47XG4gIGNvbnN0IGNvbW1lbnQgPSBpdGVtLmdldFByb3BWYWx1ZSgwLCBQbGFpblZhbHVlLkNoYXIuQ09NTUVOVCwgdHJ1ZSk7XG4gIGxldCBmb3VuZCA9IGZhbHNlO1xuICBjb25zdCBjYiA9IHBhaXIudmFsdWUuY29tbWVudEJlZm9yZTtcblxuICBpZiAoY2IgJiYgY2Iuc3RhcnRzV2l0aChjb21tZW50KSkge1xuICAgIHBhaXIudmFsdWUuY29tbWVudEJlZm9yZSA9IGNiLnN1YnN0cihjb21tZW50Lmxlbmd0aCArIDEpO1xuICAgIGZvdW5kID0gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBjYyA9IHBhaXIudmFsdWUuY29tbWVudDtcblxuICAgIGlmICghaXRlbS5ub2RlICYmIGNjICYmIGNjLnN0YXJ0c1dpdGgoY29tbWVudCkpIHtcbiAgICAgIHBhaXIudmFsdWUuY29tbWVudCA9IGNjLnN1YnN0cihjb21tZW50Lmxlbmd0aCArIDEpO1xuICAgICAgZm91bmQgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIGlmIChmb3VuZCkgcGFpci5jb21tZW50ID0gY29tbWVudDtcbn1cblxuZnVuY3Rpb24gcmVzb2x2ZUJsb2NrTWFwSXRlbXMoZG9jLCBjc3QpIHtcbiAgY29uc3QgY29tbWVudHMgPSBbXTtcbiAgY29uc3QgaXRlbXMgPSBbXTtcbiAgbGV0IGtleSA9IHVuZGVmaW5lZDtcbiAgbGV0IGtleVN0YXJ0ID0gbnVsbDtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGNzdC5pdGVtcy5sZW5ndGg7ICsraSkge1xuICAgIGNvbnN0IGl0ZW0gPSBjc3QuaXRlbXNbaV07XG5cbiAgICBzd2l0Y2ggKGl0ZW0udHlwZSkge1xuICAgICAgY2FzZSBQbGFpblZhbHVlLlR5cGUuQkxBTktfTElORTpcbiAgICAgICAgY29tbWVudHMucHVzaCh7XG4gICAgICAgICAgYWZ0ZXJLZXk6ICEha2V5LFxuICAgICAgICAgIGJlZm9yZTogaXRlbXMubGVuZ3RoXG4gICAgICAgIH0pO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBQbGFpblZhbHVlLlR5cGUuQ09NTUVOVDpcbiAgICAgICAgY29tbWVudHMucHVzaCh7XG4gICAgICAgICAgYWZ0ZXJLZXk6ICEha2V5LFxuICAgICAgICAgIGJlZm9yZTogaXRlbXMubGVuZ3RoLFxuICAgICAgICAgIGNvbW1lbnQ6IGl0ZW0uY29tbWVudFxuICAgICAgICB9KTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgUGxhaW5WYWx1ZS5UeXBlLk1BUF9LRVk6XG4gICAgICAgIGlmIChrZXkgIT09IHVuZGVmaW5lZCkgaXRlbXMucHVzaChuZXcgUGFpcihrZXkpKTtcbiAgICAgICAgaWYgKGl0ZW0uZXJyb3IpIGRvYy5lcnJvcnMucHVzaChpdGVtLmVycm9yKTtcbiAgICAgICAga2V5ID0gcmVzb2x2ZU5vZGUoZG9jLCBpdGVtLm5vZGUpO1xuICAgICAgICBrZXlTdGFydCA9IG51bGw7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIFBsYWluVmFsdWUuVHlwZS5NQVBfVkFMVUU6XG4gICAgICAgIHtcbiAgICAgICAgICBpZiAoa2V5ID09PSB1bmRlZmluZWQpIGtleSA9IG51bGw7XG4gICAgICAgICAgaWYgKGl0ZW0uZXJyb3IpIGRvYy5lcnJvcnMucHVzaChpdGVtLmVycm9yKTtcblxuICAgICAgICAgIGlmICghaXRlbS5jb250ZXh0LmF0TGluZVN0YXJ0ICYmIGl0ZW0ubm9kZSAmJiBpdGVtLm5vZGUudHlwZSA9PT0gUGxhaW5WYWx1ZS5UeXBlLk1BUCAmJiAhaXRlbS5ub2RlLmNvbnRleHQuYXRMaW5lU3RhcnQpIHtcbiAgICAgICAgICAgIGNvbnN0IG1zZyA9ICdOZXN0ZWQgbWFwcGluZ3MgYXJlIG5vdCBhbGxvd2VkIGluIGNvbXBhY3QgbWFwcGluZ3MnO1xuICAgICAgICAgICAgZG9jLmVycm9ycy5wdXNoKG5ldyBQbGFpblZhbHVlLllBTUxTZW1hbnRpY0Vycm9yKGl0ZW0ubm9kZSwgbXNnKSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbGV0IHZhbHVlTm9kZSA9IGl0ZW0ubm9kZTtcblxuICAgICAgICAgIGlmICghdmFsdWVOb2RlICYmIGl0ZW0ucHJvcHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgLy8gQ29tbWVudHMgb24gYW4gZW1wdHkgbWFwcGluZyB2YWx1ZSBuZWVkIHRvIGJlIHByZXNlcnZlZCwgc28gd2VcbiAgICAgICAgICAgIC8vIG5lZWQgdG8gY29uc3RydWN0IGEgbWluaW1hbCBlbXB0eSBub2RlIGhlcmUgdG8gdXNlIGluc3RlYWQgb2YgdGhlXG4gICAgICAgICAgICAvLyBtaXNzaW5nIGBpdGVtLm5vZGVgLiAtLSBlZW1lbGkveWFtbCMxOVxuICAgICAgICAgICAgdmFsdWVOb2RlID0gbmV3IFBsYWluVmFsdWUuUGxhaW5WYWx1ZShQbGFpblZhbHVlLlR5cGUuUExBSU4sIFtdKTtcbiAgICAgICAgICAgIHZhbHVlTm9kZS5jb250ZXh0ID0ge1xuICAgICAgICAgICAgICBwYXJlbnQ6IGl0ZW0sXG4gICAgICAgICAgICAgIHNyYzogaXRlbS5jb250ZXh0LnNyY1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNvbnN0IHBvcyA9IGl0ZW0ucmFuZ2Uuc3RhcnQgKyAxO1xuICAgICAgICAgICAgdmFsdWVOb2RlLnJhbmdlID0ge1xuICAgICAgICAgICAgICBzdGFydDogcG9zLFxuICAgICAgICAgICAgICBlbmQ6IHBvc1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHZhbHVlTm9kZS52YWx1ZVJhbmdlID0ge1xuICAgICAgICAgICAgICBzdGFydDogcG9zLFxuICAgICAgICAgICAgICBlbmQ6IHBvc1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBpdGVtLnJhbmdlLm9yaWdTdGFydCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgY29uc3Qgb3JpZ1BvcyA9IGl0ZW0ucmFuZ2Uub3JpZ1N0YXJ0ICsgMTtcbiAgICAgICAgICAgICAgdmFsdWVOb2RlLnJhbmdlLm9yaWdTdGFydCA9IHZhbHVlTm9kZS5yYW5nZS5vcmlnRW5kID0gb3JpZ1BvcztcbiAgICAgICAgICAgICAgdmFsdWVOb2RlLnZhbHVlUmFuZ2Uub3JpZ1N0YXJ0ID0gdmFsdWVOb2RlLnZhbHVlUmFuZ2Uub3JpZ0VuZCA9IG9yaWdQb3M7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgcGFpciA9IG5ldyBQYWlyKGtleSwgcmVzb2x2ZU5vZGUoZG9jLCB2YWx1ZU5vZGUpKTtcbiAgICAgICAgICByZXNvbHZlUGFpckNvbW1lbnQoaXRlbSwgcGFpcik7XG4gICAgICAgICAgaXRlbXMucHVzaChwYWlyKTtcblxuICAgICAgICAgIGlmIChrZXkgJiYgdHlwZW9mIGtleVN0YXJ0ID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgaWYgKGl0ZW0ucmFuZ2Uuc3RhcnQgPiBrZXlTdGFydCArIDEwMjQpIGRvYy5lcnJvcnMucHVzaChnZXRMb25nS2V5RXJyb3IoY3N0LCBrZXkpKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBrZXkgPSB1bmRlZmluZWQ7XG4gICAgICAgICAga2V5U3RhcnQgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBpZiAoa2V5ICE9PSB1bmRlZmluZWQpIGl0ZW1zLnB1c2gobmV3IFBhaXIoa2V5KSk7XG4gICAgICAgIGtleSA9IHJlc29sdmVOb2RlKGRvYywgaXRlbSk7XG4gICAgICAgIGtleVN0YXJ0ID0gaXRlbS5yYW5nZS5zdGFydDtcbiAgICAgICAgaWYgKGl0ZW0uZXJyb3IpIGRvYy5lcnJvcnMucHVzaChpdGVtLmVycm9yKTtcblxuICAgICAgICBuZXh0OiBmb3IgKGxldCBqID0gaSArIDE7OyArK2opIHtcbiAgICAgICAgICBjb25zdCBuZXh0SXRlbSA9IGNzdC5pdGVtc1tqXTtcblxuICAgICAgICAgIHN3aXRjaCAobmV4dEl0ZW0gJiYgbmV4dEl0ZW0udHlwZSkge1xuICAgICAgICAgICAgY2FzZSBQbGFpblZhbHVlLlR5cGUuQkxBTktfTElORTpcbiAgICAgICAgICAgIGNhc2UgUGxhaW5WYWx1ZS5UeXBlLkNPTU1FTlQ6XG4gICAgICAgICAgICAgIGNvbnRpbnVlIG5leHQ7XG5cbiAgICAgICAgICAgIGNhc2UgUGxhaW5WYWx1ZS5UeXBlLk1BUF9WQUxVRTpcbiAgICAgICAgICAgICAgYnJlYWsgbmV4dDtcblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGNvbnN0IG1zZyA9ICdJbXBsaWNpdCBtYXAga2V5cyBuZWVkIHRvIGJlIGZvbGxvd2VkIGJ5IG1hcCB2YWx1ZXMnO1xuICAgICAgICAgICAgICAgIGRvYy5lcnJvcnMucHVzaChuZXcgUGxhaW5WYWx1ZS5ZQU1MU2VtYW50aWNFcnJvcihpdGVtLCBtc2cpKTtcbiAgICAgICAgICAgICAgICBicmVhayBuZXh0O1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGl0ZW0udmFsdWVSYW5nZUNvbnRhaW5zTmV3bGluZSkge1xuICAgICAgICAgIGNvbnN0IG1zZyA9ICdJbXBsaWNpdCBtYXAga2V5cyBuZWVkIHRvIGJlIG9uIGEgc2luZ2xlIGxpbmUnO1xuICAgICAgICAgIGRvYy5lcnJvcnMucHVzaChuZXcgUGxhaW5WYWx1ZS5ZQU1MU2VtYW50aWNFcnJvcihpdGVtLCBtc2cpKTtcbiAgICAgICAgfVxuXG4gICAgfVxuICB9XG5cbiAgaWYgKGtleSAhPT0gdW5kZWZpbmVkKSBpdGVtcy5wdXNoKG5ldyBQYWlyKGtleSkpO1xuICByZXR1cm4ge1xuICAgIGNvbW1lbnRzLFxuICAgIGl0ZW1zXG4gIH07XG59XG5cbmZ1bmN0aW9uIHJlc29sdmVGbG93TWFwSXRlbXMoZG9jLCBjc3QpIHtcbiAgY29uc3QgY29tbWVudHMgPSBbXTtcbiAgY29uc3QgaXRlbXMgPSBbXTtcbiAgbGV0IGtleSA9IHVuZGVmaW5lZDtcbiAgbGV0IGV4cGxpY2l0S2V5ID0gZmFsc2U7XG4gIGxldCBuZXh0ID0gJ3snO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY3N0Lml0ZW1zLmxlbmd0aDsgKytpKSB7XG4gICAgY29uc3QgaXRlbSA9IGNzdC5pdGVtc1tpXTtcblxuICAgIGlmICh0eXBlb2YgaXRlbS5jaGFyID09PSAnc3RyaW5nJykge1xuICAgICAgY29uc3Qge1xuICAgICAgICBjaGFyLFxuICAgICAgICBvZmZzZXRcbiAgICAgIH0gPSBpdGVtO1xuXG4gICAgICBpZiAoY2hhciA9PT0gJz8nICYmIGtleSA9PT0gdW5kZWZpbmVkICYmICFleHBsaWNpdEtleSkge1xuICAgICAgICBleHBsaWNpdEtleSA9IHRydWU7XG4gICAgICAgIG5leHQgPSAnOic7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAoY2hhciA9PT0gJzonKSB7XG4gICAgICAgIGlmIChrZXkgPT09IHVuZGVmaW5lZCkga2V5ID0gbnVsbDtcblxuICAgICAgICBpZiAobmV4dCA9PT0gJzonKSB7XG4gICAgICAgICAgbmV4dCA9ICcsJztcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGV4cGxpY2l0S2V5KSB7XG4gICAgICAgICAgaWYgKGtleSA9PT0gdW5kZWZpbmVkICYmIGNoYXIgIT09ICcsJykga2V5ID0gbnVsbDtcbiAgICAgICAgICBleHBsaWNpdEtleSA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGtleSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgaXRlbXMucHVzaChuZXcgUGFpcihrZXkpKTtcbiAgICAgICAgICBrZXkgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgICBpZiAoY2hhciA9PT0gJywnKSB7XG4gICAgICAgICAgICBuZXh0ID0gJzonO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChjaGFyID09PSAnfScpIHtcbiAgICAgICAgaWYgKGkgPT09IGNzdC5pdGVtcy5sZW5ndGggLSAxKSBjb250aW51ZTtcbiAgICAgIH0gZWxzZSBpZiAoY2hhciA9PT0gbmV4dCkge1xuICAgICAgICBuZXh0ID0gJzonO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgbXNnID0gYEZsb3cgbWFwIGNvbnRhaW5zIGFuIHVuZXhwZWN0ZWQgJHtjaGFyfWA7XG4gICAgICBjb25zdCBlcnIgPSBuZXcgUGxhaW5WYWx1ZS5ZQU1MU3ludGF4RXJyb3IoY3N0LCBtc2cpO1xuICAgICAgZXJyLm9mZnNldCA9IG9mZnNldDtcbiAgICAgIGRvYy5lcnJvcnMucHVzaChlcnIpO1xuICAgIH0gZWxzZSBpZiAoaXRlbS50eXBlID09PSBQbGFpblZhbHVlLlR5cGUuQkxBTktfTElORSkge1xuICAgICAgY29tbWVudHMucHVzaCh7XG4gICAgICAgIGFmdGVyS2V5OiAhIWtleSxcbiAgICAgICAgYmVmb3JlOiBpdGVtcy5sZW5ndGhcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoaXRlbS50eXBlID09PSBQbGFpblZhbHVlLlR5cGUuQ09NTUVOVCkge1xuICAgICAgY2hlY2tGbG93Q29tbWVudFNwYWNlKGRvYy5lcnJvcnMsIGl0ZW0pO1xuICAgICAgY29tbWVudHMucHVzaCh7XG4gICAgICAgIGFmdGVyS2V5OiAhIWtleSxcbiAgICAgICAgYmVmb3JlOiBpdGVtcy5sZW5ndGgsXG4gICAgICAgIGNvbW1lbnQ6IGl0ZW0uY29tbWVudFxuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChrZXkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKG5leHQgPT09ICcsJykgZG9jLmVycm9ycy5wdXNoKG5ldyBQbGFpblZhbHVlLllBTUxTZW1hbnRpY0Vycm9yKGl0ZW0sICdTZXBhcmF0b3IgLCBtaXNzaW5nIGluIGZsb3cgbWFwJykpO1xuICAgICAga2V5ID0gcmVzb2x2ZU5vZGUoZG9jLCBpdGVtKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKG5leHQgIT09ICcsJykgZG9jLmVycm9ycy5wdXNoKG5ldyBQbGFpblZhbHVlLllBTUxTZW1hbnRpY0Vycm9yKGl0ZW0sICdJbmRpY2F0b3IgOiBtaXNzaW5nIGluIGZsb3cgbWFwIGVudHJ5JykpO1xuICAgICAgaXRlbXMucHVzaChuZXcgUGFpcihrZXksIHJlc29sdmVOb2RlKGRvYywgaXRlbSkpKTtcbiAgICAgIGtleSA9IHVuZGVmaW5lZDtcbiAgICAgIGV4cGxpY2l0S2V5ID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgY2hlY2tGbG93Q29sbGVjdGlvbkVuZChkb2MuZXJyb3JzLCBjc3QpO1xuICBpZiAoa2V5ICE9PSB1bmRlZmluZWQpIGl0ZW1zLnB1c2gobmV3IFBhaXIoa2V5KSk7XG4gIHJldHVybiB7XG4gICAgY29tbWVudHMsXG4gICAgaXRlbXNcbiAgfTtcbn1cblxuZnVuY3Rpb24gcmVzb2x2ZVNlcShkb2MsIGNzdCkge1xuICBpZiAoY3N0LnR5cGUgIT09IFBsYWluVmFsdWUuVHlwZS5TRVEgJiYgY3N0LnR5cGUgIT09IFBsYWluVmFsdWUuVHlwZS5GTE9XX1NFUSkge1xuICAgIGNvbnN0IG1zZyA9IGBBICR7Y3N0LnR5cGV9IG5vZGUgY2Fubm90IGJlIHJlc29sdmVkIGFzIGEgc2VxdWVuY2VgO1xuICAgIGRvYy5lcnJvcnMucHVzaChuZXcgUGxhaW5WYWx1ZS5ZQU1MU3ludGF4RXJyb3IoY3N0LCBtc2cpKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGNvbnN0IHtcbiAgICBjb21tZW50cyxcbiAgICBpdGVtc1xuICB9ID0gY3N0LnR5cGUgPT09IFBsYWluVmFsdWUuVHlwZS5GTE9XX1NFUSA/IHJlc29sdmVGbG93U2VxSXRlbXMoZG9jLCBjc3QpIDogcmVzb2x2ZUJsb2NrU2VxSXRlbXMoZG9jLCBjc3QpO1xuICBjb25zdCBzZXEgPSBuZXcgWUFNTFNlcSgpO1xuICBzZXEuaXRlbXMgPSBpdGVtcztcbiAgcmVzb2x2ZUNvbW1lbnRzKHNlcSwgY29tbWVudHMpO1xuXG4gIGlmICghZG9jLm9wdGlvbnMubWFwQXNNYXAgJiYgaXRlbXMuc29tZShpdCA9PiBpdCBpbnN0YW5jZW9mIFBhaXIgJiYgaXQua2V5IGluc3RhbmNlb2YgQ29sbGVjdGlvbikpIHtcbiAgICBjb25zdCB3YXJuID0gJ0tleXMgd2l0aCBjb2xsZWN0aW9uIHZhbHVlcyB3aWxsIGJlIHN0cmluZ2lmaWVkIGFzIFlBTUwgZHVlIHRvIEpTIE9iamVjdCByZXN0cmljdGlvbnMuIFVzZSBtYXBBc01hcDogdHJ1ZSB0byBhdm9pZCB0aGlzLic7XG4gICAgZG9jLndhcm5pbmdzLnB1c2gobmV3IFBsYWluVmFsdWUuWUFNTFdhcm5pbmcoY3N0LCB3YXJuKSk7XG4gIH1cblxuICBjc3QucmVzb2x2ZWQgPSBzZXE7XG4gIHJldHVybiBzZXE7XG59XG5cbmZ1bmN0aW9uIHJlc29sdmVCbG9ja1NlcUl0ZW1zKGRvYywgY3N0KSB7XG4gIGNvbnN0IGNvbW1lbnRzID0gW107XG4gIGNvbnN0IGl0ZW1zID0gW107XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjc3QuaXRlbXMubGVuZ3RoOyArK2kpIHtcbiAgICBjb25zdCBpdGVtID0gY3N0Lml0ZW1zW2ldO1xuXG4gICAgc3dpdGNoIChpdGVtLnR5cGUpIHtcbiAgICAgIGNhc2UgUGxhaW5WYWx1ZS5UeXBlLkJMQU5LX0xJTkU6XG4gICAgICAgIGNvbW1lbnRzLnB1c2goe1xuICAgICAgICAgIGJlZm9yZTogaXRlbXMubGVuZ3RoXG4gICAgICAgIH0pO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBQbGFpblZhbHVlLlR5cGUuQ09NTUVOVDpcbiAgICAgICAgY29tbWVudHMucHVzaCh7XG4gICAgICAgICAgY29tbWVudDogaXRlbS5jb21tZW50LFxuICAgICAgICAgIGJlZm9yZTogaXRlbXMubGVuZ3RoXG4gICAgICAgIH0pO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBQbGFpblZhbHVlLlR5cGUuU0VRX0lURU06XG4gICAgICAgIGlmIChpdGVtLmVycm9yKSBkb2MuZXJyb3JzLnB1c2goaXRlbS5lcnJvcik7XG4gICAgICAgIGl0ZW1zLnB1c2gocmVzb2x2ZU5vZGUoZG9jLCBpdGVtLm5vZGUpKTtcblxuICAgICAgICBpZiAoaXRlbS5oYXNQcm9wcykge1xuICAgICAgICAgIGNvbnN0IG1zZyA9ICdTZXF1ZW5jZSBpdGVtcyBjYW5ub3QgaGF2ZSB0YWdzIG9yIGFuY2hvcnMgYmVmb3JlIHRoZSAtIGluZGljYXRvcic7XG4gICAgICAgICAgZG9jLmVycm9ycy5wdXNoKG5ldyBQbGFpblZhbHVlLllBTUxTZW1hbnRpY0Vycm9yKGl0ZW0sIG1zZykpO1xuICAgICAgICB9XG5cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGlmIChpdGVtLmVycm9yKSBkb2MuZXJyb3JzLnB1c2goaXRlbS5lcnJvcik7XG4gICAgICAgIGRvYy5lcnJvcnMucHVzaChuZXcgUGxhaW5WYWx1ZS5ZQU1MU3ludGF4RXJyb3IoaXRlbSwgYFVuZXhwZWN0ZWQgJHtpdGVtLnR5cGV9IG5vZGUgaW4gc2VxdWVuY2VgKSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBjb21tZW50cyxcbiAgICBpdGVtc1xuICB9O1xufVxuXG5mdW5jdGlvbiByZXNvbHZlRmxvd1NlcUl0ZW1zKGRvYywgY3N0KSB7XG4gIGNvbnN0IGNvbW1lbnRzID0gW107XG4gIGNvbnN0IGl0ZW1zID0gW107XG4gIGxldCBleHBsaWNpdEtleSA9IGZhbHNlO1xuICBsZXQga2V5ID0gdW5kZWZpbmVkO1xuICBsZXQga2V5U3RhcnQgPSBudWxsO1xuICBsZXQgbmV4dCA9ICdbJztcbiAgbGV0IHByZXZJdGVtID0gbnVsbDtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGNzdC5pdGVtcy5sZW5ndGg7ICsraSkge1xuICAgIGNvbnN0IGl0ZW0gPSBjc3QuaXRlbXNbaV07XG5cbiAgICBpZiAodHlwZW9mIGl0ZW0uY2hhciA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgY2hhcixcbiAgICAgICAgb2Zmc2V0XG4gICAgICB9ID0gaXRlbTtcblxuICAgICAgaWYgKGNoYXIgIT09ICc6JyAmJiAoZXhwbGljaXRLZXkgfHwga2V5ICE9PSB1bmRlZmluZWQpKSB7XG4gICAgICAgIGlmIChleHBsaWNpdEtleSAmJiBrZXkgPT09IHVuZGVmaW5lZCkga2V5ID0gbmV4dCA/IGl0ZW1zLnBvcCgpIDogbnVsbDtcbiAgICAgICAgaXRlbXMucHVzaChuZXcgUGFpcihrZXkpKTtcbiAgICAgICAgZXhwbGljaXRLZXkgPSBmYWxzZTtcbiAgICAgICAga2V5ID0gdW5kZWZpbmVkO1xuICAgICAgICBrZXlTdGFydCA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIGlmIChjaGFyID09PSBuZXh0KSB7XG4gICAgICAgIG5leHQgPSBudWxsO1xuICAgICAgfSBlbHNlIGlmICghbmV4dCAmJiBjaGFyID09PSAnPycpIHtcbiAgICAgICAgZXhwbGljaXRLZXkgPSB0cnVlO1xuICAgICAgfSBlbHNlIGlmIChuZXh0ICE9PSAnWycgJiYgY2hhciA9PT0gJzonICYmIGtleSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChuZXh0ID09PSAnLCcpIHtcbiAgICAgICAgICBrZXkgPSBpdGVtcy5wb3AoKTtcblxuICAgICAgICAgIGlmIChrZXkgaW5zdGFuY2VvZiBQYWlyKSB7XG4gICAgICAgICAgICBjb25zdCBtc2cgPSAnQ2hhaW5pbmcgZmxvdyBzZXF1ZW5jZSBwYWlycyBpcyBpbnZhbGlkJztcbiAgICAgICAgICAgIGNvbnN0IGVyciA9IG5ldyBQbGFpblZhbHVlLllBTUxTZW1hbnRpY0Vycm9yKGNzdCwgbXNnKTtcbiAgICAgICAgICAgIGVyci5vZmZzZXQgPSBvZmZzZXQ7XG4gICAgICAgICAgICBkb2MuZXJyb3JzLnB1c2goZXJyKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoIWV4cGxpY2l0S2V5ICYmIHR5cGVvZiBrZXlTdGFydCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIGNvbnN0IGtleUVuZCA9IGl0ZW0ucmFuZ2UgPyBpdGVtLnJhbmdlLnN0YXJ0IDogaXRlbS5vZmZzZXQ7XG4gICAgICAgICAgICBpZiAoa2V5RW5kID4ga2V5U3RhcnQgKyAxMDI0KSBkb2MuZXJyb3JzLnB1c2goZ2V0TG9uZ0tleUVycm9yKGNzdCwga2V5KSk7XG4gICAgICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICAgIHNyY1xuICAgICAgICAgICAgfSA9IHByZXZJdGVtLmNvbnRleHQ7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSBrZXlTdGFydDsgaSA8IGtleUVuZDsgKytpKSBpZiAoc3JjW2ldID09PSAnXFxuJykge1xuICAgICAgICAgICAgICBjb25zdCBtc2cgPSAnSW1wbGljaXQga2V5cyBvZiBmbG93IHNlcXVlbmNlIHBhaXJzIG5lZWQgdG8gYmUgb24gYSBzaW5nbGUgbGluZSc7XG4gICAgICAgICAgICAgIGRvYy5lcnJvcnMucHVzaChuZXcgUGxhaW5WYWx1ZS5ZQU1MU2VtYW50aWNFcnJvcihwcmV2SXRlbSwgbXNnKSk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBrZXkgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAga2V5U3RhcnQgPSBudWxsO1xuICAgICAgICBleHBsaWNpdEtleSA9IGZhbHNlO1xuICAgICAgICBuZXh0ID0gbnVsbDtcbiAgICAgIH0gZWxzZSBpZiAobmV4dCA9PT0gJ1snIHx8IGNoYXIgIT09ICddJyB8fCBpIDwgY3N0Lml0ZW1zLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgY29uc3QgbXNnID0gYEZsb3cgc2VxdWVuY2UgY29udGFpbnMgYW4gdW5leHBlY3RlZCAke2NoYXJ9YDtcbiAgICAgICAgY29uc3QgZXJyID0gbmV3IFBsYWluVmFsdWUuWUFNTFN5bnRheEVycm9yKGNzdCwgbXNnKTtcbiAgICAgICAgZXJyLm9mZnNldCA9IG9mZnNldDtcbiAgICAgICAgZG9jLmVycm9ycy5wdXNoKGVycik7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChpdGVtLnR5cGUgPT09IFBsYWluVmFsdWUuVHlwZS5CTEFOS19MSU5FKSB7XG4gICAgICBjb21tZW50cy5wdXNoKHtcbiAgICAgICAgYmVmb3JlOiBpdGVtcy5sZW5ndGhcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoaXRlbS50eXBlID09PSBQbGFpblZhbHVlLlR5cGUuQ09NTUVOVCkge1xuICAgICAgY2hlY2tGbG93Q29tbWVudFNwYWNlKGRvYy5lcnJvcnMsIGl0ZW0pO1xuICAgICAgY29tbWVudHMucHVzaCh7XG4gICAgICAgIGNvbW1lbnQ6IGl0ZW0uY29tbWVudCxcbiAgICAgICAgYmVmb3JlOiBpdGVtcy5sZW5ndGhcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAobmV4dCkge1xuICAgICAgICBjb25zdCBtc2cgPSBgRXhwZWN0ZWQgYSAke25leHR9IGluIGZsb3cgc2VxdWVuY2VgO1xuICAgICAgICBkb2MuZXJyb3JzLnB1c2gobmV3IFBsYWluVmFsdWUuWUFNTFNlbWFudGljRXJyb3IoaXRlbSwgbXNnKSk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHZhbHVlID0gcmVzb2x2ZU5vZGUoZG9jLCBpdGVtKTtcblxuICAgICAgaWYgKGtleSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGl0ZW1zLnB1c2godmFsdWUpO1xuICAgICAgICBwcmV2SXRlbSA9IGl0ZW07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpdGVtcy5wdXNoKG5ldyBQYWlyKGtleSwgdmFsdWUpKTtcbiAgICAgICAga2V5ID0gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgICBrZXlTdGFydCA9IGl0ZW0ucmFuZ2Uuc3RhcnQ7XG4gICAgICBuZXh0ID0gJywnO1xuICAgIH1cbiAgfVxuXG4gIGNoZWNrRmxvd0NvbGxlY3Rpb25FbmQoZG9jLmVycm9ycywgY3N0KTtcbiAgaWYgKGtleSAhPT0gdW5kZWZpbmVkKSBpdGVtcy5wdXNoKG5ldyBQYWlyKGtleSkpO1xuICByZXR1cm4ge1xuICAgIGNvbW1lbnRzLFxuICAgIGl0ZW1zXG4gIH07XG59XG5cbmV4cG9ydHMuQWxpYXMgPSBBbGlhcztcbmV4cG9ydHMuQ29sbGVjdGlvbiA9IENvbGxlY3Rpb247XG5leHBvcnRzLk1lcmdlID0gTWVyZ2U7XG5leHBvcnRzLk5vZGUgPSBOb2RlO1xuZXhwb3J0cy5QYWlyID0gUGFpcjtcbmV4cG9ydHMuU2NhbGFyID0gU2NhbGFyO1xuZXhwb3J0cy5ZQU1MTWFwID0gWUFNTE1hcDtcbmV4cG9ydHMuWUFNTFNlcSA9IFlBTUxTZXE7XG5leHBvcnRzLmFkZENvbW1lbnQgPSBhZGRDb21tZW50O1xuZXhwb3J0cy5iaW5hcnlPcHRpb25zID0gYmluYXJ5T3B0aW9ucztcbmV4cG9ydHMuYm9vbE9wdGlvbnMgPSBib29sT3B0aW9ucztcbmV4cG9ydHMuZmluZFBhaXIgPSBmaW5kUGFpcjtcbmV4cG9ydHMuaW50T3B0aW9ucyA9IGludE9wdGlvbnM7XG5leHBvcnRzLmlzRW1wdHlQYXRoID0gaXNFbXB0eVBhdGg7XG5leHBvcnRzLm51bGxPcHRpb25zID0gbnVsbE9wdGlvbnM7XG5leHBvcnRzLnJlc29sdmVNYXAgPSByZXNvbHZlTWFwO1xuZXhwb3J0cy5yZXNvbHZlTm9kZSA9IHJlc29sdmVOb2RlO1xuZXhwb3J0cy5yZXNvbHZlU2VxID0gcmVzb2x2ZVNlcTtcbmV4cG9ydHMucmVzb2x2ZVN0cmluZyA9IHJlc29sdmVTdHJpbmc7XG5leHBvcnRzLnN0ck9wdGlvbnMgPSBzdHJPcHRpb25zO1xuZXhwb3J0cy5zdHJpbmdpZnlOdW1iZXIgPSBzdHJpbmdpZnlOdW1iZXI7XG5leHBvcnRzLnN0cmluZ2lmeVN0cmluZyA9IHN0cmluZ2lmeVN0cmluZztcbmV4cG9ydHMudG9KU09OID0gdG9KU09OO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgUGxhaW5WYWx1ZSA9IHJlcXVpcmUoJy4vUGxhaW5WYWx1ZS1lYzhlNTg4ZS5qcycpO1xudmFyIHJlc29sdmVTZXEgPSByZXF1aXJlKCcuL3Jlc29sdmVTZXEtZDAzY2IwMzcuanMnKTtcblxuLyogZ2xvYmFsIGF0b2IsIGJ0b2EsIEJ1ZmZlciAqL1xuY29uc3QgYmluYXJ5ID0ge1xuICBpZGVudGlmeTogdmFsdWUgPT4gdmFsdWUgaW5zdGFuY2VvZiBVaW50OEFycmF5LFxuICAvLyBCdWZmZXIgaW5oZXJpdHMgZnJvbSBVaW50OEFycmF5XG4gIGRlZmF1bHQ6IGZhbHNlLFxuICB0YWc6ICd0YWc6eWFtbC5vcmcsMjAwMjpiaW5hcnknLFxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgQnVmZmVyIGluIG5vZGUgYW5kIGFuIFVpbnQ4QXJyYXkgaW4gYnJvd3NlcnNcbiAgICpcbiAgICogVG8gdXNlIHRoZSByZXN1bHRpbmcgYnVmZmVyIGFzIGFuIGltYWdlLCB5b3UnbGwgd2FudCB0byBkbyBzb21ldGhpbmcgbGlrZTpcbiAgICpcbiAgICogICBjb25zdCBibG9iID0gbmV3IEJsb2IoW2J1ZmZlcl0sIHsgdHlwZTogJ2ltYWdlL2pwZWcnIH0pXG4gICAqICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Bob3RvJykuc3JjID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKVxuICAgKi9cbiAgcmVzb2x2ZTogKGRvYywgbm9kZSkgPT4ge1xuICAgIGNvbnN0IHNyYyA9IHJlc29sdmVTZXEucmVzb2x2ZVN0cmluZyhkb2MsIG5vZGUpO1xuXG4gICAgaWYgKHR5cGVvZiBCdWZmZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiBCdWZmZXIuZnJvbShzcmMsICdiYXNlNjQnKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBhdG9iID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAvLyBPbiBJRSAxMSwgYXRvYigpIGNhbid0IGhhbmRsZSBuZXdsaW5lc1xuICAgICAgY29uc3Qgc3RyID0gYXRvYihzcmMucmVwbGFjZSgvW1xcblxccl0vZywgJycpKTtcbiAgICAgIGNvbnN0IGJ1ZmZlciA9IG5ldyBVaW50OEFycmF5KHN0ci5sZW5ndGgpO1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0ci5sZW5ndGg7ICsraSkgYnVmZmVyW2ldID0gc3RyLmNoYXJDb2RlQXQoaSk7XG5cbiAgICAgIHJldHVybiBidWZmZXI7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IG1zZyA9ICdUaGlzIGVudmlyb25tZW50IGRvZXMgbm90IHN1cHBvcnQgcmVhZGluZyBiaW5hcnkgdGFnczsgZWl0aGVyIEJ1ZmZlciBvciBhdG9iIGlzIHJlcXVpcmVkJztcbiAgICAgIGRvYy5lcnJvcnMucHVzaChuZXcgUGxhaW5WYWx1ZS5ZQU1MUmVmZXJlbmNlRXJyb3Iobm9kZSwgbXNnKSk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH0sXG4gIG9wdGlvbnM6IHJlc29sdmVTZXEuYmluYXJ5T3B0aW9ucyxcbiAgc3RyaW5naWZ5OiAoe1xuICAgIGNvbW1lbnQsXG4gICAgdHlwZSxcbiAgICB2YWx1ZVxuICB9LCBjdHgsIG9uQ29tbWVudCwgb25DaG9tcEtlZXApID0+IHtcbiAgICBsZXQgc3JjO1xuXG4gICAgaWYgKHR5cGVvZiBCdWZmZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHNyYyA9IHZhbHVlIGluc3RhbmNlb2YgQnVmZmVyID8gdmFsdWUudG9TdHJpbmcoJ2Jhc2U2NCcpIDogQnVmZmVyLmZyb20odmFsdWUuYnVmZmVyKS50b1N0cmluZygnYmFzZTY0Jyk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgYnRvYSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgbGV0IHMgPSAnJztcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2YWx1ZS5sZW5ndGg7ICsraSkgcyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKHZhbHVlW2ldKTtcblxuICAgICAgc3JjID0gYnRvYShzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGlzIGVudmlyb25tZW50IGRvZXMgbm90IHN1cHBvcnQgd3JpdGluZyBiaW5hcnkgdGFnczsgZWl0aGVyIEJ1ZmZlciBvciBidG9hIGlzIHJlcXVpcmVkJyk7XG4gICAgfVxuXG4gICAgaWYgKCF0eXBlKSB0eXBlID0gcmVzb2x2ZVNlcS5iaW5hcnlPcHRpb25zLmRlZmF1bHRUeXBlO1xuXG4gICAgaWYgKHR5cGUgPT09IFBsYWluVmFsdWUuVHlwZS5RVU9URV9ET1VCTEUpIHtcbiAgICAgIHZhbHVlID0gc3JjO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIGxpbmVXaWR0aFxuICAgICAgfSA9IHJlc29sdmVTZXEuYmluYXJ5T3B0aW9ucztcbiAgICAgIGNvbnN0IG4gPSBNYXRoLmNlaWwoc3JjLmxlbmd0aCAvIGxpbmVXaWR0aCk7XG4gICAgICBjb25zdCBsaW5lcyA9IG5ldyBBcnJheShuKTtcblxuICAgICAgZm9yIChsZXQgaSA9IDAsIG8gPSAwOyBpIDwgbjsgKytpLCBvICs9IGxpbmVXaWR0aCkge1xuICAgICAgICBsaW5lc1tpXSA9IHNyYy5zdWJzdHIobywgbGluZVdpZHRoKTtcbiAgICAgIH1cblxuICAgICAgdmFsdWUgPSBsaW5lcy5qb2luKHR5cGUgPT09IFBsYWluVmFsdWUuVHlwZS5CTE9DS19MSVRFUkFMID8gJ1xcbicgOiAnICcpO1xuICAgIH1cblxuICAgIHJldHVybiByZXNvbHZlU2VxLnN0cmluZ2lmeVN0cmluZyh7XG4gICAgICBjb21tZW50LFxuICAgICAgdHlwZSxcbiAgICAgIHZhbHVlXG4gICAgfSwgY3R4LCBvbkNvbW1lbnQsIG9uQ2hvbXBLZWVwKTtcbiAgfVxufTtcblxuZnVuY3Rpb24gcGFyc2VQYWlycyhkb2MsIGNzdCkge1xuICBjb25zdCBzZXEgPSByZXNvbHZlU2VxLnJlc29sdmVTZXEoZG9jLCBjc3QpO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc2VxLml0ZW1zLmxlbmd0aDsgKytpKSB7XG4gICAgbGV0IGl0ZW0gPSBzZXEuaXRlbXNbaV07XG4gICAgaWYgKGl0ZW0gaW5zdGFuY2VvZiByZXNvbHZlU2VxLlBhaXIpIGNvbnRpbnVlO2Vsc2UgaWYgKGl0ZW0gaW5zdGFuY2VvZiByZXNvbHZlU2VxLllBTUxNYXApIHtcbiAgICAgIGlmIChpdGVtLml0ZW1zLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgY29uc3QgbXNnID0gJ0VhY2ggcGFpciBtdXN0IGhhdmUgaXRzIG93biBzZXF1ZW5jZSBpbmRpY2F0b3InO1xuICAgICAgICB0aHJvdyBuZXcgUGxhaW5WYWx1ZS5ZQU1MU2VtYW50aWNFcnJvcihjc3QsIG1zZyk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHBhaXIgPSBpdGVtLml0ZW1zWzBdIHx8IG5ldyByZXNvbHZlU2VxLlBhaXIoKTtcbiAgICAgIGlmIChpdGVtLmNvbW1lbnRCZWZvcmUpIHBhaXIuY29tbWVudEJlZm9yZSA9IHBhaXIuY29tbWVudEJlZm9yZSA/IGAke2l0ZW0uY29tbWVudEJlZm9yZX1cXG4ke3BhaXIuY29tbWVudEJlZm9yZX1gIDogaXRlbS5jb21tZW50QmVmb3JlO1xuICAgICAgaWYgKGl0ZW0uY29tbWVudCkgcGFpci5jb21tZW50ID0gcGFpci5jb21tZW50ID8gYCR7aXRlbS5jb21tZW50fVxcbiR7cGFpci5jb21tZW50fWAgOiBpdGVtLmNvbW1lbnQ7XG4gICAgICBpdGVtID0gcGFpcjtcbiAgICB9XG4gICAgc2VxLml0ZW1zW2ldID0gaXRlbSBpbnN0YW5jZW9mIHJlc29sdmVTZXEuUGFpciA/IGl0ZW0gOiBuZXcgcmVzb2x2ZVNlcS5QYWlyKGl0ZW0pO1xuICB9XG5cbiAgcmV0dXJuIHNlcTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZVBhaXJzKHNjaGVtYSwgaXRlcmFibGUsIGN0eCkge1xuICBjb25zdCBwYWlycyA9IG5ldyByZXNvbHZlU2VxLllBTUxTZXEoc2NoZW1hKTtcbiAgcGFpcnMudGFnID0gJ3RhZzp5YW1sLm9yZywyMDAyOnBhaXJzJztcblxuICBmb3IgKGNvbnN0IGl0IG9mIGl0ZXJhYmxlKSB7XG4gICAgbGV0IGtleSwgdmFsdWU7XG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheShpdCkpIHtcbiAgICAgIGlmIChpdC5sZW5ndGggPT09IDIpIHtcbiAgICAgICAga2V5ID0gaXRbMF07XG4gICAgICAgIHZhbHVlID0gaXRbMV07XG4gICAgICB9IGVsc2UgdGhyb3cgbmV3IFR5cGVFcnJvcihgRXhwZWN0ZWQgW2tleSwgdmFsdWVdIHR1cGxlOiAke2l0fWApO1xuICAgIH0gZWxzZSBpZiAoaXQgJiYgaXQgaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhpdCk7XG5cbiAgICAgIGlmIChrZXlzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICBrZXkgPSBrZXlzWzBdO1xuICAgICAgICB2YWx1ZSA9IGl0W2tleV07XG4gICAgICB9IGVsc2UgdGhyb3cgbmV3IFR5cGVFcnJvcihgRXhwZWN0ZWQgeyBrZXk6IHZhbHVlIH0gdHVwbGU6ICR7aXR9YCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGtleSA9IGl0O1xuICAgIH1cblxuICAgIGNvbnN0IHBhaXIgPSBzY2hlbWEuY3JlYXRlUGFpcihrZXksIHZhbHVlLCBjdHgpO1xuICAgIHBhaXJzLml0ZW1zLnB1c2gocGFpcik7XG4gIH1cblxuICByZXR1cm4gcGFpcnM7XG59XG5jb25zdCBwYWlycyA9IHtcbiAgZGVmYXVsdDogZmFsc2UsXG4gIHRhZzogJ3RhZzp5YW1sLm9yZywyMDAyOnBhaXJzJyxcbiAgcmVzb2x2ZTogcGFyc2VQYWlycyxcbiAgY3JlYXRlTm9kZTogY3JlYXRlUGFpcnNcbn07XG5cbmNsYXNzIFlBTUxPTWFwIGV4dGVuZHMgcmVzb2x2ZVNlcS5ZQU1MU2VxIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIFBsYWluVmFsdWUuX2RlZmluZVByb3BlcnR5KHRoaXMsIFwiYWRkXCIsIHJlc29sdmVTZXEuWUFNTE1hcC5wcm90b3R5cGUuYWRkLmJpbmQodGhpcykpO1xuXG4gICAgUGxhaW5WYWx1ZS5fZGVmaW5lUHJvcGVydHkodGhpcywgXCJkZWxldGVcIiwgcmVzb2x2ZVNlcS5ZQU1MTWFwLnByb3RvdHlwZS5kZWxldGUuYmluZCh0aGlzKSk7XG5cbiAgICBQbGFpblZhbHVlLl9kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcImdldFwiLCByZXNvbHZlU2VxLllBTUxNYXAucHJvdG90eXBlLmdldC5iaW5kKHRoaXMpKTtcblxuICAgIFBsYWluVmFsdWUuX2RlZmluZVByb3BlcnR5KHRoaXMsIFwiaGFzXCIsIHJlc29sdmVTZXEuWUFNTE1hcC5wcm90b3R5cGUuaGFzLmJpbmQodGhpcykpO1xuXG4gICAgUGxhaW5WYWx1ZS5fZGVmaW5lUHJvcGVydHkodGhpcywgXCJzZXRcIiwgcmVzb2x2ZVNlcS5ZQU1MTWFwLnByb3RvdHlwZS5zZXQuYmluZCh0aGlzKSk7XG5cbiAgICB0aGlzLnRhZyA9IFlBTUxPTWFwLnRhZztcbiAgfVxuXG4gIHRvSlNPTihfLCBjdHgpIHtcbiAgICBjb25zdCBtYXAgPSBuZXcgTWFwKCk7XG4gICAgaWYgKGN0eCAmJiBjdHgub25DcmVhdGUpIGN0eC5vbkNyZWF0ZShtYXApO1xuXG4gICAgZm9yIChjb25zdCBwYWlyIG9mIHRoaXMuaXRlbXMpIHtcbiAgICAgIGxldCBrZXksIHZhbHVlO1xuXG4gICAgICBpZiAocGFpciBpbnN0YW5jZW9mIHJlc29sdmVTZXEuUGFpcikge1xuICAgICAgICBrZXkgPSByZXNvbHZlU2VxLnRvSlNPTihwYWlyLmtleSwgJycsIGN0eCk7XG4gICAgICAgIHZhbHVlID0gcmVzb2x2ZVNlcS50b0pTT04ocGFpci52YWx1ZSwga2V5LCBjdHgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAga2V5ID0gcmVzb2x2ZVNlcS50b0pTT04ocGFpciwgJycsIGN0eCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChtYXAuaGFzKGtleSkpIHRocm93IG5ldyBFcnJvcignT3JkZXJlZCBtYXBzIG11c3Qgbm90IGluY2x1ZGUgZHVwbGljYXRlIGtleXMnKTtcbiAgICAgIG1hcC5zZXQoa2V5LCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1hcDtcbiAgfVxuXG59XG5cblBsYWluVmFsdWUuX2RlZmluZVByb3BlcnR5KFlBTUxPTWFwLCBcInRhZ1wiLCAndGFnOnlhbWwub3JnLDIwMDI6b21hcCcpO1xuXG5mdW5jdGlvbiBwYXJzZU9NYXAoZG9jLCBjc3QpIHtcbiAgY29uc3QgcGFpcnMgPSBwYXJzZVBhaXJzKGRvYywgY3N0KTtcbiAgY29uc3Qgc2VlbktleXMgPSBbXTtcblxuICBmb3IgKGNvbnN0IHtcbiAgICBrZXlcbiAgfSBvZiBwYWlycy5pdGVtcykge1xuICAgIGlmIChrZXkgaW5zdGFuY2VvZiByZXNvbHZlU2VxLlNjYWxhcikge1xuICAgICAgaWYgKHNlZW5LZXlzLmluY2x1ZGVzKGtleS52YWx1ZSkpIHtcbiAgICAgICAgY29uc3QgbXNnID0gJ09yZGVyZWQgbWFwcyBtdXN0IG5vdCBpbmNsdWRlIGR1cGxpY2F0ZSBrZXlzJztcbiAgICAgICAgdGhyb3cgbmV3IFBsYWluVmFsdWUuWUFNTFNlbWFudGljRXJyb3IoY3N0LCBtc2cpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2VlbktleXMucHVzaChrZXkudmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBPYmplY3QuYXNzaWduKG5ldyBZQU1MT01hcCgpLCBwYWlycyk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZU9NYXAoc2NoZW1hLCBpdGVyYWJsZSwgY3R4KSB7XG4gIGNvbnN0IHBhaXJzID0gY3JlYXRlUGFpcnMoc2NoZW1hLCBpdGVyYWJsZSwgY3R4KTtcbiAgY29uc3Qgb21hcCA9IG5ldyBZQU1MT01hcCgpO1xuICBvbWFwLml0ZW1zID0gcGFpcnMuaXRlbXM7XG4gIHJldHVybiBvbWFwO1xufVxuXG5jb25zdCBvbWFwID0ge1xuICBpZGVudGlmeTogdmFsdWUgPT4gdmFsdWUgaW5zdGFuY2VvZiBNYXAsXG4gIG5vZGVDbGFzczogWUFNTE9NYXAsXG4gIGRlZmF1bHQ6IGZhbHNlLFxuICB0YWc6ICd0YWc6eWFtbC5vcmcsMjAwMjpvbWFwJyxcbiAgcmVzb2x2ZTogcGFyc2VPTWFwLFxuICBjcmVhdGVOb2RlOiBjcmVhdGVPTWFwXG59O1xuXG5jbGFzcyBZQU1MU2V0IGV4dGVuZHMgcmVzb2x2ZVNlcS5ZQU1MTWFwIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnRhZyA9IFlBTUxTZXQudGFnO1xuICB9XG5cbiAgYWRkKGtleSkge1xuICAgIGNvbnN0IHBhaXIgPSBrZXkgaW5zdGFuY2VvZiByZXNvbHZlU2VxLlBhaXIgPyBrZXkgOiBuZXcgcmVzb2x2ZVNlcS5QYWlyKGtleSk7XG4gICAgY29uc3QgcHJldiA9IHJlc29sdmVTZXEuZmluZFBhaXIodGhpcy5pdGVtcywgcGFpci5rZXkpO1xuICAgIGlmICghcHJldikgdGhpcy5pdGVtcy5wdXNoKHBhaXIpO1xuICB9XG5cbiAgZ2V0KGtleSwga2VlcFBhaXIpIHtcbiAgICBjb25zdCBwYWlyID0gcmVzb2x2ZVNlcS5maW5kUGFpcih0aGlzLml0ZW1zLCBrZXkpO1xuICAgIHJldHVybiAha2VlcFBhaXIgJiYgcGFpciBpbnN0YW5jZW9mIHJlc29sdmVTZXEuUGFpciA/IHBhaXIua2V5IGluc3RhbmNlb2YgcmVzb2x2ZVNlcS5TY2FsYXIgPyBwYWlyLmtleS52YWx1ZSA6IHBhaXIua2V5IDogcGFpcjtcbiAgfVxuXG4gIHNldChrZXksIHZhbHVlKSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ2Jvb2xlYW4nKSB0aHJvdyBuZXcgRXJyb3IoYEV4cGVjdGVkIGJvb2xlYW4gdmFsdWUgZm9yIHNldChrZXksIHZhbHVlKSBpbiBhIFlBTUwgc2V0LCBub3QgJHt0eXBlb2YgdmFsdWV9YCk7XG4gICAgY29uc3QgcHJldiA9IHJlc29sdmVTZXEuZmluZFBhaXIodGhpcy5pdGVtcywga2V5KTtcblxuICAgIGlmIChwcmV2ICYmICF2YWx1ZSkge1xuICAgICAgdGhpcy5pdGVtcy5zcGxpY2UodGhpcy5pdGVtcy5pbmRleE9mKHByZXYpLCAxKTtcbiAgICB9IGVsc2UgaWYgKCFwcmV2ICYmIHZhbHVlKSB7XG4gICAgICB0aGlzLml0ZW1zLnB1c2gobmV3IHJlc29sdmVTZXEuUGFpcihrZXkpKTtcbiAgICB9XG4gIH1cblxuICB0b0pTT04oXywgY3R4KSB7XG4gICAgcmV0dXJuIHN1cGVyLnRvSlNPTihfLCBjdHgsIFNldCk7XG4gIH1cblxuICB0b1N0cmluZyhjdHgsIG9uQ29tbWVudCwgb25DaG9tcEtlZXApIHtcbiAgICBpZiAoIWN0eCkgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHRoaXMpO1xuICAgIGlmICh0aGlzLmhhc0FsbE51bGxWYWx1ZXMoKSkgcmV0dXJuIHN1cGVyLnRvU3RyaW5nKGN0eCwgb25Db21tZW50LCBvbkNob21wS2VlcCk7ZWxzZSB0aHJvdyBuZXcgRXJyb3IoJ1NldCBpdGVtcyBtdXN0IGFsbCBoYXZlIG51bGwgdmFsdWVzJyk7XG4gIH1cblxufVxuXG5QbGFpblZhbHVlLl9kZWZpbmVQcm9wZXJ0eShZQU1MU2V0LCBcInRhZ1wiLCAndGFnOnlhbWwub3JnLDIwMDI6c2V0Jyk7XG5cbmZ1bmN0aW9uIHBhcnNlU2V0KGRvYywgY3N0KSB7XG4gIGNvbnN0IG1hcCA9IHJlc29sdmVTZXEucmVzb2x2ZU1hcChkb2MsIGNzdCk7XG4gIGlmICghbWFwLmhhc0FsbE51bGxWYWx1ZXMoKSkgdGhyb3cgbmV3IFBsYWluVmFsdWUuWUFNTFNlbWFudGljRXJyb3IoY3N0LCAnU2V0IGl0ZW1zIG11c3QgYWxsIGhhdmUgbnVsbCB2YWx1ZXMnKTtcbiAgcmV0dXJuIE9iamVjdC5hc3NpZ24obmV3IFlBTUxTZXQoKSwgbWFwKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlU2V0KHNjaGVtYSwgaXRlcmFibGUsIGN0eCkge1xuICBjb25zdCBzZXQgPSBuZXcgWUFNTFNldCgpO1xuXG4gIGZvciAoY29uc3QgdmFsdWUgb2YgaXRlcmFibGUpIHNldC5pdGVtcy5wdXNoKHNjaGVtYS5jcmVhdGVQYWlyKHZhbHVlLCBudWxsLCBjdHgpKTtcblxuICByZXR1cm4gc2V0O1xufVxuXG5jb25zdCBzZXQgPSB7XG4gIGlkZW50aWZ5OiB2YWx1ZSA9PiB2YWx1ZSBpbnN0YW5jZW9mIFNldCxcbiAgbm9kZUNsYXNzOiBZQU1MU2V0LFxuICBkZWZhdWx0OiBmYWxzZSxcbiAgdGFnOiAndGFnOnlhbWwub3JnLDIwMDI6c2V0JyxcbiAgcmVzb2x2ZTogcGFyc2VTZXQsXG4gIGNyZWF0ZU5vZGU6IGNyZWF0ZVNldFxufTtcblxuY29uc3QgcGFyc2VTZXhhZ2VzaW1hbCA9IChzaWduLCBwYXJ0cykgPT4ge1xuICBjb25zdCBuID0gcGFydHMuc3BsaXQoJzonKS5yZWR1Y2UoKG4sIHApID0+IG4gKiA2MCArIE51bWJlcihwKSwgMCk7XG4gIHJldHVybiBzaWduID09PSAnLScgPyAtbiA6IG47XG59OyAvLyBoaGhoOm1tOnNzLnNzc1xuXG5cbmNvbnN0IHN0cmluZ2lmeVNleGFnZXNpbWFsID0gKHtcbiAgdmFsdWVcbn0pID0+IHtcbiAgaWYgKGlzTmFOKHZhbHVlKSB8fCAhaXNGaW5pdGUodmFsdWUpKSByZXR1cm4gcmVzb2x2ZVNlcS5zdHJpbmdpZnlOdW1iZXIodmFsdWUpO1xuICBsZXQgc2lnbiA9ICcnO1xuXG4gIGlmICh2YWx1ZSA8IDApIHtcbiAgICBzaWduID0gJy0nO1xuICAgIHZhbHVlID0gTWF0aC5hYnModmFsdWUpO1xuICB9XG5cbiAgY29uc3QgcGFydHMgPSBbdmFsdWUgJSA2MF07IC8vIHNlY29uZHMsIGluY2x1ZGluZyBtc1xuXG4gIGlmICh2YWx1ZSA8IDYwKSB7XG4gICAgcGFydHMudW5zaGlmdCgwKTsgLy8gYXQgbGVhc3Qgb25lIDogaXMgcmVxdWlyZWRcbiAgfSBlbHNlIHtcbiAgICB2YWx1ZSA9IE1hdGgucm91bmQoKHZhbHVlIC0gcGFydHNbMF0pIC8gNjApO1xuICAgIHBhcnRzLnVuc2hpZnQodmFsdWUgJSA2MCk7IC8vIG1pbnV0ZXNcblxuICAgIGlmICh2YWx1ZSA+PSA2MCkge1xuICAgICAgdmFsdWUgPSBNYXRoLnJvdW5kKCh2YWx1ZSAtIHBhcnRzWzBdKSAvIDYwKTtcbiAgICAgIHBhcnRzLnVuc2hpZnQodmFsdWUpOyAvLyBob3Vyc1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBzaWduICsgcGFydHMubWFwKG4gPT4gbiA8IDEwID8gJzAnICsgU3RyaW5nKG4pIDogU3RyaW5nKG4pKS5qb2luKCc6JykucmVwbGFjZSgvMDAwMDAwXFxkKiQvLCAnJykgLy8gJSA2MCBtYXkgaW50cm9kdWNlIGVycm9yXG4gIDtcbn07XG5cbmNvbnN0IGludFRpbWUgPSB7XG4gIGlkZW50aWZ5OiB2YWx1ZSA9PiB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInLFxuICBkZWZhdWx0OiB0cnVlLFxuICB0YWc6ICd0YWc6eWFtbC5vcmcsMjAwMjppbnQnLFxuICBmb3JtYXQ6ICdUSU1FJyxcbiAgdGVzdDogL14oWy0rXT8pKFswLTldWzAtOV9dKig/OjpbMC01XT9bMC05XSkrKSQvLFxuICByZXNvbHZlOiAoc3RyLCBzaWduLCBwYXJ0cykgPT4gcGFyc2VTZXhhZ2VzaW1hbChzaWduLCBwYXJ0cy5yZXBsYWNlKC9fL2csICcnKSksXG4gIHN0cmluZ2lmeTogc3RyaW5naWZ5U2V4YWdlc2ltYWxcbn07XG5jb25zdCBmbG9hdFRpbWUgPSB7XG4gIGlkZW50aWZ5OiB2YWx1ZSA9PiB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInLFxuICBkZWZhdWx0OiB0cnVlLFxuICB0YWc6ICd0YWc6eWFtbC5vcmcsMjAwMjpmbG9hdCcsXG4gIGZvcm1hdDogJ1RJTUUnLFxuICB0ZXN0OiAvXihbLStdPykoWzAtOV1bMC05X10qKD86OlswLTVdP1swLTldKStcXC5bMC05X10qKSQvLFxuICByZXNvbHZlOiAoc3RyLCBzaWduLCBwYXJ0cykgPT4gcGFyc2VTZXhhZ2VzaW1hbChzaWduLCBwYXJ0cy5yZXBsYWNlKC9fL2csICcnKSksXG4gIHN0cmluZ2lmeTogc3RyaW5naWZ5U2V4YWdlc2ltYWxcbn07XG5jb25zdCB0aW1lc3RhbXAgPSB7XG4gIGlkZW50aWZ5OiB2YWx1ZSA9PiB2YWx1ZSBpbnN0YW5jZW9mIERhdGUsXG4gIGRlZmF1bHQ6IHRydWUsXG4gIHRhZzogJ3RhZzp5YW1sLm9yZywyMDAyOnRpbWVzdGFtcCcsXG4gIC8vIElmIHRoZSB0aW1lIHpvbmUgaXMgb21pdHRlZCwgdGhlIHRpbWVzdGFtcCBpcyBhc3N1bWVkIHRvIGJlIHNwZWNpZmllZCBpbiBVVEMuIFRoZSB0aW1lIHBhcnRcbiAgLy8gbWF5IGJlIG9taXR0ZWQgYWx0b2dldGhlciwgcmVzdWx0aW5nIGluIGEgZGF0ZSBmb3JtYXQuIEluIHN1Y2ggYSBjYXNlLCB0aGUgdGltZSBwYXJ0IGlzXG4gIC8vIGFzc3VtZWQgdG8gYmUgMDA6MDA6MDBaIChzdGFydCBvZiBkYXksIFVUQykuXG4gIHRlc3Q6IFJlZ0V4cCgnXig/OicgKyAnKFswLTldezR9KS0oWzAtOV17MSwyfSktKFswLTldezEsMn0pJyArIC8vIFlZWVktTW0tRGRcbiAgJyg/Oig/OnR8VHxbIFxcXFx0XSspJyArIC8vIHQgfCBUIHwgd2hpdGVzcGFjZVxuICAnKFswLTldezEsMn0pOihbMC05XXsxLDJ9KTooWzAtOV17MSwyfShcXFxcLlswLTldKyk/KScgKyAvLyBIaDpNbTpTcyguc3MpP1xuICAnKD86WyBcXFxcdF0qKFp8Wy0rXVswMTJdP1swLTldKD86OlswLTldezJ9KT8pKT8nICsgLy8gWiB8ICs1IHwgLTAzOjMwXG4gICcpPycgKyAnKSQnKSxcbiAgcmVzb2x2ZTogKHN0ciwgeWVhciwgbW9udGgsIGRheSwgaG91ciwgbWludXRlLCBzZWNvbmQsIG1pbGxpc2VjLCB0eikgPT4ge1xuICAgIGlmIChtaWxsaXNlYykgbWlsbGlzZWMgPSAobWlsbGlzZWMgKyAnMDAnKS5zdWJzdHIoMSwgMyk7XG4gICAgbGV0IGRhdGUgPSBEYXRlLlVUQyh5ZWFyLCBtb250aCAtIDEsIGRheSwgaG91ciB8fCAwLCBtaW51dGUgfHwgMCwgc2Vjb25kIHx8IDAsIG1pbGxpc2VjIHx8IDApO1xuXG4gICAgaWYgKHR6ICYmIHR6ICE9PSAnWicpIHtcbiAgICAgIGxldCBkID0gcGFyc2VTZXhhZ2VzaW1hbCh0elswXSwgdHouc2xpY2UoMSkpO1xuICAgICAgaWYgKE1hdGguYWJzKGQpIDwgMzApIGQgKj0gNjA7XG4gICAgICBkYXRlIC09IDYwMDAwICogZDtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IERhdGUoZGF0ZSk7XG4gIH0sXG4gIHN0cmluZ2lmeTogKHtcbiAgICB2YWx1ZVxuICB9KSA9PiB2YWx1ZS50b0lTT1N0cmluZygpLnJlcGxhY2UoLygoVDAwOjAwKT86MDApP1xcLjAwMFokLywgJycpXG59O1xuXG4vKiBnbG9iYWwgY29uc29sZSwgcHJvY2VzcywgWUFNTF9TSUxFTkNFX0RFUFJFQ0FUSU9OX1dBUk5JTkdTLCBZQU1MX1NJTEVOQ0VfV0FSTklOR1MgKi9cbmZ1bmN0aW9uIHNob3VsZFdhcm4oZGVwcmVjYXRpb24pIHtcbiAgY29uc3QgZW52ID0gdHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnICYmIHByb2Nlc3MuZW52IHx8IHt9O1xuXG4gIGlmIChkZXByZWNhdGlvbikge1xuICAgIGlmICh0eXBlb2YgWUFNTF9TSUxFTkNFX0RFUFJFQ0FUSU9OX1dBUk5JTkdTICE9PSAndW5kZWZpbmVkJykgcmV0dXJuICFZQU1MX1NJTEVOQ0VfREVQUkVDQVRJT05fV0FSTklOR1M7XG4gICAgcmV0dXJuICFlbnYuWUFNTF9TSUxFTkNFX0RFUFJFQ0FUSU9OX1dBUk5JTkdTO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBZQU1MX1NJTEVOQ0VfV0FSTklOR1MgIT09ICd1bmRlZmluZWQnKSByZXR1cm4gIVlBTUxfU0lMRU5DRV9XQVJOSU5HUztcbiAgcmV0dXJuICFlbnYuWUFNTF9TSUxFTkNFX1dBUk5JTkdTO1xufVxuXG5mdW5jdGlvbiB3YXJuKHdhcm5pbmcsIHR5cGUpIHtcbiAgaWYgKHNob3VsZFdhcm4oZmFsc2UpKSB7XG4gICAgY29uc3QgZW1pdCA9IHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJiBwcm9jZXNzLmVtaXRXYXJuaW5nOyAvLyBUaGlzIHdpbGwgdGhyb3cgaW4gSmVzdCBpZiBgd2FybmluZ2AgaXMgYW4gRXJyb3IgaW5zdGFuY2UgZHVlIHRvXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL2plc3QvaXNzdWVzLzI1NDlcblxuICAgIGlmIChlbWl0KSBlbWl0KHdhcm5pbmcsIHR5cGUpO2Vsc2Uge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgIGNvbnNvbGUud2Fybih0eXBlID8gYCR7dHlwZX06ICR7d2FybmluZ31gIDogd2FybmluZyk7XG4gICAgfVxuICB9XG59XG5mdW5jdGlvbiB3YXJuRmlsZURlcHJlY2F0aW9uKGZpbGVuYW1lKSB7XG4gIGlmIChzaG91bGRXYXJuKHRydWUpKSB7XG4gICAgY29uc3QgcGF0aCA9IGZpbGVuYW1lLnJlcGxhY2UoLy4qeWFtbFsvXFxcXF0vaSwgJycpLnJlcGxhY2UoL1xcLmpzJC8sICcnKS5yZXBsYWNlKC9cXFxcL2csICcvJyk7XG4gICAgd2FybihgVGhlIGVuZHBvaW50ICd5YW1sLyR7cGF0aH0nIHdpbGwgYmUgcmVtb3ZlZCBpbiBhIGZ1dHVyZSByZWxlYXNlLmAsICdEZXByZWNhdGlvbldhcm5pbmcnKTtcbiAgfVxufVxuY29uc3Qgd2FybmVkID0ge307XG5mdW5jdGlvbiB3YXJuT3B0aW9uRGVwcmVjYXRpb24obmFtZSwgYWx0ZXJuYXRpdmUpIHtcbiAgaWYgKCF3YXJuZWRbbmFtZV0gJiYgc2hvdWxkV2Fybih0cnVlKSkge1xuICAgIHdhcm5lZFtuYW1lXSA9IHRydWU7XG4gICAgbGV0IG1zZyA9IGBUaGUgb3B0aW9uICcke25hbWV9JyB3aWxsIGJlIHJlbW92ZWQgaW4gYSBmdXR1cmUgcmVsZWFzZWA7XG4gICAgbXNnICs9IGFsdGVybmF0aXZlID8gYCwgdXNlICcke2FsdGVybmF0aXZlfScgaW5zdGVhZC5gIDogJy4nO1xuICAgIHdhcm4obXNnLCAnRGVwcmVjYXRpb25XYXJuaW5nJyk7XG4gIH1cbn1cblxuZXhwb3J0cy5iaW5hcnkgPSBiaW5hcnk7XG5leHBvcnRzLmZsb2F0VGltZSA9IGZsb2F0VGltZTtcbmV4cG9ydHMuaW50VGltZSA9IGludFRpbWU7XG5leHBvcnRzLm9tYXAgPSBvbWFwO1xuZXhwb3J0cy5wYWlycyA9IHBhaXJzO1xuZXhwb3J0cy5zZXQgPSBzZXQ7XG5leHBvcnRzLnRpbWVzdGFtcCA9IHRpbWVzdGFtcDtcbmV4cG9ydHMud2FybiA9IHdhcm47XG5leHBvcnRzLndhcm5GaWxlRGVwcmVjYXRpb24gPSB3YXJuRmlsZURlcHJlY2F0aW9uO1xuZXhwb3J0cy53YXJuT3B0aW9uRGVwcmVjYXRpb24gPSB3YXJuT3B0aW9uRGVwcmVjYXRpb247XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBQbGFpblZhbHVlID0gcmVxdWlyZSgnLi9QbGFpblZhbHVlLWVjOGU1ODhlLmpzJyk7XG52YXIgcmVzb2x2ZVNlcSA9IHJlcXVpcmUoJy4vcmVzb2x2ZVNlcS1kMDNjYjAzNy5qcycpO1xudmFyIHdhcm5pbmdzID0gcmVxdWlyZSgnLi93YXJuaW5ncy0xMDAwYTM3Mi5qcycpO1xuXG5mdW5jdGlvbiBjcmVhdGVNYXAoc2NoZW1hLCBvYmosIGN0eCkge1xuICBjb25zdCBtYXAgPSBuZXcgcmVzb2x2ZVNlcS5ZQU1MTWFwKHNjaGVtYSk7XG5cbiAgaWYgKG9iaiBpbnN0YW5jZW9mIE1hcCkge1xuICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIG9iaikgbWFwLml0ZW1zLnB1c2goc2NoZW1hLmNyZWF0ZVBhaXIoa2V5LCB2YWx1ZSwgY3R4KSk7XG4gIH0gZWxzZSBpZiAob2JqICYmIHR5cGVvZiBvYmogPT09ICdvYmplY3QnKSB7XG4gICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMob2JqKSkgbWFwLml0ZW1zLnB1c2goc2NoZW1hLmNyZWF0ZVBhaXIoa2V5LCBvYmpba2V5XSwgY3R4KSk7XG4gIH1cblxuICBpZiAodHlwZW9mIHNjaGVtYS5zb3J0TWFwRW50cmllcyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIG1hcC5pdGVtcy5zb3J0KHNjaGVtYS5zb3J0TWFwRW50cmllcyk7XG4gIH1cblxuICByZXR1cm4gbWFwO1xufVxuXG5jb25zdCBtYXAgPSB7XG4gIGNyZWF0ZU5vZGU6IGNyZWF0ZU1hcCxcbiAgZGVmYXVsdDogdHJ1ZSxcbiAgbm9kZUNsYXNzOiByZXNvbHZlU2VxLllBTUxNYXAsXG4gIHRhZzogJ3RhZzp5YW1sLm9yZywyMDAyOm1hcCcsXG4gIHJlc29sdmU6IHJlc29sdmVTZXEucmVzb2x2ZU1hcFxufTtcblxuZnVuY3Rpb24gY3JlYXRlU2VxKHNjaGVtYSwgb2JqLCBjdHgpIHtcbiAgY29uc3Qgc2VxID0gbmV3IHJlc29sdmVTZXEuWUFNTFNlcShzY2hlbWEpO1xuXG4gIGlmIChvYmogJiYgb2JqW1N5bWJvbC5pdGVyYXRvcl0pIHtcbiAgICBmb3IgKGNvbnN0IGl0IG9mIG9iaikge1xuICAgICAgY29uc3QgdiA9IHNjaGVtYS5jcmVhdGVOb2RlKGl0LCBjdHgud3JhcFNjYWxhcnMsIG51bGwsIGN0eCk7XG4gICAgICBzZXEuaXRlbXMucHVzaCh2KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gc2VxO1xufVxuXG5jb25zdCBzZXEgPSB7XG4gIGNyZWF0ZU5vZGU6IGNyZWF0ZVNlcSxcbiAgZGVmYXVsdDogdHJ1ZSxcbiAgbm9kZUNsYXNzOiByZXNvbHZlU2VxLllBTUxTZXEsXG4gIHRhZzogJ3RhZzp5YW1sLm9yZywyMDAyOnNlcScsXG4gIHJlc29sdmU6IHJlc29sdmVTZXEucmVzb2x2ZVNlcVxufTtcblxuY29uc3Qgc3RyaW5nID0ge1xuICBpZGVudGlmeTogdmFsdWUgPT4gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyxcbiAgZGVmYXVsdDogdHJ1ZSxcbiAgdGFnOiAndGFnOnlhbWwub3JnLDIwMDI6c3RyJyxcbiAgcmVzb2x2ZTogcmVzb2x2ZVNlcS5yZXNvbHZlU3RyaW5nLFxuXG4gIHN0cmluZ2lmeShpdGVtLCBjdHgsIG9uQ29tbWVudCwgb25DaG9tcEtlZXApIHtcbiAgICBjdHggPSBPYmplY3QuYXNzaWduKHtcbiAgICAgIGFjdHVhbFN0cmluZzogdHJ1ZVxuICAgIH0sIGN0eCk7XG4gICAgcmV0dXJuIHJlc29sdmVTZXEuc3RyaW5naWZ5U3RyaW5nKGl0ZW0sIGN0eCwgb25Db21tZW50LCBvbkNob21wS2VlcCk7XG4gIH0sXG5cbiAgb3B0aW9uczogcmVzb2x2ZVNlcS5zdHJPcHRpb25zXG59O1xuXG5jb25zdCBmYWlsc2FmZSA9IFttYXAsIHNlcSwgc3RyaW5nXTtcblxuLyogZ2xvYmFsIEJpZ0ludCAqL1xuXG5jb25zdCBpbnRJZGVudGlmeSQyID0gdmFsdWUgPT4gdHlwZW9mIHZhbHVlID09PSAnYmlnaW50JyB8fCBOdW1iZXIuaXNJbnRlZ2VyKHZhbHVlKTtcblxuY29uc3QgaW50UmVzb2x2ZSQxID0gKHNyYywgcGFydCwgcmFkaXgpID0+IHJlc29sdmVTZXEuaW50T3B0aW9ucy5hc0JpZ0ludCA/IEJpZ0ludChzcmMpIDogcGFyc2VJbnQocGFydCwgcmFkaXgpO1xuXG5mdW5jdGlvbiBpbnRTdHJpbmdpZnkkMShub2RlLCByYWRpeCwgcHJlZml4KSB7XG4gIGNvbnN0IHtcbiAgICB2YWx1ZVxuICB9ID0gbm9kZTtcbiAgaWYgKGludElkZW50aWZ5JDIodmFsdWUpICYmIHZhbHVlID49IDApIHJldHVybiBwcmVmaXggKyB2YWx1ZS50b1N0cmluZyhyYWRpeCk7XG4gIHJldHVybiByZXNvbHZlU2VxLnN0cmluZ2lmeU51bWJlcihub2RlKTtcbn1cblxuY29uc3QgbnVsbE9iaiA9IHtcbiAgaWRlbnRpZnk6IHZhbHVlID0+IHZhbHVlID09IG51bGwsXG4gIGNyZWF0ZU5vZGU6IChzY2hlbWEsIHZhbHVlLCBjdHgpID0+IGN0eC53cmFwU2NhbGFycyA/IG5ldyByZXNvbHZlU2VxLlNjYWxhcihudWxsKSA6IG51bGwsXG4gIGRlZmF1bHQ6IHRydWUsXG4gIHRhZzogJ3RhZzp5YW1sLm9yZywyMDAyOm51bGwnLFxuICB0ZXN0OiAvXig/On58W05uXXVsbHxOVUxMKT8kLyxcbiAgcmVzb2x2ZTogKCkgPT4gbnVsbCxcbiAgb3B0aW9uczogcmVzb2x2ZVNlcS5udWxsT3B0aW9ucyxcbiAgc3RyaW5naWZ5OiAoKSA9PiByZXNvbHZlU2VxLm51bGxPcHRpb25zLm51bGxTdHJcbn07XG5jb25zdCBib29sT2JqID0ge1xuICBpZGVudGlmeTogdmFsdWUgPT4gdHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbicsXG4gIGRlZmF1bHQ6IHRydWUsXG4gIHRhZzogJ3RhZzp5YW1sLm9yZywyMDAyOmJvb2wnLFxuICB0ZXN0OiAvXig/OltUdF1ydWV8VFJVRXxbRmZdYWxzZXxGQUxTRSkkLyxcbiAgcmVzb2x2ZTogc3RyID0+IHN0clswXSA9PT0gJ3QnIHx8IHN0clswXSA9PT0gJ1QnLFxuICBvcHRpb25zOiByZXNvbHZlU2VxLmJvb2xPcHRpb25zLFxuICBzdHJpbmdpZnk6ICh7XG4gICAgdmFsdWVcbiAgfSkgPT4gdmFsdWUgPyByZXNvbHZlU2VxLmJvb2xPcHRpb25zLnRydWVTdHIgOiByZXNvbHZlU2VxLmJvb2xPcHRpb25zLmZhbHNlU3RyXG59O1xuY29uc3Qgb2N0T2JqID0ge1xuICBpZGVudGlmeTogdmFsdWUgPT4gaW50SWRlbnRpZnkkMih2YWx1ZSkgJiYgdmFsdWUgPj0gMCxcbiAgZGVmYXVsdDogdHJ1ZSxcbiAgdGFnOiAndGFnOnlhbWwub3JnLDIwMDI6aW50JyxcbiAgZm9ybWF0OiAnT0NUJyxcbiAgdGVzdDogL14wbyhbMC03XSspJC8sXG4gIHJlc29sdmU6IChzdHIsIG9jdCkgPT4gaW50UmVzb2x2ZSQxKHN0ciwgb2N0LCA4KSxcbiAgb3B0aW9uczogcmVzb2x2ZVNlcS5pbnRPcHRpb25zLFxuICBzdHJpbmdpZnk6IG5vZGUgPT4gaW50U3RyaW5naWZ5JDEobm9kZSwgOCwgJzBvJylcbn07XG5jb25zdCBpbnRPYmogPSB7XG4gIGlkZW50aWZ5OiBpbnRJZGVudGlmeSQyLFxuICBkZWZhdWx0OiB0cnVlLFxuICB0YWc6ICd0YWc6eWFtbC5vcmcsMjAwMjppbnQnLFxuICB0ZXN0OiAvXlstK10/WzAtOV0rJC8sXG4gIHJlc29sdmU6IHN0ciA9PiBpbnRSZXNvbHZlJDEoc3RyLCBzdHIsIDEwKSxcbiAgb3B0aW9uczogcmVzb2x2ZVNlcS5pbnRPcHRpb25zLFxuICBzdHJpbmdpZnk6IHJlc29sdmVTZXEuc3RyaW5naWZ5TnVtYmVyXG59O1xuY29uc3QgaGV4T2JqID0ge1xuICBpZGVudGlmeTogdmFsdWUgPT4gaW50SWRlbnRpZnkkMih2YWx1ZSkgJiYgdmFsdWUgPj0gMCxcbiAgZGVmYXVsdDogdHJ1ZSxcbiAgdGFnOiAndGFnOnlhbWwub3JnLDIwMDI6aW50JyxcbiAgZm9ybWF0OiAnSEVYJyxcbiAgdGVzdDogL14weChbMC05YS1mQS1GXSspJC8sXG4gIHJlc29sdmU6IChzdHIsIGhleCkgPT4gaW50UmVzb2x2ZSQxKHN0ciwgaGV4LCAxNiksXG4gIG9wdGlvbnM6IHJlc29sdmVTZXEuaW50T3B0aW9ucyxcbiAgc3RyaW5naWZ5OiBub2RlID0+IGludFN0cmluZ2lmeSQxKG5vZGUsIDE2LCAnMHgnKVxufTtcbmNvbnN0IG5hbk9iaiA9IHtcbiAgaWRlbnRpZnk6IHZhbHVlID0+IHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicsXG4gIGRlZmF1bHQ6IHRydWUsXG4gIHRhZzogJ3RhZzp5YW1sLm9yZywyMDAyOmZsb2F0JyxcbiAgdGVzdDogL14oPzpbLStdP1xcLmluZnwoXFwubmFuKSkkL2ksXG4gIHJlc29sdmU6IChzdHIsIG5hbikgPT4gbmFuID8gTmFOIDogc3RyWzBdID09PSAnLScgPyBOdW1iZXIuTkVHQVRJVkVfSU5GSU5JVFkgOiBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFksXG4gIHN0cmluZ2lmeTogcmVzb2x2ZVNlcS5zdHJpbmdpZnlOdW1iZXJcbn07XG5jb25zdCBleHBPYmogPSB7XG4gIGlkZW50aWZ5OiB2YWx1ZSA9PiB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInLFxuICBkZWZhdWx0OiB0cnVlLFxuICB0YWc6ICd0YWc6eWFtbC5vcmcsMjAwMjpmbG9hdCcsXG4gIGZvcm1hdDogJ0VYUCcsXG4gIHRlc3Q6IC9eWy0rXT8oPzpcXC5bMC05XSt8WzAtOV0rKD86XFwuWzAtOV0qKT8pW2VFXVstK10/WzAtOV0rJC8sXG4gIHJlc29sdmU6IHN0ciA9PiBwYXJzZUZsb2F0KHN0ciksXG4gIHN0cmluZ2lmeTogKHtcbiAgICB2YWx1ZVxuICB9KSA9PiBOdW1iZXIodmFsdWUpLnRvRXhwb25lbnRpYWwoKVxufTtcbmNvbnN0IGZsb2F0T2JqID0ge1xuICBpZGVudGlmeTogdmFsdWUgPT4gdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyxcbiAgZGVmYXVsdDogdHJ1ZSxcbiAgdGFnOiAndGFnOnlhbWwub3JnLDIwMDI6ZmxvYXQnLFxuICB0ZXN0OiAvXlstK10/KD86XFwuKFswLTldKyl8WzAtOV0rXFwuKFswLTldKikpJC8sXG5cbiAgcmVzb2x2ZShzdHIsIGZyYWMxLCBmcmFjMikge1xuICAgIGNvbnN0IGZyYWMgPSBmcmFjMSB8fCBmcmFjMjtcbiAgICBjb25zdCBub2RlID0gbmV3IHJlc29sdmVTZXEuU2NhbGFyKHBhcnNlRmxvYXQoc3RyKSk7XG4gICAgaWYgKGZyYWMgJiYgZnJhY1tmcmFjLmxlbmd0aCAtIDFdID09PSAnMCcpIG5vZGUubWluRnJhY3Rpb25EaWdpdHMgPSBmcmFjLmxlbmd0aDtcbiAgICByZXR1cm4gbm9kZTtcbiAgfSxcblxuICBzdHJpbmdpZnk6IHJlc29sdmVTZXEuc3RyaW5naWZ5TnVtYmVyXG59O1xuY29uc3QgY29yZSA9IGZhaWxzYWZlLmNvbmNhdChbbnVsbE9iaiwgYm9vbE9iaiwgb2N0T2JqLCBpbnRPYmosIGhleE9iaiwgbmFuT2JqLCBleHBPYmosIGZsb2F0T2JqXSk7XG5cbi8qIGdsb2JhbCBCaWdJbnQgKi9cblxuY29uc3QgaW50SWRlbnRpZnkkMSA9IHZhbHVlID0+IHR5cGVvZiB2YWx1ZSA9PT0gJ2JpZ2ludCcgfHwgTnVtYmVyLmlzSW50ZWdlcih2YWx1ZSk7XG5cbmNvbnN0IHN0cmluZ2lmeUpTT04gPSAoe1xuICB2YWx1ZVxufSkgPT4gSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xuXG5jb25zdCBqc29uID0gW21hcCwgc2VxLCB7XG4gIGlkZW50aWZ5OiB2YWx1ZSA9PiB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnLFxuICBkZWZhdWx0OiB0cnVlLFxuICB0YWc6ICd0YWc6eWFtbC5vcmcsMjAwMjpzdHInLFxuICByZXNvbHZlOiByZXNvbHZlU2VxLnJlc29sdmVTdHJpbmcsXG4gIHN0cmluZ2lmeTogc3RyaW5naWZ5SlNPTlxufSwge1xuICBpZGVudGlmeTogdmFsdWUgPT4gdmFsdWUgPT0gbnVsbCxcbiAgY3JlYXRlTm9kZTogKHNjaGVtYSwgdmFsdWUsIGN0eCkgPT4gY3R4LndyYXBTY2FsYXJzID8gbmV3IHJlc29sdmVTZXEuU2NhbGFyKG51bGwpIDogbnVsbCxcbiAgZGVmYXVsdDogdHJ1ZSxcbiAgdGFnOiAndGFnOnlhbWwub3JnLDIwMDI6bnVsbCcsXG4gIHRlc3Q6IC9ebnVsbCQvLFxuICByZXNvbHZlOiAoKSA9PiBudWxsLFxuICBzdHJpbmdpZnk6IHN0cmluZ2lmeUpTT05cbn0sIHtcbiAgaWRlbnRpZnk6IHZhbHVlID0+IHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nLFxuICBkZWZhdWx0OiB0cnVlLFxuICB0YWc6ICd0YWc6eWFtbC5vcmcsMjAwMjpib29sJyxcbiAgdGVzdDogL150cnVlfGZhbHNlJC8sXG4gIHJlc29sdmU6IHN0ciA9PiBzdHIgPT09ICd0cnVlJyxcbiAgc3RyaW5naWZ5OiBzdHJpbmdpZnlKU09OXG59LCB7XG4gIGlkZW50aWZ5OiBpbnRJZGVudGlmeSQxLFxuICBkZWZhdWx0OiB0cnVlLFxuICB0YWc6ICd0YWc6eWFtbC5vcmcsMjAwMjppbnQnLFxuICB0ZXN0OiAvXi0/KD86MHxbMS05XVswLTldKikkLyxcbiAgcmVzb2x2ZTogc3RyID0+IHJlc29sdmVTZXEuaW50T3B0aW9ucy5hc0JpZ0ludCA/IEJpZ0ludChzdHIpIDogcGFyc2VJbnQoc3RyLCAxMCksXG4gIHN0cmluZ2lmeTogKHtcbiAgICB2YWx1ZVxuICB9KSA9PiBpbnRJZGVudGlmeSQxKHZhbHVlKSA/IHZhbHVlLnRvU3RyaW5nKCkgOiBKU09OLnN0cmluZ2lmeSh2YWx1ZSlcbn0sIHtcbiAgaWRlbnRpZnk6IHZhbHVlID0+IHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicsXG4gIGRlZmF1bHQ6IHRydWUsXG4gIHRhZzogJ3RhZzp5YW1sLm9yZywyMDAyOmZsb2F0JyxcbiAgdGVzdDogL14tPyg/OjB8WzEtOV1bMC05XSopKD86XFwuWzAtOV0qKT8oPzpbZUVdWy0rXT9bMC05XSspPyQvLFxuICByZXNvbHZlOiBzdHIgPT4gcGFyc2VGbG9hdChzdHIpLFxuICBzdHJpbmdpZnk6IHN0cmluZ2lmeUpTT05cbn1dO1xuXG5qc29uLnNjYWxhckZhbGxiYWNrID0gc3RyID0+IHtcbiAgdGhyb3cgbmV3IFN5bnRheEVycm9yKGBVbnJlc29sdmVkIHBsYWluIHNjYWxhciAke0pTT04uc3RyaW5naWZ5KHN0cil9YCk7XG59O1xuXG4vKiBnbG9iYWwgQmlnSW50ICovXG5cbmNvbnN0IGJvb2xTdHJpbmdpZnkgPSAoe1xuICB2YWx1ZVxufSkgPT4gdmFsdWUgPyByZXNvbHZlU2VxLmJvb2xPcHRpb25zLnRydWVTdHIgOiByZXNvbHZlU2VxLmJvb2xPcHRpb25zLmZhbHNlU3RyO1xuXG5jb25zdCBpbnRJZGVudGlmeSA9IHZhbHVlID0+IHR5cGVvZiB2YWx1ZSA9PT0gJ2JpZ2ludCcgfHwgTnVtYmVyLmlzSW50ZWdlcih2YWx1ZSk7XG5cbmZ1bmN0aW9uIGludFJlc29sdmUoc2lnbiwgc3JjLCByYWRpeCkge1xuICBsZXQgc3RyID0gc3JjLnJlcGxhY2UoL18vZywgJycpO1xuXG4gIGlmIChyZXNvbHZlU2VxLmludE9wdGlvbnMuYXNCaWdJbnQpIHtcbiAgICBzd2l0Y2ggKHJhZGl4KSB7XG4gICAgICBjYXNlIDI6XG4gICAgICAgIHN0ciA9IGAwYiR7c3RyfWA7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIDg6XG4gICAgICAgIHN0ciA9IGAwbyR7c3RyfWA7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIDE2OlxuICAgICAgICBzdHIgPSBgMHgke3N0cn1gO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBjb25zdCBuID0gQmlnSW50KHN0cik7XG4gICAgcmV0dXJuIHNpZ24gPT09ICctJyA/IEJpZ0ludCgtMSkgKiBuIDogbjtcbiAgfVxuXG4gIGNvbnN0IG4gPSBwYXJzZUludChzdHIsIHJhZGl4KTtcbiAgcmV0dXJuIHNpZ24gPT09ICctJyA/IC0xICogbiA6IG47XG59XG5cbmZ1bmN0aW9uIGludFN0cmluZ2lmeShub2RlLCByYWRpeCwgcHJlZml4KSB7XG4gIGNvbnN0IHtcbiAgICB2YWx1ZVxuICB9ID0gbm9kZTtcblxuICBpZiAoaW50SWRlbnRpZnkodmFsdWUpKSB7XG4gICAgY29uc3Qgc3RyID0gdmFsdWUudG9TdHJpbmcocmFkaXgpO1xuICAgIHJldHVybiB2YWx1ZSA8IDAgPyAnLScgKyBwcmVmaXggKyBzdHIuc3Vic3RyKDEpIDogcHJlZml4ICsgc3RyO1xuICB9XG5cbiAgcmV0dXJuIHJlc29sdmVTZXEuc3RyaW5naWZ5TnVtYmVyKG5vZGUpO1xufVxuXG5jb25zdCB5YW1sMTEgPSBmYWlsc2FmZS5jb25jYXQoW3tcbiAgaWRlbnRpZnk6IHZhbHVlID0+IHZhbHVlID09IG51bGwsXG4gIGNyZWF0ZU5vZGU6IChzY2hlbWEsIHZhbHVlLCBjdHgpID0+IGN0eC53cmFwU2NhbGFycyA/IG5ldyByZXNvbHZlU2VxLlNjYWxhcihudWxsKSA6IG51bGwsXG4gIGRlZmF1bHQ6IHRydWUsXG4gIHRhZzogJ3RhZzp5YW1sLm9yZywyMDAyOm51bGwnLFxuICB0ZXN0OiAvXig/On58W05uXXVsbHxOVUxMKT8kLyxcbiAgcmVzb2x2ZTogKCkgPT4gbnVsbCxcbiAgb3B0aW9uczogcmVzb2x2ZVNlcS5udWxsT3B0aW9ucyxcbiAgc3RyaW5naWZ5OiAoKSA9PiByZXNvbHZlU2VxLm51bGxPcHRpb25zLm51bGxTdHJcbn0sIHtcbiAgaWRlbnRpZnk6IHZhbHVlID0+IHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nLFxuICBkZWZhdWx0OiB0cnVlLFxuICB0YWc6ICd0YWc6eWFtbC5vcmcsMjAwMjpib29sJyxcbiAgdGVzdDogL14oPzpZfHl8W1l5XWVzfFlFU3xbVHRdcnVlfFRSVUV8W09vXW58T04pJC8sXG4gIHJlc29sdmU6ICgpID0+IHRydWUsXG4gIG9wdGlvbnM6IHJlc29sdmVTZXEuYm9vbE9wdGlvbnMsXG4gIHN0cmluZ2lmeTogYm9vbFN0cmluZ2lmeVxufSwge1xuICBpZGVudGlmeTogdmFsdWUgPT4gdHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbicsXG4gIGRlZmF1bHQ6IHRydWUsXG4gIHRhZzogJ3RhZzp5YW1sLm9yZywyMDAyOmJvb2wnLFxuICB0ZXN0OiAvXig/Ok58bnxbTm5db3xOT3xbRmZdYWxzZXxGQUxTRXxbT29dZmZ8T0ZGKSQvaSxcbiAgcmVzb2x2ZTogKCkgPT4gZmFsc2UsXG4gIG9wdGlvbnM6IHJlc29sdmVTZXEuYm9vbE9wdGlvbnMsXG4gIHN0cmluZ2lmeTogYm9vbFN0cmluZ2lmeVxufSwge1xuICBpZGVudGlmeTogaW50SWRlbnRpZnksXG4gIGRlZmF1bHQ6IHRydWUsXG4gIHRhZzogJ3RhZzp5YW1sLm9yZywyMDAyOmludCcsXG4gIGZvcm1hdDogJ0JJTicsXG4gIHRlc3Q6IC9eKFstK10/KTBiKFswLTFfXSspJC8sXG4gIHJlc29sdmU6IChzdHIsIHNpZ24sIGJpbikgPT4gaW50UmVzb2x2ZShzaWduLCBiaW4sIDIpLFxuICBzdHJpbmdpZnk6IG5vZGUgPT4gaW50U3RyaW5naWZ5KG5vZGUsIDIsICcwYicpXG59LCB7XG4gIGlkZW50aWZ5OiBpbnRJZGVudGlmeSxcbiAgZGVmYXVsdDogdHJ1ZSxcbiAgdGFnOiAndGFnOnlhbWwub3JnLDIwMDI6aW50JyxcbiAgZm9ybWF0OiAnT0NUJyxcbiAgdGVzdDogL14oWy0rXT8pMChbMC03X10rKSQvLFxuICByZXNvbHZlOiAoc3RyLCBzaWduLCBvY3QpID0+IGludFJlc29sdmUoc2lnbiwgb2N0LCA4KSxcbiAgc3RyaW5naWZ5OiBub2RlID0+IGludFN0cmluZ2lmeShub2RlLCA4LCAnMCcpXG59LCB7XG4gIGlkZW50aWZ5OiBpbnRJZGVudGlmeSxcbiAgZGVmYXVsdDogdHJ1ZSxcbiAgdGFnOiAndGFnOnlhbWwub3JnLDIwMDI6aW50JyxcbiAgdGVzdDogL14oWy0rXT8pKFswLTldWzAtOV9dKikkLyxcbiAgcmVzb2x2ZTogKHN0ciwgc2lnbiwgYWJzKSA9PiBpbnRSZXNvbHZlKHNpZ24sIGFicywgMTApLFxuICBzdHJpbmdpZnk6IHJlc29sdmVTZXEuc3RyaW5naWZ5TnVtYmVyXG59LCB7XG4gIGlkZW50aWZ5OiBpbnRJZGVudGlmeSxcbiAgZGVmYXVsdDogdHJ1ZSxcbiAgdGFnOiAndGFnOnlhbWwub3JnLDIwMDI6aW50JyxcbiAgZm9ybWF0OiAnSEVYJyxcbiAgdGVzdDogL14oWy0rXT8pMHgoWzAtOWEtZkEtRl9dKykkLyxcbiAgcmVzb2x2ZTogKHN0ciwgc2lnbiwgaGV4KSA9PiBpbnRSZXNvbHZlKHNpZ24sIGhleCwgMTYpLFxuICBzdHJpbmdpZnk6IG5vZGUgPT4gaW50U3RyaW5naWZ5KG5vZGUsIDE2LCAnMHgnKVxufSwge1xuICBpZGVudGlmeTogdmFsdWUgPT4gdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyxcbiAgZGVmYXVsdDogdHJ1ZSxcbiAgdGFnOiAndGFnOnlhbWwub3JnLDIwMDI6ZmxvYXQnLFxuICB0ZXN0OiAvXig/OlstK10/XFwuaW5mfChcXC5uYW4pKSQvaSxcbiAgcmVzb2x2ZTogKHN0ciwgbmFuKSA9PiBuYW4gPyBOYU4gOiBzdHJbMF0gPT09ICctJyA/IE51bWJlci5ORUdBVElWRV9JTkZJTklUWSA6IE51bWJlci5QT1NJVElWRV9JTkZJTklUWSxcbiAgc3RyaW5naWZ5OiByZXNvbHZlU2VxLnN0cmluZ2lmeU51bWJlclxufSwge1xuICBpZGVudGlmeTogdmFsdWUgPT4gdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyxcbiAgZGVmYXVsdDogdHJ1ZSxcbiAgdGFnOiAndGFnOnlhbWwub3JnLDIwMDI6ZmxvYXQnLFxuICBmb3JtYXQ6ICdFWFAnLFxuICB0ZXN0OiAvXlstK10/KFswLTldWzAtOV9dKik/KFxcLlswLTlfXSopP1tlRV1bLStdP1swLTldKyQvLFxuICByZXNvbHZlOiBzdHIgPT4gcGFyc2VGbG9hdChzdHIucmVwbGFjZSgvXy9nLCAnJykpLFxuICBzdHJpbmdpZnk6ICh7XG4gICAgdmFsdWVcbiAgfSkgPT4gTnVtYmVyKHZhbHVlKS50b0V4cG9uZW50aWFsKClcbn0sIHtcbiAgaWRlbnRpZnk6IHZhbHVlID0+IHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicsXG4gIGRlZmF1bHQ6IHRydWUsXG4gIHRhZzogJ3RhZzp5YW1sLm9yZywyMDAyOmZsb2F0JyxcbiAgdGVzdDogL15bLStdPyg/OlswLTldWzAtOV9dKik/XFwuKFswLTlfXSopJC8sXG5cbiAgcmVzb2x2ZShzdHIsIGZyYWMpIHtcbiAgICBjb25zdCBub2RlID0gbmV3IHJlc29sdmVTZXEuU2NhbGFyKHBhcnNlRmxvYXQoc3RyLnJlcGxhY2UoL18vZywgJycpKSk7XG5cbiAgICBpZiAoZnJhYykge1xuICAgICAgY29uc3QgZiA9IGZyYWMucmVwbGFjZSgvXy9nLCAnJyk7XG4gICAgICBpZiAoZltmLmxlbmd0aCAtIDFdID09PSAnMCcpIG5vZGUubWluRnJhY3Rpb25EaWdpdHMgPSBmLmxlbmd0aDtcbiAgICB9XG5cbiAgICByZXR1cm4gbm9kZTtcbiAgfSxcblxuICBzdHJpbmdpZnk6IHJlc29sdmVTZXEuc3RyaW5naWZ5TnVtYmVyXG59XSwgd2FybmluZ3MuYmluYXJ5LCB3YXJuaW5ncy5vbWFwLCB3YXJuaW5ncy5wYWlycywgd2FybmluZ3Muc2V0LCB3YXJuaW5ncy5pbnRUaW1lLCB3YXJuaW5ncy5mbG9hdFRpbWUsIHdhcm5pbmdzLnRpbWVzdGFtcCk7XG5cbmNvbnN0IHNjaGVtYXMgPSB7XG4gIGNvcmUsXG4gIGZhaWxzYWZlLFxuICBqc29uLFxuICB5YW1sMTFcbn07XG5jb25zdCB0YWdzID0ge1xuICBiaW5hcnk6IHdhcm5pbmdzLmJpbmFyeSxcbiAgYm9vbDogYm9vbE9iaixcbiAgZmxvYXQ6IGZsb2F0T2JqLFxuICBmbG9hdEV4cDogZXhwT2JqLFxuICBmbG9hdE5hTjogbmFuT2JqLFxuICBmbG9hdFRpbWU6IHdhcm5pbmdzLmZsb2F0VGltZSxcbiAgaW50OiBpbnRPYmosXG4gIGludEhleDogaGV4T2JqLFxuICBpbnRPY3Q6IG9jdE9iaixcbiAgaW50VGltZTogd2FybmluZ3MuaW50VGltZSxcbiAgbWFwLFxuICBudWxsOiBudWxsT2JqLFxuICBvbWFwOiB3YXJuaW5ncy5vbWFwLFxuICBwYWlyczogd2FybmluZ3MucGFpcnMsXG4gIHNlcSxcbiAgc2V0OiB3YXJuaW5ncy5zZXQsXG4gIHRpbWVzdGFtcDogd2FybmluZ3MudGltZXN0YW1wXG59O1xuXG5mdW5jdGlvbiBmaW5kVGFnT2JqZWN0KHZhbHVlLCB0YWdOYW1lLCB0YWdzKSB7XG4gIGlmICh0YWdOYW1lKSB7XG4gICAgY29uc3QgbWF0Y2ggPSB0YWdzLmZpbHRlcih0ID0+IHQudGFnID09PSB0YWdOYW1lKTtcbiAgICBjb25zdCB0YWdPYmogPSBtYXRjaC5maW5kKHQgPT4gIXQuZm9ybWF0KSB8fCBtYXRjaFswXTtcbiAgICBpZiAoIXRhZ09iaikgdGhyb3cgbmV3IEVycm9yKGBUYWcgJHt0YWdOYW1lfSBub3QgZm91bmRgKTtcbiAgICByZXR1cm4gdGFnT2JqO1xuICB9IC8vIFRPRE86IGRlcHJlY2F0ZS9yZW1vdmUgY2xhc3MgY2hlY2tcblxuXG4gIHJldHVybiB0YWdzLmZpbmQodCA9PiAodC5pZGVudGlmeSAmJiB0LmlkZW50aWZ5KHZhbHVlKSB8fCB0LmNsYXNzICYmIHZhbHVlIGluc3RhbmNlb2YgdC5jbGFzcykgJiYgIXQuZm9ybWF0KTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlTm9kZSh2YWx1ZSwgdGFnTmFtZSwgY3R4KSB7XG4gIGlmICh2YWx1ZSBpbnN0YW5jZW9mIHJlc29sdmVTZXEuTm9kZSkgcmV0dXJuIHZhbHVlO1xuICBjb25zdCB7XG4gICAgZGVmYXVsdFByZWZpeCxcbiAgICBvblRhZ09iaixcbiAgICBwcmV2T2JqZWN0cyxcbiAgICBzY2hlbWEsXG4gICAgd3JhcFNjYWxhcnNcbiAgfSA9IGN0eDtcbiAgaWYgKHRhZ05hbWUgJiYgdGFnTmFtZS5zdGFydHNXaXRoKCchIScpKSB0YWdOYW1lID0gZGVmYXVsdFByZWZpeCArIHRhZ05hbWUuc2xpY2UoMik7XG4gIGxldCB0YWdPYmogPSBmaW5kVGFnT2JqZWN0KHZhbHVlLCB0YWdOYW1lLCBzY2hlbWEudGFncyk7XG5cbiAgaWYgKCF0YWdPYmopIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlLnRvSlNPTiA9PT0gJ2Z1bmN0aW9uJykgdmFsdWUgPSB2YWx1ZS50b0pTT04oKTtcbiAgICBpZiAoIXZhbHVlIHx8IHR5cGVvZiB2YWx1ZSAhPT0gJ29iamVjdCcpIHJldHVybiB3cmFwU2NhbGFycyA/IG5ldyByZXNvbHZlU2VxLlNjYWxhcih2YWx1ZSkgOiB2YWx1ZTtcbiAgICB0YWdPYmogPSB2YWx1ZSBpbnN0YW5jZW9mIE1hcCA/IG1hcCA6IHZhbHVlW1N5bWJvbC5pdGVyYXRvcl0gPyBzZXEgOiBtYXA7XG4gIH1cblxuICBpZiAob25UYWdPYmopIHtcbiAgICBvblRhZ09iaih0YWdPYmopO1xuICAgIGRlbGV0ZSBjdHgub25UYWdPYmo7XG4gIH0gLy8gRGV0ZWN0IGR1cGxpY2F0ZSByZWZlcmVuY2VzIHRvIHRoZSBzYW1lIG9iamVjdCAmIHVzZSBBbGlhcyBub2RlcyBmb3IgYWxsXG4gIC8vIGFmdGVyIGZpcnN0LiBUaGUgYG9iamAgd3JhcHBlciBhbGxvd3MgZm9yIGNpcmN1bGFyIHJlZmVyZW5jZXMgdG8gcmVzb2x2ZS5cblxuXG4gIGNvbnN0IG9iaiA9IHtcbiAgICB2YWx1ZTogdW5kZWZpbmVkLFxuICAgIG5vZGU6IHVuZGVmaW5lZFxuICB9O1xuXG4gIGlmICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHByZXZPYmplY3RzKSB7XG4gICAgY29uc3QgcHJldiA9IHByZXZPYmplY3RzLmdldCh2YWx1ZSk7XG5cbiAgICBpZiAocHJldikge1xuICAgICAgY29uc3QgYWxpYXMgPSBuZXcgcmVzb2x2ZVNlcS5BbGlhcyhwcmV2KTsgLy8gbGVhdmVzIHNvdXJjZSBkaXJ0eTsgbXVzdCBiZSBjbGVhbmVkIGJ5IGNhbGxlclxuXG4gICAgICBjdHguYWxpYXNOb2Rlcy5wdXNoKGFsaWFzKTsgLy8gZGVmaW5lZCBhbG9uZyB3aXRoIHByZXZPYmplY3RzXG5cbiAgICAgIHJldHVybiBhbGlhcztcbiAgICB9XG5cbiAgICBvYmoudmFsdWUgPSB2YWx1ZTtcbiAgICBwcmV2T2JqZWN0cy5zZXQodmFsdWUsIG9iaik7XG4gIH1cblxuICBvYmoubm9kZSA9IHRhZ09iai5jcmVhdGVOb2RlID8gdGFnT2JqLmNyZWF0ZU5vZGUoY3R4LnNjaGVtYSwgdmFsdWUsIGN0eCkgOiB3cmFwU2NhbGFycyA/IG5ldyByZXNvbHZlU2VxLlNjYWxhcih2YWx1ZSkgOiB2YWx1ZTtcbiAgaWYgKHRhZ05hbWUgJiYgb2JqLm5vZGUgaW5zdGFuY2VvZiByZXNvbHZlU2VxLk5vZGUpIG9iai5ub2RlLnRhZyA9IHRhZ05hbWU7XG4gIHJldHVybiBvYmoubm9kZTtcbn1cblxuZnVuY3Rpb24gZ2V0U2NoZW1hVGFncyhzY2hlbWFzLCBrbm93blRhZ3MsIGN1c3RvbVRhZ3MsIHNjaGVtYUlkKSB7XG4gIGxldCB0YWdzID0gc2NoZW1hc1tzY2hlbWFJZC5yZXBsYWNlKC9cXFcvZywgJycpXTsgLy8gJ3lhbWwtMS4xJyAtPiAneWFtbDExJ1xuXG4gIGlmICghdGFncykge1xuICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhzY2hlbWFzKS5tYXAoa2V5ID0+IEpTT04uc3RyaW5naWZ5KGtleSkpLmpvaW4oJywgJyk7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duIHNjaGVtYSBcIiR7c2NoZW1hSWR9XCI7IHVzZSBvbmUgb2YgJHtrZXlzfWApO1xuICB9XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkoY3VzdG9tVGFncykpIHtcbiAgICBmb3IgKGNvbnN0IHRhZyBvZiBjdXN0b21UYWdzKSB0YWdzID0gdGFncy5jb25jYXQodGFnKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgY3VzdG9tVGFncyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHRhZ3MgPSBjdXN0b21UYWdzKHRhZ3Muc2xpY2UoKSk7XG4gIH1cblxuICBmb3IgKGxldCBpID0gMDsgaSA8IHRhZ3MubGVuZ3RoOyArK2kpIHtcbiAgICBjb25zdCB0YWcgPSB0YWdzW2ldO1xuXG4gICAgaWYgKHR5cGVvZiB0YWcgPT09ICdzdHJpbmcnKSB7XG4gICAgICBjb25zdCB0YWdPYmogPSBrbm93blRhZ3NbdGFnXTtcblxuICAgICAgaWYgKCF0YWdPYmopIHtcbiAgICAgICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKGtub3duVGFncykubWFwKGtleSA9PiBKU09OLnN0cmluZ2lmeShrZXkpKS5qb2luKCcsICcpO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gY3VzdG9tIHRhZyBcIiR7dGFnfVwiOyB1c2Ugb25lIG9mICR7a2V5c31gKTtcbiAgICAgIH1cblxuICAgICAgdGFnc1tpXSA9IHRhZ09iajtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGFncztcbn1cblxuY29uc3Qgc29ydE1hcEVudHJpZXNCeUtleSA9IChhLCBiKSA9PiBhLmtleSA8IGIua2V5ID8gLTEgOiBhLmtleSA+IGIua2V5ID8gMSA6IDA7XG5cbmNsYXNzIFNjaGVtYSB7XG4gIC8vIFRPRE86IHJlbW92ZSBpbiB2MlxuICAvLyBUT0RPOiByZW1vdmUgaW4gdjJcbiAgY29uc3RydWN0b3Ioe1xuICAgIGN1c3RvbVRhZ3MsXG4gICAgbWVyZ2UsXG4gICAgc2NoZW1hLFxuICAgIHNvcnRNYXBFbnRyaWVzLFxuICAgIHRhZ3M6IGRlcHJlY2F0ZWRDdXN0b21UYWdzXG4gIH0pIHtcbiAgICB0aGlzLm1lcmdlID0gISFtZXJnZTtcbiAgICB0aGlzLm5hbWUgPSBzY2hlbWE7XG4gICAgdGhpcy5zb3J0TWFwRW50cmllcyA9IHNvcnRNYXBFbnRyaWVzID09PSB0cnVlID8gc29ydE1hcEVudHJpZXNCeUtleSA6IHNvcnRNYXBFbnRyaWVzIHx8IG51bGw7XG4gICAgaWYgKCFjdXN0b21UYWdzICYmIGRlcHJlY2F0ZWRDdXN0b21UYWdzKSB3YXJuaW5ncy53YXJuT3B0aW9uRGVwcmVjYXRpb24oJ3RhZ3MnLCAnY3VzdG9tVGFncycpO1xuICAgIHRoaXMudGFncyA9IGdldFNjaGVtYVRhZ3Moc2NoZW1hcywgdGFncywgY3VzdG9tVGFncyB8fCBkZXByZWNhdGVkQ3VzdG9tVGFncywgc2NoZW1hKTtcbiAgfVxuXG4gIGNyZWF0ZU5vZGUodmFsdWUsIHdyYXBTY2FsYXJzLCB0YWdOYW1lLCBjdHgpIHtcbiAgICBjb25zdCBiYXNlQ3R4ID0ge1xuICAgICAgZGVmYXVsdFByZWZpeDogU2NoZW1hLmRlZmF1bHRQcmVmaXgsXG4gICAgICBzY2hlbWE6IHRoaXMsXG4gICAgICB3cmFwU2NhbGFyc1xuICAgIH07XG4gICAgY29uc3QgY3JlYXRlQ3R4ID0gY3R4ID8gT2JqZWN0LmFzc2lnbihjdHgsIGJhc2VDdHgpIDogYmFzZUN0eDtcbiAgICByZXR1cm4gY3JlYXRlTm9kZSh2YWx1ZSwgdGFnTmFtZSwgY3JlYXRlQ3R4KTtcbiAgfVxuXG4gIGNyZWF0ZVBhaXIoa2V5LCB2YWx1ZSwgY3R4KSB7XG4gICAgaWYgKCFjdHgpIGN0eCA9IHtcbiAgICAgIHdyYXBTY2FsYXJzOiB0cnVlXG4gICAgfTtcbiAgICBjb25zdCBrID0gdGhpcy5jcmVhdGVOb2RlKGtleSwgY3R4LndyYXBTY2FsYXJzLCBudWxsLCBjdHgpO1xuICAgIGNvbnN0IHYgPSB0aGlzLmNyZWF0ZU5vZGUodmFsdWUsIGN0eC53cmFwU2NhbGFycywgbnVsbCwgY3R4KTtcbiAgICByZXR1cm4gbmV3IHJlc29sdmVTZXEuUGFpcihrLCB2KTtcbiAgfVxuXG59XG5cblBsYWluVmFsdWUuX2RlZmluZVByb3BlcnR5KFNjaGVtYSwgXCJkZWZhdWx0UHJlZml4XCIsIFBsYWluVmFsdWUuZGVmYXVsdFRhZ1ByZWZpeCk7XG5cblBsYWluVmFsdWUuX2RlZmluZVByb3BlcnR5KFNjaGVtYSwgXCJkZWZhdWx0VGFnc1wiLCBQbGFpblZhbHVlLmRlZmF1bHRUYWdzKTtcblxuZXhwb3J0cy5TY2hlbWEgPSBTY2hlbWE7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciByZXNvbHZlU2VxID0gcmVxdWlyZSgnLi9yZXNvbHZlU2VxLWQwM2NiMDM3LmpzJyk7XG52YXIgU2NoZW1hID0gcmVxdWlyZSgnLi9TY2hlbWEtODhlMzIzYTcuanMnKTtcbnJlcXVpcmUoJy4vUGxhaW5WYWx1ZS1lYzhlNTg4ZS5qcycpO1xucmVxdWlyZSgnLi93YXJuaW5ncy0xMDAwYTM3Mi5qcycpO1xuXG5cblxuZXhwb3J0cy5BbGlhcyA9IHJlc29sdmVTZXEuQWxpYXM7XG5leHBvcnRzLkNvbGxlY3Rpb24gPSByZXNvbHZlU2VxLkNvbGxlY3Rpb247XG5leHBvcnRzLk1lcmdlID0gcmVzb2x2ZVNlcS5NZXJnZTtcbmV4cG9ydHMuTm9kZSA9IHJlc29sdmVTZXEuTm9kZTtcbmV4cG9ydHMuUGFpciA9IHJlc29sdmVTZXEuUGFpcjtcbmV4cG9ydHMuU2NhbGFyID0gcmVzb2x2ZVNlcS5TY2FsYXI7XG5leHBvcnRzLllBTUxNYXAgPSByZXNvbHZlU2VxLllBTUxNYXA7XG5leHBvcnRzLllBTUxTZXEgPSByZXNvbHZlU2VxLllBTUxTZXE7XG5leHBvcnRzLmJpbmFyeU9wdGlvbnMgPSByZXNvbHZlU2VxLmJpbmFyeU9wdGlvbnM7XG5leHBvcnRzLmJvb2xPcHRpb25zID0gcmVzb2x2ZVNlcS5ib29sT3B0aW9ucztcbmV4cG9ydHMuaW50T3B0aW9ucyA9IHJlc29sdmVTZXEuaW50T3B0aW9ucztcbmV4cG9ydHMubnVsbE9wdGlvbnMgPSByZXNvbHZlU2VxLm51bGxPcHRpb25zO1xuZXhwb3J0cy5zdHJPcHRpb25zID0gcmVzb2x2ZVNlcS5zdHJPcHRpb25zO1xuZXhwb3J0cy5TY2hlbWEgPSBTY2hlbWEuU2NoZW1hO1xuIiwiY29uc3QgdHlwZXMgPSByZXF1aXJlKCcuL2Rpc3QvdHlwZXMnKVxuXG5leHBvcnRzLmJpbmFyeU9wdGlvbnMgPSB0eXBlcy5iaW5hcnlPcHRpb25zXG5leHBvcnRzLmJvb2xPcHRpb25zID0gdHlwZXMuYm9vbE9wdGlvbnNcbmV4cG9ydHMuaW50T3B0aW9ucyA9IHR5cGVzLmludE9wdGlvbnNcbmV4cG9ydHMubnVsbE9wdGlvbnMgPSB0eXBlcy5udWxsT3B0aW9uc1xuZXhwb3J0cy5zdHJPcHRpb25zID0gdHlwZXMuc3RyT3B0aW9uc1xuXG5leHBvcnRzLlNjaGVtYSA9IHR5cGVzLlNjaGVtYVxuZXhwb3J0cy5BbGlhcyA9IHR5cGVzLkFsaWFzXG5leHBvcnRzLkNvbGxlY3Rpb24gPSB0eXBlcy5Db2xsZWN0aW9uXG5leHBvcnRzLk1lcmdlID0gdHlwZXMuTWVyZ2VcbmV4cG9ydHMuTm9kZSA9IHR5cGVzLk5vZGVcbmV4cG9ydHMuUGFpciA9IHR5cGVzLlBhaXJcbmV4cG9ydHMuU2NhbGFyID0gdHlwZXMuU2NhbGFyXG5leHBvcnRzLllBTUxNYXAgPSB0eXBlcy5ZQU1MTWFwXG5leHBvcnRzLllBTUxTZXEgPSB0eXBlcy5ZQU1MU2VxXG4iLCJpbXBvcnQgeWFtbCBmcm9tICd5YW1sJztcbmltcG9ydCB7IFlBTUxNYXAsIFlBTUxTZXEgfSBmcm9tICd5YW1sL3R5cGVzJztcbmltcG9ydCBvcHRpb25BUEkgZnJvbSAnLi4vYXBpL29wdGlvbic7XG5cbmZ1bmN0aW9uIGdldEluKG9iaiwgcGF0aCkge1xuICByZXR1cm4gcGF0aC5yZWR1Y2UoKHYsIGspID0+IChrIGluIHYgPyB2W2tdIDoge30pLCBvYmopO1xufVxuXG5mdW5jdGlvbiBhZGRDb21tZW50cyhjb250ZXh0LCBwYXRoLCBjb21tZW50Tm9kZSwgaXRlck5vZGUgPSBjb21tZW50Tm9kZSkge1xuICBjb25zdCB7IHRpdGxlLCBkZXNjcmlwdGlvbiwgY29tbWVudCB9ID0gZ2V0SW4oY29udGV4dCwgcGF0aCk7XG4gIGNvbnN0IGxpbmVzID0gW107XG5cbiAgaWYgKG9wdGlvbkFQSSgncmVuZGVyVGl0bGUnKSAmJiB0aXRsZSkge1xuICAgIGxpbmVzLnB1c2goYCAke3RpdGxlfWAsICcnKTtcbiAgfVxuICBpZiAob3B0aW9uQVBJKCdyZW5kZXJEZXNjcmlwdGlvbicpICYmIGRlc2NyaXB0aW9uKSB7XG4gICAgbGluZXMucHVzaChgICR7ZGVzY3JpcHRpb259YCk7XG4gIH1cbiAgaWYgKG9wdGlvbkFQSSgncmVuZGVyQ29tbWVudCcpICYmIGNvbW1lbnQpIHtcbiAgICBsaW5lcy5wdXNoKGAgJHtjb21tZW50fWApO1xuICB9XG5cbiAgY29tbWVudE5vZGUuY29tbWVudEJlZm9yZSA9IGxpbmVzLmpvaW4oJ1xcbicpO1xuXG4gIGlmIChpdGVyTm9kZSBpbnN0YW5jZW9mIFlBTUxNYXApIHtcbiAgICBpdGVyTm9kZS5pdGVtcy5mb3JFYWNoKG4gPT4ge1xuICAgICAgYWRkQ29tbWVudHMoY29udGV4dCwgWy4uLnBhdGgsICdpdGVtcycsIG4ua2V5LnZhbHVlXSwgbi5rZXksIG4udmFsdWUpO1xuICAgIH0pO1xuICB9IGVsc2UgaWYgKGl0ZXJOb2RlIGluc3RhbmNlb2YgWUFNTFNlcSkge1xuICAgIGl0ZXJOb2RlLml0ZW1zLmZvckVhY2goKG4sIGkpID0+IHtcbiAgICAgIGFkZENvbW1lbnRzKGNvbnRleHQsIFsuLi5wYXRoLCAnaXRlbXMnLCBpXSwgbik7XG4gICAgfSk7XG4gIH1cbn1cblxuLyoqIFJlbmRlciBZQU1MIHN0cmluZyBmcm9tIHRoZSBnZW5lcmF0ZWQgdmFsdWUgYW5kIGNvbnRleHRcbiAqXG4gKiBAcGFyYW0gdmFsdWVcbiAqIEBwYXJhbSBjb250ZXh0XG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiByZW5kZXJZQU1MKHsgdmFsdWUsIGNvbnRleHQgfSkge1xuICBjb25zdCBub2RlcyA9IHlhbWwuY3JlYXRlTm9kZSh2YWx1ZSk7XG5cbiAgYWRkQ29tbWVudHMoY29udGV4dCwgW10sIG5vZGVzKTtcblxuICBjb25zdCBkb2MgPSBuZXcgeWFtbC5Eb2N1bWVudCgpO1xuICBkb2MuY29udGVudHMgPSBub2RlcztcblxuICByZXR1cm4gZG9jLnRvU3RyaW5nKCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHJlbmRlcllBTUw7XG4iLCJpbXBvcnQgcmVuZGVySlMgZnJvbSAnLi9qcyc7XG5pbXBvcnQgcmVuZGVyWUFNTCBmcm9tICcuL3lhbWwnO1xuXG5leHBvcnQge1xuICByZW5kZXJKUyxcbiAgcmVuZGVyWUFNTCxcbn07XG4iLCJpbXBvcnQgeyBnZXREZXBlbmRlbmNpZXMgfSBmcm9tICcuL3ZlbmRvcic7XG5pbXBvcnQgQ29udGFpbmVyIGZyb20gJy4vY2xhc3MvQ29udGFpbmVyJztcbmltcG9ydCBmb3JtYXQgZnJvbSAnLi9hcGkvZm9ybWF0JztcbmltcG9ydCBvcHRpb24gZnJvbSAnLi9hcGkvb3B0aW9uJztcbmltcG9ydCBlbnYgZnJvbSAnLi9jb3JlL2NvbnN0YW50cyc7XG5pbXBvcnQgcmFuZG9tIGZyb20gJy4vY29yZS9yYW5kb20nO1xuaW1wb3J0IHV0aWxzIGZyb20gJy4vY29yZS91dGlscyc7XG5pbXBvcnQgcnVuIGZyb20gJy4vY29yZS9ydW4nO1xuaW1wb3J0IHsgcmVuZGVySlMsIHJlbmRlcllBTUwgfSBmcm9tICcuL3JlbmRlcmVycyc7XG5cbmNvbnN0IGNvbnRhaW5lciA9IG5ldyBDb250YWluZXIoKTtcblxuZnVuY3Rpb24gc2V0dXBLZXl3b3JkcygpIHtcbiAgLy8gc2FmZSBhdXRvLWluY3JlbWVudCB2YWx1ZXNcbiAgY29udGFpbmVyLmRlZmluZSgnYXV0b0luY3JlbWVudCcsIGZ1bmN0aW9uIGF1dG9JbmNyZW1lbnQodmFsdWUsIHNjaGVtYSkge1xuICAgIGlmICghdGhpcy5vZmZzZXQpIHtcbiAgICAgIGNvbnN0IG1pbiA9IHNjaGVtYS5taW5pbXVtIHx8IDE7XG4gICAgICBjb25zdCBtYXggPSBtaW4gKyBlbnYuTUFYX05VTUJFUjtcbiAgICAgIGNvbnN0IG9mZnNldCA9IHZhbHVlLmluaXRpYWxPZmZzZXQgfHwgc2NoZW1hLmluaXRpYWxPZmZzZXQ7XG5cbiAgICAgIHRoaXMub2Zmc2V0ID0gb2Zmc2V0IHx8IHJhbmRvbS5udW1iZXIobWluLCBtYXgpO1xuICAgIH1cblxuICAgIGlmICh2YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgcmV0dXJuIHRoaXMub2Zmc2V0Kys7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICB9XG5cbiAgICByZXR1cm4gc2NoZW1hO1xuICB9KTtcblxuICAvLyBzYWZlLWFuZC1zZXF1ZW50aWFsIGRhdGVzXG4gIGNvbnRhaW5lci5kZWZpbmUoJ3NlcXVlbnRpYWxEYXRlJywgZnVuY3Rpb24gc2VxdWVudGlhbERhdGUodmFsdWUsIHNjaGVtYSkge1xuICAgIGlmICghdGhpcy5ub3cpIHtcbiAgICAgIHRoaXMubm93ID0gcmFuZG9tLmRhdGUoKTtcbiAgICB9XG5cbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIHNjaGVtYSA9IHRoaXMubm93LnRvSVNPU3RyaW5nKCk7XG4gICAgICB2YWx1ZSA9IHZhbHVlID09PSB0cnVlXG4gICAgICAgID8gJ2RheXMnXG4gICAgICAgIDogdmFsdWU7XG5cbiAgICAgIGlmIChbJ3NlY29uZHMnLCAnbWludXRlcycsICdob3VycycsICdkYXlzJywgJ3dlZWtzJywgJ21vbnRocycsICd5ZWFycyddLmluZGV4T2YodmFsdWUpID09PSAtMSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuc3VwcG9ydGVkIGluY3JlbWVudCBieSAke3V0aWxzLnNob3J0KHZhbHVlKX1gKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5ub3cuc2V0VGltZSh0aGlzLm5vdy5nZXRUaW1lKCkgKyByYW5kb20uZGF0ZSh2YWx1ZSkpO1xuICAgIH1cblxuICAgIHJldHVybiBzY2hlbWE7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBnZXRSZWZzKHJlZnMsIHNjaGVtYSkge1xuICBsZXQgJHJlZnMgPSB7fTtcblxuICBpZiAoQXJyYXkuaXNBcnJheShyZWZzKSkge1xuICAgIHJlZnMuZm9yRWFjaChfc2NoZW1hID0+IHtcbiAgICAgICRyZWZzW19zY2hlbWEuJGlkIHx8IF9zY2hlbWEuaWRdID0gX3NjaGVtYTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICAkcmVmcyA9IHJlZnMgfHwge307XG4gIH1cblxuICBmdW5jdGlvbiB3YWxrKG9iaikge1xuICAgIGlmICghb2JqIHx8IHR5cGVvZiBvYmogIT09ICdvYmplY3QnKSByZXR1cm47XG4gICAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkgcmV0dXJuIG9iai5mb3JFYWNoKHdhbGspO1xuXG4gICAgY29uc3QgX2lkID0gb2JqLiRpZCB8fCBvYmouaWQ7XG5cbiAgICBpZiAodHlwZW9mIF9pZCA9PT0gJ3N0cmluZycgJiYgISRyZWZzW19pZF0pIHtcbiAgICAgICRyZWZzW19pZF0gPSBvYmo7XG4gICAgfVxuXG4gICAgT2JqZWN0LmtleXMob2JqKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICB3YWxrKG9ialtrZXldKTtcbiAgICB9KTtcbiAgfVxuXG4gIHdhbGsocmVmcyk7XG4gIHdhbGsoc2NoZW1hKTtcblxuICByZXR1cm4gJHJlZnM7XG59XG5cbmNvbnN0IGpzZiA9IChzY2hlbWEsIHJlZnMsIGN3ZCkgPT4ge1xuICBjb25zb2xlLmxvZygnW2pzb24tc2NoZW1hLWZha2VyXSBjYWxsaW5nIEpzb25TY2hlbWFGYWtlcigpIGlzIGRlcHJlY2F0ZWQsIGNhbGwgZWl0aGVyIC5nZW5lcmF0ZSgpIG9yIC5yZXNvbHZlKCknKTtcblxuICBpZiAoY3dkKSB7XG4gICAgY29uc29sZS5sb2coJ1tqc29uLXNjaGVtYS1mYWtlcl0gcmVmZXJlbmNlcyBhcmUgb25seSBzdXBwb3J0ZWQgYnkgY2FsbGluZyAucmVzb2x2ZSgpJyk7XG4gIH1cblxuICByZXR1cm4ganNmLmdlbmVyYXRlKHNjaGVtYSwgcmVmcyk7XG59O1xuXG5qc2YuZ2VuZXJhdGVXaXRoQ29udGV4dCA9IChzY2hlbWEsIHJlZnMpID0+IHtcbiAgY29uc3QgJHJlZnMgPSBnZXRSZWZzKHJlZnMsIHNjaGVtYSk7XG5cbiAgcmV0dXJuIHJ1bigkcmVmcywgc2NoZW1hLCBjb250YWluZXIsIHRydWUpO1xufTtcblxuanNmLmdlbmVyYXRlID0gKHNjaGVtYSwgcmVmcykgPT4gcmVuZGVySlMoXG4gICAganNmLmdlbmVyYXRlV2l0aENvbnRleHQoc2NoZW1hLCByZWZzKSxcbiAgKTtcblxuanNmLmdlbmVyYXRlWUFNTCA9IChzY2hlbWEsIHJlZnMpID0+IHJlbmRlcllBTUwoXG4gICAganNmLmdlbmVyYXRlV2l0aENvbnRleHQoc2NoZW1hLCByZWZzKSxcbiAgKTtcblxuanNmLnJlc29sdmVXaXRoQ29udGV4dCA9IChzY2hlbWEsIHJlZnMsIGN3ZCkgPT4ge1xuICBpZiAodHlwZW9mIHJlZnMgPT09ICdzdHJpbmcnKSB7XG4gICAgY3dkID0gcmVmcztcbiAgICByZWZzID0ge307XG4gIH1cblxuICAvLyBub3JtYWxpemUgYmFzZWRpciAoYnJvd3NlciBhd2FyZSlcbiAgY3dkID0gY3dkIHx8ICh0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgPyBwcm9jZXNzLmN3ZCgpIDogJycpO1xuICBjd2QgPSBgJHtjd2QucmVwbGFjZSgvXFwvKyQvLCAnJyl9L2A7XG5cbiAgY29uc3QgJHJlZnMgPSBnZXRSZWZzKHJlZnMsIHNjaGVtYSk7XG5cbiAgLy8gaWRlbnRpY2FsIHNldHVwIGFzIGpzb24tc2NoZW1hLXNlcXVlbGl6ZXJcbiAgY29uc3QgZml4ZWRSZWZzID0ge1xuICAgIG9yZGVyOiAxLFxuICAgIGNhblJlYWQoZmlsZSkge1xuICAgICAgY29uc3Qga2V5ID0gZmlsZS51cmwucmVwbGFjZSgnLzonLCAnOicpO1xuXG4gICAgICByZXR1cm4gJHJlZnNba2V5XSB8fCAkcmVmc1trZXkuc3BsaXQoJy8nKS5wb3AoKV07XG4gICAgfSxcbiAgICByZWFkKGZpbGUsIGNhbGxiYWNrKSB7XG4gICAgICB0cnkge1xuICAgICAgICBjYWxsYmFjayhudWxsLCB0aGlzLmNhblJlYWQoZmlsZSkpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWxsYmFjayhlKTtcbiAgICAgIH1cbiAgICB9LFxuICB9O1xuXG4gIGNvbnN0IHsgJFJlZlBhcnNlciB9ID0gZ2V0RGVwZW5kZW5jaWVzKCk7XG5cbiAgcmV0dXJuICRSZWZQYXJzZXJcbiAgICAuYnVuZGxlKGN3ZCwgc2NoZW1hLCB7XG4gICAgICByZXNvbHZlOiB7XG4gICAgICAgIGZpbGU6IHsgb3JkZXI6IDEwMCB9LFxuICAgICAgICBodHRwOiB7IG9yZGVyOiAyMDAgfSxcbiAgICAgICAgZml4ZWRSZWZzLFxuICAgICAgfSxcbiAgICAgIGRlcmVmZXJlbmNlOiB7XG4gICAgICAgIGNpcmN1bGFyOiAnaWdub3JlJyxcbiAgICAgIH0sXG4gICAgfSkudGhlbihzdWIgPT4gcnVuKCRyZWZzLCBzdWIsIGNvbnRhaW5lcikpXG4gICAgLmNhdGNoKGUgPT4ge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBFcnJvciB3aGlsZSByZXNvbHZpbmcgc2NoZW1hICgke2UubWVzc2FnZX0pYCk7XG4gICAgfSk7XG59O1xuXG5qc2YucmVzb2x2ZSA9IChzY2hlbWEsIHJlZnMsIGN3ZCkgPT4ganNmLnJlc29sdmVXaXRoQ29udGV4dChzY2hlbWEsIHJlZnMsIGN3ZCkudGhlbihyZW5kZXJKUyk7XG5cbmpzZi5yZXNvbHZlWUFNTCA9IChzY2hlbWEsIHJlZnMsIGN3ZCkgPT4ganNmLnJlc29sdmVXaXRoQ29udGV4dChzY2hlbWEsIHJlZnMsIGN3ZCkudGhlbihyZW5kZXJZQU1MKTtcblxuc2V0dXBLZXl3b3JkcygpO1xuXG5qc2YuZm9ybWF0ID0gZm9ybWF0O1xuanNmLm9wdGlvbiA9IG9wdGlvbjtcbmpzZi5yYW5kb20gPSByYW5kb207XG5cbi8vIHJldHVybnMgaXRzZWxmIGZvciBjaGFpbmluZ1xuanNmLmV4dGVuZCA9IChuYW1lLCBjYikgPT4ge1xuICBjb250YWluZXIuZXh0ZW5kKG5hbWUsIGNiKTtcbiAgcmV0dXJuIGpzZjtcbn07XG5cbmpzZi5kZWZpbmUgPSAobmFtZSwgY2IpID0+IHtcbiAgY29udGFpbmVyLmRlZmluZShuYW1lLCBjYik7XG4gIHJldHVybiBqc2Y7XG59O1xuXG5qc2YucmVzZXQgPSBuYW1lID0+IHtcbiAgY29udGFpbmVyLnJlc2V0KG5hbWUpO1xuICBzZXR1cEtleXdvcmRzKCk7XG4gIHJldHVybiBqc2Y7XG59O1xuXG5qc2YubG9jYXRlID0gbmFtZSA9PiB7XG4gIHJldHVybiBjb250YWluZXIuZ2V0KG5hbWUpO1xufTtcblxudmFyIFZFUlNJT049XCIwLjUuMC1yY3YuMzVcIjtcbmlmICh0eXBlb2YgVkVSU0lPTiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAganNmLlZFUlNJT04gPSBWRVJTSU9OO1xufVxuXG5leHBvcnQgZGVmYXVsdCBqc2Y7XG4iLCIvKipcbiAgLS0tXG4gICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAtLS1cbiAgKi9cblxuaW1wb3J0IHsgc2V0RGVwZW5kZW5jaWVzIH0gZnJvbSAnLi9saWIvdmVuZG9yJztcblxuLyogZ2xvYmFsICRSZWZQYXJzZXIsIEpTT05QYXRoICovXG5pZiAodHlwZW9mICRSZWZQYXJzZXIgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBKU09OUGF0aCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgc2V0RGVwZW5kZW5jaWVzKHsgLi4uSlNPTlBhdGgsICRSZWZQYXJzZXIgfSk7XG59XG5cbmV4cG9ydCB7IGRlZmF1bHQgfSBmcm9tICcuL2xpYic7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztRQUFNLGVBQWU7QUFFZCxRQUFNLGtCQUFrQixNQUFNO0FBQ25DLGFBQU87O0FBR0YsUUFBTSxtQkFBa0IsQ0FBQSxVQUFTO0FBQ3RDLGFBQU8sT0FBTyxjQUFjOzs7Ozs7O0FDSjlCOzt5QkFBZTtNQUNiLGNBQWM7QUFFWixhQUFLLE9BQU87O01BT2QsV0FBVyxNQUFNO0FBQ2YsWUFBSSxDQUFDLE1BQU07QUFDVCxlQUFLLE9BQU87ZUFDUDtBQUNMLGlCQUFPLEtBQUssS0FBSzs7O01BT3JCLFNBQVMsTUFBTSxVQUFVO0FBQ3ZCLGFBQUssS0FBSyxRQUFROztNQU1wQixhQUFhLFNBQVM7QUFDcEIsZUFBTyxLQUFLLFNBQVMsUUFBUSxDQUFBLFNBQVE7QUFDbkMsZUFBSyxLQUFLLFFBQVEsUUFBUTs7O01BTzlCLElBQUksTUFBTTtBQUNSLGNBQU0sU0FBUyxLQUFLLEtBQUs7QUFFekIsZUFBTzs7TUFNVCxPQUFPO0FBQ0wsZUFBTyxLQUFLOzs7QUFJaEIsUUFBTyxtQkFBUTs7Ozs7O0FDdERmOztRQUFNLFdBQVc7QUFFakIsUUFBTyxtQkFBUTtBQUVmLGFBQVMsNEJBQTRCO0FBQ3JDLGFBQVMsb0JBQW9CO0FBRTdCLGFBQVMsbUJBQW1CO0FBQzVCLGFBQVMsb0JBQW9CO0FBQzdCLGFBQVMscUJBQXFCO0FBQzlCLGFBQVMsc0JBQXNCO0FBRS9CLGFBQVMsc0JBQXNCO0FBQy9CLGFBQVMsdUJBQXVCO0FBQ2hDLGFBQVMscUJBQXFCO0FBQzlCLGFBQVMsbUJB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
