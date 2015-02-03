/**
 * Minds::mobile
 * Chat controller
 * 
 * @author Mark Harding
 */

define(function () {
    'use strict';

    function ctrl($rootScope, $scope, $state, Client, storage, push) {
    	
    	$scope.conversations = [];
    	$scope.next  = "";
    	$scope.hasMoreData = true;
    	$scope.cb = Date.now();
		
    	$scope.$on('$ionicView.beforeEnter', function(){
			if(!storage.get('private-key')){
	    		$state.go('tab.chat-setup');
	    		return false;
	    	}
			$rootScope.newChat = false;
			
    	});
    	
    	push.listen('chat', function(){
    		console.log('new message!');
    		$scope.cb = Date.now();
    		$scope.refresh();
			
    	});
    	
    	/**
    	 * Load more posts
    	 */
    	$scope.loadMore = function(refresh){

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
	    			
	    			if(refresh){
	    				$scope.conversations = data.conversations;
	    			} else {
	    				$scope.conversations = $scope.conversations.concat(data.conversations);
	    			}
	
	    			$scope.next = data['load-next'];
	    			
	    			$scope.$broadcast('scroll.infiniteScrollComplete');
	    			$scope.$broadcast('scroll.refreshComplete');
	
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
			$scope.previous = "";
			$scope.cb = Date.now();
			$scope.loadMore(true);
		};
		
    }

    ctrl.$inject = ['$rootScope', '$scope', '$state', 'Client', 'storage', 'push'];
    return ctrl;
    
});