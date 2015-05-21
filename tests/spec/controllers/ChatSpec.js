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

		var rootScope, scope, httpBackend, timeout, state, ionicLoading, ionicPopup, q, _storage;

		/*
		 * Setup
		 */
		beforeEach(module('ionic'));
		beforeEach(module('app.controllers'));

		beforeEach(inject(function($rootScope, $controller, $timeout, $state, $ionicLoading, $ionicPopup, $q, storage) {
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
			_storage = storage;
		}));

	});

});
