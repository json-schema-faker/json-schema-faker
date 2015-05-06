module.exports = (grunt) ->
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

  grunt.loadNpmTasks 'grunt-bower-task'
  grunt.loadNpmTasks 'grunt-browserify'
  grunt.loadNpmTasks 'grunt-contrib-cssmin'
  grunt.loadNpmTasks 'grunt-contrib-watch'

  grunt.registerTask 'default', ['bower', 'browserify', 'cssmin']
