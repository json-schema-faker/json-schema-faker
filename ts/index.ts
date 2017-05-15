import $RefParser from 'json-schema-ref-parser';
import deref from 'deref';

import Container from './class/Container';
import format from './api/format';
import option from './api/option';
import utils from './core/utils';
import run from './core/run';

var container = new Container();

function getRefs(refs?: any) {
  var $refs = {};

  if (Array.isArray(refs)) {
    refs.forEach(function(schema) {
      $refs[schema.id] = schema;
    });
  } else {
    $refs = refs || {};
  }

  return $refs;
}

var jsf = function(schema: JsonSchema, refs?: any) {
  const $ = deref();

  var $refs = getRefs(refs);

  return run($(schema, $refs, true), container);
};

jsf.resolve = <jsfAPI>function(schema: JsonSchema, refs?: any, cwd?: string) {
  if (typeof refs === 'string') {
    cwd = refs;
    refs = [];
  }

  var $refs = getRefs(refs);

  var fixedRefs = {
    order: 300,
    canRead: true,
    read: function(file, callback) {
      callback(null, $refs[file.url] || $refs[file.url.split('/').pop()]);
    },
  };

  // normalize basedir (browser aware)
  cwd = cwd || (typeof process !== 'undefined' ? process.cwd() : '');
  cwd = cwd.replace(/\/+$/, '') + '/';

  return $RefParser.dereference(cwd, schema, {
    resolve: {
      fixedRefs: fixedRefs,
    },
  }).then((schema) => run(schema, container));
};

jsf.utils = utils;

jsf.format = format;

jsf.option = option;

// built-in support
container.define('pattern', utils.randexp);

// returns itself for chaining
jsf.extend = function(name: string, cb: Function) {
  container.extend(name, cb);
  return jsf;
};

jsf.define = function(name: string, cb: Function) {
  container.define(name, cb);
  return jsf;
};

jsf.locate = function(name: string) {
  return container.get(name);
};

jsf.version = '0.5.0-rc3';

export default jsf;
