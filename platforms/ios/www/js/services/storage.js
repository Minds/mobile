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
            	var val = ls.getItem(key);
            	if(val)
            		return JSON.parse(val);
            	else
            		return false;
            },
            remove: function(key){
            	return ls.removeItem(key);
            }
        };

    };

    factory.$inject = [];
    return factory;
});