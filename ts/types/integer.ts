import number = require('./number');

var base = function(n) {
    var s = n + '';
    var dot = s.match(/\./);
    if (!dot) {
        return 0;
    } else {
        var exponent = s.length - dot.index - 1
        return exponent
    }
};

var gcd = function(_a, _b) {
    var a = _a;
    var b = _b;

    if (a < 0) {
        a = -a;
    }

    if (b < 0) {
        b = -b;
    }

    if (b > a) {
        var temp = a;
        a = b;
        b = temp;
    }

    while (true) {
        if (b == 0) {
            return a;
        }

        a %= b;

        if (a == 0) {
            return b;
        }

        b %= a;
    }
};

var integerMultipleOf = function(n) {
    let exponent = base(n);
    let _denominator = Math.pow(10, exponent);
    let _numerator = Math.round(n*_denominator);

    let _gcd = gcd(_denominator, _numerator);
    return Math.round(_numerator / _gcd);
};
// The `integer` type is just a wrapper for the `number` type. The `number` type
// returns floating point numbers, and `integer` type truncates the fraction
// part, leaving the result as an integer.

var integerType: FTypeGenerator = function integerType(value: INumberSchema): number {
  if (value.multipleOf) {
    value.multipleOf = integerMultipleOf(value.multipleOf);
  }
  var generated: number = number(value);
  // whether the generated number is positive or negative, need to use either
  // floor (positive) or ceil (negative) function to get rid of the fraction
  return generated > 0 ? Math.floor(generated) : Math.ceil(generated);
};

export = integerType;
