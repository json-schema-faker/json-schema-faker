import random = require('../core/random');

var MIN_INTEGER = -100000000,
    MAX_INTEGER = 100000000;

var numberType: FTypeGenerator = function numberType(value: INumberSchema): number {
  var min = typeof value.minimum === 'undefined' ? MIN_INTEGER : value.minimum,
      max = typeof value.maximum === 'undefined' ? MAX_INTEGER : value.maximum,
      multipleOf = value.multipleOf;

      if (multipleOf) {
          if (value.exclusiveMinimum && typeof value.minimum !== 'undefined') {
              min = Math.floor(min / multipleOf + 1) * multipleOf;
          } else {
              min = Math.ceil(min / multipleOf) * multipleOf;
          }
      }

      if (min >= max) {
          if (value.exclusiveMinimum || value.exclusiveMaximum) {
               return NaN;
          } else if (min === max && (!multipleOf || min === Math.floor(min / multipleOf) * multipleOf)) {
              return min;
          } else {
              return NaN;
          }
      }

      if(!value.exclusiveMaximum && value.multipleOf) {
          max = Math.ceil(max/ multipleOf) * multipleOf;
      }

      var raw = random.number(min, max, undefined, undefined, true);

      // if raw equal min and min is exclusive, update to a valid number
      if (value.exclusiveMinimum && raw === min) {
          raw = min + (max-min)/2;
      }

      if (multipleOf) {
          raw = Math.floor(raw / multipleOf) * multipleOf;
      }

      return raw;
};

export = numberType;
