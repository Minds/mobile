/**
 * Minds::mobile
 * Channel Controller
 * 
 * @author Mark Harding
 */

define(function () {
    'use strict';

    function ctrl($scope, $stateParams, $state, $rootScope, Client, OAuth, storage) {
    
    	$scope.captured = false;
    	$scope.progress = 0;
    	$scope.form = {};

		$scope.video = function(){
			navigator.device.capture.captureVideo(function(mediaFiles){
				
				$scope.captured = true;
				$scope.$apply();
			
				var i, path, len;
			    for (i = 0, len = mediaFiles.length; i < len; i += 1) {
			    	var mediafile = mediaFiles[i];
			        path = mediafile.fullPath;

			       	$scope.upload(path, 'video');
			    }
			}, function(){
				console.log('capture failed');
			}, {
				limit: 2, 
				duration:30
			});
		};
		
		$scope.photo= function(){
			
			navigator.device.capture.captureImage(function(mediaFiles){
				
				$scope.captured = true;
				$scope.$apply();
			
				var i, path, len;
			    for (i = 0, len = mediaFiles.length; i < len; i += 1) {
			        path = mediaFiles[i].fullPath;
			       
			        $scope.upload(path, 'image');
 
			    }
			}, function(){
				console.log('capture failed');
				alert('Uploading to Minds will be here soon!');
			}, {
				limit: 1,
				correctOrientation: true,
				ecodingType: Camera.EncodingType.JPEG,
				targetWidth: 720
			});
		};
		
		$scope.reset = function(){
			$scope.captured = false;
			$scope.guid = false;
		};
		
		$scope.upload = function(path, type){
			var ft = new FileTransfer();
	        var options = new FileUploadOptions();
	        options.httpMethod = 'PUT';
	        options.headers = {"Authorization": "Bearer " + storage.get('access_token') };
	        console.log(path);
	      	ft.upload(path, encodeURI($rootScope.node_url + 'api/v1/archive/'+type), 
	      		function(success){
	      			if(success.response){
		      			var response = JSON.parse(success.response);
		      			
		      			$scope.guid = response.guid;
		      			$scope.$apply();
	      			}
	      		}, 
	      		function(error){
	      			console.log('error');
	      			console.log(error);
	      		}, 
	      		options
	      	);
	      	
	      	ft.onprogress = function(progressEvent) {
	      		$scope.progress =  Math.floor(progressEvent.loaded / progressEvent.total * 100);
	      		$scope.$apply();
			}; 
		};
		
		$scope.save = function(){

			Client.post('api/v1/archive/' + $scope.guid, {
					album_title: 'Mobile',
					title: $scope.form.title,
					description: $scope.form.description
				},
				function(success){
					alert('done, a future build will take you to the image view..');
					$scope.reset();
				}, 
				function(error){
					alert('oops. something didn\'t go to plan.');
					$scope.reset();
				});
		};
       
    }

    ctrl.$inject = ['$scope', '$stateParams', '$state', '$rootScope', 'Client', 'OAuth', 'storage'];
    return ctrl;
    
});