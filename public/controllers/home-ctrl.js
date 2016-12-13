angular.module("words2JoinAPP")
        .controller("home-ctrl", function ($scope, $routeParams, $location) {
                console.log("game controller");
                $scope.playGame = function () {
                        console.log($routeParams.username);
                        $location.path("/individualGames/" + $routeParams.username);
                }
                $scope.profile = function () {
                        console.log($routeParams.player);
                        $location.path("/profile/" + $routeParams.username);
                }
        });