"use strict";

define(['angular', 'angular-mocks', 'app'], function(angular, mocks, app) {

	describe('Channel (ChannelCtrl)', function() {

		var rootScope, scope, httpBackend, timeout, state, ionicLoading, ionicPopup, q, _storage;

		/*
		 * Setup
		 */
		beforeEach(module('ionic'));
		beforeEach(module('app.controllers'));

		beforeEach(inject(function($rootScope, $controller, $timeout, $state, $ionicLoading, $ionicPopup, $q, $stateParams, storage) {

			rootScope = $rootScope;
			scope = $rootScope.$new();
			$controller('ChannelCtrl', {
				$scope: scope,
				$stateParams: { username: "karma" }
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
				"channel": {
					guid: "001",
					city: "cyberspace",
					coordinates: "52.0,-2.0"
				}
			};

			httpBackend.when('GET', /.*\/channel\.*/).respond(result);
		}));

		beforeEach(inject(function($httpBackend) {
			httpBackend = $httpBackend;

			var result = {
				"status": "success",
				"activity": [{},{},{},{},{},{}]
			};

			httpBackend.when('GET', /.*\/newsfeed\/personal\/.*/).respond(result);
		}));

		/**
		 * Tests
		 */

		it('defaults are set', function() {
			expect(scope.loaded).toEqual(false);
			expect(scope.next).toEqual("");
			expect(scope.ChannelItems).toEqual([]);
		});

		it('channel should be loaded and storage set', function() {
			rootScope.guid = "001"; //we are testing against our own channel
			httpBackend.flush();

			expect(scope.channel.guid).toEqual("001");
			expect(scope.channel.city).toEqual("cyberspace");
			expect(_storage.get("city")).toEqual("cyberspace");
			expect(_storage.get("coordinates")).toEqual("52.0,-2.0");
		});

		it('channel newsfeed is requests', function() {
			httpBackend.flush();
			timeout.flush();

			expect(scope.channel.guid).toEqual("001");
			expect(scope.channel.city).toEqual("cyberspace");
			expect(_storage.get("city")).toEqual("cyberspace");
			expect(_storage.get("coordinates")).toEqual("52.0,-2.0");
		});

		it('channel feed should not load until channel is loaded', function() {
			scope.channel = null;
			expect(scope.loadMore()).toEqual(false);
		});

		it('should subscribe', function() {
			httpBackend.flush();
			//set some defaults for our test
			scope.channel = {
				subscribed: false,
				subscribers_count: 10
			};

			//listen for request
			inject(function($httpBackend) {
				httpBackend = $httpBackend;

				var result = { "status": "success" };

				httpBackend.when('POST', /.*\/subscribe\.*/).respond(result);
			});

			scope.subscribe({guid:"002"});
			httpBackend.flush();

			expect(scope.channel.subscribed).toEqual(true);
			expect(scope.channel.subscribers_count).toEqual(11);
		});

		it('should un-subscribe', function() {
			httpBackend.flush();
			//set some defaults for our test
			scope.channel = {
				subscribed: true,
				subscribers_count: 10
			};

			//listen for request
			inject(function($httpBackend) {
				httpBackend = $httpBackend;

				var result = { "status": "success" };

				httpBackend.when('DELETE', /.*\/subscribe\.*/).respond(result);
			});

			scope.unSubscribe({guid:"002"});

			expect(scope.channel.subscribed).toEqual(false);
			expect(scope.channel.subscribers_count).toEqual(9);
		});

	});

	describe('Channel Edit (ChannelEditCtrl)', function() {

		var rootScope, scope, httpBackend, timeout, state, ionicLoading, ionicPopup, q, _storage, ionicHistory;

		/*
		 * Setup
		 */
		beforeEach(module('ionic'));
		beforeEach(module('app.controllers'));

		beforeEach(inject(function($rootScope, $controller, $timeout, $state, $ionicLoading, $ionicPopup, $q, $stateParams, storage, $ionicHistory) {
			rootScope = $rootScope;
			scope = $rootScope.$new();
			$controller('ChannelEditCtrl', {
				$scope: scope,
				$stateParams: { guid: "001" }
			});

			timeout = $timeout,
			state = $state,
			ionicLoading = $ionicLoading,
			ionicPopup = $ionicPopup,
			q = $q,
			_storage = storage,
			ionicHistory = $ionicHistory;
		}));

		beforeEach(inject(function($httpBackend) {
			httpBackend = $httpBackend;

			var result = {
				"status": "success",
				"channel": {
					guid: "001",
					name: "karma",
					username: "karma",
					city: "cyberspace",
					coordinates: "52.0,-2.0"
				}
			};

			httpBackend.when('GET', /.*\/channel\.*/).respond(result);
			httpBackend.flush();
		}));

		beforeEach(inject(function($httpBackend) {
			httpBackend = $httpBackend;

			var result = {
				"status": "success"
			};

			httpBackend.when('POST', /.*\/channel\/.*/).respond(result);
		}));

		/**
		 * Tests
		 */

		it('can not update without a channel name', function() {

			spyOn(ionicPopup, "alert");

			scope.channel.name = "";

			expect(scope.update()).toEqual(false);
			expect(ionicPopup.alert).toHaveBeenCalledWith({
					title: 'Oooops...',
					template: "Your need a name!"
				});
		});

		it('will save and forward', function() {

			spyOn(state, "go");

			scope.update(true);
			httpBackend.flush();

			expect(state.go).toHaveBeenCalledWith('tab.newsfeed-channel', {
						username: 'me',
						refresh: true
					});
		});

		it('can disable account', function() {

			spyOn(scope, "logout");

			//listen for request
			inject(function($httpBackend) {
				httpBackend = $httpBackend;

				var result = { "status": "success" };

				httpBackend.when('DELETE', /.*\/channel\.*/).respond(result);
			});

			scope.disable();
			//httpBackend.flush();
			//expect(scope.logout).toHaveBeenCalledWith();
		});

		it('can logout', function() {

			spyOn(state, "go");
			spyOn(ionicHistory, "clearCache");

			//listen for request
			inject(function($httpBackend) {
				httpBackend = $httpBackend;

				var result = { "status": "success" };

				httpBackend.when('POST', /.*\/logout\.*/).respond(result);
			});

			scope.logout();
			httpBackend.flush();

			expect(_storage.get('loggedin')).toEqual(false);
			expect(_storage.get('access_token')).toEqual(false);
			expect(_storage.get('user_guid')).toEqual(false);

			expect(ionicHistory.clearCache).toHaveBeenCalledWith();
			expect(state.go).toHaveBeenCalledWith('login');
		});

	});

});
