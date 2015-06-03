/**
 * Minds::mobile
 * Sockets servcies
 *
 * @author Mark Harding
 */

define(['angular', 'socketio'], function(angular, io) {
    "use strict";

    var factory = function($rootScope) {

		var socket = io.connect('http://www.minds.io:3000', {
						'reconnect': true
						});
		socket.on('connect', function() {
			socket.emit('register', $rootScope.user_guid);
		});
		return socket;

    };

    factory.$inject = ['$rootScope'];
    return factory;
});
