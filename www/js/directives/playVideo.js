/*global define*/

define(['angular'], function (angular) {
    "use strict";

    var directive = function ($ionicScrollDelegate, $interval, Client, $sce) {
	 	return {
       		restrict: 'AE',
			link: function(scope, el, attrs) {
				//console.log('hello from playvideo');
            	el.on('click', function(){ 
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
            		
            		
            	});
            	scope.showVideo = false;
            	var playing = false;
            	
            	/**
            	 * To be revisted, autoplaying videos... not supported without native plugin though
            	 */
            	/*stop = $interval(function() {
            		//get the scroll position
            		var scroll = $ionicScrollDelegate.getScrollPosition();
            		var position = el.prop('offsetTop');
            		var src = "";

            		if((scroll.top - position) < 100){
            			if(!playing){
            				playing=true;
            				console.log(attrs.guid);
            				Client.get('api/v1/archive/'+attrs.guid, {}, 
            					function(success){
            						
            						scope.showVideo = true;
            						scope.src = $sce.trustAsResourceUrl(success.transcodes['360.mp4']);
            						
            						video = angular.element(el.find('video'));
            						video[0].play();
            	

            						
            					},
            					function(error){
            						console.log(error);
            					});
            			} else {
            				video = angular.element(el.find('video'));
            				video[0].play();
            			}
            		} else {
            			playing = false;
            			//var video = document.getElementById("video");
            			video = angular.element(el.find('video'));
            			video[0].pause();
            		}
            	},600);*/
            	
            	scope.$on('$destroy', function() {
            		//$interval.cancel(stop);
            		video = angular.element(el.find('video'));
            		video[0].pause();
            	});
			}
       	 };
    };

    directive.$inject = ['$ionicScrollDelegate', '$interval', 'Client', '$sce'];
    return directive;
});