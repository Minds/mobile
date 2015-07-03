/*global define*/

define(['angular'], function(angular) {
	"use strict";

	var directive = function($rootScope, $filter, Client) {
		return {
			restrict: 'E',
			templateUrl: function(elem, attr) {
				return 'templates/directives/owner-brief.html';
			},
			scope: {
				'owner': '=',
				'ts': '=',
				'showMoreButton': '=',
				'openActions': '&'
			},
			link: function(scope, element, attrs) {
				scope.node_url = $rootScope.node_url;

				if (attrs.ts) {
					scope.ts = $filter('date')(scope.ts * 1000, 'medium');
				} else {
					scope.ts = '';
				}

				if (attrs.showSubscribeButton) {
					scope.showSubscribeButton = true;
				}

				scope.subscribe = function() {
					scope.owner.subscribed = true;
					Client.post('api/v1/subscribe/' + scope.user.guid, {}, function() {

					}, function() {
					});

				};

				scope.unSubscribe = function() {
					scope.owner.subscribed = false;
					Client.delete('api/v1/subscribe/' + scope.user.guid, {}, function() {

					}, function() {
					});

				};

			}
		};
	};

	directive.$inject = ['$rootScope', '$filter', 'Client'];
	return directive;
});
