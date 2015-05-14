/**
 * Minds::mobile
 * OAuth 2.0 service
 *
 * THIS CURRENTLY DOES NOT DO AN API REQUEST, BUT WILL SOON
 *
 * @author Mark Harding
 */

define(['angular'], function(angular) {
	"use strict";

	var factory = function($rootScope, OAuthConfig, $http, storage) {

		var time = Math.round(new Date().getTime() / 1000);

		var self = {

			client_id: OAuthConfig.client_id,
			client_secret: OAuthConfig.client_secret,
			redirect_uri: $rootScope.node_url + 'news',
			//refresh_token : localStorage.getItem('refresh_token'),
			access_token: null,
			timestamp: 0,

			buildParams: function(params) {
				return angular.extend(params, {
					'client_id': OAuthConfig.client_id,
					//'client_secret': OAuthConfig.client_secret,
					'access_token': storage.get('access_token')
				});
			},

			login: function(username, password, callback) {

				$http({
					method: 'POST',
					url: $rootScope.node_url + 'oauth2/token',
					data: {
						'grant_type': 'password',
						'client_id': self.client_id,
						'client_secret': self.client_secret,
						'username': username,
						'password': password
					},
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
					}
				}).success(function(data, status, headers, config) {

					storage.set('user_id', data.user_id);
					storage.set('user_guid', data.user_id);
					storage.set('access_token', data.access_token);
					storage.set('loggedin', true);

					callback(true);
				}).error(function(data, status, headers, config) {
					console.log('fail..', data, status, headers, config);
					callback(false);
				});

			},

			refresh: function(token, callback) {
				$http({
					method: 'POST',
					url: $rootScope.node_url + 'oauth2/token',
					data: {
						'grant_type': 'refresh_token',
						'client_id': self.client_id,
						'client_secret': self.client_secret,
						'refresh_token': token
					},
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
					}
				}).success(function(data, status, headers, config) {
					//self.refresh(data.access_token);
					console.log(data);
				}).error(function(data, status, headers, config) {
					console.log('fail..', data, status, headers, config);
					alert('fail...');
				});
			}
		};

		return self;

	};

	factory.$inject = ['$rootScope', 'OAuthConfig', '$http', 'storage'];
	return factory;
});
