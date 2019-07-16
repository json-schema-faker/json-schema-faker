/*!
 * json-schema-faker v0.5.0-rc17
 * (c) Alvaro Cabrera <pateketrueke@gmail.com> (https://soypache.co)
 * Released under the MIT License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('util'), require('fs'), require('url'), require('http'), require('https')) :
  typeof define === 'function' && define.amd ? define(['util', 'fs', 'url', 'http', 'https'], factory) :
  (global = global || self, global.JSONSchemaFaker = factory(global.util$1, global.fs, global.url, global.http, global.https));
}(this, function (util$1, fs, url, http, https) { 'use strict';

  util$1 = util$1 && util$1.hasOwnProperty('default') ? util$1['default'] : util$1;
  fs = fs && fs.hasOwnProperty('default') ? fs['default'] : fs;
  url = url && url.hasOwnProperty('default') ? url['default'] : url;
  http = http && http.hasOwnProperty('default') ? http['default'] : http;
  https = https && https.hasOwnProperty('default') ? https['default'] : https;

  var json = {
    /**
     * The order that this parser will run, in relation to other parsers.
     *
     * @type {number}
     */
    order: 100,

    /**
     * Whether to allow "empty" files. This includes zero-byte files, as well as empty JSON objects.
     *
     * @type {boolean}
     */
    allowEmpty: true,

    /**
     * Determines whether this parser can parse a given file reference.
     * Parsers that match will be tried, in order, until one successfully parses the file.
     * Parsers that don't match will be skipped, UNLESS none of the parsers match, in which case
     * every parser will be tried.
     *
     * @type {RegExp|string[]|function}
     */
    canParse: ".json",

    /**
     * Parses the given file as JSON
     *
     * @param {object} file           - An object containing information about the referenced file
     * @param {string} file.url       - The full URL of the referenced file
     * @param {string} file.extension - The lowercased file extension (e.g. ".txt", ".html", etc.)
     * @param {*}      file.data      - The file contents. This will be whatever data type was returned by the resolver
     * @returns {Promise}
     */
    parse: function parseJSON (file) {
      return new Promise(function (resolve, reject) {
        var data = file.data;
        if (Buffer.isBuffer(data)) {
          data = data.toString();
        }

        if (typeof data === "string") {
          if (data.trim().length === 0) {
            resolve(undefined);  // This mirrors the YAML behavior
          }
          else {
            resolve(JSON.parse(data));
          }
        }
        else {
          // data is already a JavaScript value (object, array, number, null, NaN, etc.)
          resolve(data);
        }
      });
    }
  };

  function isNothing(subject) {
    return (typeof subject === 'undefined') || (subject === null);
  }


  function isObject(subject) {
    return (typeof subject === 'object') && (subject !== null);
  }


  function toArray(sequence) {
    if (Array.isArray(sequence)) return sequence;
    else if (isNothing(sequence)) return [];

    return [ sequence ];
  }


  function extend(target, source) {
    var index, length, key, sourceKeys;

    if (source) {
      sourceKeys = Object.keys(source);

      for (index = 0, length = sourceKeys.length; index < length; index += 1) {
        key = sourceKeys[index];
        target[key] = source[key];
      }
    }

    return target;
  }


  function repeat(string, count) {
    var result = '', cycle;

    for (cycle = 0; cycle < count; cycle += 1) {
      result += string;
    }

    return result;
  }


  function isNegativeZero(number) {
    return (number === 0) && (Number.NEGATIVE_INFINITY === 1 / number);
  }


  var isNothing_1      = isNothing;
  var isObject_1       = isObject;
  var toArray_1        = toArray;
  var repeat_1         = repeat;
  var isNegativeZero_1 = isNegativeZero;
  var extend_1         = extend;

  var common = {
  	isNothing: isNothing_1,
  	isObject: isObject_1,
  	toArray: toArray_1,
  	repeat: repeat_1,
  	isNegativeZero: isNegativeZero_1,
  	extend: extend_1
  };

  // YAML error class. http://stackoverflow.com/questions/8458984

  function YAMLException(reason, mark) {
    // Super constructor
    Error.call(this);

    this.name = 'YAMLException';
    this.reason = reason;
    this.mark = mark;
    this.message = (this.reason || '(unknown reason)') + (this.mark ? ' ' + this.mark.toString() : '');

    // Include stack trace in error object
    if (Error.captureStackTrace) {
      // Chrome and NodeJS
      Error.captureStackTrace(this, this.constructor);
    } else {
      // FF, IE 10+ and Safari 6+. Fallback for others
      this.stack = (new Error()).stack || '';
    }
  }


  // Inherit from Error
  YAMLException.prototype = Object.create(Error.prototype);
  YAMLException.prototype.constructor = YAMLException;


  YAMLException.prototype.toString = function toString(compact) {
    var result = this.name + ': ';

    result += this.reason || '(unknown reason)';

    if (!compact && this.mark) {
      result += ' ' + this.mark.toString();
    }

    return result;
  };


  var exception = YAMLException;

  function Mark(name, buffer, position, line, column) {
    this.name     = name;
    this.buffer   = buffer;
    this.position = position;
    this.line     = line;
    this.column   = column;
  }


  Mark.prototype.getSnippet = function getSnippet(indent, maxLength) {
    var head, start, tail, end, snippet;

    if (!this.buffer) return null;

    indent = indent || 4;
    maxLength = maxLength || 75;

    head = '';
    start = this.position;

    while (start > 0 && '\x00\r\n\x85\u2028\u2029'.indexOf(this.buffer.charAt(start - 1)) === -1) {
      start -= 1;
      if (this.position - start > (maxLength / 2 - 1)) {
        head = ' ... ';
        start += 5;
        break;
      }
    }

    tail = '';
    end = this.position;

    while (end < this.buffer.length && '\x00\r\n\x85\u2028\u2029'.indexOf(this.buffer.charAt(end)) === -1) {
      end += 1;
      if (end - this.position > (maxLength / 2 - 1)) {
        tail = ' ... ';
        end -= 5;
        break;
      }
    }

    snippet = this.buffer.slice(start, end);

    return common.repeat(' ', indent) + head + snippet + tail + '\n' +
           common.repeat(' ', indent + this.position - start + head.length) + '^';
  };


  Mark.prototype.toString = function toString(compact) {
    var snippet, where = '';

    if (this.name) {
      where += 'in "' + this.name + '" ';
    }

    where += 'at line ' + (this.line + 1) + ', column ' + (this.column + 1);

    if (!compact) {
      snippet = this.getSnippet();

      if (snippet) {
        where += ':\n' + snippet;
      }
    }

    return where;
  };


  var mark = Mark;

  var TYPE_CONSTRUCTOR_OPTIONS = [
    'kind',
    'resolve',
    'construct',
    'instanceOf',
    'predicate',
    'represent',
    'defaultStyle',
    'styleAliases'
  ];

  var YAML_NODE_KINDS = [
    'scalar',
    'sequence',
    'mapping'
  ];

  function compileStyleAliases(map) {
    var result = {};

    if (map !== null) {
      Object.keys(map).forEach(function (style) {
        map[style].forEach(function (alias) {
          result[String(alias)] = style;
        });
      });
    }

    return result;
  }

  function Type(tag, options) {
    options = options || {};

    Object.keys(options).forEach(function (name) {
      if (TYPE_CONSTRUCTOR_OPTIONS.indexOf(name) === -1) {
        throw new exception('Unknown option "' + name + '" is met in definition of "' + tag + '" YAML type.');
      }
    });

    // TODO: Add tag format check.
    this.tag          = tag;
    this.kind         = options['kind']         || null;
    this.resolve      = options['resolve']      || function () { return true; };
    this.construct    = options['construct']    || function (data) { return data; };
    this.instanceOf   = options['instanceOf']   || null;
    this.predicate    = options['predicate']    || null;
    this.represent    = options['represent']    || null;
    this.defaultStyle = options['defaultStyle'] || null;
    this.styleAliases = compileStyleAliases(options['styleAliases'] || null);

    if (YAML_NODE_KINDS.indexOf(this.kind) === -1) {
      throw new exception('Unknown kind "' + this.kind + '" is specified for "' + tag + '" YAML type.');
    }
  }

  var type = Type;

  /*eslint-disable max-len*/






  function compileList(schema, name, result) {
    var exclude = [];

    schema.include.forEach(function (includedSchema) {
      result = compileList(includedSchema, name, result);
    });

    schema[name].forEach(function (currentType) {
      result.forEach(function (previousType, previousIndex) {
        if (previousType.tag === currentType.tag && previousType.kind === currentType.kind) {
          exclude.push(previousIndex);
        }
      });

      result.push(currentType);
    });

    return result.filter(function (type, index) {
      return exclude.indexOf(index) === -1;
    });
  }


  function compileMap(/* lists... */) {
    var result = {
          scalar: {},
          sequence: {},
          mapping: {},
          fallback: {}
        }, index, length;

    function collectType(type) {
      result[type.kind][type.tag] = result['fallback'][type.tag] = type;
    }

    for (index = 0, length = arguments.length; index < length; index += 1) {
      arguments[index].forEach(collectType);
    }
    return result;
  }


  function Schema(definition) {
    this.include  = definition.include  || [];
    this.implicit = definition.implicit || [];
    this.explicit = definition.explicit || [];

    this.implicit.forEach(function (type) {
      if (type.loadKind && type.loadKind !== 'scalar') {
        throw new exception('There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.');
      }
    });

    this.compiledImplicit = compileList(this, 'implicit', []);
    this.compiledExplicit = compileList(this, 'explicit', []);
    this.compiledTypeMap  = compileMap(this.compiledImplicit, this.compiledExplicit);
  }


  Schema.DEFAULT = null;


  Schema.create = function createSchema() {
    var schemas, types;

    switch (arguments.length) {
      case 1:
        schemas = Schema.DEFAULT;
        types = arguments[0];
        break;

      case 2:
        schemas = arguments[0];
        types = arguments[1];
        break;

      default:
        throw new exception('Wrong number of arguments for Schema.create function');
    }

    schemas = common.toArray(schemas);
    types = common.toArray(types);

    if (!schemas.every(function (schema) { return schema instanceof Schema; })) {
      throw new exception('Specified list of super schemas (or a single Schema object) contains a non-Schema object.');
    }

    if (!types.every(function (type$1) { return type$1 instanceof type; })) {
      throw new exception('Specified list of YAML types (or a single Type object) contains a non-Type object.');
    }

    return new Schema({
      include: schemas,
      explicit: types
    });
  };


  var schema = Schema;

  var str = new type('tag:yaml.org,2002:str', {
    kind: 'scalar',
    construct: function (data) { return data !== null ? data : ''; }
  });

  var seq = new type('tag:yaml.org,2002:seq', {
    kind: 'sequence',
    construct: function (data) { return data !== null ? data : []; }
  });

  var map = new type('tag:yaml.org,2002:map', {
    kind: 'mapping',
    construct: function (data) { return data !== null ? data : {}; }
  });

  var failsafe = new schema({
    explicit: [
      str,
      seq,
      map
    ]
  });

  function resolveYamlNull(data) {
    if (data === null) return true;

    var max = data.length;

    return (max === 1 && data === '~') ||
           (max === 4 && (data === 'null' || data === 'Null' || data === 'NULL'));
  }

  function constructYamlNull() {
    return null;
  }

  function isNull(object) {
    return object === null;
  }

  var _null = new type('tag:yaml.org,2002:null', {
    kind: 'scalar',
    resolve: resolveYamlNull,
    construct: constructYamlNull,
    predicate: isNull,
    represent: {
      canonical: function () { return '~';    },
      lowercase: function () { return 'null'; },
      uppercase: function () { return 'NULL'; },
      camelcase: function () { return 'Null'; }
    },
    defaultStyle: 'lowercase'
  });

  function resolveYamlBoolean(data) {
    if (data === null) return false;

    var max = data.length;

    return (max === 4 && (data === 'true' || data === 'True' || data === 'TRUE')) ||
           (max === 5 && (data === 'false' || data === 'False' || data === 'FALSE'));
  }

  function constructYamlBoolean(data) {
    return data === 'true' ||
           data === 'True' ||
           data === 'TRUE';
  }

  function isBoolean(object) {
    return Object.prototype.toString.call(object) === '[object Boolean]';
  }

  var bool = new type('tag:yaml.org,2002:bool', {
    kind: 'scalar',
    resolve: resolveYamlBoolean,
    construct: constructYamlBoolean,
    predicate: isBoolean,
    represent: {
      lowercase: function (object) { return object ? 'true' : 'false'; },
      uppercase: function (object) { return object ? 'TRUE' : 'FALSE'; },
      camelcase: function (object) { return object ? 'True' : 'False'; }
    },
    defaultStyle: 'lowercase'
  });

  function isHexCode(c) {
    return ((0x30/* 0 */ <= c) && (c <= 0x39/* 9 */)) ||
           ((0x41/* A */ <= c) && (c <= 0x46/* F */)) ||
           ((0x61/* a */ <= c) && (c <= 0x66/* f */));
  }

  function isOctCode(c) {
    return ((0x30/* 0 */ <= c) && (c <= 0x37/* 7 */));
  }

  function isDecCode(c) {
    return ((0x30/* 0 */ <= c) && (c <= 0x39/* 9 */));
  }

  function resolveYamlInteger(data) {
    if (data === null) return false;

    var max = data.length,
        index = 0,
        hasDigits = false,
        ch;

    if (!max) return false;

    ch = data[index];

    // sign
    if (ch === '-' || ch === '+') {
      ch = data[++index];
    }

    if (ch === '0') {
      // 0
      if (index + 1 === max) return true;
      ch = data[++index];

      // base 2, base 8, base 16

      if (ch === 'b') {
        // base 2
        index++;

        for (; index < max; index++) {
          ch = data[index];
          if (ch === '_') continue;
          if (ch !== '0' && ch !== '1') return false;
          hasDigits = true;
        }
        return hasDigits && ch !== '_';
      }


      if (ch === 'x') {
        // base 16
        index++;

        for (; index < max; index++) {
          ch = data[index];
          if (ch === '_') continue;
          if (!isHexCode(data.charCodeAt(index))) return false;
          hasDigits = true;
        }
        return hasDigits && ch !== '_';
      }

      // base 8
      for (; index < max; index++) {
        ch = data[index];
        if (ch === '_') continue;
        if (!isOctCode(data.charCodeAt(index))) return false;
        hasDigits = true;
      }
      return hasDigits && ch !== '_';
    }

    // base 10 (except 0) or base 60

    // value should not start with `_`;
    if (ch === '_') return false;

    for (; index < max; index++) {
      ch = data[index];
      if (ch === '_') continue;
      if (ch === ':') break;
      if (!isDecCode(data.charCodeAt(index))) {
        return false;
      }
      hasDigits = true;
    }

    // Should have digits and should not end with `_`
    if (!hasDigits || ch === '_') return false;

    // if !base60 - done;
    if (ch !== ':') return true;

    // base60 almost not used, no needs to optimize
    return /^(:[0-5]?[0-9])+$/.test(data.slice(index));
  }

  function constructYamlInteger(data) {
    var value = data, sign = 1, ch, base, digits = [];

    if (value.indexOf('_') !== -1) {
      value = value.replace(/_/g, '');
    }

    ch = value[0];

    if (ch === '-' || ch === '+') {
      if (ch === '-') sign = -1;
      value = value.slice(1);
      ch = value[0];
    }

    if (value === '0') return 0;

    if (ch === '0') {
      if (value[1] === 'b') return sign * parseInt(value.slice(2), 2);
      if (value[1] === 'x') return sign * parseInt(value, 16);
      return sign * parseInt(value, 8);
    }

    if (value.indexOf(':') !== -1) {
      value.split(':').forEach(function (v) {
        digits.unshift(parseInt(v, 10));
      });

      value = 0;
      base = 1;

      digits.forEach(function (d) {
        value += (d * base);
        base *= 60;
      });

      return sign * value;

    }

    return sign * parseInt(value, 10);
  }

  function isInteger(object) {
    return (Object.prototype.toString.call(object)) === '[object Number]' &&
           (object % 1 === 0 && !common.isNegativeZero(object));
  }

  var int_1 = new type('tag:yaml.org,2002:int', {
    kind: 'scalar',
    resolve: resolveYamlInteger,
    construct: constructYamlInteger,
    predicate: isInteger,
    represent: {
      binary:      function (obj) { return obj >= 0 ? '0b' + obj.toString(2) : '-0b' + obj.toString(2).slice(1); },
      octal:       function (obj) { return obj >= 0 ? '0'  + obj.toString(8) : '-0'  + obj.toString(8).slice(1); },
      decimal:     function (obj) { return obj.toString(10); },
      /* eslint-disable max-len */
      hexadecimal: function (obj) { return obj >= 0 ? '0x' + obj.toString(16).toUpperCase() :  '-0x' + obj.toString(16).toUpperCase().slice(1); }
    },
    defaultStyle: 'decimal',
    styleAliases: {
      binary:      [ 2,  'bin' ],
      octal:       [ 8,  'oct' ],
      decimal:     [ 10, 'dec' ],
      hexadecimal: [ 16, 'hex' ]
    }
  });

  var YAML_FLOAT_PATTERN = new RegExp(
    // 2.5e4, 2.5 and integers
    '^(?:[-+]?(?:0|[1-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?' +
    // .2e4, .2
    // special case, seems not from spec
    '|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?' +
    // 20:59
    '|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\\.[0-9_]*' +
    // .inf
    '|[-+]?\\.(?:inf|Inf|INF)' +
    // .nan
    '|\\.(?:nan|NaN|NAN))$');

  function resolveYamlFloat(data) {
    if (data === null) return false;

    if (!YAML_FLOAT_PATTERN.test(data) ||
        // Quick hack to not allow integers end with `_`
        // Probably should update regexp & check speed
        data[data.length - 1] === '_') {
      return false;
    }

    return true;
  }

  function constructYamlFloat(data) {
    var value, sign, base, digits;

    value  = data.replace(/_/g, '').toLowerCase();
    sign   = value[0] === '-' ? -1 : 1;
    digits = [];

    if ('+-'.indexOf(value[0]) >= 0) {
      value = value.slice(1);
    }

    if (value === '.inf') {
      return (sign === 1) ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;

    } else if (value === '.nan') {
      return NaN;

    } else if (value.indexOf(':') >= 0) {
      value.split(':').forEach(function (v) {
        digits.unshift(parseFloat(v, 10));
      });

      value = 0.0;
      base = 1;

      digits.forEach(function (d) {
        value += d * base;
        base *= 60;
      });

      return sign * value;

    }
    return sign * parseFloat(value, 10);
  }


  var SCIENTIFIC_WITHOUT_DOT = /^[-+]?[0-9]+e/;

  function representYamlFloat(object, style) {
    var res;

    if (isNaN(object)) {
      switch (style) {
        case 'lowercase': return '.nan';
        case 'uppercase': return '.NAN';
        case 'camelcase': return '.NaN';
      }
    } else if (Number.POSITIVE_INFINITY === object) {
      switch (style) {
        case 'lowercase': return '.inf';
        case 'uppercase': return '.INF';
        case 'camelcase': return '.Inf';
      }
    } else if (Number.NEGATIVE_INFINITY === object) {
      switch (style) {
        case 'lowercase': return '-.inf';
        case 'uppercase': return '-.INF';
        case 'camelcase': return '-.Inf';
      }
    } else if (common.isNegativeZero(object)) {
      return '-0.0';
    }

    res = object.toString(10);

    // JS stringifier can build scientific format without dots: 5e-100,
    // while YAML requres dot: 5.e-100. Fix it with simple hack

    return SCIENTIFIC_WITHOUT_DOT.test(res) ? res.replace('e', '.e') : res;
  }

  function isFloat(object) {
    return (Object.prototype.toString.call(object) === '[object Number]') &&
           (object % 1 !== 0 || common.isNegativeZero(object));
  }

  var float_1 = new type('tag:yaml.org,2002:float', {
    kind: 'scalar',
    resolve: resolveYamlFloat,
    construct: constructYamlFloat,
    predicate: isFloat,
    represent: representYamlFloat,
    defaultStyle: 'lowercase'
  });

  var json$1 = new schema({
    include: [
      failsafe
    ],
    implicit: [
      _null,
      bool,
      int_1,
      float_1
    ]
  });

  var core = new schema({
    include: [
      json$1
    ]
  });

  var YAML_DATE_REGEXP = new RegExp(
    '^([0-9][0-9][0-9][0-9])'          + // [1] year
    '-([0-9][0-9])'                    + // [2] month
    '-([0-9][0-9])$');                   // [3] day

  var YAML_TIMESTAMP_REGEXP = new RegExp(
    '^([0-9][0-9][0-9][0-9])'          + // [1] year
    '-([0-9][0-9]?)'                   + // [2] month
    '-([0-9][0-9]?)'                   + // [3] day
    '(?:[Tt]|[ \\t]+)'                 + // ...
    '([0-9][0-9]?)'                    + // [4] hour
    ':([0-9][0-9])'                    + // [5] minute
    ':([0-9][0-9])'                    + // [6] second
    '(?:\\.([0-9]*))?'                 + // [7] fraction
    '(?:[ \\t]*(Z|([-+])([0-9][0-9]?)' + // [8] tz [9] tz_sign [10] tz_hour
    '(?::([0-9][0-9]))?))?$');           // [11] tz_minute

  function resolveYamlTimestamp(data) {
    if (data === null) return false;
    if (YAML_DATE_REGEXP.exec(data) !== null) return true;
    if (YAML_TIMESTAMP_REGEXP.exec(data) !== null) return true;
    return false;
  }

  function constructYamlTimestamp(data) {
    var match, year, month, day, hour, minute, second, fraction = 0,
        delta = null, tz_hour, tz_minute, date;

    match = YAML_DATE_REGEXP.exec(data);
    if (match === null) match = YAML_TIMESTAMP_REGEXP.exec(data);

    if (match === null) throw new Error('Date resolve error');

    // match: [1] year [2] month [3] day

    year = +(match[1]);
    month = +(match[2]) - 1; // JS month starts with 0
    day = +(match[3]);

    if (!match[4]) { // no hour
      return new Date(Date.UTC(year, month, day));
    }

    // match: [4] hour [5] minute [6] second [7] fraction

    hour = +(match[4]);
    minute = +(match[5]);
    second = +(match[6]);

    if (match[7]) {
      fraction = match[7].slice(0, 3);
      while (fraction.length < 3) { // milli-seconds
        fraction += '0';
      }
      fraction = +fraction;
    }

    // match: [8] tz [9] tz_sign [10] tz_hour [11] tz_minute

    if (match[9]) {
      tz_hour = +(match[10]);
      tz_minute = +(match[11] || 0);
      delta = (tz_hour * 60 + tz_minute) * 60000; // delta in mili-seconds
      if (match[9] === '-') delta = -delta;
    }

    date = new Date(Date.UTC(year, month, day, hour, minute, second, fraction));

    if (delta) date.setTime(date.getTime() - delta);

    return date;
  }

  function representYamlTimestamp(object /*, style*/) {
    return object.toISOString();
  }

  var timestamp = new type('tag:yaml.org,2002:timestamp', {
    kind: 'scalar',
    resolve: resolveYamlTimestamp,
    construct: constructYamlTimestamp,
    instanceOf: Date,
    represent: representYamlTimestamp
  });

  function resolveYamlMerge(data) {
    return data === '<<' || data === null;
  }

  var merge = new type('tag:yaml.org,2002:merge', {
    kind: 'scalar',
    resolve: resolveYamlMerge
  });

  /*eslint-disable no-bitwise*/

  var NodeBuffer;

  try {
    // A trick for browserified version, to not include `Buffer` shim
    var _require = require;
    NodeBuffer = _require('buffer').Buffer;
  } catch (__) {}




  // [ 64, 65, 66 ] -> [ padding, CR, LF ]
  var BASE64_MAP = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\n\r';


  function resolveYamlBinary(data) {
    if (data === null) return false;

    var code, idx, bitlen = 0, max = data.length, map = BASE64_MAP;

    // Convert one by one.
    for (idx = 0; idx < max; idx++) {
      code = map.indexOf(data.charAt(idx));

      // Skip CR/LF
      if (code > 64) continue;

      // Fail on illegal characters
      if (code < 0) return false;

      bitlen += 6;
    }

    // If there are any bits left, source was corrupted
    return (bitlen % 8) === 0;
  }

  function constructYamlBinary(data) {
    var idx, tailbits,
        input = data.replace(/[\r\n=]/g, ''), // remove CR/LF & padding to simplify scan
        max = input.length,
        map = BASE64_MAP,
        bits = 0,
        result = [];

    // Collect by 6*4 bits (3 bytes)

    for (idx = 0; idx < max; idx++) {
      if ((idx % 4 === 0) && idx) {
        result.push((bits >> 16) & 0xFF);
        result.push((bits >> 8) & 0xFF);
        result.push(bits & 0xFF);
      }

      bits = (bits << 6) | map.indexOf(input.charAt(idx));
    }

    // Dump tail

    tailbits = (max % 4) * 6;

    if (tailbits === 0) {
      result.push((bits >> 16) & 0xFF);
      result.push((bits >> 8) & 0xFF);
      result.push(bits & 0xFF);
    } else if (tailbits === 18) {
      result.push((bits >> 10) & 0xFF);
      result.push((bits >> 2) & 0xFF);
    } else if (tailbits === 12) {
      result.push((bits >> 4) & 0xFF);
    }

    // Wrap into Buffer for NodeJS and leave Array for browser
    if (NodeBuffer) {
      // Support node 6.+ Buffer API when available
      return NodeBuffer.from ? NodeBuffer.from(result) : new NodeBuffer(result);
    }

    return result;
  }

  function representYamlBinary(object /*, style*/) {
    var result = '', bits = 0, idx, tail,
        max = object.length,
        map = BASE64_MAP;

    // Convert every three bytes to 4 ASCII characters.

    for (idx = 0; idx < max; idx++) {
      if ((idx % 3 === 0) && idx) {
        result += map[(bits >> 18) & 0x3F];
        result += map[(bits >> 12) & 0x3F];
        result += map[(bits >> 6) & 0x3F];
        result += map[bits & 0x3F];
      }

      bits = (bits << 8) + object[idx];
    }

    // Dump tail

    tail = max % 3;

    if (tail === 0) {
      result += map[(bits >> 18) & 0x3F];
      result += map[(bits >> 12) & 0x3F];
      result += map[(bits >> 6) & 0x3F];
      result += map[bits & 0x3F];
    } else if (tail === 2) {
      result += map[(bits >> 10) & 0x3F];
      result += map[(bits >> 4) & 0x3F];
      result += map[(bits << 2) & 0x3F];
      result += map[64];
    } else if (tail === 1) {
      result += map[(bits >> 2) & 0x3F];
      result += map[(bits << 4) & 0x3F];
      result += map[64];
      result += map[64];
    }

    return result;
  }

  function isBinary(object) {
    return NodeBuffer && NodeBuffer.isBuffer(object);
  }

  var binary = new type('tag:yaml.org,2002:binary', {
    kind: 'scalar',
    resolve: resolveYamlBinary,
    construct: constructYamlBinary,
    predicate: isBinary,
    represent: representYamlBinary
  });

  var _hasOwnProperty = Object.prototype.hasOwnProperty;
  var _toString       = Object.prototype.toString;

  function resolveYamlOmap(data) {
    if (data === null) return true;

    var objectKeys = [], index, length, pair, pairKey, pairHasKey,
        object = data;

    for (index = 0, length = object.length; index < length; index += 1) {
      pair = object[index];
      pairHasKey = false;

      if (_toString.call(pair) !== '[object Object]') return false;

      for (pairKey in pair) {
        if (_hasOwnProperty.call(pair, pairKey)) {
          if (!pairHasKey) pairHasKey = true;
          else return false;
        }
      }

      if (!pairHasKey) return false;

      if (objectKeys.indexOf(pairKey) === -1) objectKeys.push(pairKey);
      else return false;
    }

    return true;
  }

  function constructYamlOmap(data) {
    return data !== null ? data : [];
  }

  var omap = new type('tag:yaml.org,2002:omap', {
    kind: 'sequence',
    resolve: resolveYamlOmap,
    construct: constructYamlOmap
  });

  var _toString$1 = Object.prototype.toString;

  function resolveYamlPairs(data) {
    if (data === null) return true;

    var index, length, pair, keys, result,
        object = data;

    result = new Array(object.length);

    for (index = 0, length = object.length; index < length; index += 1) {
      pair = object[index];

      if (_toString$1.call(pair) !== '[object Object]') return false;

      keys = Object.keys(pair);

      if (keys.length !== 1) return false;

      result[index] = [ keys[0], pair[keys[0]] ];
    }

    return true;
  }

  function constructYamlPairs(data) {
    if (data === null) return [];

    var index, length, pair, keys, result,
        object = data;

    result = new Array(object.length);

    for (index = 0, length = object.length; index < length; index += 1) {
      pair = object[index];

      keys = Object.keys(pair);

      result[index] = [ keys[0], pair[keys[0]] ];
    }

    return result;
  }

  var pairs = new type('tag:yaml.org,2002:pairs', {
    kind: 'sequence',
    resolve: resolveYamlPairs,
    construct: constructYamlPairs
  });

  var _hasOwnProperty$1 = Object.prototype.hasOwnProperty;

  function resolveYamlSet(data) {
    if (data === null) return true;

    var key, object = data;

    for (key in object) {
      if (_hasOwnProperty$1.call(object, key)) {
        if (object[key] !== null) return false;
      }
    }

    return true;
  }

  function constructYamlSet(data) {
    return data !== null ? data : {};
  }

  var set = new type('tag:yaml.org,2002:set', {
    kind: 'mapping',
    resolve: resolveYamlSet,
    construct: constructYamlSet
  });

  var default_safe = new schema({
    include: [
      core
    ],
    implicit: [
      timestamp,
      merge
    ],
    explicit: [
      binary,
      omap,
      pairs,
      set
    ]
  });

  function resolveJavascriptUndefined() {
    return true;
  }

  function constructJavascriptUndefined() {
    /*eslint-disable no-undefined*/
    return undefined;
  }

  function representJavascriptUndefined() {
    return '';
  }

  function isUndefined(object) {
    return typeof object === 'undefined';
  }

  var _undefined = new type('tag:yaml.org,2002:js/undefined', {
    kind: 'scalar',
    resolve: resolveJavascriptUndefined,
    construct: constructJavascriptUndefined,
    predicate: isUndefined,
    represent: representJavascriptUndefined
  });

  function resolveJavascriptRegExp(data) {
    if (data === null) return false;
    if (data.length === 0) return false;

    var regexp = data,
        tail   = /\/([gim]*)$/.exec(data),
        modifiers = '';

    // if regexp starts with '/' it can have modifiers and must be properly closed
    // `/foo/gim` - modifiers tail can be maximum 3 chars
    if (regexp[0] === '/') {
      if (tail) modifiers = tail[1];

      if (modifiers.length > 3) return false;
      // if expression starts with /, is should be properly terminated
      if (regexp[regexp.length - modifiers.length - 1] !== '/') return false;
    }

    return true;
  }

  function constructJavascriptRegExp(data) {
    var regexp = data,
        tail   = /\/([gim]*)$/.exec(data),
        modifiers = '';

    // `/foo/gim` - tail can be maximum 4 chars
    if (regexp[0] === '/') {
      if (tail) modifiers = tail[1];
      regexp = regexp.slice(1, regexp.length - modifiers.length - 1);
    }

    return new RegExp(regexp, modifiers);
  }

  function representJavascriptRegExp(object /*, style*/) {
    var result = '/' + object.source + '/';

    if (object.global) result += 'g';
    if (object.multiline) result += 'm';
    if (object.ignoreCase) result += 'i';

    return result;
  }

  function isRegExp(object) {
    return Object.prototype.toString.call(object) === '[object RegExp]';
  }

  var regexp = new type('tag:yaml.org,2002:js/regexp', {
    kind: 'scalar',
    resolve: resolveJavascriptRegExp,
    construct: constructJavascriptRegExp,
    predicate: isRegExp,
    represent: representJavascriptRegExp
  });

  var esprima;

  // Browserified version does not have esprima
  //
  // 1. For node.js just require module as deps
  // 2. For browser try to require mudule via external AMD system.
  //    If not found - try to fallback to window.esprima. If not
  //    found too - then fail to parse.
  //
  try {
    // workaround to exclude package from browserify list.
    var _require$1 = require;
    esprima = _require$1('esprima');
  } catch (_) {
    /*global window */
    if (typeof window !== 'undefined') esprima = window.esprima;
  }



  function resolveJavascriptFunction(data) {
    if (data === null) return false;

    try {
      var source = '(' + data + ')',
          ast    = esprima.parse(source, { range: true });

      if (ast.type                    !== 'Program'             ||
          ast.body.length             !== 1                     ||
          ast.body[0].type            !== 'ExpressionStatement' ||
          (ast.body[0].expression.type !== 'ArrowFunctionExpression' &&
            ast.body[0].expression.type !== 'FunctionExpression')) {
        return false;
      }

      return true;
    } catch (err) {
      return false;
    }
  }

  function constructJavascriptFunction(data) {
    /*jslint evil:true*/

    var source = '(' + data + ')',
        ast    = esprima.parse(source, { range: true }),
        params = [],
        body;

    if (ast.type                    !== 'Program'             ||
        ast.body.length             !== 1                     ||
        ast.body[0].type            !== 'ExpressionStatement' ||
        (ast.body[0].expression.type !== 'ArrowFunctionExpression' &&
          ast.body[0].expression.type !== 'FunctionExpression')) {
      throw new Error('Failed to resolve function');
    }

    ast.body[0].expression.params.forEach(function (param) {
      params.push(param.name);
    });

    body = ast.body[0].expression.body.range;

    // Esprima's ranges include the first '{' and the last '}' characters on
    // function expressions. So cut them out.
    if (ast.body[0].expression.body.type === 'BlockStatement') {
      /*eslint-disable no-new-func*/
      return new Function(params, source.slice(body[0] + 1, body[1] - 1));
    }
    // ES6 arrow functions can omit the BlockStatement. In that case, just return
    // the body.
    /*eslint-disable no-new-func*/
    return new Function(params, 'return ' + source.slice(body[0], body[1]));
  }

  function representJavascriptFunction(object /*, style*/) {
    return object.toString();
  }

  function isFunction(object) {
    return Object.prototype.toString.call(object) === '[object Function]';
  }

  var _function = new type('tag:yaml.org,2002:js/function', {
    kind: 'scalar',
    resolve: resolveJavascriptFunction,
    construct: constructJavascriptFunction,
    predicate: isFunction,
    represent: representJavascriptFunction
  });

  var default_full = schema.DEFAULT = new schema({
    include: [
      default_safe
    ],
    explicit: [
      _undefined,
      regexp,
      _function
    ]
  });

  /*eslint-disable max-len,no-use-before-define*/








  var _hasOwnProperty$2 = Object.prototype.hasOwnProperty;


  var CONTEXT_FLOW_IN   = 1;
  var CONTEXT_FLOW_OUT  = 2;
  var CONTEXT_BLOCK_IN  = 3;
  var CONTEXT_BLOCK_OUT = 4;


  var CHOMPING_CLIP  = 1;
  var CHOMPING_STRIP = 2;
  var CHOMPING_KEEP  = 3;


  var PATTERN_NON_PRINTABLE         = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
  var PATTERN_NON_ASCII_LINE_BREAKS = /[\x85\u2028\u2029]/;
  var PATTERN_FLOW_INDICATORS       = /[,\[\]\{\}]/;
  var PATTERN_TAG_HANDLE            = /^(?:!|!!|![a-z\-]+!)$/i;
  var PATTERN_TAG_URI               = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;


  function _class(obj) { return Object.prototype.toString.call(obj); }

  function is_EOL(c) {
    return (c === 0x0A/* LF */) || (c === 0x0D/* CR */);
  }

  function is_WHITE_SPACE(c) {
    return (c === 0x09/* Tab */) || (c === 0x20/* Space */);
  }

  function is_WS_OR_EOL(c) {
    return (c === 0x09/* Tab */) ||
           (c === 0x20/* Space */) ||
           (c === 0x0A/* LF */) ||
           (c === 0x0D/* CR */);
  }

  function is_FLOW_INDICATOR(c) {
    return c === 0x2C/* , */ ||
           c === 0x5B/* [ */ ||
           c === 0x5D/* ] */ ||
           c === 0x7B/* { */ ||
           c === 0x7D/* } */;
  }

  function fromHexCode(c) {
    var lc;

    if ((0x30/* 0 */ <= c) && (c <= 0x39/* 9 */)) {
      return c - 0x30;
    }

    /*eslint-disable no-bitwise*/
    lc = c | 0x20;

    if ((0x61/* a */ <= lc) && (lc <= 0x66/* f */)) {
      return lc - 0x61 + 10;
    }

    return -1;
  }

  function escapedHexLen(c) {
    if (c === 0x78/* x */) { return 2; }
    if (c === 0x75/* u */) { return 4; }
    if (c === 0x55/* U */) { return 8; }
    return 0;
  }

  function fromDecimalCode(c) {
    if ((0x30/* 0 */ <= c) && (c <= 0x39/* 9 */)) {
      return c - 0x30;
    }

    return -1;
  }

  function simpleEscapeSequence(c) {
    /* eslint-disable indent */
    return (c === 0x30/* 0 */) ? '\x00' :
          (c === 0x61/* a */) ? '\x07' :
          (c === 0x62/* b */) ? '\x08' :
          (c === 0x74/* t */) ? '\x09' :
          (c === 0x09/* Tab */) ? '\x09' :
          (c === 0x6E/* n */) ? '\x0A' :
          (c === 0x76/* v */) ? '\x0B' :
          (c === 0x66/* f */) ? '\x0C' :
          (c === 0x72/* r */) ? '\x0D' :
          (c === 0x65/* e */) ? '\x1B' :
          (c === 0x20/* Space */) ? ' ' :
          (c === 0x22/* " */) ? '\x22' :
          (c === 0x2F/* / */) ? '/' :
          (c === 0x5C/* \ */) ? '\x5C' :
          (c === 0x4E/* N */) ? '\x85' :
          (c === 0x5F/* _ */) ? '\xA0' :
          (c === 0x4C/* L */) ? '\u2028' :
          (c === 0x50/* P */) ? '\u2029' : '';
  }

  function charFromCodepoint(c) {
    if (c <= 0xFFFF) {
      return String.fromCharCode(c);
    }
    // Encode UTF-16 surrogate pair
    // https://en.wikipedia.org/wiki/UTF-16#Code_points_U.2B010000_to_U.2B10FFFF
    return String.fromCharCode(
      ((c - 0x010000) >> 10) + 0xD800,
      ((c - 0x010000) & 0x03FF) + 0xDC00
    );
  }

  var simpleEscapeCheck = new Array(256); // integer, for fast access
  var simpleEscapeMap = new Array(256);
  for (var i = 0; i < 256; i++) {
    simpleEscapeCheck[i] = simpleEscapeSequence(i) ? 1 : 0;
    simpleEscapeMap[i] = simpleEscapeSequence(i);
  }


  function State(input, options) {
    this.input = input;

    this.filename  = options['filename']  || null;
    this.schema    = options['schema']    || default_full;
    this.onWarning = options['onWarning'] || null;
    this.legacy    = options['legacy']    || false;
    this.json      = options['json']      || false;
    this.listener  = options['listener']  || null;

    this.implicitTypes = this.schema.compiledImplicit;
    this.typeMap       = this.schema.compiledTypeMap;

    this.length     = input.length;
    this.position   = 0;
    this.line       = 0;
    this.lineStart  = 0;
    this.lineIndent = 0;

    this.documents = [];

    /*
    this.version;
    this.checkLineBreaks;
    this.tagMap;
    this.anchorMap;
    this.tag;
    this.anchor;
    this.kind;
    this.result;*/

  }


  function generateError(state, message) {
    return new exception(
      message,
      new mark(state.filename, state.input, state.position, state.line, (state.position - state.lineStart)));
  }

  function throwError(state, message) {
    throw generateError(state, message);
  }

  function throwWarning(state, message) {
    if (state.onWarning) {
      state.onWarning.call(null, generateError(state, message));
    }
  }


  var directiveHandlers = {

    YAML: function handleYamlDirective(state, name, args) {

      var match, major, minor;

      if (state.version !== null) {
        throwError(state, 'duplication of %YAML directive');
      }

      if (args.length !== 1) {
        throwError(state, 'YAML directive accepts exactly one argument');
      }

      match = /^([0-9]+)\.([0-9]+)$/.exec(args[0]);

      if (match === null) {
        throwError(state, 'ill-formed argument of the YAML directive');
      }

      major = parseInt(match[1], 10);
      minor = parseInt(match[2], 10);

      if (major !== 1) {
        throwError(state, 'unacceptable YAML version of the document');
      }

      state.version = args[0];
      state.checkLineBreaks = (minor < 2);

      if (minor !== 1 && minor !== 2) {
        throwWarning(state, 'unsupported YAML version of the document');
      }
    },

    TAG: function handleTagDirective(state, name, args) {

      var handle, prefix;

      if (args.length !== 2) {
        throwError(state, 'TAG directive accepts exactly two arguments');
      }

      handle = args[0];
      prefix = args[1];

      if (!PATTERN_TAG_HANDLE.test(handle)) {
        throwError(state, 'ill-formed tag handle (first argument) of the TAG directive');
      }

      if (_hasOwnProperty$2.call(state.tagMap, handle)) {
        throwError(state, 'there is a previously declared suffix for "' + handle + '" tag handle');
      }

      if (!PATTERN_TAG_URI.test(prefix)) {
        throwError(state, 'ill-formed tag prefix (second argument) of the TAG directive');
      }

      state.tagMap[handle] = prefix;
    }
  };


  function captureSegment(state, start, end, checkJson) {
    var _position, _length, _character, _result;

    if (start < end) {
      _result = state.input.slice(start, end);

      if (checkJson) {
        for (_position = 0, _length = _result.length; _position < _length; _position += 1) {
          _character = _result.charCodeAt(_position);
          if (!(_character === 0x09 ||
                (0x20 <= _character && _character <= 0x10FFFF))) {
            throwError(state, 'expected valid JSON character');
          }
        }
      } else if (PATTERN_NON_PRINTABLE.test(_result)) {
        throwError(state, 'the stream contains non-printable characters');
      }

      state.result += _result;
    }
  }

  function mergeMappings(state, destination, source, overridableKeys) {
    var sourceKeys, key, index, quantity;

    if (!common.isObject(source)) {
      throwError(state, 'cannot merge mappings; the provided source object is unacceptable');
    }

    sourceKeys = Object.keys(source);

    for (index = 0, quantity = sourceKeys.length; index < quantity; index += 1) {
      key = sourceKeys[index];

      if (!_hasOwnProperty$2.call(destination, key)) {
        destination[key] = source[key];
        overridableKeys[key] = true;
      }
    }
  }

  function storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, startLine, startPos) {
    var index, quantity;

    // The output is a plain object here, so keys can only be strings.
    // We need to convert keyNode to a string, but doing so can hang the process
    // (deeply nested arrays that explode exponentially using aliases).
    if (Array.isArray(keyNode)) {
      keyNode = Array.prototype.slice.call(keyNode);

      for (index = 0, quantity = keyNode.length; index < quantity; index += 1) {
        if (Array.isArray(keyNode[index])) {
          throwError(state, 'nested arrays are not supported inside keys');
        }

        if (typeof keyNode === 'object' && _class(keyNode[index]) === '[object Object]') {
          keyNode[index] = '[object Object]';
        }
      }
    }

    // Avoid code execution in load() via toString property
    // (still use its own toString for arrays, timestamps,
    // and whatever user schema extensions happen to have @@toStringTag)
    if (typeof keyNode === 'object' && _class(keyNode) === '[object Object]') {
      keyNode = '[object Object]';
    }


    keyNode = String(keyNode);

    if (_result === null) {
      _result = {};
    }

    if (keyTag === 'tag:yaml.org,2002:merge') {
      if (Array.isArray(valueNode)) {
        for (index = 0, quantity = valueNode.length; index < quantity; index += 1) {
          mergeMappings(state, _result, valueNode[index], overridableKeys);
        }
      } else {
        mergeMappings(state, _result, valueNode, overridableKeys);
      }
    } else {
      if (!state.json &&
          !_hasOwnProperty$2.call(overridableKeys, keyNode) &&
          _hasOwnProperty$2.call(_result, keyNode)) {
        state.line = startLine || state.line;
        state.position = startPos || state.position;
        throwError(state, 'duplicated mapping key');
      }
      _result[keyNode] = valueNode;
      delete overridableKeys[keyNode];
    }

    return _result;
  }

  function readLineBreak(state) {
    var ch;

    ch = state.input.charCodeAt(state.position);

    if (ch === 0x0A/* LF */) {
      state.position++;
    } else if (ch === 0x0D/* CR */) {
      state.position++;
      if (state.input.charCodeAt(state.position) === 0x0A/* LF */) {
        state.position++;
      }
    } else {
      throwError(state, 'a line break is expected');
    }

    state.line += 1;
    state.lineStart = state.position;
  }

  function skipSeparationSpace(state, allowComments, checkIndent) {
    var lineBreaks = 0,
        ch = state.input.charCodeAt(state.position);

    while (ch !== 0) {
      while (is_WHITE_SPACE(ch)) {
        ch = state.input.charCodeAt(++state.position);
      }

      if (allowComments && ch === 0x23/* # */) {
        do {
          ch = state.input.charCodeAt(++state.position);
        } while (ch !== 0x0A/* LF */ && ch !== 0x0D/* CR */ && ch !== 0);
      }

      if (is_EOL(ch)) {
        readLineBreak(state);

        ch = state.input.charCodeAt(state.position);
        lineBreaks++;
        state.lineIndent = 0;

        while (ch === 0x20/* Space */) {
          state.lineIndent++;
          ch = state.input.charCodeAt(++state.position);
        }
      } else {
        break;
      }
    }

    if (checkIndent !== -1 && lineBreaks !== 0 && state.lineIndent < checkIndent) {
      throwWarning(state, 'deficient indentation');
    }

    return lineBreaks;
  }

  function testDocumentSeparator(state) {
    var _position = state.position,
        ch;

    ch = state.input.charCodeAt(_position);

    // Condition state.position === state.lineStart is tested
    // in parent on each call, for efficiency. No needs to test here again.
    if ((ch === 0x2D/* - */ || ch === 0x2E/* . */) &&
        ch === state.input.charCodeAt(_position + 1) &&
        ch === state.input.charCodeAt(_position + 2)) {

      _position += 3;

      ch = state.input.charCodeAt(_position);

      if (ch === 0 || is_WS_OR_EOL(ch)) {
        return true;
      }
    }

    return false;
  }

  function writeFoldedLines(state, count) {
    if (count === 1) {
      state.result += ' ';
    } else if (count > 1) {
      state.result += common.repeat('\n', count - 1);
    }
  }


  function readPlainScalar(state, nodeIndent, withinFlowCollection) {
    var preceding,
        following,
        captureStart,
        captureEnd,
        hasPendingContent,
        _line,
        _lineStart,
        _lineIndent,
        _kind = state.kind,
        _result = state.result,
        ch;

    ch = state.input.charCodeAt(state.position);

    if (is_WS_OR_EOL(ch)      ||
        is_FLOW_INDICATOR(ch) ||
        ch === 0x23/* # */    ||
        ch === 0x26/* & */    ||
        ch === 0x2A/* * */    ||
        ch === 0x21/* ! */    ||
        ch === 0x7C/* | */    ||
        ch === 0x3E/* > */    ||
        ch === 0x27/* ' */    ||
        ch === 0x22/* " */    ||
        ch === 0x25/* % */    ||
        ch === 0x40/* @ */    ||
        ch === 0x60/* ` */) {
      return false;
    }

    if (ch === 0x3F/* ? */ || ch === 0x2D/* - */) {
      following = state.input.charCodeAt(state.position + 1);

      if (is_WS_OR_EOL(following) ||
          withinFlowCollection && is_FLOW_INDICATOR(following)) {
        return false;
      }
    }

    state.kind = 'scalar';
    state.result = '';
    captureStart = captureEnd = state.position;
    hasPendingContent = false;

    while (ch !== 0) {
      if (ch === 0x3A/* : */) {
        following = state.input.charCodeAt(state.position + 1);

        if (is_WS_OR_EOL(following) ||
            withinFlowCollection && is_FLOW_INDICATOR(following)) {
          break;
        }

      } else if (ch === 0x23/* # */) {
        preceding = state.input.charCodeAt(state.position - 1);

        if (is_WS_OR_EOL(preceding)) {
          break;
        }

      } else if ((state.position === state.lineStart && testDocumentSeparator(state)) ||
                 withinFlowCollection && is_FLOW_INDICATOR(ch)) {
        break;

      } else if (is_EOL(ch)) {
        _line = state.line;
        _lineStart = state.lineStart;
        _lineIndent = state.lineIndent;
        skipSeparationSpace(state, false, -1);

        if (state.lineIndent >= nodeIndent) {
          hasPendingContent = true;
          ch = state.input.charCodeAt(state.position);
          continue;
        } else {
          state.position = captureEnd;
          state.line = _line;
          state.lineStart = _lineStart;
          state.lineIndent = _lineIndent;
          break;
        }
      }

      if (hasPendingContent) {
        captureSegment(state, captureStart, captureEnd, false);
        writeFoldedLines(state, state.line - _line);
        captureStart = captureEnd = state.position;
        hasPendingContent = false;
      }

      if (!is_WHITE_SPACE(ch)) {
        captureEnd = state.position + 1;
      }

      ch = state.input.charCodeAt(++state.position);
    }

    captureSegment(state, captureStart, captureEnd, false);

    if (state.result) {
      return true;
    }

    state.kind = _kind;
    state.result = _result;
    return false;
  }

  function readSingleQuotedScalar(state, nodeIndent) {
    var ch,
        captureStart, captureEnd;

    ch = state.input.charCodeAt(state.position);

    if (ch !== 0x27/* ' */) {
      return false;
    }

    state.kind = 'scalar';
    state.result = '';
    state.position++;
    captureStart = captureEnd = state.position;

    while ((ch = state.input.charCodeAt(state.position)) !== 0) {
      if (ch === 0x27/* ' */) {
        captureSegment(state, captureStart, state.position, true);
        ch = state.input.charCodeAt(++state.position);

        if (ch === 0x27/* ' */) {
          captureStart = state.position;
          state.position++;
          captureEnd = state.position;
        } else {
          return true;
        }

      } else if (is_EOL(ch)) {
        captureSegment(state, captureStart, captureEnd, true);
        writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
        captureStart = captureEnd = state.position;

      } else if (state.position === state.lineStart && testDocumentSeparator(state)) {
        throwError(state, 'unexpected end of the document within a single quoted scalar');

      } else {
        state.position++;
        captureEnd = state.position;
      }
    }

    throwError(state, 'unexpected end of the stream within a single quoted scalar');
  }

  function readDoubleQuotedScalar(state, nodeIndent) {
    var captureStart,
        captureEnd,
        hexLength,
        hexResult,
        tmp,
        ch;

    ch = state.input.charCodeAt(state.position);

    if (ch !== 0x22/* " */) {
      return false;
    }

    state.kind = 'scalar';
    state.result = '';
    state.position++;
    captureStart = captureEnd = state.position;

    while ((ch = state.input.charCodeAt(state.position)) !== 0) {
      if (ch === 0x22/* " */) {
        captureSegment(state, captureStart, state.position, true);
        state.position++;
        return true;

      } else if (ch === 0x5C/* \ */) {
        captureSegment(state, captureStart, state.position, true);
        ch = state.input.charCodeAt(++state.position);

        if (is_EOL(ch)) {
          skipSeparationSpace(state, false, nodeIndent);

          // TODO: rework to inline fn with no type cast?
        } else if (ch < 256 && simpleEscapeCheck[ch]) {
          state.result += simpleEscapeMap[ch];
          state.position++;

        } else if ((tmp = escapedHexLen(ch)) > 0) {
          hexLength = tmp;
          hexResult = 0;

          for (; hexLength > 0; hexLength--) {
            ch = state.input.charCodeAt(++state.position);

            if ((tmp = fromHexCode(ch)) >= 0) {
              hexResult = (hexResult << 4) + tmp;

            } else {
              throwError(state, 'expected hexadecimal character');
            }
          }

          state.result += charFromCodepoint(hexResult);

          state.position++;

        } else {
          throwError(state, 'unknown escape sequence');
        }

        captureStart = captureEnd = state.position;

      } else if (is_EOL(ch)) {
        captureSegment(state, captureStart, captureEnd, true);
        writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
        captureStart = captureEnd = state.position;

      } else if (state.position === state.lineStart && testDocumentSeparator(state)) {
        throwError(state, 'unexpected end of the document within a double quoted scalar');

      } else {
        state.position++;
        captureEnd = state.position;
      }
    }

    throwError(state, 'unexpected end of the stream within a double quoted scalar');
  }

  function readFlowCollection(state, nodeIndent) {
    var readNext = true,
        _line,
        _tag     = state.tag,
        _result,
        _anchor  = state.anchor,
        following,
        terminator,
        isPair,
        isExplicitPair,
        isMapping,
        overridableKeys = {},
        keyNode,
        keyTag,
        valueNode,
        ch;

    ch = state.input.charCodeAt(state.position);

    if (ch === 0x5B/* [ */) {
      terminator = 0x5D;/* ] */
      isMapping = false;
      _result = [];
    } else if (ch === 0x7B/* { */) {
      terminator = 0x7D;/* } */
      isMapping = true;
      _result = {};
    } else {
      return false;
    }

    if (state.anchor !== null) {
      state.anchorMap[state.anchor] = _result;
    }

    ch = state.input.charCodeAt(++state.position);

    while (ch !== 0) {
      skipSeparationSpace(state, true, nodeIndent);

      ch = state.input.charCodeAt(state.position);

      if (ch === terminator) {
        state.position++;
        state.tag = _tag;
        state.anchor = _anchor;
        state.kind = isMapping ? 'mapping' : 'sequence';
        state.result = _result;
        return true;
      } else if (!readNext) {
        throwError(state, 'missed comma between flow collection entries');
      }

      keyTag = keyNode = valueNode = null;
      isPair = isExplicitPair = false;

      if (ch === 0x3F/* ? */) {
        following = state.input.charCodeAt(state.position + 1);

        if (is_WS_OR_EOL(following)) {
          isPair = isExplicitPair = true;
          state.position++;
          skipSeparationSpace(state, true, nodeIndent);
        }
      }

      _line = state.line;
      composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
      keyTag = state.tag;
      keyNode = state.result;
      skipSeparationSpace(state, true, nodeIndent);

      ch = state.input.charCodeAt(state.position);

      if ((isExplicitPair || state.line === _line) && ch === 0x3A/* : */) {
        isPair = true;
        ch = state.input.charCodeAt(++state.position);
        skipSeparationSpace(state, true, nodeIndent);
        composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
        valueNode = state.result;
      }

      if (isMapping) {
        storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode);
      } else if (isPair) {
        _result.push(storeMappingPair(state, null, overridableKeys, keyTag, keyNode, valueNode));
      } else {
        _result.push(keyNode);
      }

      skipSeparationSpace(state, true, nodeIndent);

      ch = state.input.charCodeAt(state.position);

      if (ch === 0x2C/* , */) {
        readNext = true;
        ch = state.input.charCodeAt(++state.position);
      } else {
        readNext = false;
      }
    }

    throwError(state, 'unexpected end of the stream within a flow collection');
  }

  function readBlockScalar(state, nodeIndent) {
    var captureStart,
        folding,
        chomping       = CHOMPING_CLIP,
        didReadContent = false,
        detectedIndent = false,
        textIndent     = nodeIndent,
        emptyLines     = 0,
        atMoreIndented = false,
        tmp,
        ch;

    ch = state.input.charCodeAt(state.position);

    if (ch === 0x7C/* | */) {
      folding = false;
    } else if (ch === 0x3E/* > */) {
      folding = true;
    } else {
      return false;
    }

    state.kind = 'scalar';
    state.result = '';

    while (ch !== 0) {
      ch = state.input.charCodeAt(++state.position);

      if (ch === 0x2B/* + */ || ch === 0x2D/* - */) {
        if (CHOMPING_CLIP === chomping) {
          chomping = (ch === 0x2B/* + */) ? CHOMPING_KEEP : CHOMPING_STRIP;
        } else {
          throwError(state, 'repeat of a chomping mode identifier');
        }

      } else if ((tmp = fromDecimalCode(ch)) >= 0) {
        if (tmp === 0) {
          throwError(state, 'bad explicit indentation width of a block scalar; it cannot be less than one');
        } else if (!detectedIndent) {
          textIndent = nodeIndent + tmp - 1;
          detectedIndent = true;
        } else {
          throwError(state, 'repeat of an indentation width identifier');
        }

      } else {
        break;
      }
    }

    if (is_WHITE_SPACE(ch)) {
      do { ch = state.input.charCodeAt(++state.position); }
      while (is_WHITE_SPACE(ch));

      if (ch === 0x23/* # */) {
        do { ch = state.input.charCodeAt(++state.position); }
        while (!is_EOL(ch) && (ch !== 0));
      }
    }

    while (ch !== 0) {
      readLineBreak(state);
      state.lineIndent = 0;

      ch = state.input.charCodeAt(state.position);

      while ((!detectedIndent || state.lineIndent < textIndent) &&
             (ch === 0x20/* Space */)) {
        state.lineIndent++;
        ch = state.input.charCodeAt(++state.position);
      }

      if (!detectedIndent && state.lineIndent > textIndent) {
        textIndent = state.lineIndent;
      }

      if (is_EOL(ch)) {
        emptyLines++;
        continue;
      }

      // End of the scalar.
      if (state.lineIndent < textIndent) {

        // Perform the chomping.
        if (chomping === CHOMPING_KEEP) {
          state.result += common.repeat('\n', didReadContent ? 1 + emptyLines : emptyLines);
        } else if (chomping === CHOMPING_CLIP) {
          if (didReadContent) { // i.e. only if the scalar is not empty.
            state.result += '\n';
          }
        }

        // Break this `while` cycle and go to the funciton's epilogue.
        break;
      }

      // Folded style: use fancy rules to handle line breaks.
      if (folding) {

        // Lines starting with white space characters (more-indented lines) are not folded.
        if (is_WHITE_SPACE(ch)) {
          atMoreIndented = true;
          // except for the first content line (cf. Example 8.1)
          state.result += common.repeat('\n', didReadContent ? 1 + emptyLines : emptyLines);

        // End of more-indented block.
        } else if (atMoreIndented) {
          atMoreIndented = false;
          state.result += common.repeat('\n', emptyLines + 1);

        // Just one line break - perceive as the same line.
        } else if (emptyLines === 0) {
          if (didReadContent) { // i.e. only if we have already read some scalar content.
            state.result += ' ';
          }

        // Several line breaks - perceive as different lines.
        } else {
          state.result += common.repeat('\n', emptyLines);
        }

      // Literal style: just add exact number of line breaks between content lines.
      } else {
        // Keep all line breaks except the header line break.
        state.result += common.repeat('\n', didReadContent ? 1 + emptyLines : emptyLines);
      }

      didReadContent = true;
      detectedIndent = true;
      emptyLines = 0;
      captureStart = state.position;

      while (!is_EOL(ch) && (ch !== 0)) {
        ch = state.input.charCodeAt(++state.position);
      }

      captureSegment(state, captureStart, state.position, false);
    }

    return true;
  }

  function readBlockSequence(state, nodeIndent) {
    var _line,
        _tag      = state.tag,
        _anchor   = state.anchor,
        _result   = [],
        following,
        detected  = false,
        ch;

    if (state.anchor !== null) {
      state.anchorMap[state.anchor] = _result;
    }

    ch = state.input.charCodeAt(state.position);

    while (ch !== 0) {

      if (ch !== 0x2D/* - */) {
        break;
      }

      following = state.input.charCodeAt(state.position + 1);

      if (!is_WS_OR_EOL(following)) {
        break;
      }

      detected = true;
      state.position++;

      if (skipSeparationSpace(state, true, -1)) {
        if (state.lineIndent <= nodeIndent) {
          _result.push(null);
          ch = state.input.charCodeAt(state.position);
          continue;
        }
      }

      _line = state.line;
      composeNode(state, nodeIndent, CONTEXT_BLOCK_IN, false, true);
      _result.push(state.result);
      skipSeparationSpace(state, true, -1);

      ch = state.input.charCodeAt(state.position);

      if ((state.line === _line || state.lineIndent > nodeIndent) && (ch !== 0)) {
        throwError(state, 'bad indentation of a sequence entry');
      } else if (state.lineIndent < nodeIndent) {
        break;
      }
    }

    if (detected) {
      state.tag = _tag;
      state.anchor = _anchor;
      state.kind = 'sequence';
      state.result = _result;
      return true;
    }
    return false;
  }

  function readBlockMapping(state, nodeIndent, flowIndent) {
    var following,
        allowCompact,
        _line,
        _pos,
        _tag          = state.tag,
        _anchor       = state.anchor,
        _result       = {},
        overridableKeys = {},
        keyTag        = null,
        keyNode       = null,
        valueNode     = null,
        atExplicitKey = false,
        detected      = false,
        ch;

    if (state.anchor !== null) {
      state.anchorMap[state.anchor] = _result;
    }

    ch = state.input.charCodeAt(state.position);

    while (ch !== 0) {
      following = state.input.charCodeAt(state.position + 1);
      _line = state.line; // Save the current line.
      _pos = state.position;

      //
      // Explicit notation case. There are two separate blocks:
      // first for the key (denoted by "?") and second for the value (denoted by ":")
      //
      if ((ch === 0x3F/* ? */ || ch === 0x3A/* : */) && is_WS_OR_EOL(following)) {

        if (ch === 0x3F/* ? */) {
          if (atExplicitKey) {
            storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null);
            keyTag = keyNode = valueNode = null;
          }

          detected = true;
          atExplicitKey = true;
          allowCompact = true;

        } else if (atExplicitKey) {
          // i.e. 0x3A/* : */ === character after the explicit key.
          atExplicitKey = false;
          allowCompact = true;

        } else {
          throwError(state, 'incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line');
        }

        state.position += 1;
        ch = following;

      //
      // Implicit notation case. Flow-style node as the key first, then ":", and the value.
      //
      } else if (composeNode(state, flowIndent, CONTEXT_FLOW_OUT, false, true)) {

        if (state.line === _line) {
          ch = state.input.charCodeAt(state.position);

          while (is_WHITE_SPACE(ch)) {
            ch = state.input.charCodeAt(++state.position);
          }

          if (ch === 0x3A/* : */) {
            ch = state.input.charCodeAt(++state.position);

            if (!is_WS_OR_EOL(ch)) {
              throwError(state, 'a whitespace character is expected after the key-value separator within a block mapping');
            }

            if (atExplicitKey) {
              storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null);
              keyTag = keyNode = valueNode = null;
            }

            detected = true;
            atExplicitKey = false;
            allowCompact = false;
            keyTag = state.tag;
            keyNode = state.result;

          } else if (detected) {
            throwError(state, 'can not read an implicit mapping pair; a colon is missed');

          } else {
            state.tag = _tag;
            state.anchor = _anchor;
            return true; // Keep the result of `composeNode`.
          }

        } else if (detected) {
          throwError(state, 'can not read a block mapping entry; a multiline key may not be an implicit key');

        } else {
          state.tag = _tag;
          state.anchor = _anchor;
          return true; // Keep the result of `composeNode`.
        }

      } else {
        break; // Reading is done. Go to the epilogue.
      }

      //
      // Common reading code for both explicit and implicit notations.
      //
      if (state.line === _line || state.lineIndent > nodeIndent) {
        if (composeNode(state, nodeIndent, CONTEXT_BLOCK_OUT, true, allowCompact)) {
          if (atExplicitKey) {
            keyNode = state.result;
          } else {
            valueNode = state.result;
          }
        }

        if (!atExplicitKey) {
          storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, _line, _pos);
          keyTag = keyNode = valueNode = null;
        }

        skipSeparationSpace(state, true, -1);
        ch = state.input.charCodeAt(state.position);
      }

      if (state.lineIndent > nodeIndent && (ch !== 0)) {
        throwError(state, 'bad indentation of a mapping entry');
      } else if (state.lineIndent < nodeIndent) {
        break;
      }
    }

    //
    // Epilogue.
    //

    // Special case: last mapping's node contains only the key in explicit notation.
    if (atExplicitKey) {
      storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null);
    }

    // Expose the resulting mapping.
    if (detected) {
      state.tag = _tag;
      state.anchor = _anchor;
      state.kind = 'mapping';
      state.result = _result;
    }

    return detected;
  }

  function readTagProperty(state) {
    var _position,
        isVerbatim = false,
        isNamed    = false,
        tagHandle,
        tagName,
        ch;

    ch = state.input.charCodeAt(state.position);

    if (ch !== 0x21/* ! */) return false;

    if (state.tag !== null) {
      throwError(state, 'duplication of a tag property');
    }

    ch = state.input.charCodeAt(++state.position);

    if (ch === 0x3C/* < */) {
      isVerbatim = true;
      ch = state.input.charCodeAt(++state.position);

    } else if (ch === 0x21/* ! */) {
      isNamed = true;
      tagHandle = '!!';
      ch = state.input.charCodeAt(++state.position);

    } else {
      tagHandle = '!';
    }

    _position = state.position;

    if (isVerbatim) {
      do { ch = state.input.charCodeAt(++state.position); }
      while (ch !== 0 && ch !== 0x3E/* > */);

      if (state.position < state.length) {
        tagName = state.input.slice(_position, state.position);
        ch = state.input.charCodeAt(++state.position);
      } else {
        throwError(state, 'unexpected end of the stream within a verbatim tag');
      }
    } else {
      while (ch !== 0 && !is_WS_OR_EOL(ch)) {

        if (ch === 0x21/* ! */) {
          if (!isNamed) {
            tagHandle = state.input.slice(_position - 1, state.position + 1);

            if (!PATTERN_TAG_HANDLE.test(tagHandle)) {
              throwError(state, 'named tag handle cannot contain such characters');
            }

            isNamed = true;
            _position = state.position + 1;
          } else {
            throwError(state, 'tag suffix cannot contain exclamation marks');
          }
        }

        ch = state.input.charCodeAt(++state.position);
      }

      tagName = state.input.slice(_position, state.position);

      if (PATTERN_FLOW_INDICATORS.test(tagName)) {
        throwError(state, 'tag suffix cannot contain flow indicator characters');
      }
    }

    if (tagName && !PATTERN_TAG_URI.test(tagName)) {
      throwError(state, 'tag name cannot contain such characters: ' + tagName);
    }

    if (isVerbatim) {
      state.tag = tagName;

    } else if (_hasOwnProperty$2.call(state.tagMap, tagHandle)) {
      state.tag = state.tagMap[tagHandle] + tagName;

    } else if (tagHandle === '!') {
      state.tag = '!' + tagName;

    } else if (tagHandle === '!!') {
      state.tag = 'tag:yaml.org,2002:' + tagName;

    } else {
      throwError(state, 'undeclared tag handle "' + tagHandle + '"');
    }

    return true;
  }

  function readAnchorProperty(state) {
    var _position,
        ch;

    ch = state.input.charCodeAt(state.position);

    if (ch !== 0x26/* & */) return false;

    if (state.anchor !== null) {
      throwError(state, 'duplication of an anchor property');
    }

    ch = state.input.charCodeAt(++state.position);
    _position = state.position;

    while (ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) {
      ch = state.input.charCodeAt(++state.position);
    }

    if (state.position === _position) {
      throwError(state, 'name of an anchor node must contain at least one character');
    }

    state.anchor = state.input.slice(_position, state.position);
    return true;
  }

  function readAlias(state) {
    var _position, alias,
        ch;

    ch = state.input.charCodeAt(state.position);

    if (ch !== 0x2A/* * */) return false;

    ch = state.input.charCodeAt(++state.position);
    _position = state.position;

    while (ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) {
      ch = state.input.charCodeAt(++state.position);
    }

    if (state.position === _position) {
      throwError(state, 'name of an alias node must contain at least one character');
    }

    alias = state.input.slice(_position, state.position);

    if (!state.anchorMap.hasOwnProperty(alias)) {
      throwError(state, 'unidentified alias "' + alias + '"');
    }

    state.result = state.anchorMap[alias];
    skipSeparationSpace(state, true, -1);
    return true;
  }

  function composeNode(state, parentIndent, nodeContext, allowToSeek, allowCompact) {
    var allowBlockStyles,
        allowBlockScalars,
        allowBlockCollections,
        indentStatus = 1, // 1: this>parent, 0: this=parent, -1: this<parent
        atNewLine  = false,
        hasContent = false,
        typeIndex,
        typeQuantity,
        type,
        flowIndent,
        blockIndent;

    if (state.listener !== null) {
      state.listener('open', state);
    }

    state.tag    = null;
    state.anchor = null;
    state.kind   = null;
    state.result = null;

    allowBlockStyles = allowBlockScalars = allowBlockCollections =
      CONTEXT_BLOCK_OUT === nodeContext ||
      CONTEXT_BLOCK_IN  === nodeContext;

    if (allowToSeek) {
      if (skipSeparationSpace(state, true, -1)) {
        atNewLine = true;

        if (state.lineIndent > parentIndent) {
          indentStatus = 1;
        } else if (state.lineIndent === parentIndent) {
          indentStatus = 0;
        } else if (state.lineIndent < parentIndent) {
          indentStatus = -1;
        }
      }
    }

    if (indentStatus === 1) {
      while (readTagProperty(state) || readAnchorProperty(state)) {
        if (skipSeparationSpace(state, true, -1)) {
          atNewLine = true;
          allowBlockCollections = allowBlockStyles;

          if (state.lineIndent > parentIndent) {
            indentStatus = 1;
          } else if (state.lineIndent === parentIndent) {
            indentStatus = 0;
          } else if (state.lineIndent < parentIndent) {
            indentStatus = -1;
          }
        } else {
          allowBlockCollections = false;
        }
      }
    }

    if (allowBlockCollections) {
      allowBlockCollections = atNewLine || allowCompact;
    }

    if (indentStatus === 1 || CONTEXT_BLOCK_OUT === nodeContext) {
      if (CONTEXT_FLOW_IN === nodeContext || CONTEXT_FLOW_OUT === nodeContext) {
        flowIndent = parentIndent;
      } else {
        flowIndent = parentIndent + 1;
      }

      blockIndent = state.position - state.lineStart;

      if (indentStatus === 1) {
        if (allowBlockCollections &&
            (readBlockSequence(state, blockIndent) ||
             readBlockMapping(state, blockIndent, flowIndent)) ||
            readFlowCollection(state, flowIndent)) {
          hasContent = true;
        } else {
          if ((allowBlockScalars && readBlockScalar(state, flowIndent)) ||
              readSingleQuotedScalar(state, flowIndent) ||
              readDoubleQuotedScalar(state, flowIndent)) {
            hasContent = true;

          } else if (readAlias(state)) {
            hasContent = true;

            if (state.tag !== null || state.anchor !== null) {
              throwError(state, 'alias node should not have any properties');
            }

          } else if (readPlainScalar(state, flowIndent, CONTEXT_FLOW_IN === nodeContext)) {
            hasContent = true;

            if (state.tag === null) {
              state.tag = '?';
            }
          }

          if (state.anchor !== null) {
            state.anchorMap[state.anchor] = state.result;
          }
        }
      } else if (indentStatus === 0) {
        // Special case: block sequences are allowed to have same indentation level as the parent.
        // http://www.yaml.org/spec/1.2/spec.html#id2799784
        hasContent = allowBlockCollections && readBlockSequence(state, blockIndent);
      }
    }

    if (state.tag !== null && state.tag !== '!') {
      if (state.tag === '?') {
        for (typeIndex = 0, typeQuantity = state.implicitTypes.length; typeIndex < typeQuantity; typeIndex += 1) {
          type = state.implicitTypes[typeIndex];

          // Implicit resolving is not allowed for non-scalar types, and '?'
          // non-specific tag is only assigned to plain scalars. So, it isn't
          // needed to check for 'kind' conformity.

          if (type.resolve(state.result)) { // `state.result` updated in resolver if matched
            state.result = type.construct(state.result);
            state.tag = type.tag;
            if (state.anchor !== null) {
              state.anchorMap[state.anchor] = state.result;
            }
            break;
          }
        }
      } else if (_hasOwnProperty$2.call(state.typeMap[state.kind || 'fallback'], state.tag)) {
        type = state.typeMap[state.kind || 'fallback'][state.tag];

        if (state.result !== null && type.kind !== state.kind) {
          throwError(state, 'unacceptable node kind for !<' + state.tag + '> tag; it should be "' + type.kind + '", not "' + state.kind + '"');
        }

        if (!type.resolve(state.result)) { // `state.result` updated in resolver if matched
          throwError(state, 'cannot resolve a node with !<' + state.tag + '> explicit tag');
        } else {
          state.result = type.construct(state.result);
          if (state.anchor !== null) {
            state.anchorMap[state.anchor] = state.result;
          }
        }
      } else {
        throwError(state, 'unknown tag !<' + state.tag + '>');
      }
    }

    if (state.listener !== null) {
      state.listener('close', state);
    }
    return state.tag !== null ||  state.anchor !== null || hasContent;
  }

  function readDocument(state) {
    var documentStart = state.position,
        _position,
        directiveName,
        directiveArgs,
        hasDirectives = false,
        ch;

    state.version = null;
    state.checkLineBreaks = state.legacy;
    state.tagMap = {};
    state.anchorMap = {};

    while ((ch = state.input.charCodeAt(state.position)) !== 0) {
      skipSeparationSpace(state, true, -1);

      ch = state.input.charCodeAt(state.position);

      if (state.lineIndent > 0 || ch !== 0x25/* % */) {
        break;
      }

      hasDirectives = true;
      ch = state.input.charCodeAt(++state.position);
      _position = state.position;

      while (ch !== 0 && !is_WS_OR_EOL(ch)) {
        ch = state.input.charCodeAt(++state.position);
      }

      directiveName = state.input.slice(_position, state.position);
      directiveArgs = [];

      if (directiveName.length < 1) {
        throwError(state, 'directive name must not be less than one character in length');
      }

      while (ch !== 0) {
        while (is_WHITE_SPACE(ch)) {
          ch = state.input.charCodeAt(++state.position);
        }

        if (ch === 0x23/* # */) {
          do { ch = state.input.charCodeAt(++state.position); }
          while (ch !== 0 && !is_EOL(ch));
          break;
        }

        if (is_EOL(ch)) break;

        _position = state.position;

        while (ch !== 0 && !is_WS_OR_EOL(ch)) {
          ch = state.input.charCodeAt(++state.position);
        }

        directiveArgs.push(state.input.slice(_position, state.position));
      }

      if (ch !== 0) readLineBreak(state);

      if (_hasOwnProperty$2.call(directiveHandlers, directiveName)) {
        directiveHandlers[directiveName](state, directiveName, directiveArgs);
      } else {
        throwWarning(state, 'unknown document directive "' + directiveName + '"');
      }
    }

    skipSeparationSpace(state, true, -1);

    if (state.lineIndent === 0 &&
        state.input.charCodeAt(state.position)     === 0x2D/* - */ &&
        state.input.charCodeAt(state.position + 1) === 0x2D/* - */ &&
        state.input.charCodeAt(state.position + 2) === 0x2D/* - */) {
      state.position += 3;
      skipSeparationSpace(state, true, -1);

    } else if (hasDirectives) {
      throwError(state, 'directives end mark is expected');
    }

    composeNode(state, state.lineIndent - 1, CONTEXT_BLOCK_OUT, false, true);
    skipSeparationSpace(state, true, -1);

    if (state.checkLineBreaks &&
        PATTERN_NON_ASCII_LINE_BREAKS.test(state.input.slice(documentStart, state.position))) {
      throwWarning(state, 'non-ASCII line breaks are interpreted as content');
    }

    state.documents.push(state.result);

    if (state.position === state.lineStart && testDocumentSeparator(state)) {

      if (state.input.charCodeAt(state.position) === 0x2E/* . */) {
        state.position += 3;
        skipSeparationSpace(state, true, -1);
      }
      return;
    }

    if (state.position < (state.length - 1)) {
      throwError(state, 'end of the stream or a document separator is expected');
    } else {
      return;
    }
  }


  function loadDocuments(input, options) {
    input = String(input);
    options = options || {};

    if (input.length !== 0) {

      // Add tailing `\n` if not exists
      if (input.charCodeAt(input.length - 1) !== 0x0A/* LF */ &&
          input.charCodeAt(input.length - 1) !== 0x0D/* CR */) {
        input += '\n';
      }

      // Strip BOM
      if (input.charCodeAt(0) === 0xFEFF) {
        input = input.slice(1);
      }
    }

    var state = new State(input, options);

    // Use 0 as string terminator. That significantly simplifies bounds check.
    state.input += '\0';

    while (state.input.charCodeAt(state.position) === 0x20/* Space */) {
      state.lineIndent += 1;
      state.position += 1;
    }

    while (state.position < (state.length - 1)) {
      readDocument(state);
    }

    return state.documents;
  }


  function loadAll(input, iterator, options) {
    var documents = loadDocuments(input, options), index, length;

    if (typeof iterator !== 'function') {
      return documents;
    }

    for (index = 0, length = documents.length; index < length; index += 1) {
      iterator(documents[index]);
    }
  }


  function load(input, options) {
    var documents = loadDocuments(input, options);

    if (documents.length === 0) {
      /*eslint-disable no-undefined*/
      return undefined;
    } else if (documents.length === 1) {
      return documents[0];
    }
    throw new exception('expected a single document in the stream, but found more');
  }


  function safeLoadAll(input, output, options) {
    if (typeof output === 'function') {
      loadAll(input, output, common.extend({ schema: default_safe }, options));
    } else {
      return loadAll(input, common.extend({ schema: default_safe }, options));
    }
  }


  function safeLoad(input, options) {
    return load(input, common.extend({ schema: default_safe }, options));
  }


  var loadAll_1     = loadAll;
  var load_1        = load;
  var safeLoadAll_1 = safeLoadAll;
  var safeLoad_1    = safeLoad;

  var loader = {
  	loadAll: loadAll_1,
  	load: load_1,
  	safeLoadAll: safeLoadAll_1,
  	safeLoad: safeLoad_1
  };

  /*eslint-disable no-use-before-define*/






  var _toString$2       = Object.prototype.toString;
  var _hasOwnProperty$3 = Object.prototype.hasOwnProperty;

  var CHAR_TAB                  = 0x09; /* Tab */
  var CHAR_LINE_FEED            = 0x0A; /* LF */
  var CHAR_SPACE                = 0x20; /* Space */
  var CHAR_EXCLAMATION          = 0x21; /* ! */
  var CHAR_DOUBLE_QUOTE         = 0x22; /* " */
  var CHAR_SHARP                = 0x23; /* # */
  var CHAR_PERCENT              = 0x25; /* % */
  var CHAR_AMPERSAND            = 0x26; /* & */
  var CHAR_SINGLE_QUOTE         = 0x27; /* ' */
  var CHAR_ASTERISK             = 0x2A; /* * */
  var CHAR_COMMA                = 0x2C; /* , */
  var CHAR_MINUS                = 0x2D; /* - */
  var CHAR_COLON                = 0x3A; /* : */
  var CHAR_GREATER_THAN         = 0x3E; /* > */
  var CHAR_QUESTION             = 0x3F; /* ? */
  var CHAR_COMMERCIAL_AT        = 0x40; /* @ */
  var CHAR_LEFT_SQUARE_BRACKET  = 0x5B; /* [ */
  var CHAR_RIGHT_SQUARE_BRACKET = 0x5D; /* ] */
  var CHAR_GRAVE_ACCENT         = 0x60; /* ` */
  var CHAR_LEFT_CURLY_BRACKET   = 0x7B; /* { */
  var CHAR_VERTICAL_LINE        = 0x7C; /* | */
  var CHAR_RIGHT_CURLY_BRACKET  = 0x7D; /* } */

  var ESCAPE_SEQUENCES = {};

  ESCAPE_SEQUENCES[0x00]   = '\\0';
  ESCAPE_SEQUENCES[0x07]   = '\\a';
  ESCAPE_SEQUENCES[0x08]   = '\\b';
  ESCAPE_SEQUENCES[0x09]   = '\\t';
  ESCAPE_SEQUENCES[0x0A]   = '\\n';
  ESCAPE_SEQUENCES[0x0B]   = '\\v';
  ESCAPE_SEQUENCES[0x0C]   = '\\f';
  ESCAPE_SEQUENCES[0x0D]   = '\\r';
  ESCAPE_SEQUENCES[0x1B]   = '\\e';
  ESCAPE_SEQUENCES[0x22]   = '\\"';
  ESCAPE_SEQUENCES[0x5C]   = '\\\\';
  ESCAPE_SEQUENCES[0x85]   = '\\N';
  ESCAPE_SEQUENCES[0xA0]   = '\\_';
  ESCAPE_SEQUENCES[0x2028] = '\\L';
  ESCAPE_SEQUENCES[0x2029] = '\\P';

  var DEPRECATED_BOOLEANS_SYNTAX = [
    'y', 'Y', 'yes', 'Yes', 'YES', 'on', 'On', 'ON',
    'n', 'N', 'no', 'No', 'NO', 'off', 'Off', 'OFF'
  ];

  function compileStyleMap(schema, map) {
    var result, keys, index, length, tag, style, type;

    if (map === null) return {};

    result = {};
    keys = Object.keys(map);

    for (index = 0, length = keys.length; index < length; index += 1) {
      tag = keys[index];
      style = String(map[tag]);

      if (tag.slice(0, 2) === '!!') {
        tag = 'tag:yaml.org,2002:' + tag.slice(2);
      }
      type = schema.compiledTypeMap['fallback'][tag];

      if (type && _hasOwnProperty$3.call(type.styleAliases, style)) {
        style = type.styleAliases[style];
      }

      result[tag] = style;
    }

    return result;
  }

  function encodeHex(character) {
    var string, handle, length;

    string = character.toString(16).toUpperCase();

    if (character <= 0xFF) {
      handle = 'x';
      length = 2;
    } else if (character <= 0xFFFF) {
      handle = 'u';
      length = 4;
    } else if (character <= 0xFFFFFFFF) {
      handle = 'U';
      length = 8;
    } else {
      throw new exception('code point within a string may not be greater than 0xFFFFFFFF');
    }

    return '\\' + handle + common.repeat('0', length - string.length) + string;
  }

  function State$1(options) {
    this.schema        = options['schema'] || default_full;
    this.indent        = Math.max(1, (options['indent'] || 2));
    this.noArrayIndent = options['noArrayIndent'] || false;
    this.skipInvalid   = options['skipInvalid'] || false;
    this.flowLevel     = (common.isNothing(options['flowLevel']) ? -1 : options['flowLevel']);
    this.styleMap      = compileStyleMap(this.schema, options['styles'] || null);
    this.sortKeys      = options['sortKeys'] || false;
    this.lineWidth     = options['lineWidth'] || 80;
    this.noRefs        = options['noRefs'] || false;
    this.noCompatMode  = options['noCompatMode'] || false;
    this.condenseFlow  = options['condenseFlow'] || false;

    this.implicitTypes = this.schema.compiledImplicit;
    this.explicitTypes = this.schema.compiledExplicit;

    this.tag = null;
    this.result = '';

    this.duplicates = [];
    this.usedDuplicates = null;
  }

  // Indents every line in a string. Empty lines (\n only) are not indented.
  function indentString(string, spaces) {
    var ind = common.repeat(' ', spaces),
        position = 0,
        next = -1,
        result = '',
        line,
        length = string.length;

    while (position < length) {
      next = string.indexOf('\n', position);
      if (next === -1) {
        line = string.slice(position);
        position = length;
      } else {
        line = string.slice(position, next + 1);
        position = next + 1;
      }

      if (line.length && line !== '\n') result += ind;

      result += line;
    }

    return result;
  }

  function generateNextLine(state, level) {
    return '\n' + common.repeat(' ', state.indent * level);
  }

  function testImplicitResolving(state, str) {
    var index, length, type;

    for (index = 0, length = state.implicitTypes.length; index < length; index += 1) {
      type = state.implicitTypes[index];

      if (type.resolve(str)) {
        return true;
      }
    }

    return false;
  }

  // [33] s-white ::= s-space | s-tab
  function isWhitespace(c) {
    return c === CHAR_SPACE || c === CHAR_TAB;
  }

  // Returns true if the character can be printed without escaping.
  // From YAML 1.2: "any allowed characters known to be non-printable
  // should also be escaped. [However,] This isn’t mandatory"
  // Derived from nb-char - \t - #x85 - #xA0 - #x2028 - #x2029.
  function isPrintable(c) {
    return  (0x00020 <= c && c <= 0x00007E)
        || ((0x000A1 <= c && c <= 0x00D7FF) && c !== 0x2028 && c !== 0x2029)
        || ((0x0E000 <= c && c <= 0x00FFFD) && c !== 0xFEFF /* BOM */)
        ||  (0x10000 <= c && c <= 0x10FFFF);
  }

  // Simplified test for values allowed after the first character in plain style.
  function isPlainSafe(c) {
    // Uses a subset of nb-char - c-flow-indicator - ":" - "#"
    // where nb-char ::= c-printable - b-char - c-byte-order-mark.
    return isPrintable(c) && c !== 0xFEFF
      // - c-flow-indicator
      && c !== CHAR_COMMA
      && c !== CHAR_LEFT_SQUARE_BRACKET
      && c !== CHAR_RIGHT_SQUARE_BRACKET
      && c !== CHAR_LEFT_CURLY_BRACKET
      && c !== CHAR_RIGHT_CURLY_BRACKET
      // - ":" - "#"
      && c !== CHAR_COLON
      && c !== CHAR_SHARP;
  }

  // Simplified test for values allowed as the first character in plain style.
  function isPlainSafeFirst(c) {
    // Uses a subset of ns-char - c-indicator
    // where ns-char = nb-char - s-white.
    return isPrintable(c) && c !== 0xFEFF
      && !isWhitespace(c) // - s-white
      // - (c-indicator ::=
      // “-” | “?” | “:” | “,” | “[” | “]” | “{” | “}”
      && c !== CHAR_MINUS
      && c !== CHAR_QUESTION
      && c !== CHAR_COLON
      && c !== CHAR_COMMA
      && c !== CHAR_LEFT_SQUARE_BRACKET
      && c !== CHAR_RIGHT_SQUARE_BRACKET
      && c !== CHAR_LEFT_CURLY_BRACKET
      && c !== CHAR_RIGHT_CURLY_BRACKET
      // | “#” | “&” | “*” | “!” | “|” | “>” | “'” | “"”
      && c !== CHAR_SHARP
      && c !== CHAR_AMPERSAND
      && c !== CHAR_ASTERISK
      && c !== CHAR_EXCLAMATION
      && c !== CHAR_VERTICAL_LINE
      && c !== CHAR_GREATER_THAN
      && c !== CHAR_SINGLE_QUOTE
      && c !== CHAR_DOUBLE_QUOTE
      // | “%” | “@” | “`”)
      && c !== CHAR_PERCENT
      && c !== CHAR_COMMERCIAL_AT
      && c !== CHAR_GRAVE_ACCENT;
  }

  // Determines whether block indentation indicator is required.
  function needIndentIndicator(string) {
    var leadingSpaceRe = /^\n* /;
    return leadingSpaceRe.test(string);
  }

  var STYLE_PLAIN   = 1,
      STYLE_SINGLE  = 2,
      STYLE_LITERAL = 3,
      STYLE_FOLDED  = 4,
      STYLE_DOUBLE  = 5;

  // Determines which scalar styles are possible and returns the preferred style.
  // lineWidth = -1 => no limit.
  // Pre-conditions: str.length > 0.
  // Post-conditions:
  //    STYLE_PLAIN or STYLE_SINGLE => no \n are in the string.
  //    STYLE_LITERAL => no lines are suitable for folding (or lineWidth is -1).
  //    STYLE_FOLDED => a line > lineWidth and can be folded (and lineWidth != -1).
  function chooseScalarStyle(string, singleLineOnly, indentPerLevel, lineWidth, testAmbiguousType) {
    var i;
    var char;
    var hasLineBreak = false;
    var hasFoldableLine = false; // only checked if shouldTrackWidth
    var shouldTrackWidth = lineWidth !== -1;
    var previousLineBreak = -1; // count the first line correctly
    var plain = isPlainSafeFirst(string.charCodeAt(0))
            && !isWhitespace(string.charCodeAt(string.length - 1));

    if (singleLineOnly) {
      // Case: no block styles.
      // Check for disallowed characters to rule out plain and single.
      for (i = 0; i < string.length; i++) {
        char = string.charCodeAt(i);
        if (!isPrintable(char)) {
          return STYLE_DOUBLE;
        }
        plain = plain && isPlainSafe(char);
      }
    } else {
      // Case: block styles permitted.
      for (i = 0; i < string.length; i++) {
        char = string.charCodeAt(i);
        if (char === CHAR_LINE_FEED) {
          hasLineBreak = true;
          // Check if any line can be folded.
          if (shouldTrackWidth) {
            hasFoldableLine = hasFoldableLine ||
              // Foldable line = too long, and not more-indented.
              (i - previousLineBreak - 1 > lineWidth &&
               string[previousLineBreak + 1] !== ' ');
            previousLineBreak = i;
          }
        } else if (!isPrintable(char)) {
          return STYLE_DOUBLE;
        }
        plain = plain && isPlainSafe(char);
      }
      // in case the end is missing a \n
      hasFoldableLine = hasFoldableLine || (shouldTrackWidth &&
        (i - previousLineBreak - 1 > lineWidth &&
         string[previousLineBreak + 1] !== ' '));
    }
    // Although every style can represent \n without escaping, prefer block styles
    // for multiline, since they're more readable and they don't add empty lines.
    // Also prefer folding a super-long line.
    if (!hasLineBreak && !hasFoldableLine) {
      // Strings interpretable as another type have to be quoted;
      // e.g. the string 'true' vs. the boolean true.
      return plain && !testAmbiguousType(string)
        ? STYLE_PLAIN : STYLE_SINGLE;
    }
    // Edge case: block indentation indicator can only have one digit.
    if (indentPerLevel > 9 && needIndentIndicator(string)) {
      return STYLE_DOUBLE;
    }
    // At this point we know block styles are valid.
    // Prefer literal style unless we want to fold.
    return hasFoldableLine ? STYLE_FOLDED : STYLE_LITERAL;
  }

  // Note: line breaking/folding is implemented for only the folded style.
  // NB. We drop the last trailing newline (if any) of a returned block scalar
  //  since the dumper adds its own newline. This always works:
  //    • No ending newline => unaffected; already using strip "-" chomping.
  //    • Ending newline    => removed then restored.
  //  Importantly, this keeps the "+" chomp indicator from gaining an extra line.
  function writeScalar(state, string, level, iskey) {
    state.dump = (function () {
      if (string.length === 0) {
        return "''";
      }
      if (!state.noCompatMode &&
          DEPRECATED_BOOLEANS_SYNTAX.indexOf(string) !== -1) {
        return "'" + string + "'";
      }

      var indent = state.indent * Math.max(1, level); // no 0-indent scalars
      // As indentation gets deeper, let the width decrease monotonically
      // to the lower bound min(state.lineWidth, 40).
      // Note that this implies
      //  state.lineWidth ≤ 40 + state.indent: width is fixed at the lower bound.
      //  state.lineWidth > 40 + state.indent: width decreases until the lower bound.
      // This behaves better than a constant minimum width which disallows narrower options,
      // or an indent threshold which causes the width to suddenly increase.
      var lineWidth = state.lineWidth === -1
        ? -1 : Math.max(Math.min(state.lineWidth, 40), state.lineWidth - indent);

      // Without knowing if keys are implicit/explicit, assume implicit for safety.
      var singleLineOnly = iskey
        // No block styles in flow mode.
        || (state.flowLevel > -1 && level >= state.flowLevel);
      function testAmbiguity(string) {
        return testImplicitResolving(state, string);
      }

      switch (chooseScalarStyle(string, singleLineOnly, state.indent, lineWidth, testAmbiguity)) {
        case STYLE_PLAIN:
          return string;
        case STYLE_SINGLE:
          return "'" + string.replace(/'/g, "''") + "'";
        case STYLE_LITERAL:
          return '|' + blockHeader(string, state.indent)
            + dropEndingNewline(indentString(string, indent));
        case STYLE_FOLDED:
          return '>' + blockHeader(string, state.indent)
            + dropEndingNewline(indentString(foldString(string, lineWidth), indent));
        case STYLE_DOUBLE:
          return '"' + escapeString(string) + '"';
        default:
          throw new exception('impossible error: invalid scalar style');
      }
    }());
  }

  // Pre-conditions: string is valid for a block scalar, 1 <= indentPerLevel <= 9.
  function blockHeader(string, indentPerLevel) {
    var indentIndicator = needIndentIndicator(string) ? String(indentPerLevel) : '';

    // note the special case: the string '\n' counts as a "trailing" empty line.
    var clip =          string[string.length - 1] === '\n';
    var keep = clip && (string[string.length - 2] === '\n' || string === '\n');
    var chomp = keep ? '+' : (clip ? '' : '-');

    return indentIndicator + chomp + '\n';
  }

  // (See the note for writeScalar.)
  function dropEndingNewline(string) {
    return string[string.length - 1] === '\n' ? string.slice(0, -1) : string;
  }

  // Note: a long line without a suitable break point will exceed the width limit.
  // Pre-conditions: every char in str isPrintable, str.length > 0, width > 0.
  function foldString(string, width) {
    // In folded style, $k$ consecutive newlines output as $k+1$ newlines—
    // unless they're before or after a more-indented line, or at the very
    // beginning or end, in which case $k$ maps to $k$.
    // Therefore, parse each chunk as newline(s) followed by a content line.
    var lineRe = /(\n+)([^\n]*)/g;

    // first line (possibly an empty line)
    var result = (function () {
      var nextLF = string.indexOf('\n');
      nextLF = nextLF !== -1 ? nextLF : string.length;
      lineRe.lastIndex = nextLF;
      return foldLine(string.slice(0, nextLF), width);
    }());
    // If we haven't reached the first content line yet, don't add an extra \n.
    var prevMoreIndented = string[0] === '\n' || string[0] === ' ';
    var moreIndented;

    // rest of the lines
    var match;
    while ((match = lineRe.exec(string))) {
      var prefix = match[1], line = match[2];
      moreIndented = (line[0] === ' ');
      result += prefix
        + (!prevMoreIndented && !moreIndented && line !== ''
          ? '\n' : '')
        + foldLine(line, width);
      prevMoreIndented = moreIndented;
    }

    return result;
  }

  // Greedy line breaking.
  // Picks the longest line under the limit each time,
  // otherwise settles for the shortest line over the limit.
  // NB. More-indented lines *cannot* be folded, as that would add an extra \n.
  function foldLine(line, width) {
    if (line === '' || line[0] === ' ') return line;

    // Since a more-indented line adds a \n, breaks can't be followed by a space.
    var breakRe = / [^ ]/g; // note: the match index will always be <= length-2.
    var match;
    // start is an inclusive index. end, curr, and next are exclusive.
    var start = 0, end, curr = 0, next = 0;
    var result = '';

    // Invariants: 0 <= start <= length-1.
    //   0 <= curr <= next <= max(0, length-2). curr - start <= width.
    // Inside the loop:
    //   A match implies length >= 2, so curr and next are <= length-2.
    while ((match = breakRe.exec(line))) {
      next = match.index;
      // maintain invariant: curr - start <= width
      if (next - start > width) {
        end = (curr > start) ? curr : next; // derive end <= length-2
        result += '\n' + line.slice(start, end);
        // skip the space that was output as \n
        start = end + 1;                    // derive start <= length-1
      }
      curr = next;
    }

    // By the invariants, start <= length-1, so there is something left over.
    // It is either the whole string or a part starting from non-whitespace.
    result += '\n';
    // Insert a break if the remainder is too long and there is a break available.
    if (line.length - start > width && curr > start) {
      result += line.slice(start, curr) + '\n' + line.slice(curr + 1);
    } else {
      result += line.slice(start);
    }

    return result.slice(1); // drop extra \n joiner
  }

  // Escapes a double-quoted string.
  function escapeString(string) {
    var result = '';
    var char, nextChar;
    var escapeSeq;

    for (var i = 0; i < string.length; i++) {
      char = string.charCodeAt(i);
      // Check for surrogate pairs (reference Unicode 3.0 section "3.7 Surrogates").
      if (char >= 0xD800 && char <= 0xDBFF/* high surrogate */) {
        nextChar = string.charCodeAt(i + 1);
        if (nextChar >= 0xDC00 && nextChar <= 0xDFFF/* low surrogate */) {
          // Combine the surrogate pair and store it escaped.
          result += encodeHex((char - 0xD800) * 0x400 + nextChar - 0xDC00 + 0x10000);
          // Advance index one extra since we already used that char here.
          i++; continue;
        }
      }
      escapeSeq = ESCAPE_SEQUENCES[char];
      result += !escapeSeq && isPrintable(char)
        ? string[i]
        : escapeSeq || encodeHex(char);
    }

    return result;
  }

  function writeFlowSequence(state, level, object) {
    var _result = '',
        _tag    = state.tag,
        index,
        length;

    for (index = 0, length = object.length; index < length; index += 1) {
      // Write only valid elements.
      if (writeNode(state, level, object[index], false, false)) {
        if (index !== 0) _result += ',' + (!state.condenseFlow ? ' ' : '');
        _result += state.dump;
      }
    }

    state.tag = _tag;
    state.dump = '[' + _result + ']';
  }

  function writeBlockSequence(state, level, object, compact) {
    var _result = '',
        _tag    = state.tag,
        index,
        length;

    for (index = 0, length = object.length; index < length; index += 1) {
      // Write only valid elements.
      if (writeNode(state, level + 1, object[index], true, true)) {
        if (!compact || index !== 0) {
          _result += generateNextLine(state, level);
        }

        if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
          _result += '-';
        } else {
          _result += '- ';
        }

        _result += state.dump;
      }
    }

    state.tag = _tag;
    state.dump = _result || '[]'; // Empty sequence if no valid values.
  }

  function writeFlowMapping(state, level, object) {
    var _result       = '',
        _tag          = state.tag,
        objectKeyList = Object.keys(object),
        index,
        length,
        objectKey,
        objectValue,
        pairBuffer;

    for (index = 0, length = objectKeyList.length; index < length; index += 1) {
      pairBuffer = state.condenseFlow ? '"' : '';

      if (index !== 0) pairBuffer += ', ';

      objectKey = objectKeyList[index];
      objectValue = object[objectKey];

      if (!writeNode(state, level, objectKey, false, false)) {
        continue; // Skip this pair because of invalid key;
      }

      if (state.dump.length > 1024) pairBuffer += '? ';

      pairBuffer += state.dump + (state.condenseFlow ? '"' : '') + ':' + (state.condenseFlow ? '' : ' ');

      if (!writeNode(state, level, objectValue, false, false)) {
        continue; // Skip this pair because of invalid value.
      }

      pairBuffer += state.dump;

      // Both key and value are valid.
      _result += pairBuffer;
    }

    state.tag = _tag;
    state.dump = '{' + _result + '}';
  }

  function writeBlockMapping(state, level, object, compact) {
    var _result       = '',
        _tag          = state.tag,
        objectKeyList = Object.keys(object),
        index,
        length,
        objectKey,
        objectValue,
        explicitPair,
        pairBuffer;

    // Allow sorting keys so that the output file is deterministic
    if (state.sortKeys === true) {
      // Default sorting
      objectKeyList.sort();
    } else if (typeof state.sortKeys === 'function') {
      // Custom sort function
      objectKeyList.sort(state.sortKeys);
    } else if (state.sortKeys) {
      // Something is wrong
      throw new exception('sortKeys must be a boolean or a function');
    }

    for (index = 0, length = objectKeyList.length; index < length; index += 1) {
      pairBuffer = '';

      if (!compact || index !== 0) {
        pairBuffer += generateNextLine(state, level);
      }

      objectKey = objectKeyList[index];
      objectValue = object[objectKey];

      if (!writeNode(state, level + 1, objectKey, true, true, true)) {
        continue; // Skip this pair because of invalid key.
      }

      explicitPair = (state.tag !== null && state.tag !== '?') ||
                     (state.dump && state.dump.length > 1024);

      if (explicitPair) {
        if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
          pairBuffer += '?';
        } else {
          pairBuffer += '? ';
        }
      }

      pairBuffer += state.dump;

      if (explicitPair) {
        pairBuffer += generateNextLine(state, level);
      }

      if (!writeNode(state, level + 1, objectValue, true, explicitPair)) {
        continue; // Skip this pair because of invalid value.
      }

      if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
        pairBuffer += ':';
      } else {
        pairBuffer += ': ';
      }

      pairBuffer += state.dump;

      // Both key and value are valid.
      _result += pairBuffer;
    }

    state.tag = _tag;
    state.dump = _result || '{}'; // Empty mapping if no valid pairs.
  }

  function detectType(state, object, explicit) {
    var _result, typeList, index, length, type, style;

    typeList = explicit ? state.explicitTypes : state.implicitTypes;

    for (index = 0, length = typeList.length; index < length; index += 1) {
      type = typeList[index];

      if ((type.instanceOf  || type.predicate) &&
          (!type.instanceOf || ((typeof object === 'object') && (object instanceof type.instanceOf))) &&
          (!type.predicate  || type.predicate(object))) {

        state.tag = explicit ? type.tag : '?';

        if (type.represent) {
          style = state.styleMap[type.tag] || type.defaultStyle;

          if (_toString$2.call(type.represent) === '[object Function]') {
            _result = type.represent(object, style);
          } else if (_hasOwnProperty$3.call(type.represent, style)) {
            _result = type.represent[style](object, style);
          } else {
            throw new exception('!<' + type.tag + '> tag resolver accepts not "' + style + '" style');
          }

          state.dump = _result;
        }

        return true;
      }
    }

    return false;
  }

  // Serializes `object` and writes it to global `result`.
  // Returns true on success, or false on invalid object.
  //
  function writeNode(state, level, object, block, compact, iskey) {
    state.tag = null;
    state.dump = object;

    if (!detectType(state, object, false)) {
      detectType(state, object, true);
    }

    var type = _toString$2.call(state.dump);

    if (block) {
      block = (state.flowLevel < 0 || state.flowLevel > level);
    }

    var objectOrArray = type === '[object Object]' || type === '[object Array]',
        duplicateIndex,
        duplicate;

    if (objectOrArray) {
      duplicateIndex = state.duplicates.indexOf(object);
      duplicate = duplicateIndex !== -1;
    }

    if ((state.tag !== null && state.tag !== '?') || duplicate || (state.indent !== 2 && level > 0)) {
      compact = false;
    }

    if (duplicate && state.usedDuplicates[duplicateIndex]) {
      state.dump = '*ref_' + duplicateIndex;
    } else {
      if (objectOrArray && duplicate && !state.usedDuplicates[duplicateIndex]) {
        state.usedDuplicates[duplicateIndex] = true;
      }
      if (type === '[object Object]') {
        if (block && (Object.keys(state.dump).length !== 0)) {
          writeBlockMapping(state, level, state.dump, compact);
          if (duplicate) {
            state.dump = '&ref_' + duplicateIndex + state.dump;
          }
        } else {
          writeFlowMapping(state, level, state.dump);
          if (duplicate) {
            state.dump = '&ref_' + duplicateIndex + ' ' + state.dump;
          }
        }
      } else if (type === '[object Array]') {
        var arrayLevel = (state.noArrayIndent && (level > 0)) ? level - 1 : level;
        if (block && (state.dump.length !== 0)) {
          writeBlockSequence(state, arrayLevel, state.dump, compact);
          if (duplicate) {
            state.dump = '&ref_' + duplicateIndex + state.dump;
          }
        } else {
          writeFlowSequence(state, arrayLevel, state.dump);
          if (duplicate) {
            state.dump = '&ref_' + duplicateIndex + ' ' + state.dump;
          }
        }
      } else if (type === '[object String]') {
        if (state.tag !== '?') {
          writeScalar(state, state.dump, level, iskey);
        }
      } else {
        if (state.skipInvalid) return false;
        throw new exception('unacceptable kind of an object to dump ' + type);
      }

      if (state.tag !== null && state.tag !== '?') {
        state.dump = '!<' + state.tag + '> ' + state.dump;
      }
    }

    return true;
  }

  function getDuplicateReferences(object, state) {
    var objects = [],
        duplicatesIndexes = [],
        index,
        length;

    inspectNode(object, objects, duplicatesIndexes);

    for (index = 0, length = duplicatesIndexes.length; index < length; index += 1) {
      state.duplicates.push(objects[duplicatesIndexes[index]]);
    }
    state.usedDuplicates = new Array(length);
  }

  function inspectNode(object, objects, duplicatesIndexes) {
    var objectKeyList,
        index,
        length;

    if (object !== null && typeof object === 'object') {
      index = objects.indexOf(object);
      if (index !== -1) {
        if (duplicatesIndexes.indexOf(index) === -1) {
          duplicatesIndexes.push(index);
        }
      } else {
        objects.push(object);

        if (Array.isArray(object)) {
          for (index = 0, length = object.length; index < length; index += 1) {
            inspectNode(object[index], objects, duplicatesIndexes);
          }
        } else {
          objectKeyList = Object.keys(object);

          for (index = 0, length = objectKeyList.length; index < length; index += 1) {
            inspectNode(object[objectKeyList[index]], objects, duplicatesIndexes);
          }
        }
      }
    }
  }

  function dump(input, options) {
    options = options || {};

    var state = new State$1(options);

    if (!state.noRefs) getDuplicateReferences(input, state);

    if (writeNode(state, 0, input, true, true)) return state.dump + '\n';

    return '';
  }

  function safeDump(input, options) {
    return dump(input, common.extend({ schema: default_safe }, options));
  }

  var dump_1     = dump;
  var safeDump_1 = safeDump;

  var dumper = {
  	dump: dump_1,
  	safeDump: safeDump_1
  };

  function deprecated(name) {
    return function () {
      throw new Error('Function ' + name + ' is deprecated and cannot be used.');
    };
  }


  var Type$1                = type;
  var Schema$1              = schema;
  var FAILSAFE_SCHEMA     = failsafe;
  var JSON_SCHEMA         = json$1;
  var CORE_SCHEMA         = core;
  var DEFAULT_SAFE_SCHEMA = default_safe;
  var DEFAULT_FULL_SCHEMA = default_full;
  var load$1                = loader.load;
  var loadAll$1             = loader.loadAll;
  var safeLoad$1            = loader.safeLoad;
  var safeLoadAll$1         = loader.safeLoadAll;
  var dump$1                = dumper.dump;
  var safeDump$1            = dumper.safeDump;
  var YAMLException$1       = exception;

  // Deprecated schema names from JS-YAML 2.0.x
  var MINIMAL_SCHEMA = failsafe;
  var SAFE_SCHEMA    = default_safe;
  var DEFAULT_SCHEMA = default_full;

  // Deprecated functions from JS-YAML 1.x.x
  var scan           = deprecated('scan');
  var parse          = deprecated('parse');
  var compose        = deprecated('compose');
  var addConstructor = deprecated('addConstructor');

  var jsYaml = {
  	Type: Type$1,
  	Schema: Schema$1,
  	FAILSAFE_SCHEMA: FAILSAFE_SCHEMA,
  	JSON_SCHEMA: JSON_SCHEMA,
  	CORE_SCHEMA: CORE_SCHEMA,
  	DEFAULT_SAFE_SCHEMA: DEFAULT_SAFE_SCHEMA,
  	DEFAULT_FULL_SCHEMA: DEFAULT_FULL_SCHEMA,
  	load: load$1,
  	loadAll: loadAll$1,
  	safeLoad: safeLoad$1,
  	safeLoadAll: safeLoadAll$1,
  	dump: dump$1,
  	safeDump: safeDump$1,
  	YAMLException: YAMLException$1,
  	MINIMAL_SCHEMA: MINIMAL_SCHEMA,
  	SAFE_SCHEMA: SAFE_SCHEMA,
  	DEFAULT_SCHEMA: DEFAULT_SCHEMA,
  	scan: scan,
  	parse: parse,
  	compose: compose,
  	addConstructor: addConstructor
  };

  var jsYaml$1 = jsYaml;

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var formatUtil = util$1.format;

  var ono = createCommonjsModule(function (module) {


  var slice = Array.prototype.slice;
  var protectedProperties = ["name", "message", "stack"];
  var errorPrototypeProperties = [
    "name", "message", "description", "number", "code", "fileName", "lineNumber", "columnNumber",
    "sourceURL", "line", "column", "stack"
  ];

  module.exports = create(Error);
  module.exports.error = create(Error);
  module.exports.eval = create(EvalError);
  module.exports.range = create(RangeError);
  module.exports.reference = create(ReferenceError);
  module.exports.syntax = create(SyntaxError);
  module.exports.type = create(TypeError);
  module.exports.uri = create(URIError);
  module.exports.formatter = formatUtil;

  /**
   * Creates a new {@link ono} function that creates the given Error class.
   *
   * @param {Class} Klass - The Error subclass to create
   * @returns {ono}
   */
  function create (Klass) {
    /**
     * @param {Error}   [err]     - The original error, if any
     * @param {object}  [props]   - An object whose properties will be added to the error object
     * @param {string}  [message] - The error message. May contain {@link util#format} placeholders
     * @param {...*}    [params]  - Parameters that map to the `message` placeholders
     * @returns {Error}
     */
    return function onoFactory (err, props, message, params) {   // eslint-disable-line no-unused-vars
      var formatArgs = [];
      var formattedMessage = "";

      // Determine which arguments were actually specified
      if (typeof err === "string") {
        formatArgs = slice.call(arguments);
        err = props = undefined;
      }
      else if (typeof props === "string") {
        formatArgs = slice.call(arguments, 1);
        props = undefined;
      }
      else if (typeof message === "string") {
        formatArgs = slice.call(arguments, 2);
      }

      // If there are any format arguments, then format the error message
      if (formatArgs.length > 0) {
        formattedMessage = module.exports.formatter.apply(null, formatArgs);
      }

      if (err && err.message) {
        // The inner-error's message will be added to the new message
        formattedMessage += (formattedMessage ? " \n" : "") + err.message;
      }

      // Create the new error
      // NOTE: DON'T move this to a separate function! We don't want to pollute the stack trace
      var newError = new Klass(formattedMessage);

      // Extend the new error with the additional properties
      extendError(newError, err);   // Copy properties of the original error
      extendToJSON(newError);       // Replace the original toJSON method
      extend(newError, props);      // Copy custom properties, possibly including a custom toJSON method

      return newError;
    };
  }

  /**
   * Extends the targetError with the properties of the source error.
   *
   * @param {Error}   targetError - The error object to extend
   * @param {?Error}  sourceError - The source error object, if any
   */
  function extendError (targetError, sourceError) {
    extendStack(targetError, sourceError);
    extend(targetError, sourceError);
  }

  /**
   * JavaScript engines differ in how errors are serialized to JSON - especially when it comes
   * to custom error properties and stack traces.  So we add our own toJSON method that ALWAYS
   * outputs every property of the error.
   */
  function extendToJSON (error) {
    error.toJSON = errorToJSON;

    // Also add an inspect() method, for compatibility with Node.js' `util.inspect()` method
    error.inspect = errorToString;
  }

  /**
   * Extends the target object with the properties of the source object.
   *
   * @param {object}  target - The object to extend
   * @param {?source} source - The object whose properties are copied
   */
  function extend (target, source) {
    if (source && typeof source === "object") {
      var keys = Object.keys(source);
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];

        // Don't copy "protected" properties, since they have special meaning/behavior
        // and are set by the onoFactory function
        if (protectedProperties.indexOf(key) >= 0) {
          continue;
        }

        try {
          target[key] = source[key];
        }
        catch (e) {
          // This property is read-only, so it can't be copied
        }
      }
    }
  }

  /**
   * Custom JSON serializer for Error objects.
   * Returns all built-in error properties, as well as extended properties.
   *
   * @returns {object}
   */
  function errorToJSON () {
    var json = {};

    // Get all the properties of this error
    var keys = Object.keys(this);

    // Also include properties from the Error prototype
    keys = keys.concat(errorPrototypeProperties);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var value = this[key];
      var type = typeof value;
      if (type !== "undefined" && type !== "function") {
        json[key] = value;
      }
    }

    return json;
  }

  /**
   * Serializes Error objects as human-readable JSON strings for debugging/logging purposes.
   *
   * @returns {string}
   */
  function errorToString () {
    return JSON.stringify(this, null, 2).replace(/\\n/g, "\n");
  }

  /**
   * Extend the error stack to include its cause
   *
   * @param {Error} targetError
   * @param {Error} sourceError
   */
  function extendStack (targetError, sourceError) {
    if (hasLazyStack(targetError)) {
      if (sourceError) {
        lazyJoinStacks(targetError, sourceError);
      }
      else {
        lazyPopStack(targetError);
      }
    }
    else {
      if (sourceError) {
        targetError.stack = joinStacks(targetError.stack, sourceError.stack);
      }
      else {
        targetError.stack = popStack(targetError.stack);
      }
    }
  }

  /**
   * Appends the original {@link Error#stack} property to the new Error's stack.
   *
   * @param {string} newStack
   * @param {string} originalStack
   * @returns {string}
   */
  function joinStacks (newStack, originalStack) {
    newStack = popStack(newStack);

    if (newStack && originalStack) {
      return newStack + "\n\n" + originalStack;
    }
    else {
      return newStack || originalStack;
    }
  }

  /**
   * Removes Ono from the stack, so that the stack starts at the original error location
   *
   * @param {string} stack
   * @returns {string}
   */
  function popStack (stack) {
    if (stack) {
      var lines = stack.split("\n");

      if (lines.length < 2) {
        // The stack only has one line, so there's nothing we can remove
        return stack;
      }

      // Find the `onoFactory` call in the stack, and remove it
      for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        if (line.indexOf("onoFactory") >= 0) {
          lines.splice(i, 1);
          return lines.join("\n");
        }
      }

      // If we get here, then the stack doesn't contain a call to `onoFactory`.
      // This may be due to minification or some optimization of the JS engine.
      // So just return the stack as-is.
      return stack;
    }
  }

  /**
   * Does a one-time determination of whether this JavaScript engine
   * supports lazy `Error.stack` properties.
   */
  var supportsLazyStack = (function () {
    return !!(
      // ES5 property descriptors must be supported
      Object.getOwnPropertyDescriptor && Object.defineProperty &&

      // Chrome on Android doesn't support lazy stacks :(
      (typeof navigator === "undefined" || !/Android/.test(navigator.userAgent))
    );
  }());

  /**
   * Does this error have a lazy stack property?
   *
   * @param {Error} err
   * @returns {boolean}
   */
  function hasLazyStack (err) {
    if (!supportsLazyStack) {
      return false;
    }

    var descriptor = Object.getOwnPropertyDescriptor(err, "stack");
    if (!descriptor) {
      return false;
    }
    return typeof descriptor.get === "function";
  }

  /**
   * Calls {@link joinStacks} lazily, when the {@link Error#stack} property is accessed.
   *
   * @param {Error} targetError
   * @param {Error} sourceError
   */
  function lazyJoinStacks (targetError, sourceError) {
    var targetStack = Object.getOwnPropertyDescriptor(targetError, "stack");

    Object.defineProperty(targetError, "stack", {
      get: function () {
        return joinStacks(targetStack.get.apply(targetError), sourceError.stack);
      },
      enumerable: false,
      configurable: true
    });
  }

  /**
   * Calls {@link popStack} lazily, when the {@link Error#stack} property is accessed.
   *
   * @param {Error} error
   */
  function lazyPopStack (error) {
    var targetStack = Object.getOwnPropertyDescriptor(error, "stack");

    Object.defineProperty(error, "stack", {
      get: function () {
        return popStack(targetStack.get.apply(error));
      },
      enumerable: false,
      configurable: true
    });
  }
  });
  var ono_1 = ono.error;
  var ono_2 = ono.range;
  var ono_3 = ono.reference;
  var ono_4 = ono.syntax;
  var ono_5 = ono.type;
  var ono_6 = ono.uri;
  var ono_7 = ono.formatter;

  /**
   * Simple YAML parsing functions, similar to {@link JSON.parse} and {@link JSON.stringify}
   */
  var yaml_1 = {
    /**
     * Parses a YAML string and returns the value.
     *
     * @param {string} text - The YAML string to be parsed
     * @param {function} [reviver] - Not currently supported. Provided for consistency with {@link JSON.parse}
     * @returns {*}
     */
    parse: function yamlParse (text, reviver) {
      try {
        return jsYaml$1.safeLoad(text);
      }
      catch (e) {
        if (e instanceof Error) {
          throw e;
        }
        else {
          // https://github.com/nodeca/js-yaml/issues/153
          throw ono(e, e.message);
        }
      }
    },

    /**
     * Converts a JavaScript value to a YAML string.
     *
     * @param   {*} value - The value to convert to YAML
     * @param   {function|array} replacer - Not currently supported. Provided for consistency with {@link JSON.stringify}
     * @param   {string|number} space - The number of spaces to use for indentation, or a string containing the number of spaces.
     * @returns {string}
     */
    stringify: function yamlStringify (value, replacer, space) {
      try {
        var indent = (typeof space === "string" ? space.length : space) || 2;
        return jsYaml$1.safeDump(value, { indent: indent });
      }
      catch (e) {
        if (e instanceof Error) {
          throw e;
        }
        else {
          // https://github.com/nodeca/js-yaml/issues/153
          throw ono(e, e.message);
        }
      }
    }
  };

  var yaml = {
    /**
     * The order that this parser will run, in relation to other parsers.
     *
     * @type {number}
     */
    order: 200,

    /**
     * Whether to allow "empty" files. This includes zero-byte files, as well as empty JSON objects.
     *
     * @type {boolean}
     */
    allowEmpty: true,

    /**
     * Determines whether this parser can parse a given file reference.
     * Parsers that match will be tried, in order, until one successfully parses the file.
     * Parsers that don't match will be skipped, UNLESS none of the parsers match, in which case
     * every parser will be tried.
     *
     * @type {RegExp|string[]|function}
     */
    canParse: [".yaml", ".yml", ".json"],  // JSON is valid YAML

    /**
     * Parses the given file as YAML
     *
     * @param {object} file           - An object containing information about the referenced file
     * @param {string} file.url       - The full URL of the referenced file
     * @param {string} file.extension - The lowercased file extension (e.g. ".txt", ".html", etc.)
     * @param {*}      file.data      - The file contents. This will be whatever data type was returned by the resolver
     * @returns {Promise}
     */
    parse: function parseYAML (file) {
      return new Promise(function (resolve, reject) {
        var data = file.data;
        if (Buffer.isBuffer(data)) {
          data = data.toString();
        }

        if (typeof data === "string") {
          resolve(yaml_1.parse(data));
        }
        else {
          // data is already a JavaScript value (object, array, number, null, NaN, etc.)
          resolve(data);
        }
      });
    }
  };

  var TEXT_REGEXP = /\.(txt|htm|html|md|xml|js|min|map|css|scss|less|svg)$/i;

  var text = {
    /**
     * The order that this parser will run, in relation to other parsers.
     *
     * @type {number}
     */
    order: 300,

    /**
     * Whether to allow "empty" files (zero bytes).
     *
     * @type {boolean}
     */
    allowEmpty: true,

    /**
     * The encoding that the text is expected to be in.
     *
     * @type {string}
     */
    encoding: "utf8",

    /**
     * Determines whether this parser can parse a given file reference.
     * Parsers that return true will be tried, in order, until one successfully parses the file.
     * Parsers that return false will be skipped, UNLESS all parsers returned false, in which case
     * every parser will be tried.
     *
     * @param {object} file           - An object containing information about the referenced file
     * @param {string} file.url       - The full URL of the referenced file
     * @param {string} file.extension - The lowercased file extension (e.g. ".txt", ".html", etc.)
     * @param {*}      file.data      - The file contents. This will be whatever data type was returned by the resolver
     * @returns {boolean}
     */
    canParse: function isText (file) {
      // Use this parser if the file is a string or Buffer, and has a known text-based extension
      return (typeof file.data === "string" || Buffer.isBuffer(file.data)) && TEXT_REGEXP.test(file.url);
    },

    /**
     * Parses the given file as text
     *
     * @param {object} file           - An object containing information about the referenced file
     * @param {string} file.url       - The full URL of the referenced file
     * @param {string} file.extension - The lowercased file extension (e.g. ".txt", ".html", etc.)
     * @param {*}      file.data      - The file contents. This will be whatever data type was returned by the resolver
     * @returns {Promise<string>}
     */
    parse: function parseText (file) {
      if (typeof file.data === "string") {
        return file.data;
      }
      else if (Buffer.isBuffer(file.data)) {
        return file.data.toString(this.encoding);
      }
      else {
        throw new Error("data is not text");
      }
    }
  };

  var BINARY_REGEXP = /\.(jpeg|jpg|gif|png|bmp|ico)$/i;

  var binary$1 = {
    /**
     * The order that this parser will run, in relation to other parsers.
     *
     * @type {number}
     */
    order: 400,

    /**
     * Whether to allow "empty" files (zero bytes).
     *
     * @type {boolean}
     */
    allowEmpty: true,

    /**
     * Determines whether this parser can parse a given file reference.
     * Parsers that return true will be tried, in order, until one successfully parses the file.
     * Parsers that return false will be skipped, UNLESS all parsers returned false, in which case
     * every parser will be tried.
     *
     * @param {object} file           - An object containing information about the referenced file
     * @param {string} file.url       - The full URL of the referenced file
     * @param {string} file.extension - The lowercased file extension (e.g. ".txt", ".html", etc.)
     * @param {*}      file.data      - The file contents. This will be whatever data type was returned by the resolver
     * @returns {boolean}
     */
    canParse: function isBinary (file) {
      // Use this parser if the file is a Buffer, and has a known binary extension
      return Buffer.isBuffer(file.data) && BINARY_REGEXP.test(file.url);
    },

    /**
     * Parses the given data as a Buffer (byte array).
     *
     * @param {object} file           - An object containing information about the referenced file
     * @param {string} file.url       - The full URL of the referenced file
     * @param {string} file.extension - The lowercased file extension (e.g. ".txt", ".html", etc.)
     * @param {*}      file.data      - The file contents. This will be whatever data type was returned by the resolver
     * @returns {Promise<Buffer>}
     */
    parse: function parseBinary (file) {
      if (Buffer.isBuffer(file.data)) {
        return file.data;
      }
      else {
        // This will reject if data is anything other than a string or typed array
        return new Buffer(file.data);
      }
    }
  };

  var url_1 = createCommonjsModule(function (module, exports) {

  var isWindows = /^win/.test(process.platform),
      forwardSlashPattern = /\//g,
      protocolPattern = /^(\w{2,}):\/\//i,
      url$1 = module.exports;

  // RegExp patterns to URL-encode special characters in local filesystem paths
  var urlEncodePatterns = [
    /\?/g, "%3F",
    /\#/g, "%23",
  ];

  // RegExp patterns to URL-decode special characters for local filesystem paths
  var urlDecodePatterns = [
    /\%23/g, "#",
    /\%24/g, "$",
    /\%26/g, "&",
    /\%2C/g, ",",
    /\%40/g, "@"
  ];

  exports.parse = url.parse;
  exports.resolve = url.resolve;

  /**
   * Returns the current working directory (in Node) or the current page URL (in browsers).
   *
   * @returns {string}
   */
  exports.cwd = function cwd () {
    return process.browser ? location.href : process.cwd() + "/";
  };

  /**
   * Returns the protocol of the given URL, or `undefined` if it has no protocol.
   *
   * @param   {string} path
   * @returns {?string}
   */
  exports.getProtocol = function getProtocol (path) {
    var match = protocolPattern.exec(path);
    if (match) {
      return match[1].toLowerCase();
    }
  };

  /**
   * Returns the lowercased file extension of the given URL,
   * or an empty string if it has no extension.
   *
   * @param   {string} path
   * @returns {string}
   */
  exports.getExtension = function getExtension (path) {
    var lastDot = path.lastIndexOf(".");
    if (lastDot >= 0) {
      return path.substr(lastDot).toLowerCase();
    }
    return "";
  };

  /**
   * Returns the hash (URL fragment), of the given path.
   * If there is no hash, then the root hash ("#") is returned.
   *
   * @param   {string} path
   * @returns {string}
   */
  exports.getHash = function getHash (path) {
    var hashIndex = path.indexOf("#");
    if (hashIndex >= 0) {
      return path.substr(hashIndex);
    }
    return "#";
  };

  /**
   * Removes the hash (URL fragment), if any, from the given path.
   *
   * @param   {string} path
   * @returns {string}
   */
  exports.stripHash = function stripHash (path) {
    var hashIndex = path.indexOf("#");
    if (hashIndex >= 0) {
      path = path.substr(0, hashIndex);
    }
    return path;
  };

  /**
   * Determines whether the given path is an HTTP(S) URL.
   *
   * @param   {string} path
   * @returns {boolean}
   */
  exports.isHttp = function isHttp (path) {
    var protocol = url$1.getProtocol(path);
    if (protocol === "http" || protocol === "https") {
      return true;
    }
    else if (protocol === undefined) {
      // There is no protocol.  If we're running in a browser, then assume it's HTTP.
      return process.browser;
    }
    else {
      // It's some other protocol, such as "ftp://", "mongodb://", etc.
      return false;
    }
  };

  /**
   * Determines whether the given path is a filesystem path.
   * This includes "file://" URLs.
   *
   * @param   {string} path
   * @returns {boolean}
   */
  exports.isFileSystemPath = function isFileSystemPath (path) {
    if (process.browser) {
      // We're running in a browser, so assume that all paths are URLs.
      // This way, even relative paths will be treated as URLs rather than as filesystem paths
      return false;
    }

    var protocol = url$1.getProtocol(path);
    return protocol === undefined || protocol === "file";
  };

  /**
   * Converts a filesystem path to a properly-encoded URL.
   *
   * This is intended to handle situations where JSON Schema $Ref Parser is called
   * with a filesystem path that contains characters which are not allowed in URLs.
   *
   * @example
   * The following filesystem paths would be converted to the following URLs:
   *
   *    <"!@#$%^&*+=?'>.json              ==>   %3C%22!@%23$%25%5E&*+=%3F\'%3E.json
   *    C:\\My Documents\\File (1).json   ==>   C:/My%20Documents/File%20(1).json
   *    file://Project #42/file.json      ==>   file://Project%20%2342/file.json
   *
   * @param {string} path
   * @returns {string}
   */
  exports.fromFileSystemPath = function fromFileSystemPath (path) {
    // Step 1: On Windows, replace backslashes with forward slashes,
    // rather than encoding them as "%5C"
    if (isWindows) {
      path = path.replace(/\\/g, "/");
    }

    // Step 2: `encodeURI` will take care of MOST characters
    path = encodeURI(path);

    // Step 3: Manually encode characters that are not encoded by `encodeURI`.
    // This includes characters such as "#" and "?", which have special meaning in URLs,
    // but are just normal characters in a filesystem path.
    for (var i = 0; i < urlEncodePatterns.length; i += 2) {
      path = path.replace(urlEncodePatterns[i], urlEncodePatterns[i + 1]);
    }

    return path;
  };

  /**
   * Converts a URL to a local filesystem path.
   *
   * @param {string}  path
   * @param {boolean} [keepFileProtocol] - If true, then "file://" will NOT be stripped
   * @returns {string}
   */
  exports.toFileSystemPath = function toFileSystemPath (path, keepFileProtocol) {
    // Step 1: `decodeURI` will decode characters such as Cyrillic characters, spaces, etc.
    path = decodeURI(path);

    // Step 2: Manually decode characters that are not decoded by `decodeURI`.
    // This includes characters such as "#" and "?", which have special meaning in URLs,
    // but are just normal characters in a filesystem path.
    for (var i = 0; i < urlDecodePatterns.length; i += 2) {
      path = path.replace(urlDecodePatterns[i], urlDecodePatterns[i + 1]);
    }

    // Step 3: If it's a "file://" URL, then format it consistently
    // or convert it to a local filesystem path
    var isFileUrl = path.substr(0, 7).toLowerCase() === "file://";
    if (isFileUrl) {
      // Strip-off the protocol, and the initial "/", if there is one
      path = path[7] === "/" ? path.substr(8) : path.substr(7);

      // insert a colon (":") after the drive letter on Windows
      if (isWindows && path[1] === "/") {
        path = path[0] + ":" + path.substr(1);
      }

      if (keepFileProtocol) {
        // Return the consistently-formatted "file://" URL
        path = "file:///" + path;
      }
      else {
        // Convert the "file://" URL to a local filesystem path.
        // On Windows, it will start with something like "C:/".
        // On Posix, it will start with "/"
        isFileUrl = false;
        path = isWindows ? path : "/" + path;
      }
    }

    // Step 4: Normalize Windows paths (unless it's a "file://" URL)
    if (isWindows && !isFileUrl) {
      // Replace forward slashes with backslashes
      path = path.replace(forwardSlashPattern, "\\");

      // Capitalize the drive letter
      if (path.substr(1, 2) === ":\\") {
        path = path[0].toUpperCase() + path.substr(1);
      }
    }

    return path;
  };
  });
  var url_2 = url_1.parse;
  var url_3 = url_1.resolve;
  var url_4 = url_1.cwd;
  var url_5 = url_1.getProtocol;
  var url_6 = url_1.getExtension;
  var url_7 = url_1.getHash;
  var url_8 = url_1.stripHash;
  var url_9 = url_1.isHttp;
  var url_10 = url_1.isFileSystemPath;
  var url_11 = url_1.fromFileSystemPath;
  var url_12 = url_1.toFileSystemPath;

  var file = {
    /**
     * The order that this resolver will run, in relation to other resolvers.
     *
     * @type {number}
     */
    order: 100,

    /**
     * Determines whether this resolver can read a given file reference.
     * Resolvers that return true will be tried, in order, until one successfully resolves the file.
     * Resolvers that return false will not be given a chance to resolve the file.
     *
     * @param {object} file           - An object containing information about the referenced file
     * @param {string} file.url       - The full URL of the referenced file
     * @param {string} file.extension - The lowercased file extension (e.g. ".txt", ".html", etc.)
     * @returns {boolean}
     */
    canRead: function isFile (file) {
      return url_1.isFileSystemPath(file.url);
    },

    /**
     * Reads the given file and returns its raw contents as a Buffer.
     *
     * @param {object} file           - An object containing information about the referenced file
     * @param {string} file.url       - The full URL of the referenced file
     * @param {string} file.extension - The lowercased file extension (e.g. ".txt", ".html", etc.)
     * @returns {Promise<Buffer>}
     */
    read: function readFile (file) {
      return new Promise(function (resolve, reject) {
        var path;
        try {
          path = url_1.toFileSystemPath(file.url);
        }
        catch (err) {
          reject(ono.uri(err, "Malformed URI: %s", file.url));
        }

        // console.log('Opening file: %s', path);

        try {
          fs.readFile(path, function (err, data) {
            if (err) {
              reject(ono(err, 'Error opening file "%s"', path));
            }
            else {
              resolve(data);
            }
          });
        }
        catch (err) {
          reject(ono(err, 'Error opening file "%s"', path));
        }
      });
    }
  };

  var http_1 = {
    /**
     * The order that this resolver will run, in relation to other resolvers.
     *
     * @type {number}
     */
    order: 200,

    /**
     * HTTP headers to send when downloading files.
     *
     * @example:
     * {
     *   "User-Agent": "JSON Schema $Ref Parser",
     *   Accept: "application/json"
     * }
     *
     * @type {object}
     */
    headers: null,

    /**
     * HTTP request timeout (in milliseconds).
     *
     * @type {number}
     */
    timeout: 5000, // 5 seconds

    /**
     * The maximum number of HTTP redirects to follow.
     * To disable automatic following of redirects, set this to zero.
     *
     * @type {number}
     */
    redirects: 5,

    /**
     * The `withCredentials` option of XMLHttpRequest.
     * Set this to `true` if you're downloading files from a CORS-enabled server that requires authentication
     *
     * @type {boolean}
     */
    withCredentials: false,

    /**
     * Determines whether this resolver can read a given file reference.
     * Resolvers that return true will be tried in order, until one successfully resolves the file.
     * Resolvers that return false will not be given a chance to resolve the file.
     *
     * @param {object} file           - An object containing information about the referenced file
     * @param {string} file.url       - The full URL of the referenced file
     * @param {string} file.extension - The lowercased file extension (e.g. ".txt", ".html", etc.)
     * @returns {boolean}
     */
    canRead: function isHttp (file) {
      return url_1.isHttp(file.url);
    },

    /**
     * Reads the given URL and returns its raw contents as a Buffer.
     *
     * @param {object} file           - An object containing information about the referenced file
     * @param {string} file.url       - The full URL of the referenced file
     * @param {string} file.extension - The lowercased file extension (e.g. ".txt", ".html", etc.)
     * @returns {Promise<Buffer>}
     */
    read: function readHttp (file) {
      var u = url_1.parse(file.url);

      if (process.browser && !u.protocol) {
        // Use the protocol of the current page
        u.protocol = url_1.parse(location.href).protocol;
      }

      return download(u, this);
    }
  };

  /**
   * Downloads the given file.
   *
   * @param {Url|string} u        - The url to download (can be a parsed {@link Url} object)
   * @param {object} httpOptions  - The `options.resolve.http` object
   * @param {number} [redirects]  - The redirect URLs that have already been followed
   *
   * @returns {Promise<Buffer>}
   * The promise resolves with the raw downloaded data, or rejects if there is an HTTP error.
   */
  function download (u, httpOptions, redirects) {
    return new Promise(function (resolve, reject) {
      u = url_1.parse(u);
      redirects = redirects || [];
      redirects.push(u.href);

      get(u, httpOptions)
        .then(function (res) {
          if (res.statusCode >= 400) {
            throw ono({ status: res.statusCode }, "HTTP ERROR %d", res.statusCode);
          }
          else if (res.statusCode >= 300) {
            if (redirects.length > httpOptions.redirects) {
              reject(ono({ status: res.statusCode }, "Error downloading %s. \nToo many redirects: \n  %s",
                redirects[0], redirects.join(" \n  ")));
            }
            else if (!res.headers.location) {
              throw ono({ status: res.statusCode }, "HTTP %d redirect with no location header", res.statusCode);
            }
            else {
              // console.log('HTTP %d redirect %s -> %s', res.statusCode, u.href, res.headers.location);
              var redirectTo = url_1.resolve(u, res.headers.location);
              download(redirectTo, httpOptions, redirects).then(resolve, reject);
            }
          }
          else {
            resolve(res.body || new Buffer(0));
          }
        })
        .catch(function (err) {
          reject(ono(err, "Error downloading", u.href));
        });
    });
  }

  /**
   * Sends an HTTP GET request.
   *
   * @param {Url} u - A parsed {@link Url} object
   * @param {object} httpOptions - The `options.resolve.http` object
   *
   * @returns {Promise<Response>}
   * The promise resolves with the HTTP Response object.
   */
  function get (u, httpOptions) {
    return new Promise(function (resolve, reject) {
      // console.log('GET', u.href);

      var protocol = u.protocol === "https:" ? https : http;
      var req = protocol.get({
        hostname: u.hostname,
        port: u.port,
        path: u.path,
        auth: u.auth,
        protocol: u.protocol,
        headers: httpOptions.headers || {},
        withCredentials: httpOptions.withCredentials
      });

      if (typeof req.setTimeout === "function") {
        req.setTimeout(httpOptions.timeout);
      }

      req.on("timeout", function () {
        req.abort();
      });

      req.on("error", reject);

      req.once("response", function (res) {
        res.body = new Buffer(0);

        res.on("data", function (data) {
          res.body = Buffer.concat([res.body, new Buffer(data)]);
        });

        res.on("error", reject);

        res.on("end", function () {
          resolve(res);
        });
      });
    });
  }

  var options = $RefParserOptions;

  /**
   * Options that determine how JSON schemas are parsed, resolved, and dereferenced.
   *
   * @param {object|$RefParserOptions} [options] - Overridden options
   * @constructor
   */
  function $RefParserOptions (options) {
    merge$1(this, $RefParserOptions.defaults);
    merge$1(this, options);
  }

  $RefParserOptions.defaults = {
    /**
     * Determines how different types of files will be parsed.
     *
     * You can add additional parsers of your own, replace an existing one with
     * your own implemenation, or disable any parser by setting it to false.
     */
    parse: {
      json: json,
      yaml: yaml,
      text: text,
      binary: binary$1,
    },

    /**
     * Determines how JSON References will be resolved.
     *
     * You can add additional resolvers of your own, replace an existing one with
     * your own implemenation, or disable any resolver by setting it to false.
     */
    resolve: {
      file: file,
      http: http_1,

      /**
       * Determines whether external $ref pointers will be resolved.
       * If this option is disabled, then none of above resolvers will be called.
       * Instead, external $ref pointers will simply be ignored.
       *
       * @type {boolean}
       */
      external: true,
    },

    /**
     * Determines the types of JSON references that are allowed.
     */
    dereference: {
      /**
       * Dereference circular (recursive) JSON references?
       * If false, then a {@link ReferenceError} will be thrown if a circular reference is found.
       * If "ignore", then circular references will not be dereferenced.
       *
       * @type {boolean|string}
       */
      circular: true
    },
  };

  /**
   * Merges the properties of the source object into the target object.
   *
   * @param {object} target - The object that we're populating
   * @param {?object} source - The options that are being merged
   * @returns {object}
   */
  function merge$1 (target, source) {
    if (isMergeable(source)) {
      var keys = Object.keys(source);
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var sourceSetting = source[key];
        var targetSetting = target[key];

        if (isMergeable(sourceSetting)) {
          // It's a nested object, so merge it recursively
          target[key] = merge$1(targetSetting || {}, sourceSetting);
        }
        else if (sourceSetting !== undefined) {
          // It's a scalar value, function, or array. No merging necessary. Just overwrite the target value.
          target[key] = sourceSetting;
        }
      }
    }
    return target;
  }

  /**
   * Determines whether the given value can be merged,
   * or if it is a scalar value that should just override the target value.
   *
   * @param   {*}  val
   * @returns {Boolean}
   */
  function isMergeable (val) {
    return val &&
      (typeof val === "object") &&
      !Array.isArray(val) &&
      !(val instanceof RegExp) &&
      !(val instanceof Date);
  }

  var pointer = Pointer;

  var slashes = /\//g,
      tildes = /~/g,
      escapedSlash = /~1/g,
      escapedTilde = /~0/g;

  /**
   * This class represents a single JSON pointer and its resolved value.
   *
   * @param {$Ref} $ref
   * @param {string} path
   * @param {string} [friendlyPath] - The original user-specified path (used for error messages)
   * @constructor
   */
  function Pointer ($ref, path, friendlyPath) {
    /**
     * The {@link $Ref} object that contains this {@link Pointer} object.
     * @type {$Ref}
     */
    this.$ref = $ref;

    /**
     * The file path or URL, containing the JSON pointer in the hash.
     * This path is relative to the path of the main JSON schema file.
     * @type {string}
     */
    this.path = path;

    /**
     * The original path or URL, used for error messages.
     * @type {string}
     */
    this.originalPath = friendlyPath || path;

    /**
     * The value of the JSON pointer.
     * Can be any JSON type, not just objects. Unknown file types are represented as Buffers (byte arrays).
     * @type {?*}
     */
    this.value = undefined;

    /**
     * Indicates whether the pointer references itself.
     * @type {boolean}
     */
    this.circular = false;

    /**
     * The number of indirect references that were traversed to resolve the value.
     * Resolving a single pointer may require resolving multiple $Refs.
     * @type {number}
     */
    this.indirections = 0;
  }

  /**
   * Resolves the value of a nested property within the given object.
   *
   * @param {*} obj - The object that will be crawled
   * @param {$RefParserOptions} options
   *
   * @returns {Pointer}
   * Returns a JSON pointer whose {@link Pointer#value} is the resolved value.
   * If resolving this value required resolving other JSON references, then
   * the {@link Pointer#$ref} and {@link Pointer#path} will reflect the resolution path
   * of the resolved value.
   */
  Pointer.prototype.resolve = function (obj, options) {
    var tokens = Pointer.parse(this.path);

    // Crawl the object, one token at a time
    this.value = obj;
    for (var i = 0; i < tokens.length; i++) {
      if (resolveIf$Ref(this, options)) {
        // The $ref path has changed, so append the remaining tokens to the path
        this.path = Pointer.join(this.path, tokens.slice(i));
      }

      var token = tokens[i];
      if (this.value[token] === undefined) {
        throw ono.syntax('Error resolving $ref pointer "%s". \nToken "%s" does not exist.', this.originalPath, token);
      }
      else {
        this.value = this.value[token];
      }
    }

    // Resolve the final value
    resolveIf$Ref(this, options);
    return this;
  };

  /**
   * Sets the value of a nested property within the given object.
   *
   * @param {*} obj - The object that will be crawled
   * @param {*} value - the value to assign
   * @param {$RefParserOptions} options
   *
   * @returns {*}
   * Returns the modified object, or an entirely new object if the entire object is overwritten.
   */
  Pointer.prototype.set = function (obj, value, options) {
    var tokens = Pointer.parse(this.path);
    var token;

    if (tokens.length === 0) {
      // There are no tokens, replace the entire object with the new value
      this.value = value;
      return value;
    }

    // Crawl the object, one token at a time
    this.value = obj;
    for (var i = 0; i < tokens.length - 1; i++) {
      resolveIf$Ref(this, options);

      token = tokens[i];
      if (this.value && this.value[token] !== undefined) {
        // The token exists
        this.value = this.value[token];
      }
      else {
        // The token doesn't exist, so create it
        this.value = setValue(this, token, {});
      }
    }

    // Set the value of the final token
    resolveIf$Ref(this, options);
    token = tokens[tokens.length - 1];
    setValue(this, token, value);

    // Return the updated object
    return obj;
  };

  /**
   * Parses a JSON pointer (or a path containing a JSON pointer in the hash)
   * and returns an array of the pointer's tokens.
   * (e.g. "schema.json#/definitions/person/name" => ["definitions", "person", "name"])
   *
   * The pointer is parsed according to RFC 6901
   * {@link https://tools.ietf.org/html/rfc6901#section-3}
   *
   * @param {string} path
   * @returns {string[]}
   */
  Pointer.parse = function (path) {
    // Get the JSON pointer from the path's hash
    var pointer = url_1.getHash(path).substr(1);

    // If there's no pointer, then there are no tokens,
    // so return an empty array
    if (!pointer) {
      return [];
    }

    // Split into an array
    pointer = pointer.split("/");

    // Decode each part, according to RFC 6901
    for (var i = 0; i < pointer.length; i++) {
      pointer[i] = decodeURIComponent(pointer[i].replace(escapedSlash, "/").replace(escapedTilde, "~"));
    }

    if (pointer[0] !== "") {
      throw ono.syntax('Invalid $ref pointer "%s". Pointers must begin with "#/"', pointer);
    }

    return pointer.slice(1);
  };

  /**
   * Creates a JSON pointer path, by joining one or more tokens to a base path.
   *
   * @param {string} base - The base path (e.g. "schema.json#/definitions/person")
   * @param {string|string[]} tokens - The token(s) to append (e.g. ["name", "first"])
   * @returns {string}
   */
  Pointer.join = function (base, tokens) {
    // Ensure that the base path contains a hash
    if (base.indexOf("#") === -1) {
      base += "#";
    }

    // Append each token to the base path
    tokens = Array.isArray(tokens) ? tokens : [tokens];
    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];
      // Encode the token, according to RFC 6901
      base += "/" + encodeURIComponent(token.replace(tildes, "~0").replace(slashes, "~1"));
    }

    return base;
  };

  /**
   * If the given pointer's {@link Pointer#value} is a JSON reference,
   * then the reference is resolved and {@link Pointer#value} is replaced with the resolved value.
   * In addition, {@link Pointer#path} and {@link Pointer#$ref} are updated to reflect the
   * resolution path of the new value.
   *
   * @param {Pointer} pointer
   * @param {$RefParserOptions} options
   * @returns {boolean} - Returns `true` if the resolution path changed
   */
  function resolveIf$Ref (pointer, options) {
    // Is the value a JSON reference? (and allowed?)

    if (ref.isAllowed$Ref(pointer.value, options)) {
      var $refPath = url_1.resolve(pointer.path, pointer.value.$ref);

      if ($refPath === pointer.path) {
        // The value is a reference to itself, so there's nothing to do.
        pointer.circular = true;
      }
      else {
        var resolved = pointer.$ref.$refs._resolve($refPath, options);
        pointer.indirections += resolved.indirections + 1;

        if (ref.isExtended$Ref(pointer.value)) {
          // This JSON reference "extends" the resolved value, rather than simply pointing to it.
          // So the resolved path does NOT change.  Just the value does.
          pointer.value = ref.dereference(pointer.value, resolved.value);
          return false;
        }
        else {
          // Resolve the reference
          pointer.$ref = resolved.$ref;
          pointer.path = resolved.path;
          pointer.value = resolved.value;
        }

        return true;
      }
    }
  }

  /**
   * Sets the specified token value of the {@link Pointer#value}.
   *
   * The token is evaluated according to RFC 6901.
   * {@link https://tools.ietf.org/html/rfc6901#section-4}
   *
   * @param {Pointer} pointer - The JSON Pointer whose value will be modified
   * @param {string} token - A JSON Pointer token that indicates how to modify `obj`
   * @param {*} value - The value to assign
   * @returns {*} - Returns the assigned value
   */
  function setValue (pointer, token, value) {
    if (pointer.value && typeof pointer.value === "object") {
      if (token === "-" && Array.isArray(pointer.value)) {
        pointer.value.push(value);
      }
      else {
        pointer.value[token] = value;
      }
    }
    else {
      throw ono.syntax('Error assigning $ref pointer "%s". \nCannot set "%s" of a non-object.', pointer.path, token);
    }
    return value;
  }

  var ref = $Ref;



  /**
   * This class represents a single JSON reference and its resolved value.
   *
   * @constructor
   */
  function $Ref () {
    /**
     * The file path or URL of the referenced file.
     * This path is relative to the path of the main JSON schema file.
     *
     * This path does NOT contain document fragments (JSON pointers). It always references an ENTIRE file.
     * Use methods such as {@link $Ref#get}, {@link $Ref#resolve}, and {@link $Ref#exists} to get
     * specific JSON pointers within the file.
     *
     * @type {string}
     */
    this.path = undefined;

    /**
     * The resolved value of the JSON reference.
     * Can be any JSON type, not just objects. Unknown file types are represented as Buffers (byte arrays).
     * @type {?*}
     */
    this.value = undefined;

    /**
     * The {@link $Refs} object that contains this {@link $Ref} object.
     * @type {$Refs}
     */
    this.$refs = undefined;

    /**
     * Indicates the type of {@link $Ref#path} (e.g. "file", "http", etc.)
     * @type {?string}
     */
    this.pathType = undefined;
  }

  /**
   * Determines whether the given JSON reference exists within this {@link $Ref#value}.
   *
   * @param {string} path - The full path being resolved, optionally with a JSON pointer in the hash
   * @param {$RefParserOptions} options
   * @returns {boolean}
   */
  $Ref.prototype.exists = function (path, options) {
    try {
      this.resolve(path, options);
      return true;
    }
    catch (e) {
      return false;
    }
  };

  /**
   * Resolves the given JSON reference within this {@link $Ref#value} and returns the resolved value.
   *
   * @param {string} path - The full path being resolved, optionally with a JSON pointer in the hash
   * @param {$RefParserOptions} options
   * @returns {*} - Returns the resolved value
   */
  $Ref.prototype.get = function (path, options) {
    return this.resolve(path, options).value;
  };

  /**
   * Resolves the given JSON reference within this {@link $Ref#value}.
   *
   * @param {string} path - The full path being resolved, optionally with a JSON pointer in the hash
   * @param {$RefParserOptions} options
   * @param {string} [friendlyPath] - The original user-specified path (used for error messages)
   * @returns {Pointer}
   */
  $Ref.prototype.resolve = function (path, options, friendlyPath) {
    var pointer$1 = new pointer(this, path, friendlyPath);
    return pointer$1.resolve(this.value, options);
  };

  /**
   * Sets the value of a nested property within this {@link $Ref#value}.
   * If the property, or any of its parents don't exist, they will be created.
   *
   * @param {string} path - The full path of the property to set, optionally with a JSON pointer in the hash
   * @param {*} value - The value to assign
   */
  $Ref.prototype.set = function (path, value) {
    var pointer$1 = new pointer(this, path);
    this.value = pointer$1.set(this.value, value);
  };

  /**
   * Determines whether the given value is a JSON reference.
   *
   * @param {*} value - The value to inspect
   * @returns {boolean}
   */
  $Ref.is$Ref = function (value) {
    return value && typeof value === "object" && typeof value.$ref === "string" && value.$ref.length > 0;
  };

  /**
   * Determines whether the given value is an external JSON reference.
   *
   * @param {*} value - The value to inspect
   * @returns {boolean}
   */
  $Ref.isExternal$Ref = function (value) {
    return $Ref.is$Ref(value) && value.$ref[0] !== "#";
  };

  /**
   * Determines whether the given value is a JSON reference, and whether it is allowed by the options.
   * For example, if it references an external file, then options.resolve.external must be true.
   *
   * @param {*} value - The value to inspect
   * @param {$RefParserOptions} options
   * @returns {boolean}
   */
  $Ref.isAllowed$Ref = function (value, options) {
    if ($Ref.is$Ref(value)) {
      if (value.$ref.substr(0, 2) === "#/" || value.$ref === "#") {
        // It's a JSON Pointer reference, which is always allowed
        return true;
      }
      else if (value.$ref[0] !== "#" && (!options || options.resolve.external)) {
        // It's an external reference, which is allowed by the options
        return true;
      }
    }
  };

  /**
   * Determines whether the given value is a JSON reference that "extends" its resolved value.
   * That is, it has extra properties (in addition to "$ref"), so rather than simply pointing to
   * an existing value, this $ref actually creates a NEW value that is a shallow copy of the resolved
   * value, plus the extra properties.
   *
   * @example:
   *  {
   *    person: {
   *      properties: {
   *        firstName: { type: string }
   *        lastName: { type: string }
   *      }
   *    }
   *    employee: {
   *      properties: {
   *        $ref: #/person/properties
   *        salary: { type: number }
   *      }
   *    }
   *  }
   *
   *  In this example, "employee" is an extended $ref, since it extends "person" with an additional
   *  property (salary).  The result is a NEW value that looks like this:
   *
   *  {
   *    properties: {
   *      firstName: { type: string }
   *      lastName: { type: string }
   *      salary: { type: number }
   *    }
   *  }
   *
   * @param {*} value - The value to inspect
   * @returns {boolean}
   */
  $Ref.isExtended$Ref = function (value) {
    return $Ref.is$Ref(value) && Object.keys(value).length > 1;
  };

  /**
   * Returns the resolved value of a JSON Reference.
   * If necessary, the resolved value is merged with the JSON Reference to create a new object
   *
   * @example:
   *  {
   *    person: {
   *      properties: {
   *        firstName: { type: string }
   *        lastName: { type: string }
   *      }
   *    }
   *    employee: {
   *      properties: {
   *        $ref: #/person/properties
   *        salary: { type: number }
   *      }
   *    }
   *  }
   *
   *  When "person" and "employee" are merged, you end up with the following object:
   *
   *  {
   *    properties: {
   *      firstName: { type: string }
   *      lastName: { type: string }
   *      salary: { type: number }
   *    }
   *  }
   *
   * @param {object} $ref - The JSON reference object (the one with the "$ref" property)
   * @param {*} resolvedValue - The resolved value, which can be any type
   * @returns {*} - Returns the dereferenced value
   */
  $Ref.dereference = function ($ref, resolvedValue) {
    if (resolvedValue && typeof resolvedValue === "object" && $Ref.isExtended$Ref($ref)) {
      var merged = {};
      Object.keys($ref).forEach(function (key) {
        if (key !== "$ref") {
          merged[key] = $ref[key];
        }
      });
      Object.keys(resolvedValue).forEach(function (key) {
        if (!(key in merged)) {
          merged[key] = resolvedValue[key];
        }
      });
      return merged;
    }
    else {
      // Completely replace the original reference with the resolved value
      return resolvedValue;
    }
  };

  var refs = $Refs;

  /**
   * This class is a map of JSON references and their resolved values.
   */
  function $Refs () {
    /**
     * Indicates whether the schema contains any circular references.
     *
     * @type {boolean}
     */
    this.circular = false;

    /**
     * A map of paths/urls to {@link $Ref} objects
     *
     * @type {object}
     * @protected
     */
    this._$refs = {};

    /**
     * The {@link $Ref} object that is the root of the JSON schema.
     *
     * @type {$Ref}
     * @protected
     */
    this._root$Ref = null;
  }

  /**
   * Returns the paths of all the files/URLs that are referenced by the JSON schema,
   * including the schema itself.
   *
   * @param {...string|string[]} [types] - Only return paths of the given types ("file", "http", etc.)
   * @returns {string[]}
   */
  $Refs.prototype.paths = function (types) {
    var paths = getPaths(this._$refs, arguments);
    return paths.map(function (path) {
      return path.decoded;
    });
  };

  /**
   * Returns the map of JSON references and their resolved values.
   *
   * @param {...string|string[]} [types] - Only return references of the given types ("file", "http", etc.)
   * @returns {object}
   */
  $Refs.prototype.values = function (types) {
    var $refs = this._$refs;
    var paths = getPaths($refs, arguments);
    return paths.reduce(function (obj, path) {
      obj[path.decoded] = $refs[path.encoded].value;
      return obj;
    }, {});
  };

  /**
   * Returns a POJO (plain old JavaScript object) for serialization as JSON.
   *
   * @returns {object}
   */
  $Refs.prototype.toJSON = $Refs.prototype.values;

  /**
   * Determines whether the given JSON reference exists.
   *
   * @param {string} path - The path being resolved, optionally with a JSON pointer in the hash
   * @param {$RefParserOptions} [options]
   * @returns {boolean}
   */
  $Refs.prototype.exists = function (path, options) {
    try {
      this._resolve(path, options);
      return true;
    }
    catch (e) {
      return false;
    }
  };

  /**
   * Resolves the given JSON reference and returns the resolved value.
   *
   * @param {string} path - The path being resolved, with a JSON pointer in the hash
   * @param {$RefParserOptions} [options]
   * @returns {*} - Returns the resolved value
   */
  $Refs.prototype.get = function (path, options) {
    return this._resolve(path, options).value;
  };

  /**
   * Sets the value of a nested property within this {@link $Ref#value}.
   * If the property, or any of its parents don't exist, they will be created.
   *
   * @param {string} path - The path of the property to set, optionally with a JSON pointer in the hash
   * @param {*} value - The value to assign
   */
  $Refs.prototype.set = function (path, value) {
    var absPath = url_1.resolve(this._root$Ref.path, path);
    var withoutHash = url_1.stripHash(absPath);
    var $ref = this._$refs[withoutHash];

    if (!$ref) {
      throw ono('Error resolving $ref pointer "%s". \n"%s" not found.', path, withoutHash);
    }

    $ref.set(absPath, value);
  };

  /**
   * Creates a new {@link $Ref} object and adds it to this {@link $Refs} object.
   *
   * @param {string} path  - The file path or URL of the referenced file
   */
  $Refs.prototype._add = function (path) {
    var withoutHash = url_1.stripHash(path);

    var $ref = new ref();
    $ref.path = withoutHash;
    $ref.$refs = this;

    this._$refs[withoutHash] = $ref;
    this._root$Ref = this._root$Ref || $ref;

    return $ref;
  };

  /**
   * Resolves the given JSON reference.
   *
   * @param {string} path - The path being resolved, optionally with a JSON pointer in the hash
   * @param {$RefParserOptions} [options]
   * @returns {Pointer}
   * @protected
   */
  $Refs.prototype._resolve = function (path, options) {
    var absPath = url_1.resolve(this._root$Ref.path, path);
    var withoutHash = url_1.stripHash(absPath);
    var $ref = this._$refs[withoutHash];

    if (!$ref) {
      throw ono('Error resolving $ref pointer "%s". \n"%s" not found.', path, withoutHash);
    }

    return $ref.resolve(absPath, options, path);
  };

  /**
   * Returns the specified {@link $Ref} object, or undefined.
   *
   * @param {string} path - The path being resolved, optionally with a JSON pointer in the hash
   * @returns {$Ref|undefined}
   * @protected
   */
  $Refs.prototype._get$Ref = function (path) {
    path = url_1.resolve(this._root$Ref.path, path);
    var withoutHash = url_1.stripHash(path);
    return this._$refs[withoutHash];
  };

  /**
   * Returns the encoded and decoded paths keys of the given object.
   *
   * @param {object} $refs - The object whose keys are URL-encoded paths
   * @param {...string|string[]} [types] - Only return paths of the given types ("file", "http", etc.)
   * @returns {object[]}
   */
  function getPaths ($refs, types) {
    var paths = Object.keys($refs);

    // Filter the paths by type
    types = Array.isArray(types[0]) ? types[0] : Array.prototype.slice.call(types);
    if (types.length > 0 && types[0]) {
      paths = paths.filter(function (key) {
        return types.indexOf($refs[key].pathType) !== -1;
      });
    }

    // Decode local filesystem paths
    return paths.map(function (path) {
      return {
        encoded: path,
        decoded: $refs[path].pathType === "file" ? url_1.toFileSystemPath(path, true) : path
      };
    });
  }

  /**
   * Returns the given plugins as an array, rather than an object map.
   * All other methods in this module expect an array of plugins rather than an object map.
   *
   * @param  {object} plugins - A map of plugin objects
   * @return {object[]}
   */
  var all = function (plugins) {
    return Object.keys(plugins)
      .filter(function (key) {
        return typeof plugins[key] === "object";
      })
      .map(function (key) {
        plugins[key].name = key;
        return plugins[key];
      });
  };

  /**
   * Filters the given plugins, returning only the ones return `true` for the given method.
   *
   * @param  {object[]} plugins - An array of plugin objects
   * @param  {string}   method  - The name of the filter method to invoke for each plugin
   * @param  {object}   file    - A file info object, which will be passed to each method
   * @return {object[]}
   */
  var filter = function (plugins, method, file) {
    return plugins
      .filter(function (plugin) {
        return !!getResult(plugin, method, file);
      });
  };

  /**
   * Sorts the given plugins, in place, by their `order` property.
   *
   * @param {object[]} plugins - An array of plugin objects
   * @returns {object[]}
   */
  var sort = function (plugins) {
    plugins.forEach(function (plugin) {
      plugin.order = plugin.order || Number.MAX_SAFE_INTEGER;
    });

    return plugins.sort(function (a, b) { return a.order - b.order; });
  };

  /**
   * Runs the specified method of the given plugins, in order, until one of them returns a successful result.
   * Each method can return a synchronous value, a Promise, or call an error-first callback.
   * If the promise resolves successfully, or the callback is called without an error, then the result
   * is immediately returned and no further plugins are called.
   * If the promise rejects, or the callback is called with an error, then the next plugin is called.
   * If ALL plugins fail, then the last error is thrown.
   *
   * @param {object[]}  plugins - An array of plugin objects
   * @param {string}    method  - The name of the method to invoke for each plugin
   * @param {object}    file    - A file info object, which will be passed to each method
   * @returns {Promise}
   */
  var run = function (plugins, method, file) {
    var plugin, lastError, index = 0;

    return new Promise(function (resolve, reject) {
      runNextPlugin();

      function runNextPlugin () {
        plugin = plugins[index++];
        if (!plugin) {
          // There are no more functions, so re-throw the last error
          return reject(lastError);
        }

        try {
          // console.log('  %s', plugin.name);
          var result = getResult(plugin, method, file, callback);
          if (result && typeof result.then === "function") {
            // A promise was returned
            result.then(onSuccess, onError);
          }
          else if (result !== undefined) {
            // A synchronous result was returned
            onSuccess(result);
          }
          // else { the callback will be called }
        }
        catch (e) {
          onError(e);
        }
      }

      function callback (err, result) {
        if (err) {
          onError(err);
        }
        else {
          onSuccess(result);
        }
      }

      function onSuccess (result) {
        // console.log('    success');
        resolve({
          plugin: plugin,
          result: result
        });
      }

      function onError (err) {
        // console.log('    %s', err.message || err);
        lastError = err;
        runNextPlugin();
      }
    });
  };

  /**
   * Returns the value of the given property.
   * If the property is a function, then the result of the function is returned.
   * If the value is a RegExp, then it will be tested against the file URL.
   * If the value is an aray, then it will be compared against the file extension.
   *
   * @param   {object}   obj        - The object whose property/method is called
   * @param   {string}   prop       - The name of the property/method to invoke
   * @param   {object}   file       - A file info object, which will be passed to the method
   * @param   {function} [callback] - A callback function, which will be passed to the method
   * @returns {*}
   */
  function getResult (obj, prop, file, callback) {
    var value = obj[prop];

    if (typeof value === "function") {
      return value.apply(obj, [file, callback]);
    }

    if (!callback) {
      // The synchronous plugin functions (canParse and canRead)
      // allow a "shorthand" syntax, where the user can match
      // files by RegExp or by file extension.
      if (value instanceof RegExp) {
        return value.test(file.url);
      }
      else if (typeof value === "string") {
        return value === file.extension;
      }
      else if (Array.isArray(value)) {
        return value.indexOf(file.extension) !== -1;
      }
    }

    return value;
  }

  var plugins = {
  	all: all,
  	filter: filter,
  	sort: sort,
  	run: run
  };

  var parse_1 = parse$1;

  /**
   * Reads and parses the specified file path or URL.
   *
   * @param {string} path - This path MUST already be resolved, since `read` doesn't know the resolution context
   * @param {$Refs} $refs
   * @param {$RefParserOptions} options
   *
   * @returns {Promise}
   * The promise resolves with the parsed file contents, NOT the raw (Buffer) contents.
   */
  function parse$1 (path, $refs, options) {
    try {
      // Remove the URL fragment, if any
      path = url_1.stripHash(path);

      // Add a new $Ref for this file, even though we don't have the value yet.
      // This ensures that we don't simultaneously read & parse the same file multiple times
      var $ref = $refs._add(path);

      // This "file object" will be passed to all resolvers and parsers.
      var file = {
        url: path,
        extension: url_1.getExtension(path),
      };

      // Read the file and then parse the data
      return readFile(file, options)
        .then(function (resolver) {
          $ref.pathType = resolver.plugin.name;
          file.data = resolver.result;
          return parseFile(file, options);
        })
        .then(function (parser) {
          $ref.value = parser.result;
          return parser.result;
        });
    }
    catch (e) {
      return Promise.reject(e);
    }
  }

  /**
   * Reads the given file, using the configured resolver plugins
   *
   * @param {object} file           - An object containing information about the referenced file
   * @param {string} file.url       - The full URL of the referenced file
   * @param {string} file.extension - The lowercased file extension (e.g. ".txt", ".html", etc.)
   * @param {$RefParserOptions} options
   *
   * @returns {Promise}
   * The promise resolves with the raw file contents and the resolver that was used.
   */
  function readFile (file, options) {
    return new Promise(function (resolve, reject) {
      // console.log('Reading %s', file.url);

      // Find the resolvers that can read this file
      var resolvers = plugins.all(options.resolve);
      resolvers = plugins.filter(resolvers, "canRead", file);

      // Run the resolvers, in order, until one of them succeeds
      plugins.sort(resolvers);
      plugins.run(resolvers, "read", file)
        .then(resolve, onError);

      function onError (err) {
        // Throw the original error, if it's one of our own (user-friendly) errors.
        // Otherwise, throw a generic, friendly error.
        if (err && !(err instanceof SyntaxError)) {
          reject(err);
        }
        else {
          reject(ono.syntax('Unable to resolve $ref pointer "%s"', file.url));
        }
      }
    });
  }

  /**
   * Parses the given file's contents, using the configured parser plugins.
   *
   * @param {object} file           - An object containing information about the referenced file
   * @param {string} file.url       - The full URL of the referenced file
   * @param {string} file.extension - The lowercased file extension (e.g. ".txt", ".html", etc.)
   * @param {*}      file.data      - The file contents. This will be whatever data type was returned by the resolver
   * @param {$RefParserOptions} options
   *
   * @returns {Promise}
   * The promise resolves with the parsed file contents and the parser that was used.
   */
  function parseFile (file, options) {
    return new Promise(function (resolve, reject) {
      // console.log('Parsing %s', file.url);

      // Find the parsers that can read this file type.
      // If none of the parsers are an exact match for this file, then we'll try ALL of them.
      // This handles situations where the file IS a supported type, just with an unknown extension.
      var allParsers = plugins.all(options.parse);
      var filteredParsers = plugins.filter(allParsers, "canParse", file);
      var parsers = filteredParsers.length > 0 ? filteredParsers : allParsers;

      // Run the parsers, in order, until one of them succeeds
      plugins.sort(parsers);
      plugins.run(parsers, "parse", file)
        .then(onParsed, onError);

      function onParsed (parser) {
        if (!parser.plugin.allowEmpty && isEmpty(parser.result)) {
          reject(ono.syntax('Error parsing "%s" as %s. \nParsed value is empty', file.url, parser.plugin.name));
        }
        else {
          resolve(parser);
        }
      }

      function onError (err) {
        if (err) {
          err = err instanceof Error ? err : new Error(err);
          reject(ono.syntax(err, "Error parsing %s", file.url));
        }
        else {
          reject(ono.syntax("Unable to parse %s", file.url));
        }
      }
    });
  }

  /**
   * Determines whether the parsed value is "empty".
   *
   * @param {*} value
   * @returns {boolean}
   */
  function isEmpty (value) {
    return value === undefined ||
      (typeof value === "object" && Object.keys(value).length === 0) ||
      (typeof value === "string" && value.trim().length === 0) ||
      (Buffer.isBuffer(value) && value.length === 0);
  }

  var normalizeArgs_1 = normalizeArgs;

  /**
   * Normalizes the given arguments, accounting for optional args.
   *
   * @param {Arguments} args
   * @returns {object}
   */
  function normalizeArgs (args) {
    var path, schema, options$1, callback;
    args = Array.prototype.slice.call(args);

    if (typeof args[args.length - 1] === "function") {
      // The last parameter is a callback function
      callback = args.pop();
    }

    if (typeof args[0] === "string") {
      // The first parameter is the path
      path = args[0];
      if (typeof args[2] === "object") {
        // The second parameter is the schema, and the third parameter is the options
        schema = args[1];
        options$1 = args[2];
      }
      else {
        // The second parameter is the options
        schema = undefined;
        options$1 = args[1];
      }
    }
    else {
      // The first parameter is the schema
      path = "";
      schema = args[0];
      options$1 = args[1];
    }

    if (!(options$1 instanceof options)) {
      options$1 = new options(options$1);
    }

    return {
      path: path,
      schema: schema,
      options: options$1,
      callback: callback
    };
  }

  var resolveExternal_1 = resolveExternal;

  /**
   * Crawls the JSON schema, finds all external JSON references, and resolves their values.
   * This method does not mutate the JSON schema. The resolved values are added to {@link $RefParser#$refs}.
   *
   * NOTE: We only care about EXTERNAL references here. INTERNAL references are only relevant when dereferencing.
   *
   * @param {$RefParser} parser
   * @param {$RefParserOptions} options
   *
   * @returns {Promise}
   * The promise resolves once all JSON references in the schema have been resolved,
   * including nested references that are contained in externally-referenced files.
   */
  function resolveExternal (parser, options) {
    if (!options.resolve.external) {
      // Nothing to resolve, so exit early
      return Promise.resolve();
    }

    try {
      // console.log('Resolving $ref pointers in %s', parser.$refs._root$Ref.path);
      var promises = crawl(parser.schema, parser.$refs._root$Ref.path + "#", parser.$refs, options);
      return Promise.all(promises);
    }
    catch (e) {
      return Promise.reject(e);
    }
  }

  /**
   * Recursively crawls the given value, and resolves any external JSON references.
   *
   * @param {*} obj - The value to crawl. If it's not an object or array, it will be ignored.
   * @param {string} path - The full path of `obj`, possibly with a JSON Pointer in the hash
   * @param {$Refs} $refs
   * @param {$RefParserOptions} options
   *
   * @returns {Promise[]}
   * Returns an array of promises. There will be one promise for each JSON reference in `obj`.
   * If `obj` does not contain any JSON references, then the array will be empty.
   * If any of the JSON references point to files that contain additional JSON references,
   * then the corresponding promise will internally reference an array of promises.
   */
  function crawl (obj, path, $refs, options) {
    var promises = [];

    if (obj && typeof obj === "object") {
      if (ref.isExternal$Ref(obj)) {
        promises.push(resolve$Ref(obj, path, $refs, options));
      }
      else {
        Object.keys(obj).forEach(function (key) {
          var keyPath = pointer.join(path, key);
          var value = obj[key];

          if (ref.isExternal$Ref(value)) {
            promises.push(resolve$Ref(value, keyPath, $refs, options));
          }
          else {
            promises = promises.concat(crawl(value, keyPath, $refs, options));
          }
        });
      }
    }

    return promises;
  }

  /**
   * Resolves the given JSON Reference, and then crawls the resulting value.
   *
   * @param {{$ref: string}} $ref - The JSON Reference to resolve
   * @param {string} path - The full path of `$ref`, possibly with a JSON Pointer in the hash
   * @param {$Refs} $refs
   * @param {$RefParserOptions} options
   *
   * @returns {Promise}
   * The promise resolves once all JSON references in the object have been resolved,
   * including nested references that are contained in externally-referenced files.
   */
  function resolve$Ref ($ref, path, $refs, options) {
    // console.log('Resolving $ref pointer "%s" at %s', $ref.$ref, path);

    var resolvedPath = url_1.resolve(path, $ref.$ref);
    var withoutHash = url_1.stripHash(resolvedPath);

    // Do we already have this $ref?
    $ref = $refs._$refs[withoutHash];
    if ($ref) {
      // We've already parsed this $ref, so use the existing value
      return Promise.resolve($ref.value);
    }

    // Parse the $referenced file/url
    return parse_1(resolvedPath, $refs, options)
      .then(function (result) {
        // Crawl the parsed value
        // console.log('Resolving $ref pointers in %s', withoutHash);
        var promises = crawl(result, withoutHash + "#", $refs, options);
        return Promise.all(promises);
      });
  }

  var bundle_1 = bundle;

  /**
   * Bundles all external JSON references into the main JSON schema, thus resulting in a schema that
   * only has *internal* references, not any *external* references.
   * This method mutates the JSON schema object, adding new references and re-mapping existing ones.
   *
   * @param {$RefParser} parser
   * @param {$RefParserOptions} options
   */
  function bundle (parser, options) {
    // console.log('Bundling $ref pointers in %s', parser.$refs._root$Ref.path);

    // Build an inventory of all $ref pointers in the JSON Schema
    var inventory = [];
    crawl$1(parser, "schema", parser.$refs._root$Ref.path + "#", "#", 0, inventory, parser.$refs, options);

    // Remap all $ref pointers
    remap(inventory);
  }

  /**
   * Recursively crawls the given value, and inventories all JSON references.
   *
   * @param {object} parent - The object containing the value to crawl. If the value is not an object or array, it will be ignored.
   * @param {string} key - The property key of `parent` to be crawled
   * @param {string} path - The full path of the property being crawled, possibly with a JSON Pointer in the hash
   * @param {string} pathFromRoot - The path of the property being crawled, from the schema root
   * @param {object[]} inventory - An array of already-inventoried $ref pointers
   * @param {$Refs} $refs
   * @param {$RefParserOptions} options
   */
  function crawl$1 (parent, key, path, pathFromRoot, indirections, inventory, $refs, options) {
    var obj = key === null ? parent : parent[key];

    if (obj && typeof obj === "object") {
      if (ref.isAllowed$Ref(obj)) {
        inventory$Ref(parent, key, path, pathFromRoot, indirections, inventory, $refs, options);
      }
      else {
        // Crawl the object in a specific order that's optimized for bundling.
        // This is important because it determines how `pathFromRoot` gets built,
        // which later determines which keys get dereferenced and which ones get remapped
        var keys = Object.keys(obj)
          .sort(function (a, b) {
            // Most people will expect references to be bundled into the the "definitions" property,
            // so we always crawl that property first, if it exists.
            if (a === "definitions") {
              return -1;
            }
            else if (b === "definitions") {
              return 1;
            }
            else {
              // Otherwise, crawl the keys based on their length.
              // This produces the shortest possible bundled references
              return a.length - b.length;
            }
          });

        keys.forEach(function (key) {
          var keyPath = pointer.join(path, key);
          var keyPathFromRoot = pointer.join(pathFromRoot, key);
          var value = obj[key];

          if (ref.isAllowed$Ref(value)) {
            inventory$Ref(obj, key, path, keyPathFromRoot, indirections, inventory, $refs, options);
          }
          else {
            crawl$1(obj, key, keyPath, keyPathFromRoot, indirections, inventory, $refs, options);
          }
        });
      }
    }
  }

  /**
   * Inventories the given JSON Reference (i.e. records detailed information about it so we can
   * optimize all $refs in the schema), and then crawls the resolved value.
   *
   * @param {object} $refParent - The object that contains a JSON Reference as one of its keys
   * @param {string} $refKey - The key in `$refParent` that is a JSON Reference
   * @param {string} path - The full path of the JSON Reference at `$refKey`, possibly with a JSON Pointer in the hash
   * @param {string} pathFromRoot - The path of the JSON Reference at `$refKey`, from the schema root
   * @param {object[]} inventory - An array of already-inventoried $ref pointers
   * @param {$Refs} $refs
   * @param {$RefParserOptions} options
   */
  function inventory$Ref ($refParent, $refKey, path, pathFromRoot, indirections, inventory, $refs, options) {
    var $ref = $refKey === null ? $refParent : $refParent[$refKey];
    var $refPath = url_1.resolve(path, $ref.$ref);
    var pointer$1 = $refs._resolve($refPath, options);
    var depth = pointer.parse(pathFromRoot).length;
    var file = url_1.stripHash(pointer$1.path);
    var hash = url_1.getHash(pointer$1.path);
    var external = file !== $refs._root$Ref.path;
    var extended = ref.isExtended$Ref($ref);
    indirections += pointer$1.indirections;

    var existingEntry = findInInventory(inventory, $refParent, $refKey);
    if (existingEntry) {
      // This $Ref has already been inventoried, so we don't need to process it again
      if (depth < existingEntry.depth || indirections < existingEntry.indirections) {
        removeFromInventory(inventory, existingEntry);
      }
      else {
        return;
      }
    }

    inventory.push({
      $ref: $ref,                   // The JSON Reference (e.g. {$ref: string})
      parent: $refParent,           // The object that contains this $ref pointer
      key: $refKey,                 // The key in `parent` that is the $ref pointer
      pathFromRoot: pathFromRoot,   // The path to the $ref pointer, from the JSON Schema root
      depth: depth,                 // How far from the JSON Schema root is this $ref pointer?
      file: file,                   // The file that the $ref pointer resolves to
      hash: hash,                   // The hash within `file` that the $ref pointer resolves to
      value: pointer$1.value,         // The resolved value of the $ref pointer
      circular: pointer$1.circular,   // Is this $ref pointer DIRECTLY circular? (i.e. it references itself)
      extended: extended,           // Does this $ref extend its resolved value? (i.e. it has extra properties, in addition to "$ref")
      external: external,           // Does this $ref pointer point to a file other than the main JSON Schema file?
      indirections: indirections,   // The number of indirect references that were traversed to resolve the value
    });

    // Recursively crawl the resolved value
    crawl$1(pointer$1.value, null, pointer$1.path, pathFromRoot, indirections + 1, inventory, $refs, options);
  }

  /**
   * Re-maps every $ref pointer, so that they're all relative to the root of the JSON Schema.
   * Each referenced value is dereferenced EXACTLY ONCE.  All subsequent references to the same
   * value are re-mapped to point to the first reference.
   *
   * @example:
   *  {
   *    first: { $ref: somefile.json#/some/part },
   *    second: { $ref: somefile.json#/another/part },
   *    third: { $ref: somefile.json },
   *    fourth: { $ref: somefile.json#/some/part/sub/part }
   *  }
   *
   * In this example, there are four references to the same file, but since the third reference points
   * to the ENTIRE file, that's the only one we need to dereference.  The other three can just be
   * remapped to point inside the third one.
   *
   * On the other hand, if the third reference DIDN'T exist, then the first and second would both need
   * to be dereferenced, since they point to different parts of the file. The fourth reference does NOT
   * need to be dereferenced, because it can be remapped to point inside the first one.
   *
   * @param {object[]} inventory
   */
  function remap (inventory) {
    // Group & sort all the $ref pointers, so they're in the order that we need to dereference/remap them
    inventory.sort(function (a, b) {
      if (a.file !== b.file) {
        // Group all the $refs that point to the same file
        return a.file < b.file ? -1 : +1;
      }
      else if (a.hash !== b.hash) {
        // Group all the $refs that point to the same part of the file
        return a.hash < b.hash ? -1 : +1;
      }
      else if (a.circular !== b.circular) {
        // If the $ref points to itself, then sort it higher than other $refs that point to this $ref
        return a.circular ? -1 : +1;
      }
      else if (a.extended !== b.extended) {
        // If the $ref extends the resolved value, then sort it lower than other $refs that don't extend the value
        return a.extended ? +1 : -1;
      }
      else if (a.indirections !== b.indirections) {
        // Sort direct references higher than indirect references
        return a.indirections - b.indirections;
      }
      else if (a.depth !== b.depth) {
        // Sort $refs by how close they are to the JSON Schema root
        return a.depth - b.depth;
      }
      else {
        // Determine how far each $ref is from the "definitions" property.
        // Most people will expect references to be bundled into the the "definitions" property if possible.
        var aDefinitionsIndex = a.pathFromRoot.lastIndexOf("/definitions");
        var bDefinitionsIndex = b.pathFromRoot.lastIndexOf("/definitions");

        if (aDefinitionsIndex !== bDefinitionsIndex) {
          // Give higher priority to the $ref that's closer to the "definitions" property
          return bDefinitionsIndex - aDefinitionsIndex;
        }
        else {
          // All else is equal, so use the shorter path, which will produce the shortest possible reference
          return a.pathFromRoot.length - b.pathFromRoot.length;
        }
      }
    });

    var file, hash, pathFromRoot;
    inventory.forEach(function (entry) {
      // console.log('Re-mapping $ref pointer "%s" at %s', entry.$ref.$ref, entry.pathFromRoot);

      if (!entry.external) {
        // This $ref already resolves to the main JSON Schema file
        entry.$ref.$ref = entry.hash;
      }
      else if (entry.file === file && entry.hash === hash) {
        // This $ref points to the same value as the prevous $ref, so remap it to the same path
        entry.$ref.$ref = pathFromRoot;
      }
      else if (entry.file === file && entry.hash.indexOf(hash + "/") === 0) {
        // This $ref points to a sub-value of the prevous $ref, so remap it beneath that path
        entry.$ref.$ref = pointer.join(pathFromRoot, pointer.parse(entry.hash.replace(hash, "#")));
      }
      else {
        // We've moved to a new file or new hash
        file = entry.file;
        hash = entry.hash;
        pathFromRoot = entry.pathFromRoot;

        // This is the first $ref to point to this value, so dereference the value.
        // Any other $refs that point to the same value will point to this $ref instead
        entry.$ref = entry.parent[entry.key] = ref.dereference(entry.$ref, entry.value);

        if (entry.circular) {
          // This $ref points to itself
          entry.$ref.$ref = entry.pathFromRoot;
        }
      }

      // console.log('    new value: %s', (entry.$ref && entry.$ref.$ref) ? entry.$ref.$ref : '[object Object]');
    });
  }

  /**
   * TODO
   */
  function findInInventory (inventory, $refParent, $refKey) {
    for (var i = 0; i < inventory.length; i++) {
      var existingEntry = inventory[i];
      if (existingEntry.parent === $refParent && existingEntry.key === $refKey) {
        return existingEntry;
      }
    }
  }

  function removeFromInventory (inventory, entry) {
    var index = inventory.indexOf(entry);
    inventory.splice(index, 1);
  }

  var dereference_1 = dereference;

  /**
   * Crawls the JSON schema, finds all JSON references, and dereferences them.
   * This method mutates the JSON schema object, replacing JSON references with their resolved value.
   *
   * @param {$RefParser} parser
   * @param {$RefParserOptions} options
   */
  function dereference (parser, options) {
    // console.log('Dereferencing $ref pointers in %s', parser.$refs._root$Ref.path);
    var dereferenced = crawl$2(parser.schema, parser.$refs._root$Ref.path, "#", [], parser.$refs, options);
    parser.$refs.circular = dereferenced.circular;
    parser.schema = dereferenced.value;
  }

  /**
   * Recursively crawls the given value, and dereferences any JSON references.
   *
   * @param {*} obj - The value to crawl. If it's not an object or array, it will be ignored.
   * @param {string} path - The full path of `obj`, possibly with a JSON Pointer in the hash
   * @param {string} pathFromRoot - The path of `obj` from the schema root
   * @param {object[]} parents - An array of the parent objects that have already been dereferenced
   * @param {$Refs} $refs
   * @param {$RefParserOptions} options
   * @returns {{value: object, circular: boolean}}
   */
  function crawl$2 (obj, path, pathFromRoot, parents, $refs, options) {
    var dereferenced;
    var result = {
      value: obj,
      circular: false
    };

    if (obj && typeof obj === "object") {
      parents.push(obj);

      if (ref.isAllowed$Ref(obj, options)) {
        dereferenced = dereference$Ref(obj, path, pathFromRoot, parents, $refs, options);
        result.circular = dereferenced.circular;
        result.value = dereferenced.value;
      }
      else {
        Object.keys(obj).forEach(function (key) {
          var keyPath = pointer.join(path, key);
          var keyPathFromRoot = pointer.join(pathFromRoot, key);
          var value = obj[key];
          var circular = false;

          if (ref.isAllowed$Ref(value, options)) {
            dereferenced = dereference$Ref(value, keyPath, keyPathFromRoot, parents, $refs, options);
            circular = dereferenced.circular;
            obj[key] = dereferenced.value;
          }
          else {
            if (parents.indexOf(value) === -1) {
              dereferenced = crawl$2(value, keyPath, keyPathFromRoot, parents, $refs, options);
              circular = dereferenced.circular;
              obj[key] = dereferenced.value;
            }
            else {
              circular = foundCircularReference(keyPath, $refs, options);
            }
          }

          // Set the "isCircular" flag if this or any other property is circular
          result.circular = result.circular || circular;
        });
      }

      parents.pop();
    }

    return result;
  }

  /**
   * Dereferences the given JSON Reference, and then crawls the resulting value.
   *
   * @param {{$ref: string}} $ref - The JSON Reference to resolve
   * @param {string} path - The full path of `$ref`, possibly with a JSON Pointer in the hash
   * @param {string} pathFromRoot - The path of `$ref` from the schema root
   * @param {object[]} parents - An array of the parent objects that have already been dereferenced
   * @param {$Refs} $refs
   * @param {$RefParserOptions} options
   * @returns {{value: object, circular: boolean}}
   */
  function dereference$Ref ($ref, path, pathFromRoot, parents, $refs, options) {
    // console.log('Dereferencing $ref pointer "%s" at %s', $ref.$ref, path);

    var $refPath = url_1.resolve(path, $ref.$ref);
    var pointer = $refs._resolve($refPath, options);

    // Check for circular references
    var directCircular = pointer.circular;
    var circular = directCircular || parents.indexOf(pointer.value) !== -1;
    circular && foundCircularReference(path, $refs, options);

    // Dereference the JSON reference
    var dereferencedValue = ref.dereference($ref, pointer.value);

    // Crawl the dereferenced value (unless it's circular)
    if (!circular) {
      // Determine if the dereferenced value is circular
      var dereferenced = crawl$2(dereferencedValue, pointer.path, pathFromRoot, parents, $refs, options);
      circular = dereferenced.circular;
      dereferencedValue = dereferenced.value;
    }

    if (circular && !directCircular && options.dereference.circular === "ignore") {
      // The user has chosen to "ignore" circular references, so don't change the value
      dereferencedValue = $ref;
    }

    if (directCircular) {
      // The pointer is a DIRECT circular reference (i.e. it references itself).
      // So replace the $ref path with the absolute path from the JSON Schema root
      dereferencedValue.$ref = pathFromRoot;
    }

    return {
      circular: circular,
      value: dereferencedValue
    };
  }

  /**
   * Called when a circular reference is found.
   * It sets the {@link $Refs#circular} flag, and throws an error if options.dereference.circular is false.
   *
   * @param {string} keyPath - The JSON Reference path of the circular reference
   * @param {$Refs} $refs
   * @param {$RefParserOptions} options
   * @returns {boolean} - always returns true, to indicate that a circular reference was found
   */
  function foundCircularReference (keyPath, $refs, options) {
    $refs.circular = true;
    if (!options.dereference.circular) {
      throw ono.reference("Circular $ref pointer found at %s", keyPath);
    }
    return true;
  }

  var next = (commonjsGlobal.process && process.nextTick) || commonjsGlobal.setImmediate || function (f) {
    setTimeout(f, 0);
  };

  var callMeMaybe = function maybe (cb, promise) {
    if (cb) {
      promise
        .then(function (result) {
          next(function () { cb(null, result); });
        }, function (err) {
          next(function () { cb(err); });
        });
      return undefined
    }
    else {
      return promise
    }
  };

  var lib = $RefParser;
  var YAML = yaml_1;

  /**
   * This class parses a JSON schema, builds a map of its JSON references and their resolved values,
   * and provides methods for traversing, manipulating, and dereferencing those references.
   *
   * @constructor
   */
  function $RefParser () {
    /**
     * The parsed (and possibly dereferenced) JSON schema object
     *
     * @type {object}
     * @readonly
     */
    this.schema = null;

    /**
     * The resolved JSON references
     *
     * @type {$Refs}
     * @readonly
     */
    this.$refs = new refs();
  }

  /**
   * Parses the given JSON schema.
   * This method does not resolve any JSON references.
   * It just reads a single file in JSON or YAML format, and parse it as a JavaScript object.
   *
   * @param {string} [path] - The file path or URL of the JSON schema
   * @param {object} [schema] - A JSON schema object. This object will be used instead of reading from `path`.
   * @param {$RefParserOptions} [options] - Options that determine how the schema is parsed
   * @param {function} [callback] - An error-first callback. The second parameter is the parsed JSON schema object.
   * @returns {Promise} - The returned promise resolves with the parsed JSON schema object.
   */
  $RefParser.parse = function (path, schema, options, callback) {
    var Class = this; // eslint-disable-line consistent-this
    var instance = new Class();
    return instance.parse.apply(instance, arguments);
  };

  /**
   * Parses the given JSON schema.
   * This method does not resolve any JSON references.
   * It just reads a single file in JSON or YAML format, and parse it as a JavaScript object.
   *
   * @param {string} [path] - The file path or URL of the JSON schema
   * @param {object} [schema] - A JSON schema object. This object will be used instead of reading from `path`.
   * @param {$RefParserOptions} [options] - Options that determine how the schema is parsed
   * @param {function} [callback] - An error-first callback. The second parameter is the parsed JSON schema object.
   * @returns {Promise} - The returned promise resolves with the parsed JSON schema object.
   */
  $RefParser.prototype.parse = function (path, schema, options, callback) {
    var args = normalizeArgs_1(arguments);
    var promise;

    if (!args.path && !args.schema) {
      var err = ono("Expected a file path, URL, or object. Got %s", args.path || args.schema);
      return callMeMaybe(args.callback, Promise.reject(err));
    }

    // Reset everything
    this.schema = null;
    this.$refs = new refs();

    // If the path is a filesystem path, then convert it to a URL.
    // NOTE: According to the JSON Reference spec, these should already be URLs,
    // but, in practice, many people use local filesystem paths instead.
    // So we're being generous here and doing the conversion automatically.
    // This is not intended to be a 100% bulletproof solution.
    // If it doesn't work for your use-case, then use a URL instead.
    var pathType = "http";
    if (url_1.isFileSystemPath(args.path)) {
      args.path = url_1.fromFileSystemPath(args.path);
      pathType = "file";
    }

    // Resolve the absolute path of the schema
    args.path = url_1.resolve(url_1.cwd(), args.path);

    if (args.schema && typeof args.schema === "object") {
      // A schema object was passed-in.
      // So immediately add a new $Ref with the schema object as its value
      var $ref = this.$refs._add(args.path);
      $ref.value = args.schema;
      $ref.pathType = pathType;
      promise = Promise.resolve(args.schema);
    }
    else {
      // Parse the schema file/url
      promise = parse_1(args.path, this.$refs, args.options);
    }

    var me = this;
    return promise
      .then(function (result) {
        if (!result || typeof result !== "object" || Buffer.isBuffer(result)) {
          throw ono.syntax('"%s" is not a valid JSON Schema', me.$refs._root$Ref.path || result);
        }
        else {
          me.schema = result;
          return callMeMaybe(args.callback, Promise.resolve(me.schema));
        }
      })
      .catch(function (e) {
        return callMeMaybe(args.callback, Promise.reject(e));
      });
  };

  /**
   * Parses the given JSON schema and resolves any JSON references, including references in
   * externally-referenced files.
   *
   * @param {string} [path] - The file path or URL of the JSON schema
   * @param {object} [schema] - A JSON schema object. This object will be used instead of reading from `path`.
   * @param {$RefParserOptions} [options] - Options that determine how the schema is parsed and resolved
   * @param {function} [callback]
   * - An error-first callback. The second parameter is a {@link $Refs} object containing the resolved JSON references
   *
   * @returns {Promise}
   * The returned promise resolves with a {@link $Refs} object containing the resolved JSON references
   */
  $RefParser.resolve = function (path, schema, options, callback) {
    var Class = this; // eslint-disable-line consistent-this
    var instance = new Class();
    return instance.resolve.apply(instance, arguments);
  };

  /**
   * Parses the given JSON schema and resolves any JSON references, including references in
   * externally-referenced files.
   *
   * @param {string} [path] - The file path or URL of the JSON schema
   * @param {object} [schema] - A JSON schema object. This object will be used instead of reading from `path`.
   * @param {$RefParserOptions} [options] - Options that determine how the schema is parsed and resolved
   * @param {function} [callback]
   * - An error-first callback. The second parameter is a {@link $Refs} object containing the resolved JSON references
   *
   * @returns {Promise}
   * The returned promise resolves with a {@link $Refs} object containing the resolved JSON references
   */
  $RefParser.prototype.resolve = function (path, schema, options, callback) {
    var me = this;
    var args = normalizeArgs_1(arguments);

    return this.parse(args.path, args.schema, args.options)
      .then(function () {
        return resolveExternal_1(me, args.options);
      })
      .then(function () {
        return callMeMaybe(args.callback, Promise.resolve(me.$refs));
      })
      .catch(function (err) {
        return callMeMaybe(args.callback, Promise.reject(err));
      });
  };

  /**
   * Parses the given JSON schema, resolves any JSON references, and bundles all external references
   * into the main JSON schema. This produces a JSON schema that only has *internal* references,
   * not any *external* references.
   *
   * @param {string} [path] - The file path or URL of the JSON schema
   * @param {object} [schema] - A JSON schema object. This object will be used instead of reading from `path`.
   * @param {$RefParserOptions} [options] - Options that determine how the schema is parsed, resolved, and dereferenced
   * @param {function} [callback] - An error-first callback. The second parameter is the bundled JSON schema object
   * @returns {Promise} - The returned promise resolves with the bundled JSON schema object.
   */
  $RefParser.bundle = function (path, schema, options, callback) {
    var Class = this; // eslint-disable-line consistent-this
    var instance = new Class();
    return instance.bundle.apply(instance, arguments);
  };

  /**
   * Parses the given JSON schema, resolves any JSON references, and bundles all external references
   * into the main JSON schema. This produces a JSON schema that only has *internal* references,
   * not any *external* references.
   *
   * @param {string} [path] - The file path or URL of the JSON schema
   * @param {object} [schema] - A JSON schema object. This object will be used instead of reading from `path`.
   * @param {$RefParserOptions} [options] - Options that determine how the schema is parsed, resolved, and dereferenced
   * @param {function} [callback] - An error-first callback. The second parameter is the bundled JSON schema object
   * @returns {Promise} - The returned promise resolves with the bundled JSON schema object.
   */
  $RefParser.prototype.bundle = function (path, schema, options, callback) {
    var me = this;
    var args = normalizeArgs_1(arguments);

    return this.resolve(args.path, args.schema, args.options)
      .then(function () {
        bundle_1(me, args.options);
        return callMeMaybe(args.callback, Promise.resolve(me.schema));
      })
      .catch(function (err) {
        return callMeMaybe(args.callback, Promise.reject(err));
      });
  };

  /**
   * Parses the given JSON schema, resolves any JSON references, and dereferences the JSON schema.
   * That is, all JSON references are replaced with their resolved values.
   *
   * @param {string} [path] - The file path or URL of the JSON schema
   * @param {object} [schema] - A JSON schema object. This object will be used instead of reading from `path`.
   * @param {$RefParserOptions} [options] - Options that determine how the schema is parsed, resolved, and dereferenced
   * @param {function} [callback] - An error-first callback. The second parameter is the dereferenced JSON schema object
   * @returns {Promise} - The returned promise resolves with the dereferenced JSON schema object.
   */
  $RefParser.dereference = function (path, schema, options, callback) {
    var Class = this; // eslint-disable-line consistent-this
    var instance = new Class();
    return instance.dereference.apply(instance, arguments);
  };

  /**
   * Parses the given JSON schema, resolves any JSON references, and dereferences the JSON schema.
   * That is, all JSON references are replaced with their resolved values.
   *
   * @param {string} [path] - The file path or URL of the JSON schema
   * @param {object} [schema] - A JSON schema object. This object will be used instead of reading from `path`.
   * @param {$RefParserOptions} [options] - Options that determine how the schema is parsed, resolved, and dereferenced
   * @param {function} [callback] - An error-first callback. The second parameter is the dereferenced JSON schema object
   * @returns {Promise} - The returned promise resolves with the dereferenced JSON schema object.
   */
  $RefParser.prototype.dereference = function (path, schema, options, callback) {
    var me = this;
    var args = normalizeArgs_1(arguments);

    return this.resolve(args.path, args.schema, args.options)
      .then(function () {
        dereference_1(me, args.options);
        return callMeMaybe(args.callback, Promise.resolve(me.schema));
      })
      .catch(function (err) {
        return callMeMaybe(args.callback, Promise.reject(err));
      });
  };
  lib.YAML = YAML;

  /**
   * This class defines a registry for custom formats used within JSF.
   */
  var Registry = function Registry() {
    // empty by default
    this.data = {};
  };
  /**
   * Unregisters custom format(s)
   * @param name
   */


  Registry.prototype.unregister = function unregister (name) {
    if (!name) {
      this.data = {};
    } else {
      delete this.data[name];
    }
  };
  /**
   * Registers custom format
   */


  Registry.prototype.register = function register (name, callback) {
    this.data[name] = callback;
  };
  /**
   * Register many formats at one shot
   */


  Registry.prototype.registerMany = function registerMany (formats) {
      var this$1 = this;

    Object.keys(formats).forEach(function (name) {
      this$1.data[name] = formats[name];
    });
  };
  /**
   * Returns element by registry key
   */


  Registry.prototype.get = function get (name) {
    var format = this.data[name];
    return format;
  };
  /**
   * Returns the whole registry content
   */


  Registry.prototype.list = function list () {
    return this.data;
  };

  var defaults = {};
  defaults.defaultInvalidTypeProduct = null;
  defaults.defaultRandExpMax = 10;
  defaults.ignoreProperties = [];
  defaults.ignoreMissingRefs = false;
  defaults.failOnInvalidTypes = true;
  defaults.failOnInvalidFormat = true;
  defaults.alwaysFakeOptionals = false;
  defaults.optionalsProbability = false;
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
  defaults.random = Math.random;
  /**
   * This class defines a registry for custom settings used within JSF.
   */

  var OptionRegistry = /*@__PURE__*/(function (Registry) {
    function OptionRegistry() {
      Registry.call(this);
      this.data = Object.assign({}, defaults);
      this._defaults = defaults;
    }

    if ( Registry ) OptionRegistry.__proto__ = Registry;
    OptionRegistry.prototype = Object.create( Registry && Registry.prototype );
    OptionRegistry.prototype.constructor = OptionRegistry;

    var prototypeAccessors = { defaults: { configurable: true } };

    prototypeAccessors.defaults.get = function () {
      return Object.assign({}, this._defaults);
    };

    Object.defineProperties( OptionRegistry.prototype, prototypeAccessors );

    return OptionRegistry;
  }(Registry));

  var registry = new OptionRegistry();
  /**
   * Custom option API
   *
   * @param nameOrOptionMap
   * @returns {any}
   */

  function optionAPI(nameOrOptionMap, optionalValue) {
    if (typeof nameOrOptionMap === 'string') {
      if (typeof optionalValue !== 'undefined') {
        return registry.register(nameOrOptionMap, optionalValue);
      }

      return registry.get(nameOrOptionMap);
    }

    return registry.registerMany(nameOrOptionMap);
  }

  optionAPI.getDefaults = function () { return registry.defaults; };

  var ALL_TYPES = ['array', 'object', 'integer', 'number', 'string', 'boolean', 'null'];
  var MOST_NEAR_DATETIME = 2524608000000;
  var MIN_INTEGER = -100000000;
  var MAX_INTEGER = 100000000;
  var MIN_NUMBER = -100;
  var MAX_NUMBER = 100;
  var env = {
    ALL_TYPES: ALL_TYPES,
    MIN_NUMBER: MIN_NUMBER,
    MAX_NUMBER: MAX_NUMBER,
    MIN_INTEGER: MIN_INTEGER,
    MAX_INTEGER: MAX_INTEGER,
    MOST_NEAR_DATETIME: MOST_NEAR_DATETIME
  };

  var types = {
    ROOT       : 0,
    GROUP      : 1,
    POSITION   : 2,
    SET        : 3,
    RANGE      : 4,
    REPETITION : 5,
    REFERENCE  : 6,
    CHAR       : 7,
  };

  const INTS = () => [{ type: types.RANGE , from: 48, to: 57 }];

  const WORDS = () => {
    return [
      { type: types.CHAR, value: 95 },
      { type: types.RANGE, from: 97, to: 122 },
      { type: types.RANGE, from: 65, to: 90 }
    ].concat(INTS());
  };

  const WHITESPACE = () => {
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

  const NOTANYCHAR = () => {
    return [
      { type: types.CHAR, value: 10 },
      { type: types.CHAR, value: 13 },
      { type: types.CHAR, value: 8232 },
      { type: types.CHAR, value: 8233 },
    ];
  };

  // Predefined class objects.
  var words = () => ({ type: types.SET, set: WORDS(), not: false });
  var notWords = () => ({ type: types.SET, set: WORDS(), not: true });
  var ints = () => ({ type: types.SET, set: INTS(), not: false });
  var notInts = () => ({ type: types.SET, set: INTS(), not: true });
  var whitespace = () => ({ type: types.SET, set: WHITESPACE(), not: false });
  var notWhitespace = () => ({ type: types.SET, set: WHITESPACE(), not: true });
  var anyChar = () => ({ type: types.SET, set: NOTANYCHAR(), not: true });

  var sets = {
  	words: words,
  	notWords: notWords,
  	ints: ints,
  	notInts: notInts,
  	whitespace: whitespace,
  	notWhitespace: notWhitespace,
  	anyChar: anyChar
  };

  var util = createCommonjsModule(function (module, exports) {
  const CTRL = '@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^ ?';
  const SLSH = { '0': 0, 't': 9, 'n': 10, 'v': 11, 'f': 12, 'r': 13 };

  /**
   * Finds character representations in str and convert all to
   * their respective characters
   *
   * @param {String} str
   * @return {String}
   */
  exports.strToChars = function(str) {
    /* jshint maxlen: false */
    var chars_regex = /(\[\\b\])|(\\)?\\(?:u([A-F0-9]{4})|x([A-F0-9]{2})|(0?[0-7]{2})|c([@A-Z[\\\]^?])|([0tnvfr]))/g;
    str = str.replace(chars_regex, function(s, b, lbs, a16, b16, c8, dctrl, eslsh) {
      if (lbs) {
        return s;
      }

      var code = b ? 8 :
        a16   ? parseInt(a16, 16) :
        b16   ? parseInt(b16, 16) :
        c8    ? parseInt(c8,   8) :
        dctrl ? CTRL.indexOf(dctrl) :
        SLSH[eslsh];

      var c = String.fromCharCode(code);

      // Escape special regex characters.
      if (/[[\]{}^$.|?*+()]/.test(c)) {
        c = '\\' + c;
      }

      return c;
    });

    return str;
  };


  /**
   * turns class into tokens
   * reads str until it encounters a ] not preceeded by a \
   *
   * @param {String} str
   * @param {String} regexpStr
   * @return {Array.<Array.<Object>, Number>}
   */
  exports.tokenizeClass = (str, regexpStr) => {
    /* jshint maxlen: false */
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
          to: rs[10].charCodeAt(0),
        });

      } else if ((c = rs[12])) {
        tokens.push({
          type: types.CHAR,
          value: c.charCodeAt(0),
        });

      } else {
        return [tokens, regexp.lastIndex];
      }
    }

    exports.error(regexpStr, 'Unterminated character class');
  };


  /**
   * Shortcut to throw errors.
   *
   * @param {String} regexp
   * @param {String} msg
   */
  exports.error = (regexp, msg) => {
    throw new SyntaxError('Invalid regular expression: /' + regexp + '/: ' + msg);
  };
  });
  var util_1 = util.strToChars;
  var util_2 = util.tokenizeClass;
  var util_3 = util.error;

  var wordBoundary = () => ({ type: types.POSITION, value: 'b' });
  var nonWordBoundary = () => ({ type: types.POSITION, value: 'B' });
  var begin = () => ({ type: types.POSITION, value: '^' });
  var end = () => ({ type: types.POSITION, value: '$' });

  var positions = {
  	wordBoundary: wordBoundary,
  	nonWordBoundary: nonWordBoundary,
  	begin: begin,
  	end: end
  };

  var lib$1 = (regexpStr) => {
    var i = 0, l, c,
      start = { type: types.ROOT, stack: []},

      // Keep track of last clause/group and stack.
      lastGroup = start,
      last = start.stack,
      groupStack = [];


    var repeatErr = (i) => {
      util.error(regexpStr, `Nothing to repeat at column ${i - 1}`);
    };

    // Decode a few escaped characters.
    var str = util.strToChars(regexpStr);
    l = str.length;

    // Iterate through each character in string.
    while (i < l) {
      c = str[i++];

      switch (c) {
        // Handle escaped characters, inclues a few sets.
        case '\\':
          c = str[i++];

          switch (c) {
            case 'b':
              last.push(positions.wordBoundary());
              break;

            case 'B':
              last.push(positions.nonWordBoundary());
              break;

            case 'w':
              last.push(sets.words());
              break;

            case 'W':
              last.push(sets.notWords());
              break;

            case 'd':
              last.push(sets.ints());
              break;

            case 'D':
              last.push(sets.notInts());
              break;

            case 's':
              last.push(sets.whitespace());
              break;

            case 'S':
              last.push(sets.notWhitespace());
              break;

            default:
              // Check if c is integer.
              // In which case it's a reference.
              if (/\d/.test(c)) {
                last.push({ type: types.REFERENCE, value: parseInt(c, 10) });

              // Escaped character.
              } else {
                last.push({ type: types.CHAR, value: c.charCodeAt(0) });
              }
          }

          break;


        // Positionals.
        case '^':
          last.push(positions.begin());
          break;

        case '$':
          last.push(positions.end());
          break;


        // Handle custom sets.
        case '[':
          // Check if this class is 'anti' i.e. [^abc].
          var not;
          if (str[i] === '^') {
            not = true;
            i++;
          } else {
            not = false;
          }

          // Get all the characters in class.
          var classTokens = util.tokenizeClass(str.slice(i), regexpStr);

          // Increase index by length of class.
          i += classTokens[1];
          last.push({
            type: types.SET,
            set: classTokens[0],
            not,
          });

          break;


        // Class of any character except \n.
        case '.':
          last.push(sets.anyChar());
          break;


        // Push group onto stack.
        case '(':
          // Create group.
          var group = {
            type: types.GROUP,
            stack: [],
            remember: true,
          };

          c = str[i];

          // If if this is a special kind of group.
          if (c === '?') {
            c = str[i + 1];
            i += 2;

            // Match if followed by.
            if (c === '=') {
              group.followedBy = true;

            // Match if not followed by.
            } else if (c === '!') {
              group.notFollowedBy = true;

            } else if (c !== ':') {
              util.error(regexpStr,
                `Invalid group, character '${c}'` +
                ` after '?' at column ${i - 1}`);
            }

            group.remember = false;
          }

          // Insert subgroup into current group stack.
          last.push(group);

          // Remember the current group for when the group closes.
          groupStack.push(lastGroup);

          // Make this new group the current group.
          lastGroup = group;
          last = group.stack;
          break;


        // Pop group out of stack.
        case ')':
          if (groupStack.length === 0) {
            util.error(regexpStr, `Unmatched ) at column ${i - 1}`);
          }
          lastGroup = groupStack.pop();

          // Check if this group has a PIPE.
          // To get back the correct last stack.
          last = lastGroup.options ?
            lastGroup.options[lastGroup.options.length - 1] : lastGroup.stack;
          break;


        // Use pipe character to give more choices.
        case '|':
          // Create array where options are if this is the first PIPE
          // in this clause.
          if (!lastGroup.options) {
            lastGroup.options = [lastGroup.stack];
            delete lastGroup.stack;
          }

          // Create a new stack and add to options for rest of clause.
          var stack = [];
          lastGroup.options.push(stack);
          last = stack;
          break;


        // Repetition.
        // For every repetition, remove last element from last stack
        // then insert back a RANGE object.
        // This design is chosen because there could be more than
        // one repetition symbols in a regex i.e. `a?+{2,3}`.
        case '{':
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
              value: last.pop(),
            });
          } else {
            last.push({
              type: types.CHAR,
              value: 123,
            });
          }
          break;

        case '?':
          if (last.length === 0) {
            repeatErr(i);
          }
          last.push({
            type: types.REPETITION,
            min: 0,
            max: 1,
            value: last.pop(),
          });
          break;

        case '+':
          if (last.length === 0) {
            repeatErr(i);
          }
          last.push({
            type: types.REPETITION,
            min: 1,
            max: Infinity,
            value: last.pop(),
          });
          break;

        case '*':
          if (last.length === 0) {
            repeatErr(i);
          }
          last.push({
            type: types.REPETITION,
            min: 0,
            max: Infinity,
            value: last.pop(),
          });
          break;


        // Default is a character that is not `\[](){}?+*^$`.
        default:
          last.push({
            type: types.CHAR,
            value: c.charCodeAt(0),
          });
      }

    }

    // Check if any groups have not been closed.
    if (groupStack.length !== 0) {
      util.error(regexpStr, 'Unterminated group');
    }

    return start;
  };

  var types_1 = types;
  lib$1.types = types_1;

  /* eslint indent: 4 */


  // Private helper class
  class SubRange {
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
          return new SubRange(
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
          return this.low == this.high ?
              this.low.toString() : this.low + '-' + this.high;
      }
  }


  class DRange {
      constructor(a, b) {
          this.ranges = [];
          this.length = 0;
          if (a != null) this.add(a, b);
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
              if (b == null) b = a;
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
              if (b == null) b = a;
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
              if (b == null) b = a;
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
          return '[ ' + this.ranges.join(', ') + ' ]';
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
  }

  var lib$2 = DRange;

  const types$1  = lib$1.types;


  var randexp = class RandExp {
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

      } else if (typeof regexp === 'string') {
        this.ignoreCase = m && m.indexOf('i') !== -1;
        this.multiline = m && m.indexOf('m') !== -1;
      } else {
        throw new Error('Expected a regexp or string');
      }

      this.tokens = lib$1(regexp);
    }


    /**
     * Checks if some custom properties have been set for this regexp.
     *
     * @param {RandExp} randexp
     * @param {RegExp} regexp
     */
    _setDefaults(regexp) {
      // When a repetitional token has its max set to Infinite,
      // randexp won't actually generate a random amount between min and Infinite
      // instead it will see Infinite as min + 100.
      this.max = regexp.max != null ? regexp.max :
        RandExp.prototype.max != null ? RandExp.prototype.max : 100;

      // This allows expanding to include additional characters
      // for instance: RandExp.defaultRange.add(0, 65535);
      this.defaultRange = regexp.defaultRange ?
        regexp.defaultRange : this.defaultRange.clone();

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
        case types$1.ROOT:
        case types$1.GROUP:
          // Ignore lookaheads for now.
          if (token.followedBy || token.notFollowedBy) { return ''; }

          // Insert placeholder until group string is generated.
          if (token.remember && token.groupNumber === undefined) {
            token.groupNumber = groups.push(null) - 1;
          }

          stack = token.options ?
            this._randSelect(token.options) : token.stack;

          str = '';
          for (i = 0, l = stack.length; i < l; i++) {
            str += this._gen(stack[i], groups);
          }

          if (token.remember) {
            groups[token.groupNumber] = str;
          }
          return str;

        case types$1.POSITION:
          // Do nothing for now.
          return '';

        case types$1.SET:
          var expandedSet = this._expand(token);
          if (!expandedSet.length) { return ''; }
          return String.fromCharCode(this._randSelect(expandedSet));

        case types$1.REPETITION:
          // Randomly generate number between min and max.
          n = this.randInt(token.min,
            token.max === Infinity ? token.min + this.max : token.max);

          str = '';
          for (i = 0; i < n; i++) {
            str += this._gen(token.value, groups);
          }

          return str;

        case types$1.REFERENCE:
          return groups[token.value - 1] || '';

        case types$1.CHAR:
          var code = this.ignoreCase && this._randBool() ?
            this._toOtherCase(token.value) : token.value;
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
      return code + (97 <= code && code <= 122 ? -32 :
        65 <= code && code <= 90  ?  32 : 0);
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
      if (arr instanceof lib$2) {
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
      if (token.type === lib$1.types.CHAR) {
        return new lib$2(token.value);
      } else if (token.type === lib$1.types.RANGE) {
        return new lib$2(token.from, token.to);
      } else {
        let drange = new lib$2();
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
      return this._range = this._range || new lib$2(32, 126);
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
      if(typeof regexp === 'string') {
        regexp = new RegExp(regexp, m);
      }

      if (regexp._randexp === undefined) {
        randexp = new RandExp(regexp, m);
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
      /* eshint freeze:false */
      RegExp.prototype.gen = function() {
        return RandExp.randexp(this);
      };
    }
  };

  function getRandomInteger(min, max) {
    min = typeof min === 'undefined' ? env.MIN_INTEGER : min;
    max = typeof max === 'undefined' ? env.MAX_INTEGER : max;
    return Math.floor(optionAPI('random')() * (max - min + 1)) + min;
  }

  function _randexp(value) {
    // set maximum default, see #193
    randexp.prototype.max = optionAPI('defaultRandExpMax'); // same implementation as the original except using our random

    randexp.prototype.randInt = function (a, b) { return a + Math.floor(optionAPI('random')() * (1 + (b - a))); };

    var re = new randexp(value);
    return re.gen();
  }
  /**
   * Returns random element of a collection
   *
   * @param collection
   * @returns {T}
   */


  function pick(collection) {
    return collection[Math.floor(optionAPI('random')() * collection.length)];
  }
  /**
   * Returns shuffled collection of elements
   *
   * @param collection
   * @returns {T[]}
   */


  function shuffle(collection) {
    var tmp;
    var key;
    var length = collection.length;
    var copy = collection.slice();

    for (; length > 0;) {
      key = Math.floor(optionAPI('random')() * length); // swap

      length -= 1;
      tmp = copy[length];
      copy[length] = copy[key];
      copy[key] = tmp;
    }

    return copy;
  }
  /**
   * Returns a random integer between min (inclusive) and max (inclusive)
   * Using Math.round() will give you a non-uniform distribution!
   * @see http://stackoverflow.com/a/1527820/769384
   */


  function getRandom(min, max) {
    return optionAPI('random')() * (max - min) + min;
  }
  /**
   * Generates random number according to parameters passed
   *
   * @param min
   * @param max
   * @param defMin
   * @param defMax
   * @param hasPrecision
   * @returns {number}
   */


  function number(min, max, defMin, defMax, hasPrecision) {
    if ( hasPrecision === void 0 ) hasPrecision = false;

    defMin = typeof defMin === 'undefined' ? env.MIN_NUMBER : defMin;
    defMax = typeof defMax === 'undefined' ? env.MAX_NUMBER : defMax;
    min = typeof min === 'undefined' ? defMin : min;
    max = typeof max === 'undefined' ? defMax : max;

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
      case 'seconds':
        return number(0, 60) * 60;

      case 'minutes':
        return number(15, 50) * 612;

      case 'hours':
        return number(12, 72) * 36123;

      case 'days':
        return number(7, 30) * 86412345;

      case 'weeks':
        return number(4, 52) * 604812345;

      case 'months':
        return number(2, 13) * 2592012345;

      case 'years':
        return number(1, 20) * 31104012345;

      default:
        break;
    }
  }

  function date(step) {
    if (step) {
      return by(step);
    }

    var now = new Date();
    var days = number(-1000, env.MOST_NEAR_DATETIME);
    now.setTime(now.getTime() - days);
    return now;
  }

  var random = {
    pick: pick,
    date: date,
    shuffle: shuffle,
    number: number,
    randexp: _randexp
  };

  function getSubAttribute(obj, dotSeparatedKey) {
    var keyElements = dotSeparatedKey.split('.');

    while (keyElements.length) {
      var prop = keyElements.shift();

      if (!obj[prop]) {
        break;
      }

      obj = obj[prop];
    }

    return obj;
  }
  /**
   * Returns true/false whether the object parameter has its own properties defined
   *
   * @param obj
   * @param properties
   * @returns {boolean}
   */


  function hasProperties(obj) {
    var properties = [], len = arguments.length - 1;
    while ( len-- > 0 ) properties[ len ] = arguments[ len + 1 ];

    return properties.filter(function (key) {
      return typeof obj[key] !== 'undefined';
    }).length > 0;
  }
  /**
   * Returns typecasted value.
   * External generators (faker, chance, casual) may return data in non-expected formats, such as string, when you might expect an
   * integer. This function is used to force the typecast. This is the base formatter for all result values.
   *
   * @param type
   * @param schema
   * @param callback
   * @returns {any}
   */


  function typecast(type, schema, callback) {
    var params = {}; // normalize constraints

    switch (type || schema.type) {
      case 'integer':
      case 'number':
        if (typeof schema.minimum !== 'undefined') {
          params.minimum = schema.minimum;
        }

        if (typeof schema.maximum !== 'undefined') {
          params.maximum = schema.maximum;
        }

        if (schema.enum) {
          var min = Math.max(params.minimum || 0, 0);
          var max = Math.min(params.maximum || Infinity, Infinity);

          if (schema.exclusiveMinimum && min === schema.minimum) {
            min += schema.multipleOf || 1;
          }

          if (schema.exclusiveMaximum && max === schema.maximum) {
            max -= schema.multipleOf || 1;
          } // discard out-of-bounds enumerations


          if (min || max !== Infinity) {
            schema.enum = schema.enum.filter(function (x) {
              if (x >= min && x <= max) {
                return true;
              }

              return false;
            });
          }
        }

        break;

      case 'string':
        {
          if (typeof schema.minLength !== 'undefined') {
            params.minLength = schema.minLength;
          }

          if (typeof schema.maxLength !== 'undefined') {
            params.maxLength = schema.maxLength;
          }

          var _maxLength = optionAPI('maxLength');

          var _minLength = optionAPI('minLength'); // Don't allow user to set max length above our maximum


          if (_maxLength && params.maxLength > _maxLength) {
            params.maxLength = _maxLength;
          } // Don't allow user to set min length above our maximum


          if (_minLength && params.minLength < _minLength) {
            params.minLength = _minLength;
          }

          break;
        }

      default:
        break;
    } // execute generator


    var value = callback(params); // normalize output value

    switch (type || schema.type) {
      case 'number':
        value = parseFloat(value);
        break;

      case 'integer':
        value = parseInt(value, 10);
        break;

      case 'boolean':
        value = !!value;
        break;

      case 'string':
        {
          value = String(value);
          var min$1 = Math.max(params.minLength || 0, 0);
          var max$1 = Math.min(params.maxLength || Infinity, Infinity);

          while (value.length < min$1) {
            if (!schema.pattern) {
              value += "" + (random.pick([' ', '/', '_', '-', '+', '=', '@', '^'])) + value;
            } else {
              value += random.randexp(schema.pattern);
            }
          }

          if (value.length > max$1) {
            value = value.substr(0, max$1);
          }

          switch (schema.format) {
            case 'date-time':
            case 'datetime':
              value = new Date(value).toISOString().replace(/([0-9])0+Z$/, '$1Z');
              break;

            case 'date':
              value = new Date(value).toISOString().substr(0, 10);
              break;

            case 'time':
              value = new Date(("1969-01-01 " + value)).toISOString().substr(11);
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

  function merge$2(a, b) {
    Object.keys(b).forEach(function (key) {
      if (typeof b[key] !== 'object' || b[key] === null) {
        a[key] = b[key];
      } else if (Array.isArray(b[key])) {
        a[key] = a[key] || []; // fix #292 - skip duplicated values from merge object (b)

        b[key].forEach(function (value) {
          if (a[key].indexOf(value) === -1) {
            a[key].push(value);
          }
        });
      } else if (typeof a[key] !== 'object' || a[key] === null || Array.isArray(a[key])) {
        a[key] = merge$2({}, b[key]);
      } else {
        a[key] = merge$2(a[key], b[key]);
      }
    });
    return a;
  }

  function clone(obj, cache) {
    if ( cache === void 0 ) cache = new Map();

    if (!obj || typeof obj !== 'object') {
      return obj;
    }

    if (cache.has(obj)) {
      return cache.get(obj);
    }

    if (Array.isArray(obj)) {
      var arr = [];
      cache.set(obj, arr);
      arr.push.apply(arr, obj.map(function (x) { return clone(x, cache); }));
      return arr;
    }

    var clonedObj = {};
    cache.set(obj, clonedObj);
    return Object.keys(obj).reduce(function (prev, cur) {
      prev[cur] = clone(obj[cur], cache);
      return prev;
    }, clonedObj);
  }

  function short(schema) {
    var s = JSON.stringify(schema);
    var l = JSON.stringify(schema, null, 2);
    return s.length > 400 ? ((l.substr(0, 400)) + "...") : l;
  }

  function anyValue() {
    return random.pick([false, true, null, -1, NaN, Math.PI, Infinity, undefined, [], {}, // FIXME: use built-in random?
    Math.random(), Math.random().toString(36).substr(2)]);
  }

  function notValue(schema, parent) {
    var copy = merge$2({}, parent);

    if (typeof schema.minimum !== 'undefined') {
      copy.maximum = schema.minimum;
      copy.exclusiveMaximum = true;
    }

    if (typeof schema.maximum !== 'undefined') {
      copy.minimum = schema.maximum > copy.maximum ? 0 : schema.maximum;
      copy.exclusiveMinimum = true;
    }

    if (typeof schema.minLength !== 'undefined') {
      copy.maxLength = schema.minLength;
    }

    if (typeof schema.maxLength !== 'undefined') {
      copy.minLength = schema.maxLength > copy.maxLength ? 0 : schema.maxLength;
    }

    if (schema.type) {
      copy.type = random.pick(env.ALL_TYPES.filter(function (x) {
        var types = Array.isArray(schema.type) ? schema.type : [schema.type];
        return types.every(function (type) {
          // treat both types as _similar enough_ to be skipped equal
          if (x === 'number' || x === 'integer') {
            return type !== 'number' && type !== 'integer';
          }

          return x !== type;
        });
      }));
    } else if (schema.enum) {
      var value;

      do {
        value = anyValue();
      } while (schema.enum.indexOf(value) !== -1);

      copy.enum = [value];
    }

    if (schema.required && copy.properties) {
      schema.required.forEach(function (prop) {
        delete copy.properties[prop];
      });
    } // TODO: explore more scenarios


    return copy;
  } // FIXME: evaluate more constraints?


  function validate(value, schemas) {
    return !schemas.every(function (x) {
      if (typeof x.minimum !== 'undefined' && value >= x.minimum) {
        return true;
      }

      if (typeof x.maximum !== 'undefined' && value <= x.maximum) {
        return true;
      }

      return false;
    });
  }

  function isKey(prop) {
    return ['enum', 'const', 'default', 'examples', 'required', 'definitions'].indexOf(prop) !== -1;
  }

  function omitProps(obj, props) {
    var copy = {};
    Object.keys(obj).forEach(function (k) {
      if (props.indexOf(k) === -1) {
        if (Array.isArray(obj[k])) {
          copy[k] = obj[k].slice();
        } else {
          copy[k] = obj[k] instanceof Object ? merge$2({}, obj[k]) : obj[k];
        }
      }
    });
    return copy;
  }

  function template(value, schema) {
    if (Array.isArray(value)) {
      return value.map(function (x) { return template(x, schema); });
    }

    if (typeof value === 'string') {
      value = value.replace(/#\{([\w.-]+)\}/g, function (_, $1) { return schema[$1]; });
    }

    return value;
  }

  var utils = {
    getSubAttribute: getSubAttribute,
    hasProperties: hasProperties,
    omitProps: omitProps,
    typecast: typecast,
    merge: merge$2,
    clone: clone,
    short: short,
    notValue: notValue,
    anyValue: anyValue,
    validate: validate,
    isKey: isKey,
    template: template
  };

  function proxy(gen) {
    return function (value, schema, property, rootSchema) {
      var fn = value;
      var args = []; // support for nested object, first-key is the generator

      if (typeof value === 'object') {
        fn = Object.keys(value)[0]; // treat the given array as arguments,

        if (Array.isArray(value[fn])) {
          // if the generator is expecting arrays they should be nested, e.g. `[[1, 2, 3], true, ...]`
          args = value[fn];
        } else {
          args.push(value[fn]);
        }
      } // support for keypaths, e.g. "internet.email"


      var props = fn.split('.'); // retrieve a fresh dependency

      var ctx = gen();

      while (props.length > 1) {
        ctx = ctx[props.shift()];
      } // retrieve last value from context object


      value = typeof ctx === 'object' ? ctx[props[0]] : ctx; // invoke dynamic generators

      if (typeof value === 'function') {
        value = value.apply(ctx, args.map(function (x) { return utils.template(x, rootSchema); }));
      } // test for pending callbacks


      if (Object.prototype.toString.call(value) === '[object Object]') {
        Object.keys(value).forEach(function (key) {
          if (typeof value[key] === 'function') {
            throw new Error(("Cannot resolve value for '" + property + ": " + fn + "', given: " + value));
          }
        });
      }

      return value;
    };
  }
  /**
   * Container is used to wrap external generators (faker, chance, casual, etc.) and its dependencies.
   *
   * - `jsf.extend('faker')` will enhance or define the given dependency.
   * - `jsf.define('faker')` will provide the "faker" keyword support.
   *
   * RandExp is not longer considered an "extension".
   */


  var Container = function Container() {
    // dynamic requires - handle all dependencies
    // they will NOT be included on the bundle
    this.registry = {};
    this.support = {};
  };
  /**
   * Unregister extensions
   * @param name
   */


  Container.prototype.reset = function reset (name) {
    if (!name) {
      this.registry = {};
      this.support = {};
    } else {
      delete this.registry[name];
      delete this.support[name];
    }
  };
  /**
   * Override dependency given by name
   * @param name
   * @param callback
   */


  Container.prototype.extend = function extend (name, callback) {
      var this$1 = this;

    this.registry[name] = callback(this.registry[name]); // built-in proxy (can be overridden)

    if (!this.support[name]) {
      this.support[name] = proxy(function () { return this$1.registry[name]; });
    }
  };
  /**
   * Set keyword support by name
   * @param name
   * @param callback
   */


  Container.prototype.define = function define (name, callback) {
    this.support[name] = callback;
  };
  /**
   * Returns dependency given by name
   * @param name
   * @returns {Dependency}
   */


  Container.prototype.get = function get (name) {
    if (typeof this.registry[name] === 'undefined') {
      throw new ReferenceError(("'" + name + "' dependency doesn't exist."));
    }

    return this.registry[name];
  };
  /**
   * Apply a custom keyword
   * @param schema
   */


  Container.prototype.wrap = function wrap (schema) {
      var this$1 = this;

    var keys = Object.keys(schema);
    var context = {};
    var length = keys.length;

    var loop = function () {
      // eslint-disable-line
      var fn = keys[length].replace(/^x-/, '');
      var gen = this$1.support[fn];

      if (typeof gen === 'function') {
        Object.defineProperty(schema, 'generate', {
          configurable: false,
          enumerable: false,
          writable: false,
          value: function (rootSchema) { return gen.call(context, schema[keys[length]], schema, keys[length], rootSchema); } // eslint-disable-line

        });
        return 'break';
      }
    };

      while (length--) {
        var returned = loop();

        if ( returned === 'break' ) break;
      }

    return schema;
  };

  var registry$1 = new Registry();
  /**
   * Custom format API
   *
   * @see https://github.com/json-schema-faker/json-schema-faker#custom-formats
   * @param nameOrFormatMap
   * @param callback
   * @returns {any}
   */

  function formatAPI(nameOrFormatMap, callback) {
    if (typeof nameOrFormatMap === 'undefined') {
      return registry$1.list();
    }

    if (typeof nameOrFormatMap === 'string') {
      if (typeof callback === 'function') {
        registry$1.register(nameOrFormatMap, callback);
      } else if (callback === null || callback === false) {
        registry$1.unregister(nameOrFormatMap);
      } else {
        return registry$1.get(nameOrFormatMap);
      }
    } else {
      registry$1.registerMany(nameOrFormatMap);
    }
  }

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _construct(Parent, args, Class) {
    if (isNativeReflectConstruct()) {
      _construct = Reflect.construct;
    } else {
      _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) _setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }

    return _construct.apply(null, arguments);
  }

  function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  }

  function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;

    _wrapNativeSuper = function _wrapNativeSuper(Class) {
      if (Class === null || !_isNativeFunction(Class)) return Class;

      if (typeof Class !== "function") {
        throw new TypeError("Super expression must either be null or a function");
      }

      if (typeof _cache !== "undefined") {
        if (_cache.has(Class)) return _cache.get(Class);

        _cache.set(Class, Wrapper);
      }

      function Wrapper() {
        return _construct(Class, arguments, _getPrototypeOf(this).constructor);
      }

      Wrapper.prototype = Object.create(Class.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      return _setPrototypeOf(Wrapper, Class);
    };

    return _wrapNativeSuper(Class);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  /* eslint-disable no-eval, jsdoc/check-types */
  // Todo: Reenable jsdoc/check-types once PR merged: https://github.com/gajus/eslint-plugin-jsdoc/pull/270
  var globalEval = eval; // eslint-disable-next-line import/no-commonjs

  var supportsNodeVM = typeof module !== 'undefined' && Boolean(module.exports) && !(typeof navigator !== 'undefined' && navigator.product === 'ReactNative');
  var allowedResultTypes = ['value', 'path', 'pointer', 'parent', 'parentProperty', 'all'];
  var hasOwnProp = Object.prototype.hasOwnProperty;
  /**
  * @typedef {null|boolean|number|string|PlainObject|GenericArray} JSONObject
  */

  /**
  * @callback ConditionCallback
  * @param item
  * @returns {boolean}
  */

  /**
   * Copy items out of one array into another.
   * @param {Array} source Array with items to copy
   * @param {Array} target Array to which to copy
   * @param {ConditionCallback} conditionCb Callback passed the current item; will move
   *     item if evaluates to `true`
   * @returns {undefined}
   */

  var moveToAnotherArray = function moveToAnotherArray(source, target, conditionCb) {
    var il = source.length;

    for (var i = 0; i < il; i++) {
      var item = source[i];

      if (conditionCb(item)) {
        target.push(source.splice(i--, 1)[0]);
      }
    }
  };

  var vm = supportsNodeVM ? require('vm') : {
    /**
     * @param {string} expr Expression to evaluate
     * @param {PlainObject} context Object whose items will be added to evaluation
     * @returns {Any} Result of evaluated code
     */
    runInNewContext: function runInNewContext(expr, context) {
      var keys = Object.keys(context);
      var funcs = [];
      moveToAnotherArray(keys, funcs, function (key) {
        return typeof context[key] === 'function';
      });
      var code = funcs.reduce(function (s, func) {
        var fString = context[func].toString();

        if (!/function/.exec(fString)) {
          fString = 'function ' + fString;
        }

        return 'var ' + func + '=' + fString + ';' + s;
      }, '') + keys.reduce(function (s, vr) {
        return 'var ' + vr + '=' + JSON.stringify(context[vr]).replace( // http://www.thespanner.co.uk/2011/07/25/the-json-specification-is-now-wrong/
        /\u2028|\u2029/g, function (m) {
          return "\\u202" + (m === "\u2028" ? '8' : '9');
        }) + ';' + s;
      }, expr);
      return globalEval(code);
    }
  };
  /**
   * Copies array and then pushes item into it.
   * @param {Array} arr Array to copy and into which to push
   * @param {Any} item Array item to add (to end)
   * @returns {Array} Copy of the original array
   */

  function push(arr, item) {
    arr = arr.slice();
    arr.push(item);
    return arr;
  }
  /**
   * Copies array and then unshifts item into it.
   * @param {Any} item Array item to add (to beginning)
   * @param {Array} arr Array to copy and into which to unshift
   * @returns {Array} Copy of the original array
   */


  function unshift(item, arr) {
    arr = arr.slice();
    arr.unshift(item);
    return arr;
  }
  /**
   * Caught when JSONPath is used without `new` but rethrown if with `new`
   * @extends Error
   */


  var NewError =
  /*#__PURE__*/
  function (_Error) {
    _inherits(NewError, _Error);

    /**
     * @param {Any} value The evaluated scalar value
     */
    function NewError(value) {
      var _this;

      _classCallCheck(this, NewError);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(NewError).call(this, 'JSONPath should not be called with "new" (it prevents return of (unwrapped) scalar values)'));
      _this.avoidNew = true;
      _this.value = value;
      _this.name = 'NewError';
      return _this;
    }

    return NewError;
  }(_wrapNativeSuper(Error));
  /**
  * @typedef {PlainObject} ReturnObject
  * @property {string} path
  * @property {JSONObject} value
  * @property {PlainObject|GenericArray} parent
  * @property {string} parentProperty
  */

  /**
  * @callback JSONPathCallback
  * @param {string|PlainObject} preferredOutput
  * @param {"value"|"property"} type
  * @param {ReturnObject} fullRetObj
  */

  /**
  * @callback OtherTypeCallback
  * @param {JSONObject} val
  * @param {string} path
  * @param {PlainObject|GenericArray} parent
  * @param {string} parentPropName
  */

  /**
   * @param {PlainObject} [opts] If present, must be an object
   * @param {string} expr JSON path to evaluate
   * @param {JSON} obj JSON object to evaluate against
   * @param {JSONPathCallback} callback Passed 3 arguments: 1) desired payload per `resultType`,
   *     2) `"value"|"property"`, 3) Full returned object with all payloads
   * @param {OtherTypeCallback} otherTypeCallback If `@other()` is at the end of one's query, this
   *  will be invoked with the value of the item, its path, its parent, and its parent's
   *  property name, and it should return a boolean indicating whether the supplied value
   *  belongs to the "other" type or not (or it may handle transformations and return `false`).
   * @returns {JSONPath}
   * @class
   */


  function JSONPath(opts, expr, obj, callback, otherTypeCallback) {
    // eslint-disable-next-line no-restricted-syntax
    if (!(this instanceof JSONPath)) {
      try {
        return new JSONPath(opts, expr, obj, callback, otherTypeCallback);
      } catch (e) {
        if (!e.avoidNew) {
          throw e;
        }

        return e.value;
      }
    }

    if (typeof opts === 'string') {
      otherTypeCallback = callback;
      callback = obj;
      obj = expr;
      expr = opts;
      opts = {};
    }

    opts = opts || {};
    var objArgs = hasOwnProp.call(opts, 'json') && hasOwnProp.call(opts, 'path');
    this.json = opts.json || obj;
    this.path = opts.path || expr;
    this.resultType = opts.resultType && opts.resultType.toLowerCase() || 'value';
    this.flatten = opts.flatten || false;
    this.wrap = hasOwnProp.call(opts, 'wrap') ? opts.wrap : true;
    this.sandbox = opts.sandbox || {};
    this.preventEval = opts.preventEval || false;
    this.parent = opts.parent || null;
    this.parentProperty = opts.parentProperty || null;
    this.callback = opts.callback || callback || null;

    this.otherTypeCallback = opts.otherTypeCallback || otherTypeCallback || function () {
      throw new Error('You must supply an otherTypeCallback callback option with the @other() operator.');
    };

    if (opts.autostart !== false) {
      var ret = this.evaluate({
        path: objArgs ? opts.path : expr,
        json: objArgs ? opts.json : obj
      });

      if (!ret || _typeof(ret) !== 'object') {
        throw new NewError(ret);
      }

      return ret;
    }
  } // PUBLIC METHODS


  JSONPath.prototype.evaluate = function (expr, json, callback, otherTypeCallback) {
    var that = this;
    var currParent = this.parent,
        currParentProperty = this.parentProperty;
    var flatten = this.flatten,
        wrap = this.wrap;
    this.currResultType = this.resultType;
    this.currPreventEval = this.preventEval;
    this.currSandbox = this.sandbox;
    callback = callback || this.callback;
    this.currOtherTypeCallback = otherTypeCallback || this.otherTypeCallback;
    json = json || this.json;
    expr = expr || this.path;

    if (expr && _typeof(expr) === 'object') {
      if (!expr.path) {
        throw new Error('You must supply a "path" property when providing an object argument to JSONPath.evaluate().');
      }

      json = hasOwnProp.call(expr, 'json') ? expr.json : json;
      flatten = hasOwnProp.call(expr, 'flatten') ? expr.flatten : flatten;
      this.currResultType = hasOwnProp.call(expr, 'resultType') ? expr.resultType : this.currResultType;
      this.currSandbox = hasOwnProp.call(expr, 'sandbox') ? expr.sandbox : this.currSandbox;
      wrap = hasOwnProp.call(expr, 'wrap') ? expr.wrap : wrap;
      this.currPreventEval = hasOwnProp.call(expr, 'preventEval') ? expr.preventEval : this.currPreventEval;
      callback = hasOwnProp.call(expr, 'callback') ? expr.callback : callback;
      this.currOtherTypeCallback = hasOwnProp.call(expr, 'otherTypeCallback') ? expr.otherTypeCallback : this.currOtherTypeCallback;
      currParent = hasOwnProp.call(expr, 'parent') ? expr.parent : currParent;
      currParentProperty = hasOwnProp.call(expr, 'parentProperty') ? expr.parentProperty : currParentProperty;
      expr = expr.path;
    }

    currParent = currParent || null;
    currParentProperty = currParentProperty || null;

    if (Array.isArray(expr)) {
      expr = JSONPath.toPathString(expr);
    }

    if (!expr || !json || !allowedResultTypes.includes(this.currResultType)) {
      return undefined;
    }

    this._obj = json;
    var exprList = JSONPath.toPathArray(expr);

    if (exprList[0] === '$' && exprList.length > 1) {
      exprList.shift();
    }

    this._hasParentSelector = null;

    var result = this._trace(exprList, json, ['$'], currParent, currParentProperty, callback).filter(function (ea) {
      return ea && !ea.isParentSelector;
    });

    if (!result.length) {
      return wrap ? [] : undefined;
    }

    if (result.length === 1 && !wrap && !Array.isArray(result[0].value)) {
      return this._getPreferredOutput(result[0]);
    }

    return result.reduce(function (rslt, ea) {
      var valOrPath = that._getPreferredOutput(ea);

      if (flatten && Array.isArray(valOrPath)) {
        rslt = rslt.concat(valOrPath);
      } else {
        rslt.push(valOrPath);
      }

      return rslt;
    }, []);
  }; // PRIVATE METHODS


  JSONPath.prototype._getPreferredOutput = function (ea) {
    var resultType = this.currResultType;

    switch (resultType) {
      default:
        throw new TypeError('Unknown result type');

      case 'all':
        ea.pointer = JSONPath.toPointer(ea.path);
        ea.path = typeof ea.path === 'string' ? ea.path : JSONPath.toPathString(ea.path);
        return ea;

      case 'value':
      case 'parent':
      case 'parentProperty':
        return ea[resultType];

      case 'path':
        return JSONPath.toPathString(ea[resultType]);

      case 'pointer':
        return JSONPath.toPointer(ea.path);
    }
  };

  JSONPath.prototype._handleCallback = function (fullRetObj, callback, type) {
    if (callback) {
      var preferredOutput = this._getPreferredOutput(fullRetObj);

      fullRetObj.path = typeof fullRetObj.path === 'string' ? fullRetObj.path : JSONPath.toPathString(fullRetObj.path); // eslint-disable-next-line callback-return

      callback(preferredOutput, type, fullRetObj);
    }
  };
  /**
   *
   * @param {string} expr
   * @param {JSONObject} val
   * @param {string} path
   * @param {PlainObject|GenericArray} parent
   * @param {string} parentPropName
   * @param {JSONPathCallback} callback
   * @param {boolean} literalPriority
   * @returns {ReturnObject|ReturnObject[]}
   */


  JSONPath.prototype._trace = function (expr, val, path, parent, parentPropName, callback, literalPriority) {
    // No expr to follow? return path and value as the result of this trace branch
    var retObj;
    var that = this;

    if (!expr.length) {
      retObj = {
        path: path,
        value: val,
        parent: parent,
        parentProperty: parentPropName
      };

      this._handleCallback(retObj, callback, 'value');

      return retObj;
    }

    var loc = expr[0],
        x = expr.slice(1); // We need to gather the return value of recursive trace calls in order to
    // do the parent sel computation.

    var ret = [];
    /**
     *
     * @param {ReturnObject|ReturnObject[]} elems
     * @returns {void}
     */

    function addRet(elems) {
      if (Array.isArray(elems)) {
        // This was causing excessive stack size in Node (with or without Babel) against our performance test: `ret.push(...elems);`
        elems.forEach(function (t) {
          ret.push(t);
        });
      } else {
        ret.push(elems);
      }
    }

    if ((typeof loc !== 'string' || literalPriority) && val && hasOwnProp.call(val, loc)) {
      // simple case--directly follow property
      addRet(this._trace(x, val[loc], push(path, loc), val, loc, callback));
    } else if (loc === '*') {
      // all child properties
      // eslint-disable-next-line no-shadow
      this._walk(loc, x, val, path, parent, parentPropName, callback, function (m, l, x, v, p, par, pr, cb) {
        addRet(that._trace(unshift(m, x), v, p, par, pr, cb, true));
      });
    } else if (loc === '..') {
      // all descendent parent properties
      addRet(this._trace(x, val, path, parent, parentPropName, callback)); // Check remaining expression with val's immediate children
      // eslint-disable-next-line no-shadow

      this._walk(loc, x, val, path, parent, parentPropName, callback, function (m, l, x, v, p, par, pr, cb) {
        // We don't join m and x here because we only want parents, not scalar values
        if (_typeof(v[m]) === 'object') {
          // Keep going with recursive descent on val's object children
          addRet(that._trace(unshift(l, x), v[m], push(p, m), v, m, cb));
        }
      }); // The parent sel computation is handled in the frame above using the
      // ancestor object of val

    } else if (loc === '^') {
      // This is not a final endpoint, so we do not invoke the callback here
      this._hasParentSelector = true;
      return path.length ? {
        path: path.slice(0, -1),
        expr: x,
        isParentSelector: true
      } : [];
    } else if (loc === '~') {
      // property name
      retObj = {
        path: push(path, loc),
        value: parentPropName,
        parent: parent,
        parentProperty: null
      };

      this._handleCallback(retObj, callback, 'property');

      return retObj;
    } else if (loc === '$') {
      // root only
      addRet(this._trace(x, val, path, null, null, callback));
    } else if (/^(-?\d*):(-?\d*):?(\d*)$/.test(loc)) {
      // [start:end:step]  Python slice syntax
      addRet(this._slice(loc, x, val, path, parent, parentPropName, callback));
    } else if (loc.indexOf('?(') === 0) {
      // [?(expr)] (filtering)
      if (this.currPreventEval) {
        throw new Error('Eval [?(expr)] prevented in JSONPath expression.');
      } // eslint-disable-next-line no-shadow


      this._walk(loc, x, val, path, parent, parentPropName, callback, function (m, l, x, v, p, par, pr, cb) {
        if (that._eval(l.replace(/^\?\((.*?)\)$/, '$1'), v[m], m, p, par, pr)) {
          addRet(that._trace(unshift(m, x), v, p, par, pr, cb));
        }
      });
    } else if (loc[0] === '(') {
      // [(expr)] (dynamic property/index)
      if (this.currPreventEval) {
        throw new Error('Eval [(expr)] prevented in JSONPath expression.');
      } // As this will resolve to a property name (but we don't know it yet), property and parent information is relative to the parent of the property to which this expression will resolve


      addRet(this._trace(unshift(this._eval(loc, val, path[path.length - 1], path.slice(0, -1), parent, parentPropName), x), val, path, parent, parentPropName, callback));
    } else if (loc[0] === '@') {
      // value type: @boolean(), etc.
      var addType = false;
      var valueType = loc.slice(1, -2);

      switch (valueType) {
        default:
          throw new TypeError('Unknown value type ' + valueType);

        case 'scalar':
          if (!val || !['object', 'function'].includes(_typeof(val))) {
            addType = true;
          }

          break;

        case 'boolean':
        case 'string':
        case 'undefined':
        case 'function':
          if (_typeof(val) === valueType) {
            // eslint-disable-line valid-typeof
            addType = true;
          }

          break;

        case 'number':
          if (_typeof(val) === valueType && isFinite(val)) {
            // eslint-disable-line valid-typeof
            addType = true;
          }

          break;

        case 'nonFinite':
          if (typeof val === 'number' && !isFinite(val)) {
            addType = true;
          }

          break;

        case 'object':
          if (val && _typeof(val) === valueType) {
            // eslint-disable-line valid-typeof
            addType = true;
          }

          break;

        case 'array':
          if (Array.isArray(val)) {
            addType = true;
          }

          break;

        case 'other':
          addType = this.currOtherTypeCallback(val, path, parent, parentPropName);
          break;

        case 'integer':
          if (val === Number(val) && isFinite(val) && !(val % 1)) {
            addType = true;
          }

          break;

        case 'null':
          if (val === null) {
            addType = true;
          }

          break;
      }

      if (addType) {
        retObj = {
          path: path,
          value: val,
          parent: parent,
          parentProperty: parentPropName
        };

        this._handleCallback(retObj, callback, 'value');

        return retObj;
      }
    } else if (loc[0] === '`' && val && hasOwnProp.call(val, loc.slice(1))) {
      // `-escaped property
      var locProp = loc.slice(1);
      addRet(this._trace(x, val[locProp], push(path, locProp), val, locProp, callback, true));
    } else if (loc.includes(',')) {
      // [name1,name2,...]
      var parts = loc.split(',');
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = parts[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var part = _step.value;
          addRet(this._trace(unshift(part, x), val, path, parent, parentPropName, callback));
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    } else if (!literalPriority && val && hasOwnProp.call(val, loc)) {
      // simple case--directly follow property
      addRet(this._trace(x, val[loc], push(path, loc), val, loc, callback, true));
    } // We check the resulting values for parent selections. For parent
    // selections we discard the value object and continue the trace with the
    // current val object


    if (this._hasParentSelector) {
      for (var t = 0; t < ret.length; t++) {
        var rett = ret[t];

        if (rett.isParentSelector) {
          var tmp = that._trace(rett.expr, val, rett.path, parent, parentPropName, callback);

          if (Array.isArray(tmp)) {
            ret[t] = tmp[0];
            var tl = tmp.length;

            for (var tt = 1; tt < tl; tt++) {
              t++;
              ret.splice(t, 0, tmp[tt]);
            }
          } else {
            ret[t] = tmp;
          }
        }
      }
    }

    return ret;
  };

  JSONPath.prototype._walk = function (loc, expr, val, path, parent, parentPropName, callback, f) {
    if (Array.isArray(val)) {
      var n = val.length;

      for (var i = 0; i < n; i++) {
        f(i, loc, expr, val, path, parent, parentPropName, callback);
      }
    } else if (_typeof(val) === 'object') {
      for (var m in val) {
        if (hasOwnProp.call(val, m)) {
          f(m, loc, expr, val, path, parent, parentPropName, callback);
        }
      }
    }
  };

  JSONPath.prototype._slice = function (loc, expr, val, path, parent, parentPropName, callback) {
    if (!Array.isArray(val)) {
      return undefined;
    }

    var len = val.length,
        parts = loc.split(':'),
        step = parts[2] && parseInt(parts[2]) || 1;
    var start = parts[0] && parseInt(parts[0]) || 0,
        end = parts[1] && parseInt(parts[1]) || len;
    start = start < 0 ? Math.max(0, start + len) : Math.min(len, start);
    end = end < 0 ? Math.max(0, end + len) : Math.min(len, end);
    var ret = [];

    for (var i = start; i < end; i += step) {
      var tmp = this._trace(unshift(i, expr), val, path, parent, parentPropName, callback);

      if (Array.isArray(tmp)) {
        // This was causing excessive stack size in Node (with or without Babel) against our performance test: `ret.push(...tmp);`
        tmp.forEach(function (t) {
          ret.push(t);
        });
      } else {
        ret.push(tmp);
      }
    }

    return ret;
  };

  JSONPath.prototype._eval = function (code, _v, _vname, path, parent, parentPropName) {
    if (!this._obj || !_v) {
      return false;
    }

    if (code.includes('@parentProperty')) {
      this.currSandbox._$_parentProperty = parentPropName;
      code = code.replace(/@parentProperty/g, '_$_parentProperty');
    }

    if (code.includes('@parent')) {
      this.currSandbox._$_parent = parent;
      code = code.replace(/@parent/g, '_$_parent');
    }

    if (code.includes('@property')) {
      this.currSandbox._$_property = _vname;
      code = code.replace(/@property/g, '_$_property');
    }

    if (code.includes('@path')) {
      this.currSandbox._$_path = JSONPath.toPathString(path.concat([_vname]));
      code = code.replace(/@path/g, '_$_path');
    }

    if (code.match(/@([.\s)[])/)) {
      this.currSandbox._$_v = _v;
      code = code.replace(/@([.\s)[])/g, '_$_v$1');
    }

    try {
      return vm.runInNewContext(code, this.currSandbox);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
      throw new Error('jsonPath: ' + e.message + ': ' + code);
    }
  }; // PUBLIC CLASS PROPERTIES AND METHODS
  // Could store the cache object itself


  JSONPath.cache = {};
  /**
   * @param {string[]} pathArr Array to convert
   * @returns {string} The path string
   */

  JSONPath.toPathString = function (pathArr) {
    var x = pathArr,
        n = x.length;
    var p = '$';

    for (var i = 1; i < n; i++) {
      if (!/^(~|\^|@.*?\(\))$/.test(x[i])) {
        p += /^[0-9*]+$/.test(x[i]) ? '[' + x[i] + ']' : "['" + x[i] + "']";
      }
    }

    return p;
  };
  /**
   * @param {string} pointer JSON Path
   * @returns {string} JSON Pointer
   */


  JSONPath.toPointer = function (pointer) {
    var x = pointer,
        n = x.length;
    var p = '';

    for (var i = 1; i < n; i++) {
      if (!/^(~|\^|@.*?\(\))$/.test(x[i])) {
        p += '/' + x[i].toString().replace(/~/g, '~0').replace(/\//g, '~1');
      }
    }

    return p;
  };
  /**
   * @param {string} expr Expression to convert
   * @returns {string[]}
   */


  JSONPath.toPathArray = function (expr) {
    var cache = JSONPath.cache;

    if (cache[expr]) {
      return cache[expr].concat();
    }

    var subx = [];
    var normalized = expr // Properties
    .replace(/@(?:null|boolean|number|string|integer|undefined|nonFinite|scalar|array|object|function|other)\(\)/g, ';$&;') // Parenthetical evaluations (filtering and otherwise), directly
    //   within brackets or single quotes
    .replace(/[['](\??\(.*?\))[\]']/g, function ($0, $1) {
      return '[#' + (subx.push($1) - 1) + ']';
    }) // Escape periods and tildes within properties
    .replace(/\['([^'\]]*)'\]/g, function ($0, prop) {
      return "['" + prop.replace(/\./g, '%@%').replace(/~/g, '%%@@%%') + "']";
    }) // Properties operator
    .replace(/~/g, ';~;') // Split by property boundaries
    .replace(/'?\.'?(?![^[]*\])|\['?/g, ';') // Reinsert periods within properties
    .replace(/%@%/g, '.') // Reinsert tildes within properties
    .replace(/%%@@%%/g, '~') // Parent
    .replace(/(?:;)?(\^+)(?:;)?/g, function ($0, ups) {
      return ';' + ups.split('').join(';') + ';';
    }) // Descendents
    .replace(/;;;|;;/g, ';..;') // Remove trailing
    .replace(/;$|'?\]|'$/g, '');
    var exprList = normalized.split(';').map(function (exp) {
      var match = exp.match(/#(\d+)/);
      return !match || !match[1] ? exp : subx[match[1]];
    });
    cache[expr] = exprList;
    return cache[expr];
  };

  var ParseError = /*@__PURE__*/(function (Error) {
    function ParseError(message, path) {
      Error.call(this);

      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, this.constructor);
      }

      this.name = 'ParseError';
      this.message = message;
      this.path = path;
    }

    if ( Error ) ParseError.__proto__ = Error;
    ParseError.prototype = Object.create( Error && Error.prototype );
    ParseError.prototype.constructor = ParseError;

    return ParseError;
  }(Error));

  var inferredProperties = {
    array: ['additionalItems', 'items', 'maxItems', 'minItems', 'uniqueItems'],
    integer: ['exclusiveMaximum', 'exclusiveMinimum', 'maximum', 'minimum', 'multipleOf'],
    object: ['additionalProperties', 'dependencies', 'maxProperties', 'minProperties', 'patternProperties', 'properties', 'required'],
    string: ['maxLength', 'minLength', 'pattern', 'format']
  };
  inferredProperties.number = inferredProperties.integer;
  var subschemaProperties = ['additionalItems', 'items', 'additionalProperties', 'dependencies', 'patternProperties', 'properties'];
  /**
   * Iterates through all keys of `obj` and:
   * - checks whether those keys match properties of a given inferred type
   * - makes sure that `obj` is not a subschema; _Do not attempt to infer properties named as subschema containers. The
   * reason for this is that any property name within those containers that matches one of the properties used for
   * inferring missing type values causes the container itself to get processed which leads to invalid output. (Issue 62)_
   *
   * @returns {boolean}
   */

  function matchesType(obj, lastElementInPath, inferredTypeProperties) {
    return Object.keys(obj).filter(function (prop) {
      var isSubschema = subschemaProperties.indexOf(lastElementInPath) > -1;
      var inferredPropertyFound = inferredTypeProperties.indexOf(prop) > -1;

      if (inferredPropertyFound && !isSubschema) {
        return true;
      }

      return false;
    }).length > 0;
  }
  /**
   * Checks whether given `obj` type might be inferred. The mechanism iterates through all inferred types definitions,
   * tries to match allowed properties with properties of given `obj`. Returns type name, if inferred, or null.
   *
   * @returns {string|null}
   */


  function inferType(obj, schemaPath) {
    var keys = Object.keys(inferredProperties);

    for (var i = 0; i < keys.length; i += 1) {
      var typeName = keys[i];
      var lastElementInPath = schemaPath[schemaPath.length - 1];

      if (matchesType(obj, lastElementInPath, inferredProperties[typeName])) {
        return typeName;
      }
    }
  }

  /**
   * Generates randomized boolean value.
   *
   * @returns {boolean}
   */

  function booleanGenerator() {
    return optionAPI('random')() > 0.5;
  }

  var booleanType = booleanGenerator;

  /**
   * Generates null value.
   *
   * @returns {null}
   */
  function nullGenerator() {
    return null;
  }

  var nullType = nullGenerator;

  function unique(path, items, value, sample, resolve, traverseCallback) {
    var tmp = [];
    var seen = [];

    function walk(obj) {
      var json = JSON.stringify(obj);

      if (seen.indexOf(json) === -1) {
        seen.push(json);
        tmp.push(obj);
        return true;
      }

      return false;
    }

    items.forEach(walk); // TODO: find a better solution?

    var limit = 100;

    while (tmp.length !== items.length) {
      if (!walk(traverseCallback(value.items || sample, path, resolve))) {
        limit -= 1;
      }

      if (!limit) {
        break;
      }
    }

    return tmp;
  } // TODO provide types


  function arrayType(value, path, resolve, traverseCallback) {
    var items = [];

    if (!(value.items || value.additionalItems)) {
      if (utils.hasProperties(value, 'minItems', 'maxItems', 'uniqueItems')) {
        throw new ParseError(("missing items for " + (utils.short(value))), path);
      }

      return items;
    }

    if (Array.isArray(value.items)) {
      return value.items.map(function (item, key) {
        var itemSubpath = path.concat(['items', key]);
        return traverseCallback(item, itemSubpath, resolve);
      });
    }

    var minItems = value.minItems;
    var maxItems = value.maxItems;

    if (optionAPI('minItems')) {
      // fix boundaries
      minItems = !maxItems ? optionAPI('minItems') : Math.min(optionAPI('minItems'), maxItems);
    }

    if (optionAPI('maxItems')) {
      // Don't allow user to set max items above our maximum
      if (maxItems && maxItems > optionAPI('maxItems')) {
        maxItems = optionAPI('maxItems');
      } // Don't allow user to set min items above our maximum


      if (minItems && minItems > optionAPI('maxItems')) {
        minItems = maxItems;
      }
    }

    var optionalsProbability = optionAPI('alwaysFakeOptionals') === true ? 1.0 : optionAPI('optionalsProbability');
    var fixedProbabilities = optionAPI('alwaysFakeOptionals') || optionAPI('fixedProbabilities') || false;
    var length = random.number(minItems, maxItems, 1, 5);

    if (optionalsProbability !== false) {
      length = Math.max(fixedProbabilities ? Math.round((maxItems || length) * optionalsProbability) : Math.abs(random.number(minItems, maxItems) * optionalsProbability), minItems || 0);
    } // TODO below looks bad. Should additionalItems be copied as-is?


    var sample = typeof value.additionalItems === 'object' ? value.additionalItems : {};

    for (var current = items.length; current < length; current += 1) {
      var itemSubpath = path.concat(['items', current]);
      var element = traverseCallback(value.items || sample, itemSubpath, resolve);
      items.push(element);
    }

    if (value.uniqueItems) {
      return unique(path.concat(['items']), items, value, sample, resolve, traverseCallback);
    }

    return items;
  }

  function numberType(value) {
    var min = typeof value.minimum === 'undefined' ? env.MIN_INTEGER : value.minimum;
    var max = typeof value.maximum === 'undefined' ? env.MAX_INTEGER : value.maximum;
    var multipleOf = value.multipleOf;

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
      if (String(multipleOf).indexOf('.') === -1) {
        var base = random.number(Math.floor(min / multipleOf), Math.floor(max / multipleOf)) * multipleOf;

        while (base < min) {
          base += value.multipleOf;
        }

        return base;
      }

      var boundary = (max - min) / multipleOf;
      var num;
      var fix;

      do {
        num = random.number(0, boundary) * multipleOf;
        fix = num / multipleOf % 1;
      } while (fix !== 0); // FIXME: https://github.com/json-schema-faker/json-schema-faker/issues/379


      return num;
    }

    return random.number(min, max, undefined, undefined, true);
  }

  // returns floating point numbers, and `integer` type truncates the fraction
  // part, leaving the result as an integer.

  function integerType(value) {
    return numberType(Object.assign({
      multipleOf: 1
    }, value));
  }

  var LIPSUM_WORDS = "Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore\net dolore magna aliqua Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea\ncommodo consequat Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla\npariatur Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est\nlaborum".split(/\W/);
  /**
   * Generates randomized array of single lorem ipsum words.
   *
   * @param length
   * @returns {Array.<string>}
   */

  function wordsGenerator(length) {
    var words = random.shuffle(LIPSUM_WORDS);
    return words.slice(0, length);
  }

  var anyType = {
    type: ['string', 'number', 'integer', 'boolean']
  }; // TODO provide types

  function objectType(value, path, resolve, traverseCallback) {
    var props = {};
    var properties = value.properties || {};
    var patternProperties = value.patternProperties || {};
    var requiredProperties = typeof value.required === 'boolean' ? [] : (value.required || []).slice();
    var allowsAdditional = value.additionalProperties !== false;
    var propertyKeys = Object.keys(properties);
    var patternPropertyKeys = Object.keys(patternProperties);
    var optionalProperties = propertyKeys.concat(patternPropertyKeys).reduce(function (_response, _key) {
      if (requiredProperties.indexOf(_key) === -1) { _response.push(_key); }
      return _response;
    }, []);
    var allProperties = requiredProperties.concat(optionalProperties);
    var additionalProperties = allowsAdditional // eslint-disable-line
    ? value.additionalProperties === true ? anyType : value.additionalProperties : value.additionalProperties;

    if (!allowsAdditional && propertyKeys.length === 0 && patternPropertyKeys.length === 0 && utils.hasProperties(value, 'minProperties', 'maxProperties', 'dependencies', 'required')) {
      // just nothing
      return {};
    }

    if (optionAPI('requiredOnly') === true) {
      requiredProperties.forEach(function (key) {
        if (properties[key]) {
          props[key] = properties[key];
        }
      });
      return traverseCallback(props, path.concat(['properties']), resolve);
    }

    var optionalsProbability = optionAPI('alwaysFakeOptionals') === true ? 1.0 : optionAPI('optionalsProbability');
    var fixedProbabilities = optionAPI('alwaysFakeOptionals') || optionAPI('fixedProbabilities') || false;
    var ignoreProperties = optionAPI('ignoreProperties') || [];
    var min = Math.max(value.minProperties || 0, requiredProperties.length);
    var max = value.maxProperties || allProperties.length + (allowsAdditional ? random.number(1, 5) : 0);
    var neededExtras = Math.max(0, min - requiredProperties.length);

    if (allProperties.length === 1 && !requiredProperties.length) {
      neededExtras = random.number(neededExtras, allProperties.length + (allProperties.length - min));
    }

    if (optionalsProbability !== false) {
      if (fixedProbabilities === true) {
        neededExtras = Math.round(min - requiredProperties.length + optionalsProbability * (allProperties.length - min));
      } else {
        neededExtras = random.number(min - requiredProperties.length, optionalsProbability * (allProperties.length - min));
      }
    }

    var extraPropertiesRandomOrder = random.shuffle(optionalProperties).slice(0, neededExtras);
    var extraProperties = optionalProperties.filter(function (_item) {
      return extraPropertiesRandomOrder.indexOf(_item) !== -1;
    }); // properties are read from right-to-left

    var _props = requiredProperties.concat(extraProperties).slice(0, max);

    var _defns = [];

    if (value.dependencies) {
      Object.keys(value.dependencies).forEach(function (prop) {
        var _required = value.dependencies[prop];

        if (_props.indexOf(prop) !== -1) {
          if (Array.isArray(_required)) {
            // property-dependencies
            _required.forEach(function (sub) {
              if (_props.indexOf(sub) === -1) {
                _props.push(sub);
              }
            });
          } else {
            _defns.push(_required);
          }
        }
      }); // schema-dependencies

      if (_defns.length) {
        delete value.dependencies;
        return traverseCallback({
          allOf: _defns.concat(value)
        }, path.concat(['properties']), resolve);
      }
    }

    var skipped = [];

    _props.forEach(function (key) {
      for (var i = 0; i < ignoreProperties.length; i += 1) {
        if (ignoreProperties[i] instanceof RegExp && ignoreProperties[i].test(key) || typeof ignoreProperties[i] === 'string' && ignoreProperties[i] === key || typeof ignoreProperties[i] === 'function' && ignoreProperties[i](properties[key], key)) {
          skipped.push(key);
          return;
        }
      }

      if (properties[key]) {
        props[key] = properties[key];
      }

      var found; // then try patternProperties

      patternPropertyKeys.forEach(function (_key) {
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
        // try patternProperties again,
        var subschema = patternProperties[key] || additionalProperties; // FIXME: allow anyType as fallback when no subschema is given?

        if (subschema && additionalProperties !== false) {
          // otherwise we can use additionalProperties?
          props[patternProperties[key] ? random.randexp(key) : key] = properties[key] || subschema;
        }
      }
    });

    var fillProps = optionAPI('fillProperties');
    var reuseProps = optionAPI('reuseProperties'); // discard already ignored props if they're not required to be filled...

    var current = Object.keys(props).length + (fillProps ? 0 : skipped.length); // generate dynamic suffix for additional props...

    var hash = function (suffix) { return random.randexp(("_?[_a-f\\d]{1,3}" + (suffix ? '\\$?' : ''))); };

    function get(from) {
      var one;

      do {
        if (!from.length) { break; }
        one = from.shift();
      } while (props[one]);

      return one;
    }

    while (fillProps) {
      if (!(patternPropertyKeys.length || allowsAdditional)) {
        break;
      }

      if (current >= min) {
        break;
      }

      if (allowsAdditional) {
        if (reuseProps && propertyKeys.length - current > min) {
          var count = 0;
          var key = (void 0);

          do {
            count += 1; // skip large objects

            if (count > 1000) {
              break;
            }

            key = get(requiredProperties) || random.pick(propertyKeys);
          } while (typeof props[key] !== 'undefined');

          if (typeof props[key] === 'undefined') {
            props[key] = properties[key];
            current += 1;
          }
        } else if (patternPropertyKeys.length && !additionalProperties) {
          var prop = random.pick(patternPropertyKeys);
          var word = random.randexp(prop);

          if (!props[word]) {
            props[word] = patternProperties[prop];
            current += 1;
          }
        } else {
          var word$1 = get(requiredProperties) || wordsGenerator(1) + hash();

          if (!props[word$1]) {
            props[word$1] = additionalProperties || anyType;
            current += 1;
          }
        }
      }

      for (var i = 0; current < min && i < patternPropertyKeys.length; i += 1) {
        var _key = patternPropertyKeys[i];
        var word$2 = random.randexp(_key);

        if (!props[word$2]) {
          props[word$2] = patternProperties[_key];
          current += 1;
        }
      }
    } // fill up-to this value and no more!


    if (requiredProperties.length === 0 && (!allowsAdditional || optionalsProbability === false)) {
      var maximum = random.number(min, max);

      for (; current < maximum;) {
        var word$3 = get(propertyKeys);

        if (word$3) {
          props[word$3] = properties[word$3];
        }

        current += 1;
      }
    }

    return traverseCallback(props, path.concat(['properties']), resolve);
  }

  /**
   * Helper function used by thunkGenerator to produce some words for the final result.
   *
   * @returns {string}
   */

  function produce() {
    var length = random.number(1, 5);
    return wordsGenerator(length).join(' ');
  }
  /**
   * Generates randomized concatenated string based on words generator.
   *
   * @returns {string}
   */


  function thunkGenerator(min, max) {
    if ( min === void 0 ) min = 0;
    if ( max === void 0 ) max = 140;

    var _min = Math.max(0, min);

    var _max = random.number(_min, max);

    var result = produce(); // append until length is reached

    while (result.length < _min) {
      result += produce();
    } // cut if needed


    if (result.length > _max) {
      result = result.substr(0, _max);
    }

    return result;
  }

  /**
   * Generates randomized ipv4 address.
   *
   * @returns {string}
   */

  function ipv4Generator() {
    return [0, 0, 0, 0].map(function () {
      return random.number(0, 255);
    }).join('.');
  }

  /**
   * Generates randomized date time ISO format string.
   *
   * @returns {string}
   */

  function dateTimeGenerator() {
    return random.date().toISOString();
  }

  /**
   * Generates randomized date format string.
   *
   * @returns {string}
   */

  function dateGenerator() {
    return dateTimeGenerator().slice(0, 10);
  }

  /**
   * Generates randomized time format string.
   *
   * @returns {string}
   */

  function timeGenerator() {
    return dateTimeGenerator().slice(11);
  }

  var FRAGMENT = '[a-zA-Z][a-zA-Z0-9+-.]*';
  var URI_PATTERN = "https?://{hostname}(?:" + FRAGMENT + ")+";
  var PARAM_PATTERN = '(?:\\?([a-z]{1,7}(=\\w{1,5})?&){0,3})?';
  /**
   * Predefined core formats
   * @type {[key: string]: string}
   */

  var regexps = {
    email: '[a-zA-Z\\d][a-zA-Z\\d-]{1,13}[a-zA-Z\\d]@{hostname}',
    hostname: '[a-zA-Z]{1,33}\\.[a-z]{2,4}',
    ipv6: '[a-f\\d]{4}(:[a-f\\d]{4}){7}',
    uri: URI_PATTERN,
    slug: '[a-zA-Z\\d_-]+',
    // types from draft-0[67] (?)
    'uri-reference': ("" + URI_PATTERN + PARAM_PATTERN),
    'uri-template': URI_PATTERN.replace('(?:', '(?:/\\{[a-z][:a-zA-Z0-9-]*\\}|'),
    'json-pointer': ("(/(?:" + (FRAGMENT.replace(']*', '/]*')) + "|~[01]))+"),
    // some types from https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.1.md#data-types (?)
    uuid: '^(?:urn:uuid:)?[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$'
  };
  regexps.iri = regexps['uri-reference'];
  regexps['iri-reference'] = regexps['uri-reference'];
  regexps['idn-email'] = regexps.email;
  regexps['idn-hostname'] = regexps.hostname;
  var ALLOWED_FORMATS = new RegExp(("\\{(" + (Object.keys(regexps).join('|')) + ")\\}"));
  /**
   * Generates randomized string basing on a built-in regex format
   *
   * @param coreFormat
   * @returns {string}
   */

  function coreFormatGenerator(coreFormat) {
    return random.randexp(regexps[coreFormat]).replace(ALLOWED_FORMATS, function (match, key) {
      return random.randexp(regexps[key]);
    });
  }

  function generateFormat(value, invalid) {
    var callback = formatAPI(value.format);

    if (typeof callback === 'function') {
      return callback(value);
    }

    switch (value.format) {
      case 'date-time':
      case 'datetime':
        return dateTimeGenerator();

      case 'date':
        return dateGenerator();

      case 'time':
        return timeGenerator();

      case 'ipv4':
        return ipv4Generator();

      case 'regex':
        // TODO: discuss
        return '.+?';

      case 'email':
      case 'hostname':
      case 'ipv6':
      case 'uri':
      case 'uri-reference':
      case 'iri':
      case 'iri-reference':
      case 'idn-email':
      case 'idn-hostname':
      case 'json-pointer':
      case 'slug':
      case 'uri-template':
      case 'uuid':
        return coreFormatGenerator(value.format);

      default:
        if (typeof callback === 'undefined') {
          if (optionAPI('failOnInvalidFormat')) {
            throw new Error(("unknown registry key " + (utils.short(value.format))));
          } else {
            return invalid();
          }
        }

        throw new Error(("unsupported format '" + (value.format) + "'"));
    }
  }

  function stringType(value) {
    // here we need to force type to fix #467
    var output = utils.typecast('string', value, function (opts) {
      if (value.format) {
        return generateFormat(value, function () { return thunkGenerator(opts.minLength, opts.maxLength); });
      }

      if (value.pattern) {
        return random.randexp(value.pattern);
      }

      return thunkGenerator(opts.minLength, opts.maxLength);
    });
    return output;
  }

  var typeMap = {
    boolean: booleanType,
    null: nullType,
    array: arrayType,
    integer: integerType,
    number: numberType,
    object: objectType,
    string: stringType
  };

  function traverse(schema, path, resolve, rootSchema) {
    schema = resolve(schema, path);

    if (!schema) {
      return;
    } // default values has higher precedence


    if (path[path.length - 1] !== 'properties') {
      // example values have highest precedence
      if (optionAPI('useExamplesValue') && Array.isArray(schema.examples)) {
        // include `default` value as example too
        var fixedExamples = schema.examples.concat('default' in schema ? [schema.default] : []);
        return utils.typecast(null, schema, function () { return random.pick(fixedExamples); });
      }

      if (optionAPI('useDefaultValue') && 'default' in schema) {
        return schema.default;
      }

      if ('template' in schema) {
        return utils.template(schema.template, rootSchema);
      }
    }

    if (schema.not && typeof schema.not === 'object') {
      schema = utils.notValue(schema.not, utils.omitProps(schema, ['not']));
    }

    if ('const' in schema) {
      return schema.const;
    }

    if (Array.isArray(schema.enum)) {
      return utils.typecast(null, schema, function () { return random.pick(schema.enum); });
    } // thunks can return sub-schemas


    if (typeof schema.thunk === 'function') {
      return traverse(schema.thunk(), path, resolve);
    }

    if (typeof schema.generate === 'function') {
      return utils.typecast(null, schema, function () { return schema.generate(rootSchema); });
    } // TODO remove the ugly overcome


    var type = schema.type;

    if (Array.isArray(type)) {
      type = random.pick(type);
    } else if (typeof type === 'undefined') {
      // Attempt to infer the type
      type = inferType(schema, path) || type;

      if (type) {
        schema.type = type;
      }
    }

    if (typeof type === 'string') {
      if (!typeMap[type]) {
        if (optionAPI('failOnInvalidTypes')) {
          throw new ParseError(("unknown primitive " + (utils.short(type))), path.concat(['type']));
        } else {
          return optionAPI('defaultInvalidTypeProduct');
        }
      } else {
        try {
          return typeMap[type](schema, path, resolve, traverse);
        } catch (e) {
          if (typeof e.path === 'undefined') {
            throw new ParseError(e.stack, path);
          }

          throw e;
        }
      }
    }

    var copy = {};

    if (Array.isArray(schema)) {
      copy = [];
    }

    Object.keys(schema).forEach(function (prop) {
      if (typeof schema[prop] === 'object' && prop !== 'definitions') {
        copy[prop] = traverse(schema[prop], path.concat([prop]), resolve, copy);
      } else {
        copy[prop] = schema[prop];
      }
    });
    return copy;
  }

  function isEmpty$1(value) {
    return Object.prototype.toString.call(value) === '[object Object]' && !Object.keys(value).length;
  }

  function pick$1(data) {
    return Array.isArray(data) ? random.pick(data) : data;
  }

  function cycle(data, reverse) {
    if (!Array.isArray(data)) {
      return data;
    }

    var value = reverse ? data.pop() : data.shift();

    if (reverse) {
      data.unshift(value);
    } else {
      data.push(value);
    }

    return value;
  }

  function clean(obj, isArray) {
    if (!obj || typeof obj !== 'object') {
      return obj;
    }

    if (Array.isArray(obj)) {
      return obj.map(function (value) { return clean(value, true); }).filter(function (value) { return typeof value !== 'undefined'; });
    }

    Object.keys(obj).forEach(function (k) {
      if (!isEmpty$1(obj[k])) {
        var value = clean(obj[k]);

        if (!isEmpty$1(value)) {
          obj[k] = value;
        }
      } else {
        delete obj[k];
      }
    });

    if (!Object.keys(obj).length && isArray) {
      return undefined;
    }

    return obj;
  }

  function resolve(obj, data, values, property) {
    if (!obj || typeof obj !== 'object') {
      return obj;
    }

    if (!values) {
      values = {};
    }

    if (!data) {
      data = obj;
    }

    if (Array.isArray(obj)) {
      return obj.map(function (x) { return resolve(x, data, values, property); });
    }

    if (obj.jsonPath) {
      var params = typeof obj.jsonPath !== 'object' ? {
        path: obj.jsonPath
      } : obj.jsonPath;
      params.group = obj.group || params.group || property;
      params.cycle = obj.cycle || params.cycle || false;
      params.reverse = obj.reverse || params.reverse || false;
      params.count = obj.count || params.count || 1;
      var key = (params.group) + "__" + (params.path);

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

      return pick$1(values[key]);
    }

    Object.keys(obj).forEach(function (k) {
      obj[k] = resolve(obj[k], data, values, k);
    });
    return obj;
  } // TODO provide types


  function run$1(refs, schema, container) {
    try {
      var seen = {};
      var result = traverse(utils.clone(schema), [], function reduce(sub, parentSchemaPath) {
        if (!sub || seen[sub.$ref] > random.pick([0, 1])) {
          if (sub) {
            delete sub.$ref;
            return sub;
          }

          return null;
        }

        if (typeof sub.generate === 'function') {
          return sub;
        } // cleanup


        var _id = sub.$id || sub.id;

        if (typeof _id === 'string') {
          delete sub.id;
          delete sub.$id;
          delete sub.$schema;
        }

        if (typeof sub.$ref === 'string') {
          seen[sub.$ref] = seen[sub.$ref] || 0;
          seen[sub.$ref] += 1;

          if (sub.$ref === '#') {
            delete sub.$ref;
            return sub;
          }

          var ref;

          if (sub.$ref.indexOf('#/') === -1) {
            ref = refs[sub.$ref] || null;
          }

          if (sub.$ref.indexOf('#/definitions/') === 0) {
            ref = schema.definitions[sub.$ref.split('#/definitions/')[1]] || null;
          }

          if (typeof ref !== 'undefined') {
            if (!ref && optionAPI('ignoreMissingRefs') !== true) {
              throw new Error(("Reference not found: " + (sub.$ref)));
            }

            utils.merge(sub, ref || {});
          } // just remove the reference


          delete sub.$ref;
          return sub;
        }

        if (Array.isArray(sub.allOf)) {
          var schemas = sub.allOf;
          delete sub.allOf; // this is the only case where all sub-schemas
          // must be resolved before any merge

          schemas.forEach(function (subSchema) {
            var _sub = reduce(subSchema, parentSchemaPath); // call given thunks if present


            utils.merge(sub, typeof _sub.thunk === 'function' ? _sub.thunk() : _sub);
          });
        }

        if (Array.isArray(sub.oneOf || sub.anyOf)) {
          var mix = sub.oneOf || sub.anyOf; // test every value from the enum against each-oneOf
          // schema, only values that validate once are kept

          if (sub.enum && sub.oneOf) {
            sub.enum = sub.enum.filter(function (x) { return utils.validate(x, mix); });
          }

          return {
            thunk: function thunk() {
              var copy = utils.omitProps(sub, ['anyOf', 'oneOf']);
              var fixed = random.pick(mix);
              utils.merge(copy, fixed);

              if (sub.oneOf && copy.properties) {
                mix.forEach(function (omit) {
                  if (omit !== fixed && omit.required) {
                    omit.required.forEach(function (key) {
                      delete copy.properties[key];
                    });
                  }
                });
              }

              return copy;
            }

          };
        }

        Object.keys(sub).forEach(function (prop) {
          if ((Array.isArray(sub[prop]) || typeof sub[prop] === 'object') && !utils.isKey(prop)) {
            sub[prop] = reduce(sub[prop], parentSchemaPath.concat(prop));
          }
        }); // avoid extra calls on sub-schemas, fixes #458

        if (parentSchemaPath) {
          var lastProp = parentSchemaPath[parentSchemaPath.length - 1];

          if (lastProp === 'properties' || lastProp === 'items') {
            return sub;
          }
        }

        return container.wrap(sub);
      });

      if (optionAPI('resolveJsonPath')) {
        return resolve(clean(result));
      }

      return clean(result);
    } catch (e) {
      if (e.path) {
        throw new Error(((e.message) + " in /" + (e.path.join('/'))));
      } else {
        throw e;
      }
    }
  }

  var container = new Container();

  function setupKeywords() {
    // built-in support
    container.define('pattern', random.randexp); // safe auto-increment values

    container.define('autoIncrement', function autoIncrement(value, schema) {
      if (!this.offset) {
        var min = schema.minimum || 1;
        var max = min + env.MAX_NUMBER;
        var offset = value.initialOffset || schema.initialOffset;
        this.offset = offset || random.number(min, max);
      }

      if (value === true) {
        return this.offset++; // eslint-disable-line
      }

      return schema;
    }); // safe-and-sequential dates

    container.define('sequentialDate', function sequentialDate(value, schema) {
      if (!this.now) {
        this.now = random.date();
      }

      if (value) {
        schema = this.now.toISOString();
        value = value === true ? 'days' : value;

        if (['seconds', 'minutes', 'hours', 'days', 'weeks', 'months', 'years'].indexOf(value) === -1) {
          throw new Error(("Unsupported increment by " + (utils.short(value))));
        }

        this.now.setTime(this.now.getTime() + random.date(value));
      }

      return schema;
    });
  }

  function getRefs(refs) {
    var $refs = {};

    if (Array.isArray(refs)) {
      refs.forEach(function (schema) {
        $refs[schema.$id || schema.id] = schema;
      });
    } else {
      $refs = refs || {};
    }

    return $refs;
  }

  var jsf = function (schema, refs, cwd) {
    console.log('[json-schema-faker] calling JsonSchemaFaker() is deprecated, call either .generate() or .resolve()');

    if (cwd) {
      console.log('[json-schema-faker] references are only supported by calling .resolve()');
    }

    return jsf.generate(schema, refs);
  };

  jsf.generate = function (schema, refs) {
    var $refs = getRefs(refs);
    return run$1($refs, schema, container);
  };

  jsf.resolve = function (schema, refs, cwd) {
    if (typeof refs === 'string') {
      cwd = refs;
      refs = {};
    } // normalize basedir (browser aware)


    cwd = cwd || (typeof process !== 'undefined' ? process.cwd() : '');
    cwd = (cwd.replace(/\/+$/, '')) + "/";
    var $refs = getRefs(refs); // identical setup as json-schema-sequelizer

    var fixedRefs = {
      order: 300,
      canRead: true,

      read: function read(file, callback) {
        try {
          callback(null, $refs[file.url] || $refs[file.url.split('/').pop()]);
        } catch (e) {
          callback(e);
        }
      }

    };
    return lib.dereference(cwd, schema, {
      resolve: {
        file: {
          order: 100
        },
        http: {
          order: 200
        },
        fixedRefs: fixedRefs
      },
      dereference: {
        circular: 'ignore'
      }
    }).then(function (sub) { return run$1($refs, sub, container); });
  };

  setupKeywords();
  jsf.format = formatAPI;
  jsf.option = optionAPI;
  jsf.random = random; // returns itself for chaining

  jsf.extend = function (name, cb) {
    container.extend(name, cb);
    return jsf;
  };

  jsf.define = function (name, cb) {
    container.define(name, cb);
    return jsf;
  };

  jsf.reset = function (name) {
    container.reset(name);
    setupKeywords();
    return jsf;
  };

  jsf.locate = function (name) {
    return container.get(name);
  };

  jsf.version = '0.5.0-rc16';

  return jsf;

}));
