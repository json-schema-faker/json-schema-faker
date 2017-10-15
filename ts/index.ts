import container from './class/Container';
import format from './api/format';
import option from './api/option';
import run from './core/run';

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

/* global VERSION */

jsf.version = VERSION;

export default jsf;
