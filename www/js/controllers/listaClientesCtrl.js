angular.module('starter').controller("listaClientesCtrl", function ($scope, $state, cadastroService, $ionicPopup, listaService) {


    $scope.clientes = [];
    cadastroService.all().then(function (result) {
        $scope.clientes = result;
        
    }, function (error) {
        console.error(error.message);
    });

    $scope.data = {
        showDelete: false
    };

    $scope.alterar = function (cliente) {

        var objectCliente = angular.copy(cliente);
        cadastroService.salvar(objectCliente).then(function (result) {            
            $ionicPopup.alert({
                title: 'Cadastro',
                template: 'Salvo com sucesso!'
            });
        }, function (error) {
            console.error(error.message);
        });

    };

    $scope.onItemDelete = function (cliente) {
        listaService.remove(cliente).then(function () {

            $scope.clientes.splice($scope.clientes.indexOf(cliente), 1);

        });
    }, function (error) {
        console.error(error.message);
    };

    $scope.sortType = 'nome';
    $scope.sortReverse = false;

    $scope.irAlterarDados = function (cl) {

        $state.go('alterarCliente',{'cliente':cl});
    };

    $scope.voltarMain = function () {

        $state.go('main');
    };
});


