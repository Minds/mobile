/**
 * Minds::mobile
 * Wallet service
 *
 * @author Mark Harding
 */

define(['angular'], function(angular) {
    "use strict";

    var factory = function($rootScope, Client) {
		var points = 0;
		return {
            getCount: function() {
				Client.get('api/v1/wallet/count', { cb: Date.now() },
					function(data) {
						points = data.count;
						$rootScope.points = points;
					}, function() {});
			},
            increase: function() {
				points = points + 1;
				$rootScope.points = points;
            }
        };

    };

    factory.$inject = ['$rootScope', 'Client'];
    return factory;
});
