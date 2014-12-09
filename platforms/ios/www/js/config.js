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
		.constant('NODE_URL', 'http://127.0.0.1/')
		.constant('OAuthConfig', { client_id: 123, client_secret: 456 });
    
});