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

function walk(obj, cb) {
  var keys = Object.keys(obj);

  var retval;

  for (var i = 0; i < keys.length; i += 1) {
    retval = cb(obj[keys[i]], keys[i], obj);

    if (!retval && obj[keys[i]] && !Array.isArray(obj[keys[i]]) && typeof obj[keys[i]] === 'object') {
      retval = walk(obj[keys[i]], cb);
    }

    if (typeof retval !== 'undefined') {
      return retval;
    }
  }
}

var jsf = function(schema: JsonSchema, refs?: any) {
  var ignore = option('ignoreMissingRefs');

  const $ = deref((id, refs) => {
    // FIXME: allow custom callback?

    if (ignore) {
      return {};
    }
  });

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
      const id = cwd !== '/'
        ? file.url.replace(cwd, '')
        : file.url;

      try {
        callback(null, deref.util.findByRef(id, $refs));
      } catch (e) {
        const result = walk(schema, (v, k, sub) => {
          if (k === 'id' && v === id) {
            return sub;
          }
        });

        if (!result) {
          return callback(e);
        }

        callback(null, result);
      }
    },
  };

  return $RefParser
    .dereference(cwd, schema, {
      resolve: { fixedRefs },
      dereference: {
        circular: 'ignore',
      },
    }).then((sub) => run($refs, sub, container));
};

jsf.utils = utils;

jsf.format = format;

jsf.option = option;

// built-in support
container.define('pattern', utils.randexp);

// skip default generators
container.define('jsonPath', (value, schema) => {
  delete schema.type;
  return schema;
});

// safe auto-increment values
container.define('autoIncrement', function(value, schema) {
  if (!this.offset) {
    this.offset = schema.minimum || 1;
  }

  if (value === true) {
    return this.offset++;
  }

  return schema;
});

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
