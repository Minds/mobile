/**
 * Minds::mobile
 * Invite controller
 *
 * @author Mark Harding
 */

define(function() {
	'use strict';

	function ctrl($rootScope, $scope, $state, $stateParams, $ionicLoading, Client, $timeout) {

		$scope.contacts = [];
		$scope.selected = [];

		/*var fields = [navigator.contacts.fieldType.emails];
		 var options = {};
		 options.filter = "@";
		 //options.multiple = true;
		 navigator.contacts.find(fields, function(success){
		 var contacts = success;
		 console.log(contacts);
		 for(var i=0; i < contacts.length; i++){
		 if(contacts[i].emails){
		 $scope.contacts.push(contacts[i]);
		 }
		 }
		 $scope.$apply();
		 }, function(error){}, options);*/

		navigator.contacts.pickContact(function(contact) {
			Client.post('api/v1/invite', {
				contact: contact
			}, function(success) {
			}, function(error) {
			});
			$scope.modal.remove();
			$ionicLoading.show({
				template: '<p> Invited ' + contact.name.formatted + '</p>'
			});
			$timeout(function() {
				$ionicLoading.hide();
			}, 1000);
		}, function(err) {
			console.log('Error: ' + err);
		});

		$scope.isSelected = function(contact) {
			for (var i = 0; i < $scope.selected.length; i++) {
				if ($scope.selected[i].id == contact.id) {
					return true;
				}
			}
		};

		$scope.select = function(contact) {
			if (!$scope.isSelected(contact)) {
				$scope.selected.push(contact);
			} else {
				for (var i = 0; i < $scope.selected.length; i++) {
					if ($scope.selected[i].id == contact.id) {
						$scope.selected.splice(i, 1);
						break;
					}
				}
			}
		};

		$scope.invite = function() {
			$ionicLoading.show({
				template: '<i class="icon" style="font-size:48px">inviting...</i>'
			});

			Client.post('api/v1/invite', {
				contacts: $scope.selected
			}, function(success) {
				$scope.modal.remove();
				$ionicLoading.hide();
			}, function(error) {
				$scope.modal.remove();
				$ionicLoading.hide();
			});

		};

	}


	ctrl.$inject = ['$rootScope', '$scope', '$state', '$stateParams', '$ionicLoading', 'Client', '$timeout'];
	return ctrl;

});
