module.exports = function (grunt) {

    grunt.initConfig({
        
        cssmin: {
            compress: {
                files: {
                    'www/css/style.css': [
                    	'www/css/core.css',
                        'www/css/buttons.css', 
                        'www/css/components.css',
                        'www/css/newsfeed.css',
			'www/css/channel.css',
                        'www/css/gatherings.css',
                        'www/css/notifications.css',
			'www/css/capture.css'
                    ]
                }
            }
        }


    });

    grunt.loadTasks('tasks');

    grunt.loadNpmTasks('grunt-contrib-cssmin');

    /**
     * Compile
     */
    grunt.registerTask('compile', ['cssmin']);


}
