angular.module('starter').controller("listaClientesCtrl", function ($scope, $state, cadastroService, $ionicPopup, listaService) {
    
    
    $scope.cliente = [];
    $scope.cliente = cadastroService.all().then(function (result) {
        $scope.cliente = result;
        $ionicPopup.alert({
            title: 'Cadastro',
            template: 'Salvo com sucesso!'
        });
    }, function (error) {
        console.error(error.message);
    });   

    $scope.data = {
        showDelete: false
    };
    
    $scope.onItemDelete = function (cliente) {
        listaService.remove(cliente).then(function () {
            
           $scope.cliente.splice($scope.cliente.indexOf(cliente), 1);
           
        });
    }, function (error) {
        console.error(error.message);
    };
    
    $scope.sortType     = 'nome'; 
    $scope.sortReverse  = false;  
    
  
    
    
    $scope.voltarMain = function () {

        $state.go('main');
    };
});


