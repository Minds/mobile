/**
 * Minds::mobile
 * Channel Controller
 * 
 * @author Mark Harding
 */

define(function () {
    'use strict';

    function ctrl($scope, $stateParams) {

		navigator.device.capture.captureVideo(function(){
			console.log('capture complete');
		}, function(){
			console.log('capture failed');
		}, {limit: 2, duration:30});
       
    }

    ctrl.$inject = ['$scope', '$stateParams'];
    return ctrl;
    
});