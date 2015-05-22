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

});
