angular.module("words2JoinAPP")
        .controller("home-ctrl", function ($http, $scope, $rootScope, $routeParams, $location, auth, store) {
                console.log("game controller");
                var vm = this;
                vm.logout = $scope.logout;
                vm.auth = auth;
                $scope.playGame = function () {
                        console.log($routeParams.username);
                        $location.path("/individualGames/" + $routeParams.username);
                }
                $scope.profile = function () {
                        console.log($routeParams.username);
                        $location.path("/profile/" + $routeParams.username);
                }
                $scope.logout = function () {
                        if ($rootScope.isAuth0 == false) {
                                $http.get("/api/v1/logout").then(function (response) {
                                        console.log("Logout done ");
                                        console.log("Status: " + response.status);
                                        $rootScope.isLogged = false;
                                        $location.path("/");
                                });
                        } else {
                                // The signout method on the auth service
                                // sets isAuthenticated to false but we
                                // also need to remove the profile and
                                // token from local storage
                                auth.signout();
                                store.remove('profile');
                                store.remove('token');
                                console.log("Logout done ");
                                $rootScope.isLogged = false;
                                $location.path('/');
                        }
                }
        });