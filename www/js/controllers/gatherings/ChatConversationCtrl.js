/**
 * Minds::mobile
 * Chat controller
 * 
 * @author Mark Harding
 */

define(function () {
    'use strict';

    function ctrl($scope, $stateParams, Client) {
    
    	$scope.messages = [];
    	$scope.next  = "";
    	$scope.hasMoreData = true;


    	/**
    	 * Load more posts
    	 */
    	$scope.loadMore = function(){

    		console.log('loading messages from:' + $scope.next);
    		
    		Client.get('api/v1/conversations/'+$stateParams.username, { limit: 12, offset: $scope.next }, 
    			function(data){
    			
    				console.log(data);
    		
	    			if(!data.messages){
	    				$scope.hasMoreData = false;
	    				return false;
	    			} else {
	    				$scope.hasMoreData = true;
	    			};
	    			
	    			$scope.messages = data.messages.concat($scope.messages);
	
	    			$scope.next = data['load-previous'];
	    			
	    			$scope.$broadcast('scroll.refreshComplete');
	
	    		}, 
	    		function(error){ 
	    			alert('error'); 
	    		});
	    		
    	};
    	$scope.loadMore();
        
        $scope.$on('$stateChangeSuccess', function() {
        	console.log('state changed..');
			//$scope.loadMore();
		});

		
    }

    ctrl.$inject = ['$scope', '$stateParams', 'Client'];
    return ctrl;
    
});