import optionAPI from '../api/option';
import env from '../core/constants';
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
      if (typeof schema.minLength !== 'undefined') {
        params.minLength = schema.minLength;
      }

      if (typeof schema.maxLength !== 'undefined') {
        params.maxLength = schema.maxLength;
      }

      const _maxLength = optionAPI('maxLength');
      const _minLength = optionAPI('minLength');

      // Don't allow user to set max length above our maximum
      if (_maxLength && params.maxLength > _maxLength) {
        params.maxLength = _maxLength;
      }

      // Don't allow user to set min length above our maximum
      if (_minLength && params.minLength < _minLength) {
        params.minLength = _minLength;
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

      while (value.length < min) {
        value += ` ${value}`;
      }

      if (value.length > max) {
        value = value.substr(0, max);
      }

      switch (schema.format) {
        case 'date-time':
        case 'datetime':
          value = new Date(value).toISOString().replace(/0+Z$/g, 'Z');
          break;

        case 'date':
          value = new Date(value).toISOString().substr(0, 10);
          break;

        case 'time':
          value = new Date(value).toISOString().substr(11);
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
        if (a[key].indexOf(value) === -1) {
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
    copy.type = random.pick(env.ALL_TYPES.filter(x => {
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
  return ['enum', 'const', 'default', 'examples', 'required', 'definitions'].indexOf(prop) !== -1;
}

function omitProps(obj, props) {
  const copy = {};

  Object.keys(obj).forEach(k => {
    if (props.indexOf(k) === -1) {
      if (Array.isArray(obj[k])) {
        copy[k] = obj[k].slice();
      } else {
        copy[k] = typeof obj[k] === 'object'
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

export default {
  getSubAttribute,
  hasProperties,
  omitProps,
  typecast,
  merge,
  short,
  notValue,
  anyValue,
  validate,
  isKey,
  template,
};
