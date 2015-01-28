/**
 * Minds::mobile
 * Chat controller
 * 
 * @author Mark Harding
 */

define(function () {
    'use strict';

    function ctrl($rootScope, $scope, $state, Client, storage) {
    	
    	$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
				//$scope.refresh();
		});
    
    	$scope.conversations = [];
    	$scope.next  = "";
    	$scope.hasMoreData = true;
    	$scope.cb = Date.now();
		
		if(!storage.get('private-key')){
    		$state.go('tab.chat-setup');
    		return false;
    	}

    	/**
    	 * Load more posts
    	 */
    	$scope.loadMore = function(){
    			
    		console.log('loading next');
    		console.log($scope.next);
    		
    		Client.get('api/v1/conversations', { 
    				limit: 12, 
    				offset: $scope.next,
    				cb: $scope.cb
    			}, 
    			function(data){
    		
	    			if(!data.conversations){
	    				$scope.hasMoreData = false;
	    				return false;
	    			} else {
	    				$scope.hasMoreData = false;
	    			};
	    			
	    			$scope.conversations = $scope.conversations.concat(data.conversations);
	
	    			$scope.next = data['load-next'];
	    			
	    			$scope.$broadcast('scroll.infiniteScrollComplete');
	
	    		}, 
	    		function(error){ 
	    			alert('error'); 
	    		});
	    		
    	};
        
        $scope.$on('$stateChangeSuccess', function() {
        	console.log('state changed..');
			//$scope.loadMore();
		});
		
		$scope.refresh = function(){
			$scope.next = "";
			$scope.cb = Date.now();
			$scope.loadMore();
		};
		
    }

    ctrl.$inject = ['$rootScope', '$scope', '$state', 'Client', 'storage'];
    return ctrl;
    
});