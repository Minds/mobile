/**
 * Minds::mobile
 * Chat controller
 * 
 * @author Mark Harding
 */

define(function () {
    'use strict';

    function ctrl($scope, $stateParams, $state, Client, storage, $ionicScrollDelegate, $interval, $ionicLoading) {
    
    	$scope.messages = [];
    	$scope.next  = "";
    	$scope.previous = "";
    	$scope.hasMoreData = true;
    	$scope.publickeys = {};
    	var poll = false;
    	
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
	    			$scope.previous = data['load-next'];
	    			$scope.$broadcast('scroll.refreshComplete');
	    			
	    			poll = true;
	    			
	    			//now update the public keys
					$scope.publickeys = data.publickeys;
	    		}, 
	    		function(error){ 
	    			console.log(error);
	    			alert('error'); 
	    		});
	    		
    	};
    	$scope.loadMore();
    	
    	var polling = $interval(function(){
    		if(!poll){
    			return false;
    		}
    		poll = false;
    		

    		$scope.doPoll();
    		
    		
    	}, 5000);
    	
    	$scope.doPoll = function(){
    		console.log('checking for new chats from' + $scope.previous);
    		Client.get('api/v1/conversations/'+$stateParams.username, { limit: 1000, start: $scope.previous, cachebreak: Date.now()}, 
    			function(data){
					
					if(data && data.messages){
	    			
		    			$scope.messages = $scope.messages.concat(data.messages);
	
					
		    			$scope.previous = data['load-next'];
		    			$ionicScrollDelegate.scrollBottom();
		    		}

	    			poll = true;

	    		}, 
	    		function(error){ 
	    			poll = false;
	    			console.log('polling for new messages failed');
	    		});
    	};
    	
    	
    	$scope.send = function(){
    	
    		$ionicLoading.show({
		      template: 'Sending...'
		    });
    		
    		var encrypted = {};
    		
    		for(var index in $scope.publickeys){
    			(function(i){ //prevent async callback using wrong index
	    			crypt.setPublicKey($scope.publickeys[i]);
	    			crypt.encrypt($scope.message, function(success){
	    				//console.log(success);
	    				encrypted[i] = encodeURIComponent(success);
	    			});
	    		})(index);
    		}
    		
    		/**
    		 * @todo make this into a promise.. interval looping is dumb
    		 */
    		//to make this syncronous we have to loop until we get all the values we need!
    		var sync = setInterval(function(){
    			if(encrypted.length == $scope.publickeys.length){
    				clearInterval(sync);
    				
    				var data = {};
    				for(var index in encrypted){
    					data["message:"+index] = encrypted[index];
    				}
    				//console.log(data);
    				Client.post('api/v1/conversations/'+$stateParams.username, 
    					data,
    					function(data){
    						$scope.doPoll();
    						//console.log(data);
    						//$scope.previous = data.message.guid;
    						//$scope.messages.push(data.message);
    						$scope.message = "";
    						$ionicScrollDelegate.scrollBottom();
    						$ionicLoading.hide();
    					},
    					function(error){
    						$ionicLoading.hide();
    						alert('sorry, your message could not be sent');
    						console.log(error);
    					});
    				
    			}
    		}, 100);
    		
    	};
        
        $scope.$on('$stateChangeSuccess', function() {
        	console.log('state changed..');
			//$scope.loadMore();
			//if(polling)
			//	$interval.cancel(polling);
		});

		
    }

    ctrl.$inject = ['$scope', '$stateParams', '$state', 'Client', 'storage', '$ionicScrollDelegate', '$interval', '$ionicLoading'];
    return ctrl;
    
});