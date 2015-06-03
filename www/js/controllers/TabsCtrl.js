/**
 * Minds::mobile
 * Tabs Controller
 *
 * @author Mark Harding
 */

define(function() {
	'use strict';

	function ctrl($rootScope, $scope, $state, $ionicPopover, storage, push, $ionicPlatform, analytics, $ionicHistory, CallReceiver) {

		$scope.logout = function() {
			storage.remove('loggedin');
			storage.remove('access_token');
			storage.remove('private-key');
			$state.go('login');
		};

		$scope.onTabSelect = function(tab) {
			if (tab == $state.current.name) {
				$state.go(tab, {}, {
					reload: true
				});
				return true;
			};
			$state.go(tab);
		};

		push.listen('chat', function(params) {
			$rootScope.newChat = 'minds-yellow';
			$rootScope.$apply();

			if (params.changeState && $state.current.name != 'tab.chat') {
				$state.go('tab.chat');
			}
		});

		push.listen('notification', function(params) {

			$rootScope.newNotification = 'minds-yellow';
			$rootScope.$apply();

			if (params.changeState && $state.current.name != 'tab.notifications') {
				$state.go('tab.notifications');
			}
		});

		//Call the analytics service.
		analytics.init();

		$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
		});

		$ionicPlatform.registerBackButtonAction(function(e) {
			if ($rootScope.playing) {
				document.webkitExitFullscreen();
				return false; //do not close if video..
			}

			if ($state.current.name == 'tab.newsfeed' || $state.current.name == 'login') {
				navigator.app.exitApp();
			} else {
				$ionicHistory.goBack();
			}
		}, 100);

	}


	ctrl.$inject = ['$rootScope', '$scope', '$state', '$ionicPopover', 'storage', 'push', '$ionicPlatform', 'analytics', '$ionicHistory', 'socket', 'CallReceiver'];
	return ctrl;

});
