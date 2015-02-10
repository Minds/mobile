/**
 * Minds::mobile
 * Login controller
 * 
 * @author Mark Harding
 */

define(function() {
	'use strict';

	function ctrl($rootScope, $scope, $state, OAuth, Client, $ionicPopup, storage, push) {
	
		$scope.data = {};

		$scope.inprogress = false;
		$scope.register = function() {
			if($scope.inprogress)
				return false;
			$scope.inprogress = true;
			
			Client.post('api/v1/register', {
				username: $scope.data.username,
				password: $scope.data.password,
				email: $scope.data.email
				}, function(success){
					
					if(success.status == 'error'){
						$scope.inprogress = false;
						
						var alertPopup = $ionicPopup.alert({
							title: 'Ooops..',
							template: success.message
						});
						
						return false;
					}
					
					OAuth.login($scope.data.username, $scope.data.password, function(success){
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
			}, function(error){
				$scope.inprogress = false;
				var alertPopup = $ionicPopup.alert({
					title: 'Ooops..',
					template: 'Something went wrong.. Try again later.'
				});
			});
			
		};

	}


	ctrl.$inject = ['$rootScope', '$scope', '$state', 'OAuth', 'Client', '$ionicPopup', 'storage', 'push'];
	return ctrl;

}); 