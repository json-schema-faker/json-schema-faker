jsf = require('../lib')

describe 'JSON-Schema properties', ->
  it 'should generate plain-old objects', ->
    person = require('./fixtures/person-schema.json')

    expect(jsf(person)).toHaveSchema person

  it 'should handle allOf, anyOf, oneOf', ->
    ['allOf', 'anyOf', 'oneOf'].forEach (test) ->
      mixin = require("./fixtures/#{test}-schema.json")

      expect(jsf(mixin)).toHaveSchema mixin
