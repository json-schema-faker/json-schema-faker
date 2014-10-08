jsf = require('../lib')

describe 'JSON-Schema properties', ->
  it 'should generate plain-old objects', ->
    person =
      type: 'object'
      properties:
        firstName:
          type: 'string'
        lastName:
          type: 'string'
        skills:
          type: 'array'
          items:
            type: 'object'
            properties:
              title:
                type: 'string'
              description:
                type: 'string'
            required: ['title', 'description']
      required: ['firstName', 'lastName', 'skills']

    expect(jsf(person)).toHaveSchema person
