/*global define*/

define(['angular'], function (angular) {
    "use strict";

    var directive = function () {
	 	return {
       		restrict: 'E',
			templateUrl: function(elem, attr){
				return 'templates/directives/activity.html';
			}
       	 };
    };

    directive.$inject = [];
    return directive;
});