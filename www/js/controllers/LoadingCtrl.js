/**
 * Minds::mobile
 * Login controller
 * 
 * @author Mark Harding
 */

define(function() {
	'use strict';

	function ctrl($scope, $state, OAuth, $ionicPopup, storage, $timeout) {
	
		$timeout(function(){
			if(storage.get('access_token') && storage.get('loggedin')){
				$state.go('tab.newsfeed');
			} else {
				$state.go('login');
			}
		}, 1000);

	}


	ctrl.$inject = ['$scope', '$state', 'OAuth', '$ionicPopup', 'storage', '$timeout'];
	return ctrl;

}); 