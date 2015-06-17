module.exports = function(grunt) {

	grunt.initConfig({

		cssmin : {
			compress : {
				files : {
					'www/css/style.css' : [
						'www/css/core.css',
						'www/css/buttons.css',
						'www/css/components.css',
						'www/css/newsfeed.css',
						'www/css/channel.css',
						'www/css/gatherings.css',
						'www/css/notifications.css',
						'www/css/capture.css',
						'www/css/wallet.css',
						'www/css/comments.css',
						'www/css/tablets.css'
					]
				}
			}
		},
		karma : {
			unit : {
				configFile : 'karma.conf.js',
				singleRun : true
			}
		},
		jscs : {
			src : ['www/js/**/*.js', 'tests/spec/**/*.js'],
			options : {
				config : ".jscs.json",
				fix: true
			}
		},
		jshint: {
			options: {
				jshintrc: true,
			},
		    www: {
		      src: ['www/js/**/*.js', 'www/js/**/**/*.js']
		    },
		},
		requirejs: {
			compile: {
				options: {
					baseUrl: "www/js",
					name: "main",
					mainConfigFile: "www/js/main.js",
					preserveLicenseComments: false,
					out: "www/js/main-built.js",
					paths:{
						"config": "empty:",
						"filters": "empty:"
					},
					optimize: "uglify2"
			    }
			}
		},
		html2js: {
			options: {
			  base: 'www',
			  module: 'app.templates',
			  AMD: true,
			  singleModule: true,
			  useStrict: true
			},
			main: {
			  src: ['www/templates/*.html', 'www/templates/**/*.html'],
			  dest: 'www/js/templates-compiled.js'
			},
		}

	});

	grunt.loadTasks('tasks');

	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-html2js');
	grunt.loadNpmTasks('grunt-jscs');

	/**
	 * Compile
	 */
	grunt.registerTask('compile', ['html2js', 'requirejs', 'cssmin']);

	/**
	 * Test
	 */
	grunt.registerTask('test', ['karma', 'jscs', 'jshint']); 

}
