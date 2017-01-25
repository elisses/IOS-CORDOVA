angular.module('starter').controller("alterarClienteCtrl", function ($scope, $state,cadastroService,$stateParams,$ionicPopup) {
    
    $scope.cliente = $stateParams.cliente;
       
    $scope.alterar = function (cliente) {

        var objectCliente = angular.copy(cliente);
        cadastroService.salvar(objectCliente).then(function (result) {
            $ionicPopup.alert({
                title: 'Cadastro',
                template: 'Atualizado com sucesso!'
            });
        }, function (error) {
            console.error(error.message);
        });

    };
    $scope.voltarMain = function () {

        $state.go('main');
    };
});




