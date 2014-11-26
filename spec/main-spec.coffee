fs = require('fs')
glob = require('glob')
jsfaker = require('../lib')

pick = (obj, key) ->
  parts = key.split('.')
  obj = obj[parts.shift()] while parts.length
  obj

glob.sync("#{__dirname}/**/*.json").forEach (file) ->
  JSON.parse(fs.readFileSync(file)).forEach (suite) ->
    describe "#{suite.description} (#{file.replace(__dirname + '/', '')})", ->
      suite.tests.forEach (test) ->
        it test.description, ->
          schema = if typeof test.schema is 'string'
            pick(suite, test.schema)
          else
            test.schema

          refs = test.refs?.map (ref) ->
            if typeof ref is 'string'
              pick(suite, ref)
            else
              ref

          sample = try
            jsfaker(schema, refs)
          catch e
            throw e unless test.throws

          if test.type
            if test.type is 'any'
              expect(sample).toHaveAnyType()
            else
              expect(sample).toHaveType test.type

          if test.valid
            expect(sample).toHaveSchema schema, refs
