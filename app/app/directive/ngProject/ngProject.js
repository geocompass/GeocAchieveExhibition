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
                        $scope.catagorySort = "year"; //默认时间year排序，还可以类型type排序
                        $scope.projects = data.projects;

                        // if ($scope.catagories) {
                        //     showProject();
                        // }
                        // console.log("$scope.projects:", $scope.projects);
                    }
                })
                .error(function(data2) {
                    console.log("error");
                });

            // 搜索过滤
            $scope.searchProject = function() {
                var result = FilterByKey.filterByKey($scope.projects, $scope.searchkey);
                for (var p in result) {
                    console.log(result[p].date, result[p].type, result[p].title);
                }
                console.log("-------------------");
            };

            // 按照年份排序
            $scope.sortByDate = function() {
                var result = FilterByKey.sortByAttr($scope.projects, ['date', -1], ['type', 1]);
                $scope.catagorySort = "year"; //默认时间year排序，还可以类型type排序
                $scope.catagories = FilterByKey.reconstructData(result, $scope.catagorySort);
                for (var p in $scope.catagories) {
                    console.log($scope.catagories[p].date, $scope.catagories[p].type);
                }
                console.log("-------------------");
            };
            // 按照类别排序
            $scope.sortByType = function() {
                var result = FilterByKey.sortByAttr($scope.projects, ['type', 1], ['date', -1]);
                $scope.catagorySort = "type"; //默认时间date排序，还可以类型type排序
                $scope.catagories = FilterByKey.reconstructData(result, $scope.catagorySort);
                for (var p in $scope.catagories) {
                    console.log($scope.catagories[p].type, $scope.catagories[p].date);
                }
                console.log("-------------------");
            };

        }
    };
};
