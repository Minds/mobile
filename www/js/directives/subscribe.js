/*global define*/

define(['angular'], function (angular) {
    "use strict";

    var directive = function ($rootScope, Client, $ionicGesture, $timeout, $ionicLoading) {
	  	return {
       		restrict: 'A',
			link: function(scope, element, attrs) {

			
				var icon = element.find('i');
				
				if(scope.entity.subscribed){
					angular.element(icon).addClass('selected');
				}
				
				/**
				 * Right
				 */
				var right = 0;
				$ionicGesture.on('dragright', function(){
					right += 1;
					$timeout(function(){ right = 0; }, 600);
					
					if(right > 1){
						$ionicLoading.show({
							template: '<i class="icon ion-person-add" style="font-size:90px"></i>'
							});
						$timeout(function(){
							$ionicLoading.hide();
							}, 1000);
					}
					
					angular.element(icon).addClass('selected');
					
				}, element);
				
				/**
				 * Left
				 */
				var left = 0;
				$ionicGesture.on('dragleft', function(){
					left += 1;
					$timeout(function(){ left = 0; }, 600);
					
					if(left > 1){
						alert('ignore');
					}
					
				}, element);
				
			
			}
       	 };
    };

    directive.$inject = ['$rootScope', 'Client', '$ionicGesture', '$timeout', '$ionicLoading'];
    return directive;
});