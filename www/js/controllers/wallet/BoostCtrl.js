/**
 * Minds::mobile
 * Suggested boost controller
 *
 * @author Mark Harding
 */

define(function() {
	'use strict';

	function ctrl($rootScope, $scope, $state, $stateParams, $ionicLoading, $ionicPopup, $timeout, Client, $q) {

		$scope.data = {
			points: null,
			impressions: 0 * 1,
			rate: 1
		};

		$scope.$watch('data.points', function() {
			$scope.data.impressions = $scope.data.points * $scope.data.rate;
		}, true);

		Client.get('api/v1/boost/rates', {
			cb: Date.now(),
			referrer: 'discovery'
		}, function(success) {
			$scope.data.rate = success.rate;
		});

		$scope.boost = function() {

			if ($scope.data.points % 1 !== 0) {
				$scope.data.points = Math.round($scope.data.points);
				$ionicLoading.show({
					template: 'Sorry, you must enter a whole point.'
				});
				$timeout(function() {
					$ionicLoading.hide();
				}, 800);
				return false;
			}

			if ($scope.data.points === 0) {
				$scope.data.points = 1;
				$ionicLoading.show({
					template: 'Sorry, you must enter a whole point.'
				});
				$timeout(function() {
					$ionicLoading.hide();
				}, 800);
				return false;
			}

			if ($scope.data.impressions === 0 || Math.round($scope.data.impressions) === 0) {
				$ionicLoading.show({
					template: 'Sorry, you must have at least 1 impression.'
				});
				$timeout(function() {
					$ionicLoading.hide();
				}, 800);
				return false;
			}

			$ionicLoading.show({
				template: 'Please wait a moment.'
			});

			var deferred = $q.defer();

			//validate our points
			Client.get('api/v1/wallet/count', {
				cb: Date.now(),
				referrer: 'discovery'
			}, function(success) {
				$ionicLoading.hide();

				if (success.count < $scope.data.points) {

					$ionicPopup.alert({
							title: 'Ooops!',
							subTitle: 'You don\;t have enough points',
							buttons: [{
								text: '<b>Buy points</b>',
								type: 'button-positive',
								onTap: function(e) {
									$state.go('tab.newsfeed-wallet-deposit');
									$scope.modal.remove();
								}
							}, {
								text: 'Close.'
							}]
						});

					return deferred.resolve(false);
				}

				//over the cap?
				if ($scope.data.points > success.cap) {
					$ionicPopup.alert({
						title: 'Ooops!',
						subTitle: 'Sorry, there is a limit on how many points can be spent. ',
						buttons: [{
							text: '<b>Lower rate</b>',
							type: 'button-positive',
							onTap: function(e) {
								$scope.data.points = success.cap - 1;
							}
						}, {
							text: 'Close.'
						}]
					});

					return deferred.resolve(false);
				}

				//under the min?
				if ($scope.data.points < success.min) {
					$ionicPopup.alert({
						title: 'Ooops!',
						subTitle: 'Sorry, you need to enter at least ' + success.min + ' points',
						buttons: [{
							text: '<b>Increase?</b>',
							type: 'button-positive',
							onTap: function(e) {
								$scope.data.points = success.min;
							}
						}, {
							text: 'Close.'
						}]
					});

					return deferred.resolve(false);
				}

				if (success.count >= $scope.data.points) {

					$ionicLoading.show({
						template: 'Requesting Boost...'
					});

					//commence the boost
					Client.post('api/v1/boost/' + $scope.type + '/' + $scope.entity.guid + '/' + $scope.entity.owner_guid, {
						impressions: $scope.data.impressions
					}, function(success) {
						$ionicLoading.hide();
						if (success.status == 'success') {
							$scope.modal.remove();
							$ionicLoading.show({
								template: 'Boost request submitted.'
							});
							$timeout(function() {
								$ionicLoading.hide();
							}, 500);
							return deferred.resolve(true);
						} else {
							$ionicLoading.hide();
							$ionicLoading.show({
								template: 'Sorry, something went wrong.'
							});
							$timeout(function() {
								$ionicLoading.hide();
							}, 500);

							return deferred.resolve(false);
						}
					}, function(error) {
						$ionicLoading.hide();
						$ionicLoading.show({
							template: 'Sorry, something went wrong.'
						});
						$timeout(function() {
							$ionicLoading.hide();
						}, 500);

						return deferred.resolve(false);
					});
				}

			}, function(error) {
				return deferred.resolve(false);
			});

			return deferred.promise;
		};

	}


	ctrl.$inject = ['$rootScope', '$scope', '$state', '$stateParams', '$ionicLoading', '$ionicPopup', '$timeout', 'Client', '$q'];
	return ctrl;

});
