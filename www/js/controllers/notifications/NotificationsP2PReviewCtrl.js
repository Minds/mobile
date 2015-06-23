/**
 * Minds::mobile
 * Notifications controller
 *
 * @author Mark Harding
 */

define(function() {
	'use strict';

	function ctrl($rootScope, $scope, $stateParams, $ionicScrollDelegate, Cacher, Client, storage, $ionicPopover, $ionicLoading, $ionicActionSheet, $ionicModal) {

		$scope.cb = Date.now();

		$scope.init = function() {
			Client.get('api/v1/boost/p2p', {
				cb: $scope.cb
			}, function(data) {

				$scope.review = data.boosts;

				$scope.$broadcast('scroll.refreshComplete');
				$scope.$broadcast('scroll.infiniteScrollComplete');

			}, function(error) {
				$scope.$broadcast('scroll.refreshComplete');
				$scope.$broadcast('scroll.infiniteScrollComplete');
			});
		};
		$scope.init();

		$scope.refresh = function() {
			$scope.cb = Date.now();
			$scope.init();
		};

		$scope.$on('modal.removed', function() {
			$scope.refresh();
		});

		$scope.loadBoostReview = function(guid) {
			$scope.guid = guid;
			$ionicModal.fromTemplateUrl('templates/wallet/review_boost.html', {
				scope: $scope,
				animation: 'slide-in-up'
			}).then(function(modal) {
				$scope.modal = modal;
				$scope.guid = guid;
				$scope.modal.show();
			});
		};

	}


	ctrl.$inject = ['$rootScope', '$scope', '$stateParams', '$ionicScrollDelegate', 'Cacher', 'Client', 'storage', '$ionicPopover', '$ionicLoading', '$ionicActionSheet', '$ionicModal'];
	return ctrl;

});
