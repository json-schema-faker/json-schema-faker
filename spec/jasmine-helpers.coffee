tv4 = require('tv4')

jasmine.Matchers::toHaveType = (expected) ->
  @env.equals_ Object::toString.call(@actual).match(/object (\w+)/)[1].toLowerCase(), expected

jasmine.Matchers::toHaveSchema = (expected) ->
  tv4.validateResult(@actual, expected).valid
