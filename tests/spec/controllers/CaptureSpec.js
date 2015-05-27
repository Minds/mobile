"use strict";

define(['angular', 'angular-mocks', 'app'], function(angular, mocks, app) {

	describe('Capture (CaptureCtrl)', function() {

		var rootScope, scope, httpBackend, timeout, state, ionicLoading, ionicPopup, q;

		/*
		 * Setup
		 */
		beforeEach(module('ionic'));
		beforeEach(module('app.controllers'));

		beforeEach(inject(function($rootScope, $controller, $timeout, $state, $ionicLoading, $ionicPopup, $q) {
			rootScope = $rootScope;
			scope = $rootScope.$new();
			$controller('CaptureCtrl', {
				$scope: scope
			});

			//boost is  showed in a modal, so lets mock one
			scope.modal = {
				remove: function() {}
			};
			scope.guid = "1234";
			scope.owner_guid = "karma"; //this is also always inferred from the controller

			timeout = $timeout,
			state = $state,
			ionicLoading = $ionicLoading,
			ionicPopup = $ionicPopup,
			q = $q;
		}));

		beforeEach(inject(function() {
			//hacky mock to test video
			navigator.device = {
				capture: {
					captureVideo: function(success_cb, error_cb, configs) {
						var mediaItems = [];
						for (var i = 0; i < configs.limit; i +=1) {
							mediaItems.push({ fullPath: "path://demo" });
						}
						success_cb(mediaItems);
					},
					captureImage: function(success_cb, error_cb, configs) {
						var mediaItems = [];
						for (var i = 0; i < configs.limit; i +=1) {
							mediaItems.push({ fullPath: "path://demo" });
						}
						success_cb(mediaItems);
					}
				}
			};
			navigator.camera = {
				getPicture: function(success_cb, error_cb, configs) {
					var mediaItem = "file://orange.jpg";
					success_cb(mediaItem);
				}
			};
			window.Camera = {
				DestinationType: {
					FILE_URI: "uri"
				}
			};
		}));

		beforeEach(inject(function($httpBackend) {
			httpBackend = $httpBackend;

			var result = {
				"status": "success",
				"activity_guid": "002"
			};

			httpBackend.when('POST', /.*\/archive\.*/).respond(result);
		}));

		beforeEach(inject(function($httpBackend) {
			httpBackend = $httpBackend;

			var result = {
				"status": "success",
				"guid": "001"
			};

			httpBackend.when('POST', /.*\/newsfeed\.*/).respond(result);
		}));

		/**
		 * Tests
		 */

		it('should have defaults', function() {
			expect(scope.captured).toEqual(false);
			expect(scope.progress).toEqual(0);
		});

		it('should capture and return video', function() {

			spyOn(scope, "upload");

			scope.video();
			expect(scope.type).toEqual('video');
			expect(scope.captured).toEqual(true);
			expect(scope.upload).toHaveBeenCalledWith("path://demo", 'video');

		});

		it('should capture and return image', function() {

			spyOn(scope, "upload");

			scope.photo();
			expect(scope.type).toEqual('image');
			expect(scope.captured).toEqual(true);
			expect(scope.upload).toHaveBeenCalledWith("path://demo", 'image');

		});

		it('should capture and return from library', function() {

			spyOn(scope, "upload");

			scope.library();
			expect(scope.type).toEqual('image');
			expect(scope.captured).toEqual(true);
			expect(scope.upload).toHaveBeenCalledWith("file://orange.jpg", 'image');

		});

		it('should reset', function() {
			scope.captured = true;
			scope.reset();
			expect(scope.captured).toEqual(false);
		});

		it('should allow us to save an upload', function() {

			spyOn(scope, "$emit");
			spyOn(state, "go");

			scope.captured = true;
			scope.form.title = "my orange";
			scope.guid = "001";
			scope.save();
			httpBackend.flush();

			expect(scope.$emit).toHaveBeenCalledWith("newsfeed:updated");
			expect(scope.$emit).toHaveBeenCalledWith("newsfeed:boost", "002");
			expect(state.go).toHaveBeenCalledWith("tab.newsfeed", {}, {reload:true});
			expect(scope.captured).toEqual(false);
			expect(scope.guid).toEqual(false);

		});

		it('should not post status if no text', function() {
			expect(scope.postStatus()).toEqual(false);
		});

		it('should post a status', function() {

			spyOn(scope.modal, "remove");
			spyOn(scope, "$emit");
			spyOn(state, "go");

			scope.form.status = "Hello bright sparks";
			scope.postStatus();
			httpBackend.flush();

			expect(scope.modal.remove).toHaveBeenCalledWith();
			expect(scope.$emit).toHaveBeenCalledWith("newsfeed:updated");
			expect(scope.$emit).toHaveBeenCalledWith("newsfeed:boost", "001");
			expect(state.go).toHaveBeenCalledWith("tab.newsfeed", {}, {reload:true});

		});

	});

});
