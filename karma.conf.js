// Karma configuration
// Generated on Wed May 13 2015 11:08:52 GMT+0100 (BST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: './',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'requirejs'],


    // list of files / patterns to load in the browser
    files: [
      {pattern: 'tests/spec/test-main.js', included: true},
      {pattern: 'www/js/*.js', included: false },
      {pattern: 'www/js/**/*.js', included: false },
      {pattern: 'www/vendors/**/*.js', included: false },
      {pattern: 'www/templates/**/*.html', included: false },
      {pattern: 'tests/spec/**/*.js', included:false}
    ],


    // list of files to exclude
    exclude: [
        'www/js/main.js',
        'www/js/main-built.js'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
	preprocessors: {
    	//"www/templates/**/*.html": ["ng-html2js"]
	},
	
	ngHtml2JsPreprocessor: {
	    // the name of the Angular module to create
	    stripPrefix: 'www/templates',
	    moduleName: "mytemplates"
	},


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],
    
    
	customLaunchers: {
        Chrome_travis_ci: {
            base: 'Chrome',
            flags: ['--no-sandbox']
        }
    },

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true
  });
  
  if(process.env.TRAVIS){
	config.browsers = ['Chrome_travis_ci'];
  }
    
};
