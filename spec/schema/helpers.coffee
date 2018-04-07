tv4 = require('tv4')
clone = require('clone')
ZSchema = require('z-schema')
JaySchema = require('jayschema')

formatValidators = require('./validator').validate

[tv4, ZSchema].map formatValidators

global.customMatchers =
  toHaveType: ->
    compare: (actual, expected) ->
      test = Object::toString.call(actual).match(/object (\w+)/)

      if test[1].toLowerCase() isnt expected
        pass: false
        message: "Expected #{JSON.stringify actual} to have #{expected} type"
      else
        pass: true

  toHaveSchema: ->
    compare: (actual, expected) ->
      [ expected, refs ] = expected if Array.isArray(expected)

      fail = []
      fixed = {}

      if refs
        fixed[s.id.split('#')[0]] = clone(s) for s in refs

      # z-schema
      validator = new ZSchema
        ignoreUnresolvableReferences: false

      validator.setRemoteReference(k, v) for k, v of fixed

      try
        valid = validator.validate clone(actual), clone(expected)
      catch e
        fail.push e.message

      if errors = validator.getLastErrors() or not valid
        fail.push errors.map((e) ->
         if e.code is 'PARENT_SCHEMA_VALIDATION_FAILED'
           e.inner.map((e) -> e.message).join '\n'
         else
           e.message
        ).join('\n') or "Invalid schema #{JSON.stringify actual}"

      # tv4
      api = tv4.freshApi()

      api.banUnknown = false
      api.cyclicCheck = false

      api.addSchema(id, json) for id, json of fixed

      result = api.validateResult actual,
        clone(expected), api.cyclicCheck, api.banUnknown

      if result.missing.length
        fail.push 'Missing ' + result.missing.join(', ')

      fail.push(result.error) if result.error

      # jayschema
      jay = new JaySchema

      formatValidators jay

      jay.register(clone(json)) for id, json of fixed

      result = jay.validate actual, clone(expected)

      if result.length
        fail.push result.map((e) -> e.desc or e.message).join('\n') or
          "Invalid schema #{JSON.stringify actual}"

      pass: !fail.length
      message: fail.join('\n') if fail.length
      message: fail.length and """
        #{fail.join('\n')}
        ---
        #{JSON.stringify(actual, null, 2)}
        ---
        #{JSON.stringify(expected, null, 2)}
        ---
      """
