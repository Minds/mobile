/**
 * Minds::mobile
 * The main app file
 * 
 * @author Mark Harding
 */

define(['angular',
		'uiRouter',
		'config',
		'filters/filters',
        'services/services',
       	'directives/directives',
		'controllers/controllers',
        'ionicAngular'],

	function (angular, uiRouter) {
		'use strict';

		var app = angular.module('app', [
			'ionic',
			'app.controllers',
			'app.filters',
			'app.services',
			'app.directives',
			'app.config',
			'ui.router']);

		return app;

	});