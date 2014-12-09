/*global define*/

define(['angular'], function (angular) {
    "use strict";

    var directive = function () {
    	return function (scope, elm, attrs) {
        	elm.text('hello');
        };
        return function(){
       		restrict: 'E',
			templateURL: 'activity.html'
        }
    };

    directive.$inject = [];
    return directive;
});