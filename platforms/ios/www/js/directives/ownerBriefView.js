/*global define*/

define(['angular'], function (angular) {
    "use strict";

    var directive = function () {
	 	return {
       		restrict: 'E',
			templateUrl: function(elem, attr){
				return 'templates/directives/owner-brief.html';
			},
			replace: true,
			scope: {
				name: '@'
			}
			/*link: function($scope, element, attrs) {
				attrs.$observe('owner', function(value) {
					var owner = attrs.owner;
					element.find('name').html(owner.name);
				});
			}*/
       	 };
    };

    directive.$inject = [];
    return directive;
});