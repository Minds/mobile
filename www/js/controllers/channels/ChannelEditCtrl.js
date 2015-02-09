/**
 * Minds::mobile
 * Channel Controller
 * 
 * @author Mark Harding
 */

define(function () {
    'use strict';

    function ctrl($rootScope, $scope, $stateParams, Client, storage, $ionicSlideBoxDelegate, $ionicScrollDelegate, $ionicLoading) {

    	$scope.cb = Date.now();
    	
     	Client.get('api/v1/channel/'+$stateParams.guid, {cb: $scope.cb}, 
    			function(success){
    				$scope.channel = success.channel;
    			},
    			function(error){
    			});
     	
     	$scope.update = function(){
     		Client.post('api/v1/channel/info', $scope.channel, 
        			function(success){
		     			$ionicLoading.show({
		    				template: '<i class="icon icon-remind" style="line-height:100px; vertical-align:middle; font-size:90px"></i>'
		    				});
		    			$timeout(function(){
		    				$ionicLoading.hide();
		    				}, 1000);
        			},
        			function(error){
        			});
     	}
     	
     	$scope.changeAvatar = function(){
     		
     		navigator.camera.getPicture(onSuccess, onFail, { 
     			quality: 50,
     		    destinationType: Camera.DestinationType.FILE_URI,
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
	   	      	ft.upload(imageData, encodeURI($rootScope.node_url + 'api/v1/channel/avatar'), 
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

    ctrl.$inject = ['$rootScope', '$scope', '$stateParams', 'Client', 'storage', '$ionicSlideBoxDelegate', '$ionicScrollDelegate', '$ionicLoading'];
    return ctrl;
    
});