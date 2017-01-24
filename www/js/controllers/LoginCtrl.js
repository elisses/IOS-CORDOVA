angular.module('starter').controller('loginCtrl', function ($scope, $state, authService, $ionicPopup,
        userService) {

    $scope.isPrimeiroAcesso = true;

    $scope.data = {};
    var data = $scope.data;


    $scope.logar = function () {
        authService.login(data.username, data.password).then(function (userAuthenticated) {

            userAuthenticated.autenticado = 1;
            userService.salvar(userAuthenticated).then(function(){               
            
                $state.go('main');
            });
        }, function (err) {
            $ionicPopup.alert({
                title: 'Atenção!',
                template: err
            });
        });
    };


    function verificarPrimeiroAcesso() {
       
        userService.all().then(function (result) {

            if (result.length == 0){
                $scope.isPrimeiroAcesso = true;
            }else {

                if (result[0].autenticado == 'true'){

                    data.username = result[0].login;
                    data.password = result[0].senha;

                    $scope.logar();
                } else {
                    data.username = result[0].login;
                    data.password = result[0].senha;
                }

                $scope.isPrimeiroAcesso = false;
            }
        });
      
    };

    $scope.logout = function () {
        authService.logout();
        $state.go('login');
    };

     verificarPrimeiroAcesso();
});
