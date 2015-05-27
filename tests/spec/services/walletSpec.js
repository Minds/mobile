"use strict";

define(['angular', 'angular-mocks', 'app'], function(angular, mocks, app) {

	describe('Wallet Service', function() {

		var element, scope, rootScope, _storage, _wallet, httpBackend;

		/*
		 * Setup
		 */
		beforeEach(module('ionic'));
		beforeEach(module('app.services'));

		beforeEach(inject(function($rootScope, $compile, storage, wallet) {
			$rootScope.points = 0;
			rootScope = $rootScope,
			_storage = storage,
			_wallet = wallet;
		}));

		beforeEach(inject(function($httpBackend) {
			httpBackend = $httpBackend;

			var result = {
				"status": "success",
				"count":100
			};

			httpBackend.when('GET', /.*\/wallet\/count\/?.*/).respond(result);
		}));

		/**
		 * Tests
		 */

		it('should return a count', function() {
			_wallet.getCount();
			httpBackend.flush();
			expect(rootScope.points).toEqual(100);
		});

		it('should be able to increase count', function() {
			_wallet.increase();
			expect(rootScope.points).toEqual(1);
		});

	});

});
