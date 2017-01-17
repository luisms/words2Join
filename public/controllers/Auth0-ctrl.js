angular.module("words2JoinAPP")
    .controller("Auth0-ctrl", function (auth, store, $location, $scope, $rootScope) {
        console.log("Auth0 controller");
        var vm = this;
        vm.login = $scope.login;
        vm.auth = auth;
        $rootScope.isLogged = false;
        $scope.$watch( $rootScope.isLogged, function () {
            $scope.isLogged = $rootScope.isLogged;
            console.log("Valor logged: " + $scope.isLogged);
        });

        $scope.login = function () {
            // The auth service has a signin method that
            // makes use of Auth0Lock. If authentication
            // is successful, the user's profile and token
            // are saved in local storage with the store service
            auth.signin({}, function (profile, token) {
                store.set('profile', profile);
                store.set('token', token);
                $rootScope.isAuth0 = true;
                $rootScope.isLogged = true;
                $rootScope.username = profile.email;
                console.log("Profile: " + profile.email);
                $location.path('/home/' + $rootScope.username);
            }, function (error) {
                console.log(error);
                $rootScope.isLogged = false;
                $rootScope.isAuth0 = false;
            })
        }
    });