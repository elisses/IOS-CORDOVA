angular.module('starter').constant('AUTH_EVENTS', {
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized'
})
        .constant('USER_ROLES', {
            restrict: 'restrict_role',
            public: 'public_role'
        });