module.exports = function(grunt) {
  'use strict';

  var pkg = grunt.file.readJSON('package.json');

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
    },
    browserify: {
      dist : {
        src: [pkg.main],
        dest: 'dist/tlsh.min.js',
        options: {
          browserifyOptions: {
            standalone: 'Tlsh'
          }
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-browserify');

  grunt.registerTask('test', 'mochaTest');
  grunt.registerTask('default', ['jshint', 'test', 'browserify']);
};