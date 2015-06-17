/**
 * Minds::mobile
 * Discover
 *
 * @author Mark Harding
 */

define(function() {
	'use strict';

	function ctrl($scope, $stateParams, Client, Cacher, $ionicPopup, $ionicScrollDelegate, $ionicLoading, $ionicModal, $ionicActionSheet, $timeout, $q, storage) {
		var search_timeout, timeout, request, search_request;

		$scope.entities = [];
		if (Cacher.get('entities.next')) {
			$scope.next = Cacher.get('entities.next');
		} else {
			$scope.next = "";
		}
		$scope.query = {
			string: ""
		};
		$scope.passed = [];
		//we keep this so that on loading new items, there are not conflicts.
		$scope.acted = [];
		$scope.offset = 0;

		$scope.city = storage.get('city');
		if ($scope.city)
			$scope.nearby = true;
		else
			$scope.nearby = false;

		//assume nearby data...
		$scope.hasNearby = true;

		$scope.location = {
			distance: {
				name: '25 miles',
				miles: 25
			}
		};

		$scope.hasMoreData = true;
		if (Cacher.get('entities.cb')) {
			$scope.cachebreaker = Cacher.get('entities.cb');
		} else {
			$scope.cachebreaker = Date.now();
		}
		$scope.filter = 'suggested';
		$scope.type = 'channel';
		$scope.view = 'list';
		$scope.infinite = true;

		$scope.setNearby = function(value) {
			$scope.nearby = value;
			$scope.cachebreaker = Date.now();
			$scope.entities = [];
			$scope.load();
		};

		$scope.distanceChanged = function() {
			$scope.nearby = true;
			$scope.entities = [];
			$scope.load();
		};

		$scope.changeFilter = function(filter) {
			if (filter == 'suggested') {
				$scope.view = 'swipe';
				$scope.infinite = false;
				//Cacher.put('entities.cb', Date.now());
				$scope.cachebreaker = Date.now();
			} else {
				$scope.view = 'list';
			}
			$scope.query.string = '';
			$scope.filter = filter;
			$scope.entities = [];
			$scope.passed = [];
			$scope.next = "";
			$ionicScrollDelegate.scrollTop();
			$scope.load();
		};

		$scope.changeType = function(type) {
			if ($scope.filter == 'search') {
				$scope.type = type;
				$scope.search();
				return true;
			}
			$scope.query.string = '';
			$scope.type = type;
			$scope.entities = [];
			$scope.next = "";
			$ionicScrollDelegate.scrollTop();
			$scope.load();
		};

		$scope.load = function() {
			console.log('load triggered');
			$timeout.cancel(timeout);
			if (request)
				request.cancel();
			//cancel previous requests..
			if (search_request)
				search_request.cancel();

			if ($scope.filter == 'search') {
				$scope.search();
				return;
			}

			timeout = $timeout(function() {

				var subtype,
					type;

				if ($scope.type != 'channel') {
					subtype = $scope.type;
					type = 'object';
				} else {
					subtype = '';
					type = 'user';
				}
				console.log('loading entities...');

				request = Client.get('api/v1/entities/' + $scope.filter + '/' + type + '/' + subtype, {
					limit: 16,
					offset: $scope.next,
					cachebreaker: $scope.cachebreaker,
					skip: $scope.offset,
					coordinates: storage.get('coordinates') ? storage.get('coordinates') : false,
					nearby: $scope.nearby,
					distance: $scope.location.distance.miles
				}, function(data) {

					if (!data.entities || data.entities.length === 0) {
						//no one nearby? load normal suggested
						if ($scope.nearby) {
							$scope.nearby = false;
							$scope.hasNearby = false;
							$scope.cachebreaker = Date.now();
							$scope.load();
						}
						$scope.hasMoreData = false;
						return false;
					} else {
						$scope.hasMoreData = true;
					}

					if ($scope.entities.length === 0) {
						$scope.entities = data.entities;
					} else {
						$scope.entities = $scope.entities.concat(data.entities);
					}

					$scope.next = data['load-next'];

					if ($scope.filter == 'suggested') {
						$scope.cachebreaker = Date.now();
					} else if ($scope.filter == 'trending') {
						$scope.next = $scope.entities.length;
					}
					$scope.$broadcast('scroll.infiniteScrollComplete');

				}, function(error) {
				});
			}, 600);
		};
		$scope.load();

		$scope.refresh = function() {
			$scope.next = "";

			var subtype,
				type;

			if ($scope.type != 'channel') {
				subtype = $scope.type;
				type = 'object';
			} else {
				subtype = '';
				type = 'user';
			}

			Cacher.put('entities.cb', Date.now());

			Client.get('api/v1/entities/' + $scope.filter, {
				type: type,
				subtype: subtype,
				limit: 24,
				offset: $scope.next,
				cachebreaker: Date.now()
			}, function(data) {

				$scope.entities = data.entities;
				Cacher.put('entities.data', $scope.entities);

				$scope.next = data['load-next'];
				//Cacher.put('entities.next', $scope.next);

				$scope.$broadcast('scroll.infiniteScrollComplete');
			}, function(error) {
			});
		};

		$scope.search = function() {
			$timeout.cancel(search_timeout);
			$timeout.cancel(timeout);

			if (search_request)
				search_request.cancel();
			if (request)
				request.cancel();

			$scope.next = "";
			$scope.filter = 'search';

			var subtype,
				type;

			if ($scope.type != 'channel') {
				subtype = $scope.type;
				type = 'object';
			} else {
				subtype = '';
				type = 'user';
			}

			search_timeout = $timeout(function() {

				if ($scope.query.string.length > 2) {
					$scope.entities = [];

					search_request = Client.get('search', {
						type: type,
						subtype: subtype,
						q: $scope.query.string,
						limit: 24,
						offset: $scope.next,
						cachebreaker: Date.now(),
						view: 'json'
					}, function(data) {

						$ionicScrollDelegate.scrollTop();

						if (type == 'user') {
							$scope.entities = data[type][0];
							console.log($scope.entities);
						} else {
							$scope.entities = data[type][subtype];
						}

						Cacher.put('entities.data', $scope.entities);

						$scope.next = data['load-next'];
						//Cacher.put('entities.next', $scope.next);

						$scope.$broadcast('scroll.infiniteScrollComplete');
					}, function(error) {
					});
				}
			}, 600);

		};

		$scope.pop = function(entity) {

			$scope.entities.forEach(function(item, index, array) {
				if (item.guid == entity.guid) {
					array.splice(index, 1);
					$scope.passed.push(entity);
				}
			});

			if ($scope.entities.length < 3) {
				console.log('loading new...');
				Cacher.put('entities.cb', Date.now());
				$scope.offset = 3;
				$scope.load();
			}

			//$scope.$digest();
		};

		/**
		 * User specific actions
		 */
		$scope.ignore = function(entity) {
			//remove the entity from the list
			$scope.pop(entity);

			//notify the suggested that we have decided to ignore
			Client.post('api/v1/entities/suggested/pass/' + entity.guid, {}, function() {
			}, function() {
			});
			$scope.acted(entity);

			//show a quick ui confirmation
			$ionicLoading.show({
				template: '<i class="icon ion-close" style="font-size:90px"></i>'
			});
			$timeout(function() {
				$ionicLoading.hide();
			}, 300);
		};
		$scope.subscribe = function(entity) {
			//remove the entity from the list
			if ($scope.filter != 'search') {
				$scope.pop(entity);
			}
			console.log('api/v1/subscribe/' + entity.guid);

			if (entity.subscribed) {
				//unsubscribe
				Client.delete('api/v1/subscribe/' + entity.guid, {}, function() {
				}, function() {
				});
				entity.subscribed = false;
			} else {
				Client.post('api/v1/subscribe/' + entity.guid, {}, function() {
				}, function() {
				});
				entity.subscribed = true;
			}

			//update the ui
			$scope.entities.forEach(function(item, index, array) {
				if (item.guid == entity.guid) {
					if (entity.subscribed) {
						array[index].subscribed = false;
					} else {
						array[index].subscribed = true;
					}
				}
			});

			$scope.acted(entity);

			//show a quick ui confirmation
			$ionicLoading.show({
				template: '<i class="icon ion-person" style="font-size:90px"></i>'
			});
			$timeout(function() {
				$ionicLoading.hide();
			}, 300);

			if (entity.subscriber && entity.subscribed) {
				$ionicPopup.alert({
					title: 'Match!',
					subTitle: entity.name + ' subscribed to you too!',
					buttons: [{
						text: '<b>Send Message</b>',
						type: 'button-positive',
						onTap: function(e) {
							window.location.href = "#/tab/gatherings/conversations/" + entity.guid + '/' + entity.name;
						}
					}, {
						text: 'Continue...'
					}]
				});
			}
		};

		/**
		 * Object specific actions
		 */
		$scope.pass = function(entity) {
			//remove the entity from the list
			$scope.pop(entity);

			//notify the suggested that we have decided to ignore
			Client.post('api/v1/entities/suggested/pass/' + entity.guid, {}, function() {
			}, function() {
			});
			$scope.acted(entity);

			//show a quick ui confirmation
			$ionicLoading.show({
				template: '<i class="icon" style="font-size:48px">pass</i>'
			});
			$timeout(function() {
				$ionicLoading.hide();
			}, 300);

			$scope.cachebreaker = Date.now();
		};

		$scope.down = function(entity) {
			//remove the entity from the list
			$scope.pop(entity);

			Client.put('api/v1/thumbs/' + entity.guid + '/down', {}, function(success) {
			}, function(error) {
			});
			$scope.acted(entity);

			$ionicLoading.show({
				template: '<i class="icon ion-thumbsdown" style="font-size:90px"></i>'
			});
			$timeout(function() {
				$ionicLoading.hide();
			}, 300);

			$scope.cachebreaker = Date.now();
		};

		$scope.up = function(entity) {
			//remove the entity from the list
			$scope.pop(entity);

			Client.put('api/v1/thumbs/' + entity.guid + '/up', {}, function(success) {
			}, function(error) {
			});

			$scope.acted(entity);

			$ionicLoading.show({
				template: '<i class="icon ion-thumbsup" style="font-size:90px"></i>'
			});
			$timeout(function() {
				$ionicLoading.hide();
			}, 300);

			$scope.cachebreaker = Date.now();
		};

		$scope.boost = function(entity) {
			$ionicModal.fromTemplateUrl('templates/wallet/boost.html', {
				scope: $scope,
				animation: 'slide-in-up'
			}).then(function(modal) {
				$scope.modal = modal;
				$scope.type = 'suggested';
				$scope.entity = entity;
				$scope.modal.show();
			});

		};

		$scope.acted = function(entity) {
			if (entity.boosted) {
				Client.post('api/v1/entities/suggested/acted/' + entity.guid, {}, function(success) {
				}, function(error) {
				});
			}
		};

		$scope.openActions = function(entity) {
			$ionicActionSheet.show({
				buttons: [{
					text: '<b>Share</b>'
				}, {
					text: 'Report this'
				}],
				cancelText: 'Cancel',
				cancel: function() {
					// add cancel code..
				},
				buttonClicked: function(index) {
					switch (index) {

					case 0:
						//cordova.plugins.clipboard.copy($rootScope.node_url + '/newsfeed/' + guid);
						$ionicLoading.show({
							template: '<p> Copied to clipboard </p>'
						});
						$timeout(function() {
							$ionicLoading.hide();
						}, 1000);
						break;
					case 1:
						window.location.href = "mailto:report@minds.com?subject=Report " + entity.guid + "&body=This content violates the terms and conditions";
					}
					return true;
				}
			});

		};

	}


	ctrl.$inject = ['$scope', '$stateParams', 'Client', 'Cacher', '$ionicPopup', '$ionicScrollDelegate', '$ionicLoading', '$ionicModal', '$ionicActionSheet', '$timeout', '$q', 'storage'];
	return ctrl;

});
