/**
 * Minds::mobile
 * Login controller
 * 
 * @author Mark Harding
 */

define(function() {
	'use strict';

	function ctrl($scope, $state, OAuth, Client, $ionicPopup, storage, $timeout, push) {
	
		$timeout(function(){
			if(storage.get('access_token') && storage.get('loggedin')){
				$state.go('tab.newsfeed');
			} else {
				$state.go('login');
			}
		}, 1000);

		/**
		 * Push notification setup
		 */
		push.register();

	}


	ctrl.$inject = ['$scope', '$state', 'OAuth', 'Client', '$ionicPopup', 'storage', '$timeout', 'push'];
	return ctrl;

}); 