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
	directives.directive('remindView', require('directives/remindView'));
	directives.directive('ownerBriefView', require('directives/ownerBriefView'));
	directives.directive('decrypt', require('directives/decrypt'));
	directives.directive('imageCache', require('directives/imageCache'));
	directives.directive('thumbs', require('directives/thumbs'));
	directives.directive('playVideo', require('directives/playVideo'));
	directives.directive('subscribe', require('directives/subscribe'));
	directives.directive('swipe', require('directives/swipe'));
	directives.directive('walletCounter', require('directives/walletCounter'));

	return directives;
});
