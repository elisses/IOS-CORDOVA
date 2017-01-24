angular.module('starter').factory('userService', function(DBA) {
    var self = this;

    self.all = function () {
        return DBA.query("SELECT id, nome, login, senha, status, role, autenticado FROM usuario")
                .then(function (result) {
                    return DBA.getAll(result);
                });
    };

    self.get = function (usuarioId) {
        var parameters = [usuarioId];
        return DBA.query("SELECT id, nome, login, senha, status, role, autenticado FROM usuario WHERE id = (?)", parameters)
                .then(function (result) {
                    return DBA.get(result);
                });
    };
     
    self.getByUsername = function (username) {
        var parameters = [username];
        return DBA.query("SELECT id, nome, login, senha, status, role, autenticado FROM usuario WHERE login = (?)", parameters)
                .then(function (result) {
                    return DBA.get(result);
                });
    };

    self.salvar = function (usuario) {
        if (isEmpty(usuario.id)) {
            
            var parameters = [usuario.nome, usuario.login, usuario.senha, usuario.status, usuario.role, usuario.autenticado];
            return DBA.query("INSERT INTO usuario (nome, login, senha, status, role, autenticado) VALUES (?,?,?,?,?,?)", parameters);
        } else {
            
            var parameters = [usuario.id, usuario.nome, usuario.login, usuario.senha, usuario.status, usuario.role, usuario.autenticado, usuario.id];
        return DBA.query("UPDATE usuario SET id = (?), nome = (?), login = (?), senha = (?), status = (?), role = (?), autenticado = (?) WHERE id = (?)", parameters);
        }
    };

    self.remove = function (usuario) {
        var parameters = [usuario.id];
        return DBA.query("DELETE FROM usuario WHERE id = (?)", parameters);
    };

    return self;
});

