/**
 * Minds::mobile
 * Channel Controller
 * 
 * @author Mark Harding
 */

define(function () {
    'use strict';

    function ctrl($scope, $stateParams, $rootScope, Client, OAuth) {

		$scope.video = function(){
			navigator.device.capture.captureVideo(function(mediaFiles){
				console.log('capture complete');
				var i, path, len;
			    for (i = 0, len = mediaFiles.length; i < len; i += 1) {
			    	var mediafile = mediaFiles[i];
			        path = mediafile.fullPath;
			        console.log(path);
			        
			        var options = new FileUploadOptions();
			        var ft = new FileTransfer();
			        
			    //    ft.upload(path, encodeURI($rootScope.node_url + 'api/v1/archive'), function(success){console.log(success);}, function(error){console.log(error);}, OAuth.buildParams(options));
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
			        
			        var ft = new FileTransfer();
			        var options = new FileUploadOptions();
			        
			      	ft.upload(path, encodeURI($rootScope.node_url + 'api/v1/archive'), 
			      		function(success){
			      			console.log('success');
			      			console.log(success);
			      		}, 
			      		function(error){
			      			console.log('error');
			      			console.log(error);
			      		}, 
			      		OAuth.buildParams(options)
			      	);
 
			    }
			}, function(){
				console.log('capture failed');
				alert('Uploading to Minds will be here soon!');
			}, {limit: 1});
		};
       
    }

    ctrl.$inject = ['$scope', '$stateParams', '$rootScope', 'Client', 'OAuth'];
    return ctrl;
    
});