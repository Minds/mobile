/**
 * Minds::mobile
 * Invite controller
 * 
 * @author Mark Harding
 */

define(function () {
    'use strict';

    function ctrl( $rootScope, $scope, $state, $stateParams, $ionicLoading, Client) {

    	$scope.contacts = [];
    	$scope.selected = [];
    	
    	var fields = [navigator.contacts.fieldType.displayName, navigator.contacts.fieldType.name];
    	navigator.contacts.find(fields, function(success){
    		$scope.contacts = success;
    	});
    	
    	$scope.isSelected = function(contact){
    		for(var i = 0; i < $scope.selected.length; i++) {
    		    if ($scope.selected[i].id == contact.id) {
    		        return true;
    		        break;
    		    }
    		}
    	};
    	
    	$scope.select = function(contact){
    		if(!$scope.isSelected(contact)){
    			$scope.selected.push(contact);
    		} else {
    			for(var i = 0; i < $scope.selected.length; i++) {
        		    if ($scope.selected[i].id == contact.id) {
        		        $scope.selected.splice(i,1);
        		        break;
        		    }
        		}
    		}
    	};
    	
    	$scope.invite = function(){
    		$ionicLoading.show({
				template: '<i class="icon" style="font-size:48px">inviting...</i>'
				});
			
    		
    		Client.post('api/v1/invite', {contacts: $scope.selected}, function(success){
    			$scope.modal.remove();
    			$ionicLoading.hide();
    		}, function(error){
    			$scope.modal.remove();
    			$ionicLoading.hide();
    		});
    		
    	};

    	
    }

    ctrl.$inject = ['$rootScope', '$scope', '$state', '$stateParams', '$ionicLoading', 'Client'];
    return ctrl;
    
});