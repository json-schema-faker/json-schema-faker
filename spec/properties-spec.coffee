jsf = require('../lib')

person = require('./fixtures/person-schema.json')

describe 'JSON-Schema properties', ->
  it 'should generate plain-old objects', ->
    expect(jsf(person)).toHaveSchema person
