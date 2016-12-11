angular.module("words2JoinAPP")
    .controller("signup-ctrl", function ($scope, $http, $routeParams, $location) {
        console.log("Login controller");
        $scope.isLogged = false;
        $scope.error = false;
        $scope.login = function () {
            console.log("usuario:" + $scope.username + ", Contraseña:" + $scope.password);
            $http.post("/login", {
                "username": $scope.username,
                "password": $scope.password
            }).success(function (isLogged) {
                console.log("isLogged: " + isLogged.value);
                $scope.isLogged = isLogged.value;
                if($scope.isLogged == true){
                    $location.path("/home"); 
                }else{
                    $scope.error = true;
                }
            });
        }
    });