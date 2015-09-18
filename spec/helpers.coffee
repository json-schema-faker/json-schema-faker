tv4 = require('tv4')
clone = require('clone')
ZSchema = require('z-schema')
JaySchema = require('jayschema')

formatValidators = require('./validator').validate

[tv4, ZSchema].map formatValidators

jasmine.Matchers::toHaveType = (expected) ->
  test = Object::toString.call(@actual).match(/object (\w+)/)

  if test[1].toLowerCase() isnt expected
    throw new Error """
      Expected #{JSON.stringify @actual} to have #{expected} type
    """

  true

jasmine.Matchers::toHaveSchema = (expected, refs) ->
  fixed = {}

  if refs
    fixed[s.id.split('#')[0]] = clone(s) for s in refs

  validator = new ZSchema
    ignoreUnresolvableReferences: false

  validator.setRemoteReference(k, v) for k, v of fixed
  valid = validator.validate @actual, clone(expected)

  if errors = validator.getLastErrors() or not valid
    throw errors.map((e) ->
      if e.code is 'PARENT_SCHEMA_VALIDATION_FAILED'
        e.inner.map((e) -> e.message).join '\n'
      else
        e.message
    ).join('\n') or "Invalid schema #{JSON.stringify @actual}"

  api = tv4.freshApi()

  api.banUnknown = false
  api.cyclicCheck = false

  api.addSchema(id, json) for id, json of fixed

  result = api.validateResult @actual,
    clone(expected), api.cyclicCheck, api.banUnknown

  if result.missing.length
    throw new Error 'Missing ' + result.missing.join(', ')

  throw result.error if result.error

  jay = new JaySchema

  formatValidators jay

  jay.register(clone(json)) for id, json of fixed

  result = jay.validate @actual, clone(expected)

  throw result.map((e) -> e.desc or e.message).join('\n') or
    "Invalid schema #{JSON.stringify @actual}" if result.length

  true
