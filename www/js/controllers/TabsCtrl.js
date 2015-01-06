/**
 * Minds::mobile
 * Tabs Controller
 * 
 * @author Mark Harding
 */

define(function() {
	'use strict';

	function ctrl($scope, $state, $ionicPopover, storage) {

		$scope.logout = function(){
		  	storage.remove('loggedin');
		  	storage.remove('access_token');
		  	$state.go('login');
		};
		
	}


	ctrl.$inject = ['$scope', '$state', '$ionicPopover', 'storage'];
	return ctrl;

}); 