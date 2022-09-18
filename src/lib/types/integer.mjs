import number from './number.mjs';

// The `integer` type is just a wrapper for the `number` type. The `number` type
// returns floating point numbers, and `integer` type truncates the fraction
// part, leaving the result as an integer.

function integerType(value) {
  return Math.floor(number({ ...value }));
}

export default integerType;
