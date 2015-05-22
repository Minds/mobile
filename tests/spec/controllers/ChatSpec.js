"use strict";

define(['angular', 'angular-mocks', 'app'], function(angular, mocks, app) {

	describe('Chat Setup (ChatSetupCtrl)', function() {

		var rootScope, scope, httpBackend, timeout, state, ionicLoading, ionicPopup, q, _storage;

		/*
		 * Setup
		 */
		beforeEach(module('ionic'));
		beforeEach(module('app.controllers'));

		beforeEach(inject(function($rootScope, $controller, $timeout, $state, $ionicLoading, $ionicPopup, $q, storage) {
			rootScope = $rootScope;
			scope = $rootScope.$new();
			$controller('ChatSetupCtrl', {
				$scope: scope
			});

			timeout = $timeout,
			state = $state,
			ionicLoading = $ionicLoading,
			ionicPopup = $ionicPopup,
			q = $q,
			_storage = storage;
		}));


		beforeEach(inject(function($httpBackend) {
			httpBackend = $httpBackend;

			var result = {
				"status": "success",
				"key": "PRIVATEKEY"
			};

			httpBackend.when('POST', /.*\/keys\/setup\.*/).respond(result);
		}));

		beforeEach(inject(function($httpBackend) {
			httpBackend = $httpBackend;

			var result = {
				"status": "success",
				"channel": {chat:true}
			};

			httpBackend.when('GET', /.*\/channel\/me\?.*/).respond(result);
		}));

		/**
		 * Tests
		 */

		it('should be unconfigured by default', function() {
			expect(scope.configured).toEqual(false);
		});

		it('should check the server to see if we have chat configured', function() {
			httpBackend.flush();
			expect(scope.configured).toEqual(true);
		});

		it('should warn if password not entered', function() {
			expect(scope.setup()).toEqual(false);
		});

		it('should warn if password do not match', function() {
			scope.data.password = 'password1';
			scope.data.password2 = 'password2';
			expect(scope.setup()).toEqual(false);
		});

		it('should set key', function() {
			state.go = function() {};

			scope.data.password = 'password1';
			scope.data.password2 = 'password1';
			scope.setup();

			httpBackend.flush();

			expect(_storage.get('private-key')).toEqual("PRIVATEKEY");
		});

	});

	describe('Chat Listings (ChatCtrl)', function() {

		var rootScope, scope, httpBackend, timeout, state, ionicLoading, ionicPopup, q, _storage, _push;

		/*
		 * Setup
		 */
		beforeEach(module('ionic'));
		beforeEach(module('app.controllers'));

		beforeEach(inject(function($rootScope, $controller, $timeout, $state, $ionicLoading, $ionicPopup, $q, storage, push) {
			rootScope = $rootScope;
			scope = $rootScope.$new();
			$controller('ChatCtrl', {
				$scope: scope
			});

			timeout = $timeout,
			state = $state,
			ionicLoading = $ionicLoading,
			ionicPopup = $ionicPopup,
			q = $q,
			_storage = storage,
			_push = push;
		}));

		beforeEach(inject(function($httpBackend) {
			httpBackend = $httpBackend;

			var result = {
				"status": "success",
				"conversations": [{},{},{}]
			};

			httpBackend.when('GET', /.*\/conversations\?.*/).respond(result);
		}));

		it('should forward to setup if storage not set', function() {

			_storage.remove('private-key');

			state.go = function(tab) {
				expect(tab).toEqual('tab.chat-setup');
			};

			rootScope.$broadcast('$ionicView.beforeEnter');
		});

		it('defaults should be set', function() {
			expect(scope.conversations).toEqual([]);
			expect(scope.next).toEqual("");
			expect(scope.hasMoreData).toEqual(true);
			expect(scope.inprogress).toEqual(false);
		});

		it('should not laod list if private key is not set', function() {
			_storage.remove('private-key');

			var result = scope.loadMore();
			expect(result).toEqual(false);
			expect(scope.conversations).toEqual([]);
			expect(scope.inprogress).toEqual(false);

		});

		it('should laod list', function() {
			_storage.set('private-key', 123);
			scope.loadMore();
			expect(scope.inprogress).toEqual(true);

			httpBackend.flush();
			expect(scope.conversations.length).toEqual(3);
			expect(scope.inprogress).toEqual(false);

		});

		it('should refresh on push noticications', function() {
			_storage.set('private-key', 123);
			state.current = {
				name: 'tab.chat'
			};

			expect(scope.conversations.length).toEqual(0);

			_push.__trigger('chat');
			scope.$apply();
			expect(scope.inprogress).toEqual(true);
			httpBackend.flush();
			expect(scope.conversations.length).toEqual(3);
			expect(scope.inprogress).toEqual(false);

		});

	});

	describe('Chat Conversations (ChatConversationCtrl)', function() {

		var rootScope, scope, httpBackend, timeout, state, ionicLoading, ionicPopup, q, _storage, _push, stateParams;

		/*
		 * Setup
		 */
		beforeEach(module('ionic'));
		beforeEach(module('app.controllers'));

		beforeEach(inject(function($rootScope, $controller, $timeout, $state, $ionicLoading, $ionicPopup, $q, storage, push) {
			rootScope = $rootScope;
			scope = $rootScope.$new();
			stateParams = {
				username: "guid1",
				name: "karma"
			};
			$controller('ChatConversationCtrl', {
				$scope: scope,
				$stateParams: stateParams
			});

			timeout = $timeout,
			state = $state,
			ionicLoading = $ionicLoading,
			ionicPopup = $ionicPopup,
			q = $q,
			_storage = storage,
			_push = push;
		}));

		beforeEach(inject(function($httpBackend) {
			httpBackend = $httpBackend;

			httpBackend.when('GET', /.*\/conversations\.*/).respond(function() {
				var result = {
					"status": "success",
					"messages": [{},{},{}],
					"publickeys": {}
				};
				result.publickeys[scope.guid] = "publickey";
				return [200, result];
			});
		}));

		it('defaults should be set', function() {
			expect(scope.guid).toEqual("guid1");
			expect(scope.name).toEqual("karma");
			expect(scope.messages).toEqual([]);
			expect(scope.next).toEqual("");
			expect(scope.hasMoreData).toEqual(true);
		});

		it('should load new content', function() {
			httpBackend.flush();
			expect(scope.messages.length).toEqual(3);
		});

		it('should listen to push notification', function() {
			httpBackend.flush();

			rootScope.newChat = true;
			_push.__trigger('chat');
			scope.$apply();
			httpBackend.flush();

			expect(rootScope.newChat).toEqual(false);

		});

		it('should not send message if empty', function() {
			expect(scope.send()).toEqual(false);
		});

		it('should not send message if over 180 characters', function() {
			scope.message = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." +
							"Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." +
							"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur." +
							"xcepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
			expect(scope.send()).toEqual(false);
		});

		it('should send message', function() {
			scope.message = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
			scope.send();
		});

		it('should go back to main listing on view close', function() {
			timeout.flush();
			state.go = function(tab) {
				expect(tab).toEqual('tab.chat');
			};
			document.dispatchEvent(new CustomEvent("pause", {}));
		});

	});
});
