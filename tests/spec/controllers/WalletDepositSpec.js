"use strict";

define(['angular', 'angular-mocks', 'app'], function(angular, mocks, app) {

	describe('Wallet (WalletCtrl)', function() {

		var rootScope, scope, httpBackend, timeout, state, ionicLoading, ionicPopup, q;

		/*
		 * Setup
		 */
		beforeEach(module('ionic'));
		beforeEach(module('app.controllers'));

		beforeEach(inject(function($rootScope, $controller, $timeout, $state, $ionicLoading, $ionicPopup, $q) {
			rootScope = $rootScope;
			scope = $rootScope.$new();
			$controller('WalletDepositCtrl', {
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

			httpBackend.when('POST', /.*\/api\/v1\/wallet\/quote\.*/).respond(function() {
				return [200, {
					"status": "success",
					"usd": scope.data.points * 0.001
				}];
			});
		}));

		beforeEach(inject(function($httpBackend) {
			httpBackend = $httpBackend;

			var result = {
				"status": "success",
				"transactions":[{},{},{},{}]
			};

			httpBackend.when('GET', /.*\/wallet\/transactions\?.*/).respond(result);
		}));

		/**
		 * Tests
		 */

		it('should give a default quoute', function() {
			httpBackend.flush();
			expect(scope.usd).toEqual(1);
		});

		it('should give quote on change', function() {

			scope.data.points = 5000;
			scope.$apply();

			timeout.flush();
			httpBackend.flush();

			expect(scope.data.usd).toEqual(5);
		});

		it('should allow chaning step', function() {
			scope.changeStep('purchase');
			expect(scope.step).toEqual('purchase');
		});

	});

});
