"use strict";

define(['angular', 'angular-mocks', 'app'], function(angular, mocks, app) {

	describe('Register', function() {

		var rootScope, scope, httpBackend, timeout, state, ionicLoading, ionicPopup, q, _storage;

		/*
		 * Setup
		 */
		beforeEach(module('ionic'));
		beforeEach(module('app.controllers'));

		beforeEach(inject(function($rootScope, $controller, $timeout, $state, $ionicLoading, $ionicPopup, $q, storage, push, $ionicModal) {
			rootScope = $rootScope;
			scope = $rootScope.$new();
			$controller('RegisterCtrl', {
				$scope: scope
			});

			//cancel these..
			push.register = function() {};
			$ionicModal.fromTemplateUrl = function() {
				return {
					then: function() {}
					};
			};

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
				"status": "success"
			};

			httpBackend.when('POST', /.*\/api\/v1\/register\.*/, function(data) {
					data = JSON.parse(data);
					if (data.username == "mark" && data.email == "mark@minds.com" && data.password == "you-think-im-going-to-tell-you?")
						return true;
				}).respond(result);
		}));

		beforeEach(inject(function($httpBackend) {
			httpBackend = $httpBackend;

			var result = {
				"status": "success",
				"user_id": "001",
				"access_token": "abc123"
			};

			httpBackend.when('POST', /.*\/oauth2\/token\.*/, function(data) {
					data = JSON.parse(data);
					if (data.username == "mark" && data.password == "you-think-im-going-to-tell-you?")
						return true;
				}).respond(result);
		}));

		it('should cancel registration if no data inputed', function() {
			expect(scope.register()).toEqual(false);
		});

		it('should cancel registration if no username inputed', function() {
			scope.data = {
				email: "mark@minds.com",
				password: "you-think-im-going-to-tell-you?"
			};
			expect(scope.register()).toEqual(false);
		});

		it('should cancel registration if no email inputed', function() {
			scope.data = {
				username: "mark",
				password: "you-think-im-going-to-tell-you?"
			};
			expect(scope.register()).toEqual(false);
		});

		it('should cancel registration if no password inputed', function() {
			scope.data = {
				username: "mark",
				email: "mark@minds.com"
			};
			expect(scope.register()).toEqual(false);
		});

		it('should allow registration', function() {
			scope.data = {
				username: "mark",
				email: "mark@minds.com",
				password: "you-think-im-going-to-tell-you?"
			};
			scope.register();
			expect(scope.inprogress).toEqual(true);
			httpBackend.flush();
			expect(scope.inprogress).toEqual(false);

		});

		it('should login after registration', function() {
			window.localStorage.clear();
			scope.data = {
				username: "mark",
				email: "mark@minds.com",
				password: "you-think-im-going-to-tell-you?"
			};
			scope.register();
			httpBackend.flush();

			expect(_storage.get('user_guid')).toEqual('001');
			expect(_storage.get('loggedin')).toEqual(true);
			expect(_storage.get('access_token')).toEqual('abc123');
		});

	});

});
