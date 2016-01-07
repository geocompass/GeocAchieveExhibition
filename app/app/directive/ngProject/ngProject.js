module.exports = function($rootScope, $http) {
    return {
        estrict: 'E',
        templateUrl: '../app/directive/ngProject/ngproject.html',
        link: function($scope, iElm, iAttr) {

            console.log("load ngProject");

        }
    };
};
