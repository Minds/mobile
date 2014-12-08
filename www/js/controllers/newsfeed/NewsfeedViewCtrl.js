/**
 * Minds::mobile
 * Newsfeed views
 * 
 * @author Mark Harding
 */

define(function () {
    'use strict';

    function ctrl($scope, $stateParams, NewsfeedAPI) {
        $scope.activity = NewsfeedAPI.get($stateParams.guid);
    }

    ctrl.$inject = ['$scope', '$stateParams', 'NewsfeedAPI'];
    return ctrl;
    
});