angular.module("words2JoinAPP")
    .controller("globalranking-ctrl", function ($scope, $http) {
        console.log("Global ranking controller");
        function refresh() {
            $http.get("/api/v1/individualRankings").success(function (ranking) {
                $scope.ranking = ranking;


            });
        }
        refresh();
    });