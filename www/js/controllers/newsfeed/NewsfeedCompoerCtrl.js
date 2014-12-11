/**
 * Minds::mobile
 * Newsfeed composer
 * 
 * @author Mark Harding
 */

define(function () {
    'use strict';

    function ctrl($scope, $state, NewsfeedAPI) {
    	
		$scope.post = function(){

    		NewsfeedAPI.post({
    			message: $scope.message
	    	},function(success){
	    		$state.go('tab.newsfeed');
	    	});
	    	
		};
        
    }

    ctrl.$inject = ['$scope', '$state', 'NewsfeedAPI'];
    return ctrl;
    
});