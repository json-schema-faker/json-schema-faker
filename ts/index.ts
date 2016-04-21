import container = require('./class/Container');
import format = require('./api/format');
import run = require('./core/run');

var jsf = <jsfAPI>function(schema: JsonSchema, refs?: any) {
  return run(schema, refs);
};

jsf.format = format;

// returns itself for chaining
jsf.extend = function(name: string, cb: Function) {
  container.extend(name, cb);
  return jsf;
};

export = jsf;
