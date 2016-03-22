fs = require('fs')
glob = require('glob')
jsfaker = require('../')

pick = (obj, key) ->
  parts = key.split('.')
  obj = obj[parts.shift()] while parts.length
  obj

glob.sync("#{__dirname}/**/*.json").forEach (file) ->
  suite = JSON.parse(fs.readFileSync(file))

  (if Array.isArray(suite) then suite else [suite]).forEach (suite) ->
    return if suite.xdescription

    describe "#{suite.description} (#{file.replace(__dirname + '/', '')})", ->
      beforeEach ->
        jasmine.addMatchers(customMatchers)

      suite.tests.forEach (test) ->
        return if test.xdescription

        it test.description, ->
          if test.require
            wrapper = require('./' + test.require)
            wrapper.register(jsfaker)

          schema = if typeof test.schema is 'string'
            pick(suite, test.schema)
          else
            test.schema

          refs = test.refs?.map (ref) ->
            if typeof ref is 'string'
              pick(suite, ref)
            else
              ref

          error = null

          sample = try
            jsfaker(schema, refs)
          catch e
            error = String(e)
            throw e unless test.throws

          if test.dump
            console.log 'IN', JSON.stringify(schema, null, 2)
            console.log 'OUT', JSON.stringify(sample, null, 2)
            return

          if test.hasNot
            expect(JSON.stringify sample).not.toContain test.hasNot

          if test.type
            expect(sample).toHaveType test.type

          if typeof test.throws is 'string'
            if typeof error isnt 'string'
              throw new Error """
                THIS SHOULD NOT HAPPEN --- #{error}

                #{JSON.stringify(schema, null, 2)}

                #{JSON.stringify(sample, null, 2)}
              """

            expect(error).toMatch new RegExp(test.throws, 'i')

          if test.valid
            try
              expect(sample).toHaveSchema [schema, refs]
            catch e
              throw new Error """
                #{suite.description} (#{e})

                #{JSON.stringify(sample, null, 2)}

                #{JSON.stringify(schema, null, 2)}
              """

          if test.equal
            expect(sample).toEqual test.equal
