import random from '../core/random';
import env from '../core/constants';

function numberType(value) {
  let min = typeof value.minimum === 'undefined' ? env.MIN_INTEGER : value.minimum;
  let max = typeof value.maximum === 'undefined' ? env.MAX_INTEGER : value.maximum;

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
    if (String(multipleOf).indexOf('.') === -1) {
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
      fix = (num / multipleOf) % 1;
    } while (fix !== 0);

    // FIXME: https://github.com/json-schema-faker/json-schema-faker/issues/379

    return num;
  }

  return random.number(min, max, undefined, undefined, true);
}

export default numberType;
