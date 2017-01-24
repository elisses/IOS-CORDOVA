angular.module('starter').factory('DBA', function ($cordovaSQLite, $q, $ionicPlatform) {
        
    var self = this;


    // Handle query's and potential errors
    self.query = function (query, parameters) {
        parameters = parameters || [];
        var q = $q.defer();

        $ionicPlatform.ready(function () {
            $cordovaSQLite.execute(db, query, parameters)
                    .then(function (result) {
                        q.resolve(result);
                    }, function (error) {
                        console.error(error.message);

                        q.reject(angular.toJson(error));
                    });
        });
        return q.promise;
    };

    // Proces a result set
    self.getAll = function (result) {
        var output = [];

        for (var i = 0; i < result.rows.length; i++) {
            output.push(result.rows.item(i));
        }
        return output;
    };

    // Proces a single result
    self.get = function (result) {
        var output = null;
        if (result.rows.length !== 0) {
            output = angular.copy(result.rows.item(0));
        }

        return output;
    };

    return self;
});