import number from './number';

// The `integer` type is just a wrapper for the `number` type. The `number` type
// returns floating point numbers, and `integer` type truncates the fraction
// part, leaving the result as an integer.

var integerType: FTypeGenerator = function integerType(value: INumberSchema): number {
  var generated: number = number(value);
  // whether the generated number is positive or negative, need to use either
  // floor (positive) or ceil (negative) function to get rid of the fraction
  return generated > 0 ? Math.floor(generated) : Math.ceil(generated);
};

export default integerType;
