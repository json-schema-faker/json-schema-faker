#!/usr/bin/env node

const jsf = require('../dist/bundle.umd.min.js');

// FIXME: load faker/change on startup?

const sample = process.argv.slice(2)[0];

const { inspect } = require('util');
const { Transform } = require('stream');
const { readFileSync } = require('fs');

const pretty = process.argv.indexOf('--pretty') !== -1;
const noColor = process.argv.indexOf('--no-color') !== -1;

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
