/**
 * Minds::mobile
 * Login controller
 * 
 * @author Mark Harding
 */

define(function() {
	'use strict';

	function ctrl($scope, $state, storage) {
	
		//mock user
		$scope.entity = {
				guid: "not-real",
				type:'username',
				name:'Albert Einstein',
				avatar_url: 'http://content8.flixster.com/rtactor/42/23/42230_pro.jpg'
			};
		
		$scope.slideHasChanged = function($index){
			if($index == 4){
				$state.go('tab.discover');
			}
		};

	}


	ctrl.$inject = ['$scope', '$state', 'storage'];
	return ctrl;

}); 