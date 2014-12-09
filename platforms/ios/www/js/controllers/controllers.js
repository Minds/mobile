/**
 * Minds::mobile
 * Controllers loader. All controllers must be set here.
 * 
 * @author Mark Harding
 */

define(function (require) {

	'use strict';

	var angular = require('angular'),
		services = require('services/services'),
		config = require('config'),
		controllers = angular.module('app.controllers', ['app.services', 'app.config']);

	controllers.controller('LoginCtrl', require('controllers/LoginCtrl'));
	controllers.controller('NewsfeedCtrl', require('controllers/newsfeed/NewsfeedCtrl'));
	controllers.controller('NewsfeedViewCtrl', require('controllers/newsfeed/NewsfeedViewCtrl'));
    
	controllers.run(['$rootScope', 'NODE_URL', function ($rootScope, NODE_URL) {
		$rootScope.node_url = NODE_URL;
	}]);
    
	return controllers;

});