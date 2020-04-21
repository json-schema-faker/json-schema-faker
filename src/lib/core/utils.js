import optionAPI from '../api/option';
import env from './constants';
import random from './random';

function getSubAttribute(obj, dotSeparatedKey) {
  const keyElements = dotSeparatedKey.split('.');

  while (keyElements.length) {
    const prop = keyElements.shift();

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
function hasProperties(obj, ...properties) {
  return properties.filter(key => {
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
  const params = {};

  // normalize constraints
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
        let min = Math.max(params.minimum || 0, 0);
        let max = Math.min(params.maximum || Infinity, Infinity);

        if (schema.exclusiveMinimum && min === schema.minimum) {
          min += schema.multipleOf || 1;
        }

        if (schema.exclusiveMaximum && max === schema.maximum) {
          max -= schema.multipleOf || 1;
        }

        // discard out-of-bounds enumerations
        if (min || max !== Infinity) {
          schema.enum = schema.enum.filter(x => {
            if (x >= min && x <= max) {
              return true;
            }

            return false;
          });
        }
      }

      break;

    case 'string': {
      params.minLength = optionAPI('minLength') || 0;
      params.maxLength = optionAPI('maxLength') || Number.MAX_SAFE_INTEGER;

      if (typeof schema.minLength !== 'undefined') {
        params.minLength = Math.max(params.minLength, schema.minLength);
      }

      if (typeof schema.maxLength !== 'undefined') {
        params.maxLength = Math.min(params.maxLength, schema.maxLength);
      }

      break;
    }

    default: break;
  }

  // execute generator
  let value = callback(params);

  // normalize output value
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

    case 'string': {
      value = String(value);

      const min = Math.max(params.minLength || 0, 0);
      const max = Math.min(params.maxLength || Infinity, Infinity);

      let prev;

      while (value.length < min) {
        prev = value;

        if (!schema.pattern) {
          value += `${random.pick([' ', '/', '_', '-', '+', '=', '@', '^'])}${value}`;
        } else {
          value += random.randexp(schema.pattern);
        }

        // avoid infinite-loops while filling strings, if no changes
        // are made we just break the loop... see #540
        if (value === prev) break;
      }

      if (value.length > max) {
        value = value.substr(0, max);
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
          value = new Date(`1969-01-01 ${value}`).toISOString().substr(11);
          break;

        default:
          break;
      }
      break;
    }

    default: break;
  }

  return value;
}

function merge(a, b) {
  Object.keys(b).forEach(key => {
    if (typeof b[key] !== 'object' || b[key] === null) {
      a[key] = b[key];
    } else if (Array.isArray(b[key])) {
      a[key] = a[key] || [];
      // fix #292 - skip duplicated values from merge object (b)
      b[key].forEach(value => {
        if (Array.isArray(a[key]) && a[key].indexOf(value) === -1) {
          a[key].push(value);
        }
      });
    } else if (typeof a[key] !== 'object' || a[key] === null || Array.isArray(a[key])) {
      a[key] = merge({}, b[key]);
    } else {
      a[key] = merge(a[key], b[key]);
    }
  });

  return a;
}

function clone(obj, cache = new Map()) {
  if (!obj || typeof obj !== 'object') {
    return obj;
  }

  if (cache.has(obj)) {
    return cache.get(obj);
  }

  if (Array.isArray(obj)) {
    const arr = [];
    cache.set(obj, arr);

    arr.push(...obj.map(x => clone(x, cache)));
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
    undefined,
    [],
    {},
    // FIXME: use built-in random?
    Math.random(),
    Math.random().toString(36).substr(2),
  ]);
}

function notValue(schema, parent) {
  const copy = merge({}, parent);

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
    copy.type = random.pick(env.SCALAR_TYPES.filter(x => {
      const types = Array.isArray(schema.type) ? schema.type : [schema.type];

      return types.every(type => {
        // treat both types as _similar enough_ to be skipped equal
        if (x === 'number' || x === 'integer') {
          return type !== 'number' && type !== 'integer';
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
    schema.required.forEach(prop => {
      delete copy.properties[prop];
    });
  }

  // TODO: explore more scenarios

  return copy;
}

// FIXME: evaluate more constraints?
function validate(value, schemas) {
  return !schemas.every(x => {
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
  return ['enum', 'const', 'default', 'examples', 'required', 'definitions', 'items', 'properties'].indexOf(prop) !== -1;
}

function omitProps(obj, props) {
  const copy = {};

  Object.keys(obj).forEach(k => {
    if (props.indexOf(k) === -1) {
      if (Array.isArray(obj[k])) {
        copy[k] = obj[k].slice();
      } else {
        copy[k] = obj[k] instanceof Object
          ? merge({}, obj[k])
          : obj[k];
      }
    }
  });

  return copy;
}

function template(value, schema) {
  if (Array.isArray(value)) {
    return value.map(x => template(x, schema));
  }

  if (typeof value === 'string') {
    value = value.replace(/#\{([\w.-]+)\}/g, (_, $1) => schema[$1]);
  }

  return value;
}

/**
 * Checks if given object is empty (has no properties)
 *
 * @param value
 * @returns {boolean}
 */
function isEmpty(value) {
  return Object.prototype.toString.call(value) === '[object Object]' && !Object.keys(value).length;
}

/**
 * Cleans up the source object removing empty objects and undefined values
 * Will not remove values which are specified as `required`
 *
 * @param obj
 * @param required
 * @param isArray
 * @returns {any}
 */
function clean(obj, required = [], isArray = false) {
  if (!obj || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj
      .map(value => clean(value, required, true))
      .filter(value => typeof value !== 'undefined');
  }

  Object.keys(obj).forEach(k => {
    if (isEmpty(obj[k])) {
      if (!required.includes(k)) {
        delete obj[k];
      }
    } else {
      const value = clean(obj[k]);

      if (!isEmpty(value)) {
        obj[k] = value;
      }
    }
    if (typeof obj[k] === 'undefined') {
      delete obj[k];
    }
  });

  if (!Object.keys(obj).length && isArray) {
    return undefined;
  }

  return obj;
}

export default {
  getSubAttribute,
  hasProperties,
  omitProps,
  typecast,
  merge,
  clone,
  short,
  notValue,
  anyValue,
  validate,
  isKey,
  template,
  clean,
  isEmpty,
};
