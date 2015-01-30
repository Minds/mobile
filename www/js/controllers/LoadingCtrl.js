/**
 * Minds::mobile
 * Login controller
 * 
 * @author Mark Harding
 */

define(function() {
	'use strict';

	function ctrl($scope, $state, OAuth, Client, $ionicPopup, storage, $timeout) {
	
		$timeout(function(){
			if(storage.get('access_token') && storage.get('loggedin')){
				$state.go('tab.newsfeed');
			} else {
				$state.go('login');
			}
		}, 1000);

		/**
		 * Push notification setup
		 */
		if(!storage.get('push-id')){
			if ( device.platform == 'android' || device.platform == 'Android' || device.platform == "amazon-fireos" ){
				window.plugins.pushNotification.register(
					function(result){
						Client.post('api/v1/notifications', {
				    		service: 'android',
				    		token: result
				    		}, 
				    		function(){
				    			storage.set('push-id', result);
				    		},
				    		function(){});
				    },
				    function(error){
				    	console.log('there was an error :: ' + error);
				    },
				    {
				        "senderID":"81109256529",
				        "ecb":"onNotification"
				    });
			} else {
				 window.plugins.pushNotification.register(
					    function(result){
					    	Client.post('api/v1/notifications', {
					    		service: 'apple',
					    		token: result
					    		}, 
					    		function(){
					    			storage.set('push-id', result);
					    		},
					    		function(){});
					    },
					    function(error){
					    	console.log('there was an error :: ' + error);
					    },
					    {
					        "badge":"true",
					        "sound":"true",
					        "alert":"true",
					        "ecb":"onNotificationAPN"
					  });
			}
		}
		window.onNotification = function(e){

			switch( e.event ){
			    case 'registered':
			        if ( e.regid.length > 0 ){
			            // Your GCM push server needs to know the regID before it can push to this device
			            // here is where you might want to send it the regID for later use.
			            console.log("regID = " + e.regid);
			        }
			    break;

			    case 'message':
			        // if this flag is set, this notification happened while we were in the foreground.
			        // you might want to play a sound to get the user's attention, throw up a dialog, etc.
			        if ( e.foreground ){

			            // on Android soundname is outside the payload.
			            // On Amazon FireOS all custom attributes are contained within payload
			            var soundfile = e.soundname || e.payload.sound;
			            // if the notification contains a soundname, play it.
			            var my_media = new Media("/android_asset/www/"+ soundfile);
			            my_media.play();
			        } else { 
			        	// otherwise we were launched because the user touched a notification in the notification tray.
			            if ( e.coldstart ) {
			               // $("#app-status-ul").append('<li>--COLDSTART NOTIFICATION--' + '</li>');
			            } else {
			               // $("#app-status-ul").append('<li>--BACKGROUND NOTIFICATION--' + '</li>');
			            }
			        }

			   //    $("#app-status-ul").append('<li>MESSAGE -> MSG: ' + e.payload.message + '</li>');
			           //Only works for GCM
			     //  $("#app-status-ul").append('<li>MESSAGE -> MSGCNT: ' + e.payload.msgcnt + '</li>');
			       //Only works on Amazon Fire OS
			       $status.append('<li>MESSAGE -> TIME: ' + e.payload.timeStamp + '</li>');
			    break;

			    case 'error':
			       console.log('Notification error:: ' + e.msg);
			    break;

			    default:
			    break;
			  }
			}
	}


	ctrl.$inject = ['$scope', '$state', 'OAuth', 'Client', '$ionicPopup', 'storage', '$timeout'];
	return ctrl;

}); 