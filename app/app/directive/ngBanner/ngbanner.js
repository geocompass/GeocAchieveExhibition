module.exports = function($rootScope, $http) {
    return {
        estrict: 'E',
        templateUrl: '../app/directive/ngBanner/ngbanner.html',
        link: function($scope, iElm, iAttr) {

            console.log("load ngBanner");

        }
    };
};
