/**
 * Minds::mobile
 * Channel Controller
 * 
 * @author Mark Harding
 */

define(function () {
    'use strict';

    function ctrl($scope, $stateParams, Client, $ionicSlideBoxDelegate, $ionicScrollDelegate, $timeout) {
    		
    	$scope.step = 'quote';
    	$scope.data = {
				points: 1000,
				usd: '---'
		};
    	$scope.card = {};
		
		Client.post('api/v1/wallet/quote', { points: $scope.points },
				function(success){
					$scope.usd = success.usd
				},
				function(error){});
		
		$scope.$watch('data.points', function(){
			$scope.data.usd = "...";
			
			$timeout(function(){
				Client.post('api/v1/wallet/quote', { points: $scope.data.points },
    				function(success){
    					$scope.data.usd = success.usd
    				},
    				function(error){});
			}, 500);
			
		}, true);  
		
		$scope.changeStep = function(step){
			$scope.step = step;
		};
		
		$scope.process = function(){
			$scope.card.points = $scope.data.points;
			console.log($scope.card);
			Client.post('api/v1/wallet/charge', $scope.card,
				function(success){
					if(success.id){
						$scope.step = 'complete';
						return true;
					}
					
					alert("Sorry, we had trouble processing your card. Please check your details and try again.");
				},
				function(error){});
			
		};
    		
    }

    ctrl.$inject = ['$scope', '$stateParams', 'Client', '$ionicSlideBoxDelegate', '$ionicScrollDelegate', '$timeout'];
    return ctrl;
    
});