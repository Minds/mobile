"use strict";

define(['angular', 'angular-mocks', 'app'], function(angular, mocks, app) {

	describe('Thumbs Directive', function() {

		var element, scope, rootScope, _storage;

		/*
		 * Setup
		 */
		beforeEach(module('ionic'));
		beforeEach(module('app.directives'));

		beforeEach(inject(function($rootScope, $compile, storage) {
			element = angular.element('<div thumbs="{{guids}}"></>');
			scope = $rootScope;
			rootScope = $rootScope;
			scope.guids = [];
			$compile(element)(scope);
			scope.$digest();

			_storage = storage;
		}));

		/**
		 * Tests
		 */

		it('should not be highlighted', function() {
			var tag = element;
			expect(tag.hasClass('selected')).toEqual(false);
		});

		it('should be highlighted', function() {
			var tag = element;
			_storage.set('user_guid','001');
			scope.guids = [_storage.get('user_guid')];
			scope.$digest();
			expect(tag.hasClass('selected')).toEqual(true);
		});

	});

});
