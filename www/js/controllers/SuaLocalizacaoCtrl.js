angular.module('starter').controller("suaLocalizacaoCtrl", function ($scope, $state, $cordovaGeolocation) {

    var posOptions = {timeout: 10000, enableHighAccuracy: false};

    $scope.pegandoSuaLocalizacao = function () {
        $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
            var lat = position.coords.latitude;
           var lang = position.coords.longitude;

            //Google Maps
            var myLatlng = new google.maps.LatLng(lat, lang);
            var mapOptions = {zoom: 16, center: myLatlng};
            var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
            var marker = new google.maps.Marker({position: myLatlng, map: map});

        }, function (error) {
            console.error(error.message);
        });
    };

    $scope.voltarMain = function () {

        $state.go('main');
    };
});




