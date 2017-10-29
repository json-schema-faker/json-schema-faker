import random from '../core/random';

var MIN_INTEGER = -100000000,
    MAX_INTEGER = 100000000;

var numberType: FTypeGenerator = function numberType(value: INumberSchema): number {
  var min = typeof value.minimum === 'undefined' ? MIN_INTEGER : value.minimum,
      max = typeof value.maximum === 'undefined' ? MAX_INTEGER : value.maximum,
      multipleOf = value.multipleOf;

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

    do {
      var num = random.number(0, boundary) * multipleOf;
      var fix = (num / multipleOf) % 1;
    } while (fix !== 0);

    return num;
  }

  return random.number(min, max, undefined, undefined, true);
};

export default numberType;
