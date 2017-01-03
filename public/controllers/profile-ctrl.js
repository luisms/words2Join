angular.module("words2JoinAPP")
    .controller("profile-ctrl", function ($scope, $http, $routeParams, $location) {
        console.log("profile controller");
        $scope.player = $routeParams.username;
        $scope.friend = false;
        function refresh() {
            $http.get("/api/v1/friends/" + $scope.player).then(function (listFriends) {
                $scope.listFriends = listFriends.data;
                if ($scope.listFriends[0].friends.length == 0) {
                    $scope.friend = true;
                }
                console.log("/api/v1/friends/" + $scope.player);
                console.log("Cantidad de amigos: " + $scope.listFriends[0].friends.length);
            });
        }

        $scope.deleteFriend = function (name) {
            console.log("Delete friend: " + name);
            $http.delete("/api/v1/friends/" + $scope.player + "/" + name).then(function () {
                refresh();
            });
        }

        $scope.addFriend = function () {
            if ($scope.newFriend != null) {
                console.log("Add friend: " + $scope.newFriend);
                $http.get("/api/v1/individualGames/" + $scope.newFriend).then(function (friend) {

                    console.log("/api/v1/individualGames/" + $scope.newFriend);
                    console.log("Existe: " + friend.length);
                    console.log("Valore: " + friend);
                    //TERMINAR CUANDO HAYA UNA BASE DE DATOS CON LOS USUARIOS REGISTRADOS
                    //Se comprueba que existe un usuario con ese nombre y luego se hace un PUT con los datos a friends.
                });
            }
        }
        refresh();
    });