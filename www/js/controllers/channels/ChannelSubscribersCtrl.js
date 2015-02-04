/**
 * Minds::mobile
 * Channel Controller
 * 
 * @author Mark Harding
 */

define(function () {
    'use strict';

    function ctrl($scope, $stateParams, Client, $ionicSlideBoxDelegate, $ionicScrollDelegate) {

     	$scope.next = "";
     	$scope.subscribers = [];
     	$scope.guid = $stateParams.guid;
     	
     	
     	$scope.loadMore = function(){

	     	Client.get('api/v1/subscribe/subscribers/' + $stateParams.guid, { limit: 6, offset: $scope.next }, 
				function(data){
		    		console.log(data);
		    		console.log('api/v1/subscribe/subscribers/' + $stateParams.guid);
	    			if(!data.users){
	    				$scope.$broadcast('scroll.refreshComplete');
	    				$scope.hasMoreData = false;
	    				return false;
	    			} else {
	    				console.log('found users feed, loading it');
	    				$scope.hasMoreData = true;
	    			};
	    			
	    			$scope.subscribers = $scope.subscribers.concat(data.users);
	
	    			$scope.next = data['load-next'];
	    			
	    			$scope.$broadcast('scroll.infiniteScrollComplete');
	    			$scope.$broadcast('scroll.refreshComplete');
	
	    		}, 
	    		function(error){ 
	    			alert('error'); 
	    		});
	 	};
	 	$scope.loadMore();
       
    }

    ctrl.$inject = ['$scope', '$stateParams', 'Client', '$ionicSlideBoxDelegate', '$ionicScrollDelegate'];
    return ctrl;
    
});