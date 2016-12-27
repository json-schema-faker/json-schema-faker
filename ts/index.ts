import container from './class/Container';
import format from './api/format';
import option from './api/option';
import run from './core/run';

var jsf = <jsfAPI>function(schema: JsonSchema, refs?: any, cwd?: string) {
  return run(schema, refs, cwd);
};

jsf.format = format;

jsf.option = option;

// returns itself for chaining
jsf.extend = function(name: string, cb: Function) {
  container.extend(name, cb);
  return jsf;
};

jsf.version = '0.4.0';

export default jsf;
