/**
 * Minds::mobile
 * Newsfeed views
 *
 * @author Mark Harding
 */

define(function() {
	'use strict';

	function ctrl($rootScope, $scope, $stateParams, Client, $ionicLoading, $ionicActionSheet, $ionicHistory) {

		$scope.guid = "";
		$scope.cb = Date.now();
		$scope.activity = {};
		$scope.comments = [];
		$scope.comment = {};
		$scope.comment.body = '';
		

		$scope.init = function(){
			Client.get('api/v1/newsfeed/single/' + $stateParams.guid, {}, function(success) {
				$scope.activity = success.activity;
				if ($scope.activity.entity_guid) {
					$scope.guid = $scope.activity.entity_guid;
				} else {
					$scope.guid = $scope.activity.guid;
				}

				$scope.offset = "";
				$scope.hasMore = true;
				$scope.getComments();
			});
		};
		$scope.init();

		$scope.inprogress = false;
		$scope.getComments = function() {

			if ($scope.inprogress) {
				return false;
			}
			$scope.inprogress = true;
			/**
			 * Gather comments
			 */
			Client.get('api/v1/comments/' + $scope.guid, {
				cb: $scope.cb,
				limit: 12,
				offset: $scope.offset
			}, function(data) {

				$scope.inprogress = false;

				if (!data.comments || data.comments.length === 0) {
					$scope.hasMore = false;
					return false;
				}

				$scope.comments = $scope.comments.concat(data.comments);
				$scope.offset = data['load-next'];
				console.log($scope.offset);

				if ($scope.offset == null) {
					$scope.hasMore = false;
				}

				$scope.$broadcast('scroll.infiniteScrollComplete');

			}, function(error) {
				$scope.inprogress = false;
			});

		};

		$scope.submit = function() {
			if (!$scope.comment.body) {
				return;
			}
			$ionicLoading.show({
				template: '<i class="icon ion-loading-d"></i>'
			});

			Client.post('api/v1/comments/' + $scope.guid, {
				comment: encodeURIComponent($scope.comment.body)
			}, function(data) {
				$ionicLoading.hide();
				$scope.comments.push(data.comment);
				$scope.cb = Date.now();

			}, function(error) {
			});
			$scope.comment.body = '';
		};

		$scope.removeComment = function(comment) {
			var guid = comment.guid;
			if (comment.owner_guid != $rootScope.user_guid)
				return false;

			$ionicActionSheet.show({
				buttons: [],
				destructiveText: 'Delete',
				destructiveButtonClicked: function() {
					if (confirm("are you sure?")) {

						Client.delete('api/v1/comments/' + guid, function(success) {

						});
						$scope.comments.forEach(function(item, index, array) {
							if (item.guid == guid) {
								console.log('removed');
								array.splice(index, 1);
							}
						});
					}
					return true;
				},
				cancelText: 'Cancel',
				cancel: function() {
					// add cancel code..
				}
			});
		};

		$scope.back = function() {
			$ionicHistory.goBack();
		};

	}


	ctrl.$inject = ['$rootScope', '$scope', '$stateParams', 'Client', '$ionicLoading', '$ionicActionSheet', '$ionicHistory'];
	return ctrl;

});
