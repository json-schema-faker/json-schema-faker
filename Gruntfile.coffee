module.exports = (grunt) ->
  grunt.initConfig
    watch:
      main:
        files: ['main.js']
        tasks: ['browserify']

    browserify:
      dist:
        options:
          watch: on
        files:
          'bundle.js': ['main.js']

  grunt.loadNpmTasks 'grunt-browserify'
  grunt.loadNpmTasks 'grunt-contrib-watch'
