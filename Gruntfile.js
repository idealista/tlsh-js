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
          expect: false,
          Tlsh: false,
          tlsh: true,
          beforeEach: false,
          beforeAll: false,
          ModularDifferenceCalculator: true,
          DigestHashBuilder: true,
          InsufficientComplexityError: false
        }
      }
    },
    jasmine: {
      tlsh: {
        src: 'lib/**/*.js',
        options: {
          specs: 'spec/**/*-spec.js'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('test', ['jshint', 'jasmine']);
  grunt.registerTask('default', ['test']);
};