/**
 * Minds::mobile
 * Provides current version info
 * 
 * @author Mark Harding
 */

define(['angular'], function (angular) {
	'use strict';
  
	return angular.module('app.config', [])
		.constant('VERSION', '0.0.1');
    
});