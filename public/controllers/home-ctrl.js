angular.module("words2JoinAPP")
        .controller("home-ctrl", function ($http, $scope, $rootScope, $routeParams, $location) {
                console.log("game controller");
                $scope.playGame = function () {
                        console.log($routeParams.username);
                        $location.path("/individualGames/" + $routeParams.username);
                }
                $scope.profile = function () {
                        console.log($routeParams.player);
                        $location.path("/profile/" + $routeParams.username);
                }
                $scope.logout = function () {
                        $http.get("/api/v1/logout").success(function (response) {
                                console.log("Logout done ");
                                if (response.status == "Logout") {
                                        $rootScope.isLogged = false;
                                        $location.path("/");
                                }
                        });
                }
        });