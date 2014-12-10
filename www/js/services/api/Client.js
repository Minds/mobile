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
            get: function (endpoint, success_callback, error_callback) {
				$http({
					method: 'GET',
					url: $rootScope.node_url + endpoint,
					params: OAuth.buildParams({ limit:1 })
					}).
						success(function(data){
							success_callback(data);
						}).
						error(function(data){
							error_callback(data);
						});
            },
           post: function (guid) {
                return 'post req';
            }
        };

    };

    factory.$inject = ['OAuth', '$rootScope', '$http'];
    return factory;
});