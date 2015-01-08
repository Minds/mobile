/*global define*/

define(['angular'], function (angular) {
    "use strict";

    var directive = function ($rootScope, Client, Cacher, $ionicGesture, $timeout, $ionicLoading) {
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
					
					if(scope.entity.subscribed){
						console.log('already subscribed');
						return true;
					}else{
						scope.entity.subscribed = true;

						$ionicLoading.show({
							template: '<i class="icon ion-person-add" style="font-size:90px"></i>'
							});
						$timeout(function(){
							$ionicLoading.hide();
							}, 1000);
					
						angular.element(icon).addClass('selected');
						console.log('posting to api/v1/subscribe/' + scope.entity.guid);
						
						Client.post('api/v1/subscribe/' + scope.entity.guid, {}, 
							function(success){
								angular.element(icon).addClass('selected');
								Cacher.put('entities.cb', Date.now());
								console.log(success);
							},
							function(error){
								angular.element(icon).removeClass('selected');
								console.log('error', error);
							});
						
					}
					
					
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

    directive.$inject = ['$rootScope', 'Client', 'Cacher', '$ionicGesture', '$timeout', '$ionicLoading'];
    return directive;
});