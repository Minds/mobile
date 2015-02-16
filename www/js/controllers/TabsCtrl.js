/**
 * Minds::mobile
 * Tabs Controller
 * 
 * @author Mark Harding
 */

define(function() {
	'use strict';

	function ctrl($rootScope, $scope, $state, $ionicPopover, storage, push, $ionicPlatform) {

		$scope.logout = function(){
		  	storage.remove('loggedin');
		  	storage.remove('access_token');
		  	storage.remove('private-key');
		  	$state.go('login');
		};
		
		$scope.onTabSelect = function(tab){
			if(tab == $state.current.name){
				$state.go(tab, {}, {
					reload:true
				});
				return true;
			};
			$state.go(tab);
		};
		
		push.listen('chat', function(params){
			$rootScope.newChat = 'minds-yellow';
			$rootScope.$apply();
			
			if(params.changeState  && $state.current.name != 'tab.chat'){
			      $state.go('tab.chat');
			}
		});
		
		push.listen('notification', function(params){
			$rootScope.newNotification = 'minds-yellow';
			$rootScope.$apply();
			
			if(params.changeState && $state.current.name != 'tab.notifications'){
			      $state.go('tab.notifications');
			}
		});
		
				
		$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){ 
		});
		
	}


	ctrl.$inject = ['$rootScope', '$scope', '$state', '$ionicPopover', 'storage', 'push', '$ionicPlatform'];
	return ctrl;

}); 