/**
 * Minds::mobile
 * Chat controller
 *
 * @author Mark Harding
 */

define(function() {
	'use strict';

	function ctrl($rootScope, $scope, $state, Client, storage, push, $ionicModal, $ionicPopup, $ionicScrollDelegate) {

		$scope.conversations = [];
		$scope.next = "";
		$scope.hasMoreData = true;
		$scope.cb = Date.now();

		$scope.$on('$ionicView.beforeEnter', function() {
			if (!storage.get('private-key')) {
				$state.go('tab.chat-setup');
				return false;
			}
			$rootScope.newChat = false;
			$scope.refresh();
		});

		push.listen('chat', function() {
			console.log('new message!');
			if ($state.current.name == 'tab.chat') {
				$scope.cb = Date.now();
				$rootScope.newChat = false;
				$scope.refresh();
				$ionicScrollDelegate.scrollTop();
			}

		});

		/**
		 * Load more posts
		 */
		$scope.inprogress = false;
		$scope.loadMore = function(refresh) {
			if ($scope.inprogress || !storage.get('private-key')) {
				return false;
			}
			$scope.inprogress = true;

			Client.get('api/v1/conversations', {
				limit: 12,
				offset: $scope.next,
				cb: $scope.cb
			}, function(data) {

				if (!data.conversations) {
					$scope.hasMoreData = false;
					return false;
				} else {
					$scope.hasMoreData = true;
				};

				if (refresh) {
					$scope.conversations = data.conversations;
				} else {
					$scope.conversations = $scope.conversations.concat(data.conversations);
				}

				$scope.next = data['load-next'];

				$scope.$broadcast('scroll.infiniteScrollComplete');
				$scope.$broadcast('scroll.refreshComplete');
				$scope.inprogress = false;

			}, function(error) {
				$scope.inprogress = true;
			});

		};

		$scope.search = {};
		$scope.doSearch = function() {
			if (!$scope.search.query) {
				$scope.refresh();
				return true;
			}
			console.log('doing search for ' + $scope.search.query);
			Client.get('search', {
				q: $scope.search.query,
				type: 'user',
				view: 'json'
			}, function(success) {
				$scope.conversations = success.user[0];
			});
		};

		$scope.$on('$stateChangeSuccess', function() {
			console.log('state changed..');
			//$scope.loadMore();
		});

		$scope.refresh = function() {
			$scope.search = {};
			$scope.inprogress = false;
			$scope.next = "";
			$scope.previous = "";
			$scope.cb = Date.now();
			$scope.hasMoreData = true;
			$scope.loadMore(true);
		};

		$scope.subscribe = function($index) {
			$scope.conversations[$index].subscribed = true;
			if (!$scope.conversations[$index].subscriber) {
				$ionicPopup.alert({
					title: 'Subscribed',
					template: 'You can chat with ' + $scope.conversations[$index].name + ' when they subscribe to you too'
				});
			} else {
				window.location.href = '#/tab/gatherings/conversations/' + $scope.conversations[$index].guid + '/' + $scope.conversations[$index].name;
			}
			Client.post('api/v1/subscribe/' + $scope.conversations[$index].guid, {}, function() {
			}, function() {
			});
		};

		$scope.invite = function() {

			/*$ionicModal.fromTemplateUrl('templates/invite/invite.html', {
				scope: $scope,
				animation: 'slide-in-up'
			}).then(function(modal) {
				$scope.modal = modal;
				$scope.modal.show();
			})*;*/
			//need to get username first
			Client.get('api/v1/channel/' + $rootScope.user_guid, {}, function(success) {
				window.plugins.socialsharing.share("Hey! If you install the Minds app and tag me @" + success.channel.username + " we both get 100 points! \n\n",
													'Join Minds and we both get 100 points to go viral!',
													null,
													$rootScope.node_url
													);
			}, function(error) {});

		};

	}


	ctrl.$inject = ['$rootScope', '$scope', '$state', 'Client', 'storage', 'push', '$ionicModal', '$ionicPopup', '$ionicScrollDelegate'];
	return ctrl;

});
