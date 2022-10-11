#!/usr/bin/env node

const { inspect } = require('util');
const { Transform } = require('stream');
const { existsSync, readFileSync } = require('fs');

const { JSONSchemaFaker } = require('../dist/main.cjs');

// FIXME: validate types on given input....
const argv = require('../dist/wargs.cjs')(process.argv.slice(2), {
  boolean: 'DXMTFOxedrJUSE',
  alias: {
    c: 'currentWorkingDirectory',

    D: 'defaultInvalidTypeProduct',
    X: 'defaultRandExpMax',

    P: 'pruneProperties',
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
    N: 'omitNulls',
    r: 'random',

    i: 'minItems',
    I: 'maxItems',
    l: 'minLength',
    L: 'maxLength',

    J: 'resolveJsonPath',
    U: 'reuseProperties',
    S: 'fillProperties',
    s: 'sortProperties',
    E: 'replaceEmptyByRandomValue',
  },
});

if (argv.flags.version) {
  console.log(require('../package.json').name, JSONSchemaFaker.VERSION);
  process.exit();
}

if (typeof argv.flags.random === 'string') {
  argv.flags.random = () => parseFloat(argv.flags.random);
}

if (typeof argv.flags.ignoreProperties === 'string') {
  argv.flags.ignoreProperties = [argv.flags.ignoreProperties];
}

const pretty = process.argv.indexOf('--pretty') !== -1;
const noColor = process.argv.indexOf('--no-color') !== -1;

// FIXME: enable flags...
JSONSchemaFaker.option({
  resolveJsonPath: argv.flags.resolveJsonPath,
  alwaysFakeOptionals: argv.flags.alwaysFakeOptionals,
});

const cwd = argv.flags.currentWorkingDirectory || process.cwd();

function generate(schema, callback) {
  JSONSchemaFaker.resolve(JSON.parse(schema), cwd).then(result => {
    let sample;

    if (pretty) {
      sample = inspect(result, { colors: !noColor, depth: Infinity });
    } else {
      sample = JSON.stringify(result);
    }

    callback(null, `${sample}\n`);
  }).catch(callback);
}

if (!process.stdin.isTTY) {
  process.stdin.pipe(new Transform({
    transform(entry, enc, callback) {
      generate(Buffer.from(entry, enc).toString(), callback);
    },
  })).pipe(process.stdout);
} else if (!existsSync(argv._[0])) {
  console.error(`Missing input, given '${argv._}'`);
  process.exit(1);
} else {
  generate(readFileSync(argv._[0]).toString(), (err, output) => {
    if (err) {
      console.error(err.message);
      process.exit(1);
    } else {
      process.stdout.write(output);
    }
  });
}
