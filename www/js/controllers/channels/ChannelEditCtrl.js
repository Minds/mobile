/**
 * Minds::mobile
 * Channel Controller
 *
 * @author Mark Harding
 */

define(function() {
	'use strict';

	function ctrl($rootScope, $scope, $state, $stateParams, Client, storage, $ionicSlideBoxDelegate, $ionicScrollDelegate,
		$ionicLoading, $timeout, $window, $ionicModal, $ionicHistory, $ionicPopup, $q) {

		$scope.cb = Date.now();
		var timeout;

		if (!$stateParams.guid)
			$stateParams.guid = $rootScope.user_guid;

		Client.get('api/v1/channel/' + $stateParams.guid, {
			cb: $scope.cb
		}, function(success) {
			$scope.channel = success.channel;
		}, function(error) {
		});

		$scope.update = function(forward) {

			if (!$scope.channel.name) {

				$ionicPopup.alert({
					title: 'Oooops...',
					template: "Your need a name!"
				});

				return false;
			}

			Client.post('api/v1/channel/info', $scope.channel, function(success) {
				$ionicLoading.show({
					template: '<i class="icon ion-checkmark-round" style="line-height:100px; vertical-align:middle; font-size:90px"></i>'
				});
				$timeout(function() {
					$ionicLoading.hide();
				}, 1000);
				if (forward)
					$state.go('tab.newsfeed-channel', {
						username: 'me',
						refresh: true
					});
			}, function(error) {
			});
		};

		$scope.cities = [];
		$scope.autoSearchLocation = function() {
			$timeout.cancel(timeout);

			timeout = $timeout(function() {
				Client.get("api/v1/geolocation/list", {
					q: $scope.channel.city
				}, function(success) {
					$scope.cities = success.results;
					console.log($scope.cities);
				}, function(error) {
				});
			}, 300);
		};

		$scope.selectSuggestedLocation = function(row) {
			$scope.cities = [];
			$scope.channel.coordinates = row.lat + ',' + row.lon;

			if (row.address.city)
				$scope.channel.city = row.address.city;
			if (row.address.town)
				$scope.channel.city = row.address.town;

			storage.set('city', $scope.channel.city);
			storage.set('coordinates', $scope.channel.coordinates);
		};

		$scope.changeAvatar = function() {

			navigator.camera.getPicture(onSuccess, onFail, {
				quality: 50,
				destinationType: Camera.DestinationType.FILE_URI,
				sourceType: 0,
				correctOrientation: true
			});

			function onSuccess(imageData) {
				var image = document.getElementById('avatar');
				image.src = imageData;

				$ionicLoading.show({
					template: 'Uploading...'
				});

				var ft = new FileTransfer();
				var options = new FileUploadOptions();
				//options.httpMethod = 'PUT';
				options.headers = {
					"Authorization": "Bearer " + storage.get('access_token')
				};
				console.log(imageData);
				ft.upload(imageData, encodeURI($rootScope.node_url + 'api/v1/channel/avatar'), function(success) {
					$ionicLoading.hide();
					$rootScope.globalCB = Date.now();
					$rootScope.$apply();
					$scope.channel.cb = Date.now();
					// if($scope.modal)
					//	$scope.modal.remove();
				}, function(error) {
					$ionicLoading.hide();
					console.log('error');
					console.log(error);
				}, options);

			}

			function onFail(message) {
				//alert('Failed because: ' + message);
			}

		};

		$scope.addBanner = function() {

			if ($scope.channel.carousels) {
				$ionicPopup.alert({
					title: 'Warning!',
					subTitle: 'Adding a new banner will replace all existing banners on your channel.',
					buttons: [{
							text: 'Close'
						},
						{
							text: '<b>Replace</b>',
							type: 'button-positive',
							onTap: function(e) {
								$scope.selectBanner();
							}
						}]
				});
			} else {
				$scope.selectBanner();
			}

		};

		$scope.selectBanner = function() {

			navigator.camera.getPicture(onSuccess, onFail, {
				quality: 50,
				destinationType: Camera.DestinationType.FILE_URI,
				sourceType: 0,
				correctOrientation: true
			});

			function onSuccess(imageData) {
				//var image = document.getElementById('avatar');
				//image.src = imageData;

				var ft = new FileTransfer();
				var options = new FileUploadOptions();
				//options.httpMethod = 'PUT';
				options.headers = {
					"Authorization": "Bearer " + storage.get('access_token')
				};
				console.log(imageData);
				ft.upload(imageData, encodeURI($rootScope.node_url + 'api/v1/channel/banner'), function(success) {
					$rootScope.globalCB = Date.now();
				}, function(error) {
					console.log('error');
					console.log(error);
				}, options);

			}

			function onFail(message) {
				//alert('Failed because: ' + message);
			}

		};

		$scope.changeGender = function(gender) {
			$scope.channel.gender = gender;
			$scope.$apply();
		};

		$scope.invite = function() {
			/*$ionicModal.fromTemplateUrl('templates/invite/invite.html', {
				scope: $scope,
				animation: 'slide-in-up'
			}).then(function(modal) {
				$scope.modal = modal;
				$scope.modal.show();
			});*/
			window.plugins.socialsharing.share("Hey! If you install the Minds app and tag me @" + $scope.channel.username + " we both get 100 points! \n\n",
												'Join Minds and we both get 100 points to go viral!',
												null,
												$rootScope.node_url
												);
		};

		$scope.disable = function() {

			var deferred = $q.defer();

			$ionicPopup.alert({
				title: 'Are you sure?',
				buttons: [{
						text: 'No!'
					},
					{
						text: '<b>Yes</b>',
						type: 'button-positive',
						onTap: function(e) {
							$ionicLoading.show({
								template: '<ion-spinner></ion-spinner>'
							});
							Client.delete('api/v1/channel', {}, function() {
								$ionicLoading.hide();
								$scope.logout();
							}, function() {
								alert("sorry, we could not delete");
							});
							deferred.resolve(true);
						}
					}]
				});

			return deferred.promise;

		};

		$scope.logout = function() {

			Client.post('api/v1/logout', {}, function() {
			}, function() {
			});

			storage.remove('loggedin');
			storage.remove('user_guid');
			storage.remove('access_token');
			storage.remove('private-key');
			storage.remove('push-token');

			ionic.Platform.exitApp();

			$ionicHistory.clearCache();
			$state.go('login');

		};

	}


	ctrl.$inject = ['$rootScope', '$scope', '$state', '$stateParams', 'Client',
					'storage', '$ionicSlideBoxDelegate', '$ionicScrollDelegate', '$ionicLoading',
					'$timeout', '$window', '$ionicModal', '$ionicHistory', '$ionicPopup', '$q'];
	return ctrl;

});
