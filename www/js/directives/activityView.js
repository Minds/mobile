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
					var gesture = $ionicGesture.on('dragend', function(e) {
						if (!visible && isVisible()) {
							visible = true;
							$ionicGesture.off(gesture, 'dragend', this);
							updateViews();
						}
					}, element.parent());
				}

				function updateViews() {
					$timeout(function(){
						scope.activity.impressions = scope.activity.impressions + 1;
						Client.put('api/v1/newsfeed/' + scope.activity.guid + '/view', {}, function() {
							}, function() {
							});
					});
				}

			}
		};
	};

	directive.$inject = ['$ionicScrollDelegate', '$ionicGesture', '$timeout', 'Client'];
	return directive;
});
