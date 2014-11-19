tv4 = require('tv4')
clone = require('clone')
ZSchema = require('z-schema')
JaySchema = require('jayschema')

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
  # TODO: try other validators

  validator = new ZSchema
    ignoreUnresolvableReferences: false

  validator.setRemoteReference(schema.id, clone(schema)) for schema in refs if refs

  valid = validator.validate @actual, clone(expected)

  if errors = validator.getLastErrors() or not valid
    throw errors.map((e) ->
      if e.code is 'PARENT_SCHEMA_VALIDATION_FAILED'
        e.inner.map((e) -> e.message).join '\n'
      else
        e.message
    ).join('\n') or "Invalid schema #{JSON.stringify @actual}"

  api = tv4.freshApi()

  api.cyclicCheck = false;
  api.banUnknown = false;

  api.addSchema(schema.id, clone(schema)) for schema in refs if refs

  result = api.validateResult(@actual, clone(expected), api.cyclicCheck, api.banUnknown)

  throw 'Missing ' + result.missing.join(', ') if result.missing.length

  throw result.error if result.error

  jay = new JaySchema
  jay.register(clone(schema), schema.id) for schema in refs if refs

  result = jay.validate @actual, clone(expected)

  throw result.map((e) -> e.desc or e.message).join('\n') or "Invalid schema #{JSON.stringify @actual}" if result.length

  true
