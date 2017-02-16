angular.module('starter').controller("listaClientesCtrl", function ($scope, $state, cadastroService, $ionicPopup, listaService) {


    $scope.clientes = [];
    
    //carregar todos os dados do cliente
    cadastroService.all().then(function (result) {
        $scope.clientes = result;
        
    }, function (error) {
        console.error(error.message);
    });

    $scope.data = {
        showDelete: false
    };

    //alterar os dados do cliente
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

    //deletar os dados do cliente
    $scope.onItemDelete = function (cliente) {
        listaService.remove(cliente).then(function () {

            $scope.clientes.splice($scope.clientes.indexOf(cliente), 1);

        });
    }, function (error) {
        console.error(error.message);
    };

    $scope.sortType = 'nome';
    $scope.sortReverse = false;

    //ir até a página de alteração de dados
    $scope.irAlterarDados = function (cl) {

        $state.go('alterarCliente',{'cliente':cl});
    };
    
    //ir até a página de albums
    $scope.irAlbum = function () {

        $state.go('albumFotos');
    };

    //voltar a pg principal
    $scope.voltarMain = function () {

        $state.go('main');
    };
});


