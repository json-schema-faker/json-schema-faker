We are using json files to describe the entire testing suite as follows:

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
```

The follow properties are used for setup the test and execute assertions:

- `require` a relative to the spec directory
- `schema` the main used schema to fake and test
- `refs` are for resolving used `$ref`'s on the faked schema
- `throws` test if the an error was expected, can be a boolean or string
- `hasNot` used for primitives, it will perform a `not.toContain()` test
- `type` used for primitives, it will perform a `toHaveType()` test
- `valid` will test the generated json against the original schema
