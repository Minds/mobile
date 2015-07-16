/**
 * Minds::mobile
 * Chat controller
 *
 * @author Mark Harding
 */

define(['adapter'], function() {
	'use strict';

	function ctrl($rootScope, $scope, $stateParams, $state, $timeout, $interval, socket, Client, $sce, $q) {

		$scope.status = "";
		$scope.started = false;
		$scope.videoCall = true;
		$scope.camera = true; //show our own camera
		$scope.muted = false;
		$rootScope.inCall = true;
		$scope.pulses = 0;

		var peer, localStream, turnTokenListener, pulse;

		$scope.iceServers = null;

		/**
		 * Toggle the local video on/off
		 */
		$scope.toggleVideo = function() {
			localStream.getVideoTracks()[0].enabled = !(localStream.getVideoTracks()[0].enabled);
			$scope.camera = localStream.getVideoTracks()[0].enabled;
		};

		/**
		 * Toggle the local audio on/off
		 */
		$scope.toggleAudio = function() {
			localStream.getAudioTracks()[0].enabled = !(localStream.getAudioTracks()[0].enabled);
			$scope.muted = !localStream.getAudioTracks()[0].enabled;
		};

		/**
		 * Start the media
		 */
		$scope.startMedia = function() {

			var deferred = $q.defer();
			navigator.getUserMedia({audio:true, video: true},
				function(stream) {
					localStream = stream;

					peer.addStream(localStream);

					if ($scope.videoCall) {
						var src = window.URL.createObjectURL(localStream);
						var video = document.getElementById("preview");
						video.src = src;
						video.muted = "muted";
						video.play();
					}

					deferred.resolve(true);
				},
				function(error) {
					deferred.reject(false);
					console.log("navigator.getUserMedia error: ", error);
				});
			return deferred.promise;
		};

		$scope.start = function() {
			var deferred = $q.defer();
			socket.emit('turnToken', function(error, message) {
				console.log('failed to ask for token');
				deferred.reject(message);
			});
			turnTokenListener = socket.on('turnToken', function(token) {
				peer = new RTCPeerConnection({ iceServers: token.iceServers });
				console.log(token.iceServers);
				peer.onicecandidate = $scope.onIceCandidate;
				peer.onaddstream = $scope.addStream;
				peer.onremovestream = $scope.removeStream;
				peer.oniceconnectionstatechange = $scope.onIceConnectionChange;
				//continue once we have media setup
				deferred.resolve(true);
				socket.removeListener('turnToken', turnTokenListener);
			});
			return deferred.promise;
		};

		/**
		 * Ping the user to see if they are available. Wait for a reply..
		 */
		$scope.call = function(guid) {

			document.getElementById('dialing').play();

			$scope.status = "pinging";
			$scope.$apply();

			//socket.emit('sendMessage', guid, {type: 'call'});

			//also send a push notifiation
			Client.put('api/v1/gatherings/call/' + guid, {}, function() {}, function() {});

			//send a pulse every second, until we get a 'reflex'
			pulse = $interval(function() {
				if ($scope.status != "pinging") {
					return $interval.cancel(pulse); //don't call if not pinging
				}
				if ($scope.pulses >= 10) {
					//give up
					$scope.status = "no-answer";
					$timeout(function() {
						$scope.end();
						//leave a notification
						Client.put('api/v1/gatherings/no-answer/' + guid, {}, function() {}, function() {});
					}, 3 * 1000);
					$interval.cancel(pulse);
					return false;
				}
				console.log('sending pulse to ' + guid);
				socket.emit('sendMessage', guid, {type: 'call'});
				$scope.pulses++;
			}, 3 * 1000);

			//if no answer after one minute then we give up
			$timeout(function() {
				$scope.status = "no-answer";
				$timeout(function() {
					$scope.end();
					Client.put('api/v1/gatherings/no-answer/' + guid, {}, function() {}, function() {});
				}, 1500);
			}, 60 * 1000);

		};

		$scope.OfferOffer = function(guid) {

			$scope.status = "calling";

			guid = $scope.callConfig.guid;

			//only send offer after we have started media
			$scope.startMedia().then(function() {
				console.log('creating offer');
				peer.createOffer(
					function(sdp) {
						peer.setLocalDescription(sdp);
						socket.emit('sendMessage', guid, {type: 'OfferOffer', offer: JSON.stringify(sdp)});
					},
					function(error) {
						alert('error creating offer');
					}
				);
			});

		};

		$scope.OfferAnswer = function(offer) {

			$scope.status = "answering";

			document.getElementById('ringing').pause();

			$scope.startMedia().then(function() {

				peer.setRemoteDescription(new RTCSessionDescription(offer));

				peer.createAnswer(
					function(sdp) {
						console.log('sending answer');
						peer.setLocalDescription(sdp);
						socket.emit('sendMessage', $scope.callConfig.guid, {type: 'OfferAnswer', answer: JSON.stringify(sdp)});
						$scope.status = "answered";
						$scope.$apply();
						if (window.device.platform === 'iOS') {
							cordova.plugins.iosrtc.refreshVideos();
						}
					},
					function(error) {
						alert('error sending answer');
					}
				);

			});

		};

		$scope.hasRemoteDescriptions = function() {
			var deferred = $q.defer();
			var interval = $interval(function() {
				if ($scope.status == "answered") {
					$interval.cancel(interval);
					deferred.resolve(true);
				} else {
					console.log("status == " + $scope.status);
				}
			}, 500);
			return deferred.promise;
		};

		$scope.answer = function() {
			$scope.status = "answering";
			socket.emit('sendMessage', $scope.callConfig.guid, {type:'answer'});
			/**
			 * If no confirmation our answer was received in 15 seconds, cancel
			 */
			$timeout(function() {
				if ($scope.status != "answered") {
					$scope.modal.remove();
				}
			}, 15 * 1000);
		};

		$scope.reject = function() {
			document.getElementById('ringing').pause();
			document.getElementById('dialing').pause();
			if (pulse)
				$interval.cancel(pulse);
			socket.emit('sendMessage', $scope.callConfig.guid, {type: 'reject'});
			$scope.modal.remove();
		};

		$scope.end = function() {
			document.getElementById('dialing').pause();
			socket.emit('sendMessage', $scope.callConfig.guid, {type: 'end'});
			$scope.modal.remove();
		};

		$scope.onIceCandidate = function(event) {
			console.log("Sending candidate");
			//console.log(event.candidate);
			if (event.candidate)
				socket.emit('sendMessage', $scope.callConfig.guid, {type: 'candidate', candidate: JSON.stringify(event.candidate)});
		};

		$scope.addStream = function(event) {
			//$scope.$watch(
			//	function(){
			//		return $scope.status;
			//	},
			//	function(is, was){
			//		if(is == "answered"){
			var video = document.getElementById("remote");
			video.src = window.URL.createObjectURL(event.stream);
			video.play();
			console.log("New Stream");
			console.log(event.stream);
			if (window.device.platform === 'iOS') {
				//cordova.plugins.iosrtc.refreshVideos();
				cordova.plugins.iosrtc.selectAudioOutput('speaker');
			}
			//	}
			//);
		};

		$scope.removeStream = function(event) {
			console.log("remove stream..");
			console.log(event);
		};

		$scope.onIceConnectionChange = function(event) {
			console.log("State changed");
			console.log(peer.iceConnectionState);
			if (peer.iceConnectionState == "disconnected") {
				$timeout(function() {
					//wait 5 seconds to see if we are connected again
					if (peer.iceConnectionState == "disconnected") {
						console.log("peer was disconnected ans we waited 5 seconds");
						$scope.modal.remove();
					}
				}, 5000);
			}
			if (peer.iceConnectionState == "closed") {
				console.log("peer was closed. we didn't wait");
				$scope.modal.remove();
			}
		};

		var duplicates = [];
		var socketListener = function(guid, message) {
			switch (message.type){
				case 'answer':
					//stop dialing
					document.getElementById('dialing').pause();
					//stop pulse
					$interval.cancel(pulse);
					//send offer to receiver
					$scope.OfferOffer(guid);
					break;
				case 'OfferOffer':
					console.log('received offer');
					var offer = JSON.parse(message.offer);
					console.log(offer);
					//on offer, we answer
					$scope.OfferAnswer(offer);
					break;
				case 'OfferAnswer':
					//on answer from our offer
					console.log('answering from ' + guid);
					var sdp = JSON.parse(message.answer);
					peer.setRemoteDescription(
						new RTCSessionDescription(sdp),
						function() {
							console.log("Remote Description Success");
						},
						function(error) {
							console.log("Remote Description Error");
							console.log(error);
						}
					);

					if (window.device.platform === 'iOS') {
						cordova.plugins.iosrtc.refreshVideos();
						cordova.plugins.iosrtc.selectAudioOutput('speaker');
					}

					$scope.status = "answered";
					$scope.$apply();
					break;
				case 'reject':
					document.getElementById('dialing').pause();
					$scope.status = "rejected";
					$scope.$digest();
					//something went wrong..
					$timeout(function() {
						$scope.modal.remove();
					}, 3000);
					break;
				case 'engaged':
					document.getElementById('dialing').pause();
					$scope.status = "engaged";
					$scope.$digest();
					//something went wrong..
					$timeout(function() {
						$scope.modal.remove();
					}, 3000);
					break;
				case 'candidate':
					//if (duplicates.indexOf(message.candidate) === -1) {
					$scope.hasRemoteDescriptions().then(function() {
						var candidate = JSON.parse(message.candidate);

						//console.log('Received candiate');
						//console.log(candidate);
						//for testing TURN
						//if(candidate.candidate.indexOf('relay') == -1)
						//	return;

						console.log("New Remote Candidate");
						console.log(candidate);

						peer.addIceCandidate(new RTCIceCandidate(candidate));
						duplicates.push(message.candidate);
					});
					//}
					break;
				case 'available':
					$scope.status == "calling";
					$scope.$digest();
					$interval.cancel(pulse);
					break;
				case 'end':
					$scope.modal.remove();
					break;
			}
		};

		socket.on('messageReceived',socketListener);

		$scope.start().then(
			function() {
				if ($scope.callConfig.initiator) {
					/**
					 * Send a call signal to the other use
					 */
					$scope.call($scope.callConfig.guid);
				} else {
					/**
					 * Send available signal to the caller
					 */
					socket.emit('sendMessage', $scope.callConfig.guid, {type:'available'});
				}
			},
			function() {
				$scope.status = "failed_signal";
				//something went wrong..
				$timeout(function() {
					$scope.modal.remove();
				}, 3000);
			}
		);

		$scope.$on('modal.removed', function() {
				$rootScope.inCall = false;
				$scope.$destroy();
		});
		$scope.$on('modal.hidden', function() {
				$rootScope.inCall = false;
				$scope.$destroy();
    });


		$scope.$on('$destroy', function() {
			document.getElementById('ringing').pause();
			document.getElementById('dialing').pause();
			socket.removeListener('messageReceived', socketListener);

			if (pulse)
				$interval.cancel(pulse);

			if (turnTokenListener)
				socket.removeListener('turnToken', turnTokenListener);

			if (localStream)
				localStream.stop();

			if (peer) {
				peer.close();
			}

		});

		/*$scope.counter = { minutes: 0, seconds: 0, secs: 0 };
		$scope.startCounter = function(){
			$interval(function(){
				$scope.counter.secs += 1;
				$scope.counter.minutes =  Math.floor($scope.counter.secs / 60);
				$scope.counter.seconds = $scope.counter.secs - $scope.counter.minutes * 60;
			}, 1000);
		};
		$scope.$watch(
			function(){
				return $scope.status;
			},
			function(is, was){
				if(is == "answered"){
					$scope.startCounter();
				}
			}
		);*/

	}

	ctrl.$inject = ['$rootScope', '$scope', '$stateParams', '$state', '$timeout', '$interval', 'socket', 'Client', '$sce', '$q'];
	return ctrl;

});
