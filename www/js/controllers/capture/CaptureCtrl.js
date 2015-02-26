/**
 * Minds::mobile
 * Channel Controller
 * 
 * @author Mark Harding
 */

define(function () {
    'use strict';

    function ctrl($scope, $stateParams, $state, $rootScope, Client, OAuth, storage, $ionicLoading, $ionicPopup, $ionicModal, $http) {
    
    	$scope.captured = false;
    	$scope.progress = 0;
    	$scope.form = {
    			license: 'attribution-cc'
    	};

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
				limit: 1, 
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
			}, {
				limit: 1,
				correctOrientation: true,
				encodingType: 0, //jpeg
				destinationType: Camera.DestinationType.FILE_URI,
				allowEdit: true,
				saveToPhotoAlbum: true
			});
		};
		
		$scope.library = function(){
			
			navigator.camera.getPicture(function(mediaFile){
				
				$scope.captured = true;
				$scope.$apply();
				
				if(mediaFile.indexOf('document/image') || mediaFile.indexOf('.jpg') > -1 || mediaFile.indexOf('.png') > -1 || mediaFile.indexOf('.bmp') > -1 || mediaFile.indexOf('.jpeg') > -1){
					$scope.upload(mediaFile, 'image');
				} else {
					$scope.upload(mediaFile, 'video');
				}
				

			}, function(message){
				console.log('capture failed');
			}, {
				correctOrientation: true,
				destinationType: Camera.DestinationType.FILE_URI,
				sourceType : 0,
				mediaType: 2
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
		
			$ionicLoading.show({
		      template: 'Please wait a moment...'
		    });

			Client.post('api/v1/archive/' + $scope.guid, {
					album_title: 'Mobile',
					title: $scope.form.title,
					description: $scope.form.description
				},
				function(success){
					/*$ionicPopup.alert({
					     title: 'Complete.',
					     template: ''
					   });*/
					$state.go('tab.newsfeed', {}, {reload:true});
					$scope.$emit('newsfeed:updated');
					$scope.reset();
					$ionicLoading.hide();
				}, 
				function(error){
					$ionicPopup.alert({
					     title: 'Error',
					     template: 'Saving failed.'
					   });
					$scope.reset();
					$ionicLoading.hide();
				});
		};
		
		$scope.postStatus = function(){
			$ionicLoading.show({
				template: '<p>Please wait...</p>'
				});

			Client.post('api/v1/newsfeed', {
					message: $scope.form.status, 
					title: $scope.form.meta.title, 
					description: $scope.form.meta.description,
					thumbnail: $scope.form.links[0].href, 
					url: $scope.form.url 
			}, function(success){
				$ionicLoading.hide();
				$scope.modal.remove();
				$state.go('tab.newsfeed', {}, {reload:true});
				$scope.$emit('newsfeed:updated');
			});
			
		};
		
		$scope.activity = function(){
			$ionicModal.fromTemplateUrl('templates/capture/status.html', {
	 		    scope: $scope,
	 		    animation: 'slide-in-up'
	 		  }).then(function(modal) {
	 		    $scope.modal = modal;
	 		    $scope.modal.show();
	 		  });
		}
		
		$scope.getStatusPreview = function(){
			var text = $scope.form.status;
			var match = text.match(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig);
			console.log(text);
			console.log(match);
			if (!match)
				return;
	
			if (match instanceof Array) {
				var url = match[0];
			} else {
				var url = match;
			}
			
			if (!url.length)
				return;
			$scope.form.url = url;
			url = url.replace("http://", '');
			url = url.replace("https://", '');
			
			$http({
				method: 'GET',
				url: 'https://iframely.com/iframely',
				params: { uri: url},
				cache: true
				}).
			      success(function(data){
					$scope.form.meta = data.meta;
					$scope.form.links = data.links;
				  }).
				  error(function(data){
					console.log(data);
				  });
			
		}
       
    }

    ctrl.$inject = ['$scope', '$stateParams', '$state', '$rootScope', 'Client', 'OAuth', 'storage', '$ionicLoading', '$ionicPopup', '$ionicModal', '$http'];
    return ctrl;
    
});