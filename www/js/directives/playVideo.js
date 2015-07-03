/*global define*/

define(['angular'], function(angular) {
	"use strict";

	var directive = function($ionicScrollDelegate, $interval, Client, $sce, $ionicLoading, $timeout, $ionicGesture, $ionicPosition, $ionicPlatform, $rootScope) {
		return {
			restrict: 'AE',
			link: function(scope, el, attrs) {

				scope.showVideo = false;

				var observer = attrs.$observe('playsrc', function(src) {
					scope.srcFull = $sce.trustAsResourceUrl(src);
					observer();
				});

				/**
				 * Initialises the playback.
				 */
				scope.play = function() {

					if ($rootScope.playing && (device.platform == 'android' || device.platform == 'Android')) {
						return false;
					}

					$rootScope.playing = true;

					scope.$digest();

					if (device.platform == 'android' || device.platform == 'Android' || device.platform == "amazon-fireos") {
						StatusBar.hide();
					}

					$ionicLoading.show({
						template: 'Loading...'
					});
					$timeout(function() {
						$ionicLoading.hide();
					}, 5000);

					scope.showVideo = true;
					if (device.platform == 'android' || device.platform == 'Android') {
						scope.showVideo = false;
						scope.$apply();
					}

					var video = el[0].querySelector('#video');
					video.src = scope.srcFull;
					console.log("video src == " + video.src);
					console.log("trying to play:: " + video.src);
					video.load();
					video.play();

					if (device.platform == 'iOS')
						video.webkitEnterFullscreen();
					else
						video.webkitRequestFullscreen();

					video.onplaying = function() {
						$ionicLoading.hide();
					};
					video.onerror = function() {
						$ionicLoading.hide();
						$rootScope.playing = false;
						alert('Sorry, there was a problem playing this video. Please try again in a few minutes.');
					};

					video.addEventListener('webkitendfullscreen', function(e) {
						video.pause();
						scope.showVideo = false;
						$rootScope.playing = false;
						scope.$apply();
						console.log('ended full screen');
						StatusBar.show();
					});
					video.addEventListener('webkitfullscreenchange', function(e) {
						scope.showVideo = false;
						scope.$apply();

						if (!document.webkitIsFullScreen) {
							video.pause();
							$rootScope.playing = false;
							StatusBar.show();
						}
					});
					video.addEventListener('ended', function(e) {
						video.pause();
						//document.webkitExitFullscreen();
						scope.showVideo = false;
						$rootScope.playing = false;
						scope.$apply();
						StatusBar.show();
					}, false);

				};

				el.on('click', scope.play);

			}
		};
	};

	directive.$inject = ['$ionicScrollDelegate', '$interval', 'Client', '$sce', '$ionicLoading', '$timeout', '$ionicGesture', '$ionicPosition', '$ionicPlatform', '$rootScope'];
	return directive;
});
