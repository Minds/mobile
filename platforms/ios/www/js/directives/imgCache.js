/*global define*/

define(['angular', 'ImgCache'], function (angular, ImgCache) {
    "use strict";

    var directive = function ($rootScope, $filter, storage) {
	  	return {
            restrict: 'A',
            link: function(scope, el, attrs) {

                attrs.$observe('ngSrc', function(src) {

                    ImgCache.isCached(src, function(path, success) {
                        if (success) {
                            ImgCache.useCachedFile(el);
                        } else {
                            ImgCache.cacheFile(src, function() {
                                ImgCache.useCachedFile(el);
                            });
                        }
                    });

                });
            }
        };
    };

    directive.$inject = [];
    return directive;
});