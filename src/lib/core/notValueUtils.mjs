import utils from './utils.mjs';
import env from './constants.mjs';
import random from './random.mjs';

import numberType from '../types/number.mjs';
import integerType from '../types/integer.mjs';
import booleanType from '../types/boolean.mjs';
import stringType from '../types/string.mjs';

const TYPE_GENERATOR = {
  number: numberType,
  integer: integerType,
  string: stringType,
  boolean: booleanType,
};



export function notValue(schema, parent) {
  const copy = utils.merge({}, parent);

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
    copy.type = random?.pick(
      env.SCALAR_TYPES.filter(x => {
        const types = Array.isArray(schema.type) ? schema.type : [schema.type];

        return types.every(type => {
          // treat both types as _similar enough_ to be skipped equal
          if (x === 'number' || x === 'integer') {
            return type !== 'number' && type !== 'integer';
          }

          return x !== type;
        });
      }),
    );
  } else if (schema.enum) {
    let value;
    const expectedType = copy.type;

    do {
      try {
        value = TYPE_GENERATOR[expectedType]?.(utils.omitProps(copy, ['not'])) ?? utils.anyValue();
      } catch (e) {
        value = utils.anyValue();
      }
    } while (schema.enum.includes(value));

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
