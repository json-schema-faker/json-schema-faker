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

  // skip default generators
  container.define('jsonPath', (value, schema) => {
    delete schema.type;
    return schema;
  });

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
      $refs[schema.id] = schema;
    });
  } else {
    $refs = refs || {};
  }

  return $refs;
}

const jsf = (schema, refs, cwd) => {
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
      const id = cwd !== '/'
        ? file.url.replace(cwd, '')
        : file.url;

      try {
        if (!$refs[id]) {
          throw new Error(`Reference not found: ${id}`);
        }

        callback(null, $refs[id]);
      } catch (e) {
        callback(e);
      }
    },
  };

  return $RefParser
    .dereference(cwd, schema, {
      resolve: { fixedRefs },
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

jsf.version = 'dev@next';

export default jsf;
