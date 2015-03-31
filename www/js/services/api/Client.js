/**
 * Minds::mobile
 * Client service
 * 
 * THIS CURRENTLY DOES NOT DO AN API REQUEST, BUT WILL SOON
 * 
 * @author Mark Harding
 */

define(['angular'], function (angular) {
    "use strict";

    var factory = function (OAuth, $rootScope, $http, storage, $state, $q) {

        return {
        
            get: function (endpoint, options, success_callback, error_callback) {
            	
            	var canceler = $q.defer();
				
				$http({
					method: 'GET',
					url: $rootScope.node_url + endpoint,
					params: OAuth.buildParams(options),
					cache: true,
					timeout: canceler.promise
					}).
				      success(function(data){
				        if(data.code == 401){
				        	//go to login
				        	storage.remove('access_token');
				        	storage.remove('loggedin');
				        	$state.go('login');
				        	return false;
				        }
						success_callback(data);
					  }).
					  error(function(data){
					 	if(data && data.code == 401){
				        	//go to login
				        	storage.remove('access_token');
				        	storage.remove('loggedin');
				        	$state.go('login');
				        	return false;
				        }
						error_callback(data);
					  });
					  
					return {
						cancel: function(){
							console.log('canceled a $http GET request');
							canceler.resolve(); 
						}
					};
						
            },
            
			post: function (endpoint, data, success_callback, error_callback) {
			
                $http({
					method: 'POST',
					url: $rootScope.node_url + endpoint,
					data: OAuth.buildParams(data),
					headers : {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
					}).
					  success(function(data){
						success_callback(data);
					  }).
					  error(function(data){
						error_callback(data);
					  });
						
            },
            
            put: function (endpoint, data, success_callback, error_callback) {
			
                $http({
					method: 'PUT',
					url: $rootScope.node_url + endpoint,
					params: OAuth.buildParams({}),
					data: data
					}).
					  success(function(data){
						success_callback(data);
					  }).
					  error(function(data){
						error_callback(data);
					  });
						
            },
            
            delete: function (endpoint, data, success_callback, error_callback) {
			
                $http({
					method: 'DELETE',
					url: $rootScope.node_url + endpoint,
					params: OAuth.buildParams(data)
					}).
					  success(function(data){
						success_callback(data);
					  }).
					  error(function(data){
						error_callback(data);
					  });
						
            }
            
        };

    };

    factory.$inject = ['OAuth', '$rootScope', '$http', 'storage', '$state', '$q'];
    return factory;
});