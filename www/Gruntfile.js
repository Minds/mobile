module.exports = function (grunt) {

    grunt.initConfig({
        
        cssmin: {
            compress: {
                files: {
                    'css/style.css': [
                        'css/buttons.css', 
                        'css/components.css'
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
