# Table of contents

- Basics
  - [Overview](#overview)
  - [Example usage](#example-usage)
    - [More examples](#more-examples)
  - [Automation](#automation)
    - [Angular-jsf (AngularJS plugin)](#angular-jsf)
    - [Grunt plugin](#grunt-plugin)
    - [CLI](#cli)
    - [Webpack loader](#webpack-loader)
- Advanced
  - [JSON Schema specification support](#json-schema-specification-support)
  - [Supported keywords](#supported-keywords)
  - [Using references](#using-references)
  - [Faking values](#faking-values)
    - [Advanced usage of faker.js and Chance.js](#user-content-advanced-usage-of-fakerjs-and-chancejs)
  - [Custom formats](#custom-formats)
  - [Custom options](#custom-options)
  - [Extending dependencies](#extending-dependencies)
  - [Inferred Types](#inferred-types)
- Misc
  - [Resources](#resources)
  - [Motivation](#motivation)

## Overview

JSON-Schema-faker (or `jsf` for short) combines two things:

 * The [JSON-schema specification](http://json-schema.org/draft-04/json-schema-core.html), that defines what is the allowed content of a JSON document
 * Fake data generators, that are used to generate basic or complex data, conforming to the schema.

> Since `v0.5.x` external generators are not longer bundled with `jsf`, however built-in defaults are shipped for all basic types and formats.

## Example usage

```javascript
import jsf from 'json-schema-faker';

const schema = {
  type: 'object',
  properties: {
    user: {
      type: 'object',
      properties: {
        id: {
          $ref: '#/definitions/positiveInt'
        },
        name: {
          type: 'string',
          faker: 'name.findName'
        },
        email: {
          type: 'string',
          format: 'email',
          faker: 'internet.email'
        }
      },
      required: ['id', 'name', 'email']
    }
  },
  required: ['user'],
  definitions: {
    positiveInt: {
      type: 'integer',
      minimum: 0,
      exclusiveMinimum: true
    }
  }
};

// use the async-version (preferred way)
jsf.resolve(schema).then(sample => {
  console.log(sample);
  // "[object Object]"

  console.log(sample.user.name);
  // "John Doe"
});

// sync-version (blocking)
jsf.generate(schema); // [object Object]
```

### More examples

 * [json-schema.org/example1.html](http://json-schema.org/example1.html):
   [warehouse location](http://json-schema-faker.js.org/#gist/bb4774bf26167360e7c5cf2a29db3e56),
   [Product from Acme catalog](http://json-schema-faker.js.org/#gist/c7a398c537cf7befce0df67fe7feeea8)
 * [json-schema.org/example2.html](http://json-schema.org/example2.html):
   [_diskDevice_ storage type](http://json-schema-faker.js.org/#gist/0c0d676023ea505c97eef9af0b4d95da),
   [_diskUUID_ storage type](http://json-schema-faker.js.org/#gist/0ac23aa547acfdb2897a7afec3042534),
   [_nfs_ storage type](http://json-schema-faker.js.org/#gist/473ac2bc364b2610f7fc703e59cfe1c9),
   [_tmpfs_ storage type](http://json-schema-faker.js.org/#gist/de1c5f18f0d231557ce25e44f581cadf)

## Automation

> Notice these tools can be outdated, please open a PR for helping them or raise and issue in their respective repositories.

### angular-jsf

Use [`angular-jsf`](https://github.com/json-schema-faker/angular-jsf) module (installable via `npm` and `bower`) to get **`jsf` working in your angular app out of the box**! And check out [angular-jsf demo](http://angular-jsf.js.org/).

### Grunt plugin

Use [grunt-jsonschema-faker](https://github.com/json-schema-faker/grunt-jsonschema-faker)
to automate running `json-schema-faker` against your JSON schemas.

### CLI

Use [json-schema-faker-cli](https://github.com/oprogramador/json-schema-faker-cli)
to run `jsf` from your command line.

### Webpack loader

Use [json-schema-faker-loader](https://github.com/jeffcatania/json-schema-faker-loader)
to execute `jsf` as a [webpack](https://webpack.github.io/) loader.

## JSON-Schema specification support

Currently `jsf` supports the JSON-Schema specification **draft-04** only.

If you want to use **draft-03**, you may find useful information [here](https://github.com/json-schema-faker/json-schema-faker/issues/66).

> There are [plans to support](https://github.com/json-schema-faker/json-schema-faker/issues/289) latest `draft-06` and `draft-07` but currently is out of scope until a stable `0.5.x` API is released.

## Supported keywords

Below is the list of supported keywords:

- `$ref` &mdash; Resolve internal references only, and/or external if provided.
- `required` &mdash; All required properties are guaranteed, if not can be omitted.
- `pattern` &mdash; Generate samples based on RegExp values.
- `format` &mdash; Core formats **v4-draft only**:
- [`date-time`](http://json-schema.org/draft-04/json-schema-validation.html#anchor108),
  [`email`](http://json-schema.org/draft-04/json-schema-validation.html#anchor111),
  [`hostname`](http://json-schema.org/draft-04/json-schema-validation.html#anchor114),
  [`ipv4`](http://json-schema.org/draft-04/json-schema-validation.html#anchor117),
  [`ipv6`](http://json-schema.org/draft-04/json-schema-validation.html#anchor120)
  and [`uri`](http://json-schema.org/draft-04/json-schema-validation.html#anchor123)
    &mdash; also `uri-reference`, `uri-template`, `json-pointer` and `uuid` are supported.
    -- [demo »](http://json-schema-faker.js.org/#gist/f58db80cbf52c12c623166090240d964)
- `enum` &mdash; Returns any of these enumerated values.
- `minLength`, `maxLength` &mdash; Applies length constraints to string values.
- `minimum`, `maximum` &mdash; Applies constraints to numeric values.
- `exclusiveMinimum`, `exclusiveMaximum` &mdash; Adds exclusivity for numeric values.
- `multipleOf` &mdash; Multiply constraints for numeric values.
- `items` &mdash; Support for subschema and fixed item values.
- `minItems`, `maxItems` &mdash; Adds length constraints for array items.
- `uniqueItems` &mdash; Applies uniqueness constraints for array items.
- `additionalItems` &mdash; Partially supported (?)
- `allOf`, `oneOf`, `anyOf` &mdash; Subschema combinators.
- `properties` &mdash; Object properties to be generated.
- `minProperties`, `maxProperties` &mdash; Adds length constraints for object properties.
- `patternProperties` &mdash; RegExp-based object properties.
- `additionalProperties` &mdash; Partially supported (?)
- `dependencies` &mdash; Partially supported (?)
- `not` &mdash; Not supported yet (?)

> Notice `not` support is complex to achieve and is probably will not work as you expected, most opened issues are related to that: so any feedback there is very appreaciated!

## Using references

Inline references are fully supported (json-pointers) but external can't be resolved by `jsf`.

Remote en local references are automatically resolved thanks to `json-schema-ref-parser`.

```javascript
const schema = {
  type: 'object',
  properties: {
    someValue: {
      $ref: 'otherSchema'
    }
  }
};

const refs = [
  {
    id: 'otherSchema',
    type: 'string'
  }
];

jsf.resolve(schema, refs).then(sample => {
  console.log(sample.someValue);
  // "voluptatem"
});
```

> Local references are always resolved from the `process.cwd()`, of course you can specify a custom folder to look-up: `jsf.resolve(schema, refs, cwd)`

## Faking values

`jsf` has built-in generators for core-formats, [Faker.js](https://github.com/marak/Faker.js/) and [Chance.js](http://chancejs.com/) (and others) are also supported but they require setup:

```js
jsf.extend('faker', () => require('faker'));
```

```json
{
  "type": "string",
  "faker": "internet.email"
}
```
([demo »](http://json-schema-faker.js.org/#gist/89659ebf28be89d3f860c3f80cbffe4b))

The above schema will invoke [`faker.internet.email()`](https://github.com/Marak/faker.js/blob/1f47f09e25ad43db41ea4187c3cd3f7e113d4cb4/lib/internet.js#L32).

Note that both generators has higher precedence than **format**.

You can also use standard JSON Schema keywords, e.g. `pattern`:

```json
{
  "type": "string",
  "pattern": "yes|no|maybe|i don't know"
}
```
([demo »](http://json-schema-faker.js.org/#gist/8ee282679da5a31cd7edc4cf35f37081))

### Advanced usage of faker.js and Chance.js

In following inline code examples the `faker` and `chance` variables are assumed to be created with, respectively:

```javascript
import faker from 'faker';
import Chance from 'chance';

jsf.extend('faker', () => faker);
jsf.extend('chance', () => new Chance());
```

E.g. using `chance` to faking values while passing arguments to the generator:

```json
{
  "type": "string",
  "chance": {
    "email": {
      "domain": "fake.com"
    }
  }
}
```
([demo »](http://json-schema-faker.js.org/#gist/c6ab6a0325e53fd3b38ee0293a9aeea3))

...which will invoke [`chance.email({ "domain": "fake.com" })`](https://github.com/chancejs/chancejs/blob/b4c143bf53f516dfd77a8376d0f631462458c062/chance.js#L1118).
This example works for single-parameter generator function.

However, if you pass multiple arguments to the generator function, just pass them wrapped in an array.
In the example below we use the [`faker.finance.amount(min, max, dec, symbol)`](https://github.com/Marak/faker.js/blob/1f47f09e25ad43db41ea4187c3cd3f7e113d4cb4/lib/finance.js#L85)
generator which has 4 parameters. We just wrap them with an array and it's equivalent to `faker.finance.amount(100, 10000, 2, "$")`:

```json
{
  "type": "object",
  "properties": {
    "cash": {
      "type": "string",
      "faker": {
        "finance.amount": [100, 10000, 2, "$"]
      }
    }
  },
  "required": [
    "cash"
  ]
}
```
([demo »](http://json-schema-faker.js.org/#gist/3a15a11d706e5b145c30f943d55c42b2))

However, if you want to pass a single parameter that is an array itself, e.g.
[`chance.pickone(["banana", "apple", "orange"])`](https://github.com/chancejs/chancejs/blob/b4c143bf53f516dfd77a8376d0f631462458c062/chance.js#L382),
just like [described here](https://github.com/json-schema-faker/json-schema-faker/issues/171),
then you need to wrap it with an array once more (twice in total). The outer brackets determine that the content is gonna be a list of params injected into the generator. The inner brackets are just the value itself - the array we pass:

```json
{
  "type": "object",
  "properties": {
    "food": {
      "type": "string",
      "chance": {
        "pickone": [
          [
            "banana",
            "apple",
            "orange"
          ]
        ]
      }
    }
  },
  "required": [
    "food"
  ]
}
```
([demo »](http://json-schema-faker.js.org/#gist/792d626e7d92841ded5be59b8ed001eb))

## Custom formats

Additionally, you can add custom generators for those:

```javascript
jsf.format('semver', () => jsf.random.randexp('\\d\\.\\d\\.[1-9]\\d?'));
```

Now that format can be generated:

```json
{
  "type": "string",
  "format": "semver"
}
```

Usage:

- **format()** &mdash; Return all registered formats (custom only)
- **format(obj)** &mdash; Register formats by key/value &rarr; name/callback
- **format(name)** &mdash; Returns that format generator (undefined if not exists)
- **format(name, callback)** &mdash; Register a custom format by name/callback

> If you provide `null` as callback the format will be unregistered, the same if you pass `null` as the name: all added formats will be unregistered too.

Callback:

- **schema** (object) &mdash; The schema for input

Note that custom generators has lower precedence than core ones.

## Custom Options

You may define following options for `jsf` that alter its behavior:

```javascript
jsf.option({
  failOnInvalidTypes: false
});

// also valid
jsf.option('alwaysFakeOptionals', true);
```

> Please read the [available options here](./#available-options).

## Extending dependencies

You may extend [Faker.js](https://github.com/Marak/faker.js):

```javascript
import jsf from 'json-schema-faker';

jsf.extend('faker', () => {
  const faker = require('faker');

  faker.locale = 'de'; // or any other language
  faker.custom = {
    statement: length => {
      return faker.name.firstName() + " has " + faker.finance.amount() + " on " + faker.finance.account(length) + ".";
    }
  };
  return faker;
});

const schema = {
  "type": "string",
  "faker": {
    "custom.statement": [19]
  }
}

jsf.resolve(schema).then(...);
```

...or if you want to use [faker's *individual localization packages*](https://github.com/Marak/faker.js#individual-localization-packages), simply do the following:

```js
jsf.extend('faker', () => {
  // just ignore the passed faker instance
  const faker = require('faker/locale/de');
  // do other stuff
  return faker;
});
```

You can also extend [Chance.js](http://chancejs.com/), using built-in [chance.mixin](http://chancejs.com/#mixin) function:

```javascript
import jsf from 'json-schema-faker';

jsf.extend('chance', () => {
  const Chance = require('chance');
  const chance = new Chance();

  chance.mixin({
    'user': function() {
      return {
        first: chance.first(),
        last: chance.last(),
        email: chance.email()
      };
    }
  });

  return chance;
});

const schema = {
  "type": "string",
  "chance": "user"
}

jsf.resolve(schema).then(...);
```

The first parameter of `extend` function is the generator name (`faker`, `chance`, etc.). The second one is the function that **must return** the dependency library.

## Inferred Types

JSON Schema does not require you to provide the `type` property for your JSON Schema documents and document fragments.

But since `jsf` uses the `type` property to create the proper fake data, we attempt to infer the type whenever it is not provided. We do this based on the JSON Schema validation properties you use.

> Now this means that if you do not use any of the JSON Schema validation properties, jsf will not be able to infer the type for you and you will need to **explicitly** set your `type` manually.)

Below is the list of JSON Schema validation properties and the inferred type based on the property:

- **array** &mdash; `additionalItems`,  `items`,  `maxItems`, `minItems` and `uniqueItems`
- **integer** &mdash; `exclusiveMaximum`, `exclusiveMinimum`, `maximum`, `minimum` and `multipleOf`
- **number** &mdash; same as above
- **object** &mdash; `additionalProperties`, `dependencies`, `maxProperties`, `minProperties`, `patternProperties`, `properties` and `required`
- **string** &mdash; `maxLength`, `minLength`, `pattern` and `format`

## Resources

* [JSON, JSON Schema & JSON-schema-faker](https://www.youtube.com/watch?v=TkqiUG3j_Xw) - WarsawJS meetup presentation recording, a step-by-step guide to JSON-related tools, including `jsf`

## Motivation

There were some existing projects or services trying to achieve similar goals as `jsf`:

- http://www.json-generator.com/
- https://github.com/unindented/fake-json
- https://github.com/jonahkagan/schematic-ipsum
- https://www.npmjs.org/package/json-schema-mock
- https://github.com/thaume/json-schema-processor
- https://github.com/andreineculau/json-schema-random
- https://github.com/murgatroid99/json-schema-random-instance
- https://github.com/tomarad/JSON-Schema-Instantiator

...but they were either incomplete, outdated, broken or non-standard. That's why `jsf` was created.
