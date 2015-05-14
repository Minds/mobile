/**
 * Minds::mobile
 * Channel Controller
 *
 * @author Mark Harding
 */

define(function() {
	'use strict';

	function ctrl($scope, $state, $stateParams, Client, $ionicLoading, $ionicScrollDelegate, $timeout) {

		$scope.step = 'quote';
		$scope.data = {
			points: 1000,
			usd: '---'
		};
		$scope.card = {};

		Client.post('api/v1/wallet/quote', {
			points: $scope.points
		}, function(success) {
			$scope.usd = success.usd;
		}, function(error) {
		});

		$scope.$watch('data.points', function() {
			$scope.data.usd = "...";

			$timeout(function() {
				Client.post('api/v1/wallet/quote', {
					points: $scope.data.points
				}, function(success) {
					$scope.data.usd = success.usd;
				}, function(error) {
				});
			}, 500);

		}, true);

		$scope.changeStep = function(step) {
			$scope.step = step;
		};

		$scope.process = function() {
			$scope.card.points = $scope.data.points;
			console.log($scope.card);
			Client.post('api/v1/wallet/charge', $scope.card, function(success) {
				if (success.id) {
					$scope.step = 'complete';
					return true;
				}

				alert("Sorry, we had trouble processing your card. Please check your details and try again.");
			}, function(error) {
			});

		};

		$scope.proccessPaypal = function() {

			var clientIDs = {
				"PayPalEnvironmentProduction": "ATAByBA7wVln5oky2XKkglEoH7k0DJmZVOz3S-DGJYkrNrHcIjZCdX1HHLwH",
				"PayPalEnvironmentSandbox": "AaUOIRC8rTb2jXZtnUvjMXWH1BH-5spBnL2kILF2AEPygMxvWOqME3e06hnj"
			};
			PayPalMobile.init(clientIDs, function() {

				var config = {
					defaultUserEmail: null,
					defaultUserPhoneCountryCode: null,
					defaultUserPhoneNumber: null,
					merchantName: "Minds",
					merchantPrivacyPolicyURL: null,
					merchantUserAgreementURL: null,
					acceptCreditCards: true,
					payPalShippingAddressOption: 0,
					rememberUser: true,
					languageOrLocale: null,
					disableBlurWhenBackgrounding: false,
					presentingInPopover: false,
					forceDefaultsInSandbox: false,
					sandboxUserPassword: null,
					sandboxUserPin: null
				};

				var payment = {
					subtotal: String($scope.data.usd),
					shipping: "0.00",
					tax: "0.00",
					amount: String($scope.data.usd),
					currency: "USD",
					shortDescription: "Points purchase",
					intent: "Auth"
				};
				PayPalMobile.prepareToRender("PayPalEnvironmentProduction", config, function(e) {
					// single payment
					PayPalMobile.renderSinglePaymentUI(payment, function(success) {
						$ionicLoading.show({
							template: '<p>Applying points...</p>'
						});
						console.log('SUCCESS!!');
						console.log(success);
						Client.post('api/v1/wallet/paypal/confirm', {
							id: success.response.authorization_id,
							points: $scope.data.points
						}, function(success) {
							console.log(success);
							$ionicLoading.hide();
							if (success.status == 'success') {
								$state.go('tab.newsfeed-wallet');
							}
						}, function(error) {
							$ionicLoading.hide();
						});
					}, function(canceled) {
						//	$scope.changeStep('quote');
						console.log('canceled paypal');
					});
				});
			});

		};

	}


	ctrl.$inject = ['$scope', '$state', '$stateParams', 'Client', '$ionicLoading', '$ionicScrollDelegate', '$timeout'];
	return ctrl;

});
