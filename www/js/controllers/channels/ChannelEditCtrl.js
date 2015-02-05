/**
 * Minds::mobile
 * Channel Controller
 * 
 * @author Mark Harding
 */

define(function () {
    'use strict';

    function ctrl($rootScope, $scope, $stateParams, Client, storage, $ionicSlideBoxDelegate, $ionicScrollDelegate) {

    	$scope.cb = Date.now();
    	
     	Client.get('api/v1/channel/'+$stateParams.guid, {}, 
    			function(success){
    				$scope.channel = success.channel;
    			},
    			function(error){
    			});
     	
     	$scope.changeAvatar = function(){
     		
     		navigator.camera.getPicture(onSuccess, onFail, { 
     			quality: 50,
     		    ddestinationType: Camera.DestinationType.FILE_URI,
     		    sourceType : 0,
     		   correctOrientation: true
     		});

     		function onSuccess(imageData) {
     		    var image = document.getElementById('avatar');
     		    image.src = imageData;
     		    
     		    var ft = new FileTransfer();
	   	        var options = new FileUploadOptions();
	   	        //options.httpMethod = 'PUT';
	   	        options.headers = {"Authorization": "Bearer " + storage.get('access_token') };
	   	        console.log(imageData);
	   	      	ft.upload(imageData, encodeURI($rootScope.node_url + 'api/v1/channel/me'), 
	   	      		function(success){
			   	      $rootScope.globalCB = Date.now();
	   	      		}, 
	   	      		function(error){
	   	      			console.log('error');
	   	      			console.log(error);
	   	      		}, 
	   	      		options
	   	      		);

     		    
     		}

     		function onFail(message) {
     		    alert('Failed because: ' + message);
     		}
     		
     	}
       
    }

    ctrl.$inject = ['$rootScope', '$scope', '$stateParams', 'Client', 'storage', '$ionicSlideBoxDelegate', '$ionicScrollDelegate'];
    return ctrl;
    
});