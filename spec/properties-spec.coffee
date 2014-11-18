jsf = require('../lib')

describe 'JSON-Schema properties', ->
  it 'should generate plain-old objects', ->
    person = require('./fixtures/person-schema.json')

    expect(jsf(person)).toHaveSchema person
