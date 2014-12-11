module.exports = function (grunt) {

    grunt.initConfig({
        
        cssmin: {
            compress: {
                files: {
                    'css/style.css': [
                    	'css/core.css',
                        'css/buttons.css', 
                        'css/components.css',
                        'css/newsfeed.css'
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
