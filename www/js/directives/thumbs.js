/*global define*/

define(['angular'], function (angular) {
    "use strict";

    var directive = function ($rootScope, $filter, storage) {
	  	return {
       		restrict: 'A',
			link: function(scope, element, attrs) {
			
				attrs.$observe('thumbs', function(value) {
					if(value.indexOf(storage.get('user_guid')) > -1){
						angular.element(element).addClass('selected');
					} else {
						angular.element(element).removeClass('selected');
					}
			    });
				
			}
       	 };
    };

    directive.$inject = ['$rootScope', '$filter', 'storage'];
    return directive;
});