module.exports = function($rootScope, $http) {
    return {
        estrict: 'E',
        templateUrl: '../app/directive/ngFooter/ngfooter.html',
        link: function($scope, iElm, iAttr) {

            console.log("load ngFooter");

        }
    };
};
