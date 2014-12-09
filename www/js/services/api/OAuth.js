/**
 * Minds::mobile
 * OAuth 2.0 service
 * 
 * THIS CURRENTLY DOES NOT DO AN API REQUEST, BUT WILL SOON
 * 
 * @author Mark Harding
 */

define(['angular'], function (angular) {
    "use strict";

    var factory = function ($rootScope, OAuthConfig, $http) {

		var time = Math.round(new Date().getTime() / 1000);

        return {
        	
			client_id : OAuthConfig.client_id,
			client_secret : OAuthConfig.client_secret,
			redirect_uri : $rootScope.node_url + 'news',
			//refresh_token : localStorage.getItem('refresh_token'),
			access_token : null,
			timestamp : 0,
			
			login: function(username, password, callback){
				
				console.log(username, password);
				$http.post($rootScope.node_url + 'services/api/rest/json', {
					method: 'minds.login',
					username: username,
					password: password
				}).
				  success(function(data, status, headers, config) {
				   console.log('success');
				   console.log(data, status, headers, config);
				  }).
				  error(function(data, status, headers, config) {
				    console.log('fail..');
				  });
			
				callback(true);
				
			}

		};

    };

    factory.$inject = ['$rootScope', 'OAuthConfig', '$http'];
    return factory;
});