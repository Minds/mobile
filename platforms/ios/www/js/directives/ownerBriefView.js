/*global define*/

define(['angular'], function (angular) {
    "use strict";

    var directive = function ($rootScope, $filter) {
	 	return {
       		restrict: 'E',
			templateUrl: function(elem, attr){
				return 'templates/directives/owner-brief.html';
			},
			replace: true,
			scope: true,
			link: function(scope, element, attrs) {
				scope.node_url = $rootScope.node_url;
				scope.user = JSON.parse(attrs.owner);
				
				if(attrs.ts){
					scope.ts = $filter('date')(attrs.ts*1000, 'medium');
				} else {
					scope.ts = '';
				}
			}
       	 };
    };

    directive.$inject = ['$rootScope', '$filter'];
    return directive;
});