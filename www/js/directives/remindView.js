/*global define*/

define(['angular'], function(angular) {
	"use strict";

	var directive = function($rootScope, $timeout, $templateCache, $http, $compile) {
		return {
			restrict: 'E',
			scope: {
				activity: '='
			},
			compile: function(tElem, tAttrs) {
				return {
					pre: function(scope, element, attrs) {
						scope.hideTabs = true;
						scope.node_url = $rootScope.node_url;
						scope.hideMoreButton = true;
						$http.get('templates/directives/activity.html', {cache: $templateCache}).success(function(response) {
								element.html(response);
							})
							.then(function(response) {
								element.replaceWith($compile(element.html())(scope));
							});
					},
					post: function(scope) {
						//scope.$destroy();
						var timeout;
						scope.openUrl = function(url) {
							$timeout.cancel(timeout);

							timeout = $timeout(function() {
								window.open(url, "_blank", "location=yes");
							}, 300);
						};
					}
				};
			}
		};
	};

	directive.$inject = ['$rootScope', '$timeout', '$templateCache', '$http', '$compile'];
	return directive;
});
