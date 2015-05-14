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
						'www/css/comments.css'
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
		  }

	});

	grunt.loadTasks('tasks');

	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-jscs');

	/**
	 * Compile
	 */
	grunt.registerTask('compile', ['cssmin']);

	/**
	 * Test
	 */
	grunt.registerTask('test', ['karma', 'jscs', 'jshint']); 

}
