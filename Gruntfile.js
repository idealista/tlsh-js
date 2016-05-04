module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    jshint: {
      files: {
        src: ['Gruntfile.js', 'lib/**/*.js', 'spec/**/*.js']
      },
      options : {
        node: true,
        camelcase: true,
        globals : {
          it: false,
          describe: false,
          Tlsh: false,
          tlsh: true,
          before: false,
          ModularDifferenceCalculator: true,
          DigestHashBuilder: true,
          InsufficientComplexityError: true
        }
      }
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['spec/**/*-spec.js']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.registerTask('test', ['jshint', 'mochaTest']);
  grunt.registerTask('default', ['test']);
};