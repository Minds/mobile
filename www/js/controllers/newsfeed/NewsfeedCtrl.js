/**
 * Minds::mobile
 * Newsfeed controller
 * 
 * @author Mark Harding
 */

define(function () {
    'use strict';

    function ctrl($rootScope, $scope, $state, $stateParams, NewsfeedAPI, $filter, $ionicScrollDelegate, Cacher, Client, storage, $ionicPopover, $ionicLoading, $timeout) {

		//cordova.plugins.Keyboard.disableScroll(false);

    	$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){ 
			if(toState.name == fromState.name){
				$ionicScrollDelegate.scrollTop();
				$scope.refresh();
			}
		});
		
		if(Cacher.get('newsfeed.items')){
			$scope.newsfeedItems = Cacher.get('newsfeed.items');
		}else{
    		$scope.newsfeedItems =  [];
    	}
    	
    	if(Cacher.get('newsfeed.next'))
    		$scope.next = Cacher.get('newsfeed.next');
    	else
    		$scope.next  = "";
    	
    	$scope.hasMoreData = true;
    	
    	if(Cacher.get('newsfeed.cachebreaker')){
    		$scope.cachebreaker = Cacher.get('newsfeed.cachebreaker');
    	} else {
    		$scope.cachebreaker = 0;
    	}

    	/**
    	 * Load more posts
    	 */
    	$scope.loadMore = function(){
    		console.log('==== loading more ====');
    	
    		if(!$scope.hasMoreData)
    			return;
    		
    		NewsfeedAPI.all({ limit: 12, offset: $scope.next, cachebreaker: $scope.cachebreaker }, 
    			function(data){
    		
	    			if(!data.activity){
	    				$scope.hasMoreData = false;
	    				return false;
	    			} else {
	    				$scope.hasMoreData = true;
	    			};
	    			
	    			$scope.newsfeedItems = $scope.newsfeedItems.concat(data.activity);
	    			//if($scope.newsfeedItems.length < 30){
	    				Cacher.put('newsfeed.items', $scope.newsfeedItems);
	    			//} else {
	    			//	Cacher.put('newsfeed.items', data.activity);
	    			//}
	
	    			$scope.next = data['load-next'];
	    			Cacher.put('newsfeed.item', $scope.next);
	    			
	    			$scope.$broadcast('scroll.infiniteScrollComplete');
	
	    		}, 
	    		function(error){ 
	    			alert('error'); 
	    		});
	    		
    	};
		
		$scope.refresh = function(){
			
			NewsfeedAPI.all({ limit: 12, offset: '', cache_break: Date.now() }, 
				function(data){
    		
	    			$scope.newsfeedItems = data.activity;
	    			Cacher.put('newsfeed.items', $scope.newsfeedItems );
	
	    			$scope.next = data['load-next'];
	    			
	    			Cacher.put('newsfeed.cachebreaker', Date.now);
	    			
	    			$scope.$broadcast('scroll.refreshComplete');
	
	    		}, 
	    		function(error){ 
	    			alert('error'); 
	    		});
			
		};
		
		
		/**************************
		 **** Newsfeed actions ****
		 *************************/
		/**
		 * Thumb up an activity
		 */
		$scope.thumbsUp = function(guid){

			Client.put('api/v1/thumbs/'+guid+'/up', {},
				function(success){
					$scope.newsfeedItems.forEach(function(item, index, array){
						if(item.guid == guid){
							if(!array[index].hasOwnProperty('thumbs:up:user_guids') || !array[index]['thumbs:up:user_guids'])
								array[index]['thumbs:up:user_guids'] = [];
								
							if(array[index]['thumbs:up:user_guids'].indexOf(storage.get('user_guid')) > -1){
								var pos = array[index]['thumbs:up:user_guids'].indexOf(storage.get('user_guid'));
								array[index]['thumbs:up:user_guids'].splice(pos, 1);
								array[index]['thumbs:up:count'] = array[index]['thumbs:up:count'] -1;
							} else {
								array[index]['thumbs:up:user_guids'].push(storage.get('user_guid'));
								array[index]['thumbs:up:count'] = array[index]['thumbs:up:count'] +1;
							}
						}
					});
				},
				function(error){
					alert('failed..');
				});
				
			$ionicLoading.show({
				template: '<i class="icon ion-thumbsup" style="font-size:90px"></i>'
				});
			$timeout(function(){
				$ionicLoading.hide();
				}, 1000);
		};
		
		/**
		 * Thumb down an activity
		 */
		$scope.thumbsDown = function(guid){
			Client.put('api/v1/thumbs/'+guid+'/down', {},
				function(success){
					$scope.newsfeedItems.forEach(function(item, index, array){
						if(item.guid == guid){
							if(!array[index].hasOwnProperty('thumbs:down:user_guids') || !array[index]['thumbs:down:user_guids'])
								array[index]['thumbs:down:user_guids'] = [];
							
							if(array[index]['thumbs:down:user_guids'].indexOf(storage.get('user_guid')) > -1){
								var pos = array[index]['thumbs:up:user_guids'].indexOf(storage.get('user_guid'));
								array[index]['thumbs:down:user_guids'].splice(pos, 1);
							} else {
								array[index]['thumbs:down:user_guids'].push(storage.get('user_guid'));
							}
						}
					});
				},
				function(error){
					alert('failed..');
				});
			$ionicLoading.show({
				template: '<i class="icon ion-thumbsdown" style="font-size:90px"></i>'
				});
			$timeout(function(){
				$ionicLoading.hide();
				}, 1000);
		};
		
		/**
		 * Load comments
		 */
		$scope.commentsData = {};
		$scope.loadComments = function(guid, $event){
			$scope.comments.show($event);
			$scope.commentsData = {}; 
			
			/**
			 * Now load the comments
			 */
			Client.get('api/v1/comments/'+guid, {
					cachebreaker: Date.now
				}, 
				function(success){
					console.log('success for ' + guid );
					console.log(success);
					$scope.commentsData = success.comments;
				}, function(error){
					console.log('error');
				});
							
		};
		$ionicPopover.fromTemplateUrl('templates/comments/list.html', {
		    scope: $scope,
		  }).then(function(popover) {
		    $scope.comments = popover;
		  });
		
		/**
		 * Remind an activity
		 */
		$scope.remind = function(guid, $event){
			alert('sorry, not done this yet');
		};
		
		/**
		 * Init the composer popover
		 */
		$scope.composerData = {};
		$ionicPopover.fromTemplateUrl('templates/newsfeed/compose.html', {
		    scope: $scope,
		  }).then(function(popover) {
		    $scope.composer = popover;
		  });
		  
		var posting;
		$scope.post = function(){
			if(posting)
				return false;
				
			console.log("posting");
			$ionicLoading.show({
		      template: 'Please wait a moment...'
		    });
		    var posting = true;

    		NewsfeedAPI.post({
    			message: $scope.composerData.message
	    	}, function(success){
	    		$scope.refresh();
	    		$scope.message = '';
	    		$scope.composer.hide();
	    		
	    		$ionicLoading.hide();
	    		posting = false;
	    	}, function(error){
	    		alert('there was an error and we couldn\'t save!');
	    		$ionicLoading.hide();
	    		posting = false;
	    	});
	    	
		};
		
		$scope.remove = function(guid){
			console.log('api/v1/newsfeed/'+guid);
			Client.delete('api/v1/newsfeed/'+guid, {
					cachebreaker: Date.now
				}, 
				function(success){
					console.log(success);
					$scope.newsfeedItems.forEach(function(item, index, array){
						if(item.guid == guid){
							console.log('removed');
							array.splice(index, 1);
						}
					});
				}, function(error){
					console.log('error');
				});
		};
		
		
		$scope.loadNotifications = function(){
			$state.go('tab.more-notifications', {}, {reload:true});
		};
		
		$scope.openUrl = function(url){
			window.open(url, '_blank', {toolbarposition:'top'});
		};
		
    }

    ctrl.$inject = ['$rootScope', '$scope', '$state', '$stateParams', 'NewsfeedAPI', '$filter', '$ionicScrollDelegate', 'Cacher', 'Client', 'storage', '$ionicPopover', '$ionicLoading', '$timeout'];
    return ctrl;
    
});