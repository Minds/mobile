/**
 * Minds::mobile
 * Channel Controller
 *
 * @author Mark Harding
 */

define(function() {
	'use strict';

	function ctrl($rootScope, $scope, $state, $stateParams, Client, $ionicSlideBoxDelegate, $ionicScrollDelegate, $interval, $timeout, storage) {

		if ($stateParams.username === undefined) {
			$state.go('tab.newsfeed');
			return false;
		}

		$scope.loaded = false;
		$scope.next = "";
		$scope.ChannelItems = [];
		var interval;

		$scope.cb = Date.now();
		var statelistener = $rootScope.$on('$stateChangeSuccess', function(event, to, toParams, from, fromParams) {
			if (from.name == 'tab.newsfeed-channel-edit') {
				$scope.cb = Date.now();
				$scope.init();
			}

			if (from.name == 'tab.newsfeed-channel') {
				if (interval)
					$interval.cancel(interval);
			}

			//$scope.cb = Date.now();
			//$scope.init();
		});

		$scope.$on("$destroy", function() {
			if (interval)
				$interval.cancel(interval);
			statelistener();
		});

		$scope.init = function() {
			console.log('init called');
			Client.get('api/v1/channel/' + $stateParams.username, {
				cb: $scope.cb
			}, function(success) {

				if (success.status == 'error') {
					$state.go('tab.newsfeed');
					return true;
				}

				$scope.channel = success.channel;
				//$scope.$apply();

				if ($rootScope.guid == $scope.channel.guid) {
					storage.set('city', $scope.channel.city);
					storage.set('coordinates', $scope.channel.coordinates);
				}

				if ($scope.ChannelItems.length === 0) {
					//run on next digest
					$timeout(function() {
						$scope.loadMore();
					});
				}

				if (success.channel.carousels) {
					$ionicSlideBoxDelegate.update();
					interval = $interval(function() {
						$ionicSlideBoxDelegate.$getByHandle('channel-banners').slide(0);
					}, 3000 * success.channel.carousels.length);
				}

			}, function(error) {
			});
		};
		$scope.init();

		/*setInterval(function(){
		 var top = $ionicScrollDelegate.getScrollPosition().top;
		 if(top > 10){
		 $scope.carousel_class = "blur";
		 } else {
		 $scope.carousel_class = "not-blurred";
		 }
		 $scope.$apply();
		 }, 100);*/

		$scope.loadMore = function() {
			if (!$scope.channel) {
				return false;
			}
			console.log('getting a users feed');
			Client.get('api/v1/newsfeed/personal/' + $scope.channel.guid, {
				limit: 6,
				offset: $scope.next,
				cb: Date.now()
			}, function(data) {
				$scope.loaded = true;

				if (!data.activity) {
					console.log('users feed not found');
					$scope.$broadcast('scroll.refreshComplete');
					$scope.hasMoreData = false;
					return false;
				} else {
					console.log('found users feed, loading it');
					$scope.hasMoreData = true;
				};

				$scope.ChannelItems = $scope.ChannelItems.concat(data.activity);

				$scope.next = data['load-next'];

				$scope.$broadcast('scroll.infiniteScrollComplete');
				$scope.$broadcast('scroll.refreshComplete');

			}, function(error) {
				$scope.$broadcast('scroll.infiniteScrollComplete');
				$scope.$broadcast('scroll.refreshComplete');
			});
		};

		$scope.channelRefresh = function() {
			if (!$scope.channel) {
				return false;
			}
			$scope.next = "";
			$scope.loadMore();
		};

		$scope.subscribe = function(channel) {

			$scope.channel.subscribed = true;
			$scope.channel.subscribers_count = $scope.channel.subscribers_count + 1;
			Client.post('api/v1/subscribe/' + channel.guid, {}, function() {
			}, function() {
				$scope.channel.subscribed = false;
				$scope.channel.subscribers_count = $scope.channel.subscribers_count - 1;
			});

		};

		$scope.unSubscribe = function(channel) {

			$scope.channel.subscribed = false;
			$scope.channel.subscribers_count = $scope.channel.subscribers_count - 1;
			Client.delete('api/v1/subscribe/' + channel.guid, {}, function() {
			}, function() {
				$scope.channel.subscribed = true;
				$scope.channel.subscribers_count = $scope.channel.subscribers_count + 1;
			});

		};

	}


	ctrl.$inject = ['$rootScope', '$scope', '$state', '$stateParams', 'Client', '$ionicSlideBoxDelegate', '$ionicScrollDelegate', '$interval', '$timeout', 'storage'];
	return ctrl;

});
