var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
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
    exports.words = () => ({ type: types2.SET, set: WORDS(), not: false });
    exports.notWords = () => ({ type: types2.SET, set: WORDS(), not: true });
    exports.ints = () => ({ type: types2.SET, set: INTS(), not: false });
    exports.notInts = () => ({ type: types2.SET, set: INTS(), not: true });
    exports.whitespace = () => ({ type: types2.SET, set: WHITESPACE(), not: false });
    exports.notWhitespace = () => ({ type: types2.SET, set: WHITESPACE(), not: true });
    exports.anyChar = () => ({ type: types2.SET, set: NOTANYCHAR(), not: true });
  }
});

// node_modules/ret/lib/util.js
var require_util = __commonJS({
  "node_modules/ret/lib/util.js"(exports) {
    var types2 = require_types();
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
    var types2 = require_types();
    exports.wordBoundary = () => ({ type: types2.POSITION, value: "b" });
    exports.nonWordBoundary = () => ({ type: types2.POSITION, value: "B" });
    exports.begin = () => ({ type: types2.POSITION, value: "^" });
    exports.end = () => ({ type: types2.POSITION, value: "$" });
  }
});

// node_modules/ret/lib/index.js
var require_lib = __commonJS({
  "node_modules/ret/lib/index.js"(exports, module) {
    var util = require_util();
    var types2 = require_types();
    var sets = require_sets();
    var positions = require_positions();
    module.exports = (regexpStr) => {
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
    module.exports.types = types2;
  }
});

// node_modules/drange/lib/index.js
var require_lib2 = __commonJS({
  "node_modules/drange/lib/index.js"(exports, module) {
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
    module.exports = DRange;
  }
});

// node_modules/randexp/lib/randexp.js
var require_randexp = __commonJS({
  "node_modules/randexp/lib/randexp.js"(exports, module) {
    var ret = require_lib();
    var DRange = require_lib2();
    var types2 = ret.types;
    module.exports = class RandExp2 {
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
    exports.Char = Char;
    exports.Node = Node2;
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
    exports.Alias = Alias2;
    exports.Collection = Collection2;
    exports.Merge = Merge2;
    exports.Node = Node2;
    exports.Pair = Pair2;
    exports.Scalar = Scalar2;
    exports.YAMLMap = YAMLMap2;
    exports.YAMLSeq = YAMLSeq2;
    exports.addComment = addComment;
    exports.binaryOptions = binaryOptions2;
    exports.boolOptions = boolOptions2;
    exports.findPair = findPair;
    exports.intOptions = intOptions2;
    exports.isEmptyPath = isEmptyPath;
    exports.nullOptions = nullOptions2;
    exports.resolveMap = resolveMap;
    exports.resolveNode = resolveNode;
    exports.resolveSeq = resolveSeq;
    exports.resolveString = resolveString;
    exports.strOptions = strOptions2;
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
    exports.Schema = Schema2;
  }
});

// node_modules/yaml/dist/types.js
var require_types2 = __commonJS({
  "node_modules/yaml/dist/types.js"(exports) {
    "use strict";
    var resolveSeq = require_resolveSeq_d03cb037();
    var Schema2 = require_Schema_88e323a7();
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
    exports.Schema = Schema2.Schema;
  }
});

// src/lib/vendor.mjs
var DEPENDENCIES = {};
var getDependencies = () => {
  return DEPENDENCIES;
};
var setDependencies = (value) => {
  Object.assign(DEPENDENCIES, value);
};

// src/lib/class/Registry.mjs
var Registry = class {
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
var Registry_default = Registry;

// src/lib/api/defaults.mjs
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

// src/lib/class/OptionRegistry.mjs
var OptionRegistry = class extends Registry_default {
  constructor() {
    super();
    this.data = { ...defaults_default };
    this._defaults = defaults_default;
  }
  get defaults() {
    return { ...this._defaults };
  }
};
var OptionRegistry_default = OptionRegistry;

// src/lib/api/option.mjs
var registry = new OptionRegistry_default();
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

// src/lib/core/constants.mjs
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

// src/lib/core/random.mjs
var import_randexp = __toESM(require_randexp(), 1);
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
var random_default = {
  pick,
  date,
  shuffle,
  number,
  randexp: _randexp
};

// src/lib/core/utils.mjs
var RE_NUMERIC = /^(0|[1-9][0-9]*)$/;
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
var utils_default = {
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
var Container = class {
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
var Container_default = Container;

// src/lib/api/format.mjs
var registry2 = new Registry_default();
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
var format_default = formatAPI;

// src/lib/core/error.mjs
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

// src/lib/core/infer.mjs
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

// src/lib/generators/boolean.mjs
function booleanGenerator() {
  return option_default("random")() > 0.5;
}
var boolean_default = booleanGenerator;

// src/lib/types/boolean.mjs
var booleanType = boolean_default;
var boolean_default2 = booleanType;

// src/lib/generators/null.mjs
function nullGenerator() {
  return null;
}
var null_default = nullGenerator;

// src/lib/types/null.mjs
var nullType = null_default;
var null_default2 = nullType;

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
var array_default = arrayType;

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
var number_default = numberType;

// src/lib/types/integer.mjs
function integerType(value) {
  return Math.floor(number_default({ ...value }));
}
var integer_default = integerType;

// src/lib/generators/words.mjs
var LIPSUM_WORDS = `Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore
et dolore magna aliqua Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
commodo consequat Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
pariatur Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est
laborum`.split(/\W/);
function wordsGenerator(length) {
  const words = random_default.shuffle(LIPSUM_WORDS);
  return words.slice(0, length);
}
var words_default = wordsGenerator;

// src/lib/types/object.mjs
var anyType = { type: constants_default.ALLOWED_TYPES };
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
var object_default = objectType;

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
var thunk_default = thunkGenerator;

// src/lib/generators/ipv4.mjs
function ipv4Generator() {
  return [0, 0, 0, 0].map(() => {
    return random_default.number(0, 255);
  }).join(".");
}
var ipv4_default = ipv4Generator;

// src/lib/generators/dateTime.mjs
function dateTimeGenerator() {
  return random_default.date().toISOString();
}
var dateTime_default = dateTimeGenerator;

// src/lib/generators/date.mjs
function dateGenerator() {
  return dateTime_default().slice(0, 10);
}
var date_default = dateGenerator;

// src/lib/generators/time.mjs
function timeGenerator() {
  return dateTime_default().slice(11);
}
var time_default = timeGenerator;

// src/lib/generators/coreFormat.mjs
var FRAGMENT = "[a-zA-Z][a-zA-Z0-9+-.]*";
var URI_PATTERN = `https?://{hostname}(?:${FRAGMENT})+`;
var PARAM_PATTERN = "(?:\\?([a-z]{1,7}(=\\w{1,5})?&){0,3})?";
var regexps = {
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
var ALLOWED_FORMATS = new RegExp(`\\{(${Object.keys(regexps).join("|")})\\}`);
function coreFormatGenerator(coreFormat) {
  return random_default.randexp(regexps[coreFormat]).replace(ALLOWED_FORMATS, (match, key) => {
    return random_default.randexp(regexps[key]);
  });
}
var coreFormat_default = coreFormatGenerator;

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
var string_default = stringType;

// src/lib/types/index.mjs
var typeMap = {
  boolean: boolean_default2,
  null: null_default2,
  array: array_default,
  integer: integer_default,
  number: number_default,
  object: object_default,
  string: string_default
};
var types_default = typeMap;

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
var traverse_default = traverse;

// src/lib/core/buildResolveSchema.mjs
var buildResolveSchema = ({
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
var buildResolveSchema_default = buildResolveSchema;

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
    const { JSONPath } = getDependencies();
    const params = typeof obj.jsonPath !== "object" ? { path: obj.jsonPath } : obj.jsonPath;
    params.group = obj.group || params.group || property;
    params.cycle = obj.cycle || params.cycle || false;
    params.reverse = obj.reverse || params.reverse || false;
    params.count = obj.count || params.count || 1;
    const key = `${params.group}__${params.path}`;
    if (!values[key]) {
      if (params.count > 1) {
        values[key] = JSONPath(params.path, data).slice(0, params.count);
      } else {
        values[key] = JSONPath(params.path, data);
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
var run_default = run;

// src/lib/renderers/js.mjs
function renderJS(res) {
  return res.value;
}
var js_default = renderJS;

// node_modules/yaml/types.mjs
var import_types2 = __toESM(require_types2(), 1);
var binaryOptions = import_types2.default.binaryOptions;
var boolOptions = import_types2.default.boolOptions;
var intOptions = import_types2.default.intOptions;
var nullOptions = import_types2.default.nullOptions;
var strOptions = import_types2.default.strOptions;
var Schema = import_types2.default.Schema;
var Alias = import_types2.default.Alias;
var Collection = import_types2.default.Collection;
var Merge = import_types2.default.Merge;
var Node = import_types2.default.Node;
var Pair = import_types2.default.Pair;
var Scalar = import_types2.default.Scalar;
var YAMLMap = import_types2.default.YAMLMap;
var YAMLSeq = import_types2.default.YAMLSeq;

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
var yaml_default = renderYAML;

// src/lib/index.mjs
var container = new Container_default();
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
var jsf = (schema, refs, cwd) => {
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
  const { $RefParser } = getDependencies();
  return $RefParser.bundle(cwd, schema, {
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
var JSONSchemaFaker = { ...jsf };
var lib_default = jsf;
export {
  JSONSchemaFaker,
  lib_default as default,
  setDependencies
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vbm9kZV9tb2R1bGVzL3JldC9saWIvdHlwZXMuanMiLCAiLi4vbm9kZV9tb2R1bGVzL3JldC9saWIvc2V0cy5qcyIsICIuLi9ub2RlX21vZHVsZXMvcmV0L2xpYi91dGlsLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9yZXQvbGliL3Bvc2l0aW9ucy5qcyIsICIuLi9ub2RlX21vZHVsZXMvcmV0L2xpYi9pbmRleC5qcyIsICIuLi9ub2RlX21vZHVsZXMvZHJhbmdlL2xpYi9pbmRleC5qcyIsICIuLi9ub2RlX21vZHVsZXMvcmFuZGV4cC9saWIvcmFuZGV4cC5qcyIsICIuLi9ub2RlX21vZHVsZXMveWFtbC9kaXN0L1BsYWluVmFsdWUtZWM4ZTU4OGUuanMiLCAiLi4vbm9kZV9tb2R1bGVzL3lhbWwvZGlzdC9yZXNvbHZlU2VxLWQwM2NiMDM3LmpzIiwgIi4uL25vZGVfbW9kdWxlcy95YW1sL2Rpc3Qvd2FybmluZ3MtMTAwMGEzNzIuanMiLCAiLi4vbm9kZV9tb2R1bGVzL3lhbWwvZGlzdC9TY2hlbWEtODhlMzIzYTcuanMiLCAiLi4vbm9kZV9tb2R1bGVzL3lhbWwvZGlzdC90eXBlcy5qcyIsICIuLi9zcmMvbGliL3ZlbmRvci5tanMiLCAiLi4vc3JjL2xpYi9jbGFzcy9SZWdpc3RyeS5tanMiLCAiLi4vc3JjL2xpYi9hcGkvZGVmYXVsdHMubWpzIiwgIi4uL3NyYy9saWIvY2xhc3MvT3B0aW9uUmVnaXN0cnkubWpzIiwgIi4uL3NyYy9saWIvYXBpL29wdGlvbi5tanMiLCAiLi4vc3JjL2xpYi9jb3JlL2NvbnN0YW50cy5tanMiLCAiLi4vc3JjL2xpYi9jb3JlL3JhbmRvbS5tanMiLCAiLi4vc3JjL2xpYi9jb3JlL3V0aWxzLm1qcyIsICIuLi9zcmMvbGliL2NsYXNzL0NvbnRhaW5lci5tanMiLCAiLi4vc3JjL2xpYi9hcGkvZm9ybWF0Lm1qcyIsICIuLi9zcmMvbGliL2NvcmUvZXJyb3IubWpzIiwgIi4uL3NyYy9saWIvY29yZS9pbmZlci5tanMiLCAiLi4vc3JjL2xpYi9nZW5lcmF0b3JzL2Jvb2xlYW4ubWpzIiwgIi4uL3NyYy9saWIvdHlwZXMvYm9vbGVhbi5tanMiLCAiLi4vc3JjL2xpYi9nZW5lcmF0b3JzL251bGwubWpzIiwgIi4uL3NyYy9saWIvdHlwZXMvbnVsbC5tanMiLCAiLi4vc3JjL2xpYi90eXBlcy9hcnJheS5tanMiLCAiLi4vc3JjL2xpYi90eXBlcy9udW1iZXIubWpzIiwgIi4uL3NyYy9saWIvdHlwZXMvaW50ZWdlci5tanMiLCAiLi4vc3JjL2xpYi9nZW5lcmF0b3JzL3dvcmRzLm1qcyIsICIuLi9zcmMvbGliL3R5cGVzL29iamVjdC5tanMiLCAiLi4vc3JjL2xpYi9nZW5lcmF0b3JzL3RodW5rLm1qcyIsICIuLi9zcmMvbGliL2dlbmVyYXRvcnMvaXB2NC5tanMiLCAiLi4vc3JjL2xpYi9nZW5lcmF0b3JzL2RhdGVUaW1lLm1qcyIsICIuLi9zcmMvbGliL2dlbmVyYXRvcnMvZGF0ZS5tanMiLCAiLi4vc3JjL2xpYi9nZW5lcmF0b3JzL3RpbWUubWpzIiwgIi4uL3NyYy9saWIvZ2VuZXJhdG9ycy9jb3JlRm9ybWF0Lm1qcyIsICIuLi9zcmMvbGliL3R5cGVzL3N0cmluZy5tanMiLCAiLi4vc3JjL2xpYi90eXBlcy9pbmRleC5tanMiLCAiLi4vc3JjL2xpYi9jb3JlL3RyYXZlcnNlLm1qcyIsICIuLi9zcmMvbGliL2NvcmUvYnVpbGRSZXNvbHZlU2NoZW1hLm1qcyIsICIuLi9zcmMvbGliL2NvcmUvcnVuLm1qcyIsICIuLi9zcmMvbGliL3JlbmRlcmVycy9qcy5tanMiLCAiLi4vbm9kZV9tb2R1bGVzL3lhbWwvdHlwZXMubWpzIiwgIi4uL3NyYy9saWIvcmVuZGVyZXJzL3lhbWwubWpzIiwgIi4uL3NyYy9saWIvaW5kZXgubWpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgUk9PVCAgICAgICA6IDAsXG4gIEdST1VQICAgICAgOiAxLFxuICBQT1NJVElPTiAgIDogMixcbiAgU0VUICAgICAgICA6IDMsXG4gIFJBTkdFICAgICAgOiA0LFxuICBSRVBFVElUSU9OIDogNSxcbiAgUkVGRVJFTkNFICA6IDYsXG4gIENIQVIgICAgICAgOiA3LFxufTtcbiIsICJjb25zdCB0eXBlcyA9IHJlcXVpcmUoJy4vdHlwZXMnKTtcblxuY29uc3QgSU5UUyA9ICgpID0+IFt7IHR5cGU6IHR5cGVzLlJBTkdFICwgZnJvbTogNDgsIHRvOiA1NyB9XTtcblxuY29uc3QgV09SRFMgPSAoKSA9PiB7XG4gIHJldHVybiBbXG4gICAgeyB0eXBlOiB0eXBlcy5DSEFSLCB2YWx1ZTogOTUgfSxcbiAgICB7IHR5cGU6IHR5cGVzLlJBTkdFLCBmcm9tOiA5NywgdG86IDEyMiB9LFxuICAgIHsgdHlwZTogdHlwZXMuUkFOR0UsIGZyb206IDY1LCB0bzogOTAgfVxuICBdLmNvbmNhdChJTlRTKCkpO1xufTtcblxuY29uc3QgV0hJVEVTUEFDRSA9ICgpID0+IHtcbiAgcmV0dXJuIFtcbiAgICB7IHR5cGU6IHR5cGVzLkNIQVIsIHZhbHVlOiA5IH0sXG4gICAgeyB0eXBlOiB0eXBlcy5DSEFSLCB2YWx1ZTogMTAgfSxcbiAgICB7IHR5cGU6IHR5cGVzLkNIQVIsIHZhbHVlOiAxMSB9LFxuICAgIHsgdHlwZTogdHlwZXMuQ0hBUiwgdmFsdWU6IDEyIH0sXG4gICAgeyB0eXBlOiB0eXBlcy5DSEFSLCB2YWx1ZTogMTMgfSxcbiAgICB7IHR5cGU6IHR5cGVzLkNIQVIsIHZhbHVlOiAzMiB9LFxuICAgIHsgdHlwZTogdHlwZXMuQ0hBUiwgdmFsdWU6IDE2MCB9LFxuICAgIHsgdHlwZTogdHlwZXMuQ0hBUiwgdmFsdWU6IDU3NjAgfSxcbiAgICB7IHR5cGU6IHR5cGVzLlJBTkdFLCBmcm9tOiA4MTkyLCB0bzogODIwMiB9LFxuICAgIHsgdHlwZTogdHlwZXMuQ0hBUiwgdmFsdWU6IDgyMzIgfSxcbiAgICB7IHR5cGU6IHR5cGVzLkNIQVIsIHZhbHVlOiA4MjMzIH0sXG4gICAgeyB0eXBlOiB0eXBlcy5DSEFSLCB2YWx1ZTogODIzOSB9LFxuICAgIHsgdHlwZTogdHlwZXMuQ0hBUiwgdmFsdWU6IDgyODcgfSxcbiAgICB7IHR5cGU6IHR5cGVzLkNIQVIsIHZhbHVlOiAxMjI4OCB9LFxuICAgIHsgdHlwZTogdHlwZXMuQ0hBUiwgdmFsdWU6IDY1Mjc5IH1cbiAgXTtcbn07XG5cbmNvbnN0IE5PVEFOWUNIQVIgPSAoKSA9PiB7XG4gIHJldHVybiBbXG4gICAgeyB0eXBlOiB0eXBlcy5DSEFSLCB2YWx1ZTogMTAgfSxcbiAgICB7IHR5cGU6IHR5cGVzLkNIQVIsIHZhbHVlOiAxMyB9LFxuICAgIHsgdHlwZTogdHlwZXMuQ0hBUiwgdmFsdWU6IDgyMzIgfSxcbiAgICB7IHR5cGU6IHR5cGVzLkNIQVIsIHZhbHVlOiA4MjMzIH0sXG4gIF07XG59O1xuXG4vLyBQcmVkZWZpbmVkIGNsYXNzIG9iamVjdHMuXG5leHBvcnRzLndvcmRzID0gKCkgPT4gKHsgdHlwZTogdHlwZXMuU0VULCBzZXQ6IFdPUkRTKCksIG5vdDogZmFsc2UgfSk7XG5leHBvcnRzLm5vdFdvcmRzID0gKCkgPT4gKHsgdHlwZTogdHlwZXMuU0VULCBzZXQ6IFdPUkRTKCksIG5vdDogdHJ1ZSB9KTtcbmV4cG9ydHMuaW50cyA9ICgpID0+ICh7IHR5cGU6IHR5cGVzLlNFVCwgc2V0OiBJTlRTKCksIG5vdDogZmFsc2UgfSk7XG5leHBvcnRzLm5vdEludHMgPSAoKSA9PiAoeyB0eXBlOiB0eXBlcy5TRVQsIHNldDogSU5UUygpLCBub3Q6IHRydWUgfSk7XG5leHBvcnRzLndoaXRlc3BhY2UgPSAoKSA9PiAoeyB0eXBlOiB0eXBlcy5TRVQsIHNldDogV0hJVEVTUEFDRSgpLCBub3Q6IGZhbHNlIH0pO1xuZXhwb3J0cy5ub3RXaGl0ZXNwYWNlID0gKCkgPT4gKHsgdHlwZTogdHlwZXMuU0VULCBzZXQ6IFdISVRFU1BBQ0UoKSwgbm90OiB0cnVlIH0pO1xuZXhwb3J0cy5hbnlDaGFyID0gKCkgPT4gKHsgdHlwZTogdHlwZXMuU0VULCBzZXQ6IE5PVEFOWUNIQVIoKSwgbm90OiB0cnVlIH0pO1xuIiwgImNvbnN0IHR5cGVzID0gcmVxdWlyZSgnLi90eXBlcycpO1xuY29uc3Qgc2V0cyAgPSByZXF1aXJlKCcuL3NldHMnKTtcblxuXG5jb25zdCBDVFJMID0gJ0BBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWltcXFxcXV4gPyc7XG5jb25zdCBTTFNIID0geyAnMCc6IDAsICd0JzogOSwgJ24nOiAxMCwgJ3YnOiAxMSwgJ2YnOiAxMiwgJ3InOiAxMyB9O1xuXG4vKipcbiAqIEZpbmRzIGNoYXJhY3RlciByZXByZXNlbnRhdGlvbnMgaW4gc3RyIGFuZCBjb252ZXJ0IGFsbCB0b1xuICogdGhlaXIgcmVzcGVjdGl2ZSBjaGFyYWN0ZXJzXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5leHBvcnRzLnN0clRvQ2hhcnMgPSBmdW5jdGlvbihzdHIpIHtcbiAgLyoganNoaW50IG1heGxlbjogZmFsc2UgKi9cbiAgdmFyIGNoYXJzX3JlZ2V4ID0gLyhcXFtcXFxcYlxcXSl8KFxcXFwpP1xcXFwoPzp1KFtBLUYwLTldezR9KXx4KFtBLUYwLTldezJ9KXwoMD9bMC03XXsyfSl8YyhbQEEtWltcXFxcXFxdXj9dKXwoWzB0bnZmcl0pKS9nO1xuICBzdHIgPSBzdHIucmVwbGFjZShjaGFyc19yZWdleCwgZnVuY3Rpb24ocywgYiwgbGJzLCBhMTYsIGIxNiwgYzgsIGRjdHJsLCBlc2xzaCkge1xuICAgIGlmIChsYnMpIHtcbiAgICAgIHJldHVybiBzO1xuICAgIH1cblxuICAgIHZhciBjb2RlID0gYiA/IDggOlxuICAgICAgYTE2ICAgPyBwYXJzZUludChhMTYsIDE2KSA6XG4gICAgICBiMTYgICA/IHBhcnNlSW50KGIxNiwgMTYpIDpcbiAgICAgIGM4ICAgID8gcGFyc2VJbnQoYzgsICAgOCkgOlxuICAgICAgZGN0cmwgPyBDVFJMLmluZGV4T2YoZGN0cmwpIDpcbiAgICAgIFNMU0hbZXNsc2hdO1xuXG4gICAgdmFyIGMgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGNvZGUpO1xuXG4gICAgLy8gRXNjYXBlIHNwZWNpYWwgcmVnZXggY2hhcmFjdGVycy5cbiAgICBpZiAoL1tbXFxde31eJC58PyorKCldLy50ZXN0KGMpKSB7XG4gICAgICBjID0gJ1xcXFwnICsgYztcbiAgICB9XG5cbiAgICByZXR1cm4gYztcbiAgfSk7XG5cbiAgcmV0dXJuIHN0cjtcbn07XG5cblxuLyoqXG4gKiB0dXJucyBjbGFzcyBpbnRvIHRva2Vuc1xuICogcmVhZHMgc3RyIHVudGlsIGl0IGVuY291bnRlcnMgYSBdIG5vdCBwcmVjZWVkZWQgYnkgYSBcXFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEBwYXJhbSB7U3RyaW5nfSByZWdleHBTdHJcbiAqIEByZXR1cm4ge0FycmF5LjxBcnJheS48T2JqZWN0PiwgTnVtYmVyPn1cbiAqL1xuZXhwb3J0cy50b2tlbml6ZUNsYXNzID0gKHN0ciwgcmVnZXhwU3RyKSA9PiB7XG4gIC8qIGpzaGludCBtYXhsZW46IGZhbHNlICovXG4gIHZhciB0b2tlbnMgPSBbXTtcbiAgdmFyIHJlZ2V4cCA9IC9cXFxcKD86KHcpfChkKXwocyl8KFcpfChEKXwoUykpfCgoPzooPzpcXFxcKSguKXwoW15cXF1cXFxcXSkpLSg/OlxcXFwpPyhbXlxcXV0pKXwoXFxdKXwoPzpcXFxcKT8oW15dKS9nO1xuICB2YXIgcnMsIGM7XG5cblxuICB3aGlsZSAoKHJzID0gcmVnZXhwLmV4ZWMoc3RyKSkgIT0gbnVsbCkge1xuICAgIGlmIChyc1sxXSkge1xuICAgICAgdG9rZW5zLnB1c2goc2V0cy53b3JkcygpKTtcblxuICAgIH0gZWxzZSBpZiAocnNbMl0pIHtcbiAgICAgIHRva2Vucy5wdXNoKHNldHMuaW50cygpKTtcblxuICAgIH0gZWxzZSBpZiAocnNbM10pIHtcbiAgICAgIHRva2Vucy5wdXNoKHNldHMud2hpdGVzcGFjZSgpKTtcblxuICAgIH0gZWxzZSBpZiAocnNbNF0pIHtcbiAgICAgIHRva2Vucy5wdXNoKHNldHMubm90V29yZHMoKSk7XG5cbiAgICB9IGVsc2UgaWYgKHJzWzVdKSB7XG4gICAgICB0b2tlbnMucHVzaChzZXRzLm5vdEludHMoKSk7XG5cbiAgICB9IGVsc2UgaWYgKHJzWzZdKSB7XG4gICAgICB0b2tlbnMucHVzaChzZXRzLm5vdFdoaXRlc3BhY2UoKSk7XG5cbiAgICB9IGVsc2UgaWYgKHJzWzddKSB7XG4gICAgICB0b2tlbnMucHVzaCh7XG4gICAgICAgIHR5cGU6IHR5cGVzLlJBTkdFLFxuICAgICAgICBmcm9tOiAocnNbOF0gfHwgcnNbOV0pLmNoYXJDb2RlQXQoMCksXG4gICAgICAgIHRvOiByc1sxMF0uY2hhckNvZGVBdCgwKSxcbiAgICAgIH0pO1xuXG4gICAgfSBlbHNlIGlmICgoYyA9IHJzWzEyXSkpIHtcbiAgICAgIHRva2Vucy5wdXNoKHtcbiAgICAgICAgdHlwZTogdHlwZXMuQ0hBUixcbiAgICAgICAgdmFsdWU6IGMuY2hhckNvZGVBdCgwKSxcbiAgICAgIH0pO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBbdG9rZW5zLCByZWdleHAubGFzdEluZGV4XTtcbiAgICB9XG4gIH1cblxuICBleHBvcnRzLmVycm9yKHJlZ2V4cFN0ciwgJ1VudGVybWluYXRlZCBjaGFyYWN0ZXIgY2xhc3MnKTtcbn07XG5cblxuLyoqXG4gKiBTaG9ydGN1dCB0byB0aHJvdyBlcnJvcnMuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHJlZ2V4cFxuICogQHBhcmFtIHtTdHJpbmd9IG1zZ1xuICovXG5leHBvcnRzLmVycm9yID0gKHJlZ2V4cCwgbXNnKSA9PiB7XG4gIHRocm93IG5ldyBTeW50YXhFcnJvcignSW52YWxpZCByZWd1bGFyIGV4cHJlc3Npb246IC8nICsgcmVnZXhwICsgJy86ICcgKyBtc2cpO1xufTtcbiIsICJjb25zdCB0eXBlcyA9IHJlcXVpcmUoJy4vdHlwZXMnKTtcbmV4cG9ydHMud29yZEJvdW5kYXJ5ID0gKCkgPT4gKHsgdHlwZTogdHlwZXMuUE9TSVRJT04sIHZhbHVlOiAnYicgfSk7XG5leHBvcnRzLm5vbldvcmRCb3VuZGFyeSA9ICgpID0+ICh7IHR5cGU6IHR5cGVzLlBPU0lUSU9OLCB2YWx1ZTogJ0InIH0pO1xuZXhwb3J0cy5iZWdpbiA9ICgpID0+ICh7IHR5cGU6IHR5cGVzLlBPU0lUSU9OLCB2YWx1ZTogJ14nIH0pO1xuZXhwb3J0cy5lbmQgPSAoKSA9PiAoeyB0eXBlOiB0eXBlcy5QT1NJVElPTiwgdmFsdWU6ICckJyB9KTtcbiIsICJjb25zdCB1dGlsICAgICAgPSByZXF1aXJlKCcuL3V0aWwnKTtcbmNvbnN0IHR5cGVzICAgICA9IHJlcXVpcmUoJy4vdHlwZXMnKTtcbmNvbnN0IHNldHMgICAgICA9IHJlcXVpcmUoJy4vc2V0cycpO1xuY29uc3QgcG9zaXRpb25zID0gcmVxdWlyZSgnLi9wb3NpdGlvbnMnKTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IChyZWdleHBTdHIpID0+IHtcbiAgdmFyIGkgPSAwLCBsLCBjLFxuICAgIHN0YXJ0ID0geyB0eXBlOiB0eXBlcy5ST09ULCBzdGFjazogW119LFxuXG4gICAgLy8gS2VlcCB0cmFjayBvZiBsYXN0IGNsYXVzZS9ncm91cCBhbmQgc3RhY2suXG4gICAgbGFzdEdyb3VwID0gc3RhcnQsXG4gICAgbGFzdCA9IHN0YXJ0LnN0YWNrLFxuICAgIGdyb3VwU3RhY2sgPSBbXTtcblxuXG4gIHZhciByZXBlYXRFcnIgPSAoaSkgPT4ge1xuICAgIHV0aWwuZXJyb3IocmVnZXhwU3RyLCBgTm90aGluZyB0byByZXBlYXQgYXQgY29sdW1uICR7aSAtIDF9YCk7XG4gIH07XG5cbiAgLy8gRGVjb2RlIGEgZmV3IGVzY2FwZWQgY2hhcmFjdGVycy5cbiAgdmFyIHN0ciA9IHV0aWwuc3RyVG9DaGFycyhyZWdleHBTdHIpO1xuICBsID0gc3RyLmxlbmd0aDtcblxuICAvLyBJdGVyYXRlIHRocm91Z2ggZWFjaCBjaGFyYWN0ZXIgaW4gc3RyaW5nLlxuICB3aGlsZSAoaSA8IGwpIHtcbiAgICBjID0gc3RyW2krK107XG5cbiAgICBzd2l0Y2ggKGMpIHtcbiAgICAgIC8vIEhhbmRsZSBlc2NhcGVkIGNoYXJhY3RlcnMsIGluY2x1ZXMgYSBmZXcgc2V0cy5cbiAgICAgIGNhc2UgJ1xcXFwnOlxuICAgICAgICBjID0gc3RyW2krK107XG5cbiAgICAgICAgc3dpdGNoIChjKSB7XG4gICAgICAgICAgY2FzZSAnYic6XG4gICAgICAgICAgICBsYXN0LnB1c2gocG9zaXRpb25zLndvcmRCb3VuZGFyeSgpKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgY2FzZSAnQic6XG4gICAgICAgICAgICBsYXN0LnB1c2gocG9zaXRpb25zLm5vbldvcmRCb3VuZGFyeSgpKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgY2FzZSAndyc6XG4gICAgICAgICAgICBsYXN0LnB1c2goc2V0cy53b3JkcygpKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgY2FzZSAnVyc6XG4gICAgICAgICAgICBsYXN0LnB1c2goc2V0cy5ub3RXb3JkcygpKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgY2FzZSAnZCc6XG4gICAgICAgICAgICBsYXN0LnB1c2goc2V0cy5pbnRzKCkpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICBjYXNlICdEJzpcbiAgICAgICAgICAgIGxhc3QucHVzaChzZXRzLm5vdEludHMoKSk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGNhc2UgJ3MnOlxuICAgICAgICAgICAgbGFzdC5wdXNoKHNldHMud2hpdGVzcGFjZSgpKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgY2FzZSAnUyc6XG4gICAgICAgICAgICBsYXN0LnB1c2goc2V0cy5ub3RXaGl0ZXNwYWNlKCkpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgLy8gQ2hlY2sgaWYgYyBpcyBpbnRlZ2VyLlxuICAgICAgICAgICAgLy8gSW4gd2hpY2ggY2FzZSBpdCdzIGEgcmVmZXJlbmNlLlxuICAgICAgICAgICAgaWYgKC9cXGQvLnRlc3QoYykpIHtcbiAgICAgICAgICAgICAgbGFzdC5wdXNoKHsgdHlwZTogdHlwZXMuUkVGRVJFTkNFLCB2YWx1ZTogcGFyc2VJbnQoYywgMTApIH0pO1xuXG4gICAgICAgICAgICAvLyBFc2NhcGVkIGNoYXJhY3Rlci5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGxhc3QucHVzaCh7IHR5cGU6IHR5cGVzLkNIQVIsIHZhbHVlOiBjLmNoYXJDb2RlQXQoMCkgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBicmVhaztcblxuXG4gICAgICAvLyBQb3NpdGlvbmFscy5cbiAgICAgIGNhc2UgJ14nOlxuICAgICAgICBsYXN0LnB1c2gocG9zaXRpb25zLmJlZ2luKCkpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnJCc6XG4gICAgICAgIGxhc3QucHVzaChwb3NpdGlvbnMuZW5kKCkpO1xuICAgICAgICBicmVhaztcblxuXG4gICAgICAvLyBIYW5kbGUgY3VzdG9tIHNldHMuXG4gICAgICBjYXNlICdbJzpcbiAgICAgICAgLy8gQ2hlY2sgaWYgdGhpcyBjbGFzcyBpcyAnYW50aScgaS5lLiBbXmFiY10uXG4gICAgICAgIHZhciBub3Q7XG4gICAgICAgIGlmIChzdHJbaV0gPT09ICdeJykge1xuICAgICAgICAgIG5vdCA9IHRydWU7XG4gICAgICAgICAgaSsrO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG5vdCA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gR2V0IGFsbCB0aGUgY2hhcmFjdGVycyBpbiBjbGFzcy5cbiAgICAgICAgdmFyIGNsYXNzVG9rZW5zID0gdXRpbC50b2tlbml6ZUNsYXNzKHN0ci5zbGljZShpKSwgcmVnZXhwU3RyKTtcblxuICAgICAgICAvLyBJbmNyZWFzZSBpbmRleCBieSBsZW5ndGggb2YgY2xhc3MuXG4gICAgICAgIGkgKz0gY2xhc3NUb2tlbnNbMV07XG4gICAgICAgIGxhc3QucHVzaCh7XG4gICAgICAgICAgdHlwZTogdHlwZXMuU0VULFxuICAgICAgICAgIHNldDogY2xhc3NUb2tlbnNbMF0sXG4gICAgICAgICAgbm90LFxuICAgICAgICB9KTtcblxuICAgICAgICBicmVhaztcblxuXG4gICAgICAvLyBDbGFzcyBvZiBhbnkgY2hhcmFjdGVyIGV4Y2VwdCBcXG4uXG4gICAgICBjYXNlICcuJzpcbiAgICAgICAgbGFzdC5wdXNoKHNldHMuYW55Q2hhcigpKTtcbiAgICAgICAgYnJlYWs7XG5cblxuICAgICAgLy8gUHVzaCBncm91cCBvbnRvIHN0YWNrLlxuICAgICAgY2FzZSAnKCc6XG4gICAgICAgIC8vIENyZWF0ZSBncm91cC5cbiAgICAgICAgdmFyIGdyb3VwID0ge1xuICAgICAgICAgIHR5cGU6IHR5cGVzLkdST1VQLFxuICAgICAgICAgIHN0YWNrOiBbXSxcbiAgICAgICAgICByZW1lbWJlcjogdHJ1ZSxcbiAgICAgICAgfTtcblxuICAgICAgICBjID0gc3RyW2ldO1xuXG4gICAgICAgIC8vIElmIGlmIHRoaXMgaXMgYSBzcGVjaWFsIGtpbmQgb2YgZ3JvdXAuXG4gICAgICAgIGlmIChjID09PSAnPycpIHtcbiAgICAgICAgICBjID0gc3RyW2kgKyAxXTtcbiAgICAgICAgICBpICs9IDI7XG5cbiAgICAgICAgICAvLyBNYXRjaCBpZiBmb2xsb3dlZCBieS5cbiAgICAgICAgICBpZiAoYyA9PT0gJz0nKSB7XG4gICAgICAgICAgICBncm91cC5mb2xsb3dlZEJ5ID0gdHJ1ZTtcblxuICAgICAgICAgIC8vIE1hdGNoIGlmIG5vdCBmb2xsb3dlZCBieS5cbiAgICAgICAgICB9IGVsc2UgaWYgKGMgPT09ICchJykge1xuICAgICAgICAgICAgZ3JvdXAubm90Rm9sbG93ZWRCeSA9IHRydWU7XG5cbiAgICAgICAgICB9IGVsc2UgaWYgKGMgIT09ICc6Jykge1xuICAgICAgICAgICAgdXRpbC5lcnJvcihyZWdleHBTdHIsXG4gICAgICAgICAgICAgIGBJbnZhbGlkIGdyb3VwLCBjaGFyYWN0ZXIgJyR7Y30nYCArXG4gICAgICAgICAgICAgIGAgYWZ0ZXIgJz8nIGF0IGNvbHVtbiAke2kgLSAxfWApO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGdyb3VwLnJlbWVtYmVyID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJbnNlcnQgc3ViZ3JvdXAgaW50byBjdXJyZW50IGdyb3VwIHN0YWNrLlxuICAgICAgICBsYXN0LnB1c2goZ3JvdXApO1xuXG4gICAgICAgIC8vIFJlbWVtYmVyIHRoZSBjdXJyZW50IGdyb3VwIGZvciB3aGVuIHRoZSBncm91cCBjbG9zZXMuXG4gICAgICAgIGdyb3VwU3RhY2sucHVzaChsYXN0R3JvdXApO1xuXG4gICAgICAgIC8vIE1ha2UgdGhpcyBuZXcgZ3JvdXAgdGhlIGN1cnJlbnQgZ3JvdXAuXG4gICAgICAgIGxhc3RHcm91cCA9IGdyb3VwO1xuICAgICAgICBsYXN0ID0gZ3JvdXAuc3RhY2s7XG4gICAgICAgIGJyZWFrO1xuXG5cbiAgICAgIC8vIFBvcCBncm91cCBvdXQgb2Ygc3RhY2suXG4gICAgICBjYXNlICcpJzpcbiAgICAgICAgaWYgKGdyb3VwU3RhY2subGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgdXRpbC5lcnJvcihyZWdleHBTdHIsIGBVbm1hdGNoZWQgKSBhdCBjb2x1bW4gJHtpIC0gMX1gKTtcbiAgICAgICAgfVxuICAgICAgICBsYXN0R3JvdXAgPSBncm91cFN0YWNrLnBvcCgpO1xuXG4gICAgICAgIC8vIENoZWNrIGlmIHRoaXMgZ3JvdXAgaGFzIGEgUElQRS5cbiAgICAgICAgLy8gVG8gZ2V0IGJhY2sgdGhlIGNvcnJlY3QgbGFzdCBzdGFjay5cbiAgICAgICAgbGFzdCA9IGxhc3RHcm91cC5vcHRpb25zID9cbiAgICAgICAgICBsYXN0R3JvdXAub3B0aW9uc1tsYXN0R3JvdXAub3B0aW9ucy5sZW5ndGggLSAxXSA6IGxhc3RHcm91cC5zdGFjaztcbiAgICAgICAgYnJlYWs7XG5cblxuICAgICAgLy8gVXNlIHBpcGUgY2hhcmFjdGVyIHRvIGdpdmUgbW9yZSBjaG9pY2VzLlxuICAgICAgY2FzZSAnfCc6XG4gICAgICAgIC8vIENyZWF0ZSBhcnJheSB3aGVyZSBvcHRpb25zIGFyZSBpZiB0aGlzIGlzIHRoZSBmaXJzdCBQSVBFXG4gICAgICAgIC8vIGluIHRoaXMgY2xhdXNlLlxuICAgICAgICBpZiAoIWxhc3RHcm91cC5vcHRpb25zKSB7XG4gICAgICAgICAgbGFzdEdyb3VwLm9wdGlvbnMgPSBbbGFzdEdyb3VwLnN0YWNrXTtcbiAgICAgICAgICBkZWxldGUgbGFzdEdyb3VwLnN0YWNrO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ3JlYXRlIGEgbmV3IHN0YWNrIGFuZCBhZGQgdG8gb3B0aW9ucyBmb3IgcmVzdCBvZiBjbGF1c2UuXG4gICAgICAgIHZhciBzdGFjayA9IFtdO1xuICAgICAgICBsYXN0R3JvdXAub3B0aW9ucy5wdXNoKHN0YWNrKTtcbiAgICAgICAgbGFzdCA9IHN0YWNrO1xuICAgICAgICBicmVhaztcblxuXG4gICAgICAvLyBSZXBldGl0aW9uLlxuICAgICAgLy8gRm9yIGV2ZXJ5IHJlcGV0aXRpb24sIHJlbW92ZSBsYXN0IGVsZW1lbnQgZnJvbSBsYXN0IHN0YWNrXG4gICAgICAvLyB0aGVuIGluc2VydCBiYWNrIGEgUkFOR0Ugb2JqZWN0LlxuICAgICAgLy8gVGhpcyBkZXNpZ24gaXMgY2hvc2VuIGJlY2F1c2UgdGhlcmUgY291bGQgYmUgbW9yZSB0aGFuXG4gICAgICAvLyBvbmUgcmVwZXRpdGlvbiBzeW1ib2xzIGluIGEgcmVnZXggaS5lLiBgYT8rezIsM31gLlxuICAgICAgY2FzZSAneyc6XG4gICAgICAgIHZhciBycyA9IC9eKFxcZCspKCwoXFxkKyk/KT9cXH0vLmV4ZWMoc3RyLnNsaWNlKGkpKSwgbWluLCBtYXg7XG4gICAgICAgIGlmIChycyAhPT0gbnVsbCkge1xuICAgICAgICAgIGlmIChsYXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmVwZWF0RXJyKGkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBtaW4gPSBwYXJzZUludChyc1sxXSwgMTApO1xuICAgICAgICAgIG1heCA9IHJzWzJdID8gcnNbM10gPyBwYXJzZUludChyc1szXSwgMTApIDogSW5maW5pdHkgOiBtaW47XG4gICAgICAgICAgaSArPSByc1swXS5sZW5ndGg7XG5cbiAgICAgICAgICBsYXN0LnB1c2goe1xuICAgICAgICAgICAgdHlwZTogdHlwZXMuUkVQRVRJVElPTixcbiAgICAgICAgICAgIG1pbixcbiAgICAgICAgICAgIG1heCxcbiAgICAgICAgICAgIHZhbHVlOiBsYXN0LnBvcCgpLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxhc3QucHVzaCh7XG4gICAgICAgICAgICB0eXBlOiB0eXBlcy5DSEFSLFxuICAgICAgICAgICAgdmFsdWU6IDEyMyxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnPyc6XG4gICAgICAgIGlmIChsYXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHJlcGVhdEVycihpKTtcbiAgICAgICAgfVxuICAgICAgICBsYXN0LnB1c2goe1xuICAgICAgICAgIHR5cGU6IHR5cGVzLlJFUEVUSVRJT04sXG4gICAgICAgICAgbWluOiAwLFxuICAgICAgICAgIG1heDogMSxcbiAgICAgICAgICB2YWx1ZTogbGFzdC5wb3AoKSxcbiAgICAgICAgfSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICcrJzpcbiAgICAgICAgaWYgKGxhc3QubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgcmVwZWF0RXJyKGkpO1xuICAgICAgICB9XG4gICAgICAgIGxhc3QucHVzaCh7XG4gICAgICAgICAgdHlwZTogdHlwZXMuUkVQRVRJVElPTixcbiAgICAgICAgICBtaW46IDEsXG4gICAgICAgICAgbWF4OiBJbmZpbml0eSxcbiAgICAgICAgICB2YWx1ZTogbGFzdC5wb3AoKSxcbiAgICAgICAgfSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICcqJzpcbiAgICAgICAgaWYgKGxhc3QubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgcmVwZWF0RXJyKGkpO1xuICAgICAgICB9XG4gICAgICAgIGxhc3QucHVzaCh7XG4gICAgICAgICAgdHlwZTogdHlwZXMuUkVQRVRJVElPTixcbiAgICAgICAgICBtaW46IDAsXG4gICAgICAgICAgbWF4OiBJbmZpbml0eSxcbiAgICAgICAgICB2YWx1ZTogbGFzdC5wb3AoKSxcbiAgICAgICAgfSk7XG4gICAgICAgIGJyZWFrO1xuXG5cbiAgICAgIC8vIERlZmF1bHQgaXMgYSBjaGFyYWN0ZXIgdGhhdCBpcyBub3QgYFxcW10oKXt9PysqXiRgLlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgbGFzdC5wdXNoKHtcbiAgICAgICAgICB0eXBlOiB0eXBlcy5DSEFSLFxuICAgICAgICAgIHZhbHVlOiBjLmNoYXJDb2RlQXQoMCksXG4gICAgICAgIH0pO1xuICAgIH1cblxuICB9XG5cbiAgLy8gQ2hlY2sgaWYgYW55IGdyb3VwcyBoYXZlIG5vdCBiZWVuIGNsb3NlZC5cbiAgaWYgKGdyb3VwU3RhY2subGVuZ3RoICE9PSAwKSB7XG4gICAgdXRpbC5lcnJvcihyZWdleHBTdHIsICdVbnRlcm1pbmF0ZWQgZ3JvdXAnKTtcbiAgfVxuXG4gIHJldHVybiBzdGFydDtcbn07XG5cbm1vZHVsZS5leHBvcnRzLnR5cGVzID0gdHlwZXM7XG4iLCAiJ3VzZSBzdHJpY3QnO1xuLyogZXNsaW50IGluZGVudDogNCAqL1xuXG5cbi8vIFByaXZhdGUgaGVscGVyIGNsYXNzXG5jbGFzcyBTdWJSYW5nZSB7XG4gICAgY29uc3RydWN0b3IobG93LCBoaWdoKSB7XG4gICAgICAgIHRoaXMubG93ID0gbG93O1xuICAgICAgICB0aGlzLmhpZ2ggPSBoaWdoO1xuICAgICAgICB0aGlzLmxlbmd0aCA9IDEgKyBoaWdoIC0gbG93O1xuICAgIH1cblxuICAgIG92ZXJsYXBzKHJhbmdlKSB7XG4gICAgICAgIHJldHVybiAhKHRoaXMuaGlnaCA8IHJhbmdlLmxvdyB8fCB0aGlzLmxvdyA+IHJhbmdlLmhpZ2gpO1xuICAgIH1cblxuICAgIHRvdWNoZXMocmFuZ2UpIHtcbiAgICAgICAgcmV0dXJuICEodGhpcy5oaWdoICsgMSA8IHJhbmdlLmxvdyB8fCB0aGlzLmxvdyAtIDEgPiByYW5nZS5oaWdoKTtcbiAgICB9XG5cbiAgICAvLyBSZXR1cm5zIGluY2x1c2l2ZSBjb21iaW5hdGlvbiBvZiBTdWJSYW5nZXMgYXMgYSBTdWJSYW5nZS5cbiAgICBhZGQocmFuZ2UpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTdWJSYW5nZShcbiAgICAgICAgICAgIE1hdGgubWluKHRoaXMubG93LCByYW5nZS5sb3cpLFxuICAgICAgICAgICAgTWF0aC5tYXgodGhpcy5oaWdoLCByYW5nZS5oaWdoKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8vIFJldHVybnMgc3VidHJhY3Rpb24gb2YgU3ViUmFuZ2VzIGFzIGFuIGFycmF5IG9mIFN1YlJhbmdlcy5cbiAgICAvLyAoVGhlcmUncyBhIGNhc2Ugd2hlcmUgc3VidHJhY3Rpb24gZGl2aWRlcyBpdCBpbiAyKVxuICAgIHN1YnRyYWN0KHJhbmdlKSB7XG4gICAgICAgIGlmIChyYW5nZS5sb3cgPD0gdGhpcy5sb3cgJiYgcmFuZ2UuaGlnaCA+PSB0aGlzLmhpZ2gpIHtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfSBlbHNlIGlmIChyYW5nZS5sb3cgPiB0aGlzLmxvdyAmJiByYW5nZS5oaWdoIDwgdGhpcy5oaWdoKSB7XG4gICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgIG5ldyBTdWJSYW5nZSh0aGlzLmxvdywgcmFuZ2UubG93IC0gMSksXG4gICAgICAgICAgICAgICAgbmV3IFN1YlJhbmdlKHJhbmdlLmhpZ2ggKyAxLCB0aGlzLmhpZ2gpXG4gICAgICAgICAgICBdO1xuICAgICAgICB9IGVsc2UgaWYgKHJhbmdlLmxvdyA8PSB0aGlzLmxvdykge1xuICAgICAgICAgICAgcmV0dXJuIFtuZXcgU3ViUmFuZ2UocmFuZ2UuaGlnaCArIDEsIHRoaXMuaGlnaCldO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIFtuZXcgU3ViUmFuZ2UodGhpcy5sb3csIHJhbmdlLmxvdyAtIDEpXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRvU3RyaW5nKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5sb3cgPT0gdGhpcy5oaWdoID9cbiAgICAgICAgICAgIHRoaXMubG93LnRvU3RyaW5nKCkgOiB0aGlzLmxvdyArICctJyArIHRoaXMuaGlnaDtcbiAgICB9XG59XG5cblxuY2xhc3MgRFJhbmdlIHtcbiAgICBjb25zdHJ1Y3RvcihhLCBiKSB7XG4gICAgICAgIHRoaXMucmFuZ2VzID0gW107XG4gICAgICAgIHRoaXMubGVuZ3RoID0gMDtcbiAgICAgICAgaWYgKGEgIT0gbnVsbCkgdGhpcy5hZGQoYSwgYik7XG4gICAgfVxuXG4gICAgX3VwZGF0ZV9sZW5ndGgoKSB7XG4gICAgICAgIHRoaXMubGVuZ3RoID0gdGhpcy5yYW5nZXMucmVkdWNlKChwcmV2aW91cywgcmFuZ2UpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBwcmV2aW91cyArIHJhbmdlLmxlbmd0aDtcbiAgICAgICAgfSwgMCk7XG4gICAgfVxuXG4gICAgYWRkKGEsIGIpIHtcbiAgICAgICAgdmFyIF9hZGQgPSAoc3VicmFuZ2UpID0+IHtcbiAgICAgICAgICAgIHZhciBpID0gMDtcbiAgICAgICAgICAgIHdoaWxlIChpIDwgdGhpcy5yYW5nZXMubGVuZ3RoICYmICFzdWJyYW5nZS50b3VjaGVzKHRoaXMucmFuZ2VzW2ldKSkge1xuICAgICAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBuZXdSYW5nZXMgPSB0aGlzLnJhbmdlcy5zbGljZSgwLCBpKTtcbiAgICAgICAgICAgIHdoaWxlIChpIDwgdGhpcy5yYW5nZXMubGVuZ3RoICYmIHN1YnJhbmdlLnRvdWNoZXModGhpcy5yYW5nZXNbaV0pKSB7XG4gICAgICAgICAgICAgICAgc3VicmFuZ2UgPSBzdWJyYW5nZS5hZGQodGhpcy5yYW5nZXNbaV0pO1xuICAgICAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5ld1Jhbmdlcy5wdXNoKHN1YnJhbmdlKTtcbiAgICAgICAgICAgIHRoaXMucmFuZ2VzID0gbmV3UmFuZ2VzLmNvbmNhdCh0aGlzLnJhbmdlcy5zbGljZShpKSk7XG4gICAgICAgICAgICB0aGlzLl91cGRhdGVfbGVuZ3RoKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYSBpbnN0YW5jZW9mIERSYW5nZSkge1xuICAgICAgICAgICAgYS5yYW5nZXMuZm9yRWFjaChfYWRkKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChiID09IG51bGwpIGIgPSBhO1xuICAgICAgICAgICAgX2FkZChuZXcgU3ViUmFuZ2UoYSwgYikpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHN1YnRyYWN0KGEsIGIpIHtcbiAgICAgICAgdmFyIF9zdWJ0cmFjdCA9IChzdWJyYW5nZSkgPT4ge1xuICAgICAgICAgICAgdmFyIGkgPSAwO1xuICAgICAgICAgICAgd2hpbGUgKGkgPCB0aGlzLnJhbmdlcy5sZW5ndGggJiYgIXN1YnJhbmdlLm92ZXJsYXBzKHRoaXMucmFuZ2VzW2ldKSkge1xuICAgICAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBuZXdSYW5nZXMgPSB0aGlzLnJhbmdlcy5zbGljZSgwLCBpKTtcbiAgICAgICAgICAgIHdoaWxlIChpIDwgdGhpcy5yYW5nZXMubGVuZ3RoICYmIHN1YnJhbmdlLm92ZXJsYXBzKHRoaXMucmFuZ2VzW2ldKSkge1xuICAgICAgICAgICAgICAgIG5ld1JhbmdlcyA9IG5ld1Jhbmdlcy5jb25jYXQodGhpcy5yYW5nZXNbaV0uc3VidHJhY3Qoc3VicmFuZ2UpKTtcbiAgICAgICAgICAgICAgICBpKys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnJhbmdlcyA9IG5ld1Jhbmdlcy5jb25jYXQodGhpcy5yYW5nZXMuc2xpY2UoaSkpO1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlX2xlbmd0aCgpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChhIGluc3RhbmNlb2YgRFJhbmdlKSB7XG4gICAgICAgICAgICBhLnJhbmdlcy5mb3JFYWNoKF9zdWJ0cmFjdCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoYiA9PSBudWxsKSBiID0gYTtcbiAgICAgICAgICAgIF9zdWJ0cmFjdChuZXcgU3ViUmFuZ2UoYSwgYikpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGludGVyc2VjdChhLCBiKSB7XG4gICAgICAgIHZhciBuZXdSYW5nZXMgPSBbXTtcbiAgICAgICAgdmFyIF9pbnRlcnNlY3QgPSAoc3VicmFuZ2UpID0+IHtcbiAgICAgICAgICAgIHZhciBpID0gMDtcbiAgICAgICAgICAgIHdoaWxlIChpIDwgdGhpcy5yYW5nZXMubGVuZ3RoICYmICFzdWJyYW5nZS5vdmVybGFwcyh0aGlzLnJhbmdlc1tpXSkpIHtcbiAgICAgICAgICAgICAgICBpKys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3aGlsZSAoaSA8IHRoaXMucmFuZ2VzLmxlbmd0aCAmJiBzdWJyYW5nZS5vdmVybGFwcyh0aGlzLnJhbmdlc1tpXSkpIHtcbiAgICAgICAgICAgICAgICB2YXIgbG93ID0gTWF0aC5tYXgodGhpcy5yYW5nZXNbaV0ubG93LCBzdWJyYW5nZS5sb3cpO1xuICAgICAgICAgICAgICAgIHZhciBoaWdoID0gTWF0aC5taW4odGhpcy5yYW5nZXNbaV0uaGlnaCwgc3VicmFuZ2UuaGlnaCk7XG4gICAgICAgICAgICAgICAgbmV3UmFuZ2VzLnB1c2gobmV3IFN1YlJhbmdlKGxvdywgaGlnaCkpO1xuICAgICAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoYSBpbnN0YW5jZW9mIERSYW5nZSkge1xuICAgICAgICAgICAgYS5yYW5nZXMuZm9yRWFjaChfaW50ZXJzZWN0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChiID09IG51bGwpIGIgPSBhO1xuICAgICAgICAgICAgX2ludGVyc2VjdChuZXcgU3ViUmFuZ2UoYSwgYikpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmFuZ2VzID0gbmV3UmFuZ2VzO1xuICAgICAgICB0aGlzLl91cGRhdGVfbGVuZ3RoKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGluZGV4KGluZGV4KSB7XG4gICAgICAgIHZhciBpID0gMDtcbiAgICAgICAgd2hpbGUgKGkgPCB0aGlzLnJhbmdlcy5sZW5ndGggJiYgdGhpcy5yYW5nZXNbaV0ubGVuZ3RoIDw9IGluZGV4KSB7XG4gICAgICAgICAgICBpbmRleCAtPSB0aGlzLnJhbmdlc1tpXS5sZW5ndGg7XG4gICAgICAgICAgICBpKys7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMucmFuZ2VzW2ldLmxvdyArIGluZGV4O1xuICAgIH1cblxuICAgIHRvU3RyaW5nKCkge1xuICAgICAgICByZXR1cm4gJ1sgJyArIHRoaXMucmFuZ2VzLmpvaW4oJywgJykgKyAnIF0nO1xuICAgIH1cblxuICAgIGNsb25lKCkge1xuICAgICAgICByZXR1cm4gbmV3IERSYW5nZSh0aGlzKTtcbiAgICB9XG5cbiAgICBudW1iZXJzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yYW5nZXMucmVkdWNlKChyZXN1bHQsIHN1YnJhbmdlKSA9PiB7XG4gICAgICAgICAgICB2YXIgaSA9IHN1YnJhbmdlLmxvdztcbiAgICAgICAgICAgIHdoaWxlIChpIDw9IHN1YnJhbmdlLmhpZ2gpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChpKTtcbiAgICAgICAgICAgICAgICBpKys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9LCBbXSk7XG4gICAgfVxuXG4gICAgc3VicmFuZ2VzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yYW5nZXMubWFwKChzdWJyYW5nZSkgPT4gKHtcbiAgICAgICAgICAgIGxvdzogc3VicmFuZ2UubG93LFxuICAgICAgICAgICAgaGlnaDogc3VicmFuZ2UuaGlnaCxcbiAgICAgICAgICAgIGxlbmd0aDogMSArIHN1YnJhbmdlLmhpZ2ggLSBzdWJyYW5nZS5sb3dcbiAgICAgICAgfSkpO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBEUmFuZ2U7XG4iLCAiY29uc3QgcmV0ICAgID0gcmVxdWlyZSgncmV0Jyk7XG5jb25zdCBEUmFuZ2UgPSByZXF1aXJlKCdkcmFuZ2UnKTtcbmNvbnN0IHR5cGVzICA9IHJldC50eXBlcztcblxuXG5tb2R1bGUuZXhwb3J0cyA9IGNsYXNzIFJhbmRFeHAge1xuICAvKipcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSB7UmVnRXhwfFN0cmluZ30gcmVnZXhwXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtXG4gICAqL1xuICBjb25zdHJ1Y3RvcihyZWdleHAsIG0pIHtcbiAgICB0aGlzLl9zZXREZWZhdWx0cyhyZWdleHApO1xuICAgIGlmIChyZWdleHAgaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICAgIHRoaXMuaWdub3JlQ2FzZSA9IHJlZ2V4cC5pZ25vcmVDYXNlO1xuICAgICAgdGhpcy5tdWx0aWxpbmUgPSByZWdleHAubXVsdGlsaW5lO1xuICAgICAgcmVnZXhwID0gcmVnZXhwLnNvdXJjZTtcblxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHJlZ2V4cCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRoaXMuaWdub3JlQ2FzZSA9IG0gJiYgbS5pbmRleE9mKCdpJykgIT09IC0xO1xuICAgICAgdGhpcy5tdWx0aWxpbmUgPSBtICYmIG0uaW5kZXhPZignbScpICE9PSAtMTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCBhIHJlZ2V4cCBvciBzdHJpbmcnKTtcbiAgICB9XG5cbiAgICB0aGlzLnRva2VucyA9IHJldChyZWdleHApO1xuICB9XG5cblxuICAvKipcbiAgICogQ2hlY2tzIGlmIHNvbWUgY3VzdG9tIHByb3BlcnRpZXMgaGF2ZSBiZWVuIHNldCBmb3IgdGhpcyByZWdleHAuXG4gICAqXG4gICAqIEBwYXJhbSB7UmFuZEV4cH0gcmFuZGV4cFxuICAgKiBAcGFyYW0ge1JlZ0V4cH0gcmVnZXhwXG4gICAqL1xuICBfc2V0RGVmYXVsdHMocmVnZXhwKSB7XG4gICAgLy8gV2hlbiBhIHJlcGV0aXRpb25hbCB0b2tlbiBoYXMgaXRzIG1heCBzZXQgdG8gSW5maW5pdGUsXG4gICAgLy8gcmFuZGV4cCB3b24ndCBhY3R1YWxseSBnZW5lcmF0ZSBhIHJhbmRvbSBhbW91bnQgYmV0d2VlbiBtaW4gYW5kIEluZmluaXRlXG4gICAgLy8gaW5zdGVhZCBpdCB3aWxsIHNlZSBJbmZpbml0ZSBhcyBtaW4gKyAxMDAuXG4gICAgdGhpcy5tYXggPSByZWdleHAubWF4ICE9IG51bGwgPyByZWdleHAubWF4IDpcbiAgICAgIFJhbmRFeHAucHJvdG90eXBlLm1heCAhPSBudWxsID8gUmFuZEV4cC5wcm90b3R5cGUubWF4IDogMTAwO1xuXG4gICAgLy8gVGhpcyBhbGxvd3MgZXhwYW5kaW5nIHRvIGluY2x1ZGUgYWRkaXRpb25hbCBjaGFyYWN0ZXJzXG4gICAgLy8gZm9yIGluc3RhbmNlOiBSYW5kRXhwLmRlZmF1bHRSYW5nZS5hZGQoMCwgNjU1MzUpO1xuICAgIHRoaXMuZGVmYXVsdFJhbmdlID0gcmVnZXhwLmRlZmF1bHRSYW5nZSA/XG4gICAgICByZWdleHAuZGVmYXVsdFJhbmdlIDogdGhpcy5kZWZhdWx0UmFuZ2UuY2xvbmUoKTtcblxuICAgIGlmIChyZWdleHAucmFuZEludCkge1xuICAgICAgdGhpcy5yYW5kSW50ID0gcmVnZXhwLnJhbmRJbnQ7XG4gICAgfVxuICB9XG5cblxuICAvKipcbiAgICogR2VuZXJhdGVzIHRoZSByYW5kb20gc3RyaW5nLlxuICAgKlxuICAgKiBAcmV0dXJuIHtTdHJpbmd9XG4gICAqL1xuICBnZW4oKSB7XG4gICAgcmV0dXJuIHRoaXMuX2dlbih0aGlzLnRva2VucywgW10pO1xuICB9XG5cblxuICAvKipcbiAgICogR2VuZXJhdGUgcmFuZG9tIHN0cmluZyBtb2RlbGVkIGFmdGVyIGdpdmVuIHRva2Vucy5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHRva2VuXG4gICAqIEBwYXJhbSB7QXJyYXkuPFN0cmluZz59IGdyb3Vwc1xuICAgKiBAcmV0dXJuIHtTdHJpbmd9XG4gICAqL1xuICBfZ2VuKHRva2VuLCBncm91cHMpIHtcbiAgICB2YXIgc3RhY2ssIHN0ciwgbiwgaSwgbDtcblxuICAgIHN3aXRjaCAodG9rZW4udHlwZSkge1xuICAgICAgY2FzZSB0eXBlcy5ST09UOlxuICAgICAgY2FzZSB0eXBlcy5HUk9VUDpcbiAgICAgICAgLy8gSWdub3JlIGxvb2thaGVhZHMgZm9yIG5vdy5cbiAgICAgICAgaWYgKHRva2VuLmZvbGxvd2VkQnkgfHwgdG9rZW4ubm90Rm9sbG93ZWRCeSkgeyByZXR1cm4gJyc7IH1cblxuICAgICAgICAvLyBJbnNlcnQgcGxhY2Vob2xkZXIgdW50aWwgZ3JvdXAgc3RyaW5nIGlzIGdlbmVyYXRlZC5cbiAgICAgICAgaWYgKHRva2VuLnJlbWVtYmVyICYmIHRva2VuLmdyb3VwTnVtYmVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB0b2tlbi5ncm91cE51bWJlciA9IGdyb3Vwcy5wdXNoKG51bGwpIC0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YWNrID0gdG9rZW4ub3B0aW9ucyA/XG4gICAgICAgICAgdGhpcy5fcmFuZFNlbGVjdCh0b2tlbi5vcHRpb25zKSA6IHRva2VuLnN0YWNrO1xuXG4gICAgICAgIHN0ciA9ICcnO1xuICAgICAgICBmb3IgKGkgPSAwLCBsID0gc3RhY2subGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgc3RyICs9IHRoaXMuX2dlbihzdGFja1tpXSwgZ3JvdXBzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0b2tlbi5yZW1lbWJlcikge1xuICAgICAgICAgIGdyb3Vwc1t0b2tlbi5ncm91cE51bWJlcl0gPSBzdHI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN0cjtcblxuICAgICAgY2FzZSB0eXBlcy5QT1NJVElPTjpcbiAgICAgICAgLy8gRG8gbm90aGluZyBmb3Igbm93LlxuICAgICAgICByZXR1cm4gJyc7XG5cbiAgICAgIGNhc2UgdHlwZXMuU0VUOlxuICAgICAgICB2YXIgZXhwYW5kZWRTZXQgPSB0aGlzLl9leHBhbmQodG9rZW4pO1xuICAgICAgICBpZiAoIWV4cGFuZGVkU2V0Lmxlbmd0aCkgeyByZXR1cm4gJyc7IH1cbiAgICAgICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUodGhpcy5fcmFuZFNlbGVjdChleHBhbmRlZFNldCkpO1xuXG4gICAgICBjYXNlIHR5cGVzLlJFUEVUSVRJT046XG4gICAgICAgIC8vIFJhbmRvbWx5IGdlbmVyYXRlIG51bWJlciBiZXR3ZWVuIG1pbiBhbmQgbWF4LlxuICAgICAgICBuID0gdGhpcy5yYW5kSW50KHRva2VuLm1pbixcbiAgICAgICAgICB0b2tlbi5tYXggPT09IEluZmluaXR5ID8gdG9rZW4ubWluICsgdGhpcy5tYXggOiB0b2tlbi5tYXgpO1xuXG4gICAgICAgIHN0ciA9ICcnO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgc3RyICs9IHRoaXMuX2dlbih0b2tlbi52YWx1ZSwgZ3JvdXBzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzdHI7XG5cbiAgICAgIGNhc2UgdHlwZXMuUkVGRVJFTkNFOlxuICAgICAgICByZXR1cm4gZ3JvdXBzW3Rva2VuLnZhbHVlIC0gMV0gfHwgJyc7XG5cbiAgICAgIGNhc2UgdHlwZXMuQ0hBUjpcbiAgICAgICAgdmFyIGNvZGUgPSB0aGlzLmlnbm9yZUNhc2UgJiYgdGhpcy5fcmFuZEJvb2woKSA/XG4gICAgICAgICAgdGhpcy5fdG9PdGhlckNhc2UodG9rZW4udmFsdWUpIDogdG9rZW4udmFsdWU7XG4gICAgICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKGNvZGUpO1xuICAgIH1cbiAgfVxuXG5cbiAgLyoqXG4gICAqIElmIGNvZGUgaXMgYWxwaGFiZXRpYywgY29udmVydHMgdG8gb3RoZXIgY2FzZS5cbiAgICogSWYgbm90IGFscGhhYmV0aWMsIHJldHVybnMgYmFjayBjb2RlLlxuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gY29kZVxuICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAqL1xuICBfdG9PdGhlckNhc2UoY29kZSkge1xuICAgIHJldHVybiBjb2RlICsgKDk3IDw9IGNvZGUgJiYgY29kZSA8PSAxMjIgPyAtMzIgOlxuICAgICAgNjUgPD0gY29kZSAmJiBjb2RlIDw9IDkwICA/ICAzMiA6IDApO1xuICB9XG5cblxuICAvKipcbiAgICogUmFuZG9tbHkgcmV0dXJucyBhIHRydWUgb3IgZmFsc2UgdmFsdWUuXG4gICAqXG4gICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAqL1xuICBfcmFuZEJvb2woKSB7XG4gICAgcmV0dXJuICF0aGlzLnJhbmRJbnQoMCwgMSk7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBSYW5kb21seSBzZWxlY3RzIGFuZCByZXR1cm5zIGEgdmFsdWUgZnJvbSB0aGUgYXJyYXkuXG4gICAqXG4gICAqIEBwYXJhbSB7QXJyYXkuPE9iamVjdD59IGFyclxuICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAqL1xuICBfcmFuZFNlbGVjdChhcnIpIHtcbiAgICBpZiAoYXJyIGluc3RhbmNlb2YgRFJhbmdlKSB7XG4gICAgICByZXR1cm4gYXJyLmluZGV4KHRoaXMucmFuZEludCgwLCBhcnIubGVuZ3RoIC0gMSkpO1xuICAgIH1cbiAgICByZXR1cm4gYXJyW3RoaXMucmFuZEludCgwLCBhcnIubGVuZ3RoIC0gMSldO1xuICB9XG5cblxuICAvKipcbiAgICogZXhwYW5kcyBhIHRva2VuIHRvIGEgRGlzY29udGludW91c1JhbmdlIG9mIGNoYXJhY3RlcnMgd2hpY2ggaGFzIGFcbiAgICogbGVuZ3RoIGFuZCBhbiBpbmRleCBmdW5jdGlvbiAoZm9yIHJhbmRvbSBzZWxlY3RpbmcpXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSB0b2tlblxuICAgKiBAcmV0dXJuIHtEaXNjb250aW51b3VzUmFuZ2V9XG4gICAqL1xuICBfZXhwYW5kKHRva2VuKSB7XG4gICAgaWYgKHRva2VuLnR5cGUgPT09IHJldC50eXBlcy5DSEFSKSB7XG4gICAgICByZXR1cm4gbmV3IERSYW5nZSh0b2tlbi52YWx1ZSk7XG4gICAgfSBlbHNlIGlmICh0b2tlbi50eXBlID09PSByZXQudHlwZXMuUkFOR0UpIHtcbiAgICAgIHJldHVybiBuZXcgRFJhbmdlKHRva2VuLmZyb20sIHRva2VuLnRvKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IGRyYW5nZSA9IG5ldyBEUmFuZ2UoKTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdG9rZW4uc2V0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxldCBzdWJyYW5nZSA9IHRoaXMuX2V4cGFuZCh0b2tlbi5zZXRbaV0pO1xuICAgICAgICBkcmFuZ2UuYWRkKHN1YnJhbmdlKTtcbiAgICAgICAgaWYgKHRoaXMuaWdub3JlQ2FzZSkge1xuICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgc3VicmFuZ2UubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIGxldCBjb2RlID0gc3VicmFuZ2UuaW5kZXgoaik7XG4gICAgICAgICAgICBsZXQgb3RoZXJDYXNlQ29kZSA9IHRoaXMuX3RvT3RoZXJDYXNlKGNvZGUpO1xuICAgICAgICAgICAgaWYgKGNvZGUgIT09IG90aGVyQ2FzZUNvZGUpIHtcbiAgICAgICAgICAgICAgZHJhbmdlLmFkZChvdGhlckNhc2VDb2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICh0b2tlbi5ub3QpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGVmYXVsdFJhbmdlLmNsb25lKCkuc3VidHJhY3QoZHJhbmdlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRlZmF1bHRSYW5nZS5jbG9uZSgpLmludGVyc2VjdChkcmFuZ2UpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG5cbiAgLyoqXG4gICAqIFJhbmRvbWx5IGdlbmVyYXRlcyBhbmQgcmV0dXJucyBhIG51bWJlciBiZXR3ZWVuIGEgYW5kIGIgKGluY2x1c2l2ZSkuXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBhXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBiXG4gICAqIEByZXR1cm4ge051bWJlcn1cbiAgICovXG4gIHJhbmRJbnQoYSwgYikge1xuICAgIHJldHVybiBhICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDEgKyBiIC0gYSkpO1xuICB9XG5cblxuICAvKipcbiAgICogRGVmYXVsdCByYW5nZSBvZiBjaGFyYWN0ZXJzIHRvIGdlbmVyYXRlIGZyb20uXG4gICAqL1xuICBnZXQgZGVmYXVsdFJhbmdlKCkge1xuICAgIHJldHVybiB0aGlzLl9yYW5nZSA9IHRoaXMuX3JhbmdlIHx8IG5ldyBEUmFuZ2UoMzIsIDEyNik7XG4gIH1cblxuICBzZXQgZGVmYXVsdFJhbmdlKHJhbmdlKSB7XG4gICAgdGhpcy5fcmFuZ2UgPSByYW5nZTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqXG4gICAqIEVuYWJsZXMgdXNlIG9mIHJhbmRleHAgd2l0aCBhIHNob3J0ZXIgY2FsbC5cbiAgICpcbiAgICogQHBhcmFtIHtSZWdFeHB8U3RyaW5nfCByZWdleHB9XG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtXG4gICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICovXG4gIHN0YXRpYyByYW5kZXhwKHJlZ2V4cCwgbSkge1xuICAgIHZhciByYW5kZXhwO1xuICAgIGlmKHR5cGVvZiByZWdleHAgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZWdleHAgPSBuZXcgUmVnRXhwKHJlZ2V4cCwgbSk7XG4gICAgfVxuXG4gICAgaWYgKHJlZ2V4cC5fcmFuZGV4cCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByYW5kZXhwID0gbmV3IFJhbmRFeHAocmVnZXhwLCBtKTtcbiAgICAgIHJlZ2V4cC5fcmFuZGV4cCA9IHJhbmRleHA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJhbmRleHAgPSByZWdleHAuX3JhbmRleHA7XG4gICAgICByYW5kZXhwLl9zZXREZWZhdWx0cyhyZWdleHApO1xuICAgIH1cbiAgICByZXR1cm4gcmFuZGV4cC5nZW4oKTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIEVuYWJsZXMgc3VnYXJ5IC9yZWdleHAvLmdlbiBzeW50YXguXG4gICAqL1xuICBzdGF0aWMgc3VnYXIoKSB7XG4gICAgLyogZXNoaW50IGZyZWV6ZTpmYWxzZSAqL1xuICAgIFJlZ0V4cC5wcm90b3R5cGUuZ2VuID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gUmFuZEV4cC5yYW5kZXhwKHRoaXMpO1xuICAgIH07XG4gIH1cbn07XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBDaGFyID0ge1xuICBBTkNIT1I6ICcmJyxcbiAgQ09NTUVOVDogJyMnLFxuICBUQUc6ICchJyxcbiAgRElSRUNUSVZFU19FTkQ6ICctJyxcbiAgRE9DVU1FTlRfRU5EOiAnLidcbn07XG5jb25zdCBUeXBlID0ge1xuICBBTElBUzogJ0FMSUFTJyxcbiAgQkxBTktfTElORTogJ0JMQU5LX0xJTkUnLFxuICBCTE9DS19GT0xERUQ6ICdCTE9DS19GT0xERUQnLFxuICBCTE9DS19MSVRFUkFMOiAnQkxPQ0tfTElURVJBTCcsXG4gIENPTU1FTlQ6ICdDT01NRU5UJyxcbiAgRElSRUNUSVZFOiAnRElSRUNUSVZFJyxcbiAgRE9DVU1FTlQ6ICdET0NVTUVOVCcsXG4gIEZMT1dfTUFQOiAnRkxPV19NQVAnLFxuICBGTE9XX1NFUTogJ0ZMT1dfU0VRJyxcbiAgTUFQOiAnTUFQJyxcbiAgTUFQX0tFWTogJ01BUF9LRVknLFxuICBNQVBfVkFMVUU6ICdNQVBfVkFMVUUnLFxuICBQTEFJTjogJ1BMQUlOJyxcbiAgUVVPVEVfRE9VQkxFOiAnUVVPVEVfRE9VQkxFJyxcbiAgUVVPVEVfU0lOR0xFOiAnUVVPVEVfU0lOR0xFJyxcbiAgU0VROiAnU0VRJyxcbiAgU0VRX0lURU06ICdTRVFfSVRFTSdcbn07XG5jb25zdCBkZWZhdWx0VGFnUHJlZml4ID0gJ3RhZzp5YW1sLm9yZywyMDAyOic7XG5jb25zdCBkZWZhdWx0VGFncyA9IHtcbiAgTUFQOiAndGFnOnlhbWwub3JnLDIwMDI6bWFwJyxcbiAgU0VROiAndGFnOnlhbWwub3JnLDIwMDI6c2VxJyxcbiAgU1RSOiAndGFnOnlhbWwub3JnLDIwMDI6c3RyJ1xufTtcblxuZnVuY3Rpb24gZmluZExpbmVTdGFydHMoc3JjKSB7XG4gIGNvbnN0IGxzID0gWzBdO1xuICBsZXQgb2Zmc2V0ID0gc3JjLmluZGV4T2YoJ1xcbicpO1xuXG4gIHdoaWxlIChvZmZzZXQgIT09IC0xKSB7XG4gICAgb2Zmc2V0ICs9IDE7XG4gICAgbHMucHVzaChvZmZzZXQpO1xuICAgIG9mZnNldCA9IHNyYy5pbmRleE9mKCdcXG4nLCBvZmZzZXQpO1xuICB9XG5cbiAgcmV0dXJuIGxzO1xufVxuXG5mdW5jdGlvbiBnZXRTcmNJbmZvKGNzdCkge1xuICBsZXQgbGluZVN0YXJ0cywgc3JjO1xuXG4gIGlmICh0eXBlb2YgY3N0ID09PSAnc3RyaW5nJykge1xuICAgIGxpbmVTdGFydHMgPSBmaW5kTGluZVN0YXJ0cyhjc3QpO1xuICAgIHNyYyA9IGNzdDtcbiAgfSBlbHNlIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShjc3QpKSBjc3QgPSBjc3RbMF07XG5cbiAgICBpZiAoY3N0ICYmIGNzdC5jb250ZXh0KSB7XG4gICAgICBpZiAoIWNzdC5saW5lU3RhcnRzKSBjc3QubGluZVN0YXJ0cyA9IGZpbmRMaW5lU3RhcnRzKGNzdC5jb250ZXh0LnNyYyk7XG4gICAgICBsaW5lU3RhcnRzID0gY3N0LmxpbmVTdGFydHM7XG4gICAgICBzcmMgPSBjc3QuY29udGV4dC5zcmM7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBsaW5lU3RhcnRzLFxuICAgIHNyY1xuICB9O1xufVxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBMaW5lUG9zIC0gT25lLWluZGV4ZWQgcG9zaXRpb24gaW4gdGhlIHNvdXJjZVxuICogQHByb3BlcnR5IHtudW1iZXJ9IGxpbmVcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBjb2xcbiAqL1xuXG4vKipcbiAqIERldGVybWluZSB0aGUgbGluZS9jb2wgcG9zaXRpb24gbWF0Y2hpbmcgYSBjaGFyYWN0ZXIgb2Zmc2V0LlxuICpcbiAqIEFjY2VwdHMgYSBzb3VyY2Ugc3RyaW5nIG9yIGEgQ1NUIGRvY3VtZW50IGFzIHRoZSBzZWNvbmQgcGFyYW1ldGVyLiBXaXRoXG4gKiB0aGUgbGF0dGVyLCBzdGFydGluZyBpbmRpY2VzIGZvciBsaW5lcyBhcmUgY2FjaGVkIGluIHRoZSBkb2N1bWVudCBhc1xuICogYGxpbmVTdGFydHM6IG51bWJlcltdYC5cbiAqXG4gKiBSZXR1cm5zIGEgb25lLWluZGV4ZWQgYHsgbGluZSwgY29sIH1gIGxvY2F0aW9uIGlmIGZvdW5kLCBvclxuICogYHVuZGVmaW5lZGAgb3RoZXJ3aXNlLlxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBvZmZzZXRcbiAqIEBwYXJhbSB7c3RyaW5nfERvY3VtZW50fERvY3VtZW50W119IGNzdFxuICogQHJldHVybnMgez9MaW5lUG9zfVxuICovXG5cblxuZnVuY3Rpb24gZ2V0TGluZVBvcyhvZmZzZXQsIGNzdCkge1xuICBpZiAodHlwZW9mIG9mZnNldCAhPT0gJ251bWJlcicgfHwgb2Zmc2V0IDwgMCkgcmV0dXJuIG51bGw7XG4gIGNvbnN0IHtcbiAgICBsaW5lU3RhcnRzLFxuICAgIHNyY1xuICB9ID0gZ2V0U3JjSW5mbyhjc3QpO1xuICBpZiAoIWxpbmVTdGFydHMgfHwgIXNyYyB8fCBvZmZzZXQgPiBzcmMubGVuZ3RoKSByZXR1cm4gbnVsbDtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGxpbmVTdGFydHMubGVuZ3RoOyArK2kpIHtcbiAgICBjb25zdCBzdGFydCA9IGxpbmVTdGFydHNbaV07XG5cbiAgICBpZiAob2Zmc2V0IDwgc3RhcnQpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGxpbmU6IGksXG4gICAgICAgIGNvbDogb2Zmc2V0IC0gbGluZVN0YXJ0c1tpIC0gMV0gKyAxXG4gICAgICB9O1xuICAgIH1cblxuICAgIGlmIChvZmZzZXQgPT09IHN0YXJ0KSByZXR1cm4ge1xuICAgICAgbGluZTogaSArIDEsXG4gICAgICBjb2w6IDFcbiAgICB9O1xuICB9XG5cbiAgY29uc3QgbGluZSA9IGxpbmVTdGFydHMubGVuZ3RoO1xuICByZXR1cm4ge1xuICAgIGxpbmUsXG4gICAgY29sOiBvZmZzZXQgLSBsaW5lU3RhcnRzW2xpbmUgLSAxXSArIDFcbiAgfTtcbn1cbi8qKlxuICogR2V0IGEgc3BlY2lmaWVkIGxpbmUgZnJvbSB0aGUgc291cmNlLlxuICpcbiAqIEFjY2VwdHMgYSBzb3VyY2Ugc3RyaW5nIG9yIGEgQ1NUIGRvY3VtZW50IGFzIHRoZSBzZWNvbmQgcGFyYW1ldGVyLiBXaXRoXG4gKiB0aGUgbGF0dGVyLCBzdGFydGluZyBpbmRpY2VzIGZvciBsaW5lcyBhcmUgY2FjaGVkIGluIHRoZSBkb2N1bWVudCBhc1xuICogYGxpbmVTdGFydHM6IG51bWJlcltdYC5cbiAqXG4gKiBSZXR1cm5zIHRoZSBsaW5lIGFzIGEgc3RyaW5nIGlmIGZvdW5kLCBvciBgbnVsbGAgb3RoZXJ3aXNlLlxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBsaW5lIE9uZS1pbmRleGVkIGxpbmUgbnVtYmVyXG4gKiBAcGFyYW0ge3N0cmluZ3xEb2N1bWVudHxEb2N1bWVudFtdfSBjc3RcbiAqIEByZXR1cm5zIHs/c3RyaW5nfVxuICovXG5cbmZ1bmN0aW9uIGdldExpbmUobGluZSwgY3N0KSB7XG4gIGNvbnN0IHtcbiAgICBsaW5lU3RhcnRzLFxuICAgIHNyY1xuICB9ID0gZ2V0U3JjSW5mbyhjc3QpO1xuICBpZiAoIWxpbmVTdGFydHMgfHwgIShsaW5lID49IDEpIHx8IGxpbmUgPiBsaW5lU3RhcnRzLmxlbmd0aCkgcmV0dXJuIG51bGw7XG4gIGNvbnN0IHN0YXJ0ID0gbGluZVN0YXJ0c1tsaW5lIC0gMV07XG4gIGxldCBlbmQgPSBsaW5lU3RhcnRzW2xpbmVdOyAvLyB1bmRlZmluZWQgZm9yIGxhc3QgbGluZTsgdGhhdCdzIG9rIGZvciBzbGljZSgpXG5cbiAgd2hpbGUgKGVuZCAmJiBlbmQgPiBzdGFydCAmJiBzcmNbZW5kIC0gMV0gPT09ICdcXG4nKSAtLWVuZDtcblxuICByZXR1cm4gc3JjLnNsaWNlKHN0YXJ0LCBlbmQpO1xufVxuLyoqXG4gKiBQcmV0dHktcHJpbnQgdGhlIHN0YXJ0aW5nIGxpbmUgZnJvbSB0aGUgc291cmNlIGluZGljYXRlZCBieSB0aGUgcmFuZ2UgYHBvc2BcbiAqXG4gKiBUcmltcyBvdXRwdXQgdG8gYG1heFdpZHRoYCBjaGFycyB3aGlsZSBrZWVwaW5nIHRoZSBzdGFydGluZyBjb2x1bW4gdmlzaWJsZSxcbiAqIHVzaW5nIGBcdTIwMjZgIGF0IGVpdGhlciBlbmQgdG8gaW5kaWNhdGUgZHJvcHBlZCBjaGFyYWN0ZXJzLlxuICpcbiAqIFJldHVybnMgYSB0d28tbGluZSBzdHJpbmcgKG9yIGBudWxsYCkgd2l0aCBgXFxuYCBhcyBzZXBhcmF0b3I7IHRoZSBzZWNvbmQgbGluZVxuICogd2lsbCBob2xkIGFwcHJvcHJpYXRlbHkgaW5kZW50ZWQgYF5gIG1hcmtzIGluZGljYXRpbmcgdGhlIGNvbHVtbiByYW5nZS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gcG9zXG4gKiBAcGFyYW0ge0xpbmVQb3N9IHBvcy5zdGFydFxuICogQHBhcmFtIHtMaW5lUG9zfSBbcG9zLmVuZF1cbiAqIEBwYXJhbSB7c3RyaW5nfERvY3VtZW50fERvY3VtZW50W10qfSBjc3RcbiAqIEBwYXJhbSB7bnVtYmVyfSBbbWF4V2lkdGg9ODBdXG4gKiBAcmV0dXJucyB7P3N0cmluZ31cbiAqL1xuXG5mdW5jdGlvbiBnZXRQcmV0dHlDb250ZXh0KHtcbiAgc3RhcnQsXG4gIGVuZFxufSwgY3N0LCBtYXhXaWR0aCA9IDgwKSB7XG4gIGxldCBzcmMgPSBnZXRMaW5lKHN0YXJ0LmxpbmUsIGNzdCk7XG4gIGlmICghc3JjKSByZXR1cm4gbnVsbDtcbiAgbGV0IHtcbiAgICBjb2xcbiAgfSA9IHN0YXJ0O1xuXG4gIGlmIChzcmMubGVuZ3RoID4gbWF4V2lkdGgpIHtcbiAgICBpZiAoY29sIDw9IG1heFdpZHRoIC0gMTApIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHIoMCwgbWF4V2lkdGggLSAxKSArICdcdTIwMjYnO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBoYWxmV2lkdGggPSBNYXRoLnJvdW5kKG1heFdpZHRoIC8gMik7XG4gICAgICBpZiAoc3JjLmxlbmd0aCA+IGNvbCArIGhhbGZXaWR0aCkgc3JjID0gc3JjLnN1YnN0cigwLCBjb2wgKyBoYWxmV2lkdGggLSAxKSArICdcdTIwMjYnO1xuICAgICAgY29sIC09IHNyYy5sZW5ndGggLSBtYXhXaWR0aDtcbiAgICAgIHNyYyA9ICdcdTIwMjYnICsgc3JjLnN1YnN0cigxIC0gbWF4V2lkdGgpO1xuICAgIH1cbiAgfVxuXG4gIGxldCBlcnJMZW4gPSAxO1xuICBsZXQgZXJyRW5kID0gJyc7XG5cbiAgaWYgKGVuZCkge1xuICAgIGlmIChlbmQubGluZSA9PT0gc3RhcnQubGluZSAmJiBjb2wgKyAoZW5kLmNvbCAtIHN0YXJ0LmNvbCkgPD0gbWF4V2lkdGggKyAxKSB7XG4gICAgICBlcnJMZW4gPSBlbmQuY29sIC0gc3RhcnQuY29sO1xuICAgIH0gZWxzZSB7XG4gICAgICBlcnJMZW4gPSBNYXRoLm1pbihzcmMubGVuZ3RoICsgMSwgbWF4V2lkdGgpIC0gY29sO1xuICAgICAgZXJyRW5kID0gJ1x1MjAyNic7XG4gICAgfVxuICB9XG5cbiAgY29uc3Qgb2Zmc2V0ID0gY29sID4gMSA/ICcgJy5yZXBlYXQoY29sIC0gMSkgOiAnJztcbiAgY29uc3QgZXJyID0gJ14nLnJlcGVhdChlcnJMZW4pO1xuICByZXR1cm4gYCR7c3JjfVxcbiR7b2Zmc2V0fSR7ZXJyfSR7ZXJyRW5kfWA7XG59XG5cbmNsYXNzIFJhbmdlIHtcbiAgc3RhdGljIGNvcHkob3JpZykge1xuICAgIHJldHVybiBuZXcgUmFuZ2Uob3JpZy5zdGFydCwgb3JpZy5lbmQpO1xuICB9XG5cbiAgY29uc3RydWN0b3Ioc3RhcnQsIGVuZCkge1xuICAgIHRoaXMuc3RhcnQgPSBzdGFydDtcbiAgICB0aGlzLmVuZCA9IGVuZCB8fCBzdGFydDtcbiAgfVxuXG4gIGlzRW1wdHkoKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB0aGlzLnN0YXJ0ICE9PSAnbnVtYmVyJyB8fCAhdGhpcy5lbmQgfHwgdGhpcy5lbmQgPD0gdGhpcy5zdGFydDtcbiAgfVxuICAvKipcbiAgICogU2V0IGBvcmlnU3RhcnRgIGFuZCBgb3JpZ0VuZGAgdG8gcG9pbnQgdG8gdGhlIG9yaWdpbmFsIHNvdXJjZSByYW5nZSBmb3JcbiAgICogdGhpcyBub2RlLCB3aGljaCBtYXkgZGlmZmVyIGR1ZSB0byBkcm9wcGVkIENSIGNoYXJhY3RlcnMuXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyW119IGNyIC0gUG9zaXRpb25zIG9mIGRyb3BwZWQgQ1IgY2hhcmFjdGVyc1xuICAgKiBAcGFyYW0ge251bWJlcn0gb2Zmc2V0IC0gU3RhcnRpbmcgaW5kZXggb2YgYGNyYCBmcm9tIHRoZSBsYXN0IGNhbGxcbiAgICogQHJldHVybnMge251bWJlcn0gLSBUaGUgbmV4dCBvZmZzZXQsIG1hdGNoaW5nIHRoZSBvbmUgZm91bmQgZm9yIGBvcmlnU3RhcnRgXG4gICAqL1xuXG5cbiAgc2V0T3JpZ1JhbmdlKGNyLCBvZmZzZXQpIHtcbiAgICBjb25zdCB7XG4gICAgICBzdGFydCxcbiAgICAgIGVuZFxuICAgIH0gPSB0aGlzO1xuXG4gICAgaWYgKGNyLmxlbmd0aCA9PT0gMCB8fCBlbmQgPD0gY3JbMF0pIHtcbiAgICAgIHRoaXMub3JpZ1N0YXJ0ID0gc3RhcnQ7XG4gICAgICB0aGlzLm9yaWdFbmQgPSBlbmQ7XG4gICAgICByZXR1cm4gb2Zmc2V0O1xuICAgIH1cblxuICAgIGxldCBpID0gb2Zmc2V0O1xuXG4gICAgd2hpbGUgKGkgPCBjci5sZW5ndGgpIHtcbiAgICAgIGlmIChjcltpXSA+IHN0YXJ0KSBicmVhaztlbHNlICsraTtcbiAgICB9XG5cbiAgICB0aGlzLm9yaWdTdGFydCA9IHN0YXJ0ICsgaTtcbiAgICBjb25zdCBuZXh0T2Zmc2V0ID0gaTtcblxuICAgIHdoaWxlIChpIDwgY3IubGVuZ3RoKSB7XG4gICAgICAvLyBpZiBlbmQgd2FzIGF0IFxcbiwgaXQgc2hvdWxkIG5vdyBiZSBhdCBcXHJcbiAgICAgIGlmIChjcltpXSA+PSBlbmQpIGJyZWFrO2Vsc2UgKytpO1xuICAgIH1cblxuICAgIHRoaXMub3JpZ0VuZCA9IGVuZCArIGk7XG4gICAgcmV0dXJuIG5leHRPZmZzZXQ7XG4gIH1cblxufVxuXG4vKiogUm9vdCBjbGFzcyBvZiBhbGwgbm9kZXMgKi9cblxuY2xhc3MgTm9kZSB7XG4gIHN0YXRpYyBhZGRTdHJpbmdUZXJtaW5hdG9yKHNyYywgb2Zmc2V0LCBzdHIpIHtcbiAgICBpZiAoc3RyW3N0ci5sZW5ndGggLSAxXSA9PT0gJ1xcbicpIHJldHVybiBzdHI7XG4gICAgY29uc3QgbmV4dCA9IE5vZGUuZW5kT2ZXaGl0ZVNwYWNlKHNyYywgb2Zmc2V0KTtcbiAgICByZXR1cm4gbmV4dCA+PSBzcmMubGVuZ3RoIHx8IHNyY1tuZXh0XSA9PT0gJ1xcbicgPyBzdHIgKyAnXFxuJyA6IHN0cjtcbiAgfSAvLyBeKC0tLXwuLi4pXG5cblxuICBzdGF0aWMgYXREb2N1bWVudEJvdW5kYXJ5KHNyYywgb2Zmc2V0LCBzZXApIHtcbiAgICBjb25zdCBjaDAgPSBzcmNbb2Zmc2V0XTtcbiAgICBpZiAoIWNoMCkgcmV0dXJuIHRydWU7XG4gICAgY29uc3QgcHJldiA9IHNyY1tvZmZzZXQgLSAxXTtcbiAgICBpZiAocHJldiAmJiBwcmV2ICE9PSAnXFxuJykgcmV0dXJuIGZhbHNlO1xuXG4gICAgaWYgKHNlcCkge1xuICAgICAgaWYgKGNoMCAhPT0gc2VwKSByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChjaDAgIT09IENoYXIuRElSRUNUSVZFU19FTkQgJiYgY2gwICE9PSBDaGFyLkRPQ1VNRU5UX0VORCkgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IGNoMSA9IHNyY1tvZmZzZXQgKyAxXTtcbiAgICBjb25zdCBjaDIgPSBzcmNbb2Zmc2V0ICsgMl07XG4gICAgaWYgKGNoMSAhPT0gY2gwIHx8IGNoMiAhPT0gY2gwKSByZXR1cm4gZmFsc2U7XG4gICAgY29uc3QgY2gzID0gc3JjW29mZnNldCArIDNdO1xuICAgIHJldHVybiAhY2gzIHx8IGNoMyA9PT0gJ1xcbicgfHwgY2gzID09PSAnXFx0JyB8fCBjaDMgPT09ICcgJztcbiAgfVxuXG4gIHN0YXRpYyBlbmRPZklkZW50aWZpZXIoc3JjLCBvZmZzZXQpIHtcbiAgICBsZXQgY2ggPSBzcmNbb2Zmc2V0XTtcbiAgICBjb25zdCBpc1ZlcmJhdGltID0gY2ggPT09ICc8JztcbiAgICBjb25zdCBub3RPayA9IGlzVmVyYmF0aW0gPyBbJ1xcbicsICdcXHQnLCAnICcsICc+J10gOiBbJ1xcbicsICdcXHQnLCAnICcsICdbJywgJ10nLCAneycsICd9JywgJywnXTtcblxuICAgIHdoaWxlIChjaCAmJiBub3RPay5pbmRleE9mKGNoKSA9PT0gLTEpIGNoID0gc3JjW29mZnNldCArPSAxXTtcblxuICAgIGlmIChpc1ZlcmJhdGltICYmIGNoID09PSAnPicpIG9mZnNldCArPSAxO1xuICAgIHJldHVybiBvZmZzZXQ7XG4gIH1cblxuICBzdGF0aWMgZW5kT2ZJbmRlbnQoc3JjLCBvZmZzZXQpIHtcbiAgICBsZXQgY2ggPSBzcmNbb2Zmc2V0XTtcblxuICAgIHdoaWxlIChjaCA9PT0gJyAnKSBjaCA9IHNyY1tvZmZzZXQgKz0gMV07XG5cbiAgICByZXR1cm4gb2Zmc2V0O1xuICB9XG5cbiAgc3RhdGljIGVuZE9mTGluZShzcmMsIG9mZnNldCkge1xuICAgIGxldCBjaCA9IHNyY1tvZmZzZXRdO1xuXG4gICAgd2hpbGUgKGNoICYmIGNoICE9PSAnXFxuJykgY2ggPSBzcmNbb2Zmc2V0ICs9IDFdO1xuXG4gICAgcmV0dXJuIG9mZnNldDtcbiAgfVxuXG4gIHN0YXRpYyBlbmRPZldoaXRlU3BhY2Uoc3JjLCBvZmZzZXQpIHtcbiAgICBsZXQgY2ggPSBzcmNbb2Zmc2V0XTtcblxuICAgIHdoaWxlIChjaCA9PT0gJ1xcdCcgfHwgY2ggPT09ICcgJykgY2ggPSBzcmNbb2Zmc2V0ICs9IDFdO1xuXG4gICAgcmV0dXJuIG9mZnNldDtcbiAgfVxuXG4gIHN0YXRpYyBzdGFydE9mTGluZShzcmMsIG9mZnNldCkge1xuICAgIGxldCBjaCA9IHNyY1tvZmZzZXQgLSAxXTtcbiAgICBpZiAoY2ggPT09ICdcXG4nKSByZXR1cm4gb2Zmc2V0O1xuXG4gICAgd2hpbGUgKGNoICYmIGNoICE9PSAnXFxuJykgY2ggPSBzcmNbb2Zmc2V0IC09IDFdO1xuXG4gICAgcmV0dXJuIG9mZnNldCArIDE7XG4gIH1cbiAgLyoqXG4gICAqIEVuZCBvZiBpbmRlbnRhdGlvbiwgb3IgbnVsbCBpZiB0aGUgbGluZSdzIGluZGVudCBsZXZlbCBpcyBub3QgbW9yZVxuICAgKiB0aGFuIGBpbmRlbnRgXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzcmNcbiAgICogQHBhcmFtIHtudW1iZXJ9IGluZGVudFxuICAgKiBAcGFyYW0ge251bWJlcn0gbGluZVN0YXJ0XG4gICAqIEByZXR1cm5zIHs/bnVtYmVyfVxuICAgKi9cblxuXG4gIHN0YXRpYyBlbmRPZkJsb2NrSW5kZW50KHNyYywgaW5kZW50LCBsaW5lU3RhcnQpIHtcbiAgICBjb25zdCBpbkVuZCA9IE5vZGUuZW5kT2ZJbmRlbnQoc3JjLCBsaW5lU3RhcnQpO1xuXG4gICAgaWYgKGluRW5kID4gbGluZVN0YXJ0ICsgaW5kZW50KSB7XG4gICAgICByZXR1cm4gaW5FbmQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHdzRW5kID0gTm9kZS5lbmRPZldoaXRlU3BhY2Uoc3JjLCBpbkVuZCk7XG4gICAgICBjb25zdCBjaCA9IHNyY1t3c0VuZF07XG4gICAgICBpZiAoIWNoIHx8IGNoID09PSAnXFxuJykgcmV0dXJuIHdzRW5kO1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgc3RhdGljIGF0Qmxhbmsoc3JjLCBvZmZzZXQsIGVuZEFzQmxhbmspIHtcbiAgICBjb25zdCBjaCA9IHNyY1tvZmZzZXRdO1xuICAgIHJldHVybiBjaCA9PT0gJ1xcbicgfHwgY2ggPT09ICdcXHQnIHx8IGNoID09PSAnICcgfHwgZW5kQXNCbGFuayAmJiAhY2g7XG4gIH1cblxuICBzdGF0aWMgbmV4dE5vZGVJc0luZGVudGVkKGNoLCBpbmRlbnREaWZmLCBpbmRpY2F0b3JBc0luZGVudCkge1xuICAgIGlmICghY2ggfHwgaW5kZW50RGlmZiA8IDApIHJldHVybiBmYWxzZTtcbiAgICBpZiAoaW5kZW50RGlmZiA+IDApIHJldHVybiB0cnVlO1xuICAgIHJldHVybiBpbmRpY2F0b3JBc0luZGVudCAmJiBjaCA9PT0gJy0nO1xuICB9IC8vIHNob3VsZCBiZSBhdCBsaW5lIG9yIHN0cmluZyBlbmQsIG9yIGF0IG5leHQgbm9uLXdoaXRlc3BhY2UgY2hhclxuXG5cbiAgc3RhdGljIG5vcm1hbGl6ZU9mZnNldChzcmMsIG9mZnNldCkge1xuICAgIGNvbnN0IGNoID0gc3JjW29mZnNldF07XG4gICAgcmV0dXJuICFjaCA/IG9mZnNldCA6IGNoICE9PSAnXFxuJyAmJiBzcmNbb2Zmc2V0IC0gMV0gPT09ICdcXG4nID8gb2Zmc2V0IC0gMSA6IE5vZGUuZW5kT2ZXaGl0ZVNwYWNlKHNyYywgb2Zmc2V0KTtcbiAgfSAvLyBmb2xkIHNpbmdsZSBuZXdsaW5lIGludG8gc3BhY2UsIG11bHRpcGxlIG5ld2xpbmVzIHRvIE4gLSAxIG5ld2xpbmVzXG4gIC8vIHByZXN1bWVzIHNyY1tvZmZzZXRdID09PSAnXFxuJ1xuXG5cbiAgc3RhdGljIGZvbGROZXdsaW5lKHNyYywgb2Zmc2V0LCBpbmRlbnQpIHtcbiAgICBsZXQgaW5Db3VudCA9IDA7XG4gICAgbGV0IGVycm9yID0gZmFsc2U7XG4gICAgbGV0IGZvbGQgPSAnJztcbiAgICBsZXQgY2ggPSBzcmNbb2Zmc2V0ICsgMV07XG5cbiAgICB3aGlsZSAoY2ggPT09ICcgJyB8fCBjaCA9PT0gJ1xcdCcgfHwgY2ggPT09ICdcXG4nKSB7XG4gICAgICBzd2l0Y2ggKGNoKSB7XG4gICAgICAgIGNhc2UgJ1xcbic6XG4gICAgICAgICAgaW5Db3VudCA9IDA7XG4gICAgICAgICAgb2Zmc2V0ICs9IDE7XG4gICAgICAgICAgZm9sZCArPSAnXFxuJztcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdcXHQnOlxuICAgICAgICAgIGlmIChpbkNvdW50IDw9IGluZGVudCkgZXJyb3IgPSB0cnVlO1xuICAgICAgICAgIG9mZnNldCA9IE5vZGUuZW5kT2ZXaGl0ZVNwYWNlKHNyYywgb2Zmc2V0ICsgMikgLSAxO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJyAnOlxuICAgICAgICAgIGluQ291bnQgKz0gMTtcbiAgICAgICAgICBvZmZzZXQgKz0gMTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgY2ggPSBzcmNbb2Zmc2V0ICsgMV07XG4gICAgfVxuXG4gICAgaWYgKCFmb2xkKSBmb2xkID0gJyAnO1xuICAgIGlmIChjaCAmJiBpbkNvdW50IDw9IGluZGVudCkgZXJyb3IgPSB0cnVlO1xuICAgIHJldHVybiB7XG4gICAgICBmb2xkLFxuICAgICAgb2Zmc2V0LFxuICAgICAgZXJyb3JcbiAgICB9O1xuICB9XG5cbiAgY29uc3RydWN0b3IodHlwZSwgcHJvcHMsIGNvbnRleHQpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ2NvbnRleHQnLCB7XG4gICAgICB2YWx1ZTogY29udGV4dCB8fCBudWxsLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgICB0aGlzLmVycm9yID0gbnVsbDtcbiAgICB0aGlzLnJhbmdlID0gbnVsbDtcbiAgICB0aGlzLnZhbHVlUmFuZ2UgPSBudWxsO1xuICAgIHRoaXMucHJvcHMgPSBwcm9wcyB8fCBbXTtcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgIHRoaXMudmFsdWUgPSBudWxsO1xuICB9XG5cbiAgZ2V0UHJvcFZhbHVlKGlkeCwga2V5LCBza2lwS2V5KSB7XG4gICAgaWYgKCF0aGlzLmNvbnRleHQpIHJldHVybiBudWxsO1xuICAgIGNvbnN0IHtcbiAgICAgIHNyY1xuICAgIH0gPSB0aGlzLmNvbnRleHQ7XG4gICAgY29uc3QgcHJvcCA9IHRoaXMucHJvcHNbaWR4XTtcbiAgICByZXR1cm4gcHJvcCAmJiBzcmNbcHJvcC5zdGFydF0gPT09IGtleSA/IHNyYy5zbGljZShwcm9wLnN0YXJ0ICsgKHNraXBLZXkgPyAxIDogMCksIHByb3AuZW5kKSA6IG51bGw7XG4gIH1cblxuICBnZXQgYW5jaG9yKCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5wcm9wcy5sZW5ndGg7ICsraSkge1xuICAgICAgY29uc3QgYW5jaG9yID0gdGhpcy5nZXRQcm9wVmFsdWUoaSwgQ2hhci5BTkNIT1IsIHRydWUpO1xuICAgICAgaWYgKGFuY2hvciAhPSBudWxsKSByZXR1cm4gYW5jaG9yO1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgZ2V0IGNvbW1lbnQoKSB7XG4gICAgY29uc3QgY29tbWVudHMgPSBbXTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5wcm9wcy5sZW5ndGg7ICsraSkge1xuICAgICAgY29uc3QgY29tbWVudCA9IHRoaXMuZ2V0UHJvcFZhbHVlKGksIENoYXIuQ09NTUVOVCwgdHJ1ZSk7XG4gICAgICBpZiAoY29tbWVudCAhPSBudWxsKSBjb21tZW50cy5wdXNoKGNvbW1lbnQpO1xuICAgIH1cblxuICAgIHJldHVybiBjb21tZW50cy5sZW5ndGggPiAwID8gY29tbWVudHMuam9pbignXFxuJykgOiBudWxsO1xuICB9XG5cbiAgY29tbWVudEhhc1JlcXVpcmVkV2hpdGVzcGFjZShzdGFydCkge1xuICAgIGNvbnN0IHtcbiAgICAgIHNyY1xuICAgIH0gPSB0aGlzLmNvbnRleHQ7XG4gICAgaWYgKHRoaXMuaGVhZGVyICYmIHN0YXJ0ID09PSB0aGlzLmhlYWRlci5lbmQpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoIXRoaXMudmFsdWVSYW5nZSkgcmV0dXJuIGZhbHNlO1xuICAgIGNvbnN0IHtcbiAgICAgIGVuZFxuICAgIH0gPSB0aGlzLnZhbHVlUmFuZ2U7XG4gICAgcmV0dXJuIHN0YXJ0ICE9PSBlbmQgfHwgTm9kZS5hdEJsYW5rKHNyYywgZW5kIC0gMSk7XG4gIH1cblxuICBnZXQgaGFzQ29tbWVudCgpIHtcbiAgICBpZiAodGhpcy5jb250ZXh0KSB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIHNyY1xuICAgICAgfSA9IHRoaXMuY29udGV4dDtcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnByb3BzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGlmIChzcmNbdGhpcy5wcm9wc1tpXS5zdGFydF0gPT09IENoYXIuQ09NTUVOVCkgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZ2V0IGhhc1Byb3BzKCkge1xuICAgIGlmICh0aGlzLmNvbnRleHQpIHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgc3JjXG4gICAgICB9ID0gdGhpcy5jb250ZXh0O1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucHJvcHMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYgKHNyY1t0aGlzLnByb3BzW2ldLnN0YXJ0XSAhPT0gQ2hhci5DT01NRU5UKSByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBnZXQgaW5jbHVkZXNUcmFpbGluZ0xpbmVzKCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGdldCBqc29uTGlrZSgpIHtcbiAgICBjb25zdCBqc29uTGlrZVR5cGVzID0gW1R5cGUuRkxPV19NQVAsIFR5cGUuRkxPV19TRVEsIFR5cGUuUVVPVEVfRE9VQkxFLCBUeXBlLlFVT1RFX1NJTkdMRV07XG4gICAgcmV0dXJuIGpzb25MaWtlVHlwZXMuaW5kZXhPZih0aGlzLnR5cGUpICE9PSAtMTtcbiAgfVxuXG4gIGdldCByYW5nZUFzTGluZVBvcygpIHtcbiAgICBpZiAoIXRoaXMucmFuZ2UgfHwgIXRoaXMuY29udGV4dCkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICBjb25zdCBzdGFydCA9IGdldExpbmVQb3ModGhpcy5yYW5nZS5zdGFydCwgdGhpcy5jb250ZXh0LnJvb3QpO1xuICAgIGlmICghc3RhcnQpIHJldHVybiB1bmRlZmluZWQ7XG4gICAgY29uc3QgZW5kID0gZ2V0TGluZVBvcyh0aGlzLnJhbmdlLmVuZCwgdGhpcy5jb250ZXh0LnJvb3QpO1xuICAgIHJldHVybiB7XG4gICAgICBzdGFydCxcbiAgICAgIGVuZFxuICAgIH07XG4gIH1cblxuICBnZXQgcmF3VmFsdWUoKSB7XG4gICAgaWYgKCF0aGlzLnZhbHVlUmFuZ2UgfHwgIXRoaXMuY29udGV4dCkgcmV0dXJuIG51bGw7XG4gICAgY29uc3Qge1xuICAgICAgc3RhcnQsXG4gICAgICBlbmRcbiAgICB9ID0gdGhpcy52YWx1ZVJhbmdlO1xuICAgIHJldHVybiB0aGlzLmNvbnRleHQuc3JjLnNsaWNlKHN0YXJ0LCBlbmQpO1xuICB9XG5cbiAgZ2V0IHRhZygpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucHJvcHMubGVuZ3RoOyArK2kpIHtcbiAgICAgIGNvbnN0IHRhZyA9IHRoaXMuZ2V0UHJvcFZhbHVlKGksIENoYXIuVEFHLCBmYWxzZSk7XG5cbiAgICAgIGlmICh0YWcgIT0gbnVsbCkge1xuICAgICAgICBpZiAodGFnWzFdID09PSAnPCcpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmVyYmF0aW06IHRhZy5zbGljZSgyLCAtMSlcbiAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuICAgICAgICAgIGNvbnN0IFtfLCBoYW5kbGUsIHN1ZmZpeF0gPSB0YWcubWF0Y2goL14oLiohKShbXiFdKikkLyk7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGhhbmRsZSxcbiAgICAgICAgICAgIHN1ZmZpeFxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGdldCB2YWx1ZVJhbmdlQ29udGFpbnNOZXdsaW5lKCkge1xuICAgIGlmICghdGhpcy52YWx1ZVJhbmdlIHx8ICF0aGlzLmNvbnRleHQpIHJldHVybiBmYWxzZTtcbiAgICBjb25zdCB7XG4gICAgICBzdGFydCxcbiAgICAgIGVuZFxuICAgIH0gPSB0aGlzLnZhbHVlUmFuZ2U7XG4gICAgY29uc3Qge1xuICAgICAgc3JjXG4gICAgfSA9IHRoaXMuY29udGV4dDtcblxuICAgIGZvciAobGV0IGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKSB7XG4gICAgICBpZiAoc3JjW2ldID09PSAnXFxuJykgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcGFyc2VDb21tZW50KHN0YXJ0KSB7XG4gICAgY29uc3Qge1xuICAgICAgc3JjXG4gICAgfSA9IHRoaXMuY29udGV4dDtcblxuICAgIGlmIChzcmNbc3RhcnRdID09PSBDaGFyLkNPTU1FTlQpIHtcbiAgICAgIGNvbnN0IGVuZCA9IE5vZGUuZW5kT2ZMaW5lKHNyYywgc3RhcnQgKyAxKTtcbiAgICAgIGNvbnN0IGNvbW1lbnRSYW5nZSA9IG5ldyBSYW5nZShzdGFydCwgZW5kKTtcbiAgICAgIHRoaXMucHJvcHMucHVzaChjb21tZW50UmFuZ2UpO1xuICAgICAgcmV0dXJuIGVuZDtcbiAgICB9XG5cbiAgICByZXR1cm4gc3RhcnQ7XG4gIH1cbiAgLyoqXG4gICAqIFBvcHVsYXRlcyB0aGUgYG9yaWdTdGFydGAgYW5kIGBvcmlnRW5kYCB2YWx1ZXMgb2YgYWxsIHJhbmdlcyBmb3IgdGhpc1xuICAgKiBub2RlLiBFeHRlbmRlZCBieSBjaGlsZCBjbGFzc2VzIHRvIGhhbmRsZSBkZXNjZW5kYW50IG5vZGVzLlxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcltdfSBjciAtIFBvc2l0aW9ucyBvZiBkcm9wcGVkIENSIGNoYXJhY3RlcnNcbiAgICogQHBhcmFtIHtudW1iZXJ9IG9mZnNldCAtIFN0YXJ0aW5nIGluZGV4IG9mIGBjcmAgZnJvbSB0aGUgbGFzdCBjYWxsXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9IC0gVGhlIG5leHQgb2Zmc2V0LCBtYXRjaGluZyB0aGUgb25lIGZvdW5kIGZvciBgb3JpZ1N0YXJ0YFxuICAgKi9cblxuXG4gIHNldE9yaWdSYW5nZXMoY3IsIG9mZnNldCkge1xuICAgIGlmICh0aGlzLnJhbmdlKSBvZmZzZXQgPSB0aGlzLnJhbmdlLnNldE9yaWdSYW5nZShjciwgb2Zmc2V0KTtcbiAgICBpZiAodGhpcy52YWx1ZVJhbmdlKSB0aGlzLnZhbHVlUmFuZ2Uuc2V0T3JpZ1JhbmdlKGNyLCBvZmZzZXQpO1xuICAgIHRoaXMucHJvcHMuZm9yRWFjaChwcm9wID0+IHByb3Auc2V0T3JpZ1JhbmdlKGNyLCBvZmZzZXQpKTtcbiAgICByZXR1cm4gb2Zmc2V0O1xuICB9XG5cbiAgdG9TdHJpbmcoKSB7XG4gICAgY29uc3Qge1xuICAgICAgY29udGV4dDoge1xuICAgICAgICBzcmNcbiAgICAgIH0sXG4gICAgICByYW5nZSxcbiAgICAgIHZhbHVlXG4gICAgfSA9IHRoaXM7XG4gICAgaWYgKHZhbHVlICE9IG51bGwpIHJldHVybiB2YWx1ZTtcbiAgICBjb25zdCBzdHIgPSBzcmMuc2xpY2UocmFuZ2Uuc3RhcnQsIHJhbmdlLmVuZCk7XG4gICAgcmV0dXJuIE5vZGUuYWRkU3RyaW5nVGVybWluYXRvcihzcmMsIHJhbmdlLmVuZCwgc3RyKTtcbiAgfVxuXG59XG5cbmNsYXNzIFlBTUxFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgY29uc3RydWN0b3IobmFtZSwgc291cmNlLCBtZXNzYWdlKSB7XG4gICAgaWYgKCFtZXNzYWdlIHx8ICEoc291cmNlIGluc3RhbmNlb2YgTm9kZSkpIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBhcmd1bWVudHMgZm9yIG5ldyAke25hbWV9YCk7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgdGhpcy5zb3VyY2UgPSBzb3VyY2U7XG4gIH1cblxuICBtYWtlUHJldHR5KCkge1xuICAgIGlmICghdGhpcy5zb3VyY2UpIHJldHVybjtcbiAgICB0aGlzLm5vZGVUeXBlID0gdGhpcy5zb3VyY2UudHlwZTtcbiAgICBjb25zdCBjc3QgPSB0aGlzLnNvdXJjZS5jb250ZXh0ICYmIHRoaXMuc291cmNlLmNvbnRleHQucm9vdDtcblxuICAgIGlmICh0eXBlb2YgdGhpcy5vZmZzZXQgPT09ICdudW1iZXInKSB7XG4gICAgICB0aGlzLnJhbmdlID0gbmV3IFJhbmdlKHRoaXMub2Zmc2V0LCB0aGlzLm9mZnNldCArIDEpO1xuICAgICAgY29uc3Qgc3RhcnQgPSBjc3QgJiYgZ2V0TGluZVBvcyh0aGlzLm9mZnNldCwgY3N0KTtcblxuICAgICAgaWYgKHN0YXJ0KSB7XG4gICAgICAgIGNvbnN0IGVuZCA9IHtcbiAgICAgICAgICBsaW5lOiBzdGFydC5saW5lLFxuICAgICAgICAgIGNvbDogc3RhcnQuY29sICsgMVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmxpbmVQb3MgPSB7XG4gICAgICAgICAgc3RhcnQsXG4gICAgICAgICAgZW5kXG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIGRlbGV0ZSB0aGlzLm9mZnNldDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yYW5nZSA9IHRoaXMuc291cmNlLnJhbmdlO1xuICAgICAgdGhpcy5saW5lUG9zID0gdGhpcy5zb3VyY2UucmFuZ2VBc0xpbmVQb3M7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMubGluZVBvcykge1xuICAgICAgY29uc3Qge1xuICAgICAgICBsaW5lLFxuICAgICAgICBjb2xcbiAgICAgIH0gPSB0aGlzLmxpbmVQb3Muc3RhcnQ7XG4gICAgICB0aGlzLm1lc3NhZ2UgKz0gYCBhdCBsaW5lICR7bGluZX0sIGNvbHVtbiAke2NvbH1gO1xuICAgICAgY29uc3QgY3R4ID0gY3N0ICYmIGdldFByZXR0eUNvbnRleHQodGhpcy5saW5lUG9zLCBjc3QpO1xuICAgICAgaWYgKGN0eCkgdGhpcy5tZXNzYWdlICs9IGA6XFxuXFxuJHtjdHh9XFxuYDtcbiAgICB9XG5cbiAgICBkZWxldGUgdGhpcy5zb3VyY2U7XG4gIH1cblxufVxuY2xhc3MgWUFNTFJlZmVyZW5jZUVycm9yIGV4dGVuZHMgWUFNTEVycm9yIHtcbiAgY29uc3RydWN0b3Ioc291cmNlLCBtZXNzYWdlKSB7XG4gICAgc3VwZXIoJ1lBTUxSZWZlcmVuY2VFcnJvcicsIHNvdXJjZSwgbWVzc2FnZSk7XG4gIH1cblxufVxuY2xhc3MgWUFNTFNlbWFudGljRXJyb3IgZXh0ZW5kcyBZQU1MRXJyb3Ige1xuICBjb25zdHJ1Y3Rvcihzb3VyY2UsIG1lc3NhZ2UpIHtcbiAgICBzdXBlcignWUFNTFNlbWFudGljRXJyb3InLCBzb3VyY2UsIG1lc3NhZ2UpO1xuICB9XG5cbn1cbmNsYXNzIFlBTUxTeW50YXhFcnJvciBleHRlbmRzIFlBTUxFcnJvciB7XG4gIGNvbnN0cnVjdG9yKHNvdXJjZSwgbWVzc2FnZSkge1xuICAgIHN1cGVyKCdZQU1MU3ludGF4RXJyb3InLCBzb3VyY2UsIG1lc3NhZ2UpO1xuICB9XG5cbn1cbmNsYXNzIFlBTUxXYXJuaW5nIGV4dGVuZHMgWUFNTEVycm9yIHtcbiAgY29uc3RydWN0b3Ioc291cmNlLCBtZXNzYWdlKSB7XG4gICAgc3VwZXIoJ1lBTUxXYXJuaW5nJywgc291cmNlLCBtZXNzYWdlKTtcbiAgfVxuXG59XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHtcbiAgaWYgKGtleSBpbiBvYmopIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIG9ialtrZXldID0gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gb2JqO1xufVxuXG5jbGFzcyBQbGFpblZhbHVlIGV4dGVuZHMgTm9kZSB7XG4gIHN0YXRpYyBlbmRPZkxpbmUoc3JjLCBzdGFydCwgaW5GbG93KSB7XG4gICAgbGV0IGNoID0gc3JjW3N0YXJ0XTtcbiAgICBsZXQgb2Zmc2V0ID0gc3RhcnQ7XG5cbiAgICB3aGlsZSAoY2ggJiYgY2ggIT09ICdcXG4nKSB7XG4gICAgICBpZiAoaW5GbG93ICYmIChjaCA9PT0gJ1snIHx8IGNoID09PSAnXScgfHwgY2ggPT09ICd7JyB8fCBjaCA9PT0gJ30nIHx8IGNoID09PSAnLCcpKSBicmVhaztcbiAgICAgIGNvbnN0IG5leHQgPSBzcmNbb2Zmc2V0ICsgMV07XG4gICAgICBpZiAoY2ggPT09ICc6JyAmJiAoIW5leHQgfHwgbmV4dCA9PT0gJ1xcbicgfHwgbmV4dCA9PT0gJ1xcdCcgfHwgbmV4dCA9PT0gJyAnIHx8IGluRmxvdyAmJiBuZXh0ID09PSAnLCcpKSBicmVhaztcbiAgICAgIGlmICgoY2ggPT09ICcgJyB8fCBjaCA9PT0gJ1xcdCcpICYmIG5leHQgPT09ICcjJykgYnJlYWs7XG4gICAgICBvZmZzZXQgKz0gMTtcbiAgICAgIGNoID0gbmV4dDtcbiAgICB9XG5cbiAgICByZXR1cm4gb2Zmc2V0O1xuICB9XG5cbiAgZ2V0IHN0clZhbHVlKCkge1xuICAgIGlmICghdGhpcy52YWx1ZVJhbmdlIHx8ICF0aGlzLmNvbnRleHQpIHJldHVybiBudWxsO1xuICAgIGxldCB7XG4gICAgICBzdGFydCxcbiAgICAgIGVuZFxuICAgIH0gPSB0aGlzLnZhbHVlUmFuZ2U7XG4gICAgY29uc3Qge1xuICAgICAgc3JjXG4gICAgfSA9IHRoaXMuY29udGV4dDtcbiAgICBsZXQgY2ggPSBzcmNbZW5kIC0gMV07XG5cbiAgICB3aGlsZSAoc3RhcnQgPCBlbmQgJiYgKGNoID09PSAnXFxuJyB8fCBjaCA9PT0gJ1xcdCcgfHwgY2ggPT09ICcgJykpIGNoID0gc3JjWy0tZW5kIC0gMV07XG5cbiAgICBsZXQgc3RyID0gJyc7XG5cbiAgICBmb3IgKGxldCBpID0gc3RhcnQ7IGkgPCBlbmQ7ICsraSkge1xuICAgICAgY29uc3QgY2ggPSBzcmNbaV07XG5cbiAgICAgIGlmIChjaCA9PT0gJ1xcbicpIHtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgIGZvbGQsXG4gICAgICAgICAgb2Zmc2V0XG4gICAgICAgIH0gPSBOb2RlLmZvbGROZXdsaW5lKHNyYywgaSwgLTEpO1xuICAgICAgICBzdHIgKz0gZm9sZDtcbiAgICAgICAgaSA9IG9mZnNldDtcbiAgICAgIH0gZWxzZSBpZiAoY2ggPT09ICcgJyB8fCBjaCA9PT0gJ1xcdCcpIHtcbiAgICAgICAgLy8gdHJpbSB0cmFpbGluZyB3aGl0ZXNwYWNlXG4gICAgICAgIGNvbnN0IHdzU3RhcnQgPSBpO1xuICAgICAgICBsZXQgbmV4dCA9IHNyY1tpICsgMV07XG5cbiAgICAgICAgd2hpbGUgKGkgPCBlbmQgJiYgKG5leHQgPT09ICcgJyB8fCBuZXh0ID09PSAnXFx0JykpIHtcbiAgICAgICAgICBpICs9IDE7XG4gICAgICAgICAgbmV4dCA9IHNyY1tpICsgMV07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobmV4dCAhPT0gJ1xcbicpIHN0ciArPSBpID4gd3NTdGFydCA/IHNyYy5zbGljZSh3c1N0YXJ0LCBpICsgMSkgOiBjaDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0ciArPSBjaDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBjaDAgPSBzcmNbc3RhcnRdO1xuXG4gICAgc3dpdGNoIChjaDApIHtcbiAgICAgIGNhc2UgJ1xcdCc6XG4gICAgICAgIHtcbiAgICAgICAgICBjb25zdCBtc2cgPSAnUGxhaW4gdmFsdWUgY2Fubm90IHN0YXJ0IHdpdGggYSB0YWIgY2hhcmFjdGVyJztcbiAgICAgICAgICBjb25zdCBlcnJvcnMgPSBbbmV3IFlBTUxTZW1hbnRpY0Vycm9yKHRoaXMsIG1zZyldO1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBlcnJvcnMsXG4gICAgICAgICAgICBzdHJcbiAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgIGNhc2UgJ0AnOlxuICAgICAgY2FzZSAnYCc6XG4gICAgICAgIHtcbiAgICAgICAgICBjb25zdCBtc2cgPSBgUGxhaW4gdmFsdWUgY2Fubm90IHN0YXJ0IHdpdGggcmVzZXJ2ZWQgY2hhcmFjdGVyICR7Y2gwfWA7XG4gICAgICAgICAgY29uc3QgZXJyb3JzID0gW25ldyBZQU1MU2VtYW50aWNFcnJvcih0aGlzLCBtc2cpXTtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZXJyb3JzLFxuICAgICAgICAgICAgc3RyXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gc3RyO1xuICAgIH1cbiAgfVxuXG4gIHBhcnNlQmxvY2tWYWx1ZShzdGFydCkge1xuICAgIGNvbnN0IHtcbiAgICAgIGluZGVudCxcbiAgICAgIGluRmxvdyxcbiAgICAgIHNyY1xuICAgIH0gPSB0aGlzLmNvbnRleHQ7XG4gICAgbGV0IG9mZnNldCA9IHN0YXJ0O1xuICAgIGxldCB2YWx1ZUVuZCA9IHN0YXJ0O1xuXG4gICAgZm9yIChsZXQgY2ggPSBzcmNbb2Zmc2V0XTsgY2ggPT09ICdcXG4nOyBjaCA9IHNyY1tvZmZzZXRdKSB7XG4gICAgICBpZiAoTm9kZS5hdERvY3VtZW50Qm91bmRhcnkoc3JjLCBvZmZzZXQgKyAxKSkgYnJlYWs7XG4gICAgICBjb25zdCBlbmQgPSBOb2RlLmVuZE9mQmxvY2tJbmRlbnQoc3JjLCBpbmRlbnQsIG9mZnNldCArIDEpO1xuICAgICAgaWYgKGVuZCA9PT0gbnVsbCB8fCBzcmNbZW5kXSA9PT0gJyMnKSBicmVhaztcblxuICAgICAgaWYgKHNyY1tlbmRdID09PSAnXFxuJykge1xuICAgICAgICBvZmZzZXQgPSBlbmQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWx1ZUVuZCA9IFBsYWluVmFsdWUuZW5kT2ZMaW5lKHNyYywgZW5kLCBpbkZsb3cpO1xuICAgICAgICBvZmZzZXQgPSB2YWx1ZUVuZDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy52YWx1ZVJhbmdlLmlzRW1wdHkoKSkgdGhpcy52YWx1ZVJhbmdlLnN0YXJ0ID0gc3RhcnQ7XG4gICAgdGhpcy52YWx1ZVJhbmdlLmVuZCA9IHZhbHVlRW5kO1xuICAgIHJldHVybiB2YWx1ZUVuZDtcbiAgfVxuICAvKipcbiAgICogUGFyc2VzIGEgcGxhaW4gdmFsdWUgZnJvbSB0aGUgc291cmNlXG4gICAqXG4gICAqIEFjY2VwdGVkIGZvcm1zIGFyZTpcbiAgICogYGBgXG4gICAqICNjb21tZW50XG4gICAqXG4gICAqIGZpcnN0IGxpbmVcbiAgICpcbiAgICogZmlyc3QgbGluZSAjY29tbWVudFxuICAgKlxuICAgKiBmaXJzdCBsaW5lXG4gICAqIGJsb2NrXG4gICAqIGxpbmVzXG4gICAqXG4gICAqICNjb21tZW50XG4gICAqIGJsb2NrXG4gICAqIGxpbmVzXG4gICAqIGBgYFxuICAgKiB3aGVyZSBibG9jayBsaW5lcyBhcmUgZW1wdHkgb3IgaGF2ZSBhbiBpbmRlbnQgbGV2ZWwgZ3JlYXRlciB0aGFuIGBpbmRlbnRgLlxuICAgKlxuICAgKiBAcGFyYW0ge1BhcnNlQ29udGV4dH0gY29udGV4dFxuICAgKiBAcGFyYW0ge251bWJlcn0gc3RhcnQgLSBJbmRleCBvZiBmaXJzdCBjaGFyYWN0ZXJcbiAgICogQHJldHVybnMge251bWJlcn0gLSBJbmRleCBvZiB0aGUgY2hhcmFjdGVyIGFmdGVyIHRoaXMgc2NhbGFyLCBtYXkgYmUgYFxcbmBcbiAgICovXG5cblxuICBwYXJzZShjb250ZXh0LCBzdGFydCkge1xuICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gICAgY29uc3Qge1xuICAgICAgaW5GbG93LFxuICAgICAgc3JjXG4gICAgfSA9IGNvbnRleHQ7XG4gICAgbGV0IG9mZnNldCA9IHN0YXJ0O1xuICAgIGNvbnN0IGNoID0gc3JjW29mZnNldF07XG5cbiAgICBpZiAoY2ggJiYgY2ggIT09ICcjJyAmJiBjaCAhPT0gJ1xcbicpIHtcbiAgICAgIG9mZnNldCA9IFBsYWluVmFsdWUuZW5kT2ZMaW5lKHNyYywgc3RhcnQsIGluRmxvdyk7XG4gICAgfVxuXG4gICAgdGhpcy52YWx1ZVJhbmdlID0gbmV3IFJhbmdlKHN0YXJ0LCBvZmZzZXQpO1xuICAgIG9mZnNldCA9IE5vZGUuZW5kT2ZXaGl0ZVNwYWNlKHNyYywgb2Zmc2V0KTtcbiAgICBvZmZzZXQgPSB0aGlzLnBhcnNlQ29tbWVudChvZmZzZXQpO1xuXG4gICAgaWYgKCF0aGlzLmhhc0NvbW1lbnQgfHwgdGhpcy52YWx1ZVJhbmdlLmlzRW1wdHkoKSkge1xuICAgICAgb2Zmc2V0ID0gdGhpcy5wYXJzZUJsb2NrVmFsdWUob2Zmc2V0KTtcbiAgICB9XG5cbiAgICByZXR1cm4gb2Zmc2V0O1xuICB9XG5cbn1cblxuZXhwb3J0cy5DaGFyID0gQ2hhcjtcbmV4cG9ydHMuTm9kZSA9IE5vZGU7XG5leHBvcnRzLlBsYWluVmFsdWUgPSBQbGFpblZhbHVlO1xuZXhwb3J0cy5SYW5nZSA9IFJhbmdlO1xuZXhwb3J0cy5UeXBlID0gVHlwZTtcbmV4cG9ydHMuWUFNTEVycm9yID0gWUFNTEVycm9yO1xuZXhwb3J0cy5ZQU1MUmVmZXJlbmNlRXJyb3IgPSBZQU1MUmVmZXJlbmNlRXJyb3I7XG5leHBvcnRzLllBTUxTZW1hbnRpY0Vycm9yID0gWUFNTFNlbWFudGljRXJyb3I7XG5leHBvcnRzLllBTUxTeW50YXhFcnJvciA9IFlBTUxTeW50YXhFcnJvcjtcbmV4cG9ydHMuWUFNTFdhcm5pbmcgPSBZQU1MV2FybmluZztcbmV4cG9ydHMuX2RlZmluZVByb3BlcnR5ID0gX2RlZmluZVByb3BlcnR5O1xuZXhwb3J0cy5kZWZhdWx0VGFnUHJlZml4ID0gZGVmYXVsdFRhZ1ByZWZpeDtcbmV4cG9ydHMuZGVmYXVsdFRhZ3MgPSBkZWZhdWx0VGFncztcbiIsICIndXNlIHN0cmljdCc7XG5cbnZhciBQbGFpblZhbHVlID0gcmVxdWlyZSgnLi9QbGFpblZhbHVlLWVjOGU1ODhlLmpzJyk7XG5cbmZ1bmN0aW9uIGFkZENvbW1lbnRCZWZvcmUoc3RyLCBpbmRlbnQsIGNvbW1lbnQpIHtcbiAgaWYgKCFjb21tZW50KSByZXR1cm4gc3RyO1xuICBjb25zdCBjYyA9IGNvbW1lbnQucmVwbGFjZSgvW1xcc1xcU11eL2dtLCBgJCYke2luZGVudH0jYCk7XG4gIHJldHVybiBgIyR7Y2N9XFxuJHtpbmRlbnR9JHtzdHJ9YDtcbn1cbmZ1bmN0aW9uIGFkZENvbW1lbnQoc3RyLCBpbmRlbnQsIGNvbW1lbnQpIHtcbiAgcmV0dXJuICFjb21tZW50ID8gc3RyIDogY29tbWVudC5pbmRleE9mKCdcXG4nKSA9PT0gLTEgPyBgJHtzdHJ9ICMke2NvbW1lbnR9YCA6IGAke3N0cn1cXG5gICsgY29tbWVudC5yZXBsYWNlKC9eL2dtLCBgJHtpbmRlbnQgfHwgJyd9I2ApO1xufVxuXG5jbGFzcyBOb2RlIHt9XG5cbmZ1bmN0aW9uIHRvSlNPTih2YWx1ZSwgYXJnLCBjdHgpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSByZXR1cm4gdmFsdWUubWFwKCh2LCBpKSA9PiB0b0pTT04odiwgU3RyaW5nKGkpLCBjdHgpKTtcblxuICBpZiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlLnRvSlNPTiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNvbnN0IGFuY2hvciA9IGN0eCAmJiBjdHguYW5jaG9ycyAmJiBjdHguYW5jaG9ycy5nZXQodmFsdWUpO1xuICAgIGlmIChhbmNob3IpIGN0eC5vbkNyZWF0ZSA9IHJlcyA9PiB7XG4gICAgICBhbmNob3IucmVzID0gcmVzO1xuICAgICAgZGVsZXRlIGN0eC5vbkNyZWF0ZTtcbiAgICB9O1xuICAgIGNvbnN0IHJlcyA9IHZhbHVlLnRvSlNPTihhcmcsIGN0eCk7XG4gICAgaWYgKGFuY2hvciAmJiBjdHgub25DcmVhdGUpIGN0eC5vbkNyZWF0ZShyZXMpO1xuICAgIHJldHVybiByZXM7XG4gIH1cblxuICBpZiAoKCFjdHggfHwgIWN0eC5rZWVwKSAmJiB0eXBlb2YgdmFsdWUgPT09ICdiaWdpbnQnKSByZXR1cm4gTnVtYmVyKHZhbHVlKTtcbiAgcmV0dXJuIHZhbHVlO1xufVxuXG5jbGFzcyBTY2FsYXIgZXh0ZW5kcyBOb2RlIHtcbiAgY29uc3RydWN0b3IodmFsdWUpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHRvSlNPTihhcmcsIGN0eCkge1xuICAgIHJldHVybiBjdHggJiYgY3R4LmtlZXAgPyB0aGlzLnZhbHVlIDogdG9KU09OKHRoaXMudmFsdWUsIGFyZywgY3R4KTtcbiAgfVxuXG4gIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiBTdHJpbmcodGhpcy52YWx1ZSk7XG4gIH1cblxufVxuXG5mdW5jdGlvbiBjb2xsZWN0aW9uRnJvbVBhdGgoc2NoZW1hLCBwYXRoLCB2YWx1ZSkge1xuICBsZXQgdiA9IHZhbHVlO1xuXG4gIGZvciAobGV0IGkgPSBwYXRoLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgY29uc3QgayA9IHBhdGhbaV07XG5cbiAgICBpZiAoTnVtYmVyLmlzSW50ZWdlcihrKSAmJiBrID49IDApIHtcbiAgICAgIGNvbnN0IGEgPSBbXTtcbiAgICAgIGFba10gPSB2O1xuICAgICAgdiA9IGE7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IG8gPSB7fTtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrLCB7XG4gICAgICAgIHZhbHVlOiB2LFxuICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICB9KTtcbiAgICAgIHYgPSBvO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBzY2hlbWEuY3JlYXRlTm9kZSh2LCBmYWxzZSk7XG59IC8vIG51bGwsIHVuZGVmaW5lZCwgb3IgYW4gZW1wdHkgbm9uLXN0cmluZyBpdGVyYWJsZSAoZS5nLiBbXSlcblxuXG5jb25zdCBpc0VtcHR5UGF0aCA9IHBhdGggPT4gcGF0aCA9PSBudWxsIHx8IHR5cGVvZiBwYXRoID09PSAnb2JqZWN0JyAmJiBwYXRoW1N5bWJvbC5pdGVyYXRvcl0oKS5uZXh0KCkuZG9uZTtcbmNsYXNzIENvbGxlY3Rpb24gZXh0ZW5kcyBOb2RlIHtcbiAgY29uc3RydWN0b3Ioc2NoZW1hKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIFBsYWluVmFsdWUuX2RlZmluZVByb3BlcnR5KHRoaXMsIFwiaXRlbXNcIiwgW10pO1xuXG4gICAgdGhpcy5zY2hlbWEgPSBzY2hlbWE7XG4gIH1cblxuICBhZGRJbihwYXRoLCB2YWx1ZSkge1xuICAgIGlmIChpc0VtcHR5UGF0aChwYXRoKSkgdGhpcy5hZGQodmFsdWUpO2Vsc2Uge1xuICAgICAgY29uc3QgW2tleSwgLi4ucmVzdF0gPSBwYXRoO1xuICAgICAgY29uc3Qgbm9kZSA9IHRoaXMuZ2V0KGtleSwgdHJ1ZSk7XG4gICAgICBpZiAobm9kZSBpbnN0YW5jZW9mIENvbGxlY3Rpb24pIG5vZGUuYWRkSW4ocmVzdCwgdmFsdWUpO2Vsc2UgaWYgKG5vZGUgPT09IHVuZGVmaW5lZCAmJiB0aGlzLnNjaGVtYSkgdGhpcy5zZXQoa2V5LCBjb2xsZWN0aW9uRnJvbVBhdGgodGhpcy5zY2hlbWEsIHJlc3QsIHZhbHVlKSk7ZWxzZSB0aHJvdyBuZXcgRXJyb3IoYEV4cGVjdGVkIFlBTUwgY29sbGVjdGlvbiBhdCAke2tleX0uIFJlbWFpbmluZyBwYXRoOiAke3Jlc3R9YCk7XG4gICAgfVxuICB9XG5cbiAgZGVsZXRlSW4oW2tleSwgLi4ucmVzdF0pIHtcbiAgICBpZiAocmVzdC5sZW5ndGggPT09IDApIHJldHVybiB0aGlzLmRlbGV0ZShrZXkpO1xuICAgIGNvbnN0IG5vZGUgPSB0aGlzLmdldChrZXksIHRydWUpO1xuICAgIGlmIChub2RlIGluc3RhbmNlb2YgQ29sbGVjdGlvbikgcmV0dXJuIG5vZGUuZGVsZXRlSW4ocmVzdCk7ZWxzZSB0aHJvdyBuZXcgRXJyb3IoYEV4cGVjdGVkIFlBTUwgY29sbGVjdGlvbiBhdCAke2tleX0uIFJlbWFpbmluZyBwYXRoOiAke3Jlc3R9YCk7XG4gIH1cblxuICBnZXRJbihba2V5LCAuLi5yZXN0XSwga2VlcFNjYWxhcikge1xuICAgIGNvbnN0IG5vZGUgPSB0aGlzLmdldChrZXksIHRydWUpO1xuICAgIGlmIChyZXN0Lmxlbmd0aCA9PT0gMCkgcmV0dXJuICFrZWVwU2NhbGFyICYmIG5vZGUgaW5zdGFuY2VvZiBTY2FsYXIgPyBub2RlLnZhbHVlIDogbm9kZTtlbHNlIHJldHVybiBub2RlIGluc3RhbmNlb2YgQ29sbGVjdGlvbiA/IG5vZGUuZ2V0SW4ocmVzdCwga2VlcFNjYWxhcikgOiB1bmRlZmluZWQ7XG4gIH1cblxuICBoYXNBbGxOdWxsVmFsdWVzKCkge1xuICAgIHJldHVybiB0aGlzLml0ZW1zLmV2ZXJ5KG5vZGUgPT4ge1xuICAgICAgaWYgKCFub2RlIHx8IG5vZGUudHlwZSAhPT0gJ1BBSVInKSByZXR1cm4gZmFsc2U7XG4gICAgICBjb25zdCBuID0gbm9kZS52YWx1ZTtcbiAgICAgIHJldHVybiBuID09IG51bGwgfHwgbiBpbnN0YW5jZW9mIFNjYWxhciAmJiBuLnZhbHVlID09IG51bGwgJiYgIW4uY29tbWVudEJlZm9yZSAmJiAhbi5jb21tZW50ICYmICFuLnRhZztcbiAgICB9KTtcbiAgfVxuXG4gIGhhc0luKFtrZXksIC4uLnJlc3RdKSB7XG4gICAgaWYgKHJlc3QubGVuZ3RoID09PSAwKSByZXR1cm4gdGhpcy5oYXMoa2V5KTtcbiAgICBjb25zdCBub2RlID0gdGhpcy5nZXQoa2V5LCB0cnVlKTtcbiAgICByZXR1cm4gbm9kZSBpbnN0YW5jZW9mIENvbGxlY3Rpb24gPyBub2RlLmhhc0luKHJlc3QpIDogZmFsc2U7XG4gIH1cblxuICBzZXRJbihba2V5LCAuLi5yZXN0XSwgdmFsdWUpIHtcbiAgICBpZiAocmVzdC5sZW5ndGggPT09IDApIHtcbiAgICAgIHRoaXMuc2V0KGtleSwgdmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBub2RlID0gdGhpcy5nZXQoa2V5LCB0cnVlKTtcbiAgICAgIGlmIChub2RlIGluc3RhbmNlb2YgQ29sbGVjdGlvbikgbm9kZS5zZXRJbihyZXN0LCB2YWx1ZSk7ZWxzZSBpZiAobm9kZSA9PT0gdW5kZWZpbmVkICYmIHRoaXMuc2NoZW1hKSB0aGlzLnNldChrZXksIGNvbGxlY3Rpb25Gcm9tUGF0aCh0aGlzLnNjaGVtYSwgcmVzdCwgdmFsdWUpKTtlbHNlIHRocm93IG5ldyBFcnJvcihgRXhwZWN0ZWQgWUFNTCBjb2xsZWN0aW9uIGF0ICR7a2V5fS4gUmVtYWluaW5nIHBhdGg6ICR7cmVzdH1gKTtcbiAgICB9XG4gIH0gLy8gb3ZlcnJpZGRlbiBpbiBpbXBsZW1lbnRhdGlvbnNcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuXG5cbiAgdG9KU09OKCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgdG9TdHJpbmcoY3R4LCB7XG4gICAgYmxvY2tJdGVtLFxuICAgIGZsb3dDaGFycyxcbiAgICBpc01hcCxcbiAgICBpdGVtSW5kZW50XG4gIH0sIG9uQ29tbWVudCwgb25DaG9tcEtlZXApIHtcbiAgICBjb25zdCB7XG4gICAgICBpbmRlbnQsXG4gICAgICBpbmRlbnRTdGVwLFxuICAgICAgc3RyaW5naWZ5XG4gICAgfSA9IGN0eDtcbiAgICBjb25zdCBpbkZsb3cgPSB0aGlzLnR5cGUgPT09IFBsYWluVmFsdWUuVHlwZS5GTE9XX01BUCB8fCB0aGlzLnR5cGUgPT09IFBsYWluVmFsdWUuVHlwZS5GTE9XX1NFUSB8fCBjdHguaW5GbG93O1xuICAgIGlmIChpbkZsb3cpIGl0ZW1JbmRlbnQgKz0gaW5kZW50U3RlcDtcbiAgICBjb25zdCBhbGxOdWxsVmFsdWVzID0gaXNNYXAgJiYgdGhpcy5oYXNBbGxOdWxsVmFsdWVzKCk7XG4gICAgY3R4ID0gT2JqZWN0LmFzc2lnbih7fSwgY3R4LCB7XG4gICAgICBhbGxOdWxsVmFsdWVzLFxuICAgICAgaW5kZW50OiBpdGVtSW5kZW50LFxuICAgICAgaW5GbG93LFxuICAgICAgdHlwZTogbnVsbFxuICAgIH0pO1xuICAgIGxldCBjaG9tcEtlZXAgPSBmYWxzZTtcbiAgICBsZXQgaGFzSXRlbVdpdGhOZXdMaW5lID0gZmFsc2U7XG4gICAgY29uc3Qgbm9kZXMgPSB0aGlzLml0ZW1zLnJlZHVjZSgobm9kZXMsIGl0ZW0sIGkpID0+IHtcbiAgICAgIGxldCBjb21tZW50O1xuXG4gICAgICBpZiAoaXRlbSkge1xuICAgICAgICBpZiAoIWNob21wS2VlcCAmJiBpdGVtLnNwYWNlQmVmb3JlKSBub2Rlcy5wdXNoKHtcbiAgICAgICAgICB0eXBlOiAnY29tbWVudCcsXG4gICAgICAgICAgc3RyOiAnJ1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGl0ZW0uY29tbWVudEJlZm9yZSkgaXRlbS5jb21tZW50QmVmb3JlLm1hdGNoKC9eLiokL2dtKS5mb3JFYWNoKGxpbmUgPT4ge1xuICAgICAgICAgIG5vZGVzLnB1c2goe1xuICAgICAgICAgICAgdHlwZTogJ2NvbW1lbnQnLFxuICAgICAgICAgICAgc3RyOiBgIyR7bGluZX1gXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoaXRlbS5jb21tZW50KSBjb21tZW50ID0gaXRlbS5jb21tZW50O1xuICAgICAgICBpZiAoaW5GbG93ICYmICghY2hvbXBLZWVwICYmIGl0ZW0uc3BhY2VCZWZvcmUgfHwgaXRlbS5jb21tZW50QmVmb3JlIHx8IGl0ZW0uY29tbWVudCB8fCBpdGVtLmtleSAmJiAoaXRlbS5rZXkuY29tbWVudEJlZm9yZSB8fCBpdGVtLmtleS5jb21tZW50KSB8fCBpdGVtLnZhbHVlICYmIChpdGVtLnZhbHVlLmNvbW1lbnRCZWZvcmUgfHwgaXRlbS52YWx1ZS5jb21tZW50KSkpIGhhc0l0ZW1XaXRoTmV3TGluZSA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIGNob21wS2VlcCA9IGZhbHNlO1xuICAgICAgbGV0IHN0ciA9IHN0cmluZ2lmeShpdGVtLCBjdHgsICgpID0+IGNvbW1lbnQgPSBudWxsLCAoKSA9PiBjaG9tcEtlZXAgPSB0cnVlKTtcbiAgICAgIGlmIChpbkZsb3cgJiYgIWhhc0l0ZW1XaXRoTmV3TGluZSAmJiBzdHIuaW5jbHVkZXMoJ1xcbicpKSBoYXNJdGVtV2l0aE5ld0xpbmUgPSB0cnVlO1xuICAgICAgaWYgKGluRmxvdyAmJiBpIDwgdGhpcy5pdGVtcy5sZW5ndGggLSAxKSBzdHIgKz0gJywnO1xuICAgICAgc3RyID0gYWRkQ29tbWVudChzdHIsIGl0ZW1JbmRlbnQsIGNvbW1lbnQpO1xuICAgICAgaWYgKGNob21wS2VlcCAmJiAoY29tbWVudCB8fCBpbkZsb3cpKSBjaG9tcEtlZXAgPSBmYWxzZTtcbiAgICAgIG5vZGVzLnB1c2goe1xuICAgICAgICB0eXBlOiAnaXRlbScsXG4gICAgICAgIHN0clxuICAgICAgfSk7XG4gICAgICByZXR1cm4gbm9kZXM7XG4gICAgfSwgW10pO1xuICAgIGxldCBzdHI7XG5cbiAgICBpZiAobm9kZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICBzdHIgPSBmbG93Q2hhcnMuc3RhcnQgKyBmbG93Q2hhcnMuZW5kO1xuICAgIH0gZWxzZSBpZiAoaW5GbG93KSB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIHN0YXJ0LFxuICAgICAgICBlbmRcbiAgICAgIH0gPSBmbG93Q2hhcnM7XG4gICAgICBjb25zdCBzdHJpbmdzID0gbm9kZXMubWFwKG4gPT4gbi5zdHIpO1xuXG4gICAgICBpZiAoaGFzSXRlbVdpdGhOZXdMaW5lIHx8IHN0cmluZ3MucmVkdWNlKChzdW0sIHN0cikgPT4gc3VtICsgc3RyLmxlbmd0aCArIDIsIDIpID4gQ29sbGVjdGlvbi5tYXhGbG93U3RyaW5nU2luZ2xlTGluZUxlbmd0aCkge1xuICAgICAgICBzdHIgPSBzdGFydDtcblxuICAgICAgICBmb3IgKGNvbnN0IHMgb2Ygc3RyaW5ncykge1xuICAgICAgICAgIHN0ciArPSBzID8gYFxcbiR7aW5kZW50U3RlcH0ke2luZGVudH0ke3N9YCA6ICdcXG4nO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RyICs9IGBcXG4ke2luZGVudH0ke2VuZH1gO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3RyID0gYCR7c3RhcnR9ICR7c3RyaW5ncy5qb2luKCcgJyl9ICR7ZW5kfWA7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHN0cmluZ3MgPSBub2Rlcy5tYXAoYmxvY2tJdGVtKTtcbiAgICAgIHN0ciA9IHN0cmluZ3Muc2hpZnQoKTtcblxuICAgICAgZm9yIChjb25zdCBzIG9mIHN0cmluZ3MpIHN0ciArPSBzID8gYFxcbiR7aW5kZW50fSR7c31gIDogJ1xcbic7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuY29tbWVudCkge1xuICAgICAgc3RyICs9ICdcXG4nICsgdGhpcy5jb21tZW50LnJlcGxhY2UoL14vZ20sIGAke2luZGVudH0jYCk7XG4gICAgICBpZiAob25Db21tZW50KSBvbkNvbW1lbnQoKTtcbiAgICB9IGVsc2UgaWYgKGNob21wS2VlcCAmJiBvbkNob21wS2VlcCkgb25DaG9tcEtlZXAoKTtcblxuICAgIHJldHVybiBzdHI7XG4gIH1cblxufVxuXG5QbGFpblZhbHVlLl9kZWZpbmVQcm9wZXJ0eShDb2xsZWN0aW9uLCBcIm1heEZsb3dTdHJpbmdTaW5nbGVMaW5lTGVuZ3RoXCIsIDYwKTtcblxuZnVuY3Rpb24gYXNJdGVtSW5kZXgoa2V5KSB7XG4gIGxldCBpZHggPSBrZXkgaW5zdGFuY2VvZiBTY2FsYXIgPyBrZXkudmFsdWUgOiBrZXk7XG4gIGlmIChpZHggJiYgdHlwZW9mIGlkeCA9PT0gJ3N0cmluZycpIGlkeCA9IE51bWJlcihpZHgpO1xuICByZXR1cm4gTnVtYmVyLmlzSW50ZWdlcihpZHgpICYmIGlkeCA+PSAwID8gaWR4IDogbnVsbDtcbn1cblxuY2xhc3MgWUFNTFNlcSBleHRlbmRzIENvbGxlY3Rpb24ge1xuICBhZGQodmFsdWUpIHtcbiAgICB0aGlzLml0ZW1zLnB1c2godmFsdWUpO1xuICB9XG5cbiAgZGVsZXRlKGtleSkge1xuICAgIGNvbnN0IGlkeCA9IGFzSXRlbUluZGV4KGtleSk7XG4gICAgaWYgKHR5cGVvZiBpZHggIT09ICdudW1iZXInKSByZXR1cm4gZmFsc2U7XG4gICAgY29uc3QgZGVsID0gdGhpcy5pdGVtcy5zcGxpY2UoaWR4LCAxKTtcbiAgICByZXR1cm4gZGVsLmxlbmd0aCA+IDA7XG4gIH1cblxuICBnZXQoa2V5LCBrZWVwU2NhbGFyKSB7XG4gICAgY29uc3QgaWR4ID0gYXNJdGVtSW5kZXgoa2V5KTtcbiAgICBpZiAodHlwZW9mIGlkeCAhPT0gJ251bWJlcicpIHJldHVybiB1bmRlZmluZWQ7XG4gICAgY29uc3QgaXQgPSB0aGlzLml0ZW1zW2lkeF07XG4gICAgcmV0dXJuICFrZWVwU2NhbGFyICYmIGl0IGluc3RhbmNlb2YgU2NhbGFyID8gaXQudmFsdWUgOiBpdDtcbiAgfVxuXG4gIGhhcyhrZXkpIHtcbiAgICBjb25zdCBpZHggPSBhc0l0ZW1JbmRleChrZXkpO1xuICAgIHJldHVybiB0eXBlb2YgaWR4ID09PSAnbnVtYmVyJyAmJiBpZHggPCB0aGlzLml0ZW1zLmxlbmd0aDtcbiAgfVxuXG4gIHNldChrZXksIHZhbHVlKSB7XG4gICAgY29uc3QgaWR4ID0gYXNJdGVtSW5kZXgoa2V5KTtcbiAgICBpZiAodHlwZW9mIGlkeCAhPT0gJ251bWJlcicpIHRocm93IG5ldyBFcnJvcihgRXhwZWN0ZWQgYSB2YWxpZCBpbmRleCwgbm90ICR7a2V5fS5gKTtcbiAgICB0aGlzLml0ZW1zW2lkeF0gPSB2YWx1ZTtcbiAgfVxuXG4gIHRvSlNPTihfLCBjdHgpIHtcbiAgICBjb25zdCBzZXEgPSBbXTtcbiAgICBpZiAoY3R4ICYmIGN0eC5vbkNyZWF0ZSkgY3R4Lm9uQ3JlYXRlKHNlcSk7XG4gICAgbGV0IGkgPSAwO1xuXG4gICAgZm9yIChjb25zdCBpdGVtIG9mIHRoaXMuaXRlbXMpIHNlcS5wdXNoKHRvSlNPTihpdGVtLCBTdHJpbmcoaSsrKSwgY3R4KSk7XG5cbiAgICByZXR1cm4gc2VxO1xuICB9XG5cbiAgdG9TdHJpbmcoY3R4LCBvbkNvbW1lbnQsIG9uQ2hvbXBLZWVwKSB7XG4gICAgaWYgKCFjdHgpIHJldHVybiBKU09OLnN0cmluZ2lmeSh0aGlzKTtcbiAgICByZXR1cm4gc3VwZXIudG9TdHJpbmcoY3R4LCB7XG4gICAgICBibG9ja0l0ZW06IG4gPT4gbi50eXBlID09PSAnY29tbWVudCcgPyBuLnN0ciA6IGAtICR7bi5zdHJ9YCxcbiAgICAgIGZsb3dDaGFyczoge1xuICAgICAgICBzdGFydDogJ1snLFxuICAgICAgICBlbmQ6ICddJ1xuICAgICAgfSxcbiAgICAgIGlzTWFwOiBmYWxzZSxcbiAgICAgIGl0ZW1JbmRlbnQ6IChjdHguaW5kZW50IHx8ICcnKSArICcgICdcbiAgICB9LCBvbkNvbW1lbnQsIG9uQ2hvbXBLZWVwKTtcbiAgfVxuXG59XG5cbmNvbnN0IHN0cmluZ2lmeUtleSA9IChrZXksIGpzS2V5LCBjdHgpID0+IHtcbiAgaWYgKGpzS2V5ID09PSBudWxsKSByZXR1cm4gJyc7XG4gIGlmICh0eXBlb2YganNLZXkgIT09ICdvYmplY3QnKSByZXR1cm4gU3RyaW5nKGpzS2V5KTtcbiAgaWYgKGtleSBpbnN0YW5jZW9mIE5vZGUgJiYgY3R4ICYmIGN0eC5kb2MpIHJldHVybiBrZXkudG9TdHJpbmcoe1xuICAgIGFuY2hvcnM6IE9iamVjdC5jcmVhdGUobnVsbCksXG4gICAgZG9jOiBjdHguZG9jLFxuICAgIGluZGVudDogJycsXG4gICAgaW5kZW50U3RlcDogY3R4LmluZGVudFN0ZXAsXG4gICAgaW5GbG93OiB0cnVlLFxuICAgIGluU3RyaW5naWZ5S2V5OiB0cnVlLFxuICAgIHN0cmluZ2lmeTogY3R4LnN0cmluZ2lmeVxuICB9KTtcbiAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGpzS2V5KTtcbn07XG5cbmNsYXNzIFBhaXIgZXh0ZW5kcyBOb2RlIHtcbiAgY29uc3RydWN0b3Ioa2V5LCB2YWx1ZSA9IG51bGwpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMua2V5ID0ga2V5O1xuICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB0aGlzLnR5cGUgPSBQYWlyLlR5cGUuUEFJUjtcbiAgfVxuXG4gIGdldCBjb21tZW50QmVmb3JlKCkge1xuICAgIHJldHVybiB0aGlzLmtleSBpbnN0YW5jZW9mIE5vZGUgPyB0aGlzLmtleS5jb21tZW50QmVmb3JlIDogdW5kZWZpbmVkO1xuICB9XG5cbiAgc2V0IGNvbW1lbnRCZWZvcmUoY2IpIHtcbiAgICBpZiAodGhpcy5rZXkgPT0gbnVsbCkgdGhpcy5rZXkgPSBuZXcgU2NhbGFyKG51bGwpO1xuICAgIGlmICh0aGlzLmtleSBpbnN0YW5jZW9mIE5vZGUpIHRoaXMua2V5LmNvbW1lbnRCZWZvcmUgPSBjYjtlbHNlIHtcbiAgICAgIGNvbnN0IG1zZyA9ICdQYWlyLmNvbW1lbnRCZWZvcmUgaXMgYW4gYWxpYXMgZm9yIFBhaXIua2V5LmNvbW1lbnRCZWZvcmUuIFRvIHNldCBpdCwgdGhlIGtleSBtdXN0IGJlIGEgTm9kZS4nO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKG1zZyk7XG4gICAgfVxuICB9XG5cbiAgYWRkVG9KU01hcChjdHgsIG1hcCkge1xuICAgIGNvbnN0IGtleSA9IHRvSlNPTih0aGlzLmtleSwgJycsIGN0eCk7XG5cbiAgICBpZiAobWFwIGluc3RhbmNlb2YgTWFwKSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IHRvSlNPTih0aGlzLnZhbHVlLCBrZXksIGN0eCk7XG4gICAgICBtYXAuc2V0KGtleSwgdmFsdWUpO1xuICAgIH0gZWxzZSBpZiAobWFwIGluc3RhbmNlb2YgU2V0KSB7XG4gICAgICBtYXAuYWRkKGtleSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHN0cmluZ0tleSA9IHN0cmluZ2lmeUtleSh0aGlzLmtleSwga2V5LCBjdHgpO1xuICAgICAgY29uc3QgdmFsdWUgPSB0b0pTT04odGhpcy52YWx1ZSwgc3RyaW5nS2V5LCBjdHgpO1xuICAgICAgaWYgKHN0cmluZ0tleSBpbiBtYXApIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtYXAsIHN0cmluZ0tleSwge1xuICAgICAgICB2YWx1ZSxcbiAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgfSk7ZWxzZSBtYXBbc3RyaW5nS2V5XSA9IHZhbHVlO1xuICAgIH1cblxuICAgIHJldHVybiBtYXA7XG4gIH1cblxuICB0b0pTT04oXywgY3R4KSB7XG4gICAgY29uc3QgcGFpciA9IGN0eCAmJiBjdHgubWFwQXNNYXAgPyBuZXcgTWFwKCkgOiB7fTtcbiAgICByZXR1cm4gdGhpcy5hZGRUb0pTTWFwKGN0eCwgcGFpcik7XG4gIH1cblxuICB0b1N0cmluZyhjdHgsIG9uQ29tbWVudCwgb25DaG9tcEtlZXApIHtcbiAgICBpZiAoIWN0eCB8fCAhY3R4LmRvYykgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHRoaXMpO1xuICAgIGNvbnN0IHtcbiAgICAgIGluZGVudDogaW5kZW50U2l6ZSxcbiAgICAgIGluZGVudFNlcSxcbiAgICAgIHNpbXBsZUtleXNcbiAgICB9ID0gY3R4LmRvYy5vcHRpb25zO1xuICAgIGxldCB7XG4gICAgICBrZXksXG4gICAgICB2YWx1ZVxuICAgIH0gPSB0aGlzO1xuICAgIGxldCBrZXlDb21tZW50ID0ga2V5IGluc3RhbmNlb2YgTm9kZSAmJiBrZXkuY29tbWVudDtcblxuICAgIGlmIChzaW1wbGVLZXlzKSB7XG4gICAgICBpZiAoa2V5Q29tbWVudCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1dpdGggc2ltcGxlIGtleXMsIGtleSBub2RlcyBjYW5ub3QgaGF2ZSBjb21tZW50cycpO1xuICAgICAgfVxuXG4gICAgICBpZiAoa2V5IGluc3RhbmNlb2YgQ29sbGVjdGlvbikge1xuICAgICAgICBjb25zdCBtc2cgPSAnV2l0aCBzaW1wbGUga2V5cywgY29sbGVjdGlvbiBjYW5ub3QgYmUgdXNlZCBhcyBhIGtleSB2YWx1ZSc7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihtc2cpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxldCBleHBsaWNpdEtleSA9ICFzaW1wbGVLZXlzICYmICgha2V5IHx8IGtleUNvbW1lbnQgfHwgKGtleSBpbnN0YW5jZW9mIE5vZGUgPyBrZXkgaW5zdGFuY2VvZiBDb2xsZWN0aW9uIHx8IGtleS50eXBlID09PSBQbGFpblZhbHVlLlR5cGUuQkxPQ0tfRk9MREVEIHx8IGtleS50eXBlID09PSBQbGFpblZhbHVlLlR5cGUuQkxPQ0tfTElURVJBTCA6IHR5cGVvZiBrZXkgPT09ICdvYmplY3QnKSk7XG4gICAgY29uc3Qge1xuICAgICAgZG9jLFxuICAgICAgaW5kZW50LFxuICAgICAgaW5kZW50U3RlcCxcbiAgICAgIHN0cmluZ2lmeVxuICAgIH0gPSBjdHg7XG4gICAgY3R4ID0gT2JqZWN0LmFzc2lnbih7fSwgY3R4LCB7XG4gICAgICBpbXBsaWNpdEtleTogIWV4cGxpY2l0S2V5LFxuICAgICAgaW5kZW50OiBpbmRlbnQgKyBpbmRlbnRTdGVwXG4gICAgfSk7XG4gICAgbGV0IGNob21wS2VlcCA9IGZhbHNlO1xuICAgIGxldCBzdHIgPSBzdHJpbmdpZnkoa2V5LCBjdHgsICgpID0+IGtleUNvbW1lbnQgPSBudWxsLCAoKSA9PiBjaG9tcEtlZXAgPSB0cnVlKTtcbiAgICBzdHIgPSBhZGRDb21tZW50KHN0ciwgY3R4LmluZGVudCwga2V5Q29tbWVudCk7XG5cbiAgICBpZiAoIWV4cGxpY2l0S2V5ICYmIHN0ci5sZW5ndGggPiAxMDI0KSB7XG4gICAgICBpZiAoc2ltcGxlS2V5cykgdGhyb3cgbmV3IEVycm9yKCdXaXRoIHNpbXBsZSBrZXlzLCBzaW5nbGUgbGluZSBzY2FsYXIgbXVzdCBub3Qgc3BhbiBtb3JlIHRoYW4gMTAyNCBjaGFyYWN0ZXJzJyk7XG4gICAgICBleHBsaWNpdEtleSA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKGN0eC5hbGxOdWxsVmFsdWVzICYmICFzaW1wbGVLZXlzKSB7XG4gICAgICBpZiAodGhpcy5jb21tZW50KSB7XG4gICAgICAgIHN0ciA9IGFkZENvbW1lbnQoc3RyLCBjdHguaW5kZW50LCB0aGlzLmNvbW1lbnQpO1xuICAgICAgICBpZiAob25Db21tZW50KSBvbkNvbW1lbnQoKTtcbiAgICAgIH0gZWxzZSBpZiAoY2hvbXBLZWVwICYmICFrZXlDb21tZW50ICYmIG9uQ2hvbXBLZWVwKSBvbkNob21wS2VlcCgpO1xuXG4gICAgICByZXR1cm4gY3R4LmluRmxvdyAmJiAhZXhwbGljaXRLZXkgPyBzdHIgOiBgPyAke3N0cn1gO1xuICAgIH1cblxuICAgIHN0ciA9IGV4cGxpY2l0S2V5ID8gYD8gJHtzdHJ9XFxuJHtpbmRlbnR9OmAgOiBgJHtzdHJ9OmA7XG5cbiAgICBpZiAodGhpcy5jb21tZW50KSB7XG4gICAgICAvLyBleHBlY3RlZCAoYnV0IG5vdCBzdHJpY3RseSByZXF1aXJlZCkgdG8gYmUgYSBzaW5nbGUtbGluZSBjb21tZW50XG4gICAgICBzdHIgPSBhZGRDb21tZW50KHN0ciwgY3R4LmluZGVudCwgdGhpcy5jb21tZW50KTtcbiAgICAgIGlmIChvbkNvbW1lbnQpIG9uQ29tbWVudCgpO1xuICAgIH1cblxuICAgIGxldCB2Y2IgPSAnJztcbiAgICBsZXQgdmFsdWVDb21tZW50ID0gbnVsbDtcblxuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIE5vZGUpIHtcbiAgICAgIGlmICh2YWx1ZS5zcGFjZUJlZm9yZSkgdmNiID0gJ1xcbic7XG5cbiAgICAgIGlmICh2YWx1ZS5jb21tZW50QmVmb3JlKSB7XG4gICAgICAgIGNvbnN0IGNzID0gdmFsdWUuY29tbWVudEJlZm9yZS5yZXBsYWNlKC9eL2dtLCBgJHtjdHguaW5kZW50fSNgKTtcbiAgICAgICAgdmNiICs9IGBcXG4ke2NzfWA7XG4gICAgICB9XG5cbiAgICAgIHZhbHVlQ29tbWVudCA9IHZhbHVlLmNvbW1lbnQ7XG4gICAgfSBlbHNlIGlmICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgICB2YWx1ZSA9IGRvYy5zY2hlbWEuY3JlYXRlTm9kZSh2YWx1ZSwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgY3R4LmltcGxpY2l0S2V5ID0gZmFsc2U7XG4gICAgaWYgKCFleHBsaWNpdEtleSAmJiAhdGhpcy5jb21tZW50ICYmIHZhbHVlIGluc3RhbmNlb2YgU2NhbGFyKSBjdHguaW5kZW50QXRTdGFydCA9IHN0ci5sZW5ndGggKyAxO1xuICAgIGNob21wS2VlcCA9IGZhbHNlO1xuXG4gICAgaWYgKCFpbmRlbnRTZXEgJiYgaW5kZW50U2l6ZSA+PSAyICYmICFjdHguaW5GbG93ICYmICFleHBsaWNpdEtleSAmJiB2YWx1ZSBpbnN0YW5jZW9mIFlBTUxTZXEgJiYgdmFsdWUudHlwZSAhPT0gUGxhaW5WYWx1ZS5UeXBlLkZMT1dfU0VRICYmICF2YWx1ZS50YWcgJiYgIWRvYy5hbmNob3JzLmdldE5hbWUodmFsdWUpKSB7XG4gICAgICAvLyBJZiBpbmRlbnRTZXEgPT09IGZhbHNlLCBjb25zaWRlciAnLSAnIGFzIHBhcnQgb2YgaW5kZW50YXRpb24gd2hlcmUgcG9zc2libGVcbiAgICAgIGN0eC5pbmRlbnQgPSBjdHguaW5kZW50LnN1YnN0cigyKTtcbiAgICB9XG5cbiAgICBjb25zdCB2YWx1ZVN0ciA9IHN0cmluZ2lmeSh2YWx1ZSwgY3R4LCAoKSA9PiB2YWx1ZUNvbW1lbnQgPSBudWxsLCAoKSA9PiBjaG9tcEtlZXAgPSB0cnVlKTtcbiAgICBsZXQgd3MgPSAnICc7XG5cbiAgICBpZiAodmNiIHx8IHRoaXMuY29tbWVudCkge1xuICAgICAgd3MgPSBgJHt2Y2J9XFxuJHtjdHguaW5kZW50fWA7XG4gICAgfSBlbHNlIGlmICghZXhwbGljaXRLZXkgJiYgdmFsdWUgaW5zdGFuY2VvZiBDb2xsZWN0aW9uKSB7XG4gICAgICBjb25zdCBmbG93ID0gdmFsdWVTdHJbMF0gPT09ICdbJyB8fCB2YWx1ZVN0clswXSA9PT0gJ3snO1xuICAgICAgaWYgKCFmbG93IHx8IHZhbHVlU3RyLmluY2x1ZGVzKCdcXG4nKSkgd3MgPSBgXFxuJHtjdHguaW5kZW50fWA7XG4gICAgfSBlbHNlIGlmICh2YWx1ZVN0clswXSA9PT0gJ1xcbicpIHdzID0gJyc7XG5cbiAgICBpZiAoY2hvbXBLZWVwICYmICF2YWx1ZUNvbW1lbnQgJiYgb25DaG9tcEtlZXApIG9uQ2hvbXBLZWVwKCk7XG4gICAgcmV0dXJuIGFkZENvbW1lbnQoc3RyICsgd3MgKyB2YWx1ZVN0ciwgY3R4LmluZGVudCwgdmFsdWVDb21tZW50KTtcbiAgfVxuXG59XG5cblBsYWluVmFsdWUuX2RlZmluZVByb3BlcnR5KFBhaXIsIFwiVHlwZVwiLCB7XG4gIFBBSVI6ICdQQUlSJyxcbiAgTUVSR0VfUEFJUjogJ01FUkdFX1BBSVInXG59KTtcblxuY29uc3QgZ2V0QWxpYXNDb3VudCA9IChub2RlLCBhbmNob3JzKSA9PiB7XG4gIGlmIChub2RlIGluc3RhbmNlb2YgQWxpYXMpIHtcbiAgICBjb25zdCBhbmNob3IgPSBhbmNob3JzLmdldChub2RlLnNvdXJjZSk7XG4gICAgcmV0dXJuIGFuY2hvci5jb3VudCAqIGFuY2hvci5hbGlhc0NvdW50O1xuICB9IGVsc2UgaWYgKG5vZGUgaW5zdGFuY2VvZiBDb2xsZWN0aW9uKSB7XG4gICAgbGV0IGNvdW50ID0gMDtcblxuICAgIGZvciAoY29uc3QgaXRlbSBvZiBub2RlLml0ZW1zKSB7XG4gICAgICBjb25zdCBjID0gZ2V0QWxpYXNDb3VudChpdGVtLCBhbmNob3JzKTtcbiAgICAgIGlmIChjID4gY291bnQpIGNvdW50ID0gYztcbiAgICB9XG5cbiAgICByZXR1cm4gY291bnQ7XG4gIH0gZWxzZSBpZiAobm9kZSBpbnN0YW5jZW9mIFBhaXIpIHtcbiAgICBjb25zdCBrYyA9IGdldEFsaWFzQ291bnQobm9kZS5rZXksIGFuY2hvcnMpO1xuICAgIGNvbnN0IHZjID0gZ2V0QWxpYXNDb3VudChub2RlLnZhbHVlLCBhbmNob3JzKTtcbiAgICByZXR1cm4gTWF0aC5tYXgoa2MsIHZjKTtcbiAgfVxuXG4gIHJldHVybiAxO1xufTtcblxuY2xhc3MgQWxpYXMgZXh0ZW5kcyBOb2RlIHtcbiAgc3RhdGljIHN0cmluZ2lmeSh7XG4gICAgcmFuZ2UsXG4gICAgc291cmNlXG4gIH0sIHtcbiAgICBhbmNob3JzLFxuICAgIGRvYyxcbiAgICBpbXBsaWNpdEtleSxcbiAgICBpblN0cmluZ2lmeUtleVxuICB9KSB7XG4gICAgbGV0IGFuY2hvciA9IE9iamVjdC5rZXlzKGFuY2hvcnMpLmZpbmQoYSA9PiBhbmNob3JzW2FdID09PSBzb3VyY2UpO1xuICAgIGlmICghYW5jaG9yICYmIGluU3RyaW5naWZ5S2V5KSBhbmNob3IgPSBkb2MuYW5jaG9ycy5nZXROYW1lKHNvdXJjZSkgfHwgZG9jLmFuY2hvcnMubmV3TmFtZSgpO1xuICAgIGlmIChhbmNob3IpIHJldHVybiBgKiR7YW5jaG9yfSR7aW1wbGljaXRLZXkgPyAnICcgOiAnJ31gO1xuICAgIGNvbnN0IG1zZyA9IGRvYy5hbmNob3JzLmdldE5hbWUoc291cmNlKSA/ICdBbGlhcyBub2RlIG11c3QgYmUgYWZ0ZXIgc291cmNlIG5vZGUnIDogJ1NvdXJjZSBub2RlIG5vdCBmb3VuZCBmb3IgYWxpYXMgbm9kZSc7XG4gICAgdGhyb3cgbmV3IEVycm9yKGAke21zZ30gWyR7cmFuZ2V9XWApO1xuICB9XG5cbiAgY29uc3RydWN0b3Ioc291cmNlKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnNvdXJjZSA9IHNvdXJjZTtcbiAgICB0aGlzLnR5cGUgPSBQbGFpblZhbHVlLlR5cGUuQUxJQVM7XG4gIH1cblxuICBzZXQgdGFnKHQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0FsaWFzIG5vZGVzIGNhbm5vdCBoYXZlIHRhZ3MnKTtcbiAgfVxuXG4gIHRvSlNPTihhcmcsIGN0eCkge1xuICAgIGlmICghY3R4KSByZXR1cm4gdG9KU09OKHRoaXMuc291cmNlLCBhcmcsIGN0eCk7XG4gICAgY29uc3Qge1xuICAgICAgYW5jaG9ycyxcbiAgICAgIG1heEFsaWFzQ291bnRcbiAgICB9ID0gY3R4O1xuICAgIGNvbnN0IGFuY2hvciA9IGFuY2hvcnMuZ2V0KHRoaXMuc291cmNlKTtcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cblxuICAgIGlmICghYW5jaG9yIHx8IGFuY2hvci5yZXMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgY29uc3QgbXNnID0gJ1RoaXMgc2hvdWxkIG5vdCBoYXBwZW46IEFsaWFzIGFuY2hvciB3YXMgbm90IHJlc29sdmVkPyc7XG4gICAgICBpZiAodGhpcy5jc3ROb2RlKSB0aHJvdyBuZXcgUGxhaW5WYWx1ZS5ZQU1MUmVmZXJlbmNlRXJyb3IodGhpcy5jc3ROb2RlLCBtc2cpO2Vsc2UgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKG1zZyk7XG4gICAgfVxuXG4gICAgaWYgKG1heEFsaWFzQ291bnQgPj0gMCkge1xuICAgICAgYW5jaG9yLmNvdW50ICs9IDE7XG4gICAgICBpZiAoYW5jaG9yLmFsaWFzQ291bnQgPT09IDApIGFuY2hvci5hbGlhc0NvdW50ID0gZ2V0QWxpYXNDb3VudCh0aGlzLnNvdXJjZSwgYW5jaG9ycyk7XG5cbiAgICAgIGlmIChhbmNob3IuY291bnQgKiBhbmNob3IuYWxpYXNDb3VudCA+IG1heEFsaWFzQ291bnQpIHtcbiAgICAgICAgY29uc3QgbXNnID0gJ0V4Y2Vzc2l2ZSBhbGlhcyBjb3VudCBpbmRpY2F0ZXMgYSByZXNvdXJjZSBleGhhdXN0aW9uIGF0dGFjayc7XG4gICAgICAgIGlmICh0aGlzLmNzdE5vZGUpIHRocm93IG5ldyBQbGFpblZhbHVlLllBTUxSZWZlcmVuY2VFcnJvcih0aGlzLmNzdE5vZGUsIG1zZyk7ZWxzZSB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IobXNnKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gYW5jaG9yLnJlcztcbiAgfSAvLyBPbmx5IGNhbGxlZCB3aGVuIHN0cmluZ2lmeWluZyBhbiBhbGlhcyBtYXBwaW5nIGtleSB3aGlsZSBjb25zdHJ1Y3RpbmdcbiAgLy8gT2JqZWN0IG91dHB1dC5cblxuXG4gIHRvU3RyaW5nKGN0eCkge1xuICAgIHJldHVybiBBbGlhcy5zdHJpbmdpZnkodGhpcywgY3R4KTtcbiAgfVxuXG59XG5cblBsYWluVmFsdWUuX2RlZmluZVByb3BlcnR5KEFsaWFzLCBcImRlZmF1bHRcIiwgdHJ1ZSk7XG5cbmZ1bmN0aW9uIGZpbmRQYWlyKGl0ZW1zLCBrZXkpIHtcbiAgY29uc3QgayA9IGtleSBpbnN0YW5jZW9mIFNjYWxhciA/IGtleS52YWx1ZSA6IGtleTtcblxuICBmb3IgKGNvbnN0IGl0IG9mIGl0ZW1zKSB7XG4gICAgaWYgKGl0IGluc3RhbmNlb2YgUGFpcikge1xuICAgICAgaWYgKGl0LmtleSA9PT0ga2V5IHx8IGl0LmtleSA9PT0gaykgcmV0dXJuIGl0O1xuICAgICAgaWYgKGl0LmtleSAmJiBpdC5rZXkudmFsdWUgPT09IGspIHJldHVybiBpdDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuY2xhc3MgWUFNTE1hcCBleHRlbmRzIENvbGxlY3Rpb24ge1xuICBhZGQocGFpciwgb3ZlcndyaXRlKSB7XG4gICAgaWYgKCFwYWlyKSBwYWlyID0gbmV3IFBhaXIocGFpcik7ZWxzZSBpZiAoIShwYWlyIGluc3RhbmNlb2YgUGFpcikpIHBhaXIgPSBuZXcgUGFpcihwYWlyLmtleSB8fCBwYWlyLCBwYWlyLnZhbHVlKTtcbiAgICBjb25zdCBwcmV2ID0gZmluZFBhaXIodGhpcy5pdGVtcywgcGFpci5rZXkpO1xuICAgIGNvbnN0IHNvcnRFbnRyaWVzID0gdGhpcy5zY2hlbWEgJiYgdGhpcy5zY2hlbWEuc29ydE1hcEVudHJpZXM7XG5cbiAgICBpZiAocHJldikge1xuICAgICAgaWYgKG92ZXJ3cml0ZSkgcHJldi52YWx1ZSA9IHBhaXIudmFsdWU7ZWxzZSB0aHJvdyBuZXcgRXJyb3IoYEtleSAke3BhaXIua2V5fSBhbHJlYWR5IHNldGApO1xuICAgIH0gZWxzZSBpZiAoc29ydEVudHJpZXMpIHtcbiAgICAgIGNvbnN0IGkgPSB0aGlzLml0ZW1zLmZpbmRJbmRleChpdGVtID0+IHNvcnRFbnRyaWVzKHBhaXIsIGl0ZW0pIDwgMCk7XG4gICAgICBpZiAoaSA9PT0gLTEpIHRoaXMuaXRlbXMucHVzaChwYWlyKTtlbHNlIHRoaXMuaXRlbXMuc3BsaWNlKGksIDAsIHBhaXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLml0ZW1zLnB1c2gocGFpcik7XG4gICAgfVxuICB9XG5cbiAgZGVsZXRlKGtleSkge1xuICAgIGNvbnN0IGl0ID0gZmluZFBhaXIodGhpcy5pdGVtcywga2V5KTtcbiAgICBpZiAoIWl0KSByZXR1cm4gZmFsc2U7XG4gICAgY29uc3QgZGVsID0gdGhpcy5pdGVtcy5zcGxpY2UodGhpcy5pdGVtcy5pbmRleE9mKGl0KSwgMSk7XG4gICAgcmV0dXJuIGRlbC5sZW5ndGggPiAwO1xuICB9XG5cbiAgZ2V0KGtleSwga2VlcFNjYWxhcikge1xuICAgIGNvbnN0IGl0ID0gZmluZFBhaXIodGhpcy5pdGVtcywga2V5KTtcbiAgICBjb25zdCBub2RlID0gaXQgJiYgaXQudmFsdWU7XG4gICAgcmV0dXJuICFrZWVwU2NhbGFyICYmIG5vZGUgaW5zdGFuY2VvZiBTY2FsYXIgPyBub2RlLnZhbHVlIDogbm9kZTtcbiAgfVxuXG4gIGhhcyhrZXkpIHtcbiAgICByZXR1cm4gISFmaW5kUGFpcih0aGlzLml0ZW1zLCBrZXkpO1xuICB9XG5cbiAgc2V0KGtleSwgdmFsdWUpIHtcbiAgICB0aGlzLmFkZChuZXcgUGFpcihrZXksIHZhbHVlKSwgdHJ1ZSk7XG4gIH1cbiAgLyoqXG4gICAqIEBwYXJhbSB7Kn0gYXJnIGlnbm9yZWRcbiAgICogQHBhcmFtIHsqfSBjdHggQ29udmVyc2lvbiBjb250ZXh0LCBvcmlnaW5hbGx5IHNldCBpbiBEb2N1bWVudCN0b0pTT04oKVxuICAgKiBAcGFyYW0ge0NsYXNzfSBUeXBlIElmIHNldCwgZm9yY2VzIHRoZSByZXR1cm5lZCBjb2xsZWN0aW9uIHR5cGVcbiAgICogQHJldHVybnMgeyp9IEluc3RhbmNlIG9mIFR5cGUsIE1hcCwgb3IgT2JqZWN0XG4gICAqL1xuXG5cbiAgdG9KU09OKF8sIGN0eCwgVHlwZSkge1xuICAgIGNvbnN0IG1hcCA9IFR5cGUgPyBuZXcgVHlwZSgpIDogY3R4ICYmIGN0eC5tYXBBc01hcCA/IG5ldyBNYXAoKSA6IHt9O1xuICAgIGlmIChjdHggJiYgY3R4Lm9uQ3JlYXRlKSBjdHgub25DcmVhdGUobWFwKTtcblxuICAgIGZvciAoY29uc3QgaXRlbSBvZiB0aGlzLml0ZW1zKSBpdGVtLmFkZFRvSlNNYXAoY3R4LCBtYXApO1xuXG4gICAgcmV0dXJuIG1hcDtcbiAgfVxuXG4gIHRvU3RyaW5nKGN0eCwgb25Db21tZW50LCBvbkNob21wS2VlcCkge1xuICAgIGlmICghY3R4KSByZXR1cm4gSlNPTi5zdHJpbmdpZnkodGhpcyk7XG5cbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgdGhpcy5pdGVtcykge1xuICAgICAgaWYgKCEoaXRlbSBpbnN0YW5jZW9mIFBhaXIpKSB0aHJvdyBuZXcgRXJyb3IoYE1hcCBpdGVtcyBtdXN0IGFsbCBiZSBwYWlyczsgZm91bmQgJHtKU09OLnN0cmluZ2lmeShpdGVtKX0gaW5zdGVhZGApO1xuICAgIH1cblxuICAgIHJldHVybiBzdXBlci50b1N0cmluZyhjdHgsIHtcbiAgICAgIGJsb2NrSXRlbTogbiA9PiBuLnN0cixcbiAgICAgIGZsb3dDaGFyczoge1xuICAgICAgICBzdGFydDogJ3snLFxuICAgICAgICBlbmQ6ICd9J1xuICAgICAgfSxcbiAgICAgIGlzTWFwOiB0cnVlLFxuICAgICAgaXRlbUluZGVudDogY3R4LmluZGVudCB8fCAnJ1xuICAgIH0sIG9uQ29tbWVudCwgb25DaG9tcEtlZXApO1xuICB9XG5cbn1cblxuY29uc3QgTUVSR0VfS0VZID0gJzw8JztcbmNsYXNzIE1lcmdlIGV4dGVuZHMgUGFpciB7XG4gIGNvbnN0cnVjdG9yKHBhaXIpIHtcbiAgICBpZiAocGFpciBpbnN0YW5jZW9mIFBhaXIpIHtcbiAgICAgIGxldCBzZXEgPSBwYWlyLnZhbHVlO1xuXG4gICAgICBpZiAoIShzZXEgaW5zdGFuY2VvZiBZQU1MU2VxKSkge1xuICAgICAgICBzZXEgPSBuZXcgWUFNTFNlcSgpO1xuICAgICAgICBzZXEuaXRlbXMucHVzaChwYWlyLnZhbHVlKTtcbiAgICAgICAgc2VxLnJhbmdlID0gcGFpci52YWx1ZS5yYW5nZTtcbiAgICAgIH1cblxuICAgICAgc3VwZXIocGFpci5rZXksIHNlcSk7XG4gICAgICB0aGlzLnJhbmdlID0gcGFpci5yYW5nZTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3VwZXIobmV3IFNjYWxhcihNRVJHRV9LRVkpLCBuZXcgWUFNTFNlcSgpKTtcbiAgICB9XG5cbiAgICB0aGlzLnR5cGUgPSBQYWlyLlR5cGUuTUVSR0VfUEFJUjtcbiAgfSAvLyBJZiB0aGUgdmFsdWUgYXNzb2NpYXRlZCB3aXRoIGEgbWVyZ2Uga2V5IGlzIGEgc2luZ2xlIG1hcHBpbmcgbm9kZSwgZWFjaCBvZlxuICAvLyBpdHMga2V5L3ZhbHVlIHBhaXJzIGlzIGluc2VydGVkIGludG8gdGhlIGN1cnJlbnQgbWFwcGluZywgdW5sZXNzIHRoZSBrZXlcbiAgLy8gYWxyZWFkeSBleGlzdHMgaW4gaXQuIElmIHRoZSB2YWx1ZSBhc3NvY2lhdGVkIHdpdGggdGhlIG1lcmdlIGtleSBpcyBhXG4gIC8vIHNlcXVlbmNlLCB0aGVuIHRoaXMgc2VxdWVuY2UgaXMgZXhwZWN0ZWQgdG8gY29udGFpbiBtYXBwaW5nIG5vZGVzIGFuZCBlYWNoXG4gIC8vIG9mIHRoZXNlIG5vZGVzIGlzIG1lcmdlZCBpbiB0dXJuIGFjY29yZGluZyB0byBpdHMgb3JkZXIgaW4gdGhlIHNlcXVlbmNlLlxuICAvLyBLZXlzIGluIG1hcHBpbmcgbm9kZXMgZWFybGllciBpbiB0aGUgc2VxdWVuY2Ugb3ZlcnJpZGUga2V5cyBzcGVjaWZpZWQgaW5cbiAgLy8gbGF0ZXIgbWFwcGluZyBub2Rlcy4gLS0gaHR0cDovL3lhbWwub3JnL3R5cGUvbWVyZ2UuaHRtbFxuXG5cbiAgYWRkVG9KU01hcChjdHgsIG1hcCkge1xuICAgIGZvciAoY29uc3Qge1xuICAgICAgc291cmNlXG4gICAgfSBvZiB0aGlzLnZhbHVlLml0ZW1zKSB7XG4gICAgICBpZiAoIShzb3VyY2UgaW5zdGFuY2VvZiBZQU1MTWFwKSkgdGhyb3cgbmV3IEVycm9yKCdNZXJnZSBzb3VyY2VzIG11c3QgYmUgbWFwcycpO1xuICAgICAgY29uc3Qgc3JjTWFwID0gc291cmNlLnRvSlNPTihudWxsLCBjdHgsIE1hcCk7XG5cbiAgICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIHNyY01hcCkge1xuICAgICAgICBpZiAobWFwIGluc3RhbmNlb2YgTWFwKSB7XG4gICAgICAgICAgaWYgKCFtYXAuaGFzKGtleSkpIG1hcC5zZXQoa2V5LCB2YWx1ZSk7XG4gICAgICAgIH0gZWxzZSBpZiAobWFwIGluc3RhbmNlb2YgU2V0KSB7XG4gICAgICAgICAgbWFwLmFkZChrZXkpO1xuICAgICAgICB9IGVsc2UgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobWFwLCBrZXkpKSB7XG4gICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG1hcCwga2V5LCB7XG4gICAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG1hcDtcbiAgfVxuXG4gIHRvU3RyaW5nKGN0eCwgb25Db21tZW50KSB7XG4gICAgY29uc3Qgc2VxID0gdGhpcy52YWx1ZTtcbiAgICBpZiAoc2VxLml0ZW1zLmxlbmd0aCA+IDEpIHJldHVybiBzdXBlci50b1N0cmluZyhjdHgsIG9uQ29tbWVudCk7XG4gICAgdGhpcy52YWx1ZSA9IHNlcS5pdGVtc1swXTtcbiAgICBjb25zdCBzdHIgPSBzdXBlci50b1N0cmluZyhjdHgsIG9uQ29tbWVudCk7XG4gICAgdGhpcy52YWx1ZSA9IHNlcTtcbiAgICByZXR1cm4gc3RyO1xuICB9XG5cbn1cblxuY29uc3QgYmluYXJ5T3B0aW9ucyA9IHtcbiAgZGVmYXVsdFR5cGU6IFBsYWluVmFsdWUuVHlwZS5CTE9DS19MSVRFUkFMLFxuICBsaW5lV2lkdGg6IDc2XG59O1xuY29uc3QgYm9vbE9wdGlvbnMgPSB7XG4gIHRydWVTdHI6ICd0cnVlJyxcbiAgZmFsc2VTdHI6ICdmYWxzZSdcbn07XG5jb25zdCBpbnRPcHRpb25zID0ge1xuICBhc0JpZ0ludDogZmFsc2Vcbn07XG5jb25zdCBudWxsT3B0aW9ucyA9IHtcbiAgbnVsbFN0cjogJ251bGwnXG59O1xuY29uc3Qgc3RyT3B0aW9ucyA9IHtcbiAgZGVmYXVsdFR5cGU6IFBsYWluVmFsdWUuVHlwZS5QTEFJTixcbiAgZG91YmxlUXVvdGVkOiB7XG4gICAganNvbkVuY29kaW5nOiBmYWxzZSxcbiAgICBtaW5NdWx0aUxpbmVMZW5ndGg6IDQwXG4gIH0sXG4gIGZvbGQ6IHtcbiAgICBsaW5lV2lkdGg6IDgwLFxuICAgIG1pbkNvbnRlbnRXaWR0aDogMjBcbiAgfVxufTtcblxuZnVuY3Rpb24gcmVzb2x2ZVNjYWxhcihzdHIsIHRhZ3MsIHNjYWxhckZhbGxiYWNrKSB7XG4gIGZvciAoY29uc3Qge1xuICAgIGZvcm1hdCxcbiAgICB0ZXN0LFxuICAgIHJlc29sdmVcbiAgfSBvZiB0YWdzKSB7XG4gICAgaWYgKHRlc3QpIHtcbiAgICAgIGNvbnN0IG1hdGNoID0gc3RyLm1hdGNoKHRlc3QpO1xuXG4gICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgbGV0IHJlcyA9IHJlc29sdmUuYXBwbHkobnVsbCwgbWF0Y2gpO1xuICAgICAgICBpZiAoIShyZXMgaW5zdGFuY2VvZiBTY2FsYXIpKSByZXMgPSBuZXcgU2NhbGFyKHJlcyk7XG4gICAgICAgIGlmIChmb3JtYXQpIHJlcy5mb3JtYXQgPSBmb3JtYXQ7XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKHNjYWxhckZhbGxiYWNrKSBzdHIgPSBzY2FsYXJGYWxsYmFjayhzdHIpO1xuICByZXR1cm4gbmV3IFNjYWxhcihzdHIpO1xufVxuXG5jb25zdCBGT0xEX0ZMT1cgPSAnZmxvdyc7XG5jb25zdCBGT0xEX0JMT0NLID0gJ2Jsb2NrJztcbmNvbnN0IEZPTERfUVVPVEVEID0gJ3F1b3RlZCc7IC8vIHByZXN1bWVzIGkrMSBpcyBhdCB0aGUgc3RhcnQgb2YgYSBsaW5lXG4vLyByZXR1cm5zIGluZGV4IG9mIGxhc3QgbmV3bGluZSBpbiBtb3JlLWluZGVudGVkIGJsb2NrXG5cbmNvbnN0IGNvbnN1bWVNb3JlSW5kZW50ZWRMaW5lcyA9ICh0ZXh0LCBpKSA9PiB7XG4gIGxldCBjaCA9IHRleHRbaSArIDFdO1xuXG4gIHdoaWxlIChjaCA9PT0gJyAnIHx8IGNoID09PSAnXFx0Jykge1xuICAgIGRvIHtcbiAgICAgIGNoID0gdGV4dFtpICs9IDFdO1xuICAgIH0gd2hpbGUgKGNoICYmIGNoICE9PSAnXFxuJyk7XG5cbiAgICBjaCA9IHRleHRbaSArIDFdO1xuICB9XG5cbiAgcmV0dXJuIGk7XG59O1xuLyoqXG4gKiBUcmllcyB0byBrZWVwIGlucHV0IGF0IHVwIHRvIGBsaW5lV2lkdGhgIGNoYXJhY3RlcnMsIHNwbGl0dGluZyBvbmx5IG9uIHNwYWNlc1xuICogbm90IGZvbGxvd2VkIGJ5IG5ld2xpbmVzIG9yIHNwYWNlcyB1bmxlc3MgYG1vZGVgIGlzIGAncXVvdGVkJ2AuIExpbmVzIGFyZVxuICogdGVybWluYXRlZCB3aXRoIGBcXG5gIGFuZCBzdGFydGVkIHdpdGggYGluZGVudGAuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHRleHRcbiAqIEBwYXJhbSB7c3RyaW5nfSBpbmRlbnRcbiAqIEBwYXJhbSB7c3RyaW5nfSBbbW9kZT0nZmxvdyddIGAnYmxvY2snYCBwcmV2ZW50cyBtb3JlLWluZGVudGVkIGxpbmVzXG4gKiAgIGZyb20gYmVpbmcgZm9sZGVkOyBgJ3F1b3RlZCdgIGFsbG93cyBmb3IgYFxcYCBlc2NhcGVzLCBpbmNsdWRpbmcgZXNjYXBlZFxuICogICBuZXdsaW5lc1xuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5pbmRlbnRBdFN0YXJ0XSBBY2NvdW50cyBmb3IgbGVhZGluZyBjb250ZW50cyBvblxuICogICB0aGUgZmlyc3QgbGluZSwgZGVmYXVsdGluZyB0byBgaW5kZW50Lmxlbmd0aGBcbiAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5saW5lV2lkdGg9ODBdXG4gKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMubWluQ29udGVudFdpZHRoPTIwXSBBbGxvdyBoaWdobHkgaW5kZW50ZWQgbGluZXMgdG9cbiAqICAgc3RyZXRjaCB0aGUgbGluZSB3aWR0aCBvciBpbmRlbnQgY29udGVudCBmcm9tIHRoZSBzdGFydFxuICogQHBhcmFtIHtmdW5jdGlvbn0gb3B0aW9ucy5vbkZvbGQgQ2FsbGVkIG9uY2UgaWYgdGhlIHRleHQgaXMgZm9sZGVkXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBvcHRpb25zLm9uRm9sZCBDYWxsZWQgb25jZSBpZiBhbnkgbGluZSBvZiB0ZXh0IGV4Y2VlZHNcbiAqICAgbGluZVdpZHRoIGNoYXJhY3RlcnNcbiAqL1xuXG5cbmZ1bmN0aW9uIGZvbGRGbG93TGluZXModGV4dCwgaW5kZW50LCBtb2RlLCB7XG4gIGluZGVudEF0U3RhcnQsXG4gIGxpbmVXaWR0aCA9IDgwLFxuICBtaW5Db250ZW50V2lkdGggPSAyMCxcbiAgb25Gb2xkLFxuICBvbk92ZXJmbG93XG59KSB7XG4gIGlmICghbGluZVdpZHRoIHx8IGxpbmVXaWR0aCA8IDApIHJldHVybiB0ZXh0O1xuICBjb25zdCBlbmRTdGVwID0gTWF0aC5tYXgoMSArIG1pbkNvbnRlbnRXaWR0aCwgMSArIGxpbmVXaWR0aCAtIGluZGVudC5sZW5ndGgpO1xuICBpZiAodGV4dC5sZW5ndGggPD0gZW5kU3RlcCkgcmV0dXJuIHRleHQ7XG4gIGNvbnN0IGZvbGRzID0gW107XG4gIGNvbnN0IGVzY2FwZWRGb2xkcyA9IHt9O1xuICBsZXQgZW5kID0gbGluZVdpZHRoIC0gaW5kZW50Lmxlbmd0aDtcblxuICBpZiAodHlwZW9mIGluZGVudEF0U3RhcnQgPT09ICdudW1iZXInKSB7XG4gICAgaWYgKGluZGVudEF0U3RhcnQgPiBsaW5lV2lkdGggLSBNYXRoLm1heCgyLCBtaW5Db250ZW50V2lkdGgpKSBmb2xkcy5wdXNoKDApO2Vsc2UgZW5kID0gbGluZVdpZHRoIC0gaW5kZW50QXRTdGFydDtcbiAgfVxuXG4gIGxldCBzcGxpdCA9IHVuZGVmaW5lZDtcbiAgbGV0IHByZXYgPSB1bmRlZmluZWQ7XG4gIGxldCBvdmVyZmxvdyA9IGZhbHNlO1xuICBsZXQgaSA9IC0xO1xuICBsZXQgZXNjU3RhcnQgPSAtMTtcbiAgbGV0IGVzY0VuZCA9IC0xO1xuXG4gIGlmIChtb2RlID09PSBGT0xEX0JMT0NLKSB7XG4gICAgaSA9IGNvbnN1bWVNb3JlSW5kZW50ZWRMaW5lcyh0ZXh0LCBpKTtcbiAgICBpZiAoaSAhPT0gLTEpIGVuZCA9IGkgKyBlbmRTdGVwO1xuICB9XG5cbiAgZm9yIChsZXQgY2g7IGNoID0gdGV4dFtpICs9IDFdOykge1xuICAgIGlmIChtb2RlID09PSBGT0xEX1FVT1RFRCAmJiBjaCA9PT0gJ1xcXFwnKSB7XG4gICAgICBlc2NTdGFydCA9IGk7XG5cbiAgICAgIHN3aXRjaCAodGV4dFtpICsgMV0pIHtcbiAgICAgICAgY2FzZSAneCc6XG4gICAgICAgICAgaSArPSAzO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ3UnOlxuICAgICAgICAgIGkgKz0gNTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdVJzpcbiAgICAgICAgICBpICs9IDk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBpICs9IDE7XG4gICAgICB9XG5cbiAgICAgIGVzY0VuZCA9IGk7XG4gICAgfVxuXG4gICAgaWYgKGNoID09PSAnXFxuJykge1xuICAgICAgaWYgKG1vZGUgPT09IEZPTERfQkxPQ0spIGkgPSBjb25zdW1lTW9yZUluZGVudGVkTGluZXModGV4dCwgaSk7XG4gICAgICBlbmQgPSBpICsgZW5kU3RlcDtcbiAgICAgIHNwbGl0ID0gdW5kZWZpbmVkO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoY2ggPT09ICcgJyAmJiBwcmV2ICYmIHByZXYgIT09ICcgJyAmJiBwcmV2ICE9PSAnXFxuJyAmJiBwcmV2ICE9PSAnXFx0Jykge1xuICAgICAgICAvLyBzcGFjZSBzdXJyb3VuZGVkIGJ5IG5vbi1zcGFjZSBjYW4gYmUgcmVwbGFjZWQgd2l0aCBuZXdsaW5lICsgaW5kZW50XG4gICAgICAgIGNvbnN0IG5leHQgPSB0ZXh0W2kgKyAxXTtcbiAgICAgICAgaWYgKG5leHQgJiYgbmV4dCAhPT0gJyAnICYmIG5leHQgIT09ICdcXG4nICYmIG5leHQgIT09ICdcXHQnKSBzcGxpdCA9IGk7XG4gICAgICB9XG5cbiAgICAgIGlmIChpID49IGVuZCkge1xuICAgICAgICBpZiAoc3BsaXQpIHtcbiAgICAgICAgICBmb2xkcy5wdXNoKHNwbGl0KTtcbiAgICAgICAgICBlbmQgPSBzcGxpdCArIGVuZFN0ZXA7XG4gICAgICAgICAgc3BsaXQgPSB1bmRlZmluZWQ7XG4gICAgICAgIH0gZWxzZSBpZiAobW9kZSA9PT0gRk9MRF9RVU9URUQpIHtcbiAgICAgICAgICAvLyB3aGl0ZS1zcGFjZSBjb2xsZWN0ZWQgYXQgZW5kIG1heSBzdHJldGNoIHBhc3QgbGluZVdpZHRoXG4gICAgICAgICAgd2hpbGUgKHByZXYgPT09ICcgJyB8fCBwcmV2ID09PSAnXFx0Jykge1xuICAgICAgICAgICAgcHJldiA9IGNoO1xuICAgICAgICAgICAgY2ggPSB0ZXh0W2kgKz0gMV07XG4gICAgICAgICAgICBvdmVyZmxvdyA9IHRydWU7XG4gICAgICAgICAgfSAvLyBBY2NvdW50IGZvciBuZXdsaW5lIGVzY2FwZSwgYnV0IGRvbid0IGJyZWFrIHByZWNlZGluZyBlc2NhcGVcblxuXG4gICAgICAgICAgY29uc3QgaiA9IGkgPiBlc2NFbmQgKyAxID8gaSAtIDIgOiBlc2NTdGFydCAtIDE7IC8vIEJhaWwgb3V0IGlmIGxpbmVXaWR0aCAmIG1pbkNvbnRlbnRXaWR0aCBhcmUgc2hvcnRlciB0aGFuIGFuIGVzY2FwZSBzdHJpbmdcblxuICAgICAgICAgIGlmIChlc2NhcGVkRm9sZHNbal0pIHJldHVybiB0ZXh0O1xuICAgICAgICAgIGZvbGRzLnB1c2goaik7XG4gICAgICAgICAgZXNjYXBlZEZvbGRzW2pdID0gdHJ1ZTtcbiAgICAgICAgICBlbmQgPSBqICsgZW5kU3RlcDtcbiAgICAgICAgICBzcGxpdCA9IHVuZGVmaW5lZDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvdmVyZmxvdyA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBwcmV2ID0gY2g7XG4gIH1cblxuICBpZiAob3ZlcmZsb3cgJiYgb25PdmVyZmxvdykgb25PdmVyZmxvdygpO1xuICBpZiAoZm9sZHMubGVuZ3RoID09PSAwKSByZXR1cm4gdGV4dDtcbiAgaWYgKG9uRm9sZCkgb25Gb2xkKCk7XG4gIGxldCByZXMgPSB0ZXh0LnNsaWNlKDAsIGZvbGRzWzBdKTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGZvbGRzLmxlbmd0aDsgKytpKSB7XG4gICAgY29uc3QgZm9sZCA9IGZvbGRzW2ldO1xuICAgIGNvbnN0IGVuZCA9IGZvbGRzW2kgKyAxXSB8fCB0ZXh0Lmxlbmd0aDtcbiAgICBpZiAoZm9sZCA9PT0gMCkgcmVzID0gYFxcbiR7aW5kZW50fSR7dGV4dC5zbGljZSgwLCBlbmQpfWA7ZWxzZSB7XG4gICAgICBpZiAobW9kZSA9PT0gRk9MRF9RVU9URUQgJiYgZXNjYXBlZEZvbGRzW2ZvbGRdKSByZXMgKz0gYCR7dGV4dFtmb2xkXX1cXFxcYDtcbiAgICAgIHJlcyArPSBgXFxuJHtpbmRlbnR9JHt0ZXh0LnNsaWNlKGZvbGQgKyAxLCBlbmQpfWA7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlcztcbn1cblxuY29uc3QgZ2V0Rm9sZE9wdGlvbnMgPSAoe1xuICBpbmRlbnRBdFN0YXJ0XG59KSA9PiBpbmRlbnRBdFN0YXJ0ID8gT2JqZWN0LmFzc2lnbih7XG4gIGluZGVudEF0U3RhcnRcbn0sIHN0ck9wdGlvbnMuZm9sZCkgOiBzdHJPcHRpb25zLmZvbGQ7IC8vIEFsc28gY2hlY2tzIGZvciBsaW5lcyBzdGFydGluZyB3aXRoICUsIGFzIHBhcnNpbmcgdGhlIG91dHB1dCBhcyBZQU1MIDEuMSB3aWxsXG4vLyBwcmVzdW1lIHRoYXQncyBzdGFydGluZyBhIG5ldyBkb2N1bWVudC5cblxuXG5jb25zdCBjb250YWluc0RvY3VtZW50TWFya2VyID0gc3RyID0+IC9eKCV8LS0tfFxcLlxcLlxcLikvbS50ZXN0KHN0cik7XG5cbmZ1bmN0aW9uIGxpbmVMZW5ndGhPdmVyTGltaXQoc3RyLCBsaW5lV2lkdGgsIGluZGVudExlbmd0aCkge1xuICBpZiAoIWxpbmVXaWR0aCB8fCBsaW5lV2lkdGggPCAwKSByZXR1cm4gZmFsc2U7XG4gIGNvbnN0IGxpbWl0ID0gbGluZVdpZHRoIC0gaW5kZW50TGVuZ3RoO1xuICBjb25zdCBzdHJMZW4gPSBzdHIubGVuZ3RoO1xuICBpZiAoc3RyTGVuIDw9IGxpbWl0KSByZXR1cm4gZmFsc2U7XG5cbiAgZm9yIChsZXQgaSA9IDAsIHN0YXJ0ID0gMDsgaSA8IHN0ckxlbjsgKytpKSB7XG4gICAgaWYgKHN0cltpXSA9PT0gJ1xcbicpIHtcbiAgICAgIGlmIChpIC0gc3RhcnQgPiBsaW1pdCkgcmV0dXJuIHRydWU7XG4gICAgICBzdGFydCA9IGkgKyAxO1xuICAgICAgaWYgKHN0ckxlbiAtIHN0YXJ0IDw9IGxpbWl0KSByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIGRvdWJsZVF1b3RlZFN0cmluZyh2YWx1ZSwgY3R4KSB7XG4gIGNvbnN0IHtcbiAgICBpbXBsaWNpdEtleVxuICB9ID0gY3R4O1xuICBjb25zdCB7XG4gICAganNvbkVuY29kaW5nLFxuICAgIG1pbk11bHRpTGluZUxlbmd0aFxuICB9ID0gc3RyT3B0aW9ucy5kb3VibGVRdW90ZWQ7XG4gIGNvbnN0IGpzb24gPSBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XG4gIGlmIChqc29uRW5jb2RpbmcpIHJldHVybiBqc29uO1xuICBjb25zdCBpbmRlbnQgPSBjdHguaW5kZW50IHx8IChjb250YWluc0RvY3VtZW50TWFya2VyKHZhbHVlKSA/ICcgICcgOiAnJyk7XG4gIGxldCBzdHIgPSAnJztcbiAgbGV0IHN0YXJ0ID0gMDtcblxuICBmb3IgKGxldCBpID0gMCwgY2ggPSBqc29uW2ldOyBjaDsgY2ggPSBqc29uWysraV0pIHtcbiAgICBpZiAoY2ggPT09ICcgJyAmJiBqc29uW2kgKyAxXSA9PT0gJ1xcXFwnICYmIGpzb25baSArIDJdID09PSAnbicpIHtcbiAgICAgIC8vIHNwYWNlIGJlZm9yZSBuZXdsaW5lIG5lZWRzIHRvIGJlIGVzY2FwZWQgdG8gbm90IGJlIGZvbGRlZFxuICAgICAgc3RyICs9IGpzb24uc2xpY2Uoc3RhcnQsIGkpICsgJ1xcXFwgJztcbiAgICAgIGkgKz0gMTtcbiAgICAgIHN0YXJ0ID0gaTtcbiAgICAgIGNoID0gJ1xcXFwnO1xuICAgIH1cblxuICAgIGlmIChjaCA9PT0gJ1xcXFwnKSBzd2l0Y2ggKGpzb25baSArIDFdKSB7XG4gICAgICBjYXNlICd1JzpcbiAgICAgICAge1xuICAgICAgICAgIHN0ciArPSBqc29uLnNsaWNlKHN0YXJ0LCBpKTtcbiAgICAgICAgICBjb25zdCBjb2RlID0ganNvbi5zdWJzdHIoaSArIDIsIDQpO1xuXG4gICAgICAgICAgc3dpdGNoIChjb2RlKSB7XG4gICAgICAgICAgICBjYXNlICcwMDAwJzpcbiAgICAgICAgICAgICAgc3RyICs9ICdcXFxcMCc7XG4gICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICcwMDA3JzpcbiAgICAgICAgICAgICAgc3RyICs9ICdcXFxcYSc7XG4gICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICcwMDBiJzpcbiAgICAgICAgICAgICAgc3RyICs9ICdcXFxcdic7XG4gICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICcwMDFiJzpcbiAgICAgICAgICAgICAgc3RyICs9ICdcXFxcZSc7XG4gICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICcwMDg1JzpcbiAgICAgICAgICAgICAgc3RyICs9ICdcXFxcTic7XG4gICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICcwMGEwJzpcbiAgICAgICAgICAgICAgc3RyICs9ICdcXFxcXyc7XG4gICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICcyMDI4JzpcbiAgICAgICAgICAgICAgc3RyICs9ICdcXFxcTCc7XG4gICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICcyMDI5JzpcbiAgICAgICAgICAgICAgc3RyICs9ICdcXFxcUCc7XG4gICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICBpZiAoY29kZS5zdWJzdHIoMCwgMikgPT09ICcwMCcpIHN0ciArPSAnXFxcXHgnICsgY29kZS5zdWJzdHIoMik7ZWxzZSBzdHIgKz0ganNvbi5zdWJzdHIoaSwgNik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaSArPSA1O1xuICAgICAgICAgIHN0YXJ0ID0gaSArIDE7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgJ24nOlxuICAgICAgICBpZiAoaW1wbGljaXRLZXkgfHwganNvbltpICsgMl0gPT09ICdcIicgfHwganNvbi5sZW5ndGggPCBtaW5NdWx0aUxpbmVMZW5ndGgpIHtcbiAgICAgICAgICBpICs9IDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gZm9sZGluZyB3aWxsIGVhdCBmaXJzdCBuZXdsaW5lXG4gICAgICAgICAgc3RyICs9IGpzb24uc2xpY2Uoc3RhcnQsIGkpICsgJ1xcblxcbic7XG5cbiAgICAgICAgICB3aGlsZSAoanNvbltpICsgMl0gPT09ICdcXFxcJyAmJiBqc29uW2kgKyAzXSA9PT0gJ24nICYmIGpzb25baSArIDRdICE9PSAnXCInKSB7XG4gICAgICAgICAgICBzdHIgKz0gJ1xcbic7XG4gICAgICAgICAgICBpICs9IDI7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgc3RyICs9IGluZGVudDsgLy8gc3BhY2UgYWZ0ZXIgbmV3bGluZSBuZWVkcyB0byBiZSBlc2NhcGVkIHRvIG5vdCBiZSBmb2xkZWRcblxuICAgICAgICAgIGlmIChqc29uW2kgKyAyXSA9PT0gJyAnKSBzdHIgKz0gJ1xcXFwnO1xuICAgICAgICAgIGkgKz0gMTtcbiAgICAgICAgICBzdGFydCA9IGkgKyAxO1xuICAgICAgICB9XG5cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGkgKz0gMTtcbiAgICB9XG4gIH1cblxuICBzdHIgPSBzdGFydCA/IHN0ciArIGpzb24uc2xpY2Uoc3RhcnQpIDoganNvbjtcbiAgcmV0dXJuIGltcGxpY2l0S2V5ID8gc3RyIDogZm9sZEZsb3dMaW5lcyhzdHIsIGluZGVudCwgRk9MRF9RVU9URUQsIGdldEZvbGRPcHRpb25zKGN0eCkpO1xufVxuXG5mdW5jdGlvbiBzaW5nbGVRdW90ZWRTdHJpbmcodmFsdWUsIGN0eCkge1xuICBpZiAoY3R4LmltcGxpY2l0S2V5KSB7XG4gICAgaWYgKC9cXG4vLnRlc3QodmFsdWUpKSByZXR1cm4gZG91YmxlUXVvdGVkU3RyaW5nKHZhbHVlLCBjdHgpO1xuICB9IGVsc2Uge1xuICAgIC8vIHNpbmdsZSBxdW90ZWQgc3RyaW5nIGNhbid0IGhhdmUgbGVhZGluZyBvciB0cmFpbGluZyB3aGl0ZXNwYWNlIGFyb3VuZCBuZXdsaW5lXG4gICAgaWYgKC9bIFxcdF1cXG58XFxuWyBcXHRdLy50ZXN0KHZhbHVlKSkgcmV0dXJuIGRvdWJsZVF1b3RlZFN0cmluZyh2YWx1ZSwgY3R4KTtcbiAgfVxuXG4gIGNvbnN0IGluZGVudCA9IGN0eC5pbmRlbnQgfHwgKGNvbnRhaW5zRG9jdW1lbnRNYXJrZXIodmFsdWUpID8gJyAgJyA6ICcnKTtcbiAgY29uc3QgcmVzID0gXCInXCIgKyB2YWx1ZS5yZXBsYWNlKC8nL2csIFwiJydcIikucmVwbGFjZSgvXFxuKy9nLCBgJCZcXG4ke2luZGVudH1gKSArIFwiJ1wiO1xuICByZXR1cm4gY3R4LmltcGxpY2l0S2V5ID8gcmVzIDogZm9sZEZsb3dMaW5lcyhyZXMsIGluZGVudCwgRk9MRF9GTE9XLCBnZXRGb2xkT3B0aW9ucyhjdHgpKTtcbn1cblxuZnVuY3Rpb24gYmxvY2tTdHJpbmcoe1xuICBjb21tZW50LFxuICB0eXBlLFxuICB2YWx1ZVxufSwgY3R4LCBvbkNvbW1lbnQsIG9uQ2hvbXBLZWVwKSB7XG4gIC8vIDEuIEJsb2NrIGNhbid0IGVuZCBpbiB3aGl0ZXNwYWNlIHVubGVzcyB0aGUgbGFzdCBsaW5lIGlzIG5vbi1lbXB0eS5cbiAgLy8gMi4gU3RyaW5ncyBjb25zaXN0aW5nIG9mIG9ubHkgd2hpdGVzcGFjZSBhcmUgYmVzdCByZW5kZXJlZCBleHBsaWNpdGx5LlxuICBpZiAoL1xcbltcXHQgXSskLy50ZXN0KHZhbHVlKSB8fCAvXlxccyokLy50ZXN0KHZhbHVlKSkge1xuICAgIHJldHVybiBkb3VibGVRdW90ZWRTdHJpbmcodmFsdWUsIGN0eCk7XG4gIH1cblxuICBjb25zdCBpbmRlbnQgPSBjdHguaW5kZW50IHx8IChjdHguZm9yY2VCbG9ja0luZGVudCB8fCBjb250YWluc0RvY3VtZW50TWFya2VyKHZhbHVlKSA/ICcgICcgOiAnJyk7XG4gIGNvbnN0IGluZGVudFNpemUgPSBpbmRlbnQgPyAnMicgOiAnMSc7IC8vIHJvb3QgaXMgYXQgLTFcblxuICBjb25zdCBsaXRlcmFsID0gdHlwZSA9PT0gUGxhaW5WYWx1ZS5UeXBlLkJMT0NLX0ZPTERFRCA/IGZhbHNlIDogdHlwZSA9PT0gUGxhaW5WYWx1ZS5UeXBlLkJMT0NLX0xJVEVSQUwgPyB0cnVlIDogIWxpbmVMZW5ndGhPdmVyTGltaXQodmFsdWUsIHN0ck9wdGlvbnMuZm9sZC5saW5lV2lkdGgsIGluZGVudC5sZW5ndGgpO1xuICBsZXQgaGVhZGVyID0gbGl0ZXJhbCA/ICd8JyA6ICc+JztcbiAgaWYgKCF2YWx1ZSkgcmV0dXJuIGhlYWRlciArICdcXG4nO1xuICBsZXQgd3NTdGFydCA9ICcnO1xuICBsZXQgd3NFbmQgPSAnJztcbiAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC9bXFxuXFx0IF0qJC8sIHdzID0+IHtcbiAgICBjb25zdCBuID0gd3MuaW5kZXhPZignXFxuJyk7XG5cbiAgICBpZiAobiA9PT0gLTEpIHtcbiAgICAgIGhlYWRlciArPSAnLSc7IC8vIHN0cmlwXG4gICAgfSBlbHNlIGlmICh2YWx1ZSA9PT0gd3MgfHwgbiAhPT0gd3MubGVuZ3RoIC0gMSkge1xuICAgICAgaGVhZGVyICs9ICcrJzsgLy8ga2VlcFxuXG4gICAgICBpZiAob25DaG9tcEtlZXApIG9uQ2hvbXBLZWVwKCk7XG4gICAgfVxuXG4gICAgd3NFbmQgPSB3cy5yZXBsYWNlKC9cXG4kLywgJycpO1xuICAgIHJldHVybiAnJztcbiAgfSkucmVwbGFjZSgvXltcXG4gXSovLCB3cyA9PiB7XG4gICAgaWYgKHdzLmluZGV4T2YoJyAnKSAhPT0gLTEpIGhlYWRlciArPSBpbmRlbnRTaXplO1xuICAgIGNvbnN0IG0gPSB3cy5tYXRjaCgvICskLyk7XG5cbiAgICBpZiAobSkge1xuICAgICAgd3NTdGFydCA9IHdzLnNsaWNlKDAsIC1tWzBdLmxlbmd0aCk7XG4gICAgICByZXR1cm4gbVswXTtcbiAgICB9IGVsc2Uge1xuICAgICAgd3NTdGFydCA9IHdzO1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgfSk7XG4gIGlmICh3c0VuZCkgd3NFbmQgPSB3c0VuZC5yZXBsYWNlKC9cXG4rKD8hXFxufCQpL2csIGAkJiR7aW5kZW50fWApO1xuICBpZiAod3NTdGFydCkgd3NTdGFydCA9IHdzU3RhcnQucmVwbGFjZSgvXFxuKy9nLCBgJCYke2luZGVudH1gKTtcblxuICBpZiAoY29tbWVudCkge1xuICAgIGhlYWRlciArPSAnICMnICsgY29tbWVudC5yZXBsYWNlKC8gP1tcXHJcXG5dKy9nLCAnICcpO1xuICAgIGlmIChvbkNvbW1lbnQpIG9uQ29tbWVudCgpO1xuICB9XG5cbiAgaWYgKCF2YWx1ZSkgcmV0dXJuIGAke2hlYWRlcn0ke2luZGVudFNpemV9XFxuJHtpbmRlbnR9JHt3c0VuZH1gO1xuXG4gIGlmIChsaXRlcmFsKSB7XG4gICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC9cXG4rL2csIGAkJiR7aW5kZW50fWApO1xuICAgIHJldHVybiBgJHtoZWFkZXJ9XFxuJHtpbmRlbnR9JHt3c1N0YXJ0fSR7dmFsdWV9JHt3c0VuZH1gO1xuICB9XG5cbiAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC9cXG4rL2csICdcXG4kJicpLnJlcGxhY2UoLyg/Ol58XFxuKShbXFx0IF0uKikoPzooW1xcblxcdCBdKilcXG4oPyFbXFxuXFx0IF0pKT8vZywgJyQxJDInKSAvLyBtb3JlLWluZGVudGVkIGxpbmVzIGFyZW4ndCBmb2xkZWRcbiAgLy8gICAgICAgICBeIGluZC5saW5lICBeIGVtcHR5ICAgICBeIGNhcHR1cmUgbmV4dCBlbXB0eSBsaW5lcyBvbmx5IGF0IGVuZCBvZiBpbmRlbnRcbiAgLnJlcGxhY2UoL1xcbisvZywgYCQmJHtpbmRlbnR9YCk7XG4gIGNvbnN0IGJvZHkgPSBmb2xkRmxvd0xpbmVzKGAke3dzU3RhcnR9JHt2YWx1ZX0ke3dzRW5kfWAsIGluZGVudCwgRk9MRF9CTE9DSywgc3RyT3B0aW9ucy5mb2xkKTtcbiAgcmV0dXJuIGAke2hlYWRlcn1cXG4ke2luZGVudH0ke2JvZHl9YDtcbn1cblxuZnVuY3Rpb24gcGxhaW5TdHJpbmcoaXRlbSwgY3R4LCBvbkNvbW1lbnQsIG9uQ2hvbXBLZWVwKSB7XG4gIGNvbnN0IHtcbiAgICBjb21tZW50LFxuICAgIHR5cGUsXG4gICAgdmFsdWVcbiAgfSA9IGl0ZW07XG4gIGNvbnN0IHtcbiAgICBhY3R1YWxTdHJpbmcsXG4gICAgaW1wbGljaXRLZXksXG4gICAgaW5kZW50LFxuICAgIGluRmxvd1xuICB9ID0gY3R4O1xuXG4gIGlmIChpbXBsaWNpdEtleSAmJiAvW1xcbltcXF17fSxdLy50ZXN0KHZhbHVlKSB8fCBpbkZsb3cgJiYgL1tbXFxde30sXS8udGVzdCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gZG91YmxlUXVvdGVkU3RyaW5nKHZhbHVlLCBjdHgpO1xuICB9XG5cbiAgaWYgKCF2YWx1ZSB8fCAvXltcXG5cXHQgLFtcXF17fSMmKiF8PidcIiVAYF18Xls/LV0kfF5bPy1dWyBcXHRdfFtcXG46XVsgXFx0XXxbIFxcdF1cXG58W1xcblxcdCBdI3xbXFxuXFx0IDpdJC8udGVzdCh2YWx1ZSkpIHtcbiAgICAvLyBub3QgYWxsb3dlZDpcbiAgICAvLyAtIGVtcHR5IHN0cmluZywgJy0nIG9yICc/J1xuICAgIC8vIC0gc3RhcnQgd2l0aCBhbiBpbmRpY2F0b3IgY2hhcmFjdGVyIChleGNlcHQgWz86LV0pIG9yIC9bPy1dIC9cbiAgICAvLyAtICdcXG4gJywgJzogJyBvciAnIFxcbicgYW55d2hlcmVcbiAgICAvLyAtICcjJyBub3QgcHJlY2VkZWQgYnkgYSBub24tc3BhY2UgY2hhclxuICAgIC8vIC0gZW5kIHdpdGggJyAnIG9yICc6J1xuICAgIHJldHVybiBpbXBsaWNpdEtleSB8fCBpbkZsb3cgfHwgdmFsdWUuaW5kZXhPZignXFxuJykgPT09IC0xID8gdmFsdWUuaW5kZXhPZignXCInKSAhPT0gLTEgJiYgdmFsdWUuaW5kZXhPZihcIidcIikgPT09IC0xID8gc2luZ2xlUXVvdGVkU3RyaW5nKHZhbHVlLCBjdHgpIDogZG91YmxlUXVvdGVkU3RyaW5nKHZhbHVlLCBjdHgpIDogYmxvY2tTdHJpbmcoaXRlbSwgY3R4LCBvbkNvbW1lbnQsIG9uQ2hvbXBLZWVwKTtcbiAgfVxuXG4gIGlmICghaW1wbGljaXRLZXkgJiYgIWluRmxvdyAmJiB0eXBlICE9PSBQbGFpblZhbHVlLlR5cGUuUExBSU4gJiYgdmFsdWUuaW5kZXhPZignXFxuJykgIT09IC0xKSB7XG4gICAgLy8gV2hlcmUgYWxsb3dlZCAmIHR5cGUgbm90IHNldCBleHBsaWNpdGx5LCBwcmVmZXIgYmxvY2sgc3R5bGUgZm9yIG11bHRpbGluZSBzdHJpbmdzXG4gICAgcmV0dXJuIGJsb2NrU3RyaW5nKGl0ZW0sIGN0eCwgb25Db21tZW50LCBvbkNob21wS2VlcCk7XG4gIH1cblxuICBpZiAoaW5kZW50ID09PSAnJyAmJiBjb250YWluc0RvY3VtZW50TWFya2VyKHZhbHVlKSkge1xuICAgIGN0eC5mb3JjZUJsb2NrSW5kZW50ID0gdHJ1ZTtcbiAgICByZXR1cm4gYmxvY2tTdHJpbmcoaXRlbSwgY3R4LCBvbkNvbW1lbnQsIG9uQ2hvbXBLZWVwKTtcbiAgfVxuXG4gIGNvbnN0IHN0ciA9IHZhbHVlLnJlcGxhY2UoL1xcbisvZywgYCQmXFxuJHtpbmRlbnR9YCk7IC8vIFZlcmlmeSB0aGF0IG91dHB1dCB3aWxsIGJlIHBhcnNlZCBhcyBhIHN0cmluZywgYXMgZS5nLiBwbGFpbiBudW1iZXJzIGFuZFxuICAvLyBib29sZWFucyBnZXQgcGFyc2VkIHdpdGggdGhvc2UgdHlwZXMgaW4gdjEuMiAoZS5nLiAnNDInLCAndHJ1ZScgJiAnMC45ZS0zJyksXG4gIC8vIGFuZCBvdGhlcnMgaW4gdjEuMS5cblxuICBpZiAoYWN0dWFsU3RyaW5nKSB7XG4gICAgY29uc3Qge1xuICAgICAgdGFnc1xuICAgIH0gPSBjdHguZG9jLnNjaGVtYTtcbiAgICBjb25zdCByZXNvbHZlZCA9IHJlc29sdmVTY2FsYXIoc3RyLCB0YWdzLCB0YWdzLnNjYWxhckZhbGxiYWNrKS52YWx1ZTtcbiAgICBpZiAodHlwZW9mIHJlc29sdmVkICE9PSAnc3RyaW5nJykgcmV0dXJuIGRvdWJsZVF1b3RlZFN0cmluZyh2YWx1ZSwgY3R4KTtcbiAgfVxuXG4gIGNvbnN0IGJvZHkgPSBpbXBsaWNpdEtleSA/IHN0ciA6IGZvbGRGbG93TGluZXMoc3RyLCBpbmRlbnQsIEZPTERfRkxPVywgZ2V0Rm9sZE9wdGlvbnMoY3R4KSk7XG5cbiAgaWYgKGNvbW1lbnQgJiYgIWluRmxvdyAmJiAoYm9keS5pbmRleE9mKCdcXG4nKSAhPT0gLTEgfHwgY29tbWVudC5pbmRleE9mKCdcXG4nKSAhPT0gLTEpKSB7XG4gICAgaWYgKG9uQ29tbWVudCkgb25Db21tZW50KCk7XG4gICAgcmV0dXJuIGFkZENvbW1lbnRCZWZvcmUoYm9keSwgaW5kZW50LCBjb21tZW50KTtcbiAgfVxuXG4gIHJldHVybiBib2R5O1xufVxuXG5mdW5jdGlvbiBzdHJpbmdpZnlTdHJpbmcoaXRlbSwgY3R4LCBvbkNvbW1lbnQsIG9uQ2hvbXBLZWVwKSB7XG4gIGNvbnN0IHtcbiAgICBkZWZhdWx0VHlwZVxuICB9ID0gc3RyT3B0aW9ucztcbiAgY29uc3Qge1xuICAgIGltcGxpY2l0S2V5LFxuICAgIGluRmxvd1xuICB9ID0gY3R4O1xuICBsZXQge1xuICAgIHR5cGUsXG4gICAgdmFsdWVcbiAgfSA9IGl0ZW07XG5cbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3N0cmluZycpIHtcbiAgICB2YWx1ZSA9IFN0cmluZyh2YWx1ZSk7XG4gICAgaXRlbSA9IE9iamVjdC5hc3NpZ24oe30sIGl0ZW0sIHtcbiAgICAgIHZhbHVlXG4gICAgfSk7XG4gIH1cblxuICBjb25zdCBfc3RyaW5naWZ5ID0gX3R5cGUgPT4ge1xuICAgIHN3aXRjaCAoX3R5cGUpIHtcbiAgICAgIGNhc2UgUGxhaW5WYWx1ZS5UeXBlLkJMT0NLX0ZPTERFRDpcbiAgICAgIGNhc2UgUGxhaW5WYWx1ZS5UeXBlLkJMT0NLX0xJVEVSQUw6XG4gICAgICAgIHJldHVybiBibG9ja1N0cmluZyhpdGVtLCBjdHgsIG9uQ29tbWVudCwgb25DaG9tcEtlZXApO1xuXG4gICAgICBjYXNlIFBsYWluVmFsdWUuVHlwZS5RVU9URV9ET1VCTEU6XG4gICAgICAgIHJldHVybiBkb3VibGVRdW90ZWRTdHJpbmcodmFsdWUsIGN0eCk7XG5cbiAgICAgIGNhc2UgUGxhaW5WYWx1ZS5UeXBlLlFVT1RFX1NJTkdMRTpcbiAgICAgICAgcmV0dXJuIHNpbmdsZVF1b3RlZFN0cmluZyh2YWx1ZSwgY3R4KTtcblxuICAgICAgY2FzZSBQbGFpblZhbHVlLlR5cGUuUExBSU46XG4gICAgICAgIHJldHVybiBwbGFpblN0cmluZyhpdGVtLCBjdHgsIG9uQ29tbWVudCwgb25DaG9tcEtlZXApO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH07XG5cbiAgaWYgKHR5cGUgIT09IFBsYWluVmFsdWUuVHlwZS5RVU9URV9ET1VCTEUgJiYgL1tcXHgwMC1cXHgwOFxceDBiLVxceDFmXFx4N2YtXFx4OWZdLy50ZXN0KHZhbHVlKSkge1xuICAgIC8vIGZvcmNlIGRvdWJsZSBxdW90ZXMgb24gY29udHJvbCBjaGFyYWN0ZXJzXG4gICAgdHlwZSA9IFBsYWluVmFsdWUuVHlwZS5RVU9URV9ET1VCTEU7XG4gIH0gZWxzZSBpZiAoKGltcGxpY2l0S2V5IHx8IGluRmxvdykgJiYgKHR5cGUgPT09IFBsYWluVmFsdWUuVHlwZS5CTE9DS19GT0xERUQgfHwgdHlwZSA9PT0gUGxhaW5WYWx1ZS5UeXBlLkJMT0NLX0xJVEVSQUwpKSB7XG4gICAgLy8gc2hvdWxkIG5vdCBoYXBwZW47IGJsb2NrcyBhcmUgbm90IHZhbGlkIGluc2lkZSBmbG93IGNvbnRhaW5lcnNcbiAgICB0eXBlID0gUGxhaW5WYWx1ZS5UeXBlLlFVT1RFX0RPVUJMRTtcbiAgfVxuXG4gIGxldCByZXMgPSBfc3RyaW5naWZ5KHR5cGUpO1xuXG4gIGlmIChyZXMgPT09IG51bGwpIHtcbiAgICByZXMgPSBfc3RyaW5naWZ5KGRlZmF1bHRUeXBlKTtcbiAgICBpZiAocmVzID09PSBudWxsKSB0aHJvdyBuZXcgRXJyb3IoYFVuc3VwcG9ydGVkIGRlZmF1bHQgc3RyaW5nIHR5cGUgJHtkZWZhdWx0VHlwZX1gKTtcbiAgfVxuXG4gIHJldHVybiByZXM7XG59XG5cbmZ1bmN0aW9uIHN0cmluZ2lmeU51bWJlcih7XG4gIGZvcm1hdCxcbiAgbWluRnJhY3Rpb25EaWdpdHMsXG4gIHRhZyxcbiAgdmFsdWVcbn0pIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2JpZ2ludCcpIHJldHVybiBTdHJpbmcodmFsdWUpO1xuICBpZiAoIWlzRmluaXRlKHZhbHVlKSkgcmV0dXJuIGlzTmFOKHZhbHVlKSA/ICcubmFuJyA6IHZhbHVlIDwgMCA/ICctLmluZicgOiAnLmluZic7XG4gIGxldCBuID0gSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xuXG4gIGlmICghZm9ybWF0ICYmIG1pbkZyYWN0aW9uRGlnaXRzICYmICghdGFnIHx8IHRhZyA9PT0gJ3RhZzp5YW1sLm9yZywyMDAyOmZsb2F0JykgJiYgL15cXGQvLnRlc3QobikpIHtcbiAgICBsZXQgaSA9IG4uaW5kZXhPZignLicpO1xuXG4gICAgaWYgKGkgPCAwKSB7XG4gICAgICBpID0gbi5sZW5ndGg7XG4gICAgICBuICs9ICcuJztcbiAgICB9XG5cbiAgICBsZXQgZCA9IG1pbkZyYWN0aW9uRGlnaXRzIC0gKG4ubGVuZ3RoIC0gaSAtIDEpO1xuXG4gICAgd2hpbGUgKGQtLSA+IDApIG4gKz0gJzAnO1xuICB9XG5cbiAgcmV0dXJuIG47XG59XG5cbmZ1bmN0aW9uIGNoZWNrRmxvd0NvbGxlY3Rpb25FbmQoZXJyb3JzLCBjc3QpIHtcbiAgbGV0IGNoYXIsIG5hbWU7XG5cbiAgc3dpdGNoIChjc3QudHlwZSkge1xuICAgIGNhc2UgUGxhaW5WYWx1ZS5UeXBlLkZMT1dfTUFQOlxuICAgICAgY2hhciA9ICd9JztcbiAgICAgIG5hbWUgPSAnZmxvdyBtYXAnO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlIFBsYWluVmFsdWUuVHlwZS5GTE9XX1NFUTpcbiAgICAgIGNoYXIgPSAnXSc7XG4gICAgICBuYW1lID0gJ2Zsb3cgc2VxdWVuY2UnO1xuICAgICAgYnJlYWs7XG5cbiAgICBkZWZhdWx0OlxuICAgICAgZXJyb3JzLnB1c2gobmV3IFBsYWluVmFsdWUuWUFNTFNlbWFudGljRXJyb3IoY3N0LCAnTm90IGEgZmxvdyBjb2xsZWN0aW9uIT8nKSk7XG4gICAgICByZXR1cm47XG4gIH1cblxuICBsZXQgbGFzdEl0ZW07XG5cbiAgZm9yIChsZXQgaSA9IGNzdC5pdGVtcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgIGNvbnN0IGl0ZW0gPSBjc3QuaXRlbXNbaV07XG5cbiAgICBpZiAoIWl0ZW0gfHwgaXRlbS50eXBlICE9PSBQbGFpblZhbHVlLlR5cGUuQ09NTUVOVCkge1xuICAgICAgbGFzdEl0ZW0gPSBpdGVtO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgaWYgKGxhc3RJdGVtICYmIGxhc3RJdGVtLmNoYXIgIT09IGNoYXIpIHtcbiAgICBjb25zdCBtc2cgPSBgRXhwZWN0ZWQgJHtuYW1lfSB0byBlbmQgd2l0aCAke2NoYXJ9YDtcbiAgICBsZXQgZXJyO1xuXG4gICAgaWYgKHR5cGVvZiBsYXN0SXRlbS5vZmZzZXQgPT09ICdudW1iZXInKSB7XG4gICAgICBlcnIgPSBuZXcgUGxhaW5WYWx1ZS5ZQU1MU2VtYW50aWNFcnJvcihjc3QsIG1zZyk7XG4gICAgICBlcnIub2Zmc2V0ID0gbGFzdEl0ZW0ub2Zmc2V0ICsgMTtcbiAgICB9IGVsc2Uge1xuICAgICAgZXJyID0gbmV3IFBsYWluVmFsdWUuWUFNTFNlbWFudGljRXJyb3IobGFzdEl0ZW0sIG1zZyk7XG4gICAgICBpZiAobGFzdEl0ZW0ucmFuZ2UgJiYgbGFzdEl0ZW0ucmFuZ2UuZW5kKSBlcnIub2Zmc2V0ID0gbGFzdEl0ZW0ucmFuZ2UuZW5kIC0gbGFzdEl0ZW0ucmFuZ2Uuc3RhcnQ7XG4gICAgfVxuXG4gICAgZXJyb3JzLnB1c2goZXJyKTtcbiAgfVxufVxuZnVuY3Rpb24gY2hlY2tGbG93Q29tbWVudFNwYWNlKGVycm9ycywgY29tbWVudCkge1xuICBjb25zdCBwcmV2ID0gY29tbWVudC5jb250ZXh0LnNyY1tjb21tZW50LnJhbmdlLnN0YXJ0IC0gMV07XG5cbiAgaWYgKHByZXYgIT09ICdcXG4nICYmIHByZXYgIT09ICdcXHQnICYmIHByZXYgIT09ICcgJykge1xuICAgIGNvbnN0IG1zZyA9ICdDb21tZW50cyBtdXN0IGJlIHNlcGFyYXRlZCBmcm9tIG90aGVyIHRva2VucyBieSB3aGl0ZSBzcGFjZSBjaGFyYWN0ZXJzJztcbiAgICBlcnJvcnMucHVzaChuZXcgUGxhaW5WYWx1ZS5ZQU1MU2VtYW50aWNFcnJvcihjb21tZW50LCBtc2cpKTtcbiAgfVxufVxuZnVuY3Rpb24gZ2V0TG9uZ0tleUVycm9yKHNvdXJjZSwga2V5KSB7XG4gIGNvbnN0IHNrID0gU3RyaW5nKGtleSk7XG4gIGNvbnN0IGsgPSBzay5zdWJzdHIoMCwgOCkgKyAnLi4uJyArIHNrLnN1YnN0cigtOCk7XG4gIHJldHVybiBuZXcgUGxhaW5WYWx1ZS5ZQU1MU2VtYW50aWNFcnJvcihzb3VyY2UsIGBUaGUgXCIke2t9XCIga2V5IGlzIHRvbyBsb25nYCk7XG59XG5mdW5jdGlvbiByZXNvbHZlQ29tbWVudHMoY29sbGVjdGlvbiwgY29tbWVudHMpIHtcbiAgZm9yIChjb25zdCB7XG4gICAgYWZ0ZXJLZXksXG4gICAgYmVmb3JlLFxuICAgIGNvbW1lbnRcbiAgfSBvZiBjb21tZW50cykge1xuICAgIGxldCBpdGVtID0gY29sbGVjdGlvbi5pdGVtc1tiZWZvcmVdO1xuXG4gICAgaWYgKCFpdGVtKSB7XG4gICAgICBpZiAoY29tbWVudCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChjb2xsZWN0aW9uLmNvbW1lbnQpIGNvbGxlY3Rpb24uY29tbWVudCArPSAnXFxuJyArIGNvbW1lbnQ7ZWxzZSBjb2xsZWN0aW9uLmNvbW1lbnQgPSBjb21tZW50O1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoYWZ0ZXJLZXkgJiYgaXRlbS52YWx1ZSkgaXRlbSA9IGl0ZW0udmFsdWU7XG5cbiAgICAgIGlmIChjb21tZW50ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKGFmdGVyS2V5IHx8ICFpdGVtLmNvbW1lbnRCZWZvcmUpIGl0ZW0uc3BhY2VCZWZvcmUgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGl0ZW0uY29tbWVudEJlZm9yZSkgaXRlbS5jb21tZW50QmVmb3JlICs9ICdcXG4nICsgY29tbWVudDtlbHNlIGl0ZW0uY29tbWVudEJlZm9yZSA9IGNvbW1lbnQ7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8vIG9uIGVycm9yLCB3aWxsIHJldHVybiB7IHN0cjogc3RyaW5nLCBlcnJvcnM6IEVycm9yW10gfVxuZnVuY3Rpb24gcmVzb2x2ZVN0cmluZyhkb2MsIG5vZGUpIHtcbiAgY29uc3QgcmVzID0gbm9kZS5zdHJWYWx1ZTtcbiAgaWYgKCFyZXMpIHJldHVybiAnJztcbiAgaWYgKHR5cGVvZiByZXMgPT09ICdzdHJpbmcnKSByZXR1cm4gcmVzO1xuICByZXMuZXJyb3JzLmZvckVhY2goZXJyb3IgPT4ge1xuICAgIGlmICghZXJyb3Iuc291cmNlKSBlcnJvci5zb3VyY2UgPSBub2RlO1xuICAgIGRvYy5lcnJvcnMucHVzaChlcnJvcik7XG4gIH0pO1xuICByZXR1cm4gcmVzLnN0cjtcbn1cblxuZnVuY3Rpb24gcmVzb2x2ZVRhZ0hhbmRsZShkb2MsIG5vZGUpIHtcbiAgY29uc3Qge1xuICAgIGhhbmRsZSxcbiAgICBzdWZmaXhcbiAgfSA9IG5vZGUudGFnO1xuICBsZXQgcHJlZml4ID0gZG9jLnRhZ1ByZWZpeGVzLmZpbmQocCA9PiBwLmhhbmRsZSA9PT0gaGFuZGxlKTtcblxuICBpZiAoIXByZWZpeCkge1xuICAgIGNvbnN0IGR0cCA9IGRvYy5nZXREZWZhdWx0cygpLnRhZ1ByZWZpeGVzO1xuICAgIGlmIChkdHApIHByZWZpeCA9IGR0cC5maW5kKHAgPT4gcC5oYW5kbGUgPT09IGhhbmRsZSk7XG4gICAgaWYgKCFwcmVmaXgpIHRocm93IG5ldyBQbGFpblZhbHVlLllBTUxTZW1hbnRpY0Vycm9yKG5vZGUsIGBUaGUgJHtoYW5kbGV9IHRhZyBoYW5kbGUgaXMgbm9uLWRlZmF1bHQgYW5kIHdhcyBub3QgZGVjbGFyZWQuYCk7XG4gIH1cblxuICBpZiAoIXN1ZmZpeCkgdGhyb3cgbmV3IFBsYWluVmFsdWUuWUFNTFNlbWFudGljRXJyb3Iobm9kZSwgYFRoZSAke2hhbmRsZX0gdGFnIGhhcyBubyBzdWZmaXguYCk7XG5cbiAgaWYgKGhhbmRsZSA9PT0gJyEnICYmIChkb2MudmVyc2lvbiB8fCBkb2Mub3B0aW9ucy52ZXJzaW9uKSA9PT0gJzEuMCcpIHtcbiAgICBpZiAoc3VmZml4WzBdID09PSAnXicpIHtcbiAgICAgIGRvYy53YXJuaW5ncy5wdXNoKG5ldyBQbGFpblZhbHVlLllBTUxXYXJuaW5nKG5vZGUsICdZQU1MIDEuMCBeIHRhZyBleHBhbnNpb24gaXMgbm90IHN1cHBvcnRlZCcpKTtcbiAgICAgIHJldHVybiBzdWZmaXg7XG4gICAgfVxuXG4gICAgaWYgKC9bOi9dLy50ZXN0KHN1ZmZpeCkpIHtcbiAgICAgIC8vIHdvcmQvZm9vIC0+IHRhZzp3b3JkLnlhbWwub3JnLDIwMDI6Zm9vXG4gICAgICBjb25zdCB2b2NhYiA9IHN1ZmZpeC5tYXRjaCgvXihbYS16MC05LV0rKVxcLyguKikvaSk7XG4gICAgICByZXR1cm4gdm9jYWIgPyBgdGFnOiR7dm9jYWJbMV19LnlhbWwub3JnLDIwMDI6JHt2b2NhYlsyXX1gIDogYHRhZzoke3N1ZmZpeH1gO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBwcmVmaXgucHJlZml4ICsgZGVjb2RlVVJJQ29tcG9uZW50KHN1ZmZpeCk7XG59XG5cbmZ1bmN0aW9uIHJlc29sdmVUYWdOYW1lKGRvYywgbm9kZSkge1xuICBjb25zdCB7XG4gICAgdGFnLFxuICAgIHR5cGVcbiAgfSA9IG5vZGU7XG4gIGxldCBub25TcGVjaWZpYyA9IGZhbHNlO1xuXG4gIGlmICh0YWcpIHtcbiAgICBjb25zdCB7XG4gICAgICBoYW5kbGUsXG4gICAgICBzdWZmaXgsXG4gICAgICB2ZXJiYXRpbVxuICAgIH0gPSB0YWc7XG5cbiAgICBpZiAodmVyYmF0aW0pIHtcbiAgICAgIGlmICh2ZXJiYXRpbSAhPT0gJyEnICYmIHZlcmJhdGltICE9PSAnISEnKSByZXR1cm4gdmVyYmF0aW07XG4gICAgICBjb25zdCBtc2cgPSBgVmVyYmF0aW0gdGFncyBhcmVuJ3QgcmVzb2x2ZWQsIHNvICR7dmVyYmF0aW19IGlzIGludmFsaWQuYDtcbiAgICAgIGRvYy5lcnJvcnMucHVzaChuZXcgUGxhaW5WYWx1ZS5ZQU1MU2VtYW50aWNFcnJvcihub2RlLCBtc2cpKTtcbiAgICB9IGVsc2UgaWYgKGhhbmRsZSA9PT0gJyEnICYmICFzdWZmaXgpIHtcbiAgICAgIG5vblNwZWNpZmljID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIHJlc29sdmVUYWdIYW5kbGUoZG9jLCBub2RlKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGRvYy5lcnJvcnMucHVzaChlcnJvcik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSBQbGFpblZhbHVlLlR5cGUuQkxPQ0tfRk9MREVEOlxuICAgIGNhc2UgUGxhaW5WYWx1ZS5UeXBlLkJMT0NLX0xJVEVSQUw6XG4gICAgY2FzZSBQbGFpblZhbHVlLlR5cGUuUVVPVEVfRE9VQkxFOlxuICAgIGNhc2UgUGxhaW5WYWx1ZS5UeXBlLlFVT1RFX1NJTkdMRTpcbiAgICAgIHJldHVybiBQbGFpblZhbHVlLmRlZmF1bHRUYWdzLlNUUjtcblxuICAgIGNhc2UgUGxhaW5WYWx1ZS5UeXBlLkZMT1dfTUFQOlxuICAgIGNhc2UgUGxhaW5WYWx1ZS5UeXBlLk1BUDpcbiAgICAgIHJldHVybiBQbGFpblZhbHVlLmRlZmF1bHRUYWdzLk1BUDtcblxuICAgIGNhc2UgUGxhaW5WYWx1ZS5UeXBlLkZMT1dfU0VROlxuICAgIGNhc2UgUGxhaW5WYWx1ZS5UeXBlLlNFUTpcbiAgICAgIHJldHVybiBQbGFpblZhbHVlLmRlZmF1bHRUYWdzLlNFUTtcblxuICAgIGNhc2UgUGxhaW5WYWx1ZS5UeXBlLlBMQUlOOlxuICAgICAgcmV0dXJuIG5vblNwZWNpZmljID8gUGxhaW5WYWx1ZS5kZWZhdWx0VGFncy5TVFIgOiBudWxsO1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBudWxsO1xuICB9XG59XG5cbmZ1bmN0aW9uIHJlc29sdmVCeVRhZ05hbWUoZG9jLCBub2RlLCB0YWdOYW1lKSB7XG4gIGNvbnN0IHtcbiAgICB0YWdzXG4gIH0gPSBkb2Muc2NoZW1hO1xuICBjb25zdCBtYXRjaFdpdGhUZXN0ID0gW107XG5cbiAgZm9yIChjb25zdCB0YWcgb2YgdGFncykge1xuICAgIGlmICh0YWcudGFnID09PSB0YWdOYW1lKSB7XG4gICAgICBpZiAodGFnLnRlc3QpIG1hdGNoV2l0aFRlc3QucHVzaCh0YWcpO2Vsc2Uge1xuICAgICAgICBjb25zdCByZXMgPSB0YWcucmVzb2x2ZShkb2MsIG5vZGUpO1xuICAgICAgICByZXR1cm4gcmVzIGluc3RhbmNlb2YgQ29sbGVjdGlvbiA/IHJlcyA6IG5ldyBTY2FsYXIocmVzKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjb25zdCBzdHIgPSByZXNvbHZlU3RyaW5nKGRvYywgbm9kZSk7XG4gIGlmICh0eXBlb2Ygc3RyID09PSAnc3RyaW5nJyAmJiBtYXRjaFdpdGhUZXN0Lmxlbmd0aCA+IDApIHJldHVybiByZXNvbHZlU2NhbGFyKHN0ciwgbWF0Y2hXaXRoVGVzdCwgdGFncy5zY2FsYXJGYWxsYmFjayk7XG4gIHJldHVybiBudWxsO1xufVxuXG5mdW5jdGlvbiBnZXRGYWxsYmFja1RhZ05hbWUoe1xuICB0eXBlXG59KSB7XG4gIHN3aXRjaCAodHlwZSkge1xuICAgIGNhc2UgUGxhaW5WYWx1ZS5UeXBlLkZMT1dfTUFQOlxuICAgIGNhc2UgUGxhaW5WYWx1ZS5UeXBlLk1BUDpcbiAgICAgIHJldHVybiBQbGFpblZhbHVlLmRlZmF1bHRUYWdzLk1BUDtcblxuICAgIGNhc2UgUGxhaW5WYWx1ZS5UeXBlLkZMT1dfU0VROlxuICAgIGNhc2UgUGxhaW5WYWx1ZS5UeXBlLlNFUTpcbiAgICAgIHJldHVybiBQbGFpblZhbHVlLmRlZmF1bHRUYWdzLlNFUTtcblxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gUGxhaW5WYWx1ZS5kZWZhdWx0VGFncy5TVFI7XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVzb2x2ZVRhZyhkb2MsIG5vZGUsIHRhZ05hbWUpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCByZXMgPSByZXNvbHZlQnlUYWdOYW1lKGRvYywgbm9kZSwgdGFnTmFtZSk7XG5cbiAgICBpZiAocmVzKSB7XG4gICAgICBpZiAodGFnTmFtZSAmJiBub2RlLnRhZykgcmVzLnRhZyA9IHRhZ05hbWU7XG4gICAgICByZXR1cm4gcmVzO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICBpZiAoIWVycm9yLnNvdXJjZSkgZXJyb3Iuc291cmNlID0gbm9kZTtcbiAgICBkb2MuZXJyb3JzLnB1c2goZXJyb3IpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBmYWxsYmFjayA9IGdldEZhbGxiYWNrVGFnTmFtZShub2RlKTtcbiAgICBpZiAoIWZhbGxiYWNrKSB0aHJvdyBuZXcgRXJyb3IoYFRoZSB0YWcgJHt0YWdOYW1lfSBpcyB1bmF2YWlsYWJsZWApO1xuICAgIGNvbnN0IG1zZyA9IGBUaGUgdGFnICR7dGFnTmFtZX0gaXMgdW5hdmFpbGFibGUsIGZhbGxpbmcgYmFjayB0byAke2ZhbGxiYWNrfWA7XG4gICAgZG9jLndhcm5pbmdzLnB1c2gobmV3IFBsYWluVmFsdWUuWUFNTFdhcm5pbmcobm9kZSwgbXNnKSk7XG4gICAgY29uc3QgcmVzID0gcmVzb2x2ZUJ5VGFnTmFtZShkb2MsIG5vZGUsIGZhbGxiYWNrKTtcbiAgICByZXMudGFnID0gdGFnTmFtZTtcbiAgICByZXR1cm4gcmVzO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnN0IHJlZkVycm9yID0gbmV3IFBsYWluVmFsdWUuWUFNTFJlZmVyZW5jZUVycm9yKG5vZGUsIGVycm9yLm1lc3NhZ2UpO1xuICAgIHJlZkVycm9yLnN0YWNrID0gZXJyb3Iuc3RhY2s7XG4gICAgZG9jLmVycm9ycy5wdXNoKHJlZkVycm9yKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuXG5jb25zdCBpc0NvbGxlY3Rpb25JdGVtID0gbm9kZSA9PiB7XG4gIGlmICghbm9kZSkgcmV0dXJuIGZhbHNlO1xuICBjb25zdCB7XG4gICAgdHlwZVxuICB9ID0gbm9kZTtcbiAgcmV0dXJuIHR5cGUgPT09IFBsYWluVmFsdWUuVHlwZS5NQVBfS0VZIHx8IHR5cGUgPT09IFBsYWluVmFsdWUuVHlwZS5NQVBfVkFMVUUgfHwgdHlwZSA9PT0gUGxhaW5WYWx1ZS5UeXBlLlNFUV9JVEVNO1xufTtcblxuZnVuY3Rpb24gcmVzb2x2ZU5vZGVQcm9wcyhlcnJvcnMsIG5vZGUpIHtcbiAgY29uc3QgY29tbWVudHMgPSB7XG4gICAgYmVmb3JlOiBbXSxcbiAgICBhZnRlcjogW11cbiAgfTtcbiAgbGV0IGhhc0FuY2hvciA9IGZhbHNlO1xuICBsZXQgaGFzVGFnID0gZmFsc2U7XG4gIGNvbnN0IHByb3BzID0gaXNDb2xsZWN0aW9uSXRlbShub2RlLmNvbnRleHQucGFyZW50KSA/IG5vZGUuY29udGV4dC5wYXJlbnQucHJvcHMuY29uY2F0KG5vZGUucHJvcHMpIDogbm9kZS5wcm9wcztcblxuICBmb3IgKGNvbnN0IHtcbiAgICBzdGFydCxcbiAgICBlbmRcbiAgfSBvZiBwcm9wcykge1xuICAgIHN3aXRjaCAobm9kZS5jb250ZXh0LnNyY1tzdGFydF0pIHtcbiAgICAgIGNhc2UgUGxhaW5WYWx1ZS5DaGFyLkNPTU1FTlQ6XG4gICAgICAgIHtcbiAgICAgICAgICBpZiAoIW5vZGUuY29tbWVudEhhc1JlcXVpcmVkV2hpdGVzcGFjZShzdGFydCkpIHtcbiAgICAgICAgICAgIGNvbnN0IG1zZyA9ICdDb21tZW50cyBtdXN0IGJlIHNlcGFyYXRlZCBmcm9tIG90aGVyIHRva2VucyBieSB3aGl0ZSBzcGFjZSBjaGFyYWN0ZXJzJztcbiAgICAgICAgICAgIGVycm9ycy5wdXNoKG5ldyBQbGFpblZhbHVlLllBTUxTZW1hbnRpY0Vycm9yKG5vZGUsIG1zZykpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgIGhlYWRlcixcbiAgICAgICAgICAgIHZhbHVlUmFuZ2VcbiAgICAgICAgICB9ID0gbm9kZTtcbiAgICAgICAgICBjb25zdCBjYyA9IHZhbHVlUmFuZ2UgJiYgKHN0YXJ0ID4gdmFsdWVSYW5nZS5zdGFydCB8fCBoZWFkZXIgJiYgc3RhcnQgPiBoZWFkZXIuc3RhcnQpID8gY29tbWVudHMuYWZ0ZXIgOiBjb21tZW50cy5iZWZvcmU7XG4gICAgICAgICAgY2MucHVzaChub2RlLmNvbnRleHQuc3JjLnNsaWNlKHN0YXJ0ICsgMSwgZW5kKSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIC8vIEFjdHVhbCBhbmNob3IgJiB0YWcgcmVzb2x1dGlvbiBpcyBoYW5kbGVkIGJ5IHNjaGVtYSwgaGVyZSB3ZSBqdXN0IGNvbXBsYWluXG5cbiAgICAgIGNhc2UgUGxhaW5WYWx1ZS5DaGFyLkFOQ0hPUjpcbiAgICAgICAgaWYgKGhhc0FuY2hvcikge1xuICAgICAgICAgIGNvbnN0IG1zZyA9ICdBIG5vZGUgY2FuIGhhdmUgYXQgbW9zdCBvbmUgYW5jaG9yJztcbiAgICAgICAgICBlcnJvcnMucHVzaChuZXcgUGxhaW5WYWx1ZS5ZQU1MU2VtYW50aWNFcnJvcihub2RlLCBtc2cpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGhhc0FuY2hvciA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIFBsYWluVmFsdWUuQ2hhci5UQUc6XG4gICAgICAgIGlmIChoYXNUYWcpIHtcbiAgICAgICAgICBjb25zdCBtc2cgPSAnQSBub2RlIGNhbiBoYXZlIGF0IG1vc3Qgb25lIHRhZyc7XG4gICAgICAgICAgZXJyb3JzLnB1c2gobmV3IFBsYWluVmFsdWUuWUFNTFNlbWFudGljRXJyb3Iobm9kZSwgbXNnKSk7XG4gICAgICAgIH1cblxuICAgICAgICBoYXNUYWcgPSB0cnVlO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGNvbW1lbnRzLFxuICAgIGhhc0FuY2hvcixcbiAgICBoYXNUYWdcbiAgfTtcbn1cblxuZnVuY3Rpb24gcmVzb2x2ZU5vZGVWYWx1ZShkb2MsIG5vZGUpIHtcbiAgY29uc3Qge1xuICAgIGFuY2hvcnMsXG4gICAgZXJyb3JzLFxuICAgIHNjaGVtYVxuICB9ID0gZG9jO1xuXG4gIGlmIChub2RlLnR5cGUgPT09IFBsYWluVmFsdWUuVHlwZS5BTElBUykge1xuICAgIGNvbnN0IG5hbWUgPSBub2RlLnJhd1ZhbHVlO1xuICAgIGNvbnN0IHNyYyA9IGFuY2hvcnMuZ2V0Tm9kZShuYW1lKTtcblxuICAgIGlmICghc3JjKSB7XG4gICAgICBjb25zdCBtc2cgPSBgQWxpYXNlZCBhbmNob3Igbm90IGZvdW5kOiAke25hbWV9YDtcbiAgICAgIGVycm9ycy5wdXNoKG5ldyBQbGFpblZhbHVlLllBTUxSZWZlcmVuY2VFcnJvcihub2RlLCBtc2cpKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH0gLy8gTGF6eSByZXNvbHV0aW9uIGZvciBjaXJjdWxhciByZWZlcmVuY2VzXG5cblxuICAgIGNvbnN0IHJlcyA9IG5ldyBBbGlhcyhzcmMpO1xuXG4gICAgYW5jaG9ycy5fY3N0QWxpYXNlcy5wdXNoKHJlcyk7XG5cbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgY29uc3QgdGFnTmFtZSA9IHJlc29sdmVUYWdOYW1lKGRvYywgbm9kZSk7XG4gIGlmICh0YWdOYW1lKSByZXR1cm4gcmVzb2x2ZVRhZyhkb2MsIG5vZGUsIHRhZ05hbWUpO1xuXG4gIGlmIChub2RlLnR5cGUgIT09IFBsYWluVmFsdWUuVHlwZS5QTEFJTikge1xuICAgIGNvbnN0IG1zZyA9IGBGYWlsZWQgdG8gcmVzb2x2ZSAke25vZGUudHlwZX0gbm9kZSBoZXJlYDtcbiAgICBlcnJvcnMucHVzaChuZXcgUGxhaW5WYWx1ZS5ZQU1MU3ludGF4RXJyb3Iobm9kZSwgbXNnKSk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICB0cnkge1xuICAgIGNvbnN0IHN0ciA9IHJlc29sdmVTdHJpbmcoZG9jLCBub2RlKTtcbiAgICByZXR1cm4gcmVzb2x2ZVNjYWxhcihzdHIsIHNjaGVtYS50YWdzLCBzY2hlbWEudGFncy5zY2FsYXJGYWxsYmFjayk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgaWYgKCFlcnJvci5zb3VyY2UpIGVycm9yLnNvdXJjZSA9IG5vZGU7XG4gICAgZXJyb3JzLnB1c2goZXJyb3IpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG59IC8vIHNldHMgbm9kZS5yZXNvbHZlZCBvbiBzdWNjZXNzXG5cblxuZnVuY3Rpb24gcmVzb2x2ZU5vZGUoZG9jLCBub2RlKSB7XG4gIGlmICghbm9kZSkgcmV0dXJuIG51bGw7XG4gIGlmIChub2RlLmVycm9yKSBkb2MuZXJyb3JzLnB1c2gobm9kZS5lcnJvcik7XG4gIGNvbnN0IHtcbiAgICBjb21tZW50cyxcbiAgICBoYXNBbmNob3IsXG4gICAgaGFzVGFnXG4gIH0gPSByZXNvbHZlTm9kZVByb3BzKGRvYy5lcnJvcnMsIG5vZGUpO1xuXG4gIGlmIChoYXNBbmNob3IpIHtcbiAgICBjb25zdCB7XG4gICAgICBhbmNob3JzXG4gICAgfSA9IGRvYztcbiAgICBjb25zdCBuYW1lID0gbm9kZS5hbmNob3I7XG4gICAgY29uc3QgcHJldiA9IGFuY2hvcnMuZ2V0Tm9kZShuYW1lKTsgLy8gQXQgdGhpcyBwb2ludCwgYWxpYXNlcyBmb3IgYW55IHByZWNlZGluZyBub2RlIHdpdGggdGhlIHNhbWUgYW5jaG9yXG4gICAgLy8gbmFtZSBoYXZlIGFscmVhZHkgYmVlbiByZXNvbHZlZCwgc28gaXQgbWF5IHNhZmVseSBiZSByZW5hbWVkLlxuXG4gICAgaWYgKHByZXYpIGFuY2hvcnMubWFwW2FuY2hvcnMubmV3TmFtZShuYW1lKV0gPSBwcmV2OyAvLyBEdXJpbmcgcGFyc2luZywgd2UgbmVlZCB0byBzdG9yZSB0aGUgQ1NUIG5vZGUgaW4gYW5jaG9ycy5tYXAgYXNcbiAgICAvLyBhbmNob3JzIG5lZWQgdG8gYmUgYXZhaWxhYmxlIGR1cmluZyByZXNvbHV0aW9uIHRvIGFsbG93IGZvclxuICAgIC8vIGNpcmN1bGFyIHJlZmVyZW5jZXMuXG5cbiAgICBhbmNob3JzLm1hcFtuYW1lXSA9IG5vZGU7XG4gIH1cblxuICBpZiAobm9kZS50eXBlID09PSBQbGFpblZhbHVlLlR5cGUuQUxJQVMgJiYgKGhhc0FuY2hvciB8fCBoYXNUYWcpKSB7XG4gICAgY29uc3QgbXNnID0gJ0FuIGFsaWFzIG5vZGUgbXVzdCBub3Qgc3BlY2lmeSBhbnkgcHJvcGVydGllcyc7XG4gICAgZG9jLmVycm9ycy5wdXNoKG5ldyBQbGFpblZhbHVlLllBTUxTZW1hbnRpY0Vycm9yKG5vZGUsIG1zZykpO1xuICB9XG5cbiAgY29uc3QgcmVzID0gcmVzb2x2ZU5vZGVWYWx1ZShkb2MsIG5vZGUpO1xuXG4gIGlmIChyZXMpIHtcbiAgICByZXMucmFuZ2UgPSBbbm9kZS5yYW5nZS5zdGFydCwgbm9kZS5yYW5nZS5lbmRdO1xuICAgIGlmIChkb2Mub3B0aW9ucy5rZWVwQ3N0Tm9kZXMpIHJlcy5jc3ROb2RlID0gbm9kZTtcbiAgICBpZiAoZG9jLm9wdGlvbnMua2VlcE5vZGVUeXBlcykgcmVzLnR5cGUgPSBub2RlLnR5cGU7XG4gICAgY29uc3QgY2IgPSBjb21tZW50cy5iZWZvcmUuam9pbignXFxuJyk7XG5cbiAgICBpZiAoY2IpIHtcbiAgICAgIHJlcy5jb21tZW50QmVmb3JlID0gcmVzLmNvbW1lbnRCZWZvcmUgPyBgJHtyZXMuY29tbWVudEJlZm9yZX1cXG4ke2NifWAgOiBjYjtcbiAgICB9XG5cbiAgICBjb25zdCBjYSA9IGNvbW1lbnRzLmFmdGVyLmpvaW4oJ1xcbicpO1xuICAgIGlmIChjYSkgcmVzLmNvbW1lbnQgPSByZXMuY29tbWVudCA/IGAke3Jlcy5jb21tZW50fVxcbiR7Y2F9YCA6IGNhO1xuICB9XG5cbiAgcmV0dXJuIG5vZGUucmVzb2x2ZWQgPSByZXM7XG59XG5cbmZ1bmN0aW9uIHJlc29sdmVNYXAoZG9jLCBjc3QpIHtcbiAgaWYgKGNzdC50eXBlICE9PSBQbGFpblZhbHVlLlR5cGUuTUFQICYmIGNzdC50eXBlICE9PSBQbGFpblZhbHVlLlR5cGUuRkxPV19NQVApIHtcbiAgICBjb25zdCBtc2cgPSBgQSAke2NzdC50eXBlfSBub2RlIGNhbm5vdCBiZSByZXNvbHZlZCBhcyBhIG1hcHBpbmdgO1xuICAgIGRvYy5lcnJvcnMucHVzaChuZXcgUGxhaW5WYWx1ZS5ZQU1MU3ludGF4RXJyb3IoY3N0LCBtc2cpKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGNvbnN0IHtcbiAgICBjb21tZW50cyxcbiAgICBpdGVtc1xuICB9ID0gY3N0LnR5cGUgPT09IFBsYWluVmFsdWUuVHlwZS5GTE9XX01BUCA/IHJlc29sdmVGbG93TWFwSXRlbXMoZG9jLCBjc3QpIDogcmVzb2x2ZUJsb2NrTWFwSXRlbXMoZG9jLCBjc3QpO1xuICBjb25zdCBtYXAgPSBuZXcgWUFNTE1hcCgpO1xuICBtYXAuaXRlbXMgPSBpdGVtcztcbiAgcmVzb2x2ZUNvbW1lbnRzKG1hcCwgY29tbWVudHMpO1xuICBsZXQgaGFzQ29sbGVjdGlvbktleSA9IGZhbHNlO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyArK2kpIHtcbiAgICBjb25zdCB7XG4gICAgICBrZXk6IGlLZXlcbiAgICB9ID0gaXRlbXNbaV07XG4gICAgaWYgKGlLZXkgaW5zdGFuY2VvZiBDb2xsZWN0aW9uKSBoYXNDb2xsZWN0aW9uS2V5ID0gdHJ1ZTtcblxuICAgIGlmIChkb2Muc2NoZW1hLm1lcmdlICYmIGlLZXkgJiYgaUtleS52YWx1ZSA9PT0gTUVSR0VfS0VZKSB7XG4gICAgICBpdGVtc1tpXSA9IG5ldyBNZXJnZShpdGVtc1tpXSk7XG4gICAgICBjb25zdCBzb3VyY2VzID0gaXRlbXNbaV0udmFsdWUuaXRlbXM7XG4gICAgICBsZXQgZXJyb3IgPSBudWxsO1xuICAgICAgc291cmNlcy5zb21lKG5vZGUgPT4ge1xuICAgICAgICBpZiAobm9kZSBpbnN0YW5jZW9mIEFsaWFzKSB7XG4gICAgICAgICAgLy8gRHVyaW5nIHBhcnNpbmcsIGFsaWFzIHNvdXJjZXMgYXJlIENTVCBub2RlczsgdG8gYWNjb3VudCBmb3JcbiAgICAgICAgICAvLyBjaXJjdWxhciByZWZlcmVuY2VzIHRoZWlyIHJlc29sdmVkIHZhbHVlcyBjYW4ndCBiZSB1c2VkIGhlcmUuXG4gICAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgdHlwZVxuICAgICAgICAgIH0gPSBub2RlLnNvdXJjZTtcbiAgICAgICAgICBpZiAodHlwZSA9PT0gUGxhaW5WYWx1ZS5UeXBlLk1BUCB8fCB0eXBlID09PSBQbGFpblZhbHVlLlR5cGUuRkxPV19NQVApIHJldHVybiBmYWxzZTtcbiAgICAgICAgICByZXR1cm4gZXJyb3IgPSAnTWVyZ2Ugbm9kZXMgYWxpYXNlcyBjYW4gb25seSBwb2ludCB0byBtYXBzJztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBlcnJvciA9ICdNZXJnZSBub2RlcyBjYW4gb25seSBoYXZlIEFsaWFzIG5vZGVzIGFzIHZhbHVlcyc7XG4gICAgICB9KTtcbiAgICAgIGlmIChlcnJvcikgZG9jLmVycm9ycy5wdXNoKG5ldyBQbGFpblZhbHVlLllBTUxTZW1hbnRpY0Vycm9yKGNzdCwgZXJyb3IpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZm9yIChsZXQgaiA9IGkgKyAxOyBqIDwgaXRlbXMubGVuZ3RoOyArK2opIHtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgIGtleTogaktleVxuICAgICAgICB9ID0gaXRlbXNbal07XG5cbiAgICAgICAgaWYgKGlLZXkgPT09IGpLZXkgfHwgaUtleSAmJiBqS2V5ICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChpS2V5LCAndmFsdWUnKSAmJiBpS2V5LnZhbHVlID09PSBqS2V5LnZhbHVlKSB7XG4gICAgICAgICAgY29uc3QgbXNnID0gYE1hcCBrZXlzIG11c3QgYmUgdW5pcXVlOyBcIiR7aUtleX1cIiBpcyByZXBlYXRlZGA7XG4gICAgICAgICAgZG9jLmVycm9ycy5wdXNoKG5ldyBQbGFpblZhbHVlLllBTUxTZW1hbnRpY0Vycm9yKGNzdCwgbXNnKSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpZiAoaGFzQ29sbGVjdGlvbktleSAmJiAhZG9jLm9wdGlvbnMubWFwQXNNYXApIHtcbiAgICBjb25zdCB3YXJuID0gJ0tleXMgd2l0aCBjb2xsZWN0aW9uIHZhbHVlcyB3aWxsIGJlIHN0cmluZ2lmaWVkIGFzIFlBTUwgZHVlIHRvIEpTIE9iamVjdCByZXN0cmljdGlvbnMuIFVzZSBtYXBBc01hcDogdHJ1ZSB0byBhdm9pZCB0aGlzLic7XG4gICAgZG9jLndhcm5pbmdzLnB1c2gobmV3IFBsYWluVmFsdWUuWUFNTFdhcm5pbmcoY3N0LCB3YXJuKSk7XG4gIH1cblxuICBjc3QucmVzb2x2ZWQgPSBtYXA7XG4gIHJldHVybiBtYXA7XG59XG5cbmNvbnN0IHZhbHVlSGFzUGFpckNvbW1lbnQgPSAoe1xuICBjb250ZXh0OiB7XG4gICAgbGluZVN0YXJ0LFxuICAgIG5vZGUsXG4gICAgc3JjXG4gIH0sXG4gIHByb3BzXG59KSA9PiB7XG4gIGlmIChwcm9wcy5sZW5ndGggPT09IDApIHJldHVybiBmYWxzZTtcbiAgY29uc3Qge1xuICAgIHN0YXJ0XG4gIH0gPSBwcm9wc1swXTtcbiAgaWYgKG5vZGUgJiYgc3RhcnQgPiBub2RlLnZhbHVlUmFuZ2Uuc3RhcnQpIHJldHVybiBmYWxzZTtcbiAgaWYgKHNyY1tzdGFydF0gIT09IFBsYWluVmFsdWUuQ2hhci5DT01NRU5UKSByZXR1cm4gZmFsc2U7XG5cbiAgZm9yIChsZXQgaSA9IGxpbmVTdGFydDsgaSA8IHN0YXJ0OyArK2kpIGlmIChzcmNbaV0gPT09ICdcXG4nKSByZXR1cm4gZmFsc2U7XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5mdW5jdGlvbiByZXNvbHZlUGFpckNvbW1lbnQoaXRlbSwgcGFpcikge1xuICBpZiAoIXZhbHVlSGFzUGFpckNvbW1lbnQoaXRlbSkpIHJldHVybjtcbiAgY29uc3QgY29tbWVudCA9IGl0ZW0uZ2V0UHJvcFZhbHVlKDAsIFBsYWluVmFsdWUuQ2hhci5DT01NRU5ULCB0cnVlKTtcbiAgbGV0IGZvdW5kID0gZmFsc2U7XG4gIGNvbnN0IGNiID0gcGFpci52YWx1ZS5jb21tZW50QmVmb3JlO1xuXG4gIGlmIChjYiAmJiBjYi5zdGFydHNXaXRoKGNvbW1lbnQpKSB7XG4gICAgcGFpci52YWx1ZS5jb21tZW50QmVmb3JlID0gY2Iuc3Vic3RyKGNvbW1lbnQubGVuZ3RoICsgMSk7XG4gICAgZm91bmQgPSB0cnVlO1xuICB9IGVsc2Uge1xuICAgIGNvbnN0IGNjID0gcGFpci52YWx1ZS5jb21tZW50O1xuXG4gICAgaWYgKCFpdGVtLm5vZGUgJiYgY2MgJiYgY2Muc3RhcnRzV2l0aChjb21tZW50KSkge1xuICAgICAgcGFpci52YWx1ZS5jb21tZW50ID0gY2Muc3Vic3RyKGNvbW1lbnQubGVuZ3RoICsgMSk7XG4gICAgICBmb3VuZCA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgaWYgKGZvdW5kKSBwYWlyLmNvbW1lbnQgPSBjb21tZW50O1xufVxuXG5mdW5jdGlvbiByZXNvbHZlQmxvY2tNYXBJdGVtcyhkb2MsIGNzdCkge1xuICBjb25zdCBjb21tZW50cyA9IFtdO1xuICBjb25zdCBpdGVtcyA9IFtdO1xuICBsZXQga2V5ID0gdW5kZWZpbmVkO1xuICBsZXQga2V5U3RhcnQgPSBudWxsO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY3N0Lml0ZW1zLmxlbmd0aDsgKytpKSB7XG4gICAgY29uc3QgaXRlbSA9IGNzdC5pdGVtc1tpXTtcblxuICAgIHN3aXRjaCAoaXRlbS50eXBlKSB7XG4gICAgICBjYXNlIFBsYWluVmFsdWUuVHlwZS5CTEFOS19MSU5FOlxuICAgICAgICBjb21tZW50cy5wdXNoKHtcbiAgICAgICAgICBhZnRlcktleTogISFrZXksXG4gICAgICAgICAgYmVmb3JlOiBpdGVtcy5sZW5ndGhcbiAgICAgICAgfSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIFBsYWluVmFsdWUuVHlwZS5DT01NRU5UOlxuICAgICAgICBjb21tZW50cy5wdXNoKHtcbiAgICAgICAgICBhZnRlcktleTogISFrZXksXG4gICAgICAgICAgYmVmb3JlOiBpdGVtcy5sZW5ndGgsXG4gICAgICAgICAgY29tbWVudDogaXRlbS5jb21tZW50XG4gICAgICAgIH0pO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBQbGFpblZhbHVlLlR5cGUuTUFQX0tFWTpcbiAgICAgICAgaWYgKGtleSAhPT0gdW5kZWZpbmVkKSBpdGVtcy5wdXNoKG5ldyBQYWlyKGtleSkpO1xuICAgICAgICBpZiAoaXRlbS5lcnJvcikgZG9jLmVycm9ycy5wdXNoKGl0ZW0uZXJyb3IpO1xuICAgICAgICBrZXkgPSByZXNvbHZlTm9kZShkb2MsIGl0ZW0ubm9kZSk7XG4gICAgICAgIGtleVN0YXJ0ID0gbnVsbDtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgUGxhaW5WYWx1ZS5UeXBlLk1BUF9WQUxVRTpcbiAgICAgICAge1xuICAgICAgICAgIGlmIChrZXkgPT09IHVuZGVmaW5lZCkga2V5ID0gbnVsbDtcbiAgICAgICAgICBpZiAoaXRlbS5lcnJvcikgZG9jLmVycm9ycy5wdXNoKGl0ZW0uZXJyb3IpO1xuXG4gICAgICAgICAgaWYgKCFpdGVtLmNvbnRleHQuYXRMaW5lU3RhcnQgJiYgaXRlbS5ub2RlICYmIGl0ZW0ubm9kZS50eXBlID09PSBQbGFpblZhbHVlLlR5cGUuTUFQICYmICFpdGVtLm5vZGUuY29udGV4dC5hdExpbmVTdGFydCkge1xuICAgICAgICAgICAgY29uc3QgbXNnID0gJ05lc3RlZCBtYXBwaW5ncyBhcmUgbm90IGFsbG93ZWQgaW4gY29tcGFjdCBtYXBwaW5ncyc7XG4gICAgICAgICAgICBkb2MuZXJyb3JzLnB1c2gobmV3IFBsYWluVmFsdWUuWUFNTFNlbWFudGljRXJyb3IoaXRlbS5ub2RlLCBtc2cpKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBsZXQgdmFsdWVOb2RlID0gaXRlbS5ub2RlO1xuXG4gICAgICAgICAgaWYgKCF2YWx1ZU5vZGUgJiYgaXRlbS5wcm9wcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAvLyBDb21tZW50cyBvbiBhbiBlbXB0eSBtYXBwaW5nIHZhbHVlIG5lZWQgdG8gYmUgcHJlc2VydmVkLCBzbyB3ZVxuICAgICAgICAgICAgLy8gbmVlZCB0byBjb25zdHJ1Y3QgYSBtaW5pbWFsIGVtcHR5IG5vZGUgaGVyZSB0byB1c2UgaW5zdGVhZCBvZiB0aGVcbiAgICAgICAgICAgIC8vIG1pc3NpbmcgYGl0ZW0ubm9kZWAuIC0tIGVlbWVsaS95YW1sIzE5XG4gICAgICAgICAgICB2YWx1ZU5vZGUgPSBuZXcgUGxhaW5WYWx1ZS5QbGFpblZhbHVlKFBsYWluVmFsdWUuVHlwZS5QTEFJTiwgW10pO1xuICAgICAgICAgICAgdmFsdWVOb2RlLmNvbnRleHQgPSB7XG4gICAgICAgICAgICAgIHBhcmVudDogaXRlbSxcbiAgICAgICAgICAgICAgc3JjOiBpdGVtLmNvbnRleHQuc3JjXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgY29uc3QgcG9zID0gaXRlbS5yYW5nZS5zdGFydCArIDE7XG4gICAgICAgICAgICB2YWx1ZU5vZGUucmFuZ2UgPSB7XG4gICAgICAgICAgICAgIHN0YXJ0OiBwb3MsXG4gICAgICAgICAgICAgIGVuZDogcG9zXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdmFsdWVOb2RlLnZhbHVlUmFuZ2UgPSB7XG4gICAgICAgICAgICAgIHN0YXJ0OiBwb3MsXG4gICAgICAgICAgICAgIGVuZDogcG9zXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIGl0ZW0ucmFuZ2Uub3JpZ1N0YXJ0ID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICBjb25zdCBvcmlnUG9zID0gaXRlbS5yYW5nZS5vcmlnU3RhcnQgKyAxO1xuICAgICAgICAgICAgICB2YWx1ZU5vZGUucmFuZ2Uub3JpZ1N0YXJ0ID0gdmFsdWVOb2RlLnJhbmdlLm9yaWdFbmQgPSBvcmlnUG9zO1xuICAgICAgICAgICAgICB2YWx1ZU5vZGUudmFsdWVSYW5nZS5vcmlnU3RhcnQgPSB2YWx1ZU5vZGUudmFsdWVSYW5nZS5vcmlnRW5kID0gb3JpZ1BvcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBwYWlyID0gbmV3IFBhaXIoa2V5LCByZXNvbHZlTm9kZShkb2MsIHZhbHVlTm9kZSkpO1xuICAgICAgICAgIHJlc29sdmVQYWlyQ29tbWVudChpdGVtLCBwYWlyKTtcbiAgICAgICAgICBpdGVtcy5wdXNoKHBhaXIpO1xuXG4gICAgICAgICAgaWYgKGtleSAmJiB0eXBlb2Yga2V5U3RhcnQgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICBpZiAoaXRlbS5yYW5nZS5zdGFydCA+IGtleVN0YXJ0ICsgMTAyNCkgZG9jLmVycm9ycy5wdXNoKGdldExvbmdLZXlFcnJvcihjc3QsIGtleSkpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGtleSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBrZXlTdGFydCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGlmIChrZXkgIT09IHVuZGVmaW5lZCkgaXRlbXMucHVzaChuZXcgUGFpcihrZXkpKTtcbiAgICAgICAga2V5ID0gcmVzb2x2ZU5vZGUoZG9jLCBpdGVtKTtcbiAgICAgICAga2V5U3RhcnQgPSBpdGVtLnJhbmdlLnN0YXJ0O1xuICAgICAgICBpZiAoaXRlbS5lcnJvcikgZG9jLmVycm9ycy5wdXNoKGl0ZW0uZXJyb3IpO1xuXG4gICAgICAgIG5leHQ6IGZvciAobGV0IGogPSBpICsgMTs7ICsraikge1xuICAgICAgICAgIGNvbnN0IG5leHRJdGVtID0gY3N0Lml0ZW1zW2pdO1xuXG4gICAgICAgICAgc3dpdGNoIChuZXh0SXRlbSAmJiBuZXh0SXRlbS50eXBlKSB7XG4gICAgICAgICAgICBjYXNlIFBsYWluVmFsdWUuVHlwZS5CTEFOS19MSU5FOlxuICAgICAgICAgICAgY2FzZSBQbGFpblZhbHVlLlR5cGUuQ09NTUVOVDpcbiAgICAgICAgICAgICAgY29udGludWUgbmV4dDtcblxuICAgICAgICAgICAgY2FzZSBQbGFpblZhbHVlLlR5cGUuTUFQX1ZBTFVFOlxuICAgICAgICAgICAgICBicmVhayBuZXh0O1xuXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgY29uc3QgbXNnID0gJ0ltcGxpY2l0IG1hcCBrZXlzIG5lZWQgdG8gYmUgZm9sbG93ZWQgYnkgbWFwIHZhbHVlcyc7XG4gICAgICAgICAgICAgICAgZG9jLmVycm9ycy5wdXNoKG5ldyBQbGFpblZhbHVlLllBTUxTZW1hbnRpY0Vycm9yKGl0ZW0sIG1zZykpO1xuICAgICAgICAgICAgICAgIGJyZWFrIG5leHQ7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXRlbS52YWx1ZVJhbmdlQ29udGFpbnNOZXdsaW5lKSB7XG4gICAgICAgICAgY29uc3QgbXNnID0gJ0ltcGxpY2l0IG1hcCBrZXlzIG5lZWQgdG8gYmUgb24gYSBzaW5nbGUgbGluZSc7XG4gICAgICAgICAgZG9jLmVycm9ycy5wdXNoKG5ldyBQbGFpblZhbHVlLllBTUxTZW1hbnRpY0Vycm9yKGl0ZW0sIG1zZykpO1xuICAgICAgICB9XG5cbiAgICB9XG4gIH1cblxuICBpZiAoa2V5ICE9PSB1bmRlZmluZWQpIGl0ZW1zLnB1c2gobmV3IFBhaXIoa2V5KSk7XG4gIHJldHVybiB7XG4gICAgY29tbWVudHMsXG4gICAgaXRlbXNcbiAgfTtcbn1cblxuZnVuY3Rpb24gcmVzb2x2ZUZsb3dNYXBJdGVtcyhkb2MsIGNzdCkge1xuICBjb25zdCBjb21tZW50cyA9IFtdO1xuICBjb25zdCBpdGVtcyA9IFtdO1xuICBsZXQga2V5ID0gdW5kZWZpbmVkO1xuICBsZXQgZXhwbGljaXRLZXkgPSBmYWxzZTtcbiAgbGV0IG5leHQgPSAneyc7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjc3QuaXRlbXMubGVuZ3RoOyArK2kpIHtcbiAgICBjb25zdCBpdGVtID0gY3N0Lml0ZW1zW2ldO1xuXG4gICAgaWYgKHR5cGVvZiBpdGVtLmNoYXIgPT09ICdzdHJpbmcnKSB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIGNoYXIsXG4gICAgICAgIG9mZnNldFxuICAgICAgfSA9IGl0ZW07XG5cbiAgICAgIGlmIChjaGFyID09PSAnPycgJiYga2V5ID09PSB1bmRlZmluZWQgJiYgIWV4cGxpY2l0S2V5KSB7XG4gICAgICAgIGV4cGxpY2l0S2V5ID0gdHJ1ZTtcbiAgICAgICAgbmV4dCA9ICc6JztcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChjaGFyID09PSAnOicpIHtcbiAgICAgICAgaWYgKGtleSA9PT0gdW5kZWZpbmVkKSBrZXkgPSBudWxsO1xuXG4gICAgICAgIGlmIChuZXh0ID09PSAnOicpIHtcbiAgICAgICAgICBuZXh0ID0gJywnO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoZXhwbGljaXRLZXkpIHtcbiAgICAgICAgICBpZiAoa2V5ID09PSB1bmRlZmluZWQgJiYgY2hhciAhPT0gJywnKSBrZXkgPSBudWxsO1xuICAgICAgICAgIGV4cGxpY2l0S2V5ID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoa2V5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBpdGVtcy5wdXNoKG5ldyBQYWlyKGtleSkpO1xuICAgICAgICAgIGtleSA9IHVuZGVmaW5lZDtcblxuICAgICAgICAgIGlmIChjaGFyID09PSAnLCcpIHtcbiAgICAgICAgICAgIG5leHQgPSAnOic7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGNoYXIgPT09ICd9Jykge1xuICAgICAgICBpZiAoaSA9PT0gY3N0Lml0ZW1zLmxlbmd0aCAtIDEpIGNvbnRpbnVlO1xuICAgICAgfSBlbHNlIGlmIChjaGFyID09PSBuZXh0KSB7XG4gICAgICAgIG5leHQgPSAnOic7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBtc2cgPSBgRmxvdyBtYXAgY29udGFpbnMgYW4gdW5leHBlY3RlZCAke2NoYXJ9YDtcbiAgICAgIGNvbnN0IGVyciA9IG5ldyBQbGFpblZhbHVlLllBTUxTeW50YXhFcnJvcihjc3QsIG1zZyk7XG4gICAgICBlcnIub2Zmc2V0ID0gb2Zmc2V0O1xuICAgICAgZG9jLmVycm9ycy5wdXNoKGVycik7XG4gICAgfSBlbHNlIGlmIChpdGVtLnR5cGUgPT09IFBsYWluVmFsdWUuVHlwZS5CTEFOS19MSU5FKSB7XG4gICAgICBjb21tZW50cy5wdXNoKHtcbiAgICAgICAgYWZ0ZXJLZXk6ICEha2V5LFxuICAgICAgICBiZWZvcmU6IGl0ZW1zLmxlbmd0aFxuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChpdGVtLnR5cGUgPT09IFBsYWluVmFsdWUuVHlwZS5DT01NRU5UKSB7XG4gICAgICBjaGVja0Zsb3dDb21tZW50U3BhY2UoZG9jLmVycm9ycywgaXRlbSk7XG4gICAgICBjb21tZW50cy5wdXNoKHtcbiAgICAgICAgYWZ0ZXJLZXk6ICEha2V5LFxuICAgICAgICBiZWZvcmU6IGl0ZW1zLmxlbmd0aCxcbiAgICAgICAgY29tbWVudDogaXRlbS5jb21tZW50XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKGtleSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAobmV4dCA9PT0gJywnKSBkb2MuZXJyb3JzLnB1c2gobmV3IFBsYWluVmFsdWUuWUFNTFNlbWFudGljRXJyb3IoaXRlbSwgJ1NlcGFyYXRvciAsIG1pc3NpbmcgaW4gZmxvdyBtYXAnKSk7XG4gICAgICBrZXkgPSByZXNvbHZlTm9kZShkb2MsIGl0ZW0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAobmV4dCAhPT0gJywnKSBkb2MuZXJyb3JzLnB1c2gobmV3IFBsYWluVmFsdWUuWUFNTFNlbWFudGljRXJyb3IoaXRlbSwgJ0luZGljYXRvciA6IG1pc3NpbmcgaW4gZmxvdyBtYXAgZW50cnknKSk7XG4gICAgICBpdGVtcy5wdXNoKG5ldyBQYWlyKGtleSwgcmVzb2x2ZU5vZGUoZG9jLCBpdGVtKSkpO1xuICAgICAga2V5ID0gdW5kZWZpbmVkO1xuICAgICAgZXhwbGljaXRLZXkgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBjaGVja0Zsb3dDb2xsZWN0aW9uRW5kKGRvYy5lcnJvcnMsIGNzdCk7XG4gIGlmIChrZXkgIT09IHVuZGVmaW5lZCkgaXRlbXMucHVzaChuZXcgUGFpcihrZXkpKTtcbiAgcmV0dXJuIHtcbiAgICBjb21tZW50cyxcbiAgICBpdGVtc1xuICB9O1xufVxuXG5mdW5jdGlvbiByZXNvbHZlU2VxKGRvYywgY3N0KSB7XG4gIGlmIChjc3QudHlwZSAhPT0gUGxhaW5WYWx1ZS5UeXBlLlNFUSAmJiBjc3QudHlwZSAhPT0gUGxhaW5WYWx1ZS5UeXBlLkZMT1dfU0VRKSB7XG4gICAgY29uc3QgbXNnID0gYEEgJHtjc3QudHlwZX0gbm9kZSBjYW5ub3QgYmUgcmVzb2x2ZWQgYXMgYSBzZXF1ZW5jZWA7XG4gICAgZG9jLmVycm9ycy5wdXNoKG5ldyBQbGFpblZhbHVlLllBTUxTeW50YXhFcnJvcihjc3QsIG1zZykpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgY29uc3Qge1xuICAgIGNvbW1lbnRzLFxuICAgIGl0ZW1zXG4gIH0gPSBjc3QudHlwZSA9PT0gUGxhaW5WYWx1ZS5UeXBlLkZMT1dfU0VRID8gcmVzb2x2ZUZsb3dTZXFJdGVtcyhkb2MsIGNzdCkgOiByZXNvbHZlQmxvY2tTZXFJdGVtcyhkb2MsIGNzdCk7XG4gIGNvbnN0IHNlcSA9IG5ldyBZQU1MU2VxKCk7XG4gIHNlcS5pdGVtcyA9IGl0ZW1zO1xuICByZXNvbHZlQ29tbWVudHMoc2VxLCBjb21tZW50cyk7XG5cbiAgaWYgKCFkb2Mub3B0aW9ucy5tYXBBc01hcCAmJiBpdGVtcy5zb21lKGl0ID0+IGl0IGluc3RhbmNlb2YgUGFpciAmJiBpdC5rZXkgaW5zdGFuY2VvZiBDb2xsZWN0aW9uKSkge1xuICAgIGNvbnN0IHdhcm4gPSAnS2V5cyB3aXRoIGNvbGxlY3Rpb24gdmFsdWVzIHdpbGwgYmUgc3RyaW5naWZpZWQgYXMgWUFNTCBkdWUgdG8gSlMgT2JqZWN0IHJlc3RyaWN0aW9ucy4gVXNlIG1hcEFzTWFwOiB0cnVlIHRvIGF2b2lkIHRoaXMuJztcbiAgICBkb2Mud2FybmluZ3MucHVzaChuZXcgUGxhaW5WYWx1ZS5ZQU1MV2FybmluZyhjc3QsIHdhcm4pKTtcbiAgfVxuXG4gIGNzdC5yZXNvbHZlZCA9IHNlcTtcbiAgcmV0dXJuIHNlcTtcbn1cblxuZnVuY3Rpb24gcmVzb2x2ZUJsb2NrU2VxSXRlbXMoZG9jLCBjc3QpIHtcbiAgY29uc3QgY29tbWVudHMgPSBbXTtcbiAgY29uc3QgaXRlbXMgPSBbXTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGNzdC5pdGVtcy5sZW5ndGg7ICsraSkge1xuICAgIGNvbnN0IGl0ZW0gPSBjc3QuaXRlbXNbaV07XG5cbiAgICBzd2l0Y2ggKGl0ZW0udHlwZSkge1xuICAgICAgY2FzZSBQbGFpblZhbHVlLlR5cGUuQkxBTktfTElORTpcbiAgICAgICAgY29tbWVudHMucHVzaCh7XG4gICAgICAgICAgYmVmb3JlOiBpdGVtcy5sZW5ndGhcbiAgICAgICAgfSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIFBsYWluVmFsdWUuVHlwZS5DT01NRU5UOlxuICAgICAgICBjb21tZW50cy5wdXNoKHtcbiAgICAgICAgICBjb21tZW50OiBpdGVtLmNvbW1lbnQsXG4gICAgICAgICAgYmVmb3JlOiBpdGVtcy5sZW5ndGhcbiAgICAgICAgfSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIFBsYWluVmFsdWUuVHlwZS5TRVFfSVRFTTpcbiAgICAgICAgaWYgKGl0ZW0uZXJyb3IpIGRvYy5lcnJvcnMucHVzaChpdGVtLmVycm9yKTtcbiAgICAgICAgaXRlbXMucHVzaChyZXNvbHZlTm9kZShkb2MsIGl0ZW0ubm9kZSkpO1xuXG4gICAgICAgIGlmIChpdGVtLmhhc1Byb3BzKSB7XG4gICAgICAgICAgY29uc3QgbXNnID0gJ1NlcXVlbmNlIGl0ZW1zIGNhbm5vdCBoYXZlIHRhZ3Mgb3IgYW5jaG9ycyBiZWZvcmUgdGhlIC0gaW5kaWNhdG9yJztcbiAgICAgICAgICBkb2MuZXJyb3JzLnB1c2gobmV3IFBsYWluVmFsdWUuWUFNTFNlbWFudGljRXJyb3IoaXRlbSwgbXNnKSk7XG4gICAgICAgIH1cblxuICAgICAgICBicmVhaztcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgaWYgKGl0ZW0uZXJyb3IpIGRvYy5lcnJvcnMucHVzaChpdGVtLmVycm9yKTtcbiAgICAgICAgZG9jLmVycm9ycy5wdXNoKG5ldyBQbGFpblZhbHVlLllBTUxTeW50YXhFcnJvcihpdGVtLCBgVW5leHBlY3RlZCAke2l0ZW0udHlwZX0gbm9kZSBpbiBzZXF1ZW5jZWApKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGNvbW1lbnRzLFxuICAgIGl0ZW1zXG4gIH07XG59XG5cbmZ1bmN0aW9uIHJlc29sdmVGbG93U2VxSXRlbXMoZG9jLCBjc3QpIHtcbiAgY29uc3QgY29tbWVudHMgPSBbXTtcbiAgY29uc3QgaXRlbXMgPSBbXTtcbiAgbGV0IGV4cGxpY2l0S2V5ID0gZmFsc2U7XG4gIGxldCBrZXkgPSB1bmRlZmluZWQ7XG4gIGxldCBrZXlTdGFydCA9IG51bGw7XG4gIGxldCBuZXh0ID0gJ1snO1xuICBsZXQgcHJldkl0ZW0gPSBudWxsO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY3N0Lml0ZW1zLmxlbmd0aDsgKytpKSB7XG4gICAgY29uc3QgaXRlbSA9IGNzdC5pdGVtc1tpXTtcblxuICAgIGlmICh0eXBlb2YgaXRlbS5jaGFyID09PSAnc3RyaW5nJykge1xuICAgICAgY29uc3Qge1xuICAgICAgICBjaGFyLFxuICAgICAgICBvZmZzZXRcbiAgICAgIH0gPSBpdGVtO1xuXG4gICAgICBpZiAoY2hhciAhPT0gJzonICYmIChleHBsaWNpdEtleSB8fCBrZXkgIT09IHVuZGVmaW5lZCkpIHtcbiAgICAgICAgaWYgKGV4cGxpY2l0S2V5ICYmIGtleSA9PT0gdW5kZWZpbmVkKSBrZXkgPSBuZXh0ID8gaXRlbXMucG9wKCkgOiBudWxsO1xuICAgICAgICBpdGVtcy5wdXNoKG5ldyBQYWlyKGtleSkpO1xuICAgICAgICBleHBsaWNpdEtleSA9IGZhbHNlO1xuICAgICAgICBrZXkgPSB1bmRlZmluZWQ7XG4gICAgICAgIGtleVN0YXJ0ID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgaWYgKGNoYXIgPT09IG5leHQpIHtcbiAgICAgICAgbmV4dCA9IG51bGw7XG4gICAgICB9IGVsc2UgaWYgKCFuZXh0ICYmIGNoYXIgPT09ICc/Jykge1xuICAgICAgICBleHBsaWNpdEtleSA9IHRydWU7XG4gICAgICB9IGVsc2UgaWYgKG5leHQgIT09ICdbJyAmJiBjaGFyID09PSAnOicgJiYga2V5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKG5leHQgPT09ICcsJykge1xuICAgICAgICAgIGtleSA9IGl0ZW1zLnBvcCgpO1xuXG4gICAgICAgICAgaWYgKGtleSBpbnN0YW5jZW9mIFBhaXIpIHtcbiAgICAgICAgICAgIGNvbnN0IG1zZyA9ICdDaGFpbmluZyBmbG93IHNlcXVlbmNlIHBhaXJzIGlzIGludmFsaWQnO1xuICAgICAgICAgICAgY29uc3QgZXJyID0gbmV3IFBsYWluVmFsdWUuWUFNTFNlbWFudGljRXJyb3IoY3N0LCBtc2cpO1xuICAgICAgICAgICAgZXJyLm9mZnNldCA9IG9mZnNldDtcbiAgICAgICAgICAgIGRvYy5lcnJvcnMucHVzaChlcnIpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICghZXhwbGljaXRLZXkgJiYgdHlwZW9mIGtleVN0YXJ0ID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgY29uc3Qga2V5RW5kID0gaXRlbS5yYW5nZSA/IGl0ZW0ucmFuZ2Uuc3RhcnQgOiBpdGVtLm9mZnNldDtcbiAgICAgICAgICAgIGlmIChrZXlFbmQgPiBrZXlTdGFydCArIDEwMjQpIGRvYy5lcnJvcnMucHVzaChnZXRMb25nS2V5RXJyb3IoY3N0LCBrZXkpKTtcbiAgICAgICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgICAgc3JjXG4gICAgICAgICAgICB9ID0gcHJldkl0ZW0uY29udGV4dDtcblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IGtleVN0YXJ0OyBpIDwga2V5RW5kOyArK2kpIGlmIChzcmNbaV0gPT09ICdcXG4nKSB7XG4gICAgICAgICAgICAgIGNvbnN0IG1zZyA9ICdJbXBsaWNpdCBrZXlzIG9mIGZsb3cgc2VxdWVuY2UgcGFpcnMgbmVlZCB0byBiZSBvbiBhIHNpbmdsZSBsaW5lJztcbiAgICAgICAgICAgICAgZG9jLmVycm9ycy5wdXNoKG5ldyBQbGFpblZhbHVlLllBTUxTZW1hbnRpY0Vycm9yKHByZXZJdGVtLCBtc2cpKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGtleSA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBrZXlTdGFydCA9IG51bGw7XG4gICAgICAgIGV4cGxpY2l0S2V5ID0gZmFsc2U7XG4gICAgICAgIG5leHQgPSBudWxsO1xuICAgICAgfSBlbHNlIGlmIChuZXh0ID09PSAnWycgfHwgY2hhciAhPT0gJ10nIHx8IGkgPCBjc3QuaXRlbXMubGVuZ3RoIC0gMSkge1xuICAgICAgICBjb25zdCBtc2cgPSBgRmxvdyBzZXF1ZW5jZSBjb250YWlucyBhbiB1bmV4cGVjdGVkICR7Y2hhcn1gO1xuICAgICAgICBjb25zdCBlcnIgPSBuZXcgUGxhaW5WYWx1ZS5ZQU1MU3ludGF4RXJyb3IoY3N0LCBtc2cpO1xuICAgICAgICBlcnIub2Zmc2V0ID0gb2Zmc2V0O1xuICAgICAgICBkb2MuZXJyb3JzLnB1c2goZXJyKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGl0ZW0udHlwZSA9PT0gUGxhaW5WYWx1ZS5UeXBlLkJMQU5LX0xJTkUpIHtcbiAgICAgIGNvbW1lbnRzLnB1c2goe1xuICAgICAgICBiZWZvcmU6IGl0ZW1zLmxlbmd0aFxuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChpdGVtLnR5cGUgPT09IFBsYWluVmFsdWUuVHlwZS5DT01NRU5UKSB7XG4gICAgICBjaGVja0Zsb3dDb21tZW50U3BhY2UoZG9jLmVycm9ycywgaXRlbSk7XG4gICAgICBjb21tZW50cy5wdXNoKHtcbiAgICAgICAgY29tbWVudDogaXRlbS5jb21tZW50LFxuICAgICAgICBiZWZvcmU6IGl0ZW1zLmxlbmd0aFxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChuZXh0KSB7XG4gICAgICAgIGNvbnN0IG1zZyA9IGBFeHBlY3RlZCBhICR7bmV4dH0gaW4gZmxvdyBzZXF1ZW5jZWA7XG4gICAgICAgIGRvYy5lcnJvcnMucHVzaChuZXcgUGxhaW5WYWx1ZS5ZQU1MU2VtYW50aWNFcnJvcihpdGVtLCBtc2cpKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgdmFsdWUgPSByZXNvbHZlTm9kZShkb2MsIGl0ZW0pO1xuXG4gICAgICBpZiAoa2V5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaXRlbXMucHVzaCh2YWx1ZSk7XG4gICAgICAgIHByZXZJdGVtID0gaXRlbTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGl0ZW1zLnB1c2gobmV3IFBhaXIoa2V5LCB2YWx1ZSkpO1xuICAgICAgICBrZXkgPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICAgIGtleVN0YXJ0ID0gaXRlbS5yYW5nZS5zdGFydDtcbiAgICAgIG5leHQgPSAnLCc7XG4gICAgfVxuICB9XG5cbiAgY2hlY2tGbG93Q29sbGVjdGlvbkVuZChkb2MuZXJyb3JzLCBjc3QpO1xuICBpZiAoa2V5ICE9PSB1bmRlZmluZWQpIGl0ZW1zLnB1c2gobmV3IFBhaXIoa2V5KSk7XG4gIHJldHVybiB7XG4gICAgY29tbWVudHMsXG4gICAgaXRlbXNcbiAgfTtcbn1cblxuZXhwb3J0cy5BbGlhcyA9IEFsaWFzO1xuZXhwb3J0cy5Db2xsZWN0aW9uID0gQ29sbGVjdGlvbjtcbmV4cG9ydHMuTWVyZ2UgPSBNZXJnZTtcbmV4cG9ydHMuTm9kZSA9IE5vZGU7XG5leHBvcnRzLlBhaXIgPSBQYWlyO1xuZXhwb3J0cy5TY2FsYXIgPSBTY2FsYXI7XG5leHBvcnRzLllBTUxNYXAgPSBZQU1MTWFwO1xuZXhwb3J0cy5ZQU1MU2VxID0gWUFNTFNlcTtcbmV4cG9ydHMuYWRkQ29tbWVudCA9IGFkZENvbW1lbnQ7XG5leHBvcnRzLmJpbmFyeU9wdGlvbnMgPSBiaW5hcnlPcHRpb25zO1xuZXhwb3J0cy5ib29sT3B0aW9ucyA9IGJvb2xPcHRpb25zO1xuZXhwb3J0cy5maW5kUGFpciA9IGZpbmRQYWlyO1xuZXhwb3J0cy5pbnRPcHRpb25zID0gaW50T3B0aW9ucztcbmV4cG9ydHMuaXNFbXB0eVBhdGggPSBpc0VtcHR5UGF0aDtcbmV4cG9ydHMubnVsbE9wdGlvbnMgPSBudWxsT3B0aW9ucztcbmV4cG9ydHMucmVzb2x2ZU1hcCA9IHJlc29sdmVNYXA7XG5leHBvcnRzLnJlc29sdmVOb2RlID0gcmVzb2x2ZU5vZGU7XG5leHBvcnRzLnJlc29sdmVTZXEgPSByZXNvbHZlU2VxO1xuZXhwb3J0cy5yZXNvbHZlU3RyaW5nID0gcmVzb2x2ZVN0cmluZztcbmV4cG9ydHMuc3RyT3B0aW9ucyA9IHN0ck9wdGlvbnM7XG5leHBvcnRzLnN0cmluZ2lmeU51bWJlciA9IHN0cmluZ2lmeU51bWJlcjtcbmV4cG9ydHMuc3RyaW5naWZ5U3RyaW5nID0gc3RyaW5naWZ5U3RyaW5nO1xuZXhwb3J0cy50b0pTT04gPSB0b0pTT047XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG52YXIgUGxhaW5WYWx1ZSA9IHJlcXVpcmUoJy4vUGxhaW5WYWx1ZS1lYzhlNTg4ZS5qcycpO1xudmFyIHJlc29sdmVTZXEgPSByZXF1aXJlKCcuL3Jlc29sdmVTZXEtZDAzY2IwMzcuanMnKTtcblxuLyogZ2xvYmFsIGF0b2IsIGJ0b2EsIEJ1ZmZlciAqL1xuY29uc3QgYmluYXJ5ID0ge1xuICBpZGVudGlmeTogdmFsdWUgPT4gdmFsdWUgaW5zdGFuY2VvZiBVaW50OEFycmF5LFxuICAvLyBCdWZmZXIgaW5oZXJpdHMgZnJvbSBVaW50OEFycmF5XG4gIGRlZmF1bHQ6IGZhbHNlLFxuICB0YWc6ICd0YWc6eWFtbC5vcmcsMjAwMjpiaW5hcnknLFxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgQnVmZmVyIGluIG5vZGUgYW5kIGFuIFVpbnQ4QXJyYXkgaW4gYnJvd3NlcnNcbiAgICpcbiAgICogVG8gdXNlIHRoZSByZXN1bHRpbmcgYnVmZmVyIGFzIGFuIGltYWdlLCB5b3UnbGwgd2FudCB0byBkbyBzb21ldGhpbmcgbGlrZTpcbiAgICpcbiAgICogICBjb25zdCBibG9iID0gbmV3IEJsb2IoW2J1ZmZlcl0sIHsgdHlwZTogJ2ltYWdlL2pwZWcnIH0pXG4gICAqICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Bob3RvJykuc3JjID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKVxuICAgKi9cbiAgcmVzb2x2ZTogKGRvYywgbm9kZSkgPT4ge1xuICAgIGNvbnN0IHNyYyA9IHJlc29sdmVTZXEucmVzb2x2ZVN0cmluZyhkb2MsIG5vZGUpO1xuXG4gICAgaWYgKHR5cGVvZiBCdWZmZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiBCdWZmZXIuZnJvbShzcmMsICdiYXNlNjQnKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBhdG9iID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAvLyBPbiBJRSAxMSwgYXRvYigpIGNhbid0IGhhbmRsZSBuZXdsaW5lc1xuICAgICAgY29uc3Qgc3RyID0gYXRvYihzcmMucmVwbGFjZSgvW1xcblxccl0vZywgJycpKTtcbiAgICAgIGNvbnN0IGJ1ZmZlciA9IG5ldyBVaW50OEFycmF5KHN0ci5sZW5ndGgpO1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0ci5sZW5ndGg7ICsraSkgYnVmZmVyW2ldID0gc3RyLmNoYXJDb2RlQXQoaSk7XG5cbiAgICAgIHJldHVybiBidWZmZXI7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IG1zZyA9ICdUaGlzIGVudmlyb25tZW50IGRvZXMgbm90IHN1cHBvcnQgcmVhZGluZyBiaW5hcnkgdGFnczsgZWl0aGVyIEJ1ZmZlciBvciBhdG9iIGlzIHJlcXVpcmVkJztcbiAgICAgIGRvYy5lcnJvcnMucHVzaChuZXcgUGxhaW5WYWx1ZS5ZQU1MUmVmZXJlbmNlRXJyb3Iobm9kZSwgbXNnKSk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH0sXG4gIG9wdGlvbnM6IHJlc29sdmVTZXEuYmluYXJ5T3B0aW9ucyxcbiAgc3RyaW5naWZ5OiAoe1xuICAgIGNvbW1lbnQsXG4gICAgdHlwZSxcbiAgICB2YWx1ZVxuICB9LCBjdHgsIG9uQ29tbWVudCwgb25DaG9tcEtlZXApID0+IHtcbiAgICBsZXQgc3JjO1xuXG4gICAgaWYgKHR5cGVvZiBCdWZmZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHNyYyA9IHZhbHVlIGluc3RhbmNlb2YgQnVmZmVyID8gdmFsdWUudG9TdHJpbmcoJ2Jhc2U2NCcpIDogQnVmZmVyLmZyb20odmFsdWUuYnVmZmVyKS50b1N0cmluZygnYmFzZTY0Jyk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgYnRvYSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgbGV0IHMgPSAnJztcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2YWx1ZS5sZW5ndGg7ICsraSkgcyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKHZhbHVlW2ldKTtcblxuICAgICAgc3JjID0gYnRvYShzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGlzIGVudmlyb25tZW50IGRvZXMgbm90IHN1cHBvcnQgd3JpdGluZyBiaW5hcnkgdGFnczsgZWl0aGVyIEJ1ZmZlciBvciBidG9hIGlzIHJlcXVpcmVkJyk7XG4gICAgfVxuXG4gICAgaWYgKCF0eXBlKSB0eXBlID0gcmVzb2x2ZVNlcS5iaW5hcnlPcHRpb25zLmRlZmF1bHRUeXBlO1xuXG4gICAgaWYgKHR5cGUgPT09IFBsYWluVmFsdWUuVHlwZS5RVU9URV9ET1VCTEUpIHtcbiAgICAgIHZhbHVlID0gc3JjO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIGxpbmVXaWR0aFxuICAgICAgfSA9IHJlc29sdmVTZXEuYmluYXJ5T3B0aW9ucztcbiAgICAgIGNvbnN0IG4gPSBNYXRoLmNlaWwoc3JjLmxlbmd0aCAvIGxpbmVXaWR0aCk7XG4gICAgICBjb25zdCBsaW5lcyA9IG5ldyBBcnJheShuKTtcblxuICAgICAgZm9yIChsZXQgaSA9IDAsIG8gPSAwOyBpIDwgbjsgKytpLCBvICs9IGxpbmVXaWR0aCkge1xuICAgICAgICBsaW5lc1tpXSA9IHNyYy5zdWJzdHIobywgbGluZVdpZHRoKTtcbiAgICAgIH1cblxuICAgICAgdmFsdWUgPSBsaW5lcy5qb2luKHR5cGUgPT09IFBsYWluVmFsdWUuVHlwZS5CTE9DS19MSVRFUkFMID8gJ1xcbicgOiAnICcpO1xuICAgIH1cblxuICAgIHJldHVybiByZXNvbHZlU2VxLnN0cmluZ2lmeVN0cmluZyh7XG4gICAgICBjb21tZW50LFxuICAgICAgdHlwZSxcbiAgICAgIHZhbHVlXG4gICAgfSwgY3R4LCBvbkNvbW1lbnQsIG9uQ2hvbXBLZWVwKTtcbiAgfVxufTtcblxuZnVuY3Rpb24gcGFyc2VQYWlycyhkb2MsIGNzdCkge1xuICBjb25zdCBzZXEgPSByZXNvbHZlU2VxLnJlc29sdmVTZXEoZG9jLCBjc3QpO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc2VxLml0ZW1zLmxlbmd0aDsgKytpKSB7XG4gICAgbGV0IGl0ZW0gPSBzZXEuaXRlbXNbaV07XG4gICAgaWYgKGl0ZW0gaW5zdGFuY2VvZiByZXNvbHZlU2VxLlBhaXIpIGNvbnRpbnVlO2Vsc2UgaWYgKGl0ZW0gaW5zdGFuY2VvZiByZXNvbHZlU2VxLllBTUxNYXApIHtcbiAgICAgIGlmIChpdGVtLml0ZW1zLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgY29uc3QgbXNnID0gJ0VhY2ggcGFpciBtdXN0IGhhdmUgaXRzIG93biBzZXF1ZW5jZSBpbmRpY2F0b3InO1xuICAgICAgICB0aHJvdyBuZXcgUGxhaW5WYWx1ZS5ZQU1MU2VtYW50aWNFcnJvcihjc3QsIG1zZyk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHBhaXIgPSBpdGVtLml0ZW1zWzBdIHx8IG5ldyByZXNvbHZlU2VxLlBhaXIoKTtcbiAgICAgIGlmIChpdGVtLmNvbW1lbnRCZWZvcmUpIHBhaXIuY29tbWVudEJlZm9yZSA9IHBhaXIuY29tbWVudEJlZm9yZSA/IGAke2l0ZW0uY29tbWVudEJlZm9yZX1cXG4ke3BhaXIuY29tbWVudEJlZm9yZX1gIDogaXRlbS5jb21tZW50QmVmb3JlO1xuICAgICAgaWYgKGl0ZW0uY29tbWVudCkgcGFpci5jb21tZW50ID0gcGFpci5jb21tZW50ID8gYCR7aXRlbS5jb21tZW50fVxcbiR7cGFpci5jb21tZW50fWAgOiBpdGVtLmNvbW1lbnQ7XG4gICAgICBpdGVtID0gcGFpcjtcbiAgICB9XG4gICAgc2VxLml0ZW1zW2ldID0gaXRlbSBpbnN0YW5jZW9mIHJlc29sdmVTZXEuUGFpciA/IGl0ZW0gOiBuZXcgcmVzb2x2ZVNlcS5QYWlyKGl0ZW0pO1xuICB9XG5cbiAgcmV0dXJuIHNlcTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZVBhaXJzKHNjaGVtYSwgaXRlcmFibGUsIGN0eCkge1xuICBjb25zdCBwYWlycyA9IG5ldyByZXNvbHZlU2VxLllBTUxTZXEoc2NoZW1hKTtcbiAgcGFpcnMudGFnID0gJ3RhZzp5YW1sLm9yZywyMDAyOnBhaXJzJztcblxuICBmb3IgKGNvbnN0IGl0IG9mIGl0ZXJhYmxlKSB7XG4gICAgbGV0IGtleSwgdmFsdWU7XG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheShpdCkpIHtcbiAgICAgIGlmIChpdC5sZW5ndGggPT09IDIpIHtcbiAgICAgICAga2V5ID0gaXRbMF07XG4gICAgICAgIHZhbHVlID0gaXRbMV07XG4gICAgICB9IGVsc2UgdGhyb3cgbmV3IFR5cGVFcnJvcihgRXhwZWN0ZWQgW2tleSwgdmFsdWVdIHR1cGxlOiAke2l0fWApO1xuICAgIH0gZWxzZSBpZiAoaXQgJiYgaXQgaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhpdCk7XG5cbiAgICAgIGlmIChrZXlzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICBrZXkgPSBrZXlzWzBdO1xuICAgICAgICB2YWx1ZSA9IGl0W2tleV07XG4gICAgICB9IGVsc2UgdGhyb3cgbmV3IFR5cGVFcnJvcihgRXhwZWN0ZWQgeyBrZXk6IHZhbHVlIH0gdHVwbGU6ICR7aXR9YCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGtleSA9IGl0O1xuICAgIH1cblxuICAgIGNvbnN0IHBhaXIgPSBzY2hlbWEuY3JlYXRlUGFpcihrZXksIHZhbHVlLCBjdHgpO1xuICAgIHBhaXJzLml0ZW1zLnB1c2gocGFpcik7XG4gIH1cblxuICByZXR1cm4gcGFpcnM7XG59XG5jb25zdCBwYWlycyA9IHtcbiAgZGVmYXVsdDogZmFsc2UsXG4gIHRhZzogJ3RhZzp5YW1sLm9yZywyMDAyOnBhaXJzJyxcbiAgcmVzb2x2ZTogcGFyc2VQYWlycyxcbiAgY3JlYXRlTm9kZTogY3JlYXRlUGFpcnNcbn07XG5cbmNsYXNzIFlBTUxPTWFwIGV4dGVuZHMgcmVzb2x2ZVNlcS5ZQU1MU2VxIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIFBsYWluVmFsdWUuX2RlZmluZVByb3BlcnR5KHRoaXMsIFwiYWRkXCIsIHJlc29sdmVTZXEuWUFNTE1hcC5wcm90b3R5cGUuYWRkLmJpbmQodGhpcykpO1xuXG4gICAgUGxhaW5WYWx1ZS5fZGVmaW5lUHJvcGVydHkodGhpcywgXCJkZWxldGVcIiwgcmVzb2x2ZVNlcS5ZQU1MTWFwLnByb3RvdHlwZS5kZWxldGUuYmluZCh0aGlzKSk7XG5cbiAgICBQbGFpblZhbHVlLl9kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcImdldFwiLCByZXNvbHZlU2VxLllBTUxNYXAucHJvdG90eXBlLmdldC5iaW5kKHRoaXMpKTtcblxuICAgIFBsYWluVmFsdWUuX2RlZmluZVByb3BlcnR5KHRoaXMsIFwiaGFzXCIsIHJlc29sdmVTZXEuWUFNTE1hcC5wcm90b3R5cGUuaGFzLmJpbmQodGhpcykpO1xuXG4gICAgUGxhaW5WYWx1ZS5fZGVmaW5lUHJvcGVydHkodGhpcywgXCJzZXRcIiwgcmVzb2x2ZVNlcS5ZQU1MTWFwLnByb3RvdHlwZS5zZXQuYmluZCh0aGlzKSk7XG5cbiAgICB0aGlzLnRhZyA9IFlBTUxPTWFwLnRhZztcbiAgfVxuXG4gIHRvSlNPTihfLCBjdHgpIHtcbiAgICBjb25zdCBtYXAgPSBuZXcgTWFwKCk7XG4gICAgaWYgKGN0eCAmJiBjdHgub25DcmVhdGUpIGN0eC5vbkNyZWF0ZShtYXApO1xuXG4gICAgZm9yIChjb25zdCBwYWlyIG9mIHRoaXMuaXRlbXMpIHtcbiAgICAgIGxldCBrZXksIHZhbHVlO1xuXG4gICAgICBpZiAocGFpciBpbnN0YW5jZW9mIHJlc29sdmVTZXEuUGFpcikge1xuICAgICAgICBrZXkgPSByZXNvbHZlU2VxLnRvSlNPTihwYWlyLmtleSwgJycsIGN0eCk7XG4gICAgICAgIHZhbHVlID0gcmVzb2x2ZVNlcS50b0pTT04ocGFpci52YWx1ZSwga2V5LCBjdHgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAga2V5ID0gcmVzb2x2ZVNlcS50b0pTT04ocGFpciwgJycsIGN0eCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChtYXAuaGFzKGtleSkpIHRocm93IG5ldyBFcnJvcignT3JkZXJlZCBtYXBzIG11c3Qgbm90IGluY2x1ZGUgZHVwbGljYXRlIGtleXMnKTtcbiAgICAgIG1hcC5zZXQoa2V5LCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1hcDtcbiAgfVxuXG59XG5cblBsYWluVmFsdWUuX2RlZmluZVByb3BlcnR5KFlBTUxPTWFwLCBcInRhZ1wiLCAndGFnOnlhbWwub3JnLDIwMDI6b21hcCcpO1xuXG5mdW5jdGlvbiBwYXJzZU9NYXAoZG9jLCBjc3QpIHtcbiAgY29uc3QgcGFpcnMgPSBwYXJzZVBhaXJzKGRvYywgY3N0KTtcbiAgY29uc3Qgc2VlbktleXMgPSBbXTtcblxuICBmb3IgKGNvbnN0IHtcbiAgICBrZXlcbiAgfSBvZiBwYWlycy5pdGVtcykge1xuICAgIGlmIChrZXkgaW5zdGFuY2VvZiByZXNvbHZlU2VxLlNjYWxhcikge1xuICAgICAgaWYgKHNlZW5LZXlzLmluY2x1ZGVzKGtleS52YWx1ZSkpIHtcbiAgICAgICAgY29uc3QgbXNnID0gJ09yZGVyZWQgbWFwcyBtdXN0IG5vdCBpbmNsdWRlIGR1cGxpY2F0ZSBrZXlzJztcbiAgICAgICAgdGhyb3cgbmV3IFBsYWluVmFsdWUuWUFNTFNlbWFudGljRXJyb3IoY3N0LCBtc2cpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2VlbktleXMucHVzaChrZXkudmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBPYmplY3QuYXNzaWduKG5ldyBZQU1MT01hcCgpLCBwYWlycyk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZU9NYXAoc2NoZW1hLCBpdGVyYWJsZSwgY3R4KSB7XG4gIGNvbnN0IHBhaXJzID0gY3JlYXRlUGFpcnMoc2NoZW1hLCBpdGVyYWJsZSwgY3R4KTtcbiAgY29uc3Qgb21hcCA9IG5ldyBZQU1MT01hcCgpO1xuICBvbWFwLml0ZW1zID0gcGFpcnMuaXRlbXM7XG4gIHJldHVybiBvbWFwO1xufVxuXG5jb25zdCBvbWFwID0ge1xuICBpZGVudGlmeTogdmFsdWUgPT4gdmFsdWUgaW5zdGFuY2VvZiBNYXAsXG4gIG5vZGVDbGFzczogWUFNTE9NYXAsXG4gIGRlZmF1bHQ6IGZhbHNlLFxuICB0YWc6ICd0YWc6eWFtbC5vcmcsMjAwMjpvbWFwJyxcbiAgcmVzb2x2ZTogcGFyc2VPTWFwLFxuICBjcmVhdGVOb2RlOiBjcmVhdGVPTWFwXG59O1xuXG5jbGFzcyBZQU1MU2V0IGV4dGVuZHMgcmVzb2x2ZVNlcS5ZQU1MTWFwIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnRhZyA9IFlBTUxTZXQudGFnO1xuICB9XG5cbiAgYWRkKGtleSkge1xuICAgIGNvbnN0IHBhaXIgPSBrZXkgaW5zdGFuY2VvZiByZXNvbHZlU2VxLlBhaXIgPyBrZXkgOiBuZXcgcmVzb2x2ZVNlcS5QYWlyKGtleSk7XG4gICAgY29uc3QgcHJldiA9IHJlc29sdmVTZXEuZmluZFBhaXIodGhpcy5pdGVtcywgcGFpci5rZXkpO1xuICAgIGlmICghcHJldikgdGhpcy5pdGVtcy5wdXNoKHBhaXIpO1xuICB9XG5cbiAgZ2V0KGtleSwga2VlcFBhaXIpIHtcbiAgICBjb25zdCBwYWlyID0gcmVzb2x2ZVNlcS5maW5kUGFpcih0aGlzLml0ZW1zLCBrZXkpO1xuICAgIHJldHVybiAha2VlcFBhaXIgJiYgcGFpciBpbnN0YW5jZW9mIHJlc29sdmVTZXEuUGFpciA/IHBhaXIua2V5IGluc3RhbmNlb2YgcmVzb2x2ZVNlcS5TY2FsYXIgPyBwYWlyLmtleS52YWx1ZSA6IHBhaXIua2V5IDogcGFpcjtcbiAgfVxuXG4gIHNldChrZXksIHZhbHVlKSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ2Jvb2xlYW4nKSB0aHJvdyBuZXcgRXJyb3IoYEV4cGVjdGVkIGJvb2xlYW4gdmFsdWUgZm9yIHNldChrZXksIHZhbHVlKSBpbiBhIFlBTUwgc2V0LCBub3QgJHt0eXBlb2YgdmFsdWV9YCk7XG4gICAgY29uc3QgcHJldiA9IHJlc29sdmVTZXEuZmluZFBhaXIodGhpcy5pdGVtcywga2V5KTtcblxuICAgIGlmIChwcmV2ICYmICF2YWx1ZSkge1xuICAgICAgdGhpcy5pdGVtcy5zcGxpY2UodGhpcy5pdGVtcy5pbmRleE9mKHByZXYpLCAxKTtcbiAgICB9IGVsc2UgaWYgKCFwcmV2ICYmIHZhbHVlKSB7XG4gICAgICB0aGlzLml0ZW1zLnB1c2gobmV3IHJlc29sdmVTZXEuUGFpcihrZXkpKTtcbiAgICB9XG4gIH1cblxuICB0b0pTT04oXywgY3R4KSB7XG4gICAgcmV0dXJuIHN1cGVyLnRvSlNPTihfLCBjdHgsIFNldCk7XG4gIH1cblxuICB0b1N0cmluZyhjdHgsIG9uQ29tbWVudCwgb25DaG9tcEtlZXApIHtcbiAgICBpZiAoIWN0eCkgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHRoaXMpO1xuICAgIGlmICh0aGlzLmhhc0FsbE51bGxWYWx1ZXMoKSkgcmV0dXJuIHN1cGVyLnRvU3RyaW5nKGN0eCwgb25Db21tZW50LCBvbkNob21wS2VlcCk7ZWxzZSB0aHJvdyBuZXcgRXJyb3IoJ1NldCBpdGVtcyBtdXN0IGFsbCBoYXZlIG51bGwgdmFsdWVzJyk7XG4gIH1cblxufVxuXG5QbGFpblZhbHVlLl9kZWZpbmVQcm9wZXJ0eShZQU1MU2V0LCBcInRhZ1wiLCAndGFnOnlhbWwub3JnLDIwMDI6c2V0Jyk7XG5cbmZ1bmN0aW9uIHBhcnNlU2V0KGRvYywgY3N0KSB7XG4gIGNvbnN0IG1hcCA9IHJlc29sdmVTZXEucmVzb2x2ZU1hcChkb2MsIGNzdCk7XG4gIGlmICghbWFwLmhhc0FsbE51bGxWYWx1ZXMoKSkgdGhyb3cgbmV3IFBsYWluVmFsdWUuWUFNTFNlbWFudGljRXJyb3IoY3N0LCAnU2V0IGl0ZW1zIG11c3QgYWxsIGhhdmUgbnVsbCB2YWx1ZXMnKTtcbiAgcmV0dXJuIE9iamVjdC5hc3NpZ24obmV3IFlBTUxTZXQoKSwgbWFwKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlU2V0KHNjaGVtYSwgaXRlcmFibGUsIGN0eCkge1xuICBjb25zdCBzZXQgPSBuZXcgWUFNTFNldCgpO1xuXG4gIGZvciAoY29uc3QgdmFsdWUgb2YgaXRlcmFibGUpIHNldC5pdGVtcy5wdXNoKHNjaGVtYS5jcmVhdGVQYWlyKHZhbHVlLCBudWxsLCBjdHgpKTtcblxuICByZXR1cm4gc2V0O1xufVxuXG5jb25zdCBzZXQgPSB7XG4gIGlkZW50aWZ5OiB2YWx1ZSA9PiB2YWx1ZSBpbnN0YW5jZW9mIFNldCxcbiAgbm9kZUNsYXNzOiBZQU1MU2V0LFxuICBkZWZhdWx0OiBmYWxzZSxcbiAgdGFnOiAndGFnOnlhbWwub3JnLDIwMDI6c2V0JyxcbiAgcmVzb2x2ZTogcGFyc2VTZXQsXG4gIGNyZWF0ZU5vZGU6IGNyZWF0ZVNldFxufTtcblxuY29uc3QgcGFyc2VTZXhhZ2VzaW1hbCA9IChzaWduLCBwYXJ0cykgPT4ge1xuICBjb25zdCBuID0gcGFydHMuc3BsaXQoJzonKS5yZWR1Y2UoKG4sIHApID0+IG4gKiA2MCArIE51bWJlcihwKSwgMCk7XG4gIHJldHVybiBzaWduID09PSAnLScgPyAtbiA6IG47XG59OyAvLyBoaGhoOm1tOnNzLnNzc1xuXG5cbmNvbnN0IHN0cmluZ2lmeVNleGFnZXNpbWFsID0gKHtcbiAgdmFsdWVcbn0pID0+IHtcbiAgaWYgKGlzTmFOKHZhbHVlKSB8fCAhaXNGaW5pdGUodmFsdWUpKSByZXR1cm4gcmVzb2x2ZVNlcS5zdHJpbmdpZnlOdW1iZXIodmFsdWUpO1xuICBsZXQgc2lnbiA9ICcnO1xuXG4gIGlmICh2YWx1ZSA8IDApIHtcbiAgICBzaWduID0gJy0nO1xuICAgIHZhbHVlID0gTWF0aC5hYnModmFsdWUpO1xuICB9XG5cbiAgY29uc3QgcGFydHMgPSBbdmFsdWUgJSA2MF07IC8vIHNlY29uZHMsIGluY2x1ZGluZyBtc1xuXG4gIGlmICh2YWx1ZSA8IDYwKSB7XG4gICAgcGFydHMudW5zaGlmdCgwKTsgLy8gYXQgbGVhc3Qgb25lIDogaXMgcmVxdWlyZWRcbiAgfSBlbHNlIHtcbiAgICB2YWx1ZSA9IE1hdGgucm91bmQoKHZhbHVlIC0gcGFydHNbMF0pIC8gNjApO1xuICAgIHBhcnRzLnVuc2hpZnQodmFsdWUgJSA2MCk7IC8vIG1pbnV0ZXNcblxuICAgIGlmICh2YWx1ZSA+PSA2MCkge1xuICAgICAgdmFsdWUgPSBNYXRoLnJvdW5kKCh2YWx1ZSAtIHBhcnRzWzBdKSAvIDYwKTtcbiAgICAgIHBhcnRzLnVuc2hpZnQodmFsdWUpOyAvLyBob3Vyc1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBzaWduICsgcGFydHMubWFwKG4gPT4gbiA8IDEwID8gJzAnICsgU3RyaW5nKG4pIDogU3RyaW5nKG4pKS5qb2luKCc6JykucmVwbGFjZSgvMDAwMDAwXFxkKiQvLCAnJykgLy8gJSA2MCBtYXkgaW50cm9kdWNlIGVycm9yXG4gIDtcbn07XG5cbmNvbnN0IGludFRpbWUgPSB7XG4gIGlkZW50aWZ5OiB2YWx1ZSA9PiB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInLFxuICBkZWZhdWx0OiB0cnVlLFxuICB0YWc6ICd0YWc6eWFtbC5vcmcsMjAwMjppbnQnLFxuICBmb3JtYXQ6ICdUSU1FJyxcbiAgdGVzdDogL14oWy0rXT8pKFswLTldWzAtOV9dKig/OjpbMC01XT9bMC05XSkrKSQvLFxuICByZXNvbHZlOiAoc3RyLCBzaWduLCBwYXJ0cykgPT4gcGFyc2VTZXhhZ2VzaW1hbChzaWduLCBwYXJ0cy5yZXBsYWNlKC9fL2csICcnKSksXG4gIHN0cmluZ2lmeTogc3RyaW5naWZ5U2V4YWdlc2ltYWxcbn07XG5jb25zdCBmbG9hdFRpbWUgPSB7XG4gIGlkZW50aWZ5OiB2YWx1ZSA9PiB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInLFxuICBkZWZhdWx0OiB0cnVlLFxuICB0YWc6ICd0YWc6eWFtbC5vcmcsMjAwMjpmbG9hdCcsXG4gIGZvcm1hdDogJ1RJTUUnLFxuICB0ZXN0OiAvXihbLStdPykoWzAtOV1bMC05X10qKD86OlswLTVdP1swLTldKStcXC5bMC05X10qKSQvLFxuICByZXNvbHZlOiAoc3RyLCBzaWduLCBwYXJ0cykgPT4gcGFyc2VTZXhhZ2VzaW1hbChzaWduLCBwYXJ0cy5yZXBsYWNlKC9fL2csICcnKSksXG4gIHN0cmluZ2lmeTogc3RyaW5naWZ5U2V4YWdlc2ltYWxcbn07XG5jb25zdCB0aW1lc3RhbXAgPSB7XG4gIGlkZW50aWZ5OiB2YWx1ZSA9PiB2YWx1ZSBpbnN0YW5jZW9mIERhdGUsXG4gIGRlZmF1bHQ6IHRydWUsXG4gIHRhZzogJ3RhZzp5YW1sLm9yZywyMDAyOnRpbWVzdGFtcCcsXG4gIC8vIElmIHRoZSB0aW1lIHpvbmUgaXMgb21pdHRlZCwgdGhlIHRpbWVzdGFtcCBpcyBhc3N1bWVkIHRvIGJlIHNwZWNpZmllZCBpbiBVVEMuIFRoZSB0aW1lIHBhcnRcbiAgLy8gbWF5IGJlIG9taXR0ZWQgYWx0b2dldGhlciwgcmVzdWx0aW5nIGluIGEgZGF0ZSBmb3JtYXQuIEluIHN1Y2ggYSBjYXNlLCB0aGUgdGltZSBwYXJ0IGlzXG4gIC8vIGFzc3VtZWQgdG8gYmUgMDA6MDA6MDBaIChzdGFydCBvZiBkYXksIFVUQykuXG4gIHRlc3Q6IFJlZ0V4cCgnXig/OicgKyAnKFswLTldezR9KS0oWzAtOV17MSwyfSktKFswLTldezEsMn0pJyArIC8vIFlZWVktTW0tRGRcbiAgJyg/Oig/OnR8VHxbIFxcXFx0XSspJyArIC8vIHQgfCBUIHwgd2hpdGVzcGFjZVxuICAnKFswLTldezEsMn0pOihbMC05XXsxLDJ9KTooWzAtOV17MSwyfShcXFxcLlswLTldKyk/KScgKyAvLyBIaDpNbTpTcyguc3MpP1xuICAnKD86WyBcXFxcdF0qKFp8Wy0rXVswMTJdP1swLTldKD86OlswLTldezJ9KT8pKT8nICsgLy8gWiB8ICs1IHwgLTAzOjMwXG4gICcpPycgKyAnKSQnKSxcbiAgcmVzb2x2ZTogKHN0ciwgeWVhciwgbW9udGgsIGRheSwgaG91ciwgbWludXRlLCBzZWNvbmQsIG1pbGxpc2VjLCB0eikgPT4ge1xuICAgIGlmIChtaWxsaXNlYykgbWlsbGlzZWMgPSAobWlsbGlzZWMgKyAnMDAnKS5zdWJzdHIoMSwgMyk7XG4gICAgbGV0IGRhdGUgPSBEYXRlLlVUQyh5ZWFyLCBtb250aCAtIDEsIGRheSwgaG91ciB8fCAwLCBtaW51dGUgfHwgMCwgc2Vjb25kIHx8IDAsIG1pbGxpc2VjIHx8IDApO1xuXG4gICAgaWYgKHR6ICYmIHR6ICE9PSAnWicpIHtcbiAgICAgIGxldCBkID0gcGFyc2VTZXhhZ2VzaW1hbCh0elswXSwgdHouc2xpY2UoMSkpO1xuICAgICAgaWYgKE1hdGguYWJzKGQpIDwgMzApIGQgKj0gNjA7XG4gICAgICBkYXRlIC09IDYwMDAwICogZDtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IERhdGUoZGF0ZSk7XG4gIH0sXG4gIHN0cmluZ2lmeTogKHtcbiAgICB2YWx1ZVxuICB9KSA9PiB2YWx1ZS50b0lTT1N0cmluZygpLnJlcGxhY2UoLygoVDAwOjAwKT86MDApP1xcLjAwMFokLywgJycpXG59O1xuXG4vKiBnbG9iYWwgY29uc29sZSwgcHJvY2VzcywgWUFNTF9TSUxFTkNFX0RFUFJFQ0FUSU9OX1dBUk5JTkdTLCBZQU1MX1NJTEVOQ0VfV0FSTklOR1MgKi9cbmZ1bmN0aW9uIHNob3VsZFdhcm4oZGVwcmVjYXRpb24pIHtcbiAgY29uc3QgZW52ID0gdHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnICYmIHByb2Nlc3MuZW52IHx8IHt9O1xuXG4gIGlmIChkZXByZWNhdGlvbikge1xuICAgIGlmICh0eXBlb2YgWUFNTF9TSUxFTkNFX0RFUFJFQ0FUSU9OX1dBUk5JTkdTICE9PSAndW5kZWZpbmVkJykgcmV0dXJuICFZQU1MX1NJTEVOQ0VfREVQUkVDQVRJT05fV0FSTklOR1M7XG4gICAgcmV0dXJuICFlbnYuWUFNTF9TSUxFTkNFX0RFUFJFQ0FUSU9OX1dBUk5JTkdTO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBZQU1MX1NJTEVOQ0VfV0FSTklOR1MgIT09ICd1bmRlZmluZWQnKSByZXR1cm4gIVlBTUxfU0lMRU5DRV9XQVJOSU5HUztcbiAgcmV0dXJuICFlbnYuWUFNTF9TSUxFTkNFX1dBUk5JTkdTO1xufVxuXG5mdW5jdGlvbiB3YXJuKHdhcm5pbmcsIHR5cGUpIHtcbiAgaWYgKHNob3VsZFdhcm4oZmFsc2UpKSB7XG4gICAgY29uc3QgZW1pdCA9IHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJiBwcm9jZXNzLmVtaXRXYXJuaW5nOyAvLyBUaGlzIHdpbGwgdGhyb3cgaW4gSmVzdCBpZiBgd2FybmluZ2AgaXMgYW4gRXJyb3IgaW5zdGFuY2UgZHVlIHRvXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL2plc3QvaXNzdWVzLzI1NDlcblxuICAgIGlmIChlbWl0KSBlbWl0KHdhcm5pbmcsIHR5cGUpO2Vsc2Uge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgIGNvbnNvbGUud2Fybih0eXBlID8gYCR7dHlwZX06ICR7d2FybmluZ31gIDogd2FybmluZyk7XG4gICAgfVxuICB9XG59XG5mdW5jdGlvbiB3YXJuRmlsZURlcHJlY2F0aW9uKGZpbGVuYW1lKSB7XG4gIGlmIChzaG91bGRXYXJuKHRydWUpKSB7XG4gICAgY29uc3QgcGF0aCA9IGZpbGVuYW1lLnJlcGxhY2UoLy4qeWFtbFsvXFxcXF0vaSwgJycpLnJlcGxhY2UoL1xcLmpzJC8sICcnKS5yZXBsYWNlKC9cXFxcL2csICcvJyk7XG4gICAgd2FybihgVGhlIGVuZHBvaW50ICd5YW1sLyR7cGF0aH0nIHdpbGwgYmUgcmVtb3ZlZCBpbiBhIGZ1dHVyZSByZWxlYXNlLmAsICdEZXByZWNhdGlvbldhcm5pbmcnKTtcbiAgfVxufVxuY29uc3Qgd2FybmVkID0ge307XG5mdW5jdGlvbiB3YXJuT3B0aW9uRGVwcmVjYXRpb24obmFtZSwgYWx0ZXJuYXRpdmUpIHtcbiAgaWYgKCF3YXJuZWRbbmFtZV0gJiYgc2hvdWxkV2Fybih0cnVlKSkge1xuICAgIHdhcm5lZFtuYW1lXSA9IHRydWU7XG4gICAgbGV0IG1zZyA9IGBUaGUgb3B0aW9uICcke25hbWV9JyB3aWxsIGJlIHJlbW92ZWQgaW4gYSBmdXR1cmUgcmVsZWFzZWA7XG4gICAgbXNnICs9IGFsdGVybmF0aXZlID8gYCwgdXNlICcke2FsdGVybmF0aXZlfScgaW5zdGVhZC5gIDogJy4nO1xuICAgIHdhcm4obXNnLCAnRGVwcmVjYXRpb25XYXJuaW5nJyk7XG4gIH1cbn1cblxuZXhwb3J0cy5iaW5hcnkgPSBiaW5hcnk7XG5leHBvcnRzLmZsb2F0VGltZSA9IGZsb2F0VGltZTtcbmV4cG9ydHMuaW50VGltZSA9IGludFRpbWU7XG5leHBvcnRzLm9tYXAgPSBvbWFwO1xuZXhwb3J0cy5wYWlycyA9IHBhaXJzO1xuZXhwb3J0cy5zZXQgPSBzZXQ7XG5leHBvcnRzLnRpbWVzdGFtcCA9IHRpbWVzdGFtcDtcbmV4cG9ydHMud2FybiA9IHdhcm47XG5leHBvcnRzLndhcm5GaWxlRGVwcmVjYXRpb24gPSB3YXJuRmlsZURlcHJlY2F0aW9uO1xuZXhwb3J0cy53YXJuT3B0aW9uRGVwcmVjYXRpb24gPSB3YXJuT3B0aW9uRGVwcmVjYXRpb247XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG52YXIgUGxhaW5WYWx1ZSA9IHJlcXVpcmUoJy4vUGxhaW5WYWx1ZS1lYzhlNTg4ZS5qcycpO1xudmFyIHJlc29sdmVTZXEgPSByZXF1aXJlKCcuL3Jlc29sdmVTZXEtZDAzY2IwMzcuanMnKTtcbnZhciB3YXJuaW5ncyA9IHJlcXVpcmUoJy4vd2FybmluZ3MtMTAwMGEzNzIuanMnKTtcblxuZnVuY3Rpb24gY3JlYXRlTWFwKHNjaGVtYSwgb2JqLCBjdHgpIHtcbiAgY29uc3QgbWFwID0gbmV3IHJlc29sdmVTZXEuWUFNTE1hcChzY2hlbWEpO1xuXG4gIGlmIChvYmogaW5zdGFuY2VvZiBNYXApIHtcbiAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBvYmopIG1hcC5pdGVtcy5wdXNoKHNjaGVtYS5jcmVhdGVQYWlyKGtleSwgdmFsdWUsIGN0eCkpO1xuICB9IGVsc2UgaWYgKG9iaiAmJiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0Jykge1xuICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKG9iaikpIG1hcC5pdGVtcy5wdXNoKHNjaGVtYS5jcmVhdGVQYWlyKGtleSwgb2JqW2tleV0sIGN0eCkpO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBzY2hlbWEuc29ydE1hcEVudHJpZXMgPT09ICdmdW5jdGlvbicpIHtcbiAgICBtYXAuaXRlbXMuc29ydChzY2hlbWEuc29ydE1hcEVudHJpZXMpO1xuICB9XG5cbiAgcmV0dXJuIG1hcDtcbn1cblxuY29uc3QgbWFwID0ge1xuICBjcmVhdGVOb2RlOiBjcmVhdGVNYXAsXG4gIGRlZmF1bHQ6IHRydWUsXG4gIG5vZGVDbGFzczogcmVzb2x2ZVNlcS5ZQU1MTWFwLFxuICB0YWc6ICd0YWc6eWFtbC5vcmcsMjAwMjptYXAnLFxuICByZXNvbHZlOiByZXNvbHZlU2VxLnJlc29sdmVNYXBcbn07XG5cbmZ1bmN0aW9uIGNyZWF0ZVNlcShzY2hlbWEsIG9iaiwgY3R4KSB7XG4gIGNvbnN0IHNlcSA9IG5ldyByZXNvbHZlU2VxLllBTUxTZXEoc2NoZW1hKTtcblxuICBpZiAob2JqICYmIG9ialtTeW1ib2wuaXRlcmF0b3JdKSB7XG4gICAgZm9yIChjb25zdCBpdCBvZiBvYmopIHtcbiAgICAgIGNvbnN0IHYgPSBzY2hlbWEuY3JlYXRlTm9kZShpdCwgY3R4LndyYXBTY2FsYXJzLCBudWxsLCBjdHgpO1xuICAgICAgc2VxLml0ZW1zLnB1c2godik7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHNlcTtcbn1cblxuY29uc3Qgc2VxID0ge1xuICBjcmVhdGVOb2RlOiBjcmVhdGVTZXEsXG4gIGRlZmF1bHQ6IHRydWUsXG4gIG5vZGVDbGFzczogcmVzb2x2ZVNlcS5ZQU1MU2VxLFxuICB0YWc6ICd0YWc6eWFtbC5vcmcsMjAwMjpzZXEnLFxuICByZXNvbHZlOiByZXNvbHZlU2VxLnJlc29sdmVTZXFcbn07XG5cbmNvbnN0IHN0cmluZyA9IHtcbiAgaWRlbnRpZnk6IHZhbHVlID0+IHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycsXG4gIGRlZmF1bHQ6IHRydWUsXG4gIHRhZzogJ3RhZzp5YW1sLm9yZywyMDAyOnN0cicsXG4gIHJlc29sdmU6IHJlc29sdmVTZXEucmVzb2x2ZVN0cmluZyxcblxuICBzdHJpbmdpZnkoaXRlbSwgY3R4LCBvbkNvbW1lbnQsIG9uQ2hvbXBLZWVwKSB7XG4gICAgY3R4ID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICBhY3R1YWxTdHJpbmc6IHRydWVcbiAgICB9LCBjdHgpO1xuICAgIHJldHVybiByZXNvbHZlU2VxLnN0cmluZ2lmeVN0cmluZyhpdGVtLCBjdHgsIG9uQ29tbWVudCwgb25DaG9tcEtlZXApO1xuICB9LFxuXG4gIG9wdGlvbnM6IHJlc29sdmVTZXEuc3RyT3B0aW9uc1xufTtcblxuY29uc3QgZmFpbHNhZmUgPSBbbWFwLCBzZXEsIHN0cmluZ107XG5cbi8qIGdsb2JhbCBCaWdJbnQgKi9cblxuY29uc3QgaW50SWRlbnRpZnkkMiA9IHZhbHVlID0+IHR5cGVvZiB2YWx1ZSA9PT0gJ2JpZ2ludCcgfHwgTnVtYmVyLmlzSW50ZWdlcih2YWx1ZSk7XG5cbmNvbnN0IGludFJlc29sdmUkMSA9IChzcmMsIHBhcnQsIHJhZGl4KSA9PiByZXNvbHZlU2VxLmludE9wdGlvbnMuYXNCaWdJbnQgPyBCaWdJbnQoc3JjKSA6IHBhcnNlSW50KHBhcnQsIHJhZGl4KTtcblxuZnVuY3Rpb24gaW50U3RyaW5naWZ5JDEobm9kZSwgcmFkaXgsIHByZWZpeCkge1xuICBjb25zdCB7XG4gICAgdmFsdWVcbiAgfSA9IG5vZGU7XG4gIGlmIChpbnRJZGVudGlmeSQyKHZhbHVlKSAmJiB2YWx1ZSA+PSAwKSByZXR1cm4gcHJlZml4ICsgdmFsdWUudG9TdHJpbmcocmFkaXgpO1xuICByZXR1cm4gcmVzb2x2ZVNlcS5zdHJpbmdpZnlOdW1iZXIobm9kZSk7XG59XG5cbmNvbnN0IG51bGxPYmogPSB7XG4gIGlkZW50aWZ5OiB2YWx1ZSA9PiB2YWx1ZSA9PSBudWxsLFxuICBjcmVhdGVOb2RlOiAoc2NoZW1hLCB2YWx1ZSwgY3R4KSA9PiBjdHgud3JhcFNjYWxhcnMgPyBuZXcgcmVzb2x2ZVNlcS5TY2FsYXIobnVsbCkgOiBudWxsLFxuICBkZWZhdWx0OiB0cnVlLFxuICB0YWc6ICd0YWc6eWFtbC5vcmcsMjAwMjpudWxsJyxcbiAgdGVzdDogL14oPzp+fFtObl11bGx8TlVMTCk/JC8sXG4gIHJlc29sdmU6ICgpID0+IG51bGwsXG4gIG9wdGlvbnM6IHJlc29sdmVTZXEubnVsbE9wdGlvbnMsXG4gIHN0cmluZ2lmeTogKCkgPT4gcmVzb2x2ZVNlcS5udWxsT3B0aW9ucy5udWxsU3RyXG59O1xuY29uc3QgYm9vbE9iaiA9IHtcbiAgaWRlbnRpZnk6IHZhbHVlID0+IHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nLFxuICBkZWZhdWx0OiB0cnVlLFxuICB0YWc6ICd0YWc6eWFtbC5vcmcsMjAwMjpib29sJyxcbiAgdGVzdDogL14oPzpbVHRdcnVlfFRSVUV8W0ZmXWFsc2V8RkFMU0UpJC8sXG4gIHJlc29sdmU6IHN0ciA9PiBzdHJbMF0gPT09ICd0JyB8fCBzdHJbMF0gPT09ICdUJyxcbiAgb3B0aW9uczogcmVzb2x2ZVNlcS5ib29sT3B0aW9ucyxcbiAgc3RyaW5naWZ5OiAoe1xuICAgIHZhbHVlXG4gIH0pID0+IHZhbHVlID8gcmVzb2x2ZVNlcS5ib29sT3B0aW9ucy50cnVlU3RyIDogcmVzb2x2ZVNlcS5ib29sT3B0aW9ucy5mYWxzZVN0clxufTtcbmNvbnN0IG9jdE9iaiA9IHtcbiAgaWRlbnRpZnk6IHZhbHVlID0+IGludElkZW50aWZ5JDIodmFsdWUpICYmIHZhbHVlID49IDAsXG4gIGRlZmF1bHQ6IHRydWUsXG4gIHRhZzogJ3RhZzp5YW1sLm9yZywyMDAyOmludCcsXG4gIGZvcm1hdDogJ09DVCcsXG4gIHRlc3Q6IC9eMG8oWzAtN10rKSQvLFxuICByZXNvbHZlOiAoc3RyLCBvY3QpID0+IGludFJlc29sdmUkMShzdHIsIG9jdCwgOCksXG4gIG9wdGlvbnM6IHJlc29sdmVTZXEuaW50T3B0aW9ucyxcbiAgc3RyaW5naWZ5OiBub2RlID0+IGludFN0cmluZ2lmeSQxKG5vZGUsIDgsICcwbycpXG59O1xuY29uc3QgaW50T2JqID0ge1xuICBpZGVudGlmeTogaW50SWRlbnRpZnkkMixcbiAgZGVmYXVsdDogdHJ1ZSxcbiAgdGFnOiAndGFnOnlhbWwub3JnLDIwMDI6aW50JyxcbiAgdGVzdDogL15bLStdP1swLTldKyQvLFxuICByZXNvbHZlOiBzdHIgPT4gaW50UmVzb2x2ZSQxKHN0ciwgc3RyLCAxMCksXG4gIG9wdGlvbnM6IHJlc29sdmVTZXEuaW50T3B0aW9ucyxcbiAgc3RyaW5naWZ5OiByZXNvbHZlU2VxLnN0cmluZ2lmeU51bWJlclxufTtcbmNvbnN0IGhleE9iaiA9IHtcbiAgaWRlbnRpZnk6IHZhbHVlID0+IGludElkZW50aWZ5JDIodmFsdWUpICYmIHZhbHVlID49IDAsXG4gIGRlZmF1bHQ6IHRydWUsXG4gIHRhZzogJ3RhZzp5YW1sLm9yZywyMDAyOmludCcsXG4gIGZvcm1hdDogJ0hFWCcsXG4gIHRlc3Q6IC9eMHgoWzAtOWEtZkEtRl0rKSQvLFxuICByZXNvbHZlOiAoc3RyLCBoZXgpID0+IGludFJlc29sdmUkMShzdHIsIGhleCwgMTYpLFxuICBvcHRpb25zOiByZXNvbHZlU2VxLmludE9wdGlvbnMsXG4gIHN0cmluZ2lmeTogbm9kZSA9PiBpbnRTdHJpbmdpZnkkMShub2RlLCAxNiwgJzB4Jylcbn07XG5jb25zdCBuYW5PYmogPSB7XG4gIGlkZW50aWZ5OiB2YWx1ZSA9PiB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInLFxuICBkZWZhdWx0OiB0cnVlLFxuICB0YWc6ICd0YWc6eWFtbC5vcmcsMjAwMjpmbG9hdCcsXG4gIHRlc3Q6IC9eKD86Wy0rXT9cXC5pbmZ8KFxcLm5hbikpJC9pLFxuICByZXNvbHZlOiAoc3RyLCBuYW4pID0+IG5hbiA/IE5hTiA6IHN0clswXSA9PT0gJy0nID8gTnVtYmVyLk5FR0FUSVZFX0lORklOSVRZIDogTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZLFxuICBzdHJpbmdpZnk6IHJlc29sdmVTZXEuc3RyaW5naWZ5TnVtYmVyXG59O1xuY29uc3QgZXhwT2JqID0ge1xuICBpZGVudGlmeTogdmFsdWUgPT4gdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyxcbiAgZGVmYXVsdDogdHJ1ZSxcbiAgdGFnOiAndGFnOnlhbWwub3JnLDIwMDI6ZmxvYXQnLFxuICBmb3JtYXQ6ICdFWFAnLFxuICB0ZXN0OiAvXlstK10/KD86XFwuWzAtOV0rfFswLTldKyg/OlxcLlswLTldKik/KVtlRV1bLStdP1swLTldKyQvLFxuICByZXNvbHZlOiBzdHIgPT4gcGFyc2VGbG9hdChzdHIpLFxuICBzdHJpbmdpZnk6ICh7XG4gICAgdmFsdWVcbiAgfSkgPT4gTnVtYmVyKHZhbHVlKS50b0V4cG9uZW50aWFsKClcbn07XG5jb25zdCBmbG9hdE9iaiA9IHtcbiAgaWRlbnRpZnk6IHZhbHVlID0+IHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicsXG4gIGRlZmF1bHQ6IHRydWUsXG4gIHRhZzogJ3RhZzp5YW1sLm9yZywyMDAyOmZsb2F0JyxcbiAgdGVzdDogL15bLStdPyg/OlxcLihbMC05XSspfFswLTldK1xcLihbMC05XSopKSQvLFxuXG4gIHJlc29sdmUoc3RyLCBmcmFjMSwgZnJhYzIpIHtcbiAgICBjb25zdCBmcmFjID0gZnJhYzEgfHwgZnJhYzI7XG4gICAgY29uc3Qgbm9kZSA9IG5ldyByZXNvbHZlU2VxLlNjYWxhcihwYXJzZUZsb2F0KHN0cikpO1xuICAgIGlmIChmcmFjICYmIGZyYWNbZnJhYy5sZW5ndGggLSAxXSA9PT0gJzAnKSBub2RlLm1pbkZyYWN0aW9uRGlnaXRzID0gZnJhYy5sZW5ndGg7XG4gICAgcmV0dXJuIG5vZGU7XG4gIH0sXG5cbiAgc3RyaW5naWZ5OiByZXNvbHZlU2VxLnN0cmluZ2lmeU51bWJlclxufTtcbmNvbnN0IGNvcmUgPSBmYWlsc2FmZS5jb25jYXQoW251bGxPYmosIGJvb2xPYmosIG9jdE9iaiwgaW50T2JqLCBoZXhPYmosIG5hbk9iaiwgZXhwT2JqLCBmbG9hdE9ial0pO1xuXG4vKiBnbG9iYWwgQmlnSW50ICovXG5cbmNvbnN0IGludElkZW50aWZ5JDEgPSB2YWx1ZSA9PiB0eXBlb2YgdmFsdWUgPT09ICdiaWdpbnQnIHx8IE51bWJlci5pc0ludGVnZXIodmFsdWUpO1xuXG5jb25zdCBzdHJpbmdpZnlKU09OID0gKHtcbiAgdmFsdWVcbn0pID0+IEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcblxuY29uc3QganNvbiA9IFttYXAsIHNlcSwge1xuICBpZGVudGlmeTogdmFsdWUgPT4gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyxcbiAgZGVmYXVsdDogdHJ1ZSxcbiAgdGFnOiAndGFnOnlhbWwub3JnLDIwMDI6c3RyJyxcbiAgcmVzb2x2ZTogcmVzb2x2ZVNlcS5yZXNvbHZlU3RyaW5nLFxuICBzdHJpbmdpZnk6IHN0cmluZ2lmeUpTT05cbn0sIHtcbiAgaWRlbnRpZnk6IHZhbHVlID0+IHZhbHVlID09IG51bGwsXG4gIGNyZWF0ZU5vZGU6IChzY2hlbWEsIHZhbHVlLCBjdHgpID0+IGN0eC53cmFwU2NhbGFycyA/IG5ldyByZXNvbHZlU2VxLlNjYWxhcihudWxsKSA6IG51bGwsXG4gIGRlZmF1bHQ6IHRydWUsXG4gIHRhZzogJ3RhZzp5YW1sLm9yZywyMDAyOm51bGwnLFxuICB0ZXN0OiAvXm51bGwkLyxcbiAgcmVzb2x2ZTogKCkgPT4gbnVsbCxcbiAgc3RyaW5naWZ5OiBzdHJpbmdpZnlKU09OXG59LCB7XG4gIGlkZW50aWZ5OiB2YWx1ZSA9PiB0eXBlb2YgdmFsdWUgPT09ICdib29sZWFuJyxcbiAgZGVmYXVsdDogdHJ1ZSxcbiAgdGFnOiAndGFnOnlhbWwub3JnLDIwMDI6Ym9vbCcsXG4gIHRlc3Q6IC9edHJ1ZXxmYWxzZSQvLFxuICByZXNvbHZlOiBzdHIgPT4gc3RyID09PSAndHJ1ZScsXG4gIHN0cmluZ2lmeTogc3RyaW5naWZ5SlNPTlxufSwge1xuICBpZGVudGlmeTogaW50SWRlbnRpZnkkMSxcbiAgZGVmYXVsdDogdHJ1ZSxcbiAgdGFnOiAndGFnOnlhbWwub3JnLDIwMDI6aW50JyxcbiAgdGVzdDogL14tPyg/OjB8WzEtOV1bMC05XSopJC8sXG4gIHJlc29sdmU6IHN0ciA9PiByZXNvbHZlU2VxLmludE9wdGlvbnMuYXNCaWdJbnQgPyBCaWdJbnQoc3RyKSA6IHBhcnNlSW50KHN0ciwgMTApLFxuICBzdHJpbmdpZnk6ICh7XG4gICAgdmFsdWVcbiAgfSkgPT4gaW50SWRlbnRpZnkkMSh2YWx1ZSkgPyB2YWx1ZS50b1N0cmluZygpIDogSlNPTi5zdHJpbmdpZnkodmFsdWUpXG59LCB7XG4gIGlkZW50aWZ5OiB2YWx1ZSA9PiB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInLFxuICBkZWZhdWx0OiB0cnVlLFxuICB0YWc6ICd0YWc6eWFtbC5vcmcsMjAwMjpmbG9hdCcsXG4gIHRlc3Q6IC9eLT8oPzowfFsxLTldWzAtOV0qKSg/OlxcLlswLTldKik/KD86W2VFXVstK10/WzAtOV0rKT8kLyxcbiAgcmVzb2x2ZTogc3RyID0+IHBhcnNlRmxvYXQoc3RyKSxcbiAgc3RyaW5naWZ5OiBzdHJpbmdpZnlKU09OXG59XTtcblxuanNvbi5zY2FsYXJGYWxsYmFjayA9IHN0ciA9PiB7XG4gIHRocm93IG5ldyBTeW50YXhFcnJvcihgVW5yZXNvbHZlZCBwbGFpbiBzY2FsYXIgJHtKU09OLnN0cmluZ2lmeShzdHIpfWApO1xufTtcblxuLyogZ2xvYmFsIEJpZ0ludCAqL1xuXG5jb25zdCBib29sU3RyaW5naWZ5ID0gKHtcbiAgdmFsdWVcbn0pID0+IHZhbHVlID8gcmVzb2x2ZVNlcS5ib29sT3B0aW9ucy50cnVlU3RyIDogcmVzb2x2ZVNlcS5ib29sT3B0aW9ucy5mYWxzZVN0cjtcblxuY29uc3QgaW50SWRlbnRpZnkgPSB2YWx1ZSA9PiB0eXBlb2YgdmFsdWUgPT09ICdiaWdpbnQnIHx8IE51bWJlci5pc0ludGVnZXIodmFsdWUpO1xuXG5mdW5jdGlvbiBpbnRSZXNvbHZlKHNpZ24sIHNyYywgcmFkaXgpIHtcbiAgbGV0IHN0ciA9IHNyYy5yZXBsYWNlKC9fL2csICcnKTtcblxuICBpZiAocmVzb2x2ZVNlcS5pbnRPcHRpb25zLmFzQmlnSW50KSB7XG4gICAgc3dpdGNoIChyYWRpeCkge1xuICAgICAgY2FzZSAyOlxuICAgICAgICBzdHIgPSBgMGIke3N0cn1gO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSA4OlxuICAgICAgICBzdHIgPSBgMG8ke3N0cn1gO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAxNjpcbiAgICAgICAgc3RyID0gYDB4JHtzdHJ9YDtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgY29uc3QgbiA9IEJpZ0ludChzdHIpO1xuICAgIHJldHVybiBzaWduID09PSAnLScgPyBCaWdJbnQoLTEpICogbiA6IG47XG4gIH1cblxuICBjb25zdCBuID0gcGFyc2VJbnQoc3RyLCByYWRpeCk7XG4gIHJldHVybiBzaWduID09PSAnLScgPyAtMSAqIG4gOiBuO1xufVxuXG5mdW5jdGlvbiBpbnRTdHJpbmdpZnkobm9kZSwgcmFkaXgsIHByZWZpeCkge1xuICBjb25zdCB7XG4gICAgdmFsdWVcbiAgfSA9IG5vZGU7XG5cbiAgaWYgKGludElkZW50aWZ5KHZhbHVlKSkge1xuICAgIGNvbnN0IHN0ciA9IHZhbHVlLnRvU3RyaW5nKHJhZGl4KTtcbiAgICByZXR1cm4gdmFsdWUgPCAwID8gJy0nICsgcHJlZml4ICsgc3RyLnN1YnN0cigxKSA6IHByZWZpeCArIHN0cjtcbiAgfVxuXG4gIHJldHVybiByZXNvbHZlU2VxLnN0cmluZ2lmeU51bWJlcihub2RlKTtcbn1cblxuY29uc3QgeWFtbDExID0gZmFpbHNhZmUuY29uY2F0KFt7XG4gIGlkZW50aWZ5OiB2YWx1ZSA9PiB2YWx1ZSA9PSBudWxsLFxuICBjcmVhdGVOb2RlOiAoc2NoZW1hLCB2YWx1ZSwgY3R4KSA9PiBjdHgud3JhcFNjYWxhcnMgPyBuZXcgcmVzb2x2ZVNlcS5TY2FsYXIobnVsbCkgOiBudWxsLFxuICBkZWZhdWx0OiB0cnVlLFxuICB0YWc6ICd0YWc6eWFtbC5vcmcsMjAwMjpudWxsJyxcbiAgdGVzdDogL14oPzp+fFtObl11bGx8TlVMTCk/JC8sXG4gIHJlc29sdmU6ICgpID0+IG51bGwsXG4gIG9wdGlvbnM6IHJlc29sdmVTZXEubnVsbE9wdGlvbnMsXG4gIHN0cmluZ2lmeTogKCkgPT4gcmVzb2x2ZVNlcS5udWxsT3B0aW9ucy5udWxsU3RyXG59LCB7XG4gIGlkZW50aWZ5OiB2YWx1ZSA9PiB0eXBlb2YgdmFsdWUgPT09ICdib29sZWFuJyxcbiAgZGVmYXVsdDogdHJ1ZSxcbiAgdGFnOiAndGFnOnlhbWwub3JnLDIwMDI6Ym9vbCcsXG4gIHRlc3Q6IC9eKD86WXx5fFtZeV1lc3xZRVN8W1R0XXJ1ZXxUUlVFfFtPb11ufE9OKSQvLFxuICByZXNvbHZlOiAoKSA9PiB0cnVlLFxuICBvcHRpb25zOiByZXNvbHZlU2VxLmJvb2xPcHRpb25zLFxuICBzdHJpbmdpZnk6IGJvb2xTdHJpbmdpZnlcbn0sIHtcbiAgaWRlbnRpZnk6IHZhbHVlID0+IHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nLFxuICBkZWZhdWx0OiB0cnVlLFxuICB0YWc6ICd0YWc6eWFtbC5vcmcsMjAwMjpib29sJyxcbiAgdGVzdDogL14oPzpOfG58W05uXW98Tk98W0ZmXWFsc2V8RkFMU0V8W09vXWZmfE9GRikkL2ksXG4gIHJlc29sdmU6ICgpID0+IGZhbHNlLFxuICBvcHRpb25zOiByZXNvbHZlU2VxLmJvb2xPcHRpb25zLFxuICBzdHJpbmdpZnk6IGJvb2xTdHJpbmdpZnlcbn0sIHtcbiAgaWRlbnRpZnk6IGludElkZW50aWZ5LFxuICBkZWZhdWx0OiB0cnVlLFxuICB0YWc6ICd0YWc6eWFtbC5vcmcsMjAwMjppbnQnLFxuICBmb3JtYXQ6ICdCSU4nLFxuICB0ZXN0OiAvXihbLStdPykwYihbMC0xX10rKSQvLFxuICByZXNvbHZlOiAoc3RyLCBzaWduLCBiaW4pID0+IGludFJlc29sdmUoc2lnbiwgYmluLCAyKSxcbiAgc3RyaW5naWZ5OiBub2RlID0+IGludFN0cmluZ2lmeShub2RlLCAyLCAnMGInKVxufSwge1xuICBpZGVudGlmeTogaW50SWRlbnRpZnksXG4gIGRlZmF1bHQ6IHRydWUsXG4gIHRhZzogJ3RhZzp5YW1sLm9yZywyMDAyOmludCcsXG4gIGZvcm1hdDogJ09DVCcsXG4gIHRlc3Q6IC9eKFstK10/KTAoWzAtN19dKykkLyxcbiAgcmVzb2x2ZTogKHN0ciwgc2lnbiwgb2N0KSA9PiBpbnRSZXNvbHZlKHNpZ24sIG9jdCwgOCksXG4gIHN0cmluZ2lmeTogbm9kZSA9PiBpbnRTdHJpbmdpZnkobm9kZSwgOCwgJzAnKVxufSwge1xuICBpZGVudGlmeTogaW50SWRlbnRpZnksXG4gIGRlZmF1bHQ6IHRydWUsXG4gIHRhZzogJ3RhZzp5YW1sLm9yZywyMDAyOmludCcsXG4gIHRlc3Q6IC9eKFstK10/KShbMC05XVswLTlfXSopJC8sXG4gIHJlc29sdmU6IChzdHIsIHNpZ24sIGFicykgPT4gaW50UmVzb2x2ZShzaWduLCBhYnMsIDEwKSxcbiAgc3RyaW5naWZ5OiByZXNvbHZlU2VxLnN0cmluZ2lmeU51bWJlclxufSwge1xuICBpZGVudGlmeTogaW50SWRlbnRpZnksXG4gIGRlZmF1bHQ6IHRydWUsXG4gIHRhZzogJ3RhZzp5YW1sLm9yZywyMDAyOmludCcsXG4gIGZvcm1hdDogJ0hFWCcsXG4gIHRlc3Q6IC9eKFstK10/KTB4KFswLTlhLWZBLUZfXSspJC8sXG4gIHJlc29sdmU6IChzdHIsIHNpZ24sIGhleCkgPT4gaW50UmVzb2x2ZShzaWduLCBoZXgsIDE2KSxcbiAgc3RyaW5naWZ5OiBub2RlID0+IGludFN0cmluZ2lmeShub2RlLCAxNiwgJzB4Jylcbn0sIHtcbiAgaWRlbnRpZnk6IHZhbHVlID0+IHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicsXG4gIGRlZmF1bHQ6IHRydWUsXG4gIHRhZzogJ3RhZzp5YW1sLm9yZywyMDAyOmZsb2F0JyxcbiAgdGVzdDogL14oPzpbLStdP1xcLmluZnwoXFwubmFuKSkkL2ksXG4gIHJlc29sdmU6IChzdHIsIG5hbikgPT4gbmFuID8gTmFOIDogc3RyWzBdID09PSAnLScgPyBOdW1iZXIuTkVHQVRJVkVfSU5GSU5JVFkgOiBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFksXG4gIHN0cmluZ2lmeTogcmVzb2x2ZVNlcS5zdHJpbmdpZnlOdW1iZXJcbn0sIHtcbiAgaWRlbnRpZnk6IHZhbHVlID0+IHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicsXG4gIGRlZmF1bHQ6IHRydWUsXG4gIHRhZzogJ3RhZzp5YW1sLm9yZywyMDAyOmZsb2F0JyxcbiAgZm9ybWF0OiAnRVhQJyxcbiAgdGVzdDogL15bLStdPyhbMC05XVswLTlfXSopPyhcXC5bMC05X10qKT9bZUVdWy0rXT9bMC05XSskLyxcbiAgcmVzb2x2ZTogc3RyID0+IHBhcnNlRmxvYXQoc3RyLnJlcGxhY2UoL18vZywgJycpKSxcbiAgc3RyaW5naWZ5OiAoe1xuICAgIHZhbHVlXG4gIH0pID0+IE51bWJlcih2YWx1ZSkudG9FeHBvbmVudGlhbCgpXG59LCB7XG4gIGlkZW50aWZ5OiB2YWx1ZSA9PiB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInLFxuICBkZWZhdWx0OiB0cnVlLFxuICB0YWc6ICd0YWc6eWFtbC5vcmcsMjAwMjpmbG9hdCcsXG4gIHRlc3Q6IC9eWy0rXT8oPzpbMC05XVswLTlfXSopP1xcLihbMC05X10qKSQvLFxuXG4gIHJlc29sdmUoc3RyLCBmcmFjKSB7XG4gICAgY29uc3Qgbm9kZSA9IG5ldyByZXNvbHZlU2VxLlNjYWxhcihwYXJzZUZsb2F0KHN0ci5yZXBsYWNlKC9fL2csICcnKSkpO1xuXG4gICAgaWYgKGZyYWMpIHtcbiAgICAgIGNvbnN0IGYgPSBmcmFjLnJlcGxhY2UoL18vZywgJycpO1xuICAgICAgaWYgKGZbZi5sZW5ndGggLSAxXSA9PT0gJzAnKSBub2RlLm1pbkZyYWN0aW9uRGlnaXRzID0gZi5sZW5ndGg7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5vZGU7XG4gIH0sXG5cbiAgc3RyaW5naWZ5OiByZXNvbHZlU2VxLnN0cmluZ2lmeU51bWJlclxufV0sIHdhcm5pbmdzLmJpbmFyeSwgd2FybmluZ3Mub21hcCwgd2FybmluZ3MucGFpcnMsIHdhcm5pbmdzLnNldCwgd2FybmluZ3MuaW50VGltZSwgd2FybmluZ3MuZmxvYXRUaW1lLCB3YXJuaW5ncy50aW1lc3RhbXApO1xuXG5jb25zdCBzY2hlbWFzID0ge1xuICBjb3JlLFxuICBmYWlsc2FmZSxcbiAganNvbixcbiAgeWFtbDExXG59O1xuY29uc3QgdGFncyA9IHtcbiAgYmluYXJ5OiB3YXJuaW5ncy5iaW5hcnksXG4gIGJvb2w6IGJvb2xPYmosXG4gIGZsb2F0OiBmbG9hdE9iaixcbiAgZmxvYXRFeHA6IGV4cE9iaixcbiAgZmxvYXROYU46IG5hbk9iaixcbiAgZmxvYXRUaW1lOiB3YXJuaW5ncy5mbG9hdFRpbWUsXG4gIGludDogaW50T2JqLFxuICBpbnRIZXg6IGhleE9iaixcbiAgaW50T2N0OiBvY3RPYmosXG4gIGludFRpbWU6IHdhcm5pbmdzLmludFRpbWUsXG4gIG1hcCxcbiAgbnVsbDogbnVsbE9iaixcbiAgb21hcDogd2FybmluZ3Mub21hcCxcbiAgcGFpcnM6IHdhcm5pbmdzLnBhaXJzLFxuICBzZXEsXG4gIHNldDogd2FybmluZ3Muc2V0LFxuICB0aW1lc3RhbXA6IHdhcm5pbmdzLnRpbWVzdGFtcFxufTtcblxuZnVuY3Rpb24gZmluZFRhZ09iamVjdCh2YWx1ZSwgdGFnTmFtZSwgdGFncykge1xuICBpZiAodGFnTmFtZSkge1xuICAgIGNvbnN0IG1hdGNoID0gdGFncy5maWx0ZXIodCA9PiB0LnRhZyA9PT0gdGFnTmFtZSk7XG4gICAgY29uc3QgdGFnT2JqID0gbWF0Y2guZmluZCh0ID0+ICF0LmZvcm1hdCkgfHwgbWF0Y2hbMF07XG4gICAgaWYgKCF0YWdPYmopIHRocm93IG5ldyBFcnJvcihgVGFnICR7dGFnTmFtZX0gbm90IGZvdW5kYCk7XG4gICAgcmV0dXJuIHRhZ09iajtcbiAgfSAvLyBUT0RPOiBkZXByZWNhdGUvcmVtb3ZlIGNsYXNzIGNoZWNrXG5cblxuICByZXR1cm4gdGFncy5maW5kKHQgPT4gKHQuaWRlbnRpZnkgJiYgdC5pZGVudGlmeSh2YWx1ZSkgfHwgdC5jbGFzcyAmJiB2YWx1ZSBpbnN0YW5jZW9mIHQuY2xhc3MpICYmICF0LmZvcm1hdCk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZU5vZGUodmFsdWUsIHRhZ05hbWUsIGN0eCkge1xuICBpZiAodmFsdWUgaW5zdGFuY2VvZiByZXNvbHZlU2VxLk5vZGUpIHJldHVybiB2YWx1ZTtcbiAgY29uc3Qge1xuICAgIGRlZmF1bHRQcmVmaXgsXG4gICAgb25UYWdPYmosXG4gICAgcHJldk9iamVjdHMsXG4gICAgc2NoZW1hLFxuICAgIHdyYXBTY2FsYXJzXG4gIH0gPSBjdHg7XG4gIGlmICh0YWdOYW1lICYmIHRhZ05hbWUuc3RhcnRzV2l0aCgnISEnKSkgdGFnTmFtZSA9IGRlZmF1bHRQcmVmaXggKyB0YWdOYW1lLnNsaWNlKDIpO1xuICBsZXQgdGFnT2JqID0gZmluZFRhZ09iamVjdCh2YWx1ZSwgdGFnTmFtZSwgc2NoZW1hLnRhZ3MpO1xuXG4gIGlmICghdGFnT2JqKSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZS50b0pTT04gPT09ICdmdW5jdGlvbicpIHZhbHVlID0gdmFsdWUudG9KU09OKCk7XG4gICAgaWYgKCF2YWx1ZSB8fCB0eXBlb2YgdmFsdWUgIT09ICdvYmplY3QnKSByZXR1cm4gd3JhcFNjYWxhcnMgPyBuZXcgcmVzb2x2ZVNlcS5TY2FsYXIodmFsdWUpIDogdmFsdWU7XG4gICAgdGFnT2JqID0gdmFsdWUgaW5zdGFuY2VvZiBNYXAgPyBtYXAgOiB2YWx1ZVtTeW1ib2wuaXRlcmF0b3JdID8gc2VxIDogbWFwO1xuICB9XG5cbiAgaWYgKG9uVGFnT2JqKSB7XG4gICAgb25UYWdPYmoodGFnT2JqKTtcbiAgICBkZWxldGUgY3R4Lm9uVGFnT2JqO1xuICB9IC8vIERldGVjdCBkdXBsaWNhdGUgcmVmZXJlbmNlcyB0byB0aGUgc2FtZSBvYmplY3QgJiB1c2UgQWxpYXMgbm9kZXMgZm9yIGFsbFxuICAvLyBhZnRlciBmaXJzdC4gVGhlIGBvYmpgIHdyYXBwZXIgYWxsb3dzIGZvciBjaXJjdWxhciByZWZlcmVuY2VzIHRvIHJlc29sdmUuXG5cblxuICBjb25zdCBvYmogPSB7XG4gICAgdmFsdWU6IHVuZGVmaW5lZCxcbiAgICBub2RlOiB1bmRlZmluZWRcbiAgfTtcblxuICBpZiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiBwcmV2T2JqZWN0cykge1xuICAgIGNvbnN0IHByZXYgPSBwcmV2T2JqZWN0cy5nZXQodmFsdWUpO1xuXG4gICAgaWYgKHByZXYpIHtcbiAgICAgIGNvbnN0IGFsaWFzID0gbmV3IHJlc29sdmVTZXEuQWxpYXMocHJldik7IC8vIGxlYXZlcyBzb3VyY2UgZGlydHk7IG11c3QgYmUgY2xlYW5lZCBieSBjYWxsZXJcblxuICAgICAgY3R4LmFsaWFzTm9kZXMucHVzaChhbGlhcyk7IC8vIGRlZmluZWQgYWxvbmcgd2l0aCBwcmV2T2JqZWN0c1xuXG4gICAgICByZXR1cm4gYWxpYXM7XG4gICAgfVxuXG4gICAgb2JqLnZhbHVlID0gdmFsdWU7XG4gICAgcHJldk9iamVjdHMuc2V0KHZhbHVlLCBvYmopO1xuICB9XG5cbiAgb2JqLm5vZGUgPSB0YWdPYmouY3JlYXRlTm9kZSA/IHRhZ09iai5jcmVhdGVOb2RlKGN0eC5zY2hlbWEsIHZhbHVlLCBjdHgpIDogd3JhcFNjYWxhcnMgPyBuZXcgcmVzb2x2ZVNlcS5TY2FsYXIodmFsdWUpIDogdmFsdWU7XG4gIGlmICh0YWdOYW1lICYmIG9iai5ub2RlIGluc3RhbmNlb2YgcmVzb2x2ZVNlcS5Ob2RlKSBvYmoubm9kZS50YWcgPSB0YWdOYW1lO1xuICByZXR1cm4gb2JqLm5vZGU7XG59XG5cbmZ1bmN0aW9uIGdldFNjaGVtYVRhZ3Moc2NoZW1hcywga25vd25UYWdzLCBjdXN0b21UYWdzLCBzY2hlbWFJZCkge1xuICBsZXQgdGFncyA9IHNjaGVtYXNbc2NoZW1hSWQucmVwbGFjZSgvXFxXL2csICcnKV07IC8vICd5YW1sLTEuMScgLT4gJ3lhbWwxMSdcblxuICBpZiAoIXRhZ3MpIHtcbiAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoc2NoZW1hcykubWFwKGtleSA9PiBKU09OLnN0cmluZ2lmeShrZXkpKS5qb2luKCcsICcpO1xuICAgIHRocm93IG5ldyBFcnJvcihgVW5rbm93biBzY2hlbWEgXCIke3NjaGVtYUlkfVwiOyB1c2Ugb25lIG9mICR7a2V5c31gKTtcbiAgfVxuXG4gIGlmIChBcnJheS5pc0FycmF5KGN1c3RvbVRhZ3MpKSB7XG4gICAgZm9yIChjb25zdCB0YWcgb2YgY3VzdG9tVGFncykgdGFncyA9IHRhZ3MuY29uY2F0KHRhZyk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGN1c3RvbVRhZ3MgPT09ICdmdW5jdGlvbicpIHtcbiAgICB0YWdzID0gY3VzdG9tVGFncyh0YWdzLnNsaWNlKCkpO1xuICB9XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCB0YWdzLmxlbmd0aDsgKytpKSB7XG4gICAgY29uc3QgdGFnID0gdGFnc1tpXTtcblxuICAgIGlmICh0eXBlb2YgdGFnID09PSAnc3RyaW5nJykge1xuICAgICAgY29uc3QgdGFnT2JqID0ga25vd25UYWdzW3RhZ107XG5cbiAgICAgIGlmICghdGFnT2JqKSB7XG4gICAgICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhrbm93blRhZ3MpLm1hcChrZXkgPT4gSlNPTi5zdHJpbmdpZnkoa2V5KSkuam9pbignLCAnKTtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duIGN1c3RvbSB0YWcgXCIke3RhZ31cIjsgdXNlIG9uZSBvZiAke2tleXN9YCk7XG4gICAgICB9XG5cbiAgICAgIHRhZ3NbaV0gPSB0YWdPYmo7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRhZ3M7XG59XG5cbmNvbnN0IHNvcnRNYXBFbnRyaWVzQnlLZXkgPSAoYSwgYikgPT4gYS5rZXkgPCBiLmtleSA/IC0xIDogYS5rZXkgPiBiLmtleSA/IDEgOiAwO1xuXG5jbGFzcyBTY2hlbWEge1xuICAvLyBUT0RPOiByZW1vdmUgaW4gdjJcbiAgLy8gVE9ETzogcmVtb3ZlIGluIHYyXG4gIGNvbnN0cnVjdG9yKHtcbiAgICBjdXN0b21UYWdzLFxuICAgIG1lcmdlLFxuICAgIHNjaGVtYSxcbiAgICBzb3J0TWFwRW50cmllcyxcbiAgICB0YWdzOiBkZXByZWNhdGVkQ3VzdG9tVGFnc1xuICB9KSB7XG4gICAgdGhpcy5tZXJnZSA9ICEhbWVyZ2U7XG4gICAgdGhpcy5uYW1lID0gc2NoZW1hO1xuICAgIHRoaXMuc29ydE1hcEVudHJpZXMgPSBzb3J0TWFwRW50cmllcyA9PT0gdHJ1ZSA/IHNvcnRNYXBFbnRyaWVzQnlLZXkgOiBzb3J0TWFwRW50cmllcyB8fCBudWxsO1xuICAgIGlmICghY3VzdG9tVGFncyAmJiBkZXByZWNhdGVkQ3VzdG9tVGFncykgd2FybmluZ3Mud2Fybk9wdGlvbkRlcHJlY2F0aW9uKCd0YWdzJywgJ2N1c3RvbVRhZ3MnKTtcbiAgICB0aGlzLnRhZ3MgPSBnZXRTY2hlbWFUYWdzKHNjaGVtYXMsIHRhZ3MsIGN1c3RvbVRhZ3MgfHwgZGVwcmVjYXRlZEN1c3RvbVRhZ3MsIHNjaGVtYSk7XG4gIH1cblxuICBjcmVhdGVOb2RlKHZhbHVlLCB3cmFwU2NhbGFycywgdGFnTmFtZSwgY3R4KSB7XG4gICAgY29uc3QgYmFzZUN0eCA9IHtcbiAgICAgIGRlZmF1bHRQcmVmaXg6IFNjaGVtYS5kZWZhdWx0UHJlZml4LFxuICAgICAgc2NoZW1hOiB0aGlzLFxuICAgICAgd3JhcFNjYWxhcnNcbiAgICB9O1xuICAgIGNvbnN0IGNyZWF0ZUN0eCA9IGN0eCA/IE9iamVjdC5hc3NpZ24oY3R4LCBiYXNlQ3R4KSA6IGJhc2VDdHg7XG4gICAgcmV0dXJuIGNyZWF0ZU5vZGUodmFsdWUsIHRhZ05hbWUsIGNyZWF0ZUN0eCk7XG4gIH1cblxuICBjcmVhdGVQYWlyKGtleSwgdmFsdWUsIGN0eCkge1xuICAgIGlmICghY3R4KSBjdHggPSB7XG4gICAgICB3cmFwU2NhbGFyczogdHJ1ZVxuICAgIH07XG4gICAgY29uc3QgayA9IHRoaXMuY3JlYXRlTm9kZShrZXksIGN0eC53cmFwU2NhbGFycywgbnVsbCwgY3R4KTtcbiAgICBjb25zdCB2ID0gdGhpcy5jcmVhdGVOb2RlKHZhbHVlLCBjdHgud3JhcFNjYWxhcnMsIG51bGwsIGN0eCk7XG4gICAgcmV0dXJuIG5ldyByZXNvbHZlU2VxLlBhaXIoaywgdik7XG4gIH1cblxufVxuXG5QbGFpblZhbHVlLl9kZWZpbmVQcm9wZXJ0eShTY2hlbWEsIFwiZGVmYXVsdFByZWZpeFwiLCBQbGFpblZhbHVlLmRlZmF1bHRUYWdQcmVmaXgpO1xuXG5QbGFpblZhbHVlLl9kZWZpbmVQcm9wZXJ0eShTY2hlbWEsIFwiZGVmYXVsdFRhZ3NcIiwgUGxhaW5WYWx1ZS5kZWZhdWx0VGFncyk7XG5cbmV4cG9ydHMuU2NoZW1hID0gU2NoZW1hO1xuIiwgIid1c2Ugc3RyaWN0JztcblxudmFyIHJlc29sdmVTZXEgPSByZXF1aXJlKCcuL3Jlc29sdmVTZXEtZDAzY2IwMzcuanMnKTtcbnZhciBTY2hlbWEgPSByZXF1aXJlKCcuL1NjaGVtYS04OGUzMjNhNy5qcycpO1xucmVxdWlyZSgnLi9QbGFpblZhbHVlLWVjOGU1ODhlLmpzJyk7XG5yZXF1aXJlKCcuL3dhcm5pbmdzLTEwMDBhMzcyLmpzJyk7XG5cblxuXG5leHBvcnRzLkFsaWFzID0gcmVzb2x2ZVNlcS5BbGlhcztcbmV4cG9ydHMuQ29sbGVjdGlvbiA9IHJlc29sdmVTZXEuQ29sbGVjdGlvbjtcbmV4cG9ydHMuTWVyZ2UgPSByZXNvbHZlU2VxLk1lcmdlO1xuZXhwb3J0cy5Ob2RlID0gcmVzb2x2ZVNlcS5Ob2RlO1xuZXhwb3J0cy5QYWlyID0gcmVzb2x2ZVNlcS5QYWlyO1xuZXhwb3J0cy5TY2FsYXIgPSByZXNvbHZlU2VxLlNjYWxhcjtcbmV4cG9ydHMuWUFNTE1hcCA9IHJlc29sdmVTZXEuWUFNTE1hcDtcbmV4cG9ydHMuWUFNTFNlcSA9IHJlc29sdmVTZXEuWUFNTFNlcTtcbmV4cG9ydHMuYmluYXJ5T3B0aW9ucyA9IHJlc29sdmVTZXEuYmluYXJ5T3B0aW9ucztcbmV4cG9ydHMuYm9vbE9wdGlvbnMgPSByZXNvbHZlU2VxLmJvb2xPcHRpb25zO1xuZXhwb3J0cy5pbnRPcHRpb25zID0gcmVzb2x2ZVNlcS5pbnRPcHRpb25zO1xuZXhwb3J0cy5udWxsT3B0aW9ucyA9IHJlc29sdmVTZXEubnVsbE9wdGlvbnM7XG5leHBvcnRzLnN0ck9wdGlvbnMgPSByZXNvbHZlU2VxLnN0ck9wdGlvbnM7XG5leHBvcnRzLlNjaGVtYSA9IFNjaGVtYS5TY2hlbWE7XG4iLCAiY29uc3QgREVQRU5ERU5DSUVTID0ge307XG5cbmV4cG9ydCBjb25zdCBnZXREZXBlbmRlbmNpZXMgPSAoKSA9PiB7XG4gIHJldHVybiBERVBFTkRFTkNJRVM7XG59O1xuXG5leHBvcnQgY29uc3Qgc2V0RGVwZW5kZW5jaWVzID0gdmFsdWUgPT4ge1xuICBPYmplY3QuYXNzaWduKERFUEVOREVOQ0lFUywgdmFsdWUpO1xufTtcbiIsICIvKipcbiAqIFRoaXMgY2xhc3MgZGVmaW5lcyBhIHJlZ2lzdHJ5IGZvciBjdXN0b20gZm9ybWF0cyB1c2VkIHdpdGhpbiBKU0YuXG4gKi9cbmNsYXNzIFJlZ2lzdHJ5IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgLy8gZW1wdHkgYnkgZGVmYXVsdFxuICAgIHRoaXMuZGF0YSA9IHt9O1xuICB9XG5cbiAgLyoqXG4gICAqIFVucmVnaXN0ZXJzIGN1c3RvbSBmb3JtYXQocylcbiAgICogQHBhcmFtIG5hbWVcbiAgICovXG4gIHVucmVnaXN0ZXIobmFtZSkge1xuICAgIGlmICghbmFtZSkge1xuICAgICAgdGhpcy5kYXRhID0ge307XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlbGV0ZSB0aGlzLmRhdGFbbmFtZV07XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVycyBjdXN0b20gZm9ybWF0XG4gICAqL1xuICByZWdpc3RlcihuYW1lLCBjYWxsYmFjaykge1xuICAgIHRoaXMuZGF0YVtuYW1lXSA9IGNhbGxiYWNrO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVyIG1hbnkgZm9ybWF0cyBhdCBvbmUgc2hvdFxuICAgKi9cbiAgcmVnaXN0ZXJNYW55KGZvcm1hdHMpIHtcbiAgICBPYmplY3Qua2V5cyhmb3JtYXRzKS5mb3JFYWNoKG5hbWUgPT4ge1xuICAgICAgdGhpcy5kYXRhW25hbWVdID0gZm9ybWF0c1tuYW1lXTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGVsZW1lbnQgYnkgcmVnaXN0cnkga2V5XG4gICAqL1xuICBnZXQobmFtZSkge1xuICAgIGNvbnN0IGZvcm1hdCA9IHRoaXMuZGF0YVtuYW1lXTtcblxuICAgIHJldHVybiBmb3JtYXQ7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgd2hvbGUgcmVnaXN0cnkgY29udGVudFxuICAgKi9cbiAgbGlzdCgpIHtcbiAgICByZXR1cm4gdGhpcy5kYXRhO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFJlZ2lzdHJ5O1xuIiwgImNvbnN0IGRlZmF1bHRzID0ge307XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmF1bHRzO1xuXG5kZWZhdWx0cy5kZWZhdWx0SW52YWxpZFR5cGVQcm9kdWN0ID0gdW5kZWZpbmVkO1xuZGVmYXVsdHMuZGVmYXVsdFJhbmRFeHBNYXggPSAxMDtcblxuZGVmYXVsdHMucHJ1bmVQcm9wZXJ0aWVzID0gW107XG5kZWZhdWx0cy5pZ25vcmVQcm9wZXJ0aWVzID0gW107XG5kZWZhdWx0cy5pZ25vcmVNaXNzaW5nUmVmcyA9IGZhbHNlO1xuZGVmYXVsdHMuZmFpbE9uSW52YWxpZFR5cGVzID0gdHJ1ZTtcbmRlZmF1bHRzLmZhaWxPbkludmFsaWRGb3JtYXQgPSB0cnVlO1xuXG5kZWZhdWx0cy5hbHdheXNGYWtlT3B0aW9uYWxzID0gZmFsc2U7XG5kZWZhdWx0cy5vcHRpb25hbHNQcm9iYWJpbGl0eSA9IG51bGw7XG5kZWZhdWx0cy5maXhlZFByb2JhYmlsaXRpZXMgPSBmYWxzZTtcbmRlZmF1bHRzLnVzZUV4YW1wbGVzVmFsdWUgPSBmYWxzZTtcbmRlZmF1bHRzLnVzZURlZmF1bHRWYWx1ZSA9IGZhbHNlO1xuZGVmYXVsdHMucmVxdWlyZWRPbmx5ID0gZmFsc2U7XG5kZWZhdWx0cy5vbWl0TnVsbHMgPSBmYWxzZTtcblxuZGVmYXVsdHMubWluSXRlbXMgPSAwO1xuZGVmYXVsdHMubWF4SXRlbXMgPSBudWxsO1xuZGVmYXVsdHMubWluTGVuZ3RoID0gMDtcbmRlZmF1bHRzLm1heExlbmd0aCA9IG51bGw7XG5cbmRlZmF1bHRzLnJlc29sdmVKc29uUGF0aCA9IGZhbHNlO1xuZGVmYXVsdHMucmV1c2VQcm9wZXJ0aWVzID0gZmFsc2U7XG5kZWZhdWx0cy5maWxsUHJvcGVydGllcyA9IHRydWU7XG5kZWZhdWx0cy5zb3J0UHJvcGVydGllcyA9IGZhbHNlO1xuZGVmYXVsdHMucmVwbGFjZUVtcHR5QnlSYW5kb21WYWx1ZSA9IGZhbHNlO1xuXG5kZWZhdWx0cy5yYW5kb20gPSBNYXRoLnJhbmRvbTtcbmRlZmF1bHRzLm1pbkRhdGVUaW1lID0gbmV3IERhdGUoJzE4ODktMTItMzFUMDA6MDA6MDAuMDAwWicpO1xuZGVmYXVsdHMubWF4RGF0ZVRpbWUgPSBuZXcgRGF0ZSgnMTk3MC0wMS0wMVQwMDowMDowMS4wMDBaJyk7XG5cbmRlZmF1bHRzLnJlbmRlclRpdGxlID0gdHJ1ZTtcbmRlZmF1bHRzLnJlbmRlckRlc2NyaXB0aW9uID0gdHJ1ZTtcbmRlZmF1bHRzLnJlbmRlckNvbW1lbnQgPSBmYWxzZTtcbiIsICJpbXBvcnQgUmVnaXN0cnkgZnJvbSAnLi9SZWdpc3RyeS5tanMnO1xuaW1wb3J0IGRlZmF1bHRzIGZyb20gJy4uL2FwaS9kZWZhdWx0cy5tanMnO1xuXG4vKipcbiAqIFRoaXMgY2xhc3MgZGVmaW5lcyBhIHJlZ2lzdHJ5IGZvciBjdXN0b20gc2V0dGluZ3MgdXNlZCB3aXRoaW4gSlNGLlxuICovXG5jbGFzcyBPcHRpb25SZWdpc3RyeSBleHRlbmRzIFJlZ2lzdHJ5IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmRhdGEgPSB7IC4uLmRlZmF1bHRzIH07XG4gICAgdGhpcy5fZGVmYXVsdHMgPSBkZWZhdWx0cztcbiAgfVxuXG4gIGdldCBkZWZhdWx0cygpIHtcbiAgICByZXR1cm4geyAuLi50aGlzLl9kZWZhdWx0cyB9O1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE9wdGlvblJlZ2lzdHJ5O1xuIiwgImltcG9ydCBPcHRpb25SZWdpc3RyeSBmcm9tICcuLi9jbGFzcy9PcHRpb25SZWdpc3RyeS5tanMnO1xuXG4vLyBpbnN0YW50aWF0ZVxuY29uc3QgcmVnaXN0cnkgPSBuZXcgT3B0aW9uUmVnaXN0cnkoKTtcblxuLyoqXG4gKiBDdXN0b20gb3B0aW9uIEFQSVxuICpcbiAqIEBwYXJhbSBuYW1lT3JPcHRpb25NYXBcbiAqIEByZXR1cm5zIHthbnl9XG4gKi9cbmZ1bmN0aW9uIG9wdGlvbkFQSShuYW1lT3JPcHRpb25NYXAsIG9wdGlvbmFsVmFsdWUpIHtcbiAgaWYgKHR5cGVvZiBuYW1lT3JPcHRpb25NYXAgPT09ICdzdHJpbmcnKSB7XG4gICAgaWYgKHR5cGVvZiBvcHRpb25hbFZhbHVlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgcmV0dXJuIHJlZ2lzdHJ5LnJlZ2lzdGVyKG5hbWVPck9wdGlvbk1hcCwgb3B0aW9uYWxWYWx1ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlZ2lzdHJ5LmdldChuYW1lT3JPcHRpb25NYXApO1xuICB9XG5cbiAgcmV0dXJuIHJlZ2lzdHJ5LnJlZ2lzdGVyTWFueShuYW1lT3JPcHRpb25NYXApO1xufVxuXG5vcHRpb25BUEkuZ2V0RGVmYXVsdHMgPSAoKSA9PiByZWdpc3RyeS5kZWZhdWx0cztcblxuZXhwb3J0IGRlZmF1bHQgb3B0aW9uQVBJO1xuIiwgImNvbnN0IEFMTE9XRURfVFlQRVMgPSBbJ2ludGVnZXInLCAnbnVtYmVyJywgJ3N0cmluZycsICdib29sZWFuJ107XG5jb25zdCBTQ0FMQVJfVFlQRVMgPSBBTExPV0VEX1RZUEVTLmNvbmNhdChbJ251bGwnXSk7XG5jb25zdCBBTExfVFlQRVMgPSBbJ2FycmF5JywgJ29iamVjdCddLmNvbmNhdChTQ0FMQVJfVFlQRVMpO1xuXG5jb25zdCBNT1NUX05FQVJfREFURVRJTUUgPSAyNTI0NjA4MDAwMDAwO1xuXG5jb25zdCBNSU5fSU5URUdFUiA9IC0xMDAwMDAwMDA7XG5jb25zdCBNQVhfSU5URUdFUiA9IDEwMDAwMDAwMDtcblxuY29uc3QgTUlOX05VTUJFUiA9IC0xMDA7XG5jb25zdCBNQVhfTlVNQkVSID0gMTAwO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIEFMTE9XRURfVFlQRVMsXG4gIFNDQUxBUl9UWVBFUyxcbiAgQUxMX1RZUEVTLFxuICBNSU5fTlVNQkVSLFxuICBNQVhfTlVNQkVSLFxuICBNSU5fSU5URUdFUixcbiAgTUFYX0lOVEVHRVIsXG4gIE1PU1RfTkVBUl9EQVRFVElNRSxcbn07XG4iLCAiaW1wb3J0IFJhbmRFeHAgZnJvbSAncmFuZGV4cCc7XG5cbmltcG9ydCBvcHRpb25BUEkgZnJvbSAnLi4vYXBpL29wdGlvbi5tanMnO1xuaW1wb3J0IGVudiBmcm9tICcuL2NvbnN0YW50cy5tanMnO1xuXG5mdW5jdGlvbiBnZXRSYW5kb21JbnRlZ2VyKG1pbiwgbWF4KSB7XG4gIG1pbiA9IHR5cGVvZiBtaW4gPT09ICd1bmRlZmluZWQnID8gZW52Lk1JTl9JTlRFR0VSIDogbWluO1xuICBtYXggPSB0eXBlb2YgbWF4ID09PSAndW5kZWZpbmVkJyA/IGVudi5NQVhfSU5URUdFUiA6IG1heDtcblxuICByZXR1cm4gTWF0aC5mbG9vcihvcHRpb25BUEkoJ3JhbmRvbScpKCkgKiAoKG1heCAtIG1pbikgKyAxKSkgKyBtaW47XG59XG5cbmZ1bmN0aW9uIF9yYW5kZXhwKHZhbHVlKSB7XG4gIC8vIHNldCBtYXhpbXVtIGRlZmF1bHQsIHNlZSAjMTkzXG4gIFJhbmRFeHAucHJvdG90eXBlLm1heCA9IG9wdGlvbkFQSSgnZGVmYXVsdFJhbmRFeHBNYXgnKTtcblxuICAvLyBzYW1lIGltcGxlbWVudGF0aW9uIGFzIHRoZSBvcmlnaW5hbCBleGNlcHQgdXNpbmcgb3VyIHJhbmRvbVxuICBSYW5kRXhwLnByb3RvdHlwZS5yYW5kSW50ID0gKGEsIGIpID0+IGEgKyBNYXRoLmZsb29yKG9wdGlvbkFQSSgncmFuZG9tJykoKSAqICgxICsgKGIgLSBhKSkpO1xuXG4gIGNvbnN0IHJlID0gbmV3IFJhbmRFeHAodmFsdWUpO1xuXG4gIHJldHVybiByZS5nZW4oKTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHJhbmRvbSBlbGVtZW50IG9mIGEgY29sbGVjdGlvblxuICpcbiAqIEBwYXJhbSBjb2xsZWN0aW9uXG4gKiBAcmV0dXJucyB7VH1cbiAqL1xuZnVuY3Rpb24gcGljayhjb2xsZWN0aW9uKSB7XG4gIHJldHVybiBjb2xsZWN0aW9uW01hdGguZmxvb3Iob3B0aW9uQVBJKCdyYW5kb20nKSgpICogY29sbGVjdGlvbi5sZW5ndGgpXTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHNodWZmbGVkIGNvbGxlY3Rpb24gb2YgZWxlbWVudHNcbiAqXG4gKiBAcGFyYW0gY29sbGVjdGlvblxuICogQHJldHVybnMge1RbXX1cbiAqL1xuZnVuY3Rpb24gc2h1ZmZsZShjb2xsZWN0aW9uKSB7XG4gIGxldCB0bXA7XG4gIGxldCBrZXk7XG4gIGxldCBsZW5ndGggPSBjb2xsZWN0aW9uLmxlbmd0aDtcblxuICBjb25zdCBjb3B5ID0gY29sbGVjdGlvbi5zbGljZSgpO1xuXG4gIGZvciAoOyBsZW5ndGggPiAwOykge1xuICAgIGtleSA9IE1hdGguZmxvb3Iob3B0aW9uQVBJKCdyYW5kb20nKSgpICogbGVuZ3RoKTtcbiAgICAvLyBzd2FwXG4gICAgbGVuZ3RoIC09IDE7XG4gICAgdG1wID0gY29weVtsZW5ndGhdO1xuICAgIGNvcHlbbGVuZ3RoXSA9IGNvcHlba2V5XTtcbiAgICBjb3B5W2tleV0gPSB0bXA7XG4gIH1cblxuICByZXR1cm4gY29weTtcbn1cblxuXG4vKipcbiAqIFJldHVybnMgYSByYW5kb20gaW50ZWdlciBiZXR3ZWVuIG1pbiAoaW5jbHVzaXZlKSBhbmQgbWF4IChpbmNsdXNpdmUpXG4gKiBVc2luZyBNYXRoLnJvdW5kKCkgd2lsbCBnaXZlIHlvdSBhIG5vbi11bmlmb3JtIGRpc3RyaWJ1dGlvbiFcbiAqIEBzZWUgaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMTUyNzgyMC83NjkzODRcbiAqL1xuZnVuY3Rpb24gZ2V0UmFuZG9tKG1pbiwgbWF4KSB7XG4gIHJldHVybiAob3B0aW9uQVBJKCdyYW5kb20nKSgpICogKG1heCAtIG1pbikpICsgbWluO1xufVxuXG4vKipcbiAqIEdlbmVyYXRlcyByYW5kb20gbnVtYmVyIGFjY29yZGluZyB0byBwYXJhbWV0ZXJzIHBhc3NlZFxuICpcbiAqIEBwYXJhbSBtaW5cbiAqIEBwYXJhbSBtYXhcbiAqIEBwYXJhbSBkZWZNaW5cbiAqIEBwYXJhbSBkZWZNYXhcbiAqIEBwYXJhbSBoYXNQcmVjaXNpb25cbiAqIEByZXR1cm5zIHtudW1iZXJ9XG4gKi9cbmZ1bmN0aW9uIG51bWJlcihtaW4sIG1heCwgZGVmTWluLCBkZWZNYXgsIGhhc1ByZWNpc2lvbiA9IGZhbHNlKSB7XG4gIGRlZk1pbiA9IHR5cGVvZiBkZWZNaW4gPT09ICd1bmRlZmluZWQnID8gZW52Lk1JTl9OVU1CRVIgOiBkZWZNaW47XG4gIGRlZk1heCA9IHR5cGVvZiBkZWZNYXggPT09ICd1bmRlZmluZWQnID8gZW52Lk1BWF9OVU1CRVIgOiBkZWZNYXg7XG5cbiAgbWluID0gdHlwZW9mIG1pbiA9PT0gJ3VuZGVmaW5lZCcgPyBkZWZNaW4gOiBtaW47XG4gIG1heCA9IHR5cGVvZiBtYXggPT09ICd1bmRlZmluZWQnID8gZGVmTWF4IDogbWF4O1xuXG4gIGlmIChtYXggPCBtaW4pIHtcbiAgICBtYXggKz0gbWluO1xuICB9XG5cbiAgaWYgKGhhc1ByZWNpc2lvbikge1xuICAgIHJldHVybiBnZXRSYW5kb20obWluLCBtYXgpO1xuICB9XG5cbiAgcmV0dXJuIGdldFJhbmRvbUludGVnZXIobWluLCBtYXgpO1xufVxuXG5mdW5jdGlvbiBieSh0eXBlKSB7XG4gIHN3aXRjaCAodHlwZSkge1xuICAgIGNhc2UgJ3NlY29uZHMnOlxuICAgICAgcmV0dXJuIG51bWJlcigwLCA2MCkgKiA2MDtcblxuICAgIGNhc2UgJ21pbnV0ZXMnOlxuICAgICAgcmV0dXJuIG51bWJlcigxNSwgNTApICogNjEyO1xuXG4gICAgY2FzZSAnaG91cnMnOlxuICAgICAgcmV0dXJuIG51bWJlcigxMiwgNzIpICogMzYxMjM7XG5cbiAgICBjYXNlICdkYXlzJzpcbiAgICAgIHJldHVybiBudW1iZXIoNywgMzApICogODY0MTIzNDU7XG5cbiAgICBjYXNlICd3ZWVrcyc6XG4gICAgICByZXR1cm4gbnVtYmVyKDQsIDUyKSAqIDYwNDgxMjM0NTtcblxuICAgIGNhc2UgJ21vbnRocyc6XG4gICAgICByZXR1cm4gbnVtYmVyKDIsIDEzKSAqIDI1OTIwMTIzNDU7XG5cbiAgICBjYXNlICd5ZWFycyc6XG4gICAgICByZXR1cm4gbnVtYmVyKDEsIDIwKSAqIDMxMTA0MDEyMzQ1O1xuXG4gICAgZGVmYXVsdDogYnJlYWs7XG4gIH1cbn1cblxuZnVuY3Rpb24gZGF0ZShzdGVwKSB7XG4gIGlmIChzdGVwKSB7XG4gICAgcmV0dXJuIGJ5KHN0ZXApO1xuICB9XG5cbiAgbGV0IGVhcmxpZXN0ID0gb3B0aW9uQVBJKCdtaW5EYXRlVGltZScpO1xuICBsZXQgbGF0ZXN0ID0gb3B0aW9uQVBJKCdtYXhEYXRlVGltZScpO1xuXG4gIC8vIGNvbnZlcnQgdG8gZGF0ZSBpZiBzdHJpbmdcbiAgaWYgKHR5cGVvZiBlYXJsaWVzdCA9PT0gJ3N0cmluZycpIHtcbiAgICBlYXJsaWVzdCA9IG5ldyBEYXRlKGVhcmxpZXN0KTtcbiAgfVxuICBpZiAodHlwZW9mIGxhdGVzdCA9PT0gJ3N0cmluZycpIHtcbiAgICBsYXRlc3QgPSBuZXcgRGF0ZShsYXRlc3QpO1xuICB9XG5cbiAgY29uc3Qgbm93ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gIC8vIGNvbnZlcnQgdG8gZGF0ZSBpZiBudW1iZXJcbiAgaWYgKHR5cGVvZiBlYXJsaWVzdCA9PT0gJ251bWJlcicpIHtcbiAgICBlYXJsaWVzdCA9IG5ldyBEYXRlKG5vdyArIGVhcmxpZXN0KTtcbiAgfVxuICBpZiAodHlwZW9mIGxhdGVzdCA9PT0gJ251bWJlcicpIHtcbiAgICBsYXRlc3QgPSBuZXcgRGF0ZShub3cgKyBsYXRlc3QpO1xuICB9XG5cbiAgcmV0dXJuIG5ldyBEYXRlKGdldFJhbmRvbShlYXJsaWVzdC5nZXRUaW1lKCksIGxhdGVzdC5nZXRUaW1lKCkpKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBwaWNrLFxuICBkYXRlLFxuICBzaHVmZmxlLFxuICBudW1iZXIsXG4gIHJhbmRleHA6IF9yYW5kZXhwLFxufTtcbiIsICJpbXBvcnQgb3B0aW9uQVBJIGZyb20gJy4uL2FwaS9vcHRpb24ubWpzJztcbmltcG9ydCBlbnYgZnJvbSAnLi9jb25zdGFudHMubWpzJztcbmltcG9ydCByYW5kb20gZnJvbSAnLi9yYW5kb20ubWpzJztcblxuY29uc3QgUkVfTlVNRVJJQyA9IC9eKDB8WzEtOV1bMC05XSopJC87XG5cbmZ1bmN0aW9uIGdldExvY2FsUmVmKG9iaiwgcGF0aCwgcmVmcykge1xuICBwYXRoID0gZGVjb2RlVVJJQ29tcG9uZW50KHBhdGgpO1xuXG4gIGlmIChyZWZzICYmIHJlZnNbcGF0aF0pIHJldHVybiBjbG9uZShyZWZzW3BhdGhdKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuXG4gIGNvbnN0IGtleUVsZW1lbnRzID0gcGF0aC5yZXBsYWNlKCcjLycsICcvJykuc3BsaXQoJy8nKTtcblxuICBsZXQgc2NoZW1hID0gKG9iai4kcmVmICYmIHJlZnMgJiYgcmVmc1tvYmouJHJlZl0pIHx8IG9iajtcbiAgaWYgKCFzY2hlbWEgJiYgIWtleUVsZW1lbnRzWzBdKSB7XG4gICAga2V5RWxlbWVudHNbMF0gPSBvYmouJHJlZi5zcGxpdCgnIy8nKVswXTtcbiAgfVxuICBpZiAocmVmcyAmJiBwYXRoLmluY2x1ZGVzKCcjLycpICYmIHJlZnNba2V5RWxlbWVudHNbMF1dKSB7XG4gICAgc2NoZW1hID0gcmVmc1trZXlFbGVtZW50cy5zaGlmdCgpXTtcbiAgfVxuXG4gIGlmICgha2V5RWxlbWVudHNbMF0pIGtleUVsZW1lbnRzLnNoaWZ0KCk7XG5cbiAgd2hpbGUgKHNjaGVtYSAmJiBrZXlFbGVtZW50cy5sZW5ndGggPiAwKSB7XG4gICAgY29uc3QgcHJvcCA9IGtleUVsZW1lbnRzLnNoaWZ0KCk7XG5cbiAgICBpZiAoIXNjaGVtYVtwcm9wXSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBQcm9wIG5vdCBmb3VuZDogJHtwcm9wfSAoJHtwYXRofSlgKTtcbiAgICB9XG5cbiAgICBzY2hlbWEgPSBzY2hlbWFbcHJvcF07XG4gIH1cbiAgcmV0dXJuIHNjaGVtYTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRydWUvZmFsc2UgaWYgZ2l2ZW4gdmFsdWUgY2FuIGJlIHRyZWF0ZWQgYXMgbnVtYmVyL2ludGVnZXJcbiAqXG4gKiBAcGFyYW0gdmFsdWVcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBpc051bWVyaWModmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgJiYgUkVfTlVNRVJJQy50ZXN0KHZhbHVlKTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRydWUvZmFsc2UgaWYgZ2l2ZW4gdmFsdWUgaXMgYSBudW1iZXIgb3IgYm9vbGVhblxuICpcbiAqIEBwYXJhbSB2YWx1ZVxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGlzU2NhbGFyKHZhbHVlKSB7XG4gIHJldHVybiBbJ251bWJlcicsICdib29sZWFuJ10uaW5jbHVkZXModHlwZW9mIHZhbHVlKTtcbn1cblxuIC8qKlxuICogUmV0dXJucyB0cnVlL2ZhbHNlIHdoZXRoZXIgdGhlIG9iamVjdCBwYXJhbWV0ZXIgaGFzIGl0cyBvd24gcHJvcGVydGllcyBkZWZpbmVkXG4gKlxuICogQHBhcmFtIG9ialxuICogQHBhcmFtIHByb3BlcnRpZXNcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBoYXNQcm9wZXJ0aWVzKG9iaiwgLi4ucHJvcGVydGllcykge1xuICByZXR1cm4gcHJvcGVydGllcy5maWx0ZXIoa2V5ID0+IHtcbiAgICByZXR1cm4gdHlwZW9mIG9ialtrZXldICE9PSAndW5kZWZpbmVkJztcbiAgfSkubGVuZ3RoID4gMDtcbn1cblxuLyoqXG4gKiBOb3JtYWxpemUgZ2VuZXJhdGVkIGRhdGUgWVlZWS1NTS1ERCB0byBub3QgaGF2ZVxuICogb3V0IG9mIHJhbmdlIHZhbHVlc1xuICpcbiAqIEBwYXJhbSB2YWx1ZVxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gY2xhbXBEYXRlKHZhbHVlKSB7XG4gIGlmICh2YWx1ZS5pbmNsdWRlcygnICcpKSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKHZhbHVlKS50b0lTT1N0cmluZygpLnN1YnN0cigwLCAxMCk7XG4gIH1cblxuICBsZXQgW3llYXIsIG1vbnRoLCBkYXldID0gdmFsdWUuc3BsaXQoJ1QnKVswXS5zcGxpdCgnLScpO1xuXG4gIG1vbnRoID0gYDAke01hdGgubWF4KDEsIE1hdGgubWluKDEyLCBtb250aCkpfWAuc2xpY2UoLTIpO1xuICBkYXkgPSBgMCR7TWF0aC5tYXgoMSwgTWF0aC5taW4oMzEsIGRheSkpfWAuc2xpY2UoLTIpO1xuXG4gIHJldHVybiBgJHt5ZWFyfS0ke21vbnRofS0ke2RheX1gO1xufVxuXG4vKipcbiAqIE5vcm1hbGl6ZSBnZW5lcmF0ZWQgZGF0ZS10aW1lIHZhbHVlcyBZWVlZLU1NLUREVEhIOm1tOnNzIHRvIG5vdCBoYXZlXG4gKiBvdXQgb2YgcmFuZ2UgdmFsdWVzXG4gKlxuICogQHBhcmFtIHZhbHVlXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBjbGFtcERhdGVUaW1lKHZhbHVlKSB7XG4gIGlmICh2YWx1ZS5pbmNsdWRlcygnICcpKSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKHZhbHVlKS50b0lTT1N0cmluZygpLnN1YnN0cigwLCAxMCk7XG4gIH1cblxuICBjb25zdCBbZGF0ZVBhcnQsIHRpbWVQYXJ0XSA9IHZhbHVlLnNwbGl0KCdUJyk7XG4gIGxldCBbeWVhciwgbW9udGgsIGRheV0gPSBkYXRlUGFydC5zcGxpdCgnLScpO1xuICBsZXQgW2hvdXIsIG1pbnV0ZSwgc2Vjb25kXSA9IHRpbWVQYXJ0LnN1YnN0cigwLCA4KS5zcGxpdCgnOicpO1xuXG4gIG1vbnRoID0gYDAke01hdGgubWF4KDEsIE1hdGgubWluKDEyLCBtb250aCkpfWAuc2xpY2UoLTIpO1xuICBkYXkgPSBgMCR7TWF0aC5tYXgoMSwgTWF0aC5taW4oMzEsIGRheSkpfWAuc2xpY2UoLTIpO1xuICBob3VyID0gYDAke01hdGgubWF4KDEsIE1hdGgubWluKDIzLCBob3VyKSl9YC5zbGljZSgtMik7XG4gIG1pbnV0ZSA9IGAwJHtNYXRoLm1heCgxLCBNYXRoLm1pbig1OSwgbWludXRlKSl9YC5zbGljZSgtMik7XG4gIHNlY29uZCA9IGAwJHtNYXRoLm1heCgxLCBNYXRoLm1pbig1OSwgc2Vjb25kKSl9YC5zbGljZSgtMik7XG5cbiAgcmV0dXJuIGAke3llYXJ9LSR7bW9udGh9LSR7ZGF5fVQke2hvdXJ9OiR7bWludXRlfToke3NlY29uZH0uMDAwWmA7XG59XG5cbi8qKlxuICogUmV0dXJucyB0eXBlY2FzdGVkIHZhbHVlLlxuICogRXh0ZXJuYWwgZ2VuZXJhdG9ycyAoZmFrZXIsIGNoYW5jZSwgY2FzdWFsKSBtYXkgcmV0dXJuIGRhdGEgaW4gbm9uLWV4cGVjdGVkIGZvcm1hdHMsIHN1Y2ggYXMgc3RyaW5nLCB3aGVuIHlvdSBtaWdodCBleHBlY3QgYW5cbiAqIGludGVnZXIuIFRoaXMgZnVuY3Rpb24gaXMgdXNlZCB0byBmb3JjZSB0aGUgdHlwZWNhc3QuIFRoaXMgaXMgdGhlIGJhc2UgZm9ybWF0dGVyIGZvciBhbGwgcmVzdWx0IHZhbHVlcy5cbiAqXG4gKiBAcGFyYW0gdHlwZVxuICogQHBhcmFtIHNjaGVtYVxuICogQHBhcmFtIGNhbGxiYWNrXG4gKiBAcmV0dXJucyB7YW55fVxuICovXG5mdW5jdGlvbiB0eXBlY2FzdCh0eXBlLCBzY2hlbWEsIGNhbGxiYWNrKSB7XG4gIGNvbnN0IHBhcmFtcyA9IHt9O1xuXG4gIC8vIG5vcm1hbGl6ZSBjb25zdHJhaW50c1xuICBzd2l0Y2ggKHR5cGUgfHwgc2NoZW1hLnR5cGUpIHtcbiAgICBjYXNlICdpbnRlZ2VyJzpcbiAgICBjYXNlICdudW1iZXInOlxuICAgICAgaWYgKHR5cGVvZiBzY2hlbWEubWluaW11bSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcGFyYW1zLm1pbmltdW0gPSBzY2hlbWEubWluaW11bTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBzY2hlbWEubWF4aW11bSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcGFyYW1zLm1heGltdW0gPSBzY2hlbWEubWF4aW11bTtcbiAgICAgIH1cblxuICAgICAgaWYgKHNjaGVtYS5lbnVtKSB7XG4gICAgICAgIGxldCBtaW4gPSBNYXRoLm1heChwYXJhbXMubWluaW11bSB8fCAwLCAwKTtcbiAgICAgICAgbGV0IG1heCA9IE1hdGgubWluKHBhcmFtcy5tYXhpbXVtIHx8IEluZmluaXR5LCBJbmZpbml0eSk7XG5cbiAgICAgICAgaWYgKHNjaGVtYS5leGNsdXNpdmVNaW5pbXVtICYmIG1pbiA9PT0gc2NoZW1hLm1pbmltdW0pIHtcbiAgICAgICAgICBtaW4gKz0gc2NoZW1hLm11bHRpcGxlT2YgfHwgMTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzY2hlbWEuZXhjbHVzaXZlTWF4aW11bSAmJiBtYXggPT09IHNjaGVtYS5tYXhpbXVtKSB7XG4gICAgICAgICAgbWF4IC09IHNjaGVtYS5tdWx0aXBsZU9mIHx8IDE7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBkaXNjYXJkIG91dC1vZi1ib3VuZHMgZW51bWVyYXRpb25zXG4gICAgICAgIGlmIChtaW4gfHwgbWF4ICE9PSBJbmZpbml0eSkge1xuICAgICAgICAgIHNjaGVtYS5lbnVtID0gc2NoZW1hLmVudW0uZmlsdGVyKHggPT4ge1xuICAgICAgICAgICAgaWYgKHggPj0gbWluICYmIHggPD0gbWF4KSB7XG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlICdzdHJpbmcnOiB7XG4gICAgICBwYXJhbXMubWluTGVuZ3RoID0gb3B0aW9uQVBJKCdtaW5MZW5ndGgnKSB8fCAwO1xuICAgICAgcGFyYW1zLm1heExlbmd0aCA9IG9wdGlvbkFQSSgnbWF4TGVuZ3RoJykgfHwgTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVI7XG5cbiAgICAgIGlmICh0eXBlb2Ygc2NoZW1hLm1pbkxlbmd0aCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcGFyYW1zLm1pbkxlbmd0aCA9IE1hdGgubWF4KHBhcmFtcy5taW5MZW5ndGgsIHNjaGVtYS5taW5MZW5ndGgpO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIHNjaGVtYS5tYXhMZW5ndGggIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHBhcmFtcy5tYXhMZW5ndGggPSBNYXRoLm1pbihwYXJhbXMubWF4TGVuZ3RoLCBzY2hlbWEubWF4TGVuZ3RoKTtcbiAgICAgIH1cblxuICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgZGVmYXVsdDogYnJlYWs7XG4gIH1cblxuICAvLyBleGVjdXRlIGdlbmVyYXRvclxuICBsZXQgdmFsdWUgPSBjYWxsYmFjayhwYXJhbXMpO1xuXG4gIC8vIGFsbG93IG51bGwgdmFsdWVzIHRvIGJlIHJldHVybmVkXG4gIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvLyBub3JtYWxpemUgb3V0cHV0IHZhbHVlXG4gIHN3aXRjaCAodHlwZSB8fCBzY2hlbWEudHlwZSkge1xuICAgIGNhc2UgJ251bWJlcic6XG4gICAgICB2YWx1ZSA9IGlzTnVtZXJpYyh2YWx1ZSkgPyBwYXJzZUZsb2F0KHZhbHVlKSA6IHZhbHVlO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlICdpbnRlZ2VyJzpcbiAgICAgIHZhbHVlID0gaXNOdW1lcmljKHZhbHVlKSA/IHBhcnNlSW50KHZhbHVlLCAxMCkgOiB2YWx1ZTtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICB2YWx1ZSA9ICEhdmFsdWU7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgJ3N0cmluZyc6IHtcbiAgICAgIGlmIChpc1NjYWxhcih2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgfVxuXG4gICAgICB2YWx1ZSA9IFN0cmluZyh2YWx1ZSk7XG5cbiAgICAgIGNvbnN0IG1pbiA9IE1hdGgubWF4KHBhcmFtcy5taW5MZW5ndGggfHwgMCwgMCk7XG4gICAgICBjb25zdCBtYXggPSBNYXRoLm1pbihwYXJhbXMubWF4TGVuZ3RoIHx8IEluZmluaXR5LCBJbmZpbml0eSk7XG5cbiAgICAgIGxldCBwcmV2O1xuICAgICAgbGV0IG5vQ2hhbmdlQ291bnQgPSAwO1xuXG4gICAgICB3aGlsZSAodmFsdWUubGVuZ3RoIDwgbWluKSB7XG4gICAgICAgIHByZXYgPSB2YWx1ZTtcblxuICAgICAgICBpZiAoIXNjaGVtYS5wYXR0ZXJuKSB7XG4gICAgICAgICAgdmFsdWUgKz0gYCR7cmFuZG9tLnBpY2soWycgJywgJy8nLCAnXycsICctJywgJysnLCAnPScsICdAJywgJ14nXSl9JHt2YWx1ZX1gO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhbHVlICs9IHJhbmRvbS5yYW5kZXhwKHNjaGVtYS5wYXR0ZXJuKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGF2b2lkIGluZmluaXRlLWxvb3BzIHdoaWxlIGZpbGxpbmcgc3RyaW5ncywgaWYgbm8gY2hhbmdlc1xuICAgICAgICAvLyBhcmUgbWFkZSB3ZSBqdXN0IGJyZWFrIHRoZSBsb29wLi4uIHNlZSAjNTQwXG4gICAgICAgIGlmICh2YWx1ZSA9PT0gcHJldikge1xuICAgICAgICAgIG5vQ2hhbmdlQ291bnQgKz0gMTtcbiAgICAgICAgICBpZiAobm9DaGFuZ2VDb3VudCA9PT0gMykge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG5vQ2hhbmdlQ291bnQgPSAwO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICh2YWx1ZS5sZW5ndGggPiBtYXgpIHtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZS5zdWJzdHIoMCwgbWF4KTtcbiAgICAgIH1cblxuICAgICAgc3dpdGNoIChzY2hlbWEuZm9ybWF0KSB7XG4gICAgICAgIGNhc2UgJ2RhdGUtdGltZSc6XG4gICAgICAgIGNhc2UgJ2RhdGV0aW1lJzpcbiAgICAgICAgICB2YWx1ZSA9IG5ldyBEYXRlKGNsYW1wRGF0ZVRpbWUodmFsdWUpKS50b0lTT1N0cmluZygpLnJlcGxhY2UoLyhbMC05XSkwK1okLywgJyQxWicpO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ2Z1bGwtZGF0ZSc6XG4gICAgICAgIGNhc2UgJ2RhdGUnOlxuICAgICAgICAgIHZhbHVlID0gbmV3IERhdGUoY2xhbXBEYXRlKHZhbHVlKSkudG9JU09TdHJpbmcoKS5zdWJzdHIoMCwgMTApO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ3RpbWUnOlxuICAgICAgICAgIHZhbHVlID0gbmV3IERhdGUoYDE5NjktMDEtMDEgJHt2YWx1ZX1gKS50b0lTT1N0cmluZygpLnN1YnN0cigxMSk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGRlZmF1bHQ6IGJyZWFrO1xuICB9XG5cbiAgcmV0dXJuIHZhbHVlO1xufVxuXG5mdW5jdGlvbiBtZXJnZShhLCBiKSB7XG4gIE9iamVjdC5rZXlzKGIpLmZvckVhY2goa2V5ID0+IHtcbiAgICBpZiAodHlwZW9mIGJba2V5XSAhPT0gJ29iamVjdCcgfHwgYltrZXldID09PSBudWxsKSB7XG4gICAgICBhW2tleV0gPSBiW2tleV07XG4gICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGJba2V5XSkpIHtcbiAgICAgIGFba2V5XSA9IGFba2V5XSB8fCBbXTtcbiAgICAgIC8vIGZpeCAjMjkyIC0gc2tpcCBkdXBsaWNhdGVkIHZhbHVlcyBmcm9tIG1lcmdlIG9iamVjdCAoYilcbiAgICAgIGJba2V5XS5mb3JFYWNoKCh2YWx1ZSwgaSkgPT4ge1xuICAgICAgICBpZiAoYS50eXBlID09PSAnYXJyYXknICYmIGIudHlwZSA9PT0gJ2FycmF5Jykge1xuICAgICAgICAgIGFba2V5XVtpXSA9IG1lcmdlKGFba2V5XVtpXSB8fCB7fSwgdmFsdWUsIHRydWUpO1xuICAgICAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoYVtrZXldKSAmJiBhW2tleV0uaW5kZXhPZih2YWx1ZSkgPT09IC0xKSB7XG4gICAgICAgICAgYVtrZXldLnB1c2godmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBhW2tleV0gIT09ICdvYmplY3QnIHx8IGFba2V5XSA9PT0gbnVsbCB8fCBBcnJheS5pc0FycmF5KGFba2V5XSkpIHtcbiAgICAgIGFba2V5XSA9IG1lcmdlKHt9LCBiW2tleV0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBhW2tleV0gPSBtZXJnZShhW2tleV0sIGJba2V5XSk7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gYTtcbn1cblxuZnVuY3Rpb24gY2xvbmUob2JqLCBjYWNoZSA9IG5ldyBNYXAoKSkge1xuICBpZiAoIW9iaiB8fCB0eXBlb2Ygb2JqICE9PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBvYmo7XG4gIH1cblxuICBpZiAoY2FjaGUuaGFzKG9iaikpIHtcbiAgICByZXR1cm4gY2FjaGUuZ2V0KG9iaik7XG4gIH1cblxuICBpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XG4gICAgY29uc3QgYXJyID0gW107XG4gICAgY2FjaGUuc2V0KG9iaiwgYXJyKTtcblxuICAgIGFyci5wdXNoKC4uLm9iai5tYXAoeCA9PiBjbG9uZSh4LCBjYWNoZSkpKTtcbiAgICByZXR1cm4gYXJyO1xuICB9XG5cbiAgY29uc3QgY2xvbmVkT2JqID0ge307XG4gIGNhY2hlLnNldChvYmosIGNsb25lZE9iaik7XG5cbiAgcmV0dXJuIE9iamVjdC5rZXlzKG9iaikucmVkdWNlKChwcmV2LCBjdXIpID0+IHtcbiAgICBwcmV2W2N1cl0gPSBjbG9uZShvYmpbY3VyXSwgY2FjaGUpO1xuICAgIHJldHVybiBwcmV2O1xuICB9LCBjbG9uZWRPYmopO1xufVxuXG5mdW5jdGlvbiBzaG9ydChzY2hlbWEpIHtcbiAgY29uc3QgcyA9IEpTT04uc3RyaW5naWZ5KHNjaGVtYSk7XG4gIGNvbnN0IGwgPSBKU09OLnN0cmluZ2lmeShzY2hlbWEsIG51bGwsIDIpO1xuXG4gIHJldHVybiBzLmxlbmd0aCA+IDQwMCA/IGAke2wuc3Vic3RyKDAsIDQwMCl9Li4uYCA6IGw7XG59XG5cbmZ1bmN0aW9uIGFueVZhbHVlKCkge1xuICByZXR1cm4gcmFuZG9tLnBpY2soW1xuICAgIGZhbHNlLFxuICAgIHRydWUsXG4gICAgbnVsbCxcbiAgICAtMSxcbiAgICBOYU4sXG4gICAgTWF0aC5QSSxcbiAgICBJbmZpbml0eSxcbiAgICB1bmRlZmluZWQsXG4gICAgW10sXG4gICAge30sXG4gICAgLy8gRklYTUU6IHVzZSBidWlsdC1pbiByYW5kb20/XG4gICAgTWF0aC5yYW5kb20oKSxcbiAgICBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHIoMiksXG4gIF0pO1xufVxuXG5mdW5jdGlvbiBoYXNWYWx1ZShzY2hlbWEsIHZhbHVlKSB7XG4gIGlmIChzY2hlbWEuZW51bSkgcmV0dXJuIHNjaGVtYS5lbnVtLmluY2x1ZGVzKHZhbHVlKTtcbiAgaWYgKHNjaGVtYS5jb25zdCkgcmV0dXJuIHNjaGVtYS5jb25zdCA9PT0gdmFsdWU7XG59XG5cbmZ1bmN0aW9uIG5vdFZhbHVlKHNjaGVtYSwgcGFyZW50KSB7XG4gIGNvbnN0IGNvcHkgPSBtZXJnZSh7fSwgcGFyZW50KTtcblxuICBpZiAodHlwZW9mIHNjaGVtYS5taW5pbXVtICE9PSAndW5kZWZpbmVkJykge1xuICAgIGNvcHkubWF4aW11bSA9IHNjaGVtYS5taW5pbXVtO1xuICAgIGNvcHkuZXhjbHVzaXZlTWF4aW11bSA9IHRydWU7XG4gIH1cblxuICBpZiAodHlwZW9mIHNjaGVtYS5tYXhpbXVtICE9PSAndW5kZWZpbmVkJykge1xuICAgIGNvcHkubWluaW11bSA9IHNjaGVtYS5tYXhpbXVtID4gY29weS5tYXhpbXVtID8gMCA6IHNjaGVtYS5tYXhpbXVtO1xuICAgIGNvcHkuZXhjbHVzaXZlTWluaW11bSA9IHRydWU7XG4gIH1cblxuICBpZiAodHlwZW9mIHNjaGVtYS5taW5MZW5ndGggIT09ICd1bmRlZmluZWQnKSB7XG4gICAgY29weS5tYXhMZW5ndGggPSBzY2hlbWEubWluTGVuZ3RoO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBzY2hlbWEubWF4TGVuZ3RoICE9PSAndW5kZWZpbmVkJykge1xuICAgIGNvcHkubWluTGVuZ3RoID0gc2NoZW1hLm1heExlbmd0aCA+IGNvcHkubWF4TGVuZ3RoID8gMCA6IHNjaGVtYS5tYXhMZW5ndGg7XG4gIH1cblxuICBpZiAoc2NoZW1hLnR5cGUpIHtcbiAgICBjb3B5LnR5cGUgPSByYW5kb20ucGljayhlbnYuU0NBTEFSX1RZUEVTLmZpbHRlcih4ID0+IHtcbiAgICAgIGNvbnN0IHR5cGVzID0gQXJyYXkuaXNBcnJheShzY2hlbWEudHlwZSkgPyBzY2hlbWEudHlwZSA6IFtzY2hlbWEudHlwZV07XG5cbiAgICAgIHJldHVybiB0eXBlcy5ldmVyeSh0eXBlID0+IHtcbiAgICAgICAgLy8gdHJlYXQgYm90aCB0eXBlcyBhcyBfc2ltaWxhciBlbm91Z2hfIHRvIGJlIHNraXBwZWQgZXF1YWxcbiAgICAgICAgaWYgKHggPT09ICdudW1iZXInIHx8IHggPT09ICdpbnRlZ2VyJykge1xuICAgICAgICAgIHJldHVybiB0eXBlICE9PSAnbnVtYmVyJyAmJiB0eXBlICE9PSAnaW50ZWdlcic7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4geCAhPT0gdHlwZTtcbiAgICAgIH0pO1xuICAgIH0pKTtcbiAgfSBlbHNlIGlmIChzY2hlbWEuZW51bSkge1xuICAgIGxldCB2YWx1ZTtcblxuICAgIGRvIHtcbiAgICAgIHZhbHVlID0gYW55VmFsdWUoKTtcbiAgICB9IHdoaWxlIChzY2hlbWEuZW51bS5pbmRleE9mKHZhbHVlKSAhPT0gLTEpO1xuXG4gICAgY29weS5lbnVtID0gW3ZhbHVlXTtcbiAgfVxuXG4gIGlmIChzY2hlbWEucmVxdWlyZWQgJiYgY29weS5wcm9wZXJ0aWVzKSB7XG4gICAgc2NoZW1hLnJlcXVpcmVkLmZvckVhY2gocHJvcCA9PiB7XG4gICAgICBkZWxldGUgY29weS5wcm9wZXJ0aWVzW3Byb3BdO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gVE9ETzogZXhwbG9yZSBtb3JlIHNjZW5hcmlvc1xuXG4gIHJldHVybiBjb3B5O1xufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZVZhbHVlRm9yU2NoZW1hKHZhbHVlLCBzY2hlbWEpIHtcbiAgY29uc3Qgc2NoZW1hSGFzTWluID0gc2NoZW1hLm1pbmltdW0gIT09IHVuZGVmaW5lZDtcbiAgY29uc3Qgc2NoZW1hSGFzTWF4ID0gc2NoZW1hLm1heGltdW0gIT09IHVuZGVmaW5lZDtcblxuICByZXR1cm4gKFxuICAgIChzY2hlbWFIYXNNaW4gfHwgc2NoZW1hSGFzTWF4KVxuICAgICYmICghc2NoZW1hSGFzTWluIHx8IHZhbHVlID49IHNjaGVtYS5taW5pbXVtKVxuICAgICYmICghc2NoZW1hSGFzTWF4IHx8IHZhbHVlIDw9IHNjaGVtYS5tYXhpbXVtKVxuICApO1xufVxuXG4vLyBGSVhNRTogZXZhbHVhdGUgbW9yZSBjb25zdHJhaW50cz9cbmZ1bmN0aW9uIHZhbGlkYXRlKHZhbHVlLCBzY2hlbWFzKSB7XG4gIHJldHVybiAhc2NoZW1hcy5ldmVyeShzY2hlbWEgPT4gdmFsaWRhdGVWYWx1ZUZvclNjaGVtYSh2YWx1ZSwgc2NoZW1hKSk7XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlVmFsdWVGb3JPbmVPZih2YWx1ZSwgb25lT2YpIHtcbiAgY29uc3QgdmFsaWRDb3VudCA9IG9uZU9mLnJlZHVjZSgoY291bnQsIHNjaGVtYSkgPT4gKGNvdW50ICsgKCh2YWxpZGF0ZVZhbHVlRm9yU2NoZW1hKHZhbHVlLCBzY2hlbWEpKSA/IDEgOiAwKSksIDApO1xuICByZXR1cm4gdmFsaWRDb3VudCA9PT0gMTtcbn1cblxuZnVuY3Rpb24gaXNLZXkocHJvcCkge1xuICByZXR1cm4gWydlbnVtJywgJ2NvbnN0JywgJ2RlZmF1bHQnLCAnZXhhbXBsZXMnLCAncmVxdWlyZWQnLCAnZGVmaW5pdGlvbnMnLCAnaXRlbXMnLCAncHJvcGVydGllcyddLmluY2x1ZGVzKHByb3ApO1xufVxuXG5mdW5jdGlvbiBvbWl0UHJvcHMob2JqLCBwcm9wcykge1xuICByZXR1cm4gT2JqZWN0LmtleXMob2JqKVxuICAgIC5maWx0ZXIoa2V5ID0+ICFwcm9wcy5pbmNsdWRlcyhrZXkpKVxuICAgIC5yZWR1Y2UoKGNvcHksIGspID0+IHtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KG9ialtrXSkpIHtcbiAgICAgICAgY29weVtrXSA9IG9ialtrXS5zbGljZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29weVtrXSA9IG9ialtrXSBpbnN0YW5jZW9mIE9iamVjdFxuICAgICAgICAgID8gbWVyZ2Uoe30sIG9ialtrXSlcbiAgICAgICAgICA6IG9ialtrXTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNvcHk7XG4gICAgfSwge30pO1xufVxuXG5mdW5jdGlvbiB0ZW1wbGF0ZSh2YWx1ZSwgc2NoZW1hKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgIHJldHVybiB2YWx1ZS5tYXAoeCA9PiB0ZW1wbGF0ZSh4LCBzY2hlbWEpKTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC8jXFx7KFtcXHcuLV0rKVxcfS9nLCAoXywgJDEpID0+IHNjaGVtYVskMV0pO1xuICB9XG5cbiAgcmV0dXJuIHZhbHVlO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBnaXZlbiBvYmplY3QgaXMgZW1wdHkgKGhhcyBubyBwcm9wZXJ0aWVzKVxuICpcbiAqIEBwYXJhbSB2YWx1ZVxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGlzRW1wdHkodmFsdWUpIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT09ICdbb2JqZWN0IE9iamVjdF0nICYmICFPYmplY3Qua2V5cyh2YWx1ZSkubGVuZ3RoO1xufVxuXG4vKipcbiAqIENoZWNrcyBnaXZlbiBrZXkgaXMgcmVxdWlyZWQgb3IgaWYgc291cmNlIG9iamVjdCB3YXMgY3JlYXRlZCBieSBhIHN1YnJvdXRpbmUgKGFscmVhZHkgY2xlYW5lZClcbiAqXG4gKiBAcGFyYW0ga2V5XG4gKiBAcGFyYW0gc2NoZW1hXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gc2hvdWxkQ2xlYW4oa2V5LCBzY2hlbWEpIHtcbiAgc2NoZW1hID0gc2NoZW1hLml0ZW1zIHx8IHNjaGVtYTtcblxuICAvLyBmaXg6IHdoZW4gYWx3YXlzRmFrZU9wdGlvbmFscyBpcyB0cnVlLCBuZWVkIHNldCBpc1JlcXVpcmVkIHRvIHRydWUsIHNlZSBidWc6aHR0cHM6Ly9naXRodWIuY29tL2pzb24tc2NoZW1hLWZha2VyL2pzb24tc2NoZW1hLWZha2VyL2lzc3Vlcy83NjFcbiAgY29uc3QgYWx3YXlzRmFrZU9wdGlvbmFscyA9IG9wdGlvbkFQSSgnYWx3YXlzRmFrZU9wdGlvbmFscycpO1xuICBjb25zdCBpc1JlcXVpcmVkID0gKEFycmF5LmlzQXJyYXkoc2NoZW1hLnJlcXVpcmVkKSAmJiBzY2hlbWEucmVxdWlyZWQuaW5jbHVkZXMoa2V5KSkgfHwgYWx3YXlzRmFrZU9wdGlvbmFscztcbiAgY29uc3Qgd2FzQ2xlYW5lZCA9IHR5cGVvZiBzY2hlbWEudGh1bmsgPT09ICdmdW5jdGlvbicgfHwgKHNjaGVtYS5hZGRpdGlvbmFsUHJvcGVydGllcyAmJiB0eXBlb2Ygc2NoZW1hLmFkZGl0aW9uYWxQcm9wZXJ0aWVzLnRodW5rID09PSAnZnVuY3Rpb24nKTtcblxuICByZXR1cm4gIWlzUmVxdWlyZWQgJiYgIXdhc0NsZWFuZWQ7XG59XG5cbi8qKlxuICogQ2xlYW5zIHVwIHRoZSBzb3VyY2Ugb2JqZWN0IHJlbW92aW5nIGVtcHR5IG9iamVjdHMgYW5kIHVuZGVmaW5lZCB2YWx1ZXNcbiAqIFdpbGwgbm90IHJlbW92ZSB2YWx1ZXMgd2hpY2ggYXJlIHNwZWNpZmllZCBhcyBgcmVxdWlyZWRgXG4gKlxuICogQHBhcmFtIG9ialxuICogQHBhcmFtIHNjaGVtYVxuICogQHBhcmFtIGlzQXJyYXlcbiAqIEByZXR1cm5zIHthbnl9XG4gKi9cbmZ1bmN0aW9uIGNsZWFuKG9iaiwgc2NoZW1hLCBpc0FycmF5ID0gZmFsc2UpIHtcbiAgaWYgKCFvYmogfHwgdHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gb2JqO1xuICB9XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xuICAgIHJldHVybiBvYmpcbiAgICAgIC5tYXAodmFsdWUgPT4gY2xlYW4odmFsdWUsIHNjaGVtYSwgdHJ1ZSkpXG4gICAgICAuZmlsdGVyKHZhbHVlID0+IHR5cGVvZiB2YWx1ZSAhPT0gJ3VuZGVmaW5lZCcpO1xuICB9XG5cbiAgT2JqZWN0LmtleXMob2JqKS5mb3JFYWNoKGsgPT4ge1xuICAgIGlmIChpc0VtcHR5KG9ialtrXSkpIHtcbiAgICAgIGlmIChzaG91bGRDbGVhbihrLCBzY2hlbWEpKSB7XG4gICAgICAgIGRlbGV0ZSBvYmpba107XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHNob3VsZCBvYnRhaW4gdGhlIGNvcnJlY3Qgc2NoZW1hXG4gICAgICBsZXQgc3ViU2NoZW1hID0gc2NoZW1hO1xuICAgICAgaWYgKHNjaGVtYSAmJiBzY2hlbWEucHJvcGVydGllcyAmJiBzY2hlbWEucHJvcGVydGllc1trXSkge1xuICAgICAgICBzdWJTY2hlbWEgPSBzY2hlbWEucHJvcGVydGllc1trXTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHZhbHVlID0gY2xlYW4ob2JqW2tdLCBzdWJTY2hlbWEpO1xuXG4gICAgICBpZiAoIWlzRW1wdHkodmFsdWUpKSB7XG4gICAgICAgIG9ialtrXSA9IHZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodHlwZW9mIG9ialtrXSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGRlbGV0ZSBvYmpba107XG4gICAgfVxuICB9KTtcblxuICBpZiAoIU9iamVjdC5rZXlzKG9iaikubGVuZ3RoICYmIGlzQXJyYXkpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgcmV0dXJuIG9iajtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBoYXNQcm9wZXJ0aWVzLFxuICBnZXRMb2NhbFJlZixcbiAgb21pdFByb3BzLFxuICB0eXBlY2FzdCxcbiAgbWVyZ2UsXG4gIGNsb25lLFxuICBzaG9ydCxcbiAgaGFzVmFsdWUsXG4gIG5vdFZhbHVlLFxuICBhbnlWYWx1ZSxcbiAgdmFsaWRhdGUsXG4gIHZhbGlkYXRlVmFsdWVGb3JTY2hlbWEsXG4gIHZhbGlkYXRlVmFsdWVGb3JPbmVPZixcbiAgaXNLZXksXG4gIHRlbXBsYXRlLFxuICBzaG91bGRDbGVhbixcbiAgY2xlYW4sXG4gIGlzRW1wdHksXG4gIGNsYW1wRGF0ZSxcbn07XG4iLCAiaW1wb3J0IHV0aWwgZnJvbSAnLi4vY29yZS91dGlscy5tanMnO1xuXG4vLyBkeW5hbWljIHByb3h5IGZvciBjdXN0b20gZ2VuZXJhdG9yc1xuZnVuY3Rpb24gcHJveHkoZ2VuKSB7XG4gIHJldHVybiAodmFsdWUsIHNjaGVtYSwgcHJvcGVydHksIHJvb3RTY2hlbWEpID0+IHtcbiAgICBsZXQgZm4gPSB2YWx1ZTtcbiAgICBsZXQgYXJncyA9IFtdO1xuXG4gICAgLy8gc3VwcG9ydCBmb3IgbmVzdGVkIG9iamVjdCwgZmlyc3Qta2V5IGlzIHRoZSBnZW5lcmF0b3JcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgICAgZm4gPSBPYmplY3Qua2V5cyh2YWx1ZSlbMF07XG5cbiAgICAgIC8vIHRyZWF0IHRoZSBnaXZlbiBhcnJheSBhcyBhcmd1bWVudHMsXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZVtmbl0pKSB7XG4gICAgICAgIC8vIGlmIHRoZSBnZW5lcmF0b3IgaXMgZXhwZWN0aW5nIGFycmF5cyB0aGV5IHNob3VsZCBiZSBuZXN0ZWQsIGUuZy4gYFtbMSwgMiwgM10sIHRydWUsIC4uLl1gXG4gICAgICAgIGFyZ3MgPSB2YWx1ZVtmbl07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhcmdzLnB1c2godmFsdWVbZm5dKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBzdXBwb3J0IGZvciBrZXlwYXRocywgZS5nLiBcImludGVybmV0LmVtYWlsXCJcbiAgICBjb25zdCBwcm9wcyA9IGZuLnNwbGl0KCcuJyk7XG5cbiAgICAvLyByZXRyaWV2ZSBhIGZyZXNoIGRlcGVuZGVuY3lcbiAgICBsZXQgY3R4ID0gZ2VuKCk7XG5cbiAgICB3aGlsZSAocHJvcHMubGVuZ3RoID4gMSkge1xuICAgICAgY3R4ID0gY3R4W3Byb3BzLnNoaWZ0KCldO1xuICAgIH1cblxuICAgIC8vIHJldHJpZXZlIGxhc3QgdmFsdWUgZnJvbSBjb250ZXh0IG9iamVjdFxuICAgIHZhbHVlID0gdHlwZW9mIGN0eCA9PT0gJ29iamVjdCcgPyBjdHhbcHJvcHNbMF1dIDogY3R4O1xuXG4gICAgLy8gaW52b2tlIGR5bmFtaWMgZ2VuZXJhdG9yc1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHZhbHVlID0gdmFsdWUuYXBwbHkoY3R4LCBhcmdzLm1hcCh4ID0+IHV0aWwudGVtcGxhdGUoeCwgcm9vdFNjaGVtYSkpKTtcbiAgICB9XG5cbiAgICAvLyB0ZXN0IGZvciBwZW5kaW5nIGNhbGxiYWNrc1xuICAgIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpID09PSAnW29iamVjdCBPYmplY3RdJykge1xuICAgICAgT2JqZWN0LmtleXModmFsdWUpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZVtrZXldID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDYW5ub3QgcmVzb2x2ZSB2YWx1ZSBmb3IgJyR7cHJvcGVydHl9OiAke2ZufScsIGdpdmVuOiAke3ZhbHVlfWApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsdWU7XG4gIH07XG59XG5cbi8qKlxuICogQ29udGFpbmVyIGlzIHVzZWQgdG8gd3JhcCBleHRlcm5hbCBnZW5lcmF0b3JzIChmYWtlciwgY2hhbmNlLCBjYXN1YWwsIGV0Yy4pIGFuZCBpdHMgZGVwZW5kZW5jaWVzLlxuICpcbiAqIC0gYGpzZi5leHRlbmQoJ2Zha2VyJylgIHdpbGwgZW5oYW5jZSBvciBkZWZpbmUgdGhlIGdpdmVuIGRlcGVuZGVuY3kuXG4gKiAtIGBqc2YuZGVmaW5lKCdmYWtlcicpYCB3aWxsIHByb3ZpZGUgdGhlIFwiZmFrZXJcIiBrZXl3b3JkIHN1cHBvcnQuXG4gKlxuICogUmFuZEV4cCBpcyBub3QgbG9uZ2VyIGNvbnNpZGVyZWQgYW4gXCJleHRlbnNpb25cIi5cbiAqL1xuY2xhc3MgQ29udGFpbmVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgLy8gZHluYW1pYyByZXF1aXJlcyAtIGhhbmRsZSBhbGwgZGVwZW5kZW5jaWVzXG4gICAgLy8gdGhleSB3aWxsIE5PVCBiZSBpbmNsdWRlZCBvbiB0aGUgYnVuZGxlXG4gICAgdGhpcy5yZWdpc3RyeSA9IHt9O1xuICAgIHRoaXMuc3VwcG9ydCA9IHt9O1xuICB9XG5cbiAgLyoqXG4gICAqIFVucmVnaXN0ZXIgZXh0ZW5zaW9uc1xuICAgKiBAcGFyYW0gbmFtZVxuICAgKi9cbiAgcmVzZXQobmFtZSkge1xuICAgIGlmICghbmFtZSkge1xuICAgICAgdGhpcy5yZWdpc3RyeSA9IHt9O1xuICAgICAgdGhpcy5zdXBwb3J0ID0ge307XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlbGV0ZSB0aGlzLnJlZ2lzdHJ5W25hbWVdO1xuICAgICAgZGVsZXRlIHRoaXMuc3VwcG9ydFtuYW1lXTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogT3ZlcnJpZGUgZGVwZW5kZW5jeSBnaXZlbiBieSBuYW1lXG4gICAqIEBwYXJhbSBuYW1lXG4gICAqIEBwYXJhbSBjYWxsYmFja1xuICAgKi9cbiAgZXh0ZW5kKG5hbWUsIGNhbGxiYWNrKSB7XG4gICAgdGhpcy5yZWdpc3RyeVtuYW1lXSA9IGNhbGxiYWNrKHRoaXMucmVnaXN0cnlbbmFtZV0pO1xuXG4gICAgLy8gYnVpbHQtaW4gcHJveHkgKGNhbiBiZSBvdmVycmlkZGVuKVxuICAgIGlmICghdGhpcy5zdXBwb3J0W25hbWVdKSB7XG4gICAgICB0aGlzLnN1cHBvcnRbbmFtZV0gPSBwcm94eSgoKSA9PiB0aGlzLnJlZ2lzdHJ5W25hbWVdKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2V0IGtleXdvcmQgc3VwcG9ydCBieSBuYW1lXG4gICAqIEBwYXJhbSBuYW1lXG4gICAqIEBwYXJhbSBjYWxsYmFja1xuICAgKi9cbiAgZGVmaW5lKG5hbWUsIGNhbGxiYWNrKSB7XG4gICAgdGhpcy5zdXBwb3J0W25hbWVdID0gY2FsbGJhY2s7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBkZXBlbmRlbmN5IGdpdmVuIGJ5IG5hbWVcbiAgICogQHBhcmFtIG5hbWVcbiAgICogQHJldHVybnMge0RlcGVuZGVuY3l9XG4gICAqL1xuICBnZXQobmFtZSkge1xuICAgIGlmICh0eXBlb2YgdGhpcy5yZWdpc3RyeVtuYW1lXSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihgJyR7bmFtZX0nIGRlcGVuZGVuY3kgZG9lc24ndCBleGlzdC5gKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucmVnaXN0cnlbbmFtZV07XG4gIH1cblxuICAvKipcbiAgICogQXBwbHkgYSBjdXN0b20ga2V5d29yZFxuICAgKiBAcGFyYW0gc2NoZW1hXG4gICAqL1xuICB3cmFwKHNjaGVtYSkge1xuICAgIGlmICghKCdnZW5lcmF0ZScgaW4gc2NoZW1hKSkge1xuICAgICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHNjaGVtYSk7XG4gICAgICBjb25zdCBjb250ZXh0ID0ge307XG5cbiAgICAgIGxldCBsZW5ndGggPSBrZXlzLmxlbmd0aDtcblxuICAgICAgd2hpbGUgKGxlbmd0aC0tKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgICAgY29uc3QgZm4gPSBrZXlzW2xlbmd0aF0ucmVwbGFjZSgvXngtLywgJycpO1xuICAgICAgICBjb25zdCBnZW4gPSB0aGlzLnN1cHBvcnRbZm5dO1xuXG4gICAgICAgIGlmICh0eXBlb2YgZ2VuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHNjaGVtYSwgJ2dlbmVyYXRlJywge1xuICAgICAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgICAgICAgdmFsdWU6IChyb290U2NoZW1hLCBrZXkpID0+IGdlbi5jYWxsKGNvbnRleHQsIHNjaGVtYVtrZXlzW2xlbmd0aF1dLCBzY2hlbWEsIGtleXNbbGVuZ3RoXSwgcm9vdFNjaGVtYSwga2V5LnNsaWNlKCkpLCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHNjaGVtYTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDb250YWluZXI7XG4iLCAiaW1wb3J0IFJlZ2lzdHJ5IGZyb20gJy4uL2NsYXNzL1JlZ2lzdHJ5Lm1qcyc7XG5cbi8vIGluc3RhbnRpYXRlXG5jb25zdCByZWdpc3RyeSA9IG5ldyBSZWdpc3RyeSgpO1xuXG4vKipcbiAqIEN1c3RvbSBmb3JtYXQgQVBJXG4gKlxuICogQHNlZSBodHRwczovL2dpdGh1Yi5jb20vanNvbi1zY2hlbWEtZmFrZXIvanNvbi1zY2hlbWEtZmFrZXIjY3VzdG9tLWZvcm1hdHNcbiAqIEBwYXJhbSBuYW1lT3JGb3JtYXRNYXBcbiAqIEBwYXJhbSBjYWxsYmFja1xuICogQHJldHVybnMge2FueX1cbiAqL1xuZnVuY3Rpb24gZm9ybWF0QVBJKG5hbWVPckZvcm1hdE1hcCwgY2FsbGJhY2spIHtcbiAgaWYgKHR5cGVvZiBuYW1lT3JGb3JtYXRNYXAgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuIHJlZ2lzdHJ5Lmxpc3QoKTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgbmFtZU9yRm9ybWF0TWFwID09PSAnc3RyaW5nJykge1xuICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJlZ2lzdHJ5LnJlZ2lzdGVyKG5hbWVPckZvcm1hdE1hcCwgY2FsbGJhY2spO1xuICAgIH0gZWxzZSBpZiAoY2FsbGJhY2sgPT09IG51bGwgfHwgY2FsbGJhY2sgPT09IGZhbHNlKSB7XG4gICAgICByZWdpc3RyeS51bnJlZ2lzdGVyKG5hbWVPckZvcm1hdE1hcCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiByZWdpc3RyeS5nZXQobmFtZU9yRm9ybWF0TWFwKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgcmVnaXN0cnkucmVnaXN0ZXJNYW55KG5hbWVPckZvcm1hdE1hcCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZm9ybWF0QVBJO1xuIiwgImNsYXNzIFBhcnNlRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gIGNvbnN0cnVjdG9yKG1lc3NhZ2UsIHBhdGgpIHtcbiAgICBzdXBlcigpO1xuICAgIGlmIChFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSkge1xuICAgICAgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UodGhpcywgdGhpcy5jb25zdHJ1Y3Rvcik7XG4gICAgfVxuICAgIHRoaXMubmFtZSA9ICdQYXJzZUVycm9yJztcbiAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgIHRoaXMucGF0aCA9IHBhdGg7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUGFyc2VFcnJvcjtcbiIsICJjb25zdCBpbmZlcnJlZFByb3BlcnRpZXMgPSB7XG4gIGFycmF5OiBbXG4gICAgJ2FkZGl0aW9uYWxJdGVtcycsXG4gICAgJ2l0ZW1zJyxcbiAgICAnbWF4SXRlbXMnLFxuICAgICdtaW5JdGVtcycsXG4gICAgJ3VuaXF1ZUl0ZW1zJyxcbiAgXSxcbiAgaW50ZWdlcjogW1xuICAgICdleGNsdXNpdmVNYXhpbXVtJyxcbiAgICAnZXhjbHVzaXZlTWluaW11bScsXG4gICAgJ21heGltdW0nLFxuICAgICdtaW5pbXVtJyxcbiAgICAnbXVsdGlwbGVPZicsXG4gIF0sXG4gIG9iamVjdDogW1xuICAgICdhZGRpdGlvbmFsUHJvcGVydGllcycsXG4gICAgJ2RlcGVuZGVuY2llcycsXG4gICAgJ21heFByb3BlcnRpZXMnLFxuICAgICdtaW5Qcm9wZXJ0aWVzJyxcbiAgICAncGF0dGVyblByb3BlcnRpZXMnLFxuICAgICdwcm9wZXJ0aWVzJyxcbiAgICAncmVxdWlyZWQnLFxuICBdLFxuICBzdHJpbmc6IFtcbiAgICAnbWF4TGVuZ3RoJyxcbiAgICAnbWluTGVuZ3RoJyxcbiAgICAncGF0dGVybicsXG4gICAgJ2Zvcm1hdCcsXG4gIF0sXG59O1xuXG5pbmZlcnJlZFByb3BlcnRpZXMubnVtYmVyID0gaW5mZXJyZWRQcm9wZXJ0aWVzLmludGVnZXI7XG5cbmNvbnN0IHN1YnNjaGVtYVByb3BlcnRpZXMgPSBbXG4gICdhZGRpdGlvbmFsSXRlbXMnLFxuICAnaXRlbXMnLFxuICAnYWRkaXRpb25hbFByb3BlcnRpZXMnLFxuICAnZGVwZW5kZW5jaWVzJyxcbiAgJ3BhdHRlcm5Qcm9wZXJ0aWVzJyxcbiAgJ3Byb3BlcnRpZXMnLFxuXTtcblxuLyoqXG4gKiBJdGVyYXRlcyB0aHJvdWdoIGFsbCBrZXlzIG9mIGBvYmpgIGFuZDpcbiAqIC0gY2hlY2tzIHdoZXRoZXIgdGhvc2Uga2V5cyBtYXRjaCBwcm9wZXJ0aWVzIG9mIGEgZ2l2ZW4gaW5mZXJyZWQgdHlwZVxuICogLSBtYWtlcyBzdXJlIHRoYXQgYG9iamAgaXMgbm90IGEgc3Vic2NoZW1hOyBfRG8gbm90IGF0dGVtcHQgdG8gaW5mZXIgcHJvcGVydGllcyBuYW1lZCBhcyBzdWJzY2hlbWEgY29udGFpbmVycy4gVGhlXG4gKiByZWFzb24gZm9yIHRoaXMgaXMgdGhhdCBhbnkgcHJvcGVydHkgbmFtZSB3aXRoaW4gdGhvc2UgY29udGFpbmVycyB0aGF0IG1hdGNoZXMgb25lIG9mIHRoZSBwcm9wZXJ0aWVzIHVzZWQgZm9yXG4gKiBpbmZlcnJpbmcgbWlzc2luZyB0eXBlIHZhbHVlcyBjYXVzZXMgdGhlIGNvbnRhaW5lciBpdHNlbGYgdG8gZ2V0IHByb2Nlc3NlZCB3aGljaCBsZWFkcyB0byBpbnZhbGlkIG91dHB1dC4gKElzc3VlIDYyKV9cbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gbWF0Y2hlc1R5cGUob2JqLCBsYXN0RWxlbWVudEluUGF0aCwgaW5mZXJyZWRUeXBlUHJvcGVydGllcykge1xuICByZXR1cm4gT2JqZWN0LmtleXMob2JqKS5maWx0ZXIocHJvcCA9PiB7XG4gICAgY29uc3QgaXNTdWJzY2hlbWEgPSBzdWJzY2hlbWFQcm9wZXJ0aWVzLmluZGV4T2YobGFzdEVsZW1lbnRJblBhdGgpID4gLTE7XG4gICAgY29uc3QgaW5mZXJyZWRQcm9wZXJ0eUZvdW5kID0gaW5mZXJyZWRUeXBlUHJvcGVydGllcy5pbmRleE9mKHByb3ApID4gLTE7XG5cbiAgICBpZiAoaW5mZXJyZWRQcm9wZXJ0eUZvdW5kICYmICFpc1N1YnNjaGVtYSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9KS5sZW5ndGggPiAwO1xufVxuXG4vKipcbiAqIENoZWNrcyB3aGV0aGVyIGdpdmVuIGBvYmpgIHR5cGUgbWlnaHQgYmUgaW5mZXJyZWQuIFRoZSBtZWNoYW5pc20gaXRlcmF0ZXMgdGhyb3VnaCBhbGwgaW5mZXJyZWQgdHlwZXMgZGVmaW5pdGlvbnMsXG4gKiB0cmllcyB0byBtYXRjaCBhbGxvd2VkIHByb3BlcnRpZXMgd2l0aCBwcm9wZXJ0aWVzIG9mIGdpdmVuIGBvYmpgLiBSZXR1cm5zIHR5cGUgbmFtZSwgaWYgaW5mZXJyZWQsIG9yIG51bGwuXG4gKlxuICogQHJldHVybnMge3N0cmluZ3xudWxsfVxuICovXG5mdW5jdGlvbiBpbmZlclR5cGUob2JqLCBzY2hlbWFQYXRoKSB7XG4gIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhpbmZlcnJlZFByb3BlcnRpZXMpO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkgKz0gMSkge1xuICAgIGNvbnN0IHR5cGVOYW1lID0ga2V5c1tpXTtcbiAgICBjb25zdCBsYXN0RWxlbWVudEluUGF0aCA9IHNjaGVtYVBhdGhbc2NoZW1hUGF0aC5sZW5ndGggLSAxXTtcblxuICAgIGlmIChtYXRjaGVzVHlwZShvYmosIGxhc3RFbGVtZW50SW5QYXRoLCBpbmZlcnJlZFByb3BlcnRpZXNbdHlwZU5hbWVdKSkge1xuICAgICAgcmV0dXJuIHR5cGVOYW1lO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBpbmZlclR5cGU7XG4iLCAiaW1wb3J0IG9wdGlvbkFQSSBmcm9tICcuLi9hcGkvb3B0aW9uLm1qcyc7XG5cbi8qKlxuICogR2VuZXJhdGVzIHJhbmRvbWl6ZWQgYm9vbGVhbiB2YWx1ZS5cbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gYm9vbGVhbkdlbmVyYXRvcigpIHtcbiAgcmV0dXJuIG9wdGlvbkFQSSgncmFuZG9tJykoKSA+IDAuNTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYm9vbGVhbkdlbmVyYXRvcjtcbiIsICJpbXBvcnQgYm9vbGVhbkdlbmVyYXRvciBmcm9tICcuLi9nZW5lcmF0b3JzL2Jvb2xlYW4ubWpzJztcblxuY29uc3QgYm9vbGVhblR5cGUgPSBib29sZWFuR2VuZXJhdG9yO1xuXG5leHBvcnQgZGVmYXVsdCBib29sZWFuVHlwZTtcbiIsICIvKipcbiAqIEdlbmVyYXRlcyBudWxsIHZhbHVlLlxuICpcbiAqIEByZXR1cm5zIHtudWxsfVxuICovXG5mdW5jdGlvbiBudWxsR2VuZXJhdG9yKCkge1xuICByZXR1cm4gbnVsbDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgbnVsbEdlbmVyYXRvcjtcbiIsICJpbXBvcnQgbnVsbEdlbmVyYXRvciBmcm9tICcuLi9nZW5lcmF0b3JzL251bGwubWpzJztcblxuY29uc3QgbnVsbFR5cGUgPSBudWxsR2VuZXJhdG9yO1xuXG5leHBvcnQgZGVmYXVsdCBudWxsVHlwZTtcbiIsICJpbXBvcnQgcmFuZG9tIGZyb20gJy4uL2NvcmUvcmFuZG9tLm1qcyc7XG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vY29yZS91dGlscy5tanMnO1xuaW1wb3J0IFBhcnNlRXJyb3IgZnJvbSAnLi4vY29yZS9lcnJvci5tanMnO1xuaW1wb3J0IG9wdGlvbkFQSSBmcm9tICcuLi9hcGkvb3B0aW9uLm1qcyc7XG5cbi8vIFRPRE8gcHJvdmlkZSB0eXBlc1xuZnVuY3Rpb24gdW5pcXVlKHBhdGgsIGl0ZW1zLCB2YWx1ZSwgc2FtcGxlLCByZXNvbHZlLCB0cmF2ZXJzZUNhbGxiYWNrKSB7XG4gIGNvbnN0IHRtcCA9IFtdO1xuICBjb25zdCBzZWVuID0gW107XG5cbiAgZnVuY3Rpb24gd2FsayhvYmopIHtcbiAgICBjb25zdCBqc29uID0gSlNPTi5zdHJpbmdpZnkob2JqLnZhbHVlKTtcblxuICAgIGlmIChzZWVuLmluZGV4T2YoanNvbikgPT09IC0xKSB7XG4gICAgICBzZWVuLnB1c2goanNvbik7XG4gICAgICB0bXAucHVzaChvYmopO1xuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpdGVtcy5mb3JFYWNoKHdhbGspO1xuXG4gIC8vIFRPRE86IGZpbmQgYSBiZXR0ZXIgc29sdXRpb24/XG4gIGxldCBsaW1pdCA9IDEwMDtcblxuICB3aGlsZSAodG1wLmxlbmd0aCAhPT0gaXRlbXMubGVuZ3RoKSB7XG4gICAgaWYgKCF3YWxrKHRyYXZlcnNlQ2FsbGJhY2sodmFsdWUuaXRlbXMgfHwgc2FtcGxlLCBwYXRoLCByZXNvbHZlKSkpIHtcbiAgICAgIGxpbWl0IC09IDE7XG4gICAgfVxuXG4gICAgaWYgKCFsaW1pdCkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRtcDtcbn1cblxuLy8gVE9ETyBwcm92aWRlIHR5cGVzXG5mdW5jdGlvbiBhcnJheVR5cGUodmFsdWUsIHBhdGgsIHJlc29sdmUsIHRyYXZlcnNlQ2FsbGJhY2spIHtcbiAgY29uc3QgaXRlbXMgPSBbXTtcblxuICBpZiAoISh2YWx1ZS5pdGVtcyB8fCB2YWx1ZS5hZGRpdGlvbmFsSXRlbXMpKSB7XG4gICAgaWYgKHV0aWxzLmhhc1Byb3BlcnRpZXModmFsdWUsICdtaW5JdGVtcycsICdtYXhJdGVtcycsICd1bmlxdWVJdGVtcycpKSB7XG4gICAgICBpZiAodmFsdWUubWluSXRlbXMgIT09IDAgfHwgdmFsdWUubWF4SXRlbXMgIT09IDApIHtcbiAgICAgICAgdGhyb3cgbmV3IFBhcnNlRXJyb3IoYG1pc3NpbmcgaXRlbXMgZm9yICR7dXRpbHMuc2hvcnQodmFsdWUpfWAsIHBhdGgpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gaXRlbXM7XG4gIH1cblxuICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZS5pdGVtcykpIHtcbiAgICByZXR1cm4gdmFsdWUuaXRlbXMubWFwKChpdGVtLCBrZXkpID0+IHtcbiAgICAgIGNvbnN0IGl0ZW1TdWJwYXRoID0gcGF0aC5jb25jYXQoWydpdGVtcycsIGtleV0pO1xuXG4gICAgICByZXR1cm4gdHJhdmVyc2VDYWxsYmFjayhpdGVtLCBpdGVtU3VicGF0aCwgcmVzb2x2ZSk7XG4gICAgfSk7XG4gIH1cblxuICBsZXQgbWluSXRlbXMgPSB2YWx1ZS5taW5JdGVtcztcbiAgbGV0IG1heEl0ZW1zID0gdmFsdWUubWF4SXRlbXM7XG5cbiAgY29uc3QgZGVmYXVsdE1pbkl0ZW1zID0gb3B0aW9uQVBJKCdtaW5JdGVtcycpO1xuICBjb25zdCBkZWZhdWx0TWF4SXRlbXMgPSBvcHRpb25BUEkoJ21heEl0ZW1zJyk7XG5cbiAgaWYgKGRlZmF1bHRNaW5JdGVtcykge1xuICAgIC8vIGZpeCBib3VuZGFyaWVzXG4gICAgbWluSXRlbXMgPSB0eXBlb2YgbWluSXRlbXMgPT09ICd1bmRlZmluZWQnXG4gICAgICA/IGRlZmF1bHRNaW5JdGVtc1xuICAgICAgOiBNYXRoLm1pbihkZWZhdWx0TWluSXRlbXMsIG1pbkl0ZW1zKTtcbiAgfVxuXG4gIGlmIChkZWZhdWx0TWF4SXRlbXMpIHtcbiAgICBtYXhJdGVtcyA9IHR5cGVvZiBtYXhJdGVtcyA9PT0gJ3VuZGVmaW5lZCdcbiAgICAgID8gZGVmYXVsdE1heEl0ZW1zXG4gICAgICA6IE1hdGgubWluKGRlZmF1bHRNYXhJdGVtcywgbWF4SXRlbXMpO1xuXG4gICAgLy8gRG9uJ3QgYWxsb3cgdXNlciB0byBzZXQgbWF4IGl0ZW1zIGFib3ZlIG91ciBtYXhpbXVtXG4gICAgaWYgKG1heEl0ZW1zICYmIG1heEl0ZW1zID4gZGVmYXVsdE1heEl0ZW1zKSB7XG4gICAgICBtYXhJdGVtcyA9IGRlZmF1bHRNYXhJdGVtcztcbiAgICB9XG5cbiAgICAvLyBEb24ndCBhbGxvdyB1c2VyIHRvIHNldCBtaW4gaXRlbXMgYWJvdmUgb3VyIG1heGltdW1cbiAgICBpZiAobWluSXRlbXMgJiYgbWluSXRlbXMgPiBkZWZhdWx0TWF4SXRlbXMpIHtcbiAgICAgIG1pbkl0ZW1zID0gbWF4SXRlbXM7XG4gICAgfVxuICB9XG5cbiAgY29uc3Qgb3B0aW9uYWxzUHJvYmFiaWxpdHkgPSBvcHRpb25BUEkoJ2Fsd2F5c0Zha2VPcHRpb25hbHMnKSA9PT0gdHJ1ZSA/IDEuMCA6IG9wdGlvbkFQSSgnb3B0aW9uYWxzUHJvYmFiaWxpdHknKTtcbiAgY29uc3QgZml4ZWRQcm9iYWJpbGl0aWVzID0gb3B0aW9uQVBJKCdhbHdheXNGYWtlT3B0aW9uYWxzJykgfHwgb3B0aW9uQVBJKCdmaXhlZFByb2JhYmlsaXRpZXMnKSB8fCBmYWxzZTtcblxuICBsZXQgbGVuZ3RoID0gcmFuZG9tLm51bWJlcihtaW5JdGVtcywgbWF4SXRlbXMsIDEsIDUpO1xuXG4gIGlmIChvcHRpb25hbHNQcm9iYWJpbGl0eSAhPT0gbnVsbCkge1xuICAgIGxlbmd0aCA9IE1hdGgubWF4KGZpeGVkUHJvYmFiaWxpdGllc1xuICAgICAgPyBNYXRoLnJvdW5kKChtYXhJdGVtcyB8fCBsZW5ndGgpICogb3B0aW9uYWxzUHJvYmFiaWxpdHkpXG4gICAgICA6IE1hdGguYWJzKHJhbmRvbS5udW1iZXIobWluSXRlbXMsIG1heEl0ZW1zKSAqIG9wdGlvbmFsc1Byb2JhYmlsaXR5KSwgbWluSXRlbXMgfHwgMCk7XG4gIH1cblxuICAvLyBUT0RPIGJlbG93IGxvb2tzIGJhZC4gU2hvdWxkIGFkZGl0aW9uYWxJdGVtcyBiZSBjb3BpZWQgYXMtaXM/XG4gIGNvbnN0IHNhbXBsZSA9IHR5cGVvZiB2YWx1ZS5hZGRpdGlvbmFsSXRlbXMgPT09ICdvYmplY3QnID8gdmFsdWUuYWRkaXRpb25hbEl0ZW1zIDoge307XG5cbiAgZm9yIChsZXQgY3VycmVudCA9IGl0ZW1zLmxlbmd0aDsgY3VycmVudCA8IGxlbmd0aDsgY3VycmVudCArPSAxKSB7XG4gICAgY29uc3QgaXRlbVN1YnBhdGggPSBwYXRoLmNvbmNhdChbJ2l0ZW1zJywgY3VycmVudF0pO1xuICAgIGNvbnN0IGVsZW1lbnQgPSB0cmF2ZXJzZUNhbGxiYWNrKHZhbHVlLml0ZW1zIHx8IHNhbXBsZSwgaXRlbVN1YnBhdGgsIHJlc29sdmUpO1xuXG4gICAgaXRlbXMucHVzaChlbGVtZW50KTtcbiAgfVxuXG4gIGlmICh2YWx1ZS5jb250YWlucyAmJiBsZW5ndGggPiAwKSB7XG4gICAgY29uc3QgaWR4ID0gcmFuZG9tLm51bWJlcigwLCBsZW5ndGggLSAxKTtcblxuICAgIGl0ZW1zW2lkeF0gPSB0cmF2ZXJzZUNhbGxiYWNrKHZhbHVlLmNvbnRhaW5zLCBwYXRoLmNvbmNhdChbJ2l0ZW1zJywgaWR4XSksIHJlc29sdmUpO1xuICB9XG5cbiAgaWYgKHZhbHVlLnVuaXF1ZUl0ZW1zKSB7XG4gICAgcmV0dXJuIHVuaXF1ZShwYXRoLmNvbmNhdChbJ2l0ZW1zJ10pLCBpdGVtcywgdmFsdWUsIHNhbXBsZSwgcmVzb2x2ZSwgdHJhdmVyc2VDYWxsYmFjayk7XG4gIH1cblxuICByZXR1cm4gaXRlbXM7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGFycmF5VHlwZTtcbiIsICJpbXBvcnQgcmFuZG9tIGZyb20gJy4uL2NvcmUvcmFuZG9tLm1qcyc7XG5pbXBvcnQgZW52IGZyb20gJy4uL2NvcmUvY29uc3RhbnRzLm1qcyc7XG5cbmZ1bmN0aW9uIG51bWJlclR5cGUodmFsdWUpIHtcbiAgbGV0IG1pbiA9ICh0eXBlb2YgdmFsdWUubWluaW11bSA9PT0gJ3VuZGVmaW5lZCcgfHwgdmFsdWUubWluaW11bSA9PT0gLU51bWJlci5NQVhfVkFMVUUpID8gZW52Lk1JTl9JTlRFR0VSIDogdmFsdWUubWluaW11bTtcbiAgbGV0IG1heCA9ICh0eXBlb2YgdmFsdWUubWF4aW11bSA9PT0gJ3VuZGVmaW5lZCcgfHwgdmFsdWUubWF4aW11bSA9PT0gTnVtYmVyLk1BWF9WQUxVRSkgPyBlbnYuTUFYX0lOVEVHRVIgOiB2YWx1ZS5tYXhpbXVtO1xuXG4gIGNvbnN0IG11bHRpcGxlT2YgPSB2YWx1ZS5tdWx0aXBsZU9mO1xuICBjb25zdCBkZWNpbWFscyA9IG11bHRpcGxlT2YgJiYgU3RyaW5nKG11bHRpcGxlT2YpLm1hdGNoKC9lLShcXGQpfFxcLihcXGQrKSQvKTtcblxuICBpZiAoZGVjaW1hbHMpIHtcbiAgICBjb25zdCBudW1iZXIgPSAoKE1hdGgucmFuZG9tKCkgKiByYW5kb20ubnVtYmVyKDAsIDEwKSkgKyAxKSAqIG11bHRpcGxlT2Y7XG4gICAgY29uc3QgdHJ1bmNhdGUgPSBkZWNpbWFsc1sxXSB8fCBkZWNpbWFsc1syXS5sZW5ndGg7XG4gICAgY29uc3QgcmVzdWx0ID0gcGFyc2VGbG9hdChudW1iZXIudG9GaXhlZCh0cnVuY2F0ZSkpO1xuICAgIGNvbnN0IGJhc2UgPSByYW5kb20ubnVtYmVyKG1pbiwgbWF4IC0gMSk7XG5cbiAgICBpZiAoIVN0cmluZyhyZXN1bHQpLmluY2x1ZGVzKCcuJykpIHtcbiAgICAgIHJldHVybiAoYmFzZSArIHJlc3VsdCkudG9FeHBvbmVudGlhbCgpO1xuICAgIH1cbiAgICByZXR1cm4gYmFzZSArIHJlc3VsdDtcbiAgfVxuXG4gIGlmIChtdWx0aXBsZU9mKSB7XG4gICAgbWF4ID0gTWF0aC5mbG9vcihtYXggLyBtdWx0aXBsZU9mKSAqIG11bHRpcGxlT2Y7XG4gICAgbWluID0gTWF0aC5jZWlsKG1pbiAvIG11bHRpcGxlT2YpICogbXVsdGlwbGVPZjtcbiAgfVxuXG4gIGlmICh2YWx1ZS5leGNsdXNpdmVNaW5pbXVtICYmIG1pbiA9PT0gdmFsdWUubWluaW11bSkge1xuICAgIG1pbiArPSBtdWx0aXBsZU9mIHx8IDE7XG4gIH1cblxuICBpZiAodmFsdWUuZXhjbHVzaXZlTWF4aW11bSAmJiBtYXggPT09IHZhbHVlLm1heGltdW0pIHtcbiAgICBtYXggLT0gbXVsdGlwbGVPZiB8fCAxO1xuICB9XG5cbiAgaWYgKG1pbiA+IG1heCkge1xuICAgIHJldHVybiBOYU47XG4gIH1cblxuICBpZiAobXVsdGlwbGVPZikge1xuICAgIGxldCBiYXNlID0gcmFuZG9tLm51bWJlcihNYXRoLmZsb29yKG1pbiAvIG11bHRpcGxlT2YpLCBNYXRoLmZsb29yKG1heCAvIG11bHRpcGxlT2YpKSAqIG11bHRpcGxlT2Y7XG5cbiAgICB3aGlsZSAoYmFzZSA8IG1pbikge1xuICAgICAgYmFzZSArPSBtdWx0aXBsZU9mO1xuICAgIH1cblxuICAgIHJldHVybiBiYXNlO1xuICB9XG5cbiAgcmV0dXJuIHJhbmRvbS5udW1iZXIobWluLCBtYXgsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB2YWx1ZS50eXBlICE9PSAnaW50ZWdlcicpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBudW1iZXJUeXBlO1xuIiwgImltcG9ydCBudW1iZXIgZnJvbSAnLi9udW1iZXIubWpzJztcblxuLy8gVGhlIGBpbnRlZ2VyYCB0eXBlIGlzIGp1c3QgYSB3cmFwcGVyIGZvciB0aGUgYG51bWJlcmAgdHlwZS4gVGhlIGBudW1iZXJgIHR5cGVcbi8vIHJldHVybnMgZmxvYXRpbmcgcG9pbnQgbnVtYmVycywgYW5kIGBpbnRlZ2VyYCB0eXBlIHRydW5jYXRlcyB0aGUgZnJhY3Rpb25cbi8vIHBhcnQsIGxlYXZpbmcgdGhlIHJlc3VsdCBhcyBhbiBpbnRlZ2VyLlxuXG5mdW5jdGlvbiBpbnRlZ2VyVHlwZSh2YWx1ZSkge1xuICByZXR1cm4gTWF0aC5mbG9vcihudW1iZXIoeyAuLi52YWx1ZSB9KSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGludGVnZXJUeXBlO1xuIiwgImltcG9ydCByYW5kb20gZnJvbSAnLi4vY29yZS9yYW5kb20ubWpzJztcblxuY29uc3QgTElQU1VNX1dPUkRTID0gYExvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0IGNvbnNlY3RldHVyIGFkaXBpc2ljaW5nIGVsaXQgc2VkIGRvIGVpdXNtb2QgdGVtcG9yIGluY2lkaWR1bnQgdXQgbGFib3JlXG5ldCBkb2xvcmUgbWFnbmEgYWxpcXVhIFV0IGVuaW0gYWQgbWluaW0gdmVuaWFtIHF1aXMgbm9zdHJ1ZCBleGVyY2l0YXRpb24gdWxsYW1jbyBsYWJvcmlzIG5pc2kgdXQgYWxpcXVpcCBleCBlYVxuY29tbW9kbyBjb25zZXF1YXQgRHVpcyBhdXRlIGlydXJlIGRvbG9yIGluIHJlcHJlaGVuZGVyaXQgaW4gdm9sdXB0YXRlIHZlbGl0IGVzc2UgY2lsbHVtIGRvbG9yZSBldSBmdWdpYXQgbnVsbGFcbnBhcmlhdHVyIEV4Y2VwdGV1ciBzaW50IG9jY2FlY2F0IGN1cGlkYXRhdCBub24gcHJvaWRlbnQgc3VudCBpbiBjdWxwYSBxdWkgb2ZmaWNpYSBkZXNlcnVudCBtb2xsaXQgYW5pbSBpZCBlc3RcbmxhYm9ydW1gLnNwbGl0KC9cXFcvKTtcblxuLyoqXG4gKiBHZW5lcmF0ZXMgcmFuZG9taXplZCBhcnJheSBvZiBzaW5nbGUgbG9yZW0gaXBzdW0gd29yZHMuXG4gKlxuICogQHBhcmFtIGxlbmd0aFxuICogQHJldHVybnMge0FycmF5LjxzdHJpbmc+fVxuICovXG5mdW5jdGlvbiB3b3Jkc0dlbmVyYXRvcihsZW5ndGgpIHtcbiAgY29uc3Qgd29yZHMgPSByYW5kb20uc2h1ZmZsZShMSVBTVU1fV09SRFMpO1xuXG4gIHJldHVybiB3b3Jkcy5zbGljZSgwLCBsZW5ndGgpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB3b3Jkc0dlbmVyYXRvcjtcbiIsICJpbXBvcnQgY29uc3RhbnRzIGZyb20gJy4uL2NvcmUvY29uc3RhbnRzLm1qcyc7XG5pbXBvcnQgcmFuZG9tIGZyb20gJy4uL2NvcmUvcmFuZG9tLm1qcyc7XG5pbXBvcnQgd29yZHMgZnJvbSAnLi4vZ2VuZXJhdG9ycy93b3Jkcy5tanMnO1xuaW1wb3J0IHV0aWxzIGZyb20gJy4uL2NvcmUvdXRpbHMubWpzJztcbmltcG9ydCBvcHRpb25BUEkgZnJvbSAnLi4vYXBpL29wdGlvbi5tanMnO1xuXG4vLyBmYWxsYmFjayBnZW5lcmF0b3JcbmNvbnN0IGFueVR5cGUgPSB7IHR5cGU6IGNvbnN0YW50cy5BTExPV0VEX1RZUEVTIH07XG5cbi8vIFRPRE8gcHJvdmlkZSB0eXBlc1xuZnVuY3Rpb24gb2JqZWN0VHlwZSh2YWx1ZSwgcGF0aCwgcmVzb2x2ZSwgdHJhdmVyc2VDYWxsYmFjaykge1xuICBjb25zdCBwcm9wcyA9IHt9O1xuXG4gIGNvbnN0IHByb3BlcnRpZXMgPSB2YWx1ZS5wcm9wZXJ0aWVzIHx8IHt9O1xuICBjb25zdCBwYXR0ZXJuUHJvcGVydGllcyA9IHZhbHVlLnBhdHRlcm5Qcm9wZXJ0aWVzIHx8IHt9O1xuICBjb25zdCByZXF1aXJlZFByb3BlcnRpZXMgPSB0eXBlb2YgdmFsdWUucmVxdWlyZWQgPT09ICdib29sZWFuJyA/IFtdIDogKHZhbHVlLnJlcXVpcmVkIHx8IFtdKS5zbGljZSgpO1xuICBjb25zdCBhbGxvd3NBZGRpdGlvbmFsID0gdmFsdWUuYWRkaXRpb25hbFByb3BlcnRpZXMgIT09IGZhbHNlO1xuXG4gIGNvbnN0IHByb3BlcnR5S2V5cyA9IE9iamVjdC5rZXlzKHByb3BlcnRpZXMpO1xuICBjb25zdCBwYXR0ZXJuUHJvcGVydHlLZXlzID0gT2JqZWN0LmtleXMocGF0dGVyblByb3BlcnRpZXMpO1xuICBjb25zdCBvcHRpb25hbFByb3BlcnRpZXMgPSBwcm9wZXJ0eUtleXMuY29uY2F0KHBhdHRlcm5Qcm9wZXJ0eUtleXMpLnJlZHVjZSgoX3Jlc3BvbnNlLCBfa2V5KSA9PiB7XG4gICAgaWYgKHJlcXVpcmVkUHJvcGVydGllcy5pbmRleE9mKF9rZXkpID09PSAtMSkgX3Jlc3BvbnNlLnB1c2goX2tleSk7XG4gICAgcmV0dXJuIF9yZXNwb25zZTtcbiAgfSwgW10pO1xuICBjb25zdCBhbGxQcm9wZXJ0aWVzID0gcmVxdWlyZWRQcm9wZXJ0aWVzLmNvbmNhdChvcHRpb25hbFByb3BlcnRpZXMpO1xuXG4gIGNvbnN0IGFkZGl0aW9uYWxQcm9wZXJ0aWVzID0gYWxsb3dzQWRkaXRpb25hbCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgPyAodmFsdWUuYWRkaXRpb25hbFByb3BlcnRpZXMgPT09IHRydWUgPyBhbnlUeXBlIDogdmFsdWUuYWRkaXRpb25hbFByb3BlcnRpZXMpXG4gICAgOiB2YWx1ZS5hZGRpdGlvbmFsUHJvcGVydGllcztcblxuICBpZiAoIWFsbG93c0FkZGl0aW9uYWxcbiAgICAmJiBwcm9wZXJ0eUtleXMubGVuZ3RoID09PSAwXG4gICAgJiYgcGF0dGVyblByb3BlcnR5S2V5cy5sZW5ndGggPT09IDBcbiAgICAmJiB1dGlscy5oYXNQcm9wZXJ0aWVzKHZhbHVlLCAnbWluUHJvcGVydGllcycsICdtYXhQcm9wZXJ0aWVzJywgJ2RlcGVuZGVuY2llcycsICdyZXF1aXJlZCcpXG4gICkge1xuICAgIC8vIGp1c3Qgbm90aGluZ1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgaWYgKG9wdGlvbkFQSSgncmVxdWlyZWRPbmx5JykgPT09IHRydWUpIHtcbiAgICByZXF1aXJlZFByb3BlcnRpZXMuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgaWYgKHByb3BlcnRpZXNba2V5XSkge1xuICAgICAgICBwcm9wc1trZXldID0gcHJvcGVydGllc1trZXldO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRyYXZlcnNlQ2FsbGJhY2socHJvcHMsIHBhdGguY29uY2F0KFsncHJvcGVydGllcyddKSwgcmVzb2x2ZSwgdmFsdWUpO1xuICB9XG5cbiAgY29uc3Qgb3B0aW9uYWxzUHJvYmFiaWxpdHkgPSBvcHRpb25BUEkoJ2Fsd2F5c0Zha2VPcHRpb25hbHMnKSA9PT0gdHJ1ZSA/IDEuMCA6IG9wdGlvbkFQSSgnb3B0aW9uYWxzUHJvYmFiaWxpdHknKTtcbiAgY29uc3QgZml4ZWRQcm9iYWJpbGl0aWVzID0gb3B0aW9uQVBJKCdhbHdheXNGYWtlT3B0aW9uYWxzJykgfHwgb3B0aW9uQVBJKCdmaXhlZFByb2JhYmlsaXRpZXMnKSB8fCBmYWxzZTtcbiAgY29uc3QgaWdub3JlUHJvcGVydGllcyA9IG9wdGlvbkFQSSgnaWdub3JlUHJvcGVydGllcycpIHx8IFtdO1xuICBjb25zdCByZXVzZVByb3BzID0gb3B0aW9uQVBJKCdyZXVzZVByb3BlcnRpZXMnKTtcbiAgY29uc3QgZmlsbFByb3BzID0gb3B0aW9uQVBJKCdmaWxsUHJvcGVydGllcycpO1xuXG4gIGNvbnN0IG1heCA9IHZhbHVlLm1heFByb3BlcnRpZXMgfHwgKGFsbFByb3BlcnRpZXMubGVuZ3RoICsgKGFsbG93c0FkZGl0aW9uYWwgPyByYW5kb20ubnVtYmVyKDEsIDUpIDogMCkpO1xuXG4gIGxldCBtaW4gPSBNYXRoLm1heCh2YWx1ZS5taW5Qcm9wZXJ0aWVzIHx8IDAsIHJlcXVpcmVkUHJvcGVydGllcy5sZW5ndGgpO1xuICBsZXQgbmVlZGVkRXh0cmFzID0gTWF0aC5tYXgoMCwgYWxsUHJvcGVydGllcy5sZW5ndGggLSBtaW4pO1xuXG4gIGlmIChhbGxQcm9wZXJ0aWVzLmxlbmd0aCA9PT0gMSAmJiAhcmVxdWlyZWRQcm9wZXJ0aWVzLmxlbmd0aCkge1xuICAgIG1pbiA9IE1hdGgubWF4KHJhbmRvbS5udW1iZXIoZmlsbFByb3BzID8gMSA6IDAsIG1heCksIG1pbik7XG4gIH1cblxuICBpZiAob3B0aW9uYWxzUHJvYmFiaWxpdHkgIT09IG51bGwpIHtcbiAgICBpZiAoZml4ZWRQcm9iYWJpbGl0aWVzID09PSB0cnVlKSB7XG4gICAgICBuZWVkZWRFeHRyYXMgPSBNYXRoLnJvdW5kKChtaW4gLSByZXF1aXJlZFByb3BlcnRpZXMubGVuZ3RoKSArIChvcHRpb25hbHNQcm9iYWJpbGl0eSAqIChhbGxQcm9wZXJ0aWVzLmxlbmd0aCAtIG1pbikpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbmVlZGVkRXh0cmFzID0gcmFuZG9tLm51bWJlcihtaW4gLSByZXF1aXJlZFByb3BlcnRpZXMubGVuZ3RoLCBvcHRpb25hbHNQcm9iYWJpbGl0eSAqIChhbGxQcm9wZXJ0aWVzLmxlbmd0aCAtIG1pbikpO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGV4dHJhUHJvcGVydGllc1JhbmRvbU9yZGVyID0gcmFuZG9tLnNodWZmbGUob3B0aW9uYWxQcm9wZXJ0aWVzKS5zbGljZSgwLCBuZWVkZWRFeHRyYXMpO1xuICBjb25zdCBleHRyYVByb3BlcnRpZXMgPSBvcHRpb25hbFByb3BlcnRpZXMuZmlsdGVyKF9pdGVtID0+IHtcbiAgICByZXR1cm4gZXh0cmFQcm9wZXJ0aWVzUmFuZG9tT3JkZXIuaW5kZXhPZihfaXRlbSkgIT09IC0xO1xuICB9KTtcblxuICAvLyBwcm9wZXJ0aWVzIGFyZSByZWFkIGZyb20gcmlnaHQtdG8tbGVmdFxuICBjb25zdCBfbGltaXQgPSBvcHRpb25hbHNQcm9iYWJpbGl0eSAhPT0gbnVsbCB8fCByZXF1aXJlZFByb3BlcnRpZXMubGVuZ3RoID09PSBtYXggPyBtYXggOiByYW5kb20ubnVtYmVyKDAsIG1heCk7XG4gIGNvbnN0IF9wcm9wcyA9IHJlcXVpcmVkUHJvcGVydGllcy5jb25jYXQocmFuZG9tLnNodWZmbGUoZXh0cmFQcm9wZXJ0aWVzKS5zbGljZSgwLCBfbGltaXQpKS5zbGljZSgwLCBtYXgpO1xuICBjb25zdCBfZGVmbnMgPSBbXTtcbiAgY29uc3QgX2RlcHMgPSBbXTtcblxuICBpZiAodmFsdWUuZGVwZW5kZW5jaWVzKSB7XG4gICAgT2JqZWN0LmtleXModmFsdWUuZGVwZW5kZW5jaWVzKS5mb3JFYWNoKHByb3AgPT4ge1xuICAgICAgY29uc3QgX3JlcXVpcmVkID0gdmFsdWUuZGVwZW5kZW5jaWVzW3Byb3BdO1xuXG4gICAgICBpZiAoX3Byb3BzLmluZGV4T2YocHJvcCkgIT09IC0xKSB7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KF9yZXF1aXJlZCkpIHtcbiAgICAgICAgICAvLyBwcm9wZXJ0eS1kZXBlbmRlbmNpZXNcbiAgICAgICAgICBfcmVxdWlyZWQuZm9yRWFjaChzdWIgPT4ge1xuICAgICAgICAgICAgaWYgKF9wcm9wcy5pbmRleE9mKHN1YikgPT09IC0xKSB7XG4gICAgICAgICAgICAgIF9wcm9wcy5wdXNoKHN1Yik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShfcmVxdWlyZWQub25lT2YgfHwgX3JlcXVpcmVkLmFueU9mKSkge1xuICAgICAgICAgIGNvbnN0IHZhbHVlcyA9IF9yZXF1aXJlZC5vbmVPZiB8fCBfcmVxdWlyZWQuYW55T2Y7XG5cbiAgICAgICAgICBfZGVwcy5wdXNoKHsgcHJvcCwgdmFsdWVzIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIF9kZWZucy5wdXNoKF9yZXF1aXJlZCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIHNjaGVtYS1kZXBlbmRlbmNpZXNcbiAgICBpZiAoX2RlZm5zLmxlbmd0aCkge1xuICAgICAgZGVsZXRlIHZhbHVlLmRlcGVuZGVuY2llcztcblxuICAgICAgcmV0dXJuIHRyYXZlcnNlQ2FsbGJhY2soe1xuICAgICAgICBhbGxPZjogX2RlZm5zLmNvbmNhdCh2YWx1ZSksXG4gICAgICB9LCBwYXRoLmNvbmNhdChbJ3Byb3BlcnRpZXMnXSksIHJlc29sdmUsIHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBjb25zdCBza2lwcGVkID0gW107XG4gIGNvbnN0IG1pc3NpbmcgPSBbXTtcblxuICBfcHJvcHMuZm9yRWFjaChrZXkgPT4ge1xuICAgIGlmIChwcm9wZXJ0aWVzW2tleV0gJiYgWyd7fScsICd0cnVlJ10uaW5jbHVkZXMoSlNPTi5zdHJpbmdpZnkocHJvcGVydGllc1trZXldLm5vdCkpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpZ25vcmVQcm9wZXJ0aWVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBpZiAoKGlnbm9yZVByb3BlcnRpZXNbaV0gaW5zdGFuY2VvZiBSZWdFeHAgJiYgaWdub3JlUHJvcGVydGllc1tpXS50ZXN0KGtleSkpXG4gICAgICAgIHx8ICh0eXBlb2YgaWdub3JlUHJvcGVydGllc1tpXSA9PT0gJ3N0cmluZycgJiYgaWdub3JlUHJvcGVydGllc1tpXSA9PT0ga2V5KVxuICAgICAgICB8fCAodHlwZW9mIGlnbm9yZVByb3BlcnRpZXNbaV0gPT09ICdmdW5jdGlvbicgJiYgaWdub3JlUHJvcGVydGllc1tpXShwcm9wZXJ0aWVzW2tleV0sIGtleSkpKSB7XG4gICAgICAgIHNraXBwZWQucHVzaChrZXkpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGFkZGl0aW9uYWxQcm9wZXJ0aWVzID09PSBmYWxzZSkge1xuICAgICAgaWYgKHJlcXVpcmVkUHJvcGVydGllcy5pbmRleE9mKGtleSkgIT09IC0xKSB7XG4gICAgICAgIHByb3BzW2tleV0gPSBwcm9wZXJ0aWVzW2tleV07XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHByb3BlcnRpZXNba2V5XSkge1xuICAgICAgcHJvcHNba2V5XSA9IHByb3BlcnRpZXNba2V5XTtcbiAgICB9XG5cbiAgICBsZXQgZm91bmQ7XG5cbiAgICAvLyB0aGVuIHRyeSBwYXR0ZXJuUHJvcGVydGllc1xuICAgIHBhdHRlcm5Qcm9wZXJ0eUtleXMuZm9yRWFjaChfa2V5ID0+IHtcbiAgICAgIGlmIChrZXkubWF0Y2gobmV3IFJlZ0V4cChfa2V5KSkpIHtcbiAgICAgICAgZm91bmQgPSB0cnVlO1xuXG4gICAgICAgIGlmIChwcm9wc1trZXldKSB7XG4gICAgICAgICAgdXRpbHMubWVyZ2UocHJvcHNba2V5XSwgcGF0dGVyblByb3BlcnRpZXNbX2tleV0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHByb3BzW3JhbmRvbS5yYW5kZXhwKGtleSldID0gcGF0dGVyblByb3BlcnRpZXNbX2tleV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmICghZm91bmQpIHtcbiAgICAgIC8vIHRyeSBwYXR0ZXJuUHJvcGVydGllcyBhZ2FpbixcbiAgICAgIGNvbnN0IHN1YnNjaGVtYSA9IHBhdHRlcm5Qcm9wZXJ0aWVzW2tleV0gfHwgYWRkaXRpb25hbFByb3BlcnRpZXM7XG5cbiAgICAgIC8vIEZJWE1FOiBhbGxvdyBhbnlUeXBlIGFzIGZhbGxiYWNrIHdoZW4gbm8gc3Vic2NoZW1hIGlzIGdpdmVuP1xuXG4gICAgICBpZiAoc3Vic2NoZW1hICYmIGFkZGl0aW9uYWxQcm9wZXJ0aWVzICE9PSBmYWxzZSkge1xuICAgICAgICAvLyBvdGhlcndpc2Ugd2UgY2FuIHVzZSBhZGRpdGlvbmFsUHJvcGVydGllcz9cbiAgICAgICAgcHJvcHNbcGF0dGVyblByb3BlcnRpZXNba2V5XSA/IHJhbmRvbS5yYW5kZXhwKGtleSkgOiBrZXldID0gcHJvcGVydGllc1trZXldIHx8IHN1YnNjaGVtYTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1pc3NpbmcucHVzaChrZXkpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgLy8gZGlzY2FyZCBhbHJlYWR5IGlnbm9yZWQgcHJvcHMgaWYgdGhleSdyZSBub3QgcmVxdWlyZWQgdG8gYmUgZmlsbGVkLi4uXG4gIGxldCBjdXJyZW50ID0gT2JqZWN0LmtleXMocHJvcHMpLmxlbmd0aCArIChmaWxsUHJvcHMgPyAwIDogc2tpcHBlZC5sZW5ndGgpO1xuXG4gIC8vIGdlbmVyYXRlIGR5bmFtaWMgc3VmZml4IGZvciBhZGRpdGlvbmFsIHByb3BzLi4uXG4gIGNvbnN0IGhhc2ggPSBzdWZmaXggPT4gcmFuZG9tLnJhbmRleHAoYF8/W19hLWZcXFxcZF17MSwzfSR7c3VmZml4ID8gJ1xcXFwkPycgOiAnJ31gKTtcblxuICBmdW5jdGlvbiBnZXQoZnJvbSkge1xuICAgIGxldCBvbmU7XG5cbiAgICBkbyB7XG4gICAgICBpZiAoIWZyb20ubGVuZ3RoKSBicmVhaztcbiAgICAgIG9uZSA9IGZyb20uc2hpZnQoKTtcbiAgICB9IHdoaWxlIChwcm9wc1tvbmVdKTtcblxuICAgIHJldHVybiBvbmU7XG4gIH1cblxuICBsZXQgbWluUHJvcHMgPSBtaW47XG4gIGlmIChhbGxvd3NBZGRpdGlvbmFsICYmICFyZXF1aXJlZFByb3BlcnRpZXMubGVuZ3RoKSB7XG4gICAgbWluUHJvcHMgPSBNYXRoLm1heChvcHRpb25hbHNQcm9iYWJpbGl0eSA9PT0gbnVsbCB8fCBhZGRpdGlvbmFsUHJvcGVydGllcyA/IHJhbmRvbS5udW1iZXIoZmlsbFByb3BzID8gMSA6IDAsIG1heCkgOiAwLCBtaW4pO1xuICB9XG5cbiAgaWYgKCFleHRyYVByb3BlcnRpZXMubGVuZ3RoICYmICFuZWVkZWRFeHRyYXMgJiYgYWxsb3dzQWRkaXRpb25hbCAmJiBmaXhlZFByb2JhYmlsaXRpZXMgPT09IHRydWUgJiYgZmlsbFByb3BzKSB7XG4gICAgY29uc3QgbGltaXQgPSByYW5kb20ubnVtYmVyKDAsIG1heCk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpbWl0OyBpICs9IDEpIHtcbiAgICAgIHByb3BzW3dvcmRzKDEpICsgaGFzaChsaW1pdFtpXSldID0gYWRkaXRpb25hbFByb3BlcnRpZXMgfHwgYW55VHlwZTtcbiAgICB9XG4gIH1cblxuICB3aGlsZSAoZmlsbFByb3BzKSB7XG4gICAgaWYgKCEocGF0dGVyblByb3BlcnR5S2V5cy5sZW5ndGggfHwgYWxsb3dzQWRkaXRpb25hbCkpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGlmIChjdXJyZW50ID49IG1pblByb3BzKSB7XG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICBpZiAoYWxsb3dzQWRkaXRpb25hbCkge1xuICAgICAgaWYgKHJldXNlUHJvcHMgJiYgKChwcm9wZXJ0eUtleXMubGVuZ3RoIC0gY3VycmVudCkgPiBtaW5Qcm9wcykpIHtcbiAgICAgICAgbGV0IGNvdW50ID0gMDtcbiAgICAgICAgbGV0IGtleTtcblxuICAgICAgICBkbyB7XG4gICAgICAgICAgY291bnQgKz0gMTtcblxuICAgICAgICAgIC8vIHNraXAgbGFyZ2Ugb2JqZWN0c1xuICAgICAgICAgIGlmIChjb3VudCA+IDEwMDApIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGtleSA9IGdldChyZXF1aXJlZFByb3BlcnRpZXMpIHx8IHJhbmRvbS5waWNrKHByb3BlcnR5S2V5cyk7XG4gICAgICAgIH0gd2hpbGUgKHR5cGVvZiBwcm9wc1trZXldICE9PSAndW5kZWZpbmVkJyk7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBwcm9wc1trZXldID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIHByb3BzW2tleV0gPSBwcm9wZXJ0aWVzW2tleV07XG4gICAgICAgICAgY3VycmVudCArPSAxO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHBhdHRlcm5Qcm9wZXJ0eUtleXMubGVuZ3RoICYmICFhZGRpdGlvbmFsUHJvcGVydGllcykge1xuICAgICAgICBjb25zdCBwcm9wID0gcmFuZG9tLnBpY2socGF0dGVyblByb3BlcnR5S2V5cyk7XG4gICAgICAgIGNvbnN0IHdvcmQgPSByYW5kb20ucmFuZGV4cChwcm9wKTtcblxuICAgICAgICBpZiAoIXByb3BzW3dvcmRdKSB7XG4gICAgICAgICAgcHJvcHNbd29yZF0gPSBwYXR0ZXJuUHJvcGVydGllc1twcm9wXTtcbiAgICAgICAgICBjdXJyZW50ICs9IDE7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHdvcmQgPSBnZXQocmVxdWlyZWRQcm9wZXJ0aWVzKSB8fCAod29yZHMoMSkgKyBoYXNoKCkpO1xuXG4gICAgICAgIGlmICghcHJvcHNbd29yZF0pIHtcbiAgICAgICAgICBwcm9wc1t3b3JkXSA9IGFkZGl0aW9uYWxQcm9wZXJ0aWVzIHx8IGFueVR5cGU7XG4gICAgICAgICAgY3VycmVudCArPSAxO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGN1cnJlbnQgPCBtaW4gJiYgaSA8IHBhdHRlcm5Qcm9wZXJ0eUtleXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IF9rZXkgPSBwYXR0ZXJuUHJvcGVydHlLZXlzW2ldO1xuICAgICAgY29uc3Qgd29yZCA9IHJhbmRvbS5yYW5kZXhwKF9rZXkpO1xuXG5cbiAgICAgIGlmICghcHJvcHNbd29yZF0pIHtcbiAgICAgICAgcHJvcHNbd29yZF0gPSBwYXR0ZXJuUHJvcGVydGllc1tfa2V5XTtcbiAgICAgICAgY3VycmVudCArPSAxO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIGZpbGwgdXAtdG8gdGhpcyB2YWx1ZSBhbmQgbm8gbW9yZSFcbiAgaWYgKHJlcXVpcmVkUHJvcGVydGllcy5sZW5ndGggPT09IDAgJiYgKCFhbGxvd3NBZGRpdGlvbmFsIHx8IG9wdGlvbmFsc1Byb2JhYmlsaXR5ID09PSBmYWxzZSkpIHtcbiAgICBjb25zdCBtYXhpbXVtID0gcmFuZG9tLm51bWJlcihtaW4sIG1heCk7XG5cbiAgICBmb3IgKDsgY3VycmVudCA8IG1heGltdW07KSB7XG4gICAgICBjb25zdCB3b3JkID0gZ2V0KHByb3BlcnR5S2V5cyk7XG5cbiAgICAgIGlmICh3b3JkKSB7XG4gICAgICAgIHByb3BzW3dvcmRdID0gcHJvcGVydGllc1t3b3JkXTtcbiAgICAgIH1cblxuICAgICAgY3VycmVudCArPSAxO1xuICAgIH1cbiAgfVxuXG4gIGxldCBzb3J0ZWRPYmogPSBwcm9wcztcbiAgaWYgKG9wdGlvbkFQSSgnc29ydFByb3BlcnRpZXMnKSAhPT0gbnVsbCkge1xuICAgIGNvbnN0IG9yaWdpbmFsS2V5cyA9IE9iamVjdC5rZXlzKHByb3BlcnRpZXMpO1xuICAgIGNvbnN0IHNvcnRlZEtleXMgPSBPYmplY3Qua2V5cyhwcm9wcykuc29ydCgoYSwgYikgPT4ge1xuICAgICAgcmV0dXJuIG9wdGlvbkFQSSgnc29ydFByb3BlcnRpZXMnKSA/IGEubG9jYWxlQ29tcGFyZShiKSA6IG9yaWdpbmFsS2V5cy5pbmRleE9mKGEpIC0gb3JpZ2luYWxLZXlzLmluZGV4T2YoYik7XG4gICAgfSk7XG5cbiAgICBzb3J0ZWRPYmogPSBzb3J0ZWRLZXlzLnJlZHVjZSgobWVtbywga2V5KSA9PiB7XG4gICAgICBtZW1vW2tleV0gPSBwcm9wc1trZXldO1xuICAgICAgcmV0dXJuIG1lbW87XG4gICAgfSwge30pO1xuICB9XG5cbiAgY29uc3QgcmVzdWx0ID0gdHJhdmVyc2VDYWxsYmFjayhzb3J0ZWRPYmosIHBhdGguY29uY2F0KFsncHJvcGVydGllcyddKSwgcmVzb2x2ZSwgdmFsdWUpO1xuXG4gIF9kZXBzLmZvckVhY2goZGVwID0+IHtcbiAgICBmb3IgKGNvbnN0IHN1YiBvZiBkZXAudmFsdWVzKSB7XG4gICAgICAvLyBUT0RPOiB0aGlzIHdvdWxkIG5vdCBjaGVjayBhbGwgcG9zc2liaWxpdGllcywgdG8gZG8gc28sIHdlIHNob3VsZCBcInZhbGlkYXRlXCIgdGhlXG4gICAgICAvLyBnZW5lcmF0ZWQgdmFsdWUgYWdhaW5zdCBldmVyeSBzY2hlbWEuLi4gaG93ZXZlciwgSSBkb24ndCB3YW50IHRvIGluY2x1ZGUgYSB2YWxpZGF0b3IuLi5cbiAgICAgIGlmICh1dGlscy5oYXNWYWx1ZShzdWIucHJvcGVydGllc1tkZXAucHJvcF0sIHJlc3VsdC52YWx1ZVtkZXAucHJvcF0pKSB7XG4gICAgICAgIE9iamVjdC5rZXlzKHN1Yi5wcm9wZXJ0aWVzKS5mb3JFYWNoKG5leHQgPT4ge1xuICAgICAgICAgIGlmIChuZXh0ICE9PSBkZXAucHJvcCkge1xuICAgICAgICAgICAgdXRpbHMubWVyZ2UocmVzdWx0LnZhbHVlLCB0cmF2ZXJzZUNhbGxiYWNrKHN1Yi5wcm9wZXJ0aWVzLCBwYXRoLmNvbmNhdChbJ3Byb3BlcnRpZXMnXSksIHJlc29sdmUsIHZhbHVlKS52YWx1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBvYmplY3RUeXBlO1xuIiwgImltcG9ydCB3b3JkcyBmcm9tICcuL3dvcmRzLm1qcyc7XG5pbXBvcnQgcmFuZG9tIGZyb20gJy4uL2NvcmUvcmFuZG9tLm1qcyc7XG5cbi8qKlxuICogSGVscGVyIGZ1bmN0aW9uIHVzZWQgYnkgdGh1bmtHZW5lcmF0b3IgdG8gcHJvZHVjZSBzb21lIHdvcmRzIGZvciB0aGUgZmluYWwgcmVzdWx0LlxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIHByb2R1Y2UoKSB7XG4gIGNvbnN0IGxlbmd0aCA9IHJhbmRvbS5udW1iZXIoMSwgNSk7XG5cbiAgcmV0dXJuIHdvcmRzKGxlbmd0aCkuam9pbignICcpO1xufVxuXG4vKipcbiAqIEdlbmVyYXRlcyByYW5kb21pemVkIGNvbmNhdGVuYXRlZCBzdHJpbmcgYmFzZWQgb24gd29yZHMgZ2VuZXJhdG9yLlxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIHRodW5rR2VuZXJhdG9yKG1pbiA9IDAsIG1heCA9IDE0MCkge1xuICBjb25zdCBfbWluID0gTWF0aC5tYXgoMCwgbWluKTtcbiAgY29uc3QgX21heCA9IHJhbmRvbS5udW1iZXIoX21pbiwgbWF4KTtcblxuICBsZXQgcmVzdWx0ID0gcHJvZHVjZSgpO1xuXG4gIC8vIGFwcGVuZCB1bnRpbCBsZW5ndGggaXMgcmVhY2hlZFxuICB3aGlsZSAocmVzdWx0Lmxlbmd0aCA8IF9taW4pIHtcbiAgICByZXN1bHQgKz0gcHJvZHVjZSgpO1xuICB9XG5cbiAgLy8gY3V0IGlmIG5lZWRlZFxuICBpZiAocmVzdWx0Lmxlbmd0aCA+IF9tYXgpIHtcbiAgICByZXN1bHQgPSByZXN1bHQuc3Vic3RyKDAsIF9tYXgpO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdGh1bmtHZW5lcmF0b3I7XG4iLCAiaW1wb3J0IHJhbmRvbSBmcm9tICcuLi9jb3JlL3JhbmRvbS5tanMnO1xuXG4vKipcbiAqIEdlbmVyYXRlcyByYW5kb21pemVkIGlwdjQgYWRkcmVzcy5cbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBpcHY0R2VuZXJhdG9yKCkge1xuICByZXR1cm4gWzAsIDAsIDAsIDBdLm1hcCgoKSA9PiB7XG4gICAgcmV0dXJuIHJhbmRvbS5udW1iZXIoMCwgMjU1KTtcbiAgfSkuam9pbignLicpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpcHY0R2VuZXJhdG9yO1xuIiwgImltcG9ydCByYW5kb20gZnJvbSAnLi4vY29yZS9yYW5kb20ubWpzJztcblxuLyoqXG4gKiBHZW5lcmF0ZXMgcmFuZG9taXplZCBkYXRlIHRpbWUgSVNPIGZvcm1hdCBzdHJpbmcuXG4gKlxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gZGF0ZVRpbWVHZW5lcmF0b3IoKSB7XG4gIHJldHVybiByYW5kb20uZGF0ZSgpLnRvSVNPU3RyaW5nKCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGRhdGVUaW1lR2VuZXJhdG9yO1xuIiwgImltcG9ydCBkYXRlVGltZUdlbmVyYXRvciBmcm9tICcuL2RhdGVUaW1lLm1qcyc7XG5cbi8qKlxuICogR2VuZXJhdGVzIHJhbmRvbWl6ZWQgZGF0ZSBmb3JtYXQgc3RyaW5nLlxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGRhdGVHZW5lcmF0b3IoKSB7XG4gIHJldHVybiBkYXRlVGltZUdlbmVyYXRvcigpLnNsaWNlKDAsIDEwKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZGF0ZUdlbmVyYXRvcjtcbiIsICJpbXBvcnQgZGF0ZVRpbWVHZW5lcmF0b3IgZnJvbSAnLi9kYXRlVGltZS5tanMnO1xuXG4vKipcbiAqIEdlbmVyYXRlcyByYW5kb21pemVkIHRpbWUgZm9ybWF0IHN0cmluZy5cbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiB0aW1lR2VuZXJhdG9yKCkge1xuICByZXR1cm4gZGF0ZVRpbWVHZW5lcmF0b3IoKS5zbGljZSgxMSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHRpbWVHZW5lcmF0b3I7XG4iLCAiaW1wb3J0IHJhbmRvbSBmcm9tICcuLi9jb3JlL3JhbmRvbS5tanMnO1xuXG5jb25zdCBGUkFHTUVOVCA9ICdbYS16QS1aXVthLXpBLVowLTkrLS5dKic7XG5jb25zdCBVUklfUEFUVEVSTiA9IGBodHRwcz86Ly97aG9zdG5hbWV9KD86JHtGUkFHTUVOVH0pK2A7XG5jb25zdCBQQVJBTV9QQVRURVJOID0gJyg/OlxcXFw/KFthLXpdezEsN30oPVxcXFx3ezEsNX0pPyYpezAsM30pPyc7XG5cbi8qKlxuICogUHJlZGVmaW5lZCBjb3JlIGZvcm1hdHNcbiAqIEB0eXBlIHtba2V5OiBzdHJpbmddOiBzdHJpbmd9XG4gKi9cbmNvbnN0IHJlZ2V4cHMgPSB7XG4gIGVtYWlsOiAnW2EtekEtWlxcXFxkXVthLXpBLVpcXFxcZC1dezEsMTN9W2EtekEtWlxcXFxkXUB7aG9zdG5hbWV9JyxcbiAgaG9zdG5hbWU6ICdbYS16QS1aXXsxLDMzfVxcXFwuW2Etel17Miw0fScsXG4gIGlwdjY6ICdbYS1mXFxcXGRdezR9KDpbYS1mXFxcXGRdezR9KXs3fScsXG4gIHVyaTogVVJJX1BBVFRFUk4sXG4gIHNsdWc6ICdbYS16QS1aXFxcXGRfLV0rJyxcblxuICAvLyB0eXBlcyBmcm9tIGRyYWZ0LTBbNjddICg/KVxuICAndXJpLXJlZmVyZW5jZSc6IGAke1VSSV9QQVRURVJOfSR7UEFSQU1fUEFUVEVSTn1gLFxuICAndXJpLXRlbXBsYXRlJzogVVJJX1BBVFRFUk4ucmVwbGFjZSgnKD86JywgJyg/Oi9cXFxce1thLXpdWzphLXpBLVowLTktXSpcXFxcfXwnKSxcbiAgJ2pzb24tcG9pbnRlcic6IGAoLyg/OiR7RlJBR01FTlQucmVwbGFjZSgnXSonLCAnL10qJyl9fH5bMDFdKSkrYCxcblxuICAvLyBzb21lIHR5cGVzIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL09BSS9PcGVuQVBJLVNwZWNpZmljYXRpb24vYmxvYi9tYXN0ZXIvdmVyc2lvbnMvMy4wLjEubWQjZGF0YS10eXBlcyAoPylcbiAgdXVpZDogJ15bMC05YS1mXXs4fS0oPzpbMC05YS1mXXs0fS0pezN9WzAtOWEtZl17MTJ9JCcsXG5cbiAgZHVyYXRpb246ICdeUCg/ISQpKChcXFxcZCtZKT8oXFxcXGQrTSk/KFxcXFxkK0QpPyhUKD89XFxcXGQpKFxcXFxkK0gpPyhcXFxcZCtNKT8oXFxcXGQrUyk/KT98KFxcXFxkK1cpPykkJyxcbn07XG5cbnJlZ2V4cHMuaXJpID0gcmVnZXhwc1sndXJpLXJlZmVyZW5jZSddO1xucmVnZXhwc1snaXJpLXJlZmVyZW5jZSddID0gcmVnZXhwc1sndXJpLXJlZmVyZW5jZSddO1xuXG5yZWdleHBzWydpZG4tZW1haWwnXSA9IHJlZ2V4cHMuZW1haWw7XG5yZWdleHBzWydpZG4taG9zdG5hbWUnXSA9IHJlZ2V4cHMuaG9zdG5hbWU7XG5cbmNvbnN0IEFMTE9XRURfRk9STUFUUyA9IG5ldyBSZWdFeHAoYFxcXFx7KCR7T2JqZWN0LmtleXMocmVnZXhwcykuam9pbignfCcpfSlcXFxcfWApO1xuXG4vKipcbiAqIEdlbmVyYXRlcyByYW5kb21pemVkIHN0cmluZyBiYXNpbmcgb24gYSBidWlsdC1pbiByZWdleCBmb3JtYXRcbiAqXG4gKiBAcGFyYW0gY29yZUZvcm1hdFxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gY29yZUZvcm1hdEdlbmVyYXRvcihjb3JlRm9ybWF0KSB7XG4gIHJldHVybiByYW5kb20ucmFuZGV4cChyZWdleHBzW2NvcmVGb3JtYXRdKS5yZXBsYWNlKEFMTE9XRURfRk9STUFUUywgKG1hdGNoLCBrZXkpID0+IHtcbiAgICByZXR1cm4gcmFuZG9tLnJhbmRleHAocmVnZXhwc1trZXldKTtcbiAgfSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvcmVGb3JtYXRHZW5lcmF0b3I7XG4iLCAiaW1wb3J0IHRodW5rIGZyb20gJy4uL2dlbmVyYXRvcnMvdGh1bmsubWpzJztcbmltcG9ydCBpcHY0IGZyb20gJy4uL2dlbmVyYXRvcnMvaXB2NC5tanMnO1xuaW1wb3J0IGRhdGVUaW1lIGZyb20gJy4uL2dlbmVyYXRvcnMvZGF0ZVRpbWUubWpzJztcbmltcG9ydCBkYXRlIGZyb20gJy4uL2dlbmVyYXRvcnMvZGF0ZS5tanMnO1xuaW1wb3J0IHRpbWUgZnJvbSAnLi4vZ2VuZXJhdG9ycy90aW1lLm1qcyc7XG5pbXBvcnQgY29yZUZvcm1hdCBmcm9tICcuLi9nZW5lcmF0b3JzL2NvcmVGb3JtYXQubWpzJztcbmltcG9ydCBvcHRpb25BUEkgZnJvbSAnLi4vYXBpL29wdGlvbi5tanMnO1xuaW1wb3J0IGZvcm1hdCBmcm9tICcuLi9hcGkvZm9ybWF0Lm1qcyc7XG5pbXBvcnQgcmFuZG9tIGZyb20gJy4uL2NvcmUvcmFuZG9tLm1qcyc7XG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vY29yZS91dGlscy5tanMnO1xuXG5mdW5jdGlvbiBnZW5lcmF0ZUZvcm1hdCh2YWx1ZSwgaW52YWxpZCkge1xuICBjb25zdCBjYWxsYmFjayA9IGZvcm1hdCh2YWx1ZS5mb3JtYXQpO1xuXG4gIGlmICh0eXBlb2YgY2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gY2FsbGJhY2sodmFsdWUpO1xuICB9XG5cbiAgc3dpdGNoICh2YWx1ZS5mb3JtYXQpIHtcbiAgICBjYXNlICdkYXRlLXRpbWUnOlxuICAgIGNhc2UgJ2RhdGV0aW1lJzpcbiAgICAgIHJldHVybiBkYXRlVGltZSgpO1xuICAgIGNhc2UgJ2RhdGUnOlxuICAgICAgcmV0dXJuIGRhdGUoKTtcbiAgICBjYXNlICd0aW1lJzpcbiAgICAgIHJldHVybiB0aW1lKCk7XG4gICAgY2FzZSAnaXB2NCc6XG4gICAgICByZXR1cm4gaXB2NCgpO1xuICAgIGNhc2UgJ3JlZ2V4JzpcbiAgICAgIC8vIFRPRE86IGRpc2N1c3NcbiAgICAgIHJldHVybiAnLis/JztcbiAgICBjYXNlICdlbWFpbCc6XG4gICAgY2FzZSAnaG9zdG5hbWUnOlxuICAgIGNhc2UgJ2lwdjYnOlxuICAgIGNhc2UgJ3VyaSc6XG4gICAgY2FzZSAndXJpLXJlZmVyZW5jZSc6XG4gICAgY2FzZSAnaXJpJzpcbiAgICBjYXNlICdpcmktcmVmZXJlbmNlJzpcbiAgICBjYXNlICdpZG4tZW1haWwnOlxuICAgIGNhc2UgJ2lkbi1ob3N0bmFtZSc6XG4gICAgY2FzZSAnanNvbi1wb2ludGVyJzpcbiAgICBjYXNlICdzbHVnJzpcbiAgICBjYXNlICd1cmktdGVtcGxhdGUnOlxuICAgIGNhc2UgJ3V1aWQnOlxuICAgIGNhc2UgJ2R1cmF0aW9uJzpcbiAgICAgIHJldHVybiBjb3JlRm9ybWF0KHZhbHVlLmZvcm1hdCk7XG4gICAgZGVmYXVsdDpcbiAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGlmIChvcHRpb25BUEkoJ2ZhaWxPbkludmFsaWRGb3JtYXQnKSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgdW5rbm93biByZWdpc3RyeSBrZXkgJHt1dGlscy5zaG9ydCh2YWx1ZS5mb3JtYXQpfWApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBpbnZhbGlkKCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhyb3cgbmV3IEVycm9yKGB1bnN1cHBvcnRlZCBmb3JtYXQgJyR7dmFsdWUuZm9ybWF0fSdgKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBzdHJpbmdUeXBlKHZhbHVlKSB7XG4gIC8vIGhlcmUgd2UgbmVlZCB0byBmb3JjZSB0eXBlIHRvIGZpeCAjNDY3XG4gIGNvbnN0IG91dHB1dCA9IHV0aWxzLnR5cGVjYXN0KCdzdHJpbmcnLCB2YWx1ZSwgb3B0cyA9PiB7XG4gICAgaWYgKHZhbHVlLmZvcm1hdCkge1xuICAgICAgcmV0dXJuIGdlbmVyYXRlRm9ybWF0KHZhbHVlLCAoKSA9PiB0aHVuayhvcHRzLm1pbkxlbmd0aCwgb3B0cy5tYXhMZW5ndGgpKTtcbiAgICB9XG5cbiAgICBpZiAodmFsdWUucGF0dGVybikge1xuICAgICAgcmV0dXJuIHJhbmRvbS5yYW5kZXhwKHZhbHVlLnBhdHRlcm4pO1xuICAgIH1cblxuICAgIHJldHVybiB0aHVuayhvcHRzLm1pbkxlbmd0aCwgb3B0cy5tYXhMZW5ndGgpO1xuICB9KTtcblxuICByZXR1cm4gb3V0cHV0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBzdHJpbmdUeXBlO1xuIiwgImltcG9ydCBfYm9vbGVhbiBmcm9tICcuL2Jvb2xlYW4ubWpzJztcbmltcG9ydCBfbnVsbCBmcm9tICcuL251bGwubWpzJztcbmltcG9ydCBfYXJyYXkgZnJvbSAnLi9hcnJheS5tanMnO1xuaW1wb3J0IF9pbnRlZ2VyIGZyb20gJy4vaW50ZWdlci5tanMnO1xuaW1wb3J0IF9udW1iZXIgZnJvbSAnLi9udW1iZXIubWpzJztcbmltcG9ydCBfb2JqZWN0IGZyb20gJy4vb2JqZWN0Lm1qcyc7XG5pbXBvcnQgX3N0cmluZyBmcm9tICcuL3N0cmluZy5tanMnO1xuXG5jb25zdCB0eXBlTWFwID0ge1xuICBib29sZWFuOiBfYm9vbGVhbixcbiAgbnVsbDogX251bGwsXG4gIGFycmF5OiBfYXJyYXksXG4gIGludGVnZXI6IF9pbnRlZ2VyLFxuICBudW1iZXI6IF9udW1iZXIsXG4gIG9iamVjdDogX29iamVjdCxcbiAgc3RyaW5nOiBfc3RyaW5nLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgdHlwZU1hcDtcbiIsICJpbXBvcnQgdXRpbHMgZnJvbSAnLi91dGlscy5tanMnO1xuaW1wb3J0IHJhbmRvbSBmcm9tICcuL3JhbmRvbS5tanMnO1xuaW1wb3J0IFBhcnNlRXJyb3IgZnJvbSAnLi9lcnJvci5tanMnO1xuaW1wb3J0IGluZmVyVHlwZSBmcm9tICcuL2luZmVyLm1qcyc7XG5pbXBvcnQgdHlwZXMgZnJvbSAnLi4vdHlwZXMvaW5kZXgubWpzJztcbmltcG9ydCBvcHRpb25BUEkgZnJvbSAnLi4vYXBpL29wdGlvbi5tanMnO1xuXG5mdW5jdGlvbiBnZXRNZXRhKHsgJGNvbW1lbnQ6IGNvbW1lbnQsIHRpdGxlLCBkZXNjcmlwdGlvbiB9KSB7XG4gIHJldHVybiBPYmplY3QuZW50cmllcyh7IGNvbW1lbnQsIHRpdGxlLCBkZXNjcmlwdGlvbiB9KVxuICAgIC5maWx0ZXIoKFssIHZhbHVlXSkgPT4gdmFsdWUpXG4gICAgLnJlZHVjZSgobWVtbywgW2ssIHZdKSA9PiB7XG4gICAgICBtZW1vW2tdID0gdjtcbiAgICAgIHJldHVybiBtZW1vO1xuICAgIH0sIHt9KTtcbn1cblxuLy8gVE9ETyBwcm92aWRlIHR5cGVzXG5mdW5jdGlvbiB0cmF2ZXJzZShzY2hlbWEsIHBhdGgsIHJlc29sdmUsIHJvb3RTY2hlbWEpIHtcbiAgc2NoZW1hID0gcmVzb2x2ZShzY2hlbWEsIG51bGwsIHBhdGgpO1xuXG4gIGlmIChzY2hlbWEgJiYgKHNjaGVtYS5vbmVPZiB8fCBzY2hlbWEuYW55T2YgfHwgc2NoZW1hLmFsbE9mKSkge1xuICAgIHNjaGVtYSA9IHJlc29sdmUoc2NoZW1hLCBudWxsLCBwYXRoKTtcbiAgfVxuXG4gIGlmICghc2NoZW1hKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBDYW5ub3QgdHJhdmVyc2UgYXQgJyR7cGF0aC5qb2luKCcuJyl9JywgZ2l2ZW4gJyR7SlNPTi5zdHJpbmdpZnkocm9vdFNjaGVtYSl9J2ApO1xuICB9XG5cbiAgY29uc3QgY29udGV4dCA9IHtcbiAgICAuLi5nZXRNZXRhKHNjaGVtYSksXG4gICAgc2NoZW1hUGF0aDogcGF0aCxcbiAgfTtcblxuICAvLyBkZWZhdWx0IHZhbHVlcyBoYXMgaGlnaGVyIHByZWNlZGVuY2VcbiAgaWYgKHBhdGhbcGF0aC5sZW5ndGggLSAxXSAhPT0gJ3Byb3BlcnRpZXMnKSB7XG4gICAgLy8gZXhhbXBsZSB2YWx1ZXMgaGF2ZSBoaWdoZXN0IHByZWNlZGVuY2VcbiAgICBpZiAob3B0aW9uQVBJKCd1c2VFeGFtcGxlc1ZhbHVlJykgJiYgQXJyYXkuaXNBcnJheShzY2hlbWEuZXhhbXBsZXMpKSB7XG4gICAgICAvLyBpbmNsdWRlIGBkZWZhdWx0YCB2YWx1ZSBhcyBleGFtcGxlIHRvb1xuICAgICAgY29uc3QgZml4ZWRFeGFtcGxlcyA9IHNjaGVtYS5leGFtcGxlc1xuICAgICAgICAuY29uY2F0KCdkZWZhdWx0JyBpbiBzY2hlbWEgPyBbc2NoZW1hLmRlZmF1bHRdIDogW10pO1xuXG4gICAgICByZXR1cm4geyB2YWx1ZTogdXRpbHMudHlwZWNhc3QobnVsbCwgc2NoZW1hLCAoKSA9PiByYW5kb20ucGljayhmaXhlZEV4YW1wbGVzKSksIGNvbnRleHQgfTtcbiAgICB9XG4gICAgLy8gSWYgc2NoZW1hIGNvbnRhaW5zIHNpbmdsZSBleGFtcGxlIHByb3BlcnR5XG4gICAgaWYgKG9wdGlvbkFQSSgndXNlRXhhbXBsZXNWYWx1ZScpICYmIHR5cGVvZiBzY2hlbWEuZXhhbXBsZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJldHVybiB7IHZhbHVlOiB1dGlscy50eXBlY2FzdChudWxsLCBzY2hlbWEsICgpID0+IHNjaGVtYS5leGFtcGxlKSwgY29udGV4dCB9O1xuICAgIH1cblxuICAgIGlmIChvcHRpb25BUEkoJ3VzZURlZmF1bHRWYWx1ZScpICYmICdkZWZhdWx0JyBpbiBzY2hlbWEpIHtcbiAgICAgIGlmIChzY2hlbWEuZGVmYXVsdCAhPT0gJycgfHwgIW9wdGlvbkFQSSgncmVwbGFjZUVtcHR5QnlSYW5kb21WYWx1ZScpKSB7XG4gICAgICAgIHJldHVybiB7IHZhbHVlOiBzY2hlbWEuZGVmYXVsdCwgY29udGV4dCB9O1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICgndGVtcGxhdGUnIGluIHNjaGVtYSkge1xuICAgICAgcmV0dXJuIHsgdmFsdWU6IHV0aWxzLnRlbXBsYXRlKHNjaGVtYS50ZW1wbGF0ZSwgcm9vdFNjaGVtYSksIGNvbnRleHQgfTtcbiAgICB9XG5cbiAgICBpZiAoJ2NvbnN0JyBpbiBzY2hlbWEpIHtcbiAgICAgIHJldHVybiB7IHZhbHVlOiBzY2hlbWEuY29uc3QsIGNvbnRleHQgfTtcbiAgICB9XG4gIH1cblxuICBpZiAoc2NoZW1hLm5vdCAmJiB0eXBlb2Ygc2NoZW1hLm5vdCA9PT0gJ29iamVjdCcpIHtcbiAgICBzY2hlbWEgPSB1dGlscy5ub3RWYWx1ZShzY2hlbWEubm90LCB1dGlscy5vbWl0UHJvcHMoc2NoZW1hLCBbJ25vdCddKSk7XG5cbiAgICAvLyBidWlsZCBuZXcgb2JqZWN0IHZhbHVlIGZyb20gbm90LXNjaGVtYSFcbiAgICBpZiAoc2NoZW1hLnR5cGUgJiYgc2NoZW1hLnR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgICBjb25zdCB7IHZhbHVlLCBjb250ZXh0OiBpbm5lckNvbnRleHQgfSA9IHRyYXZlcnNlKHNjaGVtYSwgcGF0aC5jb25jYXQoWydub3QnXSksIHJlc29sdmUsIHJvb3RTY2hlbWEpO1xuICAgICAgcmV0dXJuIHsgdmFsdWU6IHV0aWxzLmNsZWFuKHZhbHVlLCBzY2hlbWEsIGZhbHNlKSwgY29udGV4dDogeyAuLi5jb250ZXh0LCBpdGVtczogaW5uZXJDb250ZXh0IH0gfTtcbiAgICB9XG4gIH1cblxuICAvLyB0aHVua3MgY2FuIHJldHVybiBzdWItc2NoZW1hc1xuICBpZiAodHlwZW9mIHNjaGVtYS50aHVuayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIC8vIHJlc3VsdCBpcyBhbHJlYWR5IGNsZWFuZWQgaW4gdGh1bmtcbiAgICBjb25zdCB7IHZhbHVlLCBjb250ZXh0OiBpbm5lckNvbnRleHQgfSA9IHRyYXZlcnNlKHNjaGVtYS50aHVuayhyb290U2NoZW1hKSwgcGF0aCwgcmVzb2x2ZSk7XG4gICAgcmV0dXJuIHsgdmFsdWUsIGNvbnRleHQ6IHsgLi4uY29udGV4dCwgaXRlbXM6IGlubmVyQ29udGV4dCB9IH07XG4gIH1cblxuICAvLyBzaG9ydC1jaXJjdWl0IGFzIHdlIGRvbid0IHBsYW4gZ2VuZXJhdGUgbW9yZSB2YWx1ZXMhXG4gIGlmIChzY2hlbWEuanNvblBhdGgpIHtcbiAgICByZXR1cm4geyB2YWx1ZTogc2NoZW1hLCBjb250ZXh0IH07XG4gIH1cblxuICAvLyBUT0RPIHJlbW92ZSB0aGUgdWdseSBvdmVyY29tZVxuICBsZXQgdHlwZSA9IHNjaGVtYS50eXBlO1xuXG4gIGlmIChBcnJheS5pc0FycmF5KHR5cGUpKSB7XG4gICAgdHlwZSA9IHJhbmRvbS5waWNrKHR5cGUpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiB0eXBlID09PSAndW5kZWZpbmVkJykge1xuICAgIC8vIEF0dGVtcHQgdG8gaW5mZXIgdGhlIHR5cGVcbiAgICB0eXBlID0gaW5mZXJUeXBlKHNjaGVtYSwgcGF0aCkgfHwgdHlwZTtcblxuICAgIGlmICh0eXBlKSB7XG4gICAgICBzY2hlbWEudHlwZSA9IHR5cGU7XG4gICAgfVxuICB9XG5cbiAgaWYgKHR5cGVvZiBzY2hlbWEuZ2VuZXJhdGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjb25zdCByZXRWYWwgPSB1dGlscy50eXBlY2FzdChudWxsLCBzY2hlbWEsICgpID0+IHNjaGVtYS5nZW5lcmF0ZShyb290U2NoZW1hLCBwYXRoKSk7XG4gICAgY29uc3QgcmV0VHlwZSA9IHJldFZhbCA9PT0gbnVsbCA/ICdudWxsJyA6IHR5cGVvZiByZXRWYWw7XG4gICAgaWYgKHJldFR5cGUgPT09IHR5cGVcbiAgICAgIHx8IChyZXRUeXBlID09PSAnbnVtYmVyJyAmJiB0eXBlID09PSAnaW50ZWdlcicpXG4gICAgICB8fCAoQXJyYXkuaXNBcnJheShyZXRWYWwpICYmIHR5cGUgPT09ICdhcnJheScpKSB7XG4gICAgICByZXR1cm4geyB2YWx1ZTogcmV0VmFsLCBjb250ZXh0IH07XG4gICAgfVxuICB9XG5cbiAgaWYgKHR5cGVvZiBzY2hlbWEucGF0dGVybiA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4geyB2YWx1ZTogdXRpbHMudHlwZWNhc3QoJ3N0cmluZycsIHNjaGVtYSwgKCkgPT4gcmFuZG9tLnJhbmRleHAoc2NoZW1hLnBhdHRlcm4pKSwgY29udGV4dCB9O1xuICB9XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkoc2NoZW1hLmVudW0pKSB7XG4gICAgcmV0dXJuIHsgdmFsdWU6IHV0aWxzLnR5cGVjYXN0KG51bGwsIHNjaGVtYSwgKCkgPT4gcmFuZG9tLnBpY2soc2NoZW1hLmVudW0pKSwgY29udGV4dCB9O1xuICB9XG5cbiAgaWYgKHR5cGVvZiB0eXBlID09PSAnc3RyaW5nJykge1xuICAgIGlmICghdHlwZXNbdHlwZV0pIHtcbiAgICAgIGlmIChvcHRpb25BUEkoJ2ZhaWxPbkludmFsaWRUeXBlcycpKSB7XG4gICAgICAgIHRocm93IG5ldyBQYXJzZUVycm9yKGB1bmtub3duIHByaW1pdGl2ZSAke3V0aWxzLnNob3J0KHR5cGUpfWAsIHBhdGguY29uY2F0KFsndHlwZSddKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IG9wdGlvbkFQSSgnZGVmYXVsdEludmFsaWRUeXBlUHJvZHVjdCcpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnICYmIHR5cGVzW3ZhbHVlXSkge1xuICAgICAgICAgIHJldHVybiB7IHZhbHVlOiB0eXBlc1t2YWx1ZV0oc2NoZW1hLCBwYXRoLCByZXNvbHZlLCB0cmF2ZXJzZSksIGNvbnRleHQgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7IHZhbHVlLCBjb250ZXh0IH07XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGlubmVyUmVzdWx0ID0gdHlwZXNbdHlwZV0oc2NoZW1hLCBwYXRoLCByZXNvbHZlLCB0cmF2ZXJzZSk7XG4gICAgICAgIGlmICh0eXBlID09PSAnYXJyYXknKSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZhbHVlOiBpbm5lclJlc3VsdC5tYXAoKHsgdmFsdWUgfSkgPT4gdmFsdWUpLFxuICAgICAgICAgICAgY29udGV4dDoge1xuICAgICAgICAgICAgICAuLi5jb250ZXh0LFxuICAgICAgICAgICAgICBpdGVtczogaW5uZXJSZXN1bHQubWFwKFxuICAgICAgICAgICAgICAgIEFycmF5LmlzQXJyYXkoc2NoZW1hLml0ZW1zKVxuICAgICAgICAgICAgICAgICAgPyAoeyBjb250ZXh0OiBjIH0pID0+IGNcbiAgICAgICAgICAgICAgICAgIDogKHsgY29udGV4dDogYyB9KSA9PiAoe1xuICAgICAgICAgICAgICAgICAgICAuLi5jLFxuICAgICAgICAgICAgICAgICAgICAvLyB3ZSBoYXZlIHRvIHJlbW92ZSB0aGUgaW5kZXggZnJvbSB0aGUgcGF0aCB0byBnZXQgdGhlIHJlYWwgc2NoZW1hIHBhdGhcbiAgICAgICAgICAgICAgICAgICAgc2NoZW1hUGF0aDogYy5zY2hlbWFQYXRoLnNsaWNlKDAsIC0xKSxcbiAgICAgICAgICAgICAgICAgIH0pKSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICByZXR1cm4gaW5uZXJSZXN1bHQgIT09IG51bGxcbiAgICAgICAgICAgID8geyB2YWx1ZTogaW5uZXJSZXN1bHQudmFsdWUsIGNvbnRleHQ6IHsgLi4uY29udGV4dCwgaXRlbXM6IGlubmVyUmVzdWx0LmNvbnRleHQgfSB9XG4gICAgICAgICAgICA6IHsgdmFsdWU6IHt9LCBjb250ZXh0IH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgdmFsdWU6IGlubmVyUmVzdWx0LCBjb250ZXh0IH07XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgZS5wYXRoID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIHRocm93IG5ldyBQYXJzZUVycm9yKGUuc3RhY2ssIHBhdGgpO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IGU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbGV0IHZhbHVlQ29weSA9IHt9O1xuICBsZXQgY29udGV4dENvcHkgPSB7IC4uLmNvbnRleHQgfTtcblxuICBpZiAoQXJyYXkuaXNBcnJheShzY2hlbWEpKSB7XG4gICAgdmFsdWVDb3B5ID0gW107XG4gIH1cblxuICBjb25zdCBwcnVuZVByb3BlcnRpZXMgPSBvcHRpb25BUEkoJ3BydW5lUHJvcGVydGllcycpIHx8IFtdO1xuXG4gIE9iamVjdC5rZXlzKHNjaGVtYSkuZm9yRWFjaChwcm9wID0+IHtcbiAgICBpZiAocHJ1bmVQcm9wZXJ0aWVzLmluY2x1ZGVzKHByb3ApKSByZXR1cm47XG4gICAgaWYgKHNjaGVtYVtwcm9wXSA9PT0gbnVsbCkgcmV0dXJuO1xuICAgIGlmICh0eXBlb2Ygc2NoZW1hW3Byb3BdID09PSAnb2JqZWN0JyAmJiBwcm9wICE9PSAnZGVmaW5pdGlvbnMnKSB7XG4gICAgICBjb25zdCB7IHZhbHVlLCBjb250ZXh0OiBpbm5lckNvbnRleHQgfSA9IHRyYXZlcnNlKHNjaGVtYVtwcm9wXSwgcGF0aC5jb25jYXQoW3Byb3BdKSwgcmVzb2x2ZSwgdmFsdWVDb3B5KTtcbiAgICAgIHZhbHVlQ29weVtwcm9wXSA9IHV0aWxzLmNsZWFuKHZhbHVlLCBzY2hlbWFbcHJvcF0sIGZhbHNlKTtcbiAgICAgIGNvbnRleHRDb3B5W3Byb3BdID0gaW5uZXJDb250ZXh0O1xuXG4gICAgICBpZiAodmFsdWVDb3B5W3Byb3BdID09PSBudWxsICYmIG9wdGlvbkFQSSgnb21pdE51bGxzJykpIHtcbiAgICAgICAgZGVsZXRlIHZhbHVlQ29weVtwcm9wXTtcbiAgICAgICAgZGVsZXRlIGNvbnRleHRDb3B5W3Byb3BdO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB2YWx1ZUNvcHlbcHJvcF0gPSBzY2hlbWFbcHJvcF07XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4geyB2YWx1ZTogdmFsdWVDb3B5LCBjb250ZXh0OiBjb250ZXh0Q29weSB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCB0cmF2ZXJzZTtcbiIsICJpbXBvcnQgb3B0aW9uQVBJIGZyb20gJy4uL2FwaS9vcHRpb24ubWpzJztcbmltcG9ydCByYW5kb20gZnJvbSAnLi9yYW5kb20ubWpzJztcbmltcG9ydCB1dGlscyBmcm9tICcuL3V0aWxzLm1qcyc7XG5cbmNvbnN0IGJ1aWxkUmVzb2x2ZVNjaGVtYSA9ICh7XG4gIHJlZnMsXG4gIHNjaGVtYSxcbiAgY29udGFpbmVyLFxuICBzeW5jaHJvbm91cyxcbiAgcmVmRGVwdGhNYXgsXG4gIHJlZkRlcHRoTWluLFxufSkgPT4ge1xuICBjb25zdCByZWN1cnNpdmVVdGlsID0ge307XG4gIGNvbnN0IHNlZW5SZWZzID0ge307XG5cbiAgbGV0IGRlcHRoID0gMDtcbiAgbGV0IGxhc3RSZWY7XG4gIGxldCBsYXN0UGF0aDtcblxuICByZWN1cnNpdmVVdGlsLnJlc29sdmVTY2hlbWEgPSAoc3ViLCBpbmRleCwgcm9vdFBhdGgpID0+IHtcbiAgICAvLyBwcmV2ZW50IG51bGwgc3ViIGZyb20gZGVmYXVsdC9leGFtcGxlIG51bGwgdmFsdWVzIHRvIHRocm93XG4gICAgaWYgKHN1YiA9PT0gbnVsbCB8fCBzdWIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBzdWIuZ2VuZXJhdGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiBzdWI7XG4gICAgfVxuXG4gICAgLy8gY2xlYW51cFxuICAgIGNvbnN0IF9pZCA9IHN1Yi4kaWQgfHwgc3ViLmlkO1xuXG4gICAgaWYgKHR5cGVvZiBfaWQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBkZWxldGUgc3ViLmlkO1xuICAgICAgZGVsZXRlIHN1Yi4kaWQ7XG4gICAgICBkZWxldGUgc3ViLiRzY2hlbWE7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBzdWIuJHJlZiA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbnN0IG1heERlcHRoID0gTWF0aC5tYXgocmVmRGVwdGhNaW4sIHJlZkRlcHRoTWF4KSAtIDE7XG5cbiAgICAgIC8vIGluY3JlYXNpbmcgZGVwdGggb25seSBmb3IgcmVwZWF0ZWQgcmVmcyBzZWVtcyB0byBiZSBmaXhpbmcgIzI1OFxuICAgICAgaWYgKHN1Yi4kcmVmID09PSAnIycgfHwgc2VlblJlZnNbc3ViLiRyZWZdIDwgMCB8fCAobGFzdFJlZiA9PT0gc3ViLiRyZWYgJiYgKytkZXB0aCA+IG1heERlcHRoKSkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICAgIGlmIChzdWIuJHJlZiAhPT0gJyMnICYmIGxhc3RQYXRoICYmIGxhc3RQYXRoLmxlbmd0aCA9PT0gcm9vdFBhdGgubGVuZ3RoKSB7XG4gICAgICAgICAgcmV0dXJuIHV0aWxzLmdldExvY2FsUmVmKHNjaGVtYSwgc3ViLiRyZWYsIHN5bmNocm9ub3VzICYmIHJlZnMpO1xuICAgICAgICB9XG4gICAgICAgIGRlbGV0ZSBzdWIuJHJlZjtcbiAgICAgICAgcmV0dXJuIHN1YjtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBzZWVuUmVmc1tzdWIuJHJlZl0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHNlZW5SZWZzW3N1Yi4kcmVmXSA9IHJhbmRvbS5udW1iZXIocmVmRGVwdGhNaW4sIHJlZkRlcHRoTWF4KSAtIDE7XG4gICAgICB9XG5cbiAgICAgIGxhc3RQYXRoID0gcm9vdFBhdGg7XG4gICAgICBsYXN0UmVmID0gc3ViLiRyZWY7XG5cbiAgICAgIGxldCByZWY7XG5cbiAgICAgIGlmIChzdWIuJHJlZi5pbmRleE9mKCcjLycpID09PSAtMSkge1xuICAgICAgICByZWYgPSByZWZzW3N1Yi4kcmVmXSB8fCBudWxsO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVmID0gdXRpbHMuZ2V0TG9jYWxSZWYoc2NoZW1hLCBzdWIuJHJlZiwgc3luY2hyb25vdXMgJiYgcmVmcykgfHwgbnVsbDtcbiAgICAgIH1cblxuICAgICAgbGV0IGZpeGVkO1xuICAgICAgaWYgKHR5cGVvZiByZWYgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGlmICghcmVmICYmIG9wdGlvbkFQSSgnaWdub3JlTWlzc2luZ1JlZnMnKSAhPT0gdHJ1ZSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgUmVmZXJlbmNlIG5vdCBmb3VuZDogJHtzdWIuJHJlZn1gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNlZW5SZWZzW3N1Yi4kcmVmXSAtPSAxO1xuICAgICAgICB1dGlscy5tZXJnZShzdWIsIHJlZiB8fCB7fSk7XG4gICAgICAgIGZpeGVkID0gc3luY2hyb25vdXMgJiYgcmVmICYmIHJlZi4kcmVmO1xuICAgICAgfVxuXG4gICAgICAvLyBqdXN0IHJlbW92ZSB0aGUgcmVmZXJlbmNlXG4gICAgICBpZiAoIWZpeGVkKSBkZWxldGUgc3ViLiRyZWY7XG4gICAgICByZXR1cm4gc3ViO1xuICAgIH1cblxuICAgIGlmIChBcnJheS5pc0FycmF5KHN1Yi5hbGxPZikpIHtcbiAgICAgIGNvbnN0IHNjaGVtYXMgPSBzdWIuYWxsT2Y7XG5cbiAgICAgIGRlbGV0ZSBzdWIuYWxsT2Y7XG5cbiAgICAgIC8vIHRoaXMgaXMgdGhlIG9ubHkgY2FzZSB3aGVyZSBhbGwgc3ViLXNjaGVtYXNcbiAgICAgIC8vIG11c3QgYmUgcmVzb2x2ZWQgYmVmb3JlIGFueSBtZXJnZVxuICAgICAgc2NoZW1hcy5mb3JFYWNoKHN1YlNjaGVtYSA9PiB7XG4gICAgICAgIGNvbnN0IF9zdWIgPSByZWN1cnNpdmVVdGlsLnJlc29sdmVTY2hlbWEoc3ViU2NoZW1hLCBudWxsLCByb290UGF0aCk7XG5cbiAgICAgICAgLy8gY2FsbCBnaXZlbiB0aHVua3MgaWYgcHJlc2VudFxuICAgICAgICB1dGlscy5tZXJnZShzdWIsIHR5cGVvZiBfc3ViLnRodW5rID09PSAnZnVuY3Rpb24nXG4gICAgICAgICAgPyBfc3ViLnRodW5rKHN1YilcbiAgICAgICAgICA6IF9zdWIpO1xuXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHN1Yi5hbGxPZikpIHtcbiAgICAgICAgICByZWN1cnNpdmVVdGlsLnJlc29sdmVTY2hlbWEoc3ViLCBpbmRleCwgcm9vdFBhdGgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheShzdWIub25lT2YgfHwgc3ViLmFueU9mKSAmJiByb290UGF0aFtyb290UGF0aC5sZW5ndGggLSAyXSAhPT0gJ2RlcGVuZGVuY2llcycpIHtcbiAgICAgIGNvbnN0IG1peCA9IHN1Yi5vbmVPZiB8fCBzdWIuYW55T2Y7XG5cbiAgICAgIC8vIHRlc3QgZXZlcnkgdmFsdWUgZnJvbSB0aGUgZW51bSBhZ2FpbnN0IGVhY2gtb25lT2ZcbiAgICAgIC8vIHNjaGVtYSwgb25seSB2YWx1ZXMgdGhhdCB2YWxpZGF0ZSBvbmNlIGFyZSBrZXB0XG4gICAgICBpZiAoc3ViLmVudW0gJiYgc3ViLm9uZU9mKSB7XG4gICAgICAgIHN1Yi5lbnVtID0gc3ViLmVudW0uZmlsdGVyKHggPT4gdXRpbHMudmFsaWRhdGUoeCwgbWl4KSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHRodW5rKHJvb3RTY2hlbWEpIHtcbiAgICAgICAgICBjb25zdCBjb3B5ID0gdXRpbHMub21pdFByb3BzKHN1YiwgWydhbnlPZicsICdvbmVPZiddKTtcbiAgICAgICAgICBjb25zdCBmaXhlZCA9IHJhbmRvbS5waWNrKG1peCk7XG5cbiAgICAgICAgICB1dGlscy5tZXJnZShjb3B5LCBmaXhlZCk7XG5cbiAgICAgICAgICAvLyByZW1vdmUgYWRkaXRpb25hbCBwcm9wZXJ0aWVzIGZyb20gbWVyZ2VkIHNjaGVtYXNcbiAgICAgICAgICBtaXguZm9yRWFjaChvbWl0ID0+IHtcbiAgICAgICAgICAgIGlmIChvbWl0LnJlcXVpcmVkICYmIG9taXQgIT09IGZpeGVkKSB7XG4gICAgICAgICAgICAgIG9taXQucmVxdWlyZWQuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGluY2x1ZGVzS2V5ID0gY29weS5yZXF1aXJlZCAmJiBjb3B5LnJlcXVpcmVkLmluY2x1ZGVzKGtleSk7XG4gICAgICAgICAgICAgICAgaWYgKGNvcHkucHJvcGVydGllcyAmJiAhaW5jbHVkZXNLZXkpIHtcbiAgICAgICAgICAgICAgICAgIGRlbGV0ZSBjb3B5LnByb3BlcnRpZXNba2V5XTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAocm9vdFNjaGVtYSAmJiByb290U2NoZW1hLnByb3BlcnRpZXMpIHtcbiAgICAgICAgICAgICAgICAgIGRlbGV0ZSByb290U2NoZW1hLnByb3BlcnRpZXNba2V5XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgcmV0dXJuIGNvcHk7XG4gICAgICAgIH0sXG4gICAgICB9O1xuICAgIH1cblxuICAgIE9iamVjdC5rZXlzKHN1YikuZm9yRWFjaChwcm9wID0+IHtcbiAgICAgIGlmICgoQXJyYXkuaXNBcnJheShzdWJbcHJvcF0pIHx8IHR5cGVvZiBzdWJbcHJvcF0gPT09ICdvYmplY3QnKSAmJiAhdXRpbHMuaXNLZXkocHJvcCkpIHtcbiAgICAgICAgc3ViW3Byb3BdID0gcmVjdXJzaXZlVXRpbC5yZXNvbHZlU2NoZW1hKHN1Yltwcm9wXSwgcHJvcCwgcm9vdFBhdGguY29uY2F0KHByb3ApKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIGF2b2lkIGV4dHJhIGNhbGxzIG9uIHN1Yi1zY2hlbWFzLCBmaXhlcyAjNDU4XG4gICAgaWYgKHJvb3RQYXRoKSB7XG4gICAgICBjb25zdCBsYXN0UHJvcCA9IHJvb3RQYXRoW3Jvb3RQYXRoLmxlbmd0aCAtIDFdO1xuXG4gICAgICBpZiAobGFzdFByb3AgPT09ICdwcm9wZXJ0aWVzJyB8fCBsYXN0UHJvcCA9PT0gJ2l0ZW1zJykge1xuICAgICAgICByZXR1cm4gc3ViO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBjb250YWluZXIud3JhcChzdWIpO1xuICB9O1xuXG4gIHJldHVybiByZWN1cnNpdmVVdGlsO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgYnVpbGRSZXNvbHZlU2NoZW1hO1xuIiwgImltcG9ydCB7IGdldERlcGVuZGVuY2llcyB9IGZyb20gJy4uL3ZlbmRvci5tanMnO1xuaW1wb3J0IG9wdGlvbkFQSSBmcm9tICcuLi9hcGkvb3B0aW9uLm1qcyc7XG5pbXBvcnQgdHJhdmVyc2UgZnJvbSAnLi90cmF2ZXJzZS5tanMnO1xuaW1wb3J0IHJhbmRvbSBmcm9tICcuL3JhbmRvbS5tanMnO1xuaW1wb3J0IHV0aWxzIGZyb20gJy4vdXRpbHMubWpzJztcbmltcG9ydCBidWlsZFJlc29sdmVTY2hlbWEgZnJvbSAnLi9idWlsZFJlc29sdmVTY2hlbWEubWpzJztcblxuZnVuY3Rpb24gcGljayhkYXRhKSB7XG4gIHJldHVybiBBcnJheS5pc0FycmF5KGRhdGEpXG4gICAgPyByYW5kb20ucGljayhkYXRhKVxuICAgIDogZGF0YTtcbn1cblxuZnVuY3Rpb24gY3ljbGUoZGF0YSwgcmV2ZXJzZSkge1xuICBpZiAoIUFycmF5LmlzQXJyYXkoZGF0YSkpIHtcbiAgICByZXR1cm4gZGF0YTtcbiAgfVxuXG4gIGNvbnN0IHZhbHVlID0gcmV2ZXJzZVxuICAgID8gZGF0YS5wb3AoKVxuICAgIDogZGF0YS5zaGlmdCgpO1xuXG4gIGlmIChyZXZlcnNlKSB7XG4gICAgZGF0YS51bnNoaWZ0KHZhbHVlKTtcbiAgfSBlbHNlIHtcbiAgICBkYXRhLnB1c2godmFsdWUpO1xuICB9XG5cbiAgcmV0dXJuIHZhbHVlO1xufVxuXG5mdW5jdGlvbiByZXNvbHZlKG9iaiwgZGF0YSwgdmFsdWVzLCBwcm9wZXJ0eSkge1xuICBpZiAoIW9iaiB8fCB0eXBlb2Ygb2JqICE9PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBvYmo7XG4gIH1cblxuICBpZiAoIXZhbHVlcykge1xuICAgIHZhbHVlcyA9IHt9O1xuICB9XG5cbiAgaWYgKCFkYXRhKSB7XG4gICAgZGF0YSA9IG9iajtcbiAgfVxuXG4gIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcbiAgICByZXR1cm4gb2JqLm1hcCh4ID0+IHJlc29sdmUoeCwgZGF0YSwgdmFsdWVzLCBwcm9wZXJ0eSkpO1xuICB9XG5cbiAgaWYgKG9iai5qc29uUGF0aCkge1xuICAgIGNvbnN0IHsgSlNPTlBhdGggfSA9IGdldERlcGVuZGVuY2llcygpO1xuXG4gICAgY29uc3QgcGFyYW1zID0gdHlwZW9mIG9iai5qc29uUGF0aCAhPT0gJ29iamVjdCdcbiAgICAgID8geyBwYXRoOiBvYmouanNvblBhdGggfVxuICAgICAgOiBvYmouanNvblBhdGg7XG5cbiAgICBwYXJhbXMuZ3JvdXAgPSBvYmouZ3JvdXAgfHwgcGFyYW1zLmdyb3VwIHx8IHByb3BlcnR5O1xuICAgIHBhcmFtcy5jeWNsZSA9IG9iai5jeWNsZSB8fCBwYXJhbXMuY3ljbGUgfHwgZmFsc2U7XG4gICAgcGFyYW1zLnJldmVyc2UgPSBvYmoucmV2ZXJzZSB8fCBwYXJhbXMucmV2ZXJzZSB8fCBmYWxzZTtcbiAgICBwYXJhbXMuY291bnQgPSBvYmouY291bnQgfHwgcGFyYW1zLmNvdW50IHx8IDE7XG5cbiAgICBjb25zdCBrZXkgPSBgJHtwYXJhbXMuZ3JvdXB9X18ke3BhcmFtcy5wYXRofWA7XG5cbiAgICBpZiAoIXZhbHVlc1trZXldKSB7XG4gICAgICBpZiAocGFyYW1zLmNvdW50ID4gMSkge1xuICAgICAgICB2YWx1ZXNba2V5XSA9IEpTT05QYXRoKHBhcmFtcy5wYXRoLCBkYXRhKS5zbGljZSgwLCBwYXJhbXMuY291bnQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsdWVzW2tleV0gPSBKU09OUGF0aChwYXJhbXMucGF0aCwgZGF0YSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHBhcmFtcy5jeWNsZSB8fCBwYXJhbXMucmV2ZXJzZSkge1xuICAgICAgcmV0dXJuIGN5Y2xlKHZhbHVlc1trZXldLCBwYXJhbXMucmV2ZXJzZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBpY2sodmFsdWVzW2tleV0pO1xuICB9XG5cbiAgT2JqZWN0LmtleXMob2JqKS5mb3JFYWNoKGsgPT4ge1xuICAgIG9ialtrXSA9IHJlc29sdmUob2JqW2tdLCBkYXRhLCB2YWx1ZXMsIGspO1xuICB9KTtcblxuICByZXR1cm4gb2JqO1xufVxuXG4vLyBUT0RPIHByb3ZpZGUgdHlwZXM/XG5mdW5jdGlvbiBydW4ocmVmcywgc2NoZW1hLCBjb250YWluZXIsIHN5bmNocm9ub3VzKSB7XG4gIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoc2NoZW1hKSAhPT0gJ1tvYmplY3QgT2JqZWN0XScpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgaW5wdXQsIGV4cGVjdGluZyBvYmplY3QgYnV0IGdpdmVuICR7dHlwZW9mIHNjaGVtYX1gKTtcbiAgfVxuXG4gIGNvbnN0IHJlZkRlcHRoTWluID0gb3B0aW9uQVBJKCdyZWZEZXB0aE1pbicpIHx8IDA7XG4gIGNvbnN0IHJlZkRlcHRoTWF4ID0gb3B0aW9uQVBJKCdyZWZEZXB0aE1heCcpIHx8IDM7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCB7IHJlc29sdmVTY2hlbWEgfSA9IGJ1aWxkUmVzb2x2ZVNjaGVtYSh7XG4gICAgICByZWZzLFxuICAgICAgc2NoZW1hLFxuICAgICAgY29udGFpbmVyLFxuICAgICAgc3luY2hyb25vdXMsXG4gICAgICByZWZEZXB0aE1pbixcbiAgICAgIHJlZkRlcHRoTWF4LFxuICAgIH0pO1xuICAgIGNvbnN0IHJlc3VsdCA9IHRyYXZlcnNlKHV0aWxzLmNsb25lKHNjaGVtYSksIFtdLCByZXNvbHZlU2NoZW1hKTtcblxuICAgIGlmIChvcHRpb25BUEkoJ3Jlc29sdmVKc29uUGF0aCcpKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB2YWx1ZTogcmVzb2x2ZShyZXN1bHQudmFsdWUpLFxuICAgICAgICBjb250ZXh0OiByZXN1bHQuY29udGV4dCxcbiAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGlmIChlLnBhdGgpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgJHtlLm1lc3NhZ2V9IGluIC8ke2UucGF0aC5qb2luKCcvJyl9YCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IGU7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHJ1bjtcbiIsICJmdW5jdGlvbiByZW5kZXJKUyhyZXMpIHtcbiAgcmV0dXJuIHJlcy52YWx1ZTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgcmVuZGVySlM7XG4iLCAiaW1wb3J0IHR5cGVzIGZyb20gJy4vZGlzdC90eXBlcy5qcydcblxuZXhwb3J0IGNvbnN0IGJpbmFyeU9wdGlvbnMgPSB0eXBlcy5iaW5hcnlPcHRpb25zXG5leHBvcnQgY29uc3QgYm9vbE9wdGlvbnMgPSB0eXBlcy5ib29sT3B0aW9uc1xuZXhwb3J0IGNvbnN0IGludE9wdGlvbnMgPSB0eXBlcy5pbnRPcHRpb25zXG5leHBvcnQgY29uc3QgbnVsbE9wdGlvbnMgPSB0eXBlcy5udWxsT3B0aW9uc1xuZXhwb3J0IGNvbnN0IHN0ck9wdGlvbnMgPSB0eXBlcy5zdHJPcHRpb25zXG5cbmV4cG9ydCBjb25zdCBTY2hlbWEgPSB0eXBlcy5TY2hlbWFcbmV4cG9ydCBjb25zdCBBbGlhcyA9IHR5cGVzLkFsaWFzXG5leHBvcnQgY29uc3QgQ29sbGVjdGlvbiA9IHR5cGVzLkNvbGxlY3Rpb25cbmV4cG9ydCBjb25zdCBNZXJnZSA9IHR5cGVzLk1lcmdlXG5leHBvcnQgY29uc3QgTm9kZSA9IHR5cGVzLk5vZGVcbmV4cG9ydCBjb25zdCBQYWlyID0gdHlwZXMuUGFpclxuZXhwb3J0IGNvbnN0IFNjYWxhciA9IHR5cGVzLlNjYWxhclxuZXhwb3J0IGNvbnN0IFlBTUxNYXAgPSB0eXBlcy5ZQU1MTWFwXG5leHBvcnQgY29uc3QgWUFNTFNlcSA9IHR5cGVzLllBTUxTZXFcbiIsICJpbXBvcnQgeWFtbCBmcm9tICd5YW1sJztcbmltcG9ydCB7IFlBTUxNYXAsIFlBTUxTZXEgfSBmcm9tICd5YW1sL3R5cGVzJztcbmltcG9ydCBvcHRpb25BUEkgZnJvbSAnLi4vYXBpL29wdGlvbi5tanMnO1xuXG5mdW5jdGlvbiBnZXRJbihvYmosIHBhdGgpIHtcbiAgcmV0dXJuIHBhdGgucmVkdWNlKCh2LCBrKSA9PiAoayBpbiB2ID8gdltrXSA6IHt9KSwgb2JqKTtcbn1cblxuZnVuY3Rpb24gYWRkQ29tbWVudHMoY29udGV4dCwgcGF0aCwgY29tbWVudE5vZGUsIGl0ZXJOb2RlID0gY29tbWVudE5vZGUpIHtcbiAgY29uc3QgeyB0aXRsZSwgZGVzY3JpcHRpb24sIGNvbW1lbnQgfSA9IGdldEluKGNvbnRleHQsIHBhdGgpO1xuICBjb25zdCBsaW5lcyA9IFtdO1xuXG4gIGlmIChvcHRpb25BUEkoJ3JlbmRlclRpdGxlJykgJiYgdGl0bGUpIHtcbiAgICBsaW5lcy5wdXNoKGAgJHt0aXRsZX1gLCAnJyk7XG4gIH1cbiAgaWYgKG9wdGlvbkFQSSgncmVuZGVyRGVzY3JpcHRpb24nKSAmJiBkZXNjcmlwdGlvbikge1xuICAgIGxpbmVzLnB1c2goYCAke2Rlc2NyaXB0aW9ufWApO1xuICB9XG4gIGlmIChvcHRpb25BUEkoJ3JlbmRlckNvbW1lbnQnKSAmJiBjb21tZW50KSB7XG4gICAgbGluZXMucHVzaChgICR7Y29tbWVudH1gKTtcbiAgfVxuXG4gIGNvbW1lbnROb2RlLmNvbW1lbnRCZWZvcmUgPSBsaW5lcy5qb2luKCdcXG4nKTtcblxuICBpZiAoaXRlck5vZGUgaW5zdGFuY2VvZiBZQU1MTWFwKSB7XG4gICAgaXRlck5vZGUuaXRlbXMuZm9yRWFjaChuID0+IHtcbiAgICAgIGFkZENvbW1lbnRzKGNvbnRleHQsIFsuLi5wYXRoLCAnaXRlbXMnLCBuLmtleS52YWx1ZV0sIG4ua2V5LCBuLnZhbHVlKTtcbiAgICB9KTtcbiAgfSBlbHNlIGlmIChpdGVyTm9kZSBpbnN0YW5jZW9mIFlBTUxTZXEpIHtcbiAgICBpdGVyTm9kZS5pdGVtcy5mb3JFYWNoKChuLCBpKSA9PiB7XG4gICAgICBhZGRDb21tZW50cyhjb250ZXh0LCBbLi4ucGF0aCwgJ2l0ZW1zJywgaV0sIG4pO1xuICAgIH0pO1xuICB9XG59XG5cbi8qKiBSZW5kZXIgWUFNTCBzdHJpbmcgZnJvbSB0aGUgZ2VuZXJhdGVkIHZhbHVlIGFuZCBjb250ZXh0XG4gKlxuICogQHBhcmFtIHZhbHVlXG4gKiBAcGFyYW0gY29udGV4dFxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gcmVuZGVyWUFNTCh7IHZhbHVlLCBjb250ZXh0IH0pIHtcbiAgY29uc3Qgbm9kZXMgPSB5YW1sLmNyZWF0ZU5vZGUodmFsdWUpO1xuXG4gIGFkZENvbW1lbnRzKGNvbnRleHQsIFtdLCBub2Rlcyk7XG5cbiAgY29uc3QgZG9jID0gbmV3IHlhbWwuRG9jdW1lbnQoKTtcbiAgZG9jLmNvbnRlbnRzID0gbm9kZXM7XG5cbiAgcmV0dXJuIGRvYy50b1N0cmluZygpO1xufVxuXG5leHBvcnQgZGVmYXVsdCByZW5kZXJZQU1MO1xuIiwgImltcG9ydCB7IGdldERlcGVuZGVuY2llcyB9IGZyb20gJy4vdmVuZG9yLm1qcyc7XG5pbXBvcnQgQ29udGFpbmVyIGZyb20gJy4vY2xhc3MvQ29udGFpbmVyLm1qcyc7XG5pbXBvcnQgZm9ybWF0IGZyb20gJy4vYXBpL2Zvcm1hdC5tanMnO1xuaW1wb3J0IG9wdGlvbiBmcm9tICcuL2FwaS9vcHRpb24ubWpzJztcbmltcG9ydCBlbnYgZnJvbSAnLi9jb3JlL2NvbnN0YW50cy5tanMnO1xuaW1wb3J0IHJhbmRvbSBmcm9tICcuL2NvcmUvcmFuZG9tLm1qcyc7XG5pbXBvcnQgdXRpbHMgZnJvbSAnLi9jb3JlL3V0aWxzLm1qcyc7XG5pbXBvcnQgcnVuIGZyb20gJy4vY29yZS9ydW4ubWpzJztcbmltcG9ydCB7IHJlbmRlckpTLCByZW5kZXJZQU1MIH0gZnJvbSAnLi9yZW5kZXJlcnMvaW5kZXgubWpzJztcblxuY29uc3QgY29udGFpbmVyID0gbmV3IENvbnRhaW5lcigpO1xuXG5mdW5jdGlvbiBzZXR1cEtleXdvcmRzKCkge1xuICAvLyBzYWZlIGF1dG8taW5jcmVtZW50IHZhbHVlc1xuICBjb250YWluZXIuZGVmaW5lKCdhdXRvSW5jcmVtZW50JywgZnVuY3Rpb24gYXV0b0luY3JlbWVudCh2YWx1ZSwgc2NoZW1hKSB7XG4gICAgaWYgKCF0aGlzLm9mZnNldCkge1xuICAgICAgY29uc3QgbWluID0gc2NoZW1hLm1pbmltdW0gfHwgMTtcbiAgICAgIGNvbnN0IG1heCA9IG1pbiArIGVudi5NQVhfTlVNQkVSO1xuICAgICAgY29uc3Qgb2Zmc2V0ID0gdmFsdWUuaW5pdGlhbE9mZnNldCB8fCBzY2hlbWEuaW5pdGlhbE9mZnNldDtcblxuICAgICAgdGhpcy5vZmZzZXQgPSBvZmZzZXQgfHwgcmFuZG9tLm51bWJlcihtaW4sIG1heCk7XG4gICAgfVxuXG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICByZXR1cm4gdGhpcy5vZmZzZXQrKzsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIH1cblxuICAgIHJldHVybiBzY2hlbWE7XG4gIH0pO1xuXG4gIC8vIHNhZmUtYW5kLXNlcXVlbnRpYWwgZGF0ZXNcbiAgY29udGFpbmVyLmRlZmluZSgnc2VxdWVudGlhbERhdGUnLCBmdW5jdGlvbiBzZXF1ZW50aWFsRGF0ZSh2YWx1ZSwgc2NoZW1hKSB7XG4gICAgaWYgKCF0aGlzLm5vdykge1xuICAgICAgdGhpcy5ub3cgPSByYW5kb20uZGF0ZSgpO1xuICAgIH1cblxuICAgIGlmICh2YWx1ZSkge1xuICAgICAgc2NoZW1hID0gdGhpcy5ub3cudG9JU09TdHJpbmcoKTtcbiAgICAgIHZhbHVlID0gdmFsdWUgPT09IHRydWVcbiAgICAgICAgPyAnZGF5cydcbiAgICAgICAgOiB2YWx1ZTtcblxuICAgICAgaWYgKFsnc2Vjb25kcycsICdtaW51dGVzJywgJ2hvdXJzJywgJ2RheXMnLCAnd2Vla3MnLCAnbW9udGhzJywgJ3llYXJzJ10uaW5kZXhPZih2YWx1ZSkgPT09IC0xKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5zdXBwb3J0ZWQgaW5jcmVtZW50IGJ5ICR7dXRpbHMuc2hvcnQodmFsdWUpfWApO1xuICAgICAgfVxuXG4gICAgICB0aGlzLm5vdy5zZXRUaW1lKHRoaXMubm93LmdldFRpbWUoKSArIHJhbmRvbS5kYXRlKHZhbHVlKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNjaGVtYTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGdldFJlZnMocmVmcywgc2NoZW1hKSB7XG4gIGxldCAkcmVmcyA9IHt9O1xuXG4gIGlmIChBcnJheS5pc0FycmF5KHJlZnMpKSB7XG4gICAgcmVmcy5mb3JFYWNoKF9zY2hlbWEgPT4ge1xuICAgICAgJHJlZnNbX3NjaGVtYS4kaWQgfHwgX3NjaGVtYS5pZF0gPSBfc2NoZW1hO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgICRyZWZzID0gcmVmcyB8fCB7fTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHdhbGsob2JqKSB7XG4gICAgaWYgKCFvYmogfHwgdHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpIHJldHVybjtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShvYmopKSByZXR1cm4gb2JqLmZvckVhY2god2Fsayk7XG5cbiAgICBjb25zdCBfaWQgPSBvYmouJGlkIHx8IG9iai5pZDtcblxuICAgIGlmICh0eXBlb2YgX2lkID09PSAnc3RyaW5nJyAmJiAhJHJlZnNbX2lkXSkge1xuICAgICAgJHJlZnNbX2lkXSA9IG9iajtcbiAgICB9XG5cbiAgICBPYmplY3Qua2V5cyhvYmopLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIHdhbGsob2JqW2tleV0pO1xuICAgIH0pO1xuICB9XG5cbiAgd2FsayhyZWZzKTtcbiAgd2FsayhzY2hlbWEpO1xuXG4gIHJldHVybiAkcmVmcztcbn1cblxuY29uc3QganNmID0gKHNjaGVtYSwgcmVmcywgY3dkKSA9PiB7XG4gIGNvbnNvbGUuZGVidWcoJ1tqc29uLXNjaGVtYS1mYWtlcl0gY2FsbGluZyBKU09OU2NoZW1hRmFrZXIoKSBpcyBkZXByZWNhdGVkLCBjYWxsIGVpdGhlciAuZ2VuZXJhdGUoKSBvciAucmVzb2x2ZSgpJyk7XG5cbiAgaWYgKGN3ZCkge1xuICAgIGNvbnNvbGUuZGVidWcoJ1tqc29uLXNjaGVtYS1mYWtlcl0gbG9jYWwgcmVmZXJlbmNlcyBhcmUgb25seSBzdXBwb3J0ZWQgYnkgY2FsbGluZyAucmVzb2x2ZSgpJyk7XG4gIH1cblxuICByZXR1cm4ganNmLmdlbmVyYXRlKHNjaGVtYSwgcmVmcyk7XG59O1xuXG5qc2YuZ2VuZXJhdGVXaXRoQ29udGV4dCA9IChzY2hlbWEsIHJlZnMpID0+IHtcbiAgY29uc3QgJHJlZnMgPSBnZXRSZWZzKHJlZnMsIHNjaGVtYSk7XG5cbiAgcmV0dXJuIHJ1bigkcmVmcywgc2NoZW1hLCBjb250YWluZXIsIHRydWUpO1xufTtcblxuanNmLmdlbmVyYXRlID0gKHNjaGVtYSwgcmVmcykgPT4gcmVuZGVySlMoXG4gICAganNmLmdlbmVyYXRlV2l0aENvbnRleHQoc2NoZW1hLCByZWZzKSxcbiAgKTtcblxuanNmLmdlbmVyYXRlWUFNTCA9IChzY2hlbWEsIHJlZnMpID0+IHJlbmRlcllBTUwoXG4gICAganNmLmdlbmVyYXRlV2l0aENvbnRleHQoc2NoZW1hLCByZWZzKSxcbiAgKTtcblxuanNmLnJlc29sdmVXaXRoQ29udGV4dCA9IChzY2hlbWEsIHJlZnMsIGN3ZCkgPT4ge1xuICBpZiAodHlwZW9mIHJlZnMgPT09ICdzdHJpbmcnKSB7XG4gICAgY3dkID0gcmVmcztcbiAgICByZWZzID0ge307XG4gIH1cblxuICAvLyBub3JtYWxpemUgYmFzZWRpciAoYnJvd3NlciBhd2FyZSlcbiAgY3dkID0gY3dkIHx8ICh0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIHByb2Nlc3MuY3dkID09PSAnZnVuY3Rpb24nID8gcHJvY2Vzcy5jd2QoKSA6ICcnKTtcbiAgY3dkID0gYCR7Y3dkLnJlcGxhY2UoL1xcLyskLywgJycpfS9gO1xuXG4gIGNvbnN0ICRyZWZzID0gZ2V0UmVmcyhyZWZzLCBzY2hlbWEpO1xuXG4gIC8vIGlkZW50aWNhbCBzZXR1cCBhcyBqc29uLXNjaGVtYS1zZXF1ZWxpemVyXG4gIGNvbnN0IGZpeGVkUmVmcyA9IHtcbiAgICBvcmRlcjogMSxcbiAgICBjYW5SZWFkKGZpbGUpIHtcbiAgICAgIGNvbnN0IGtleSA9IGZpbGUudXJsLnJlcGxhY2UoJy86JywgJzonKTtcblxuICAgICAgcmV0dXJuICRyZWZzW2tleV0gfHwgJHJlZnNba2V5LnNwbGl0KCcvJykucG9wKCldO1xuICAgIH0sXG4gICAgcmVhZChmaWxlLCBjYWxsYmFjaykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY2FsbGJhY2sobnVsbCwgdGhpcy5jYW5SZWFkKGZpbGUpKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FsbGJhY2soZSk7XG4gICAgICB9XG4gICAgfSxcbiAgfTtcblxuICBjb25zdCB7ICRSZWZQYXJzZXIgfSA9IGdldERlcGVuZGVuY2llcygpO1xuXG4gIHJldHVybiAkUmVmUGFyc2VyXG4gICAgLmJ1bmRsZShjd2QsIHNjaGVtYSwge1xuICAgICAgcmVzb2x2ZToge1xuICAgICAgICBmaWxlOiB7IG9yZGVyOiAxMDAgfSxcbiAgICAgICAgaHR0cDogeyBvcmRlcjogMjAwIH0sXG4gICAgICAgIGZpeGVkUmVmcyxcbiAgICAgIH0sXG4gICAgICBkZXJlZmVyZW5jZToge1xuICAgICAgICBjaXJjdWxhcjogJ2lnbm9yZScsXG4gICAgICB9LFxuICAgIH0pLnRoZW4oc3ViID0+IHJ1bigkcmVmcywgc3ViLCBjb250YWluZXIpKVxuICAgIC5jYXRjaChlID0+IHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgRXJyb3Igd2hpbGUgcmVzb2x2aW5nIHNjaGVtYSAoJHtlLm1lc3NhZ2V9KWApO1xuICAgIH0pO1xufTtcblxuanNmLnJlc29sdmUgPSAoc2NoZW1hLCByZWZzLCBjd2QpID0+IGpzZi5yZXNvbHZlV2l0aENvbnRleHQoc2NoZW1hLCByZWZzLCBjd2QpLnRoZW4ocmVuZGVySlMpO1xuXG5qc2YucmVzb2x2ZVlBTUwgPSAoc2NoZW1hLCByZWZzLCBjd2QpID0+IGpzZi5yZXNvbHZlV2l0aENvbnRleHQoc2NoZW1hLCByZWZzLCBjd2QpLnRoZW4ocmVuZGVyWUFNTCk7XG5cbnNldHVwS2V5d29yZHMoKTtcblxuanNmLmZvcm1hdCA9IGZvcm1hdDtcbmpzZi5vcHRpb24gPSBvcHRpb247XG5qc2YucmFuZG9tID0gcmFuZG9tO1xuXG4vLyByZXR1cm5zIGl0c2VsZiBmb3IgY2hhaW5pbmdcbmpzZi5leHRlbmQgPSAobmFtZSwgY2IpID0+IHtcbiAgY29udGFpbmVyLmV4dGVuZChuYW1lLCBjYik7XG4gIHJldHVybiBqc2Y7XG59O1xuXG5qc2YuZGVmaW5lID0gKG5hbWUsIGNiKSA9PiB7XG4gIGNvbnRhaW5lci5kZWZpbmUobmFtZSwgY2IpO1xuICByZXR1cm4ganNmO1xufTtcblxuanNmLnJlc2V0ID0gbmFtZSA9PiB7XG4gIGNvbnRhaW5lci5yZXNldChuYW1lKTtcbiAgc2V0dXBLZXl3b3JkcygpO1xuICByZXR1cm4ganNmO1xufTtcblxuanNmLmxvY2F0ZSA9IG5hbWUgPT4ge1xuICByZXR1cm4gY29udGFpbmVyLmdldChuYW1lKTtcbn07XG5cbmpzZi5WRVJTSU9OID0gcHJvY2Vzcy5lbnYuVkVSU0lPTiB8fCAnSEVBRCc7XG5cbi8vIEV4cG9ydCBhbiBvYmplY3QgdGhhdCBoYXMgYWxsIG9mIGpzZigpJ3MgcHJvcGVydGllcyBhbmQgaXMgbm90IGEgZnVuY3Rpb25cbi8vIENhbGxpbmcganNmKCkgaXMgZGVwcmVjYXRlZCBpbiBmYXZvciBvZiBKU09OU2NoZW1hRmFrZXIuZ2VuZXJhdGUoKSAvIEpTT05TY2hlbWFGYWtlci5yZXNvbHZlKClcbmV4cG9ydCBjb25zdCBKU09OU2NoZW1hRmFrZXIgPSB7IC4uLmpzZiB9O1xuXG4vLyBGb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eSB3ZSBzdGlsbCBleHBvcnQgdGhlIGpzZiBmdW5jdGlvblxuZXhwb3J0IGRlZmF1bHQganNmO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBLFdBQU8sVUFBVTtBQUFBLE1BQ2YsTUFBYTtBQUFBLE1BQ2IsT0FBYTtBQUFBLE1BQ2IsVUFBYTtBQUFBLE1BQ2IsS0FBYTtBQUFBLE1BQ2IsT0FBYTtBQUFBLE1BQ2IsWUFBYTtBQUFBLE1BQ2IsV0FBYTtBQUFBLE1BQ2IsTUFBYTtBQUFBLElBQ2Y7QUFBQTtBQUFBOzs7QUNUQTtBQUFBO0FBQUEsUUFBTUEsU0FBUTtBQUVkLFFBQU0sT0FBTyxNQUFNLENBQUMsRUFBRSxNQUFNQSxPQUFNLE9BQVEsTUFBTSxJQUFJLElBQUksR0FBRyxDQUFDO0FBRTVELFFBQU0sUUFB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UTsiLAogICJuYW1lcyI6IFsidHlwZXMiLCAidHlwZXMiLCAidHlwZXMiLCAidHlwZXMiLCAiaSIsICJyZXF1aXJlX2xpYiIsICJ0eXBlcyIsICJSYW5kRXhwIiwgIk5vZGUiLCAiY2giLCAiTm9kZSIsICJyZXMiLCAiU2NhbGFyIiwgIkNvbGxlY3Rpb24iLCAibm9kZXMiLCAic3RyIiwgIllBTUxTZXEiLCAiUGFpciIsICJBbGlhcyIsICJZQU1MTWFwIiwgIk1lcmdlIiwgImJpbmFyeU9wdGlvbnMiLCAiYm9vbE9wdGlvbnMiLCAiaW50T3B0aW9ucyIsICJudWxsT3B0aW9ucyIsICJzdHJPcHRpb25zIiwgInJlc29sdmUiLCAiaSIsICJlbmQiLCAicGFpcnMiLCAib21hcCIsICJzZXQiLCAibiIsICJkYXRlIiwgIm1hcCIsICJzZXEiLCAibiIsICJ0YWdzIiwgInNjaGVtYXMiLCAiU2NoZW1hIiwgIm1lcmdlIiwgInJlcXVpcmVfdHlwZXMiLCAiU2NoZW1hIiwgIlJhbmRFeHAiLCAidHlwZXMiLCAicmVnaXN0cnkiLCAiYm9vbGVhbl9kZWZhdWx0IiwgIm51bGxfZGVmYXVsdCIsICJyZXNvbHZlIiwgIm51bWJlciIsICJyZXNvbHZlIiwgImJvb2xlYW5fZGVmYXVsdCIsICJudWxsX2RlZmF1bHQiLCAicmVzb2x2ZSIsICJjb250YWluZXIiLCAicGljayIsICJjb250YWluZXIiLCAiaW1wb3J0X3R5cGVzIiwgInR5cGVzIl0KfQo=
