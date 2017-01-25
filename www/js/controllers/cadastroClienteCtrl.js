angular.module('starter').controller("cadastroClienteCtrl", function ($scope, $state, cadastroService, $ionicPopup, $cordovaGeolocation) {

    var objectCliente = {};
    $scope.cliente = {};

    $scope.SalvarDadosCliente = function () {
        var objectCliente = angular.copy($scope.cliente);
        cadastroService.salvar(objectCliente).then(function (result) {
            $scope.cliente = {};
            $ionicPopup.alert({
                title: 'Cadastro',
                template: 'Salvo com sucesso!'                
            });
            
        }, function (error) {
            console.error(error.message);
        });

    };
    $scope.localizacaoCliente = function(){
        // onSuccess Callback
        // This method accepts a Position object, which contains the
        // current GPS coordinates
        //
        var onSuccess = function (position) {
            alert('Latitude: ' + position.coords.latitude + '\n' +
                    'Longitude: ' + position.coords.longitude + '\n' +
                    'Altitude: ' + position.coords.altitude + '\n' +
                    'Accuracy: ' + position.coords.accuracy + '\n' +
                    'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' +
                    'Heading: ' + position.coords.heading + '\n' +
                    'Speed: ' + position.coords.speed + '\n' +
                    'Timestamp: ' + position.timestamp + '\n');
       

             // onError Callback receives a PositionError object
            //
            function onError(error) {
            alert('code: ' + error.code + '\n' +
                    'message: ' + error.message + '\n');
            }

        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    };
    
    $scope.voltarMain = function () {
        $state.go('main');
    };
  
});
