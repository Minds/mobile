/**
 * Minds::mobile
 * Routes the endpoints to controllers
 *
 * @author Mark Harding
 */

define(['app'], function(app) {
	'use strict';

	app.config(['$stateProvider', '$urlRouterProvider', '$ionicConfigProvider',
	function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

		$ionicConfigProvider.platform.android.tabs.position("bottom");
		$ionicConfigProvider.navBar.alignTitle('center');
		$ionicConfigProvider.views.swipeBackEnabled(false);

		$stateProvider.state('loading', {
			url: "/loading",
			cache: false,
			templateUrl: "templates/loading.html"
			//  controller: 'LoginCtrl'
		}).state('login', {
			url: "/login",
			templateUrl: "templates/login.html"
			//  controller: 'LoginCtrl'
		}).state('register', {
			url: "/register",
			templateUrl: "templates/register.html"
		}).state('tutorial', {
			url: "/tutorial",
			templateUrl: "templates/tutorial.html"
		}).state('tab', {
			url: "/tab",
			abstract: true,
			templateUrl: "templates/tabs.html"
		}).state('tab.newsfeed', {
			url: '/newsfeed',
			//cache: false, //don't cache until we can handle large lists well
			views: {
				'newsfeed-tab': {
					templateUrl: 'templates/newsfeed/list.html'
					//      controller: 'NewsfeedCtrl'
				}
			}
		}).state('tab.newsfeed-wallet', {
			url: '/newsfeed/wallet',
			cache: false,
			views: {
				'newsfeed-tab': {
					templateUrl: 'templates/wallet/balance.html'
				}
			}
		}).state('tab.newsfeed-wallet-deposit', {
			url: '/newsfeed/wallet/deposit',
			cache: false,
			views: {
				'newsfeed-tab': {
					templateUrl: 'templates/wallet/deposit.html'
				}
			}
		}).state('tab.newsfeed-channel', {
			url: "/newsfeed/channel/:username",
			views: {
				'newsfeed-tab': {
					templateUrl: 'templates/channels/channel.html'
				}
			}
		}).state('tab.newsfeed-channel-edit', {
			url: "/newsfeed/channel/:guid/edit",
			views: {
				'newsfeed-tab': {
					templateUrl: 'templates/channels/edit.html'
				}
			}
		}).state('tab.newsfeed-channel-subscribers', {
			url: "/newsfeed/channel/:guid/subscribers",
			views: {
				'newsfeed-tab': {
					templateUrl: 'templates/channels/subscribers.html'
				}
			}
		}).state('tab.newsfeed-channel-subscriptions', {
			url: "/newsfeed/channel/:guid/subscriptions",
			views: {
				'newsfeed-tab': {
					templateUrl: 'templates/channels/subscriptions.html'
				}
			}
		}).state('tab.newsfeed-compose', {
			url: '/newsfeed/compose',
			views: {
				'newsfeed-tab': {
					templateUrl: 'templates/newsfeed/compose.html',
					controller: 'NewsfeedComposerCtrl'
				}
			}
		}).state('tab.newsfeed-view', {
			url: '/newsfeed/:guid',
			views: {
				'newsfeed-tab': {
					templateUrl: 'templates/newsfeed/view.html',
					controller: 'NewsfeedViewCtrl'
				}
			}
		}).state('tab.chat', {
			url: '/gatherings/conversations',
			views: {
				'chat-tab': {
					templateUrl: 'templates/gatherings/chat/list.html'
					//  controller: 'ChatCtrl'
				}
			}
		}).state('tab.chat-conversation', {
			cache: false,
			url: '/gatherings/conversations/:username/:name',
			views: {
				'chat-tab': {
					templateUrl: 'templates/gatherings/chat/conversation.html'
					//   controller: 'ChatConversationCtrl'
				}
			}
		}).state('tab.chat-setup', {
			cache: false,
			url: '/gatherings/key-setup',
			views: {
				'chat-tab': {
					templateUrl: 'templates/gatherings/chat/setup.html',
					controller: 'ChatSetupCtrl'
				}
			}
		}).state('tab.capture', {
			url: '/capture',
			cache: false,
			views: {
				'capture-tab': {
					templateUrl: 'templates/capture/default.html'
					//  controller: 'CaptureCtrl'
				}
			}
		}).state('tab.discover', {
			url: "/discover",
			cache: false,
			views: {
				'discover-tab': {
					templateUrl: 'templates/discover/swipe.html'
				}
			}
		}).state('tab.more', {
			url: "/more",
			views: {
				'more-tab': {
					templateUrl: 'templates/more.html'
				}
			}
		}).state('tab.more-channel', {
			url: "/more/channel/:username",
			views: {
				'more-tab': {
					templateUrl: 'templates/channels/channel.html'
				}
			}
		}).state('tab.notifications', {
			url: '/notifications',
			views: {
				'notifications-tab': {
					templateUrl: 'templates/notifications/list.html'
				}
			}
		}).state('tab.notifications-entity', {
			url: '/notifications/entity/:guid',
			views: {
				'notifications-tab': {
					templateUrl: 'templates/notifications/entity.html'
				}
			}
		}).state('tab.notifications-p2p-review', {
			url: '/notifications/p2p-review',
			views: {
				'notifications-tab': {
					templateUrl: 'templates/notifications/p2p-review.html'
				}
			}
		});

		$urlRouterProvider.otherwise("/loading");

	}]);

});
