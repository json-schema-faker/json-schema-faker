module.exports = (grunt) ->
  require('load-grunt-tasks') grunt
  grunt.initConfig
    watch:
      main:
        files: ['main.js']
        tasks: ['browserify']

    bower:
      install:
        options:
          copy: false
          targetDir: 'bower_components'

    browserify:
      dist:
        options:
          watch: on
          browserifyOptions:
            fullPaths: off
        files:
          'bundle.js': ['main.js']

    cssmin:
      dist:
        files:
          'bundle.css': ['main.css']
          'vendor.css': ['bower_components/bootstrap/dist/css/bootstrap.css', 'bower_components/bootstrap/dist/css/bootstrap-theme.css']

  grunt.registerTask 'default', ['bower', 'browserify', 'cssmin']
