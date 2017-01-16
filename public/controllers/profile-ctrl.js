angular.module("words2JoinAPP")
    .controller("profile-ctrl", function ($scope, $http, $routeParams, $location) {
        console.log("profile controller");
        $scope.player = $routeParams.username;
        $scope.listFriends = [];
        $scope.friend = false;
        function refresh() {
            $http.get("/api/v1/friends/" + $scope.player).then(function (listFriends, friend) {
                if (listFriends.data[0] != null) {
                    $scope.listFriends = listFriends.data[0].friends;
                    if ($scope.listFriends != null) {
                        if ($scope.listFriends.length == 0) {
                            $scope.friend = true;
                        }
                        
                       for (var p  in $scope.listFriends) {
                           console.log("adfasdgadsrfgsdfgsdf g      p    "+ p);
                            //$scope.listFriends[p].bestScore = 0;
                            $http.get("/api/v1/individualRankings/" + $scope.listFriends[p].player).then(function (listGames) {
                                console.log("sadfasdfsafdasfasd player "+$scope.listFriends[p].player);
                                if(listGames.data[0]!=null)
                                    $scope.listFriends[p].bestScore = listGames.data[0].score;
                                else
                                    $scope.listFriends[p].bestScore = 0;
                            });
                                                           

                        }

                        console.log("/api/v1/friends/" + $scope.player);
                        console.log("Cantidad de amigos: " + $scope.listFriends.length);
                    } else {
                        $scope.friend = true;
                    }
                }
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
                $http.get("/api/v1/users/" + $scope.newFriend).then(function (friend, listFriends) {
                    //Si se ha mandado un nombre de amigo 
                    //Se comprueba que existe un usuario con ese nombre en tabla users
                    var salida = '';
                    for (var p in friend) {
                        salida += p + ':' + friend[p] + 'n';
                    }
                    console.log("List friends " + $scope.listFriends);
                    var finded = false;
                    for (var p in $scope.listFriends) {
                        if (angular.equals($scope.listFriends[p].player, $scope.newFriend)) {
                            finded = true;
                        }
                    }
                    if (friend != null && finded == false) {
                        console.log("/api/v1/users/" + $scope.newFriend);
                        console.log("Existe: " + (friend != null).toString());
                        /*Se comprueba que existe un usuario con ese nombre en tabla friends 
                        y luego se hace un POST con los datos a friends.*/
                        if (angular.equals({}, $http.get("/api/v1/friends/" + $scope.player))) {
                            $http.post("/api/v1/friends/", {
                                "player": $scope.player,
                                "friends": []
                            }).then(function () {
                                console.log("Usuario añadido: " + $scope.player);
                                console.log($http.get("/api/v1/friends/" + $scope.player));
                            });
                        }


                        //Si el usuario ya existe, se actualiza su lista de amigos:                        
                        var date = new Date();
                        $http.put("/api/v1/friends/" + $scope.player, {
                            "player": $scope.newFriend,
                            "date": date
                        }).then(function () {
                            console.log("Amigo añadido: " + $scope.newFriend);
                            refresh();
                        });
                        //Si no:
                    } else {
                        console.log("No existe ningun jugador llamado" + $scope.newFriend + "...");
                    }
                });
            } else {
                console.log("No se ha recibido nombre de amigo");
            }
            refresh();
        }
        refresh();
    });