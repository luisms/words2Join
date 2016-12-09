
angular.module("IndividualRankinglistApp",["ngRoute"])
    .config(function ($routeProvider){
        $routeProvider
        .when("/individualRankings",{
            controller:"individualranking-list-ctrl",
            templateUrl:"globalranking-list.html"
        })
        .when("/individualRankings/:name",{
            controller:"individualranking-ctrl",
            templateUrl:"individualranking-edit.html"
        })
    }) ;
