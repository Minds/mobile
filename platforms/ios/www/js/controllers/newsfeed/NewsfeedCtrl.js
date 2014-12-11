/**
 * Minds::mobile
 * Newsfeed controller
 * 
 * @author Mark Harding
 */

define(function () {
    'use strict';

    function ctrl($scope, NewsfeedAPI, $filter) {
    	$scope.newsfeedItems = [];
    	$scope.next  = "";
    	$scope.hasMoreData = true;
    	
    	/*NewsfeedAPI.all({ limit: 12}, function(data){
    		$scope.newsfeedItems = data.activity;
    		$scope.next = data['load-next'];
    	});*/
    	
    	/**
    	 * Load more posts
    	 */
    	$scope.loadMore = function(){
    			
    		console.log('loading next');
    		console.log($scope.next);
    		
    		NewsfeedAPI.all({ limit: 12, offset: $scope.next }, function(data){
    		
    			if(!data.activity){
    				$scope.hasMoreData = false;
    				return false;
    			} else {
    				$scope.hasMoreData = true;
    			};
    			
    			$scope.newsfeedItems = $scope.newsfeedItems.concat(data.activity);

    			$scope.next = data['load-next'];
    			
    			$scope.$broadcast('scroll.infiniteScrollComplete');

    		}, function(error){ alert('error'); });
    	};
        
        $scope.$on('$stateChangeSuccess', function() {
        	console.log('state changed..');
			//$scope.loadMore();
		});
		
		/*$scope.canLoad = function(){
			return true;
		};*/
		
    }

    ctrl.$inject = ['$scope', 'NewsfeedAPI', '$filter'];
    return ctrl;
    
});