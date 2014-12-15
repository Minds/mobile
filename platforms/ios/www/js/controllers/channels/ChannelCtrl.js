/**
 * Minds::mobile
 * Channel Controller
 * 
 * @author Mark Harding
 */

define(function () {
    'use strict';

    function ctrl($scope, $stateParams, Client, $ionicSlideBoxDelegate, $ionicScrollDelegate) {

		Client.get('api/v1/channel/'+$stateParams.username, {}, 
			function(success){
				$scope.channel = success.channel;
				$ionicSlideBoxDelegate.update();
			},
			function(error){
			});
     
     	setInterval(function(){
     		 var top = $ionicScrollDelegate.getScrollPosition().top;
     		 if(top > 10){
     		 	$scope.carousel_class = "blur";
     		 } else {
     		 	$scope.carousel_class = "not-blurred";
     		 }
     		 $scope.$apply();
     	}, 100);
     	
     	$scope.next = "";
     	$scope.newsfeedItems = [];
     	
     	$scope.loadMore = function(){
	     	Client.get('api/v1/newsfeed/personal', { limit: 6, offset: $scope.next }, 
				function(data){
	    		
	    			if(!data.activity){
	    				$scope.hasMoreData = false;
	    				return false;
	    			} else {
	    				$scope.hasMoreData = true;
	    			};
	    			
	    			$scope.newsfeedItems = $scope.newsfeedItems.concat(data.activity);
	
	    			$scope.next = data['load-next'];
	    			
	    			$scope.$broadcast('scroll.infiniteScrollComplete');
	
	    		}, 
	    		function(error){ 
	    			alert('error'); 
	    		});
	 	};
       
    }

    ctrl.$inject = ['$scope', '$stateParams', 'Client', '$ionicSlideBoxDelegate', '$ionicScrollDelegate'];
    return ctrl;
    
});