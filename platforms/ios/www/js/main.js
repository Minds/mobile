/**
 * Minds::mobile
 * Main loader
 * 
 * @author Mark Harding
 */

requirejs.config({
	paths: {
        angular:          '../vendors/angular/angular.min',
        angularAnimate:   '../vendors/angular/angular-animate.min',
        angularSanitize:  '../vendors/angular/angular-sanitize.min',
        uiRouter:         '../vendors/angular-ui/angular-ui-router.min',
        ionic:            '../vendors/ionic/ionic.min',
        ionicAngular:     '../vendors/ionic/ionic-angular.min',
        text:             '../vendors/text'
    },
    shim: {
        angular : {exports : 'angular'},
        angularAnimate : {deps: ['angular']},
        angularSanitize : {deps: ['angular']},
        uiRouter : {deps: ['angular']},
        ionic :  {deps: ['angular'], exports : 'ionic'},
        ionicAngular: {deps: ['angular', 'ionic', 'uiRouter', 'angularAnimate', 'angularSanitize']}
    },
    priority: [
        'angular',
        'ionic'
    ],
    deps: [
        'bootstrap'
    ]
});