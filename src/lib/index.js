import $RefParser from 'json-schema-ref-parser';

import Container from './class/Container';
import format from './api/format';
import option from './api/option';
import env from './core/constants';
import random from './core/random';
import utils from './core/utils';
import run from './core/run';

const container = new Container();

function setupKeywords() {
  // built-in support
  container.define('pattern', random.randexp);

  // safe auto-increment values
  container.define('autoIncrement', function autoIncrement(value, schema) {
    if (!this.offset) {
      const min = schema.minimum || 1;
      const max = min + env.MAX_NUMBER;
      const offset = value.initialOffset || schema.initialOffset;

      this.offset = offset || random.number(min, max);
    }

    if (value === true) {
      return this.offset++; // eslint-disable-line
    }

    return schema;
  });

  // safe-and-sequential dates
  container.define('sequentialDate', function sequentialDate(value, schema) {
    if (!this.now) {
      this.now = random.date();
    }

    if (value) {
      schema = this.now.toISOString();
      value = value === true
        ? 'days'
        : value;

      if (['seconds', 'minutes', 'hours', 'days', 'weeks', 'months', 'years'].indexOf(value) === -1) {
        throw new Error(`Unsupported increment by ${utils.short(value)}`);
      }

      this.now.setTime(this.now.getTime() + random.date(value));
    }

    return schema;
  });
}

function getRefs(refs) {
  let $refs = {};

  if (Array.isArray(refs)) {
    refs.forEach(schema => {
      $refs[schema.$id || schema.id] = schema;
    });
  } else {
    $refs = refs || {};
  }

  return $refs;
}

const jsf = (schema, refs, cwd) => {
  console.log('[json-schema-faker] calling JsonSchemaFaker() is deprecated, call either .generate() or .resolve()');

  if (cwd) {
    console.log('[json-schema-faker] references are only supported by calling .resolve()');
  }

  return jsf.generate(schema, refs);
};

jsf.generate = (schema, refs) => {
  const $refs = getRefs(refs);

  return run($refs, schema, container);
};

jsf.resolve = (schema, refs, cwd) => {
  if (typeof refs === 'string') {
    cwd = refs;
    refs = {};
  }

  // normalize basedir (browser aware)
  cwd = cwd || (typeof process !== 'undefined' ? process.cwd() : '');
  cwd = `${cwd.replace(/\/+$/, '')}/`;

  const $refs = getRefs(refs);

  // identical setup as json-schema-sequelizer
  const fixedRefs = {
    order: 300,
    canRead: true,
    read(file, callback) {
      try {
        callback(null, $refs[file.url] || $refs[file.url.split('/').pop()]);
      } catch (e) {
        callback(e);
      }
    },
  };

  return $RefParser
    .dereference(cwd, schema, {
      resolve: {
        file: { order: 100 },
        http: { order: 200 },
        fixedRefs,
      },
      dereference: {
        circular: 'ignore',
      },
    }).then(sub => run($refs, sub, container));
};

setupKeywords();

jsf.format = format;
jsf.option = option;
jsf.random = random;

// returns itself for chaining
jsf.extend = (name, cb) => {
  container.extend(name, cb);
  return jsf;
};

jsf.define = (name, cb) => {
  container.define(name, cb);
  return jsf;
};

jsf.reset = name => {
  container.reset(name);
  setupKeywords();
  return jsf;
};

jsf.locate = name => {
  return container.get(name);
};

jsf.version = '0.5.0-rc16';

export default jsf;
