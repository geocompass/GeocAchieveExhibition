(function() {

    'use strict';

    require('angular');
    require('angular-route');
    require('angular-animate');
    // require('font-awesome');
    // require('react');

    var headerCtrl = require('../app/controller/header');
    var appCtrl = require('../app/controller/app');

    var app = angular.module('app', ['ngRoute', 'ngAnimate'])
        .config([
            '$locationProvider',
            '$routeProvider',
            function($locationProvider, $routeProvider) {
                $locationProvider.hashPrefix('!');
                // routes
                $routeProvider
                    .when("/", {
                        templateUrl: "./app/tpl/app.html",
                        // controller: ["AppCtrl","headerCtrl"]
                        controller: "AppCtrl"
                    })
                    .otherwise({
                        redirectTo: '/'
                    });
            }
        ])
        //Load controller
        .controller('AppCtrl', ['$scope', '$window', appCtrl])
        .controller('headerCtrl', ['$scope','$rootScope', '$http', headerCtrl]);

}());
