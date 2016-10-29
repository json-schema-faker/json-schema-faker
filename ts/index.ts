import container = require('./class/Container');
import format = require('./api/format');
import option = require('./api/option');
import run = require('./core/run');

var jsf = <jsfAPI>function(schema: JsonSchema, refs?: any) {
  return run(schema, refs);
};

jsf.format = format;

jsf.option = option;

// returns itself for chaining
jsf.extend = function(name: string, cb: Function) {
  container.extend(name, cb);
  return jsf;
};

jsf.version = '0.3.6';

export = jsf;
