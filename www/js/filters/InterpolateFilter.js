/*global define*/

define(['angular'], function(angular) {
	"use strict";

	var filter = function(VERSION) {
		return function(text) {
			return String(text).replace(/\%VERSION\%/mg, VERSION);
		};
	};

	filter.$inject = ['VERSION'];
	return filter;
}); 