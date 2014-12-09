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

        var activity = [
            { guid: 0, title: 'Pen', description: 'good for writing things with' },
            { guid: 1, title: 'Paper', description: 'good for writing things on' },
            { guid: 2, title: 'iPhone', description: 'good for calling people on' },
            { guid: 3, title: 'Speakers', description: 'good for hearing things' }
        ];

        return {
            all: function (callback) {
            	Client.get('mark', function(data){
            		console.log("API::NEWSFEED: Data returned, sending callback to caller");
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