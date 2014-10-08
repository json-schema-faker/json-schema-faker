jsf = require('../lib')

describe 'JSON-Schema primitives', ->
  it 'should generate array-values', ->
    expect(jsf(type: 'array', items: {})).toHaveType 'array'

  it 'should generate boolean-values', ->
    expect(jsf(type: 'boolean')).toHaveType 'boolean'

  it 'should generate integer-values', ->
    expect(jsf(type: 'integer')).toHaveType 'number'

  it 'should generate number-values', ->
    expect(jsf(type: 'number')).toHaveType 'number'

  it 'should generate null-values', ->
    expect(jsf(type: 'null')).toHaveType 'null'

  it 'should generate object-values', ->
    expect(jsf(type: 'object', properties: {})).toHaveType 'object'

  it 'should generate string-values', ->
    expect(jsf(type: 'string')).toHaveType 'string'
