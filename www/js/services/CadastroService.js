angular.module('starter').factory('cadastroService', function (DBA) {
    var dados = this;
    dados.salvar = function (cliente) {
        if (isEmpty(cliente.id)) {
            var parameters = [cliente.nome, cliente.cpf, cliente.endereco, cliente.numero, cliente.status, cliente.foto];
            return DBA.query("INSERT INTO cliente(nome,cpf,endereco,numero,status,foto) VALUES(?,?,?,?,?,?)", parameters);
        } else {
            var parameters = [cliente.id, cliente.nome, cliente.cpf, cliente.endereco, cliente.numero, cliente.status,cliente.foto, cliente.id];
            return DBA.query("UPDATE cliente SET id =(?), nome =(?),cpf =(?),endereco =(?),numero =(?),status =(?),foto = (?) WHERE id =(?)", parameters);
        }
    };

    dados.getByFoto = function (clienteId) {
        var parameters = [clienteId];
        return DBA.query("SELECT foto FROM cliente WHERE foto = (?)", parameters)
                .then(function (result) {
                    return DBA.get(result);
                });
    };

    dados.all = function () {
        return DBA.query("SELECT * FROM cliente")
                .then(function (result) {
                    return DBA.getAll(result);
                });
    };



    return dados;
});

