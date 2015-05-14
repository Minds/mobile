/**
 * Minds::mobile
 * Channel Controller
 *
 * @author Mark Harding
 */

define(function() {
	'use strict';

	function ctrl($scope, $stateParams, Client, $ionicSlideBoxDelegate, $ionicScrollDelegate) {

		$scope.next = "";
		$scope.subscriptions = [];
		$scope.guid = $stateParams.guid;

		$scope.inprogress = false;
		$scope.loadMore = function() {
			if ($scope.inprogress)
				return false;
			$scope.inprogress = true;
			console.log($scope.next);
			console.log($stateParams.guid);
			Client.get('api/v1/subscribe/subscriptions/' + $stateParams.guid, {
				limit: 6,
				offset: $scope.next
			}, function(data) {
				if (!data.users.length || !data['load-next']) {
					$scope.$broadcast('scroll.refreshComplete');
					$scope.hasMoreData = false;
					return false;
				} else {
					console.log('found users feed, loading it');
					$scope.hasMoreData = true;
				};

				$scope.subscriptions = $scope.subscriptions.concat(data.users);

				$scope.next = data['load-next'];

				$scope.$broadcast('scroll.infiniteScrollComplete');
				$scope.$broadcast('scroll.refreshComplete');
				$scope.inprogress = false;
			}, function(error) {
				$scope.inprogress = false;
			});
		};
		$scope.loadMore();

	}


	ctrl.$inject = ['$scope', '$stateParams', 'Client', '$ionicSlideBoxDelegate', '$ionicScrollDelegate'];
	return ctrl;

});
