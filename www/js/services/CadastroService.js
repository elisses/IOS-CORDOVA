angular.module('starter').factory('cadastroService',function(DBA){
   var dados = this;
   dados.salvar = function(cliente){
       if(isEmpty(cliente.id)){
           var parameters = [cliente.nome,cliente.cpf,cliente.endereco,cliente.numero, cliente.status];
           return DBA.query("INSERT INTO cliente(nome,cpf,endereco,numero,status) VALUES(?,?,?,?,?)",parameters);
       } else{
           var parameters = [cliente.id,cliente.nome,cliente.cpf,cliente.endereco,cliente.numero,cliente.status,cliente.id];
           return DBA.query("UPDATE cliente SET id =(?), nome =(?),cpf =(?),endereco =(?),numero =(?),status =(?) WHERE id =(?)",parameters);
       }
   };
   
   dados.all = function () {
        return DBA.query("SELECT * FROM cliente")
                .then(function (result) {
                    return DBA.getAll(result);
                });
    };
    
    
    
   return dados;
});

