Fake your schemas!
==================

[![Build Status](https://travis-ci.org/pateketrueke/json-schema-faker.png?branch=master)](https://travis-ci.org/pateketrueke/json-schema-faker) [![NPM version](https://badge.fury.io/js/json-schema-faker.png)](http://badge.fury.io/js/json-schema-faker)  [![Coverage Status](https://coveralls.io/repos/pateketrueke/json-schema-faker/badge.png?branch=master)](https://coveralls.io/r/pateketrueke/json-schema-faker?branch=master)

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

Supported keywords
------------------

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

Using references
----------------

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


Faking values
-------------

Generated human-friendly samples by using **faker** property on each subschema:

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

Not that **faker** property has higher precedence than **format**.

Great, Why?
-----------

Actually, I've found some projects or services:

- http://www.json-generator.com/
- https://github.com/jonahkagan/schematic-ipsum
- https://www.npmjs.org/package/json-schema-mock
- https://github.com/thaume/json-schema-processor
- https://github.com/andreineculau/json-schema-random
- https://github.com/murgatroid99/json-schema-random-instance

But are incomplete or has limited support for some keywords, so I decided to code this library.

Issues
------

Any contribution is well received.
