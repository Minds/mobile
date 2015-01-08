/*global define*/

define(['angular'], function (angular) {
    "use strict";

    var directive = function ($ionicScrollDelegate, $interval, Client, $sce, $ionicLoading, $timeout, $ionicGesture, $ionicPosition  ) {
	 	return {
       		restrict: 'AE',
			link: function(scope, el, attrs) {

				
				
            	scope.showVideo = false;
            	var playing = false;
            	
            	attrs.$observe('entity', function(entity){
					entity = JSON.parse(entity);
					scope.srcFull = $sce.trustAsResourceUrl(entity.src['360.mp4']);
				});

				/**
				 * Initialises the playback.
				 */
				scope.play = function(){
					scope.$digest();
					$ionicLoading.show({
						template: 'Loading...'
					});
					$timeout(function(){
						$ionicLoading.hide();
					}, 3000);
					
					console.log(scope.srcFull);
					    
					if(!scope.srcFull){
						console.log('downloading src info');
						Client.get('api/v1/archive/'+attrs.guid, {}, 
	    					function(success){
	    						
	    						scope.showVideo = true;
	    						scope.srcFull = $sce.trustAsResourceUrl(success.transcodes['360.mp4']);
	    						scope.$digest();
	    						
	    						video = angular.element(el.find('video'));
	    						video[0].play();
	    						
	    					},
	    					function(error){
	    						console.log(error);
	    					});
    				} else {

    					scope.showVideo = true;

    					video = angular.element(el.find('video'));
	 					video[0].play();
	 					video[0].onplaying  = function(){
	 						$ionicLoading.hide();
	 					};
	 					video[0].onerror = function(){
	 						alert('error in playing');
	 					};
	 					
    				}
				};
				
            	el.on('click', scope.play);
            	
            	var element = angular.element(document.querySelector('ion-content'));
				
				$ionicGesture.on('dragup', function(){ 

					var scroll = $ionicScrollDelegate.getScrollPosition();
            		var position = el.parent().prop('offsetTop');
            		var diff = (scroll.top - position);
            		var src = "";
            		if(diff > -250 && diff < 250 && !scope.srcFull){

        				Client.get('api/v1/archive/'+attrs.guid, {}, 
        					function(success){
        						scope.showVideo = true;
        						scope.srcFull = $sce.trustAsResourceUrl(success.transcodes['360.mp4']);
            				},
            				function(error){
            					console.log(error);
            				});
            			
            		} 
				}, element);
    
			}
       	 };
    };

    directive.$inject = ['$ionicScrollDelegate', '$interval', 'Client', '$sce', '$ionicLoading', '$timeout', '$ionicGesture', '$ionicPosition'];
    return directive;
});