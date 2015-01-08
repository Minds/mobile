/*global define*/

define(['angular'], function (angular) {
    "use strict";

    var directive = function ($ionicScrollDelegate, $interval, Client, $sce, $ionicLoading, $timeout, $ionicGesture, $ionicPosition  ) {
	 	return {
       		restrict: 'AE',
			link: function(scope, el, attrs) {

				/**
				 * Initialises the playback.
				 */
				scope.play = function(){

					$ionicLoading.show({
						template: 'Loading...'
					});
					$timeout(function(){
						$ionicLoading.hide();
					}, 3000);
					
					console.log(scope.srcFull);
					    
					if(!scope.srcFull){

						Client.get('api/v1/archive/'+attrs.guid, {}, 
	    					function(success){
	    						
	    						scope.showVideo = true;
	    						scope.srcFull = $sce.trustAsResourceUrl(success.transcodes['360.mp4']);
	    						scope.$apply();
	    						
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
	 					
    				}
				};
				
            	el.on('click', scope.play);
            	
            	scope.showVideo = false;
            	var playing = false;
            	
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