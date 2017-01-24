angular.module('starter').controller("cadastroClienteCtrl", function ($scope, $state, cadastroService, $ionicPopup) {
    
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
            }, function(error){
                console.error(error.message);
            });
      
        };

        $scope.voltarMain = function () {
            $state.go('main');
        };
       
});
