/**
 * Minds::mobile
 * Login controller
 * 
 * @author Mark Harding
 */

define(function() {
	'use strict';

	function ctrl($scope, $state, OAuth, $ionicPopup, storage) {

		if(storage.get('access_token') && storage.get('loggedin'))
			$state.go('tab.newsfeed');
			
			console.log(storage.get('access_token'));
			console.log(storage.get('loggedin'));

		$scope.login = function() {

			
			OAuth.login($scope.username, $scope.password, function(success){
				if(success){
					$state.go('tab.newsfeed');
				} else {
					
					var alertPopup = $ionicPopup.alert({
						title: 'Ooops..',
						template: 'We couldn\'t log you in. Please check your credentials and try again.'
					});
					
					//clear the password?
					alertPopup.then(function(res) {
						
					});

				}
			});
			
		};

	}


	ctrl.$inject = ['$scope', '$state', 'OAuth', '$ionicPopup', 'storage'];
	return ctrl;

}); 