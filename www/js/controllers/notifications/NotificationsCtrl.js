/**
 * Minds::mobile
 * Notifications controller
 *
 * @author Mark Harding
 */

define(function() {
	'use strict';

	function ctrl($rootScope, $scope, $state, $ionicScrollDelegate, Cacher, Client, storage, $ionicPopover, $ionicLoading, $ionicModal, $ionicPopup, $timeout, push) {

		$scope.next = "";
		$scope.hasMoreData = true;
		$scope.cachebreaker = Date.now();
		$scope.inprogress = false;
		$scope.notificationItems = [];

		$scope.$on('$ionicView.beforeEnter', function() {
			$rootScope.newNotification = false;
			if ($scope.notificationItems.length > 0) {
				$scope.refresh();
			}
		});

		push.listen('notification', function(params) {
			if ($state.current.name == 'tab.notifications') {
				$rootScope.newNotification = false;
				$scope.refresh();
			}
		});

		/** Load more notifications **/
		$scope.loadMore = function() {
			console.log('==== loading more notifications ====');

			if ($scope.inprogress)
				return false;

			$scope.inprogress = true;

			if (!$scope.hasMoreData) {
				$scope.inprogress = false;
				return;
			}

			Client.get('api/v1/notifications', {
				limit: 12,
				offset: $scope.next,
				cachebreaker: $scope.cachebreaker
			}, function(data) {

				$scope.inprogress = false;

				if (!data.notifications) {
					$scope.hasMoreData = false;
					$scope.$broadcast('scroll.infiniteScrollComplete');
					return false;
				} else {
					$scope.hasMoreData = true;
				};

				$scope.notificationItems = $scope.notificationItems.concat(data.notifications);
				Cacher.put('notification.items', $scope.notificationItems);

				$scope.next = data['load-next'];
				//if(!$scope.next)
				//	$scope.hasMoreData = false;
				Cacher.put('notification.next', $scope.next);

				$scope.$broadcast('scroll.infiniteScrollComplete');

			}, function(error) {
				$scope.inprogress = false;
				$scope.$broadcast('scroll.infiniteScrollComplete');
			});

		};

		$scope.refresh = function() {

			if ($scope.inprogress)
				return false;

			$scope.inprogress = true;

			$rootScope.newNotification = false;
			Client.get('api/v1/notifications', {
				limit: 12,
				offset: '',
				cache_break: Date.now()
			}, function(data) {

				$scope.notificationItems = data.notifications;
				Cacher.put('notification.items', $scope.notificationItems);

				$scope.next = data['load-next'];

				Cacher.put('notification.cachebreaker', Date.now);

				$scope.$broadcast('scroll.refreshComplete');
				$scope.$broadcast('scroll.infiniteScrollComplete');

				$scope.inprogress = false;
				$scope.hasMoreData = true;

			}, function(error) {
				$scope.inprogress = false;
			});

		};

		$scope.subscribe = function(notification) {

			$timeout(function() {
				for (var $i = 0; $i < $scope.notificationItems.length; $i++) {
					if ($scope.notificationItems[$i].fromObj.guid == notification.fromObj.guid) {
						$scope.notificationItems[$i].fromObj.subscribed = true;
					}
				}
			});

			//subscribe to the user
			Client.post('api/v1/subscribe/' + notification.fromObj.guid, {}, function() {

			}, function() {
			});

			//show a quick ui confirmation
			$ionicLoading.show({
				template: '<i class="icon ion-person" style="font-size:90px"></i>'
			});
			$timeout(function() {
				$ionicLoading.hide();
			}, 300);

			if (notification.fromObj.subscriber && notification.fromObj.subscribed) {
				$ionicPopup.alert({
					title: 'Match!',
					subTitle: notification.fromObj.name + ' subscribed to you too!',
					buttons: [{
						text: '<b>Send Message</b>',
						type: 'button-positive',
						onTap: function(e) {
							window.location.href = "#/tab/gatherings/conversations/" + notification.fromObj.guid + '/' + notification.fromObj.name;
						}
					}, {
						text: 'Continue...'
					}]
				});
			}
		};

		$scope.goToChannel = function(guid) {
			$state.go('tab.newsfeed-channel', {
				username: guid
			});
		};

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


	ctrl.$inject = ['$rootScope', '$scope', '$state', '$ionicScrollDelegate', 'Cacher', 'Client', 'storage', '$ionicPopover', '$ionicLoading', '$ionicModal', '$ionicPopup', '$timeout', 'push'];
	return ctrl;

});
