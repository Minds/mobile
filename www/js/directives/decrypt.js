/*global define*/

define(['angular', 'JSEncrypt'], function (angular, JSEncrypt) {
    "use strict";

    var directive = function ($rootScope, $filter, storage) {
	  	return {
       		restrict: 'E',
			template: "<p>{{message}}</p>",
			replace: true,
			scope: true,
			link: function(scope, element, attrs) {
				//console.log(attrs.message);
				scope.message = attrs.message;

				//console.log(JSEncrypt);
				var decrypt = new JSEncrypt();
				decrypt.setPrivateKey(storage.get('private-key'));

				var uncrypted = decrypt.decrypt(attrs.message);
				
				scope.message = uncrypted;
			      
			}
       	 };
    };

    directive.$inject = ['$rootScope', '$filter', 'storage'];
    return directive;
});