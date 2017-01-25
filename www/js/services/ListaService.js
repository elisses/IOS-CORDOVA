angular.module('starter').factory('listaService', function (DBA) {
    var dados = this;

    dados.salvar = function (cliente) {
        if (isEmpty(cliente.id)) {
            var parameters = [cliente.nome, cliente.cpf, cliente.endereco, cliente.numero, cliente.status];
            return DBA.query("INSERT INTO cliente(nome,cpf,endereco,numero,status) VALUES(?,?,?,?,?)", parameters);
        } else {
            var parameters = [cliente.id, cliente.nome, cliente.cpf, cliente.endereco, cliente.numero, cliente.status, cliente.id];
            return DBA.query("UPDATE cliente SET id =(?), nome =(?),cpf =(?),endereco =(?),numero =(?),status =(?) WHERE id =(?)", parameters);
        }
    };
    
     dados.getById = function (clienteId) {
        var parameters = [clienteId];
        return DBA.query("SELECT id, nome,cpf,endereco,numero, status FROM usuario WHERE id = (?)", parameters)
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
