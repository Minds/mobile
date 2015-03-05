/**
 * Minds::mobile
 * Discover
 * 
 * @author Mark Harding
 */

define(function () {
    'use strict';

    function ctrl($scope, $stateParams, Client, Cacher, $ionicSlideBoxDelegate, $ionicScrollDelegate) {

		$scope.entities = [];
		if(Cacher.get('entities.next')){
			$scope.next = Cacher.get('entities.next');
		} else {
			$scope.next = "";
		}
		
		$scope.hasMoreData = true;
		if(Cacher.get('entities.cb')){
			$scope.cachebreaker = Cacher.get('entities.cb');
		} else {
			$scope.cachebreaker = Date.now();
		}
		$scope.filter = 'suggested';
		$scope.type = 'channel';
		$scope.view = 'list';
		$scope.infinite = true;

		
		$scope.changeFilter = function(filter){
			if(filter == 'minder'){
				$scope.view = 'swipe';
				$scope.infinite = false;
			} else {
				$scope.view = 'list';
			}
			$scope.filter = filter;
			$scope.entities = [];
			$scope.next = "";
			$scope.load();
		};
		
		$scope.changeType = function(type){
			$scope.type = type;
			$scope.entities = [];
			$scope.next = "";
			$scope.load();
		};
		
		$scope.load = function(){
			if($scope.type != 'channel'){
				var subtype = $scope.type;
				var type = 'object';
			} else {
				var subtype = '';
				var type =  'user';
			}
		
			Client.get('api/v1/entities/' + $scope.filter, { 
				type: type,
				subtype: subtype,
				limit: 12, 
				offset: $scope.next, 
				cachebreaker: $scope.cachebreaker 
				}, 
    			function(data){
    			
    				if(!data.entities){
	    				$scope.hasMoreData = false;
	    				return false;
	    			} else {
	    				$scope.hasMoreData = true;
	    			}
	    			
	    			$scope.entities = $scope.entities.concat(data.entities);
	    			Cacher.put('entities.data', $scope.entities);
	    		
	
	    			$scope.next = data['load-next'];
	    			//Cacher.put('entities.next', $scope.next);
	    			
	    			$scope.$broadcast('scroll.infiniteScrollComplete');
	    		}, 
	    		function(error){ 
	    			alert('error'); 
	    		});
	    	console.log('api/v1/entities/' + $scope.filter);
	    	console.log({ 
				type: type,
				subtype: subtype,
				limit: 12, 
				offset: $scope.next, 
				cachebreaker: $scope.cachebreaker 
				});
	    	
		};
		
		$scope.refresh = function(){
			$scope.next = "";
			if($scope.type != 'channel'){
				var subtype = $scope.type;
				var type = 'object';
			} else {
				var subtype = '';
				var type = 'user';
			}
			
			Cacher.put('entities.cb', Date.now());
			
			Client.get('api/v1/entities/' + $scope.filter, { 
				type: type,
				subtype: subtype,
				limit: 12, 
				offset: $scope.next, 
				cachebreaker: Date.now() 
				}, 
    			function(data){
    			
	    			$scope.entities = data.entities;
	    			Cacher.put('entities.data', $scope.entities);
	    		
	
	    			$scope.next = data['load-next'];
	    			//Cacher.put('entities.next', $scope.next);
	    			
	    			$scope.$broadcast('scroll.infiniteScrollComplete');
	    		}, 
	    		function(error){ 
	    			alert('error'); 
	    		});
		};

    }

    ctrl.$inject = ['$scope', '$stateParams', 'Client', 'Cacher', '$ionicSlideBoxDelegate', '$ionicScrollDelegate'];
    return ctrl;
    
});