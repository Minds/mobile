/**
 * Minds::mobile
 * Chat controller
 *
 * @author Mark Harding
 */

define(function() {
	'use strict';

	function ctrl($scope, $state, Client, $ionicPopup, storage) {

		$scope.configured = false;
		$scope.data = {};

		setTimeout(function() {
			Client.get('api/v1/channel/me', {}, function(me) {
				if (me.channel.chat) {
					$scope.configured = true;
				}
			});
		}, 10);

		$scope.unlock = function(password) {

			Client.get('api/v1/keys', {
				password: $scope.data.password,
				new_password: 'abc123'
			}, function(data) {
				if (data.key) {
					storage.set('private-key', data.key);
					$state.go('tab.chat');
				} else {
					$ionicPopup.alert({
						title: 'Ooops..',
						template: 'We couldn\'t unlock your chat. Please check your password is correct.'
					});
				}
			}, function(error) {
			});

		};

		$scope.setup = function() {

			if (!$scope.data.password) {
				$ionicPopup.alert({
					title: 'Ooops..',
					template: 'You must enter a password.'
				});
				return true;
			}
			if ($scope.data.password != $scope.data.password2) {
				$ionicPopup.alert({
					title: 'Ooops..',
					template: 'Your passwords must match.'
				});
				return false;
			}

			Client.post('api/v1/keys/setup', {
				password: $scope.data.password
			}, function(data) {
				if (data.key) {
					storage.set('private-key', data.key);
					$state.go('tab.chat');
				} else {
					$ionicPopup.alert({
						title: 'Ooops..',
						template: 'We couldn\'t unlock your chat. Please check your password is correct.'
					});
				}
			}, function(error) {
			});

		};

	}


	ctrl.$inject = ['$scope', '$state', 'Client', '$ionicPopup', 'storage'];
	return ctrl;

});
