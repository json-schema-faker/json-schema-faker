import number from './number';

// The `integer` type is just a wrapper for the `number` type. The `number` type
// returns floating point numbers, and `integer` type truncates the fraction
// part, leaving the result as an integer.

var integerType: FTypeGenerator = function integerType(value: INumberSchema): number {
  return number(Object.assign({}, {multipleOf: 1}, value));
};

export default integerType;
