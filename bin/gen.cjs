#!/usr/bin/env node

const { inspect } = require('util');
const { resolve } = require('path');
const { Transform } = require('stream');
const { existsSync, readFileSync } = require('fs');

const { JSONSchemaFaker } = require('../dist/main.cjs');

// FIXME: validate types on given input....
const argv = require('../dist/wargs.cjs')(process.argv.slice(2), {
  boolean: 'yPpMTFOEVRNJUSs',
  string: 'cCYXoxriIlLdD',
  alias: {
    c: 'cwd',
    C: 'config',

    y: 'replaceEmptyByRandomValue',
    Y: 'defaultInvalidTypeProduct',
    X: 'defaultRandExpMax',

    P: 'pruneProperties',
    p: 'ignoreProperties',
    M: 'ignoreMissingRefs',
    T: 'failOnInvalidTypes',
    F: 'failOnInvalidFormat',

    O: 'alwaysFakeOptionals',
    o: 'optionalsProbability',
    x: 'fixedProbabilities',
    E: 'useExamplesValue',
    V: 'useDefaultValue',
    R: 'requiredOnly',
    N: 'omitNulls',
    r: 'random',

    i: 'minItems',
    I: 'maxItems',
    l: 'minLength',
    L: 'maxLength',

    d: 'minDateTime',
    D: 'maxDateTime',

    J: 'resolveJsonPath',
    U: 'reuseProperties',
    S: 'fillProperties',
    s: 'sortProperties',
  },
});

if (argv.flags.version) {
  console.log(require('../package.json').name, JSONSchemaFaker.VERSION);
  process.exit();
}

if (typeof argv.flags.ignoreProperties === 'string') {
  argv.flags.ignoreProperties = argv.flags.ignoreProperties.split(',');
}

const seed = argv.flags.random ? parseFloat(argv.flags.random) : null;
const pretty = process.argv.indexOf('--pretty') !== -1;
const noColor = process.argv.indexOf('--no-color') !== -1;

const defaults = JSONSchemaFaker.option.getDefaults();
const overrides = {
  ...argv.flags,
  ...(argv.flags.random ? { random: () => seed } : null),
  renderTitle: argv.flags.renderTitle || null,
  renderComment: argv.flags.renderComment || null,
  renderDescription: argv.flags.renderDescription || null,
};

JSONSchemaFaker.option(Object.keys(defaults).reduce((memo, cur) => {
  if (overrides[cur] !== null) memo[cur] = overrides[cur];
  return memo;
}, {}));

const cwd = argv.flags.cwd || process.cwd();

function load(filepath) {
  if (filepath.includes('.json')) return require(filepath);
  return import(filepath).then(mod => mod.default || mod);
}

async function generate(schema, callback) {
  try {
    const config = argv.flags.config ? await load(resolve(argv.flags.config)) : null;

    if (typeof config === 'function') await config({ cwd, argv, JSONSchemaFaker });
    if (config && typeof config === 'object') JSONSchemaFaker.option(config);

    const result = await JSONSchemaFaker.resolve(JSON.parse(schema), cwd);

    let sample;
    if (pretty) {
      sample = inspect(result, { colors: !noColor, depth: Infinity });
    } else {
      sample = JSON.stringify(result);
    }

    callback(null, `${sample}\n`);
  } catch (e) {
    callback(e);
  }
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
      console.error(err);
      process.exit(1);
    } else {
      process.stdout.write(output);
    }
  });
}
