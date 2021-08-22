var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};

// src/lib/vendor.js
var require_vendor = __commonJS({
  "src/lib/vendor.js"(exports, module2) {
    var DEPENDENCIES = {};
    var getDependencies = () => {
      return DEPENDENCIES;
    };
    var setDependencies2 = (value) => {
      Object.assign(DEPENDENCIES, value);
    };
    Object.assign(module2.exports, { getDependencies, setDependencies: setDependencies2 });
  }
});

// src/lib/class/Registry.js
var require_Registry = __commonJS({
  "src/lib/class/Registry.js"(exports, module2) {
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
    module2.exports = Registry_default;
  }
});

// src/lib/api/defaults.js
var require_defaults = __commonJS({
  "src/lib/api/defaults.js"(exports, module2) {
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
    module2.exports = defaults_default;
  }
});

// src/lib/class/OptionRegistry.js
var require_OptionRegistry = __commonJS({
  "src/lib/class/OptionRegistry.js"(exports, module2) {
    var Registry = require_Registry();
    var defaults = require_defaults();
    var OptionRegistry = class extends Registry {
      constructor() {
        super();
        this.data = __spreadValues({}, defaults);
        this._defaults = defaults;
      }
      get defaults() {
        return __spreadValues({}, this._defaults);
      }
    };
    var OptionRegistry_default = OptionRegistry;
    module2.exports = OptionRegistry_default;
  }
});

// src/lib/api/option.js
var require_option = __commonJS({
  "src/lib/api/option.js"(exports, module2) {
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
    module2.exports = option_default;
  }
});

// src/lib/core/constants.js
var require_constants = __commonJS({
  "src/lib/core/constants.js"(exports, module2) {
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
    module2.exports = constants_default;
  }
});

// node_modules/ret/lib/types.js
var require_types = __commonJS({
  "node_modules/ret/lib/types.js"(exports, module2) {
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
  "node_modules/ret/lib/index.js"(exports, module2) {
    var util = require_util();
    var types = require_types();
    var sets = require_sets();
    var positions = require_positions();
    module2.exports = (regexpStr) => {
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
    module2.exports.types = types;
  }
});

// node_modules/drange/lib/index.js
var require_lib2 = __commonJS({
  "node_modules/drange/lib/index.js"(exports, module2) {
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
    module2.exports = DRange;
  }
});

// node_modules/randexp/lib/randexp.js
var require_randexp = __commonJS({
  "node_modules/randexp/lib/randexp.js"(exports, module2) {
    var ret = require_lib();
    var DRange = require_lib2();
    var types = ret.types;
    module2.exports = class RandExp {
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
  "src/lib/core/random.js"(exports, module2) {
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
    module2.exports = random_default;
  }
});

// src/lib/core/utils.js
var require_utils = __commonJS({
  "src/lib/core/utils.js"(exports, module2) {
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
    module2.exports = utils_default;
  }
});

// src/lib/class/Container.js
var require_Container = __commonJS({
  "src/lib/class/Container.js"(exports, module2) {
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
    module2.exports = Container_default;
  }
});

// src/lib/api/format.js
var require_format = __commonJS({
  "src/lib/api/format.js"(exports, module2) {
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
    module2.exports = format_default;
  }
});

// src/lib/core/error.js
var require_error = __commonJS({
  "src/lib/core/error.js"(exports, module2) {
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
    module2.exports = error_default;
  }
});

// src/lib/core/infer.js
var require_infer = __commonJS({
  "src/lib/core/infer.js"(exports, module2) {
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
    module2.exports = infer_default;
  }
});

// src/lib/generators/boolean.js
var require_boolean = __commonJS({
  "src/lib/generators/boolean.js"(exports, module2) {
    var optionAPI = require_option();
    function booleanGenerator() {
      return optionAPI("random")() > 0.5;
    }
    var boolean_default = booleanGenerator;
    module2.exports = boolean_default;
  }
});

// src/lib/types/boolean.js
var require_boolean2 = __commonJS({
  "src/lib/types/boolean.js"(exports, module2) {
    var booleanGenerator = require_boolean();
    var booleanType = booleanGenerator;
    var boolean_default = booleanType;
    module2.exports = boolean_default;
  }
});

// src/lib/generators/null.js
var require_null = __commonJS({
  "src/lib/generators/null.js"(exports, module2) {
    function nullGenerator() {
      return null;
    }
    var null_default = nullGenerator;
    module2.exports = null_default;
  }
});

// src/lib/types/null.js
var require_null2 = __commonJS({
  "src/lib/types/null.js"(exports, module2) {
    var nullGenerator = require_null();
    var nullType = nullGenerator;
    var null_default = nullType;
    module2.exports = null_default;
  }
});

// src/lib/types/array.js
var require_array = __commonJS({
  "src/lib/types/array.js"(exports, module2) {
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
    module2.exports = array_default;
  }
});

// src/lib/types/number.js
var require_number = __commonJS({
  "src/lib/types/number.js"(exports, module2) {
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
    module2.exports = number_default;
  }
});

// src/lib/types/integer.js
var require_integer = __commonJS({
  "src/lib/types/integer.js"(exports, module2) {
    var number = require_number();
    function integerType(value) {
      return number(__spreadValues({ multipleOf: 1 }, value));
    }
    var integer_default = integerType;
    module2.exports = integer_default;
  }
});

// src/lib/generators/words.js
var require_words = __commonJS({
  "src/lib/generators/words.js"(exports, module2) {
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
    module2.exports = words_default;
  }
});

// src/lib/types/object.js
var require_object = __commonJS({
  "src/lib/types/object.js"(exports, module2) {
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
    module2.exports = object_default;
  }
});

// src/lib/generators/thunk.js
var require_thunk = __commonJS({
  "src/lib/generators/thunk.js"(exports, module2) {
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
    module2.exports = thunk_default;
  }
});

// src/lib/generators/ipv4.js
var require_ipv4 = __commonJS({
  "src/lib/generators/ipv4.js"(exports, module2) {
    var random = require_random();
    function ipv4Generator() {
      return [0, 0, 0, 0].map(() => {
        return random.number(0, 255);
      }).join(".");
    }
    var ipv4_default = ipv4Generator;
    module2.exports = ipv4_default;
  }
});

// src/lib/generators/dateTime.js
var require_dateTime = __commonJS({
  "src/lib/generators/dateTime.js"(exports, module2) {
    var random = require_random();
    function dateTimeGenerator() {
      return random.date().toISOString();
    }
    var dateTime_default = dateTimeGenerator;
    module2.exports = dateTime_default;
  }
});

// src/lib/generators/date.js
var require_date = __commonJS({
  "src/lib/generators/date.js"(exports, module2) {
    var dateTimeGenerator = require_dateTime();
    function dateGenerator() {
      return dateTimeGenerator().slice(0, 10);
    }
    var date_default = dateGenerator;
    module2.exports = date_default;
  }
});

// src/lib/generators/time.js
var require_time = __commonJS({
  "src/lib/generators/time.js"(exports, module2) {
    var dateTimeGenerator = require_dateTime();
    function timeGenerator() {
      return dateTimeGenerator().slice(11);
    }
    var time_default = timeGenerator;
    module2.exports = time_default;
  }
});

// src/lib/generators/coreFormat.js
var require_coreFormat = __commonJS({
  "src/lib/generators/coreFormat.js"(exports, module2) {
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
    module2.exports = coreFormat_default;
  }
});

// src/lib/types/string.js
var require_string = __commonJS({
  "src/lib/types/string.js"(exports, module2) {
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
    module2.exports = string_default;
  }
});

// src/lib/types/index.js
var require_types2 = __commonJS({
  "src/lib/types/index.js"(exports, module2) {
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
    module2.exports = json_schema_faker_default;
  }
});

// src/lib/core/traverse.js
var require_traverse = __commonJS({
  "src/lib/core/traverse.js"(exports, module2) {
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
      const context = __spreadProps(__spreadValues({}, getMeta(schema)), {
        schemaPath: path
      });
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
          return { value: utils.clean(value, schema, false), context: __spreadProps(__spreadValues({}, context), { items: innerContext }) };
        }
      }
      if (typeof schema.thunk === "function") {
        const { value, context: innerContext } = traverse(schema.thunk(rootSchema), path, resolve);
        return { value, context: __spreadProps(__spreadValues({}, context), { items: innerContext }) };
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
                context: __spreadProps(__spreadValues({}, context), {
                  items: innerResult.map(Array.isArray(schema.items) ? ({ context: c }) => c : ({ context: c }) => __spreadProps(__spreadValues({}, c), {
                    schemaPath: c.schemaPath.slice(0, -1)
                  }))
                })
              };
            }
            if (type === "object") {
              return { value: innerResult.value, context: __spreadProps(__spreadValues({}, context), { items: innerResult.context }) };
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
      let contextCopy = __spreadValues({}, context);
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
    module2.exports = traverse_default;
  }
});

// src/lib/core/buildResolveSchema.js
var require_buildResolveSchema = __commonJS({
  "src/lib/core/buildResolveSchema.js"(exports, module2) {
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
    module2.exports = buildResolveSchema_default;
  }
});

// src/lib/core/run.js
var require_run = __commonJS({
  "src/lib/core/run.js"(exports, module2) {
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
    module2.exports = run_default;
  }
});

// src/lib/renderers/js.js
var require_js = __commonJS({
  "src/lib/renderers/js.js"(exports, module2) {
    function renderJS(res) {
      return res.value;
    }
    var js_default = renderJS;
    module2.exports = js_default;
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
  "src/lib/renderers/yaml.js"(exports, module2) {
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
    module2.exports = yaml_default;
  }
});

// src/lib/renderers/index.js
var require_renderers = __commonJS({
  "src/lib/renderers/index.js"(exports, module2) {
    var renderJS = require_js();
    var renderYAML = require_yaml();
    Object.assign(module2.exports, { renderJS, renderYAML });
  }
});

// src/lib/index.js
var require_lib3 = __commonJS({
  "src/lib/index.js"(exports, module2) {
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
    module2.exports = json_schema_faker_default;
  }
});

// main.cjs.js
__export(exports, {
  default: () => import_lib.default
});
var import_json_schema_ref_parser = __toModule(require("json-schema-ref-parser"));
var import_jsonpath_plus = __toModule(require("jsonpath-plus"));
var import_vendor = __toModule(require_vendor());
var import_lib = __toModule(require_lib3());
(0, import_vendor.setDependencies)({ $RefParser: import_json_schema_ref_parser.default, JSONPath: import_jsonpath_plus.JSONPath });
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3JjL2xpYi92ZW5kb3IuanMiLCAic3JjL2xpYi9jbGFzcy9SZWdpc3RyeS5qcyIsICJzcmMvbGliL2FwaS9kZWZhdWx0cy5qcyIsICJzcmMvbGliL2NsYXNzL09wdGlvblJlZ2lzdHJ5LmpzIiwgInNyYy9saWIvYXBpL29wdGlvbi5qcyIsICJzcmMvbGliL2NvcmUvY29uc3RhbnRzLmpzIiwgIm5vZGVfbW9kdWxlcy9yZXQvbGliL3R5cGVzLmpzIiwgIm5vZGVfbW9kdWxlcy9yZXQvbGliL3NldHMuanMiLCAibm9kZV9tb2R1bGVzL3JldC9saWIvdXRpbC5qcyIsICJub2RlX21vZHVsZXMvcmV0L2xpYi9wb3NpdGlvbnMuanMiLCAibm9kZV9tb2R1bGVzL3JldC9saWIvaW5kZXguanMiLCAibm9kZV9tb2R1bGVzL2RyYW5nZS9saWIvaW5kZXguanMiLCAibm9kZV9tb2R1bGVzL3JhbmRleHAvbGliL3JhbmRleHAuanMiLCAic3JjL2xpYi9jb3JlL3JhbmRvbS5qcyIsICJzcmMvbGliL2NvcmUvdXRpbHMuanMiLCAic3JjL2xpYi9jbGFzcy9Db250YWluZXIuanMiLCAic3JjL2xpYi9hcGkvZm9ybWF0LmpzIiwgInNyYy9saWIvY29yZS9lcnJvci5qcyIsICJzcmMvbGliL2NvcmUvaW5mZXIuanMiLCAic3JjL2xpYi9nZW5lcmF0b3JzL2Jvb2xlYW4uanMiLCAic3JjL2xpYi90eXBlcy9ib29sZWFuLmpzIiwgInNyYy9saWIvZ2VuZXJhdG9ycy9udWxsLmpzIiwgInNyYy9saWIvdHlwZXMvbnVsbC5qcyIsICJzcmMvbGliL3R5cGVzL2FycmF5LmpzIiwgInNyYy9saWIvdHlwZXMvbnVtYmVyLmpzIiwgInNyYy9saWIvdHlwZXMvaW50ZWdlci5qcyIsICJzcmMvbGliL2dlbmVyYXRvcnMvd29yZHMuanMiLCAic3JjL2xpYi90eXBlcy9vYmplY3QuanMiLCAic3JjL2xpYi9nZW5lcmF0b3JzL3RodW5rLmpzIiwgInNyYy9saWIvZ2VuZXJhdG9ycy9pcHY0LmpzIiwgInNyYy9saWIvZ2VuZXJhdG9ycy9kYXRlVGltZS5qcyIsICJzcmMvbGliL2dlbmVyYXRvcnMvZGF0ZS5qcyIsICJzcmMvbGliL2dlbmVyYXRvcnMvdGltZS5qcyIsICJzcmMvbGliL2dlbmVyYXRvcnMvY29yZUZvcm1hdC5qcyIsICJzcmMvbGliL3R5cGVzL3N0cmluZy5qcyIsICJzcmMvbGliL3R5cGVzL2luZGV4LmpzIiwgInNyYy9saWIvY29yZS90cmF2ZXJzZS5qcyIsICJzcmMvbGliL2NvcmUvYnVpbGRSZXNvbHZlU2NoZW1hLmpzIiwgInNyYy9saWIvY29yZS9ydW4uanMiLCAic3JjL2xpYi9yZW5kZXJlcnMvanMuanMiLCAibm9kZV9tb2R1bGVzL3lhbWwvZGlzdC9QbGFpblZhbHVlLWVjOGU1ODhlLmpzIiwgIm5vZGVfbW9kdWxlcy95YW1sL2Rpc3QvcmVzb2x2ZVNlcS1kMDNjYjAzNy5qcyIsICJub2RlX21vZHVsZXMveWFtbC9kaXN0L3dhcm5pbmdzLTEwMDBhMzcyLmpzIiwgIm5vZGVfbW9kdWxlcy95YW1sL2Rpc3QvU2NoZW1hLTg4ZTMyM2E3LmpzIiwgIm5vZGVfbW9kdWxlcy95YW1sL2Rpc3QvdHlwZXMuanMiLCAibm9kZV9tb2R1bGVzL3lhbWwvdHlwZXMuanMiLCAic3JjL2xpYi9yZW5kZXJlcnMveWFtbC5qcyIsICJzcmMvbGliL3JlbmRlcmVycy9pbmRleC5qcyIsICJzcmMvbGliL2luZGV4LmpzIiwgIm1haW4uY2pzLmpzIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O1FBQU0sZUFBZTtBQUVkLFFBQU0sa0JBQWtCLE1BQU07QUFDbkMsYUFBTzs7QUFHRixRQUFNLG1CQUFrQixDQUFBLFVBQVM7QUFDdEMsYUFBTyxPQUFPLGNBQWM7Ozs7Ozs7QUNKOUI7O3lCQUFlO01BQ2IsY0FBYztBQUVaLGFBQUssT0FBTzs7TUFPZCxXQUFXLE1BQU07QUFDZixZQUFJLENBQUMsTUFBTTtB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QUFJO0FBQUEsUUFDbkMsT0FBTztBQUFBO0FBR1gsUUFBTSxhQUFhLE1BQU07QUFDdkIsYUFBTztBQUFBLFFBQ0wsRUFBRSxNQUFNLE1BQU0sTUFBTSxPQUFPO0FBQUEsUUFDM0IsRUFBRSxNQUFNLE1BQU0sTUFBTSxPQUFPO0FBQUEsUUFDM0IsRUFBRSxNQUFNLE1BQU0sTUFBTSxPQUFPO0FBQUEsUUFDM0IsRUFBRSxNQUFNLE1BQU0sTUFBTSxPQUFPO0FBQUEsUUFDM0IsRUFBRSxNQUFNLE1BQU0sTUFBTSxPQUFPO0FBQUEsUUFDM0IsRUFBRSxNQUFNLE1BQU0sTUFBTSxPQUFPO0FBQUEsUUFDM0IsRUFBRSxNQUFNLE1BQU0sTUFBTSxPQUFPO0FBQUEsUUFDM0IsRUFBRSxNQUFNLE1BQU0sTUFBTSxPQUFPO0FBQUEsUUFDM0IsRUFBRSxNQUFNLE1BQU0sT0FBTyxNQUFNLE1BQU0sSUFBSTtBQUFBLFFBQ3JDLEVBQUUsTUFBTSxNQUFNLE1BQU0sT0FBTztBQUFBLFFBQzNCLEVBQUUsTUFBTSxNQUFNLE1BQU0sT0FBTztBQUFBLFFBQzNCLEVBQUUsTUFBTSxNQUFNLE1BQU0sT0FBTztBQUFBLFFBQzNCLEVBQUUsTUFBTSxNQUFNLE1BQU0sT0FBTztBQUFBLFFBQzNCLEVBQUUsTUFBTSxNQUFNLE1BQU0sT0FBTztBQUFBLFFBQzNCLEVBQUUsTUFBTSxNQUFNLE1BQU0sT0FBTztBQUFBO0FBQUE7QUFJL0IsUUFBTSxhQUFhLE1BQU07QUFDdkIsYUFBTztBQUFBLFFBQ0wsRUFBRSxNQUFNLE1BQU0sTUFBTSxPQUFPO0FBQUEsUUFDM0IsRUFBRSxNQUFNLE1BQU0sTUFBTSxPQUFPO0FBQUEsUUFDM0IsRUFBRSxNQUFNLE1BQU0sTUFBTSxPQUFPO0FBQUEsUUFDM0IsRUFBRSxNQUFNLE1BQU0sTUFBTSxPQUFPO0FBQUE7QUFBQTtBQUsvQixZQUFRLFFBQVEsTUFBTyxHQUFFLE1BQU0sTUFBTSxLQUFLLEtBQUssU0FBUyxLQUFLO0FBQzdELFlBQVEsV0FBVyxNQUFPLEdBQUUsTUFBTSxNQUFNLEtBQUssS0FB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
