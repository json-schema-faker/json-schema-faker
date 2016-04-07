import _boolean = require('./boolean');
import _null = require('./null');
import _array = require('./array');
import _integer = require('./integer');
import _number = require('./number');
import _object = require('./object');
import _string = require('./string');
import _external = require('./external');

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

export = typeMap;
