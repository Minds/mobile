/*global define*/

define(['angular'], function (angular) {
    "use strict";

    var directive = function ($ionicPlatform) {
	  	return {
            restrict: 'A',
            link: function(scope, el, attrs) {
            	
                attrs.$observe('ngSrc', function(src) {
					console.log(src);
                    ImgCache.isCached(src, function(path, success) {
                        if (success) {
                        	console.log('found cached!');
                            ImgCache.useCachedFile(el);
                        } else {
                            ImgCache.cacheFile(src, function() {
                                ImgCache.useCachedFile(el);
                                console.log('cache not found!');
                            });
                        }
                    });

                });
            }
        };
    };

    directive.$inject = ['$ionicPlatform'];
    return directive;
});