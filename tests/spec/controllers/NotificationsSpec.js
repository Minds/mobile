"use strict";

define(['angular', 'angular-mocks', 'app'], function(angular, mocks, app) {

	describe('Notifications (NotificationsCtrl)', function() {

		var rootScope, scope, httpBackend, timeout, state, ionicLoading, ionicPopup, q;

		/*
		 * Setup
		 */
		beforeEach(module('ionic'));
		beforeEach(module('app.controllers'));

		beforeEach(inject(function($rootScope, $controller, $timeout, $state, $ionicLoading, $ionicPopup, $q) {
			rootScope = $rootScope;
			scope = $rootScope.$new();
			$controller('NotificationsCtrl', {
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
				"notifications": [{},{},{},{},{},{},{},{},{},{},{},{}],
				"load-next": "002"
			};

			httpBackend.when('GET', /.*\/api\/v1\/notifications\.*/).respond(result);
		}));

		/**
		 * Tests
		 */

		it('should have defaults', function() {
			expect(scope.next).toEqual("");
			expect(scope.hasMoreData).toEqual(true);
			expect(scope.inprogress).toEqual(false);
			expect(scope.notificationItems).toEqual([]);
		});

		it('should remove yellow icons on enter', function() {
			rootScope.newNotification = true;
			rootScope.$broadcast('$stateChangeStart', {name: 'tab.notifications'}, {},  {name: 'tab.notifications'}, {});
			expect(rootScope.newNotification).toEqual(false);
		});

		it('should load new notifications', function() {
			scope.loadMore();
			expect(scope.inprogress).toEqual(true);
			httpBackend.flush();
			expect(scope.inprogress).toEqual(false);
			expect(scope.notificationItems.length).toEqual(12);
			expect(scope.next).toEqual("002");
		});

		it('should refresh', function() {
			rootScope.newNotification = true;
			scope.refresh();
			expect(scope.inprogress).toEqual(true);
			expect(rootScope.newNotification).toEqual(false);

			httpBackend.flush();
			expect(scope.inprogress).toEqual(false);
			expect(scope.notificationItems.length).toEqual(12);
			expect(scope.next).toEqual("002");
		});

	});

});
