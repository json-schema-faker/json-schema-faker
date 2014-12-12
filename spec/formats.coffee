semver = require('semver')

module.exports =
  register: (jsf) ->
    jsf.formats
      semver: (gen, schema) ->
        gen.randexp '\\d\\.\\d\\.\\d{1,2}'

  validate: (v) ->
    registry = v.addFormat or v.registerFormat
    msgOnFail = not v.registerFormat

    registry.call v, 'semver', (value) ->
      err = try
        pass = semver.valid(value) is value
      catch e
        e.message

      if msgOnFail
        # tv4, Jayschema
        return null if pass
        err
      else
        # ZSchema
        pass
