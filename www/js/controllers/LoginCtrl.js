/**
 * Minds::mobile
 * Login controller
 * 
 * @author Mark Harding
 */

define(function() {
	'use strict';

	function ctrl($rootScope, $scope, $state, OAuth, $ionicPopup, storage, push) {
	
		cordova.plugins.Keyboard.disableScroll(true);

		if(storage.get('access_token') && storage.get('loggedin'))
			$state.go('tab.newsfeed');
			
			console.log(storage.get('access_token'));
			console.log(storage.get('loggedin'));

		$scope.inprogress = false;
		$scope.login = function() {
			if($scope.inprogress)
				return false;
			$scope.inprogress = true;
			
			OAuth.login($scope.username, $scope.password, function(success){
				if(success){
					//$state.go('tab.newsfeed');
					push.register();
					$rootScope.user_guid = storage.get('user_guid');
					$state.go('tutorial');
				} else {
					
					var alertPopup = $ionicPopup.alert({
						title: 'Ooops..',
						template: 'We couldn\'t log you in. Please check your credentials and try again.'
					});
					
					//clear the password?
					alertPopup.then(function(res) {
						
					});

				}
				$scope.inprogress = false;
			}, function(error){
				$scope.inprogress = false;
			});
			
		};

	}


	ctrl.$inject = ['$rootScope', '$scope', '$state', 'OAuth', '$ionicPopup', 'storage', 'push'];
	return ctrl;

}); 