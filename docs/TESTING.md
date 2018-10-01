
## Testing

**JSON-Schema-Faker** performs two types of testing: unit and schema.

### Unit tests

- They just validate the building blocks from the entire library
- We're using `mocha` and `chai` so the worflow would be very familiar

> Much stuff from the internals are not covered by unit-tests yet, PRs for increasing that are very welcome!

----

### Schema tests

- Kind of functional tests, high-level - executing the whole `jsf` engine to generate fake data against given JSON Schema and checking the quality of the results
- We are using `.json` files to describe the entire testing suite

Those `.json` files look like the following:

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

```js
describe('Feature or issue description', () => {
  it('Single test description', () => {
    // ...
  });
});
```

The properties below are used to setup the test and execute the assertions:

- `require` &mdash; a relative to the spec directory
- `schema` &mdash; the main used schema to fake and test
- `refs` &mdash; are for resolving used `$ref`'s on the faked schema
- `throws` &mdash; test if the an error was expected, can be a boolean or string
- `hasNot` &mdash; used for primitives, it will perform a `not.toContain()` test
- `hasProps` &mdash; ensure given props exists on the generated value
- `onlyProps` &mdash; ensure given props matches the generated value
- `type` &mdash; used for primitives, it will perform a `toHaveType()` test
- `valid` &mdash; will test the generated json against the original schema
- `equal` &mdash; will test equality for the given schema and the generated one
- `repeat` &mdash; will execute the same test many times as given
- `seed` &mdash; provide the given seed to the `random()` generator
- `count` &mdash; will match arrays/strings length or object props, etc.
- `set` &mdash; configure given options through `jsf.option()`
- `skip` &mdash; skip individual tests
- `only` &mdash; run this test only

> Use these tests as reference of how things works, if you found an edge-case please add it as test and open an issue for.
