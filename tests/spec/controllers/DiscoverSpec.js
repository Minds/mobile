"use strict";

define(['angular', 'angular-mocks', 'app'], function(angular, mocks, app) {

	describe('DiscoverCtrl', function() {

		var rootScope, scope, httpBackend, timeout, state, ionicLoading, ionicPopup, q;

		/*
		 * Setup
		 */
		beforeEach(module('ionic'));
		beforeEach(module('app.controllers'));

		beforeEach(inject(function($rootScope, $controller, $timeout, $state, $ionicLoading, $ionicPopup, $q) {
			rootScope = $rootScope;
			scope = $rootScope.$new();
			$controller('DiscoverCtrl', {
				$scope: scope
			});

			timeout = $timeout,
			state = $state,
			ionicLoading = $ionicLoading,
			ionicPopup = $ionicPopup,
			q = $q;
		}));

		/**
		 * Tests
		 */

		it('should return 16 results', function() {

			inject(function($httpBackend) {
				httpBackend = $httpBackend;

				var result = {
					"status": "success",
					"entities": [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]
				};

				httpBackend.when('GET', /.*\/entities\/suggested\/.*/).respond(result);
			});

			scope.load();
			scope.$digest();
			timeout.flush();
			httpBackend.flush();

			expect(scope.entities.length).toEqual(16);
			expect(scope.hasMoreData).toEqual(true);
		});

		it('should stop if no data', function() {

			inject(function($httpBackend) {
				httpBackend = $httpBackend;

				var result = {
					"status": "success",
					"entities": []
				};

				httpBackend.when('GET', /.*\/entities\/suggested\/.*/).respond(result);
			});

			scope.load();
			scope.$digest();
			timeout.flush();
			httpBackend.flush();

			expect(scope.entities.length).toEqual(0);
			expect(scope.hasMoreData).toEqual(false);
		});

		it('should append to existing list of entities', function() {

			inject(function($httpBackend) {
				httpBackend = $httpBackend;

				var result = {
					"status": "success",
					"entities": [{},{},{}]
				};

				httpBackend.when('GET', /.*\/entities\/suggested\/.*/).respond(result);
			});

			scope.entities = [{},{},{}];
			scope.load();
			scope.$digest();
			timeout.flush();
			httpBackend.flush();

			expect(scope.entities.length).toEqual(6);
			expect(scope.hasMoreData).toEqual(true);
		});

		it('should clear entities list on filter change', function() {

			scope.entities = [{},{}];
			scope.changeFilter('trending');

			expect(scope.entities.length).toEqual(0);
			expect(scope.hasMoreData).toEqual(true);
		});

		it('should clear entities list on type change', function() {

			scope.entities = [{},{}];
			scope.changeType('video');

			expect(scope.entities.length).toEqual(0);
			expect(scope.hasMoreData).toEqual(true);
		});

		it('should change to list view for trending and featured', function() {

			scope.changeFilter('trending');
			expect(scope.view).toEqual('list');

			scope.changeFilter('featured');
			expect(scope.view).toEqual('list');

		});

		it('should change to swipe view for suggested', function() {

			scope.view = 'list';
			scope.changeFilter('suggested');
			expect(scope.view).toEqual('swipe');

		});

	});

});
