/**
 * Minds::mobile
 * Analytics service
 *
 * @author Mark Harding
 */

define(['angular'], function(angular) {
    "use strict";

    var factory = function(storage, Client, $ionicPlatform) {

		var init = function() {
			document.addEventListener('resume', function() {
				Client.put('api/v1/analytics/open');
			});
			document.addEventListener('pause', function() {
			});
		};

        return {
            init: init
        };

    };

    factory.$inject = ['storage', 'Client', '$ionicPlatform'];
    return factory;
});
