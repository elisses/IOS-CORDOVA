angular.module('starter').controller("alterarClienteCtrl", function ($scope, $state, cadastroService, $stateParams, $ionicPopup,$cordovaCamera) {

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
    
    $scope.ArquivoFoto = function () {     

            var options = {
                quality: 50,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                allowEdit: true,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 100,
                targetHeight: 100,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false,
                correctOrientation: true
            };

            $cordovaCamera.getPicture(options).then(function (foto) {
                var image = document.getElementById('myImage');                
                image.src = "data:image/jpeg;base64," + foto;                
                $scope.cliente.foto = foto;
            }, function (error) {
                console.error(error.message);
            });       
    };
    
     $scope.tirarFoto = function () {     

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
                correctOrientation: true
            };

            $cordovaCamera.getPicture(options).then(function (foto) {
                var image = document.getElementById('myImage');                
                image.src = "data:image/jpeg;base64," + foto;                
                $scope.cliente.foto = foto;
            }, function (error) {
                console.error(error.message);
            });       
    };

    $scope.voltarMain = function () {

        $state.go('listaClientes');
    };
});




