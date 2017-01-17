angular.module("words2JoinAPP")
.factory('PagerService', PagerService)
    .controller("profile-ctrl", function ($scope, $http, $routeParams, $location, PagerService) {
        console.log("profile controller");
        var vm = this;
        $scope.player = $routeParams.username;
        $scope.listFriends = [];
        $scope.friend = false;
        function refresh() {
            $http.get("/api/v1/friends/" + $scope.player).then(function (listFriends) {
                if (listFriends.data[0] != null) {
                    $scope.listFriends = listFriends.data[0].friends;
                    if ($scope.listFriends != null) {
                        if ($scope.listFriends.length == 0) {
                            $scope.friend = true;
                        } else {
                            vm.listfriends = listFriends.data[0].friends;
                            vm.pager = {};
                            vm.setPage = setPage;
                            initController();
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

        function initController() {
            // initialize to page 1
            vm.setPage(1);
        }

        function setPage(page) {
            if (page < 1 || page > vm.pager.totalPages) {
                return;
            }

            // get pager object from service
            vm.pager = PagerService.GetPager(vm.listfriends.length, page);

            // get current page of items
            vm.items = vm.listfriends.slice(vm.pager.startIndex, vm.pager.endIndex + 1);
        }
    });
function PagerService() {
    // service definition
    var service = {};

    service.GetPager = GetPager;

    return service;

    // service implementation
    function GetPager(totalItems, currentPage, pageSize) {
        // default to first page
        currentPage = currentPage || 1;

        // default page size is 10
        pageSize = pageSize || 10;

        // calculate total pages
        var totalPages = Math.ceil(totalItems / pageSize);

        var startPage, endPage;
        if (totalPages <= 10) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }

        // calculate start and end item indexes
        var startIndex = (currentPage - 1) * pageSize;
        var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        // create an array of pages to ng-repeat in the pager control
        var pages = _.range(startPage, endPage + 1);

        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }
}