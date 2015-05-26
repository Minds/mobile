/**
 * Minds::mobile
 * Login controller
 *
 * @author Mark Harding
 */

define(function() {
	'use strict';

	function ctrl($scope, $state, OAuth, Client, $ionicPopup, storage, $timeout, push) {

		var timeout = $timeout(function() {
			if (storage.get('access_token') && storage.get('loggedin')) {
				$state.go('tab.newsfeed');
			} else {
				$state.go('login');
			}
		}, 500);
		
		intents.onIntent(function(){
			$timeout.cancel(timeout);
			$state.go('tab.capture');
		});

		/**
		 * Push notification setup
		 */
		push.register();

	}


	ctrl.$inject = ['$scope', '$state', 'OAuth', 'Client', '$ionicPopup', 'storage', '$timeout', 'push'];
	return ctrl;

});
