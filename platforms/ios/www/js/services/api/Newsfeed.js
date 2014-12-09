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
            all: function (callback) {
            	Client.get('mark', function(data){
            		return callback(data.activity[""]); //@todo try and resolve this in the service, seems like a bug
            	});
            },
            get: function (guid) {
                return activity[guid];
            }
        };

    };

    factory.$inject = ['Client'];
    return factory;
});