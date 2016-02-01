module.exports = function($scope, $window, $http) {

    console.log("appCtrl required");
    //定义url
    $scope.base_url = "http://localhost:8888/";
    $scope.hasLogin = false;    //默认为未登陆


    // 获取数据
    $http.get('assets/data.json')
        .success(function(_data) {
            var data = _data;
            console.log("data:", data);
            if (data) {
                $scope.companyname = data.companyname;
                $scope.hoster = data.hoster;
                $scope.slider = data.slider;
                $scope.user = data.user;
                // $scope.projects = data.projects;

                // //获取slider的数量
                // var sliderCount = Object.keys($scope.slider).length;
                // //随机获取一张图片
                // var randomInt = getRandomInt(1, sliderCount);
                // $scope.sliderSrc = $scope.slider[randomInt];
            }
        })
        .error(function(data2) {
            console.log("error");
        });
};
