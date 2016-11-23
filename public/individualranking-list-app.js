
angular.module("IndividualRankinglistApp",["ngRoute"])
    .config(function ($routeProvider){
        $routeProvider
        .when("/",{
            controller:"individualranking-list-ctrl",
            templateUrl:"globalranking-list.html"
        })
        .when("/individualRankings/:name",{
            controller:"individualranking-ctrl",
            templateUrl:"individualranking-edit.html"
        })
    }) ;
