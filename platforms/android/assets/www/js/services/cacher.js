/**
 * Minds::mobile
 * App cacher
 * 
 * @author Mark Harding
 */

define(['angular'], function (angular) {
    "use strict";

    var factory = function ($cacheFactory) {
		return $cacheFactory('mindscache');
    };

    factory.$inject = ['$cacheFactory'];
    return factory;
});