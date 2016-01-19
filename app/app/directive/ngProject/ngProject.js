module.exports = function($rootScope, $http) {
    return {
        estrict: 'E',
        templateUrl: '../app/directive/ngProject/ngproject.html',
        link: function($scope, iElm, iAttr) {

            console.log("load ngProject");

            // 获取数据
            $http.get('assets/data.json')
                .success(function(_data) {
                    var data = _data;
                    if (data) {
                        $scope.projects = data.projects;
                        if ($scope.projects) {
                            showProject();
                        }
                        // console.log("$scope.projects:", $scope.projects);
                    }
                })
                .error(function(data2) {
                    console.log("error");
                });
            var showProject = function() {
                var projects = $scope.projects;
                console.log("projects:", $scope.projects);
            };

        }
    };
};
