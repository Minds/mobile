/**
 * Minds::mobile
 * Provides current version info
 * 
 * @author Mark Harding
 */

define(['angular'], function (angular) {
	'use strict';
  
	return angular.module('app.config', [])
		.constant('VERSION', '0.0.1')
		.constant('NODE_URL', 'https://www.minds.io/')
		.constant('OAuthConfig', { 
			client_id: '391262589742485504', 
			client_secret: '5ac059d946fd4c389db7525c1ea52f65' 
		})
		.constant('OAuthClientID', '391262589742485504')
		.constant('OAuthClientSecret', '5ac059d946fd4c389db7525c1ea52f65');
    
});