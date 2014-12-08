/**
 * Minds::mobile
 * Login controller
 * 
 * @author Mark Harding
 */

define(function() {
	'use strict';

	function ctrl($scope, $state) {

		$scope.login = function() {
			$state.go('tab.newsfeed');
		};

	}


	ctrl.$inject = ['$scope', '$state'];
	return ctrl;

}); 