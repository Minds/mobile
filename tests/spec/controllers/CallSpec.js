"use strict";

define(['angular', 'angular-mocks', 'app', 'socketMock'], function(angular, mocks, app, socketMock) {

	describe('Call (Caller) (CallCtrl)', function() {

		var rootScope, scope, httpBackend, timeout, state, ionicLoading, ionicPopup, q, _storage, socket;

		/*
		 * Setup
		 */
		beforeEach(module('ionic'));
		beforeEach(module('app.controllers'));

		beforeEach(inject(function($rootScope, $controller, $timeout, $state, $ionicLoading, $ionicPopup, $q, storage) {
			rootScope = $rootScope;
			scope = $rootScope.$new();

			$controller('CallCtrl', {
				$scope: scope,
				socket: socketMock
			});

			timeout = $timeout,
			state = $state,
			ionicLoading = $ionicLoading,
			ionicPopup = $ionicPopup,
			q = $q,
			_storage = storage;

		}));

		beforeEach(inject(function() {
			scope.callConfig = {
				guid: "002",
				initiator: true
			};
		}));

		beforeEach(inject(function() {
		}));

		/**
		 * Tests
		 */
		it('should start call on load', function() {
		//	socketMock.receive('turnToken');
		//	expect(_socket.emit).toHaveBeenCalledWith("turnToken");
		});

	});

});
