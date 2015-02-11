/*global define*/

define(['angular'], function (angular) {
    "use strict";

    var directive = function ($ionicScrollDelegate, $interval, Client, $sce, $ionicLoading, $timeout, $ionicGesture, $ionicPosition, $ionicPlatform  ) {
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
									
					
					if(!scope.srcFull){
						console.log('downloading src info');
						Client.get('api/v1/archive/'+attrs.guid, {}, 
	    					function(success){
	    						
	    						scope.showVideo = true;
	    						scope.srcFull = $sce.trustAsResourceUrl(success.transcodes['360.mp4']);
	    						console.log(scope.srcFull);
	    						scope.$digest();
	    						
	    						var video = el[0].querySelector('#video');
	    						console.log(video);
	    						video.play();
	    						video.onended = function(){
	    	 						scope.showVideo = false;
	    	 					}
	    					},
	    					function(error){
	    						console.log(error);
	    					});
    				} else {

    					scope.showVideo = true;
    					if ( device.platform == 'android' || device.platform == 'Android' ){
    						scope.showVideo = false;
    						scope.$apply();
    					}
    					
    					
    					var video = el[0].querySelector('#video');
    					//console.log('video is..');
    					//console.log(el);
    					//return true;
	 					video.play();
	 					video.webkitEnterFullscreen();
	 					video.onplaying  = function(){
	 						$ionicLoading.hide();
	 					};
	 					video.onerror = function(){
	 						alert('error in playing');
	 					};
	 					video.onended = function(){
	 						scope.showVideo = false;
	 					}
	 					
	 					video.addEventListener('webkitendfullscreen', function (e) { 
	 						scope.showVideo = false;
	 						scope.$apply();
	 						console.log('ended full screen');
	 					});
	 					video.addEventListener('webkitfullscreenchange', function (e) { 
	 						scope.showVideo = false;
	 						scope.$apply();
	 						if(!document.webkitIsFullScreen){
	 							video.pause();
	 						}
	 					});
	 					video.addEventListener('ended', function(e){
	 						scope.showVideo = false;
	 						scope.$apply();
	 					}, false);
	 					
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
        						scope.showVideo = false;
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

    directive.$inject = ['$ionicScrollDelegate', '$interval', 'Client', '$sce', '$ionicLoading', '$timeout', '$ionicGesture', '$ionicPosition', '$ionicPlatform'];
    return directive;
});