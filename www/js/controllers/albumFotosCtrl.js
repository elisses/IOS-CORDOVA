angular.module('starter').controller("albumFotosCtrl", function ($scope, $state, AlbumService, $timeout,$ionicModal) {


    $scope.clientes = [];
    AlbumService.all().then(function (result) {
        $scope.clientes = result;
    }, function (error) {
        console.error(error.message);
    });
    
    

    // Galeria de fotos //
    $scope.fullViewVisible = undefined;
    $scope.imgs = [];

    AlbumService.getByFoto().then(function (foto) {
        $scope.imgs = foto;
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
        $state.go('main');
    };
});





