/*global define*/

define(['angular'], function (angular) {
    "use strict";

    var directive = function ($rootScope, $filter, Client) {
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
				
				if(attrs.showSubscribeButton){
					scope.showSubscribeButton = true;
				}
				
				scope.subscribe = function(){
					scope.user.subscribed = true;
					Client.post('api/v1/subscribe/' + scope.user.guid, {},
							function(){
								
							},
							function(){
							});
					
				};
				
				
			}
       	 };
    };

    directive.$inject = ['$rootScope', '$filter', 'Client'];
    return directive;
});