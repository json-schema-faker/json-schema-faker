#!/usr/bin/env node

const jsf = require('../dist/main.cjs.js').default;

// FIXME: load faker/chance on startup?

const sample = process.argv.slice(2)[0];

// FIXME: validate types on given input....
const argv = require('../dist/wargs.min.js')(process.argv.slice(2), {
  boolean: 'DXMTFOxedrJUSE',
  alias: {
    c: 'currentWorkingDirectory',

    D: 'defaultInvalidTypeProduct',
    X: 'defaultRandExpMax',

    p: 'ignoreProperties',
    M: 'ignoreMissingRefs',
    T: 'failOnInvalidTypes',
    F: 'failOnInvalidFormat',

    O: 'alwaysFakeOptionals',
    o: 'optionalsProbability',
    x: 'fixedProbabilities',
    e: 'useExamplesValue',
    d: 'useDefaultValue',
    R: 'requiredOnly',
    r: 'random',

    i: 'minItems',
    I: 'maxItems',
    l: 'minLength',
    L: 'maxLength',

    J: 'resolveJsonPath',
    U: 'reuseProperties',
    S: 'fillProperties',
    E: 'replaceEmptyByRandomValue',
  },
});

if (typeof argv.flags.random === 'string') {
  argv.flags.random = () => parseFloat(argv.flags.random);
}

if (typeof argv.flags.ignoreProperties === 'string') {
  argv.flags.ignoreProperties = [argv.flags.ignoreProperties];
}

const { inspect } = require('util');
const { Transform } = require('stream');
const { readFileSync } = require('fs');

const pretty = process.argv.indexOf('--pretty') !== -1;
const noColor = process.argv.indexOf('--no-color') !== -1;

// FIXME: enable flags...
jsf.option({
  resolveJsonPath: argv.flags.resolveJsonPath,
  alwaysFakeOptionals: argv.flags.alwaysFakeOptionals,
});

const cwd = argv.flags.currentWorkingDirectory || process.cwd();

function generate(schema, callback) {
  jsf.resolve(JSON.parse(schema), cwd).then(result => {
    let sample;

    if (pretty) {
      sample = inspect(result, { colors: !noColor, depth: Infinity });
    } else {
      sample = JSON.stringify(result);
    }

    callback(null, `${sample}\n`);
  }).catch(callback);
}

process.stdin.pipe(new Transform({
  transform(entry, enc, callback) {
    generate(Buffer.from(entry, enc).toString(), callback);
  }
})).pipe(process.stdout);
