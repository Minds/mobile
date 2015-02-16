/*global define*/

define(['angular'], function (angular) {
    "use strict";

    var directive = function ($ionicScrollDelegate, $interval, Client, $sce, $ionicLoading, $timeout, $ionicGesture, $ionicPosition, $ionicPlatform  ) {
	 	return {
       		restrict: 'AE',
			link: function(scope, el, attrs) {

            	scope.showVideo = false;
            	var playing = false;
            	
            	attrs.$observe('playsrc', function(src){
            		scope.srcFull = $sce.trustAsResourceUrl(src);
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
					
					scope.showVideo = true;
					if ( device.platform == 'android' || device.platform == 'Android' ){
						scope.showVideo = false;
						scope.$apply();
					}
					
					var video = el[0].querySelector('#video');
					video.src = scope.srcFull;
					
					video.play();
					video.webkitRequestFullscreen();
					//video.webkitEnterFullscreen();
					
 					//video.webkitEnterFullscreen();
 					
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
	 					
				};
				
            	el.on('click', scope.play);

			}
       	 };
    };

    directive.$inject = ['$ionicScrollDelegate', '$interval', 'Client', '$sce', '$ionicLoading', '$timeout', '$ionicGesture', '$ionicPosition', '$ionicPlatform'];
    return directive;
});