angular.module('starter').controller("cadastroClienteCtrl", function ($scope, $state, cadastroService, $ionicPopup,$cordovaCamera) {

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

    $scope.takephoto = function(){ document.addEventListener("deviceready", function () {

    var options = {
      quality: 50,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 100,
      targetHeight: 100,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false,
      correctOrientation:true
    };

   
     $cordovaCamera.getPicture(options).then(function(imageData) {
      var image = document.getElementById('myImage');
      image.src = "data:image/jpeg;base64," + imageData;
    }, function(error) {
      console.error(error.message);
    });

  });
    };

    $scope.voltarMain = function () {
        $state.go('main');
    };
});
