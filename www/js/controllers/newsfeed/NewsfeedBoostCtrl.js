/**
 * Minds::mobile
 * Newsfeed controller
 *
 * @author Mark Harding
 */

define(function() {
	'use strict';

	function ctrl($rootScope, $scope, $state, $stateParams, $ionicLoading, $ionicPopup, $timeout, Client, $q) {

		$scope.data = {
			destination: '',
			points: null,
			impressions: 0,
			rate: 1,
			step: 1
		};

		$scope.$watch('data.points', function() {
			$scope.data.impressions = Math.round($scope.data.points * $scope.data.rate);
		}, true);

		Client.get('api/v1/boost/rates', {
			cb: Date.now()
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

			if ($scope.data.points === 0 || !$scope.data.points) {
				$scope.data.points = 1;
				$ionicLoading.show({
					template: 'Sorry, you must enter a whole point.'
				});
				$timeout(function() {
					$ionicLoading.hide();
				}, 800);
				return false;
			}

			if ($scope.data.desintation === '' && ($scope.data.impressions === 0 || Math.round($scope.data.impressions) === 0)) {
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
				cb: Date.now()
			}, function(success) {

				$ionicLoading.hide();

				//lets deal with the failures first..
				//not enough points?
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

				//check if the user has enough points
				if (success.count >= $scope.data.points) {

					$ionicLoading.show({
						template: 'Requesting Boost...'
					});

					var endpoint = 'api/v1/boost/newsfeed/' + $scope.guid + '/' + $scope.owner_guid;
					if ($scope.data.destination) {
						endpoint = 'api/v1/boost/channel/' + $scope.guid + '/' + $scope.owner_guid;
					}

					//commence the boost
					Client.post(endpoint, {
						impressions: $scope.data.impressions,
						destination: $scope.data.destination.charAt(0) == '@' ? $scope.data.destination.substr(1) : $scope.data.destination
					}, function(success) {

						if (success.status == 'success') {

							$ionicLoading.hide();
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

					}, function(fail) {

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

		$scope.searching = false;
		$scope.results = [];
		$scope.changeDestination = function(e) {
			$scope.searching = true;
			if ($scope.data.destination.charAt(0) != '@' && $scope.data.destination.length !== 0) {
				$scope.data.destination = '@' + $scope.data.destination;
			}
			if (e.keyCode == 13) {
				$scope.searching = false;
			}

			var query = $scope.data.destination;
			if (query.charAt(0) == '@') {
				query = query.substr(1);
			}

			Client.get('search', {
				q: query,
				type: 'user',
				view: 'json',
				limit: 5
			}, function(success) {
				$scope.results = success.user[0];
			});

			console.log('changing');

			if (!$scope.data.destination) {
				$scope.searching = false;
			}
		};

		$scope.selectDestination = function(user) {
			$scope.searching = false;
			$scope.data.destination = '@' + user.username;
			$scope.nextStep();
		};

		$scope.nextStep = function() {
			$scope.data.step = 2;
		};

		$scope.purchase = function() {
			$state.go('tab.newsfeed-wallet-deposit');
			$scope.modal.remove();
		};

	}


	ctrl.$inject = ['$rootScope', '$scope', '$state', '$stateParams', '$ionicLoading', '$ionicPopup', '$timeout', 'Client', '$q'];
	return ctrl;

});
