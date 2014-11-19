jsf = require('../lib')

describe 'JSON-Schema references', ->
  it 'should handle internal $refs', ->
    schema = require('./fixtures/refs-schema.json')

    expect(jsf schema).toHaveSchema schema

  it 'should handle provided $refs only', ->
    schema =
      type: 'object'
      properties:
        stringValues:
          type: 'array'
          items:
            $ref: 'http://fake.com/localSchema'
          minItems: 3
      required: ['stringValues']

    refs = [
      { id: 'http://fake.com/localSchema', type: 'string' }
    ]

    expect(jsf(schema, refs)).toHaveSchema schema, refs
