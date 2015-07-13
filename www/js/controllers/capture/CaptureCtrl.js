/**
 * Minds::mobile
 * Channel Controller
 *
 * @author Mark Harding
 */

define(function() {
	'use strict';

	function ctrl($scope, $stateParams, $state, $rootScope, Client, OAuth, storage, $ionicLoading, $ionicPopup, $ionicModal, $http, $timeout, $sanitize) {

		$scope.captured = false;
		$scope.progress = 0;
		$scope.form = {
			album_title: 'Mobile',
			license: 'attribution-cc'
		};
		$scope.type;

		$scope.video = function() {
			$scope.type = 'video';
			navigator.device.capture.captureVideo(function(mediaFiles) {

				$scope.captured = true;
				$scope.$apply();

				var i, path, len;
				for ( i = 0, len = mediaFiles.length; i < len; i += 1) {
					var mediafile = mediaFiles[i];
					path = mediafile.fullPath;

					$scope.upload(path, 'video');
				}

			}, function() {
				console.log('capture failed');
			}, {
				limit: 1,
				duration: 360,
				saveToPhotoAlbum: true
			});
		};

		$scope.photo = function() {
			$scope.type = 'image';
			navigator.device.capture.captureImage(function(mediaFiles) {

				$scope.captured = true;
				$scope.$apply();

				var i, path, len;
				for ( i = 0, len = mediaFiles.length; i < len; i += 1) {
					path = mediaFiles[i].fullPath;

					$scope.upload(path, 'image');

				}
			}, function() {
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

		$scope.library = function() {

			navigator.camera.getPicture(function(mediaFile) {

				$scope.captured = true;
				$scope.$apply();
				var uploading = false;

				var image = ["images", "document/image", '.jpg', '.JPG', '.jpeg', '.JPEG', '.png', '.PNG', '.bmp', '.BMP', '.gif', '.GIF'];
				for (var i = 0; i < image.length; i++) {
					if (mediaFile.indexOf(image[i]) > -1) {
						$scope.upload(mediaFile, 'image');
						$scope.type = 'image';
						uploading = true;
						break;
					}
				}

				if (!uploading) {
					$scope.upload(mediaFile, 'video');
					$scope.type = 'video';
				}

			}, function(message) {
				console.log('capture failed');
			}, {
				correctOrientation: true,
				destinationType: Camera.DestinationType.FILE_URI,
				sourceType: 0,
				mediaType: 2
			});

		};

		$scope.reset = function() {
			$scope.captured = false;
			$scope.guid = false;
		};

		$scope.upload = function(path, type) {
			var ft = new FileTransfer();
			var options = new FileUploadOptions();
			if (type == 'image')
				options.httpMethod = 'PUT';
			else
				options.httpMethod = 'POST';
			options.headers = {
				"Authorization": "Bearer " + storage.get('access_token')
			};
			console.log(path);
			ft.upload(path, encodeURI($rootScope.node_url + 'api/v1/archive/' + type), function(success) {
				if (success.response) {
					var response = JSON.parse(success.response);

					$scope.guid = response.guid;
					$scope.$apply();
				}
			}, function(error) {
				console.log('error');
				console.log(error);
			}, options);

			ft.onprogress = function(progressEvent) {
				$scope.progress = Math.floor(progressEvent.loaded / progressEvent.total * 100);
				$scope.$apply();
			};
		};

		$scope.save = function() {

			//$timeout(function(){
			$ionicLoading.show({
				template: 'Please wait a moment...'
			});
			// }, 5000);

			Client.post('api/v1/archive/' + $scope.guid, $scope.form, function(success) {
				/*$ionicPopup.alert({
				 title: 'Complete.',
				 template: ''
				 });*/
				$state.go('tab.newsfeed', {}, {
					reload: true
				});
				$scope.$emit('newsfeed:updated');
				$scope.$emit('newsfeed:boost', success.activity_guid);
				$scope.reset();
				$ionicLoading.hide();
			}, function(error) {
				$ionicPopup.alert({
					title: 'Error',
					template: 'Saving failed.'
				});
				$scope.reset();
				$ionicLoading.hide();
			});
		};

		$scope.postStatus = function() {

			if (!$scope.form.status) {
				$ionicPopup.alert({
					title: 'Ooopss.',
					template: 'You need to enter status before you can post.'
				});
				return false;
			}

			$ionicLoading.show({
				template: '<p>Please wait...</p>'
			});

			var data = {
				message: $scope.form.status,
				facebook: $scope.form.facebook,
				twitter: $scope.form.twitter
			};
			if ($scope.form.meta) {
				data = {
					message: encodeURIComponent($scope.form.status),
					title: $scope.form.meta.title,
					description: encodeURIComponent($scope.form.meta.description),
					thumbnail: encodeURIComponent($scope.form.thumbnail),
					url: $scope.form.meta.canonical,
					facebook: $scope.form.facebook,
					twitter: $scope.form.twitter
				};
			}

			Client.post('api/v1/newsfeed', data, function(success) {
				$ionicLoading.hide();
				$scope.modal.remove();
				$scope.$emit('newsfeed:boost', success.guid);
				$scope.$emit('newsfeed:updated');
				$state.go('tab.newsfeed', {}, {
					reload: true
				});
			}, function(error) {
				$ionicLoading.hide();
			});

		};

		if (window.intents && typeof window.intents.onIntent == 'function') {
			intents.onIntent(function(callback) {
				if (callback.type == "text") {
					$scope.activity();
					$scope.form.status = callback.data;
					$scope.getStatusPreview();
				}
			});
		}

		$scope.activity = function() {
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
			intents.onIntent(function(data) {
				navigator.app.exitApp();
			});
		});

		$scope.getStatusPreview = function() {
			var text = $scope.form.status;
			var match = text.match(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig);

			if (!match)
				return;

			var url;

			if ( match instanceof Array) {
				url = match[0];
			} else {
				url = match;
			}

			if (!url.length)
				return;
			$scope.form.url = url;
			url = url.replace("http://", '');
			url = url.replace("https://", '');

			$http({
				method: 'GET',
				url: 'https://iframely.com/iframely',
				params: {
					uri: url
				},
				cache: true
			}).success(function(data) {
				console.log(data);
				$scope.form.meta = data.meta;

				for (var i = 0; i < data.links.length; i++) {
					if (data.links[i].rel.indexOf('thumbnail') > -1) {
						console.log(data.links[i]);
						$scope.form.thumbnail = data.links[i].href;
					}
				}
			}).error(function(data) {
				console.log(data);
			});

		};

		$scope.fb = function() {
			if ($scope.form.facebook) {
				$scope.form.facebook = false;
				return;
			}

			facebookConnectPlugin.getLoginStatus(function(status) {

				if (status.status != 'connected') {
					//user not connected, so get an access token
					facebookConnectPlugin.login(["public_profile"], function(userData) {

						facebookConnectPlugin.login(["publish_actions"], function() {

							facebookConnectPlugin.getAccessToken(function(token) {
								//$scope.form.facebook = true;
								$scope.form.facebook = token;
								$scope.$apply();

							}, function(err) {
								alert("Could not get access token: " + err);
							});

						}, function(error) {
						});

					}, function(err) {
						alert('error ' + err);
					});

					return true;
				}

				//$scope.form.facebook = true;
				$scope.form.facebook = status.authResponse.accessToken;
				$scope.$apply();
				//upload

			}, function(error) {
				$scope.fb();
			});
			/*facebookConnectPlugin.login(["public_profile"],
			 function(userData){
			 $scope.form.facebook = true;
			 console.log(userData);
			 },
			 function(err){
			 alert('error ' + err);
			 });*/

		};

		$scope.twitter = function() {

			if ($scope.form.twitter) {
				$scope.form.twitter = false;
				return;
			}
			if (!storage.get('twitter')) {
				var ref = window.open($rootScope.node_url + 'plugin/social/authorize/twitter?access_token=' + storage.get('access_token') + '&client_id=' + OAuth.client_id, '_blank', 'location=yes');
				ref.addEventListener('loadstart', function(event) {

					var url = event.url;
					if (url.indexOf($rootScope.node_url + 'plugin/social/redirect') > -1) {
						ref.close();
						var params = url.split('?');
						Client.get('plugin/social/redirect/twitter?' + params[1], {}, function(success) {
							$scope.form.twitter = success.oauth_token + "&&" + success.oauth_token_secret;
						});

					}
				});
			}

		};

	}


	ctrl.$inject = ['$scope', '$stateParams', '$state', '$rootScope', 'Client', 'OAuth', 'storage', '$ionicLoading', '$ionicPopup', '$ionicModal', '$http', '$timeout', '$sanitize'];
	return ctrl;

});
