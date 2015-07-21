module.exports = function (grunt) {

    [
        'grunt-contrib-jshint',
        'grunt-contrib-watch',
        'grunt-contrib-clean',
        'grunt-contrib-copy',
        'grunt-contrib-concat',
        'grunt-contrib-uglify',
        'grunt-contrib-cssmin',
        'grunt-contrib-concat',
        'grunt-contrib-less',
        'grunt-usemin',
        'grunt-filerev'
    ].forEach(function (task) {
            grunt.loadNpmTasks(task);
        });

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            dist: {
                src: [
                    'dist/*',

                    '!dist/css/**',
                    'dist/css/*',
                    '!dist/css/*.pkg.*.css',

                    '!dist/js/**',
                    'dist/js/*',
                    '!dist/js/*.pkg.*.js'
                ]
            }
        },

        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: 'src/',
                    dest: 'dist/',
                    src: [
                        '*',
                        'css/**',
                        'js/**',
                        'lib/**',
                        'fonts/**',
                        'images/**',
                        'partials/**'
                    ],
                    filter: 'isFile'
                }]
            }
        },

        less: {
            css: {
                options: {
                    paths: ["src/less"]
                },
                files: [
                    {
                        expand: true,
                        cwd: 'src/less',
                        src: ['*.less'],
                        dest: 'src/css/',
                        ext: '.css'
                    }
                ]
            }
        },

        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['src/**/*.js'],
                dest: 'dist/js/<%= pkg.name %>.js'
            }
        },

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },

        useminPrepare: {
            html: [
                'dist/**/*.html'
            ]
        },

        usemin: {
            html: [
                'dist/**/*.html'
            ],
            options: {
                dirs: ['dist/']
            }
        },

        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'dist/css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'dist/css',
                    ext: '.min.css'
                }]
            }
        },

        filerev: {
            files: {
                src: [
                    'dist/css/*.pkg.css',
                    'dist/js/*.pkg.js'
                ]
            }
        },

        jshint: {
            files: ['gruntfile.js', 'src/**/*.js'],
            options: {
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                },
                ignores: [
                    // enter paths to ignore here
                ]
            }
        },

        watch: {
            less: {
                files: ['src/**/*.less'],
                tasks: ['less']
            }
        }
    });


    grunt.registerTask('test', ['jshint']);

    grunt.registerTask('dev', ['less', 'watch']);

    // full build for optimized version
    grunt.registerTask('default', ['less', 'jshint', 'clean', 'copy',
        'useminPrepare',
        'concat', 'uglify', 'cssmin',
        'filerev',
        'usemin']);
};
