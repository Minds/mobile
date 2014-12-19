/**
 * Minds::mobile
 * NewsfeedAPI service. 
 * 
 * THIS CURRENTLY DOES NOT DO AN API REQUEST, BUT WILL SOON
 * 
 * @author Mark Harding
 */

define(['angular'], function (angular) {
    "use strict";

    var factory = function (Client) {

        return {
        
            all: function (options, success_callback, error_callback) {
            
            	/*return success_callback({
            		activity: [{
            			guid:123
            		}]
            	});*/
            
            	Client.get('api/v1/newsfeed', options, function(data){
            		return success_callback(data); 
            	});
            	
            },
            
            post: function(data, success_callback, error_callback){
            
            	Client.post('api/v1/newsfeed', data, 
            		function(success){
            			return success_callback(success); 
            		},
            		function(error){
            			return error_callback(error);
            		});
            		
            }
            
        };

    };

    factory.$inject = ['Client'];
    return factory;
});