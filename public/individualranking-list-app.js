
angular.module("IndividualRankinglistApp",["ngRoute"])
    .config(function ($routeProvider){
        $routeProvider
        .when("/",{
            controller:"IndividualRankingListCtrl",
            templateUrl:"individualranking-list.html"
        })
        .when("/individualrankings/:name",{
            controller:"IndividualRankingEditCtrl",
            templateUrl:"individualranking-edit.html"
        })
    }) ;
