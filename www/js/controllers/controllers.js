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
		
	controllers.controller('LoadingCtrl', require('controllers/LoadingCtrl'));
	controllers.controller('TutorialCtrl', require('controllers/TutorialCtrl'));	
	
	/**
	 * Tabs
	 */
	controllers.controller('TabsCtrl', require('controllers/TabsCtrl'));

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
    controllers.controller('ChannelSubscribersCtrl', require('controllers/channels/ChannelSubscribersCtrl'));
    
    /**
     * Capture
     */
   	controllers.controller('CaptureCtrl', require('controllers/capture/CaptureCtrl'));
   	
   	/**
     * Notifications
     */
   	controllers.controller('NotificationsCtrl', require('controllers/notifications/NotificationsCtrl'));
   	controllers.controller('NotificationsEntityCtrl', require('controllers/notifications/NotificationsEntityCtrl'));
   	
   	/**
     * Discover
     */
   	controllers.controller('DiscoverCtrl', require('controllers/discover/DiscoverCtrl'));
    
	controllers.run(['$rootScope', 'NODE_URL', 'storage', function ($rootScope, NODE_URL, storage) {
		$rootScope.node_url = NODE_URL;
		$rootScope.user_guid = storage.get('user_guid');
	}]);
    
	return controllers;

});