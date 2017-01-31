angular.module('starter').service('inicializarBancoDeDados', function ($cordovaSQLite) {


    var _criarBancoDeDados = function (db) {

        $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS usuario (id integer primary key, nome text, login text NOT NULL, senha text NOT NULL, status integer NOT NULL, role text, autenticado integer)").then(function () {
            $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS cliente (id integer primary key,nome text, cpf text NOT NULL, endereco text, numero text, status integer NOT NULL)");
            $cordovaSQLite.execute(db,"ALTER TABLE cliente COLUMN foto blod");
            $cordovaSQLite.execute(db,"ALTER TABLE cliente COLUMN foto text");
        });

    };

    var _recriarBancoDeDados = function (db) {


        $cordovaSQLite.execute(db, "DROP TABLE usuario");

        _criarBancoDeDados(db);
    };

    var _cargaInicial = function (db) {

        $cordovaSQLite.execute(db, "INSERT INTO usuario (id, nome, login, senha, status, role, autenticado) VALUES (1, 'Administrador', 'admin', '#abc123', 1, 'admin', 0)");

    };

    return {
        criarBancoDeDados: _criarBancoDeDados,
        recriarBancoDeDados: _recriarBancoDeDados,
        cargaInicial: _cargaInicial
    };

});