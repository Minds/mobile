"use strict";

define(['angular', 'angular-mocks', 'app'], function(angular, mocks, app) {

	describe('Register', function() {

		var rootScope, scope, httpBackend, timeout, state, ionicLoading, ionicPopup, q;

		/*
		 * Setup
		 */
		beforeEach(module('ionic'));
		beforeEach(module('app.controllers'));

		beforeEach(inject(function($rootScope, $controller, $timeout, $state, $ionicLoading, $ionicPopup, $q) {
			rootScope = $rootScope;
			scope = $rootScope.$new();
			$controller('RegisterCtrl', {
				$scope: scope
			});

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
				"count": 100,
				"cap":99
			};


			httpBackend.when('GET', /.*\/api\/v1\/wallet\/count\.*/).respond(result);
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

		/*it('should allow registration', function() {
			scope.data = {
				username: "mark",
				email: "mark@minds.com",
				password: "you-think-im-going-to-tell-you?"
			};
			scope.register();
			expect(scope.inprogress).toEqual(true);
			httpBackend.flush();
			expect(scope.inprogress).toEqual(false);

		});*/

	});

});
