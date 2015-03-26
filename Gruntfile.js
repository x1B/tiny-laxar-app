/**
 * Copyright 2015 Michael Kurze
 */
/*global module,__dirname,__filename */
module.exports = function( grunt ) {
   'use strict';

   var path = require( 'path' );

   var serverPort = 8000;
   var liveReloadPort = 30000 + serverPort;

   grunt.initConfig( {
      pkg: grunt.file.readJSON( 'package.json' ),
      connect: {
         options: {
            port: serverPort
         },
         default: {}
      },
      jshint: {
         options: {
            jshintrc: __dirname + '/.jshintrc'
         }
      },
      portal_angular_dependencies: {
         default: {
            options: {},
            dest: 'var/static/portal_angular_dependencies.js',
            src: [ 'application/flow/*.json' ]
         }
      },
      css_merger: {
         default: {
            src: [ 'application/flow/*.json' ]
         }
      },
      cssmin: {
         default: {
            options: {
               keepSpecialComments: 0
            },
            files: [ {
               expand: true,
               src: 'var/static/css/*.theme.css',
               ext: '.min.css'
            } ]
         }
      },
      directory_tree: {
         application: {
            dest: 'var/listing/application_resources.json',
            src: [
               'application/flow/**/*.json',
               'application/layouts/**/*.css',
               'application/layouts/**/*.html',
               'application/pages/**/*.json'
            ],
            options: {
               embedContents: [
                  'application/flow/**/*.json',
                  'application/layouts/**/*.html',
                  'application/pages/**/*.json'
               ]
            }
         },
         includes: {
            dest: 'var/listing/includes_resources.json',
            src: [
               'includes/lib/laxar_uikit/themes/**/*.css',
               'includes/lib/laxar_uikit/controls/**/*.+(css|html)',
               'includes/themes/**/*.+(css|html)',
               'includes/widgets/*/*/*.+(css|html|json)',
               '!includes/widgets/*/*/+(package|bower).json',
               'includes/widgets/*/*/!(bower_components|node_modules|spec)/**/*.+(css|html|json)'
            ],
            options: {
               embedContents: [
                  'bower_components/laxar_uikit/controls/**/*.html',
                  'includes/themes/**/controls/**/*.html',
                  'includes/widgets/*/*/widget.json',
                  'includes/widgets/*/*/*.theme/*.html',
                  'includes/widgets/*/*/*.theme/css/*.css'
               ]
            }
         }
      },
      requirejs: {
         default: {
            options: {
               mainConfigFile: 'require_config.js',
               wrap: {
                  startFile: 'require_config.js'
               },
               name: '../init',
               out: 'var/build/optimized_init.js',
               optimize: 'uglify2',
               done: function(done, output) {
                  var duplicates = require('rjs-build-analysis').duplicates(output);

                  if (Object.keys(duplicates).length > 0) {
                     grunt.log.subhead('Duplicates found in requirejs build:');
                     for (var key in duplicates) {
                        grunt.log.error(duplicates[key] + ": " + key);
                     }
                     return done(new Error('r.js built duplicate modules, please check the excludes option.'));
                  } else {
                     grunt.log.success("No duplicates found!");
                  }

                  done();
               }
            }
         }
      },
      watch: {
         options: {
            livereload: liveReloadPort,
            reload: true
         },
         Gruntfile: {
            files: __filename
         },
         application: {
            files: [
               'application/**/!(scss)/*.*'
            ]
         },
         libraries: {
            files: [
               'includes/lib/*/!(bower_components|node_modules)/**',
               'includes/themes/*.theme/!(bower_components|node_modules)/**'
            ]
         },
         dependencies: {
            files: [
               '<%= directory_tree.application.src %>',
               '<%= directory_tree.includes.src %>'
            ],
            tasks: [
               'directory_tree:application',
               'directory_tree:includes',
               'portal_angular_dependencies'
            ],
            options: {
               event: [ 'added', 'deleted' ]
            }
         }
      }
   } );

   // Find all widget.json files,
   // take their directory names,
   // create or update the configuration
   grunt.file.expand( 'includes/widgets/*/*/widget.json' )
      .map( path.dirname )
      .forEach( function( widget ) {
         var config = grunt.config( 'widget.' + widget );
         grunt.config( 'widget.' + widget, grunt.util._.defaults( {}, config ) );
         grunt.config( 'watch.' + widget, {
            files: [
               widget + '/!(bower_components|node_modules)',
               widget + '/!(bower_components|node_modules)/**'
            ]
         } );
      } );

   grunt.loadNpmTasks( 'grunt-laxar' );
   grunt.loadNpmTasks( 'grunt-contrib-compass' );
   grunt.loadNpmTasks( 'grunt-contrib-cssmin' );
   grunt.loadNpmTasks( 'grunt-contrib-watch' );

   grunt.registerTask( 'server', [ 'connect' ] );
   grunt.registerTask( 'build', [ 'directory_tree', 'portal_angular_dependencies' ] );
   grunt.registerTask( 'optimize', [ 'build', 'css_merger', 'cssmin', 'requirejs' ] );
   grunt.registerTask( 'test', [ 'server', 'widgets' ] );
   grunt.registerTask( 'default', [ 'build', 'test' ] );
   grunt.registerTask( 'start', [ 'build', 'server', 'watch' ] );

};
