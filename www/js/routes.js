angular.module('starter').config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

    $stateProvider.state('main', {
        cache: false,
        url: '/main',
        templateUrl: 'templates/main.html',
        controller: 'mainCtrl'
    })

            .state('login', {
                cache: false,
                url: '/login',
                templateUrl: 'templates/login.html',
                controller: 'loginCtrl'
            })
            
            .state('cadastroCliente', {
                cache: false,
                url: '/cadastroCliente',
                templateUrl: 'templates/cadastroCliente.html',
                controller: 'cadastroClienteCtrl'        
            })
            
            .state('listaClientes', {
                cache: false,
                url: '/listaClientes',
                templateUrl: 'templates/listaClientes.html',
                controller: 'listaClientesCtrl'        
            });


    $httpProvider.defaults.useXDomain = true;
    //delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $urlRouterProvider.otherwise('/login');
});
