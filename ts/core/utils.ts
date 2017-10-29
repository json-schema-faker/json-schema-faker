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
 * integer. This function is used to force the typecast. This is the base formatter for all result values.
 *
 * @param schema
 * @param callback
 * @returns {any}
 */
function typecast(schema: JsonSchema, callback: Function): any {
  const params = {};

  // normalize constraints
  switch (schema.type) {
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

        // discard out-of-bounds enumerations
        schema.enum = schema.enum.filter(x => {
          if (x >= min && x <= max) {
            return true;
          }

          return false;
        });
      }
      break;

    case 'string':
      if (typeof schema.minLength !== 'undefined') {
        params.minLength = schema.minLength;
      }

      if (typeof schema.maxLength !== 'undefined') {
        params.maxLength = schema.maxLength;
      }

      if (optionAPI('maxLength')) {
        // Don't allow user to set max length above our maximum
        if (maxLength && maxLength > optionAPI('maxLength')) {
          params.maxLength = optionAPI('maxLength');
        }

        // Don't allow user to set min length above our maximum
        if (minLength && minLength > optionAPI('maxLength')) {
          params.minLength = optionAPI('maxLength');
        }
      }
      break;
  }

  // execute generator
  var value = callback(params);

  // normalize output value
  switch (schema.type) {
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
      value = String(value);

      var min = Math.max(params.minLength || 0, 0);
      var max = Math.min(params.maxLength || Infinity, Infinity);

      while (value.length < min) {
        value += ' ' + value;
      }

      if (value.length > max) {
        value = value.substr(0, max);
      }
      break;
  }

  return value;
}

function merge(a: Object, b: Object): Object {
  for (var key in b) {
    if (typeof b[key] !== 'object' || b[key] === null) {
      a[key] = b[key];
    } else if (Array.isArray(b[key])) {
      a[key] = a[key] || [];
      // fix #292 - skip duplicated values from merge object (b)
      b[key].forEach(function(value) {
        if (a[key].indexOf(value) === -1) {
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
