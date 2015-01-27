/**
 * Minds::mobile
 * Discover
 * 
 * @author Mark Harding
 */

define(function () {
    'use strict';

    function ctrl($scope, $stateParams, Client, Cacher, $ionicSlideBoxDelegate, $ionicScrollDelegate, $ionicLoading, $timeout) {

		$scope.entities = [];
		if(Cacher.get('entities.next')){
			$scope.next = Cacher.get('entities.next');
		} else {
			$scope.next = "";
		}
		$scope.passed = []; //we keep this so that on loading new items, there are not conflicts. 
		
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
			console.log('chaning filter');
			if(filter == 'suggested'){
				$scope.view = 'swipe';
				$scope.infinite = false;
				Cacher.put('entities.cb', Date.now());
				$scope.cachebreaker = Date.now();
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
			console.log($scope.filter);
			Client.get('api/v1/entities/' + $scope.filter, { 
				type: type,
				subtype: subtype,
				limit: 12, 
				offset: $scope.next, 
				cachebreaker: $scope.cachebreaker 
				}, 
    			function(data){
					//console.log(data); 
    				if(!data.entities){
	    				$scope.hasMoreData = false;
	    				return false;
	    			} else {
	    				$scope.hasMoreData = true;
	    			}
	    			
	    			$scope.entities = $scope.entities.concat(data.entities);
	    			
	    			//scan for duplicates..
	    			$scope.passed.forEach(function(item, index, array){
	    				$scope.entities.forEach(function(eitem, eindex, earray){
	    					if(item == eitem){
	    						console.log('found duplicate, attempting to remove');
	    						earray.splice(index, 1);
	    					}
	    				});
	    			});
	    			
	    			Cacher.put('entities.data', $scope.entities);
	
	    			$scope.next = data['load-next'];
	    			//Cacher.put('entities.next', $scope.next);
	    			
	    			Cacher.put('entities.cb', Date.now());
					$scope.cachebreaker = Date.now();
	    			
	    			$scope.$broadcast('scroll.infiniteScrollComplete');
	    		}, 
	    		function(error){ 
	    			alert('error'); 
	    		});
	    	console.log('api/v1/entities/' + $scope.filter);

	    	
		};
		$scope.load();
				
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
				limit: 24, 
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
		
		$scope.pop = function(entity){
			
			if($scope.entities.length  < 5){
				console.log('loading new...');
				Cacher.put('entities.cb', Date.now());
				$scope.load();
			}
			
			$scope.entities.forEach(function(item, index, array){
				if(item.guid == entity.guid){
					array.splice(index, 1);
					$scope.passed.push(entity);
				} 
			});
			$scope.$digest();
			
		}
		
		$scope.ignore = function(entity){
			//remove the entity from the list
			$scope.pop(entity);
			
			//notify the suggested that we have decided to ignore
			Client.post('api/v1/entities/suggested/pass/' + entity.guid, {}, function(){}, function(){});
			
			//show a quick ui confirmation
			$ionicLoading.show({
				template: '<i class="icon ion-close" style="font-size:90px"></i>'
				});
			$timeout(function(){
				$ionicLoading.hide();
				}, 300);
		};
		$scope.subscribe = function(entity){
			//remove the entity from the list	
			$scope.pop(entity);
			console.log('api/v1/subscribe/' + entity.guid);
			//subscribe to the user
			Client.post('api/v1/subscribe/' + entity.guid, {},
					function(){
					},
					function(){
					});
			
			//show a quick ui confirmation
			$ionicLoading.show({
				template: '<i class="icon ion-person" style="font-size:90px"></i>'
				});
			$timeout(function(){
				$ionicLoading.hide();
				}, 300);
		}

    }

    ctrl.$inject = ['$scope', '$stateParams', 'Client', 'Cacher', '$ionicSlideBoxDelegate', '$ionicScrollDelegate', '$ionicLoading', '$timeout'];
    return ctrl;
    
});