(function() {

    'use strict';

    require('angular');
    require('angular-route');
    require('angular-animate');
    // require('font-awesome');
    // require('react');

    // controllers
    var appCtrl = require('../app/controller/app');

    // directives
    var sliderDirective = require('../app/directive/ngSlider/ngslider.js');
    var bannerDirective = require('../app/directive/ngBanner/ngbanner.js');
    var projectDirective = require('../app/directive/ngProject/ngproject.js');
    var footerDirective = require('../app/directive/ngFooter/ngfooter.js');
    // service
    var filterByKey = require('../app/service/filterByKey.js');

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
        // load service
        .service('FilterByKey', ['$filter', filterByKey])
        // load directives
        .directive('ngBanner', ['$rootScope', '$http', bannerDirective])
        .directive('ngSlider', ['$rootScope', '$http', sliderDirective])
        .directive('ngProject', ['$rootScope', '$http', 'FilterByKey', projectDirective])
        .directive('ngFooter', ['$rootScope', '$http', footerDirective])
        // load controller
        .controller('AppCtrl', ['$scope', '$window', '$http', appCtrl]);

}());
