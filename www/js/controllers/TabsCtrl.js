/**
 * Minds::mobile
 * Tabs Controller
 * 
 * @author Mark Harding
 */

define(function() {
	'use strict';

	function ctrl($rootScope, $scope, $state, $ionicPopover, storage, push) {

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
		
		push.listen('chat', function(){
			$rootScope.newChat = 'minds-yellow';
			$rootScope.$apply();
		});
		
				
		$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){ 
		});
		
	}


	ctrl.$inject = ['$rootScope', '$scope', '$state', '$ionicPopover', 'storage', 'push'];
	return ctrl;

}); 