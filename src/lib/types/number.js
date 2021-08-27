import random from '../core/random';
import env from '../core/constants';

function numberType(value) {
  let min = typeof value.minimum === 'undefined' ? env.MIN_INTEGER : value.minimum;
  let max = typeof value.maximum === 'undefined' ? env.MAX_INTEGER : value.maximum;

  const multipleOf = value.multipleOf;
  const decimals = multipleOf && String(multipleOf).match(/e-(\d)|\.(\d+)$/);

  if (decimals) {
    const number = ((Math.random() * random.number(0, 10)) + 1) * multipleOf;
    const truncate = decimals[1] || decimals[2].length;
    const result = parseFloat(number.toFixed(truncate));
    const base = random.number(min, max - 1);

    if (!String(result).includes('.')) {
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
    let base = random.number(Math.floor(min / multipleOf), Math.floor(max / multipleOf)) * multipleOf;

    while (base < min) {
      base += multipleOf;
    }

    return base;
  }

  return random.number(min, max, undefined, undefined, true);
}

export default numberType;
