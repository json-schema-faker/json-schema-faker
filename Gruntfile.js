module.exports = function(grunt) {
  grunt.initConfig({
    jasmine_node: {
      all: ['spec'],
      options: {
        coffee: true,
        useHelpers: true,
        includeStackTrace: false
      }
    },
    eslint: {
      all: ['lib/**/*.js']
    },
    watch: {
      all: {
        files: ['lib/**/*.js', 'spec/*.coffee', 'spec/fixtures/*.*'],
        tasks: ['eslint', 'jasmine_node']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jasmine-node');
  grunt.loadNpmTasks('grunt-eslint');
};
