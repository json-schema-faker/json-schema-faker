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
            expect(sample).toHaveType test.type

          if test.valid
            try
              expect(sample).toHaveSchema schema, refs
            catch e
              console.log JSON.stringify(schema, null, 2)
              console.log JSON.stringify(sample, null, 2)
              throw e
