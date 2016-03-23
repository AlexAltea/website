'use strict';

module.exports = function (grunt) {
    // Load tasks from grunt-* dependencies in package.json
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take
    require('time-grunt')(grunt);

    // Project configuration
    grunt.initConfig({
        path: {
            app: 'app',
            dist: 'dist'
        },
        copy: {
            app: {
                expand: true,
                filter: 'isFile',
                cwd: '<%= path.app %>/',
                src: ['**/*.html', '**/*.jpg'],
                dest: '<%= path.dist %>/'
            }/*,
            externals: {
                expand: true,
                flatten: true,
                src: [
                    'node_modules/angular2/bundles/angular2.dev.js',
                    'node_modules/angular2/bundles/angular2-polyfills.js',
                    'node_modules/angular2/bundles/router.dev.js',
                    'node_modules/es6-shim/es6-shim.min.js',
                    'node_modules/rxjs/bundles/Rx.js',
                    'node_modules/systemjs/dist/system.src.js',
                    'node_modules/systemjs/dist/system-polyfills.js'
                ],
                dest: '<%= path.dist %>/externals'
            }*/
        },
        cssmin: {
            combine: {
                files: {
                    '<%= path.dist %>/darkair.css': [
                        '<%= path.app %>/styles/**/*.css'
                    ]
                }
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= path.dist %>',
                    src: '{,*/}*.html',
                    dest: '<%= path.dist %>/'
                }]
            }
        },
        concat: {
            scripts: {
                src: ['<%= path.app %>/scripts/**/*.js'],
                dest: '<%= path.dist %>/darkair.js'
            }
        },
        connect: {
            options: {
                port: 9000,
                livereload: 35728,
                hostname: 'localhost',
                base: '<%= path.dist %>'
            },
            livereload: {
                options: {
                    open: true
                }
            }
        },
        watch: {
            scripts: {
                files: '<%= path.app %>/scripts/**/*.js',
                tasks: ['concat']
            },
            styles: {
                files: '<%= path.app %>/styles/**/*.css',
                tasks: ['cssmin']
            },
            views: {
                files: '<%= path.app %>/**/*.html',
                tasks: ['copy', 'htmlmin']
            },
            livereload: {
                files: [
                    '<%= path.dist %>/**/*.html',
                    '<%= path.dist %>/**/*.js',
                    '<%= path.dist %>/**/*.css'
                ],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            },
        }
    });

    // Project tasks
    grunt.registerTask('test', [
    ]);
    grunt.registerTask('build', [
        'copy',
        'cssmin',
        'htmlmin',
        'concat'
    ]);
    grunt.registerTask('serve', [
        'connect',
        'watch'
    ]);
    grunt.registerTask('default', [
        'test',
        'build',
        'serve'
    ]);
};
