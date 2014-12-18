/**
 * Minds::mobile
 * Chat controller
 * 
 * @author Mark Harding
 */

define(function () {
    'use strict';

    function ctrl($scope, $stateParams, $state, Client, storage, $ionicScrollDelegate) {
    
    	$scope.messages = [];
    	$scope.next  = "";
    	$scope.hasMoreData = true;
    	$scope.publickeys = {};
    	
    	/**
    	 * Load more posts
    	 */
    	$scope.loadMore = function(){

    		console.log('loading messages from:' + $scope.next);
    		
    		Client.get('api/v1/conversations/'+$stateParams.username, { limit: 6, offset: $scope.next, cachebreak: Date.now()}, 
    			function(data){
    			    		
	    			if(!data.messages){
	    				$scope.hasMoreData = false;
	    				return false;
	    			} else {
	    				$scope.hasMoreData = true;
	    			};
	    			
	    			$scope.messages = data.messages.concat($scope.messages);
	    			
	    			if($scope.next == "")
						$ionicScrollDelegate.scrollBottom();
						
	    			console.log("------ MESSAGES ARE LOADED ------");
	
	    			$scope.next = data['load-previous'];
	    			
	    			$scope.$broadcast('scroll.refreshComplete');
	    			
	    			
	    			//now update the public keys
					$scope.publickeys = data.publickeys;
	    		}, 
	    		function(error){ 
	    			alert('error'); 
	    		});
	    		
    	};
    	$scope.loadMore();
    	
    	$scope.send = function(){
    		
    		var encrypted = {};
    		
    		for(var index in $scope.publickeys){
    			(function(i){ //prevent async callback using wrong index
	    			crypt.setPublicKey($scope.publickeys[i]);
	    			crypt.encrypt($scope.message, function(success){
	    				console.log(success);
	    				encrypted[i] = encodeURIComponent(success);
	    			});
	    		})(index);
    		}
    		
    		//to make this syncronous we have to loop until we get all the values we need!
    		var sync = setInterval(function(){
    			if(encrypted.length == $scope.publickeys.length){
    				clearInterval(sync);
    				
    				var data = {};
    				for(var index in encrypted){
    					data["message:"+index] = encrypted[index];
    				}
    				console.log(data);
    				Client.post('api/v1/conversations/'+$stateParams.username, 
    					data,
    					function(data){
    						$scope.messages.push(data.message);
    						$scope.message = "";
    					},
    					function(error){
    						console.log(error);
    					});
    				
    			}
    		}, 100);
    		
    	};
        
        $scope.$on('$stateChangeSuccess', function() {
        	console.log('state changed..');
			//$scope.loadMore();
		});

		
    }

    ctrl.$inject = ['$scope', '$stateParams', '$state', 'Client', 'storage', '$ionicScrollDelegate'];
    return ctrl;
    
});