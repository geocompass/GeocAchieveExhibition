(function() {

    'use strict';

    require('angular');
    require('angular-route');
    require('angular-animate');

    var mainCtrl = require('../partials/partials');

    var app = angular.module('app', ['ngRoute', 'ngAnimate'])
        .config([
            '$locationProvider',
            '$routeProvider',
            function($locationProvider, $routeProvider) {
                $locationProvider.hashPrefix('!');
                // routes
                $routeProvider
                    .when("/", {
                        templateUrl: "./partials/partials.html",
                        controller: "MainController"
                    })
                    .otherwise({
                        redirectTo: '/'
                    });
            }
        ])
        //Load controller
        .controller('MainController', ['$scope', mainCtrl]);


}());
