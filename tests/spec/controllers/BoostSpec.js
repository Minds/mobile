"use strict";

define(['angular', 'angular-mocks', 'app'], function(angular, mocks, app) {

	describe('Boost (NewsfeedBoostCtrl)', function() {

		var rootScope, scope, httpBackend, timeout, state, ionicLoading, ionicPopup, q;

		/*
		 * Setup
		 */
		beforeEach(module('ionic'));
		beforeEach(module('app.controllers'));

		beforeEach(inject(function($rootScope, $controller, $timeout, $state, $ionicLoading, $ionicPopup, $q) {
			rootScope = $rootScope;
			scope = $rootScope.$new();
			$controller('NewsfeedBoostCtrl', {
				$scope: scope
			});

			//boost is  showed in a modal, so lets mock one
			scope.modal = {
				remove: function() {}
			};
			scope.guid = "1234";
			scope.owner_guid = "karma"; //this is also always inferred from the controller

			timeout = $timeout,
			state = $state,
			ionicLoading = $ionicLoading,
			ionicPopup = $ionicPopup,
			q = $q;
		}));

		beforeEach(inject(function($httpBackend) {
			httpBackend = $httpBackend;

			var result = {
				"status": "success",
				"rate": 0.5
			};

			httpBackend.when('GET', /.*\/boost\/rates\?.*/).respond(result);
		}));

		beforeEach(inject(function($httpBackend) {
			httpBackend = $httpBackend;

			var result = {
				"status": "success",
				"count": 100,
				"cap":99
			};

			httpBackend.when('GET', /.*\/wallet\/count\?.*/).respond(result);
		}));

		/**
		 * Tests
		 */

		it('default step is 1', function() {
			expect(scope.data.step).toEqual(1);
		});

		it('can change step', function() {
			scope.nextStep();
			expect(scope.data.step).toEqual(2);
		});

		it('points to view calculation updates', function() {

			httpBackend.flush();

			scope.data.points = 10;
			scope.$digest(); //trigger the $watch

			expect(scope.data.impressions).toEqual(5);
		});

		it('points to view calculation updates', function() {

			httpBackend.flush();

			scope.data.points = 10;
			scope.$digest(); //trigger the $watch

			expect(scope.data.impressions).toEqual(5);
		});

		it('warns if user has not entered any points', function() {
			scope.data.points = 0;
			expect(scope.boost()).toEqual(false);
			scope.data.points = null;
			expect(scope.boost()).toEqual(false);
		});

		it('warns if entered points is a decimal', function() {
			scope.data.points = 0.75;
			expect(scope.boost()).toEqual(false);
		});

		it('should fail if we don\'t have enough points', function() {

			scope.data.points = 200;
			scope.$digest();
			var promise = scope.boost(),
				resolved;

			promise.then(function(value) {
				resolved = value;
			});
			rootScope.$apply();
			httpBackend.flush();

			expect(resolved).toEqual(false);

		});

		it('should fail if over the cap', function() {

			scope.data.points = 100;
			scope.$digest();
			var promise = scope.boost(),
				resolved;

			promise.then(function(value) {
				resolved = value;
			});
			rootScope.$apply();
			httpBackend.flush();

			expect(resolved).toEqual(false);

		});

		it('should go through and be successful', function() {

			inject(function($httpBackend) {
				httpBackend = $httpBackend;

				var result = {
					"status": "success"
				};

				httpBackend.when('POST', /.*\/boost\/newsfeed\/?.*/).respond(result);
			});

			scope.data.points = 50;
			scope.$digest();
			var promise = scope.boost(),
				resolved;

			promise.then(function(value) {
				resolved = value;
			});
			rootScope.$apply();
			httpBackend.flush();

			expect(resolved).toEqual(true);

		});

		it('should let us know if there was a server error and failed', function() {

			inject(function($httpBackend) {
				httpBackend = $httpBackend;

				var result = {
					"status": "error",
					"message": "500 server error"
				};

				httpBackend.when('POST', /.*\/boost\/newsfeed\/?.*/).respond(result);
			});

			scope.data.points = 50;
			scope.$digest();
			var promise = scope.boost(),
				resolved;

			promise.then(function(value) {
				resolved = value;
			});
			rootScope.$apply();
			httpBackend.flush();

			expect(resolved).toEqual(false);

		});

		it('should send a p2p boost to selected channel', function() {

			inject(function($httpBackend) {
				httpBackend = $httpBackend;

				var result = {
					"status": "success"
				};

				httpBackend.when('POST', /.*\/boost\/channel\/.*/, function(data) {
					if (JSON.parse(data).destination == "voodoo")
						return true;
				}).respond(result);
			});

			scope.selectDestination({ username:"voodoo"});
			expect(scope.data.step).toEqual(2);

			scope.data.points = 50;

			var promise = scope.boost(),
				resolved;

			promise.then(function(value) {
				resolved = value;
			});
			rootScope.$apply();
			httpBackend.flush();

			expect(resolved).toEqual(true);
		});

	});

});
