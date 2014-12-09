/**
 * Minds::mobile
 * Routes the endpoints to controllers
 * 
 * @author Mark Harding
 */

define(['app'], function (app) {
    'use strict';

    app.config(['$stateProvider', '$urlRouterProvider',
            function ($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('login', {
                    url: "/login",
                    templateUrl: "templates/login.html",
                    controller: 'LoginCtrl'
                })
                .state('tab', {
                    url: "/tab",
                    abstract: true,
                    templateUrl: "templates/tabs.html"
                })
                .state('tab.newsfeed', {
                    url: '/newsfeed',
                    views: {
                        'newsfeed-tab': {
                            templateUrl: 'templates/newsfeed/list.html',
                            controller: 'NewsfeedCtrl'
                        }
                    }
                })
                .state('tab.newsfeed-view', {
                    url: '/newsfeed/:guid',
                    views: {
                        'newsfeed-tab': {
                            templateUrl: 'templates/newsfeed/view.html',
                            controller: 'NewsfeedViewCtrl'
                        }
                    }
                })
                .state('tab.newsfeed-compose', {
                    url: '/newsfeed/compose',
                    views: {
                        'newsfeed-tab': {
                            templateUrl: 'templates/newsfeed/compose.html',
                            controller: 'NewsfeedComposerCtrl'
                        }
                    }
                })
                .state('tab.gatherings', {
                    url: '/gatherings',
                    views: {
                        'gatherings-tab': {
                            templateUrl: 'templates/gatherings/list.html'
                        }
                    }
                })
                .state('tab.about', {
                    url: '/about',
                    views: {
                        'about-tab': {
                            templateUrl: 'templates/about.html'
                        }
                    }
                });


            $urlRouterProvider.otherwise("/login");

        }]);


});