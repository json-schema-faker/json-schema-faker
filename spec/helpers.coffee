tv4 = require('tv4')

jasmine.Matchers::toHaveType = (expected) ->
  test = Object::toString.call(@actual).match(/object (\w+)/)[1].toLowerCase()

  if test isnt expected
    throw "Expected #{JSON.stringify @actual} to have #{expected} type"

  true

jasmine.Matchers::toHaveSchema = (expected) ->
  api = tv4.freshApi()

  api.cyclicCheck = false;
  api.banUnknown = false;

  result = api.validateResult(@actual, expected, api.cyclicCheck, api.banUnknown)

  throw 'Missing ' + result.missing.join(', ') if result.missing.length

  throw result.error if result.error

  result.valid
