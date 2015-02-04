module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      octadom: {
        src: ['src/octadom.js'],
        dest: 'dist/octadom.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      api: {
        files: {
          'dist/octadom.min.js': ['<%= concat.octadom.dest %>']
        }
      }
    },
    qunit: {
      // run teest on src code that has been concatenated into single file
      src: ['test/tests.html'],
      // run tests on uglified release file to ensure nothing broke druing uglification
      min: ['test/tests.min.html']

    },
    jshint: {
      files: ['Gruntfile.js', 'src/*.js', 'test/**/*.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint', 'qunit']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('test', ['concat', 'qunit:src']);

  grunt.registerTask('default', ['jshint', 'concat', 'qunit:src', 'uglify', 'qunit:min']);

};
