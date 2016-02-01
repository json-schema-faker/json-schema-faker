module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.loadNpmTasks('grunt-parts');

  grunt.config('pkg', grunt.file.readJSON('package.json'));
  grunt.config('banner', grunt.file.read('.banner.txt'));
  grunt.config('now', (new Date()).toISOString().replace('T', ' '));
  grunt.config('browserify', {
    options: {
      watch: true,
      banner: '<%= banner %>',
      browserifyOptions: {
        standalone: 'jsf',
        noBuiltins: true,
        detectGlobals: false
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
        'dist/json-schema-faker.min.js': ['lib/index.js']
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
