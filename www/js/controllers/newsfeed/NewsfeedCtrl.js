/**
 * Minds::mobile
 * Newsfeed controller
 * 
 * @author Mark Harding
 */

define(function () {
    'use strict';

    function ctrl($scope, NewsfeedAPI, $filter, $ionicScrollDelegate, Cacher, Client, storage) {
    	
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

			Client.put('api/v1/thumbs/'+guid+'/up', {},
				function(success){
					$scope.newsfeedItems.forEach(function(item, index, array){
						if(item.guid == guid){
							if(!array[index].hasOwnProperty('thumbs:up:user_guids') || !array[index]['thumbs:up:user_guids'])
								array[index]['thumbs:up:user_guids'] = [];
								
							if(array[index]['thumbs:up:user_guids'].indexOf(storage.get('user_guid')) > -1){
								var pos = array[index]['thumbs:up:user_guids'].indexOf(storage.get('user_guid'));
								array[index]['thumbs:up:user_guids'].splice(pos, 1);
							} else {
								array[index]['thumbs:up:user_guids'].push(storage.get('user_guid'));
							}
						}
					});
				},
				function(error){
					alert('failed..');
				});
		};
		
		/**
		 * Thumb down an activity
		 */
		$scope.thumbsDown = function(guid){
			Client.put('api/v1/thumbs/'+guid+'/down', {},
				function(success){
					$scope.newsfeedItems.forEach(function(item, index, array){
						if(item.guid == guid){
							if(!array[index].hasOwnProperty('thumbs:down:user_guids') || !array[index]['thumbs:down:user_guids'])
								array[index]['thumbs:down:user_guids'] = [];
							
							if(array[index]['thumbs:down:user_guids'].indexOf(storage.get('user_guid')) > -1){
								var pos = array[index]['thumbs:up:user_guids'].indexOf(storage.get('user_guid'));
								array[index]['thumbs:down:user_guids'].splice(pos, 1);
							} else {
								array[index]['thumbs:down:user_guids'].push(storage.get('user_guid'));
							}
						}
					});
				},
				function(error){
					alert('failed..');
				});
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

    ctrl.$inject = ['$scope', 'NewsfeedAPI', '$filter', '$ionicScrollDelegate', 'Cacher', 'Client', 'storage'];
    return ctrl;
    
});