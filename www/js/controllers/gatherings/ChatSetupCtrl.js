/**
 * Minds::mobile
 * Chat controller
 * 
 * @author Mark Harding
 */

define(function () {
    'use strict';

    function ctrl($scope, $state, Client, $ionicPopup, storage) {
    
    	$scope.unlock = function(password){

    		Client.get('api/v1/keys', { password: $scope.password, new_password: 'abc123' }, 
    			function(data){
    				if(data.key){
    					storage.set('private-key', data.key);
    	    			$state.go('tab.chat');
    				} else {
    					$ionicPopup.alert({
    						title: 'Ooops..',
    						template: 'We couldn\'t unlock your chat. Please check your password is correct.'
    					});
    				}
	    		}, 
	    		function(error){ 
	    			alert('error'); 
	    		});
    	
    	};
    	
		
    }

    ctrl.$inject = ['$scope', '$state', 'Client', '$ionicPopup', 'storage'];
    return ctrl;
    
});