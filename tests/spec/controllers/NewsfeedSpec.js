"use strict";

define(['angular', 'angular-mocks', 'app'], function(angular, mocks, app) {

	describe('NewsfeedCtrl', function() {

		var rootScope, scope, httpBackend, timeout, state;

		/*
		 * Setup
		 */
		beforeEach(module('ionic'));
		beforeEach(module('app.controllers'));

		beforeEach(inject(function($rootScope, $controller, $timeout, $state) {
			rootScope = $rootScope;
			scope = $rootScope.$new();
			$controller('NewsfeedCtrl', {
				$scope: scope
			});
			timeout = $timeout;
			state = $state;

		}));

		/**
		 * Tests
		 */

		it('newsfeedItems should be empty array', function() {
			expect(scope.newsfeedItems).toEqual([]);
		});

		it('hasMoreData should be true', function() {
			expect(scope.hasMoreData).toEqual(true);
		});

		/**
		 * Get newsfeed
		 */
		it('loadMore() should return 12 results', function() {

			//catch the api request
			inject(function($httpBackend) {
				httpBackend = $httpBackend;

				var result = {
					"status": "success",
					"activity": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
				};

				httpBackend.when('GET', /.*\/newsfeed\?.*/).respond(result);
			});

			scope.loadMore();

			timeout.flush();
			//newsfeed has a timeout..
			httpBackend.flush();

			expect(scope.newsfeedItems.length).toEqual(12);
			expect(scope.hasMoreData).toEqual(true);
		});

		/*
		 * Catch a failure from the server side
		 */
		it('loadMore() should catch failure', function() {

			//catch the api request
			inject(function($httpBackend) {
				httpBackend = $httpBackend;

				var result = {
					"error": "There was a server side error",
					"code": 500
				};

				httpBackend.when('GET', /.*\/newsfeed\?.*/).respond(result);
			});

			scope.loadMore();

			timeout.flush();
			//newsfeed has a timeout..
			httpBackend.flush();

			expect(scope.newsfeedItems.length).toEqual(0);
			expect(scope.hasMoreData).toEqual(false);

		});

		/**
		 * Detect if the user isn't authenticated @todo
		 */
		it('loadMore() should catch not authenticated', function() {

			//inject(function($httpBackend){
			//	httpBackend = $httpBackend;
			//
			//	var result = {
			//		"error": "Sorry, you are not authenticated",
			//		"code": 401
			//		};
			//
			//	httpBackend.when('GET', /.*\/newsfeed\?.*/).respond(result);
			//});

			//scope.loadMore();

			//rootScope.$apply();

			//timeout.flush(); //newsfeed has a timeout..
			//httpBackend.flush();

			//expect(scope.newsfeedItems.length).toEqual(0);
			//expect(scope.hasMoreData).toEqual(false);

		});

		/**
		 * Refresh content test
		 */
		it('refresh should reload content', function() {

			//catch the api request
			inject(function($httpBackend) {
				httpBackend = $httpBackend;

				var result = {
					"status": "success",
					"activity": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
				};

				httpBackend.when('GET', /.*\/newsfeed\?.*/).respond(result);
			});

			scope.hasMoreData = false;
			scope.refresh();

			httpBackend.flush();

			expect(scope.newsfeedItems.length).toEqual(12);
			expect(scope.hasMoreData).toEqual(true);

		});

		/**
		 * Thumbs up test
		 */
		it('thumbs up', function() {

			//initialize our data
			scope.newsfeedItems = [{
				'guid': "1234",
				'thumbs:up:count': 1,
				'thumbs:up:guids': [],
				'owner_guid': "karma"
			}];

			//catch the request
			inject(function($httpBackend, storage) {
				httpBackend = $httpBackend;
				var result = {
					"status": "success"
				};
				httpBackend.when('POST', /.*\/thumbs\?.*/).respond(result);

				storage.set('user_guid', 'karma');
			});

			//increment to counter
			scope.thumbsUp("1234");
			expect(scope.newsfeedItems[0]['thumbs:up:count']).toEqual(2);

			//now lets cancel and decrement the counter
			scope.thumbsUp("1234");
			expect(scope.newsfeedItems[0]['thumbs:up:count']).toEqual(1);

		});

		/**
		 * Thumbs down test
		 */
		it('thumbs down', function() {

			//initialize our data
			scope.newsfeedItems = [{
				'guid': "1234",
				'thumbs:down:count': 1,
				'thumbs:down:guids': [],
				'owner_guid': "karma"
			}];

			//catch the api request
			inject(function($httpBackend, storage) {
				httpBackend = $httpBackend;
				var result = {
					"status": "success"
				};
				httpBackend.when('POST', /.*\/thumbs\?.*/).respond(result);

				storage.set('user_guid', 'karma');
			});

			//increment to counter
			scope.thumbsDown("1234");
			expect(scope.newsfeedItems[0]['thumbs:down:count']).toEqual(2);

			//now lets cancel and decrement
			scope.thumbsDown("1234");
			expect(scope.newsfeedItems[0]['thumbs:down:count']).toEqual(1);

		});

		/**
		 * Remind test
		 */
		it('remind', function() {

			//initialize our data
			scope.newsfeedItems = [{
				'guid': "1234",
				'reminds': 0,
				'owner_guid': "karma"
			}];

			//catch the api request
			inject(function($httpBackend, storage) {
				httpBackend = $httpBackend;
				var result = {
					"status": "success"
				};
				httpBackend.when('POST', /.*\/newsfeed\/remind\?.*/).respond(result);

				storage.set('user_guid', 'karma');
			});

			//increment to counter
			scope.remind({
				'guid': "1234",
				'reminds': 0
			});
			expect(scope.newsfeedItems[0]['reminds']).toEqual(1);

		});

		/**
		 * Remove a newsfeed item
		 */
		it('will not allow a p2p boost being removed', function() {
			//initialize our data
			scope.newsfeedItems = [{
				'guid': "1234",
				'p2p_boosted': true,
				'owner_guid': "karma"
			}];

			//catch the api request
			inject(function($httpBackend, storage) {
				httpBackend = $httpBackend;
				var result = {
					"status": "error",
					"message": "can not delete p2p boosts"
				};
				httpBackend.when('DELETE', /.*\/newsfeed\/.*\?.*/).respond(result);

				storage.set('user_guid', 'karma');
			});

			//increment to counter
			scope.remove("1234");
			httpBackend.flush();
			expect(scope.newsfeedItems.length).toEqual(1);
		});

		it('will not allow a user to remove someone elses content', function() {
			//initialize our data
			scope.newsfeedItems = [{
				'guid': "1234",
				'p2p_boosted': false,
				'owner_guid': "voodoo"
			}];

			//catch the api request
			inject(function($httpBackend, storage) {
				httpBackend = $httpBackend;
				var result = {
					"status": "error",
					"message": "could not remove"
				};
				httpBackend.when('DELETE', /.*\/newsfeed\/.*\?.*/).respond(result);

				storage.set('user_guid', 'karma');
			});

			//increment to counter
			scope.remove("1234");
			httpBackend.flush();
			expect(scope.newsfeedItems.length).toEqual(1);
		});

		it('will not allow me to remove my own content', function() {
			//initialize our data
			scope.newsfeedItems = [{
				'guid': "1234",
				'p2p_boosted': false,
				'owner_guid': "karma"
			}];

			//catch the api request
			inject(function($httpBackend, storage) {
				httpBackend = $httpBackend;
				var result = {
					"status": "success"
				};
				httpBackend.when('DELETE', /.*\/newsfeed\/.*\?.*/).respond(result);

				storage.set('user_guid', 'karma');
			});

			//increment to counter
			scope.remove("1234");
			httpBackend.flush();
			expect(scope.newsfeedItems.length).toEqual(0);
		});

	});

});
