/**
 * Minds::mobile
 * Discover
 * 
 * @author Mark Harding
 */

define(function () {
    'use strict';

    function ctrl($scope, $stateParams, Client, Cacher, $ionicPopup, $ionicScrollDelegate, $ionicLoading, $ionicModal, $ionicActionSheet, $timeout) {

		$scope.entities = [];
		if(Cacher.get('entities.next')){
			$scope.next = Cacher.get('entities.next');
		} else {
			$scope.next = "";
		}
		$scope.query = {
				string: ""
		};
		$scope.passed = []; //we keep this so that on loading new items, there are not conflicts. 
		$scope.acted = [];
		
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
			//run on next digest
			$timeout($scope.load); 
		};
		
		$scope.changeType = function(type){
			if($scope.filter == 'search'){
				$scope.type = type;
				$scope.search();
				return true;
			}
			$scope.query.string = '';
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

			Client.get('api/v1/entities/' + $scope.filter + '/' + type + '/' + subtype, { 
				limit: 16, 
				offset: $scope.next, 
				cachebreaker: $scope.cachebreaker 
				}, 
    			function(data){
					console.log('got it!');

					if(!data.entities){
	    				$scope.hasMoreData = false;
	    				return false;
	    			} else {
	    				$scope.hasMoreData = true;
	    			}
	    			
					if($scope.entities.length == 0){
						$scope.entities = data.entities;
					} else {
						$scope.entities = $scope.entities.concat(data.entities);
					}
	    			
	    			//scan for duplicates..
	    			/*$scope.passed.forEach(function(item, index, array){
	    				$scope.entities.forEach(function(eitem, eindex, earray){
	    					if(item == eitem){
	    						console.log('found duplicate, attempting to remove');
	    						earray.splice(index, 1);
	    					}
	    				});
	    			});*/
	    			
	    			//Cacher.put('entities.data', $scope.entities);
	
	    			$scope.next = data['load-next'];
	    			//Cacher.put('entities.next', $scope.next);
	    			
	    			//Cacher.put('entities.cb', Date.now());
					if($scope.filter == 'suggested'){
						$scope.cachebreaker = Date.now();
					}
	    			
	    			//$scope.$broadcast('scroll.infiniteScrollComplete');
	    		}, 
	    		function(error){ 
	    			alert('error'); 
	    		});
	    	
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
		
		$scope.search = function(){
			$scope.next = "";
			$scope.filter = 'search';
			if($scope.type != 'channel'){
				var subtype = $scope.type;
				var type = 'object';
			} else {
				var subtype = '';
				var type = 'user';
			}
			$timeout(function(){
				
			
				if($scope.query.string.length > 2){
					$scope.entities = [];
					
					Client.get('search', { 
						type: type,
						subtype: subtype,
						q: $scope.query.string,
						limit: 24, 
						offset: $scope.next, 
						cachebreaker: Date.now(),
						view: 'json'
						}, 
		    			function(data){
							
							if(type == 'user'){
								$scope.entities = data[type][0];
								console.log($scope.entities);
							} else {
								$scope.entities = data[type][subtype];
							}
							
							
			    			Cacher.put('entities.data', $scope.entities);
			
			    			$scope.next = data['load-next'];
			    			//Cacher.put('entities.next', $scope.next);
			    			
			    			$scope.$broadcast('scroll.infiniteScrollComplete');
			    		}, 
			    		function(error){ 
			    			alert('error'); 
			    		});
				}
			});
			
		};
		
		$scope.pop = function(entity){
			
			$scope.entities.forEach(function(item, index, array){
				if(item.guid == entity.guid){
					array.splice(index, 1);
					$scope.passed.push(entity);
				} 
			});
			
			if($scope.entities.length < 3){
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
			
			if(entity.subscriber){
				$ionicPopup.alert({
				     title: 'Match!',
				     subTitle: entity.name + ' subscribed to you too!',
				     buttons: [
		               
		               {
		                 text: '<b>Send Message</b>',
		                 type: 'button-positive',
		                 onTap: function(e) {
		                	 window.location.href = "#/tab/gatherings/conversations/" + entity.guid + '/' + entity.name;
		                 }
		               },
		               
		               { text: 'Continue...' },
		             ]
				   });
			}
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
		
		$scope.boost = function(entity){
			$ionicModal.fromTemplateUrl('templates/wallet/boost.html', {
	 		    scope: $scope,
	 		    animation: 'slide-in-up'
	 		  }).then(function(modal) {
	 		    $scope.modal = modal;
	 		    $scope.type = 'suggested';
	 		    $scope.entity = entity;
	 		    $scope.modal.show();
	 		  });
			
		};
		
		$scope.openActions = function(entity){
			$ionicActionSheet.show({
			     buttons: [
			       { text: 'Boost' },
			       { text: '<b>Share</b>' },
			       { text: 'Report this' }
			     ],
			     cancelText: 'Cancel',
			     cancel: function() {
			          // add cancel code..
			        },
			     buttonClicked: function(index) {
			    	 switch(index){
			    	 	case 0:
			    	 		$ionicModal.fromTemplateUrl('templates/wallet/boost.html', {
			    	 		    scope: $scope,
			    	 		    animation: 'slide-in-up'
			    	 		  }).then(function(modal) {
			    	 		    $scope.modal = modal;
			    	 		    $scope.type = 'suggested';
			    	 		    $scope.entity = entity;
			    	 		    $scope.modal.show();
			    	 		  });
			    	 		  
			    	 		break;
			    	 	case 1:
			    	 		//cordova.plugins.clipboard.copy($rootScope.node_url + '/newsfeed/' + guid);
			    	 		$ionicLoading.show({
			    				template: '<p> Copied to clipboard </p>'
			    				});
			    			$timeout(function(){
			    				$ionicLoading.hide();
			    				}, 1000);
			    	 		break;
			    	 	case 3:
			    	 		window.location.href = "mailto:report@minds.com?subject=Report " + entity.guid + "&body=This content violates the terms and conditions";
			    	 }
			       return true;
			     }
			   });
			
		}

    }

    ctrl.$inject = ['$scope', '$stateParams', 'Client', 'Cacher', '$ionicPopup', '$ionicScrollDelegate', '$ionicLoading', '$ionicModal',  '$ionicActionSheet', '$timeout'];
    return ctrl;
    
});