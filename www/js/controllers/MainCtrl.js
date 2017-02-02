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
    
    //geolocalização
    var posOptions = {timeout: 10000, enableHighAccuracy: false};
    $scope.pegandoSuaLocalizacao = function(){
       $cordovaGeolocation.getCurrentPosition(posOptions).then(function(position){
           $scope.lat=position.coords.latitude;
           $scope.lang=position.coords.longitude;
           
           console.log(lat +"E"+ lang);
       }, function (error) {
                console.error(error.message);
            });      
     };    
     $scope.suaLocalizacao = function () {

        $state.go("suaLocalizacao");
    };
    
    //album de fotos
    
    $scope.albumDeFotos =  function(){
        $state.go("albumFotos");
    };
});
