/**
 * Classe responsvel por registrarmos todos os interceptors que serão
 * utilizados na aplicação
 *
 */
angular.module('starter').config(function ($httpProvider) {

// Responsavel por não manter cache na url adicionado timestamp a url
  $httpProvider.interceptors.push("timestampInterceptor");

  // responsavel por receber erros da aplicação
  $httpProvider.interceptors.push("errorInterceptor");


});

