angular.module('starter').factory('AlbumService', function(DBA) {
    var dados = this;
    
     dados.salvar = function (album) {
        if (isEmpty(album.id)) {
            var parameters = [album.idCliente,album.imagens];
            return DBA.query("INSERT INTO album(idCliente,imagens) VALUES(?,?)", parameters);       
        }
    };

    dados.allClientes = function () {
        return DBA.query("SELECT * FROM cliente")
                .then(function (result) {
                    return DBA.getAll(result);
                });
    };
    
     dados.all = function () {
        return DBA.query("SELECT * FROM album")
                .then(function (result) {
                    return DBA.getAll(result);
                });
    };
    
     dados.getByFoto = function (clienteId) {
        var parameters = [clienteId];
        return DBA.query("SELECT imagens FROM album WHERE imagens = (?)", parameters)
                .then(function (result) {
                    return DBA.get(result);
                });
    };

    dados.remove = function (usuario) {
        var parameters = [usuario.id];
        return DBA.query("DELETE FROM usuario WHERE id = (?)", parameters);
    };

    return dados;
});




