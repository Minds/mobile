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
	directives.directive('decrypt', require('directives/decrypt'));
	directives.directive('imageCache', require('directives/imageCache'));
	directives.directive('thumbs', require('directives/thumbs'));
	directives.directive('playVideo', require('directives/playVideo'));
	
	return directives;
}); 