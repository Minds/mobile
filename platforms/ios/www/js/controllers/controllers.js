/**
 * Minds::mobile
 * Controllers loader. All controllers must be set here.
 * 
 * @author Mark Harding
 */

define(function (require) {

	'use strict';

	var angular = require('angular'),
		services = require('services/services'),
		config = require('config'),
		controllers = angular.module('app.controllers', ['app.services', 'app.config']);

	controllers.controller('LoginCtrl', require('controllers/LoginCtrl'));
	
	/**
	 * Newsfeed
	 */
	controllers.controller('NewsfeedCtrl', require('controllers/newsfeed/NewsfeedCtrl'));
	controllers.controller('NewsfeedComposerCtrl', require('controllers/newsfeed/NewsfeedCompoerCtrl'));
	controllers.controller('NewsfeedViewCtrl', require('controllers/newsfeed/NewsfeedViewCtrl'));
	
	/**
	 * Gatherings (chat)
	 */
	controllers.controller('ChatCtrl', require('controllers/gatherings/ChatCtrl'));
	controllers.controller('ChatConversationCtrl', require('controllers/gatherings/ChatConversationCtrl'));
	controllers.controller('ChatSetupCtrl', require('controllers/gatherings/ChatSetupCtrl'));
    
    
    /**
     * Channels
     */
    controllers.controller('ChannelCtrl', require('controllers/channels/ChannelCtrl'));
    
    /**
     * Capture
     */
   	controllers.controller('CaptureCtrl', require('controllers/capture/CaptureCtrl'));
    
	controllers.run(['$rootScope', 'NODE_URL', function ($rootScope, NODE_URL) {
		$rootScope.node_url = NODE_URL;
	}]);
    
	return controllers;

});