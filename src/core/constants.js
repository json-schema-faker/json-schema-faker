const SCALAR_TYPES = ['integer', 'number', 'string', 'boolean', 'null'];
const ALL_TYPES = ['array', 'object'].concat(SCALAR_TYPES);

const MOST_NEAR_DATETIME = 2524608000000;

const MIN_INTEGER = -100000000;
const MAX_INTEGER = 100000000;

const MIN_NUMBER = -100;
const MAX_NUMBER = 100;

export default {
  SCALAR_TYPES,
  ALL_TYPES,
  MIN_NUMBER,
  MAX_NUMBER,
  MIN_INTEGER,
  MAX_INTEGER,
  MOST_NEAR_DATETIME,
};
