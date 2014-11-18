jsf = require('../lib')

suite = [
  ['should generate plain-old objects', [require('./fixtures/person-schema.json')]]
  ['should handle allOf, anyOf, oneOf', ['allOf', 'anyOf', 'oneOf'].map (v) -> require("./fixtures/#{v}-schema.json")]
  ['should skip some "required" properties', [require('./fixtures/requires-schema.json')]]
]

validate = (label, schemas) ->
  it label, ->
    for schema in schemas
      expect(jsf schema).toHaveSchema schema

describe 'JSON-Schema properties', ->
  validate(label, schemas) for test in suite when [label, schemas] = test
