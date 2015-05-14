module.exports = (grunt) ->
  require('load-grunt-tasks') grunt
  grunt.initConfig
    pkg: grunt.file.readJSON('package.json')

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
          'bundle.js': [
            'src/main.js'
          ]

    uglify:
      dist:
        files:
          'vendor.js': [
            'bower_components/jquery/dist/jquery.js',
            'bower_components/bootstrap/dist/js/bootstrap.js'
          ]

    cssmin:
      dist:
        files:
          'bundle.css': [
            'src/main.css'
          ]
          'vendor.css': [
            'bower_components/bootstrap/dist/css/bootstrap.css',
            'bower_components/bootstrap/dist/css/bootstrap-theme.css'
          ]

    template: {
      index: {
        options: {
          data: {
            version: '<%= pkg.devDependencies["json-schema-faker"] %>'
          }
        },
        files: {
          'index.html': 'src/index.tpl'
        }
      }
    }

    'http-server': {
      demo: {
        root: '.',
        host: '0.0.0.0',
        port: '9000'
      }
    }

  grunt.registerTask 'default', [
    'bower'
    'browserify'
    'uglify'
    'cssmin'
    'template'
    'http-server'
  ]
