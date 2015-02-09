/*global define*/

define(['angular'], function (angular) {
    "use strict";

    var directive = function ($rootScope, Client, wallet) {
	  	return {
       		restrict: 'E',
       		template: "{{$root.points}}",
			scope: true,
			link: function(scope, element, attrs) {
				//scope.count = $rootScope.points;
				
				wallet.getCount();
				
			}
       	 };
    };

    directive.$inject = ['$rootScope', 'Client', 'wallet'];
    return directive;
});