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
			if($index == 8){
				//$state.go('tab.newsfeed-channel', {username: "me"});
				$state.go('tab.newsfeed');
			}
		};
		
		$scope.news = [
			{ guid: 63,
			  user: "Mark Harding",
			  message: "Welcome to the Minds app!"
			},
			{ guid: 341,
			  user: "Bill Ottman",
			  message: "Share your videos, photos & status."
			}
		];

	}


	ctrl.$inject = ['$scope', '$state', 'storage'];
	return ctrl;

}); 