define(['angular'], function (angular) {
	'use strict';
  
	return angular.module('app.config', [])
		.constant('VERSION', '0.0.1')
		.constant('NODE_URL', 'https://www.minds.io/')
		.constant('OAuthConfig', { 
			client_id: 'ENTER HERE', 
			client_secret: 'ENTER HERE' 
		});
    
});