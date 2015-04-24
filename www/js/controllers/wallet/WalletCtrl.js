/**
 * Minds::mobile
 * Channel Controller
 * 
 * @author Mark Harding
 */

define(function () {
    'use strict';

    function ctrl($scope, $stateParams, Client, $ionicSlideBoxDelegate, $ionicScrollDelegate) {

     	Client.get('api/v1/wallet/count', { cb: Date.now() }, function(success){
     		$scope.points = success.count;
     		$scope.satoshi = success.satoshi;
     		$scope.btc = success.btc;
     		$scope.usd = success.usd;
     		$scope.boost_rate = success.boost_rate;
     	}, function(){});
     	
     	
     	$scope.transactions = [];
     	$scope.hasMoreData = true;
     	$scope.next = "";
     	
    	$scope.loadMore = function(){
    		console.log('==== loading more transactions ====');
    	
    		if(!$scope.hasMoreData)
    			return;
    		
    		Client.get('api/v1/wallet/transactions', { limit: 12, offset: $scope.next, cachebreaker: Date.now() }, 
    			function(data){
	    			if(!data.transactions){
	    				$scope.hasMoreData = false;
	    				$scope.$broadcast('scroll.infiniteScrollComplete');
	    				return false;
	    			} else {
	    				$scope.hasMoreData = true;
	    			};
	    			
	    			$scope.transactions = $scope.transactions.concat(data.transactions);	    		
	
	    			$scope.next = data['load-next'];
	    			
	    			$scope.$broadcast('scroll.infiniteScrollComplete');
	
	    		}, 
	    		function(error){ 
	    		});
	    		
    	};
    	//$scope.loadMore();
 
       
    }

    ctrl.$inject = ['$scope', '$stateParams', 'Client', '$ionicSlideBoxDelegate', '$ionicScrollDelegate'];
    return ctrl;
    
});