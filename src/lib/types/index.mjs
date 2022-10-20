import _boolean from './boolean.mjs';
import _null from './null.mjs';
import _array from './array.mjs';
import _integer from './integer.mjs';
import _number from './number.mjs';
import _object from './object.mjs';
import _string from './string.mjs';

const typeMap = {
  boolean: _boolean,
  null: _null,
  array: _array,
  integer: _integer,
  number: _number,
  object: _object,
  string: _string,
};

export default typeMap;
