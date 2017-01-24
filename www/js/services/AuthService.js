angular.module('starter').service('authService', function ($q, $http, USER_ROLES, 
    userService, $state, $rootScope) {

    var LOCAL_TOKEN_KEY = 'da39a3ee5e6b4b0d3255bfef95601890afd80709';
    var LOCAL_LOGIN_USER_KEY = 'user-login-key';
    var LOCAL_ROLE_USER_KEY = 'user-role-key';
    var LOCAL_HASH_USER_KEY = 'user-hash-key';
    
    
    var userLogin = '';
    var userHash = null;
    var isAuthenticated = false;
    var role = '';
    var authToken;

    //$rootScope.infoDevice = {};

    function loadUserCredentials() {
        var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
        
        userLogin = window.localStorage.getItem(LOCAL_LOGIN_USER_KEY);
        userHash = window.localStorage.getItem(LOCAL_HASH_USER_KEY);
        role = window.localStorage.getItem(LOCAL_ROLE_USER_KEY);
        
        if (token) {
            useCredentials(userHash, userLogin, role, token);
        }
    }

    function storeUserCredentials(usuario, token) {
        window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
        window.localStorage.setItem(LOCAL_HASH_USER_KEY, usuario.hash);
        window.localStorage.setItem(LOCAL_LOGIN_USER_KEY, usuario.login);
        window.localStorage.setItem(LOCAL_ROLE_USER_KEY, usuario.role);
        
        useCredentials(usuario.hash, usuario.login, usuario.role, token);
    }

    function useCredentials(userHash, userLogin, role, token) {
      
        isAuthenticated = true;
        authToken = token;

        if (role === 'restrict') {
            role = USER_ROLES.restrict;
        }
        if (role === 'public') {
            role = USER_ROLES.public;
        }

        // informa o cabeçalho das requisições 
        $http.defaults.headers.common['X-Auth-Token'] = token;
        $http.defaults.headers.common['X-User-Login'] = userLogin;
        $http.defaults.headers.common['X-User-Hash'] = userHash;
        
        $http.defaults.headers.common['X-App-Request'] = true;
    }

    function destroyUserCredentials() {
        authToken = undefined;
        userHash = null;
        isAuthenticated = false;
        
        $http.defaults.headers.common['X-Auth-Token'] = undefined;
        window.localStorage.removeItem(LOCAL_TOKEN_KEY);
        window.localStorage.removeItem(LOCAL_HASH_USER_KEY);
        window.localStorage.removeItem(LOCAL_LOGIN_USER_KEY);
        window.localStorage.removeItem(LOCAL_ROLE_USER_KEY);
    }

    var login = function (name, pw) {
        return $q(function (resolve, reject) {
            userService.getByUsername(name).then(function (user) {
                if (user) {
                    if (pw === user.senha) {
                        
                        $rootScope.currentUser = user;
                        storeUserCredentials(user, name + "." + gerarHash());
                        resolve(user);
                        
                    } else {
                        reject('Senha inválida.');
                    }
                } else {
                    reject('Usuário não cadastrado.');
                }
            }, function (err) {
                console.error(err);
            });
        });
    };

    var logout = function () {
        destroyUserCredentials();
        $state.go('login');
    };

    var isAuthorized = function (authorizedRoles) {
        if (!angular.isArray(authorizedRoles)) {
            authorizedRoles = [authorizedRoles];
        }
        return (isAuthenticated && authorizedRoles.indexOf(role) !== -1);
    };

    loadUserCredentials();

    return {
        login: login,
        logout: logout,
        isAuthorized: isAuthorized,
        isAuthenticated: function () {
            return isAuthenticated;
        },
        userLogin: function () {
            return userLogin;
        },
        userHash: function () {
            return userHash;
        },
        role: function () {
            return role;
        }
    };
});