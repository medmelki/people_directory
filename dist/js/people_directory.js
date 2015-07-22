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
        when('/panels/:username', {
            templateUrl: 'partials/directory.panels.html',
            controller: 'companyCtrl'
        }).
        otherwise({
            redirectTo: '/panels',
            controller: 'companyCtrl'
        });
}]);;
app.controller('companyCtrl', function ($scope, $http, $routeParams) {

    $scope.username = $routeParams.username;

    $http.get("http://localhost:8080/peopledirectory/rest/company/all")
        .success(function (response) {
            $scope.companies = response;
            $scope.setNextEmployeeId();
        });


    $scope.setDepartments = function (x) {
        $scope.departments = x.departments;
        $scope.activeCompany = x;
    };

    $scope.setEmployees = function (x, index) {
        $scope.employees = x.employees;
        $scope.activeDepartment = x;
        $scope.activeDepartmentId = index + 1;
    };

    $scope.setActiveEmployee = function (x) {
        $scope.activeEmployee = x;
    };

    $scope.addEmployee = function (companyName, departmentId, name) {

        $http.get("http://localhost:8080/peopledirectory/rest/company/employee/add/" + companyName + "/" + departmentId + "/" + $scope.nextemployeeId + "/" + name)
            .success(function (response) {
                $scope.deleteEmployeeSuccess = response;
            });
    };

    $scope.deleteEmployee = function () {

        $http.get("http://localhost:8080/peopledirectory/rest/company/employee/delete/" + $scope.activeCompany.name + "/" + $scope.activeDepartmentId + "/" + $scope.activeEmployee.name)
            .success(function (response) {
                $scope.deleteEmployeeSuccess = response;
            });
    };

    $scope.deleteDepartment = function () {

        $http.get("http://localhost:8080/peopledirectory/rest/company/department/delete/" + $scope.activeCompany.name + "/" + $scope.activeDepartment.name)
            .success(function (response) {
                $scope.deleteEmployeeSuccess = response;
            });
    };

    $scope.deleteCompany = function () {

        $http.get("http://localhost:8080/peopledirectory/rest/company/delete/" + $scope.activeCompany.name)
            .success(function (response) {
                $scope.deleteEmployeeSuccess = response;
            });
    };

    $scope.deleteItem = function (modelItem) {

        switch (modelItem) {

            case "company":
                $scope.deleteCompany();
                break;
            case "department":
                $scope.deleteDepartment();
                break;
            case "employee":
                $scope.deleteEmployee();
                break;
        }
    };

    $scope.setNextEmployeeId = function () {
        $scope.nextemployeeId = 0;
        for (var cmpItem in $scope.companies) {

            for (var i in $scope.companies[cmpItem].departments) {

                for (var j in $scope.companies[cmpItem].departments[i].employees) {

                    for (var k in $scope.companies[cmpItem].departments[i].employees[j]) {
                        $scope.nextemployeeId = ($scope.nextemployeeId + 1);
                    }
                }
            }
        }
    };

});
;


function setActive(that, category){
    that.className += " info";
    $('.'+ category + 'Element').not(that).removeClass("info");
}

function setFocus(that){
    that.className += " focus";
    $('.navListItem').not(that).removeClass("focus");
}
;
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
