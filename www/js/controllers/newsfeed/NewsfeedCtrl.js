/**
 * Minds::mobile
 * Newsfeed controller
 * 
 * @author Mark Harding
 */

define(function () {
    'use strict';

    function ctrl($scope, NewsfeedAPI, $filter, $ionicScrollDelegate, Cacher) {
    	
		if(Cacher.get('newsfeed.items'))
			$scope.newsfeedItems = Cacher.get('newsfeed.items');
		else
    		$scope.newsfeedItems =  [];
    	
    	if(Cacher.get('newsfeed.next'))
    		$scope.next = Cacher.get('newsfeed.next');
    	else
    		$scope.next  = "";
    	
    	$scope.hasMoreData = true;
    	
    	/**
    	 * Load more posts
    	 */
    	$scope.loadMore = function(){
    	
    		if(!$scope.hasMoreData)
    			return;
    		
    		NewsfeedAPI.all({ limit: 12, offset: $scope.next }, 
    			function(data){
    		
	    			if(!data.activity){
	    				$scope.hasMoreData = false;
	    				return false;
	    			} else {
	    				$scope.hasMoreData = true;
	    			};
	    			
	    			$scope.newsfeedItems = $scope.newsfeedItems.concat(data.activity);
	    			Cacher.put('newsfeed.items', $scope.newsfeedItems );
	
	    			$scope.next = data['load-next'];
	    			Cacher.put('newsfeed.item', $scope.next);
	    			
	    			$scope.$broadcast('scroll.infiniteScrollComplete');
	
	    		}, 
	    		function(error){ 
	    			alert('error'); 
	    		});
	    		
    	};
        
        $scope.$on('$stateChangeSuccess', function() {
		});
		
		$scope.refresh = function(){
			
			NewsfeedAPI.all({ limit: 12, offset: '', cache_break: Date.now() }, 
				function(data){
    		
	    			$scope.newsfeedItems = data.activity;
	
	    			$scope.next = data['load-next'];
	    			
	    			$scope.$broadcast('scroll.refreshComplete');
	
	    		}, 
	    		function(error){ 
	    			alert('error'); 
	    		});
			
		};
		
		
		/**************************
		 **** Newsfeed actions ****
		 *************************/
		/**
		 * Thumb up an activity
		 */
		$scope.thumbsUp = function(guid){
			alert('woohoo');
		};
		
		/**
		 * Thumb down an activity
		 */
		$scope.thumbsDown = function(guid){
			alert('wowza');
		};
		
		/**
		 * Load comments
		 */
		$scope.loadComments = function(guid){
			alert('sorry, not done this yet');
		};
		
		/**
		 * Remind an activity
		 */
		$scope.remind = function(guid){
			alert('sorry, not done this yet');
		};
    }

    ctrl.$inject = ['$scope', 'NewsfeedAPI', '$filter', '$ionicScrollDelegate', 'Cacher'];
    return ctrl;
    
});