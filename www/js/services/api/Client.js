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

    var factory = function (OAuth, $rootScope, $http) {

        return {
        
            get: function (endpoint, options, success_callback, error_callback) {
            
				$http({
					method: 'GET',
					url: $rootScope.node_url + endpoint,
					params: OAuth.buildParams(options),
					cache: true
					}).
				      success(function(data){
						success_callback(data);
					  }).
					  error(function(data){
						error_callback(data);
					  });
						
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
						
            }
            
        };

    };

    factory.$inject = ['OAuth', '$rootScope', '$http'];
    return factory;
});