fs = require('fs')
glob = require('glob')
jsf = require('../../')

pick = (obj, key) ->
  parts = key.split('.')
  obj = obj[parts.shift()] while parts.length
  obj

tryTest = (test, refs, schema) ->
  return if test.skip

  (if test.async
    jsf.resolve(schema, refs)
  else
    Promise.resolve().then ->
      jsf(schema, refs))
  .catch (error) ->
    if typeof test.throws is 'string'
      expect(error).toMatch new RegExp(test.throws, 'im')

    if typeof test.throws is 'boolean'
      throw error if test.throws isnt true
  .then (sample) ->
    if test.dump
      console.log 'IN', JSON.stringify(schema, null, 2)
      console.log 'OUT', JSON.stringify(sample, null, 2)
      return

    if test.hasProps
      test.hasProps.forEach (prop) ->
        if Array.isArray(sample)
          sample.forEach (s) ->
            expect(s[prop]).not.toBeUndefined()
        else
          expect(sample[prop]).not.toBeUndefined()

    if test.hasNot
      expect(JSON.stringify sample).not.toContain test.hasNot

    if test.type
      expect(sample).toHaveType test.type

    if test.valid
      expect(sample).toHaveSchema [schema, refs]

    if "equal" of test
      expect(sample).toEqual test.equal

glob.sync("#{__dirname}/**/*.json").forEach (file) ->
  suite = JSON.parse(fs.readFileSync(file))

  (if Array.isArray(suite) then suite else [suite]).forEach (suite) ->
    return if suite.xdescription

    describe "#{suite.description} (#{file.replace(__dirname + '/', '')})", ->
      beforeEach ->
        jasmine.addMatchers(customMatchers)

      suite.tests.forEach (test) ->
        return if test.xdescription

        it test.description, (done) ->
          if test.require
            wrapper = require('./' + test.require)
            wrapper.register(jsf)

          schema = if typeof test.schema is 'string'
            pick(suite, test.schema)
          else
            test.schema

          refs = test.refs?.map (ref) ->
            if typeof ref is 'string'
              pick(suite, ref)
            else
              ref

          # support for "exhaustive" testing, increase or set in .json spec
          # for detecting more bugs quickly by executing the same test N-times
          nth = test.repeat or (if process.CI then 100 else 10)

          tasks = []
          tasks.push(tryTest(test, refs, schema)) while nth--

          Promise.all(tasks).then(done)
