module.exports = function(grunt) {

    var javascript = [
        'app_dev/scripts/app.js',
        'app_dev/scripts/controllers.js',
        'app_dev/scripts/services.js',
        'app_dev/scripts/app.js',
        'app_dev/scripts/directives.js'
    ];

    // On configure les taches
    grunt.initConfig({
        // On concatene les fichiers javascript
        concat: {
            options: {
                separator: ';'
            },
            dev: {
                src: javascript,
                dest: 'cordova/www/scripts/app.min.js'
            }
        },

        // On minifie le code javascript
        // On desactive le changement des noms de variable
        uglify: {
            options: {
                mangle: false
            },
            dev: {
                src: 'cordova/www/scripts/app.min.js',
                dest: 'cordova/www/scripts/app.min.js'
            }
        },

        // On minifie les images si il y en a
        imagemin: {
            dev: {
                files: [{
                    expand: true,
                    cwd: 'app_dev/static/images',
                    src: '**/*.{png,gif,jpg}',
                    dest: 'cordova/www/static/images'
                }]
            }
        },

        // On remplace les liens des javascript dans le code html
        'string-replace': {
            dev: {
                options: [
                    {
                        pattern: '',
                        replacement: '<script type="text/javascript" src="scripts/app.min.js"></script>'
                    }
                ],
                files: [{
                    src: 'cordova/www/index.html',
                    dest: 'cordova/www/index.html'
                }]
            }
        },

        // On minifie le code html
        htmlmin: {
            options: {
                removeComments: true,
                collapseWhitespace: true
            },
            dist: {
                src: 'app_dev/index.html',
                dest: 'cordova/www/index.html'
            }
        },

        // On compile COMPASS
        compass: {
            dist: {
                options: {
                    sassDir: 'app_dev/resources/styles/',
                    cssDir: 'cordova/www/resources/styles/',
                    raw: 'preferred_syntax = :sass\n'
                }
            }
        },

        // On copie les fonts sur l'environement de distribution
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: "app_dev/resources/fonts",
                        src: ['**'],
                        dest: 'cordova/www/resources/fonts/'
                    },
                    {
                        expand: true,
                        cwd: "app_dev/partials",
                        src: ['**'],
                        dest: 'cordova/www/partials/'
                    },
                    {
                        expand: true,
                        cwd: "app_dev/library",
                        src: ['**'],
                        dest: 'cordova/www/library/'
                    },
                    {
                        expand: true,
                        cwd: "app_dev/resources/images",
                        src: ['**'],
                        dest: 'cordova/www/resources/images/'
                    },
                    {
                        expand: true,
                        cwd: "app_dev/",
                        src: "index.html",
                        dest: "cordova/www/"
                    },
                    {
                        expand: true,
                        src: "config.xml",
                        dest: "cordova/"
                    }
                ]
            }
        }

    });

    // On charge les modules
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-string-replace');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-compass');

    // On enregistre les taches
    grunt.registerTask('dev', [
        'copy',
        'compass'
    ]);

    grunt.registerTask('dist', [
        'copy',
        'compass',
        'concat',
        'uglify',
        'htmlmin',
        'string-replace'
    ]);

};
