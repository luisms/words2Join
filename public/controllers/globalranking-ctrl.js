angular.module("words2JoinAPP")
    .controller("globalranking-ctrl", function ($scope, $http) {
        console.log("Global ranking controller");
        function refresh() {
            $http.get("/api/v1/individualRankings").then(function (ranking) {
                $scope.ranking = ranking.data;
                //console.log("Valor ranking: " + JSON.stringify(ranking, null, ' '));
            });
        }
        refresh();
    });