/**
 * Minds::mobile
 * Channel Controller
 * 
 * @author Mark Harding
 */

define(function () {
    'use strict';

    function ctrl($scope, $stateParams) {

		$scope.video = function(){
			navigator.device.capture.captureVideo(function(mediaFiles){
				console.log('capture complete');
				var i, path, len;
			    for (i = 0, len = mediaFiles.length; i < len; i += 1) {
			    	var mediafile = mediaFiles[i];
			    	console.log(mediafile);
			        path = mediafile.fullPath;
			        console.log(path);
			    }
			}, function(){
				console.log('capture failed');
			}, {limit: 2, duration:30});
		};
		
		$scope.photo= function(){
			navigator.device.capture.captureImage(function(mediaFiles){
				var i, path, len;
			    for (i = 0, len = mediaFiles.length; i < len; i += 1) {
			        path = mediaFiles[i].fullPath;
			        console.log(path);
			    }
			}, function(){
				console.log('capture failed');
			}, {limit: 1});
		};
       
    }

    ctrl.$inject = ['$scope', '$stateParams'];
    return ctrl;
    
});