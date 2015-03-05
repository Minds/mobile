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
			client_id: '405468526791364608', 
			client_secret: 'e7088ba133b64aeb94389f4c3860f6be' 
		});
    
});