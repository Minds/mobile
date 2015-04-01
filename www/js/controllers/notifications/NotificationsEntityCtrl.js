/**
 * Minds::mobile
 * Notifications controller
 * 
 * @author Mark Harding
 */

define(function () {
    'use strict';

    function ctrl($rootScope, $scope, $stateParams,  $ionicScrollDelegate, Cacher, Client, storage, $ionicPopover, $ionicLoading, $ionicActionSheet) {
    	
    	console.log('guid is... ' + $stateParams.guid);
    	
    	$scope.guid = '';
    	$scope.cb = Date.now();
    	$scope.offset = "";
    	$scope.hasMore = false;
    	$scope.comments = [];
    	$scope.comment = {};
    	$scope.comment.body = '';
			
		$scope.init = function(){
			Client.get('api/v1/entities/entity/' + $stateParams.guid, { cb: $scope.cb }, 
			function(data){
		
    			$scope.entity = data.entity;
    			$scope.activity = data.entity;
    			    			
    			$scope.guid = $scope.entity.guid;
    			
    			if($scope.entity.type == 'activity'){
    				if($scope.entity.entityObj){
    					$scope.guid = $scope.entity.entityObj.guid;
    				}
    			}
    			
    			$scope.hasMore = true;
    			$scope.offset = "";
    			$scope.cb = Date.now();
    			$scope.comments = [];
    			$scope.getComments();
    	
    		}, 
    		function(error){ 
    			console.log(error);
    		});
		};
		$scope.init();
		
		$scope.inprogress = false;
		$scope.getComments = function(){
			if($scope.inprogress){
				return false
			}
			$scope.inprogress = true;
			/**
			 * Gather comments
			 */
			Client.get('api/v1/comments/' + $scope.guid, { 
						cb: $scope.cb,
						limit:12,
						offset: $scope.offset
					}, 
					function(data){
					
						$scope.inprogress = false;

						if(!data.comments || data.comments.length == 0){
							$scope.hasMore = false;
							return false;
						}
										
		    			$scope.comments = $scope.comments.concat(data.comments);
		    			$scope.offset = data['load-next'];
		    			
		    			if($scope.offset == null){
		    				$scope.hasMore = false;
		    			}
		    			
		    			$scope.$broadcast('scroll.infiniteScrollComplete');
		    		}, 
		    		function(error){ 
		    			$scope.inprogress = false;
		    		});
			
		};
		
		$scope.submit = function(){
			if(!$scope.comment.body){
				return;
			}
			
			Client.post('api/v1/comments/' + $scope.guid, { 
					comment: $scope.comment.body
				}, 
				function(data){
					
	    			$scope.comments.push(data.comment);
	    			
	    	
	    		}, 
	    		function(error){ 
	    		});
			$scope.comment.body = '';
		};
		
		$scope.removeComment = function(guid){
			
			$ionicActionSheet.show({
			     buttons: [
			     ],
			     destructiveText: 'Delete',
			     destructiveButtonClicked: function(){
			    	 if(confirm("are you sure?")){
			    		 
			    		 Client.delete('api/v1/comments/' + guid, function(success){
			    			 
			    		 });
			    		 $scope.comments.forEach(function(item, index, array){
								if(item.guid == guid){
									console.log('removed');
									array.splice(index, 1);
								}
							});
			    	 }
			    	 return true;
			     },
			     cancelText: 'Cancel',
			     cancel: function() {
			          // add cancel code..
			        }
			});
			
			
		};
					
		
    }

    ctrl.$inject = ['$rootScope', '$scope', '$stateParams', '$ionicScrollDelegate', 'Cacher', 'Client', 'storage', '$ionicPopover', '$ionicLoading', '$ionicActionSheet'];
    return ctrl;
    
});