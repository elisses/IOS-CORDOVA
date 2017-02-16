angular.module('starter').controller("cadastroClienteCtrl", function ($scope, $state, cadastroService, $ionicPopup, $cordovaCamera) {

    var objectCliente = {};
    $scope.cliente = {};
     $scope.imagens = {};
     
    //foto do arquivo da camera
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
                var image = document.getElementById('myPhoto');                
                image.src = "data:image/jpeg;base64," + foto;
                
                //$scope.cliente.foto = foto;
                $scope.album.imagens = foto;
            }, function (error) {
                console.error(error.message);
            });       
    };
    
    //tirar a foto de perfil da camera e converter em base 64
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

            var image = document.getElementById('myPhoto');
            image.src = "data:image/jpeg;base64," + foto;
            
            $scope.cliente.foto = foto;
            console.log(foto);              
        }, function (error) {
            console.error(error.message);

        });
    };    

//salvar os dados no banco de dados
    $scope.SalvarDadosCliente = function () {
        var objectCliente = angular.copy($scope.cliente);
        cadastroService.salvar(objectCliente).then(function (result) {
            $scope.cliente = {};
            $ionicPopup.alert({
                title: 'Cadastro',
                template: 'Salvo com sucesso!'
                
            });
            consoloe.log(objectCliente.cliente);
        }, function (error) {
            console.error(error.message);
        });
    };

    $scope.voltarMain = function () {
        $state.go('main');
    };
});
