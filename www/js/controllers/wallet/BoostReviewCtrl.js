/**
 * Minds::mobile
 * Boost review controller
 *
 * @author Mark Harding
 */

define(function() {
	'use strict';

	function ctrl($rootScope, $scope, $state, $stateParams, $ionicLoading, $ionicPopup, $timeout, Client) {

		$ionicLoading.show();

		Client.get('api/v1/boost/' + $scope.guid, {
			cb: Date.now()
		}, function(success) {

			if (success.status == 'error') {
				$ionicLoading.hide();
				$scope.modal.remove();
				return;
			}

			$ionicLoading.hide();

			$scope.entity = success.entity;
			$scope.activity = $scope.entity;
			$scope.points = success.points;

		}, function(error) {
			$ionicLoading.hide();
			$scope.modal.remove();
		});

		$scope.accept = function() {

			$scope.modal.remove();
			$scope.refresh();

			Client.put('api/v1/boost/' + $scope.guid, {
				cb: Date.now()
			}, function(success) {

				//	$scope.modal.remove();

			}, function(error) {
				//	$scope.modal.remove();
			});

		};

		$scope.reject = function() {

			$scope.modal.remove();
			$scope.refresh();

			Client.delete('api/v1/boost/' + $scope.guid, {
				cb: Date.now()
			}, function(success) {

				//	$scope.modal.remove();

			}, function(error) {
				//	$scope.modal.remove();
			});

		};

	}


	ctrl.$inject = ['$rootScope', '$scope', '$state', '$stateParams', '$ionicLoading', '$ionicPopup', '$timeout', 'Client'];
	return ctrl;

});
