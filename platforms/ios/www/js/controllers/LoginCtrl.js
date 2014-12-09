/**
 * Minds::mobile
 * Login controller
 * 
 * @author Mark Harding
 */

define(function() {
	'use strict';

	function ctrl($scope, $state, OAuth) {

		$scope.login = function() {
			//$state.go('tab.newsfeed');
			OAuth.login($scope.username, $scope.password, function(data){
				if(data)
					$state.go('tab.newsfeed');
			});
			
		};

	}


	ctrl.$inject = ['$scope', '$state', 'OAuth'];
	return ctrl;

}); 