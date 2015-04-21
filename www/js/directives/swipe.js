/*global define*/

define(['angular'], function (angular) {
    "use strict";

    var directive = function ($rootScope, Client, Cacher, $ionicGesture, $timeout, $ionicLoading, $compile) {
	  	return {
       		restrict: 'A',
       		scope: {
       			swipeOnLeft: '&swipeOnLeft',
       			swipeOnRight: '&swipeOnRight',
       			swipeOnUp:	'&swipeOnUp',
       			swipeOnDown: '&swipeOnDown'
       		},
			link: function(scope, element, attrs) {
			
				element.css('transform', 'translate3d(0px, 0px, 0)');
				element.css('webkitTransform', 'translate3d(0px, 0px, 0)');

				$ionicGesture.on('dragstart', function(e){
					e.preventDefault();
					
					var width = 320;
					var point = window.innerWidth / 2 + 1 * (width / 2);
					var distance = Math.abs(point - e.gesture.touches[0].pageX);// - window.innerWidth/2);
					//console.log(width, point, distance);

				}, element);
				
				$ionicGesture.on('drag', function(e){
					e.preventDefault();
					ionic.requestAnimationFrame(function() { 				
						var o = e.gesture.deltaX / -1000;
						var rotationAngle = Math.atan(o);
											
						var x = (e.gesture.deltaX * 0.8);
						var y = (e.gesture.deltaY * 0.8);
						
						
						
						if(scope.$eval(attrs.swipeDisableVertical)){
							
							if(!(x < -15 || x > 15)){
								return false;
							}
							
							//if(y < -15 || y > 15){
							//	return false;
							//}
							
							if( device.platform == 'android' || device.platform == 'Android' ){
								return false;
							}
							
						}
						
						if(scope.$eval(attrs.swipeDisableVertical)){
							y = 0;
						}
						
						ionic.requestAnimationFrame(function(){
							element.css('transform', 'translate3d(' + x + 'px, ' + y + 'px, 0) rotate(' + (rotationAngle || 0) + 'rad)');
							element.css('webkitTransform', 'translate3d(' + x + 'px, ' + y + 'px, 0) rotate(' + (rotationAngle || 0) + 'rad)');
						});
						
						
						
						element.css('z-index', 99999999);
					});
					
				}, element);
				
				$ionicGesture.on('dragend', function(e){
					ionic.requestAnimationFrame(function() { 		
						element.css('webkitTransform', 'translate3d(0, 0, 0)');
						element.css('transform',  'translate3d(0, 0, 0)');
						
						var right_threshold = 100;
						var left_threshold = -100;
						var up_threshold = -140;
						var down_threshold = 140;
						
						/*if(scope.$eval(attrs.swipeDisableVertical)){
							console.log("Y:" + e.gesture.deltaY + " X:" +e.gesture.deltaX );
							if(e.gesture.deltaY < -15 || e.gesture.deltaY > 15){
								console.log("under threshold, not firing");
								return false;
							}
							
						}*/
						
						if(e.gesture.deltaX > right_threshold){
							//console.log('you swiped right');
							scope.swipeOnRight();
							return true;
						}
						
						if(e.gesture.deltaX < left_threshold){
							//console.log('you swiped left');
							scope.swipeOnLeft();
							return true;
						}
						
						if(scope.$eval(attrs.swipeDisableVertical)){
							return true;
						}
						
						if(e.gesture.deltaY < up_threshold){
							//console.log('you swiped up');
							scope.swipeOnUp();
							return true;
						}
						
						if(e.gesture.deltaY > down_threshold){
							//console.log('you swiped down');
							scope.swipeOnDown();
							return true;
						}
					});
					
				}, element);
				
				
			
			}
       	 };
    };

    directive.$inject = ['$rootScope', 'Client', 'Cacher', '$ionicGesture', '$timeout', '$ionicLoading', '$compile'];
    return directive;
});