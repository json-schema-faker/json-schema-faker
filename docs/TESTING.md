
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

- setup
  - `refs` &mdash; are for resolving used `$ref`'s on the faked schema
  - `require:{String|Array<String>}` &mdash; a path or list of paths relative to the spec directory
  - `schema:{Object}` &mdash; the main used schema to fake and test
  - `seed` &mdash; provide the given seed to the `random()` generator
  - `set` &mdash; configure given options through `jsf.option()`

- assertion
  - `check:{Object}` &mdash; asserts the output matches a custom schema. Use `valid` to check against the original `schema` property
  - `count:{Integer}` &mdash; asserts against array length or the number of object properties
  - `equal:{Any}` &mdash; performs a deep equal assertion between generated data and the given value
  - `hasNot:{Any}` &mdash; performs a `not.toContain()` test
  - `hasProps:{Array<String>}` &mdash; asserts object has all props or each object of array has all props
  - `length:{Integer}` &mdash; asserts on array length
  - `minProps{Array<Integer>}`: will count the number of object properties on each test iteration. For each integer provided, if that count was not reached at least, once then the test will fail
  - `notEmpty{Array<String>}`: asserts that each object property is not undefined or an empty array. Use strings with '.' for asserting on nested object properties
  - `onlyProps:{Array<String>}` &mdash; asserts that the object only has these properties
  - `throws:{String|Boolean}` &mdash; assert on error message or that an error was thrown or not thrown
  - `throwsSometimes:{String|Boolean}` &mdash; assert on error message or that an error was thrown. Will fail if it throws the wrong error or if it never throws
  - `type:{String}` &mdash; used for primitives, it will perform a `toHaveType()` test
  - `valid:{true}` &mdash; tests the generated data against the original schema

- debug
  - `dump:{true|'bail'}` &mdash; prints the generated data. Will return immediately if set to 'bail'

- execution
  - `only:{true}` &mdash; run this test only
  - `repeat:{Integer}` &mdash; will execute the same test many times as given
  - `skip:{true}` &mdash; skip individual tests
  - `timeout:{Integer}` &mdash; set a custom timeout for the test


> Use these tests as reference of how things works, if you found an edge-case please add it as test and open an issue for.
