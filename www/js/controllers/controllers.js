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
	
	controllers.controller('RegisterCtrl', require('controllers/RegisterCtrl'));
	
	/**
	 * Newsfeed
	 */
	controllers.controller('NewsfeedCtrl', require('controllers/newsfeed/NewsfeedCtrl'));
	controllers.controller('NewsfeedComposerCtrl', require('controllers/newsfeed/NewsfeedCompoerCtrl'));
	controllers.controller('NewsfeedViewCtrl', require('controllers/newsfeed/NewsfeedViewCtrl'));
	controllers.controller('NewsfeedBoostCtrl', require('controllers/newsfeed/NewsfeedBoostCtrl'));
	
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
    controllers.controller('ChannelEditCtrl', require('controllers/channels/ChannelEditCtrl'));
    controllers.controller('ChannelSubscribersCtrl', require('controllers/channels/ChannelSubscribersCtrl'));
    controllers.controller('ChannelSubscriptionsCtrl', require('controllers/channels/ChannelSubscriptionsCtrl'));
    
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
	
   	
   	/**
   	 * Wallet
   	 */
   	controllers.controller('WalletCtrl', require('controllers/wallet/WalletCtrl'));
   	controllers.controller('WalletDepositCtrl', require('controllers/wallet/WalletDepositCtrl'));
   	controllers.controller('BoostCtrl', require('controllers/wallet/BoostCtrl'));
   	
   	/**
   	 * Invite
   	 */
   	controllers.controller('InviteCtrl', require('controllers/invite/InviteCtrl'));
   	
	controllers.run(['$rootScope', 'NODE_URL', 'storage', function ($rootScope, NODE_URL, storage) {
		$rootScope.node_url = NODE_URL;
		$rootScope.user_guid = storage.get('user_guid');
		$rootScope.points = '...';
		$rootScope.globalCB = Date.now();
	}]);
	
	document.onclick = function (e) {
        e = e ||  window.event;
        var element = e.target || e.srcElement;
 
        if (element.tagName == 'A' && element.href.indexOf('http') >= 0) {
            window.open(element.href, "_blank", "location=yes");
            return false;
        }
    };
    
    window.addEventListener('keypress', function (e) {

        if (e.keyCode == 13) {

        	cordova.plugins.Keyboard.close();

        }

    }, false);
    
	return controllers;

});