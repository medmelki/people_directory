var app1 = angular.module('indexApp', []);

app1.controller('validateCtrl', function ($scope, $http) {

    $scope.authentified = false;
    $scope.link = '#';

    $scope.authenticate = function () {

        $http.get("http://localhost:8080/peopledirectory/rest/authentication" + "/" + $scope.login + "/" + $scope.password)
            .success(function (response) {
                if (response !== null) {
                    $scope.authentified = true;
                    $scope.username = response.username;
                    if ($scope.username) {
                        $scope.link = 'directory.html#/panels/' + $scope.username;
                    }

                }

            });
    };
    $scope.authenticate.$inject = [$scope, '$http'];


});
