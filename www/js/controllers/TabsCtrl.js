/**
 * Minds::mobile
 * Tabs Controller
 * 
 * @author Mark Harding
 */

define(function() {
	'use strict';

	function ctrl($rootScope, $scope, $state, $ionicPopover, storage) {

		$scope.logout = function(){
		  	storage.remove('loggedin');
		  	storage.remove('access_token');
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
		
				
		$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){ 
		});
		
	}


	ctrl.$inject = ['$rootScope', '$scope', '$state', '$ionicPopover', 'storage'];
	return ctrl;

}); 