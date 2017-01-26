angular.module('starter').factory('listaService', function (DBA) {
    var dados = this;

    dados.salvar = function (cliente) {
        if (isEmpty(cliente.id)) {
            var parameters = [cliente.nome, cliente.cpf, cliente.endereco, cliente.numero, cliente.status, cliente.foto];
            return DBA.query("INSERT INTO cliente(nome,cpf,endereco,numero,status,foto) VALUES(?,?,?,?,?,?)", parameters);
        } else {
            var parameters = [cliente.id, cliente.nome, cliente.cpf, cliente.endereco, cliente.numero, cliente.status, cliente.foto, cliente.id];
            return DBA.query("UPDATE cliente SET id =(?), nome =(?),cpf =(?),endereco =(?),numero =(?),status =(?),foto = (?) WHERE id =(?)", parameters);
        }
    };
    
     dados.getById = function (clienteId) {
        var parameters = [clienteId];
        return DBA.query("SELECT id, nome,cpf,endereco,numero, status,foto FROM usuario WHERE id = (?)", parameters)
                .then(function (result) {
                    return DBA.get(result);
                });
    };

    dados.remove = function (cliente) {
        var parameters = [cliente.id];
        return DBA.query("DELETE FROM cliente WHERE id = (?)", parameters);
    };
    return dados;
});
