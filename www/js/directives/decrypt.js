/*global define*/

define(['angular', 'JSEncrypt'], function(angular, JSEncrypt) {
	"use strict";

	var directive = function($rootScope, $filter, storage, $compile, $sce) {
		return {
			restrict: 'E',
			template: "<div class='item-text-wrap'>{{message}}</div>",
			replace: true,
			scope: true,
			link: function(scope, element, attrs) {
				//console.log(attrs.message);
				element.html($sce.getTrustedHtml('<div class="decrypting"> decrypting... </div>'));

				crypt.setPrivateKey(storage.get('private-key'));

				crypt.decrypt(attrs.message, function(success) {
					scope.message = $filter('linky')(success);
					//scope.$apply();
					element.html($sce.getTrustedHtml(scope.message));
				});

				var linkify = function(inputText) {
					var replacedText, replacePattern1, replacePattern2, replacePattern3;
					//URLs starting with http://, https://, or ftp://
					replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
					replacedText = inputText.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');
					//URLs starting with "www." (without // before it, or it'd re-link the ones done above).
					replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
					replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>');
					//Change email addresses to mailto:: links.
					replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
					replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>');
					return replacedText;
				};

			}
		};
	};

	directive.$inject = ['$rootScope', '$filter', 'storage', '$compile', '$sce'];
	return directive;
});
