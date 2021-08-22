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
      if (refs && refs[path])
        return clone(refs[path]);
      const keyElements = path.replace("#/", "/").split("/");
      let schema = obj.$ref && refs ? refs[obj.$ref] : obj;
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
    var json_schema_faker_default = typeMap;
    module.exports = json_schema_faker_default;
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
      const pruneProperties = optionAPI("pruneProperties") || [];
      Object.keys(schema).forEach((prop) => {
        if (pruneProperties.includes(prop))
          return;
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
    var VERSION = "0.5.0-rcv.38";
    if (typeof VERSION !== "undefined") {
      jsf.VERSION = VERSION;
    }
    var json_schema_faker_default = jsf;
    module.exports = json_schema_faker_default;
  }
});

// main.esm.js
var import_vendor = __toModule(require_vendor());
var import_lib = __toModule(require_lib3());
if (typeof $RefParser !== "undefined" && typeof JSONPath !== "undefined") {
  (0, import_vendor.setDependencies)({ ...JSONPath, $RefParser });
}
var export_default = import_lib.default;
export {
  export_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3JjL2xpYi92ZW5kb3IuanMiLCAic3JjL2xpYi9jbGFzcy9SZWdpc3RyeS5qcyIsICJzcmMvbGliL2FwaS9kZWZhdWx0cy5qcyIsICJzcmMvbGliL2NsYXNzL09wdGlvblJlZ2lzdHJ5LmpzIiwgInNyYy9saWIvYXBpL29wdGlvbi5qcyIsICJzcmMvbGliL2NvcmUvY29uc3RhbnRzLmpzIiwgIm5vZGVfbW9kdWxlcy9yZXQvbGliL3R5cGVzLmpzIiwgIm5vZGVfbW9kdWxlcy9yZXQvbGliL3NldHMuanMiLCAibm9kZV9tb2R1bGVzL3JldC9saWIvdXRpbC5qcyIsICJub2RlX21vZHVsZXMvcmV0L2xpYi9wb3NpdGlvbnMuanMiLCAibm9kZV9tb2R1bGVzL3JldC9saWIvaW5kZXguanMiLCAibm9kZV9tb2R1bGVzL2RyYW5nZS9saWIvaW5kZXguanMiLCAibm9kZV9tb2R1bGVzL3JhbmRleHAvbGliL3JhbmRleHAuanMiLCAic3JjL2xpYi9jb3JlL3JhbmRvbS5qcyIsICJzcmMvbGliL2NvcmUvdXRpbHMuanMiLCAic3JjL2xpYi9jbGFzcy9Db250YWluZXIuanMiLCAic3JjL2xpYi9hcGkvZm9ybWF0LmpzIiwgInNyYy9saWIvY29yZS9lcnJvci5qcyIsICJzcmMvbGliL2NvcmUvaW5mZXIuanMiLCAic3JjL2xpYi9nZW5lcmF0b3JzL2Jvb2xlYW4uanMiLCAic3JjL2xpYi90eXBlcy9ib29sZWFuLmpzIiwgInNyYy9saWIvZ2VuZXJhdG9ycy9udWxsLmpzIiwgInNyYy9saWIvdHlwZXMvbnVsbC5qcyIsICJzcmMvbGliL3R5cGVzL2FycmF5LmpzIiwgInNyYy9saWIvdHlwZXMvbnVtYmVyLmpzIiwgInNyYy9saWIvdHlwZXMvaW50ZWdlci5qcyIsICJzcmMvbGliL2dlbmVyYXRvcnMvd29yZHMuanMiLCAic3JjL2xpYi90eXBlcy9vYmplY3QuanMiLCAic3JjL2xpYi9nZW5lcmF0b3JzL3RodW5rLmpzIiwgInNyYy9saWIvZ2VuZXJhdG9ycy9pcHY0LmpzIiwgInNyYy9saWIvZ2VuZXJhdG9ycy9kYXRlVGltZS5qcyIsICJzcmMvbGliL2dlbmVyYXRvcnMvZGF0ZS5qcyIsICJzcmMvbGliL2dlbmVyYXRvcnMvdGltZS5qcyIsICJzcmMvbGliL2dlbmVyYXRvcnMvY29yZUZvcm1hdC5qcyIsICJzcmMvbGliL3R5cGVzL3N0cmluZy5qcyIsICJzcmMvbGliL3R5cGVzL2luZGV4LmpzIiwgInNyYy9saWIvY29yZS90cmF2ZXJzZS5qcyIsICJzcmMvbGliL2NvcmUvYnVpbGRSZXNvbHZlU2NoZW1hLmpzIiwgInNyYy9saWIvY29yZS9ydW4uanMiLCAic3JjL2xpYi9yZW5kZXJlcnMvanMuanMiLCAibm9kZV9tb2R1bGVzL3lhbWwvZGlzdC9QbGFpblZhbHVlLWVjOGU1ODhlLmpzIiwgIm5vZGVfbW9kdWxlcy95YW1sL2Rpc3QvcmVzb2x2ZVNlcS1kMDNjYjAzNy5qcyIsICJub2RlX21vZHVsZXMveWFtbC9kaXN0L3dhcm5pbmdzLTEwMDBhMzcyLmpzIiwgIm5vZGVfbW9kdWxlcy95YW1sL2Rpc3QvU2NoZW1hLTg4ZTMyM2E3LmpzIiwgIm5vZGVfbW9kdWxlcy95YW1sL2Rpc3QvdHlwZXMuanMiLCAibm9kZV9tb2R1bGVzL3lhbWwvdHlwZXMuanMiLCAic3JjL2xpYi9yZW5kZXJlcnMveWFtbC5qcyIsICJzcmMvbGliL3JlbmRlcmVycy9pbmRleC5qcyIsICJzcmMvbGliL2luZGV4LmpzIiwgIm1haW4uZXNtLmpzIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O1FBQU0sZUFBZTtBQUVkLFFBQU0sa0JBQWtCLE1BQU07QUFDbkMsYUFBTzs7QUFHRixRQUFNLG1CQUFrQixDQUFBLFVBQVM7QUFDdEMsYUFBTyxPQUFPLGNBQWM7Ozs7Ozs7QUNKOUI7O3lCQUFlO01BQ2IsY0FBYztBQUVaLGFBQUssT0FBTzs7TUFPZCxXQUFXLE1BQU07QUFDZixZQUFJLENBQUMsTUFBTTtBQUNULGVBQUssT0FBTztlQUNQO0FB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QTtBQUdYLFFBQU0sYUFBYSxNQUFNO0FBQ3ZCLGFBQU87QUFBQSxRQUNMLEVBQUUsTUFBTSxNQUFNLE1BQU0sT0FBTztBQUFBLFFBQzNCLEVBQUUsTUFBTSxNQUFNLE1BQU0sT0FBTztBQUFBLFFBQzNCLEVBQUUsTUFBTSxNQUFNLE1BQU0sT0FBTztBQUFBLFFBQzNCLEVBQUUsTUFBTSxNQUFNLE1BQU0sT0FBTztBQUFBLFFBQzNCLEVBQUUsTUFBTSxNQUFNLE1BQU0sT0FBTztBQUFBLFFBQzNCLEVBQUUsTUFBTSxNQUFNLE1BQU0sT0FBTztBQUFBLFFBQzNCLEVBQUUsTUFBTSxNQUFNLE1BQU0sT0FBTztBQUFBLFFBQzNCLEVBQUUsTUFBTSxNQUFNLE1BQU0sT0FBTztBQUFBLFFBQzNCLEVBQUUsTUFBTSxNQUFNLE9BQU8sTUFBTSxNQUFNLElBQUk7QUFBQSxRQUNyQyxFQUFFLE1BQU0sTUFBTSxNQUFNLE9BQU87QUFBQSxRQUMzQixFQUFFLE1BQU0sTUFBTSxNQUFNLE9BQU87QUFBQSxRQUMzQixFQUFFLE1BQU0sTUFBTSxNQUFNLE9BQU87QUFBQSxRQUMzQixFQUFFLE1BQU0sTUFBTSxNQUFNLE9BQU87QUFBQSxRQUMzQixFQUFFLE1BQU0sTUFBTSxNQUFNLE9BQU87QUFBQSxRQUMzQixFQUFFLE1BQU0sTUFBTSxNQUFNLE9BQU87QUFBQTtBQUFBO0FBSS9CLFFBQU0sYUFBYSxNQUFNO0FBQ3ZCLGFBQU87QUFBQSxRQUNMLEVBQUUsTUFBTSxNQUFNLE1BQU0sT0FBTztBQUFBLFFBQzNCLEVBQUUsTUFBTSxNQUFNLE1BQU0sT0FBTztBQUFBLFFBQzNCLEVBQUUsTUFBTSxNQUFNLE1BQU0sT0FBTztBQUFBLFFBQzNCLEVBQUUsTUFBTSxNQUFNLE1BQU0sT0FBTztBQUFBO0FBQUE7QUFLL0IsWUFBUSxRQUFRLE1BQU8sR0FBRSxNQUFNLE1BQU0sS0FBSyxLQUFLLFNBQVMsS0FBSztBQUM3RCxZQUFRLFdBQVcsTUFBTyxHQUFFLE1BQU0sTUFBTSxLQUFLLEtBQUssU0FBUyxLQUFLO0FBQ2hFLFlBQVEs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
