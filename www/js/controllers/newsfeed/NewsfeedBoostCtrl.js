/**
 * Minds::mobile
 * Newsfeed controller
 * 
 * @author Mark Harding
 */

define(function () {
    'use strict';

    function ctrl( $rootScope, $scope, $state, $stateParams, $ionicLoading, Client) {

    	$scope.data = {
    		points: 500,
    		impressions: 500 * 1
    	};
    	
    	$scope.$watch('data.points', function(){
    		$scope.data.impressions = $scope.data.points * 1;
    	}, true);
    	
    	$scope.boost = function(){
    		
    		$ionicLoading.show({
				template: 'Please wait a moment.'
				});
    		
    		//validate our points
    		Client.get('api/v1/wallet/count', { cb: Date.now() }, function(success){
    			$ionicLoading.hide();
    			if(success.count > $scope.data.points){
    				//commence the boost
    				$scope.modal.remove();
    			} else {
    				alert('sorry, you don\'t have enough points!');
    			}
    		}, function(error){
    			
    		});

    	};
    	
    }

    ctrl.$inject = ['$rootScope', '$scope', '$state', '$stateParams', '$ionicLoading', 'Client'];
    return ctrl;
    
});