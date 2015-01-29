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
			$scope.passed = [];
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
			console.log('loading entities...');
			Client.get('api/v1/entities/' + $scope.filter + '/' + subtype, { 
				limit: 16, 
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
					
					console.log('got it!');
					//$scope.$apply();
	    			
	    			//$scope.$broadcast('scroll.infiniteScrollComplete');
	    		}, 
	    		function(error){ 
	    			alert('error'); 
	    		});
	    	//console.log('api/v1/entities/' + $scope.filter);

	    	
		};
		$scope.load();
		//var data = {"status":"success","entities":[{"guid":"100000000000019544","type":"user","subtype":false,"time_created":"1356598391","time_updated":"1356598392","container_guid":"0","owner_guid":"100000000000000000","site_guid":"1","access_id":"2","name":"Kosumosu Koi","username":"kosumosukoi","language":"en","icontime":false,"legacy_guid":"19544","featured_id":false,"subscribed":false},{"guid":"100000000000019551","type":"user","subtype":false,"time_created":"1356598638","time_updated":"1356598723","container_guid":"0","owner_guid":"100000000000000000","site_guid":"1","access_id":"2","name":"dongtingqiu","username":"dongtingqiu","language":"en","icontime":false,"legacy_guid":"19551","featured_id":false,"subscribed":false},{"guid":"100000000000019558","type":"user","subtype":false,"time_created":"1356598747","time_updated":"1356598747","container_guid":"0","owner_guid":"100000000000000000","site_guid":"1","access_id":"2","name":"Nigar Gafarova","username":"nigargafarova","language":"en","icontime":false,"legacy_guid":"19558","featured_id":false,"subscribed":false},{"guid":"100000000000019565","type":"user","subtype":false,"time_created":"1356598763","time_updated":"1356598763","container_guid":"0","owner_guid":"100000000000000000","site_guid":"1","access_id":"2","name":"Petra Guina Goddard","username":"petraguinagoddard","language":"en","icontime":false,"legacy_guid":"19565","featured_id":false,"subscribed":false},{"guid":"100000000000019572","type":"user","subtype":false,"time_created":"1356598774","time_updated":"1356598775","container_guid":"0","owner_guid":"100000000000000000","site_guid":"1","access_id":"2","name":"Em West","username":"emwest","language":"en","icontime":false,"legacy_guid":"19572","featured_id":false,"subscribed":false},{"guid":"100000000000019579","type":"user","subtype":false,"time_created":"1356598930","time_updated":"1356599435","container_guid":"0","owner_guid":"100000000000000000","site_guid":"1","access_id":"2","name":"Lyndon Britts","username":"raapidd","language":"en","icontime":false,"legacy_guid":"19579","featured_id":false,"subscribed":false},{"guid":"100000000000019586","type":"user","subtype":false,"time_created":"1356599011","time_updated":"1357673291","container_guid":"0","owner_guid":"100000000000000000","site_guid":"1","access_id":"2","name":"Elena Gagliardi","username":"elenagagliardi","language":"en","icontime":false,"legacy_guid":"19586","featured_id":false,"subscribed":false},{"guid":"100000000000019605","type":"user","subtype":false,"time_created":"1356599765","time_updated":"1356599765","container_guid":"0","owner_guid":"100000000000000000","site_guid":"1","access_id":"2","name":"Amna Kazi","username":"amnakazi","language":"en","icontime":false,"legacy_guid":"19605","featured_id":false,"subscribed":false},{"guid":"100000000000019612","type":"user","subtype":false,"time_created":"1356599809","time_updated":"1356599809","container_guid":"0","owner_guid":"100000000000000000","site_guid":"1","access_id":"2","name":"Egl? Fisien?","username":"egl?fisien?","language":"en","icontime":false,"legacy_guid":"19612","featured_id":false,"subscribed":false},{"guid":"100000000000019619","type":"user","subtype":false,"time_created":"1356599964","time_updated":"1356599964","container_guid":"0","owner_guid":"100000000000000000","site_guid":"1","access_id":"2","name":"Gurbaz Singh Tiwana","username":"gurbazsinghtiwana","language":"en","icontime":false,"legacy_guid":"19619","featured_id":false,"subscribed":false},{"guid":"100000000000019626","type":"user","subtype":false,"time_created":"1356600088","time_updated":"1356600089","container_guid":"0","owner_guid":"100000000000000000","site_guid":"1","access_id":"2","name":"Crystal Regina Nadal","username":"crystalreginanadal","language":"en","icontime":false,"legacy_guid":"19626","featured_id":false,"subscribed":false},{"guid":"100000000000019648","type":"user","subtype":false,"time_created":"1356601197","time_updated":"1356601267","container_guid":"0","owner_guid":"100000000000000000","site_guid":"1","access_id":"2","name":"Yun Astronaut","username":"yunastronaut","language":"en","icontime":false,"legacy_guid":"19648","featured_id":false,"subscribed":false}],"load-next":"100000000000019648","load-previous":""};
		//$scope.entities = data.entities;		
		
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
			
			$scope.entities.forEach(function(item, index, array){
				if(item.guid == entity.guid){
					array.splice(index, 1);
					$scope.passed.push(entity);
				} 
			});
			
			if($scope.entities.length  < 5){
				console.log('loading new...');
				Cacher.put('entities.cb', Date.now());
				$scope.load();
			}
			
			//$scope.$digest();
		}
		
		/**
		 * User specific actions
		 */
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
		
		/**
		 * Object specific actions
		 */
		$scope.pass = function(entity){
			//remove the entity from the list
			$scope.pop(entity);

			//notify the suggested that we have decided to ignore
			Client.post('api/v1/entities/suggested/pass/' + entity.guid, {}, function(){}, function(){});
			
			//show a quick ui confirmation
			$ionicLoading.show({
				template: '<i class="icon" style="font-size:48px">pass</i>'
				});
			$timeout(function(){
				$ionicLoading.hide();
				}, 300);
		};
		
		$scope.down = function(entity){
			//remove the entity from the list
			$scope.pop(entity);
			
			Client.put('api/v1/thumbs/'+entity.guid+'/down', {}, 
					function(success){},
					function(error){});
			
			$ionicLoading.show({
				template: '<i class="icon ion-thumbsdown" style="font-size:90px"></i>'
				});
			$timeout(function(){
				$ionicLoading.hide();
				}, 300);
		};
		
		$scope.up = function(entity){
			//remove the entity from the list
			$scope.pop(entity);
			
			Client.put('api/v1/thumbs/'+entity.guid+'/up', {}, 
					function(success){},
					function(error){});
			
			$ionicLoading.show({
				template: '<i class="icon ion-thumbsup" style="font-size:90px"></i>'
				});
			$timeout(function(){
				$ionicLoading.hide();
				}, 300);
		}

    }

    ctrl.$inject = ['$scope', '$stateParams', 'Client', 'Cacher', '$ionicSlideBoxDelegate', '$ionicScrollDelegate', '$ionicLoading', '$timeout'];
    return ctrl;
    
});