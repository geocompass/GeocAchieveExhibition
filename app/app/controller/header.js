module.exports = function($scope, $rootScope, $http) {

    console.log("headerCtrl required!");

    // $scope.companyName = "国信司南公司研发项目成果展示";
    // console.log("base_url:", $rootScope.base_url);
    $http.get('assets/header.json')
        .success(function(_data) {
            var data = _data;
            console.log("data:",data);
            if (data) {
                $scope.companyName = data.companyName;
                $scope.slider = data.slider;

                //获取slider的数量
                var sliderCount = Object.keys($scope.slider).length;
                //随机获取一张图片
                var randomInt = getRandomInt(1, sliderCount);
                $scope.sliderSrc = $scope.slider[randomInt];
            }
        })
        .error(function(data2) {
            console.log("error");
        });

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
};
