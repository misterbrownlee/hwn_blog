module.exports = function(grunt) {

  // make symlink 'output' to local wordpress themes folder instance of hwn_blog
  // ln -s path/to/local/wordpress/wp-content/themes/hwn_blog output

  var dirs = {
        deploy: 'output',
        wordpress: '~/Documents/code/tehfoo/test_press'
    };

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    dirs: dirs,

    less: {
      development: {
        options: {
          paths: ["library/less"]
        },
        files: {
          "library/css/style.full.css": "library/less/style.less"
        }
      }
    },

    cssmin: {
      style: {
        files: [{
          "library/css/style.css": "library/css/style.full.css"
        }]
      }
    },

    copy: {
      css: {
        files: [{
          expand: true,
          cwd: 'library/css/',
          src: '**',
          dest: '<%=dirs.deploy%>/library/css/'
        }]
      },
      install: {
        files: [{
          expand: true,
          cwd: '/',
          src: '**/*.php',
          dest: '<%=dirs.wordpress%>/themes/<%=pkg.name%>'
        }]
      }
    },
    
    watch: {
      files: ['library/less/*.less'],
      tasks: ['less', 'cssmin', 'copy']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['less']);

};

