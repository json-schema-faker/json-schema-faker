# Table of Contents

* [Architecture](#architecture)
* [Building](#building)
* [Testing](TESTING.md)
* [Usage](USAGE.md)

## Architecture

The source code is written in modern ES6-modules through `src` (for testing), but bundled versions are provided to ensure portabilty:

- `main.umd.js` are emitted for general usage, but exported without dependencies (`json-schema-ref-parser` and `jsonpath`)
- `bundle.js` is generated containing both dependencies from above, ready for the browser!
- `main.js` is the bundled version of `./src`

Generated sources are available as an [NPM dependency](https://www.npmjs.com/package/json-schema-faker) and through [UNPKG](https://unpkg.com/json-schema-faker@0.5.0-rc16/dist/).

> Dependencies are not needed for generating basic types and resolving local references, so it is fine to getting started this way.

```js
import jsf from 'json-schema-faker';
```

Let's examine how the library works:

```js
// 1.0 - first, we need a working (and valid) `schema`
const schema = {
  type: 'string',
};

// 1.1 - optionally, you can provide used `refs`
const refs = [
  {
    id: 'Test',
    type: 'boolean',
  }
];

// 1.2 - additionally, you can provide a `cwd` for local references
const cwd = `${__dirname}/schema`;
```

Note that:

- 1.0 &mdash; All input MUST be valid JSON-Schema
- 1.1 &mdash; Given `refs` are also valid JSON-Schema
- 1.2 &mdash; Given `cwd` is needed only if relative paths are used

Now we can produce values from our previous settings:

```js
// 2.0 - generate a sample from the given `schema`
const syncValue = jsf.generate(schema, refs);

// 2.1 - resolve and generate complex schemas with remote references
const asyncValue = await jsf.resolve(schema, refs, cwd);
```

The core provides typed generators for all basic types and well-known formats.

- 2.0 &mdash; Built-in generators can be resolved synchronously
- 2.1 &mdash; Local and remote references are resolved asynchronously

For more specific values `jsf` offers a rich menu of options and methods:

```js
// 3.0 - custom formats are supported
jsf.format('name', callback);
jsf.format('name', null); // unregister `name` format

// 3.1 - define `jsf` settings
jsf.option('optionName', 'value');
jsf.option({ optionName: 'value' });

// 3.2 - the `version` is also exported
jsf.version; // 0.5.0

// 3.3 - internal `random` generators
jsf.random; // { pick, date, shuffle, number, randexp }

// 3.4 - extend keywords with external generators
jsf.extend('chance', () => require('chance'));
jsf.extend('faker', () => require('faker'));

// 3.5 - extend keywords with custom generators
jsf.define('myProp', (value, schema) => schema);

// 3.6 - unregister extensions by keyword
jsf.reset('myProp');
jsf.reset(); // clear extensions

// 3.7 - retrieve registered extensions by keyword
jsf.locate('faker');
```

- 3.0 &mdash; This method should register non supported formats
- 3.1 &mdash; You should be able to setup custom behavior or defaults, etc.
- 3.2 &mdash; As convenience the package `version` should be exported
- 3.3 &mdash; Helpers should be shared too, to be used outside the API
- 3.4 &mdash; Third-party generators should be setup through this method (dependencies)
- 3.5 &mdash; Custom keywords like `autoIncrement` and `pattern` should be setup through this method (extensions) and stored in a shared container
- 3.6 &mdash; Added dependencies and extensions should be cleared from the container through this method, if no name is given the the entire container should be reset
- 3.7 &mdash; Any registered third-party generator should be returned through this method

### Available options

- `defaultInvalidTypeProduct` &mdash; If `failOnInvalidTypes` is disabled this value will be returned on any invalid `type` given (default: `null`)
- `defaultRandExpMax` &mdash; Setup default value directly as `RandExp.prototype.max` (default: `10`)
- `ignoreProperties` &mdash; Skip given properties from being generated (default: `[]`)
- `ignoreMissingRefs` &mdash; If enabled, it will resolve to `{}` for unknown references (default: `false`)
- `failOnInvalidTypes` &mdash; If enabled, it will throw an `Error` for unknown types (default: `true`)
- `failOnInvalidFormat` &mdash; If enabled, it will throw an `Error` for unknown formats (default: `true`)
- `alwaysFakeOptionals` &mdash; When enabled, it will set `optionalsProbability: 1.0` and ` fixedProbabilities: true` (default: `false`)
- `optionalsProbability` &mdash; A value from `0.0` to `1.0` to generate values in a consistent way, e.g. `0.5` will generate from `0%` to `50%` of values. Using arrays it means items, on objects they're properties, etc. (default: `false`)
- `fixedProbabilities` &mdash; If enabled, then `optionalsProbability: 0.5` will always generate the half of values (default: `false`)
- `useExamplesValue` &mdash; If enabled, it will return a random value from `examples` if they're present (default: `false`)
- `useDefaultValue` &mdash; If enabled, it will return the `default` value if present (default: `false`)
- `requiredOnly` &mdash; If enabled, only `required` properties will be generated (default: `false`)
- `minItems` &mdash; Override `minItems` if it's less than this value (default: `0`)
- `maxItems` &mdash; Override `maxItems` if it's greater than this value (default: `null`)
- `minLength` &mdash; Override `minLength` if it's less than this value  (default: `0`)
- `maxLength` &mdash; Override `maxLength` if it's greater than this value (default: `null`)
- `refDepthMin` &mdash; Set a minimum circular `$ref` depth to render (default: 0)
- `refDepthMax` &mdash; Set a maximum circular `$ref` depth to render (default: 3)
- `resolveJsonPath` &mdash; If enabled, it will expand `jsonPath` keywords on all generated objects  (default: `false`)
- `reuseProperties` &mdash; If enabled, it will try to generate missing properties from existing ones. Only when `fillProperties` is enabled too  (default: `false`)
- `fillProperties` &mdash; If enabled, it will try to generate missing properties to fulfill the schema definition (default: `true`)
- `random` &mdash; Setup a custom _randonmess_ generator, useful for getting deterministic results (default: `Math.random`)
- `replaceEmptyByRandomValue` &mdash; Remplace default empty value by a random value (default: `false`)

## Building

**JSON-Schema-Faker** is a JavaScript tool that can be executed both in the browser and the server.

It's built with [bili](https://github.com/egoist/bili), as we're using ES6 syntax for the source code and modules.

To generate `dist/` sources run:

```bash
$ npm run build
```

## Testing

Unit tests are run with `mocha -r esm` in order to use ES6 modules syntax, allowing to import and test code directly from the `src` folder.

Also we include "schema tests" to ensure generated data is also valid.

See our [reference guide](TESTING.md) to learn how.

## Usage

Use the [website](http://json-schema-faker.js.org/) tool and generate some values right now.

Please read our [guide](USAGE.md) for further usage instructions.
