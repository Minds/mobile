var allTestFiles = [];
var TEST_REGEXP = /(spec|test)\.js$/i;

var pathToModule = function(path) {
	return path.replace(/^\/base\//, '../../').replace(/\.js$/, '');
};

Object.keys(window.__karma__.files).forEach(function(file) {
	if (TEST_REGEXP.test(file)) {
		// Normalize paths to RequireJS module names.
		allTestFiles.push(pathToModule(file));
	}
});
console.log(allTestFiles);
require.config({
	// Karma serves files under /base, which is the basePath from your config file
	baseUrl: '/base/www/js',

	paths: {
		config: '/base/tests/spec/config-test',
		angular: '../vendors/ionic/js/angular/angular.min',
		'angular-mocks': '/base/tests/spec/angular-mocks',
		angularAnimate: '../vendors/ionic/js/angular/angular-animate.min',
		angularSanitize: '../vendors/ionic/js/angular/angular-sanitize.min',
		uiRouter: '../vendors/ionic/js/angular-ui/angular-ui-router.min',
		ionic: '../vendors/ionic/js/ionic.min',
		ionicAngular: '../vendors/ionic/js/ionic-angular',
		text: '../vendors/text',
		JSEncrypt: '../vendors/jsencrypt/jsencrypt',
		imgcache: '../vendors/imgcache/imgcache',
		facebook: '../vendors/facebook/sdk'
	},

	shim: {
		config: {},
		angular: {
			exports: 'angular'
		},
		'angular-mocks': {
			deps: ['angular'],
			exports: 'angular-mocks'
		},
		angularAnimate: {
			deps: ['angular']
		},
		angularSanitize: {
			deps: ['angular']
		},
		uiRouter: {
			deps: ['angular']
		},
		ionic: {
			deps: ['angular'],
			exports: 'ionic'
		},
		ionicAngular: {
			deps: ['angular', 'ionic', 'uiRouter', 'angularAnimate', 'angularSanitize']
		},
		JSEncrypt: {
			exports: 'JSEncrypt'
		},
		facebook: {
			exports: 'FB'
		}
	},
	priority: ['angular', 'ionic'],

	// dynamically load all test files
	deps: allTestFiles,

	// we have to kickoff jasmine, as it is asynchronous
	callback: window.__karma__.start
});
