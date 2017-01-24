angular.module('starter').controller("mainCtrl", function ($scope, authService, $state, $ionicPopover,
        userService, $ionicScrollDelegate) {

    $scope.titulo = "Starter";
    

    // Triggered in the login modal to close it
    $scope.logoff = function () {
        userService.getByUsername(window.localStorage.getItem('user-login-key')).then(function(user){
            user.autenticado = false;
            userService.salvar(user).then(function(){

                authService.logout();
                $scope.popover.hide();
                $state.go('login');
            });
        });
    };

    $scope.gotoHome = function () {
        $state.go("main");
    };

    $scope.scrollTop = function () {
        $ionicScrollDelegate.scrollTop('animate');
    };


    $ionicPopover.fromTemplateUrl('templates/popover-principal.html', {
        scope: $scope
    }).then(function (popover) {
        $scope.popover = popover;
    });

    $scope.openPopover = function ($event) {
        $scope.popover.show($event);
    };

    $scope.closePopover = function () {
        $scope.popover.hide();
    };

    $scope.$on('$destroy', function () {
      //  $scope.popover.remove();
    });

    $scope.$on('popover.hidden', function () {
        // Execute action
    }); 
  
    $scope.formCliente = function(){
        $state.go("cadastroCliente");
    };
    $scope.listCliente = function(){
        $state.go("listaClientes");
    };
});
