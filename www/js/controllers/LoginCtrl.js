/**
 * Minds::mobile
 * Login controller
 *
 * @author Mark Harding
 */

define(function() {
	'use strict';

	function ctrl($rootScope, $scope, $state, OAuth, Client, $ionicPopup, storage, push, $ionicLoading) {

		cordova.plugins.Keyboard.disableScroll(true);

		if (storage.get('access_token') && storage.get('loggedin'))
			$state.go('tab.newsfeed');

		console.log(storage.get('access_token'));
		console.log(storage.get('loggedin'));

		$scope.inprogress = false;
		$scope.login = function() {
			if ($scope.inprogress)
				return false;

			$ionicLoading.show({
				template: '<ion-spinner></ion-spinner>'
			});

			$scope.inprogress = true;

			OAuth.login($scope.username, $scope.password, function(success) {
				$ionicLoading.hide();
				if (success) {
					//$state.go('tab.newsfeed');
					push.register();
					$rootScope.user_guid = storage.get('user_guid');

					//get our city and other information
					Client.get('api/v1/channel/me', {}, function(success) {
						storage.set('city', success.channel.city);
						//	storage.set('coordinates', success.channel.coordinates);
					}, function(fail) {
					});

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
			}, function(error) {
				$ionicLoading.hide();
				$scope.inprogress = false;
			});

		};

	}


	ctrl.$inject = ['$rootScope', '$scope', '$state', 'OAuth', 'Client', '$ionicPopup', 'storage', 'push', '$ionicLoading'];
	return ctrl;

});
