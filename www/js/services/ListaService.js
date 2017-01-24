 angular.module('starter').factory('listaService', function(DBA) {
    var dados = this;

 dados.remove = function (cliente) {
        var parameters = [cliente.id];
        return DBA.query("DELETE FROM cliente WHERE id = (?)", parameters);
    };
    return dados;
 });
