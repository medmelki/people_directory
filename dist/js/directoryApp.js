var app = angular.module('directoryApp', [
    'ngRoute'
]);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
        when('/default', {
            templateUrl: 'partials/directory.default.html'
        }).
        when('/panels', {
            templateUrl: 'partials/directory.panels.html',
            controller: 'companyCtrl'
        }).
        otherwise({
            redirectTo: '/panels',
            controller: 'companyCtrl'
        });
}]);