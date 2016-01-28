module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    banner: grunt.file.read('.banner.txt'),

    now: (new Date()).toISOString().replace('T', ' '),

    browserify: {
      options: {
        watch: "on",
        banner: "<%= banner %>",
        browserifyOptions: {
          detectGlobals: "off",
          noBuiltins: "on"
        }
      },
      dist: {
        files: {
          'dist/json-schema-faker.js': ['lib/index.js']
        }
      },
      min: {
        options: {
          transform: ['uglifyify']
        },
        files: {
          'dist/json-schema-faker-min.js': ['lib/index.js']
        }
      }
    }
  });

  grunt.registerTask('build', [
    'browserify'
  ]);

  grunt.registerTask('default', [
    'spec',
    'build'
  ]);

};
