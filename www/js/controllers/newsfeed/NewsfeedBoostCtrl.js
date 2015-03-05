/**
 * Minds::mobile
 * Newsfeed controller
 * 
 * @author Mark Harding
 */

define(function () {
    'use strict';

    function ctrl( $rootScope, $scope, $state, $stateParams, $ionicLoading, $ionicPopup, $timeout, Client) {

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
    				Client.post('api/v1/boost/newsfeed/' + $scope.guid + '/' + $scope.owner_guid, { impressions: $scope.data.impressions }, function(success){
    					if(success.status == 'success'){
    						$scope.modal.remove();
    						$ionicLoading.show({
								template: 'Boost request submitted.'
								});
    						$timeout(function(){
    							$ionicLoading.hide();
    						}, 500);
    						
    					} else {
    						alert('sorry, something went wrong');
    					}
    				});
    				
    			} else {
    				$ionicPopup.alert({
   				     title: 'Ooops!',
   				     subTitle: 'You don\;t have enough points',
   				     buttons: [
   		               
   		               {
   		                 text: '<b>Buy points</b>',
   		                 type: 'button-positive',
   		                 onTap: function(e) {
   		                	 $state.go('tab.newsfeed-wallet-deposit');
   		                	 $scope.modal.remove();
   		                 }
   		               },
   		               
   		               { text: 'Close.' },
   		             ]
   				   });
    			}
    		}, function(error){
    			
    		});

    	};
    	
    }

    ctrl.$inject = ['$rootScope', '$scope', '$state', '$stateParams', '$ionicLoading', '$ionicPopup', '$timeout', 'Client'];
    return ctrl;
    
});