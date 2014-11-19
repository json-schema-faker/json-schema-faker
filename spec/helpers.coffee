tv4 = require('tv4')

type = (value) ->
  Object::toString.call(value).match(/object (\w+)/)[1].toLowerCase()

jasmine.Matchers::toHaveAnyType = ->
  test = type(@actual)

  if ['array', 'boolean', 'null', 'number', 'object', 'string'].indexOf(test) is -1
    throw "Unexpected type '#{test}' to be any?"

  true

jasmine.Matchers::toHaveType = (expected) ->
  if type(@actual) isnt expected
    throw "Expected #{JSON.stringify @actual} to have #{expected} type"

  true

jasmine.Matchers::toHaveSchema = (expected, refs) ->
  api = tv4.freshApi()

  api.cyclicCheck = false;
  api.banUnknown = false;

  api.addSchema(schema.id, schema) for schema in refs if refs

  result = api.validateResult(@actual, expected, api.cyclicCheck, api.banUnknown)

  throw 'Missing ' + result.missing.join(', ') if result.missing.length

  throw result.error if result.error

  result.valid
