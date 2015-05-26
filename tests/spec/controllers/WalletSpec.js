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
			$controller('WalletCtrl', {
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

		it('transactions are empty', function() {
			expect(scope.transactions).toEqual([]);
			expect(scope.hasMoreData).toEqual(true);
		});

		it('should grab wallet count', function() {
			httpBackend.flush();
			expect(scope.points).toEqual(100);
		});

		it('should load list of transactions', function() {
			scope.loadMore();
			httpBackend.flush();
			scope.$digest();

			expect(scope.transactions.length).toEqual(4);
		});

		it('should not load more if hasMoreData is false', function() {
			scope.hasMoreData = false;
			var result = scope.loadMore();
			httpBackend.flush();

			expect(result).toEqual(undefined);
			expect(scope.transactions.length).toEqual(0);
		});

	});

});
