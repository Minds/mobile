define(['angular'], function (angular) {
	'use strict';
  
	return angular.module('app.config', [])
		.constant('VERSION', '1.0.0')
		.constant('NODE_URL', 'https://www.minds.com/')
		.constant('OAuthConfig', {
			client_id: '123', 
			client_secret: 'xyz' 
		});
    
});