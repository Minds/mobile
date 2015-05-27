"use strict";

define(['angular', 'angular-mocks', 'app'], function(angular, mocks, app) {

	describe('Storage Service', function() {

		var element, scope, rootScope, _storage;

		/*
		 * Setup
		 */
		beforeEach(module('ionic'));
		beforeEach(module('app.services'));

		beforeEach(inject(function($rootScope, $compile, storage) {
			$rootScope.points = 0;
			rootScope = $rootScope,
			_storage = storage;
			window.localStorage.clear();
		}));

		/**
		 * Tests
		 */

		it('should add to storage and get from storage and remove from storage', function() {
			_storage.set("foo","bar");
			expect(_storage.get("foo")).toEqual("bar");

			_storage.remove("foo");
			expect(_storage.get("foo")).toEqual(false);;
		});

		it('should return false if not found', function() {
			expect(_storage.get("foo")).toEqual(false);
		});

		it('should keep type integrity', function() {
			_storage.set("number-1", 1);
			_storage.set("string-1", "1");
			_storage.set("array-1", [1]);
			_storage.set("object-1", {1:1});

			expect(_storage.get("number-1")).toEqual(1);
			expect(_storage.get("string-1")).toEqual("1");
			expect(_storage.get("array-1")).toEqual([1]);
			expect(_storage.get("object-1")).toEqual({1:1});
		});

	});

});
