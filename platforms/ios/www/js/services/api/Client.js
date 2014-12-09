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
            get: function (endpoint, callback) {
				$http({
					method: 'GET',
					url: $rootScope.node_url + endpoint + '?view=json',
					data: { view: 'json' }
					}).
						success(function(data){
							callback(data);
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