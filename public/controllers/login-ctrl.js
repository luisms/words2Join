angular.module("words2JoinAPP")
    .controller("login-ctrl", function ($scope, $rootScope, $http, $routeParams, $location) {
        console.log("Login controller");
        $scope.showError = false;
        $scope.login = function () {
            console.log("usuario:" + $scope.username + ", Contraseña:" + $scope.password);
            if ($scope.username == null || $scope.username.length == 0 || $scope.password == null || $scope.password.length == 0) {
                $scope.showError = true;
                $scope.error = "Empty fields";
            } else {
                $http.post("/api/v1/login", {
                    "username": $scope.username,
                    "password": $scope.password
                }).then(function (response) {
                    console.log("Status: " + response.status);
                    if (response.data == $scope.username) {
                        $rootScope.isAuth0 = false;
                        $rootScope.isLogged = true;
                        $rootScope.username = $scope.username;
                        $location.path("/home/" + $scope.username);
                    }
                }, function () {
                    $rootScope.isLogged = false;
                    $scope.showError = true;
                    $scope.error = "Username or password is incorrect.";
                });
            }
        }
    });