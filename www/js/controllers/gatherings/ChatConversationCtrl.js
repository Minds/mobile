/**
 * Minds::mobile
 * Chat controller
 *
 * @author Mark Harding
 */

define(function() {
	'use strict';

	function ctrl($rootScope, $scope, $stateParams, $state, Client, storage, $ionicScrollDelegate, $timeout, $ionicLoading, push, $ionicPopup, $ionicModal, $q) {

		if (window.cordova) {
			cordova.plugins.Keyboard.disableScroll(false);
			cordova.plugins.Keyboard.close();
		}

		$scope.guid = $stateParams.username;
		$scope.name = $stateParams.name;

		$scope.messages = [];
		$scope.next = "";
		$scope.previous = "";
		$scope.hasMoreData = true;
		$scope.publickeys = {};
		$scope.inProgress = false;
		var poll = true;
		var timeout;

		/**
		 * Load more posts
		 */
		$scope.loadMore = function() {
			$scope.inProgress = true;
			console.log('loading messages from:' + $scope.next);

			Client.get('api/v1/conversations/' + $stateParams.username, {
				limit: 6,
				offset: $scope.next,
				cachebreak: Date.now()
			}, function(data) {
				$rootScope.newChat = false;
				$scope.inProgress = false;
				//now update the public keys
				$scope.publickeys = data.publickeys;

				if (!$scope.publickeys[$scope.guid]) {
					$ionicPopup.alert({
						title: 'Sorry!',
						template: $scope.name + " has not yet configured their encrypted chat yet."
					});
					$state.go('tab.chat');
					return true;
				}

				if (!data.messages) {
					$scope.hasMoreData = false;
					return false;
				} else {
					$scope.hasMoreData = true;
				};

				var first;
				if ($scope.messages.length === 0) {
					first = true;
				} else {
					first = false;
				}

				$scope.messages = data.messages.concat($scope.messages);

				console.log("------ MESSAGES ARE LOADED ------");

				$scope.next = data['load-previous'];
				$scope.previous = data['load-next'];
				$scope.$broadcast('scroll.refreshComplete');

				if (first) {
					$timeout(function() {
						$ionicScrollDelegate.scrollBottom();
					}, 1000);
				}

				poll = true;

			}, function(error) {
				$scope.inProgress = false;
			});

		};
		$scope.loadMore();

		/**
		 * Only do polling if we can't use push notifications
		 */
		if (!storage.get('push-token')) {
			var doPoll = function() {
				if (!poll) {
					//console.log('poll is false, skipping');
					return false;
				} else {
					console.log('checking for new messages..');
					poll = false;
				}
				Client.get('api/v1/conversations/' + $stateParams.username, {
					limit: 1000,
					start: $scope.previous,
					cachebreak: Date.now()
				}, function(data) {

					if (data && data.messages) {

						$scope.messages = $scope.messages.concat(data.messages);

						$scope.previous = data['load-next'];
						$ionicScrollDelegate.scrollBottom();
					}

					poll = true;
					clearTimeout($scope.timeout);
					$scope.timeout = setTimeout(doPoll, 5000);

				}, function(error) {
					poll = true;
					console.log('polling for new messages failed');
				});

			};

			$scope.timeout = setTimeout(doPoll, 5000);
		}

		/**
		 * Listen to push notifications
		 */
		var push_listen_id = push.listen('chat', function() {
			console.log('think you got a new message');
			Client.get('api/v1/conversations/' + $stateParams.username, {
				limit: 1000,
				start: $scope.previous,
				cachebreak: Date.now()
			}, function(data) {
				$rootScope.newChat = false;
				if (data && data.messages) {

					$scope.messages = $scope.messages.concat(data.messages);

					$scope.previous = data['load-next'];
					$ionicScrollDelegate.scrollBottom();
				}

			}, function(error) {
			});
		});

		window.addEventListener('native.keyboardshow', function() {
			if ($state.current.name == 'tab.chat-conversation')
				$ionicScrollDelegate.scrollBottom();
		});

		$scope.send = function() {

			if (!$scope.message) {

				$ionicPopup.alert({
					title: 'Oooops...',
					template: "You need to enter a message before you can send."
				});

				return false;

			}

			if ($scope.message.length > 180) {

				$ionicPopup.alert({
					title: 'Oooops...',
					template: "Your message is too long. It must be less than 180 characters"
				});

				return false;
			}

			$ionicLoading.show({
				template: 'Sending...'
			});

			var deferred = $q.defer();

			var encrypted = {};
			//console.log($scope.publickeys);
			for (var index in $scope.publickeys) {
				(function(i) {//prevent async callback using wrong index
					crypt.setPublicKey($scope.publickeys[i]);
					crypt.encrypt($scope.message, function(success) {
						//console.log(success);
						encrypted[i] = encodeURIComponent(success);

						if (encrypted.length == $scope.publickeys.length) {
							deferred.resolve(true);
						}
					});
				})(index);
			}

			var pushed = false;

			/**
			 * Because encrypting is asynchronous, we use promises to wait..
			 */
			deferred.promise.then(function() {
				var data = {};
				for (var index in encrypted) {
					data["message:" + index] = encrypted[index];
				}

				Client.post('api/v1/conversations/' + $stateParams.username, data,
					function(data) {
						if (!pushed) {
							$scope.messages.push(data.message);
							$scope.previous = data.message.guid;
							pushed = true;
						}
						$scope.message = "";
						$ionicLoading.hide();
						$ionicScrollDelegate.scrollBottom();
					},
					function(error) {
						$ionicLoading.hide();
						alert('sorry, your message could not be sent');
						console.log(error);
					});
			});

		};

		//let the page load first
		$timeout(function() {
			window.addEventListener('native.keyboardhide', keyboardhide);
			document.addEventListener('pause', goToChat);
		}, 100);

		function keyboardhide() {
			$ionicScrollDelegate.scrollBottom();
		};

		function goToChat() {
			$state.go('tab.chat');
		};

		$scope.$on('$destroy', function() {

			clearTimeout($scope.timeout);
			push.unlisten('chat', push_listen_id);
			window.removeEventListener('native.keyboardhide', keyboardhide);
			document.removeEventListener('pause', goToChat);
		});

	}


	ctrl.$inject = ['$rootScope', '$scope', '$stateParams', '$state', 'Client', 'storage', '$ionicScrollDelegate', '$timeout', '$ionicLoading', 'push', '$ionicPopup', '$ionicModal', '$q'];
	return ctrl;

});
