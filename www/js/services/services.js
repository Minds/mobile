/**
 * Minds::mobile
 * Services loader. All services must be set here.
 *
 * @author Mark Harding
 */

define(function(require) {

	'use strict';

	var angular = require('angular'),
		config = require('config'),
		services = angular.module('app.services', ['app.config']);

	services.factory('OAuth', require('services/api/OAuth'));
	services.factory('storage', require('services/storage'));
	services.factory('push', require('services/push'));
	services.factory('Cacher', require('services/cacher'));
	services.factory('Client', require('services/api/Client'));
	services.factory('NewsfeedAPI', require('services/api/Newsfeed'));
	services.factory('wallet', require('services/wallet'));
	services.factory('fbService', require('services/fb'));
	services.factory('analytics', require('services/analytics'));
	services.factory('socket', require('services/socket'));
	services.factory('CallReceiver', require('services/calls/CallReceiver'));

	return services;

});
