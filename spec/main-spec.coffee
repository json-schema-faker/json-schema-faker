fs = require('fs')
glob = require('glob')
jsfaker = require('../lib')

pick = (obj, key) ->
  parts = key.split('.')
  obj = obj[parts.shift()] while parts.length
  obj

argv = process.argv.slice(2)
spec = argv.indexOf('--spec')
spec = unless spec is -1
  argv[spec + 1]
else
  null

glob.sync("#{__dirname}/**/*.json").forEach (file) ->
  if spec isnt null
    return if file.indexOf(spec) is -1

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

          error = ''

          sample = try
            if test.require
              wrapper = require('./' + test.require)
              wrapper.register(jsfaker)
            jsfaker(schema, refs)
          catch e
            error = e.message
            throw e unless test.throws

          if test.hasNot
            expect(sample.toString()).not.toContain test.hasNot

          if test.type
            expect(sample).toHaveType test.type

          if typeof test.throws is 'string'
            expect(error).toMatch new RegExp('^' + test.throws + '$', 'i')

          if test.valid
            try
              expect(sample).toHaveSchema schema, refs
            catch e
              console.log suite.description
              console.log 'schema', JSON.stringify(schema, null, 2)
              console.log 'sample', JSON.stringify(sample, null, 2)
              throw e
