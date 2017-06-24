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
    refs.map(deref.util.normalizeSchema).forEach(function(schema) {
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

  return run($refs, $(schema, $refs, true), container);
};

jsf.resolve = <jsfAPI>function(schema: JsonSchema, refs?: any, cwd?: string) {
  if (typeof refs === 'string') {
    cwd = refs;
    refs = {};
  }

  // normalize basedir (browser aware)
  cwd = cwd || (typeof process !== 'undefined' ? process.cwd() : '');
  cwd = cwd.replace(/\/+$/, '') + '/';

  var $refs = getRefs(refs);

  // identical setup as json-schema-sequelizer
  const fixedRefs = {
    order: 300,
    canRead: true,
    read(file, callback) {
      callback(null, deref.util.findByRef(cwd !== '/'
        ? file.url.replace(cwd, '')
        : file.url, $refs));
    },
  };

  return $RefParser
    .dereference(cwd, schema, {
      resolve: { fixedRefs },
      dereference: {
        circular: 'ignore',
      },
    }).then((sub) => jsf(sub, refs));
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

/* global VERSION */

jsf.version = VERSION;

export default jsf;
