import $RefParser from 'json-schema-ref-parser';
import container from './class/Container';
import format from './api/format';
import option from './api/option';
import run from './core/run';

var jsf = <jsfAPI>function(schema: JsonSchema, refs?: any, cwd?: string) {
  var $refs = {};

  if (Array.isArray(refs)) {
    refs.forEach(function(schema) {
      $refs[schema.id] = schema;
    });
  } else {
    $refs = refs || {};
  }

  var fixedRefs = {
    order: 300,
    canRead: true,
    read: function(file, callback) {
      callback(null, $refs[file.url] || $refs[file.url.split('/').pop()]);
    },
  };

  // normalize basedir
  cwd = (cwd || process.cwd()).replace(/\/+$/, '') + '/';

  return $RefParser.dereference(cwd, schema, {
    resolve: {
      fixedRefs: fixedRefs,
    },
  }).then(run);
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
