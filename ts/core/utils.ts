import optionAPI from '../api/option';

const RandExp = require('randexp');

// set maximum default, see #193
RandExp.prototype.max = 10;

// same implementation as the original except using our random
RandExp.prototype.randInt = (a, b) =>
  a + Math.floor(optionAPI('random')() * (1 + b - a));

function _randexp(value: string) {
  var re = new RandExp(value);

  // apply given setting
  re.max = optionAPI('defaultRandExpMax');

  return re.gen();
}

function getSubAttribute(obj: any, dotSeparatedKey: string): any {
  var keyElements: string[] = dotSeparatedKey.split('.');

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
function hasProperties(obj: Object, ...properties: string[]): boolean {
  return properties.filter(function(key: string): boolean {
    return typeof obj[key] !== 'undefined';
  }).length > 0;
}

/**
 * Returns typecasted value.
 * External generators (faker, chance, casual) may return data in non-expected formats, such as string, when you might expect an
 * integer. This function is used to force the typecast.
 *
 * @param value
 * @param targetType
 * @returns {any}
 */
function typecast(value: any, schema: JsonSchema): any {
  // FIXME this function should cover most cases and should be reused within generators
  switch (schema.type) {
    case 'integer':
      return parseInt(value, 10);
    case 'number':
      return parseFloat(value);
    case 'string':
      value = String(value);

      var min = Math.max(schema.minLength || 0, 0);
      var max = Math.min(schema.maxLength || Infinity, Infinity);

      while (value.length < min) {
        value += ' ' + value;
      }

      if (value.length > max) {
        value = value.substr(0, max);
      }

      return value;
    case 'boolean':
      return !!value;
    default:
      return value;
  }
}

function merge(a: Object, b: Object): Object {
  for (var key in b) {
    if (typeof b[key] !== 'object' || b[key] === null) {
      a[key] = b[key];
    } else if (Array.isArray(b[key])) {
      a[key] = a[key] || [];
      // fix #292 - skip duplicated values from merge object (b)
      b[key].forEach(function(value) {
        if (a[key].indexOf(value)) {
          a[key].push(value);
        }
      });
    } else if (typeof a[key] !== 'object' || a[key] === null || Array.isArray(a[key])) {
      a[key] = merge({}, b[key]);
    } else {
      a[key] = merge(a[key], b[key]);
    }
  }
  return a;
}

function clean(obj, isArray, requiredProps) {
  if (!obj || typeof obj !== 'object') {
      return obj;
  }
  if (Array.isArray(obj)) {
    obj = obj
      .map(function (value) { return clean(value, true, requiredProps); })
      .filter(function (value) { return typeof value !== 'undefined'; });

    return obj;
  }
  Object.keys(obj).forEach(function(k) {
    if (!requiredProps || requiredProps.indexOf(k) === -1) {
      if (Array.isArray(obj[k]) && !obj[k].length) {
        delete obj[k];
      }
    } else {
      obj[k] = clean(obj[k]);
    }
  });
  if (!Object.keys(obj).length && isArray) {
    return undefined;
  }
  return obj;
}

function short(schema) {
  var s = JSON.stringify(schema);
  var l = JSON.stringify(schema, null, 2);

  return s.length > 400 ? l.substr(0, 400) + '...' : l;
}

export default {
  getSubAttribute: getSubAttribute,
  hasProperties: hasProperties,
  typecast: typecast,
  merge: merge,
  clean: clean,
  short: short,
  randexp: _randexp
};
