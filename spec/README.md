`jsf` has two types of tests:

* [unit tests](#unit-tests)
* [schema tests](#schema-tests)

----

# unit tests

location: [`spec/unit`](unit)

Typical unit tests, low-level. Using `jasmine` under `jasmine-node`. Each *spec* file loads a js unit using node.js `require` function and fires assertions against it. That's all.

----

# schema tests

location: [`spec/schema`](schema)

Kind of functional tests, high-level - executing the whole `jsf` engine to generate fake data against given JSON Schema and checking the quality of the results.

The *specs* are based on our custom test layer (that wraps `jasmine`). We are using json files to describe the entire testing suite. However, the low-level assertions are run using `jasmine-node` beneath.

The json files look like the following:

```json
[
  {
    "description": "Feature or issue description",
    "tests": [
      {
        "description": "Single test description",
        "schema": { ... },
        ...
      }
    ]
  },
  ...
]
```

Basically it will execute this for you:

```coffeescript
describe 'Feature or issue description', ->
  it 'Single test description', ->
    ...
```

The properties below are used to setup the test and execute the assertions:

- `require` a relative to the spec directory
- `schema` the main used schema to fake and test
- `refs` are for resolving used `$ref`'s on the faked schema
- `throws` test if the an error was expected, can be a boolean or string
- `hasNot` used for primitives, it will perform a `not.toContain()` test
- `type` used for primitives, it will perform a `toHaveType()` test
- `valid` will test the generated json against the original schema
- `equal` will test equality for the given schema and the generated one
