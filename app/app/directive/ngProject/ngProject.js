module.exports = function($rootScope, $http, FilterByKey) {
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
                        $scope.catagorySortby = "date"; //默认时间排序
                        $scope.catagories = data.projects.data;
                        // if ($scope.catagories) {
                        //     showProject();
                        // }
                        // console.log("$scope.projects:", $scope.projects);
                    }
                })
                .error(function(data2) {
                    console.log("error");
                });
            // var showProject = function() {
            //     var projects = $scope.projects;
            //     console.log("projects:", $scope.projects);
            // };

            // 按照年份排序
            $scope.sortByDate = function(data) {
                var result = FilterByKey.sortByDate(data, $scope.searchKey);
                for (var p in result) {
                    console.log(result[p].date, result[p].type);
                }
            };
            // 按照类别排序
            $scope.sortByType = function(data) {
                var result = FilterByKey.sortByType(data, $scope.searchKey);
                for (var p in result) {
                    console.log(result[p].type, result[p].date);
                }
            };

        }
    };
};
