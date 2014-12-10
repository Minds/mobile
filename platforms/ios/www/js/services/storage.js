/**
 * Minds::mobile
 * App user storage
 * 
 * @author Mark Harding
 */

define(['angular'], function (angular) {
    "use strict";

    var factory = function () {
	
		var ls = window.localStorage;
	
        return {
            set: function(key, value){
            	return ls.setItem(key, JSON.stringify(value));
            },
            get: function(key){
            	return JSON.parse(ls.getItem(key));
            },
            remove: function(key){
            	return ls.removeItem(key);
            }
        };

    };

    factory.$inject = [];
    return factory;
});