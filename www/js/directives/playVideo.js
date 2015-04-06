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
					
					if ( device.platform == 'android' || device.platform == 'Android' || device.platform == "amazon-fireos" ){
						StatusBar.hide();
					}
					
					$ionicLoading.show({
						template: 'Loading...'
					});
					$timeout(function(){
						$ionicLoading.hide();
					}, 5000);
					
					scope.showVideo = true;
					if ( device.platform == 'android' || device.platform == 'Android' ){
						scope.showVideo = false;
						scope.$apply();
					}
					
					var video = el[0].querySelector('#video');
					video.src = scope.srcFull;
					console.log("video src == " + video.src);
					console.log("trying to play:: " + video.src);
					video.load();
					video.play();
					video.webkitRequestFullscreen();
					//video.enterFullscreen();
 					
 					video.onplaying  = function(){
 						$ionicLoading.hide();
 					};
 					video.onerror = function(){
 						$ionicLoading.hide();
 						alert('error in playing');
 					};
 					
 					video.addEventListener('webkitendfullscreen', function (e) { 
 						video.pause();
 						scope.showVideo = false;
 						scope.$apply();
 						console.log('ended full screen');
 						StatusBar.show();
 					});
 					video.addEventListener('webkitfullscreenchange', function (e) { 
 						scope.showVideo = false;
 						scope.$apply();
 						
 						if(!document.webkitIsFullScreen){
 							video.pause();
 							StatusBar.show();
 						}
 					});
 					video.addEventListener('ended', function(e){
 						video.pause();
 						//document.webkitExitFullscreen();
 						scope.showVideo = false;
 						scope.$apply();
 						StatusBar.show();
 						}, false);
	 					
				};
				
            	el.on('click', scope.play);

			}
       	 };
    };

    directive.$inject = ['$ionicScrollDelegate', '$interval', 'Client', '$sce', '$ionicLoading', '$timeout', '$ionicGesture', '$ionicPosition', '$ionicPlatform'];
    return directive;
});