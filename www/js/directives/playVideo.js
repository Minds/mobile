/*global define*/

define(['angular'], function (angular) {
    "use strict";

    var directive = function ($ionicScrollDelegate, $interval, Client, $sce, $ionicLoading) {
	 	return {
       		restrict: 'AE',
			link: function(scope, el, attrs) {
				//console.log('hello from playvideo');
				
				/**
				 * Initialises the playback.
				 */
				scope.play = function(){

					if(!scope.srcFull){
					
						Client.get('api/v1/archive/'+attrs.guid, {}, 
	    					function(success){
	    						
	    						scope.showVideo = true;
	    						scope.srcFull = $sce.trustAsResourceUrl(success.transcodes['360.mp4']);
	    						
	    						video = angular.element(el.find('video'));
	    						video[0].play();
	    						
	    					},
	    					function(error){
	    						console.log(error);
	    					});
    				} else {
    				
    					 $ionicLoading.show({
					      template: 'Loading...'
					    });
    				
    					scope.showVideo = true;
    					video = angular.element(el.find('video'));
	 					video[0].play();
	 					video[0].onplaying  = function(){
	 						$ionicLoading.hide();
	 					};
    				}
				};
				
            	el.on('touch', scope.play);
            	
            	scope.showVideo = false;
            	var playing = false;
            	
            	/**
            	 * Get the src info when a user is hovering over
            	 */
            	stop = $interval(function() {
            		//get the scroll position
            		var scroll = $ionicScrollDelegate.getScrollPosition();
            		var position = el.prop('offsetTop');
            		var src = "";

            		if((scroll.top - position) < 100 && !scope.srcFull){

        				Client.get('api/v1/archive/'+attrs.guid, {}, 
        					function(success){
        						
        						scope.showVideo = true;
        						scope.srcFull = $sce.trustAsResourceUrl(success.transcodes['360.mp4']);
   
            				},
            				function(error){
            					console.log(error);
            				});
            			
            		} 
            	},600);
            	
            	scope.$on('$destroy', function() {
            		//	$interval.cancel(stop);
            	});
			}
       	 };
    };

    directive.$inject = ['$ionicScrollDelegate', '$interval', 'Client', '$sce', '$ionicLoading'];
    return directive;
});