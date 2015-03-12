/**
 * Minds::mobile
 * Boost review controller
 * 
 * @author Mark Harding
 */

define(function () {
    'use strict';

    function ctrl( $rootScope, $scope, $state, $stateParams, $ionicLoading, $ionicPopup, $timeout, Client) {

		Client.get('api/v1/boost/' + $scope.guid, { 
    			cb: Date.now() 
    		}, function(success){
    			
    			console.log(success);
    			
    			
    		}, function(error){
    			
    		});
    	
    	
    	$scope.accept = function(){
    		
    		Client.put('api/v1/boost/' + $scope.guid, { 
    			cb: Date.now() 
    		}, function(success){
    			
    			
    			
    		}, function(error){
    			
    		});

    	};
    	
    	
    	$scope.reject = function(){
    		
    		Client.delete('api/v1/boost/' + $scope.guid, { 
    			cb: Date.now() 
    		}, function(success){
    			
    			
    			
    		}, function(error){
    			
    		});

    	};
    	
    }

    ctrl.$inject = ['$rootScope', '$scope', '$state', '$stateParams', '$ionicLoading', '$ionicPopup', '$timeout', 'Client'];
    return ctrl;
    
});