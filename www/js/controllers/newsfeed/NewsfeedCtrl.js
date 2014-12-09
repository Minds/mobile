/**
 * Minds::mobile
 * Newsfeed controller
 * 
 * @author Mark Harding
 */

define(function () {
    'use strict';

    function ctrl($scope, NewsfeedAPI) {
    	
    	NewsfeedAPI.all(function(activity){
    		$scope.newsfeedItems = activity;
    	});
        
    }

    ctrl.$inject = ['$scope', 'NewsfeedAPI'];
    return ctrl;
    
});