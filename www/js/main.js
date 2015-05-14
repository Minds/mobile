/**
 * Minds::mobile
 * Main loader
 *
 * @author Mark Harding
 */

requirejs.config({
	paths: {
		angular: '../vendors/ionic/js/angular/angular.min',
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
		angular: {
			exports: 'angular'
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
	deps: ['bootstrap']
});
