#!/usr/bin/env node

const jsf = require('../dist/main.umd.js');

// FIXME: load faker/chance on startup?

const sample = process.argv.slice(2)[0];

// FIXME: setup argv....
const argv = require('wargs')(process.argv.slice(2), {
  boolean: 'O',
  alias: {
    'always-fake-optionals': 'O',
  },
});

const { inspect } = require('util');
const { Transform } = require('stream');
const { readFileSync } = require('fs');

const pretty = process.argv.indexOf('--pretty') !== -1;
const noColor = process.argv.indexOf('--no-color') !== -1;

jsf.option({
  alwaysFakeOptionals: true,
});

function generate(schema, callback) {
  jsf.resolve(JSON.parse(schema)).then(result => {
    let sample;

    if (pretty) {
      sample = inspect(result, { colors: !noColor, depth: Infinity });
    } else {
      sample = JSON.stringify(result);
    }

    callback(null, `${sample}\n`);
  });
}

process.stdin.pipe(new Transform({
  transform(entry, enc, callback) {
    generate(Buffer.from(entry, enc).toString(), callback);
  }
})).pipe(process.stdout);
