import _boolean from './boolean';
import _null from './null';
import _array from './array';
import _integer from './integer';
import _number from './number';
import _object from './object';
import _string from './string';
import _external from './external';

var typeMap: {
  [type: string]: FTypeGenerator;
} = {
  boolean: _boolean,
  null: _null,
  array: _array,
  integer: _integer,
  number: _number,
  object: _object,
  string: _string,
  external: _external
};

export default typeMap;
