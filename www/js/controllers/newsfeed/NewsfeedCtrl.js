/**
 * Minds::mobile
 * Newsfeed controller
 * 
 * @author Mark Harding
 */

define(function () {
    'use strict';

    function ctrl($scope, NewsfeedAPI) {
        $scope.newsfeedItems = NewsfeedAPI.all();
    }

    ctrl.$inject = ['$scope', 'NewsfeedAPI'];
    return ctrl;
    
});