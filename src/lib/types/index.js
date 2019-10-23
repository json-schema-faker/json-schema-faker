import _boolean from './boolean';
import _null from './null';
import _array from './array';
import _integer from './integer';
import _number from './number';
import _object from './object';
import _string from './string';

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
