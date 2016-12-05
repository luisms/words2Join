angular.module("words2JoinAPP",["ngRoute"])
    .config(function ($routeProvider){
        $routeProvider
        .when("/",{
            controller:"home-ctrl",
            templateUrl:"home.html"
        })
        .when("/individualGames/:player",{
            controller:"game-ctrl",
            templateUrl:"game.html"
        })

        .when("/profile/:player",{
            controller:"profile-ctrl",
            templateUrl:"profile.html"
        })
    
        .when("/individualRankings",{
            controller:"IndividualRankingListCtrl",
            templateUrl:"globalranking-list.html"
        })
        .when("/individualRankings/:name",{
            controller:"IndividualRankingEditCtrl",
            templateUrl:"individualranking-edit.html"
        })
}) ;
