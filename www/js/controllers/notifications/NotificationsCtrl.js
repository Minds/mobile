/**
 * Minds::mobile
 * Notifications controller
 * 
 * @author Mark Harding
 */

define(function () {
    'use strict';

    function ctrl($rootScope, $scope,  $ionicScrollDelegate, Cacher, Client, storage, $ionicPopover, $ionicLoading) {

		/** Cached or fresh **/
		if(Cacher.get('notification.items')){
			$scope.notificationItems = Cacher.get('notification.items');
		}else{
    		$scope.notificationItems =  [];
    	}
    	
    	/** What to load next **/
    	if(Cacher.get('notification.next'))
    		$scope.next = Cacher.get('notification.next');
    	else
    		$scope.next  = "";
    	
    	$scope.hasMoreData = true;
    	
    	/** The cache breaker **/
    	if(Cacher.get('notification.cachebreaker')){
    		$scope.cachebreaker = Cacher.get('notification.cachebreaker');
    	} else {
    		$scope.cachebreaker = 0;
    	}

    	/** Load more notifications **/
    	$scope.loadMore = function(){
    		console.log('==== loading more notifications ====');
    	
    		if(!$scope.hasMoreData)
    			return;
    		
    		Client.get('api/v1/notifications', { limit: 12, offset: $scope.next, cachebreaker: $scope.cachebreaker }, 
    			function(data){
    		
	    			if(!data.notifications){
	    				$scope.hasMoreData = false;
	    				return false;
	    			} else {
	    				$scope.hasMoreData = true;
	    			};
	    			
	    			$scope.notificationItems = $scope.notificationItems.concat(data.notifications);
	    			Cacher.put('notification.items', $scope.notificationItems);
	    		
	
	    			$scope.next = data['load-next'];
	    			Cacher.put('notification.item', $scope.next);
	    			
	    			$scope.$broadcast('scroll.infiniteScrollComplete');
	
	    		}, 
	    		function(error){ 
	    			alert('error'); 
	    		});
	    		
    	};
		
		$scope.refresh = function(){
			
			Client.get('api/v1/notifications', { limit: 12, offset: '', cache_break: Date.now() }, 
				function(data){
    		
	    			$scope.notificationItems = data.notifications;
	    			Cacher.put('notification.items', $scope.notificationItems);
	
	    			$scope.next = data['load-next'];
	    			
	    			Cacher.put('notification.cachebreaker', Date.now);
	    			
	    			$scope.$broadcast('scroll.refreshComplete');
	
	    		}, 
	    		function(error){ 
	    			alert('error'); 
	    		});
			
		};
		
		
    }

    ctrl.$inject = ['$rootScope', '$scope', '$ionicScrollDelegate', 'Cacher', 'Client', 'storage', '$ionicPopover', '$ionicLoading'];
    return ctrl;
    
});