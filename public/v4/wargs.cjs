"use strict";
var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// node_modules/getopts/index.cjs
var require_getopts = __commonJS({
  "node_modules/getopts/index.cjs"(exports2, module2) {
    var EMPTYARR = [];
    var SHORTSPLIT = /$|[!-@[-`{-~][\s\S]*/g;
    var isArray = Array.isArray;
    var parseValue = function(any) {
      if (any === "")
        return "";
      if (any === "false")
        return false;
      const maybe = +any;
      return maybe * 0 === 0 ? maybe : any;
    };
    var parseAlias = function(aliases) {
      let out = {}, alias, prev, any;
      for (let key in aliases) {
        any = aliases[key];
        alias = out[key] = isArray(any) ? any : [any];
        for (let i = 0; i < alias.length; i++) {
          prev = out[alias[i]] = [key];
          for (let k = 0; k < alias.length; k++) {
            if (i !== k)
              prev.push(alias[k]);
          }
        }
      }
      return out;
    };
    var parseDefault = function(aliases, defaults) {
      let out = {}, alias, value;
      for (let key in defaults) {
        alias = aliases[key];
        value = defaults[key];
        out[key] = value;
        if (alias === void 0) {
          aliases[key] = EMPTYARR;
        } else {
          for (let i = 0; i < alias.length; i++) {
            out[alias[i]] = value;
          }
        }
      }
      return out;
    };
    var parseOptions = function(aliases, options, value) {
      let out = {}, key, alias;
      if (options !== void 0) {
        for (let i = 0; i < options.length; i++) {
          key = options[i];
          alias = aliases[key];
          out[key] = value;
          if (alias === void 0) {
            aliases[key] = EMPTYARR;
          } else {
            for (let k = 0, end = alias.length; k < end; k++) {
              out[alias[k]] = value;
            }
          }
        }
      }
      return out;
    };
    var write = function(out, key, value, aliases, unknown) {
      let prev, alias = aliases[key], len = alias === void 0 ? -1 : alias.length;
      if (len >= 0 || unknown === void 0 || unknown(key)) {
        prev = out[key];
        if (prev === void 0) {
          out[key] = value;
        } else {
          if (isArray(prev)) {
            prev.push(value);
          } else {
            out[key] = [prev, value];
          }
        }
        for (let i = 0; i < len; i++) {
          out[alias[i]] = out[key];
        }
      }
    };
    module2.exports = function(argv, opts) {
      let unknown = (opts = opts || {}).unknown, aliases = parseAlias(opts.alias), strings = parseOptions(aliases, opts.string, ""), values = parseDefault(aliases, opts.default), bools = parseOptions(aliases, opts.boolean, false), stopEarly = opts.stopEarly, _ = [], out = { _ }, key, arg, end, match, value;
      for (let i = 0, len = argv.length; i < len; i++) {
        arg = argv[i];
        if (arg[0] !== "-" || arg === "-") {
          if (stopEarly) {
            while (i < len) {
              _.push(argv[i++]);
            }
          } else {
            _.push(arg);
          }
        } else if (arg === "--") {
          while (++i < len) {
            _.push(argv[i]);
          }
        } else if (arg[1] === "-") {
          end = arg.indexOf("=", 2);
          if (arg[2] === "n" && arg[3] === "o" && arg[4] === "-") {
            key = arg.slice(5, end >= 0 ? end : void 0);
            value = false;
          } else if (end >= 0) {
            key = arg.slice(2, end);
            value = bools[key] !== void 0 || (strings[key] === void 0 ? parseValue(arg.slice(end + 1)) : arg.slice(end + 1));
          } else {
            key = arg.slice(2);
            value = bools[key] !== void 0 || (len === i + 1 || argv[i + 1][0] === "-" ? strings[key] === void 0 ? true : "" : strings[key] === void 0 ? parseValue(argv[++i]) : argv[++i]);
          }
          write(out, key, value, aliases, unknown);
        } else {
          SHORTSPLIT.lastIndex = 2;
          match = SHORTSPLIT.exec(arg);
          end = match.index;
          value = match[0];
          for (let k = 1; k < end; k++) {
            write(
              out,
              key = arg[k],
              k + 1 < end ? strings[key] === void 0 || arg.substring(k + 1, k = end) + value : value === "" ? len === i + 1 || argv[i + 1][0] === "-" ? strings[key] === void 0 || "" : bools[key] !== void 0 || (strings[key] === void 0 ? parseValue(argv[++i]) : argv[++i]) : bools[key] !== void 0 || (strings[key] === void 0 ? parseValue(value) : value),
              aliases,
              unknown
            );
          }
        }
      }
      for (let key2 in values)
        if (out[key2] === void 0)
          out[key2] = values[key2];
      for (let key2 in bools)
        if (out[key2] === void 0)
          out[key2] = false;
      for (let key2 in strings)
        if (out[key2] === void 0)
          out[key2] = "";
      return out;
    };
  }
});

// lib/index.js
var $$ = (key) => `__Symbol@@${key}__`;
var __QUOTE__ = $$("QUOTE");
var __APOS__ = $$("APOS");
var __SPA__ = $$("SPA");
var RE_CAMEL_CASE = /-(\w)/g;
var RE_MATCH_KEYVAL = /^((?!\d)[-~+./\w]+)([=:])(.+?)?$/;
var RE_MATCH_QUOTES = /(["'])(?:(?!\1).)*\1/;
var RE_SPECIAL_CHARS = ['"', "'", " "];
var RE_ESCAPE_CHARS = [/\\"/g, /\\'/g, /\\ /g];
var RE_QUOTED_CHARS = [__QUOTE__, __APOS__, __SPA__];
var RE_UNESCAPE_CHARS = [__QUOTE__, __APOS__, __SPA__].map((_) => new RegExp(_, "g"));
var getopts = require_getopts();
function escape(val) {
  return RE_ESCAPE_CHARS.reduce((prev, cur, i) => prev.replace(cur, RE_QUOTED_CHARS[i]), val);
}
function unescape(val) {
  return RE_UNESCAPE_CHARS.reduce((prev, cur, i) => prev.replace(cur, RE_SPECIAL_CHARS[i]), val);
}
function unquote(val, extra) {
  while (RE_MATCH_QUOTES.test(val)) {
    const matches = val.match(RE_MATCH_QUOTES);
    const substr = matches[0].substr(1, matches[0].length - 2);
    val = val.replace(matches[0], RE_SPECIAL_CHARS.reduce((prev, cur, i) => prev.replace(cur, RE_QUOTED_CHARS[i]), substr));
  }
  if (extra) {
    while (val.indexOf(" ") > -1) {
      val = RE_SPECIAL_CHARS.reduce((prev, cur, i) => prev.replace(cur, RE_QUOTED_CHARS[i]), val);
    }
  }
  return val.split(/\s+/);
}
function evaluate(value, cb) {
  if (typeof cb === "function") {
    return cb(value);
  }
  return value;
}
function camelcase(value) {
  return value.replace(RE_CAMEL_CASE, (_, char) => char.toUpperCase());
}
function autocamelcase(value, raw) {
  if (typeof value === "string") {
    if ((raw || value.indexOf("--") === 0) && value.indexOf("no-") === -1) {
      if (value.indexOf("=") === -1) {
        return raw ? camelcase(value) : `--${camelcase(value.substr(2))}`;
      }
      let [key, ...val] = value.split("=");
      key = raw ? camelcase(key) : `--${camelcase(key.substr(2))}`;
      val = val.length > 1 ? val.join("=") : val[0];
      return `${key}=${val}`;
    }
    return value;
  }
  return value.map((arg) => autocamelcase(arg, raw));
}
module.exports = (argv, opts, cb) => {
  opts = opts || {};
  if (typeof opts === "function") {
    cb = opts;
    opts = {};
  }
  if (opts.format) {
    cb = opts.format;
    delete opts.format;
  }
  if (!Array.isArray(argv)) {
    argv = escape(String(argv || ""));
    let test;
    do {
      test = argv.match(RE_MATCH_QUOTES);
      if (test) {
        argv = argv.replace(test[0], unquote(test[0], true));
      }
    } while (test);
    argv = argv.trim().split(/\s+/).map(unescape).filter((x) => x);
  }
  const offset = argv.indexOf("--");
  const _raw = [];
  if (offset > -1) {
    argv.slice(offset + 1).forEach((value) => {
      _raw.push(evaluate(value, cb));
    });
    argv.splice(offset + 1, argv.length);
  }
  if (typeof opts.boolean === "string") {
    opts.boolean = opts.boolean.split("");
  }
  if (typeof opts.string === "string") {
    opts.string = opts.string.split("");
  }
  if (opts.boolean) {
    opts.boolean = autocamelcase(opts.boolean, true);
  }
  if (opts.string) {
    opts.string = autocamelcase(opts.string, true);
  }
  if (opts.alias) {
    Object.keys(opts.alias).forEach((key) => {
      opts.alias[key] = autocamelcase(opts.alias[key], true);
    });
  }
  const _flags = getopts(autocamelcase(argv), opts);
  const _extra = _flags._.slice();
  Object.keys(_flags).forEach((key) => {
    if (key === "")
      delete _flags[key];
    if (_flags[key] === "")
      _flags[key] = null;
  });
  const _data = {};
  const _params = {};
  delete _flags._;
  Object.keys(_flags).forEach((key) => {
    const value = _flags[key];
    if (key.indexOf("-") !== -1) {
      delete _flags[key];
      key = camelcase(key);
    }
    if (opts.alias && opts.alias[key] && opts.alias[key].indexOf("no-") === 0) {
      if (_flags[opts.alias[key]]) {
        _flags[opts.alias[key].substr(3)] = false;
      }
      _flags[key] = true;
    }
    if (Array.isArray(value)) {
      _flags[key] = value.map((x) => evaluate(x, cb));
    }
    if (typeof value === "string") {
      if (value.charAt() === "=") {
        _flags[key] = evaluate(value.substr(1), cb);
      } else {
        _flags[key] = evaluate(value, cb);
      }
    }
  });
  const __ = _extra.reduce((prev, cur) => {
    const matches = cur.match(RE_MATCH_KEYVAL);
    if (matches) {
      if (matches[2] === "=") {
        _data[matches[1]] = evaluate(matches[3] || "", cb);
      } else if (_params[matches[1]]) {
        if (!Array.isArray(_params[matches[1]])) {
          _params[matches[1]] = [_params[matches[1]]];
        }
        _params[matches[1]].push(evaluate(matches[3] || "", cb));
      } else {
        _params[matches[1]] = evaluate(matches[3] || "", cb);
      }
    } else {
      prev.push(evaluate(cur, cb));
    }
    return prev;
  }, []);
  return {
    _: __,
    raw: _raw,
    data: _data,
    flags: _flags,
    params: _params
  };
};
