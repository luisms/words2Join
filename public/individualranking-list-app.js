
angular.module("IndividualRankinglistApp",["ngRoute"])
    .config(function ($routeProvider){
        $routeProvider
        .when("/",{
            controller:"IndividualRankingListCtrl",
            templateUrl:"globalranking-list.html"
        })
        .when("/individualRankings/:name",{
            controller:"IndividualRankingEditCtrl",
            templateUrl:"individualranking-edit.html"
        })
    }) ;
