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
			$scope.refresh();
    	});
    	
    	push.listen('chat', function(){
    		console.log('new message!');
    		$scope.cb = Date.now();
    		$scope.refresh();
			
    	});
    	
    	/**
    	 * Load more posts
    	 */
    	$scope.inprogress = false;
    	$scope.loadMore = function(refresh){
    		if($scope.inprogress){
    			return false;
    		}
    		$scope.inprogress = true;
    		
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
	    			$scope.inprogress = false;
	    				
	    		}, 
	    		function(error){ 
	    			alert('error'); 
	    			$scope.inprogress = true;
	    		});
	    		
    	};
    	
    	$scope.search = {};
    	$scope.doSearch = function(){
    		if(!$scope.search.query){
    			$scope.refresh();
    			return true;
    		}
    		console.log('doing search for ' + $scope.search.query);
    		Client.get('search', {q: $scope.search.query, type:'user', view:'json'}, function(success){
    			$scope.conversations = success.user[0];
    		});
    	}
        
        $scope.$on('$stateChangeSuccess', function() {
        	console.log('state changed..');
			//$scope.loadMore();
		});
		
		$scope.refresh = function(){
			$scope.search = {};
			$scope.inprogress = false;
			$scope.next = "";
			$scope.previous = "";
			$scope.cb = Date.now();
			$scope.loadMore(true);
		};
		
    }

    ctrl.$inject = ['$rootScope', '$scope', '$state', 'Client', 'storage', 'push'];
    return ctrl;
    
});