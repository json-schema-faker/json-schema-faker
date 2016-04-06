import container = require('./class/Container');
import formats = require('./api/formats');
import run = require('./core/run');

var jsf = <jsfAPI>function(schema: JsonSchema, refs?: any) {
  return run(schema, refs);
};

jsf.formats = formats;

// returns itself for chaining
jsf.extend = function(name: string, cb: Function) {
  container.extend(name, cb);
  return jsf;
};

export = jsf;
