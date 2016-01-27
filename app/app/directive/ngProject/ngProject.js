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

            // 自动检测搜索框
            $scope.$watch('searchkey',function(newvalue,oldvalue){
            	searchProject($scope.searchkey);
            });

            // 搜索过滤
            $scope.searchProject = function() {
            	searchProject($scope.searchkey);
            };
            var searchProject = function(searchkey){
            	var sortResult = {};
            	if($scope.catagorySort == "year"){
            		sortResult = FilterByKey.sortByAttr($scope.projects, ['date', -1], ['type', 1]);
            	}else if($scope.catagorySort == "type"){
            		sortResult = FilterByKey.sortByAttr($scope.projects, ['type', 1], ['date', -1]);
            	}
                $scope.searchResult = FilterByKey.filterByKey(sortResult, searchkey);
                if(Object.keys($scope.searchResult).length === 0){
                	$scope.hasSearchResult = false;
                }else{
                	$scope.hasSearchResult = true;
                }
                console.log("search result:",$scope.searchResult);
                for (var p in $scope.searchResult) {
                    console.log($scope.searchResult[p].date, $scope.searchResult[p].type, $scope.searchResult[p].title);
                }
                console.log("-------------------");
            };

            // 按照年份排序
            $scope.sortByDate = function() {
                var result = FilterByKey.sortByAttr($scope.projects, ['date', -1], ['type', 1]);
                $scope.catagorySort = "year"; //默认时间year排序，还可以类型type排序
                $scope.catagories = FilterByKey.reconstructData(result, $scope.catagorySort);
                return $scope.catagories;
            };
            // 按照类别排序
            $scope.sortByType = function() {
                var result = FilterByKey.sortByAttr($scope.projects, ['type', 1], ['date', -1]);
                $scope.catagorySort = "type"; //默认时间date排序，还可以类型type排序
                $scope.catagories = FilterByKey.reconstructData(result, $scope.catagorySort);
                return $scope.catagories;
            };

        }
    };
};
