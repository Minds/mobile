/**
 * Minds::mobile
 * Push notification handler
 * 
 * @author Mark Harding
 */

define(['angular'], function (angular) {
    "use strict";

    var factory = function (storage, Client, $ionicPlatform) {
	
		var listeners = [];
		var trigger = function(event, data){
			for(var i=0; i < listeners.length; i++) {
        		if(listeners[i].event == event){
        			listeners[i].callback(data);
        		}
        	}
		}
		
		/**
		 * REGISTER A DEVICES ID
		 */
		var register = function() {
			
				/**
				 * Android specifc
				 */
				if ( device.platform == 'android' || device.platform == 'Android' || device.platform == "amazon-fireos" ){
					
					window.plugins.pushNotification.register(
						function(result){
							console.log('ok, this step for android is dumb');
					    },
					    function(error){
					    	console.log('there was an error :: ' + error);
					    },
					    {
					        "senderID":"81109256529",
					        "ecb":"onNotification"
					    });
					
				} else {
					
					/**
					 * iOS Specific
					 */
					 window.plugins.pushNotification.register(
						    function(result){
						    	console.log('push notifications result::');
						    	console.log(result);
						    	Client.post('api/v1/notifications', {
						    		service: 'apple',
						    		token: result
						    		}, 
						    		function(){
						    			console.log(result);
						    			if(storage.get('push-token') != result){
						    				storage.set('push-token', result);
						    			}
						    			console.log('registed ios notifications')
						    		},
						    		function(){
						    			console.log('error with setting');
						    		});
						    	
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
			
		};

		/**
		 * iOS Specific callback
		 */
		window.onNotificationAPN = function(e){
			trigger(e.aps['url-args'][0], {service:'ios'});
			$ionicPlatform.on('resume', function(){
				trigger(e.aps['url-args'][0], {service:'ios', changeState: true});
				document.removeEventListener('resume', this);
			});
		}
		
		/**
		 * Android specific callback
		 */
		window.onNotification = function(e){
			console.log('notification callback');
			console.log(e.event);
			switch( e.event ){
			    case 'registered':
			        if ( e.regid.length > 0 ){
			        	console.log(e.regid);
			            if(storage.get('push-token') !=  e.regid){
				            Client.post('api/v1/notifications', {
					    		service: 'google',
					    		token: e.regid
					    		}, 
					    		function(){
					    			storage.set('push-token', e.regid);
					    		},
					    		function(){
					    			console.log('error saving...');
					    		});
			            }
			        }
			    break;
			    case 'message':
			    	trigger(e.payload.uri, {service:'android'});
			    	
			    	var resume = function(){
						trigger(e.payload.uri, {service:'android', changeState: true});
						document.removeEventListener('resume', resume);
					};
			    	document.addEventListener('resume', resume);
			    break;
			    case 'error':
			       console.log('Notification error:: ' + e.msg);
			    break;
			    default:
			    break;
		  }
		};
	
        return {
            register: register,
            listen: function(event, callback){
            	//console.log(event, callback);
            	var id = Date.now();
            	listeners.push({event: event, callback: callback, id: id});
            	return id;
            },
            unlisten: function(event, id){
            	//listeners = [];
            	for(var i=0; i < listeners.length; i++) {
            		if(listeners[i].event == event && listeners[i].id == id){
            			listeners.splice(i, 1)
            		}
            	}
            }
        };

    };

    factory.$inject = ['storage', 'Client', '$ionicPlatform'];
    return factory;
});