/**
 * Minds::mobile
 * Newsfeed controller
 *
 * @author Mark Harding
 */

define(function() {
	'use strict';

	function ctrl($rootScope, $scope, $state, $stateParams, NewsfeedAPI, $filter, $ionicScrollDelegate,
	Cacher, Client, storage, $ionicPopover, $ionicLoading, $timeout, $ionicActionSheet, $ionicModal, $ionicPlatform) {

		//if same tab click, refresh and go to top
		var statelistener = $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
			if (toState.name == fromState.name) {
				$ionicScrollDelegate.scrollTop();
				$scope.refresh();
			}
			//if (toState.name == 'tab.newsfeed') {}
		});

		$scope.$on("$destroy", function() {
			statelistener();
		});

		if ($state.current.name == 'tab.newsfeed') {
			$rootScope.$on('newsfeed:updated', function() {
				$ionicScrollDelegate.scrollTop();
				$scope.refresh();
			});

			$rootScope.$on('newsfeed:boost', function($event, v2) {
				$event.stopPropagation();
				if (v2) {
					$scope.boost({
						guid: v2,
						owner_guid: $rootScope.user_guid
					});
				}
			});

		}

		$rootScope.newsfeedItems = [];
		$scope.newsfeedItems = [];
		$scope.next = "";

		$scope.hasMoreData = true;
		$scope.cachebreaker = 0;

		/**
		 * Load more posts
		 */
		$scope.loadMore = function() {

			$timeout(function() {
				console.log('==== loading more ====');

				if (!$scope.hasMoreData) {
					console.log('==== canceling no more data ====');
					$scope.$broadcast('scroll.infiniteScrollComplete');
					return;
				}

				NewsfeedAPI.all({
					limit: 12,
					offset: $scope.next,
					//thumb_guids: false,
					cachebreaker: $scope.cachebreaker
				}, function(data) {

					if (!data.activity) {
						$scope.hasMoreData = false;
						$scope.$broadcast('scroll.infiniteScrollComplete');
						return false;
					}

					if ($scope.newsfeedItems.length > 60) {
						$ionicScrollDelegate.scrollTop();
						$scope.newsfeedItems = data.activity;
					} else {
						for (var i in data.activity) {
							$scope.newsfeedItems.push(data.activity[i]);
						}
						//$scope.newsfeedItems.concat(data.activity);
					}

					$scope.next = data['load-next'];
					console.log("next is:: " + $scope.next);

					$scope.$broadcast('scroll.infiniteScrollComplete');
					$scope.hasMoreData = true;

				}, function(error) {
					$scope.hasMoreData = false;
					$scope.$broadcast('scroll.infiniteScrollComplete');
				});
			});

		};
		$scope.hasMore = function() {
			return true;
		};

		$scope.refresh = function() {
			console.log("=== refreshing ===");
			$scope.hasMoreData = true;
			//

			//for(var i in $scope.newsfeedItems){
			//	$scope.newsfeedItems.shift();
			//}

			NewsfeedAPI.all({
				limit: 12,
				offset: '',
				//thumb_guids: false,
				cache_break: Date.now()
			}, function(data) {

				$scope.newsfeedItems = data.activity;
				//	Cacher.put('newsfeed.items', $scope.newsfeedItems );

				$scope.next = data['load-next'];

				$scope.cachebreaker = Date.now();
				Cacher.put('newsfeed.cachebreaker', Date.now());

				$scope.$broadcast('scroll.infiniteScrollComplete');
				$scope.$broadcast('scroll.refreshComplete');

			}, function(error) {
				$scope.$broadcast('scroll.infiniteScrollComplete');
				$scope.$broadcast('scroll.refreshComplete');
			});

		};

		/**************************
		 **** Newsfeed actions ****
		 *************************/
		/**
		 * Thumb up an activity
		 */
		$scope.thumbsUp = function(guid) {
			//increment count
			$rootScope.points = $rootScope.points + 1;

			if ($scope.ChannelItems)
				$scope.newsfeedItems = $scope.ChannelItems;

			if ($scope.activity)
				$scope.newsfeedItems[0] = $scope.activity;

			$scope.newsfeedItems.forEach(function(item, index, array) {
				if (item.guid == guid) {
					if (!array[index].hasOwnProperty('thumbs:up:user_guids') || !array[index]['thumbs:up:user_guids'])
						array[index]['thumbs:up:user_guids'] = [];

					for (var key in array[index]['thumbs:up:user_guids']) {
						if (array[index]['thumbs:up:user_guids'][key] === storage.get('user_guid')) {
							delete array[index]['thumbs:up:user_guids'][key];
							array[index]['thumbs:up:count'] = array[index]['thumbs:up:count'] - 1;
							//remove count
							$rootScope.points = $rootScope.points - 2;
							return true;
						}
					}

					array[index]['thumbs:up:user_guids'][1] = storage.get('user_guid');
					array[index]['thumbs:up:count'] = array[index]['thumbs:up:count'] + 1;

				}
			});

			Client.put('api/v1/thumbs/' + guid + '/up', {}, function(success) {

			}, function(error) {
				alert('failed..');
			});

			$ionicLoading.show({
				template: '<i class="icon ion-thumbsup" style="font-size:90px"></i>'
			});
			$timeout(function() {
				$ionicLoading.hide();
			}, 1000);
		};

		/**
		 * Thumb down an activity
		 */
		$scope.thumbsDown = function(guid) {
			//increment count
			$rootScope.points = $rootScope.points + 1;

			if ($scope.ChannelItems)
				$scope.newsfeedItems = $scope.ChannelItems;

			if ($scope.activity)
				$scope.newsfeedItems[0] = $scope.activity;

			$scope.newsfeedItems.forEach(function(item, index, array) {
				if (item.guid == guid) {
					if (!array[index].hasOwnProperty('thumbs:down:user_guids') || !array[index]['thumbs:down:user_guids'])
						array[index]['thumbs:down:user_guids'] = [];

					for (var key in array[index]['thumbs:down:user_guids']) {
						if (array[index]['thumbs:down:user_guids'][key] === storage.get('user_guid')) {
							delete array[index]['thumbs:down:user_guids'][key];
							array[index]['thumbs:down:count'] = array[index]['thumbs:down:count'] - 1;
							//remove count
							$rootScope.points = $rootScope.points - 2;
							return true;
						}
					}

					array[index]['thumbs:down:user_guids'][1] = storage.get('user_guid');
					array[index]['thumbs:down:count'] = array[index]['thumbs:down:count'] + 1;

				}
			});

			Client.put('api/v1/thumbs/' + guid + '/down', {}, function(success) {

			}, function(error) {
				alert('failed..');
			});

			$ionicLoading.show({
				template: '<i class="icon ion-thumbsdown" style="font-size:90px"></i>'
			});
			$timeout(function() {
				$ionicLoading.hide();
			}, 1000);
		};

		/**
		 * Load comments
		 */
		$scope.commentsData = {};
		$scope.loadComments = function(activity, $event) {
			$scope.comments.show($event);
			$scope.commentsData = {};

			var guid;
			if (activity.entity_guid) {
				guid = activity.entity_guid;
			} else {
				guid = activity.guid;
			}

			/**
			 * Now load the comments
			 */
			Client.get('api/v1/comments/' + guid, {
				cachebreaker: Date.now
			}, function(success) {
				console.log('success for ' + guid);
				console.log(success);
				$scope.commentsData = success.comments;
			}, function(error) {
				console.log('error');
			});

		};
		/*$ionicPopover.fromTemplateUrl('templates/comments/list.html', {
		scope: $scope,
		}).then(function(popover) {
		$scope.comments = popover;
		});*/

		/**
		 * Remind an activity
		 */
		$scope.remind = function(activity, $event) {

			Client.post('api/v1/newsfeed/remind/' + activity.guid, {}, function(success) {

			}, function(error) {
				alert('failed..');
			});

			/**
			 * @todo improve this way of updating!
			 */
			$scope.newsfeedItems.forEach(function(item, index, array) {
				if (item.guid == activity.guid) {
					array[index].reminds = array[index].reminds + 1;
				}
			});
			if ($scope.ChannelItems) {
				$scope.ChannelItems.forEach(function(item, index, array) {
					if (item.guid == activity.guid) {
						array[index].reminds = array[index].reminds + 1;
					}
				});
			}

			if ($scope.activity) {
				$scope.activity.reminds = $scope.activity.reminds + 1;
			}

			//increment count
			$rootScope.points = $rootScope.points + 1;

			$ionicLoading.show({
				template: '<i class="icon icon-remind" style="line-height:100px; vertical-align:middle; font-size:90px"></i>'
			});
			$timeout(function() {
				$ionicLoading.hide();
			}, 1000);
		};

		/**
		 * Init the composer popover
		 */
		/*$scope.composerData = {};
		 $ionicPopover.fromTemplateUrl('templates/newsfeed/compose.html', {
		 scope: $scope,
		 }).then(function(popover) {
		 $scope.composer = popover;
		 });

		 var posting;
		 $scope.post = function(){
		 if(posting)
		 return false;

		 console.log("posting");
		 $ionicLoading.show({
		 template: 'Please wait a moment...'
		 });
		 var posting = true;

		 NewsfeedAPI.post({
		 message: $scope.composerData.message
		 }, function(success){
		 $scope.refresh();
		 $scope.message = '';
		 $scope.composer.hide();

		 $ionicLoading.hide();
		 posting = false;
		 }, function(error){
		 alert('there was an error and we couldn\'t save!');
		 $ionicLoading.hide();
		 posting = false;
		 });

		 };*/

		$scope.remove = function(guid) {
			console.log('api/v1/newsfeed/' + guid);
			Client.delete('api/v1/newsfeed/' + guid, {
				cachebreaker: Date.now
			}, function(success) {
				if (success.status == 'success') {
					$scope.newsfeedItems.forEach(function(item, index, array) {
						if (item.guid == guid) {
							console.log('removed');
							array.splice(index, 1);
						}
					});
					if ($scope.ChannelItems) {
						$scope.ChannelItems.forEach(function(item, index, array) {
							if (item.guid == guid) {
								console.log('removed');
								array.splice(index, 1);
							}
						});
					}
				}
			}, function(error) {
				console.log('error');
			});
		};

		$scope.loadNotifications = function() {
			$state.go('tab.more-notifications', {}, {
				reload: true
			});
		};

		var timeout;
		$scope.openUrl = function(url) {
			$timeout.cancel(timeout);

			timeout = $timeout(function() {
				window.open(url, "_blank", "location=yes");
			}, 300);
		};

		$scope.boost = function(activity) {
			$ionicModal.fromTemplateUrl('templates/newsfeed/boost.html', {
				scope: $scope,
				animation: 'slide-in-up'
			}).then(function(modal) {
				$scope.modal = modal;
				$scope.guid = activity.guid;
				$scope.owner_guid = activity.owner_guid;
				$scope.modal.show();
			});
		};

		$scope.openActions = function(activity) {
			var guid = activity.guid;
			var buttons = [
				{
					text: '<b>Share</b>'
				},
				{
					text: 'Report this'
				}
			];

			if (activity.custom_data && activity.custom_data[0] && activity.custom_data[0].src)
				buttons.push({ text: 'Download' });

			$ionicActionSheet.show({
				buttons: buttons,
				destructiveText: 'Delete',
				destructiveButtonClicked: function() {
					if (activity.p2p_boosted) {
						$ionicLoading.show({
							template: 'Sorry, you can not delete a boosted post.'
						});
						$timeout(function() {
							$ionicLoading.hide();
						}, 1000);
						return false;
					}

					if (activity.owner_guid != $rootScope.user_guid) {

						$ionicLoading.show({
							template: 'Sorry, you can not delete posts that are not yourss.'
						});
						$timeout(function() {
							$ionicLoading.hide();
						}, 1000);

						return false;

					}

					if (confirm("are you sure?"))
						$scope.remove(guid);
					return true;

				},
				cancelText: 'Cancel',
				cancel: function() {
					// add cancel code..
				},
				buttonClicked: function(index) {
					switch (index) {
					case 0:
						/*cordova.plugins.clipboard.copy($rootScope.node_url + 'newsfeed/' + guid);
						 $ionicLoading.show({
						 template: '<p> Copied to clipboard </p>'
						 });
						 $timeout(function(){
						 $ionicLoading.hide();
						 }, 1000);
						 break;*/
						window.plugins.socialsharing.share('via minds', null, null, $rootScope.node_url + 'newsfeed/' + guid);
						break;
					case 1:
						window.location.href = "mailto:report@minds.com?subject=Report " + guid + "&body=This content violates the terms and conditions";
						break;
					case 2:
						window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs) {
							var ft = new FileTransfer();
							console.log(fs.root.toURL());
							fs.root.getDirectory('minds', {
								create: true,
								exclusive: false
							}, function() {
							}, function() {
							});
							ft.download(activity.custom_data[0].src, fs.root.toURL() + "minds/" + guid + '.jpg', function(entry) {
								console.log("download complete: " + entry.toURL());
							}, function(error) {
								console.log("download error source " + error.source);
								console.log("download error target " + error.target);
								console.log("upload error code" + error.code);
							}, false);
						});
						break;
					}
					return true;
				}
			});

		};

	}


	ctrl.$inject = ['$rootScope', '$scope', '$state', '$stateParams', 'NewsfeedAPI', '$filter', '$ionicScrollDelegate',
					'Cacher', 'Client', 'storage', '$ionicPopover', '$ionicLoading', '$timeout', '$ionicActionSheet',
					'$ionicModal', '$ionicPlatform'];
	return ctrl;

});
