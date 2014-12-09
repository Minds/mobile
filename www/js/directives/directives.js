/**
 * Minds::mobile
 * Directives loader
 * 
 * @author Mark Harding
 */

define(function(require) {

	'use strict';

	var angular = require('angular'), 
		services = require('services/services'), 
		directives = angular.module('app.directives', ['app.services']);

	directives.directive('activityView', require('directives/activityView'));
	directives.directive('ownerBriefView', require('directives/ownerBriefView'));
	
	return directives;
}); 