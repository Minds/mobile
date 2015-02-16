/**
 * Minds::mobile
 * Newsfeed views
 * 
 * @author Mark Harding
 */

define(function () {
    'use strict';

    function ctrl($scope, $stateParams, Client) {
    	
    	$scope.guid = "";
    	$scope.cb = Date.now();
    	$scope.activity = {};
    	$scope.comments = [];
    	$scope.comment = {};
    	$scope.comment.body = '';
    	
    	Client.get('api/v1/newsfeed/single/' + $stateParams.guid, {},
        	function(success){
    			$scope.activity = success.activity;
    			if($scope.activity.entityObj){
					$scope.guid = $scope.activity.entityObj.guid;
				} else {
					$scope.guid = $scope.activity.guid;
				}
    			
    			$scope.getComments();
    		});
    	
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
		    			$scope.inprogress = false;
		    		}, 
		    		function(error){ 
		    			alert('error'); 
		    			$scope.inprogress = false;
		    		});
			
		}
		
		$scope.submit = function(){
			
			
			Client.post('api/v1/comments/' + $scope.guid, { 
					comment: $scope.comment.body
				}, 
				function(data){
					
	    			$scope.comments.push(data.comment);
	    			$scope.cb = Date.now();
	    	
	    		}, 
	    		function(error){ 
	    			alert('error'); 
	    		});
			$scope.comment.body = '';
		}
    }

    ctrl.$inject = ['$scope', '$stateParams', 'Client'];
    return ctrl;
    
});