/**
 * Minds::mobile
 * Chat controller
 *
 * @author Mark Harding
 */

define(function() {
	'use strict';

	function ctrl($rootScope, $scope, $stateParams, $state) {

		$scope.sessions = {};
		$scope.inprogress = false;

		/**
		 * Creates the sessions
		 * @param isInitiatior true/false
		 */
		$scope.call = function(isInitiator, user) {

			var config = {
				isInitiator: isInitiator,
				turn: {
					host: 'turn:ec2-54-68-238-149.us-west-2.compute.amazonaws.com:3478',
					username: 'test',
					password: 'test'
				},
				streams: {
					audio: true,
					video: true
				}
			};

			var session = new cordova.plugins.phonertc.Session(config);

			session.on('sendMessage', function(data) {
				/**
				 * @todo send message
				 */
			});

			session.on('answer', function() {
				console.log('Answered!');
			});

			session.on('disconnect', function() {
				if ($scope.sessions[user.guid]) {
					delete $scope.sessions[user.guid];
				}

				if (Object.keys($scope.sessions).length === 0) {
					//signaling.emit('sendMessage', user.guid, { type: 'ignore' });
					//$state.go('app.contacts');
					$scope.modal.remove();
				}
			});

			session.call();
			$scope.sessions[user.guid] = session;
		};

		$scope.answer = function() {
			$scope.call(false);
		};

	}

	ctrl.$inject = ['$rootScope', '$scope', '$stateParams', '$state'];
	return ctrl;

});
