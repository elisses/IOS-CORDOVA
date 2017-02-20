angular.module('starter').controller("albumFotosCtrl", function ($scope, $state, AlbumService, $timeout,$ionicModal,$cordovaCamera,$ionicPopup) {


    $scope.clientes = [];
    $scope.album = [];
    
    //carregar todos os dados do cliente
    AlbumService.all().then(function (result) {
        $scope.album = result;
        
    }, function (error) {
        console.error(error.message);
    });
    
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
            $scope.album.imagens = foto;            
            console.log(foto);              
        }, function (error) {
            console.error(error.message);

        });
    };  
    
    //salvar os dados no banco de dados
    $scope.SalvarImagem = function () {
        var objectAlbum = angular.copy($scope.album);
        AlbumService.salvar(objectAlbum).then(function (result) {           
           $ionicPopup.alert({
                title: 'Cadastro',
                template: 'Salvo com sucesso!'
                
            });  
        }, function (error) {
            console.error(error.message);
        });
    };

    // Galeria de fotos //
    $scope.fullViewVisible = undefined;
    $scope.imgs = [];

    AlbumService.getByFoto().then(function (foto) {
        $scope.imagens = foto;
    }, function (error) {
        console.error(error.message);
    });

    $scope.imgGroups = undefined;
    $scope.currentImgId = undefined;

    $scope.getImageKey = function (fotosKey, photoKey) {
        return fotosKey * 3 + photoKey;
    };

    $scope.separateByGroups = function (imgs) {
        return imgs.reduce(function (result, item) {
            var lastItemKey, nextItemKey, key;
            lastItemKey = result.length - 1;
            nextItemKey = result.length;
            key = lastItemKey;
            if (nextItemKey == 0 || result[lastItemKey].length == 3) {
                result[nextItemKey] = [];
                key = nextItemKey;
            }
            result[key].push(item);
            return result;
        }, []);
    };

    $scope.openFullImg = function (fotosKey, fotoKey) {
        $scope.fullViewVisible = show();
        $scope.currentImgId = $scope.getImageKey(fotosKey, fotoKey);
    };

    $scope.closeFullImg = function (evt) {
        if (!angular.element(evt.target).hasClass('full-image-view')) {
            return false;
        }
        $scope.fullViewVisible = false;
    };

    $scope.clientes = $scope.separateByGroups($scope.imgs);
    $ionicModal
            .fromTemplateUrl('image-viewer-modal.html', {scope: $scope})
            .then(function (modal) {
                if (!modal) {
                    return false;
                }
                $scope.fullViewModal = modal;
                $timeout(function () {
                    $scope.openFullImg(0, 0);
                }, 300);
            });



//-----fim galeria-----//
    $scope.voltarMain = function () {
        $state.go('listaClientes');
    };
});





