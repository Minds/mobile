/**
 * Minds::mobile
 * Channel Controller
 * 
 * @author Mark Harding
 */

define(function () {
    'use strict';

    function ctrl($scope, $stateParams, Client, $ionicSlideBoxDelegate, $ionicScrollDelegate) {
    	
    	if($stateParams.username == undefined){
    		$state.go('tab.newsfeed');
    		return false;
    	}

     	$scope.next = "";
     	$scope.ChannelItems = [];
     	
		Client.get('api/v1/channel/'+$stateParams.username, {}, 
			function(success){
				$scope.channel = success.channel;
				$ionicSlideBoxDelegate.update();
				if($scope.ChannelItems.length == 0)
					$scope.loadMore();
			},
			function(error){
			});
     
     	/*setInterval(function(){
     		 var top = $ionicScrollDelegate.getScrollPosition().top;
     		 if(top > 10){
     		 	$scope.carousel_class = "blur";
     		 } else {
     		 	$scope.carousel_class = "not-blurred";
     		 }
     		 $scope.$apply();
     	}, 100);*/
     	
     	
     	$scope.loadMore = function(){
     		if(!$scope.channel){
     			return false;
     		}
     		console.log('getting a users feed');
	     	Client.get('api/v1/newsfeed/personal/' + $scope.channel.guid, { limit: 6, offset: $scope.next }, 
				function(data){
	    		
	    			if(!data.activity){
	    				console.log('users feed not found');
	    				$scope.$broadcast('scroll.refreshComplete');
	    				$scope.hasMoreData = false;
	    				return false;
	    			} else {
	    				console.log('found users feed, loading it');
	    				$scope.hasMoreData = true;
	    			};
	    			
	    			$scope.ChannelItems = $scope.ChannelItems.concat(data.activity);
	
	    			$scope.next = data['load-next'];
	    			
	    			$scope.$broadcast('scroll.infiniteScrollComplete');
	    			$scope.$broadcast('scroll.refreshComplete');
	
	    		}, 
	    		function(error){ 
	    			alert('error'); 
	    		});
	 	};
	 	
	 	$scope.subscribe = function(channel){
	 		
	 		$scope.channel.subscribed = true;
	 		$scope.channel.subscribers_count = $scope.channel.subscribers_count + 1;
	 		Client.post('api/v1/subscribe/' + channel.guid, {},
					function(){
					},
					function(){
						$scope.channel.subscribed = false;
						$scope.channel.subscribers_count = $scope.channel.subscribers_count - 1;
					});
	 		
	 	};
       
    }

    ctrl.$inject = ['$scope', '$stateParams', 'Client', '$ionicSlideBoxDelegate', '$ionicScrollDelegate'];
    return ctrl;
    
});