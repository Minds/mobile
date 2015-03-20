/**
 * Minds::mobile
 * Channel Controller
 * 
 * @author Mark Harding
 */

define(function () {
    'use strict';

    function ctrl($scope, $stateParams, $state, $rootScope, Client, OAuth, storage, $ionicLoading, $ionicPopup, $ionicModal, $http, $timeout) {
    
    	$scope.captured = false;
    	$scope.progress = 0;
    	$scope.form = {
    		album_title: 'Mobile',
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
				duration: 360,
				saveToPhotoAlbum: true
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
				
				if(mediaFile.indexOf('images') > -1 || mediaFile.indexOf('document/image') > -1 || mediaFile.indexOf('.jpg') > -1 || mediaFile.indexOf('.png') > -1 || mediaFile.indexOf('.bmp') > -1 || mediaFile.indexOf('.jpeg') > -1){
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
	        options.headers = {
	        	"Authorization": "Bearer " + storage.get('access_token')
	        };
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
			
			//$timeout(function(){
				$ionicLoading.show({
			      template: 'Please wait a moment...'
			    });
		   // }, 5000);

			Client.post('api/v1/archive/' + $scope.guid, $scope.form,
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
				
			var data = {
				message: $scope.form.status,
				facebook: $scope.form.facebook,
				twitter: $scope.form.twitter
			};
			if($scope.form.meta){
				data = {
					message: $scope.form.status, 
					title: $scope.form.meta.title, 
					description: $scope.form.meta.description,
					thumbnail: encodeURIComponent($scope.form.thumbnail), 
					url: $scope.form.meta.canonical
				};
			}

			Client.post('api/v1/newsfeed', data, function(success){
				$ionicLoading.hide();
				$scope.modal.remove();
				$state.go('tab.newsfeed', {}, {reload:true});
				$scope.$emit('newsfeed:updated');
			}, function(error){
				$ionicLoading.hide();
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
		};
		
		$scope.$on('modal.removed', function() {
		    $scope.form = {};
		});
		
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
			     	console.log(data);
					$scope.form.meta = data.meta;
					
					for(var i = 0; i < data.links.length; i++){
						if(data.links[i].rel.indexOf('thumbnail') > -1){
							console.log(data.links[i]);
							$scope.form.thumbnail = data.links[i].href;
						}
					}
				  }).
				  error(function(data){
					console.log(data);
				  });
			
		};
		
		$scope.fb = function(){
			if($scope.form.facebook){
				$scope.form.facebook = false;
				return;
			}
			
			function clearListCookies(){
				var cookies = document.cookie.split(";");
		        for (var i = 0; i < cookies.length; i++){   
		            var spcook =  cookies[i].split("=");
		            document.cookie = spcook[0] + "=;expires=Thu, 21 Sep 1979 00:00:01 UTC;";                                
		        }
		    }
		
			if(!storage.get('facebook')){
				var ref = window.open($rootScope.node_url + 'plugin/social/authorize/facebook?access_token=' + storage.get('access_token') + '&client_id=' + OAuth.client_id, '_blank', 'location=yes');
				ref.addEventListener('loadstart', function(event) { 
					var url = event.url;
					if(url.indexOf($rootScope.node_url + 'plugin/social/redirect') > -1){
						ref.close();
					}
				});
			}
			
			$scope.form.facebook = true;
		};
		
		$scope.twitter = function(){
			if($scope.form.twitter){
				$scope.form.twitter = false;
				return;
			}
			if(!storage.get('twitter')){
				var ref = window.open($rootScope.node_url + 'plugin/social/authorize/twitter?access_token=' + storage.get('access_token') + '&client_id=' + OAuth.client_id, '_blank', 'location=yes');
				ref.addEventListener('loadstart', function(event) { 
					var url = event.url;
					if(url.indexOf($rootScope.node_url + 'plugin/social/redirect') > -1){
						ref.close();
					}
				});
			}
			
			$scope.form.twitter =  true;
		};
       
    }

    ctrl.$inject = ['$scope', '$stateParams', '$state', '$rootScope', 'Client', 'OAuth', 'storage', '$ionicLoading', '$ionicPopup', '$ionicModal', '$http', '$timeout'];
    return ctrl;
    
});