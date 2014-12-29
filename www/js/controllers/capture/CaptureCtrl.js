/**
 * Minds::mobile
 * Channel Controller
 * 
 * @author Mark Harding
 */

define(function () {
    'use strict';

    function ctrl($scope, $stateParams, $rootScope, Client, OAuth, storage, $ionicModal) {
    
    	$scope.captured = false;

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
				
				$scope.captured = true;
				$scope.$apply();
			
				var i, path, len;
			    for (i = 0, len = mediaFiles.length; i < len; i += 1) {
			        path = mediaFiles[i].fullPath;
			        
			        var ft = new FileTransfer();
			        var options = new FileUploadOptions();
			        options.httpMethod = 'PUT';
			        options.headers = {"Authorization": "Bearer " + storage.get('access_token') };
			       	
			      	ft.upload(path, encodeURI($rootScope.node_url + 'api/v1/archive'), 
			      		function(success){
			      			var response = JSON.parse(success.response);
			      			$scope.guid = response.guid;
			      			$scope.$apply();
			      		}, 
			      		function(error){
			      			console.log('error');
			      			console.log(error);
			      		}, 
			      		options
			      	);
 
			    }
			}, function(){
				console.log('capture failed');
				alert('Uploading to Minds will be here soon!');
			}, {limit: 1});
		};
		
		$scope.reset = function(){
			$scope.captured = false;
		};
		
		$scope.save = function(){
			
		};
       
    }

    ctrl.$inject = ['$scope', '$stateParams', '$rootScope', 'Client', 'OAuth', 'storage', '$ionicModal'];
    return ctrl;
    
});