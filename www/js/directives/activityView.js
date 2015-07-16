/*global define*/

define(['angular'], function(angular) {
	"use strict";

	var directive = function($ionicScrollDelegate, $ionicGesture, $timeout, Client) {
		return {
			restrict: 'E',
			templateUrl: function(elem, attr) {
				return 'templates/directives/activity.html';
			},
			link: function(scope, element, attrs) {

				var visible = false;

				function isVisible() {
					return (element[0].offsetTop - 200 <= $ionicScrollDelegate.getScrollPosition().top);
				}

				if (isVisible()) {
					visible = true;
					updateViews();
				}

				if (!visible) {
					var func = function(e) {
						if (!visible && isVisible()) {
							visible = true;
							$ionicGesture.off(gesture, 'dragend', this);
							updateViews();
						}
					};
					var gesture = $ionicGesture.on('dragend', func, element.parent());
				}

				function updateViews() {
					//$timeout(function() {
					//	scope.activity.impressions = scope.activity.impressions + 1;
						Client.put('api/v1/newsfeed/' + scope.activity.guid + '/view', {}, function() {
							}, function() {
							});
					//);
				};

				var timeout;
				scope.openUrl = function(url) {
					$timeout.cancel(timeout);

					timeout = $timeout(function() {
						window.open(url, "_blank", "location=yes");
					}, 300);
				};

				scope.$on("$destroy", function() {
					if (gesture) {
						$ionicGesture.off(gesture, 'dragend', func);
					}
				});

			}
		};
	};

	directive.$inject = ['$ionicScrollDelegate', '$ionicGesture', '$timeout', 'Client'];
	return directive;
});
