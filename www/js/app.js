// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

var db = null;

angular.module('starter', ['ionic', 'ngMask', 'ui.router', 'ngCordova','ionic-material', 'ionMdInput'])

        .run(function ($ionicPlatform, $rootScope, authService, $state, AUTH_EVENTS, $cordovaSQLite,
            inicializarBancoDeDados) {

            $rootScope.$on('$stateChangeStart', function (event, next, nextParams, fromState) {

                if ('data' in next && 'authorizedRoles' in next.data) {
                    var authorizedRoles = next.data.authorizedRoles;
                    if (!authService.isAuthorized(authorizedRoles)) {
                        event.preventDefault();
                        $state.go($state.current, {}, {reload: true});

                        $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
                    }
                }

                if (!authService.isAuthenticated()) {
                    if (next.name !== 'login') {
                        event.preventDefault();

                        $state.go($state.current, {}, {reload: true});
                        $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
                    }
                }
            });


            $ionicPlatform.ready(function () {
                if (window.cordova && window.cordova.plugins.Keyboard) {
                    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                    // for form inputs)
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

                    // Don't remove this line unless you know what you are doing. It stops the viewport
                    // from snapping when text inputs are focused. Ionic handles this internally for
                    // a much nicer keyboard experience.
                    cordova.plugins.Keyboard.disableScroll(true);


                    setTimeout(function () {
                        if (window.cordova) {
                            navigator.splashscreen.hide();
                        }

                    }, 3000);

                    moment.locale('pt-br');

                }
                
                if (window.cordova) {
                    // App syntax
                    console.log("Cordova, tentando criar o banco");
                    db = $cordovaSQLite.openDB({name: "starter.db", location: 2, createFromLocation: 1});
                } else {
                    // Ionic serve syntax
                    db = window.openDatabase("starter.db", "1.0", "StarterKit", -1);
                }
                
                inicializarBancoDeDados.criarBancoDeDados(db);
                inicializarBancoDeDados.cargaInicial(db);
                
                if (window.StatusBar) {
                    StatusBar.styleDefault();
                }
            });
        });
