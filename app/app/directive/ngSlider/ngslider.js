module.exports = function($rootScope, $http) {
    return {
        estrict: 'E',
        templateUrl: '../app/directive/ngSlider/ngslider.html',
        link: function($scope, iElm, iAttr) {

            console.log("load ngSlider");

            // $scope.sliderSrc = "img/slider3.png";
            // console.log("slider:", $scope.slider);
            var sliderArr = $scope.slider;
            if (sliderArr) {
                //获取slider的数量
                var sliderCount = Object.keys($scope.slider).length;
                //随机获取一张图片
                var randomInt = getRandomInt(1, sliderCount);
                var slider = $scope.slider[randomInt - 1];                
                if (slider) {
                    $scope.sliderSrc = slider.src;
                    $scope.sliderDesc = slider.desc;
                }
            }

            function getRandomInt(min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }
        }
    };
};
