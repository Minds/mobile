define(['angular'], function() {
	return {
		events: {},
		emits: {},

		// intercept 'on' calls and capture the callbacks
		on: function(eventName, callback) {
			if (!this.events[eventName]) this.events[eventName] = [];
			this.events[eventName].push(callback);
		},

		// intercept 'emit' calls from the client and record them to assert against in the test
		emit: function(eventName) {
			var args = Array.prototype.slice.call(arguments, 1);

			if (!this.emits[eventName])
				this.emits[eventName] = [];
			this.emits[eventName].push(args);
		},

		//simulate an inbound message to the socket from the server (only called from the test)
		receive: function(eventName) {
			var args = Array.prototype.slice.call(arguments, 1);

			if (this.events[eventName]) {
				angular.forEach(this.events[eventName], function(callback) {
					$rootScope.$apply(function() {
						callback.apply(this, args);
					});
				});
			};
		}
	};
});
