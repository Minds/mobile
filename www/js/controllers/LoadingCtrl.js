/**
 * Minds::mobile
 * Login controller
 *
 * @author Mark Harding
 */

define(function() {
	'use strict';

	function ctrl($scope, $state, OAuth, Client, $ionicPopup, storage, $timeout, push, $ionicPlatform) {

		navigator.splashscreen.hide();

		var timeout = $timeout(function() {
			if (storage.get('access_token') && storage.get('loggedin')) {
				$state.go('tab.newsfeed');
			} else {
				$state.go('login');
			}
		}, 100);

		intents.onIntent(function() {
			$timeout.cancel(timeout);
			$state.go('tab.capture');

			$ionicPlatform.registerBackButtonAction(function(e) {
				navigator.app.exitApp();
			},501);
		});

		/**
		 * Push notification setup
		 */
		push.register();

	}


	ctrl.$inject = ['$scope', '$state', 'OAuth', 'Client', '$ionicPopup', 'storage', '$timeout', 'push', '$ionicPlatform'];
	return ctrl;

});
