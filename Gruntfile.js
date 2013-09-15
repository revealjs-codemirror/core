/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= pkg.license %> */\n',
    // Task configuration.
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['lib/<%= pkg.name %>.js', 'lib/codemirrorify.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true
        }
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib_test: {
        src: ['lib/**/*.js', 'spec/**/*.js']
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib_test: {
        files: '<%= jshint.lib_test.src %>',
        tasks: ['jshint:lib_test']
      }
    },
    jasmine: {
      src: [ 'lib/<%= pkg.name %>.js', 'lib/codemirrorify.js' ],
        options: {
            specs: [ 'spec/*_spec.js' ],
            vendor: [
                'bower_components/codemirror/lib/codemirror.js',
                'bower_components/reveal.js/js/reveal.min.js',
            ],
            styles: [ 'bower_components/codemirror/lib/codemirror.css' ],
            keepRunner: true
        }
    },
    generate: {
      namespace: {
        src: 'template/namespace.tmpl',
        dest: 'lib/<%= pkg.name %>.js',
        options: {
          data: grunt.file.readJSON('package.json')
        }
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jasmine');


  grunt.registerMultiTask('generate', 'generate a file from a template', function(){
    var files = this.files;
    var options = this.options({});

    files.forEach(function(f){
      var src = f.src.filter(function(filepath){
        if(!grunt.file.exists(filepath)){
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      });

      var template = src.map(function(filepath){
        return grunt.file.read(filepath);
      }).join(grunt.util.linefeed);

      grunt.file.write(f.dest, grunt.template.process(template, options));

      grunt.log.writeln('Generated "' + f.dest + '"');
    });
  });

  // Default task.
  grunt.registerTask('default', ['generate:namespace', 'jshint', 'jasmine', 'concat', 'uglify']);

};
