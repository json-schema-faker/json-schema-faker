# Fake your schemas!

[![Build Status](https://travis-ci.org/pateketrueke/json-schema-faker.png?branch=master)](https://travis-ci.org/pateketrueke/json-schema-faker)
[![NPM version](https://badge.fury.io/js/json-schema-faker.png)](http://badge.fury.io/js/json-schema-faker)
[![Dependency Status](https://david-dm.org/pateketrueke/json-schema-faker.svg)](https://david-dm.org/pateketrueke/json-schema-faker)
[![Coverage Status](https://coveralls.io/repos/pateketrueke/json-schema-faker/badge.png?branch=master)](https://coveralls.io/r/pateketrueke/json-schema-faker?branch=master)

Use [JSON Schema](http://json-schema.org/) along with fake generators to provide consistent fake data for your system. Note that `json-schema-faker` supports (currently) the JSON-Schema specification **draft-04** only.

## Online demo

See [online demo](http://json-schema-faker.js.org/).

## Install

Install `json-schema-faker` with npm:

    npm install json-schema-faker --save-dev

## Example usage

```javascript
var jsf = require('json-schema-faker');

var schema = {
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
      minimumExclusive: true
    }
  }
};

var sample = jsf(schema);

console.log(sample.user.name);
// output: John Doe
```

## Supported keywords

- **$ref** &mdash; Resolve internal references only, and/or external if provided.
- **required** &mdash; All required properties are guaranteed, if not can be omitted.
- **pattern** &mdash; Generate samples based on RegExp values.
- **format** &mdash; Core formats only: date-time, email, hostname, ipv4, ipv6 and uri.
- **enum** &mdash; Returns any of these enumerated values.
- **minLength/maxLength** &mdash; Applies length constraints to string values.
- **minimum/maximum** &mdash; Applies constraints to numeric values.
- **exclusiveMinimum/exclusiveMaximum** &mdash; Adds exclusivity for numeric values.
- **multipleOf** &mdash; Multiply constraints for numeric values.
- **items** &mdash; Support for subschema and fixed item values.
- **minItems/maxItems** &mdash; Adds length constraints for array items.
- **uniqueItems** &mdash; Applies uniqueness constraints for array items.
- **additionalItems** &mdash; Partially supported (?)
- **allOf/oneOf/anyOf** &mdash; Subschema combinators.
- **properties** &mdash; Object properties to be generated.
- **minProperties/maxProperties** &mdash; Adds length constraints for object properties.
- **patternProperties** &mdash; RegExp-based object properties.
- **additionalProperties** &mdash; Partially supported (?)
- **dependencies** &mdash; Not supported yet (?)
- **not** &mdash; Not supported yet (?)

## Using references

Inline references are fully supported (json-pointers) but external can't be resolved by `json-schema-faker`.

In order to achieve that you can use [refaker](https://github.com/gextech/refaker) and then use the resolved schemas:

```javascript
var schema = {
  type: 'object',
  properties: {
    someValue: {
      $ref: 'otherSchema'
    }
  }
};

var refs = [
  {
    id: 'otherSchema',
    type: 'string'
  }
];

var sample = jsf(schema, refs);

console.log(sample.someValue);
// output: voluptatem
```

## Faking values

`json-schema-faker` has built-in generators for core-formats, [Faker.js](http://marak.com/faker.js/) and [Chance.js](http://chancejs.com/) are also supported.

You can use **faker** or **chance** properties but they are optional:

```json
{
  "type": "string",
  "faker": "internet.email"
}
```

The above schema will invoke:

```javascript
require('faker').internet.email();
```

Another example is passing arguments to the generator:

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

And will invoke:

```javascript
var Chance = require('chance'),
  chance = new Chance();

chance.email({ "domain": "fake.com" });
```

If you pass an array, they will be used as raw arguments.

Note that both generators has higher precedence than **format**.

You can also use standard JSON Schema keywords, e.g. `pattern`:

```json
{
  "type": "string",
  "pattern": "yes|no|maybe|i don't know"
}
```

## Custom formats

Additionally, you can add custom generators for those:

```javascript
jsf.formats('semver', function(gen, schema) {
  return gen.randexp('^\\d\\.\\d\\.\\d{1,2}$');
});
```

Now that format can be generated:

```json
{
  "type": "string",
  "format": "semver"
}
```

Usage:

- **formats()** &mdash; Return all registered formats (custom only)
- **formats(obj)** &mdash; Register formats by key/value &rarr; name/callback
- **formats(name)** &mdash; Returns that format generator (undefined if not exists)
- **formats(name, callback)** &mdash; Register a custom format by name/callback

Callback:

- **gen** (object) &mdash; Built in generators
  - **faker** (object) &mdash; Faker.js instance
  - **chance** (object) &mdash; Chance.js instance
  - **randexp** (function) &mdash; Randexp generator
- **schema** (object) &mdash; The schema for input

Note that custom generators has lower precedence than core ones.

## Extending dependencies

You may extend [Faker.js](http://marak.com/faker.js/) and [Chance.js](http://chancejs.com/):

```javascript
var jsf = require('json-schema-faker');

jsf.extend('faker', function(faker){
  faker.locale = "de"; // or any other language
  faker.custom = {
    statement: function(length) {
      return faker.name.firstName() + " has " + faker.finance.amount() + " on " + faker.finance.account(length) + ".";
    }
  };
  return faker;
});

var schema = {
  "type": "string",
  "faker": {
    "custom.statement": [19]
  }
}

var sample = jsf(schema);
```

The first parameter of `extend` function is the generator name (`faker` or `chance`). The second one is the function that accepts the dependency library; the function alters the library and **returns it**.

## Automation: grunt plugin

Use [grunt-jsonschema-faker](https://github.com/tkoomzaaskz/grunt-jsonschema-faker)
to automate running `json-schema-faker` against your JSON schemas.

## Great, Why?

Actually, I've found some projects or services:

- http://www.json-generator.com/
- https://github.com/unindented/fake-json
- https://github.com/jonahkagan/schematic-ipsum
- https://www.npmjs.org/package/json-schema-mock
- https://github.com/thaume/json-schema-processor
- https://github.com/andreineculau/json-schema-random
- https://github.com/murgatroid99/json-schema-random-instance

Many of they are incomplete (?), so I decided to code this library.

## Contribution

* Alvaro Cabrera
* Tomasz Ducin

Any contribution is well received, please see [contribution guide](CONTRIBUTING.md).
