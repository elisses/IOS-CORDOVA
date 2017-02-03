angular.module('starter').factory('AlbumService', function(DBA) {
    var dados = this;

    dados.all = function () {
        return DBA.query("SELECT * FROM cliente")
                .then(function (result) {
                    return DBA.getAll(result);
                });
    };

    dados.remove = function (usuario) {
        var parameters = [usuario.id];
        return DBA.query("DELETE FROM usuario WHERE id = (?)", parameters);
    };

    return dados;
});




