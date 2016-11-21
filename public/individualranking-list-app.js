
angular.module("IndividualRankinglistApp",["ngRoute"])
    .config(function ($routeProvider){
        $routeProvider
        .when("/",{
            controller:"IndividualListCtrl",
            templateUrl:"globalranking-list.html"
        })
        .when("/individualrankings/:name",{
            controller:"IndividualRankingEditCtrl",
            templateUrl:"individualranking-edit.html"
        })
    }) ;
